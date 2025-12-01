import { UserPlus, PlusCircle, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up & Connect",
    description: "Create your account in seconds. No complicated setup required.",
    number: "01"
  },
  {
    icon: PlusCircle,
    title: "Add Your Transactions",
    description: "Log income, expenses, and create budgets with our simple interface.",
    number: "02"
  },
  {
    icon: BarChart3,
    title: "Track & Optimize",
    description: "View month-wise totals, analyze trends, and adjust your spending.",
    number: "03"
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start managing your finances in under a minute
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden md:block absolute top-20 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-20" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative inline-flex mb-6">
                {/* Number Badge */}
                <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold flex items-center justify-center text-sm shadow-lg z-10">
                  {step.number}
                </div>
                {/* Icon Container */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border border-primary/20">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
