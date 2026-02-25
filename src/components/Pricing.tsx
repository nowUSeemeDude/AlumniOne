import React from 'react';
import { Section } from './ui/Section';
import { Check } from 'lucide-react';
import { Button } from './ui/Button';

interface PricingProps {
  onStartTrial?: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onStartTrial }) => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for small schools and new associations in Bangladesh.",
      features: [
        "Up to 500 Alumni",
        "Basic Directory",
        "Email Newsletters",
        "1 Admin User"
      ],
      cta: "Start for Free",
      variant: "outline"
    },
    {
      name: "Pro",
      price: "৳5,000",
      period: "/month",
      description: "For growing institutions that need more power.",
      features: [
        "Up to 5,000 Alumni",
        "Advanced Directory & Search",
        "Events & Ticketing (bKash)",
        "Job Board",
        "Donations (All Gateways)",
        "5 Admin Users"
      ],
      cta: "Start Free Trial",
      variant: "primary",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large universities and multi-chapter networks.",
      features: [
        "Unlimited Alumni",
        "Custom Branding & Domain",
        "API Access",
        "SSO Integration",
        "Dedicated Success Manager",
        "SLA Support"
      ],
      cta: "Contact Sales",
      variant: "outline"
    }
  ];

  return (
    <Section background="gray" id="pricing">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg text-gray-600">
          Choose the plan that fits your community size and needs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`relative bg-white rounded-2xl p-8 border ${plan.popular ? 'border-blue-500 shadow-xl scale-105 z-10' : 'border-gray-200 shadow-sm hover:shadow-md transition-shadow'}`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
              <span className="text-gray-500">{plan.period}</span>
            </div>
            <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <Check size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              variant={plan.variant as any} 
              className="w-full"
              onClick={onStartTrial}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
};
