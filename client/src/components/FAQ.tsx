import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Budget Manager really free?",
    answer: "Yes! Our Free plan includes unlimited transactions, budget tracking, and monthly reports. You can upgrade to Premium for advanced features like custom categories and detailed analytics."
  },
  {
    question: "How secure is my financial data?",
    answer: "We take security seriously. All data is encrypted in transit and at rest. We never store your banking credentials, and you can export or delete your data at any time."
  },
  {
    question: "Can I export my data?",
    answer: "Absolutely! Both Free and Premium users can export their data to CSV format at any time. Your data is yours, always."
  },
  {
    question: "Does it work on mobile devices?",
    answer: "Yes! Budget Manager is fully responsive and works seamlessly on all devices - desktop, tablet, and mobile. Track your expenses on the go."
  },
  {
    question: "How do I cancel my Premium subscription?",
    answer: "You can cancel your Premium subscription at any time from your account settings. Your data will remain accessible, and you'll continue to have access to Free plan features."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 px-4 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Budget Manager
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-2xl px-6 shadow-card border-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold text-lg">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
