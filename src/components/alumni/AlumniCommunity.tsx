import React, { useState } from 'react';
import { 
  Users, 
  Building2, 
  Star, 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Button } from '../ui/Button';

export const AlumniCommunity: React.FC = () => {
  const [activeTab, setActiveTab] = useState('directory');

  const tabs = [
    { id: 'directory', label: 'Alumni Directory', icon: <Users size={16} /> },
    { id: 'companies', label: 'Companies', icon: <Building2 size={16} /> },
    { id: 'contributors', label: 'Top Contributors', icon: <Star size={16} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Community</h1>
          <p className="text-slate-500">Connect with fellow alumni and discover where they are working.</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
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

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder={`Search ${activeTab === 'directory' ? 'alumni by name, batch, or company...' : activeTab === 'companies' ? 'companies by name or industry...' : 'contributors...'}`}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Filter size={18} />}>Filters</Button>
          <Button>Search</Button>
        </div>
      </div>

      {activeTab === 'directory' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Ariful Islam', role: 'CTO at TigerIT', batch: '2012', dept: 'CSE', location: 'Dhaka', avatar: 'AI' },
            { name: 'Nusrat Jahan', role: 'HR Manager at Unilever', batch: '2015', dept: 'BBA', location: 'Dhaka', avatar: 'NJ' },
            { name: 'Tanvir Ahmed', role: 'Founder at TechBD', batch: '2010', dept: 'EEE', location: 'Sylhet', avatar: 'TA' },
            { name: 'Sarah Khan', role: 'Product Designer at Pathao', batch: '2018', dept: 'CSE', location: 'Dhaka', avatar: 'SK' },
            { name: 'Mehedi Hasan', role: 'Software Engineer at Google', batch: '2014', dept: 'CSE', location: 'Mountain View, CA', avatar: 'MH' },
            { name: 'Farzana Yasmin', role: 'Data Scientist at Shohoz', batch: '2017', dept: 'Mathematics', location: 'Dhaka', avatar: 'FY' },
          ].map((alum, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100">
                  {alum.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">{alum.name}</h3>
                  <p className="text-sm text-slate-500 truncate">{alum.role}</p>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <GraduationCap size={14} />
                      {alum.dept} • Class of {alum.batch}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <MapPin size={14} />
                      {alum.location}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Message</Button>
                <Button size="sm" className="flex-1">View Profile</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'companies' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'TigerIT', industry: 'Software & IT', alumniCount: 45, logo: 'T' },
            { name: 'Unilever', industry: 'FMCG', alumniCount: 28, logo: 'U' },
            { name: 'Pathao', industry: 'Logistics & Tech', alumniCount: 32, logo: 'P' },
            { name: 'Shohoz', industry: 'Travel & Tech', alumniCount: 18, logo: 'S' },
            { name: 'Grameenphone', industry: 'Telecommunications', alumniCount: 56, logo: 'G' },
            { name: 'BRAC Bank', industry: 'Banking', alumniCount: 42, logo: 'B' },
            { name: 'Google', industry: 'Big Tech', alumniCount: 12, logo: 'G' },
            { name: 'Microsoft', industry: 'Big Tech', alumniCount: 8, logo: 'M' },
          ].map((company, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center font-bold text-2xl mx-auto mb-4 border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                {company.logo}
              </div>
              <h3 className="font-bold text-slate-900">{company.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{company.industry}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
                <Users size={12} />
                {company.alumniCount} Alumni
              </div>
              <button className="w-full mt-6 text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors flex items-center justify-center gap-1">
                View Company <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'contributors' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Top Contributors of the Month</h3>
            <p className="text-sm text-slate-500">Alumni who are most active in mentoring and supporting the community.</p>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { name: 'Ariful Islam', role: 'CTO at TigerIT', points: 1250, contributions: '12 Mentorships, 5 Job Referrals', rank: 1 },
              { name: 'Nusrat Jahan', role: 'HR Manager at Unilever', points: 980, contributions: '8 Mentorships, 3 Career Talks', rank: 2 },
              { name: 'Tanvir Ahmed', role: 'Founder at TechBD', points: 850, contributions: '5 Mentorships, $2k Donations', rank: 3 },
              { name: 'Sarah Khan', role: 'Product Designer at Pathao', points: 720, contributions: '4 Mentorships, 2 Portfolio Reviews', rank: 4 },
            ].map((contributor, idx) => (
              <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    contributor.rank === 1 ? 'bg-amber-100 text-amber-600' :
                    contributor.rank === 2 ? 'bg-slate-100 text-slate-600' :
                    contributor.rank === 3 ? 'bg-orange-100 text-orange-600' :
                    'bg-slate-50 text-slate-400'
                  }`}>
                    {contributor.rank}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{contributor.name}</h4>
                    <p className="text-sm text-slate-500">{contributor.role}</p>
                    <p className="text-xs text-blue-600 font-medium mt-1">{contributor.contributions}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900">{contributor.points}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
