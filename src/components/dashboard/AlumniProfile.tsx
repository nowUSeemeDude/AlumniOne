import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Globe, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Activity, 
  FileText, 
  Settings, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  Edit, 
  MoreVertical,
  Clock,
  Shield,
  Download,
  Trash2,
  RefreshCw,
  Lock,
  Search
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';

interface AlumniProfileProps {
  onBack: () => void;
}

export const AlumniProfile: React.FC<AlumniProfileProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [status, setStatus] = useState<'Verified' | 'Pending' | 'Suspended'>('Verified');

  // Mock Data
  const profile = {
    id: 'ALM-2023-001',
    name: 'Sarah Khan',
    email: 'sarah.k@example.com',
    phone: '+880 1711 000000',
    avatar: 'SK',
    role: 'Alumni',
    batch: '2018',
    department: 'Computer Science & Engineering',
    faculty: 'School of Engineering',
    program: 'B.Sc. in CSE',
    graduationYear: '2022',
    studentId: '18101010',
    location: 'Dhaka, Bangladesh',
    nationality: 'Bangladeshi',
    dob: '15 Aug 1998',
    gender: 'Female',
    bio: 'Software Engineer with a passion for building scalable web applications. Currently working at Google as a Senior Frontend Developer. Interested in AI and Machine Learning.',
    social: {
      linkedin: 'linkedin.com/in/sarahkhan',
      website: 'sarahkhan.dev'
    },
    currentJob: {
      title: 'Senior Software Engineer',
      company: 'Google',
      industry: 'Technology',
      startDate: 'Jan 2023'
    },
    experience: [
      {
        id: 1,
        title: 'Software Engineer',
        company: 'Pathao',
        duration: 'Jan 2022 - Dec 2022',
        description: 'Worked on the ride-sharing algorithm and improved dispatch efficiency by 15%.'
      },
      {
        id: 2,
        title: 'Junior Developer',
        company: 'Brain Station 23',
        duration: 'Jun 2021 - Dec 2021',
        description: 'Developed frontend components using React and Redux.'
      }
    ],
    education: {
      higherStudy: {
        degree: 'M.Sc. in Computer Science',
        major: 'Artificial Intelligence',
        institution: 'Georgia Institute of Technology',
        research: 'Deep Learning for Computer Vision',
        expectedGraduation: '2025'
      }
    },
    achievements: [
      { id: 1, title: 'Best Thesis Award 2022', type: 'Award', date: 'Dec 2022' },
      { id: 2, title: 'AWS Certified Solutions Architect', type: 'Certification', date: 'Mar 2023' },
      { id: 3, title: 'Published in IEEE Xplore', type: 'Publication', date: 'Nov 2022' }
    ],
    activity: {
      eventsAttended: 12,
      jobsPosted: 2,
      mentorshipSessions: 5,
      lastLogin: '2 hours ago',
      registrationDate: '10 Jan 2023',
      engagementScore: 85
    },
    adminNotes: [
      { id: 1, note: 'Verified manually after checking transcript.', author: 'Admin John', date: '12 Jan 2023' },
      { id: 2, note: 'Requested update on current employment.', author: 'Admin Jane', date: '15 Mar 2023' }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FileText size={18} /> },
    { id: 'academic', label: 'Academic', icon: <GraduationCap size={18} /> },
    { id: 'career', label: 'Career', icon: <Briefcase size={18} /> },
    { id: 'achievements', label: 'Achievements', icon: <Award size={18} /> },
    { id: 'activity', label: 'Activity', icon: <Activity size={18} /> },
    { id: 'notes', label: 'Admin Notes', icon: <MessageSquare size={18} /> },
    { id: 'settings', label: 'Account Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans">
      {/* 1. Cover Banner */}
      <div className="h-[280px] w-full relative group">
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1280" 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/30" /> {/* Dark overlay */}
        
        {/* Top Navigation */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-10">
          <button 
            onClick={onBack}
            className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-all border border-white/10 shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="px-3 py-1.5 bg-black/40 text-white text-xs font-medium rounded-full backdrop-blur-md border border-white/10 shadow-sm">
            Prototype Mode – Data Simulated
          </div>
        </div>
      </div>

      {/* 2. Profile Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20 z-20">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-visible">
          <div className="p-6 sm:p-8 pb-0">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              
              {/* LEFT: Avatar */}
              <div className="relative -mt-24 md:-mt-32 shrink-0 mx-auto md:mx-0">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256"
                    alt={profile.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-white shadow-lg object-cover bg-white"
                  />
                  <div className="absolute bottom-4 right-4 md:bottom-5 md:right-5 w-5 h-5 bg-green-500 border-4 border-white rounded-full shadow-sm" title="Online" />
                </div>
              </div>

              {/* CENTER: Info */}
              <div className="flex-1 text-center md:text-left pt-2">
                <div className="flex flex-col md:flex-row items-center md:items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-slate-900">{profile.name}</h1>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      status === 'Verified' ? 'bg-green-50 text-green-700 border-green-200' :
                      status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {status}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {profile.role}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1 text-slate-600 mb-4">
                  <p className="text-lg font-medium flex items-center justify-center md:justify-start gap-2">
                    <Briefcase size={18} className="text-slate-400" />
                    {profile.currentJob.title} at <span className="text-slate-900 font-bold">{profile.currentJob.company}</span>
                  </p>
                  <p className="text-sm flex items-center justify-center md:justify-start gap-2 text-slate-500">
                    <MapPin size={16} className="text-slate-400" />
                    {profile.location}
                    <span className="w-1 h-1 bg-slate-300 rounded-full mx-1" />
                    <Phone size={16} className="text-slate-400" />
                    {profile.phone}
                    <span className="w-1 h-1 bg-slate-300 rounded-full mx-1" />
                    Batch {profile.batch}
                    <span className="w-1 h-1 bg-slate-300 rounded-full mx-1" />
                    {profile.department}
                  </p>
                </div>
              </div>

              {/* RIGHT: Actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto pt-2">
                <Button variant="outline" leftIcon={<Mail size={18} />}>Message</Button>
                <Button variant="outline" leftIcon={<Edit size={18} />}>Edit</Button>
                <div className="relative group">
                  <Button leftIcon={<MoreVertical size={18} />}>Actions</Button>
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 hidden group-hover:block z-50 origin-top-right">
                     <button onClick={() => setStatus('Verified')} className="w-full px-4 py-2 text-sm text-left hover:bg-slate-50 text-green-600 flex items-center gap-2">
                       <CheckCircle2 size={16} /> Approve
                     </button>
                     <button onClick={() => setStatus('Suspended')} className="w-full px-4 py-2 text-sm text-left hover:bg-slate-50 text-red-600 flex items-center gap-2">
                       <XCircle size={16} /> Suspend
                     </button>
                     <div className="border-t border-slate-100 my-1"></div>
                     <button className="w-full px-4 py-2 text-sm text-left hover:bg-slate-50 text-slate-700 flex items-center gap-2">
                       <FileText size={16} /> Add Note
                     </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Completion Bar */}
            <div className="mt-6 mb-2 max-w-2xl">
               <div className="flex justify-between text-xs mb-1.5">
                 <span className="font-medium text-slate-700">Profile Completion</span>
                 <span className="text-blue-600 font-bold">85%</span>
               </div>
               <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-600 w-[85%] rounded-full shadow-sm" />
               </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 mt-6" />

            {/* Tabs */}
            <div className="flex overflow-x-auto hide-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">About</h3>
                  <p className="text-slate-600 leading-relaxed">{profile.bio}</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Personal Information</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                      <p className="text-slate-900 font-medium">{profile.email}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone</label>
                      <p className="text-slate-900 font-medium">{profile.phone}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date of Birth</label>
                      <p className="text-slate-900 font-medium">{profile.dob}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Gender</label>
                      <p className="text-slate-900 font-medium">{profile.gender}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Nationality</label>
                      <p className="text-slate-900 font-medium">{profile.nationality}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Alumni ID</label>
                      <p className="text-slate-900 font-medium font-mono bg-slate-100 inline-block px-2 py-0.5 rounded">{profile.id}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Social Profiles</h3>
                  <div className="flex gap-4">
                    <a href="#" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-700">
                      <Linkedin size={18} className="text-[#0077b5]" />
                      LinkedIn
                    </a>
                    <a href="#" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-700">
                      <Globe size={18} className="text-slate-500" />
                      Website
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ACADEMIC TAB */}
            {activeTab === 'academic' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">University Education</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Faculty</label>
                      <p className="text-slate-900 font-medium">{profile.faculty}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Department</label>
                      <p className="text-slate-900 font-medium">{profile.department}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Program</label>
                      <p className="text-slate-900 font-medium">{profile.program}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Batch</label>
                      <p className="text-slate-900 font-medium">{profile.batch}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Graduation Year</label>
                      <p className="text-slate-900 font-medium">{profile.graduationYear}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Student ID</label>
                      <p className="text-slate-900 font-medium font-mono">{profile.studentId}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Higher Studies</h3>
                  <div className="border-l-4 border-blue-500 pl-4 py-1">
                    <h4 className="font-bold text-slate-900">{profile.education.higherStudy.degree}</h4>
                    <p className="text-slate-600">{profile.education.higherStudy.institution}</p>
                    <div className="mt-2 text-sm text-slate-500 space-y-1">
                      <p><span className="font-medium">Major:</span> {profile.education.higherStudy.major}</p>
                      <p><span className="font-medium">Research:</span> {profile.education.higherStudy.research}</p>
                      <p><span className="font-medium">Expected Graduation:</span> {profile.education.higherStudy.expectedGraduation}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CAREER TAB */}
            {activeTab === 'career' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-900">Current Employment</h3>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Edit Mode</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                      <input type="text" defaultValue={profile.currentJob.title} className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          defaultValue={profile.currentJob.company} 
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                          placeholder="Search company..."
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                          <Search size={16} />
                        </div>
                      </div>
                      <p className="text-xs text-blue-600 mt-1 cursor-pointer hover:underline">Request to add new company</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Industry</label>
                        <input type="text" defaultValue={profile.currentJob.industry} className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                        <input type="text" defaultValue={profile.currentJob.startDate} className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Experience History</h3>
                  <div className="space-y-8">
                    {profile.experience.map((exp) => (
                      <div key={exp.id} className="relative pl-8 border-l-2 border-slate-100 last:border-0">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500" />
                        <h4 className="font-bold text-slate-900">{exp.title}</h4>
                        <p className="text-slate-600 font-medium">{exp.company}</p>
                        <p className="text-xs text-slate-400 mb-2">{exp.duration}</p>
                        <p className="text-sm text-slate-600">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ACHIEVEMENTS TAB */}
            {activeTab === 'achievements' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Awards & Certifications</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {profile.achievements.map((item) => (
                      <div key={item.id} className="p-4 border border-slate-100 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                            <Award size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                            <p className="text-xs text-slate-500 mt-1">{item.type} • {item.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ACTIVITY TAB */}
            {activeTab === 'activity' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                    <p className="text-3xl font-bold text-blue-600 mb-1">{profile.activity.engagementScore}</p>
                    <p className="text-sm text-slate-500">Engagement Score</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                    <p className="text-3xl font-bold text-purple-600 mb-1">{profile.activity.eventsAttended}</p>
                    <p className="text-sm text-slate-500">Events Attended</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                    <p className="text-3xl font-bold text-green-600 mb-1">{profile.activity.mentorshipSessions}</p>
                    <p className="text-sm text-slate-500">Mentorship Sessions</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity Log</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <Calendar size={14} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-800"><span className="font-medium">Registered</span> for Annual Alumni Reunion 2024</p>
                        <p className="text-xs text-slate-400 mt-0.5">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <Briefcase size={14} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-800"><span className="font-medium">Updated</span> current employment details</p>
                        <p className="text-xs text-slate-400 mt-0.5">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ADMIN NOTES TAB */}
            {activeTab === 'notes' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-900">Internal Notes</h3>
                    <Button size="sm" variant="outline" leftIcon={<Plus size={16} />}>Add Note</Button>
                  </div>
                  <div className="space-y-4">
                    {profile.adminNotes.map((note) => (
                      <div key={note.id} className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                        <p className="text-slate-800 text-sm mb-2">{note.note}</p>
                        <div className="flex justify-between items-center text-xs text-slate-500">
                          <span>By {note.author}</span>
                          <span>{note.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Account Actions</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                          <RefreshCw size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">Reset Password</p>
                          <p className="text-xs text-slate-500">Send a password reset email to the user.</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Send Email</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                          <Lock size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">Disable Account</p>
                          <p className="text-xs text-slate-500">Temporarily prevent login access.</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-amber-600 border-amber-200 hover:bg-amber-50">Disable</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-red-50 rounded-lg bg-red-50/30">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                          <Trash2 size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-red-900">Delete Account</p>
                          <p className="text-xs text-red-500">Permanently remove this alumni and all data.</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Delete</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Last Login</span>
                  <span className="text-sm font-medium text-slate-900">{profile.activity.lastLogin}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Registered</span>
                  <span className="text-sm font-medium text-slate-900">{profile.activity.registrationDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Profile Views</span>
                  <span className="text-sm font-medium text-slate-900">142</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-2">Admin Tip</h3>
              <p className="text-sm text-blue-700">
                Encourage this alumni to become a mentor. They have high engagement and relevant industry experience.
              </p>
              <Button size="sm" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white border-none shadow-none">
                Invite to Mentorship
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for Plus icon
const Plus = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
