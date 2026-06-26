import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const LEAD_URL = 'https://functions.poehali.dev/ecb985a5-1966-4a54-9078-02c89d51bbe2';

const ymGoal = (goal: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (typeof window !== 'undefined' && w.ym) {
    w.ym(101026698, 'reachGoal', goal);
  }
};

const getUtmParams = () => {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get('utm_source') || '',
    utm_medium: p.get('utm_medium') || '',
    utm_campaign: p.get('utm_campaign') || '',
    utm_term: p.get('utm_term') || '',
  };
};

const benefits = [
  { icon: 'ShieldCheck', title: 'Фиксированная смета', desc: 'Цена в договоре не меняется. Никаких доплат в процессе строительства.' },
  { icon: 'Clock', title: 'Сдача в срок', desc: '17 лет на рынке — ни один объект не сдан позже прописанной даты.' },
  { icon: 'Award', title: 'Гарантия 10 лет', desc: 'На конструктив и все инженерные системы. Письменно, в договоре.' },
  { icon: 'Users', title: 'Собственная бригада', desc: 'Только штатные мастера, никаких субподрядчиков. Контроль качества 100%.' },
];

const steps = [
  { n: '01', title: 'Звонок архитектора', desc: 'В течение часа — обсудим участок, бюджет и стиль дома.' },
  { n: '02', title: 'Бесплатный проект', desc: 'Эскиз и предварительная смета — без обязательств.' },
  { n: '03', title: 'Договор и старт', desc: 'Фиксируем цену и сроки. Выходим на объект.' },
  { n: '04', title: 'Приёмка ключей', desc: 'Подписываем акт, получаете гарантийный паспорт.' },
];

const cases = [
  { area: '420 м²', price: 'от 38 млн ₽', term: '11 мес', style: 'Современный минимализм', name: 'Резиденция «Лесная»' },
  { area: '240 м²', price: 'от 14 млн ₽', term: '9 мес', style: 'Функциональный модерн', name: 'Дом «Семейный»' },
  { area: '110 м²', price: 'от 3.8 млн ₽', term: '5 мес', style: 'Компактный', name: 'Дом «Компакт»' },
];

export default function Landing() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 47, s: 12 });

  useEffect(() => {
    const tick = setInterval(() => {
      setTimeLeft((t) => {
        if (t.s > 0) return { ...t, s: t.s - 1 };
        if (t.m > 0) return { ...t, m: t.m - 1, s: 59 };
        if (t.h > 0) return { h: t.h - 1, m: 59, s: 59 };
        return t;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const handleSubmit = async (e: React.FormEvent, source: string) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: 'Заполните имя и телефон', variant: 'destructive' });
      return;
    }
    setSending(true);
    ymGoal('lead_form_submit');
    const utms = getUtmParams();
    try {
      const res = await fetch(LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source, ...utms }),
      });
      if (!res.ok) throw new Error();
      ymGoal('lead_success');
      setSent(true);
      toast({ title: 'Заявка принята!', description: 'Архитектор позвонит вам в течение часа.' });
    } catch {
      toast({ title: 'Ошибка отправки', description: 'Позвоните нам: 8 (933) 177-00-86', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-card" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #C9973A 0%, transparent 60%)' }} />

        <div className="relative container grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-20 md:py-28">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Москва и Подмосковье · с 2009 года · 180+ домов
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Построим дом мечты<br />
              <span className="gold-text-gradient">под ключ</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              Фиксированная смета без доплат. Собственная бригада. Гарантия 10 лет. Бесплатный архитектурный проект при заключении договора.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              {['Фиксированная цена', 'Сдача в срок', 'Гарантия 10 лет'].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm">
                  <Icon name="CheckCircle2" size={16} className="text-gold" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+79331770086"
                onClick={() => ymGoal('phone_click')}
                className="inline-flex items-center gap-2 px-6 h-12 rounded-lg border border-gold/40 text-gold font-medium hover:bg-gold/10 transition-colors text-sm"
              >
                <Icon name="Phone" size={16} />
                8 (933) 177-00-86
              </a>
            </div>
          </div>

          {/* Форма */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            {sent ? (
              <div className="text-center py-8">
                <Icon name="CheckCircle2" size={48} className="text-gold mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold mb-2">Заявка принята!</h3>
                <p className="text-muted-foreground">Архитектор позвонит вам в течение часа. Подготовьте примеры домов, которые вам нравятся.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    Акция до конца месяца
                  </div>
                  <h2 className="font-display text-2xl font-bold leading-tight">
                    Получите бесплатный проект дома
                  </h2>
                  <p className="text-muted-foreground text-sm mt-2">Стоимость проекта — от 350 000 ₽. При заключении договора в июне — в подарок.</p>
                </div>

                {/* Таймер */}
                <div className="flex gap-2 mb-6">
                  {[
                    { val: String(timeLeft.h).padStart(2, '0'), label: 'ч' },
                    { val: String(timeLeft.m).padStart(2, '0'), label: 'мин' },
                    { val: String(timeLeft.s).padStart(2, '0'), label: 'сек' },
                  ].map(({ val, label }, i) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="text-center">
                        <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center font-display text-xl font-bold text-primary-foreground">{val}</div>
                        <div className="text-xs text-muted-foreground mt-1">{label}</div>
                      </div>
                      {i < 2 && <span className="text-gold font-bold text-xl mb-4">:</span>}
                    </div>
                  ))}
                </div>

                <form onSubmit={(e) => handleSubmit(e, 'Лендинг — hero форма')} className="space-y-3">
                  <Input
                    placeholder="Ваше имя"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-12 bg-background border-border"
                  />
                  <Input
                    placeholder="Телефон"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="h-12 bg-background border-border"
                  />
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full h-12 gold-gradient text-primary-foreground hover:opacity-90 font-medium"
                    onClick={() => ymGoal('hero_form_click')}
                  >
                    {sending ? 'Отправляем...' : 'Получить проект бесплатно'}
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ВЫГОДЫ */}
      <section className="py-16 border-y border-border/50 bg-card/40">
        <div className="container grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl border border-gold/30 flex items-center justify-center text-gold shrink-0">
                <Icon name={b.icon} size={18} />
              </div>
              <div>
                <div className="font-semibold text-sm mb-1">{b.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ЦИФРЫ */}
      <section className="py-16 md:py-20 container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { val: '180+', label: 'домов построено' },
            { val: '17', label: 'лет на рынке' },
            { val: '100%', label: 'без переплат' },
            { val: '4.9', label: 'рейтинг клиентов' },
          ].map(({ val, label }) => (
            <div key={label} className="p-6 rounded-2xl bg-card border border-border text-center">
              <div className="font-display text-4xl font-bold gold-text-gradient mb-1">{val}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* КАК МЫ РАБОТАЕМ */}
      <section className="py-16 md:py-20 bg-card/40 border-y border-border/50">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-gold text-sm tracking-widest uppercase">Процесс</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">Как мы работаем</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="relative p-6 rounded-2xl bg-background border border-border">
                <div className="font-display text-4xl font-bold text-gold/20 mb-4">{s.n}</div>
                <div className="font-semibold mb-2">{s.title}</div>
                <div className="text-sm text-muted-foreground">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРИМЕРЫ */}
      <section className="py-16 md:py-20 container">
        <div className="text-center mb-12">
          <span className="text-gold text-sm tracking-widest uppercase">Портфолио</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">Дома для любого бюджета</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div key={c.name} className="p-6 rounded-2xl bg-card border border-border hover:border-gold/40 transition-all">
              <div className="text-xs text-gold mb-3 uppercase tracking-wider">{c.style}</div>
              <div className="font-display text-xl font-bold mb-4">{c.name}</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between"><span>Площадь</span><span className="text-foreground font-medium">{c.area}</span></div>
                <div className="flex justify-between"><span>Срок</span><span className="text-foreground font-medium">{c.term}</span></div>
                <div className="flex justify-between"><span>Стоимость</span><span className="text-gold font-semibold">{c.price}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ФИНАЛЬНАЯ ФОРМА */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-background via-card/80 to-background border-y border-gold/20">
        <div className="container max-w-xl text-center">
          <span className="text-gold text-sm tracking-widest uppercase">Бесплатно</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">Рассчитайте стоимость вашего дома</h2>
          <p className="text-muted-foreground mb-8">Оставьте номер — архитектор позвонит, уточнит детали и подготовит смету бесплатно за 24 часа.</p>
          {sent ? (
            <div className="flex items-center justify-center gap-3 text-gold font-medium">
              <Icon name="CheckCircle2" size={20} />
              Заявка принята — ждите звонка!
            </div>
          ) : (
            <form onSubmit={(e) => handleSubmit(e, 'Лендинг — нижняя форма')} className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Имя"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-12 bg-background border-border flex-1"
              />
              <Input
                placeholder="Телефон"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="h-12 bg-background border-border flex-1"
              />
              <Button
                type="submit"
                disabled={sending}
                className="h-12 gold-gradient text-primary-foreground hover:opacity-90 font-medium px-6 shrink-0"
                onClick={() => ymGoal('bottom_form_click')}
              >
                {sending ? '...' : 'Получить расчёт'}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-border/50">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-display font-black text-foreground uppercase">ЮНИТ <span className="text-gold">1</span></span>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+79331770086" onClick={() => ymGoal('phone_click')} className="hover:text-gold transition-colors flex items-center gap-1.5">
              <Icon name="Phone" size={14} />8 (933) 177-00-86
            </a>
            <a href="mailto:emmas@yandex.ru" className="hover:text-gold transition-colors flex items-center gap-1.5">
              <Icon name="Mail" size={14} />emmas@yandex.ru
            </a>
            <span className="flex items-center gap-1.5">
              <Icon name="MapPin" size={14} />Одинцово, Маршала Неделина, 6Б, офис 515
            </span>
          </div>
          <a href="/" className="hover:text-gold transition-colors">На главный сайт →</a>
        </div>
      </footer>
    </div>
  );
}
