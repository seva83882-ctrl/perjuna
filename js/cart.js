/**
 * cart.js
 * =================================================================
 * Мамины секреты — Корзина: состояние, localStorage, UI.
 *
 * Зависимости (загружены до этого файла):
 *   - data.js    → formatPrice
 *
 * Переопределяет в window:
 *   - window.addToCart(item)      — добавить товар в корзину
 *
 * Экспортирует в window:
 *   - window.CartModule           — публичный API
 *
 * Ожидаемые элементы в DOM:
 *   #cartCapsule, #cartDrawer, #cartOverlay
 *   #headerCartBtn, #headerCartLabel, #headerCartTotal
 * =================================================================
 */

'use strict';

(function CartModule() {

  /* ── КОНСТАНТЫ ───────────────────────────────────────────── */

  const LS_KEY         = 'maminy_cart';
  const PHONE_NUMBER   = '+70000000000';   /* замените на реальный номер */

  /* ── СОСТОЯНИЕ ───────────────────────────────────────────── */

  /** @type {CartItem[]} */
  var cart = [];

  /* ── ТИП CartItem ────────────────────────────────────────── */
  /**
   * @typedef {Object} CartItem
   * @property {string} cartKey   — уникальный ключ позиции (id+вес+начинка)
   * @property {string} id        — product id
   * @property {string} name
   * @property {string} image
   * @property {Object|null} weight   — { label, value, price }
   * @property {Object|null} filling  — { id, label }
   * @property {number} quantity
   * @property {number} unitPrice     — цена за единицу
   */

  /* ── DOM-ССЫЛКИ ──────────────────────────────────────────── */

  var capsuleEl      = null;
  var drawerEl       = null;
  var overlayEl      = null;
  var headerBtnEl    = null;
  var headerLabelEl  = null;
  var headerTotalEl  = null;
  var drawerBodyEl   = null;
  var drawerDateEl   = null;
  var drawerCommentEl= null;
  var drawerTotalEl  = null;

  /* ── УНИКАЛЬНЫЙ КЛЮЧ ПОЗИЦИИ ─────────────────────────────── */

  function makeKey(item) {
    var weightLabel  = item.weight  ? item.weight.label  : '';
    var fillingId    = item.filling ? item.filling.id    : '';
    return [item.id, weightLabel, fillingId].join('__');
  }

  /* ── LOCALSTORAGE ────────────────────────────────────────── */

  function saveToLS() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('[Cart] Не удалось сохранить в localStorage:', e);
    }
  }

  function loadFromLS() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) cart = parsed;
      }
    } catch (e) {
      console.warn('[Cart] Не удалось загрузить из localStorage:', e);
      cart = [];
    }
  }

  /* ── ВЫЧИСЛЕНИЯ ──────────────────────────────────────────── */

  function totalItems() {
    return cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
  }

  function totalPrice() {
    return cart.reduce(function (sum, item) {
      return sum + item.unitPrice * item.quantity;
    }, 0);
  }

  /* ── ДОБАВИТЬ ТОВАР ──────────────────────────────────────── */

  /**
   * Принимает объект из modal.js или простой productId (из catalog.js).
   * @param {Object|string} itemOrId
   */
  function addToCart(itemOrId) {
    var item;

    /* Поддержка простого вызова addToCart('product-id') из catalog.js */
    if (typeof itemOrId === 'string') {
      var product = typeof getProductById === 'function'
        ? getProductById(itemOrId)
        : null;
      if (!product) {
        console.warn('[Cart] Товар не найден:', itemOrId);
        return;
      }
      item = {
        id:        product.id,
        name:      product.name,
        image:     product.images[0] || '',
        weight:    product.weights ? product.weights[0] : null,
        filling:   null,
        quantity:  1,
        unitPrice: product.basePrice,
      };
    } else {
      item = itemOrId;
      item.unitPrice = item.price / Math.max(item.quantity, 1);
    }

    item.cartKey = makeKey(item);

    /* Если такая позиция уже есть — увеличиваем quantity */
    var existing = cart.find(function (c) { return c.cartKey === item.cartKey; });
    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      item.quantity = item.quantity || 1;
      cart.push(item);
    }

    saveToLS();
    renderAll();

    /* Анимация бейджа в капсуле */
    var countEl = capsuleEl && capsuleEl.querySelector('.cart-capsule__count');
    if (countEl) {
      countEl.classList.remove('is-bumped');
      void countEl.offsetWidth; /* force reflow */
      countEl.classList.add('is-bumped');
      setTimeout(function () { countEl.classList.remove('is-bumped'); }, 500);
    }
  }

  /* ── УДАЛИТЬ ПОЗИЦИЮ ─────────────────────────────────────── */

  function removeItem(cartKey) {
    var itemEl = drawerBodyEl &&
      drawerBodyEl.querySelector('[data-cart-key="' + CSS.escape(cartKey) + '"]');

    if (itemEl) {
      itemEl.classList.add('is-removing');
      setTimeout(function () {
        cart = cart.filter(function (c) { return c.cartKey !== cartKey; });
        saveToLS();
        renderAll();
      }, 200);
    } else {
      cart = cart.filter(function (c) { return c.cartKey !== cartKey; });
      saveToLS();
      renderAll();
    }
  }

  /* ── ИЗМЕНИТЬ КОЛИЧЕСТВО ─────────────────────────────────── */

  function changeQty(cartKey, delta) {
    var item = cart.find(function (c) { return c.cartKey === cartKey; });
    if (!item) return;
    item.quantity = Math.max(1, item.quantity + delta);
    saveToLS();
    renderAll();
  }

  /* ── ОЧИСТИТЬ КОРЗИНУ ────────────────────────────────────── */

  function clearCart() {
    cart = [];
    saveToLS();
    renderAll();
  }

  /* ── РЕНДЕР ВСЕХ UI-ЭЛЕМЕНТОВ ────────────────────────────── */

  function renderAll() {
    renderCapsule();
    renderHeader();
    if (drawerEl && drawerEl.classList.contains('is-open')) {
      renderDrawerBody();
      renderDrawerTotal();
    }
  }

  /* ── КАПСУЛА ─────────────────────────────────────────────── */

  function renderCapsule() {
    if (!capsuleEl) return;
    var n    = totalItems();
    var total = totalPrice();

    var countEl = capsuleEl.querySelector('.cart-capsule__count');
    var totalEl = capsuleEl.querySelector('.cart-capsule__total');

    if (countEl) countEl.textContent = String(n);
    if (totalEl) totalEl.textContent = formatPrice(total);

    if (n > 0) {
      capsuleEl.hidden = false;
      requestAnimationFrame(function () {
        capsuleEl.classList.add('is-visible');
      });
    } else {
      capsuleEl.classList.remove('is-visible');
      setTimeout(function () {
        if (totalItems() === 0) capsuleEl.hidden = true;
      }, 400);
    }
  }

  /* ── ШАПКА САЙТА ─────────────────────────────────────────── */

  function renderHeader() {
    var n     = totalItems();
    var total = totalPrice();
    if (headerLabelEl) headerLabelEl.textContent = String(n);
    if (headerTotalEl) headerTotalEl.textContent = n > 0 ? formatPrice(total) : '0\u00a0₽';
    if (headerBtnEl)   headerBtnEl.setAttribute('aria-label', 'Корзина: ' + n + ' товаров');
  }

  /* ── ТЕЛО DRAWER (список позиций) ────────────────────────── */

  function renderDrawerBody() {
    if (!drawerBodyEl) return;
    drawerBodyEl.innerHTML = '';

    if (cart.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'cart-drawer__empty';
      empty.innerHTML =
        '<div class="cart-drawer__empty-icon" aria-hidden="true">🛒</div>' +
        '<p class="cart-drawer__empty-text">Корзина пуста.<br>Выберите товары из каталога.</p>';
      drawerBodyEl.appendChild(empty);
      return;
    }

    cart.forEach(function (item) {
      drawerBodyEl.appendChild(buildCartItem(item));
    });
  }

  /** Строит DOM-элемент одной позиции в drawer */
  function buildCartItem(item) {
    var el = document.createElement('div');
    el.className = 'cart-item';
    el.setAttribute('data-cart-key', item.cartKey);
    el.setAttribute('role', 'listitem');

    /* Миниатюра */
    var imgWrap = document.createElement('div');
    imgWrap.className = 'cart-item__img-wrap';
    var img = document.createElement('img');
    img.className = 'cart-item__img';
    img.src     = item.image || '';
    img.alt     = item.name;
    img.loading = 'lazy';
    img.onerror = function () { img.style.display = 'none'; };
    imgWrap.appendChild(img);
    el.appendChild(imgWrap);

    /* Правая часть */
    var info = document.createElement('div');
    info.className = 'cart-item__info';

    var nameEl = document.createElement('div');
    nameEl.className   = 'cart-item__name';
    nameEl.textContent = item.name;
    info.appendChild(nameEl);

    /* Метаданные (вес + начинка) */
    var metaParts = [];
    if (item.weight)  metaParts.push(item.weight.label);
    if (item.filling) metaParts.push(item.filling.label);
    if (metaParts.length) {
      var meta = document.createElement('div');
      meta.className   = 'cart-item__meta';
      meta.textContent = metaParts.join(' · ');
      info.appendChild(meta);
    }

    /* Строка управления: степпер + цена + удалить */
    var controls = document.createElement('div');
    controls.className = 'cart-item__controls';

    /* Степпер */
    var stepper = document.createElement('div');
    stepper.className = 'cart-item__stepper';

    var minusBtn = document.createElement('button');
    minusBtn.type      = 'button';
    minusBtn.className = 'cart-item__stepper-btn';
    minusBtn.setAttribute('aria-label', 'Уменьшить количество');
    minusBtn.textContent = '−';
    minusBtn.disabled  = item.quantity <= 1;
    minusBtn.addEventListener('click', function () { changeQty(item.cartKey, -1); });

    var qtyEl = document.createElement('div');
    qtyEl.className   = 'cart-item__qty';
    qtyEl.textContent = String(item.quantity);
    qtyEl.setAttribute('aria-label', 'Количество: ' + item.quantity);

    var plusBtn = document.createElement('button');
    plusBtn.type      = 'button';
    plusBtn.className = 'cart-item__stepper-btn';
    plusBtn.setAttribute('aria-label', 'Увеличить количество');
    plusBtn.textContent = '+';
    plusBtn.addEventListener('click', function () { changeQty(item.cartKey, +1); });

    stepper.appendChild(minusBtn);
    stepper.appendChild(qtyEl);
    stepper.appendChild(plusBtn);

    /* Цена позиции */
    var priceEl = document.createElement('div');
    priceEl.className   = 'cart-item__price';
    priceEl.textContent = formatPrice(item.unitPrice * item.quantity);

    /* Кнопка удаления */
    var removeBtn = document.createElement('button');
    removeBtn.type      = 'button';
    removeBtn.className = 'cart-item__remove';
    removeBtn.setAttribute('aria-label', 'Удалить ' + item.name + ' из корзины');
    removeBtn.innerHTML =
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
    removeBtn.addEventListener('click', function () { removeItem(item.cartKey); });

    controls.appendChild(stepper);
    controls.appendChild(priceEl);
    controls.appendChild(removeBtn);
    info.appendChild(controls);

    el.appendChild(info);
    return el;
  }

  /* ── ИТОГОВАЯ СТРОКА В DRAWER ────────────────────────────── */

  function renderDrawerTotal() {
    if (!drawerTotalEl) return;
    drawerTotalEl.textContent = formatPrice(totalPrice());
  }

  /* ── ОТКРЫТЬ / ЗАКРЫТЬ DRAWER ────────────────────────────── */

  function openDrawer() {
    if (!drawerEl || !overlayEl) return;

    renderDrawerBody();
    renderDrawerTotal();

    overlayEl.hidden = false;
    drawerEl.hidden  = false;

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlayEl.classList.add('is-visible');
        drawerEl.classList.add('is-open');
      });
    });

    drawerEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    /* Фокус на заголовок drawer */
    setTimeout(function () {
      var title = drawerEl.querySelector('.cart-drawer__title');
      if (title) { title.setAttribute('tabindex', '-1'); title.focus({ preventScroll: true }); }
    }, 360);
  }

  function closeDrawer() {
    if (!drawerEl || !overlayEl) return;

    overlayEl.classList.remove('is-visible');
    drawerEl.classList.remove('is-open');

    setTimeout(function () {
      overlayEl.hidden = true;
      drawerEl.hidden  = true;
      drawerEl.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }, 360);
  }

  /* ── СБОРКА DRAWER HTML ──────────────────────────────────── */

  function buildDrawer() {
    drawerEl.innerHTML = '';
    drawerEl.setAttribute('role',       'complementary');
    drawerEl.setAttribute('aria-label', 'Корзина');
    drawerEl.setAttribute('aria-hidden','true');

    /* Шапка */
    var header = document.createElement('div');
    header.className = 'cart-drawer__header';

    var titleRow = document.createElement('div');
    titleRow.style.cssText = 'display:flex;align-items:center;gap:8px;';

    var titleEl = document.createElement('h2');
    titleEl.className   = 'cart-drawer__title';
    titleEl.textContent = 'Ваш заказ';
    titleRow.appendChild(titleEl);

    var badgeEl = document.createElement('span');
    badgeEl.className = 'cart-drawer__count-badge';
    badgeEl.id        = 'drawerCountBadge';
    badgeEl.setAttribute('aria-live', 'polite');
    badgeEl.textContent = String(totalItems());
    titleRow.appendChild(badgeEl);

    header.appendChild(titleRow);

    var closeBtn = document.createElement('button');
    closeBtn.type      = 'button';
    closeBtn.className = 'cart-drawer__close';
    closeBtn.setAttribute('aria-label', 'Закрыть корзину');
    closeBtn.innerHTML =
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">' +
        '<path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
      '</svg>';
    closeBtn.addEventListener('click', closeDrawer);
    header.appendChild(closeBtn);
    drawerEl.appendChild(header);

    /* Тело (список позиций) */
    drawerBodyEl = document.createElement('div');
    drawerBodyEl.className = 'cart-drawer__body';
    drawerBodyEl.setAttribute('role', 'list');
    drawerBodyEl.setAttribute('aria-label', 'Позиции в корзине');
    drawerEl.appendChild(drawerBodyEl);

    /* Подвал */
    var footer = document.createElement('div');
    footer.className = 'cart-drawer__footer';

    /* Поле даты */
    var dateField = document.createElement('div');
    dateField.className = 'cart-drawer__field';
    var dateLabel = document.createElement('label');
    dateLabel.className = 'cart-drawer__label';
    dateLabel.textContent = 'Дата получения';
    dateLabel.setAttribute('for', 'cartDateInput');
    drawerDateEl = document.createElement('input');
    drawerDateEl.type      = 'date';
    drawerDateEl.id        = 'cartDateInput';
    drawerDateEl.className = 'cart-drawer__input';
    drawerDateEl.min       = new Date().toISOString().split('T')[0];
    drawerDateEl.setAttribute('aria-label', 'Желаемая дата получения');
    dateField.appendChild(dateLabel);
    dateField.appendChild(drawerDateEl);
    footer.appendChild(dateField);

    /* Поле комментария */
    var commentField = document.createElement('div');
    commentField.className = 'cart-drawer__field';

    var commentLabel = document.createElement('label');
    commentLabel.className = 'cart-drawer__label';
    commentLabel.textContent = 'Комментарий к заказу';
    commentLabel.setAttribute('for', 'cartCommentInput');

    drawerCommentEl = document.createElement('textarea');
    drawerCommentEl.id = 'cartCommentInput';
    drawerCommentEl.className = 'cart-drawer__textarea';
    drawerCommentEl.placeholder = 'Ваши пожелания к заказу...';
    drawerCommentEl.rows = 2;
    drawerCommentEl.setAttribute('aria-label', 'Комментарий к заказу');

    commentField.appendChild(commentLabel);
    commentField.appendChild(drawerCommentEl);
    footer.appendChild(commentField);

    /* Итог */
    var totalRow = document.createElement('div');
    totalRow.className = 'cart-drawer__total-row';
    var totalLabel = document.createElement('span');
    totalLabel.className   = 'cart-drawer__total-label';
    totalLabel.textContent = 'Итого:';
    drawerTotalEl = document.createElement('span');
    drawerTotalEl.className = 'cart-drawer__total-value';
    drawerTotalEl.id        = 'drawerTotalValue';
    drawerTotalEl.setAttribute('aria-live', 'polite');
    totalRow.appendChild(totalLabel);
    totalRow.appendChild(drawerTotalEl);
    footer.appendChild(totalRow);

    /* Кнопка MAX */
    var maxBtn = document.createElement('button');
    maxBtn.type      = 'button';
    maxBtn.className = 'cart-drawer__max-btn';
    maxBtn.id        = 'drawerMaxBtn';
    maxBtn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>' +
      '</svg>' +
      '<span>Заказать через MAX</span>';
    maxBtn.addEventListener('click', function () {
      if (typeof window.sendOrderToMax === 'function') {
        var date    = drawerDateEl    ? drawerDateEl.value    : '';
        var comment = drawerCommentEl ? drawerCommentEl.value : '';
        window.sendOrderToMax(cart, { date: date, comment: comment });
      }
    });
    footer.appendChild(maxBtn);

    /* Кнопка очистки */
    var clearBtn = document.createElement('button');
    clearBtn.type      = 'button';
    clearBtn.className = 'cart-drawer__clear-btn';
    clearBtn.textContent = 'Очистить корзину';
    clearBtn.addEventListener('click', function () {
      if (confirm('Очистить корзину?')) clearCart();
    });
    footer.appendChild(clearBtn);

    drawerEl.appendChild(footer);
  }

  /* ── ОБРАБОТЧИКИ СОБЫТИЙ ─────────────────────────────────── */

  function bindEvents() {
    /* Капсула: клик → открыть drawer */
    if (capsuleEl) {
      capsuleEl.addEventListener('click', openDrawer);
    }

    /* Кнопка корзины в шапке */
    if (headerBtnEl) {
      headerBtnEl.addEventListener('click', openDrawer);
    }

    /* Overlay drawer: клик → закрыть */
    if (overlayEl) {
      overlayEl.addEventListener('click', closeDrawer);
    }

    /* Escape закрывает drawer */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawerEl && drawerEl.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  /* ── ИНИЦИАЛИЗАЦИЯ ───────────────────────────────────────── */

  function init() {
    capsuleEl       = document.getElementById('cartCapsule');
    drawerEl        = document.getElementById('cartDrawer');
    overlayEl       = document.getElementById('cartOverlay');
    headerBtnEl     = document.getElementById('headerCartBtn');
    headerLabelEl   = document.getElementById('headerCartLabel');
    headerTotalEl   = document.getElementById('headerCartTotal');

    if (!capsuleEl || !drawerEl || !overlayEl) {
      console.warn('[Cart] Не найдены DOM-элементы корзины.');
      return;
    }

    /* Строим капсулу */
    capsuleEl.innerHTML =
      '<span class="cart-capsule__icon" aria-hidden="true">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none">' +
          '<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' +
          '<path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
        '</svg>' +
      '</span>' +
      '<span class="cart-capsule__count" aria-live="polite" aria-label="Товаров в корзине">0</span>' +
      '<span class="cart-capsule__total" aria-hidden="true">0\u00a0₽</span>' +
      '<button class="cart-capsule__cta" id="capsuleCtaBtn" aria-label="Оформить заказ" type="button">' +
        'Оформить\u00a0→' +
      '</button>';

    /* Клик на CTA-кнопку внутри капсулы */
    var ctaBtn = document.getElementById('capsuleCtaBtn');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', function (e) {
        e.stopPropagation(); /* не дублируем клик с capsuleEl */
        openDrawer();
      });
    }

    /* Строим drawer */
    buildDrawer();

    /* Загружаем корзину из localStorage */
    loadFromLS();

    /* Слушатели */
    bindEvents();

    /* Первичный рендер */
    renderAll();

    /* Переопределяем window.addToCart */
    window.addToCart = addToCart;
  }

  /* ── ЗАПУСК ──────────────────────────────────────────────── */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── ПУБЛИЧНЫЙ API ───────────────────────────────────────── */

  window.CartModule = {
    addToCart:  addToCart,
    removeItem: removeItem,
    clearCart:  clearCart,
    getCart:    function () { return cart.slice(); },
    getTotal:   totalPrice,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
  };

}());
