import React, { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Mail, 
  FileText, 
  BarChart3, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Copy, 
  Eye, 
  Send, 
  Clock, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  Users, 
  Calendar,
  ArrowUpRight,
  LayoutTemplate,
  MousePointerClick,
  MessageCircle,
  Trash2,
  AlertCircle,
  Image as ImageIcon
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
  LineChart,
  Line,
  Legend
} from 'recharts';

// Mock Data
const INITIAL_ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Annual Alumni Reunion Registration Open',
    description: 'Registration for the 2024 Grand Reunion is now live. Early bird tickets available.',
    audience: 'All Alumni',
    date: 'Oct 24, 2025',
    status: 'Sent',
    delivery: ['Email', 'WhatsApp'],
    reach: 2145
  },
  {
    id: 2,
    title: 'New Mentorship Program Launch',
    description: 'Connect with current students and share your industry experience.',
    audience: 'Batch 2018 - 2022',
    date: 'Nov 01, 2025',
    status: 'Scheduled',
    delivery: ['Email'],
    reach: 850
  },
  {
    id: 3,
    title: 'Campus Development Fund Appeal',
    description: 'Support the construction of the new science complex.',
    audience: 'All Alumni',
    date: 'Nov 15, 2025',
    status: 'Draft',
    delivery: ['Email'],
    reach: 2145
  }
];

const INITIAL_CAMPAIGNS = [
  {
    id: 1,
    name: 'October Newsletter',
    audience: 'All Alumni',
    sentDate: 'Oct 01, 2025',
    status: 'Sent',
    openRate: '45%',
    clickRate: '12%',
    sent: 2145
  },
  {
    id: 2,
    name: 'Job Fair Invitation',
    audience: 'CSE Dept',
    sentDate: 'Oct 15, 2025',
    status: 'Sent',
    openRate: '62%',
    clickRate: '28%',
    sent: 450
  },
  {
    id: 3,
    name: 'Year End Giving',
    audience: 'All Alumni',
    sentDate: '-',
    status: 'Draft',
    openRate: '-',
    clickRate: '-',
    sent: 0
  }
];

const TEMPLATES = [
  { id: 1, name: 'Event Invitation', category: 'Events', used: 124, subject: 'You are invited!', content: 'Join us for...' },
  { id: 2, name: 'Monthly Newsletter', category: 'News', used: 85, subject: 'This Month at AlumniOne', content: 'Here is what happened...' },
  { id: 3, name: 'Donation Appeal', category: 'Fundraising', used: 42, subject: 'Support your Alma Mater', content: 'Your contribution matters...' },
  { id: 4, name: 'Job Opportunity', category: 'Careers', used: 215, subject: 'New Career Opportunity', content: 'A new role is available...' },
  { id: 5, name: 'Welcome New Alumni', category: 'Onboarding', used: 320, subject: 'Welcome to the Community', content: 'We are glad to have you...' },
  { id: 6, name: 'Reunion Announcement', category: 'Events', used: 65, subject: 'Reunion Alert!', content: 'Save the date for...' },
];

const ANALYTICS_TREND_DATA = [
  { name: 'Mon', email: 40, whatsapp: 24 },
  { name: 'Tue', email: 30, whatsapp: 13 },
  { name: 'Wed', email: 55, whatsapp: 35 },
  { name: 'Thu', email: 45, whatsapp: 20 },
  { name: 'Fri', email: 60, whatsapp: 40 },
  { name: 'Sat', email: 35, whatsapp: 15 },
  { name: 'Sun', email: 25, whatsapp: 10 },
];

const ANALYTICS_AUDIENCE_DATA = [
  { name: 'CSE', engagement: 85 },
  { name: 'BBA', engagement: 65 },
  { name: 'EEE', engagement: 75 },
  { name: 'ENG', engagement: 55 },
  { name: 'ECO', engagement: 45 },
];

export const Communication: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'campaigns' | 'templates' | 'analytics'>('announcements');
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<'announcement' | 'campaign'>('announcement');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Data States
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);

  // Form States
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    audienceType: 'all',
    audienceSubValue: '',
    deliveryEmail: true,
    deliveryWhatsapp: false,
    subject: '',
    content: '',
    scheduleType: 'now',
    scheduleDate: '',
    scheduleTime: ''
  });
  const [estimatedReach, setEstimatedReach] = useState(845);

  useEffect(() => {
    if (formData.audienceType === 'all') setEstimatedReach(845);
    else if (formData.audienceType === 'batch') setEstimatedReach(150);
    else if (formData.audienceType === 'dept') setEstimatedReach(845);
  }, [formData.audienceType, formData.audienceSubValue]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenCreate = (mode: 'announcement' | 'campaign', templateData?: any) => {
    setPanelMode(mode);
    setFormData({
      title: templateData ? templateData.name : '',
      description: '',
      audienceType: 'all',
      audienceSubValue: '',
      deliveryEmail: true,
      deliveryWhatsapp: false,
      subject: templateData ? templateData.subject : '',
      content: templateData ? templateData.content : '',
      scheduleType: 'now',
      scheduleDate: '',
      scheduleTime: ''
    });
    setIsCreatePanelOpen(true);
  };

  const handlePublish = () => {
    if (!formData.title) {
      showToast('Title is required', 'error');
      return;
    }

    if (panelMode === 'announcement') {
      const newAnnouncement = {
        id: Date.now(),
        title: formData.title,
        description: formData.description || 'No description',
        audience: formData.audienceType === 'all' ? 'All Alumni' : `${formData.audienceType === 'batch' ? 'Batch' : 'Dept'} ${formData.audienceSubValue}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        status: formData.scheduleType === 'now' ? 'Sent' : 'Scheduled',
        delivery: [formData.deliveryEmail ? 'Email' : '', formData.deliveryWhatsapp ? 'WhatsApp' : ''].filter(Boolean),
        reach: estimatedReach
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      showToast('Announcement published successfully');
    } else {
      const newCampaign = {
        id: Date.now(),
        name: formData.title,
        audience: formData.audienceType === 'all' ? 'All Alumni' : `${formData.audienceType === 'batch' ? 'Batch' : 'Dept'} ${formData.audienceSubValue}`,
        sentDate: formData.scheduleType === 'now' ? new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : '-',
        status: formData.scheduleType === 'now' ? 'Sent' : 'Scheduled',
        openRate: '-',
        clickRate: '-',
        sent: estimatedReach
      };
      setCampaigns([newCampaign, ...campaigns]);
      showToast('Campaign sent successfully');
    }
    setIsCreatePanelOpen(false);
  };

  const handleDuplicate = (item: any, type: 'announcement' | 'campaign') => {
    if (type === 'announcement') {
      const copy = { ...item, id: Date.now(), title: `${item.title} (Copy)`, status: 'Draft' };
      setAnnouncements([copy, ...announcements]);
    } else {
      const copy = { ...item, id: Date.now(), name: `${item.name} (Copy)`, status: 'Draft', sentDate: '-', openRate: '-', clickRate: '-' };
      setCampaigns([copy, ...campaigns]);
    }
    showToast('Duplicated successfully');
  };

  const handleDelete = (id: number, type: 'announcement' | 'campaign') => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'announcement') {
        setAnnouncements(announcements.filter(a => a.id !== id));
      } else {
        setCampaigns(campaigns.filter(c => c.id !== id));
      }
      showToast('Deleted successfully');
    }
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
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <X size={18} />}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">Communication</h1>
              <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                Space: CSE Department
              </span>
            </div>
            <p className="text-slate-500 text-sm">Manage announcements and email campaigns for your department.</p>
          </div>
          <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
            Prototype Mode – Communication Data Simulated
          </div>
        </div>
        
        {/* Tabs */}
        <div className="px-6 flex gap-6 overflow-x-auto hide-scrollbar">
          <button 
            onClick={() => setActiveTab('announcements')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'announcements' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Megaphone size={18} /> Announcements
          </button>
          <button 
            onClick={() => setActiveTab('campaigns')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'campaigns' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Mail size={18} /> Email Campaigns
          </button>
          <button 
            onClick={() => setActiveTab('templates')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'templates' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <LayoutTemplate size={18} /> Templates
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'analytics' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <BarChart3 size={18} /> Analytics
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 max-w-7xl mx-auto">
        
        {/* ANNOUNCEMENTS TAB */}
        {activeTab === 'announcements' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search announcements..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button onClick={() => handleOpenCreate('announcement')} leftIcon={<Plus size={18} />}>Create Announcement</Button>
            </div>

            <div className="grid gap-4">
              {announcements.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === 'Sent' ? 'bg-green-100 text-green-700' :
                          item.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Users size={14} /> {item.audience} ({item.reach})</span>
                        <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                        <div className="flex items-center gap-2">
                          {item.delivery.includes('Email') && <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-slate-600"><Mail size={12} /> Email</span>}
                          {item.delivery.includes('WhatsApp') && <span className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded text-green-700"><MessageCircle size={12} /> WhatsApp</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" title="Edit"><Edit size={18} /></button>
                      <button onClick={() => handleDuplicate(item, 'announcement')} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" title="Duplicate"><Copy size={18} /></button>
                      <button onClick={() => handleDelete(item.id, 'announcement')} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={18} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CAMPAIGNS TAB */}
        {activeTab === 'campaigns' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search campaigns..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button onClick={() => handleOpenCreate('campaign')} leftIcon={<Plus size={18} />}>Create Campaign</Button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Campaign Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Audience</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Sent Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Stats</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{campaign.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{campaign.audience}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{campaign.sentDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          campaign.status === 'Sent' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {campaign.status === 'Sent' ? (
                          <div className="flex gap-4">
                            <span className="text-green-600 font-medium">{campaign.openRate} Open</span>
                            <span className="text-blue-600 font-medium">{campaign.clickRate} Click</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded transition-colors" title="View"><Eye size={16} /></button>
                          <button className="p-1.5 text-slate-400 hover:text-slate-900 rounded transition-colors" title="Edit"><Edit size={16} /></button>
                          <button onClick={() => handleDuplicate(campaign, 'campaign')} className="p-1.5 text-slate-400 hover:text-slate-900 rounded transition-colors" title="Duplicate"><Copy size={16} /></button>
                          <button onClick={() => handleDelete(campaign.id, 'campaign')} className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors" title="Delete"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* TEMPLATES TAB */}
        {activeTab === 'templates' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TEMPLATES.map((template) => (
                <div key={template.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all group cursor-pointer">
                  <div className="h-40 bg-slate-100 rounded-t-xl flex items-center justify-center border-b border-slate-100 group-hover:bg-blue-50 transition-colors">
                    <FileText size={48} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-900">{template.name}</h3>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{template.category}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">Used {template.used} times</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">Preview</Button>
                      <Button size="sm" className="flex-1" onClick={() => handleOpenCreate('announcement', template)}>Use Template</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-500 mb-1">Total Emails Sent</p>
                <p className="text-3xl font-bold text-slate-900">12,450</p>
                <p className="text-xs text-green-600 flex items-center mt-2"><ArrowUpRight size={14} /> +12% this month</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-500 mb-1">Total WhatsApp Sent</p>
                <p className="text-3xl font-bold text-green-600">3,240</p>
                <p className="text-xs text-green-600 flex items-center mt-2"><ArrowUpRight size={14} /> +8% this month</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-500 mb-1">Avg. Open Rate</p>
                <p className="text-3xl font-bold text-blue-600">48.5%</p>
                <p className="text-xs text-green-600 flex items-center mt-2"><ArrowUpRight size={14} /> +5% vs industry</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-500 mb-1">Avg. Click Rate</p>
                <p className="text-3xl font-bold text-purple-600">18.2%</p>
                <p className="text-xs text-slate-400 mt-2">Stable</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Engagement Trend</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ANALYTICS_TREND_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="email" stroke="#2563eb" strokeWidth={3} dot={{r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff'}} name="Email Open Rate %" />
                      <Line type="monotone" dataKey="whatsapp" stroke="#16a34a" strokeWidth={3} dot={{r: 4, fill: '#16a34a', strokeWidth: 2, stroke: '#fff'}} name="WhatsApp Read Rate %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Audience Engagement by Department</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ANALYTICS_AUDIENCE_DATA} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={50} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="engagement" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={32} name="Engagement Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Create Panel (Sliding) */}
      <AnimatePresence>
        {isCreatePanelOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCreatePanelOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-50 overflow-y-auto border-l border-slate-200 flex flex-col"
            >
              <div className="p-6 border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="text-xl font-bold text-slate-900">
                  {panelMode === 'announcement' ? 'Create Announcement' : 'Create Email Campaign'}
                </h2>
                <button onClick={() => setIsCreatePanelOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><X size={20} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* SECTION 1: Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Basic Info</h3>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {panelMode === 'announcement' ? 'Announcement Title' : 'Campaign Name'} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      placeholder={panelMode === 'announcement' ? "e.g. Campus Closure Notice" : "e.g. October Newsletter"} 
                    />
                  </div>
                  {panelMode === 'announcement' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
                        <textarea 
                          rows={2} 
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                          placeholder="Brief summary..." 
                        />
                      </div>
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                        <ImageIcon className="mx-auto text-slate-400 mb-2" size={24} />
                        <p className="text-sm font-medium text-slate-900">Upload Banner Image (Optional)</p>
                      </div>
                    </>
                  )}
                </div>

                {/* SECTION 2: Audience */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Audience Targeting</h3>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
                    <select 
                      value={formData.audienceType}
                      onChange={(e) => setFormData({...formData, audienceType: e.target.value, audienceSubValue: ''})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="all">All Alumni</option>
                      <option value="batch">Specific Batch</option>
                      <option value="dept">Specific Department</option>
                    </select>
                  </div>
                  
                  <AnimatePresence>
                    {formData.audienceType !== 'all' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Select {formData.audienceType === 'batch' ? 'Batch' : 'Department'}</label>
                        <select 
                          value={formData.audienceSubValue}
                          onChange={(e) => setFormData({...formData, audienceSubValue: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value="">Select option...</option>
                          {formData.audienceType === 'batch' ? (
                            <>
                              <option value="2023">Batch 2023</option>
                              <option value="2022">Batch 2022</option>
                              <option value="2021">Batch 2021</option>
                            </>
                          ) : (
                            <>
                              <option value="CSE">Computer Science</option>
                              <option value="BBA">Business Admin</option>
                              <option value="EEE">Electrical Eng.</option>
                            </>
                          )}
                        </select>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700 flex justify-between items-center border border-blue-100">
                    <span>Estimated Reach (Space)</span>
                    <span className="font-bold">{estimatedReach} Alumni</span>
                  </div>
                </div>

                {/* SECTION 3: Delivery (Announcement Only) */}
                {panelMode === 'announcement' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Delivery Channels</h3>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-3 cursor-pointer p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={formData.deliveryEmail}
                          onChange={(e) => setFormData({...formData, deliveryEmail: e.target.checked})}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" 
                        />
                        <div className="flex items-center gap-2">
                          <Mail size={18} className="text-slate-500" />
                          <span className="text-sm font-medium text-slate-900">Send via Email</span>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={formData.deliveryWhatsapp}
                          onChange={(e) => setFormData({...formData, deliveryWhatsapp: e.target.checked})}
                          className="w-4 h-4 text-green-600 rounded focus:ring-green-500" 
                        />
                        <div className="flex items-center gap-2">
                          <MessageCircle size={18} className="text-green-600" />
                          <span className="text-sm font-medium text-slate-900">Send via WhatsApp</span>
                        </div>
                      </label>
                    </div>
                    {formData.deliveryWhatsapp && (
                      <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                        <AlertCircle size={14} className="mt-0.5 shrink-0" />
                        <span>WhatsApp delivery requires connected API. This is a simulated action for the prototype.</span>
                      </div>
                    )}
                  </div>
                )}

                {/* SECTION 4: Message Content */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Message Content</h3>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Subject</label>
                    <input 
                      type="text" 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      placeholder="e.g. Important Update" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-slate-700">Body</label>
                      <select className="text-xs border border-slate-200 rounded px-2 py-1 bg-slate-50">
                        <option>Insert Variable...</option>
                        <option>{`{{FirstName}}`}</option>
                        <option>{`{{Batch}}`}</option>
                        <option>{`{{Department}}`}</option>
                      </select>
                    </div>
                    <div className="border border-slate-300 rounded-lg overflow-hidden h-48 flex flex-col">
                      <div className="bg-slate-50 border-b border-slate-300 p-2 flex gap-2">
                        <button className="p-1 hover:bg-slate-200 rounded font-bold text-xs">B</button>
                        <button className="p-1 hover:bg-slate-200 rounded italic text-xs">I</button>
                        <button className="p-1 hover:bg-slate-200 rounded underline text-xs">U</button>
                        <div className="w-px h-4 bg-slate-300 mx-1" />
                        <button className="p-1 hover:bg-slate-200 rounded text-xs">Link</button>
                      </div>
                      <textarea 
                        className="flex-1 p-4 focus:outline-none resize-none text-sm" 
                        placeholder="Write your message here..." 
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 5: Schedule */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Schedule</h3>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="schedule" 
                        value="now"
                        checked={formData.scheduleType === 'now'}
                        onChange={() => setFormData({...formData, scheduleType: 'now'})}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
                      />
                      <span className="text-sm text-slate-700">Send Now</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="schedule" 
                        value="later"
                        checked={formData.scheduleType === 'later'}
                        onChange={() => setFormData({...formData, scheduleType: 'later'})}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
                      />
                      <span className="text-sm text-slate-700">Schedule for Later</span>
                    </label>
                  </div>
                  {formData.scheduleType === 'later' && (
                    <div className="grid grid-cols-2 gap-4 pl-6">
                      <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                      <input type="time" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 shrink-0">
                <Button variant="outline" onClick={() => setIsCreatePanelOpen(false)}>Save Draft</Button>
                <Button onClick={handlePublish}>
                  {formData.scheduleType === 'now' ? 'Publish & Send' : 'Schedule Publish'}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
