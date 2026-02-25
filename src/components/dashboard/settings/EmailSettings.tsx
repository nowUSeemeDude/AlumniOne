import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { Save, Mail, Server, BarChart2, Settings, FileText, CheckCircle2, RefreshCw, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const EmailSettings: React.FC = () => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string) => {
    setToast({ message, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
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

      {/* Section 1: Sender Identity */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Mail size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Sender Identity</h3>
            <p className="text-slate-500 text-sm">Configure how emails appear to recipients.</p>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sender Name</label>
              <input type="text" defaultValue="AlumniOne Team" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sender Email</label>
              <input type="email" defaultValue="no-reply@alumnione.com" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reply-To Email</label>
            <input type="email" defaultValue="support@alumnione.com" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
             <Button variant="outline" size="sm" leftIcon={<Send size={16} />}>Send Test Email</Button>
          </div>
        </div>
      </div>

      {/* Section 2: Email Provider */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
            <Server size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Email Provider</h3>
            <p className="text-slate-500 text-sm">Manage your SMTP or API connection.</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
                 <span className="font-bold text-blue-600">SG</span>
              </div>
              <div>
                 <h4 className="font-bold text-slate-900">SendGrid</h4>
                 <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-green-600">Connected</span>
                 </div>
              </div>
           </div>
           <Button variant="outline">Change Provider</Button>
        </div>
      </div>

      {/* Section 3: Email Limits */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <BarChart2 size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Email Limits & Usage</h3>
            <p className="text-slate-500 text-sm">Monitor your sending quotas.</p>
          </div>
        </div>

        <div className="space-y-6">
           <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-100 rounded-lg">
                 <p className="text-xs text-slate-500 mb-1">Daily Limit</p>
                 <p className="text-xl font-bold text-slate-900">50,000</p>
              </div>
              <div className="p-4 border border-slate-100 rounded-lg">
                 <p className="text-xs text-slate-500 mb-1">Monthly Usage</p>
                 <p className="text-xl font-bold text-slate-900">12,450 / 100,000</p>
              </div>
           </div>
           
           <div>
              <div className="flex justify-between text-xs mb-2">
                 <span className="font-medium text-slate-700">Monthly Quota Used</span>
                 <span className="text-slate-500">12%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-600 w-[12%] rounded-full"></div>
              </div>
           </div>
        </div>
      </div>

      {/* Section 4: Email Behavior */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <Settings size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Email Behavior</h3>
            <p className="text-slate-500 text-sm">Configure tracking and automation.</p>
          </div>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Enable Open & Click Tracking</span>
              <label className="relative inline-flex items-center cursor-pointer">
                 <input type="checkbox" defaultChecked className="sr-only peer" />
                 <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
           </div>
           <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Include Unsubscribe Link</span>
              <label className="relative inline-flex items-center cursor-pointer">
                 <input type="checkbox" defaultChecked className="sr-only peer" />
                 <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
           </div>
           <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Auto Add Event Reminders</span>
              <label className="relative inline-flex items-center cursor-pointer">
                 <input type="checkbox" className="sr-only peer" />
                 <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
           </div>
           
           <div className="pt-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Default Footer Text</label>
              <textarea rows={2} defaultValue="You are receiving this email because you are a registered alumni of BRAC University." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
           </div>
        </div>
      </div>

      {/* Section 5: Template Defaults */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Template Defaults</h3>
            <p className="text-slate-500 text-sm">Set standard styles for all emails.</p>
          </div>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Include Header Logo</span>
              <label className="relative inline-flex items-center cursor-pointer">
                 <input type="checkbox" defaultChecked className="sr-only peer" />
                 <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
           </div>
           <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Use Branding Colors</span>
              <label className="relative inline-flex items-center cursor-pointer">
                 <input type="checkbox" defaultChecked className="sr-only peer" />
                 <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
           </div>
           
           <div className="pt-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Default Signature</label>
              <textarea rows={3} defaultValue="Best regards,&#10;The AlumniOne Team" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
           </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button size="lg" leftIcon={<Save size={18} />} onClick={() => showToast('Email Configuration Saved')}>Save Configuration</Button>
      </div>
    </div>
  );
};
