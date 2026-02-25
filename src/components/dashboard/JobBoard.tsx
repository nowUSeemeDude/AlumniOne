import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  ExternalLink,
  Building2,
  Users,
  Calendar,
  ArrowLeft,
  Share2,
  Bookmark
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data
const INITIAL_JOBS = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'Dhaka, Bangladesh',
    type: 'Full-time',
    postedBy: 'Sarah Khan',
    posterRole: 'Alumni',
    postedDate: '2 days ago',
    status: 'Approved',
    views: 124,
    applications: 45,
    salary: 'BDT 150k - 250k / month',
    deadline: 'Mar 15, 2026',
    description: 'We are looking for an experienced Software Engineer to join our team...',
    logo: 'G'
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Pathao',
    location: 'Dhaka, Bangladesh',
    type: 'Full-time',
    postedBy: 'Admin',
    posterRole: 'Admin',
    postedDate: '5 hours ago',
    status: 'Pending',
    views: 12,
    applications: 0,
    salary: 'Negotiable',
    deadline: 'Feb 28, 2026',
    description: 'Lead product strategy for our new ride-sharing features...',
    logo: 'P'
  },
  {
    id: 3,
    title: 'Marketing Intern',
    company: 'Unilever',
    location: 'Chittagong, Bangladesh',
    type: 'Internship',
    postedBy: 'Rahim Ahmed',
    posterRole: 'Alumni',
    postedDate: '1 week ago',
    status: 'Closed',
    views: 340,
    applications: 112,
    salary: 'BDT 15k / month',
    deadline: 'Jan 30, 2026',
    description: 'Join our marketing team for a 3-month internship program...',
    logo: 'U'
  }
];

export const JobBoard: React.FC = () => {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleViewJob = (job: any) => {
    // Simulate view count increment
    const updatedJob = { ...job, views: job.views + 1 };
    setJobs(jobs.map(j => j.id === job.id ? updatedJob : j));
    setSelectedJob(updatedJob);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: newStatus } : j));
    if (selectedJob && selectedJob.id === id) {
      setSelectedJob({ ...selectedJob, status: newStatus });
    }
    showToast(`Job status updated to ${newStatus}`);
  };

  const handleApply = () => {
    if (selectedJob) {
      const updatedJob = { ...selectedJob, applications: selectedJob.applications + 1 };
      setJobs(jobs.map(j => j.id === selectedJob.id ? updatedJob : j));
      setSelectedJob(updatedJob);
      showToast('Application simulated successfully');
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this job post?')) {
      setJobs(jobs.filter(j => j.id !== id));
      setSelectedJob(null);
      showToast('Job post deleted');
    }
  };

  return (
    <div className="space-y-6 relative min-h-[600px]">
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
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Jobs & Careers</h1>
            <span className="text-xs font-medium px-2 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-100">
              Prototype Mode – Job Data Simulated
            </span>
          </div>
          <p className="text-slate-500">Manage job postings and career opportunities.</p>
        </div>
        <Button leftIcon={<Plus size={18} />}>Post a Job</Button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search jobs, companies..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <select 
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending Review</option>
            <option value="Closed">Closed</option>
          </select>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Minimal Job Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[50%]">Job Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[25%]">Posted By</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[25%] text-right">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.filter(job => filterStatus === 'All' || job.status === filterStatus).map((job) => (
                <tr 
                  key={job.id} 
                  className={`hover:bg-slate-50 transition-colors group ${job.status === 'Pending' ? 'border-l-4 border-l-amber-400' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg shrink-0">
                        {job.logo}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{job.title}</h3>
                        <p className="text-sm text-slate-600 font-medium">{job.company}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600">{job.type}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{job.postedBy}</p>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold mt-1 ${
                        job.posterRole === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {job.posterRole}
                      </span>
                      <p className="text-xs text-slate-400 mt-1">{job.postedDate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        job.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        job.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {job.status}
                      </span>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1 text-xs text-slate-400" title="Views">
                          <Eye size={14} /> {job.views}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-400" title="Applications">
                          <Users size={14} /> {job.applications}
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleViewJob(job)}>View</Button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Detail Drawer */}
      <AnimatePresence>
        {selectedJob && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto border-l border-slate-200 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-200 flex justify-between items-start bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 mr-2">
                    <ArrowLeft size={20} />
                  </button>
                  <h2 className="text-lg font-bold text-slate-900">Job Details</h2>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" leftIcon={<Share2 size={16} />}>Share</Button>
                  <Button variant="outline" leftIcon={<Bookmark size={16} />}>Save</Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {/* Job Header Info */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-3xl font-bold text-slate-700 shrink-0">
                    {selectedJob.logo}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">{selectedJob.title}</h1>
                    <div className="flex items-center gap-2 text-slate-600 font-medium mb-3">
                      <Building2 size={18} />
                      {selectedJob.company}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5"><MapPin size={16} /> {selectedJob.location}</span>
                      <span className="flex items-center gap-1.5"><Briefcase size={16} /> {selectedJob.type}</span>
                      <span className="flex items-center gap-1.5"><DollarSign size={16} /> {selectedJob.salary}</span>
                      <span className="flex items-center gap-1.5"><Clock size={16} /> Deadline: {selectedJob.deadline}</span>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <section>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">About the Role</h3>
                      <p className="text-slate-600 leading-relaxed">
                        {selectedJob.description}
                        <br /><br />
                        We are seeking a highly motivated individual to join our dynamic team. You will be responsible for developing scalable solutions and working closely with cross-functional teams to deliver high-quality products.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Responsibilities</h3>
                      <ul className="list-disc pl-5 space-y-2 text-slate-600">
                        <li>Design and implement efficient, reusable, and reliable code.</li>
                        <li>Collaborate with product managers and designers to define requirements.</li>
                        <li>Ensure the best possible performance, quality, and responsiveness of applications.</li>
                        <li>Identify bottlenecks and bugs, and devise solutions to these problems.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Requirements</h3>
                      <ul className="list-disc pl-5 space-y-2 text-slate-600">
                        <li>Bachelor's degree in Computer Science or related field.</li>
                        <li>3+ years of professional experience in software development.</li>
                        <li>Strong proficiency in JavaScript, React, and Node.js.</li>
                        <li>Experience with cloud platforms like AWS or Google Cloud.</li>
                      </ul>
                    </section>

                    <div className="pt-6">
                      <Button size="lg" className="w-full sm:w-auto" onClick={handleApply}>Apply Now</Button>
                    </div>
                  </div>

                  {/* Admin Sidebar */}
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Admin Controls</h4>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Total Views</span>
                          <span className="font-bold text-slate-900">{selectedJob.views}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Applications</span>
                          <span className="font-bold text-slate-900">{selectedJob.applications}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Status</span>
                          <span className={`font-medium ${
                            selectedJob.status === 'Approved' ? 'text-green-600' : 
                            selectedJob.status === 'Pending' ? 'text-amber-600' : 'text-slate-600'
                          }`}>{selectedJob.status}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {selectedJob.status !== 'Approved' && (
                          <button 
                            onClick={() => handleStatusChange(selectedJob.id, 'Approved')}
                            className="w-full py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                          >
                            <CheckCircle2 size={16} /> Approve Job
                          </button>
                        )}
                        {selectedJob.status !== 'Closed' && (
                          <button 
                            onClick={() => handleStatusChange(selectedJob.id, 'Closed')}
                            className="w-full py-2 px-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                          >
                            <XCircle size={16} /> Close Job
                          </button>
                        )}
                        <button className="w-full py-2 px-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                          <Edit size={16} /> Edit Details
                        </button>
                        <button 
                          onClick={() => handleDelete(selectedJob.id)}
                          className="w-full py-2 px-3 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <Trash2 size={16} /> Delete Job
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                      <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-2">Posted By</h4>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
                          {selectedJob.postedBy.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{selectedJob.postedBy}</p>
                          <p className="text-xs text-slate-500">{selectedJob.posterRole}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">Posted on {selectedJob.postedDate}</p>
                      <button className="text-xs text-blue-600 font-medium mt-2 hover:underline">View Profile</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
