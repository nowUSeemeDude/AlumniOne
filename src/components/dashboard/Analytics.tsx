import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Briefcase, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Filter, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Activity,
  Mail,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area,
  Legend
} from 'recharts';

// Mock Data
const METRICS = [
  { id: 1, label: 'Total Alumni (Space)', value: '845', change: '+12%', trend: 'up', icon: <Users size={20} className="text-blue-600" /> },
  { id: 2, label: 'Verified (Space)', value: '720', change: '+5%', trend: 'up', icon: <CheckCircle2 size={20} className="text-green-600" /> },
  { id: 3, label: 'Active (30 Days)', value: '340', change: '-2%', trend: 'down', icon: <Activity size={20} className="text-amber-600" /> },
  { id: 4, label: 'Space Events', value: '12', change: '+2', trend: 'up', icon: <Calendar size={20} className="text-purple-600" /> },
  { id: 5, label: 'Jobs Posted', value: '45', change: '+18%', trend: 'up', icon: <Briefcase size={20} className="text-pink-600" /> },
  { id: 6, label: 'Space Revenue', value: '$12,450', change: '+8%', trend: 'up', icon: <DollarSign size={20} className="text-emerald-600" /> },
];

const GROWTH_DATA = [
  { name: 'Jan', alumni: 400 },
  { name: 'Feb', alumni: 450 },
  { name: 'Mar', alumni: 580 },
  { name: 'Apr', alumni: 600 },
  { name: 'May', alumni: 650 },
  { name: 'Jun', alumni: 700 },
  { name: 'Jul', alumni: 750 },
  { name: 'Aug', alumni: 845 },
];

const BATCH_ENGAGEMENT_DATA = [
  { name: '2018', score: 85 },
  { name: '2019', score: 72 },
  { name: '2020', score: 65 },
  { name: '2021', score: 58 },
  { name: '2022', score: 45 },
  { name: '2023', score: 30 },
];

const CAREER_STATUS_DATA = [
  { name: 'Employed', value: 65, color: '#2563eb' },
  { name: 'Higher Study', value: 15, color: '#7c3aed' },
  { name: 'Business', value: 10, color: '#059669' },
  { name: 'Looking', value: 10, color: '#f59e0b' },
];

const EVENT_ATTENDANCE_DATA = [
  { name: 'Reunion', attendees: 450 },
  { name: 'Webinar', attendees: 120 },
  { name: 'Workshop', attendees: 85 },
  { name: 'Gala', attendees: 300 },
  { name: 'Meetup', attendees: 60 },
];

const JOB_APPLICATIONS_DATA = [
  { name: 'CSE', applications: 120 },
  { name: 'BBA', applications: 85 },
  { name: 'EEE', applications: 60 },
  { name: 'ENG', applications: 40 },
];

const EMAIL_ENGAGEMENT_DATA = [
  { name: 'Week 1', open: 45, click: 12 },
  { name: 'Week 2', open: 52, click: 15 },
  { name: 'Week 3', open: 48, click: 14 },
  { name: 'Week 4', open: 60, click: 20 },
];

const REVENUE_SOURCE_DATA = [
  { name: 'Donations', value: 25000, color: '#2563eb' },
  { name: 'Events', value: 15000, color: '#7c3aed' },
  { name: 'Membership', value: 5200, color: '#059669' },
];

export const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [isLoading, setIsLoading] = useState(false);

  const handleRangeChange = (range: string) => {
    setIsLoading(true);
    setDateRange(range);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <div className="space-y-8 relative min-h-[600px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
            <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
              Space: CSE Department
            </span>
          </div>
          <p className="text-slate-500 mt-1">Insights into alumni engagement for your department.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={dateRange}
            onChange={(e) => handleRangeChange(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="6months">Last 6 Months</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <Button variant="outline" leftIcon={<Download size={18} />}>Export Report</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* SECTION 1: Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {METRICS.map((metric) => (
              <div key={metric.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                    {metric.icon}
                  </div>
                  <span className={`text-xs font-medium flex items-center ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {metric.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                <p className="text-xs text-slate-500 mt-1">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* SECTION 2: Alumni Growth */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Alumni Growth Over Time</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-lg">Monthly</button>
                <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:bg-slate-50 rounded-lg">Yearly</button>
              </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={GROWTH_DATA}>
                  <defs>
                    <linearGradient id="colorAlumni" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="alumni" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAlumni)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SECTION 3: Engagement Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Most Engaged Batches</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={BATCH_ENGAGEMENT_DATA} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={40} />
                    <Tooltip 
                      cursor={{fill: '#f1f5f9'}}
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Career Status Distribution</h3>
              <div className="h-72 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CAREER_STATUS_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {CAREER_STATUS_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* SECTION 4 & 5: Event & Job Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-bold text-slate-900">Event Performance</h3>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Total Revenue</p>
                  <p className="text-lg font-bold text-green-600">$15,200</p>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={EVENT_ATTENDANCE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="attendees" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-bold text-slate-900">Job Applications by Batch</h3>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Total Applications</p>
                  <p className="text-lg font-bold text-blue-600">305</p>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={BATCH_ENGAGEMENT_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="score" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={32} name="Applications" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* SECTION 6 & 7: Communication & Finance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Email Engagement Trend</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={EMAIL_ENGAGEMENT_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="open" stroke="#2563eb" strokeWidth={3} dot={{r: 4}} name="Open Rate %" />
                    <Line type="monotone" dataKey="click" stroke="#10b981" strokeWidth={3} dot={{r: 4}} name="Click Rate %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-bold text-slate-900">Revenue Breakdown</h3>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Net Balance</p>
                  <p className="text-lg font-bold text-emerald-600">$45,200</p>
                </div>
              </div>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={REVENUE_SOURCE_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {REVENUE_SOURCE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `$${value}`}
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
