/**
 * modal.js
 * =================================================================
 * Мамины секреты — Quick View Modal (карточка товара).
 *
 * Зависимости (загружаются до этого файла):
 *   - data.js    → PRODUCTS_DATA, getProductById, formatPrice
 *   - catalog.js → заглушка window.openProductModal (переопределяем здесь)
 *
 * Экспортирует в window:
 *   - window.openProductModal(productId) — открыть модалку
 *   - window.closeProductModal()         — закрыть модалку
 *
 * Ожидаемые элементы в DOM (из index.html):
 *   #modalContainer  — корень, куда рендерится HTML модалки
 *   #modalOverlay    — затемняющий фон
 * =================================================================
 */

'use strict';

(function ModalModule() {

  /* ── DOM-ССЫЛКИ ──────────────────────────────────────────── */

  let containerEl = null;   // #modalContainer
  let overlayEl   = null;   // #modalOverlay
  let modalEl     = null;   // .modal (строится динамически)

  /* ── СОСТОЯНИЕ ───────────────────────────────────────────── */

  const state = {
    product:         null,   // текущий открытый товар
    slideIndex:      0,      // индекс активного слайда [0..n-1]
    selectedWeight:  0,      // индекс выбранного веса
    selectedFilling: null,   // id выбранной начинки
    quantity:        1,      // выбранное количество
    isOpen:          false,
    touchStartX:     0,      // для свайп-навигации
  };

  /* ── ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ─────────────────────────────── */

  /** Вычисляет scrollbar width, чтобы не прыгала страница при открытии */
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  /** Текущая цена с учётом выбора веса и количества */
  function calcCurrentPrice() {
    var p = state.product;
    if (!p) return 0;
    var unitPrice = p.basePrice;
    if (p.weights && p.weights[state.selectedWeight]) {
      unitPrice = p.weights[state.selectedWeight].price;
    }
    return unitPrice * state.quantity;
  }

  /** Строит строку наличия */
  function availabilityHTML(product) {
    if (product.category === 'in-stock') {
      return (
        '<span class="modal__availability modal__availability--instock">' +
          '<span class="modal__availability-dot" aria-hidden="true"></span>' +
          'В наличии' +
        '</span>'
      );
    }
    return (
      '<span class="modal__availability modal__availability--preorder">' +
        '<span class="modal__availability-dot" aria-hidden="true"></span>' +
        'Под заказ · от 2 дней' +
      '</span>'
    );
  }

  /* ── РЕНДЕР ГАЛЕРЕИ ──────────────────────────────────────── */

  function buildGallery(product) {
    var images = product.images;
    var isSingle = images.length === 1;

    var galleryEl = document.createElement('div');
    galleryEl.className = 'modal__gallery' + (isSingle ? ' single-image' : '');
    galleryEl.setAttribute('aria-label', 'Галерея фотографий товара');

    /* Слайды */
    images.forEach(function (src, idx) {
      var slide = document.createElement('div');
      slide.className = 'modal__slide' + (idx === 0 ? ' is-active' : '');
      slide.setAttribute('role', 'img');
      slide.setAttribute('aria-label', 'Фото ' + (idx + 1) + ' из ' + images.length);

      var img = document.createElement('img');
      img.src     = src;
      img.alt     = product.name + ' — фото ' + (idx + 1);
      img.loading = idx === 0 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.onerror = function () {
        /* Заглушка горы если картинка не нашлась */
        slide.innerHTML =
          '<div class="modal__slide-placeholder">' +
            '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">' +
              '<path d="M4 52l18-24 14 16 10-12 18 20H4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' +
              '<circle cx="46" cy="18" r="6" stroke="currentColor" stroke-width="2"/>' +
            '</svg>' +
          '</div>';
      };

      slide.appendChild(img);
      galleryEl.appendChild(slide);
    });

    /* Кнопка «←» */
    var prevBtn = document.createElement('button');
    prevBtn.type      = 'button';
    prevBtn.className = 'modal__arrow modal__arrow--prev';
    prevBtn.setAttribute('aria-label', 'Предыдущее фото');
    prevBtn.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
        '<path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
    prevBtn.addEventListener('click', function () { navigate(-1); });
    galleryEl.appendChild(prevBtn);

    /* Кнопка «→» */
    var nextBtn = document.createElement('button');
    nextBtn.type      = 'button';
    nextBtn.className = 'modal__arrow modal__arrow--next';
    nextBtn.setAttribute('aria-label', 'Следующее фото');
    nextBtn.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
        '<path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
    nextBtn.addEventListener('click', function () { navigate(+1); });
    galleryEl.appendChild(nextBtn);

    /* Счётчик «1 / X» */
    var counter = document.createElement('div');
    counter.className = 'modal__counter';
    counter.id        = 'modalGalleryCounter';
    counter.setAttribute('aria-live', 'polite');
    counter.textContent = '1\u00a0/\u00a0' + images.length;
    galleryEl.appendChild(counter);

    /* Touch-свайп */
    galleryEl.addEventListener('touchstart', function (e) {
      state.touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    galleryEl.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - state.touchStartX;
      if (Math.abs(dx) > 40) navigate(dx < 0 ? +1 : -1);
    }, { passive: true });

    return galleryEl;
  }

  /** Переключает слайд на delta (-1 или +1) */
  function navigate(delta) {
    var images = state.product.images;
    if (images.length <= 1) return;

    var slides   = modalEl.querySelectorAll('.modal__slide');
    var counter  = modalEl.querySelector('#modalGalleryCounter');
    var newIndex = (state.slideIndex + delta + images.length) % images.length;

    slides[state.slideIndex].classList.remove('is-active');
    slides[newIndex].classList.add('is-active');
    state.slideIndex = newIndex;

    if (counter) {
      counter.textContent = (newIndex + 1) + '\u00a0/\u00a0' + images.length;
    }
  }

  /* ── РЕНДЕР КОНТЕНТА (ПРАВАЯ КОЛОНКА) ────────────────────── */

  function buildContent(product) {
    var contentEl = document.createElement('div');
    contentEl.className = 'modal__content';
    contentEl.id        = 'modalContent';

    /* Заголовок + наличие */
    var header = document.createElement('div');
    header.className = 'modal__header';

    var nameEl = document.createElement('h2');
    nameEl.className = 'modal__name';
    nameEl.id        = 'modalTitle';
    nameEl.textContent = product.name;
    header.appendChild(nameEl);

    var availEl = document.createElement('div');
    availEl.innerHTML = availabilityHTML(product);
    header.appendChild(availEl.firstChild);

    contentEl.appendChild(header);

    /* Описание */
    var desc = document.createElement('p');
    desc.className   = 'modal__desc';
    desc.textContent = product.description;
    contentEl.appendChild(desc);

    contentEl.appendChild(buildDivider());

    /* Опции */
    var optionsEl = document.createElement('div');
    optionsEl.className = 'modal__options';

    /* ─ Чипсы весов/фасовки ─ */
    if (product.weights && product.weights.length > 0) {
      var wLabel = document.createElement('div');
      wLabel.className   = 'modal__option-label';
      wLabel.textContent = 'Фасовка';
      wLabel.id          = 'weightLabel';
      optionsEl.appendChild(wLabel);

      var wChips = document.createElement('div');
      wChips.className = 'modal__chips';
      wChips.setAttribute('role', 'group');
      wChips.setAttribute('aria-labelledby', 'weightLabel');

      product.weights.forEach(function (w, idx) {
        var chip = document.createElement('button');
        chip.type      = 'button';
        chip.className = 'chip' + (idx === state.selectedWeight ? ' is-active' : '');
        chip.textContent = w.label;
        chip.setAttribute('aria-pressed', String(idx === state.selectedWeight));
        chip.setAttribute('aria-label',   w.label + ' — ' + formatPrice(w.price));
        chip.setAttribute('data-weight-idx', String(idx));

        chip.addEventListener('click', function () {
          state.selectedWeight = idx;

          /* Переключаем активный чип */
          wChips.querySelectorAll('.chip').forEach(function (c, i) {
            c.classList.toggle('is-active', i === idx);
            c.setAttribute('aria-pressed', String(i === idx));
          });

          updatePrice();
        });

        wChips.appendChild(chip);
      });

      optionsEl.appendChild(wChips);
    }

    /* ─ Чипсы начинок ─ */
    if (product.fillings && product.fillings.length > 0) {
      /* Дефолтная начинка — первая */
      state.selectedFilling = product.fillings[0].id;

      var fLabel = document.createElement('div');
      fLabel.className   = 'modal__option-label';
      fLabel.textContent = 'Начинка';
      fLabel.id          = 'fillingLabel';
      optionsEl.appendChild(fLabel);

      var fChips = document.createElement('div');
      fChips.className = 'modal__chips';
      fChips.setAttribute('role', 'group');
      fChips.setAttribute('aria-labelledby', 'fillingLabel');

      product.fillings.forEach(function (f, idx) {
        var chip = document.createElement('button');
        chip.type      = 'button';
        chip.className = 'chip' + (idx === 0 ? ' is-active' : '');
        chip.textContent = f.label;
        chip.setAttribute('aria-pressed', String(idx === 0));
        chip.setAttribute('data-filling-id', f.id);

        chip.addEventListener('click', function () {
          state.selectedFilling = f.id;

          fChips.querySelectorAll('.chip').forEach(function (c, i) {
            c.classList.toggle('is-active', i === idx);
            c.setAttribute('aria-pressed', String(i === idx));
          });
        });

        fChips.appendChild(chip);
      });

      optionsEl.appendChild(fChips);
    }

    contentEl.appendChild(optionsEl);

    /* ─ Степпер количества ─ */
    var qtyWrap = document.createElement('div');
    qtyWrap.className = 'modal__qty-wrap';

    var qtyLabel = document.createElement('div');
    qtyLabel.className   = 'modal__qty-label';
    qtyLabel.textContent = 'Количество';
    qtyLabel.id          = 'qtyLabel';
    qtyWrap.appendChild(qtyLabel);

    var stepper = document.createElement('div');
    stepper.className = 'modal__stepper';
    stepper.setAttribute('role', 'group');
    stepper.setAttribute('aria-labelledby', 'qtyLabel');

    var minusBtn = document.createElement('button');
    minusBtn.type      = 'button';
    minusBtn.className = 'modal__stepper-btn';
    minusBtn.setAttribute('aria-label', 'Уменьшить количество');
    minusBtn.textContent = '−';
    minusBtn.disabled = state.quantity <= 1;

    var valEl = document.createElement('div');
    valEl.className = 'modal__stepper-val';
    valEl.id        = 'modalStepperVal';
    valEl.setAttribute('aria-live', 'polite');
    valEl.setAttribute('aria-atomic', 'true');
    valEl.textContent = String(state.quantity);

    var plusBtn = document.createElement('button');
    plusBtn.type      = 'button';
    plusBtn.className = 'modal__stepper-btn';
    plusBtn.setAttribute('aria-label', 'Увеличить количество');
    plusBtn.textContent = '+';

    minusBtn.addEventListener('click', function () {
      if (state.quantity > 1) {
        state.quantity--;
        valEl.textContent  = String(state.quantity);
        minusBtn.disabled  = state.quantity <= 1;
        updatePrice();
      }
    });

    plusBtn.addEventListener('click', function () {
      state.quantity++;
      valEl.textContent = String(state.quantity);
      minusBtn.disabled = false;
      updatePrice();
    });

    stepper.appendChild(minusBtn);
    stepper.appendChild(valEl);
    stepper.appendChild(plusBtn);
    qtyWrap.appendChild(stepper);
    contentEl.appendChild(qtyWrap);

    contentEl.appendChild(buildDivider());

    /* ─ Итоговая цена ─ */
    var priceRow = document.createElement('div');
    priceRow.className = 'modal__price-row';

    var priceEl = document.createElement('div');
    priceEl.className = 'modal__price';
    priceEl.id        = 'modalPrice';
    priceEl.setAttribute('aria-live', 'polite');
    priceEl.setAttribute('aria-atomic', 'true');
    priceEl.textContent = formatPrice(calcCurrentPrice());
    priceRow.appendChild(priceEl);

    if (product.weights && product.weights.length > 0) {
      var priceNote = document.createElement('span');
      priceNote.className = 'modal__price-note';
      priceNote.id        = 'modalPriceNote';
      priceNote.textContent = '· ' + (product.weights[state.selectedWeight] || {}).label || '';
      priceRow.appendChild(priceNote);
    }

    contentEl.appendChild(priceRow);

    /* ─ Кнопка «+ В корзину» ─ */
    var addBtn = document.createElement('button');
    addBtn.type      = 'button';
    addBtn.className = 'modal__add-btn';
    addBtn.id        = 'modalAddBtn';
    addBtn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>' +
      '<span>В корзину</span>';
    addBtn.setAttribute('aria-label', 'Добавить ' + product.name + ' в корзину');

    addBtn.addEventListener('click', function () {
      var cartItem = {
        id:       product.id,
        name:     product.name,
        weight:   product.weights ? product.weights[state.selectedWeight] : null,
        filling:  state.selectedFilling
          ? (product.fillings || []).find(function (f) { return f.id === state.selectedFilling; })
          : null,
        quantity: state.quantity,
        price:    calcCurrentPrice(),
        image:    product.images[0] || '',
      };

      window.addToCart(cartItem);

      /* Анимация подтверждения */
      addBtn.classList.add('is-added');
      addBtn.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
          '<path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>' +
        '<span>Добавлено!</span>';

      setTimeout(function () {
        addBtn.classList.remove('is-added');
        addBtn.innerHTML =
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
            '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
          '</svg>' +
          '<span>В корзину</span>';
      }, 1800);
    });

    contentEl.appendChild(addBtn);

    return contentEl;
  }

  function buildDivider() {
    var hr = document.createElement('hr');
    hr.className = 'modal__divider';
    return hr;
  }

  /* ── ПЕРЕСЧЁТ ЦЕНЫ ───────────────────────────────────────── */

  function updatePrice() {
    var priceEl    = modalEl && modalEl.querySelector('#modalPrice');
    var priceNote  = modalEl && modalEl.querySelector('#modalPriceNote');
    if (!priceEl) return;

    /* Мигание при изменении */
    priceEl.classList.add('is-updating');
    priceEl.textContent = formatPrice(calcCurrentPrice());

    if (priceNote && state.product && state.product.weights) {
      var w = state.product.weights[state.selectedWeight];
      priceNote.textContent = w ? '· ' + w.label : '';
    }

    setTimeout(function () {
      if (priceEl) priceEl.classList.remove('is-updating');
    }, 250);
  }

  /* ── СБОРКА И ПОКАЗ МОДАЛКИ ──────────────────────────────── */

  function buildModal(product) {
    /* Сбрасываем состояние */
    state.product         = product;
    state.slideIndex      = 0;
    state.selectedWeight  = 0;
    state.selectedFilling = null;
    state.quantity        = 1;

    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modalTitle');

    /* Кнопка закрытия (абсолютная, поверх обоих колонок) */
    var closeBtn = document.createElement('button');
    closeBtn.type      = 'button';
    closeBtn.className = 'modal__close';
    closeBtn.setAttribute('aria-label', 'Закрыть');
    closeBtn.innerHTML =
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">' +
        '<path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
      '</svg>';
    closeBtn.addEventListener('click', closeModal);
    modal.appendChild(closeBtn);

    /* Галерея */
    modal.appendChild(buildGallery(product));

    /* Контент */
    modal.appendChild(buildContent(product));

    return modal;
  }

  /* ── ОТКРЫТЬ МОДАЛКУ ─────────────────────────────────────── */

  function openModal(productId) {
    var product = getProductById(productId);
    if (!product) {
      console.warn('[Modal] Товар не найден:', productId);
      return;
    }

    if (!containerEl || !overlayEl) {
      console.error('[Modal] #modalContainer или #modalOverlay не найден в DOM.');
      return;
    }

    /* Убираем старое содержимое */
    containerEl.innerHTML = '';

    /* Строим новую модалку */
    modalEl = buildModal(product);
    containerEl.appendChild(modalEl);

    /* Компенсация scrollbar */
    var sbW = getScrollbarWidth();
    document.documentElement.style.setProperty('--scrollbar-width', sbW + 'px');

    /* Показываем */
    document.body.classList.add('modal-open');
    containerEl.hidden = false;
    overlayEl.hidden   = false;
    containerEl.removeAttribute('aria-hidden');
    overlayEl.removeAttribute('aria-hidden');

    /* Запускаем transition через два rAF (чтобы браузер успел отрисовать) */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlayEl.classList.add('is-visible');
        containerEl.classList.add('is-visible');
        modalEl.classList.add('is-visible');
      });
    });

    state.isOpen = true;

    /* Фокус на заголовок */
    setTimeout(function () {
      var titleEl = modalEl && modalEl.querySelector('#modalTitle');
      if (titleEl) {
        titleEl.setAttribute('tabindex', '-1');
        titleEl.focus({ preventScroll: true });
      }
    }, 350);
  }

  /* ── ЗАКРЫТЬ МОДАЛКУ ─────────────────────────────────────── */

  function closeModal() {
    if (!state.isOpen) return;

    overlayEl.classList.remove('is-visible');
    containerEl.classList.remove('is-visible');
    if (modalEl) modalEl.classList.remove('is-visible');

    setTimeout(function () {
      containerEl.hidden = true;
      overlayEl.hidden   = true;
      containerEl.setAttribute('aria-hidden', 'true');
      overlayEl.setAttribute('aria-hidden', 'true');
      containerEl.innerHTML = '';
      modalEl = null;
      document.body.classList.remove('modal-open');
      document.documentElement.style.removeProperty('--scrollbar-width');
    }, 360);  /* совпадает с --duration-slow */

    state.isOpen = false;
  }

  /* ── ЛОВУШКА ФОКУСА (FOCUS TRAP) ────────────────────────── */

  function trapFocus(e) {
    if (!state.isOpen || !modalEl) return;

    var focusable = Array.from(modalEl.querySelectorAll(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ));

    if (focusable.length === 0) return;

    var first = focusable[0];
    var last  = focusable[focusable.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    if (e.key === 'Escape') {
      closeModal();
    }
  }

  /* ── ИНИЦИАЛИЗАЦИЯ ───────────────────────────────────────── */

  function init() {
    containerEl = document.getElementById('modalContainer');
    overlayEl   = document.getElementById('modalOverlay');

    if (!containerEl || !overlayEl) {
      console.warn('[Modal] Элементы #modalContainer / #modalOverlay не найдены.');
      return;
    }

    /* Overlay — клик закрывает */
    overlayEl.addEventListener('click', closeModal);

    /* Клавиатурные обработчики — глобальные */
    document.addEventListener('keydown', trapFocus);

    /* Переопределяем глобальную заглушку из catalog.js */
    window.openProductModal  = openModal;
    window.closeProductModal = closeModal;
  }

  /* ── ЗАПУСК ──────────────────────────────────────────────── */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── ПУБЛИЧНЫЙ API ───────────────────────────────────────── */

  window.ModalModule = {
    open:  openModal,
    close: closeModal,
  };

}());
