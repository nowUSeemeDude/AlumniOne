import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Button } from './ui/Button';

interface HeroProps {
  onStartTrial?: () => void;
  onLogin?: () => void;
  onAlumniLogin?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartTrial, onLogin, onAlumniLogin }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-100">
                🇧🇩 Proudly Made for Bangladesh
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
                Connect Every <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Alumni in Bangladesh
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                The #1 platform for Bangladeshi Universities, Colleges, and Associations to manage alumni, collect donations via bKash/Nagad, and host events.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button size="lg" rightIcon={<ArrowRight size={18} />} onClick={onStartTrial}>
                  Start Free Trial
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="lg" onClick={onLogin}>
                    Admin Login
                  </Button>
                  <Button variant="outline" size="lg" className="border-blue-200 text-blue-600" onClick={onAlumniLogin}>
                    Alumni Login
                  </Button>
                </div>
              </div>
              <p className="mt-6 text-sm text-gray-500">
                No credit card required · 14-day free trial · Cancel anytime
              </p>
            </motion.div>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="pt-8 pb-4 px-4 bg-white">
                   {/* Abstract Dashboard UI */}
                   <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-3 bg-gray-50 h-full rounded-lg p-3 space-y-3 hidden sm:block">
                        <div className="h-2 w-20 bg-gray-200 rounded" />
                        <div className="h-8 w-full bg-blue-50 rounded border border-blue-100" />
                        <div className="h-2 w-16 bg-gray-200 rounded" />
                        <div className="h-2 w-14 bg-gray-200 rounded" />
                      </div>
                      <div className="col-span-12 sm:col-span-9 space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="h-6 w-32 bg-gray-200 rounded" />
                          <div className="h-8 w-24 bg-blue-600 rounded" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-24 bg-blue-50 rounded-lg border border-blue-100 p-3">
                             <div className="h-8 w-8 bg-blue-200 rounded-full mb-2" />
                             <div className="h-4 w-12 bg-blue-200 rounded" />
                          </div>
                          <div className="h-24 bg-indigo-50 rounded-lg border border-indigo-100 p-3">
                             <div className="h-8 w-8 bg-indigo-200 rounded-full mb-2" />
                             <div className="h-4 w-12 bg-indigo-200 rounded" />
                          </div>
                          <div className="h-24 bg-purple-50 rounded-lg border border-purple-100 p-3">
                             <div className="h-8 w-8 bg-purple-200 rounded-full mb-2" />
                             <div className="h-4 w-12 bg-purple-200 rounded" />
                          </div>
                        </div>
                        <div className="h-40 bg-gray-50 rounded-lg border border-gray-100" />
                      </div>
                   </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3"
              >
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <ArrowRight size={20} className="rotate-[-45deg]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Engagement Rate</p>
                  <p className="text-lg font-bold text-gray-900">+124%</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3"
              >
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <ArrowRight size={20} className="rotate-[-45deg]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Donations</p>
                  <p className="text-lg font-bold text-gray-900">$42.5k</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
