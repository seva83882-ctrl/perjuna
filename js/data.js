/* =============================================================
   МАМИНЫ СЕКРЕТЫ — Каталог товаров
   Собрано строго по переписке и голосовым мастера Пержаны.
   ============================================================= */

'use strict';

const PRODUCTS_DATA = {

  /* ═══════════════════════════════════════════════════════════
     ВСЕГДА В НАЛИЧИИ (Пасека и сборы)
     ═══════════════════════════════════════════════════════════ */
 /* ═══════════════════════════════════════════════════════════
     ВСЕГДА В НАЛИЧИИ (Пасека и сборы)
     ═══════════════════════════════════════════════════════════ */
  'in-stock': [

    {
      id: 'honey-glass',
      category: 'in-stock',
      name: 'Мёд пасечный натуральный',
      subtitle: 'Ведёрко 1 л (~1.5 кг) прямо с пасеки',
      description:
        'Собственная семейная пасека. Чистый натуральный мед без добавок, сахара и термической обработки. Фасуется в ведёрки объёмом 1 литр (около 1.5 кг чистого веса).',
      images: [
        'assets/catalog/in-stock/honey-glass-1.jpg',
        'assets/catalog/in-stock/honey-glass-2.jpg',
      ],
      weights: [
        { label: 'Горный (ведёрко 1 л / ~1.5 кг)', value: 1500, price: 1800 },
        { label: 'Дягилевый (ведёрко 1 л / ~1.5 кг)', value: 1500, price: 1800 },
        { label: 'Гречишный (ведёрко 1 л / ~1.5 кг)', value: 1500, price: 1100 },
        { label: 'Разнотравье (ведёрко 1 л / ~1.5 кг)', value: 1500, price: 1100 },
      ],
      fillings: null,
      basePrice: 1100,
      unit: 'ведёрко',
      popular: true,
    },

    {
      id: 'honeycomb',
      category: 'in-stock',
      name: 'Мёд в сотах (цельная рамка)',
      subtitle: 'Цельная рамка прямо из улья (~1.5 кг)',
      description:
        'Свежий зрелый мед в натуральных восковых сотах. Продаётся только цельной рамкой прямо с пасеки, без нарезки. Вес рамки около 1.5 кг.',
      images: [
        'assets/catalog/in-stock/honeycomb.jpg',
      ],
      weights: [
        { label: 'Цельная рамка (~1.5 кг)', value: 1500, price: 2500 },
      ],
      fillings: null,
      basePrice: 2500,
      unit: 'рамка',
      popular: false,
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
        'assets/catalog/in-stock/ghee-2.jpg',
      ],
      weights: [
        { label: 'Банка 500 г', value: 500, price: 750 },
        { label: 'Банка 1 кг', value: 1000, price: 1400 },
      ],
      fillings: null,
      basePrice: 750,
      unit: 'г',
      popular: false,
    },

    {
      id: 'herbs',
      category: 'in-stock',
      name: 'Горные травы Дагестана',
      subtitle: 'Майский ручной сбор: мята, полынь, чабрец',
      description:
        'Майский сбор дикорастущих трав с высокогорных полей Дагестана: мята, целебная полынь и душистый чабрец. Высушены естественным способом без потери эфирных масел.',
      images: [
        'assets/catalog/in-stock/herbs-1.jpg',
        'assets/catalog/in-stock/herbs-2.jpg',
        'assets/catalog/in-stock/herbs-3.jpg',
        'assets/catalog/in-stock/herbs-4.jpg',
      ],
      weights: [
        { label: 'Крафт-пакет', value: 100, price: 500 },
      ],
      fillings: null,
      basePrice: 500,
      unit: 'пакет',
      popular: false,
    },

    {
      id: 'bee-perga',
      category: 'in-stock',
      name: 'Перга пчелиная',
      subtitle: 'Пчелиный хлеб с пасеки',
      description:
        'Чистая сотовая перга ручной выборки. Естественный источник витаминов и аминокислот для укрепления иммунитета.',
      images: [
        'assets/catalog/in-stock/bee-perga.jpg',
      ],
      weights: [
        { label: 'Пакетик 100 г', value: 100, price: 1100 },
      ],
      fillings: null,
      basePrice: 1100,
      unit: 'г',
      popular: false,
    },

    {
      id: 'bee-pollen',
      category: 'in-stock',
      name: 'Пыльца цветочная',
      subtitle: 'Свежий сбор, мягкая сушка',
      description:
        'Натуральная цветочная пыльца (обножка), собранная пчёлами на горных лугах. Отличная витаминная добавка.',
      images: [
        'assets/catalog/in-stock/bee-pollen-1.jpg',
        'assets/catalog/in-stock/bee-pollen-2.jpg',
      ],
      weights: [
        { label: 'Пакетик 100 г', value: 100, price: 800 },
      ],
      fillings: null,
      basePrice: 800,
      unit: 'г',
      popular: false,
    },

    {
      id: 'bee-podmor',
      category: 'in-stock',
      name: 'Пчелиный подмор',
      subtitle: 'Для целебных настоек и растирок',
      description:
        'Сухой пчелиный подмор от здоровых пчелиных семей с нашей пасеки. Используется для домашних настоек и растирок.',
      images: [
        'assets/catalog/in-stock/bee-podmor.jpg',
      ],
      weights: [
        { label: 'Пакетик 100 г', value: 100, price: 1100 },
      ],
      fillings: null,
      basePrice: 1100,
      unit: 'г',
      popular: false,
    },

  ],


  /* ═══════════════════════════════════════════════════════════
     ПОД ЗАКАЗ К ДАТЕ (Выпечка и чизкейк Пержаны)
     ═══════════════════════════════════════════════════════════ */
  /* ═══════════════════════════════════════════════════════════
     ПОД ЗАКАЗ К ДАТЕ (Выпечка и домашние торты)
     ═══════════════════════════════════════════════════════════ */
  'pre-order': [

    {
      id: 'cake-medovik',
      category: 'pre-order',
      name: 'Торт Медовик',
      subtitle: 'Натуральный мед с пасеки, 1 700 ₽ за кг',
      description:
        'Классический домашний медовик на тонких коржах с натуральным пасечным медом. Крем на выбор: нежный заварной или сливочный (натуральные сливки Petmol 33% и творожный сыр). Минимальный вес заказа от 1.3 до 1.5 кг.',
      images: [
        'assets/catalog/pre-order/cake-01.jpg',
        'assets/catalog/pre-order/cake-02.jpg',
      ],
      weights: [
        { label: '1.3 - 1.5 кг (~1.4 кг)', value: 1400, price: 2380 },
        { label: '2 кг', value: 2000, price: 3400 },
        { label: '2.5 кг', value: 2500, price: 4250 },
      ],
      fillings: [
        { id: 'zavar', label: 'Заварной крем' },
        { id: 'petmol-cheese', label: 'Сливочный крем (сливки Petmol + сыр)' },
      ],
      basePrice: 2380,
      unit: 'шт.',
      popular: true,
    },

    {
      id: 'cake-napoleon',
      category: 'pre-order',
      name: 'Торт Наполеон',
      subtitle: 'Хрустящее слоеное тесто и заварной крем, 1 800 ₽ за кг',
      description:
        'Домашний наполеон из тончайших слоеных коржей на сливочном масле с нежным классическим заварным кремом. Минимальный вес заказа 1.3–1.5 кг.',
      images: [
        'assets/catalog/pre-order/cake-03.jpg',
      ],
      weights: [
        { label: '1.3 - 1.5 кг (~1.4 кг)', value: 1400, price: 2520 },
        { label: '2 кг', value: 2000, price: 3600 },
        { label: '2.5 кг', value: 2500, price: 4500 },
      ],
      fillings: null,
      basePrice: 2520,
      unit: 'шт.',
      popular: true,
    },

    {
      id: 'cake-spartak',
      category: 'pre-order',
      name: 'Торт Спартак',
      subtitle: 'Шоколадный медовик с заварным кремом, 1 100 ₽ за кг',
      description:
        'Шоколадно-медовые коржи с добавлением какао и натурального меда, пропитанные нежным заварным кремом. Очень мягкий и насыщенный вкус.',
      images: [
        'assets/catalog/pre-order/cake-05.jpg',
      ],
      weights: [
        { label: '1.3 - 1.5 кг (~1.4 кг)', value: 1400, price: 1540 },
        { label: '2 кг', value: 2000, price: 2200 },
        { label: '2.5 кг', value: 2500, price: 2750 },
      ],
      fillings: null,
      basePrice: 1540,
      unit: 'шт.',
      popular: true,
    },

    {
      id: 'cake-snickers',
      category: 'pre-order',
      name: 'Торт Сникерс',
      subtitle: 'Арахис, карамель и шоколад, 1 800 ₽ за кг',
      description:
        'Насыщенный шоколадный бисквит, домашняя сливочная карамель, обжаренный арахис и крем на натуральных сливках Petmol. Сверху покрыт слоем шоколада.',
      images: [
        'assets/catalog/pre-order/cake-06.jpg',
      ],
      weights: [
        { label: '1.3 - 1.5 кг (~1.4 кг)', value: 1400, price: 2520 },
        { label: '2 кг', value: 2000, price: 3600 },
        { label: '2.5 кг', value: 2500, price: 4500 },
      ],
      fillings: null,
      basePrice: 2520,
      unit: 'шт.',
      popular: false,
    },

    {
      id: 'cake-red-velvet',
      category: 'pre-order',
      name: 'Торт Красный бархат',
      subtitle: 'Нежный бисквит и крем-чиз, 1 800 ₽ за кг',
      description:
        'Эффектный бархатный бисквит с легкой шоколадной ноткой и воздушным кремом из творожного сыра и натуральных сливок Petmol 33%.',
      images: [
        'assets/catalog/pre-order/cake-07.jpg',
      ],
      weights: [
        { label: '1.3 - 1.5 кг (~1.4 кг)', value: 1400, price: 2520 },
        { label: '2 кг', value: 2000, price: 3600 },
      ],
      fillings: null,
      basePrice: 2520,
      unit: 'шт.',
      popular: false,
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
        'assets/catalog/pre-order/san-sebastian-2.jpg',
      ],
      weights: [
        { label: '1 кг (целый чизкейк)', value: 1000, price: 1800 },
        { label: '1.5 кг', value: 1500, price: 2700 },
      ],
      fillings: null,
      basePrice: 1800,
      unit: 'кг',
      popular: true,
    },

    {
      id: 'eclairs',
      category: 'pre-order',
      name: 'Заварные эклеры',
      subtitle: 'Заварной крем и бельгийский шоколад, 200 ₽ за шт.',
      description:
        'Тонкое домашнее заварное тесто на сливочном масле, наполненное заварным кремом и политое настоящим кондитерским бельгийским шоколадом.',
      images: [
        'assets/catalog/pre-order/eclairs.jpg',
      ],
      weights: [
        { label: 'Набор 4 шт.', value: 4, price: 800 },
        { label: 'Набор 6 шт.', value: 6, price: 1200 },
        { label: 'Набор 10 шт.', value: 10, price: 2000 },
      ],
      fillings: null,
      basePrice: 800,
      unit: 'набор',
      popular: false,
    },

    {
      id: 'trifles',
      category: 'pre-order',
      name: 'Трайфлы в стаканчиках',
      subtitle: 'Шоколадный бисквит, крем Petmol, ягоды',
      description:
        'Порционные десерты: шоколадный бисквит, бананы или клубника, воздушный крем из натуральных сливок Petmol и слой бельгийского шоколада.',
      images: [
        'assets/catalog/pre-order/trifles-1.jpg',
        'assets/catalog/pre-order/trifles-2.jpg',
      ],
      weights: [
        { label: 'Набор 4 шт.', value: 4, price: 1200 },
        { label: 'Набор 6 шт.', value: 6, price: 1800 },
      ],
      fillings: [
        { id: 'strawberry', label: 'С клубникой' },
        { id: 'banana', label: 'С бананом' },
      ],
      basePrice: 1200,
      unit: 'набор',
      popular: false,
    },

    {
      id: 'pakhlava',
      category: 'pre-order',
      name: 'Пахлава медовая',
      subtitle: 'Много орехов и горный мед, 1 800 ₽ за кг',
      description:
        'Традиционная домашняя пахлава: тончайшие раскатанные слои теста, щедрая начинка из грецкого ореха и пропитка натуральным медом с пасеки.',
      images: [
        'assets/catalog/pre-order/pakhlava.jpg',
      ],
      weights: [
        { label: '500 г (коробка)', value: 500, price: 900 },
        { label: '1 кг (коробка)', value: 1000, price: 1800 },
      ],
      fillings: null,
      basePrice: 900,
      unit: 'г',
      popular: false,
    },

    {
      id: 'bread-sloeny',
      category: 'pre-order',
      name: 'Слоёный дагестанский хлеб',
      subtitle: 'С ароматной ореховой травой',
      description:
        'Многослойный горский хлеб ручной раскатки на сливочном масле с добавлением традиционной пряной ореховой травы.',
      images: [
        'assets/catalog/pre-order/bread.jpg',
      ],
      weights: [
        { label: '1 шт. (~400 г)', value: 400, price: 400 },
        { label: '3 шт.', value: 1200, price: 1100 },
      ],
      fillings: null,
      basePrice: 400,
      unit: 'шт.',
      popular: false,
    },

    {
      id: 'chudu',
      category: 'pre-order',
      name: 'Чуду с курицей и картошкой',
      subtitle: 'Лезгинский сытный пирог, вес ~1.3 кг',
      description:
        'Традиционный пирог чуду с сытной сочной начинкой: куриное филе, картошка, лук и домашнее топленое масло. Выпекается строго в день заказа.',
      images: [
        'assets/catalog/pre-order/chudu.jpg',
      ],
      weights: [
        { label: '1 пирог (~1.3 кг)', value: 1300, price: 1100 },
      ],
      fillings: null,
      basePrice: 1100,
      unit: 'шт.',
      popular: false,
    },

  ],

/* ─── ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ────────────────────────────── */

function getProductById(id) {
  return [
    ...PRODUCTS_DATA['in-stock'],
    ...PRODUCTS_DATA['pre-order'],
  ].find(p => p.id === id);
}

function getProductsByCategory(category) {
  return PRODUCTS_DATA[category] ?? [];
}

function formatPrice(price) {
  return price.toLocaleString('ru-RU') + '\u00a0₽';
}

function getProductThumbnail(product) {
  return product.images[0] ?? '';
}
