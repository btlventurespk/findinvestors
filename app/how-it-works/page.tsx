import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'How findinvestors.pk works: apply, meet our team, and go live in front of investors who back Pakistani businesses.',
};

const steps = [
  {
    n: '1',
    title: 'Apply',
    body: 'Fill in the application — company, business, traction, raise, team, contact. It takes about 15 minutes and your answers save as you go. We only accept businesses that already make revenue.',
  },
  {
    n: '2',
    title: 'We meet you',
    body: "Our team reviews every application. If your business fits, we set up a call within 5 working days. We'll ask about your numbers, your plans, and what you'd do with the money. We only list businesses we can stand behind — that's what makes a listing here worth something.",
  },
  {
    n: '3',
    title: 'You go live',
    body: 'We build your profile together — the story, the traction, the raise ask. Once you approve it, it goes live in the directory. Investors browsing findinvestors can request an intro, and we connect you directly.',
  },
];

const faqs = [
  {
    q: 'Does listing cost anything?',
    a: 'No. Applying and being listed is free for founders.',
  },
  {
    q: 'Do you guarantee funding?',
    a: 'No, and be wary of anyone who does. We give your business visibility with people who invest in Pakistani companies. Whether a conversation turns into a cheque is between you and them.',
  },
  {
    q: 'Who are the investors?',
    a: 'We never publish investor names or details. When an investor requests an intro to your startup, we connect you directly and step back.',
  },
  {
    q: 'What if I have no revenue yet?',
    a: "We only list revenue-generating businesses. It keeps the directory credible and investors' attention on companies that are ready. Come back when the revenue is flowing.",
  },
  {
    q: 'How long does my profile stay up?',
    a: 'As long as the business is active and the information stays accurate. We check in periodically to keep profiles current.',
  },
];

export default function HowItWorksPage() {
  return (
    <Container className="max-w-3xl py-14">
      <h1 className="text-[36px] font-extrabold text-ink md:text-h1">How it works</h1>
      <p className="mt-4 text-body text-ink/70">
        Three steps between you and being seen by people who write cheques.
      </p>

      <div className="mt-12 space-y-6">
        {steps.map((s) => (
          <Card key={s.n}>
            <div className="flex gap-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-heading font-bold text-green">
                {s.n}
              </span>
              <div>
                <h2 className="text-h3 text-ink">{s.title}</h2>
                <p className="mt-2 text-body text-ink/80">{s.body}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="mt-16 text-h2 text-ink">Questions founders ask</h2>
      <div className="mt-8 space-y-8">
        {faqs.map((f) => (
          <div key={f.q}>
            <h3 className="font-heading text-[18px] font-bold text-ink">{f.q}</h3>
            <p className="mt-2 text-body text-ink/80">{f.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button href="/apply">List your startup</Button>
      </div>
    </Container>
  );
}
