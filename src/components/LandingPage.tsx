import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { SocialProof } from './SocialProof';
import { Problem } from './Problem';
import { Solution } from './Solution';
import { Features } from './Features';
import { HowItWorks } from './HowItWorks';
import { PlatformPreview } from './PlatformPreview';
import { WhyChooseUs } from './WhyChooseUs';
import { Pricing } from './Pricing';
import { Testimonials } from './Testimonials';
import { FAQ } from './FAQ';
import { CTA } from './CTA';
import { Footer } from './Footer';

interface LandingPageProps {
  onStartTrial: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartTrial, onLogin }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar onStartTrial={onStartTrial} onLogin={onLogin} />
      <main>
        <Hero onStartTrial={onStartTrial} onLogin={onLogin} />
        <SocialProof />
        <Problem />
        <Solution />
        <Features />
        <HowItWorks />
        <PlatformPreview />
        <WhyChooseUs />
        <Pricing onStartTrial={onStartTrial} />
        <Testimonials />
        <FAQ />
        <CTA onStartTrial={onStartTrial} />
      </main>
      <Footer />
    </div>
  );
};
