import React from 'react';
import { Section } from './ui/Section';
import { motion } from 'motion/react';
import { UserPlus, Mail, Rocket } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <UserPlus size={32} />,
      title: "Register Institution",
      description: "Sign up and customize your branded portal in minutes. No coding required."
    },
    {
      icon: <Mail size={32} />,
      title: "Invite Alumni",
      description: "Import your database and send automated invites to join the network."
    },
    {
      icon: <Rocket size={32} />,
      title: "Start Engaging",
      description: "Launch events, post jobs, and watch your community thrive."
    }
  ];

  return (
    <Section background="white" id="how-it-works">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Launch Your Portal in 3 Simple Steps
        </h2>
        <p className="text-lg text-gray-600">
          We've made it incredibly easy to get started. You can be up and running today.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-10" />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="text-center relative bg-white p-4"
          >
            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm z-10 relative">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-600 max-w-xs mx-auto">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
