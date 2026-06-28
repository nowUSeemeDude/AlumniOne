import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Users, 
  Shield, 
  CheckCircle2, 
  XCircle,
  ChevronRight,
  ExternalLink,
  X,
  Upload,
  Check,
  Mail,
  UserPlus
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { ConfigureAcademicStructure } from './ConfigureAcademicStructure';
import { BatchDetailsView } from './BatchDetailsView';

interface Space {
  id: string;
  name: string;
  type: string;
  admin: string;
  alumniCount: number;
  status: 'active' | 'inactive';
  lastActivity: string;
  email?: string;
  adminEmail?: string;
  logo?: string;
}

const MOCK_SPACES: Space[] = [
  { id: '1', name: 'CSE Department', type: 'Department', admin: 'Dr. Rahim Ahmed', alumniCount: 845, status: 'active', lastActivity: '2 hours ago' },
  { id: '2', name: 'Business School', type: 'School', admin: 'Sarah Khan', alumniCount: 1240, status: 'active', lastActivity: '1 day ago' },
  { id: '3', name: 'EEE Department', type: 'Department', admin: 'Tanvir Hossain', alumniCount: 620, status: 'active', lastActivity: '3 hours ago' },
  { id: '4', name: 'Pharmacy Department', type: 'Department', admin: 'Nusrat Jahan', alumniCount: 450, status: 'inactive', lastActivity: '1 week ago' },
  { id: '5', name: 'Alumni Association', type: 'Association', admin: 'Maliha Islam', alumniCount: 3200, status: 'active', lastActivity: '10 mins ago' },
];

const SPACE_TYPES = [
  'Department',
  'School',
  'Faculty',
  'Alumni Association',
  'Chapter',
  'Other'
];

const MOCK_USERS = [
  { id: 'u1', name: 'Dr. Rahim Ahmed', email: 'rahim@univ.edu' },
  { id: 'u2', name: 'Sarah Khan', email: 'sarah@univ.edu' },
  { id: 'u3', name: 'Tanvir Hossain', email: 'tanvir@univ.edu' },
  { id: 'u4', name: 'Nusrat Jahan', email: 'nusrat@univ.edu' },
  { id: 'u5', name: 'Maliha Islam', email: 'maliha@univ.edu' },
  { id: 'u6', name: 'Zayed Khan', email: 'zayed@univ.edu' },
];

export const SpaceManagement: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>(MOCK_SPACES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [configuringSpace, setConfiguringSpace] = useState<Space | null>(null);
  const [viewingBatchDetailsSpace, setViewingBatchDetailsSpace] = useState<Space | null>(null);
  const [activeDropdownSpaceId, setActiveDropdownSpaceId] = useState<string | null>(null);
  
  // Custom Versatile Toast
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'info' }>({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ show: true, message, type });
  };

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    type: 'Department',
    adminName: '',
    adminEmail: '',
    email: '',
    logo: '',
    status: 'active' as 'active' | 'inactive'
  });

  const handleCreateSpace = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSpace: Space = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      type: formData.type,
      admin: formData.adminName || 'Unassigned',
      adminEmail: formData.adminEmail,
      alumniCount: 0,
      status: formData.status,
      lastActivity: 'Just now',
      email: formData.email,
      logo: formData.logo || undefined
    };

    setSpaces([newSpace, ...spaces]);
    setIsDrawerOpen(false);
    triggerToast(`Space "${formData.name}" created successfully! Invitation sent to ${formData.adminEmail}.`, 'success');
    
    // Reset form
    setFormData({
      name: '',
      type: 'Department',
      adminName: '',
      adminEmail: '',
      email: '',
      logo: '',
      status: 'active'
    });
  };

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         space.admin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || space.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  if (configuringSpace) {
    return (
      <ConfigureAcademicStructure
        space={configuringSpace}
        onBack={() => setConfiguringSpace(null)}
        triggerToast={(msg, type) => {
          setToast({ show: true, message: msg, type: type === 'error' ? 'info' : type });
        }}
      />
    );
  }

  if (viewingBatchDetailsSpace) {
    return (
      <BatchDetailsView
        space={viewingBatchDetailsSpace}
        onBack={() => setViewingBatchDetailsSpace(null)}
        triggerToast={(msg, type) => {
          setToast({ show: true, message: msg, type: type === 'error' ? 'info' : type });
        }}
      />
    );
  }

  return (
    <div className="space-y-6 relative">
      {/* Dynamic Versatile Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-[100] ${
              toast.type === 'success' ? 'bg-emerald-600' : 'bg-blue-600'
            } text-white px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10`}
          >
            <div className="bg-white/20 p-1.5 rounded-full flex-shrink-0">
              <Check size={16} />
            </div>
            <span className="font-semibold text-sm">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Spaces</h1>
          <p className="text-slate-500 text-sm mt-1">Create and manage departments, schools, and associations within the university.</p>
        </div>
        <Button 
          leftIcon={<Plus size={18} />}
          onClick={() => setIsDrawerOpen(true)}
        >
          Create New Space
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Spaces</p>
          <p className="text-2xl font-bold text-slate-900">12</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Spaces</p>
          <p className="text-2xl font-bold text-emerald-600">10</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Alumni</p>
          <p className="text-2xl font-bold text-blue-600">6,355</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Avg. Engagement</p>
          <p className="text-2xl font-bold text-indigo-600">68%</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search spaces by name or admin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-sm font-medium"
          >
            <option value="all">All Types</option>
            <option value="department">Department</option>
            <option value="school">School</option>
            <option value="association">Association</option>
          </select>
          <Button variant="outline" leftIcon={<Filter size={18} />}>More Filters</Button>
        </div>
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpaces.map((space) => {
          const isConfigured = localStorage.getItem(`alumnione_sessions_${space.id}`) !== null || ['1', '2', '3'].includes(space.id);
          return (
            <motion.div
              key={space.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-slate-50">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center overflow-hidden border border-blue-100 flex-shrink-0">
                    {space.logo ? (
                      <img src={space.logo} alt={space.name} className="w-full h-full object-cover" />
                    ) : (
                      <Building2 size={24} />
                    )}
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      space.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-100'
                    }`}>
                      {space.status}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdownSpaceId(activeDropdownSpaceId === space.id ? null : space.id);
                      }}
                      className="p-1 hover:bg-slate-50 rounded-lg text-slate-400"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {activeDropdownSpaceId === space.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdownSpaceId(null);
                          }}
                        />
                        <div className="absolute right-0 top-8 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 text-xs font-semibold text-slate-700">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfiguringSpace(space);
                              setActiveDropdownSpaceId(null);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Building2 size={14} className="text-slate-400" />
                            Configure Structure
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewingBatchDetailsSpace(space);
                              setActiveDropdownSpaceId(null);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Users size={14} className="text-slate-400" />
                            Quick View Batches
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const updated = spaces.map(s => s.id === space.id ? { ...s, status: s.status === 'active' ? 'inactive' as const : 'active' as const } : s);
                              setSpaces(updated);
                              triggerToast(`Space status for "${space.name}" updated successfully.`, 'success');
                              setActiveDropdownSpaceId(null);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <CheckCircle2 size={14} className="text-slate-400" />
                            Toggle Status
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const updated = spaces.filter(s => s.id !== space.id);
                              setSpaces(updated);
                              triggerToast(`Space "${space.name}" deleted successfully.`, 'info');
                              setActiveDropdownSpaceId(null);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-slate-50 text-red-600 border-t border-slate-100 flex items-center gap-2"
                          >
                            <Trash2 size={14} className="text-red-400" />
                            Delete Space
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{space.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{space.type}</p>
              </div>

              <div className="p-5 flex-1 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Shield size={16} />
                    <span>Admin</span>
                  </div>
                  <span className="font-medium text-slate-900">{space.admin}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Users size={16} />
                    <span>Alumni</span>
                  </div>
                  <span className="font-medium text-slate-900">
                    {(() => {
                      const savedBatches = localStorage.getItem(`alumnione_batches_${space.id}`);
                      if (savedBatches) {
                        try {
                          const parsed = JSON.parse(savedBatches);
                          if (Array.isArray(parsed) && parsed.length > 0) {
                            const total = parsed.reduce((sum: number, b: any) => sum + (parseInt(b.alumniCount) || 0), 0);
                            return total.toLocaleString();
                          }
                        } catch (e) {}
                      }
                      return '—';
                    })()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <CheckCircle2 size={16} />
                    <span>Last Activity</span>
                  </div>
                  <span className="font-medium text-slate-900">{space.lastActivity}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                {isConfigured ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-slate-700 border-slate-200 hover:bg-slate-100 font-semibold justify-center flex items-center gap-1.5"
                      onClick={() => setViewingBatchDetailsSpace(space)}
                    >
                      View Batch Details
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold justify-center flex items-center gap-1.5"
                      onClick={() => triggerToast(`Accessing Alumni Portal for "${space.name}"...`, 'success')}
                    >
                      Access Portal
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 font-semibold justify-center flex items-center gap-2"
                    onClick={() => setConfiguringSpace(space)}
                  >
                    Configure Space
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Create New Card */}
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all group"
        >
          <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
            <Plus size={32} />
          </div>
          <p className="font-bold">Create New Space</p>
          <p className="text-xs mt-1">Add a new department or school</p>
        </button>
      </div>

      {/* Create Space Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Create New Space</h2>
                  <p className="text-slate-500 text-sm mt-1">Add a new department, school, or alumni group.</p>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <form id="create-space-form" onSubmit={handleCreateSpace} className="space-y-6">
                  {/* Space Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      Space Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        required
                        type="text"
                        placeholder="e.g. CSE Department"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Space Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      Space Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all"
                    >
                      {SPACE_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Space Admin Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      Space Admin Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        required
                        type="text"
                        placeholder="e.g. Dr. Rahim Ahmed"
                        value={formData.adminName}
                        onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500">Keep in mind: space admin is not an alumni.</p>
                  </div>

                  {/* Space Admin Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      Space Admin Email (for invitation) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        required
                        type="email"
                        placeholder="e.g. admin@univ.edu"
                        value={formData.adminEmail}
                        onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Space Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      Space Email <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="email"
                        placeholder="e.g. cse.alumni@univ.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Logo Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Space Logo</label>
                    <input
                      type="file"
                      id="logo-upload-input"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, logo: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    {formData.logo ? (
                      <div className="relative border border-slate-200 rounded-xl p-4 flex items-center gap-4 bg-slate-50">
                        <img src={formData.logo} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-slate-200" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 truncate">Logo Uploaded</p>
                          <p className="text-[10px] text-slate-500">Image ready for the space card</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, logo: '' })}
                          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={() => document.getElementById('logo-upload-input')?.click()}
                        className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
                      >
                        <Upload className="mb-2 group-hover:text-blue-500 transition-colors" size={24} />
                        <p className="text-xs font-medium group-hover:text-blue-600 transition-colors">Click to upload space logo</p>
                        <p className="text-[10px] mt-1">PNG, JPG up to 2MB</p>
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Status</p>
                      <p className="text-xs text-slate-500">Enable or disable this space</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: formData.status === 'active' ? 'inactive' : 'active' })}
                      className={`w-12 h-6 rounded-full transition-all relative ${
                        formData.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                        formData.status === 'active' ? 'left-7' : 'left-1'
                      }`} />
                    </button>
                  </div>
                </form>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-slate-100 flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  form="create-space-form"
                  className="flex-1"
                >
                  Create Space
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
