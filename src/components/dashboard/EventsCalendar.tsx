import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Plus, 
  MapPin, 
  Video, 
  Users, 
  Clock, 
  DollarSign, 
  Globe, 
  Mail, 
  Image as ImageIcon, 
  X, 
  CheckCircle2, 
  MoreVertical, 
  Edit2, 
  Copy, 
  Trash2, 
  Download, 
  ExternalLink,
  Filter,
  BarChart3,
  ArrowRight,
  PanelLeftClose,
  PanelLeftOpen,
  LayoutGrid,
  List,
  Columns,
  AlertCircle,
  LayoutTemplate,
  MessageSquare
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data
const CATEGORIES = [
  { id: 'free', label: 'Free Event', color: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  { id: 'paid', label: 'Paid Event', color: 'bg-purple-100 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
  { id: 'webinar', label: 'Webinar', color: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500' },
  { id: 'reunion', label: 'Reunion', color: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
  { id: 'fundraiser', label: 'Fundraiser', color: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500' },
  { id: 'workshop', label: 'Workshop', color: 'bg-teal-100 text-teal-700 border-teal-200', dot: 'bg-teal-500' },
];

const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'Annual Alumni Reunion 2024',
    category: 'reunion',
    start: new Date(2026, 1, 25, 18, 0), // Feb 25, 2026
    end: new Date(2026, 1, 25, 22, 0),
    location: 'Grand Ballroom, Dhaka',
    type: 'Physical',
    registered: 145,
    capacity: 200,
    price: 50,
    revenue: 7250
  },
  {
    id: 2,
    title: 'Tech Career Webinar',
    category: 'webinar',
    start: new Date(2026, 1, 22, 15, 0), // Feb 22, 2026
    end: new Date(2026, 1, 22, 16, 30),
    location: 'Zoom',
    type: 'Online',
    registered: 89,
    capacity: 500,
    price: 0,
    revenue: 0
  },
  {
    id: 3,
    title: 'Fundraising Gala',
    category: 'fundraiser',
    start: new Date(2026, 1, 28, 19, 0), // Feb 28, 2026
    end: new Date(2026, 1, 28, 23, 0),
    location: 'University Campus',
    type: 'Physical',
    registered: 42,
    capacity: 100,
    price: 100,
    revenue: 4200
  }
];

const INITIAL_LANDING_PAGES = [
  { id: 1, title: 'Annual Alumni Reunion 2024', url: 'alumnione.com/events/reunion-24', status: 'Published', views: 1240 },
  { id: 2, title: 'Tech Career Webinar', url: 'alumnione.com/events/webinar-tech', status: 'Published', views: 850 },
  { id: 3, title: 'Fundraising Gala', url: 'alumnione.com/events/gala-2026', status: 'Draft', views: 0 },
];

const TEMPLATES = [
  { id: 'conference', name: 'Classic Conference', description: 'Standard layout for conferences and summits.', icon: <LayoutGrid size={24} /> },
  { id: 'webinar', name: 'Webinar Registration', description: 'Optimized for high conversion and lead gen.', icon: <Video size={24} /> },
  { id: 'social', name: 'Reunion Showcase', description: 'Gallery focused layout for social gatherings.', icon: <ImageIcon size={24} /> },
];

export const EventsCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026
  const [view, setView] = useState<'month' | 'week' | 'list'>('month');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);
  const [isLandingPagesOpen, setIsLandingPagesOpen] = useState(false);
  const [landingPageView, setLandingPageView] = useState<'list' | 'create'>('list');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [landingPages, setLandingPages] = useState(INITIAL_LANDING_PAGES);
  const [selectedCategories, setSelectedCategories] = useState(CATEGORIES.map(c => c.id));
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Create Event Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'free',
    startDate: '2026-02-26',
    startTime: '10:00',
    endTime: '12:00',
    location: '',
    type: 'Physical',
    capacity: '',
    isRSVP: true,
    ticketPrice: '',
    currency: 'USD',
    isEarlyBird: false,
    refundPolicy: 'No Refunds',
    sendEmail: false,
    sendWhatsApp: false,
    generateLandingPage: false,
    description: ''
  });

  // Audience Targeting State
  const [audienceType, setAudienceType] = useState('all'); // all, batch, dept
  const [audienceSubValue, setAudienceSubValue] = useState('');
  const [estimatedReach, setEstimatedReach] = useState(845);

  useEffect(() => {
    if (audienceType === 'all') setEstimatedReach(845);
    else if (audienceType === 'batch') setEstimatedReach(150);
    else if (audienceType === 'dept') setEstimatedReach(845);
  }, [audienceType, audienceSubValue]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Calendar Logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  const handlePrev = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else {
      // For week view, subtract 7 days
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentDate(newDate);
    }
  };

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else {
      // For week view, add 7 days
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentDate(newDate);
    }
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      category: 'free',
      startDate: currentDate.toISOString().split('T')[0],
      startTime: '10:00',
      endTime: '12:00',
      location: '',
      type: 'Physical',
      capacity: '',
      isRSVP: true,
      ticketPrice: '',
      currency: 'USD',
      isEarlyBird: false,
      refundPolicy: 'No Refunds',
      sendEmail: false,
      sendWhatsApp: false,
      generateLandingPage: false,
      description: ''
    });
    setIsCreatePanelOpen(true);
  };

  const handleSaveEvent = () => {
    if (!newEvent.title) {
      showToast('Event title is required', 'error');
      return;
    }

    const start = new Date(`${newEvent.startDate}T${newEvent.startTime}`);
    const end = new Date(`${newEvent.startDate}T${newEvent.endTime}`);

    const createdEvent = {
      id: Date.now(),
      title: newEvent.title,
      category: newEvent.category,
      start,
      end,
      location: newEvent.location || 'TBD',
      type: newEvent.type,
      registered: 0,
      capacity: newEvent.capacity ? parseInt(newEvent.capacity) : 100,
      price: newEvent.category === 'paid' ? parseFloat(newEvent.ticketPrice) : 0,
      revenue: 0
    };

    setEvents([...events, createdEvent]);
    setIsCreatePanelOpen(false);
    showToast('Event Created Successfully');
  };

  const handleCreateLandingPage = (templateName: string) => {
    const newPage = {
      id: Date.now(),
      title: `New ${templateName} Page`,
      url: `alumnione.com/events/new-${Date.now()}`,
      status: 'Draft',
      views: 0
    };
    setLandingPages([...landingPages, newPage]);
    setLandingPageView('list');
    showToast('Landing page created successfully');
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(c => c !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  // Week View Helpers
  const getWeekDays = () => {
    const curr = new Date(currentDate);
    const week = [];
    // Adjust to get Sunday of the current week
    curr.setDate(curr.getDate() - curr.getDay());
    for (let i = 0; i < 7; i++) {
      week.push(new Date(curr));
      curr.setDate(curr.getDate() + 1);
    }
    return week;
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
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

      {/* 1. Page Header (Title + Main Actions) */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0 bg-white z-20">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Events Management</h1>
            <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
              Space: CSE Department
            </span>
          </div>
          <p className="text-slate-500 text-sm">Manage events for your department alumni.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => { setIsLandingPagesOpen(true); setLandingPageView('list'); }} leftIcon={<Globe size={18} />}>
            All Landing Pages
          </Button>
          <Button onClick={handleCreateEvent} leftIcon={<Plus size={18} />}>Create Event</Button>
        </div>
      </div>

      {/* 2. Calendar Toolbar (Navigation + View) */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-slate-200 shrink-0 bg-slate-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"
            title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
          
          <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
            <button onClick={handlePrev} className="p-1.5 hover:bg-slate-200 rounded-full text-slate-600">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md">
              Today
            </button>
            <button onClick={handleNext} className="p-1.5 hover:bg-slate-200 rounded-full text-slate-600">
              <ChevronRight size={18} />
            </button>
            <span className="text-base font-semibold text-slate-900 ml-2 w-40">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
        
        <div className="flex items-center bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
           <button 
              onClick={() => setView('month')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${view === 'month' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutGrid size={14} />
              Month
            </button>
            <button 
              onClick={() => setView('week')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${view === 'week' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Columns size={14} />
              Week
            </button>
            <button 
              onClick={() => setView('list')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${view === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <List size={14} />
              List
            </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <motion.div 
          initial={false}
          animate={{ width: isSidebarOpen ? 256 : 0, opacity: isSidebarOpen ? 1 : 0 }}
          className="border-r border-slate-200 overflow-hidden bg-white flex-shrink-0"
        >
          <div className="p-6 w-64">
            <div className="mb-8">
              <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-slate-900">February 2026</span>
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-slate-200 rounded"><ChevronLeft size={14} /></button>
                    <button className="p-1 hover:bg-slate-200 rounded"><ChevronRight size={14} /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 mb-2">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {[...Array(28)].map((_, i) => (
                    <div key={i} className={`p-1 rounded-full cursor-pointer hover:bg-slate-200 ${i === 20 ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Event Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat.id) ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}>
                      {selectedCategories.includes(cat.id) && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                    />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900">{cat.label}</span>
                    <div className={`w-2 h-2 rounded-full ml-auto ${cat.dot}`} />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Audience Filter</h3>
              <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Departments</option>
                <option>Computer Science</option>
                <option>Business Admin</option>
              </select>
              <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Batches</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Main Calendar Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {/* MONTH VIEW */}
          {view === 'month' && (
            <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-lg overflow-hidden border border-slate-200 shadow-sm h-full min-h-[600px]">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="bg-slate-50 p-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {day}
                </div>
              ))}
              {calendarDays.map((date, index) => {
                const dayEvents = date ? events.filter(e => 
                  selectedCategories.includes(e.category) &&
                  e.start.getDate() === date.getDate() && 
                  e.start.getMonth() === date.getMonth() && 
                  e.start.getFullYear() === date.getFullYear()
                ) : [];

                return (
                  <div 
                    key={index} 
                    className={`bg-white min-h-[100px] p-2 transition-colors hover:bg-slate-50 ${!date ? 'bg-slate-50/50' : 'cursor-pointer'}`}
                    onClick={() => date && handleCreateEvent()}
                  >
                    {date && (
                      <>
                        <div className="flex justify-center">
                          <span className={`text-sm font-medium ${
                            date.getDate() === new Date().getDate() && 
                            date.getMonth() === new Date().getMonth() 
                              ? 'bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full' 
                              : 'text-slate-700'
                          }`}>
                            {date.getDate()}
                          </span>
                        </div>
                        <div className="mt-2 space-y-1">
                          {dayEvents.map((event) => {
                            const category = CATEGORIES.find(c => c.id === event.category);
                            return (
                              <div 
                                key={event.id}
                                onClick={(e) => { e.stopPropagation(); handleEventClick(event); }}
                                className={`text-xs px-2 py-1 rounded border truncate font-medium ${category?.color}`}
                              >
                                {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {event.title}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* WEEK VIEW */}
          {view === 'week' && (
            <div className="flex flex-col h-full bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-50">
                <div className="p-3 border-r border-slate-200 text-xs font-semibold text-slate-500 uppercase text-center">Time</div>
                {getWeekDays().map((day, i) => (
                  <div key={i} className={`p-3 text-center border-r border-slate-200 last:border-0 ${day.getDate() === new Date().getDate() ? 'bg-blue-50' : ''}`}>
                    <p className="text-xs font-semibold text-slate-500 uppercase">{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p className={`text-sm font-bold ${day.getDate() === new Date().getDate() ? 'text-blue-600' : 'text-slate-900'}`}>{day.getDate()}</p>
                  </div>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-8 min-h-[600px]">
                  <div className="border-r border-slate-200 bg-slate-50">
                    {[9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(hour => (
                      <div key={hour} className="h-20 border-b border-slate-200 text-xs text-slate-400 text-right pr-2 pt-2">
                        {hour}:00
                      </div>
                    ))}
                  </div>
                  {getWeekDays().map((day, i) => {
                    const dayEvents = events.filter(e => 
                      selectedCategories.includes(e.category) &&
                      e.start.getDate() === day.getDate() && 
                      e.start.getMonth() === day.getMonth() && 
                      e.start.getFullYear() === day.getFullYear()
                    );
                    return (
                      <div key={i} className="border-r border-slate-200 relative last:border-0">
                        {[9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(hour => (
                          <div key={hour} className="h-20 border-b border-slate-100" />
                        ))}
                        {dayEvents.map(event => {
                          const category = CATEGORIES.find(c => c.id === event.category);
                          return (
                            <div 
                              key={event.id}
                              onClick={(e) => { e.stopPropagation(); handleEventClick(event); }}
                              className={`absolute left-1 right-1 p-2 rounded text-xs border cursor-pointer hover:brightness-95 ${category?.color}`}
                              style={{ top: `${(event.start.getHours() - 9) * 80}px`, height: '60px' }}
                            >
                              <p className="font-bold truncate">{event.title}</p>
                              <p>{event.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* LIST VIEW */}
          {view === 'list' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              {events
                .filter(e => selectedCategories.includes(e.category))
                .sort((a, b) => a.start.getTime() - b.start.getTime())
                .map(event => {
                  const category = CATEGORIES.find(c => c.id === event.category);
                  return (
                    <div 
                      key={event.id} 
                      onClick={() => handleEventClick(event)}
                      className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-6"
                    >
                      <div className="flex-shrink-0 text-center w-16">
                        <p className="text-xs font-bold text-slate-500 uppercase">{event.start.toLocaleDateString('en-US', { month: 'short' })}</p>
                        <p className="text-2xl font-bold text-slate-900">{event.start.getDate()}</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${category?.color.replace('border', '')}`}>
                            {category?.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><Clock size={14} /> {event.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {event.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* Create Event Panel */}
      <AnimatePresence>
        {isCreatePanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreatePanelOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full lg:w-1/2 min-w-[720px] bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-slate-200 flex justify-between items-start bg-white z-10">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Create New Event</h2>
                  <p className="text-slate-500 mt-1">Configure event details, audience, and publishing settings.</p>
                </div>
                <button onClick={() => setIsCreatePanelOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
                
                {/* Section 1: Basic Information */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">1</div>
                    Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Event Title</label>
                      <input 
                        type="text" 
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base" 
                        placeholder="e.g. Annual Alumni Reunion 2026" 
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                      <select 
                        value={newEvent.category}
                        onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Location Type</label>
                      <select 
                        value={newEvent.type}
                        onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option>Physical</option>
                        <option>Online</option>
                        <option>Hybrid</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Start Date & Time</label>
                      <div className="flex gap-2">
                        <input 
                          type="date" 
                          value={newEvent.startDate}
                          onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                          className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                        />
                        <input 
                          type="time" 
                          value={newEvent.startTime}
                          onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                          className="w-28 px-2 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">End Date & Time</label>
                      <div className="flex gap-2">
                        <input 
                          type="date" 
                          value={newEvent.startDate} // Simplified for prototype
                          disabled
                          className="w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-slate-50 text-slate-500" 
                        />
                        <input 
                          type="time" 
                          value={newEvent.endTime}
                          onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                          className="w-28 px-2 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                        />
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Location / Link</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          value={newEvent.location}
                          onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                          placeholder={newEvent.type === 'Online' ? "Paste meeting link..." : "Enter venue address..."} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Event Type Logic */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">2</div>
                    Registration & Ticketing
                  </h3>

                  {newEvent.category === 'paid' || newEvent.category === 'fundraiser' ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ticket Price</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                            <input 
                              type="number" 
                              value={newEvent.ticketPrice}
                              onChange={(e) => setNewEvent({...newEvent, ticketPrice: e.target.value})}
                              className="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Capacity Limit</label>
                          <input 
                            type="number" 
                            value={newEvent.capacity}
                            onChange={(e) => setNewEvent({...newEvent, capacity: e.target.value})}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                            placeholder="Max attendees"
                          />
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={newEvent.isEarlyBird}
                            onChange={(e) => setNewEvent({...newEvent, isEarlyBird: e.target.checked})}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-slate-700">Enable Early Bird Pricing</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                          <span className="text-sm font-medium text-slate-700">Allow Refunds (up to 48h before)</span>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Capacity Limit</label>
                        <input 
                          type="number" 
                          value={newEvent.capacity}
                          onChange={(e) => setNewEvent({...newEvent, capacity: e.target.value})}
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                          placeholder="Optional"
                        />
                      </div>
                      <div className="flex items-end pb-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={newEvent.isRSVP}
                            onChange={(e) => setNewEvent({...newEvent, isRSVP: e.target.checked})}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-slate-700">Require RSVP</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 3: Audience Targeting */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">3</div>
                    Audience Targeting
                  </h3>

                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Estimated Reach (Space)</span>
                      <span className="text-xl font-bold text-blue-600">{estimatedReach.toLocaleString()} Alumni</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(estimatedReach / 845) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className="bg-blue-600 h-full rounded-full" 
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-right">Based on current filters</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Target Audience</label>
                      <select 
                        value={audienceType}
                        onChange={(e) => { setAudienceType(e.target.value); setAudienceSubValue(''); }}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="all">All Alumni</option>
                        <option value="batch">Specific Batch</option>
                        <option value="dept">Specific Department</option>
                      </select>
                    </div>

                    <AnimatePresence>
                      {audienceType !== 'all' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                            Select {audienceType === 'batch' ? 'Batch' : 'Department'}
                          </label>
                          <select 
                            value={audienceSubValue}
                            onChange={(e) => setAudienceSubValue(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                          >
                            <option value="">Select option...</option>
                            {audienceType === 'batch' ? (
                              <>
                                <option value="2023">Batch 2023</option>
                                <option value="2022">Batch 2022</option>
                                <option value="2021">Batch 2021</option>
                              </>
                            ) : (
                              <>
                                <option value="CSE">Computer Science</option>
                                <option value="EEE">Electrical Engineering</option>
                                <option value="BBA">Business Administration</option>
                              </>
                            )}
                          </select>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Section 4: Communication */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">4</div>
                    Communication
                  </h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={newEvent.sendEmail}
                        onChange={(e) => setNewEvent({...newEvent, sendEmail: e.target.checked})}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <span className="block font-medium text-slate-900">Send Email Notification</span>
                        <span className="text-xs text-slate-500">Notify target audience via email immediately upon publishing.</span>
                      </div>
                      <Mail size={20} className="text-slate-400" />
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={newEvent.sendWhatsApp}
                        onChange={(e) => setNewEvent({...newEvent, sendWhatsApp: e.target.checked})}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <span className="block font-medium text-slate-900">Send WhatsApp Notification</span>
                        <span className="text-xs text-slate-500">Send a short alert to connected WhatsApp numbers.</span>
                      </div>
                      <div className="p-1 bg-green-100 text-green-600 rounded">
                        <MessageSquare size={16} />
                      </div>
                    </label>
                  </div>
                </div>

                {/* Section 5: Landing Page */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">5</div>
                      Event Landing Page
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={newEvent.generateLandingPage}
                        onChange={(e) => setNewEvent({...newEvent, generateLandingPage: e.target.checked})}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <AnimatePresence>
                    {newEvent.generateLandingPage && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
                            <textarea 
                              rows={4}
                              value={newEvent.description}
                              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                              placeholder="Describe your event..."
                            />
                          </div>
                          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                            <ImageIcon className="mx-auto text-slate-400 mb-2" size={32} />
                            <p className="text-sm font-medium text-slate-900">Upload Banner Image</p>
                            <p className="text-xs text-slate-500 mt-1">1920x1080 recommended</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="h-20"></div> {/* Spacer for fixed footer */}
              </div>

              {/* Fixed Footer */}
              <div className="px-8 py-4 bg-white border-t border-slate-200 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                <Button variant="outline" onClick={() => setIsCreatePanelOpen(false)}>Cancel</Button>
                <div className="flex gap-3">
                  <Button variant="outline">Save Draft</Button>
                  <Button onClick={handleSaveEvent} leftIcon={<CheckCircle2 size={18} />}>Create Event</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Landing Pages Modal */}
      <AnimatePresence>
        {isLandingPagesOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLandingPagesOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-900">
                    {landingPageView === 'list' ? 'Event Landing Pages' : 'Select a Template'}
                  </h2>
                  <button onClick={() => setIsLandingPagesOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-0 min-h-[400px]">
                  {landingPageView === 'list' ? (
                    <>
                      <div className="p-4 flex justify-end border-b border-slate-100">
                         <Button onClick={() => setLandingPageView('create')} leftIcon={<Plus size={16} />}>
                           Create Landing Page
                         </Button>
                      </div>
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Event Name</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">URL</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {landingPages.map(page => (
                            <tr key={page.id} className="hover:bg-slate-50">
                              <td className="px-6 py-4 font-medium text-slate-900">{page.title}</td>
                              <td className="px-6 py-4 text-blue-600 text-sm">{page.url}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${page.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                  {page.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <Button variant="outline" size="sm" leftIcon={<ExternalLink size={14} />}>View</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {TEMPLATES.map(template => (
                        <div 
                          key={template.id}
                          onClick={() => handleCreateLandingPage(template.name)}
                          className="border border-slate-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group text-center"
                        >
                          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {template.icon}
                          </div>
                          <h3 className="font-bold text-slate-900 mb-2">{template.name}</h3>
                          <p className="text-sm text-slate-500">{template.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between">
                  {landingPageView === 'create' ? (
                    <Button variant="outline" onClick={() => setLandingPageView('list')}>Back to List</Button>
                  ) : (
                    <div />
                  )}
                  <Button variant="outline" onClick={() => setIsLandingPagesOpen(false)}>Close</Button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Event Detail Modal (Existing) */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Banner */}
                <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <div className="absolute bottom-4 left-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md border border-white/20`}>
                      {CATEGORIES.find(c => c.id === selectedEvent.category)?.label}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedEvent.title}</h2>
                      <div className="flex flex-col gap-2 text-slate-600">
                        <div className="flex items-center gap-2">
                          <Clock size={18} className="text-slate-400" />
                          <span>{selectedEvent.start.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={18} className="text-slate-400" />
                          <span>{selectedEvent.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Analytics Cards */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-sm text-blue-600 font-medium mb-1">Registered</p>
                      <p className="text-2xl font-bold text-blue-900">{selectedEvent.registered} <span className="text-sm font-normal text-blue-600">/ {selectedEvent.capacity}</span></p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                      <p className="text-sm text-green-600 font-medium mb-1">Revenue</p>
                      <p className="text-2xl font-bold text-green-900">${selectedEvent.revenue}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                      <p className="text-sm text-purple-600 font-medium mb-1">Attendance Rate</p>
                      <p className="text-2xl font-bold text-purple-900">--</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-slate-100">
                    <Button className="flex-1" leftIcon={<ExternalLink size={18} />}>View Landing Page</Button>
                    <Button variant="outline" className="flex-1" leftIcon={<Download size={18} />}>Export Attendees</Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
