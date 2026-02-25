import React from 'react';
import { Section } from './ui/Section';
import { ShieldCheck, Cloud, Globe, Palette, Zap, Server } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: <Globe size={24} />,
      title: "Multi-Tenant Architecture",
      description: "Built for scale. Manage multiple chapters or institutions from a single account."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with GDPR and SOC2 compliance built-in."
    },
    {
      icon: <Cloud size={24} />,
      title: "Cloud Hosted",
      description: "Zero maintenance. We handle updates, backups, and infrastructure."
    },
    {
      icon: <Palette size={24} />,
      title: "Custom Branding",
      description: "Make it yours. White-label options to match your institution's identity."
    },
    {
      icon: <Zap size={24} />,
      title: "Fast Setup",
      description: "Go live in days, not months. Import your data and start inviting alumni."
    },
    {
      icon: <Server size={24} />,
      title: "Scalable Infrastructure",
      description: "Whether you have 500 or 500,000 alumni, our platform grows with you."
    }
  ];

  return (
    <Section background="white">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Why Bangladeshi Institutions Choose AlumniOne
        </h2>
        <p className="text-lg text-gray-600">
          Built locally with global standards to serve our education sector.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((reason, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="bg-blue-50 text-blue-700 p-3 rounded-lg shrink-0">
              {reason.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{reason.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
