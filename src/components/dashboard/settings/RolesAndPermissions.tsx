import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Lock, 
  Plus, 
  Copy, 
  Trash2, 
  Check, 
  X, 
  ChevronRight, 
  AlertTriangle, 
  Eye, 
  Clock, 
  Search, 
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data
const INITIAL_ROLES = [
  { id: 'role-1', name: 'Founder Admin', level: 1, users: 2, description: 'Full system access. Cannot be deleted.', isSystem: true },
  { id: 'role-2', name: 'Finance Officer', level: 2, users: 3, description: 'Access to finance and reports.', isSystem: false },
  { id: 'role-3', name: 'Event Manager', level: 3, users: 5, description: 'Can create and manage events.', isSystem: false },
  { id: 'role-4', name: 'Moderator', level: 3, users: 8, description: 'Can approve jobs and alumni.', isSystem: false },
];

const PERMISSIONS_SCHEMA = [
  {
    group: 'Dashboard',
    permissions: [
      { id: 'dash_view', label: 'View Dashboard' },
      { id: 'dash_export', label: 'Export Analytics' },
    ]
  },
  {
    group: 'Alumni Directory',
    permissions: [
      { id: 'alumni_view', label: 'View Alumni List' },
      { id: 'alumni_approve', label: 'Approve / Reject Alumni', dependency: 'alumni_view' },
      { id: 'alumni_edit', label: 'Edit Alumni Profiles', dependency: 'alumni_view' },
      { id: 'alumni_delete', label: 'Delete Alumni', dependency: 'alumni_view' },
    ]
  },
  {
    group: 'Events',
    permissions: [
      { id: 'event_view', label: 'View Events' },
      { id: 'event_create', label: 'Create / Edit Events', dependency: 'event_view' },
      { id: 'event_publish', label: 'Publish Events', dependency: 'event_create' },
      { id: 'event_delete', label: 'Delete Events', dependency: 'event_view' },
    ]
  },
  {
    group: 'Jobs',
    permissions: [
      { id: 'job_view', label: 'View Jobs' },
      { id: 'job_approve', label: 'Approve Jobs', dependency: 'job_view' },
      { id: 'job_post', label: 'Post Jobs', dependency: 'job_view' },
    ]
  },
  {
    group: 'Finance',
    permissions: [
      { id: 'finance_view', label: 'View Financial Data' },
      { id: 'finance_manage', label: 'Manage Transactions', dependency: 'finance_view' },
      { id: 'finance_report', label: 'Generate Reports', dependency: 'finance_view' },
    ]
  },
];

const MOCK_USERS = [
  { id: 1, name: 'John Doe', email: 'john@university.edu', dept: 'Admin', status: 'Active' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@university.edu', dept: 'Finance', status: 'Active' },
  { id: 3, name: 'Mike Ross', email: 'mike@university.edu', dept: 'Alumni Relations', status: 'Active' },
];

const AUDIT_LOGS = [
  { id: 1, user: 'John Doe', action: 'Updated "Event Manager" permissions', date: 'Oct 24, 10:30 AM' },
  { id: 2, user: 'John Doe', action: 'Created role "Moderator"', date: 'Oct 23, 2:15 PM' },
  { id: 3, user: 'Sarah Smith', action: 'Assigned "Finance Officer" to Mike Ross', date: 'Oct 22, 9:45 AM' },
];

interface RolesAndPermissionsProps {
  onPreviewRole?: (roleName: string) => void;
}

export const RolesAndPermissions: React.FC<RolesAndPermissionsProps> = ({ onPreviewRole }) => {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [selectedRole, setSelectedRole] = useState(INITIAL_ROLES[0]);
  const [activeTab, setActiveTab] = useState<'permissions' | 'users' | 'audit'>('permissions');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Create Role Form State
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [newRoleTemplate, setNewRoleTemplate] = useState('blank');

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateRole = () => {
    if (!newRoleName) return;
    const newRole = {
      id: `role-${Date.now()}`,
      name: newRoleName,
      level: 3,
      users: 0,
      description: newRoleDesc || 'Custom role',
      isSystem: false
    };
    setRoles([...roles, newRole]);
    setIsCreateModalOpen(false);
    setNewRoleName('');
    setNewRoleDesc('');
    showToast(`Role "${newRoleName}" created successfully`);
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.isSystem) {
      showToast('Cannot delete system roles', 'error');
      return;
    }
    if (window.confirm(`Are you sure you want to delete "${role?.name}"? This may affect system access.`)) {
      setRoles(roles.filter(r => r.id !== roleId));
      if (selectedRole.id === roleId) setSelectedRole(roles[0]);
      showToast('Role deleted successfully');
    }
  };

  const handleDuplicateRole = (role: typeof roles[0]) => {
    const newRole = {
      ...role,
      id: `role-${Date.now()}`,
      name: `Copy of ${role.name}`,
      isSystem: false,
      users: 0
    };
    setRoles([...roles, newRole]);
    showToast('Role duplicated successfully');
  };

  const handlePreviewToggle = () => {
    if (previewMode) {
      setPreviewMode(false);
      onPreviewRole?.(''); // Clear preview
      showToast('Exited preview mode');
    } else {
      setPreviewMode(true);
      onPreviewRole?.(selectedRole.name);
      showToast(`Previewing as ${selectedRole.name}`);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-200px)] min-h-[600px] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
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

      {/* Left Sidebar: Role List */}
      <div className="w-full lg:w-80 border-r border-slate-200 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-900">Roles</h3>
            <Button size="sm" onClick={() => setIsCreateModalOpen(true)} leftIcon={<Plus size={16} />}>Add Role</Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search roles..." 
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => { setSelectedRole(role); setPreviewMode(false); }}
              className={`w-full text-left p-3 rounded-lg flex items-start justify-between group transition-colors ${
                selectedRole.id === role.id ? 'bg-white shadow-sm border border-slate-200' : 'hover:bg-slate-100 border border-transparent'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${selectedRole.id === role.id ? 'text-blue-700' : 'text-slate-700'}`}>{role.name}</span>
                  {role.isSystem && <Lock size={12} className="text-slate-400" />}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{role.users} users assigned</p>
              </div>
              {selectedRole.id === role.id && !role.isSystem && (
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div onClick={(e) => { e.stopPropagation(); handleDuplicateRole(role); }} className="p-1.5 hover:bg-slate-100 rounded text-slate-500" title="Duplicate">
                    <Copy size={14} />
                  </div>
                  <div onClick={(e) => { e.stopPropagation(); handleDeleteRole(role.id); }} className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded text-slate-500" title="Delete">
                    <Trash2 size={14} />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel: Role Details */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Role Header */}
        <div className="p-6 border-b border-slate-200 flex justify-between items-start bg-white">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold text-slate-900">{selectedRole.name}</h2>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full border border-slate-200">
                Level {selectedRole.level}
              </span>
            </div>
            <p className="text-slate-500 text-sm">{selectedRole.description}</p>
            {selectedRole.level < 3 && (
              <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                <Shield size={12} /> Inherits permissions from lower levels
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <Button 
              variant={previewMode ? 'primary' : 'outline'} 
              onClick={handlePreviewToggle}
              leftIcon={previewMode ? <Check size={16} /> : <Eye size={16} />}
            >
              {previewMode ? 'Exit Preview' : 'Preview Role'}
            </Button>
            <Button leftIcon={<Check size={16} />}>Save Changes</Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-slate-200 flex gap-6">
          <button 
            onClick={() => setActiveTab('permissions')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'permissions' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Permissions
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Assigned Users
          </button>
          <button 
            onClick={() => setActiveTab('audit')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'audit' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Activity Log
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {activeTab === 'permissions' && (
            <div className="space-y-8 max-w-4xl">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm text-blue-900 font-medium">Permission Dependency Logic Active</p>
                  <p className="text-xs text-blue-700 mt-1">Enabling advanced permissions (e.g., "Approve") will automatically enable required base permissions (e.g., "View").</p>
                </div>
              </div>

              {PERMISSIONS_SCHEMA.map((group) => (
                <div key={group.group} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                    {group.group}
                  </div>
                  <div className="divide-y divide-slate-100">
                    {group.permissions.map((perm) => (
                      <div key={perm.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{perm.label}</p>
                          {perm.dependency && (
                            <p className="text-xs text-slate-400 mt-0.5">Requires '{group.permissions.find(p => p.id === perm.dependency)?.label}'</p>
                          )}
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={selectedRole.level <= 2} />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="Search users..." className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <Button size="sm" leftIcon={<Plus size={16} />}>Assign User</Button>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-slate-600">Name</th>
                    <th className="px-6 py-3 font-semibold text-slate-600">Department</th>
                    <th className="px-6 py-3 font-semibold text-slate-600">Status</th>
                    <th className="px-6 py-3 font-semibold text-slate-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_USERS.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{user.dept}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">{user.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-red-600 hover:text-red-800 text-xs font-medium">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-4">
              {AUDIT_LOGS.map((log) => (
                <div key={log.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="p-2 bg-slate-100 rounded-full text-slate-500">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{log.action}</p>
                    <p className="text-xs text-slate-500 mt-1">by <span className="font-medium text-slate-700">{log.user}</span> • {log.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Role Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
              >
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-900">Create New Role</h2>
                  <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Role Name</label>
                    <input 
                      type="text" 
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      placeholder="e.g. Content Editor" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea 
                      rows={2}
                      value={newRoleDesc}
                      onChange={(e) => setNewRoleDesc(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none" 
                      placeholder="Brief description..." 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Base Template</label>
                    <select 
                      value={newRoleTemplate}
                      onChange={(e) => setNewRoleTemplate(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="blank">Blank Role</option>
                      <option value="admin">Clone from Admin</option>
                      <option value="moderator">Clone from Moderator</option>
                    </select>
                  </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateRole}>Create Role</Button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
