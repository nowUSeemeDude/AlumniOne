import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { Save, Upload, Layout, Moon, Sun, Sidebar, Type, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BrandingSettings: React.FC = () => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string) => {
    setToast({ message, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-20 left-1/2 z-[60] px-4 py-3 rounded-lg shadow-lg bg-green-600 text-white flex items-center gap-2"
          >
            <CheckCircle2 size={18} />
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 space-y-8">
        {/* Section 1: Organization Identity */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Organization Identity</h3>
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">University Logo</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                    <Upload size={20} />
                  </div>
                  <p className="text-sm font-medium text-slate-900">Click to upload</p>
                  <p className="text-xs text-slate-500">SVG, PNG, JPG (max 2MB)</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Favicon</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center mb-2">
                    <ImageIcon size={20} />
                  </div>
                  <p className="text-sm font-medium text-slate-900">Click to upload</p>
                  <p className="text-xs text-slate-500">ICO, PNG (32x32)</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Organization Name</label>
                <input type="text" defaultValue="BRAC University" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                <input type="text" defaultValue="Inspiring Excellence" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
                <input type="url" defaultValue="https://bracu.ac.bd" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
                <input type="email" defaultValue="info@bracu.ac.bd" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Theme Customization */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Theme Customization</h3>
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" defaultValue="#2563EB" className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                  <span className="text-sm text-slate-600 font-mono">#2563EB</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Secondary Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" defaultValue="#1E293B" className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                  <span className="text-sm text-slate-600 font-mono">#1E293B</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Button Style</label>
                 <div className="flex gap-2">
                   <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium border-2 border-transparent">Rounded</button>
                   <button className="flex-1 py-2 px-4 bg-white text-slate-700 rounded-none text-sm font-medium border border-slate-300">Sharp</button>
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Layout Density</label>
                 <div className="flex gap-2">
                   <button className="flex-1 py-2 px-4 bg-white text-slate-700 rounded-lg text-sm font-medium border border-slate-300">Compact</button>
                   <button className="flex-1 py-2 px-4 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200">Comfortable</button>
                 </div>
               </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><Moon size={18} /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Dark Mode Support</p>
                    <p className="text-xs text-slate-500">Allow users to toggle dark mode</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><Sidebar size={18} /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Sidebar Collapsed by Default</p>
                    <p className="text-xs text-slate-500">Start with a minimized sidebar</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Portal Appearance */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Portal Appearance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-slate-700">Show University Logo in Header</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-slate-700">Show Partner Company Logos</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-slate-700">Show Alumni Profile Pictures</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
               <label className="block text-sm font-medium text-slate-700 mb-1">Custom Footer Text</label>
               <input type="text" defaultValue="© 2024 BRAC University Alumni Association. All rights reserved." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="lg" leftIcon={<Save size={18} />} onClick={() => showToast('Branding Updated Successfully')}>Save Changes</Button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="hidden xl:block w-80 shrink-0">
        <div className="sticky top-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Live Preview</h3>
          <div className="bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shadow-sm h-[500px] flex flex-col relative">
            {/* Mock Header */}
            <div className="h-12 bg-white border-b border-slate-200 flex items-center px-3 justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded-md"></div>
                <div className="w-20 h-3 bg-slate-200 rounded"></div>
              </div>
              <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
            </div>
            <div className="flex flex-1 overflow-hidden">
              {/* Mock Sidebar */}
              <div className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-3 gap-3 shrink-0">
                <div className="w-8 h-8 bg-blue-50 rounded-lg"></div>
                <div className="w-8 h-8 bg-slate-50 rounded-lg"></div>
                <div className="w-8 h-8 bg-slate-50 rounded-lg"></div>
              </div>
              {/* Mock Content */}
              <div className="flex-1 p-4 bg-slate-50 overflow-hidden">
                <div className="w-32 h-6 bg-slate-200 rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                   <div className="h-20 bg-white rounded-lg border border-slate-200"></div>
                   <div className="h-20 bg-white rounded-lg border border-slate-200"></div>
                </div>
                <div className="h-32 bg-white rounded-lg border border-slate-200 mb-4 p-3">
                   <div className="w-full h-8 bg-blue-600 rounded-lg mb-2 opacity-90"></div>
                   <div className="w-1/2 h-3 bg-slate-100 rounded"></div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none border-4 border-slate-900/5 rounded-xl"></div>
          </div>
          <p className="text-xs text-slate-400 text-center">Preview updates automatically</p>
        </div>
      </div>
    </div>
  );
};
