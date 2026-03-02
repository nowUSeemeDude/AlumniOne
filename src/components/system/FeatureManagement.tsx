import React, { useState } from 'react';
import { 
  Zap, 
  Plus, 
  ToggleRight, 
  ToggleLeft, 
  CheckCircle2, 
  XCircle, 
  Info,
  Settings,
  Shield,
  Layout,
  MessageSquare,
  Briefcase,
  Calendar,
  HeartHandshake,
  ShoppingBag,
  Network
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'motion/react';

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'global' | 'partial' | 'disabled';
  universitiesCount: number;
}

const GLOBAL_FEATURES: FeatureFlag[] = [
  { id: 'events', name: 'Events Module', description: 'Comprehensive event management with ticketing and RSVP.', icon: <Calendar size={20} />, status: 'global', universitiesCount: 74 },
  { id: 'jobs', name: 'Job Board', description: 'Career portal for alumni to post and find job opportunities.', icon: <Briefcase size={20} />, status: 'global', universitiesCount: 74 },
  { id: 'donations', name: 'Donations & Fundraising', description: 'Secure payment integration for university fundraising.', icon: <HeartHandshake size={20} />, status: 'partial', universitiesCount: 12 },
  { id: 'marketplace', name: 'Alumni Marketplace', description: 'Internal platform for alumni to trade products/services.', icon: <ShoppingBag size={20} />, status: 'disabled', universitiesCount: 0 },
  { id: 'networking', name: 'Smart Networking', description: 'AI-powered alumni matching and mentorship connections.', icon: <Network size={20} />, status: 'partial', universitiesCount: 5 },
  { id: 'voting', name: 'Voting & Elections', description: 'Secure voting system for alumni association elections.', icon: <CheckCircle2 size={20} />, status: 'global', universitiesCount: 74 },
];

export const FeatureManagement: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Feature Flags & Modules</h1>
          <p className="text-slate-400 mt-1">Control module availability globally or per university tenant.</p>
        </div>
        <Button leftIcon={<Plus size={18} />} className="bg-indigo-600 hover:bg-indigo-700 border-none">Create New Module</Button>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GLOBAL_FEATURES.map((feature) => (
          <div key={feature.id} className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-800">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-800 rounded-xl text-indigo-400">
                  {feature.icon}
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    feature.status === 'global' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    feature.status === 'partial' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                    'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                  }`}>
                    {feature.status}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 font-medium">
                    {feature.universitiesCount} Universities
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">{feature.name}</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{feature.description}</p>
            </div>

            <div className="p-6 flex-1 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Global Access</span>
                <button className="text-indigo-400">
                  {feature.status === 'global' ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-slate-700" />}
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium">Beta Testing</span>
                <button className="text-slate-700">
                  <ToggleLeft size={32} />
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-800/30 border-t border-slate-800 flex gap-2">
              <Button variant="ghost" size="sm" className="flex-1 text-slate-400 hover:text-white" leftIcon={<Settings size={14} />}>Configure</Button>
              <Button variant="ghost" size="sm" className="flex-1 text-indigo-400 hover:bg-indigo-500/10" rightIcon={<Shield size={14} />}>Permissions</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Control */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
            <Info size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Advanced Tenant Overrides</h3>
            <p className="text-sm text-slate-500">Enable specific features for individual universities regardless of global status.</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700">Manage Overrides</Button>
          <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700">View Feature Usage Logs</Button>
        </div>
      </div>
    </div>
  );
};
