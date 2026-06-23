import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const HERO_IMG = 'https://cdn.poehali.dev/projects/6f6f0ed1-9cda-4625-a43d-52bb943acf59/files/8f9cef79-6f2c-4eb3-91f6-e6f14d615eed.jpg';
const TOOLS_IMG = 'https://cdn.poehali.dev/projects/6f6f0ed1-9cda-4625-a43d-52bb943acf59/files/ab3e9277-bc43-4cf3-8e39-8bc85cc67b47.jpg';

const SERVICES = [
  { icon: 'Refrigerator', title: 'Холодильники', price: 'от 900 ₽', base: 900 },
  { icon: 'WashingMachine', title: 'Стиральные машины', price: 'от 800 ₽', base: 800 },
  { icon: 'Flame', title: 'Электроплиты', price: 'от 700 ₽', base: 700 },
  { icon: 'CookingPot', title: 'Варочные панели', price: 'от 750 ₽', base: 750 },
  { icon: 'Droplets', title: 'Водонагреватели', price: 'от 850 ₽', base: 850 },
  { icon: 'Utensils', title: 'Посудомоечные машины', price: 'от 950 ₽', base: 950 },
  { icon: 'Wind', title: 'Сушильные машины', price: 'от 900 ₽', base: 900 },
  { icon: 'Microwave', title: 'Духовые шкафы', price: 'от 800 ₽', base: 800 },
  { icon: 'Snowflake', title: 'Морозильные камеры', price: 'от 950 ₽', base: 950 },
  { icon: 'AirVent', title: 'Кондиционеры', price: 'от 1200 ₽', base: 1200 },
  { icon: 'Coffee', title: 'Кофемашины', price: 'от 700 ₽', base: 700 },
];

const BREAKDOWNS = [
  { name: 'Диагностика и мелкий ремонт', mult: 1 },
  { name: 'Замена детали средней сложности', mult: 1.8 },
  { name: 'Сложный ремонт / замена платы', mult: 3 },
  { name: 'Капитальный ремонт', mult: 4.5 },
];

const STATS = [
  { value: '14', label: 'лет на рынке' },
  { value: '38 000+', label: 'выполненных заказов' },
  { value: '60 мин', label: 'средний выезд' },
  { value: '2 года', label: 'гарантия на работу' },
];

const PORTFOLIO = [
  { tech: 'Холодильник Bosch', issue: 'Замена компрессора', time: '1 час 20 мин' },
  { tech: 'Стиральная Samsung', issue: 'Ремонт модуля управления', time: '50 минут' },
  { tech: 'Посудомойка Electrolux', issue: 'Чистка и замена помпы', time: '40 минут' },
  { tech: 'Кондиционер LG', issue: 'Заправка и диагностика', time: '1 час' },
  { tech: 'Духовой шкаф Gorenje', issue: 'Замена ТЭНа', time: '35 минут' },
  { tech: 'Кофемашина DeLonghi', issue: 'Чистка гидросистемы', time: '45 минут' },
];

const REVIEWS = [
  { name: 'Анна К.', text: 'Холодильник перестал морозить вечером — мастер приехал утром, починил за час. Всё работает идеально!', rate: 5 },
  { name: 'Дмитрий П.', text: 'Стиральная машина текла, думал менять. Оказалось — копеечная деталь. Спасибо за честность!', rate: 5 },
  { name: 'Елена С.', text: 'Вызывала по кондиционеру. Приехали в тот же день, объяснили причину, дали гарантию. Рекомендую.', rate: 5 },
];

const NAV = [
  { label: 'Главная', id: 'home' },
  { label: 'Услуги', id: 'services' },
  { label: 'Калькулятор', id: 'calc' },
  { label: 'О компании', id: 'about' },
  { label: 'Портфолио', id: 'portfolio' },
  { label: 'Отзывы', id: 'reviews' },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Index = () => {
  const [service, setService] = useState(SERVICES[0]);
  const [breakdown, setBreakdown] = useState(BREAKDOWNS[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  const estimate = Math.round(service.base * breakdown.mult);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary grid place-items-center glow-blue">
              <Icon name="Wrench" className="text-primary-foreground" size={20} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">РемТех<span className="text-accent">Сервис</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+74950000000" className="hidden sm:flex items-center gap-2 text-sm font-semibold">
              <Icon name="Phone" size={16} className="text-accent" /> +7 (495) 000-00-00
            </a>
            <Button onClick={() => scrollTo('calc')} className="hidden sm:inline-flex">Вызвать мастера</Button>
            <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-background/95 px-6 py-4 flex flex-col gap-3 animate-fade-in">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => { scrollTo(n.id); setMenuOpen(false); }} className="text-left text-muted-foreground">
                {n.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative pt-32 pb-20 grid-bg">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-muted-foreground">Работаем 24/7 · Выезд за 60 минут</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
              Ремонт бытовой<br />техники <span className="text-gradient">на дому</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              Чиним холодильники, стиральные машины, плиты и ещё 8 видов техники. С гарантией до 2 лет и фиксированной ценой до начала работ.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollTo('calc')} className="text-base h-12 px-7">
                <Icon name="Calculator" size={18} className="mr-2" /> Рассчитать стоимость
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('services')} className="text-base h-12 px-7">
                Все услуги
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-10">
              {STATS.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-2xl scale-95" />
            <img src={HERO_IMG} alt="Мастер по ремонту техники" className="relative rounded-3xl border border-border w-full object-cover aspect-[4/3]" />
            <Card className="absolute -bottom-6 -left-6 p-4 flex items-center gap-3 bg-card/95 backdrop-blur animate-float">
              <div className="w-11 h-11 rounded-xl bg-accent grid place-items-center">
                <Icon name="ShieldCheck" className="text-accent-foreground" size={22} />
              </div>
              <div>
                <div className="font-semibold text-sm">Гарантия до 2 лет</div>
                <div className="text-xs text-muted-foreground">на все работы и детали</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 relative">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Что мы чиним</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">11 видов техники</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Выберите свою технику — покажем цены и вызовем мастера в удобное время</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <Card key={s.title} className="p-6 hover-lift cursor-pointer group border-border bg-card" onClick={() => { setService(s); scrollTo('calc'); }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-secondary grid place-items-center group-hover:bg-primary transition-colors">
                    <Icon name={s.icon} className="text-primary group-hover:text-primary-foreground transition-colors" size={26} />
                  </div>
                  <Icon name="ArrowUpRight" className="text-muted-foreground group-hover:text-accent transition-colors" size={20} />
                </div>
                <h3 className="font-display text-xl font-semibold">Ремонт {s.title.toLowerCase()}</h3>
                <p className="text-accent font-semibold mt-2">{s.price}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calc" className="py-24 relative grid-bg">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-[140px]" />
        <div className="container relative">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Онлайн-расчёт</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Калькулятор стоимости</h2>
            <p className="text-muted-foreground mt-3">Прикидочная цена за 30 секунд — точную назовёт мастер после диагностики</p>
          </div>
          <Card className="max-w-4xl mx-auto p-6 md:p-10 bg-card border-border glow-blue">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="text-sm font-semibold text-muted-foreground mb-3 block">1. Тип техники</label>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                  {SERVICES.map((s) => (
                    <button
                      key={s.title}
                      onClick={() => setService(s)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-left text-sm transition-all ${service.title === s.title ? 'border-primary bg-primary/10 text-foreground' : 'border-border text-muted-foreground hover:border-primary/50'}`}
                    >
                      <Icon name={s.icon} size={18} className={service.title === s.title ? 'text-primary' : ''} />
                      <span className="truncate">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-muted-foreground mb-3 block">2. Тип поломки</label>
                <div className="flex flex-col gap-2">
                  {BREAKDOWNS.map((b) => (
                    <button
                      key={b.name}
                      onClick={() => setBreakdown(b)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-sm transition-all ${breakdown.name === b.name ? 'border-accent bg-accent/10 text-foreground' : 'border-border text-muted-foreground hover:border-accent/50'}`}
                    >
                      <span>{b.name}</span>
                      {breakdown.name === b.name && <Icon name="Check" size={16} className="text-accent" />}
                    </button>
                  ))}
                </div>
                <div className="mt-auto pt-6">
                  <div className="rounded-2xl bg-secondary p-6 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Примерная стоимость</div>
                    <div className="font-display text-5xl font-bold text-gradient">{estimate.toLocaleString('ru-RU')} ₽</div>
                    <Button className="w-full mt-5 h-11" onClick={() => scrollTo('about')}>
                      <Icon name="Phone" size={16} className="mr-2" /> Вызвать мастера
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24">
        <div className="container grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <img src={TOOLS_IMG} alt="Инструменты мастера" className="rounded-3xl border border-border w-full object-cover aspect-square" />
          </div>
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">О компании</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">Сервис, которому доверяют 14 лет</h2>
            <p className="text-muted-foreground mb-8">
              РемТехСервис — команда сертифицированных инженеров с оригинальными запчастями на складе. Мы называем цену до начала работ и не берём денег, если не смогли починить.
            </p>
            <div className="grid grid-cols-2 gap-5 mb-8">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
                  <div className="font-display text-3xl font-bold text-gradient">{s.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {['Оригинальные запчасти', 'Без предоплаты', 'Чек и договор'].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm">
                  <Icon name="CircleCheck" size={18} className="text-accent" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 grid-bg">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Наши работы</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Портфолио ремонтов</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PORTFOLIO.map((p) => (
              <Card key={p.tech} className="p-6 bg-card border-border hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/15 grid place-items-center">
                    <Icon name="Wrench" size={20} className="text-primary" />
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-accent/15 text-accent font-semibold">Готово</span>
                </div>
                <h3 className="font-display text-lg font-semibold">{p.tech}</h3>
                <p className="text-muted-foreground text-sm mt-1">{p.issue}</p>
                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <Icon name="Clock" size={15} className="text-accent" /> {p.time}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Отзывы</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Что говорят клиенты</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <Card key={r.name} className="p-7 bg-card border-border">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rate }).map((_, i) => (
                    <Icon key={i} name="Star" size={18} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-foreground/90 mb-6">«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary grid place-items-center font-display font-semibold text-primary-foreground">
                    {r.name[0]}
                  </div>
                  <span className="font-semibold">{r.name}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <Card className="relative overflow-hidden p-10 md:p-16 text-center border-border bg-gradient-to-br from-primary/20 to-accent/10">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-[120px]" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Техника сломалась? Починим сегодня!</h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">Оставьте заявку — мастер перезвонит в течение 10 минут и приедет в удобное время.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="h-12 px-8" onClick={() => scrollTo('calc')}>
                  <Icon name="Calculator" size={18} className="mr-2" /> Рассчитать стоимость
                </Button>
                <a href="tel:+74950000000">
                  <Button size="lg" variant="outline" className="h-12 px-8">
                    <Icon name="Phone" size={18} className="mr-2" /> +7 (495) 000-00-00
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12">
        <div className="container grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary grid place-items-center">
                <Icon name="Wrench" className="text-primary-foreground" size={18} />
              </div>
              <span className="font-display text-lg font-bold">РемТех<span className="text-accent">Сервис</span></span>
            </div>
            <p className="text-sm text-muted-foreground">Ремонт бытовой техники на дому с гарантией до 2 лет. Работаем по всему городу 24/7.</p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><Icon name="Phone" size={15} className="text-accent" /> +7 (495) 000-00-00</p>
              <p className="flex items-center gap-2"><Icon name="Mail" size={15} className="text-accent" /> info@remtehservice.ru</p>
              <p className="flex items-center gap-2"><Icon name="Clock" size={15} className="text-accent" /> Круглосуточно, без выходных</p>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Разделы</h4>
            <div className="space-y-2 text-sm">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} className="block text-muted-foreground hover:text-foreground transition-colors">{n.label}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="container mt-10 pt-6 border-t border-border text-sm text-muted-foreground text-center">
          © 2026 РемТехСервис. Все права защищены.
        </div>
      </footer>
    </div>
  );
};

export default Index;
