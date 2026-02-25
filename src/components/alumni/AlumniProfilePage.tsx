import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Activity, 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  GraduationCap, 
  Briefcase, 
  Award,
  Edit3,
  Camera,
  Plus,
  X,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/Button';

export const AlumniProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('view');

  const tabs = [
    { id: 'view', label: 'View Profile', icon: <User size={16} /> },
    { id: 'edit', label: 'Edit Profile', icon: <Edit3 size={16} /> },
    { id: 'activity', label: 'My Activity', icon: <Activity size={16} /> },
    { id: 'privacy', label: 'Privacy Settings', icon: <Shield size={16} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-500">Manage your personal information and account settings.</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm overflow-x-auto max-w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'view' && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-4xl border-4 border-white shadow-lg">
                  SK
                </div>
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Sarah Khan</h2>
              <p className="text-slate-500 font-medium">Product Designer at Pathao</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">CSE '18</span>
                <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-full border border-slate-100">Verified Alumni</span>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail size={16} className="text-slate-400" />
                  sarah.khan@example.com
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone size={16} className="text-slate-400" />
                  +880 1711 000000
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <MapPin size={16} className="text-slate-400" />
                  Dhaka, Bangladesh
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-600 hover:underline cursor-pointer">
                  <Linkedin size={16} />
                  linkedin.com/in/sarahkhan
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['Product Design', 'UI/UX', 'Figma', 'React', 'User Research', 'Prototyping'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-full border border-slate-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <GraduationCap className="text-blue-600" size={24} />
                Education
              </h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                    <GraduationCap size={24} className="text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">B.Sc. in Computer Science & Engineering</h4>
                    <p className="text-sm text-slate-600">University of Dhaka</p>
                    <p className="text-xs text-slate-400 mt-1">Class of 2018 • CGPA: 3.85/4.00</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Briefcase className="text-blue-600" size={24} />
                Work Experience
              </h3>
              <div className="space-y-8">
                {[
                  { role: 'Senior Product Designer', company: 'Pathao', period: '2021 - Present', desc: 'Leading the design system and core user experience for the logistics platform.' },
                  { role: 'UI/UX Designer', company: 'TigerIT', period: '2018 - 2021', desc: 'Designed interfaces for national-level identity management systems.' },
                ].map((job, idx) => (
                  <div key={idx} className="flex gap-4 relative">
                    {idx < 1 && <div className="absolute left-6 top-14 bottom-[-32px] w-px bg-slate-100" />}
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0 z-10">
                      <Briefcase size={24} className="text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{job.role}</h4>
                      <p className="text-sm text-slate-600">{job.company}</p>
                      <p className="text-xs text-slate-400 mt-1">{job.period}</p>
                      <p className="text-sm text-slate-500 mt-3 leading-relaxed">{job.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Award className="text-blue-600" size={24} />
                Expertise & Mentorship
              </h3>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
                <CheckCircle2 className="text-blue-600 mt-0.5" size={20} />
                <div>
                  <p className="font-bold text-blue-900 text-sm">Willing to Mentor</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Sarah is available to mentor junior alumni in Product Design, Portfolio Reviews, and Career Growth.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {activeTab === 'edit' && (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Edit Profile</h2>
          <form className="space-y-8">
            <div className="flex flex-col items-center gap-4 py-4 border-b border-slate-50">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 overflow-hidden">
                  <Camera size={32} />
                </div>
                <button className="absolute bottom-1 right-1 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-xs text-slate-500 font-medium">Click to update profile photo</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" defaultValue="Sarah Khan" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Role</label>
                <input type="text" defaultValue="Senior Product Designer" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input type="email" defaultValue="sarah.khan@example.com" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input type="tel" defaultValue="+880 1711 000000" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
              <textarea rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" defaultValue="Passionate about building user-centric products and helping the next generation of designers."></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
              <Button variant="outline">Discard Changes</Button>
              <Button>Save Profile</Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">My Activity</h3>
            <p className="text-sm text-slate-500">Your recent contributions and interactions.</p>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { type: 'Donation', title: 'Donated 5,000 BDT to Scholarship Fund', time: '2 days ago' },
              { type: 'Event', title: 'RSVP\'d for Annual Alumni Reunion 2024', time: '1 week ago' },
              { type: 'Mentorship', title: 'Accepted mentorship request from Tanvir (CSE \'22)', time: '2 weeks ago' },
              { type: 'Job', title: 'Shared a job opportunity: Frontend Developer at Pathao', time: '3 weeks ago' },
            ].map((act, idx) => (
              <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                    <Activity size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{act.type}</p>
                    <h4 className="font-bold text-slate-900">{act.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{act.time}</p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600">
                  <ChevronRight size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'privacy' && (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Privacy Settings</h2>
          <div className="space-y-6">
            {[
              { title: 'Public Profile', desc: 'Allow non-alumni to view your public profile page.', default: true },
              { title: 'Show Email', desc: 'Display your email address to other verified alumni.', default: false },
              { title: 'Show Phone', desc: 'Display your phone number to other verified alumni.', default: false },
              { title: 'Job Seeking Status', desc: 'Show a "Hiring" or "Open to Work" badge on your profile.', default: true },
              { title: 'Mentorship Availability', desc: 'Allow others to see you are willing to mentor.', default: true },
            ].map((setting, idx) => (
              <div key={idx} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                <div className="max-w-md">
                  <h4 className="font-bold text-slate-900">{setting.title}</h4>
                  <p className="text-sm text-slate-500 mt-1">{setting.desc}</p>
                </div>
                <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${setting.default ? 'bg-blue-600' : 'bg-slate-200'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${setting.default ? 'right-1' : 'left-1'}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-6 border-t border-slate-50">
            <Button className="w-full">Save Privacy Preferences</Button>
          </div>
        </div>
      )}
    </div>
  );
};
