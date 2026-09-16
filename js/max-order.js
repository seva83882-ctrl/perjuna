
'use strict';

(function MaxOrderModule() {

  var PERZHANA_PROFILE_URL = 'https://max.ru/u/f9LHodD0cOKIkqc_DjoWhKi0wOB2ucqjeyabncgshGBz-TIAllIMQ8ncGSk';

  var BRAND_NAME = 'Мамины секреты';


  /* ── ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ФОРМАТИРОВАНИЯ ──────────────── */

  function formatLine(item, index) {
    var parts = [];

    parts.push(item.name);

    if (item.filling && item.filling.label) {
      parts.push(item.filling.label);
    }

    if (item.weight && item.weight.label) {
      parts.push(item.weight.label);
    }

    var lineTotal = item.unitPrice * item.quantity;
    var qtyStr = item.quantity > 1
      ? item.quantity + ' шт.'
      : '1 шт.';

    var priceStr = typeof formatPrice === 'function'
      ? formatPrice(lineTotal)
      : lineTotal + ' ₽';

    return (index + 1) + '. ' + parts.join(', ') + ' — ' + qtyStr + ' = ' + priceStr;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    var parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return parts[2] + '.' + parts[1] + '.' + parts[0];
  }

  function hasPreOrderItems(cart) {
    return cart.some(function (item) {
      var product = typeof getProductById === 'function'
        ? getProductById(item.id)
        : null;
      return product && product.category === 'pre-order';
    });
  }


  /* ── ПОСТРОЕНИЕ ТЕКСТА ЗАКАЗА ────────────────────────────── */

  function buildMessage(cart, options) {
    var lines = [];

    lines.push('Здравствуйте! Хочу оформить заказ в «' + BRAND_NAME + '»:');
    lines.push('');

    /* Список позиций */
    cart.forEach(function (item, idx) {
      lines.push(formatLine(item, idx));
    });

    /* Предупреждение о выпечке под заказ */
    if (hasPreOrderItems(cart)) {
      lines.push('');
      lines.push('⚠️ В заказе есть позиции под заказ к дате (от 2 дней).');
    }

    /* Желаемая дата */
    var dateFormatted = formatDate((options && options.date) || '');
    if (dateFormatted) {
      lines.push('');
      lines.push('📅 Желаемая дата: ' + dateFormatted);
    }

    /* Комментарий (без слова Адрес и Доставка) */
    var comment = (options && options.comment || '').trim();
    if (comment) {
      lines.push('');
      lines.push('💬 Комментарий к заказу: ' + comment);
    }

    /* Итоговая сумма */
    var total = cart.reduce(function (sum, item) {
      return sum + item.unitPrice * item.quantity;
    }, 0);

    var totalStr = typeof formatPrice === 'function'
      ? formatPrice(total)
      : total + ' ₽';

    lines.push('');
    lines.push('Итого к оплате: ' + totalStr);

    return lines.join('\n');
  }

  function showToastNotification(text) {
    var existingToast = document.getElementById('maxToastNotification');
    if (existingToast) {
      existingToast.remove();
    }

    var toast = document.createElement('div');
    toast.id = 'maxToastNotification';
    toast.textContent = text;

    /* Стили плашки уведомления */
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#24150e',
      color: '#ffffff',
      padding: '14px 24px',
      borderRadius: '10px',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '1.4',
      textAlign: 'center',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
      zIndex: '100000',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      opacity: '0',
      pointerEvents: 'none',
      maxWidth: '90%',
    });

    document.body.appendChild(toast);

    /* Анимация появления */
    requestAnimationFrame(function () {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(-6px)';
    });

    /* Удаление плашки через 4 секунды */
    setTimeout(function () {
      toast.style.opacity = '0';
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 4000);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      /* Запасной вариант для старых браузеров или не-HTTPS */
      var textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise(function (resolve, reject) {
        document.execCommand('copy') ? resolve() : reject();
        textArea.remove();
      });
    }
  }

  function sendOrderToMax(cart, options) {
    if (!cart || cart.length === 0) {
      alert('Корзина пуста. Добавьте товары перед оформлением заказа.');
      return;
    }

    var message = buildMessage(cart, options || {});

    copyToClipboard(message)
      .then(function () {
        /* 3. Показываем уведомление пользователю */
        showToastNotification('✓ Заказ скопирован в буфер! Открываем MAX, просто вставьте сообщение...');
      })
      .catch(function () {
        showToastNotification('Открываем MAX...');
      });

    setTimeout(function () {
      var targetUrl = PERZHANA_PROFILE_URL;

      var win = window.open(targetUrl, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = targetUrl;
      }

      /* Очищаем корзину */
      if (typeof window.CartModule !== 'undefined' &&
          typeof window.CartModule.clearCart === 'function') {
        window.CartModule.clearCart();
        if (typeof window.CartModule.closeDrawer === 'function') {
          window.CartModule.closeDrawer();
        }
      }
    }, 1000);
  }

  window.sendOrderToMax = sendOrderToMax;

  window.MaxOrderModule = {
    buildMessage: buildMessage,
    send: sendOrderToMax,
  };

}());