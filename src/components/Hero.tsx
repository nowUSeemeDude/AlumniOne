import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, BarChart3, Users, DollarSign, Calendar, CheckSquare, PieChart, Bell, Search, Moon, Info, User } from 'lucide-react';
import { Button } from './ui/Button';

interface HeroProps {
  onStartTrial?: () => void;
  onLogin?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartTrial }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50/50">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full bg-blue-100/40 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 text-sm font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-100 shadow-sm">
              Proudly Built for Bangladesh
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Connect Every <br />
              <span className="text-slate-900">
                Alumni in Bangladesh
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              A structured alumni management system for universities, colleges, and associations to manage alumni data, organize events, share opportunities, and collect donations all in one centralized platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 text-base bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20" 
                onClick={onStartTrial}
              >
                Start Free Trial <ChevronRight className="ml-1" size={18} />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
            {/* Dashboard Header */}
            <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
                <span className="font-bold text-slate-900">AlumniOne</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 w-64">
                  <Search size={16} className="text-slate-400 mr-2" />
                  <span className="text-sm text-slate-400">Search</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Bell size={20} />
                  <Moon size={20} />
                  <Info size={20} />
                  <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                    <img src="https://picsum.photos/seed/user/200/200" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex bg-slate-50 min-h-[600px]">
              {/* Sidebar */}
              <div className="w-64 bg-white border-r border-slate-100 hidden md:block p-4 space-y-1">
                <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
                  <BarChart3 size={20} /> Dashboard
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg font-medium">
                  <Users size={20} /> Alumni Directory
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg font-medium">
                  <Calendar size={20} /> Events
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg font-medium">
                  <DollarSign size={20} /> Donations
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg font-medium">
                  <CheckSquare size={20} /> Jobs Board
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-8 overflow-hidden">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
                  <p className="text-slate-500">Overview of your alumni network performance</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: 'Total Alumni', value: '12,450', change: '+12%', icon: <Users className="text-blue-600" />, bg: 'bg-blue-50' },
                    { label: 'Total Donations', value: '$45,200', change: '+8.4%', icon: <DollarSign className="text-emerald-600" />, bg: 'bg-emerald-50' },
                    { label: 'Events Hosted', value: '24', change: '+2', icon: <Calendar className="text-purple-600" />, bg: 'bg-purple-50' },
                    { label: 'Active Jobs', value: '86', change: '+14', icon: <CheckSquare className="text-amber-600" />, bg: 'bg-amber-50' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl ${stat.bg}`}>
                          {stat.icon}
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-slate-900">Weekly Engagement</h3>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <BarChart3 size={16} className="text-slate-400" />
                      </div>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-2 px-2">
                      {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95].map((h, i) => (
                        <div key={i} className="w-full bg-blue-50 rounded-t-lg relative group">
                          <div 
                            className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-lg transition-all duration-500"
                            style={{ height: `${h}%` }} 
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-400 font-medium uppercase">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Alumni Distribution</h3>
                    <div className="relative h-48 w-48 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full border-[16px] border-blue-500 border-r-transparent rotate-45" />
                      <div className="absolute inset-0 rounded-full border-[16px] border-indigo-400 border-l-transparent border-b-transparent rotate-[135deg]" />
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-2xl font-bold text-slate-900">65%</span>
                        <span className="text-xs text-slate-500">Active</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <span className="text-slate-600">Engineering</span>
                        </div>
                        <span className="font-bold text-slate-900">45%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-indigo-400" />
                          <span className="text-slate-600">Business</span>
                        </div>
                        <span className="font-bold text-slate-900">35%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
