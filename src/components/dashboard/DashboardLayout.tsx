import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Briefcase, 
  MessageSquare,
  BarChart3, 
  Settings, 
  HelpCircle, 
  Bell, 
  Search, 
  ChevronDown, 
  Menu,
  X,
  LogOut,
  Zap,
  DollarSign,
  Building2,
  GraduationCap,
  CheckCircle2,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange,
  onLogout
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentSpace, setCurrentSpace] = useState('CSE Department');
  const [isSpaceSelectorOpen, setIsSpaceSelectorOpen] = useState(false);

  const spaces = ['CSE Department', 'Business School', 'EEE Department', 'Pharmacy Department'];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'alumni', label: 'Alumni Directory', icon: <Users size={20} /> },
    { id: 'events', label: 'Events', icon: <Calendar size={20} /> },
    { id: 'jobs', label: 'Jobs & Careers', icon: <Briefcase size={20} /> },
    { id: 'companies', label: 'Companies', icon: <Building2 size={20} /> },
    { id: 'communication', label: 'Communication', icon: <MessageSquare size={20} /> },
    { id: 'finance', label: 'Finance', icon: <DollarSign size={20} /> },
    { id: 'voting', label: 'Voting', icon: <CheckCircle2 size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Space Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="h-screen bg-slate-50 flex font-sans text-slate-900 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isDesktopCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-slate-200 flex flex-col h-full ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className={`h-16 flex items-center border-b border-slate-100 ${isDesktopCollapsed ? 'justify-center px-0' : 'px-6'}`}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="/src/assets/logo.svg" 
                alt="AlumniOne Logo" 
                className="h-14 w-auto shrink-0" 
              />
              {!isDesktopCollapsed && (
                <span className="absolute bottom-1 right-2 text-[8px] text-amber-600 font-bold bg-amber-50 px-1 rounded border border-amber-100">PROTOTYPE</span>
              )}
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="ml-auto lg:hidden text-slate-400 hover:text-slate-600 absolute right-4"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 space-y-1 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative group ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              } ${isDesktopCollapsed ? 'justify-center' : ''}`}
              title={isDesktopCollapsed ? item.label : ''}
            >
              <div className="shrink-0">{item.icon}</div>
              {!isDesktopCollapsed && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
              {isDesktopCollapsed && activeTab === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
              )}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 space-y-2">
          <button 
            onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
            className={`hidden lg:flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors ${isDesktopCollapsed ? 'justify-center' : ''}`}
          >
            {isDesktopCollapsed ? <ChevronDown size={20} className="rotate-[-90deg]" /> : <Menu size={20} className="rotate-90" />}
            {!isDesktopCollapsed && <span>Collapse Sidebar</span>}
          </button>
          
          <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors ${isDesktopCollapsed ? 'justify-center' : ''}`}>
            <HelpCircle size={20} />
            {!isDesktopCollapsed && <span>Help & Support</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-slate-500 hover:text-slate-700"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <button 
                  onClick={() => setIsSpaceSelectorOpen(!isSpaceSelectorOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200 group"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider leading-none mb-1">Space Admin</span>
                    <span className="text-sm font-bold text-slate-900 leading-none">{currentSpace}</span>
                  </div>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${isSpaceSelectorOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isSpaceSelectorOpen && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setIsSpaceSelectorOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-40"
                      >
                        <p className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Switch Space</p>
                        {spaces.map(space => (
                          <button
                            key={space}
                            onClick={() => {
                              setCurrentSpace(space);
                              setIsSpaceSelectorOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                              currentSpace === space 
                                ? 'bg-blue-50 text-blue-700 font-bold' 
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {space}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="hidden lg:flex items-center gap-2 px-2 py-1 bg-amber-50 border border-amber-100 rounded-md">
                <Shield size={14} className="text-amber-600" />
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Space-Level Access</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden xl:flex flex-col items-end mr-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prototype Mode</span>
              <span className="text-[10px] font-medium text-slate-500">Space Data Simulated</span>
            </div>

            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
              >
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                  JD
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-slate-900 leading-none">John Doe</p>
                  <p className="text-xs text-slate-500 mt-0.5">Admin</p>
                </div>
                <ChevronDown size={16} className="text-slate-400 ml-1" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-40"
                    >
                      <div className="px-4 py-2 border-b border-slate-50">
                        <p className="text-sm font-medium text-slate-900">BRAC University</p>
                        <p className="text-xs text-slate-500">Administrator</p>
                      </div>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        Profile Settings
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        Billing
                      </button>
                      <div className="border-t border-slate-50 mt-1">
                        <button 
                          onClick={onLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                          <LogOut size={16} />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8 flex flex-col">
          <div className="max-w-7xl mx-auto w-full flex-1">
            {children}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-400">
              Developed by <span className="font-medium text-slate-500">Notionhive</span>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};
