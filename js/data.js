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
        { label: 'Крафт-пакет (сбор трав)', value: 100, price: 500 },
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
  'pre-order': [

    {
      id: 'cake-custom',
      category: 'pre-order',
      name: 'Домашние торты на заказ',
      subtitle: 'Медовик, Наполеон, Спартак, Сникерс, Красный бархат',
      description:
        'Пеку вручную к вашей дате. Использую только натуральные сливки Petmol 33%, сливочное масло, творожный сыр и бельгийский шоколад. Без растительных жиров и маргарина. Минимальный вес торта 1.3–1.5 кг.',
      note: 'Для Медовика укажите крем (заварной или со сливками Petmol и сыром) в комментарии к заказу.',
      optionTitle: 'ВЫБЕРИТЕ ТОРТ',
      images: [
        'assets/catalog/pre-order/cake-01.jpg',
        'assets/catalog/pre-order/cake-02.jpg',
        'assets/catalog/pre-order/cake-03.jpg',
        'assets/catalog/pre-order/cake-05.jpg',
        'assets/catalog/pre-order/cake-06.jpg',
        'assets/catalog/pre-order/cake-07.jpg',
        'assets/catalog/pre-order/cake-08.jpg',
        'assets/catalog/pre-order/cake-09.jpg',
        'assets/catalog/pre-order/cake-10.jpg',
      ],
      weights: [
        { label: '1.3 - 1.5 кг', value: 1400, price: 2500 },
        { label: '2 кг', value: 2000, price: 3600 },
        { label: '2.5 - 3 кг', value: 2700, price: 4800 },
      ],
      fillings: [
        { id: 'medovik', label: 'Медовик (крем заварной или сливки Petmol + сыр)' },
        { id: 'napoleon', label: 'Наполеон (нежный заварной крем)' },
        { id: 'spartak', label: 'Спартак (шоколадный медовик, заварной крем)' },
        { id: 'snickers', label: 'Сникерс (сверху арахис и шоколад)' },
        { id: 'red-velvet', label: 'Красный бархат (бисквитный торт)' },
      ],
      basePrice: 2500,
      unit: 'шт.',
      popular: true,
    },

    {
      id: 'san-sebastian',
      category: 'pre-order',
      name: 'Чизкейк Сан-Себастьян',
      subtitle: 'Нежная сливочная текстура, 1 800 ₽ за кг',
      description:
        'Знаменитый баскский чизкейк с карамельной корочкой и нежной сливочной серединой. Готовится на натуральных сливках Petmol 33% и творожном сыре, без мучной основы.',
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
      subtitle: 'Заварной крем и бельгийский шоколад',
      description:
        'Тонкое заварное тесто на сливочном масле. Внутри нежный заварной крем, а сверху эклеры щедро политы настоящим кондитерским бельгийским шоколадом.',
      images: [
        'assets/catalog/pre-order/eclairs.jpg',
      ],
      weights: [
        { label: 'Набор 6 шт.', value: 6, price: 1000 },
        { label: 'Набор 10 шт.', value: 10, price: 1600 },
      ],
      fillings: null,
      basePrice: 1000,
      unit: 'набор',
      popular: false,
    },

    {
      id: 'trifles',
      category: 'pre-order',
      name: 'Трайфлы в стаканчиках',
      subtitle: 'Шоколадный бисквит, крем Petmol, ягоды',
      description:
        'Воздушный шоколадный бисквит, прослойка из банана или свежей клубники, нежный крем из натуральных сливок Petmol и щедрый слой бельгийского шоколада.',
      images: [
        'assets/catalog/pre-order/trifles-1.jpg',
        'assets/catalog/pre-order/trifles-2.jpg',
      ],
      weights: [
        { label: 'Набор 4 шт.', value: 4, price: 1200 },
        { label: 'Набор 6 шт.', value: 6, price: 1800 },
      ],
      optionTitle: 'ВЫБЕРИТЕ ВКУС',
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
      subtitle: 'Семейный рецепт с грецким орехом, 1 800 ₽ за кг',
      description:
        'Традиционная домашняя пахлава: тончайшие слои теста, много грецкого ореха и пропитка натуральным медом с пасеки. 1 800 руб за килограмм.',
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
      subtitle: 'С добавлением ароматной ореховой травы',
      description:
        'Многослойный домашний горский хлеб ручной раскатки. Выпекается на сливочном масле с добавлением традиционной ореховой травы, которая дает неповторимый пряный аромат.',
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
      subtitle: 'Традиционный лезгинский пирог',
      description:
        'Традиционный сытный пирог чуду: сочная начинка из курицы, картофеля, лука и топленого сливочного масла. Выпекается строго к назначенному времени. Вес около 1.3 кг.',
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

};


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
