import React, { useState } from 'react';
import { 
  X, 
  Shield, 
  School, 
  Layout, 
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

type Role = 'SYSTEM_ADMIN' | 'UNIVERSITY_ADMIN' | 'SPACE_ADMIN' | 'ALUMNI';

const ROLES = [
  { id: 'SYSTEM_ADMIN', label: 'System Admin', description: 'Global SaaS Management', icon: <Shield className="text-indigo-600" size={24} /> },
  { id: 'UNIVERSITY_ADMIN', label: 'University Admin', description: 'University-wide Control', icon: <School className="text-blue-600" size={24} /> },
  { id: 'SPACE_ADMIN', label: 'Space Admin', description: 'Department / School Level', icon: <Layout className="text-emerald-600" size={24} /> },
  { id: 'ALUMNI', label: 'Alumni', description: 'Personal Alumni Workspace', icon: <GraduationCap className="text-orange-600" size={24} /> },
];

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const handleRoleSelect = (role: Role) => {
    // Mock user data for immediate access in prototype
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email: `${role.toLowerCase()}@example.com`,
      role: role,
      name: ROLES.find(r => r.id === role)?.label || 'User',
      universityId: 'bracu',
      spaceId: role === 'SPACE_ADMIN' ? 'cse' : undefined
    };

    localStorage.setItem('auth_token', 'mock-token-' + Date.now());
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    onSuccess(mockUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
            <h2 className="text-xl font-bold text-slate-900">Select Access Panel</h2>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              <p className="text-sm text-slate-500 mb-4">Choose the panel you want to access. In this prototype, access is granted immediately upon selection.</p>
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id as Role)}
                  className="w-full p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left flex items-center gap-4 group"
                >
                  <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                    {role.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">{role.label}</h4>
                    <p className="text-xs text-slate-500">{role.description}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded uppercase">Enter</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Prototype Mode: Authentication is bypassed for testing.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
