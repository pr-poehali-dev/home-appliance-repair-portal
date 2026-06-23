import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { API_URL, SERVICES } from '@/data/services';

interface Props {
  open: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function OrderModal({ open, onClose, defaultService = '' }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', service: defaultService, comment: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!open) return null;

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service: form.service || defaultService }),
      });
      if (res.ok) { setStatus('success'); }
      else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  const handleClose = () => {
    setStatus('idle');
    setForm({ name: '', phone: '', service: defaultService, comment: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={handleClose}>
      <Card className="w-full max-w-lg bg-card border-border p-6 md:p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <Icon name="X" size={20} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-accent/20 grid place-items-center mx-auto mb-4">
              <Icon name="CheckCircle" size={36} className="text-accent" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-2">Заявка принята!</h3>
            <p className="text-muted-foreground mb-6">Мастер перезвонит вам в течение 10 минут</p>
            <Button onClick={handleClose} className="w-full">Закрыть</Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="font-display text-2xl font-bold">Вызвать мастера</h3>
              <p className="text-muted-foreground text-sm mt-1">Перезвоним через 10 минут, приедем в удобное время</p>
            </div>
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Ваше имя *</label>
                  <input
                    required value={form.name} onChange={set('name')}
                    placeholder="Иван Иванов"
                    className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Телефон *</label>
                  <input
                    required value={form.phone} onChange={set('phone')}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Тип техники *</label>
                <select
                  required value={form.service} onChange={set('service')}
                  className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                >
                  <option value="">Выберите технику</option>
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Опишите поломку</label>
                <textarea
                  value={form.comment} onChange={set('comment')}
                  placeholder="Кратко опишите проблему..."
                  rows={3}
                  className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              {status === 'error' && (
                <p className="text-sm text-destructive flex items-center gap-2">
                  <Icon name="AlertCircle" size={16} /> Ошибка отправки. Попробуйте ещё раз.
                </p>
              )}
              <Button type="submit" disabled={status === 'loading'} className="h-12 text-base">
                {status === 'loading' ? (
                  <><Icon name="Loader2" size={18} className="mr-2 animate-spin" /> Отправляем...</>
                ) : (
                  <><Icon name="Phone" size={18} className="mr-2" /> Вызвать мастера</>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}
