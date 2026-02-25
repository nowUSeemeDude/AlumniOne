import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  DollarSign, 
  Users, 
  Calendar, 
  FileText, 
  ChevronRight, 
  Download, 
  Upload, 
  X, 
  CreditCard, 
  ArrowRight,
  ShieldCheck,
  Banknote
} from 'lucide-react';
import { Button } from '../../ui/Button';
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
  Cell 
} from 'recharts';

// Mock Data
const INITIAL_CAMPAIGNS = [
  { 
    id: 1, 
    title: 'CSE Lab Equipment Fund', 
    category: 'Infrastructure', 
    organizer: 'Dr. Sarah Ahmed', 
    raised: 4500, 
    goal: 10000, 
    donors: 24, 
    endDate: '2025-12-31', 
    status: 'Active', 
    description: 'Help us upgrade our CSE labs with the latest hardware for students.',
    serviceCharge: 2.5
  },
  { 
    id: 2, 
    title: 'CSE Merit Scholarship', 
    category: 'Scholarship', 
    organizer: 'CSE Alumni Committee', 
    raised: 1250, 
    goal: 5000, 
    donors: 15, 
    endDate: '2025-11-30', 
    status: 'Active', 
    description: 'Providing financial support to meritorious CSE students.',
    serviceCharge: 2.5
  },
  { 
    id: 3, 
    title: 'Department Common Room Renovation', 
    category: 'Infrastructure', 
    organizer: 'CSE Student Body', 
    raised: 0, 
    goal: 2000, 
    donors: 0, 
    endDate: '2026-01-15', 
    status: 'Pending Approval', 
    description: 'Renovating the CSE common room for better student interaction.',
    serviceCharge: 2.5
  },
];

const CATEGORY_DATA = [
  { name: 'Infrastructure', value: 4500, color: '#3b82f6' },
  { name: 'Scholarship', value: 1250, color: '#10b981' },
  { name: 'Events', value: 500, color: '#8b5cf6' },
];

export const DonationsModule: React.FC = () => {
  const [view, setView] = useState<'list' | 'create' | 'detail' | 'admin_review' | 'analytics'>('list');
  const [activeTab, setActiveTab] = useState('all');
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isAdmin, setIsAdmin] = useState(true); // Toggle for prototype
  const [donationAmount, setDonationAmount] = useState('');
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // Create Form State
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    category: 'Infrastructure',
    description: '',
    goal: '',
    endDate: '',
    organizer: 'Current User'
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateCampaign = () => {
    if (!newCampaign.title || !newCampaign.goal) {
      showToast('Please fill in required fields', 'error');
      return;
    }
    const campaign = {
      id: Date.now(),
      ...newCampaign,
      raised: 0,
      donors: 0,
      status: 'Pending Approval',
      serviceCharge: 5,
      goal: Number(newCampaign.goal)
    };
    setCampaigns([campaign, ...campaigns]);
    setView('list');
    showToast('Campaign submitted for approval');
    setNewCampaign({ title: '', category: 'Infrastructure', description: '', goal: '', endDate: '', organizer: 'Current User' });
  };

  const handleApproveCampaign = () => {
    const updatedCampaigns = campaigns.map(c => 
      c.id === selectedCampaign.id ? { ...c, status: 'Active' } : c
    );
    setCampaigns(updatedCampaigns);
    setSelectedCampaign({ ...selectedCampaign, status: 'Active' });
    setView('list');
    showToast('Campaign approved successfully');
  };

  const handleDonate = () => {
    if (!donationAmount) return;
    const amount = Number(donationAmount);
    const updatedCampaigns = campaigns.map(c => 
      c.id === selectedCampaign.id ? { ...c, raised: c.raised + amount, donors: c.donors + 1 } : c
    );
    setCampaigns(updatedCampaigns);
    setSelectedCampaign({ ...selectedCampaign, raised: selectedCampaign.raised + amount, donors: selectedCampaign.donors + 1 });
    setIsDonateModalOpen(false);
    setDonationAmount('');
    showToast(`Successfully donated $${amount}`);
  };

  const handleWithdrawRequest = () => {
    setIsWithdrawModalOpen(false);
    showToast('Withdrawal request submitted');
  };

  const handleTransferComplete = () => {
    setIsTransferModalOpen(false);
    const updatedCampaigns = campaigns.map(c => 
      c.id === selectedCampaign.id ? { ...c, status: 'Completed' } : c
    );
    setCampaigns(updatedCampaigns);
    setSelectedCampaign({ ...selectedCampaign, status: 'Completed' });
    showToast('Funds transferred and campaign completed');
  };

  const filteredCampaigns = campaigns.filter(c => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return c.status === 'Pending Approval';
    if (activeTab === 'active') return c.status === 'Active';
    if (activeTab === 'completed') return c.status === 'Completed';
    return true;
  });

  return (
    <div className="space-y-6">
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

      {/* Header Controls */}
      {view === 'list' && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
            {['all', 'pending', 'active', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all capitalize ${
                  activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab === 'pending' ? 'Pending Approval' : tab}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setView('analytics')} leftIcon={<BarChart size={18} />}>Analytics</Button>
            <Button onClick={() => setView('create')} leftIcon={<Plus size={18} />}>Create Campaign</Button>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {view === 'list' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Campaign Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Target / Raised</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">End Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{campaign.title}</p>
                    <p className="text-xs text-slate-500">by {campaign.organizer}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{campaign.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-slate-900">${campaign.raised.toLocaleString()}</span>
                      <span className="text-xs text-slate-500">of ${campaign.goal.toLocaleString()}</span>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{campaign.endDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campaign.status === 'Active' ? 'bg-green-100 text-green-700' :
                      campaign.status === 'Pending Approval' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {campaign.status === 'Pending Approval' ? (
                        <Button size="sm" onClick={() => { setSelectedCampaign(campaign); setView('admin_review'); }}>Review</Button>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => { setSelectedCampaign(campaign); setView('detail'); }}>View</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* CREATE CAMPAIGN VIEW */}
      {view === 'create' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Create Donation Campaign</h2>
              <button onClick={() => setView('list')} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Title</label>
                <input 
                  type="text" 
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({...newCampaign, title: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  placeholder="e.g. Annual Scholarship Fund" 
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select 
                    value={newCampaign.category}
                    onChange={(e) => setNewCampaign({...newCampaign, category: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option>Infrastructure</option>
                    <option>Scholarship</option>
                    <option>Disaster Relief</option>
                    <option>Events</option>
                    <option>Research</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Target Amount ($)</label>
                  <input 
                    type="number" 
                    value={newCampaign.goal}
                    onChange={(e) => setNewCampaign({...newCampaign, goal: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="10000" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                <input 
                  type="date" 
                  value={newCampaign.endDate}
                  onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  rows={4}
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none" 
                  placeholder="Describe the purpose of this campaign..." 
                />
              </div>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <Upload className="mx-auto text-slate-400 mb-2" size={24} />
                <p className="text-sm font-medium text-slate-900">Upload Supporting Documents</p>
                <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 10MB</p>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setView('list')}>Cancel</Button>
                <Button onClick={handleCreateCampaign}>Submit for Review</Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ADMIN REVIEW VIEW */}
      {view === 'admin_review' && selectedCampaign && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-amber-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Review Campaign Request</h2>
                <p className="text-sm text-amber-700">This campaign requires admin approval before going live.</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setView('list')}>Back</Button>
            </div>
            <div className="p-8 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Campaign Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-500">Title</p>
                      <p className="font-bold text-slate-900 text-lg">{selectedCampaign.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Category</p>
                      <p className="font-medium text-slate-900">{selectedCampaign.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Organizer</p>
                      <p className="font-medium text-slate-900">{selectedCampaign.organizer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Target Amount</p>
                      <p className="font-bold text-slate-900 text-lg">${selectedCampaign.goal.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Admin Controls</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Global Service Charge (%)</label>
                      <input type="number" defaultValue={2.5} disabled className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed" />
                      <p className="text-xs text-slate-500 mt-1">Platform fee is set at university level.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                      <input type="date" defaultValue={selectedCampaign.endDate} className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                    </div>
                    <div className="pt-2">
                      <p className="text-sm font-medium text-slate-900">Net Payout Preview</p>
                      <p className="text-2xl font-bold text-green-600">${(selectedCampaign.goal * 0.95).toLocaleString()}</p>
                      <p className="text-xs text-slate-500">Estimated payout after 5% fee</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase mb-2">Description</h3>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                  {selectedCampaign.description}
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
                <Button variant="outline">Request Changes</Button>
                <Button onClick={handleApproveCampaign} leftIcon={<CheckCircle2 size={18} />}>Approve & Publish</Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* PUBLIC / DETAIL VIEW */}
      {view === 'detail' && selectedCampaign && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setView('list')} leftIcon={<ChevronRight className="rotate-180" size={18} />}>Back to Campaigns</Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Users size={64} className="text-white/30" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded uppercase tracking-wide">{selectedCampaign.category}</span>
                    <span className="text-slate-400 text-sm">•</span>
                    <span className="text-slate-500 text-sm">Organized by {selectedCampaign.organizer}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-4">{selectedCampaign.title}</h1>
                  <p className="text-slate-600 leading-relaxed mb-6">{selectedCampaign.description}</p>
                  
                  <div className="border-t border-slate-100 pt-6">
                    <h3 className="font-bold text-slate-900 mb-4">Recent Donors</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">AN</div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">Anonymous Donor</p>
                              <p className="text-xs text-slate-500">2 hours ago</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-green-600">+$50.00</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24">
                <div className="mb-6">
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-3xl font-bold text-slate-900">${selectedCampaign.raised.toLocaleString()}</span>
                    <span className="text-slate-500 mb-1">raised of ${selectedCampaign.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden mb-2">
                    <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${Math.min((selectedCampaign.raised / selectedCampaign.goal) * 100, 100)}%` }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>{Math.round((selectedCampaign.raised / selectedCampaign.goal) * 100)}% funded</span>
                    <span>{selectedCampaign.donors} donors</span>
                  </div>
                </div>

                {selectedCampaign.status === 'Active' && (
                  <Button className="w-full mb-4" size="lg" onClick={() => setIsDonateModalOpen(true)}>Donate Now</Button>
                )}

                <div className="flex items-center gap-2 text-sm text-slate-500 justify-center mb-6">
                  <Clock size={16} />
                  <span>Ends on {selectedCampaign.endDate}</span>
                </div>

                {/* Admin/Organizer Actions */}
                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Management</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Service Charge ({selectedCampaign.serviceCharge}%)</span>
                    <span className="font-medium text-slate-900">-${((selectedCampaign.raised * selectedCampaign.serviceCharge) / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Net Payable</span>
                    <span className="font-bold text-green-600">${(selectedCampaign.raised * (1 - selectedCampaign.serviceCharge / 100)).toLocaleString()}</span>
                  </div>
                  
                  {selectedCampaign.raised > 0 && selectedCampaign.status !== 'Completed' && (
                    <Button variant="outline" className="w-full mt-2" onClick={() => setIsWithdrawModalOpen(true)}>Request Withdrawal</Button>
                  )}
                  
                  {isAdmin && selectedCampaign.status !== 'Completed' && (
                    <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50" onClick={() => setIsTransferModalOpen(true)}>
                      Mark as Transferred
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ANALYTICS VIEW */}
      {view === 'analytics' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-bold text-slate-900">Donation Analytics</h2>
             <Button variant="outline" onClick={() => setView('list')}>Back to List</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-500 mb-1">Total Campaigns</p>
                <p className="text-3xl font-bold text-slate-900">{campaigns.length}</p>
             </div>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-500 mb-1">Total Funds Raised</p>
                <p className="text-3xl font-bold text-green-600">${campaigns.reduce((acc, curr) => acc + curr.raised, 0).toLocaleString()}</p>
             </div>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-500 mb-1">Service Revenue</p>
                <p className="text-3xl font-bold text-blue-600">${campaigns.reduce((acc, curr) => acc + (curr.raised * curr.serviceCharge / 100), 0).toLocaleString()}</p>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-6">Funds by Category</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={CATEGORY_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                      <YAxis axisLine={false} tickLine={false} fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </div>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-6">Distribution</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={CATEGORY_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {CATEGORY_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </div>
        </motion.div>
      )}

      {/* DONATE MODAL */}
      <AnimatePresence>
        {isDonateModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4">Make a Donation</h3>
              <p className="text-slate-500 mb-6">Donating to <span className="font-semibold text-slate-900">{selectedCampaign?.title}</span></p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</label>
                  <input 
                    type="number" 
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full px-4 py-3 text-lg font-bold border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                    placeholder="100" 
                    autoFocus
                  />
                </div>
                <div className="flex gap-2">
                  {[50, 100, 500].map(amt => (
                    <button 
                      key={amt}
                      onClick={() => setDonationAmount(amt.toString())}
                      className="flex-1 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-sm font-medium"
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3">
                   <CreditCard className="text-slate-400" />
                   <div>
                      <p className="text-sm font-medium text-slate-900">Visa ending in 4242</p>
                      <p className="text-xs text-slate-500">Expires 12/28</p>
                   </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsDonateModalOpen(false)}>Cancel</Button>
                <Button className="flex-1" onClick={handleDonate}>Confirm Donation</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WITHDRAW MODAL */}
      <AnimatePresence>
        {isWithdrawModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4">Request Withdrawal</h3>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 space-y-2">
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total Raised</span>
                    <span className="font-medium">${selectedCampaign?.raised.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Service Charge ({selectedCampaign?.serviceCharge}%)</span>
                    <span className="font-medium text-red-600">-${((selectedCampaign?.raised * selectedCampaign?.serviceCharge) / 100).toLocaleString()}</span>
                 </div>
                 <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900">
                    <span>Net Payable</span>
                    <span>${(selectedCampaign?.raised * (1 - selectedCampaign?.serviceCharge / 100)).toLocaleString()}</span>
                 </div>
              </div>

              <div className="space-y-4 mb-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bank Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg" placeholder="Bank Asia" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Account Number</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg" placeholder="0000 0000 0000" />
                 </div>
                 <div className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <p className="text-xs text-slate-500">I declare that these funds will be used solely for the purpose described in the campaign.</p>
                 </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsWithdrawModalOpen(false)}>Cancel</Button>
                <Button className="flex-1" onClick={handleWithdrawRequest}>Submit Request</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TRANSFER MODAL (ADMIN) */}
      <AnimatePresence>
        {isTransferModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4">Record Fund Transfer</h3>
              <p className="text-sm text-slate-500 mb-6">Confirm that you have transferred the funds to the organizer.</p>
              
              <div className="space-y-4 mb-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Transaction Reference ID</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg" placeholder="TXN-12345678" />
                 </div>
                 <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 cursor-pointer">
                    <Upload className="mx-auto text-slate-400 mb-1" size={20} />
                    <p className="text-xs font-medium text-slate-900">Upload Proof of Transfer</p>
                 </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsTransferModalOpen(false)}>Cancel</Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleTransferComplete}>Mark as Paid</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
