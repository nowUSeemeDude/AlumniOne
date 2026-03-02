import React, { useState } from 'react';
import { 
  Globe, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Users, 
  Shield, 
  CheckCircle2, 
  XCircle,
  ChevronRight,
  ExternalLink,
  Lock,
  Unlock,
  Eye,
  UserCheck,
  PauseCircle,
  PlayCircle,
  Database,
  Calendar
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';

interface University {
  id: string;
  name: string;
  admin: string;
  alumniCount: number;
  spacesCount: number;
  storageUsage: string;
  eventCount: number;
  status: 'active' | 'suspended' | 'pending';
  plan: 'Starter' | 'Professional' | 'Enterprise';
  lastActivity: string;
}

const MOCK_UNIVERSITIES: University[] = [
  { id: '1', name: 'Stanford University', admin: 'Dr. Michael Chen', alumniCount: 124500, spacesCount: 42, storageUsage: '1.2 TB', eventCount: 845, status: 'active', plan: 'Enterprise', lastActivity: '2 mins ago' },
  { id: '2', name: 'MIT', admin: 'Sarah Johnson', alumniCount: 98200, spacesCount: 38, storageUsage: '840 GB', eventCount: 620, status: 'active', plan: 'Enterprise', lastActivity: '15 mins ago' },
  { id: '3', name: 'Harvard University', admin: 'Robert Wilson', alumniCount: 156000, spacesCount: 56, storageUsage: '2.1 TB', eventCount: 1240, status: 'active', plan: 'Enterprise', lastActivity: '1 hour ago' },
  { id: '4', name: 'Dhaka University', admin: 'Prof. Rahim Ahmed', alumniCount: 84500, spacesCount: 24, storageUsage: '450 GB', eventCount: 320, status: 'active', plan: 'Professional', lastActivity: '3 hours ago' },
  { id: '5', name: 'BRAC University', admin: 'Maliha Islam', alumniCount: 12500, spacesCount: 12, storageUsage: '120 GB', eventCount: 85, status: 'suspended', plan: 'Starter', lastActivity: '2 days ago' },
];

export const UniversityManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUni, setSelectedUni] = useState<University | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">University Management</h1>
          <p className="text-slate-400 mt-1">Manage all 74 university tenants on the platform.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800">Export CSV</Button>
          <Button leftIcon={<Plus size={18} />} className="bg-indigo-600 hover:bg-indigo-700 border-none">Register New University</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Universities', value: '74', icon: <Globe size={16} />, color: 'text-blue-400' },
          { label: 'Active Tenants', value: '68', icon: <CheckCircle2 size={16} />, color: 'text-emerald-400' },
          { label: 'Suspended', value: '2', icon: <PauseCircle size={16} />, color: 'text-amber-400' },
          { label: 'Total Storage', value: '4.2 TB', icon: <Database size={16} />, color: 'text-indigo-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">
              <span className={stat.color}>{stat.icon}</span>
              {stat.label}
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search universities by name, admin, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-3">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
          <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700" leftIcon={<Filter size={18} />}>Filters</Button>
        </div>
      </div>

      {/* University Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-800">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">University Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin / Plan</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Usage Stats</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {MOCK_UNIVERSITIES.map((uni) => (
                <tr key={uni.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-600/10 text-indigo-400 rounded-xl flex items-center justify-center font-bold">
                        {uni.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-200">{uni.name}</p>
                        <p className="text-xs text-slate-500">ID: UNI-{uni.id.padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-300">{uni.admin}</p>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      uni.plan === 'Enterprise' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                      uni.plan === 'Professional' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                    }`}>
                      {uni.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Users size={12} /> {uni.alumniCount.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Globe size={12} /> {uni.spacesCount}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar size={12} /> {uni.eventCount}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      uni.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      uni.status === 'suspended' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                    }`}>
                      {uni.status === 'active' ? <CheckCircle2 size={10} /> : <PauseCircle size={10} />}
                      {uni.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-indigo-400 transition-all title='Impersonate Admin'">
                        <UserCheck size={18} />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all title='Edit'">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400 transition-all title='Suspend/Delete'">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">Showing 5 of 74 universities</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-slate-400">Previous</Button>
            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-slate-400">Next</Button>
          </div>
        </div>
      </div>

      {/* Security & Audit Quick View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Shield size={20} className="text-indigo-400" />
            Recent Admin Actions
          </h3>
          <div className="space-y-4">
            {[
              { action: 'University Suspended', target: 'BRAC University', time: '2 hours ago', admin: 'SuperAdmin' },
              { action: 'Plan Upgraded', target: 'Stanford University', time: '5 hours ago', admin: 'SuperAdmin' },
              { action: 'New Admin Assigned', target: 'Dhaka University', time: '1 day ago', admin: 'System' },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-slate-800 last:border-0">
                <div>
                  <p className="font-medium text-slate-200">{log.action}: <span className="text-indigo-400">{log.target}</span></p>
                  <p className="text-xs text-slate-500">{log.admin} • {log.time}</p>
                </div>
                <ChevronRight size={16} className="text-slate-700" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-center items-center text-center">
          <div className="p-4 bg-indigo-600/10 rounded-full mb-4">
            <Lock size={32} className="text-indigo-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Platform Maintenance Mode</h3>
          <p className="text-sm text-slate-500 mb-6 max-w-xs">Temporarily disable access for all non-system admin users for maintenance.</p>
          <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
            Enable Maintenance Mode
          </Button>
        </div>
      </div>
    </div>
  );
};
