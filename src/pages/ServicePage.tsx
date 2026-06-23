import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import OrderModal from '@/components/OrderModal';
import { SERVICES, BREAKDOWNS, type Service } from '@/data/services';

interface Props {
  service: Service;
}

const STATS = [
  { value: '14', label: 'лет на рынке' },
  { value: '38 000+', label: 'ремонтов' },
  { value: '60 мин', label: 'средний выезд' },
  { value: '2 года', label: 'гарантия' },
];

export default function ServicePage({ service }: Props) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [breakdown, setBreakdown] = useState(BREAKDOWNS[0]);
  const estimate = Math.round(service.base * breakdown.mult);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} defaultService={service.title} />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary grid place-items-center">
              <Icon name="Wrench" className="text-primary-foreground" size={20} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">РемТех<span className="text-accent">Сервис</span></span>
          </button>
          <div className="flex items-center gap-3">
            <a href="tel:+74950000000" className="hidden sm:flex items-center gap-2 text-sm font-semibold">
              <Icon name="Phone" size={16} className="text-accent" /> +7 (495) 000-00-00
            </a>
            <Button onClick={() => setModalOpen(true)}>Вызвать мастера</Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-32 pb-20 grid-bg overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />
        <div className="container relative">
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <Icon name="ArrowLeft" size={16} /> На главную
          </button>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/20 grid place-items-center">
                <Icon name={service.icon} size={18} className="text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Ремонт бытовой техники</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
              Ремонт <span className="text-gradient">{service.title.toLowerCase()}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8">{service.description}</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-12 px-7" onClick={() => setModalOpen(true)}>
                <Icon name="Phone" size={18} className="mr-2" /> Вызвать мастера
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-7" onClick={() => document.getElementById('calc')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="Calculator" size={18} className="mr-2" /> Рассчитать цену
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 mt-10">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Частые поломки</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">С чем обращаются чаще всего</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.problems.map((p) => (
              <div key={p} className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-card">
                <div className="w-8 h-8 rounded-lg bg-primary/10 grid place-items-center flex-shrink-0">
                  <Icon name="AlertTriangle" size={16} className="text-primary" />
                </div>
                <span className="text-sm">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-20 grid-bg">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Как мы работаем</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">4 шага до работающей техники</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.steps.map((step, i) => (
              <div key={step.title} className="relative">
                {i < service.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-border to-transparent z-0" />
                )}
                <Card className="p-6 bg-card border-border relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 grid place-items-center mb-4">
                    <Icon name={step.icon} size={22} className="text-primary" />
                  </div>
                  <div className="text-xs text-accent font-bold mb-1">Шаг {i + 1}</div>
                  <h3 className="font-display text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calc" className="py-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Калькулятор</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">Стоимость ремонта {service.title.toLowerCase()}</h2>
          </div>
          <Card className="p-6 md:p-10 bg-card border-border glow-blue">
            <label className="text-sm font-semibold text-muted-foreground mb-3 block">Выберите тип поломки</label>
            <div className="flex flex-col gap-2 mb-8">
              {BREAKDOWNS.map((b) => (
                <button
                  key={b.name}
                  onClick={() => setBreakdown(b)}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left text-sm transition-all ${breakdown.name === b.name ? 'border-accent bg-accent/10 text-foreground' : 'border-border text-muted-foreground hover:border-accent/50'}`}
                >
                  <span>{b.name}</span>
                  {breakdown.name === b.name && <Icon name="Check" size={16} className="text-accent" />}
                </button>
              ))}
            </div>
            <div className="rounded-2xl bg-secondary p-6 text-center">
              <div className="text-sm text-muted-foreground mb-1">Примерная стоимость</div>
              <div className="font-display text-5xl font-bold text-gradient mb-5">{estimate.toLocaleString('ru-RU')} ₽</div>
              <Button className="w-full h-12 text-base" onClick={() => setModalOpen(true)}>
                <Icon name="Phone" size={18} className="mr-2" /> Вызвать мастера
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 grid-bg">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Вопросы и ответы</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">Часто спрашивают</h2>
          </div>
          <div className="flex flex-col gap-4">
            {service.faq.map((item) => (
              <Card key={item.q} className="p-6 bg-card border-border">
                <h3 className="font-semibold mb-2 flex items-start gap-3">
                  <Icon name="HelpCircle" size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  {item.q}
                </h3>
                <p className="text-muted-foreground text-sm ml-7">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Также ремонтируем</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">Другие виды техники</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
              <button
                key={s.slug}
                onClick={() => navigate(`/uslugi/${s.slug}`)}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary grid place-items-center">
                  <Icon name={s.icon} size={22} className="text-primary" />
                </div>
                <span className="text-sm text-center">{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <Card className="relative overflow-hidden p-10 md:p-14 text-center border-border bg-gradient-to-br from-primary/20 to-accent/10">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-[120px]" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Нужен ремонт {service.title.toLowerCase()}?</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-7">Оставьте заявку — мастер перезвонит через 10 минут</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="h-12 px-8" onClick={() => setModalOpen(true)}>
                  <Icon name="Phone" size={18} className="mr-2" /> Вызвать мастера
                </Button>
                <a href="tel:+74950000000">
                  <Button size="lg" variant="outline" className="h-12 px-8">
                    +7 (495) 000-00-00
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary grid place-items-center">
              <Icon name="Wrench" className="text-primary-foreground" size={15} />
            </div>
            <span className="font-display font-bold">РемТех<span className="text-accent">Сервис</span></span>
          </button>
          <p className="text-sm text-muted-foreground">© 2026 РемТехСервис. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
