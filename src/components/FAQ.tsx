import React, { useState } from 'react';
import { Section } from './ui/Section';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Can I import my existing alumni data?",
      answer: "Yes! We support bulk import via CSV/Excel. Our team can also help migrate data from your legacy systems."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use bank-level encryption, perform regular security audits, and are fully GDPR compliant. Your data belongs to you."
    },
    {
      question: "Can I customize the look and feel?",
      answer: "Yes, the Pro and Enterprise plans allow you to add your logo, brand colors, and custom domain for a fully white-labeled experience."
    },
    {
      question: "Do you charge transaction fees on donations?",
      answer: "We charge a small platform fee of 1% on the Starter plan. Pro and Enterprise plans have 0% platform fees. Standard bKash/Nagad/Bank charges apply."
    },
    {
      question: "What kind of support do you offer?",
      answer: "All plans include email support. Pro plans get priority support, and Enterprise plans include a dedicated success manager."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section background="gray">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium text-gray-900 text-lg">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="text-gray-500" />
              ) : (
                <ChevronDown className="text-gray-500" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6"
                >
                  <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
};
