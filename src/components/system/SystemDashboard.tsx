import React from 'react';
import { 
  Globe, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Activity, 
  ShieldCheck, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Server,
  Cpu,
  Database
} from 'lucide-react';
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
  Bar,
  Cell
} from 'recharts';

const REVENUE_DATA = [
  { name: 'Sep', rev: 45000 },
  { name: 'Oct', rev: 52000 },
  { name: 'Nov', rev: 48000 },
  { name: 'Dec', rev: 61000 },
  { name: 'Jan', rev: 75000 },
  { name: 'Feb', rev: 89000 },
];

const UNIVERSITY_GROWTH = [
  { name: 'Sep', count: 42 },
  { name: 'Oct', count: 45 },
  { name: 'Nov', count: 48 },
  { name: 'Dec', count: 55 },
  { name: 'Jan', count: 62 },
  { name: 'Feb', count: 74 },
];

export const SystemDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Platform Overview</h1>
          <p className="text-slate-400 mt-1">Real-time metrics across all 74 universities and 1.2M alumni.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-slate-300">SYSTEM HEALTH: 99.98%</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Universities', value: '74', change: '+12%', icon: <Globe className="text-blue-400" />, trend: 'up' },
          { label: 'Total Alumni', value: '1.2M', change: '+8.4%', icon: <Users className="text-indigo-400" />, trend: 'up' },
          { label: 'Active Subscriptions', value: '68', change: '+5%', icon: <CreditCard className="text-emerald-400" />, trend: 'up' },
          { label: 'Monthly Revenue', value: '$89,400', change: '+18%', icon: <TrendingUp className="text-purple-400" />, trend: 'up' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-800 rounded-xl">
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Platform Revenue Growth</h3>
              <p className="text-sm text-slate-500">Gross revenue across all subscription tiers</p>
            </div>
            <select className="bg-slate-800 border-none rounded-lg text-xs font-bold text-slate-300 px-3 py-1.5 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="rev" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-6">University Growth</h3>
          <div className="h-64 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={UNIVERSITY_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#1e293b'}}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {UNIVERSITY_GROWTH.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === UNIVERSITY_GROWTH.length - 1 ? '#6366f1' : '#334155'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-sm font-medium text-slate-300">Active Universities</span>
              </div>
              <span className="font-bold text-white">68</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span className="text-sm font-medium text-slate-300">Pending Setup</span>
              </div>
              <span className="font-bold text-white">4</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-sm font-medium text-slate-300">Suspended</span>
              </div>
              <span className="font-bold text-white">2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: System Health & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity size={20} className="text-indigo-400" />
              System Infrastructure
            </h3>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">All Systems Nominal</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-2">
                <Cpu size={14} /> CPU USAGE
              </div>
              <p className="text-2xl font-bold text-white">14.2%</p>
              <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[14.2%]" />
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-2">
                <Database size={14} /> DB LOAD
              </div>
              <p className="text-2xl font-bold text-white">28.5%</p>
              <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[28.5%]" />
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-2">
                <Server size={14} /> STORAGE
              </div>
              <p className="text-2xl font-bold text-white">4.2 TB</p>
              <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[42%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Recent System Activity</h3>
            <button className="text-xs font-bold text-indigo-400 hover:underline">View Audit Logs</button>
          </div>
          <div className="space-y-4">
            {[
              { user: 'System', action: 'Auto-backup completed', time: '12 mins ago', icon: <Database size={14} />, color: 'text-blue-400' },
              { user: 'SuperAdmin', action: 'Modified subscription plan: Enterprise', time: '45 mins ago', icon: <CreditCard size={14} />, color: 'text-indigo-400' },
              { user: 'System', action: 'New University Registered: Stanford', time: '2 hours ago', icon: <Globe size={14} />, color: 'text-emerald-400' },
              { user: 'Security', action: 'Blocked suspicious IP: 192.168.1.1', time: '4 hours ago', icon: <ShieldCheck size={14} />, color: 'text-red-400' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-slate-800 rounded-lg ${activity.color}`}>
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{activity.action}</p>
                    <p className="text-[10px] text-slate-500">{activity.user} • {activity.time}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
