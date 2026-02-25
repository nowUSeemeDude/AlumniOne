import React from 'react';
import { Section } from './ui/Section';
import { motion } from 'motion/react';

export const PlatformPreview: React.FC = () => {
  return (
    <Section background="gray" className="overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Designed for Engagement
        </h2>
        <p className="text-lg text-gray-600">
          A clean, intuitive interface that your alumni will actually enjoy using.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-5xl mx-auto"
      >
        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
          {/* Browser Chrome */}
          <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="ml-4 bg-white rounded-md px-3 py-1 text-xs text-gray-400 flex-1 max-w-md border border-gray-200">
              alumnione.bd/dashboard
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex h-[500px] bg-slate-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 p-4 hidden md:block">
              <div className="h-8 w-32 bg-blue-100 rounded mb-8" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-100 rounded" />
                    <div className="h-4 w-24 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="h-6 w-48 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-32 bg-gray-100 rounded" />
                </div>
                <div className="h-10 w-32 bg-blue-600 rounded" />
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-32">
                    <div className="h-8 w-8 bg-blue-50 rounded-full mb-3" />
                    <div className="h-6 w-16 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-24 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-64 p-6">
                <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
                <div className="flex items-end gap-4 h-32">
                  {[40, 70, 45, 90, 60, 80, 50, 75, 65, 85].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-100 rounded-t-sm relative group">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-sm transition-all duration-500"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};
