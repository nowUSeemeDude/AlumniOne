import React, { useState } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Filter, 
  Search, 
  Plus, 
  FileText, 
  Calendar, 
  Users, 
  PieChart as PieChartIcon, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Upload,
  Receipt
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

import { DonationsModule } from './finance/DonationsModule';

// Mock Data
const TRANSACTIONS = [
  { id: 'TRX-9871', date: 'Oct 24, 2025', name: 'Sarah Khan', type: 'Donation', campaign: 'Science Lab Fund', amount: 500, method: 'Stripe', status: 'Completed' },
  { id: 'TRX-9872', date: 'Oct 24, 2025', name: 'Rahim Ahmed', type: 'Event Fee', campaign: 'Annual Reunion', amount: 50, method: 'bKash', status: 'Completed' },
  { id: 'TRX-9873', date: 'Oct 23, 2025', name: 'Karim Uddin', type: 'Membership', campaign: 'Lifetime Member', amount: 200, method: 'PayPal', status: 'Pending' },
  { id: 'TRX-9874', date: 'Oct 22, 2025', name: 'Nusrat Jahan', type: 'Donation', campaign: 'Scholarship Fund', amount: 1000, method: 'Bank Transfer', status: 'Completed' },
  { id: 'TRX-9875', date: 'Oct 21, 2025', name: 'Fatima Begum', type: 'Event Fee', campaign: 'Tech Workshop', amount: 25, method: 'SSLCommerz', status: 'Refunded' },
];

const CAMPAIGNS = [
  { id: 1, title: 'New Science Complex Fund', raised: 45000, goal: 100000, donors: 124, status: 'Active' },
  { id: 2, title: 'Underprivileged Student Scholarship', raised: 12500, goal: 20000, donors: 85, status: 'Active' },
  { id: 3, title: 'Alumni House Renovation', raised: 5000, goal: 50000, donors: 12, status: 'Draft' },
];

const EXPENSES = [
  { id: 1, title: 'Reunion Venue Booking', category: 'Venue', event: 'Annual Reunion', vendor: 'Grand Ballroom', amount: 5000, date: 'Oct 15, 2025', status: 'Approved' },
  { id: 2, title: 'Catering Deposit', category: 'Catering', event: 'Annual Reunion', vendor: 'Dhaka Catering', amount: 2000, date: 'Oct 18, 2025', status: 'Approved' },
  { id: 3, title: 'Marketing Flyers', category: 'Printing', event: 'Tech Workshop', vendor: 'PrintZone', amount: 150, date: 'Oct 20, 2025', status: 'Pending' },
];

const EVENT_REVENUE = [
  { id: 1, name: 'Annual Reunion 2025', tickets: 450, revenue: 22500, refunds: 150, net: 22350 },
  { id: 2, name: 'Tech Career Webinar', tickets: 120, revenue: 1200, refunds: 0, net: 1200 },
  { id: 3, name: 'Fundraising Gala', tickets: 85, revenue: 8500, refunds: 500, net: 8000 },
];

const REVENUE_DATA = [
  { name: 'Jan', revenue: 12000 },
  { name: 'Feb', revenue: 15000 },
  { name: 'Mar', revenue: 18000 },
  { name: 'Apr', revenue: 16000 },
  { name: 'May', revenue: 21000 },
  { name: 'Jun', revenue: 25000 },
  { name: 'Jul', revenue: 22000 },
  { name: 'Aug', revenue: 28000 },
  { name: 'Sep', revenue: 32000 },
  { name: 'Oct', revenue: 35000 },
];

const EXPENSE_BREAKDOWN = [
  { name: 'Events', value: 45, color: '#3b82f6' },
  { name: 'Operations', value: 25, color: '#10b981' },
  { name: 'Marketing', value: 15, color: '#f59e0b' },
  { name: 'Scholarships', value: 15, color: '#8b5cf6' },
];

export const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'donations' | 'events' | 'expenses' | 'reports'>('overview');
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddExpense = () => {
    setIsAddExpenseOpen(false);
    showToast('Expense submitted for approval');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-20 left-1/2 z-[60] px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
              toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">Finance & Accounting</h1>
              <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                Space: CSE Department
              </span>
            </div>
            <p className="text-slate-500 text-sm">Manage donations, event revenue, and expenses for your department.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Global Service Charge</span>
              <span className="text-sm font-bold text-slate-700">2.5% (Read-only)</span>
            </div>
            <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
              Prototype Mode – Financial Data Simulated
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="px-6 flex gap-6 overflow-x-auto hide-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart3 size={18} /> },
            { id: 'transactions', label: 'All Transactions', icon: <CreditCard size={18} /> },
            { id: 'donations', label: 'Donations', icon: <Users size={18} /> },
            { id: 'events', label: 'Event Revenue', icon: <Calendar size={18} /> },
            { id: 'expenses', label: 'Expenses', icon: <Receipt size={18} /> },
            { id: 'reports', label: 'Reports', icon: <FileText size={18} /> },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 max-w-7xl mx-auto">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg"><TrendingUp size={20} /></div>
                  <span className="text-xs font-medium text-green-600 flex items-center gap-1">+12% <ArrowUpRight size={12} /></span>
                </div>
                <p className="text-sm text-slate-500">Total Income (Space)</p>
                <p className="text-2xl font-bold text-slate-900">$12,450</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg"><TrendingDown size={20} /></div>
                  <span className="text-xs font-medium text-red-600 flex items-center gap-1">+5% <ArrowUpRight size={12} /></span>
                </div>
                <p className="text-sm text-slate-500">Total Expenses (Space)</p>
                <p className="text-2xl font-bold text-slate-900">$4,230</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><DollarSign size={20} /></div>
                  <span className="text-xs font-medium text-green-600 flex items-center gap-1">+8% <ArrowUpRight size={12} /></span>
                </div>
                <p className="text-sm text-slate-500">Net Balance (Space)</p>
                <p className="text-2xl font-bold text-slate-900">$8,220</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Calendar size={20} /></div>
                  <span className="text-xs font-medium text-green-600 flex items-center gap-1">+15% <ArrowUpRight size={12} /></span>
                </div>
                <p className="text-sm text-slate-500">This Month Revenue</p>
                <p className="text-2xl font-bold text-slate-900">$1,845</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Monthly Revenue Trend</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={REVENUE_DATA}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <Tooltip 
                        formatter={(value) => `$${value}`}
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Expense Breakdown</h3>
                <div className="h-80 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={EXPENSE_BREAKDOWN}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {EXPENSE_BREAKDOWN.map((entry, index) => (
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
          </motion.div>
        )}

        {/* TRANSACTIONS TAB */}
        {activeTab === 'transactions' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button variant="outline" leftIcon={<Filter size={16} />}>Filter</Button>
                <Button variant="outline" leftIcon={<Download size={16} />}>Export CSV</Button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">ID</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Type</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {TRANSACTIONS.map((trx) => (
                    <tr key={trx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-slate-600">{trx.id}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{trx.date}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {trx.name}
                        <p className="text-xs text-slate-500 font-normal">{trx.method}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {trx.type}
                        <p className="text-xs text-slate-400">{trx.campaign}</p>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">${trx.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          trx.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          trx.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {trx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1.5 text-slate-400 hover:text-slate-900 rounded transition-colors"><MoreVertical size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* DONATIONS TAB */}
        {activeTab === 'donations' && (
          <DonationsModule />
        )}


        {/* EVENT REVENUE TAB */}
        {activeTab === 'events' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Event Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Tickets Sold</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Total Revenue</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Refunds</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Net Income</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {EVENT_REVENUE.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{event.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{event.tickets}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">${event.revenue.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-red-600">-${event.refunds}</td>
                      <td className="px-6 py-4 text-sm font-bold text-green-600">${event.net.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="outline" size="sm">Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* EXPENSES TAB */}
        {activeTab === 'expenses' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search expenses..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button onClick={() => setIsAddExpenseOpen(true)} leftIcon={<Plus size={18} />}>Add Expense</Button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Expense Title</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Category</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Vendor</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {EXPENSES.map((expense) => (
                    <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {expense.title}
                        <p className="text-xs text-slate-500 font-normal">{expense.event}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{expense.category}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{expense.vendor}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{expense.date}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">${expense.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          expense.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {expense.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"><Download size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* REPORTS TAB */}
        {activeTab === 'reports' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center h-96 bg-white rounded-xl border border-slate-200">
            <div className="text-center">
              <FileText size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-900">Financial Reports</h3>
              <p className="text-slate-500 mb-6">Generate detailed PDF and CSV reports for audits.</p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" leftIcon={<Calendar size={18} />}>Select Period</Button>
                <Button leftIcon={<Download size={18} />}>Generate Report</Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Add Expense Modal */}
      <AnimatePresence>
        {isAddExpenseOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAddExpenseOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden"
              >
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-900">Log New Expense</h2>
                  <button onClick={() => setIsAddExpenseOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><XCircle size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Expense Title</label>
                    <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g. Venue Booking" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                      <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
                        <option>Venue</option>
                        <option>Catering</option>
                        <option>Marketing</option>
                        <option>Printing</option>
                        <option>Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</label>
                      <input type="number" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Vendor Name</label>
                    <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g. Grand Ballroom" />
                  </div>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                    <Upload className="mx-auto text-slate-400 mb-2" size={24} />
                    <p className="text-sm font-medium text-slate-900">Upload Receipt / Invoice</p>
                    <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 5MB</p>
                  </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddExpenseOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddExpense}>Submit Expense</Button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
