import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Search, 
  Filter, 
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  History
} from 'lucide-react';
import { Button } from '../ui/Button';

export const AlumniEvents: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Events', icon: <Calendar size={16} /> },
    { id: 'registrations', label: 'My Registrations', icon: <CheckCircle2 size={16} /> },
    { id: 'past', label: 'Past Events', icon: <History size={16} /> },
  ];

  const events = [
    { 
      title: 'Annual Alumni Reunion 2024', 
      date: 'Dec 15, 2024', 
      time: '6:00 PM - 10:00 PM',
      location: 'Main Campus Auditorium',
      attendees: '450+ attending',
      image: 'https://picsum.photos/seed/reunion/800/400',
      category: 'Social'
    },
    { 
      title: 'Tech Career Fair & Networking', 
      date: 'Nov 20, 2024', 
      time: '10:00 AM - 4:00 PM',
      location: 'Grand Ballroom, Pan Pacific Sonargaon',
      attendees: '120+ attending',
      image: 'https://picsum.photos/seed/career/800/400',
      category: 'Professional'
    },
    { 
      title: 'Startup Pitch Night', 
      date: 'Oct 25, 2024', 
      time: '5:00 PM - 8:00 PM',
      location: 'Innovation Hub, Level 4',
      attendees: '80+ attending',
      image: 'https://picsum.photos/seed/startup/800/400',
      category: 'Entrepreneurship'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Events</h1>
          <p className="text-slate-500">Join events to network, learn, and celebrate with your community.</p>
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

      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search events by title, category, or location..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" leftIcon={<Filter size={18} />}>Filters</Button>
              <Button>Search</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group cursor-pointer hover:border-blue-300 transition-all">
                <div className="h-48 overflow-hidden relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-blue-600 uppercase tracking-wider rounded">
                    {event.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                    <Calendar size={14} />
                    {event.date}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                  
                  <div className="space-y-2 mt-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock size={14} className="text-slate-400" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={14} className="text-slate-400" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Users size={14} className="text-slate-400" />
                      {event.attendees}
                    </div>
                  </div>

                  <div className="mt-auto flex gap-2">
                    <Button variant="outline" className="flex-1">Details</Button>
                    <Button className="flex-1">RSVP Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'registrations' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">My Registered Events</h3>
            <p className="text-sm text-slate-500">Events you have RSVP'd for.</p>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { title: 'Annual Alumni Reunion 2024', date: 'Dec 15, 2024', status: 'Confirmed', ticket: 'ALUM-2024-001' },
              { title: 'Tech Career Fair & Networking', date: 'Nov 20, 2024', status: 'Confirmed', ticket: 'ALUM-2024-045' },
            ].map((reg, idx) => (
              <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{reg.title}</h4>
                    <p className="text-sm text-slate-500">{reg.date}</p>
                    <p className="text-xs text-slate-400 mt-1 font-mono">Ticket ID: {reg.ticket}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded">
                    {reg.status}
                  </span>
                  <Button variant="outline" size="sm">Download Ticket</Button>
                </div>
              </div>
            ))}
            {/* Empty state if no registrations */}
          </div>
        </div>
      )}

      {activeTab === 'past' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-75">
          {[
            { title: 'Alumni Dinner 2023', date: 'Dec 20, 2023', location: 'Radisson Blu', image: 'https://picsum.photos/seed/past1/800/400' },
            { title: 'Career Workshop: AI & Future', date: 'Oct 12, 2023', location: 'Online', image: 'https://picsum.photos/seed/past2/800/400' },
            { title: 'Sports Day 2023', date: 'Aug 05, 2023', location: 'University Ground', image: 'https://picsum.photos/seed/past3/800/400' },
          ].map((event, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col grayscale hover:grayscale-0 transition-all">
              <div className="h-40 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{event.date}</p>
                <h3 className="font-bold text-slate-900">{event.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{event.location}</p>
                <button className="mt-4 text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                  View Gallery <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
