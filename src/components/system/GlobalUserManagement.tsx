import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  UserCheck, 
  UserX, 
  Key, 
  Mail, 
  Activity,
  ChevronRight,
  Plus,
  Download,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'motion/react';

interface GlobalUser {
  id: string;
  name: string;
  email: string;
  role: 'SYSTEM_ADMIN' | 'UNIVERSITY_ADMIN' | 'SPACE_ADMIN' | 'ALUMNI';
  university: string;
  status: 'active' | 'suspended';
  lastLogin: string;
}

const MOCK_USERS: GlobalUser[] = [
  { id: '1', name: 'System Superuser', email: 'admin@alumnione.com', role: 'SYSTEM_ADMIN', university: 'Platform Global', status: 'active', lastLogin: 'Just now' },
  { id: '2', name: 'Dr. Michael Chen', email: 'm.chen@stanford.edu', role: 'UNIVERSITY_ADMIN', university: 'Stanford University', status: 'active', lastLogin: '10 mins ago' },
  { id: '3', name: 'Sarah Johnson', email: 'sarah.j@mit.edu', role: 'UNIVERSITY_ADMIN', university: 'MIT', status: 'active', lastLogin: '1 hour ago' },
  { id: '4', name: 'Dr. Rahim Ahmed', email: 'rahim.a@du.ac.bd', role: 'SPACE_ADMIN', university: 'Dhaka University', status: 'active', lastLogin: '3 hours ago' },
  { id: '5', name: 'Anika Rahman', email: 'anika.r@alumni.du.ac.bd', role: 'ALUMNI', university: 'Dhaka University', status: 'active', lastLogin: 'Yesterday' },
  { id: '6', name: 'John Doe', email: 'john.doe@suspended.com', role: 'ALUMNI', university: 'Stanford University', status: 'suspended', lastLogin: '2 weeks ago' },
];

export const GlobalUserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Global User Management</h1>
          <p className="text-slate-400 mt-1">Manage all 1.2M users across all university tenants.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800">Export User Data</Button>
          <Button leftIcon={<Plus size={18} />} className="bg-indigo-600 hover:bg-indigo-700 border-none">Create System Admin</Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search users by name, email, or university..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-3">
          <select 
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Roles</option>
            <option value="SYSTEM_ADMIN">System Admin</option>
            <option value="UNIVERSITY_ADMIN">University Admin</option>
            <option value="SPACE_ADMIN">Space Admin</option>
            <option value="ALUMNI">Alumni</option>
          </select>
          <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700" leftIcon={<Filter size={18} />}>Filters</Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-800">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">User Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Role / University</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Last Activity</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                        user.role === 'SYSTEM_ADMIN' ? 'bg-indigo-600/20 text-indigo-400' :
                        user.role === 'UNIVERSITY_ADMIN' ? 'bg-purple-600/20 text-purple-400' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-200">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider inline-block mb-1 ${
                      user.role === 'SYSTEM_ADMIN' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                      user.role === 'UNIVERSITY_ADMIN' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                      user.role === 'SPACE_ADMIN' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                    }`}>
                      {user.role.replace('_', ' ')}
                    </p>
                    <p className="text-xs text-slate-500">{user.university}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Activity size={12} /> {user.lastLogin}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      user.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-indigo-400 transition-all title='Reset Password'">
                        <Key size={18} />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all title='View Activity'">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400 transition-all title='Suspend/Delete'">
                        {user.status === 'active' ? <UserX size={18} /> : <UserCheck size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Alert */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-4">
        <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-sm font-bold text-amber-500">Global User Access Warning</p>
          <p className="text-xs text-amber-500/80 mt-1">You are viewing the global user directory. Any changes made here will affect users across all university tenants. Ensure you have proper authorization before modifying user roles or statuses.</p>
        </div>
      </div>
    </div>
  );
};
