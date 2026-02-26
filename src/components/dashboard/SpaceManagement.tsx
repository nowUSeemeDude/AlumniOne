import React, { useState } from 'react';
import { 
  Building2, 
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
  ExternalLink
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'motion/react';

interface Space {
  id: string;
  name: string;
  type: string;
  admin: string;
  alumniCount: number;
  status: 'active' | 'inactive';
  lastActivity: string;
}

const MOCK_SPACES: Space[] = [
  { id: '1', name: 'CSE Department', type: 'Department', admin: 'Dr. Rahim Ahmed', alumniCount: 845, status: 'active', lastActivity: '2 hours ago' },
  { id: '2', name: 'Business School', type: 'School', admin: 'Sarah Khan', alumniCount: 1240, status: 'active', lastActivity: '1 day ago' },
  { id: '3', name: 'EEE Department', type: 'Department', admin: 'Tanvir Hossain', alumniCount: 620, status: 'active', lastActivity: '3 hours ago' },
  { id: '4', name: 'Pharmacy Department', type: 'Department', admin: 'Nusrat Jahan', alumniCount: 450, status: 'inactive', lastActivity: '1 week ago' },
  { id: '5', name: 'Alumni Association', type: 'Association', admin: 'Maliha Islam', alumniCount: 3200, status: 'active', lastActivity: '10 mins ago' },
];

export const SpaceManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Spaces</h1>
          <p className="text-slate-500 text-sm mt-1">Create and manage departments, schools, and associations within the university.</p>
        </div>
        <Button leftIcon={<Plus size={18} />}>Create New Space</Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Spaces</p>
          <p className="text-2xl font-bold text-slate-900">12</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Spaces</p>
          <p className="text-2xl font-bold text-emerald-600">10</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Alumni</p>
          <p className="text-2xl font-bold text-blue-600">6,355</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Avg. Engagement</p>
          <p className="text-2xl font-bold text-indigo-600">68%</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search spaces by name or admin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-sm font-medium"
          >
            <option value="all">All Types</option>
            <option value="department">Department</option>
            <option value="school">School</option>
            <option value="association">Association</option>
          </select>
          <Button variant="outline" leftIcon={<Filter size={18} />}>More Filters</Button>
        </div>
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SPACES.map((space) => (
          <motion.div
            key={space.id}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
          >
            <div className="p-5 border-b border-slate-50">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Building2 size={24} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    space.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-100'
                  }`}>
                    {space.status}
                  </span>
                  <button className="p-1 hover:bg-slate-50 rounded-lg text-slate-400">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{space.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{space.type}</p>
            </div>

            <div className="p-5 flex-1 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <Shield size={16} />
                  <span>Admin</span>
                </div>
                <span className="font-medium text-slate-900">{space.admin}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <Users size={16} />
                  <span>Alumni</span>
                </div>
                <span className="font-medium text-slate-900">{space.alumniCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <CheckCircle2 size={16} />
                  <span>Last Activity</span>
                </div>
                <span className="font-medium text-slate-900">{space.lastActivity}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" leftIcon={<Edit2 size={14} />}>Edit</Button>
              <Button variant="ghost" size="sm" className="flex-1 text-blue-600" rightIcon={<ExternalLink size={14} />}>Open Space</Button>
            </div>
          </motion.div>
        ))}

        {/* Create New Card */}
        <button className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all group">
          <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
            <Plus size={32} />
          </div>
          <p className="font-bold">Create New Space</p>
          <p className="text-xs mt-1">Add a new department or school</p>
        </button>
      </div>
    </div>
  );
};
