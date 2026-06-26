import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

const LEAD_URL = 'https://functions.poehali.dev/ecb985a5-1966-4a54-9078-02c89d51bbe2';

const IMG = {
  hero: 'https://cdn.poehali.dev/projects/f3a515bf-4f01-42e4-849d-c06e4fed9faa/files/d3a71e5e-4565-43b4-a866-9b49fba413e5.jpg',
  villa: 'https://cdn.poehali.dev/projects/f3a515bf-4f01-42e4-849d-c06e4fed9faa/files/e0785fc9-80dc-4d0a-8a95-85a2c6ffd057.jpg',
  stone: 'https://cdn.poehali.dev/projects/f3a515bf-4f01-42e4-849d-c06e4fed9faa/files/36b5b419-d75e-4c9d-8d53-26d94a9c315c.jpg',
};

const nav = [
  { label: 'О компании', id: 'about' },
  { label: 'Портфолио', id: 'portfolio' },
  { label: 'Услуги', id: 'services' },
  { label: 'Калькулятор', id: 'calc' },
  { label: 'Галерея', id: 'gallery' },
  { label: 'Отзывы', id: 'reviews' },
  { label: 'Блог', id: 'blog' },
  { label: 'Контакты', id: 'contacts' },
];

const P = {
  p1: 'https://cdn.poehali.dev/projects/f3a515bf-4f01-42e4-849d-c06e4fed9faa/files/e6bb7e92-e899-41ff-9431-ec0ee1692930.jpg',
  p2: 'https://cdn.poehali.dev/projects/f3a515bf-4f01-42e4-849d-c06e4fed9faa/files/b57177b1-a97d-4506-a6bc-c8eb81e71e32.jpg',
  p3: 'https://cdn.poehali.dev/projects/f3a515bf-4f01-42e4-849d-c06e4fed9faa/files/9229392f-fa1a-4865-9c37-fdf5eead22ef.jpg',
  m1: 'https://cdn.poehali.dev/projects/f3a515bf-4f01-42e4-849d-c06e4fed9faa/files/c4dc713f-0261-4ffd-9fab-005331fe35ca.jpg',
  m2: 'https://cdn.poehali.dev/projects/f3a515bf-4f01-42e4-849d-c06e4fed9faa/files/bf04a548-93e8-4eba-8cd9-0df2b9b5d2ef.jpg',
  e1: 'https://cdn.poehali.dev/projects/f3a515bf-4f01-42e4-849d-c06e4fed9faa/files/81e11fa5-1d89-4b83-9e06-a5750ec99f4e.jpg',
};

type Project = {
  img: string; title: string; loc: string; area: string; term: string; price: string;
  desc?: string; style?: string; floors?: string; bedrooms?: string; bathrooms?: string; year?: string;
};

const portfolioCategories: { key: string; label: string; badge: string; color: string; projects: Project[] }[] = [
  {
    key: 'premium',
    label: 'Премиум',
    badge: 'Premium',
    color: 'text-gold border-gold bg-gold/10',
    projects: [
      { img: IMG.hero, title: 'Резиденция «Лесная»', loc: 'Новорижское шоссе', area: '420 м²', term: '11 мес', price: 'от 38 млн ₽', style: 'Современный минимализм', floors: '2', bedrooms: '5', bathrooms: '4', year: '2024', desc: 'Дом с панорамными окнами в пол, выходящими на сосновый лес. Авторский фасад из тёмного кирпича ручной формовки и лиственницы. Умный дом Crestron, бассейн 12×5 м, гараж на 3 авто.' },
      { img: IMG.villa, title: 'Вилла «Модерн»', loc: 'Рублёво-Успенское ш.', area: '560 м²', term: '14 мес', price: 'от 62 млн ₽', style: 'Архитектурный модернизм', floors: '3', bedrooms: '6', bathrooms: '5', year: '2024', desc: 'Трёхуровневая вилла с консольным вторым этажом и эксплуатируемой кровлей. Бетон, стекло и тиковое дерево. Панорамный лифт, кинозал, вайнрум, спа-зона.' },
      { img: IMG.stone, title: 'Особняк «Каменный»', loc: 'Калужское шоссе', area: '380 м²', term: '10 мес', price: 'от 34 млн ₽', style: 'Классика с современным акцентом', floors: '2', bedrooms: '4', bathrooms: '3', year: '2023', desc: 'Фасад из натурального доломита и патинированной меди. Высокие потолки 3.6 м, каминный зал, библиотека, мастер-спальня с гардеробной 28 м². Ландшафт с прудом.' },
      { img: P.p1, title: 'Вилла «Чёрный бриллиант»', loc: 'Ильинское шоссе', area: '680 м²', term: '18 мес', price: 'от 95 млн ₽', style: 'Люкс-авангард', floors: '3', bedrooms: '7', bathrooms: '6', year: '2025', desc: 'Монолитный дом с вентилируемым фасадом из чёрного клинкера. Бассейн с подогревом 15×7 м, теннисный корт, гостевой дом 80 м², гараж на 5 авто. Система умного дома Control4.' },
      { img: P.p2, title: 'Резиденция «Белый куб»', loc: 'Сколковское ш.', area: '510 м²', term: '13 мес', price: 'от 72 млн ₽', style: 'Японский минимализм', floors: '2', bedrooms: '5', bathrooms: '4', year: '2025', desc: 'Белый монолит с большими плоскостями остекления и внутренним двориком-патио. Авторский дизайн-интерьер в стиле ваби-саби. Японский сад, ротонда для медитаций, онсэн.' },
      { img: P.p3, title: 'Усадьба «Скандинавия»', loc: 'Дмитровское шоссе', area: '445 м²', term: '12 мес', price: 'от 44 млн ₽', style: 'Скандинавский стиль', floors: '2', bedrooms: '5', bathrooms: '3', year: '2023', desc: 'Тёплый скандинавский дом из клеёного бруса с утеплённым фасадом. Открытая терраса 60 м², финская баня 40 м², уличный камин. Панорамные виды на лес и озеро.' },
      { img: IMG.hero, title: 'Особняк «Панорама»', loc: 'Рублёво-Успенское ш.', area: '720 м²', term: '20 мес', price: 'от 110 млн ₽', style: 'Неоклассика', floors: '3', bedrooms: '8', bathrooms: '7', year: '2025', desc: 'Главная усадьба с колоннадой и симметричным фасадом из травертина. Парадный вход с витражом 8 м, бальный зал 90 м², indoor-бассейн 20×8 м, собственная скважина.' },
      { img: P.p1, title: 'Вилла «Форест»', loc: 'Киевское шоссе', area: '390 м²', term: '11 мес', price: 'от 52 млн ₽', style: 'Биофильный дизайн', floors: '2', bedrooms: '4', bathrooms: '3', year: '2024', desc: 'Дом, интегрированный в рельеф лесного участка. Живая кровля, фасад из лиственницы термо, зимний сад 35 м². Геотермальное отопление, рекуперация, класс энергопотребления A+.' },
      { img: IMG.villa, title: 'Резиденция «Лазурь»', loc: 'Калужское шоссе', area: '580 м²', term: '15 мес', price: 'от 84 млн ₽', style: 'Средиземноморский модерн', floors: '2', bedrooms: '6', bathrooms: '5', year: '2024', desc: 'Дом с открытыми террасами и арками в средиземноморском духе. Infinity-бассейн 18×5 м с видом на природу, летняя кухня, погреб на 500 бутылок, оранжерея.' },
      { img: P.p2, title: 'Дом «Архитектор»', loc: 'Новорижское шоссе', area: '460 м²', term: '12 мес', price: 'от 58 млн ₽', style: 'Конструктивизм', floors: '2', bedrooms: '5', bathrooms: '4', year: '2023', desc: 'Авторский дом архитектора Романа Белова — игра объёмов, нависающие консоли и стеклянные переходы. Мастерская 45 м², галерея-коридор, кровля-терраса с панорамным видом 360°.' },
    ],
  },
  {
    key: 'business',
    label: 'Бизнес-класс',
    badge: 'Business',
    color: 'text-blue-400 border-blue-400 bg-blue-400/10',
    projects: [
      { img: P.m1, title: 'Дом «Уют»', loc: 'Щёлковское шоссе', area: '220 м²', term: '8 мес', price: 'от 12 млн ₽', style: 'Современный комфорт', floors: '2', bedrooms: '4', bathrooms: '2', year: '2024', desc: 'Просторный двухэтажный дом с открытой планировкой первого этажа. Кирпич + штукатурка, потолки 2.8 м, тёплый пол по всему дому, котельная на газе, терраса 30 м².' },
      { img: P.m2, title: 'Коттедж «Берёзовый»', loc: 'Ярославское шоссе', area: '185 м²', term: '7 мес', price: 'от 9.5 млн ₽', style: 'Загородный уют', floors: '2', bedrooms: '3', bathrooms: '2', year: '2023', desc: 'Уютный коттедж в окружении берёзовой рощи. Газобетон с облицовкой под дерево, мансардный второй этаж, барбекю-зона, детская площадка, место под баню.' },
      { img: P.m1, title: 'Дом «Семейный»', loc: 'Горьковское шоссе', area: '240 м²', term: '9 мес', price: 'от 14 млн ₽', style: 'Функциональный модерн', floors: '2', bedrooms: '4', bathrooms: '3', year: '2024', desc: 'Продуманный дом для большой семьи с отдельным входом для гостей. Гараж на 2 авто, кладовая 12 м², сауна, игровая комната для детей, ухоженный сад.' },
      { img: IMG.stone, title: 'Коттедж «Сосновый»', loc: 'Симферопольское ш.', area: '200 м²', term: '8 мес', price: 'от 11 млн ₽', style: 'Экостиль', floors: '2', bedrooms: '4', bathrooms: '2', year: '2023', desc: 'Дом с натуральными материалами в окружении соснового леса. Фасад из рустованного кирпича, деревянные балки в интерьере, большая веранда с видом на лес.' },
      { img: P.m2, title: 'Дом «Тихий»', loc: 'Можайское шоссе', area: '170 м²', term: '7 мес', price: 'от 8.8 млн ₽', style: 'Компактный бизнес', floors: '2', bedrooms: '3', bathrooms: '2', year: '2023', desc: 'Компактный и функциональный дом для семьи из 3–4 человек. Рациональная планировка без лишних коридоров, тёплый гараж, зона барбекю, автономная канализация.' },
      { img: P.m1, title: 'Коттедж «Заречный»', loc: 'Варшавское шоссе', area: '195 м²', term: '7 мес', price: 'от 10 млн ₽', style: 'Классический коттедж', floors: '2', bedrooms: '4', bathrooms: '2', year: '2024', desc: 'Традиционный коттедж с двускатной кровлей и эркером. Крытая терраса, цокольный этаж с возможностью оборудования под бильярдную или спортзал.' },
      { img: IMG.hero, title: 'Дом «Комфорт Плюс»', loc: 'Ленинградское шоссе', area: '260 м²', term: '10 мес', price: 'от 16 млн ₽', style: 'Премиум-комфорт', floors: '2', bedrooms: '5', bathrooms: '3', year: '2025', desc: 'Самый просторный в классе бизнес. Кухня-гостиная 55 м², мастер-спальня с гардеробной и джакузи, гараж на 2 авто, кабинет, зимний сад 20 м².' },
      { img: P.m2, title: 'Коттедж «Светлый»', loc: 'Пятницкое шоссе', area: '210 м²', term: '8 мес', price: 'от 12.5 млн ₽', style: 'Светлый минимализм', floors: '2', bedrooms: '4', bathrooms: '2', year: '2024', desc: 'Белоснежный коттедж с большими окнами и светлыми интерьерами. Квадратные формы, плоская кровля с ограждением, крытый навес для авто, ухоженный газон.' },
      { img: P.m1, title: 'Дом «Лесная поляна»', loc: 'Минское шоссе', area: '230 м²', term: '9 мес', price: 'от 13 млн ₽', style: 'Природный стиль', floors: '2', bedrooms: '4', bathrooms: '2', year: '2023', desc: 'Дом на краю леса с выходом на поляну. Панорамные окна с видом на природу, открытая деревянная терраса, мангальная зона, место под баню уже подготовлено.' },
      { img: IMG.villa, title: 'Коттедж «Каширский»', loc: 'Каширское шоссе', area: '190 м²', term: '7 мес', price: 'от 9 млн ₽', style: 'Практичный модерн', floors: '2', bedrooms: '3', bathrooms: '2', year: '2023', desc: 'Надёжный дом с фундаментом на буронабивных сваях. Газобетон D400, штукатурный фасад, энергоэффективные окна, встроенный гараж, подвал под хранение.' },
    ],
  },
  {
    key: 'economy',
    label: 'Эконом',
    badge: 'Economy',
    color: 'text-green-400 border-green-400 bg-green-400/10',
    projects: [
      { img: P.e1, title: 'Дом «Стандарт»', loc: 'Щёлковское шоссе', area: '100 м²', term: '5 мес', price: 'от 3.5 млн ₽', style: 'Практичный', floors: '2', bedrooms: '3', bathrooms: '1', year: '2023', desc: 'Надёжный дом из газобетона с утеплённым фасадом. Все коммуникации подведены, отопление газовое, окна пластиковые с двойным стеклопакетом, крыша металлочерепица.' },
      { img: P.e1, title: 'Коттедж «Бюджет»', loc: 'Егорьевское шоссе', area: '90 м²', term: '4 мес', price: 'от 2.9 млн ₽', style: 'Экономичный', floors: '1', bedrooms: '3', bathrooms: '1', year: '2023', desc: 'Одноэтажный дом с рациональной планировкой. Идеально подходит для дачи или постоянного проживания небольшой семьи. Быстрый монтаж, гарантия на конструктив 5 лет.' },
      { img: P.e1, title: 'Дом «Компакт»', loc: 'Горьковское шоссе', area: '110 м²', term: '5 мес', price: 'от 3.8 млн ₽', style: 'Компактный', floors: '2', bedrooms: '3', bathrooms: '1', year: '2024', desc: 'Двухэтажный дом с мансардой. Три спальни, просторная кухня-гостиная, санузел на каждом этаже. Утеплённый фундамент, антисептированные деревянные перекрытия.' },
      { img: P.m1, title: 'Дачный дом «Дача»', loc: 'Носовихинское ш.', area: '80 м²', term: '3 мес', price: 'от 2.2 млн ₽', style: 'Дачный', floors: '1', bedrooms: '2', bathrooms: '1', year: '2023', desc: 'Лёгкий каркасный дом для сезонного и круглогодичного проживания. Быстрый монтаж 3 месяца, утеплитель ISOVER 200 мм, отделка вагонкой, открытая терраса 15 м².' },
      { img: P.e1, title: 'Дом «Народный»', loc: 'Рязанское шоссе', area: '120 м²', term: '5 мес', price: 'от 4.1 млн ₽', style: 'Семейный эконом', floors: '2', bedrooms: '4', bathrooms: '1', year: '2024', desc: 'Просторный для своей цены дом с четырьмя спальнями. Газобетон 400 мм, штукатурный фасад, ламинат и плитка в отделке. Участок под озеленение подготовлен.' },
      { img: P.m2, title: 'Коттедж «Простой»', loc: 'Новорязанское ш.', area: '95 м²', term: '4 мес', price: 'от 3.2 млн ₽', style: 'Лаконичный', floors: '2', bedrooms: '3', bathrooms: '1', year: '2023', desc: 'Честный дом без лишнего. Кирпичная кладка в полтора кирпича, металлопластиковые окна, газовый котёл, разводка труб по всему дому. Готов к чистовой отделке.' },
      { img: P.e1, title: 'Дом «Дачный плюс»', loc: 'Симферопольское ш.', area: '105 м²', term: '5 мес', price: 'от 3.6 млн ₽', style: 'Дача плюс', floors: '2', bedrooms: '3', bathrooms: '1', year: '2024', desc: 'Улучшенная версия дачного дома с полноценным вторым этажом. Утеплённый цоколь, место под погреб, открытая и закрытая веранды, дровяная печь в гостиной.' },
      { img: P.m1, title: 'Коттедж «Семья»', loc: 'Варшавское шоссе', area: '130 м²', term: '6 мес', price: 'от 4.5 млн ₽', style: 'Семейный', floors: '2', bedrooms: '4', bathrooms: '2', year: '2024', desc: 'Самый просторный в линейке эконом. Четыре спальни, два санузла, гардеробная. Газобетон + облицовочный кирпич, гараж на одно авто, уличное освещение.' },
      { img: P.e1, title: 'Дом «Уютный»', loc: 'Каширское шоссе', area: '88 м²', term: '4 мес', price: 'от 2.8 млн ₽', style: 'Уютный', floors: '1', bedrooms: '2', bathrooms: '1', year: '2023', desc: 'Компактный одноэтажный дом для пары или небольшой семьи. Скандинавский облик, светлые тона, кухня-гостиная 28 м², мастер-спальня с гардеробом, тёплая веранда.' },
      { img: P.m2, title: 'Коттедж «Добротный»', loc: 'Дмитровское шоссе', area: '115 м²', term: '5 мес', price: 'от 3.9 млн ₽', style: 'Добротный', floors: '2', bedrooms: '3', bathrooms: '2', year: '2024', desc: 'Коттедж с усиленным фундаментом и двойным утеплением — для круглогодичного проживания в суровые зимы. Тёплый пол на первом этаже, два санузла, котельная.' },
    ],
  },
];

const services = [
  { icon: 'PencilRuler', title: 'Архитектура и проект', desc: 'Авторское проектирование, 3D-визуализация и рабочая документация под ваш участок.' },
  { icon: 'HardHat', title: 'Строительство под ключ', desc: 'Монолит, кирпич, газобетон, фахверк — полный цикл с фиксированной сметой.' },
  { icon: 'Sofa', title: 'Дизайн интерьера', desc: 'Премиальные интерьеры с авторской мебелью и инженерией умного дома.' },
  { icon: 'Trees', title: 'Ландшафт и благоустройство', desc: 'Озеленение, дренаж, малые формы, бассейны и зоны отдыха.' },
  { icon: 'ShieldCheck', title: 'Инженерные системы', desc: 'Отопление, вентиляция, электрика и «умный дом» от инженеров премиум-класса.' },
  { icon: 'KeyRound', title: 'Сопровождение и гарантия', desc: 'Личный менеджер на всех этапах и гарантия 10 лет на конструктив.' },
];

const reviews = [
  { name: 'Александр М.', role: 'Резиденция, 420 м²', text: 'Дом построили точно в срок и без выхода за смету. Архитектура — произведение искусства. Рекомендую.', stars: 5 },
  { name: 'Елена и Дмитрий', role: 'Вилла, 560 м²', text: 'Сопровождали на каждом этапе, присылали отчёты с фото. Качество отделки превзошло ожидания.', stars: 5 },
  { name: 'Игорь С.', role: 'Особняк, 380 м²', text: 'Ценю прозрачность: фиксированная цена в договоре и ни рубля сверху. Команда профессионалов.', stars: 5 },
];

const blog = [
  { tag: 'Технологии', title: 'Монолит или газобетон: что выбрать для премиального дома', date: '12 июня 2026' },
  { tag: 'Гайд', title: 'Сколько стоит построить дом мечты в Подмосковье в 2026', date: '3 июня 2026' },
  { tag: 'Кейс', title: 'Как мы построили виллу 560 м² за 14 месяцев', date: '28 мая 2026' },
];

const steps = [
  { n: '01', t: 'Заявка и встреча', d: 'Обсуждаем задачу, бюджет и участок' },
  { n: '02', t: 'Проект и смета', d: 'Архитектура, визуализация, фикс-цена' },
  { n: '03', t: 'Строительство', d: 'Контроль качества, отчёты с фото' },
  { n: '04', t: 'Сдача под ключ', d: 'Заселение и гарантия 10 лет' },
];

const houseTypes = [
  { key: 'modern', label: 'Современный', base: 95000 },
  { key: 'classic', label: 'Классический', base: 110000 },
  { key: 'chalet', label: 'Шале', base: 125000 },
];
const materials = [
  { key: 'gas', label: 'Газобетон', mult: 1 },
  { key: 'brick', label: 'Кирпич', mult: 1.18 },
  { key: 'monolith', label: 'Монолит', mult: 1.32 },
];
const options = [
  { key: 'pool', label: 'Бассейн', price: 3500000 },
  { key: 'smart', label: 'Умный дом', price: 1800000 },
  { key: 'interior', label: 'Дизайн-интерьер', price: 4200000 },
  { key: 'land', label: 'Ландшафт', price: 2100000 },
];

const Index = () => {
  const [area, setArea] = useState(350);
  const [floors, setFloors] = useState(2);
  const [type, setType] = useState('modern');
  const [material, setMaterial] = useState('gas');
  const [opts, setOpts] = useState<string[]>(['smart']);

  const [activeTab, setActiveTab] = useState('premium');
  const [modal, setModal] = useState<(Project & { badge: string; color: string }) | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const modalCat = modal ? portfolioCategories.find((c) => c.badge === modal.badge) : null;
  const modalIdx = modalCat ? modalCat.projects.findIndex((p) => p.title === modal!.title) : -1;
  const goModalPrev = () => {
    if (!modalCat || modalIdx < 0) return;
    const prev = modalCat.projects[(modalIdx - 1 + modalCat.projects.length) % modalCat.projects.length];
    setModal({ ...prev, badge: modal!.badge, color: modal!.color });
  };
  const goModalNext = () => {
    if (!modalCat || modalIdx < 0) return;
    const next = modalCat.projects[(modalIdx + 1) % modalCat.projects.length];
    setModal({ ...next, badge: modal!.badge, color: modal!.color });
  };
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!modal) return;
      if (e.key === 'ArrowLeft') goModalPrev();
      if (e.key === 'ArrowRight') goModalNext();
      if (e.key === 'Escape') setModal(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [modal, modalIdx, modalCat]);

  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const sendLead = async (payload: Record<string, string>) => {
    if (!payload.name?.trim() || !payload.phone?.trim()) {
      toast({ title: 'Заполните имя и телефон', variant: 'destructive' });
      return false;
    }
    setSending(true);
    try {
      const res = await fetch(LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      toast({ title: 'Заявка отправлена!', description: 'Архитектор свяжется с вами в течение часа.' });
      return true;
    } catch {
      toast({ title: 'Не удалось отправить', description: 'Попробуйте позже или позвоните нам.', variant: 'destructive' });
      return false;
    } finally {
      setSending(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await sendLead({ ...form, source: 'Форма контактов' });
    if (ok) setForm({ name: '', phone: '', email: '', message: '' });
  };

  const handleCalcLead = () => {
    const estimate = `${fmt(total)} (${area} м², ${floors} эт., ${houseTypes.find((h) => h.key === type)!.label}, ${materials.find((m) => m.key === material)!.label})`;
    document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
    setForm((p) => ({ ...p, message: `Заявка из калькулятора. Расчёт: ${estimate}` }));
  };

  const base = houseTypes.find((h) => h.key === type)!.base;
  const mult = materials.find((m) => m.key === material)!.mult;
  const floorFactor = 1 + (floors - 1) * 0.08;
  const construction = area * base * mult * floorFactor;
  const optsSum = options.filter((o) => opts.includes(o.key)).reduce((s, o) => s + o.price, 0);
  const total = Math.round((construction + optsSum) / 100000) * 100000;
  const fmt = (n: number) => n.toLocaleString('ru-RU') + ' ₽';

  const toggleOpt = (k: string) =>
    setOpts((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <button onClick={() => { scrollTo('hero'); setMobileMenu(false); }} className="flex items-center gap-2">
            <span className="font-display text-xl md:text-2xl font-black tracking-tight uppercase">ЮНИТ <span className="text-gold">1</span></span>
          </button>
          <nav className="hidden lg:flex items-center gap-6">
            {nav.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm font-bold text-muted-foreground hover:text-gold transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3 md:gap-5">
            <a href="tel:89331770086" className="hidden md:block text-sm font-bold text-foreground hover:text-gold transition-colors">
              8 (933) 177-00-86
            </a>
            <Button onClick={() => scrollTo('contacts')} className="gold-gradient text-primary-foreground hover:opacity-90 font-medium hidden sm:inline-flex text-sm px-4 h-9 md:h-10">
              Обсудить проект
            </Button>
            {/* Бургер */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            >
              <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileMenu ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileMenu ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileMenu ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {mobileMenu && (
          <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="container py-4 flex flex-col gap-1">
              {nav.map((n) => (
                <button
                  key={n.id}
                  onClick={() => { scrollTo(n.id); setMobileMenu(false); }}
                  className="text-left py-3 px-2 text-base font-bold text-muted-foreground hover:text-gold border-b border-border/30 last:border-0 transition-colors"
                >
                  {n.label}
                </button>
              ))}
              <a href="tel:89331770086" className="py-3 px-2 text-base font-bold text-gold flex items-center gap-2 mt-1">
                <Icon name="Phone" size={16} /> 8 (933) 177-00-86
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center grain">
        <div className="absolute inset-0">
          <img src={IMG.hero} alt="Премиальный дом" className="w-full h-full object-cover brightness-125" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/45 to-background/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/10" />
        </div>
        <div className="container relative z-10 pt-16 md:pt-20">
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 text-gold text-xs md:text-sm mb-5 md:mb-7">
              <Icon name="Sparkles" size={12} /> Премиальное строительство с 2009 года
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4 md:mb-6">
              Дома, в которых
              <br />
              <span className="gold-text-gradient">хочется жить</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-7 md:mb-9 leading-relaxed">
              Проектируем и строим премиальные дома под ключ в Москве и Московской области.
              Авторская архитектура, фиксированная смета и гарантия 10 лет.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => scrollTo('calc')} className="gold-gradient text-primary-foreground hover:opacity-90 h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-medium">
                Рассчитать стоимость
                <Icon name="ArrowRight" size={16} className="ml-1" />
              </Button>
              <Button variant="outline" onClick={() => scrollTo('portfolio')} className="h-12 md:h-14 px-6 md:px-8 text-sm md:text-base border-border hover:border-gold hover:text-gold">
                Смотреть работы
              </Button>
            </div>
            <div className="flex gap-8 md:gap-x-10 mt-10 md:mt-14">
              {[['180+', 'домов построено'], ['10 лет', 'гарантия'], ['0 ₽', 'переплат']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl md:text-4xl font-bold text-gold">{v}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button onClick={() => scrollTo('about')} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground animate-float-slow">
          <Icon name="ChevronDown" size={24} />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16 md:py-28 container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative pb-10 sm:pb-0">
            <img src={IMG.stone} alt="О компании" className="rounded-2xl w-full object-cover aspect-[4/3] sm:aspect-[4/5]" />
            <div className="absolute -bottom-2 right-4 sm:-bottom-8 sm:right-8 bg-card border border-gold/30 rounded-2xl p-4 sm:p-6 w-44 sm:w-56 shadow-2xl">
              <div className="font-display text-4xl sm:text-5xl font-bold text-gold">17</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">лет создаём дома премиум-класса в Подмосковье</div>
            </div>
          </div>
          <div>
            <span className="text-gold text-sm tracking-widest uppercase">О компании</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
              Строительство <br />полного цикла
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              ARCHFORM — это команда архитекторов, инженеров и строителей, которые создают
              дома, отражающие характер своих владельцев. Мы берём на себя весь путь — от
              первого эскиза до передачи ключей.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Работаем по фиксированной смете: цена в договоре не меняется. Каждый этап
              контролирует технадзор, а вы получаете еженедельные фотоотчёты.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {[
                ['BadgeCheck', 'Фиксированная смета в договоре'],
                ['Camera', 'Еженедельные фотоотчёты'],
                ['Users', 'Личный менеджер проекта'],
                ['Award', 'Собственное производство'],
              ].map(([ic, t]) => (
                <div key={t} className="flex items-start gap-3">
                  <Icon name={ic} size={22} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-16 md:py-28 bg-card/40 border-y border-border/50">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-10">
            <div>
              <span className="text-gold text-sm tracking-widest uppercase">Портфолио</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 md:mt-4">Реализованные проекты</h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              Каждый дом уникален и спроектирован под образ жизни конкретной семьи.
            </p>
          </div>

          {/* Табы категорий */}
          <div className="flex flex-wrap gap-3 mb-10">
            {portfolioCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
                  activeTab === cat.key ? cat.color : 'border-border text-muted-foreground hover:border-border/80'
                }`}
              >
                {cat.label}
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === cat.key ? 'bg-current/10' : 'bg-muted'}`}>
                  {cat.projects.length}
                </span>
              </button>
            ))}
          </div>

          {/* Описание категории */}
          {portfolioCategories.map((cat) =>
            activeTab === cat.key ? (
              <div key={cat.key} className="mb-8 flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${cat.color}`}>
                  <Icon name="Star" size={12} /> {cat.badge}
                </span>
                <span className="text-muted-foreground text-sm">
                  {cat.key === 'premium' && 'Авторская архитектура, эксклюзивные материалы, площадь от 380 м²'}
                  {cat.key === 'business' && 'Качественные материалы, удобная планировка, площадь 170–260 м²'}
                  {cat.key === 'economy' && 'Оптимальные решения, надёжное строительство, площадь 80–130 м²'}
                </span>
              </div>
            ) : null
          )}

          {/* Сетка проектов */}
          {portfolioCategories.map((cat) =>
            activeTab === cat.key ? (
              <div key={cat.key} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-7">
                {cat.projects.map((p, i) => (
                  <div key={i} onClick={() => setModal({ ...p, badge: cat.badge, color: cat.color })} className="group relative rounded-2xl overflow-hidden cursor-pointer">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${cat.color}`}>
                        {cat.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-5">
                      <div className="flex items-center gap-1.5 text-gold text-xs mb-1.5">
                        <Icon name="MapPin" size={12} /> {p.loc}
                      </div>
                      <h3 className="font-display text-xl font-bold mb-3 leading-tight">{p.title}</h3>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="flex items-center gap-1"><Icon name="Maximize2" size={11} />{p.area}</span>
                        <span className="flex items-center gap-1"><Icon name="Clock" size={11} />{p.term}</span>
                        <span className="text-gold font-medium">{p.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null
          )}
        </div>
      </section>

      {/* WHY US */}
      <section className="py-16 md:py-28 container">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-gold text-sm tracking-widest uppercase">Наши преимущества</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 md:mt-4">Почему выбирают нас</h2>
          <p className="text-muted-foreground mt-3 md:mt-4 max-w-xl mx-auto text-sm md:text-base">17 лет мы строим дома, в которые влюбляются с первого взгляда и живут с удовольствием десятилетиями.</p>
        </div>

        {/* Большой блок с цифрами */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
          {[
            { val: '180+', label: 'домов построено', sub: 'в Москве и области' },
            { val: '17', label: 'лет на рынке', sub: 'с 2009 года' },
            { val: '100%', label: 'без переплат', sub: 'фиксированная смета' },
            { val: '4.9', label: 'рейтинг', sub: 'по отзывам клиентов' },
          ].map(({ val, label, sub }) => (
            <div key={label} className="relative p-4 md:p-7 rounded-2xl bg-card border border-border overflow-hidden group hover:border-gold/40 transition-all">
              <div className="absolute -top-4 -right-4 font-display text-6xl md:text-8xl font-bold text-gold/5 group-hover:text-gold/10 transition-colors select-none">{val}</div>
              <div className="font-display text-3xl md:text-5xl font-bold gold-text-gradient mb-1 md:mb-2">{val}</div>
              <div className="font-semibold text-xs md:text-sm mb-0.5 md:mb-1">{label}</div>
              <div className="text-xs text-muted-foreground hidden sm:block">{sub}</div>
            </div>
          ))}
        </div>

        {/* Карточки преимуществ */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {[
            { icon: 'FileCheck', title: 'Фиксированная смета', desc: 'Цена прописана в договоре и не меняется. Никаких доплат и неожиданных расходов в процессе стройки.' },
            { icon: 'ShieldCheck', title: 'Гарантия 10 лет', desc: 'Официальная гарантия на конструктив дома. При любых вопросах — бесплатно устраняем в течение 30 дней.' },
            { icon: 'Camera', title: 'Еженедельные отчёты', desc: 'Фото и видео с объекта каждую пятницу. Вы всегда знаете, что происходит на стройке, даже не приезжая.' },
            { icon: 'UserCheck', title: 'Личный менеджер', desc: 'Один контакт на весь проект. Ваш менеджер координирует архитекторов, инженеров и строителей.' },
            { icon: 'Hammer', title: 'Собственная бригада', desc: 'Не субподряд — все мастера в штате. Постоянный контроль качества и высокая скорость работ.' },
            { icon: 'Banknote', title: 'Прозрачное ценообразование', desc: 'Детальная смета на 200+ позиций. Вы видите стоимость каждого материала и каждой работы.' },
            { icon: 'Map', title: 'Помощь с участком', desc: 'Помогаем подобрать участок, провести геологию и согласовать проект с учётом ГПЗУ и ПЗЗ.' },
            { icon: 'Leaf', title: 'Энергоэффективность', desc: 'Проектируем дома класса А и А+. Тёплый контур, рекуперация, автоматика — минимальные счета за ЖКХ.' },
            { icon: 'Star', title: 'Авторская архитектура', desc: 'Каждый проект создаётся с нуля под вас. Мы не продаём типовые планировки — только уникальные решения.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-4 p-6 rounded-2xl border border-border bg-card/50 hover:border-gold/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                <Icon name={icon} size={22} className="text-gold" />
              </div>
              <div>
                <h3 className="font-semibold mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA-полоска */}
        <div className="mt-8 md:mt-12 rounded-2xl gold-gradient p-5 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6">
          <div>
            <div className="font-display text-xl md:text-3xl font-bold text-primary-foreground mb-1">Бесплатная консультация</div>
            <div className="text-primary-foreground/80 text-xs md:text-sm">Архитектор ответит на вопросы и покажет похожие реализованные объекты</div>
          </div>
          <Button
            onClick={() => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-background text-foreground hover:bg-background/90 h-12 px-8 font-medium shrink-0"
          >
            Записаться на встречу
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-16 md:py-28 container">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-gold text-sm tracking-widest uppercase">Услуги</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 md:mt-4">Полный цикл под ключ</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((s) => (
            <div key={s.title} className="group p-8 rounded-2xl border border-border bg-card/50 hover:border-gold/50 transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mb-6">
                <Icon name={s.icon} size={26} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* STEPS */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div key={st.n} className="relative p-7 rounded-2xl bg-card/40 border border-border">
              <div className="font-display text-5xl font-bold text-gold/30 mb-3">{st.n}</div>
              <h4 className="font-semibold text-lg mb-2">{st.t}</h4>
              <p className="text-sm text-muted-foreground">{st.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 md:py-28 bg-card/40 border-y border-border/50">
        <div className="container">
          <div className="text-center mb-12 md:mb-20">
            <span className="text-gold text-sm tracking-widest uppercase">Как мы работаем</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 md:mt-4">Процесс строительства</h2>
            <p className="text-muted-foreground mt-3 md:mt-4 max-w-xl mx-auto text-sm md:text-base">
              От первого звонка до ключей в руке — прозрачный процесс без неожиданностей.
            </p>
          </div>

          {/* Этапы */}
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
              {[
                { n: '01', icon: 'Phone', title: 'Заявка', desc: 'Оставляете заявку или звоните. Менеджер связывается в течение часа и задаёт уточняющие вопросы.', days: '1 день' },
                { n: '02', icon: 'Map', title: 'Выезд на участок', desc: 'Архитектор приезжает на участок, оценивает рельеф, грунт, ориентацию по сторонам света, соседей.', days: '2–3 дня' },
                { n: '03', icon: 'PencilRuler', title: 'Проектирование', desc: 'Разрабатываем концепцию, 3D-визуализацию и рабочую документацию. Согласовываем каждый этап.', days: '30–60 дней' },
                { n: '04', icon: 'FileText', title: 'Договор и смета', desc: 'Подписываем договор с фиксированной ценой. Детальная смета на 200+ позиций без скрытых статей.', days: '3–5 дней' },
                { n: '05', icon: 'HardHat', title: 'Строительство', desc: 'Ведём строительство собственной бригадой. Еженедельные фотоотчёты, доступ на объект в любое время.', days: '7–20 мес' },
                { n: '06', icon: 'KeyRound', title: 'Сдача под ключ', desc: 'Принимаете дом с актом выполненных работ. Гарантия 10 лет, инструктаж по всем системам дома.', days: 'Финал' },
              ].map(({ n, icon, title, desc, days }, i) => (
                <div key={n} className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                  {/* Кружок с номером */}
                  <div className="relative z-10 w-20 h-20 rounded-full gold-gradient flex items-center justify-center mb-6 shadow-lg shadow-gold/20">
                    <Icon name={icon} size={28} className="text-primary-foreground" />
                  </div>
                  {/* Стрелка между этапами (мобильная) */}
                  {i < 5 && (
                    <div className="lg:hidden w-px h-8 bg-border mb-6" />
                  )}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs mb-3">
                    <Icon name="Clock" size={11} /> {days}
                  </div>
                  <div className="font-display text-xl font-bold mb-2">{title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Дополнительные детали */}
          <div className="mt-10 md:mt-20 grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: 'BarChart3', title: 'Контроль качества на каждом этапе', desc: 'Независимый технадзор, лабораторные испытания бетона, контроль укладки арматуры и узлов примыканий.' },
              { icon: 'MessageSquare', title: 'Личный кабинет и чат', desc: 'Доступ к онлайн-журналу стройки: фото, документы, график, финансовая отчётность в одном окне.' },
              { icon: 'Trophy', title: 'Приёмка с экспертом', desc: 'На финальной приёмке присутствует независимый строительный эксперт. Все замечания устраняем бесплатно.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-7 rounded-2xl bg-background border border-border">
                <Icon name={icon} size={28} className="text-gold mb-4" />
                <h3 className="font-display text-xl font-bold mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calc" className="py-16 md:py-28 bg-card/40 border-y border-border/50">
        <div className="container">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-gold text-sm tracking-widest uppercase">Калькулятор</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 md:mt-4">Рассчитайте стоимость</h2>
            <p className="text-muted-foreground mt-3 md:mt-4 max-w-xl mx-auto text-sm md:text-base">Предварительный расчёт за минуту. Точную смету подготовим после встречи.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
            <div className="lg:col-span-3 p-5 md:p-8 rounded-2xl bg-card border border-border space-y-7 md:space-y-9">
              <div>
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Площадь дома</span>
                  <span className="text-gold font-semibold">{area} м²</span>
                </div>
                <Slider value={[area]} min={120} max={800} step={10} onValueChange={(v) => setArea(v[0])} />
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Этажность</span>
                  <span className="text-gold font-semibold">{floors} {floors === 1 ? 'этаж' : 'этажа'}</span>
                </div>
                <Slider value={[floors]} min={1} max={3} step={1} onValueChange={(v) => setFloors(v[0])} />
              </div>

              <div>
                <div className="font-medium mb-3">Стиль дома</div>
                <div className="grid grid-cols-3 gap-3">
                  {houseTypes.map((h) => (
                    <button key={h.key} onClick={() => setType(h.key)}
                      className={`py-3 rounded-xl border text-sm transition-all ${type === h.key ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground hover:border-gold/40'}`}>
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-medium mb-3">Материал стен</div>
                <div className="grid grid-cols-3 gap-3">
                  {materials.map((m) => (
                    <button key={m.key} onClick={() => setMaterial(m.key)}
                      className={`py-3 rounded-xl border text-sm transition-all ${material === m.key ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground hover:border-gold/40'}`}>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-medium mb-3">Дополнительные опции</div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {options.map((o) => (
                    <button key={o.key} onClick={() => toggleOpt(o.key)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all ${opts.includes(o.key) ? 'border-gold bg-gold/10' : 'border-border hover:border-gold/40'}`}>
                      <span className="flex items-center gap-2">
                        <Icon name={opts.includes(o.key) ? 'CheckCircle2' : 'Circle'} size={18} className={opts.includes(o.key) ? 'text-gold' : 'text-muted-foreground'} />
                        {o.label}
                      </span>
                      <span className="text-muted-foreground">+{(o.price / 1000000).toFixed(1)} млн</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-20 md:top-28 p-5 md:p-8 rounded-2xl gold-gradient text-primary-foreground">
                <div className="text-sm opacity-80 mb-2">Предварительная стоимость</div>
                <div className="font-display text-3xl md:text-5xl font-bold mb-4 md:mb-6">{fmt(total)}</div>
                <div className="space-y-3 text-sm border-t border-primary-foreground/20 pt-5">
                  <Row l="Строительство" v={fmt(Math.round(construction / 100000) * 100000)} />
                  {options.filter((o) => opts.includes(o.key)).map((o) => (
                    <Row key={o.key} l={o.label} v={fmt(o.price)} />
                  ))}
                </div>
                <Button onClick={handleCalcLead} className="w-full mt-7 bg-background text-foreground hover:bg-background/90 h-12 font-medium">
                  Получить точную смету
                </Button>
                <p className="text-xs opacity-70 mt-4 text-center">Расчёт примерный и не является публичной офертой</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-16 md:py-28 container">
        <div className="text-center mb-8 md:mb-14">
          <span className="text-gold text-sm tracking-widest uppercase">Галерея</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 md:mt-4">Атмосфера наших домов</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {[IMG.hero, IMG.villa, IMG.stone, IMG.villa, IMG.stone, IMG.hero, IMG.villa, IMG.stone].map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl">
              <img src={src} alt={`Галерея ${i + 1}`} className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/15 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-16 md:py-28 bg-card/40 border-y border-border/50">
        <div className="container">
          <div className="text-center mb-8 md:mb-14">
            <span className="text-gold text-sm tracking-widest uppercase">Отзывы</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 md:mt-4">Что говорят владельцы</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-7">
            {reviews.map((r) => (
              <div key={r.name} className="p-8 rounded-2xl bg-card border border-border">
                <div className="flex gap-1 mb-5 text-gold">
                  {Array.from({ length: r.stars }).map((_, i) => <Icon key={i} name="Star" size={18} className="fill-gold" />)}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-7">«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full gold-gradient flex items-center justify-center font-semibold text-primary-foreground">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-sm text-muted-foreground">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-16 md:py-28 container">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-14">
          <div>
            <span className="text-gold text-sm tracking-widest uppercase">Блог</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 md:mt-4">Полезное о строительстве</h2>
          </div>
          <Button variant="outline" className="border-border hover:border-gold hover:text-gold">Все статьи</Button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-7">
          {blog.map((b) => (
            <article key={b.title} className="group p-7 rounded-2xl border border-border bg-card/50 hover:border-gold/50 transition-all cursor-pointer">
              <span className="inline-block text-xs px-3 py-1 rounded-full bg-gold/10 text-gold mb-5">{b.tag}</span>
              <h3 className="font-display text-2xl font-bold mb-5 leading-snug group-hover:text-gold transition-colors">{b.title}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{b.date}</span>
                <Icon name="ArrowUpRight" size={18} className="group-hover:text-gold transition-colors" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-16 md:py-28 bg-card/40 border-t border-border/50">
        <div className="container grid lg:grid-cols-2 gap-8 md:gap-16">
          <div>
            <span className="text-gold text-sm tracking-widest uppercase">Контакты</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 md:mt-4 mb-4 md:mb-6 leading-tight">Обсудим ваш<br />будущий дом</h2>
            <p className="text-muted-foreground mb-7 md:mb-10 max-w-md text-sm md:text-base">
              Оставьте заявку — архитектор свяжется в течение часа, ответит на вопросы и предложит решения под ваш участок.
            </p>
            <div className="space-y-5">
              {[
                ['Phone', '+7 (495) 000-00-00', 'Ежедневно 9:00–21:00'],
                ['Mail', 'hello@archform.ru', 'Ответим в течение часа'],
                ['MapPin', 'Москва, Пресненская наб., 12', 'Офис и шоурум'],
              ].map(([ic, t, s]) => (
                <div key={t} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl border border-gold/30 flex items-center justify-center text-gold shrink-0">
                    <Icon name={ic} size={20} />
                  </div>
                  <div>
                    <div className="font-medium">{t}</div>
                    <div className="text-sm text-muted-foreground">{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="p-5 md:p-8 rounded-2xl bg-card border border-border space-y-4 md:space-y-5">
            <h3 className="font-display text-3xl font-bold mb-2">Оставить заявку</h3>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" className="bg-background border-border h-12" />
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Телефон" className="bg-background border-border h-12" />
            <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="E-mail" className="bg-background border-border h-12" />
            <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Расскажите о проекте: площадь, участок, пожелания" className="bg-background border-border min-h-28" />
            <Button type="submit" disabled={sending} className="w-full gold-gradient text-primary-foreground hover:opacity-90 h-12 font-medium">
              {sending ? 'Отправляем...' : 'Отправить заявку'}
              <Icon name="Send" size={16} className="ml-1" />
            </Button>
            <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
          </form>
        </div>
      </section>

      {/* PROJECT MODAL */}
      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setModal(null)}
        >
          <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
          <div
            className="relative bg-card border border-border rounded-2xl md:rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Фото */}
            <div className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-t-2xl md:rounded-t-3xl">
              <img src={modal.img} alt={modal.title} className="w-full h-full object-cover transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

              {/* Закрыть */}
              <button
                onClick={() => setModal(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/70 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors z-10"
              >
                <Icon name="X" size={20} />
              </button>

              {/* Стрелки навигации */}
              <button
                onClick={(e) => { e.stopPropagation(); goModalPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/70 backdrop-blur flex items-center justify-center text-foreground hover:bg-background hover:text-gold transition-all z-10"
              >
                <Icon name="ChevronLeft" size={22} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goModalNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/70 backdrop-blur flex items-center justify-center text-foreground hover:bg-background hover:text-gold transition-all z-10"
              >
                <Icon name="ChevronRight" size={22} />
              </button>

              {/* Бейдж + счётчик */}
              <div className="absolute bottom-5 left-6 flex items-center gap-3">
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${modal.color}`}>
                  {modal.badge}
                </span>
                {modalCat && (
                  <span className="text-xs text-white/70 bg-background/50 backdrop-blur px-2.5 py-1 rounded-full">
                    {modalIdx + 1} / {modalCat.projects.length}
                  </span>
                )}
              </div>

              {/* Точки-индикаторы */}
              {modalCat && (
                <div className="absolute bottom-5 right-6 flex gap-1.5">
                  {modalCat.projects.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setModal({ ...modalCat.projects[i], badge: modal.badge, color: modal.color }); }}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i === modalIdx ? 'bg-gold w-4' : 'bg-white/40 hover:bg-white/70'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Контент */}
            <div className="p-4 md:p-8">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h2 className="font-display text-xl md:text-3xl font-bold leading-tight mb-1">{modal.title}</h2>
                  <div className="flex items-center gap-1.5 text-gold text-sm">
                    <Icon name="MapPin" size={14} /> {modal.loc}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display text-lg md:text-2xl font-bold text-gold">{modal.price}</div>
                  {modal.year && <div className="text-xs text-muted-foreground mt-1">Год: {modal.year}</div>}
                </div>
              </div>

              {/* Характеристики */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { icon: 'Maximize2', label: 'Площадь', val: modal.area },
                  { icon: 'Layers', label: 'Этажей', val: modal.floors ? `${modal.floors} эт.` : '—' },
                  { icon: 'BedDouble', label: 'Спален', val: modal.bedrooms ? `${modal.bedrooms} сп.` : '—' },
                  { icon: 'Clock', label: 'Срок', val: modal.term },
                ].map(({ icon, label, val }) => (
                  <div key={label} className="p-4 rounded-xl bg-background border border-border text-center">
                    <Icon name={icon} size={20} className="text-gold mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
                    <div className="font-semibold text-sm">{val}</div>
                  </div>
                ))}
              </div>

              {modal.style && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-muted-foreground">Стиль:</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-muted border border-border">{modal.style}</span>
                </div>
              )}

              {modal.desc && (
                <p className="text-muted-foreground leading-relaxed mb-7">{modal.desc}</p>
              )}

              {/* Похожие проекты */}
              {(() => {
                const cat = portfolioCategories.find((c) => c.badge === modal.badge);
                const similar = cat?.projects.filter((p) => p.title !== modal.title).slice(0, 3) ?? [];
                if (!similar.length) return null;
                return (
                  <div className="mb-7">
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Похожие проекты</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                      {similar.map((p) => (
                        <button
                          key={p.title}
                          onClick={() => setModal({ ...p, badge: modal.badge, color: modal.color })}
                          className="group relative rounded-xl overflow-hidden aspect-[4/3] text-left"
                        >
                          <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                          <div className="absolute bottom-0 inset-x-0 p-2.5">
                            <div className="text-xs font-medium leading-tight line-clamp-1">{p.title}</div>
                            <div className="text-gold text-xs mt-0.5">{p.price}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="flex-1 gold-gradient text-primary-foreground hover:opacity-90 h-12 font-medium"
                  onClick={() => {
                    setModal(null);
                    setForm((f) => ({ ...f, message: `Интересует проект: ${modal.title} (${modal.area}, ${modal.price})` }));
                    setTimeout(() => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                >
                  <Icon name="Send" size={16} className="mr-2" />
                  Обсудить проект
                </Button>
                <Button
                  variant="outline"
                  className="h-12 border-border hover:border-gold hover:text-gold"
                  onClick={() => setModal(null)}
                >
                  Закрыть
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-border/50">
        {/* Основная часть */}
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display text-2xl font-black uppercase tracking-tight">ЮНИТ <span className="text-gold">1</span></span>
          <p className="text-sm text-muted-foreground text-center">© 2026 ЮНИТ 1 — премиальное строительство в Москве и области</p>
          <div className="flex gap-4">
            {['Send', 'Instagram', 'Youtube'].map((ic) => (
              <button key={ic} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors">
                <Icon name={ic} size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* Реквизиты */}
        <div className="border-t border-border/30 bg-card/30">
          <div className="container py-6">
            <div className="flex flex-wrap gap-x-8 gap-y-1 text-xs text-muted-foreground/70">
              <span>ООО «Юнит-1»</span>
              <span>ИНН: 5032263756</span>
              <span>КПП: 503201001</span>
              <span>ОГРН: 1135032002181</span>
              <span className="w-full sm:w-auto">143005, Московская область, Одинцовский район, г. Одинцово, Можайское шоссе, д. 112А, пом/ком 29/1</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Row = ({ l, v }: { l: string; v: string }) => (
  <div className="flex justify-between">
    <span className="opacity-80">{l}</span>
    <span className="font-medium">{v}</span>
  </div>
);

export default Index;