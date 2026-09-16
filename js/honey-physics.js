/**
 * honey-physics.js
 * =================================================================
 * Мамины секреты — анимация «медовой струи» при скролле.
 *
 * Механика:
 *   1. Следим за позицией прокрутки через IntersectionObserver + scroll.
 *   2. При скролле вниз от Hero к каталогу SVG-кривая Безье (path)
 *      «тянется» от донышка банки вниз, сужаясь в талии.
 *   3. На конце струи рисуется эллипс-капля, которая «набухает»
 *      и при достижении триггера «отрывается» и растворяется.
 *   4. При обратном скролле струя убирается.
 *   5. Всё рендерится через requestAnimationFrame — без просадок FPS.
 *
 * SVG-элементы (уже в DOM из index.html):
 *   #honeyPhysicsSvg   — корневой SVG-контейнер
 *   #honeyStream       — <path> струи (fill, кривые Безье)
 *   #honeyDrop         — <ellipse> капли
 *
 * Ориентиры:
 *   #honeyJarImg       — банка мёда (из него берём координаты)
 *   #catalog           — секция каталога (нижний триггер)
 * =================================================================
 */

'use strict';

(function HoneyPhysics() {

  /* ── КОНСТАНТЫ ───────────────────────────────────────────── */

  /** Янтарный цвет струи (совпадает с CSS --color-amber-dark) */
  const COLOR_STREAM = '#D97706';
  const COLOR_DROP   = '#F59E0B';

  /** Минимальная ширина (полутолщина) струи у банки, px */
  const STREAM_WIDTH_TOP    = 7;
  /** Минимальная ширина (талия) в середине, px */
  const STREAM_WIDTH_WAIST  = 2;
  /** Ширина внизу у капли, px */
  const STREAM_WIDTH_BOTTOM = 4;

  /** Размер капли в покое, px */
  const DROP_RX_MIN = 6;
  const DROP_RY_MIN = 8;
  /** Размер капли «набухшей» перед отрывом, px */
  const DROP_RX_MAX = 14;
  const DROP_RY_MAX = 19;

  /** Скролл-диапазон, в котором работает анимация, px */
  const SCROLL_START  = 0;   // px от верха hero — начало вытягивания
  const SCROLL_FULL   = 500; // px — струя полностью вытянута

  /** Минимальная длина струи для отображения, px */
  const MIN_STREAM_LEN = 20;

  /** Отношение: где находится «талия» по длине струи [0..1] */
  const WAIST_T = 0.45;

  /** Задержка в мс: плавность «возврата» при прокрутке вверх */
  const LERP_FACTOR = 0.12;


  /* ── СОСТОЯНИЕ ───────────────────────────────────────────── */

  const state = {
    /** Целевая длина струи (из скролла) */
    targetLen: 0,
    /** Текущая сглаженная длина (lerp) */
    currentLen: 0,
    /** Размер капли [0..1] */
    dropProgress: 0,
    /** Идёт ли RAF-цикл */
    rafRunning: false,
    /** ID текущего RAF */
    rafId: null,
    /** Была ли уже «оторвана» капля в текущем цикле */
    dropSplashed: false,
    /** Прогресс растворения капли после отрыва [0..1] */
    splashProgress: 0,
    /** Координата Y начала струи (низ банки), в viewport */
    originY: 0,
    /** Координата X центра струи */
    originX: 0,
  };


  /* ── ЭЛЕМЕНТЫ DOM ────────────────────────────────────────── */

  let svg, streamPath, dropEl, jarImg, catalogSection;
  let svgRect = null;

  function initElements() {
    svg            = document.getElementById('honeyPhysicsSvg');
    streamPath     = document.getElementById('honeyStream');
    dropEl         = document.getElementById('honeyDrop');
    jarImg         = document.getElementById('honeyJarImg');
    catalogSection = document.getElementById('catalog');

    if (!svg || !streamPath || !dropEl || !jarImg) {
      console.warn('[HoneyPhysics] SVG-элементы не найдены, анимация отключена.');
      return false;
    }
    return true;
  }


  /* ── ВЫЧИСЛЕНИЕ КООРДИНАТ ────────────────────────────────── */

  /**
   * Обновляет originX/originY — точку выхода струи из банки.
   * Вызывается при ресайзе и перед каждым raf-кадром (дёшево через кэш).
   */
  function updateOrigin() {
    if (!jarImg) return;
    const jarRect = jarImg.getBoundingClientRect();
    svgRect       = svg.getBoundingClientRect();

    // Центр X банки — строго по горизонтали
    state.originX = jarRect.left + jarRect.width / 2 - svgRect.left;
    // Донышко банки — строго нижний видимый край, минус 6px вглубь
    state.originY = jarRect.bottom - svgRect.top - 6;
  }


  /* ── ОБРАБОТКА СКРОЛЛА ───────────────────────────────────── */

  function onScroll() {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const heroRect = heroEl.getBoundingClientRect();
    // Сколько пикселей Hero ушло вверх за верхний край вьюпорта
    const scrolled = Math.max(0, -heroRect.top);

    // Прогресс [0..1] скролла в нашем рабочем диапазоне
    const progress = Math.min(1, Math.max(0,
      (scrolled - SCROLL_START) / (SCROLL_FULL - SCROLL_START)
    ));

    // Реальная длина SVG-пути от банки вниз
    // = расстояние от низа банки до верха каталога
    let maxLen = 0;
    if (catalogSection) {
      const catRect = catalogSection.getBoundingClientRect();
      maxLen = Math.max(0, catRect.top - (jarImg.getBoundingClientRect().bottom));
    } else {
      maxLen = window.innerHeight * 0.55;
    }

    state.targetLen     = progress * maxLen;
    state.dropProgress  = progress;

    if (!state.rafRunning) startRaf();
  }


  /* ── LERP-УТИЛИТА ────────────────────────────────────────── */

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }


  /* ── ПОСТРОЕНИЕ SVG-PATH ─────────────────────────────────── */

  /**
   * Рисует двустороннюю кривую Безье — «каплевидная» форма струи:
   *  - широкая у банки (STREAM_WIDTH_TOP)
   *  - суженная в талии (STREAM_WIDTH_WAIST)
   *  - чуть шире у капли (STREAM_WIDTH_BOTTOM)
   *
   * @param {number} x   - X центра струи (SVG-координаты)
   * @param {number} y0  - Y начала (из банки)
   * @param {number} len - длина струи
   */
  function buildStreamPath(x, y0, len) {
    if (len < MIN_STREAM_LEN) {
      streamPath.setAttribute('d', '');
      return;
    }

    const y1 = y0 + len;               // конец струи (верх капли)
    const yW = y0 + len * WAIST_T;     // Y талии

    /* Контрольные точки для плавного сужения:
       Левая сторона — движется от x-TOP к x-WAIST к x-BOTTOM */
    const cp1x_L = x - STREAM_WIDTH_TOP;
    const cp1y   = y0 + len * 0.2;
    const cp2x_L = x - STREAM_WIDTH_WAIST;
    const cp2y   = yW;
    const cp3x_L = x - STREAM_WIDTH_BOTTOM;
    const cp3y   = y0 + len * 0.75;

    /* Аналогично правая сторона */
    const cp1x_R = x + STREAM_WIDTH_TOP;
    const cp3x_R = x + STREAM_WIDTH_BOTTOM;
    const cp2x_R = x + STREAM_WIDTH_WAIST;

    /* SVG path: левая сторона сверху вниз, правая — снизу вверх */
    const d = [
      /* Старт: верхняя левая точка у банки */
      `M ${x - STREAM_WIDTH_TOP} ${y0}`,
      /* Кривая вниз по левой стороне */
      `C ${cp1x_L} ${cp1y}, ${cp2x_L} ${cp2y}, ${cp3x_L} ${cp3y}`,
      /* Линия к нижней точке (плоское дно перед каплей) */
      `L ${x - STREAM_WIDTH_BOTTOM} ${y1}`,
      /* Дно — плавная дуга под каплю */
      `Q ${x} ${y1 + STREAM_WIDTH_BOTTOM * 0.5} ${x + STREAM_WIDTH_BOTTOM} ${y1}`,
      /* Правая сторона снизу вверх */
      `C ${cp3x_R} ${cp3y}, ${cp2x_R} ${cp2y}, ${cp1x_R} ${cp1y}`,
      /* Возврат к верхней правой точке */
      `L ${x + STREAM_WIDTH_TOP} ${y0}`,
      /* Верхний заход — плавная дуга у банки */
      `Q ${x} ${y0 - STREAM_WIDTH_TOP * 0.4} ${x - STREAM_WIDTH_TOP} ${y0}`,
      `Z`,
    ].join(' ');

    streamPath.setAttribute('d', d);
  }


  /* ── РИСОВАНИЕ КАПЛИ ─────────────────────────────────────── */

  /**
   * Анимирует каплю: набухание при приближении к каталогу,
   * затем «отрыв» и плавное растворение.
   *
   * @param {number} cx         - X центра капли
   * @param {number} cy         - Y центра (низ струи)
   * @param {number} dropProg   - прогресс [0..1]
   * @param {number} len        - текущая длина струи
   */
  function drawDrop(cx, cy, dropProg, len) {
    if (len < MIN_STREAM_LEN) {
      hideDrop();
      return;
    }

    /* Набухание: rx/ry растут с прогрессом */
    const t   = clamp(dropProg, 0, 1);
    const eased = easeOutCubic(t);
    const rx  = lerp(DROP_RX_MIN, DROP_RX_MAX, eased);
    const ry  = lerp(DROP_RY_MIN, DROP_RY_MAX, eased);

    /* Капля чуть ниже конца струи */
    const dropCY = cy + ry * 0.85;

    dropEl.setAttribute('cx', cx.toFixed(1));
    dropEl.setAttribute('cy', dropCY.toFixed(1));
    dropEl.setAttribute('rx', rx.toFixed(1));
    dropEl.setAttribute('ry', ry.toFixed(1));

    /* Прозрачность: появляется плавно, исчезает при отрыве */
    const opacity = state.dropSplashed
      ? clamp(1 - state.splashProgress * 3, 0, 1)
      : clamp(t * 4, 0, 1);

    dropEl.setAttribute('opacity', opacity.toFixed(3));
  }

  function hideDrop() {
    dropEl.setAttribute('opacity', '0');
    dropEl.setAttribute('rx', '0');
    dropEl.setAttribute('ry', '0');
  }


  /* ── EASING ──────────────────────────────────────────────── */

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }


  /* ── RAF ЦИКЛ ────────────────────────────────────────────── */

  function rafLoop() {
    updateOrigin();

    /* Сглаживание (lerp) текущей длины к целевой */
    const prevLen    = state.currentLen;
    state.currentLen = lerp(state.currentLen, state.targetLen, LERP_FACTOR);

    /* Стоп-условие: длина уже почти равна цели и очень мала */
    const atRest = Math.abs(state.currentLen - state.targetLen) < 0.3;
    const nearZero = state.currentLen < 0.5 && state.targetLen < 0.5;

    if (atRest && nearZero) {
      /* Ничего не рисуем, останавливаем цикл */
      streamPath.setAttribute('d', '');
      hideDrop();
      stopRaf();
      return;
    }

    /* Прогресс капли — по текущей сглаженной длине */
    const maxLen = state.targetLen > 0 ? state.targetLen / Math.max(state.dropProgress, 0.001) : 1;
    const dropP  = maxLen > 0 ? state.currentLen / SCROLL_FULL : 0;

    /* Рисуем */
    buildStreamPath(state.originX, state.originY, state.currentLen);
    drawDrop(
      state.originX,
      state.originY + state.currentLen,
      clamp(dropP, 0, 1),
      state.currentLen
    );

    state.rafId = requestAnimationFrame(rafLoop);
  }

  function startRaf() {
    if (state.rafRunning) return;
    state.rafRunning = true;
    state.rafId = requestAnimationFrame(rafLoop);
  }

  function stopRaf() {
    state.rafRunning = false;
    if (state.rafId) {
      cancelAnimationFrame(state.rafId);
      state.rafId = null;
    }
  }


  /* ── ОБРАБОТКА РЕСАЙЗА ───────────────────────────────────── */

  let resizeTimeout = null;

  function onResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      updateOrigin();
      if (!state.rafRunning && state.currentLen > 1) {
        startRaf();
      }
    }, 150);
  }


  /* ── ИНИЦИАЛИЗАЦИЯ ───────────────────────────────────────── */

  function init() {
    if (!initElements()) return;

    /* Настраиваем SVG: заливки */
    streamPath.setAttribute('fill', 'url(#honeyStreamGrad)');
    dropEl.setAttribute('fill', 'url(#honeyDropGrad)');
    dropEl.setAttribute('opacity', '0');

    /* Первичный расчёт координат (после paint) */
    requestAnimationFrame(function () {
      /* Если банка уже загружена — считаем сразу */
      if (jarImg.complete && jarImg.naturalWidth > 0) {
        updateOrigin();
      } else {
        /* PNG ещё грузится — ждём onload */
        jarImg.addEventListener('load', function onJarLoad() {
          jarImg.removeEventListener('load', onJarLoad);
          updateOrigin();
          onScroll();
        });
      }

      /* Если страница уже прокручена при загрузке */
      onScroll();
    });

    /* Слушатели */
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
  }

  /* Запуск после загрузки DOM */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── ПУБЛИЧНЫЙ API (для тестов и других модулей) ─────────── */
  window.HoneyPhysics = {
    reinit: init,
    stop:   stopRaf,
  };

}());
