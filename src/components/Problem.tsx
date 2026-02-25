import React from 'react';
import { Section } from './ui/Section';
import { XCircle, Clock, Database, Users } from 'lucide-react';
import { motion } from 'motion/react';

export const Problem: React.FC = () => {
  const problems = [
    {
      icon: <Database className="text-red-500" size={32} />,
      title: "Scattered Data",
      description: "Alumni data is spread across spreadsheets, LinkedIn, and old emails, making it impossible to track."
    },
    {
      icon: <Clock className="text-orange-500" size={32} />,
      title: "Manual Processes",
      description: "Staff spends hours manually updating records and sending emails instead of building relationships."
    },
    {
      icon: <Users className="text-gray-500" size={32} />,
      title: "Low Engagement",
      description: "Generic newsletters get ignored. Alumni feel disconnected and don't attend events or donate."
    }
  ];

  return (
    <Section background="gray">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Managing Alumni Shouldn't Be a Headache
        </h2>
        <p className="text-lg text-gray-600">
          Most institutions struggle with outdated tools that create more work than they save.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {problems.map((problem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
              {problem.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{problem.title}</h3>
            <p className="text-gray-600 leading-relaxed">{problem.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
