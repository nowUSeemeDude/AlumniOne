import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Mail, 
  Eye, 
  Edit,
  Download,
  X,
  Briefcase,
  GraduationCap,
  MapPin,
  Phone,
  Calendar,
  Shield,
  Trash2,
  RefreshCw,
  FileText,
  AlertCircle,
  Cake
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';

interface AlumniManagementProps {
  onNavigate?: (tab: string) => void;
  userRole?: string;
}

interface Alumni {
  id: number;
  name: string;
  batch: string;
  department: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  company: string;
  location: string;
  avatar: string;
  imageUrl?: string;
  email: string;
  phone: string;
  role: string;
  dateOfBirth: string;
}

export const AlumniManagement: React.FC<AlumniManagementProps> = ({ onNavigate, userRole = 'SPACE_ADMIN' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<{id: number, type: 'status' | 'more'} | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const isUniversityAdmin = userRole === 'UNIVERSITY_ADMIN';

  // Mock Data - Filtered for CSE Space
  const [alumni, setAlumni] = useState<Alumni[]>([
    { id: 1, name: 'Sarah Khan', batch: 'CSE 2018', department: 'Computer Science', status: 'Verified', company: 'Google', location: 'Dhaka, BD', avatar: 'SK', imageUrl: 'https://picsum.photos/seed/sarah/100/100', email: 'sarah.k@example.com', phone: '+880 1711 000000', role: 'Alumni', dateOfBirth: '1995-02-25' },
    { id: 4, name: 'Karim Uddin', batch: 'CSE 2017', department: 'Computer Science', status: 'Rejected', company: 'Freelancer', location: 'Sylhet, BD', avatar: 'KU', imageUrl: 'https://picsum.photos/seed/karim/100/100', email: 'karim.u@example.com', phone: '+880 1911 000000', role: 'Alumni', dateOfBirth: '1994-05-12' },
    { id: 6, name: 'Tanvir Ahmed', batch: 'CSE 2020', department: 'Computer Science', status: 'Verified', company: 'Pathao', location: 'Dhaka, BD', avatar: 'TA', imageUrl: 'https://picsum.photos/seed/tanvir/100/100', email: 'tanvir.a@example.com', phone: '+880 1511 000000', role: 'Alumni', dateOfBirth: '1997-08-20' },
  ]);

  const today = new Date();
  const todayMonthDay = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const birthdayAlumni = alumni.filter(a => a.dateOfBirth.endsWith(todayMonthDay));

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatusChange = (id: number, newStatus: 'Verified' | 'Pending' | 'Rejected') => {
    setAlumni(alumni.map(a => a.id === id ? { ...a, status: newStatus } : a));
    setActiveDropdown(null);
    showToast(`Status updated to ${newStatus}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this alumni?')) {
      setAlumni(alumni.filter(a => a.id !== id));
      setActiveDropdown(null);
      showToast('Alumni deleted successfully');
    }
  };

  const handleViewProfile = (alum: Alumni) => {
    setSelectedAlumni(alum);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6 relative min-h-[600px]">
      {/* Quick View Drawer */}
      <AnimatePresence>
        {isDrawerOpen && selectedAlumni && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] overflow-y-auto"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-slate-900">Alumni Details</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex flex-col items-center text-center mb-8">
                  {selectedAlumni.imageUrl ? (
                    <img src={selectedAlumni.imageUrl} alt={selectedAlumni.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-4" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-2xl shadow-lg mb-4">
                      {selectedAlumni.avatar}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-slate-900">{selectedAlumni.name}</h3>
                  <p className="text-slate-500 font-medium">{selectedAlumni.role}</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Personal Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Cake size={16} className="text-slate-400" />
                        Born: {selectedAlumni.dateOfBirth}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Mail size={16} className="text-slate-400" />
                        {selectedAlumni.email}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Phone size={16} className="text-slate-400" />
                        {selectedAlumni.phone}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <MapPin size={16} className="text-slate-400" />
                        {selectedAlumni.location}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Academic Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <GraduationCap size={16} className="text-slate-400" />
                        {selectedAlumni.batch} • {selectedAlumni.department}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Career Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Briefcase size={16} className="text-slate-400" />
                        {selectedAlumni.company}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex flex-col gap-3">
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        onNavigate?.('alumni-profile');
                        setIsDrawerOpen(false);
                      }}
                    >
                      View Full Profile
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setIsDrawerOpen(false)}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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

      {/* Birthday Section */}
      {birthdayAlumni.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
              <Cake size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Birthday Today!</h3>
              <p className="text-sm text-slate-500">Celebrate with our alumni members</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {birthdayAlumni.map(alum => (
              <div key={alum.id} className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-pink-100 flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">
                  {alum.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{alum.name}</p>
                  <p className="text-xs text-slate-500">{alum.batch}</p>
                </div>
                <Button size="sm" variant="ghost" className="text-pink-600 hover:bg-pink-50 ml-2">Wish Happy Birthday</Button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Alumni Directory</h1>
            <span className={`text-xs font-bold px-2 py-1 rounded-full border ${
              isUniversityAdmin ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-blue-50 text-blue-700 border-blue-100'
            }`}>
              {isUniversityAdmin ? 'University: All Spaces' : 'Space: CSE Department'}
            </span>
          </div>
          <p className="text-slate-500">
            {isUniversityAdmin ? 'Manage alumni across all university departments and schools.' : 'Manage alumni within your department.'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" leftIcon={<Download size={16} />}>Export CSV</Button>
          <Button size="sm" leftIcon={<Mail size={16} />} onClick={() => onNavigate?.('invite-alumni')}>Invite Alumni</Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, batch, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
            <option>All Batches</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
          </select>
          <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
            <option>All Departments</option>
            <option>CSE</option>
            <option>EEE</option>
            <option>BBA</option>
          </select>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-visible">
        <div className="overflow-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Mobile</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Batch / Dept</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {alumni.map((alum) => (
                <tr key={alum.id} className="hover:bg-slate-50 transition-colors group relative">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {alum.imageUrl ? (
                        <img 
                          src={alum.imageUrl} 
                          alt={alum.name} 
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                          {alum.avatar}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-slate-900">{alum.name}</p>
                        <p className="text-xs text-slate-500">{alum.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600 font-medium">{alum.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-900">{alum.batch}</p>
                    <p className="text-xs text-slate-500">{alum.department}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      alum.status === 'Verified' ? 'bg-green-100 text-green-800' :
                      alum.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {alum.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <div className="flex items-center justify-end gap-2 opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleViewProfile(alum)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="View Profile"
                      >
                        <Eye size={18} />
                      </button>
                      
                      {/* Status Dropdown Trigger */}
                      <div className="relative">
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown?.id === alum.id && activeDropdown.type === 'status' ? null : {id: alum.id, type: 'status'})}
                          className="p-1.5 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                          title="Update Status"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        {activeDropdown?.id === alum.id && activeDropdown.type === 'status' && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-50 text-left overflow-hidden">
                            <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500">
                              CHANGE STATUS
                            </div>
                            {alum.status !== 'Verified' && (
                              <button onClick={() => handleStatusChange(alum.id, 'Verified')} className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700 flex items-center gap-2">
                                <CheckCircle2 size={16} /> Approve
                              </button>
                            )}
                            {alum.status !== 'Pending' && (
                              <button onClick={() => handleStatusChange(alum.id, 'Pending')} className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-700 flex items-center gap-2">
                                <Clock size={16} /> Mark Pending
                              </button>
                            )}
                            {alum.status !== 'Rejected' && (
                              <button onClick={() => handleStatusChange(alum.id, 'Rejected')} className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-700 flex items-center gap-2">
                                <XCircle size={16} /> Reject
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* More Actions Dropdown Trigger */}
                      <div className="relative">
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown?.id === alum.id && activeDropdown.type === 'more' ? null : {id: alum.id, type: 'more'})}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <MoreVertical size={18} />
                        </button>
                        {activeDropdown?.id === alum.id && activeDropdown.type === 'more' && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-50 text-left overflow-hidden">
                            <button onClick={() => { showToast('Edit mode enabled'); setActiveDropdown(null); }} className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                              <Edit size={16} /> Edit Profile
                            </button>
                            <button onClick={() => { showToast('Email sent'); setActiveDropdown(null); }} className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                              <Mail size={16} /> Send Email
                            </button>
                            <button onClick={() => { showToast('Password reset link sent'); setActiveDropdown(null); }} className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                              <RefreshCw size={16} /> Reset Password
                            </button>
                            <div className="border-t border-slate-100 my-1"></div>
                            <button onClick={() => handleDelete(alum.id)} className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                              <Trash2 size={16} /> Delete Alumni
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing 1-3 of 845 alumni (CSE Space)</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 text-sm border border-slate-200 rounded hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for dropdown items
const Clock = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
