import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { Save, Shield, Lock, Eye, UserCheck, FileText, Bell, Download, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PrivacySettings: React.FC = () => {
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

      {/* Section 1: Profile Visibility */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Eye size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Profile Visibility</h3>
            <p className="text-slate-500 text-sm">Control who can see alumni profiles and what information is displayed.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Alumni profiles visible to</label>
            <div className="grid sm:grid-cols-3 gap-3">
              <label className="flex items-center justify-center px-4 py-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700 transition-all">
                <input type="radio" name="visibility" className="sr-only" />
                <span className="text-sm font-medium">Public</span>
              </label>
              <label className="flex items-center justify-center px-4 py-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700 transition-all">
                <input type="radio" name="visibility" defaultChecked className="sr-only" />
                <span className="text-sm font-medium">Logged-in Alumni</span>
              </label>
              <label className="flex items-center justify-center px-4 py-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700 transition-all">
                <input type="radio" name="visibility" className="sr-only" />
                <span className="text-sm font-medium">Admin Only</span>
              </label>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Show Email Address</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Show Phone Number</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Show Career Details</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Registration Control */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
            <UserCheck size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Registration Control</h3>
            <p className="text-slate-500 text-sm">Manage how new alumni join the platform.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">Allow Open Registration</p>
              <p className="text-xs text-slate-500">Anyone can sign up via the registration page</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">Require Admin Approval</p>
              <p className="text-xs text-slate-500">New accounts must be verified by an admin</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">Restrict to Official Domain</p>
              <p className="text-xs text-slate-500">Only allow emails ending in @bracu.ac.bd</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">Enable CAPTCHA</p>
              <p className="text-xs text-slate-500">Prevent bot registrations</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Section 3: Data Protection */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-green-50 text-green-600 rounded-lg">
            <Shield size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Data Protection</h3>
            <p className="text-slate-500 text-sm">GDPR compliance and data security settings.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <span className="text-sm font-medium text-slate-700">Enable Data Export for Alumni</span>
             <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
             </label>
          </div>
          <div className="flex items-center justify-between">
             <span className="text-sm font-medium text-slate-700">Allow Account Deletion Request</span>
             <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
             </label>
          </div>
          <div className="flex items-center justify-between">
             <span className="text-sm font-medium text-slate-700">Two-Factor Authentication (2FA)</span>
             <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
             </label>
          </div>
          
          <div className="pt-4">
             <label className="block text-sm font-medium text-slate-700 mb-1">Auto-delete Inactive Accounts</label>
             <select className="w-full sm:w-64 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
               <option>Never</option>
               <option>After 12 months</option>
               <option>After 24 months</option>
               <option>After 36 months</option>
             </select>
          </div>
        </div>
      </div>

      {/* Section 4: Communication Preferences */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <Bell size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Communication Preferences</h3>
            <p className="text-slate-500 text-sm">Manage default notification settings.</p>
          </div>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Allow Alumni to Opt-Out of Emails</span>
              <label className="relative inline-flex items-center cursor-pointer">
                 <input type="checkbox" defaultChecked className="sr-only peer" />
                 <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
           </div>
           <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Default Email Subscription</span>
              <label className="relative inline-flex items-center cursor-pointer">
                 <input type="checkbox" defaultChecked className="sr-only peer" />
                 <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
           </div>
           <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Allow WhatsApp Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                 <input type="checkbox" className="sr-only peer" />
                 <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
           </div>
        </div>
      </div>

      {/* Section 5: Security Log */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-red-50 text-red-600 rounded-lg">
            <Lock size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Security Log</h3>
            <p className="text-slate-500 text-sm">Monitor access and potential security threats.</p>
          </div>
        </div>

        <div className="space-y-6">
           <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                 <p className="text-xs text-slate-500 mb-1">Last Login</p>
                 <p className="text-sm font-bold text-slate-900">Today, 10:23 AM</p>
                 <p className="text-xs text-slate-400">IP: 192.168.1.1</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                 <p className="text-xs text-red-500 mb-1">Failed Login Attempts</p>
                 <p className="text-sm font-bold text-red-900">2 attempts</p>
                 <p className="text-xs text-red-400">Last: Yesterday</p>
              </div>
           </div>
           
           <Button variant="outline" leftIcon={<Download size={16} />}>Download Security Report</Button>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button size="lg" leftIcon={<Save size={18} />} onClick={() => showToast('Privacy Settings Updated')}>Save Changes</Button>
      </div>
    </div>
  );
};
