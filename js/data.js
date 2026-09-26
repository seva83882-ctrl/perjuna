/* =============================================================
   МАМИНЫ СЕКРЕТЫ — Каталог товаров (js/data.js)
   Выверенные цены и фасовки мастера Пержаны.
   ============================================================= */

var PRODUCTS_DATA = {

  /* ═══════════════════════════════════════════════════════════
     ВСЕГДА В НАЛИЧИИ (Пасека Алтая и горные сборы Дагестана)
     ═══════════════════════════════════════════════════════════ */
  'in-stock': [

    {
      id: 'honey-glass',
      category: 'in-stock',
      name: 'Мёд пасечный натуральный',
      subtitle: 'Семейная пасека, Алтайский край · ведёрко 1 л (~1.5 кг)',
      description:
        'Собственная семейная пасека в экологически чистом районе Алтайского края. Натуральный зрелый мёд без сахара, добавок и термической обработки. Фасуется в ведёрки объёмом 1 литр (около 1.5 кг чистого веса).',
      images: [
        '/assets/catalog/in-stock/honey-glass-1.jpg',
        '/assets/catalog/in-stock/honey-glass-2.jpg'
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
      subtitle: 'Пасека Алтая · цельная рамка из улья (~1.5 кг)',
      description:
        'Свежий зрелый мёд в запечатанных восковых сотах с нашей алтайской пасеки. Продаётся только цельной деревянной рамкой, без нарезки, сохраняя первозданную пользу.',
      images: [
        '/assets/catalog/in-stock/honeycomb.jpg'
      ],
      weights: [
        { label: 'Цельная рамка (~1.5 кг) — 2 500 ₽', value: 1500, price: 2500 }
      ],
      fillings: null,
      basePrice: 2500,
      unit: 'рамка',
      popular: false
    },

    {
      id: 'herbs',
      category: 'in-stock',
      name: 'Горные травы Дагестана',
      subtitle: 'Майский сбор трав · крафт-пакет 18×25 см',
      description:
        'Майский ручной сбор дикорастущих трав с высокогорных лугов Дагестана. Высушены естественным способом в тени без потери эфирных масел и целебного аромата. Фасуются в большие крафт-пакеты 18×25 см.',
      images: [
        '/assets/catalog/in-stock/herbs-1.jpg',
        '/assets/catalog/in-stock/herbs-2.jpg',
        '/assets/catalog/in-stock/herbs-3.jpg',
        '/assets/catalog/in-stock/herbs-4.jpg'
      ],
      weights: [
        { label: 'Мята горная (крафт-пакет 18×25 см) — 600 ₽', value: 1, price: 600 },
        { label: 'Чабрец душистый (крафт-пакет 18×25 см) — 500 ₽', value: 1, price: 500 },
        { label: 'Полынь целебная (крафт-пакет 18×25 см) — 500 ₽', value: 1, price: 500 }
      ],
      fillings: null,
      basePrice: 500,
      unit: 'пакет',
      popular: true
    },

    {
      id: 'bee-perga',
      category: 'in-stock',
      name: 'Перга пчелиная',
      subtitle: 'Алтайский край · 1 100 ₽ за 100 г',
      description:
        'Чистая сотовая перга ручной выборки («пчелиный хлеб») с нашей пасеки на Алтае. Мощный природный биостимулятор и концентрат аминокислот для иммунитета.',
      images: [
        '/assets/catalog/in-stock/bee-perga.jpg'
      ],
      weights: [
        { label: 'Пакетик 100 г — 1 100 ₽', value: 100, price: 1100 }
      ],
      fillings: null,
      basePrice: 1100,
      unit: 'пакетик',
      popular: false
    },

    {
      id: 'bee-pollen',
      category: 'in-stock',
      name: 'Пыльца цветочная',
      subtitle: 'Свежий сбор, Алтай · 800 ₽ за 100 г',
      description:
        'Натуральная цветочная пыльца (пчелиная обножка) с медоносов Алтайского края. Натуральный витаминно-минеральный комплекс для бодрости и здоровья.',
      images: [
        '/assets/catalog/in-stock/bee-pollen-1.jpg',
        '/assets/catalog/in-stock/bee-pollen-2.jpg'
      ],
      weights: [
        { label: 'Пакетик 100 г — 800 ₽', value: 100, price: 800 }
      ],
      fillings: null,
      basePrice: 800,
      unit: 'пакетик',
      popular: false
    },

    {
      id: 'bee-podmor',
      category: 'in-stock',
      name: 'Пчелиный подмор',
      subtitle: 'Алтайская пасека · 1 100 ₽ за 100 г',
      description:
        'Качественный сухой подмор от здоровых семей с алтайской пасеки. Богат хитозаном и меланином. Применяется для приготовления домашних настоек и растирок.',
      images: [
        '/assets/catalog/in-stock/bee-podmor.jpg'
      ],
      weights: [
        { label: 'Пакетик 100 г — 1 100 ₽', value: 100, price: 1100 }
      ],
      fillings: null,
      basePrice: 1100,
      unit: 'пакетик',
      popular: false
    },

    {
      id: 'ghee',
      category: 'in-stock',
      name: 'Сливочное топленое масло',
      subtitle: 'Домашняя медленная топка',
      description:
        'Натуральное сливочное масло, перетопленное вручную на медленном огне по старинному рецепту. Чистый янтарный цвет, нежный сливочный аромат, без молочного белка и примесей.',
      images: [
        '/assets/catalog/in-stock/ghee-1.jpg',
        '/assets/catalog/in-stock/ghee-2.jpg'
      ],
      weights: [
        { label: 'Банка 500 г — 750 ₽', value: 500, price: 750 },
        { label: 'Банка 1 кг — 1 400 ₽', value: 1000, price: 1400 }
      ],
      fillings: null,
      basePrice: 750,
      unit: 'банка',
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
      subtitle: 'От 1 700 ₽ до 1 800 ₽ за 1 кг',
      description:
        'Пеку вручную к вашей дате. Использую только натуральные сливки Petmol 33%, сливочное масло, творожный сыр и бельгийский шоколад. Без растительных жиров и маргарина. Минимальный вес торта 1.3–1.5 кг.',
      images: [
        'assets/catalog/pre-order/cake-01.jpg',
        'assets/catalog/pre-order/cake-02.jpg',
        'assets/catalog/pre-order/cake-03.jpg',
        'assets/catalog/pre-order/cake-04.jpg',
        'assets/catalog/pre-order/cake-05.jpg',
        'assets/catalog/pre-order/cake-06.jpg'
      ],
      weights: [
        { label: '1.3 - 1.5 кг (~1.4 кг)', value: 1400, price: 2380, mult: 1.4 },
        { label: '2 кг', value: 2000, price: 3400, mult: 2.0 },
        { label: '2.5 - 3 кг (~2.7 кг)', value: 2700, price: 4590, mult: 2.7 }
      ],
      fillings: [
        { id: 'medovik', label: 'Торт «Медовик» — 1 700 ₽/кг', pricePerKg: 1700 },
        { id: 'medovik-choc', label: 'Торт «Медовик Шоколадный» — 1 700 ₽/кг', pricePerKg: 1700 },
        { id: 'spartak', label: 'Торт «Спартак» — 1 700 ₽/кг', pricePerKg: 1700 },
        { id: 'fruit-biscuit', label: 'Торт «Фруктовый Бисквитный» — 1 700 ₽/кг', pricePerKg: 1700 },
        { id: 'napoleon', label: 'Торт «Господин Наполеон» — 1 800 ₽/кг', pricePerKg: 1800 },
        { id: 'snickers', label: 'Торт «Сникерс» — 1 800 ₽/кг', pricePerKg: 1800 }
      ],
      basePrice: 2380,
      unit: 'шт.',
      popular: true
    },

    {
      id: 'san-sebastian',
      category: 'pre-order',
      name: 'Чизкейк Сан-Себастьян',
      subtitle: 'Баскский сливочный чизкейк, 2 000 ₽ за 1 кг',
      description:
        'Нежнейший чизкейк с обожженной карамельной корочкой и кремовой серединкой. Приготовлен на натуральных сливках Petmol 33% и творожном сыре, без муки.',
      images: [
        'assets/catalog/pre-order/san-sebastian-1.jpg',
        'assets/catalog/pre-order/san-sebastian-2.jpg'
      ],
      weights: [
        { label: '1/6', value: 160, price: 400 },
        { label: '1 kg', value: 1000, price: 2000 }
      ],
      fillings: null,
      basePrice: 400,
      unit: 'шт.',
      popular: true
    },

    {
      id: 'eclairs',
      category: 'pre-order',
      name: 'Эклер «Заварной крем»',
      subtitle: '220 ₽ за шт.',
      description:
        'Тонкое домашнее заварное тесто на сливочном масле, наполненное нежным заварным кремом и политое настоящим бельгийским шоколадом.',
      images: [
        'assets/catalog/pre-order/eclairs.jpg'
      ],
      weights: [
        { label: '1 шт.', value: 1, price: 220 }
      ],
      fillings: null,
      basePrice: 220,
      unit: 'шт.',
      popular: false
    },

    {
      id: 'trifles',
      category: 'pre-order',
      name: 'Трайфлы 850ml',
      subtitle: '1 000 ₽',
      description:
        'Порционный десерт в удобной упаковке 850 мл: воздушный бисквит, крем из натуральных сливок Petmol и бельгийский шоколад.',
      images: [
        'assets/catalog/pre-order/trifles-1.jpg'
      ],
      weights: [
        { label: '850 ml', value: 850, price: 1000 }
      ],
      fillings: [
        { id: 'milk-banana', label: 'Молочный шоколад «Банан» — 1000₽' },
        { id: 'milk-snickers', label: 'Молочный шоколад «Сникерс» — 1000₽' },
        { id: 'white-banana', label: 'Белый шоколад «Банан» — 1000₽' }
      ],
      basePrice: 1000,
      unit: 'упаковка',
      popular: false
    },

    {
      id: 'pakhlava',
      category: 'pre-order',
      name: 'Пахлава «Грецкий орех»',
      subtitle: '1kg - 1800₽',
      description:
        'Традиционная домашняя пахлава: тончайшие слои теста, щедрая начинка из грецкого ореха и пропитка натуральным медом с пасеки.',
      images: [
        'assets/catalog/pre-order/pakhlava.jpg'
      ],
      weights: [
        { label: '1 kg', value: 1000, price: 1800 }
      ],
      fillings: null,
      basePrice: 1800,
      unit: 'kg',
      popular: false
    },

    {
      id: 'trubochki',
      category: 'pre-order',
      name: 'Трубочки «Грецкий орех»',
      subtitle: '1kg - 1600₽',
      description:
        'Хрустящие домашние трубочки с начинкой из отборного грецкого ореха.',
      images: [
        'assets/catalog/pre-order/trubki.jpg'
      ],
      weights: [
        { label: '1 kg', value: 1000, price: 1600 }
      ],
      fillings: null,
      basePrice: 1600,
      unit: 'kg',
      popular: false
    },

    {
      id: 'bread-sloeny',
      category: 'pre-order',
      name: 'Хлеб Слоенный «На топленном масле с ореховой травой»',
      subtitle: '400₽',
      description:
        'Многослойный домашний хлеб ручной раскатки на топленом масле с добавлением традиционной пряной ореховой травы.',
      images: [
        'assets/catalog/pre-order/bread.jpg'
      ],
      weights: [
        { label: '1 шт.', value: 1, price: 400 }
      ],
      fillings: null,
      basePrice: 400,
      unit: 'шт.',
      popular: false
    },

    {
      id: 'chudu',
      category: 'pre-order',
      name: 'Чуду «Куриное мясо с картошкой»',
      subtitle: '1100₽',
      description:
        'Традиционный пирог чуду с куриным филе, картошкой, луком и топленым сливочным маслом.',
      images: [
        'assets/catalog/pre-order/chudu.jpg'
      ],
      weights: [
        { label: '1 шт.', value: 1, price: 1100 }
      ],
      fillings: null,
      basePrice: 1100,
      unit: 'шт.',
      popular: false
    }
  ] 

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
