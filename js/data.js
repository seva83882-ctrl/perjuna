/* =============================================================
   МАМИНЫ СЕКРЕТЫ — Каталог товаров (js/data.js)
   Выверенные цены и фасовки мастера Пержаны.
   ============================================================= */

var PRODUCTS_DATA = {

  /* ═══════════════════════════════════════════════════════════
     ВСЕГДА В НАЛИЧИИ (Пасека Алтая и горные сборы Дагестана)
     ═══════════════════════════════════════════════════════════ */
 /* ═══════════════════════════════════════════════════════════
     ВСЕГДА В НАЛИЧИИ (Пасека Алтая и горные сборы Дагестана)
     ═══════════════════════════════════════════════════════════ */
  'in-stock': [

    {
      id: 'honeycomb',
      category: 'in-stock',
      name: 'Алтайские Соты',
      subtitle: '1,5kg — 2500₽',
      description:
        'Свежий зрелый мёд в запечатанных сотах с нашей алтайской пасеки.',
      images: [
        'assets/catalog/in-stock/honeycomb.jpg'
      ],
      weights: [
        { label: '1,5 kg', value: 1500, price: 2500 }
      ],
      fillings: null,
      basePrice: 2500,
      unit: 'шт.',
      popular: true
    },

    {
      id: 'herbs',
      category: 'in-stock',
      name: 'Травы Агульского района',
      subtitle: 'Сбор трав лугов Дагестана',
      description:
        'Ручной сбор дикорастущих трав с высокогорных лугов Дагестана. Высушены естественным способом без потери аромата и полезных свойств.',
      images: [
        'assets/catalog/in-stock/herbs-1.jpg'
      ],
      weights: [
        { label: 'Чабрец — 500 ₽', value: 1, price: 500 },
        { label: 'Мята — 600 ₽', value: 1, price: 600 },
        { label: 'Полынь — 500 ₽', value: 1, price: 500 }
      ],
      fillings: null,
      basePrice: 500,
      unit: 'пакет',
      popular: true
    },

    {
      id: 'bee-perga',
      category: 'in-stock',
      name: 'Пчелиная Перга',
      subtitle: '100g — 1100₽',
      description:
        'Чистая сотовая перга ручной выборки («пчелиный хлеб») с нашей пасеки на Алтае.',
      images: [
        'assets/catalog/in-stock/bee-perga.jpg'
      ],
      weights: [
        { label: '100 g', value: 100, price: 1100 }
      ],
      fillings: null,
      basePrice: 1100,
      unit: 'упаковка',
      popular: false
    },

    {
      id: 'bee-pollen',
      category: 'in-stock',
      name: 'Пчелиная пыльца',
      subtitle: '100g — 800₽',
      description:
        'Натуральная цветочная пыльца (пчелиная обножка) с медоносов Алтайского края.',
      images: [
        'assets/catalog/in-stock/bee-pollen-1.jpg'
      ],
      weights: [
        { label: '100 g', value: 100, price: 800 }
      ],
      fillings: null,
      basePrice: 800,
      unit: 'упаковка',
      popular: false
    },

    {
      id: 'bee-podmor',
      category: 'in-stock',
      name: 'Пчелиный подмор',
      subtitle: '10g — 500₽',
      description:
        'Сухой пчелиный подмор со здоровых семей с алтайской пасеки.',
      images: [
        'assets/catalog/in-stock/bee-podmor.jpg'
      ],
      weights: [
        { label: '10 g', value: 10, price: 500 }
      ],
      fillings: null,
      basePrice: 500,
      unit: 'упаковка',
      popular: false
    },

    {
      id: 'butter',
      category: 'in-stock',
      name: 'Масло «Сливочное»',
      subtitle: '1kg — 1000₽',
      description:
        'Натуральное домашнее сливочное масло без добавок и растительных жиров.',
      images: [
        'assets/catalog/in-stock/ghee.jpg'
      ],
      weights: [
        { label: '1 kg', value: 1000, price: 1000 }
      ],
      fillings: null,
      basePrice: 1000,
      unit: 'кг',
      popular: false
    },

    {
      id: 'ghee-toplenoe',
      category: 'in-stock',
      name: 'Масло Топленное «Сливочное»',
      subtitle: '1kg — 1500₽',
      description:
        'Натуральное сливочное масло, медленно перетопленное по традиционному рецепту.',
      images: [
        'assets/catalog/in-stock/ghee-top.jpg'
      ],
      weights: [
        { label: '1 kg', value: 1000, price: 1500 }
      ],
      fillings: null,
      basePrice: 1500,
      unit: 'кг',
      popular: false
    },

    {
      id: 'propolis',
      category: 'in-stock',
      name: 'Прополис',
      subtitle: '10g — 350₽',
      description:
        'Натуральный чистый пасечный прополис.',
      images: [
        'assets/catalog/in-stock/propolis.jpg'
      ],
      weights: [
        { label: '10 g', value: 10, price: 350 }
      ],
      fillings: null,
      basePrice: 350,
      unit: 'шт.',
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
        'assets/catalog/pre-order/cake-1.jpg',
        'assets/catalog/pre-order/cake-2.jpg',
        'assets/catalog/pre-order/cake-3.jpg',
        'assets/catalog/pre-order/cake-4.jpg',
        'assets/catalog/pre-order/cake-5.jpg',
        'assets/catalog/pre-order/cake-6.jpg'
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
