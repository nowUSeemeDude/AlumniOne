import React, { useState } from 'react';
import { 
  Shield, 
  Globe, 
  Users, 
  CreditCard, 
  Settings, 
  Activity, 
  Lock, 
  Zap, 
  BarChart3, 
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Server,
  Database,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SystemAdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  userName?: string;
}

export const SystemAdminLayout: React.FC<SystemAdminLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange,
  onLogout,
  userName = 'System Superuser'
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Platform Overview', icon: <Activity size={20} /> },
    { id: 'universities', label: 'Universities', icon: <Globe size={20} /> },
    { id: 'users', label: 'Global Users', icon: <Users size={20} /> },
    { id: 'subscriptions', label: 'Plans & Billing', icon: <CreditCard size={20} /> },
    { id: 'features', label: 'Feature Flags', icon: <Zap size={20} /> },
    { id: 'analytics', label: 'Global Analytics', icon: <BarChart3 size={20} /> },
    { id: 'security', label: 'Security & Logs', icon: <Lock size={20} /> },
    { id: 'settings', label: 'Platform Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="h-screen bg-slate-950 flex font-sans text-slate-200 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Shield size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">System Admin</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Main Menu</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2">
              <Server size={14} />
              <span>SYSTEM STATUS</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-500">API Latency</span>
                <span className="text-emerald-400">24ms</span>
              </div>
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[15%]" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-400">
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg border border-slate-700">
              <Search size={16} className="text-slate-500" />
              <input 
                type="text" 
                placeholder="Global Search..." 
                className="bg-transparent border-none outline-none text-sm text-slate-300 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 mr-4 border-r border-slate-800 pr-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Database</span>
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                  <Database size={10} /> Connected
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Environment</span>
                <span className="text-xs font-medium text-blue-400">Production</span>
              </div>
            </div>

            <button className="relative p-2 text-slate-400 hover:bg-slate-800 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-900"></span>
            </button>

            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-800 transition-colors"
              >
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {userName.split(' ').map(n => n[0]).join('')}
                </div>
                <ChevronDown size={16} className="text-slate-500" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-40"
                    >
                      <div className="px-4 py-2 border-b border-slate-800">
                        <p className="text-sm font-bold text-white">{userName}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Super Administrator</p>
                      </div>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-2">
                        <Terminal size={14} /> System Console
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors">
                        Account Settings
                      </button>
                      <div className="border-t border-slate-800 mt-2 pt-2">
                        <button 
                          onClick={onLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors flex items-center gap-2"
                        >
                          <LogOut size={16} /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
