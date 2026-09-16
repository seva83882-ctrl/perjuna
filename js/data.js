/* =============================================================
   МАМИНЫ СЕКРЕТЫ — Каталог товаров (js/data.js)
   Выверенные цены и фасовки мастера Пержаны.
   ============================================================= */

var PRODUCTS_DATA = {

  /* ═══════════════════════════════════════════════════════════
     ВСЕГДА В НАЛИЧИИ (Пасека и сборы)
     ═══════════════════════════════════════════════════════════ */
  'in-stock': [

   {
      id: 'honey-glass',
      category: 'in-stock',
      name: 'Мёд пасечный натуральный',
      subtitle: 'Ведёрко 1 л (~1.5 кг) прямо с пасеки · от 1 100 ₽',
      description:
        'Собственная семейная пасека. Чистый натуральный мед без добавок, сахара и термической обработки. Фасуется в ведёрки объёмом 1 литр (около 1.5 кг чистого веса).',
      images: [
        'assets/catalog/in-stock/honey-glass-1.jpg',
        'assets/catalog/in-stock/honey-glass-2.jpg'
      ],
      weights: [
        { label: 'Разнотравье (1 л / ~1.5 кг) — 1 100 ₽', value: 1500, price: 1100 },
        { label: 'Гречишный (1 л / ~1.5 кг) — 1 100 ₽', value: 1500, price: 1100 },
        { label: 'Горный (1 л / ~1.5 кг) — 1 800 ₽', value: 1500, price: 1800 },
        { label: 'Дягилевый (1 л / ~1.5 кг) — 1 800 ₽', value: 1500, price: 1800 }
      ],
      fillings: null,
      basePrice: 1100,
      unit: 'ведёрко',
      popular: true
    },

    {
      id: 'honeycomb',
      category: 'in-stock',
      name: 'Мёд в сотах (цельная рамка)',
      subtitle: 'Цельная рамка прямо из улья (~1.5 кг)',
      description:
        'Свежий зрелый мед в натуральных восковых сотах. Продаётся только цельной рамкой прямо с пасеки, без нарезки. Вес рамки около 1.5 кг.',
      images: [
        'assets/catalog/in-stock/honeycomb.jpg'
      ],
      weights: [
        { label: 'Цельная рамка (~1.5 кг)', value: 1500, price: 2500 }
      ],
      fillings: null,
      basePrice: 2500,
      unit: 'рамка',
      popular: false
    },

    {
      id: 'ghee',
      category: 'in-stock',
      name: 'Сливочное топленое масло',
      subtitle: 'Домашняя медленная топка',
      description:
        'Натуральное сливочное масло, перетопленное вручную на медленном огне. Чистый янтарный цвет, нежный сливочный аромат, без молочного белка и лишней влаги.',
      images: [
        'assets/catalog/in-stock/ghee-1.jpg',
        'assets/catalog/in-stock/ghee-2.jpg'
      ],
      weights: [
        { label: 'Банка 500 г', value: 500, price: 750 },
        { label: 'Банка 1 кг', value: 1000, price: 1400 }
      ],
      fillings: null,
      basePrice: 750,
      unit: 'г',
      popular: false
    },

   {
      id: 'herbs',
      category: 'in-stock',
      name: 'Горные травы Дагестана',
      subtitle: 'Майский ручной сбор в крафт-пакетах (100 г)',
      description:
        'Майский сбор дикорастущих трав с высокогорных полей Дагестана. Высушены естественным способом без потери эфирных масел.',
      images: [
        'assets/catalog/in-stock/herbs-1.jpg',
        'assets/catalog/in-stock/herbs-2.jpg',
        'assets/catalog/in-stock/herbs-3.jpg',
        'assets/catalog/in-stock/herbs-4.jpg'
      ],
      weights: [
        { label: 'Мята горная (крафт-пакет ~100 г) — 600 ₽', value: 100, price: 600 },
        { label: 'Чабрец душистый (крафт-пакет ~100 г) — 500 ₽', value: 100, price: 500 },
        { label: 'Полынь целебная (крафт-пакет ~100 г) — 500 ₽', value: 100, price: 500 }
      ],
      fillings: null,
      basePrice: 500,
      unit: 'пакет',
      popular: false
    },

    {
      id: 'bee-perga',
      category: 'in-stock',
      name: 'Перга пчелиная',
      subtitle: 'Пчелиный хлеб с пасеки, 1 100 ₽ за 100 г',
      description:
        'Чистая сотовая перга ручной выборки. Естественный природный источник витаминов и аминокислот для укрепления иммунитета.',
      images: [
        'assets/catalog/in-stock/bee-perga.jpg'
      ],
      weights: [
        { label: 'Пакетик 100 г', value: 100, price: 1100 }
      ],
      fillings: null,
      basePrice: 1100,
      unit: 'г',
      popular: false
    },

    {
      id: 'bee-pollen',
      category: 'in-stock',
      name: 'Пыльца цветочная',
      subtitle: 'Свежий сбор, 800 ₽ за 100 г',
      description:
        'Натуральная цветочная пыльца (обножка), собранная пчёлами на горных лугах. Отличная витаминная добавка к пище.',
      images: [
        'assets/catalog/in-stock/bee-pollen-1.jpg',
        'assets/catalog/in-stock/bee-pollen-2.jpg'
      ],
      weights: [
        { label: 'Пакетик 100 г', value: 100, price: 800 }
      ],
      fillings: null,
      basePrice: 800,
      unit: 'г',
      popular: false
    },

    {
      id: 'bee-podmor',
      category: 'in-stock',
      name: 'Пчелиный подмор',
      subtitle: 'Для настоек и растирок, 1 100 ₽ за 100 г',
      description:
        'Сухой пчелиный подмор от здоровых пчелиных семей с нашей пасеки. Используется для домашних целебных настоек и растирок.',
      images: [
        'assets/catalog/in-stock/bee-podmor.jpg'
      ],
      weights: [
        { label: 'Пакетик 100 г', value: 100, price: 1100 }
      ],
      fillings: null,
      basePrice: 1100,
      unit: 'г',
      popular: false
    }

  ],

  /* ═══════════════════════════════════════════════════════════
     ПОД ЗАКАЗ К ДАТЕ (Выпечка и домашние торты)
     ═══════════════════════════════════════════════════════════ */
  'pre-order': [

    {
      id: 'cakes-custom',
      category: 'pre-order',
      name: 'Домашние торты на заказ',
      subtitle: 'От 1 100 ₽ до 1 800 ₽ за 1 кг',
      description:
        'Пеку вручную к вашей дате. Использую только натуральные сливки Petmol 33%, сливочное масло, творожный сыр и бельгийский шоколад. Без растительных жиров и маргарина. Минимальный вес торта 1.3–1.5 кг.',
      images: [
        'assets/catalog/pre-order/cake-01.jpg',
        'assets/catalog/pre-order/cake-02.jpg',
        'assets/catalog/pre-order/cake-03.jpg',
        'assets/catalog/pre-order/cake-04.jpg',
        'assets/catalog/pre-order/cake-05.jpg',
        'assets/catalog/pre-order/cake-06.jpg',
        'assets/catalog/pre-order/cake-07.jpg',
        'assets/catalog/pre-order/cake-08.jpg',
        'assets/catalog/pre-order/cake-09.jpg',
        'assets/catalog/pre-order/cake-10.jpg'
      ],
      weights: [
        { label: '1.3 - 1.5 кг (~1.4 кг)', value: 1400, price: 1540, mult: 1.4 },
        { label: '2 кг', value: 2000, price: 2200, mult: 2.0 },
        { label: '2.5 - 3 кг (~2.7 кг)', value: 2700, price: 2970, mult: 2.7 }
      ],
      fillings: [
        { id: 'spartak', label: 'Спартак (шоколадный медовик) — 1 100 ₽/кг', pricePerKg: 1100 },
        { id: 'medovik', label: 'Медовик (заварной / Petmol+сыр) — 1 700 ₽/кг', pricePerKg: 1700 },
        { id: 'napoleon', label: 'Наполеон (нежный заварной) — 1 800 ₽/кг', pricePerKg: 1800 },
        { id: 'snickers', label: 'Сникерс (арахис, карамель) — 1 800 ₽/кг', pricePerKg: 1800 },
        { id: 'red-velvet', label: 'Красный бархат — 1 800 ₽/кг', pricePerKg: 1800 }
      ],
      basePrice: 1540,
      unit: 'шт.',
      popular: true
    },

    {
      id: 'san-sebastian',
      category: 'pre-order',
      name: 'Чизкейк Сан-Себастьян',
      subtitle: 'Баскский сливочный чизкейк, 1 800 ₽ за кг',
      description:
        'Нежнейший чизкейк с обожженной карамельной корочкой и кремовой серединкой. Приготовлен на натуральных сливках Petmol 33% и творожном сыре, без муки.',
      images: [
        'assets/catalog/pre-order/san-sebastian-1.jpg',
        'assets/catalog/pre-order/san-sebastian-2.jpg'
      ],
      weights: [
        { label: '1 кг (целый чизкейк)', value: 1000, price: 1800 },
        { label: '1.5 кг', value: 1500, price: 2700 }
      ],
      fillings: null,
      basePrice: 1800,
      unit: 'кг',
      popular: true
    },

    {
      id: 'eclairs',
      category: 'pre-order',
      name: 'Заварные эклеры',
      subtitle: 'Заварной крем и бельгийский шоколад, 200 ₽ за шт.',
      description:
        'Тонкое домашнее заварное тесто на сливочном масле, наполненное нежным заварным кремом и политое настоящим бельгийским шоколадом.',
      images: [
        'assets/catalog/pre-order/eclairs.jpg'
      ],
      weights: [
        { label: '4 шт. (800 ₽)', value: 4, price: 800 },
        { label: '6 шт. (1 200 ₽)', value: 6, price: 1200 },
        { label: '10 шт. (2 000 ₽)', value: 10, price: 2000 }
      ],
      fillings: null,
      basePrice: 800,
      unit: 'набор',
      popular: false
    },

    {
      id: 'trifles',
      category: 'pre-order',
      name: 'Трайфлы в упаковке',
      subtitle: 'Упаковка 850 мл — 1 000 ₽',
      description:
        'Порционный десерт в удобной упаковке 850 мл: шоколадный бисквит, ягоды или банан, воздушный крем из натуральных сливок Petmol и бельгийский шоколад.',
      images: [
        'assets/catalog/pre-order/trifles-1.jpg',
        'assets/catalog/pre-order/trifles-2.jpg'
      ],
      weights: [
        { label: 'Упаковка 850 мл', value: 850, price: 1000 }
      ],
      fillings: [
        { id: 'strawberry', label: 'С клубникой' },
        { id: 'banana', label: 'С бананом' }
      ],
      basePrice: 1000,
      unit: 'упаковка',
      popular: false
    },

    {
      id: 'pakhlava',
      category: 'pre-order',
      name: 'Пахлава медовая',
      subtitle: 'Много орехов и горный мед, 1 800 ₽ за кг',
      description:
        'Традиционная домашняя пахлава: тончайшие слои теста, щедрая начинка из грецкого ореха и пропитка натуральным медом с пасеки.',
      images: [
        'assets/catalog/pre-order/pakhlava.jpg'
      ],
      weights: [
        { label: '500 г (коробка)', value: 500, price: 900 },
        { label: '1 кг (коробка)', value: 1000, price: 1800 }
      ],
      fillings: null,
      basePrice: 900,
      unit: 'г',
      popular: false
    },

    {
      id: 'bread-sloeny',
      category: 'pre-order',
      name: 'Слоёный дагестанский хлеб',
      subtitle: 'С ароматной ореховой травой',
      description:
        'Многослойный домашний хлеб ручной раскатки на сливочном масле с добавлением традиционной пряной ореховой травы.',
      images: [
        'assets/catalog/pre-order/bread.jpg'
      ],
      weights: [
        { label: '1 шт. (~400 г)', value: 400, price: 400 },
        { label: '3 шт.', value: 1200, price: 1100 }
      ],
      fillings: null,
      basePrice: 400,
      unit: 'шт.',
      popular: false
    },

    {
      id: 'chudu',
      category: 'pre-order',
      name: 'Чуду с курицей и картошкой',
      subtitle: 'Лезгинский сытный пирог, вес ~1.3 кг',
      description:
        'Традиционный пирог чуду с куриным филе, картошкой, луком и топленым сливочным маслом. Выпекается строго ко времени самовывоза.',
      images: [
        'assets/catalog/pre-order/chudu.jpg'
      ],
      weights: [
        { label: '1 пирог (~1.3 кг)', value: 1300, price: 1100 }
      ],
      fillings: null,
      basePrice: 1100,
      unit: 'шт.',
      popular: false
    }

  ]

};

/* ─── ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (ГЛОБАЛЬНЫЙ ЭКСПОРТ) ───────── */

window.PRODUCTS_DATA = PRODUCTS_DATA;

window.getProductById = function(id) {
  var inStock = PRODUCTS_DATA['in-stock'] || [];
  var preOrder = PRODUCTS_DATA['pre-order'] || [];
  var all = inStock.concat(preOrder);
  for (var i = 0; i < all.length; i++) {
    if (all[i].id === id) {
      return all[i];
    }
  }
  return null;
};

window.getProductsByCategory = function(category) {
  return PRODUCTS_DATA[category] ? PRODUCTS_DATA[category] : [];
};

window.formatPrice = function(price) {
  return (typeof price === 'number' ? price : 0).toLocaleString('ru-RU') + ' \u20BD';
};

window.getProductThumbnail = function(product) {
  return (product && product.images && product.images.length > 0) ? product.images[0] : '';
};
