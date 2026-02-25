import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Heart, 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Clock,
  ChevronRight,
  ArrowUpRight,
  Building2,
  Calendar
} from 'lucide-react';
import { Button } from '../ui/Button';

export const AlumniOpportunities: React.FC = () => {
  const [activeTab, setActiveTab] = useState('jobs');

  const tabs = [
    { id: 'jobs', label: 'Jobs', icon: <Briefcase size={16} /> },
    { id: 'post-job', label: 'Post Job', icon: <Plus size={16} /> },
    { id: 'donations', label: 'Donations', icon: <Heart size={16} /> },
    { id: 'create-campaign', label: 'Create Campaign', icon: <Plus size={16} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Opportunities</h1>
          <p className="text-slate-500">Explore career growth and support your university initiatives.</p>
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

      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search jobs by title, company, or skills..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" leftIcon={<Filter size={18} />}>Filters</Button>
              <Button>Search</Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[
                { title: 'Senior Product Designer', company: 'Pathao', location: 'Dhaka', type: 'Full-time', salary: '80k - 120k BDT', posted: '2 days ago', logo: 'P' },
                { title: 'Full Stack Developer', company: 'TigerIT', location: 'Remote', type: 'Full-time', salary: '100k - 150k BDT', posted: '3 days ago', logo: 'T' },
                { title: 'Marketing Manager', company: 'Unilever', location: 'Dhaka', type: 'Full-time', salary: 'Negotiable', posted: '5 days ago', logo: 'U' },
                { title: 'Data Analyst', company: 'Shohoz', location: 'Dhaka', type: 'Contract', salary: '60k - 90k BDT', posted: '1 week ago', logo: 'S' },
                { title: 'Software Engineer (L3)', company: 'Google', location: 'Mountain View, CA', type: 'Full-time', salary: '$140k - $180k', posted: '2 weeks ago', logo: 'G' },
              ].map((job, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center font-bold text-lg border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                      {job.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                          <p className="text-sm text-slate-500 font-medium">{job.company}</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded">
                          {job.type}
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <DollarSign size={14} />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {job.posted}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-all" />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Job Categories</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Engineering', count: 45 },
                    { name: 'Design', count: 12 },
                    { name: 'Marketing', count: 8 },
                    { name: 'Management', count: 15 },
                    { name: 'Finance', count: 6 },
                  ].map((cat, idx) => (
                    <button key={idx} className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-sm text-slate-600 transition-all">
                      <span>{cat.name}</span>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl shadow-lg text-white">
                <h3 className="font-bold mb-2">Hiring Alumni?</h3>
                <p className="text-sm text-slate-400 mb-6">Post a job opportunity and find the best talent from your own university network.</p>
                <Button className="w-full" onClick={() => setActiveTab('post-job')}>Post a Job</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'post-job' && (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Post a New Job</h2>
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Senior Software Engineer" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Google" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Dhaka, Bangladesh" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Type</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Job Description</label>
              <textarea rows={6} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Describe the role and requirements..."></textarea>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setActiveTab('jobs')}>Cancel</Button>
              <Button>Post Opportunity</Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'donations' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Scholarship Fund 2024', target: '500,000 BDT', raised: '325,000 BDT', donors: 124, end: 'Dec 31, 2024', category: 'Education' },
            { title: 'New Lab Equipment Fund', target: '1,200,000 BDT', raised: '450,000 BDT', donors: 56, end: 'Nov 15, 2024', category: 'Infrastructure' },
            { title: 'Alumni Medical Emergency', target: '200,000 BDT', raised: '185,000 BDT', donors: 89, end: 'Oct 30, 2024', category: 'Welfare' },
          ].map((camp, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="h-40 bg-slate-100 relative">
                <img src={`https://picsum.photos/seed/camp${idx}/800/400`} className="w-full h-full object-cover" alt={camp.title} referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-blue-600 uppercase tracking-wider rounded">
                  {camp.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{camp.title}</h3>
                <div className="mt-auto space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      <span>Progress</span>
                      <span className="text-blue-600">{(parseInt(camp.raised.replace(/,/g, '')) / parseInt(camp.target.replace(/,/g, '')) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: `${(parseInt(camp.raised.replace(/,/g, '')) / parseInt(camp.target.replace(/,/g, '')) * 100)}%` }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Raised</p>
                      <p className="text-sm font-bold text-slate-900">{camp.raised}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target</p>
                      <p className="text-sm font-bold text-slate-900">{camp.target}</p>
                    </div>
                  </div>
                  <Button className="w-full">Donate Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'create-campaign' && (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Create Donation Campaign</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Title</label>
              <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Scholarship for Dept of CSE" />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Amount (BDT)</label>
                <input type="number" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 500000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                <input type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Description</label>
              <textarea rows={6} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Explain the purpose of this campaign..."></textarea>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setActiveTab('donations')}>Cancel</Button>
              <Button>Submit for Approval</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
