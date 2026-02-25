import React from 'react';
import { Section } from './ui/Section';

export const SocialProof: React.FC = () => {
  const logos = [
    "Dhaka University",
    "BUET",
    "North South",
    "BRAC University",
    "IBA Alumni",
    "Rajshahi College"
  ];

  return (
    <Section background="white" className="border-b border-gray-100">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">
          Trusted by top institutions across Bangladesh
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center">
              <span className="text-xl font-bold text-gray-400 hover:text-blue-900 transition-colors cursor-default">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
