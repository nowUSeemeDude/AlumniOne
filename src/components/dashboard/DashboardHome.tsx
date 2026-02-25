import React from 'react';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  AlertCircle, 
  ArrowUpRight, 
  Plus, 
  Download, 
  Bell, 
  CheckCircle2, 
  TrendingUp,
  Mail,
  DollarSign,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

// Mock Data
const GROWTH_DATA = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 18 },
  { name: 'Wed', value: 15 },
  { name: 'Thu', value: 25 },
  { name: 'Fri', value: 32 },
  { name: 'Sat', value: 28 },
  { name: 'Sun', value: 40 },
];

const ALERTS = [
  { id: 1, type: 'alumni', message: '12 New Alumni Profiles Pending Approval', priority: 'high', icon: <Users size={18} /> },
  { id: 2, type: 'job', message: '5 Job Postings Waiting for Review', priority: 'medium', icon: <Briefcase size={18} /> },
  { id: 3, type: 'event', message: 'Annual Reunion: 25 New Registrations Today', priority: 'low', icon: <Calendar size={18} /> },
];

const RECENT_ACTIVITY = [
  { id: 1, user: 'Sarah Khan', action: 'registered for', target: 'Annual Reunion 2025', time: '2 mins ago', icon: <Calendar size={14} /> },
  { id: 2, user: 'Rahim Ahmed', action: 'posted a job', target: 'Senior Software Engineer', time: '15 mins ago', icon: <Briefcase size={14} /> },
  { id: 3, user: 'Nusrat Jahan', action: 'updated profile', target: 'Employment Status', time: '1 hour ago', icon: <Users size={14} /> },
  { id: 4, user: 'System', action: 'generated report', target: 'Monthly Financials', time: '3 hours ago', icon: <DollarSign size={14} /> },
];

export const DashboardHome: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-8">
      {/* SECTION 1: Top Command Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Good Morning, Admin</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-slate-500 text-sm">{currentDate}</p>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Viewing: CSE Department Data Only</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            System Operational
          </div>
          <Button variant="outline" size="sm" leftIcon={<Download size={16} />}>Export Report</Button>
          <Button size="sm" leftIcon={<Plus size={16} />}>Quick Create</Button>
        </div>
      </div>

      {/* SECTION 2: Critical Alerts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ALERTS.map((alert) => (
          <motion.div 
            key={alert.id}
            whileHover={{ y: -2 }}
            className={`p-4 rounded-xl border cursor-pointer transition-shadow hover:shadow-md flex items-start gap-4 ${
              alert.priority === 'high' ? 'bg-red-50 border-red-100' : 
              alert.priority === 'medium' ? 'bg-amber-50 border-amber-100' : 
              'bg-blue-50 border-blue-100'
            }`}
          >
            <div className={`p-2 rounded-lg ${
              alert.priority === 'high' ? 'bg-white text-red-600' : 
              alert.priority === 'medium' ? 'bg-white text-amber-600' : 
              'bg-white text-blue-600'
            }`}>
              {alert.icon}
            </div>
            <div>
              <p className={`text-sm font-semibold ${
                alert.priority === 'high' ? 'text-red-900' : 
                alert.priority === 'medium' ? 'text-amber-900' : 
                'text-blue-900'
              }`}>
                {alert.message}
              </p>
              <p className="text-xs mt-1 opacity-70 flex items-center gap-1">
                Action Required <ChevronRight size={12} />
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SECTION 3: Engagement Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Alumni Engagement Growth</h3>
              <p className="text-sm text-slate-500">Active users over the last 7 days</p>
            </div>
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-lg text-sm font-medium">
              <TrendingUp size={16} />
              +12.5%
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={GROWTH_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Score Cards */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Users size={20} />
              </div>
              <span className="text-xs font-medium text-slate-500">Total Alumni (Space)</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">845</p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <ArrowUpRight size={12} /> +12% this month
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Mail size={20} />
              </div>
              <span className="text-xs font-medium text-slate-500">Active Alumni (Space)</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">72.4%</p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <ArrowUpRight size={12} /> +4.1% vs last month
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Calendar size={20} />
              </div>
              <span className="text-xs font-medium text-slate-500">Space Events</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">12</p>
            <p className="text-xs text-slate-400 mt-1">4 Upcoming</p>
          </div>
        </div>
      </div>

      {/* SECTION 4 & 5: Financial & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Financial Snapshot</h3>
            <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-slate-500 mb-1">Space Revenue</p>
                <p className="text-2xl font-bold text-slate-900">$12,450</p>
              </div>
              <div className="h-10 w-24">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{v: 40}, {v: 60}, {v: 50}, {v: 80}, {v: 65}]}>
                    <Bar dataKey="v" fill="#10b981" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-500 mb-1">Income</p>
                <p className="text-lg font-semibold text-green-600">+$12,500</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Expenses</p>
                <p className="text-lg font-semibold text-red-600">-$4,200</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Smart Insights</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-blue-900">High Engagement in Batch 2018</p>
                <p className="text-xs text-blue-700 mt-0.5">Batch 2018 alumni are opening emails 20% more than average. Consider targeting them for the upcoming mentorship program.</p>
              </div>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-3">
              <Clock className="text-amber-600 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-amber-900">Pending Job Approvals Spiking</p>
                <p className="text-xs text-amber-700 mt-0.5">Job postings have increased by 40% this week. Review queue is backing up.</p>
              </div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-start gap-3">
              <CheckCircle2 className="text-slate-600 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-slate-900">Profile Completion Goal Met</p>
                <p className="text-xs text-slate-600 mt-0.5">We hit the 80% profile completion target for the current graduating class.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6 & 7: Operations & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Operations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-center group">
              <Users className="mx-auto text-slate-400 group-hover:text-blue-600 mb-2" size={24} />
              <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Verify Alumni</span>
            </button>
            <button className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-center group">
              <Calendar className="mx-auto text-slate-400 group-hover:text-blue-600 mb-2" size={24} />
              <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Create Event</span>
            </button>
            <button className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-center group">
              <Briefcase className="mx-auto text-slate-400 group-hover:text-blue-600 mb-2" size={24} />
              <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Post Job</span>
            </button>
            <button className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-center group">
              <Mail className="mx-auto text-slate-400 group-hover:text-blue-600 mb-2" size={24} />
              <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Send Email</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {RECENT_ACTIVITY.map((activity) => (
              <div key={activity.id} className="flex gap-3 items-start">
                <div className="mt-1 p-1.5 bg-slate-100 rounded-full text-slate-500">
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm text-slate-900">
                    <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-4 text-slate-500 hover:text-slate-900">View Activity Log</Button>
        </div>
      </div>
    </div>
  );
};
