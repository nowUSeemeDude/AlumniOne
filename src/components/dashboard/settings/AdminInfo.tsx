import React from 'react';
import { Mail, Phone, Shield, MoreVertical, Edit2, Trash2, UserPlus } from 'lucide-react';
import { Button } from '../../ui/Button';

interface AdminMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
  avatar: string;
}

const ADMINS: AdminMember[] = [
  {
    id: 1,
    name: 'Dr. Sarah Ahmed',
    role: 'Space Super Admin',
    email: 'sarah.ahmed@bracu.ac.bd',
    phone: '+880 1711 111111',
    status: 'Active',
    lastActive: '2 mins ago',
    avatar: 'SA'
  },
  {
    id: 2,
    name: 'Rahim Uddin',
    role: 'Event Manager',
    email: 'rahim.u@bracu.ac.bd',
    phone: '+880 1711 222222',
    status: 'Active',
    lastActive: '1 hour ago',
    avatar: 'RU'
  },
  {
    id: 3,
    name: 'Nusrat Jahan',
    role: 'Finance Admin',
    email: 'nusrat.j@bracu.ac.bd',
    phone: '+880 1711 333333',
    status: 'Inactive',
    lastActive: '2 days ago',
    avatar: 'NJ'
  }
];

export const AdminInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Space Administrators</h3>
          <p className="text-sm text-slate-500">Manage the team responsible for this department space.</p>
        </div>
        <Button size="sm" leftIcon={<UserPlus size={16} />}>Add Admin</Button>
      </div>

      <div className="grid gap-4">
        {ADMINS.map((admin) => (
          <div key={admin.id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                {admin.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900">{admin.name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    admin.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {admin.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <Shield size={12} className="text-blue-500" />
                  {admin.role}
                  <span>•</span>
                  <span>Last active: {admin.lastActive}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Mail size={12} className="text-slate-400" />
                  {admin.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Phone size={12} className="text-slate-400" />
                  {admin.phone}
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-auto">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
        <Shield className="text-blue-600 shrink-0 mt-0.5" size={18} />
        <div>
          <p className="text-sm font-medium text-blue-900">Security Note</p>
          <p className="text-xs text-blue-700 mt-1">
            Space Admins only have permissions within the CSE Department. Global university settings are managed by the Master Admin.
          </p>
        </div>
      </div>
    </div>
  );
};
