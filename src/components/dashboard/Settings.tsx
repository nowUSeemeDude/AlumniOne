import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Plus, Edit2, Trash2, ToggleRight, ToggleLeft, Save } from 'lucide-react';
import { RolesAndPermissions } from './settings/RolesAndPermissions';
import { BrandingSettings } from './settings/BrandingSettings';
import { PrivacySettings } from './settings/PrivacySettings';
import { EmailSettings } from './settings/EmailSettings';
import { AdminInfo } from './settings/AdminInfo';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Space Profile' },
    { id: 'branding', label: 'Branding & Theme' },
    { id: 'roles', label: 'Roles & Permissions' },
    { id: 'admin', label: 'Admin Info' },
    { id: 'privacy', label: 'Privacy Controls' },
    { id: 'email', label: 'Email Configuration' },
  ];

  // Mock Data for Academic Structure
  const [faculties, setFaculties] = useState([
    { id: 1, name: 'School of Engineering', status: true },
    { id: 2, name: 'School of Business', status: true },
    { id: 3, name: 'School of Humanities', status: true },
  ]);

  const [departments, setDepartments] = useState([
    { id: 1, name: 'Computer Science & Engineering', faculty: 'School of Engineering', status: true },
    { id: 2, name: 'Electrical Engineering', faculty: 'School of Engineering', status: true },
    { id: 3, name: 'Marketing', faculty: 'School of Business', status: true },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900">Space Settings</h1>
          <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
            Space: CSE Department
          </span>
        </div>
        <p className="text-slate-500">Manage your department preferences and configurations.</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === 'profile' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Space Details</h3>
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Space Name</label>
                    <input 
                      type="text" 
                      defaultValue="CSE Department" 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Parent Institution</label>
                      <input 
                        type="text" 
                        defaultValue="BRAC University" 
                        disabled
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Space Type</label>
                      <select disabled className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed outline-none">
                        <option>Department</option>
                        <option>School</option>
                        <option>Club</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Space Description</label>
                    <textarea 
                      rows={4}
                      defaultValue="Computer Science & Engineering Department at BRAC University." 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Space Contact</h3>
                <div className="grid gap-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Space Admin Email</label>
                      <input 
                        type="email" 
                        defaultValue="cse-admin@bracu.ac.bd" 
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Office Phone</label>
                      <input 
                        type="tel" 
                        defaultValue="+880 2 2222 0000" 
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button size="lg" leftIcon={<Save size={18} />}>Save Changes</Button>
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="space-y-8">
              {/* Faculties Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Faculties / Schools</h3>
                    <p className="text-sm text-slate-500">Manage the top-level academic divisions.</p>
                  </div>
                  <Button size="sm" leftIcon={<Plus size={16} />}>Add Faculty</Button>
                </div>
                <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-slate-600">Name</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-center">Status</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {faculties.map((faculty) => (
                        <tr key={faculty.id} className="bg-white">
                          <td className="px-4 py-3 font-medium text-slate-900">{faculty.name}</td>
                          <td className="px-4 py-3 text-center">
                            <button className={`text-${faculty.status ? 'green' : 'slate'}-600`}>
                              {faculty.status ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <button className="p-1 text-slate-500 hover:text-blue-600 transition-colors">
                                <Edit2 size={16} />
                              </button>
                              <button className="p-1 text-slate-500 hover:text-red-600 transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Departments Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Departments</h3>
                    <p className="text-sm text-slate-500">Manage academic departments under faculties.</p>
                  </div>
                  <Button size="sm" leftIcon={<Plus size={16} />}>Add Department</Button>
                </div>
                <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-slate-600">Name</th>
                        <th className="px-4 py-3 font-semibold text-slate-600">Faculty</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-center">Status</th>
                        <th className="px-4 py-3 font-semibold text-slate-600 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {departments.map((dept) => (
                        <tr key={dept.id} className="bg-white">
                          <td className="px-4 py-3 font-medium text-slate-900">{dept.name}</td>
                          <td className="px-4 py-3 text-slate-600">{dept.faculty}</td>
                          <td className="px-4 py-3 text-center">
                            <button className={`text-${dept.status ? 'green' : 'slate'}-600`}>
                              {dept.status ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <button className="p-1 text-slate-500 hover:text-blue-600 transition-colors">
                                <Edit2 size={16} />
                              </button>
                              <button className="p-1 text-slate-500 hover:text-red-600 transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Programs & Batches Placeholder */}
              <div className="grid sm:grid-cols-2 gap-6">
                 <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-center">
                    <h4 className="font-bold text-slate-900 mb-2">Programs</h4>
                    <p className="text-sm text-slate-500 mb-4">Manage degree programs (B.Sc, BBA, MBA)</p>
                    <Button variant="outline" size="sm">Manage Programs</Button>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-center">
                    <h4 className="font-bold text-slate-900 mb-2">Batches / Sessions</h4>
                    <p className="text-sm text-slate-500 mb-4">Manage graduation years and sessions</p>
                    <Button variant="outline" size="sm">Manage Batches</Button>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'branding' && (
            <BrandingSettings />
          )}
          
          {activeTab === 'roles' && (
            <RolesAndPermissions />
          )}

          {activeTab === 'admin' && (
            <AdminInfo />
          )}

          {activeTab === 'privacy' && (
            <PrivacySettings />
          )}

          {activeTab === 'email' && (
            <EmailSettings />
          )}
        </div>
      </div>
    </div>
  );
};
