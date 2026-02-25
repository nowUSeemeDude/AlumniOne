import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  MapPin, 
  Users, 
  Briefcase, 
  Globe, 
  MoreVertical, 
  Filter, 
  Download, 
  X, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { 
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
  LineChart,
  Line
} from 'recharts';

// Mock Data
const INITIAL_COMPANIES = [
  { 
    id: 1, 
    name: 'Google', 
    industry: 'Technology', 
    location: 'Mountain View, CA', 
    website: 'https://google.com', 
    logo: 'https://logo.clearbit.com/google.com',
    totalAlumni: 145, 
    currentEmployees: 89, 
    openJobs: 12,
    isVerified: true,
    description: 'Google is an American multinational technology company that specializes in Internet-related services and products.'
  },
  { 
    id: 2, 
    name: 'Pathao', 
    industry: 'Technology', 
    location: 'Dhaka, Bangladesh', 
    website: 'https://pathao.com', 
    logo: 'https://logo.clearbit.com/pathao.com',
    totalAlumni: 120, 
    currentEmployees: 85, 
    openJobs: 15,
    isVerified: true,
    description: 'Pathao is one of the fastest growing tech startups in Asia, dedicated to developing tangible solutions to battle the biggest infrastructural problems.'
  },
  { 
    id: 3, 
    name: 'bKash', 
    industry: 'Fintech', 
    location: 'Dhaka, Bangladesh', 
    website: 'https://bkash.com', 
    logo: 'https://logo.clearbit.com/bkash.com',
    totalAlumni: 250, 
    currentEmployees: 180, 
    openJobs: 20,
    isVerified: true,
    description: 'bKash is a mobile financial service in Bangladesh operating under the authority of the Bangladesh Bank as a subsidiary of BRAC Bank Limited.'
  },
  { 
    id: 4, 
    name: 'Grameenphone', 
    industry: 'Telecommunications', 
    location: 'Dhaka, Bangladesh', 
    website: 'https://grameenphone.com', 
    logo: 'https://logo.clearbit.com/grameenphone.com',
    totalAlumni: 320, 
    currentEmployees: 245, 
    openJobs: 8,
    isVerified: true,
    description: 'Grameenphone is the leading telecommunications service provider in Bangladesh.'
  },
  { 
    id: 5, 
    name: 'BRAC Bank', 
    industry: 'Banking', 
    location: 'Dhaka, Bangladesh', 
    website: 'https://bracbank.com', 
    logo: 'https://logo.clearbit.com/bracbank.com',
    totalAlumni: 180, 
    currentEmployees: 110, 
    openJobs: 10,
    isVerified: true,
    description: 'BRAC Bank Limited is a private commercial bank in Bangladesh focused on Small and Medium Enterprises (SME).'
  },
  { 
    id: 6, 
    name: 'Robi Axiata', 
    industry: 'Telecommunications', 
    location: 'Dhaka, Bangladesh', 
    website: 'https://robi.com.bd', 
    logo: 'https://logo.clearbit.com/robi.com.bd',
    totalAlumni: 150, 
    currentEmployees: 95, 
    openJobs: 6,
    isVerified: true,
    description: 'Robi Axiata Limited is the second largest mobile network operator in Bangladesh.'
  },
  { 
    id: 7, 
    name: 'Walton', 
    industry: 'Consumer Electronics', 
    location: 'Dhaka, Bangladesh', 
    website: 'https://waltonbd.com', 
    logo: 'https://logo.clearbit.com/waltonbd.com',
    totalAlumni: 200, 
    currentEmployees: 140, 
    openJobs: 25,
    isVerified: false,
    description: 'Walton is a Bangladeshi conglomerate based in Gazipur, Bangladesh. It comprises numerous subsidiaries and affiliated businesses.'
  },
  { 
    id: 8, 
    name: 'Unilever', 
    industry: 'Consumer Goods', 
    location: 'London, UK', 
    website: 'https://unilever.com', 
    logo: 'https://logo.clearbit.com/unilever.com',
    totalAlumni: 210, 
    currentEmployees: 156, 
    openJobs: 5,
    isVerified: true,
    description: 'Unilever is a British multinational consumer goods company headquartered in London, England.'
  },
];

const ALUMNI_AT_COMPANY = [
  { id: 1, name: 'Sarah Khan', batch: 'CSE 2018', department: 'Computer Science', title: 'Senior Software Engineer', status: 'Current', avatar: 'SK' },
  { id: 2, name: 'Rahim Ahmed', batch: 'EEE 2019', department: 'Electrical Eng.', title: 'Product Manager', status: 'Current', avatar: 'RA' },
  { id: 3, name: 'Nusrat Jahan', batch: 'BBA 2020', department: 'Business Admin', title: 'Marketing Specialist', status: 'Past', avatar: 'NJ' },
  { id: 4, name: 'Karim Uddin', batch: 'CSE 2017', department: 'Computer Science', title: 'Data Scientist', status: 'Current', avatar: 'KU' },
  { id: 5, name: 'Fatima Begum', batch: 'ENG 2018', department: 'English', title: 'Content Strategist', status: 'Current', avatar: 'FB' },
];

const COMPANY_JOBS = [
  { id: 1, title: 'Senior Software Engineer', type: 'Full-time', location: 'Dhaka (Hybrid)', posted: '2 days ago' },
  { id: 2, title: 'Product Marketing Manager', type: 'Full-time', location: 'Remote', posted: '5 days ago' },
  { id: 3, title: 'Data Analyst Intern', type: 'Internship', location: 'Dhaka', posted: '1 week ago' },
];

const STATS_BATCH_DATA = [
  { name: '2018', value: 45 },
  { name: '2019', value: 32 },
  { name: '2020', value: 28 },
  { name: '2021', value: 15 },
  { name: '2022', value: 10 },
];

const STATS_DEPT_DATA = [
  { name: 'CSE', value: 45, color: '#3b82f6' },
  { name: 'BBA', value: 30, color: '#10b981' },
  { name: 'EEE', value: 15, color: '#f59e0b' },
  { name: 'ENG', value: 10, color: '#8b5cf6' },
];

const STATS_TREND_DATA = [
  { name: '2020', value: 12 },
  { name: '2021', value: 25 },
  { name: '2022', value: 45 },
  { name: '2023', value: 68 },
  { name: '2024', value: 89 },
];

export const Companies: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [isEnlistOpen, setIsEnlistOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Enlist Form State
  const [newCompany, setNewCompany] = useState({
    name: '',
    industry: 'Technology',
    website: '',
    location: '',
    description: '',
    isVerified: false
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEnlistCompany = () => {
    if (!newCompany.name) {
      showToast('Company name is required', 'error');
      return;
    }
    const company = {
      id: Date.now(),
      ...newCompany,
      logo: `https://ui-avatars.com/api/?name=${newCompany.name}&background=random`,
      totalAlumni: 0,
      currentEmployees: 0,
      openJobs: 0
    };
    setCompanies([...companies, company]);
    setIsEnlistOpen(false);
    showToast('Company enlisted successfully');
    setNewCompany({ name: '', industry: 'Technology', website: '', location: '', description: '', isVerified: false });
  };

  const handleViewCompany = (company: any) => {
    setSelectedCompany(company);
    setView('detail');
    setActiveTab('overview');
  };

  return (
    <div className="space-y-6 min-h-[600px]">
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

      {view === 'list' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">Companies</h1>
                <span className="text-xs font-medium px-2 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-100">
                  Prototype Mode – Data Simulated
                </span>
              </div>
              <p className="text-slate-500">Track alumni employment and partner companies.</p>
            </div>
            <Button onClick={() => setIsEnlistOpen(true)} leftIcon={<Plus size={18} />}>Enlist Company</Button>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search companies..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                <option>All Industries</option>
                <option>Technology</option>
                <option>Consumer Goods</option>
                <option>Telecommunications</option>
                <option>Education</option>
              </select>
              <Button variant="outline" leftIcon={<Filter size={16} />}>Filter</Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Company</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Industry</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Location</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-center">Alumni</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-center">Employed</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-center">Jobs</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {companies.map((company) => (
                  <tr key={company.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => handleViewCompany(company)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={company.logo} alt={company.name} className="w-10 h-10 rounded-lg object-contain bg-white border border-slate-100 p-1" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-medium text-slate-900">{company.name}</p>
                            {company.isVerified && <CheckCircle2 size={14} className="text-blue-500" />}
                          </div>
                          <a href={company.website} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-xs text-slate-500 hover:text-blue-600 hover:underline">
                            {company.website.replace('https://', '')}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{company.industry}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{company.location}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {company.totalAlumni}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {company.currentEmployees}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {company.openJobs > 0 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {company.openJobs} Open
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleViewCompany(company); }}>View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {view === 'detail' && selectedCompany && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Detail Header */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div className="flex items-center gap-6">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="shrink-0"
                    onClick={() => setView('list')}
                    leftIcon={<ChevronRight size={16} className="rotate-180" />}
                  >
                    Back
                  </Button>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full shadow-md p-1 border border-slate-100 shrink-0">
                      <img src={selectedCompany.logo} alt={selectedCompany.name} className="w-full h-full object-contain rounded-full" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl font-bold text-slate-900">{selectedCompany.name}</h1>
                        {selectedCompany.isVerified && <CheckCircle2 size={20} className="text-blue-500" />}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><Building2 size={14} /> {selectedCompany.industry}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {selectedCompany.location}</span>
                        <a href={selectedCompany.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                          <Globe size={14} /> Website
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <Button variant="outline" leftIcon={<Briefcase size={16} />}>View Jobs</Button>
                  <Button leftIcon={<Users size={16} />}>View Alumni</Button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-slate-200 flex gap-8">
                {['overview', 'alumni', 'stats', 'jobs'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-medium border-b-2 transition-colors capitalize ${
                      activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab === 'stats' ? 'Statistics' : tab}
                  </button>
                ))}
              </div>

              <div className="pt-8">
                {activeTab === 'overview' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">About {selectedCompany.name}</h3>
                        <p className="text-slate-600 leading-relaxed">{selectedCompany.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <p className="text-sm text-slate-500 mb-1">Total Alumni</p>
                          <p className="text-2xl font-bold text-slate-900">{selectedCompany.totalAlumni}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                          <p className="text-sm text-green-700 mb-1">Currently Employed</p>
                          <p className="text-2xl font-bold text-green-900">{selectedCompany.currentEmployees}</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                          <p className="text-sm text-blue-700 mb-1">Open Positions</p>
                          <p className="text-2xl font-bold text-blue-900">{selectedCompany.openJobs}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">Key Contacts</h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">HR</div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">HR Department</p>
                              <p className="text-xs text-slate-500">careers@{selectedCompany.name.toLowerCase()}.com</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'alumni' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-slate-900">Alumni at {selectedCompany.name}</h3>
                      <div className="flex gap-2">
                        <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>All Employees</option>
                          <option>Current</option>
                          <option>Past</option>
                        </select>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Batch / Dept</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Job Title</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {ALUMNI_AT_COMPANY.map((alum) => (
                            <tr key={alum.id} className="hover:bg-slate-50">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">{alum.avatar}</div>
                                  <span className="font-medium text-slate-900">{alum.name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <p className="text-sm text-slate-900">{alum.batch}</p>
                                <p className="text-xs text-slate-500">{alum.department}</p>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-600">{alum.title}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${alum.status === 'Current' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                  {alum.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <Button variant="ghost" size="sm">Profile</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'stats' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                      <h3 className="font-bold text-slate-900 mb-6">Alumni by Batch</h3>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={STATS_BATCH_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                            <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                      <h3 className="font-bold text-slate-900 mb-6">Department Distribution</h3>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={STATS_DEPT_DATA}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {STATS_DEPT_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                      <h3 className="font-bold text-slate-900 mb-6">Employment Trend</h3>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={STATS_TREND_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'jobs' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-slate-900">Active Job Openings</h3>
                      <Button variant="outline" size="sm">View All on Job Board</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {COMPANY_JOBS.map((job) => (
                        <div key={job.id} className="p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">{job.type}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                            <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                            <span className="flex items-center gap-1"><Briefcase size={14} /> {selectedCompany.name}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-slate-400">
                            <span>Posted {job.posted}</span>
                            <span className="flex items-center gap-1 text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              Apply Now <ArrowUpRight size={12} />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Enlist Company Drawer */}
      <AnimatePresence>
        {isEnlistOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEnlistOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Enlist New Company</h2>
                <button onClick={() => setIsEnlistOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                  <input 
                    type="text" 
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="e.g. Acme Corp" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Industry</label>
                  <select 
                    value={newCompany.industry}
                    onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option>Technology</option>
                    <option>Consumer Goods</option>
                    <option>Finance</option>
                    <option>Education</option>
                    <option>Healthcare</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
                  <input 
                    type="url" 
                    value={newCompany.website}
                    onChange={(e) => setNewCompany({...newCompany, website: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="https://example.com" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Headquarters Location</label>
                  <input 
                    type="text" 
                    value={newCompany.location}
                    onChange={(e) => setNewCompany({...newCompany, location: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="City, Country" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea 
                    rows={4}
                    value={newCompany.description}
                    onChange={(e) => setNewCompany({...newCompany, description: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none" 
                    placeholder="Brief description of the company..." 
                  />
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <input 
                    type="checkbox" 
                    checked={newCompany.isVerified}
                    onChange={(e) => setNewCompany({...newCompany, isVerified: e.target.checked})}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
                  />
                  <div>
                    <span className="block text-sm font-medium text-slate-900">Verified Partner</span>
                    <span className="text-xs text-slate-500">Mark this company as a verified partner organization.</span>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEnlistOpen(false)}>Cancel</Button>
                <Button onClick={handleEnlistCompany}>Enlist Company</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
