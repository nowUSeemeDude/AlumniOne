import React from 'react';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface Step1WelcomeProps {
  onNext: () => void;
}

export const Step1Welcome: React.FC<Step1WelcomeProps> = ({ onNext }) => {
  return (
    <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-xl mx-auto">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">👋</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Let's Create Your Alumni Portal</h1>
      <p className="text-lg text-gray-600 mb-8">
        Set up your organization in under 2 minutes. No credit card required.
      </p>
      <Button size="xl" onClick={onNext} rightIcon={<ArrowRight size={20} />}>
        Continue
      </Button>
    </div>
  );
};
