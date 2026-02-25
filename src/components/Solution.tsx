import React from 'react';
import { Section } from './ui/Section';
import { CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/Button';

export const Solution: React.FC = () => {
  const benefits = [
    "Centralized database that updates automatically",
    "Automated engagement campaigns & newsletters",
    "Smart event management with ticketing",
    "Integrated donation processing & tracking"
  ];

  return (
    <Section background="white">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <Zap size={16} className="fill-blue-700" />
              <span>The Modern Solution</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Turn Your Alumni Network into a Powerful Asset
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              AlumniOne brings everything you need into one intuitive platform. Stop wrestling with spreadsheets and start building meaningful connections.
            </p>
            
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button size="lg">Explore the Platform</Button>
          </motion.div>
        </div>

        <div className="flex-1 order-1 lg:order-2 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8"
          >
             {/* Abstract UI Representation */}
             <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div className="space-y-1">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-3 w-24 bg-gray-100 rounded" />
                  </div>
                  <div className="h-8 w-8 bg-blue-100 rounded-full" />
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="h-10 w-10 bg-gray-200 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-3/4 bg-gray-200 rounded" />
                        <div className="h-2 w-1/2 bg-gray-100 rounded" />
                      </div>
                      <div className="h-6 w-16 bg-green-100 rounded-full" />
                    </div>
                  ))}
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
