import React from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  onStartTrial?: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onStartTrial }) => {
  return (
    <Section background="blue" className="text-center">
      <div className="max-w-4xl mx-auto py-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Ready to Build a Thriving Alumni Community?
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Join hundreds of institutions that are already using AlumniOne to engage, manage, and grow their networks.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="white"
            size="xl" 
            rightIcon={<ArrowRight size={20} />}
            onClick={onStartTrial}
          >
            Start Your Free Trial
          </Button>
          <Button 
            variant="outlineWhite" 
            size="xl" 
          >
            Schedule a Demo
          </Button>
        </div>
        <p className="mt-6 text-sm text-blue-200 opacity-80">
          14-day free trial · No credit card required · Cancel anytime
        </p>
      </div>
    </Section>
  );
};
