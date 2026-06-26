import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';

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

const portfolio = [
  { img: IMG.hero, title: 'Резиденция «Лесная»', loc: 'Новорижское шоссе', area: '420 м²', term: '11 мес', price: 'от 38 млн ₽' },
  { img: IMG.villa, title: 'Вилла «Модерн»', loc: 'Рублёво-Успенское ш.', area: '560 м²', term: '14 мес', price: 'от 62 млн ₽' },
  { img: IMG.stone, title: 'Особняк «Каменный»', loc: 'Калужское шоссе', area: '380 м²', term: '10 мес', price: 'от 34 млн ₽' },
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
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="container flex items-center justify-between h-20">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
            <span className="font-display text-3xl font-bold tracking-tight">ARCH<span className="text-gold">FORM</span></span>
          </button>
          <nav className="hidden lg:flex items-center gap-7">
            {nav.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('contacts')} className="gold-gradient text-primary-foreground hover:opacity-90 font-medium hidden sm:inline-flex">
            Обсудить проект
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center grain">
        <div className="absolute inset-0">
          <img src={IMG.hero} alt="Премиальный дом" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        <div className="container relative z-10 pt-20">
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 text-gold text-sm mb-7">
              <Icon name="Sparkles" size={14} /> Премиальное строительство с 2009 года
            </div>
            <h1 className="font-display text-5xl sm:text-7xl font-bold leading-[1.05] mb-6">
              Дома, в которых
              <br />
              <span className="gold-text-gradient">хочется жить</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-9 leading-relaxed">
              Проектируем и строим премиальные дома под ключ в Москве и Московской области.
              Авторская архитектура, фиксированная смета и гарантия 10 лет.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollTo('calc')} className="gold-gradient text-primary-foreground hover:opacity-90 h-14 px-8 text-base font-medium">
                Рассчитать стоимость
                <Icon name="ArrowRight" size={18} className="ml-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('portfolio')} className="h-14 px-8 text-base border-border hover:border-gold hover:text-gold">
                Смотреть работы
              </Button>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-4 mt-14">
              {[['180+', 'домов построено'], ['10 лет', 'гарантия'], ['0 ₽', 'переплат по смете']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-4xl font-bold text-gold">{v}</div>
                  <div className="text-sm text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button onClick={() => scrollTo('about')} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-float-slow">
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src={IMG.stone} alt="О компании" className="rounded-2xl w-full object-cover aspect-[4/5]" />
            <div className="absolute -bottom-8 -right-4 sm:right-8 bg-card border border-gold/30 rounded-2xl p-6 w-56 shadow-2xl">
              <div className="font-display text-5xl font-bold text-gold">17</div>
              <div className="text-sm text-muted-foreground mt-1">лет создаём дома премиум-класса в Подмосковье</div>
            </div>
          </div>
          <div>
            <span className="text-gold text-sm tracking-widest uppercase">О компании</span>
            <h2 className="font-display text-5xl font-bold mt-4 mb-6 leading-tight">
              Архитектурное бюро <br />полного цикла
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
      <section id="portfolio" className="py-28 bg-card/40 border-y border-border/50">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-gold text-sm tracking-widest uppercase">Портфолио</span>
              <h2 className="font-display text-5xl font-bold mt-4">Реализованные проекты</h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              Каждый дом уникален и спроектирован под образ жизни конкретной семьи.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {portfolio.map((p) => (
              <div key={p.title} className="group relative rounded-2xl overflow-hidden cursor-pointer">
                <img src={p.img} alt={p.title} className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-7">
                  <div className="flex items-center gap-2 text-gold text-sm mb-2">
                    <Icon name="MapPin" size={14} /> {p.loc}
                  </div>
                  <h3 className="font-display text-3xl font-bold mb-4">{p.title}</h3>
                  <div className="flex gap-5 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span>{p.area}</span>
                    <span>{p.term}</span>
                    <span className="text-gold">{p.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 container">
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-widest uppercase">Услуги</span>
          <h2 className="font-display text-5xl font-bold mt-4">Полный цикл под ключ</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* CALCULATOR */}
      <section id="calc" className="py-28 bg-card/40 border-y border-border/50">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-gold text-sm tracking-widest uppercase">Калькулятор</span>
            <h2 className="font-display text-5xl font-bold mt-4">Рассчитайте стоимость дома</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Предварительный расчёт за минуту. Точную смету подготовим после встречи.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 p-8 rounded-2xl bg-card border border-border space-y-9">
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
              <div className="sticky top-28 p-8 rounded-2xl gold-gradient text-primary-foreground">
                <div className="text-sm opacity-80 mb-2">Предварительная стоимость</div>
                <div className="font-display text-5xl font-bold mb-6">{fmt(total)}</div>
                <div className="space-y-3 text-sm border-t border-primary-foreground/20 pt-5">
                  <Row l="Строительство" v={fmt(Math.round(construction / 100000) * 100000)} />
                  {options.filter((o) => opts.includes(o.key)).map((o) => (
                    <Row key={o.key} l={o.label} v={fmt(o.price)} />
                  ))}
                </div>
                <Button onClick={() => scrollTo('contacts')} className="w-full mt-7 h-13 bg-background text-foreground hover:bg-background/90 h-12 font-medium">
                  Получить точную смету
                </Button>
                <p className="text-xs opacity-70 mt-4 text-center">Расчёт примерный и не является публичной офертой</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28 container">
        <div className="text-center mb-14">
          <span className="text-gold text-sm tracking-widest uppercase">Галерея</span>
          <h2 className="font-display text-5xl font-bold mt-4">Атмосфера наших домов</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[IMG.hero, IMG.villa, IMG.stone, IMG.villa, IMG.stone, IMG.hero, IMG.villa, IMG.stone].map((src, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-xl ${i % 3 === 0 ? 'row-span-2' : ''}`}>
              <img src={src} alt={`Галерея ${i + 1}`} className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i % 3 === 0 ? 'aspect-[3/4] h-full' : 'aspect-square'}`} />
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/15 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28 bg-card/40 border-y border-border/50">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-gold text-sm tracking-widest uppercase">Отзывы</span>
            <h2 className="font-display text-5xl font-bold mt-4">Что говорят владельцы</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
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
      <section id="blog" className="py-28 container">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-gold text-sm tracking-widest uppercase">Блог</span>
            <h2 className="font-display text-5xl font-bold mt-4">Полезное о строительстве</h2>
          </div>
          <Button variant="outline" className="border-border hover:border-gold hover:text-gold">Все статьи</Button>
        </div>
        <div className="grid md:grid-cols-3 gap-7">
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
      <section id="contacts" className="py-28 bg-card/40 border-t border-border/50">
        <div className="container grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-gold text-sm tracking-widest uppercase">Контакты</span>
            <h2 className="font-display text-5xl font-bold mt-4 mb-6 leading-tight">Обсудим ваш<br />будущий дом</h2>
            <p className="text-muted-foreground mb-10 max-w-md">
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

          <form onSubmit={(e) => e.preventDefault()} className="p-8 rounded-2xl bg-card border border-border space-y-5">
            <h3 className="font-display text-3xl font-bold mb-2">Оставить заявку</h3>
            <Input placeholder="Ваше имя" className="bg-background border-border h-12" />
            <Input placeholder="Телефон" className="bg-background border-border h-12" />
            <Input placeholder="E-mail" className="bg-background border-border h-12" />
            <Textarea placeholder="Расскажите о проекте: площадь, участок, пожелания" className="bg-background border-border min-h-28" />
            <Button className="w-full gold-gradient text-primary-foreground hover:opacity-90 h-13 h-12 font-medium">
              Отправить заявку
              <Icon name="Send" size={16} className="ml-1" />
            </Button>
            <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-border/50">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display text-2xl font-bold">ARCH<span className="text-gold">FORM</span></span>
          <p className="text-sm text-muted-foreground">© 2026 ARCHFORM — премиальное строительство в Москве и области</p>
          <div className="flex gap-4">
            {['Send', 'Instagram', 'Youtube'].map((ic) => (
              <button key={ic} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors">
                <Icon name={ic} size={18} />
              </button>
            ))}
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
