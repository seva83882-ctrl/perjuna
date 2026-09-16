/**
 * catalog.js
 * =================================================================
 * Мамины секреты — рендер каталога товаров.
 *
 * Зависимости (должны быть загружены до этого файла):
 *   - data.js       → PRODUCTS_DATA, formatPrice, getProductsByCategory
 *
 * Экспортирует в window:
 *   - window.openProductModal(productId)  — вызывается при клике на карточку
 *   - window.addToCart(productId)         — вызывается кнопкой «+»
 *
 * Эти функции-заглушки будут переопределены в modal.js и cart.js.
 * =================================================================
 */

'use strict';

(function CatalogModule() {

  /* ── КОНСТАНТЫ ───────────────────────────────────────────── */

  const ROOT_ID    = 'catalogRoot';
  const TABS_DATA  = [
    { id: 'in-stock',   label: 'Всегда в наличии' },
    { id: 'pre-order',  label: 'Под заказ к дате'  },
  ];

  /** Через сколько мс сбрасывается состояние «добавлено» на кнопке */
  const ADDED_RESET_MS = 1600;

  /* ── СОСТОЯНИЕ ───────────────────────────────────────────── */

  let activeCategory = 'in-stock';
  let rootEl         = null;
  let tabsEl         = null;
  let panelEl        = null;


  /* ── ЗАГЛУШКИ публичных API (переопределяются другими модулями) */

  if (typeof window.openProductModal !== 'function') {
    window.openProductModal = function (productId) {
      console.info('[Catalog] openProductModal stub — будет переопределён modal.js:', productId);
    };
  }

  if (typeof window.addToCart !== 'function') {
    window.addToCart = function (productId) {
      console.info('[Catalog] addToCart stub — будет переопределён cart.js:', productId);
    };
  }


  /* ── РЕНДЕР ТАБОВ ────────────────────────────────────────── */

  /**
   * Строит HTML переключателя категорий.
   * Использует ARIA role="tablist" / role="tab" / aria-selected.
   */
  function renderTabs() {
    const tablistEl = document.createElement('div');
    tablistEl.className  = 'catalog__tabs';

    const groupEl = document.createElement('div');
    groupEl.className    = 'catalog__tab-group';
    groupEl.setAttribute('role', 'tablist');
    groupEl.setAttribute('aria-label', 'Категории товаров');

    TABS_DATA.forEach(function (tab) {
      const btn = document.createElement('button');
      btn.type            = 'button';
      btn.className       = 'catalog__tab';
      btn.id              = 'tab-' + tab.id;
      btn.textContent     = tab.label;
      btn.setAttribute('role',          'tab');
      btn.setAttribute('aria-selected', tab.id === activeCategory ? 'true' : 'false');
      btn.setAttribute('aria-controls', 'panel-' + tab.id);
      btn.setAttribute('data-category', tab.id);

      btn.addEventListener('click', function () {
        switchCategory(tab.id);
      });

      /* Навигация с клавиатуры по стрелкам */
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          var tabs = Array.from(groupEl.querySelectorAll('[role="tab"]'));
          var idx  = tabs.indexOf(e.currentTarget);
          var next = e.key === 'ArrowRight'
            ? (idx + 1) % tabs.length
            : (idx - 1 + tabs.length) % tabs.length;
          tabs[next].click();
          tabs[next].focus();
        }
        if (e.key === 'Home') {
          e.preventDefault();
          groupEl.querySelector('[role="tab"]').click();
        }
        if (e.key === 'End') {
          e.preventDefault();
          var tabs = groupEl.querySelectorAll('[role="tab"]');
          tabs[tabs.length - 1].click();
        }
      });

      groupEl.appendChild(btn);
    });

    tablistEl.appendChild(groupEl);
    return tablistEl;
  }


  /* ── РЕНДЕР СЕТКИ КАРТОЧЕК ───────────────────────────────── */

  /**
   * Строит одну карточку товара.
   * @param {Object} product — элемент из PRODUCTS_DATA
   * @returns {HTMLElement}
   */
  function buildCard(product) {
    const card = document.createElement('article');
    card.className       = 'product-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role',    'button');
    card.setAttribute('aria-label', 'Открыть ' + product.name);
    card.setAttribute('data-product-id', product.id);

    /* ─ Изображение ─ */
    const imgWrap = document.createElement('div');
    imgWrap.className = 'product-card__img-wrap';

    const img = document.createElement('img');
    img.className   = 'product-card__img';
    img.src         = product.images[0] || '';
    img.alt         = product.name;
    img.loading     = 'lazy';
    img.decoding    = 'async';
    img.width       = 400;
    img.height      = 400;

    /* Заглушка при ошибке загрузки */
    img.onerror = function () {
      img.style.display = 'none';
    };

    imgWrap.appendChild(img);

    /* Бейдж «Хит» */
    if (product.popular) {
      const hitBadge = document.createElement('span');
      hitBadge.className   = 'product-card__badge-hit';
      hitBadge.textContent = '★ Хит';
      hitBadge.setAttribute('aria-label', 'Хит продаж');
      imgWrap.appendChild(hitBadge);
    }

    /* Бейдж галереи (если фото > 1) */
    if (product.images.length > 1) {
      const galBadge = document.createElement('span');
      galBadge.className = 'product-card__badge-gallery';
      galBadge.setAttribute('aria-label', product.images.length + ' фотографий');
      galBadge.innerHTML =
        '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
          '<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>' +
          '<circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>' +
          '<path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
        '</svg>' +
        '\u00a0' + product.images.length + '\u00a0фото';
      imgWrap.appendChild(galBadge);
    }

    card.appendChild(imgWrap);

    /* ─ Тело карточки ─ */
    const body = document.createElement('div');
    body.className = 'product-card__body';

    /* Название */
    const nameEl = document.createElement('h3');
    nameEl.className   = 'product-card__name';
    nameEl.textContent = product.name;
    body.appendChild(nameEl);

    /* Подзаголовок */
    const subEl = document.createElement('p');
    subEl.className   = 'product-card__subtitle';
    subEl.textContent = product.subtitle;
    body.appendChild(subEl);

    /* Чипсы весов (до 3-х, остальные скрываем) */
    if (product.weights && product.weights.length > 0) {
      const weightsWrap = document.createElement('div');
      weightsWrap.className = 'product-card__weights';
      weightsWrap.setAttribute('aria-label', 'Доступные фасовки');

      var displayWeights = product.weights.slice(0, 3);
      displayWeights.forEach(function (w, i) {
        var chip = document.createElement('span');
        chip.className   = 'chip' + (i === 0 ? ' is-active' : '');
        chip.textContent = w.label;
        chip.setAttribute('aria-label', w.label + ', ' + formatPrice(w.price));
        weightsWrap.appendChild(chip);
      });

      body.appendChild(weightsWrap);
    }

    /* ─ Подвал карточки: цена + кнопка ─ */
    const footer = document.createElement('div');
    footer.className = 'product-card__footer';

    /* Цена */
    var price = product.basePrice;
    var priceLabel = product.weights && product.weights.length > 1 ? 'от\u00a0' : '';

    const priceEl = document.createElement('div');
    priceEl.className = 'product-card__price';
    priceEl.innerHTML =
      (priceLabel
        ? '<span class="product-card__price-prefix">' + priceLabel + '</span>'
        : '') +
      formatPrice(price);

    footer.appendChild(priceEl);

    /* Кнопка быстрого добавления */
    const addBtn = document.createElement('button');
    addBtn.type       = 'button';
    addBtn.className  = 'product-card__add-btn';
    addBtn.innerHTML  = '<span aria-hidden="true">+</span>';
    addBtn.setAttribute('aria-label', 'Добавить ' + product.name + ' в корзину');
    addBtn.setAttribute('data-product-id', product.id);

    footer.appendChild(addBtn);
    body.appendChild(footer);
    card.appendChild(body);

    return card;
  }


  /**
   * Рендерит сетку карточек в panelEl.
   * @param {string} category — 'in-stock' | 'pre-order'
   */
  function renderGrid(category) {
    var products = getProductsByCategory(category);

    const grid = document.createElement('div');
    grid.className = 'catalog__grid';
    grid.setAttribute('role', 'list');

    if (products.length === 0) {
      const empty = document.createElement('p');
      empty.className   = 'catalog__empty';
      empty.textContent = 'Товары скоро появятся. Следите за обновлениями!';
      grid.appendChild(empty);
    } else {
      products.forEach(function (product) {
        var cardWrapper = document.createElement('div');
        cardWrapper.setAttribute('role', 'listitem');
        cardWrapper.appendChild(buildCard(product));
        grid.appendChild(cardWrapper);
      });
    }

    return grid;
  }


  /* ── ПЕРЕКЛЮЧЕНИЕ КАТЕГОРИИ ──────────────────────────────── */

  /**
   * Активирует нужный таб и перерисовывает сетку.
   * @param {string} category
   */
  function switchCategory(category) {
    if (category === activeCategory) return;
    activeCategory = category;

    /* Обновляем aria-selected на кнопках табов */
    if (tabsEl) {
      var tabs = tabsEl.querySelectorAll('[role="tab"]');
      tabs.forEach(function (tab) {
        var isActive = tab.getAttribute('data-category') === category;
        tab.setAttribute('aria-selected', String(isActive));
      });
    }

    /* Перерисовываем панель */
    if (panelEl) {
      panelEl.innerHTML = '';
      var grid = renderGrid(category);
      panelEl.appendChild(grid);

      /* Объявляем screen-readers */
      panelEl.setAttribute('aria-label',
        category === 'in-stock' ? 'Товары в наличии' : 'Товары под заказ'
      );
    }
  }


  /* ── ДЕЛЕГИРОВАНИЕ КЛИКОВ ────────────────────────────────── */

  /**
   * Единый обработчик кликов на сетке.
   * Разделяет: клик по кнопке «+» vs клик по карточке.
   */
  function onGridClick(e) {
    /* Кнопка «+ в корзину» */
    var addBtn = e.target.closest('.product-card__add-btn');
    if (addBtn) {
      e.stopPropagation();
      var productId = addBtn.getAttribute('data-product-id');
      if (!productId) return;

      /* Анимация подтверждения */
      addBtn.classList.add('is-added');
      var origHTML = addBtn.innerHTML;
      addBtn.innerHTML = '<span aria-hidden="true">✓</span>';
      addBtn.setAttribute('aria-label', 'Добавлено!');
      addBtn.disabled = true;

      setTimeout(function () {
        addBtn.classList.remove('is-added');
        addBtn.innerHTML = origHTML;
        addBtn.setAttribute('aria-label',
          'Добавить ' + (getProductById(productId)
            ? getProductById(productId).name
            : 'товар') + ' в корзину');
        addBtn.disabled = false;
      }, ADDED_RESET_MS);

      window.addToCart(productId);
      return;
    }

    /* Клик по карточке — открываем Quick View */
    var card = e.target.closest('.product-card');
    if (card) {
      var productId = card.getAttribute('data-product-id');
      if (productId) {
        window.openProductModal(productId);
      }
    }
  }

  /**
   * Клавиатурная активация карточки (Enter / Space).
   */
  function onGridKeydown(e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = e.target.closest('.product-card');
    if (card && e.target === card) {
      e.preventDefault();
      var productId = card.getAttribute('data-product-id');
      if (productId) {
        window.openProductModal(productId);
      }
    }
  }


  /* ── ИНИЦИАЛИЗАЦИЯ ───────────────────────────────────────── */

  function init() {
    rootEl = document.getElementById(ROOT_ID);
    if (!rootEl) {
      console.warn('[Catalog] #' + ROOT_ID + ' не найден в DOM.');
      return;
    }

    /* Проверяем наличие данных */
    if (typeof PRODUCTS_DATA === 'undefined') {
      rootEl.innerHTML =
        '<p class="catalog__loading">Ошибка загрузки данных каталога.</p>';
      console.error('[Catalog] PRODUCTS_DATA не определён. Подключите data.js до catalog.js.');
      return;
    }

    /* Очищаем заглушку */
    rootEl.innerHTML = '';

    /* Рендерим табы */
    tabsEl = renderTabs();
    rootEl.appendChild(tabsEl);

    /* Рендерим панель с товарами */
    panelEl = document.createElement('div');
    panelEl.className = 'catalog__panel';
    panelEl.id        = 'panel-' + activeCategory;
    panelEl.setAttribute('role',       'tabpanel');
    panelEl.setAttribute('aria-labelledby', 'tab-' + activeCategory);
    panelEl.setAttribute('aria-label',
      activeCategory === 'in-stock' ? 'Товары в наличии' : 'Товары под заказ'
    );

    var grid = renderGrid(activeCategory);
    panelEl.appendChild(grid);
    rootEl.appendChild(panelEl);

    /* Делегированные обработчики на весь root */
    rootEl.addEventListener('click',   onGridClick);
    rootEl.addEventListener('keydown', onGridKeydown);
  }


  /* ── ЗАПУСК ──────────────────────────────────────────────── */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }


  /* ── ПУБЛИЧНЫЙ API ───────────────────────────────────────── */

  window.CatalogModule = {
    switchCategory: switchCategory,
    reinit:         init,
  };

}());
