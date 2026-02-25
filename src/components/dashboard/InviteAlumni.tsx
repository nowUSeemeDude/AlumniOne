import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  RefreshCw, 
  Trash2,
  Copy,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/Button';

interface InviteAlumniProps {
  onBack: () => void;
}

// Mock Data
const DEPARTMENTS = ['Computer Science', 'Electrical Engineering', 'Business Administration', 'English', 'Economics'];
const BATCHES = ['2023', '2022', '2021', '2020', '2019', '2018'];

interface Invitation {
  id: number;
  email: string;
  name: string;
  department: string;
  batch: string;
  sentDate: string;
  status: 'Sent' | 'Opened' | 'Registered' | 'Expired';
}

const INITIAL_HISTORY: Invitation[] = [
  { id: 1, email: 'sarah.k@example.com', name: 'Sarah Khan', department: 'Computer Science', batch: '2020', sentDate: 'Oct 24, 2023', status: 'Registered' },
  { id: 2, email: 'rahim.a@example.com', name: 'Rahim Ahmed', department: 'Electrical Engineering', batch: '2021', sentDate: 'Nov 02, 2023', status: 'Sent' },
  { id: 3, email: 'nusrat.j@example.com', name: 'Nusrat Jahan', department: 'Business Administration', batch: '2019', sentDate: 'Nov 05, 2023', status: 'Opened' },
];

export const InviteAlumni: React.FC<InviteAlumniProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'single' | 'bulk' | 'history'>('single');
  const [history, setHistory] = useState<Invitation[]>(INITIAL_HISTORY);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Single Invite State
  const [singleForm, setSingleForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    batch: '',
    message: ''
  });

  // Bulk Invite State
  const [bulkText, setBulkText] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Initialize message template
  useEffect(() => {
    setSingleForm(prev => ({
      ...prev,
      message: `Subject: Join Your University Alumni Network\n\nHi ${prev.name || 'Alumni'},\n\nWe're excited to invite you to join the official alumni platform of BRAC University.\n\nPlease complete your alumni profile using the link below:\n\nhttps://bracu.alumnione.bd/register?invite=${Math.random().toString(36).substring(7)}\n\nWe look forward to reconnecting with you.\n\nBest regards,\nAdmin Team`
    }));
  }, [singleForm.name]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleForm.email) {
      showToast('Email address is required', 'error');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const newInvite: Invitation = {
        id: Date.now(),
        email: singleForm.email,
        name: singleForm.name || 'Unknown',
        department: singleForm.department || 'N/A',
        batch: singleForm.batch || 'N/A',
        sentDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Sent'
      };
      setHistory([newInvite, ...history]);
      showToast('Invitation sent successfully');
      setSingleForm({ name: '', email: '', phone: '', department: '', batch: '', message: singleForm.message });
    }, 800);
  };

  const handleBulkSubmit = () => {
    if (!bulkText) return;
    const emails = bulkText.split('\n').filter(e => e.trim());
    
    setTimeout(() => {
      const newInvites = emails.map((email, idx) => ({
        id: Date.now() + idx,
        email: email.trim(),
        name: 'Unknown',
        department: 'N/A',
        batch: 'N/A',
        sentDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Sent' as const
      }));
      setHistory([...newInvites, ...history]);
      showToast(`${newInvites.length} invitations sent successfully`);
      setBulkText('');
    }, 1000);
  };

  return (
    <div className="relative min-h-[calc(100vh-100px)]">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-20 left-1/2 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
              toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button 
              onClick={onBack}
              className="p-1 -ml-1 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-slate-900">Invite Alumni</h1>
          </div>
          <p className="text-slate-500 ml-7">Invite members to join your official alumni portal.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-100">
            Prototype Mode – Email sending simulated
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="border-b border-slate-200 flex">
          <button
            onClick={() => setActiveTab('single')}
            className={`flex-1 py-4 text-sm font-medium text-center border-b-2 transition-colors ${
              activeTab === 'single' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Single Invite
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={`flex-1 py-4 text-sm font-medium text-center border-b-2 transition-colors ${
              activeTab === 'bulk' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Bulk Invite
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-4 text-sm font-medium text-center border-b-2 transition-colors ${
              activeTab === 'history' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Invitation History
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* TAB 1: SINGLE INVITE */}
          {activeTab === 'single' && (
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSingleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <input
                      type="text"
                      value={singleForm.name}
                      onChange={(e) => setSingleForm({...singleForm, name: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      value={singleForm.email}
                      onChange={(e) => setSingleForm({...singleForm, email: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g. john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      value={singleForm.phone}
                      onChange={(e) => setSingleForm({...singleForm, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g. +880 1711 000000"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                    <select
                      value={singleForm.department}
                      onChange={(e) => setSingleForm({...singleForm, department: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="">Select Department</option>
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Batch</label>
                    <select
                      value={singleForm.batch}
                      onChange={(e) => setSingleForm({...singleForm, batch: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="">Select Batch</option>
                      {BATCHES.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Personal Message</label>
                  <div className="relative">
                    <textarea
                      value={singleForm.message}
                      onChange={(e) => setSingleForm({...singleForm, message: e.target.value})}
                      rows={8}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
                    />
                    <button 
                      type="button"
                      className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Reset Template"
                    >
                      <RefreshCw size={14} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Variables like <code className="bg-slate-100 px-1 rounded text-slate-700">{'{{FirstName}}'}</code> and <code className="bg-slate-100 px-1 rounded text-slate-700">{'{{Link}}'}</code> are automatically populated.
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <Button type="button" variant="outline">Preview Email</Button>
                  <Button type="submit" leftIcon={<Send size={16} />}>Send Invitation</Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: BULK INVITE */}
          {activeTab === 'bulk' && (
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Option A: CSV Upload */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Option A: Upload CSV</h3>
                    <a href="#" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                      <Download size={12} /> Sample CSV
                    </a>
                  </div>
                  
                  <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                    }`}
                    onDragEnter={() => setDragActive(true)}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => { e.preventDefault(); setDragActive(false); showToast('File upload simulated', 'success'); }}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload size={24} />
                    </div>
                    <p className="text-sm font-medium text-slate-900 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500">CSV, XLS, or XLSX (max 5MB)</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Required Columns</h4>
                    <div className="flex gap-2 flex-wrap">
                      {['Email', 'Name', 'Department', 'Batch'].map(col => (
                        <span key={col} className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600 font-mono">
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Option B: Paste Emails */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900">Option B: Paste Email List</h3>
                  <div className="relative">
                    <textarea
                      value={bulkText}
                      onChange={(e) => setBulkText(e.target.value)}
                      rows={10}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
                      placeholder={`john@example.com\nsarah@example.com\nmike@example.com`}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                      {bulkText ? bulkText.split('\n').filter(l => l.trim()).length : 0} emails
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handleBulkSubmit}
                    disabled={!bulkText}
                    leftIcon={<Send size={16} />}
                  >
                    Send Invitations
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search by email or name..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Status</option>
                    <option>Sent</option>
                    <option>Opened</option>
                    <option>Registered</option>
                  </select>
                  <Button variant="outline" size="sm" leftIcon={<Download size={16} />}>Export</Button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-slate-600">Email / Name</th>
                        <th className="px-4 py-3 font-semibold text-slate-600">Department</th>
                        <th className="px-4 py-3 font-semibold text-slate-600">Batch</th>
                        <th className="px-4 py-3 font-semibold text-slate-600">Sent Date</th>
                        <th className="px-4 py-3 font-semibold text-slate-600">Status</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {history.map((invite) => (
                        <tr key={invite.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-4 py-3">
                            <div className="font-medium text-slate-900">{invite.email}</div>
                            <div className="text-xs text-slate-500">{invite.name}</div>
                          </td>
                          <td className="px-4 py-3 text-slate-600">{invite.department}</td>
                          <td className="px-4 py-3 text-slate-600">{invite.batch}</td>
                          <td className="px-4 py-3 text-slate-600">{invite.sentDate}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              invite.status === 'Registered' ? 'bg-green-100 text-green-800' :
                              invite.status === 'Opened' ? 'bg-blue-100 text-blue-800' :
                              invite.status === 'Expired' ? 'bg-red-100 text-red-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {invite.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                                title="Resend Invite"
                                onClick={() => showToast('Invitation resent', 'success')}
                              >
                                <RefreshCw size={16} />
                              </button>
                              <button 
                                className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                                title="Cancel Invite"
                                onClick={() => {
                                  setHistory(history.filter(h => h.id !== invite.id));
                                  showToast('Invitation cancelled', 'success');
                                }}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {history.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                            No invitations sent yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
