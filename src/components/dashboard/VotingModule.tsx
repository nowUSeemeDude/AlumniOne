import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  BarChart3, 
  ShieldCheck, 
  Calendar, 
  ArrowRight, 
  ChevronRight, 
  UserPlus, 
  Image as ImageIcon, 
  FileText, 
  History,
  AlertCircle,
  X,
  Vote,
  Trophy,
  PieChart as PieChartIcon
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

// Mock Data
const INITIAL_VOTES = [
  { 
    id: 1, 
    title: 'Alumni Association President Election 2024', 
    type: 'Election', 
    target: 'All Alumni', 
    status: 'Active', 
    startDate: '2024-02-20 09:00', 
    endDate: '2024-02-28 18:00', 
    totalVotes: 1245,
    description: 'Vote for the next president of the Alumni Association. Your voice matters in shaping our future.',
    candidates: [
      { id: 101, name: 'Dr. Ariful Islam', batch: '1995', dept: 'CSE', bio: 'Senior Software Architect with 25 years of experience.', manifesto: 'I aim to bridge the gap between industry and academia.', votes: 540 },
      { id: 102, name: 'Nusrat Jahan', batch: '2002', dept: 'BBA', bio: 'Entrepreneur and community leader.', manifesto: 'Focusing on alumni networking and mentorship programs.', votes: 705 }
    ]
  },
  { 
    id: 2, 
    title: 'New Campus Facility Poll', 
    type: 'Poll', 
    target: 'Verified Alumni', 
    status: 'Scheduled', 
    startDate: '2024-03-01 10:00', 
    endDate: '2024-03-05 17:00', 
    totalVotes: 0,
    description: 'Which facility should be prioritized for the new alumni wing?',
    options: [
      { id: 201, label: 'Co-working Space', votes: 0 },
      { id: 202, label: 'Innovation Lab', votes: 0 },
      { id: 203, label: 'Networking Lounge', votes: 0 }
    ]
  },
  { 
    id: 3, 
    title: 'Annual Gala Theme 2023', 
    type: 'Poll', 
    target: 'All Alumni', 
    status: 'Closed', 
    startDate: '2023-11-10 09:00', 
    endDate: '2023-11-15 18:00', 
    totalVotes: 850,
    description: 'Select the theme for our upcoming Annual Gala.',
    options: [
      { id: 301, label: 'Retro 80s', votes: 450 },
      { id: 302, label: 'Futuristic', votes: 400 }
    ]
  },
  { 
    id: 4, 
    title: 'Department Representative - EEE', 
    type: 'Election', 
    target: 'EEE Alumni', 
    status: 'Draft', 
    startDate: '-', 
    endDate: '-', 
    totalVotes: 0,
    description: 'Election for the EEE department representative.',
    candidates: []
  }
];

const AUDIT_LOGS = [
  { id: 1, action: 'Vote Cast', user: 'Alumnus #4521', timestamp: '2024-02-21 14:22:10', ip: '192.168.1.45', status: 'Verified' },
  { id: 2, action: 'Vote Cast', user: 'Alumnus #8821', timestamp: '2024-02-21 14:20:05', ip: '103.45.22.11', status: 'Verified' },
  { id: 3, action: 'Election Created', user: 'Admin (John Doe)', timestamp: '2024-02-19 11:30:00', ip: '192.168.1.2', status: 'System' },
];

export const VotingModule: React.FC = () => {
  const [activeView, setActiveView] = useState<'all' | 'create' | 'results' | 'audit' | 'vote_view'>('all');
  const [activeTab, setActiveTab] = useState<'Draft' | 'Scheduled' | 'Active' | 'Closed'>('Active');
  const [votes, setVotes] = useState(INITIAL_VOTES);
  const [selectedVote, setSelectedVote] = useState<any>(null);
  const [createStep, setCreateStep] = useState(1);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateVote = () => {
    showToast('Vote created and published successfully!');
    setActiveView('all');
    setCreateStep(1);
  };

  const handleCastVote = () => {
    setHasVoted(true);
    showToast('Your vote has been recorded securely.');
  };

  const filteredVotes = votes.filter(v => v.status === activeTab);

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
            <h1 className="text-2xl font-bold text-slate-900">Online Voting</h1>
            <p className="text-slate-500 text-sm">Manage elections and polls for alumni engagement.</p>
          </div>
          <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
            Prototype Mode – Voting Data Simulated
          </div>
        </div>
        
        {/* Sub-navigation */}
        <div className="px-6 flex gap-6 overflow-x-auto hide-scrollbar">
          {[
            { id: 'all', label: 'All Votes', icon: <Vote size={18} /> },
            { id: 'create', label: 'Create Vote', icon: <Plus size={18} /> },
            { id: 'results', label: 'Results', icon: <BarChart3 size={18} /> },
            { id: 'audit', label: 'Audit Log', icon: <History size={18} /> },
          ].map((view) => (
            <button 
              key={view.id}
              onClick={() => {
                setActiveView(view.id as any);
                if (view.id === 'all') setSelectedVote(null);
              }}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeView === view.id || (activeView === 'vote_view' && view.id === 'all')
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {view.icon}
              {view.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 max-w-7xl mx-auto">
        
        {/* ALL VOTES VIEW */}
        {activeView === 'all' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
                {['Draft', 'Scheduled', 'Active', 'Closed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search votes..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Vote Title</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Type</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Audience</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Timeline</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Votes</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredVotes.map((vote) => (
                    <tr key={vote.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{vote.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[200px]">{vote.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          vote.type === 'Election' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {vote.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{vote.target}</td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-slate-600">
                          <p className="flex items-center gap-1"><Clock size={12} /> {vote.startDate}</p>
                          <p className="flex items-center gap-1 mt-1 text-slate-400"><ArrowRight size={12} /> {vote.endDate}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Users size={14} className="text-slate-400" />
                          <span className="text-sm font-bold text-slate-900">{vote.totalVotes.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              setSelectedVote(vote);
                              setActiveView('vote_view');
                              setHasVoted(false);
                            }}
                          >
                            View
                          </Button>
                          {vote.status === 'Active' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedVote(vote);
                                setActiveView('results');
                              }}
                            >
                              Results
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredVotes.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                        <Vote size={48} className="mx-auto text-slate-200 mb-4" />
                        <p>No {activeTab.toLowerCase()} votes found.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* CREATE VOTE VIEW */}
        {activeView === 'create' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Stepper */}
              <div className="bg-slate-50 border-b border-slate-200 px-8 py-4 flex justify-between">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      createStep >= step ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {step}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${createStep >= step ? 'text-blue-600' : 'text-slate-400'}`}>
                      {step === 1 ? 'Basic Info' : step === 2 ? 'Eligibility' : step === 3 ? 'Settings' : 'Timeline'}
                    </span>
                    {step < 4 && <div className={`h-px w-8 sm:w-16 ${createStep > step ? 'bg-blue-600' : 'bg-slate-200'}`} />}
                  </div>
                ))}
              </div>

              <div className="p-8">
                {createStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900">Basic Information</h2>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Vote Title</label>
                      <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g. Alumni Association Election" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                      <textarea rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Provide details about the vote..." />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                        <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
                          <option>Election</option>
                          <option>Poll</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                        <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
                          <option>Governance</option>
                          <option>Engagement</option>
                          <option>Academic</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {createStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900">Eligibility & Audience</h2>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
                      <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
                        <option>All Alumni</option>
                        <option>Verified Alumni Only</option>
                        <option>CSE Department Only</option>
                        <option>EEE Department Only</option>
                        <option>BBA Department Only</option>
                      </select>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-3">
                      <ShieldCheck className="text-blue-600 mt-0.5" size={20} />
                      <div>
                        <p className="text-sm font-bold text-blue-900">Verification Required</p>
                        <p className="text-xs text-blue-700">Enabling this will only allow alumni with verified profiles to cast their votes.</p>
                      </div>
                      <div className="ml-auto">
                        <input type="checkbox" className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      </div>
                    </div>
                  </div>
                )}

                {createStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900">Voting Settings</h2>
                    <div className="space-y-4">
                      {[
                        { label: 'Anonymous Voting', desc: 'Hide voter identities from results and logs.' },
                        { label: 'Show Live Results', desc: 'Allow voters to see current standings before voting ends.' },
                        { label: 'Allow Vote Change', desc: 'Allow voters to modify their choice before the deadline.' },
                      ].map((setting, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                          <div>
                            <p className="text-sm font-bold text-slate-900">{setting.label}</p>
                            <p className="text-xs text-slate-500">{setting.desc}</p>
                          </div>
                          <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {createStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900">Time Settings & Candidates</h2>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Start Date & Time</label>
                        <input type="datetime-local" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">End Date & Time</label>
                        <input type="datetime-local" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-900">Candidates / Options</h3>
                        <Button size="sm" variant="outline" leftIcon={<UserPlus size={16} />}>Add Candidate</Button>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center">
                        <p className="text-sm text-slate-500">No candidates added yet. Elections require at least 2 candidates.</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-8 flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => createStep > 1 ? setCreateStep(createStep - 1) : setActiveView('all')}
                  >
                    {createStep === 1 ? 'Cancel' : 'Previous'}
                  </Button>
                  <Button 
                    onClick={() => createStep < 4 ? setCreateStep(createStep + 1) : handleCreateVote()}
                  >
                    {createStep === 4 ? 'Publish Vote' : 'Next Step'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ALUMNI VOTING VIEW */}
        {activeView === 'vote_view' && selectedVote && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="bg-blue-600 p-8 text-white relative">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded text-xs font-bold uppercase tracking-wider">
                    {selectedVote.type}
                  </span>
                  <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-md">
                    <Clock size={16} />
                    <span className="text-sm font-bold">Ends in 04d 12h 30m</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-4">{selectedVote.title}</h1>
                <p className="text-blue-100 leading-relaxed max-w-2xl">{selectedVote.description}</p>
              </div>

              <div className="p-8">
                {hasVoted ? (
                  <div className="py-12 text-center">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Thank you for voting!</h2>
                    <p className="text-slate-500 mb-8">Your vote has been securely recorded and verified.</p>
                    <Button variant="outline" onClick={() => setActiveView('all')}>Back to All Votes</Button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-slate-900 mb-6">
                      {selectedVote.type === 'Election' ? 'Select your Candidate' : 'Choose an Option'}
                    </h3>
                    
                    {selectedVote.type === 'Election' ? (
                      <div className="grid md:grid-cols-2 gap-6">
                        {selectedVote.candidates.map((candidate: any) => (
                          <div key={candidate.id} className="border border-slate-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group relative">
                            <div className="flex gap-4">
                              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                                <ImageIcon size={24} />
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900">{candidate.name}</h4>
                                <p className="text-xs text-slate-500">Batch {candidate.batch} • {candidate.dept}</p>
                              </div>
                            </div>
                            <p className="mt-4 text-sm text-slate-600 line-clamp-2 italic">"{candidate.manifesto}"</p>
                            <div className="mt-6 flex justify-between items-center">
                              <Button variant="outline" size="sm">View Profile</Button>
                              <Button size="sm" onClick={handleCastVote}>Vote for {candidate.name.split(' ')[0]}</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedVote.options.map((option: any) => (
                          <div 
                            key={option.id} 
                            onClick={handleCastVote}
                            className="p-4 border border-slate-200 rounded-xl flex items-center justify-between hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group"
                          >
                            <span className="font-medium text-slate-900">{option.label}</span>
                            <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-blue-500 flex items-center justify-center">
                              <div className="w-3 h-3 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* RESULTS VIEW */}
        {activeView === 'results' && selectedVote && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Election Results</h2>
              <Button variant="outline" onClick={() => setActiveView('all')}>Back</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users size={20} /></div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Votes</p>
                </div>
                <p className="text-3xl font-bold text-slate-900">{selectedVote.totalVotes.toLocaleString()}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Trophy size={20} /></div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Participation Rate</p>
                </div>
                <p className="text-3xl font-bold text-slate-900">68.5%</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><ShieldCheck size={20} /></div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Status</p>
                </div>
                <p className="text-3xl font-bold text-slate-900">{selectedVote.status}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-8">Vote Distribution</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={selectedVote.type === 'Election' ? selectedVote.candidates : selectedVote.options}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey={selectedVote.type === 'Election' ? 'votes' : 'votes'}
                        nameKey={selectedVote.type === 'Election' ? 'name' : 'label'}
                      >
                        {(selectedVote.type === 'Election' ? selectedVote.candidates : selectedVote.options).map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'][index % 4]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-8">Detailed Standings</h3>
                <div className="space-y-6">
                  {(selectedVote.type === 'Election' ? selectedVote.candidates : selectedVote.options).map((item: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-900">{item.name || item.label}</span>
                        <span className="text-sm font-medium text-slate-500">{item.votes} votes ({Math.round((item.votes / selectedVote.totalVotes) * 100)}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${(item.votes / selectedVote.totalVotes) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-blue-600 rounded-full" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* AUDIT LOG VIEW */}
        {activeView === 'audit' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Voting Audit Log</h2>
              <Button variant="outline" size="sm" leftIcon={<FileText size={16} />}>Export Log</Button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Action</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">User</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Timestamp</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">IP Address</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {AUDIT_LOGS.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{log.action}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{log.user}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{log.timestamp}</td>
                      <td className="px-6 py-4 text-sm font-mono text-slate-400">{log.ip}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          log.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 flex items-start gap-3">
              <AlertCircle className="text-amber-600 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-bold text-amber-900">Security Notice</p>
                <p className="text-xs text-amber-700">All votes are cryptographically hashed and stored in a tamper-proof ledger. Identities are anonymized where requested.</p>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};
