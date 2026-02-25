import React from 'react';
import { 
  TrendingUp, 
  Briefcase, 
  Calendar, 
  Vote, 
  ArrowRight, 
  Megaphone,
  Heart,
  ChevronRight,
  Edit3
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';

interface AlumniHomeProps {
  progress: number;
  onEditProfile: () => void;
}

export const AlumniHome: React.FC<AlumniHomeProps> = ({ progress, onEditProfile }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, Sarah!</h1>
            <p className="text-slate-500">Stay connected with your fellow alumni and explore new opportunities.</p>
          </div>
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex-1 md:w-48">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>Profile Completion</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-blue-600 rounded-full"
                />
              </div>
            </div>
            <Button variant="outline" size="sm" leftIcon={<Edit3 size={16} />} onClick={onEditProfile}>
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Opportunities Snapshot */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Opportunities for You</h2>
              <button className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Briefcase size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Suggested Job</span>
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Senior Product Designer</h3>
                <p className="text-sm text-slate-500 mt-1">Pathao • Dhaka, Bangladesh</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">Posted 2 days ago</span>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-all" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                    <Heart size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Campaign</span>
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Scholarship Fund 2024</h3>
                <p className="text-sm text-slate-500 mt-1">Help 50 underprivileged students.</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden mr-4">
                    <div className="h-full bg-rose-500 w-[65%]" />
                  </div>
                  <span className="text-xs font-bold text-rose-600">65%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Upcoming Events */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Upcoming Events</h2>
              <button className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
                Explore Events <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { 
                  title: 'Annual Alumni Reunion 2024', 
                  date: 'Dec 15, 2024', 
                  location: 'Main Campus Auditorium',
                  attendees: '450+ attending',
                  image: 'https://picsum.photos/seed/reunion/800/400'
                },
                { 
                  title: 'Tech Career Fair & Networking', 
                  date: 'Nov 20, 2024', 
                  location: 'Grand Ballroom, Pan Pacific Sonargaon',
                  attendees: '120+ attending',
                  image: 'https://picsum.photos/seed/career/800/400'
                }
              ].map((event, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row group cursor-pointer">
                  <div className="md:w-48 h-32 md:h-auto overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                        <Calendar size={12} />
                        {event.date}
                      </div>
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{event.location}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-400">{event.attendees}</span>
                      <Button size="sm">RSVP Now</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8">
          {/* Active Votes */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Vote size={20} />
              </div>
              <h2 className="font-bold text-slate-900">Active Votes</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Alumni Association Election 2024</h3>
                <p className="text-xs text-slate-500 mb-4">Cast your vote for the next Executive Committee.</p>
                <Button className="w-full" size="sm" variant="outline">Vote Now</Button>
              </div>
            </div>
          </section>

          {/* Announcements */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Megaphone size={20} />
              </div>
              <h2 className="font-bold text-slate-900">Announcements</h2>
            </div>
            <div className="space-y-4">
              {[
                { title: 'New Alumni ID Cards Available', time: '2 days ago' },
                { title: 'Library Access for Alumni Updated', time: '1 week ago' },
                { title: 'Call for Guest Lecturers: Fall 2024', time: '2 weeks ago' }
              ].map((ann, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <h3 className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">{ann.title}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">{ann.time}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
              View All Announcements
            </button>
          </section>

          {/* Quick Links */}
          <section className="bg-blue-600 p-6 rounded-2xl shadow-lg text-white">
            <h3 className="font-bold mb-4">Quick Links</h3>
            <div className="space-y-3">
              <button className="w-full text-left text-sm text-blue-100 hover:text-white transition-colors flex items-center justify-between">
                Request Transcript <ChevronRight size={14} />
              </button>
              <button className="w-full text-left text-sm text-blue-100 hover:text-white transition-colors flex items-center justify-between">
                Alumni Mentorship <ChevronRight size={14} />
              </button>
              <button className="w-full text-left text-sm text-blue-100 hover:text-white transition-colors flex items-center justify-between">
                University News <ChevronRight size={14} />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
