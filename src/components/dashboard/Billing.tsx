import React, { useState } from 'react';
import { 
  Zap, 
  CreditCard, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  History, 
  FileText,
  ChevronRight,
  Shield,
  ZapOff
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'motion/react';

interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isCurrent: boolean;
  color: string;
}

const PLANS: Plan[] = [
  { 
    name: 'Starter', 
    price: '$49', 
    period: '/mo', 
    features: ['Up to 1,000 Alumni', '3 Admin Seats', 'Basic Analytics', 'Email Support'],
    isCurrent: false,
    color: 'bg-slate-50 border-slate-200'
  },
  { 
    name: 'Professional', 
    price: '$149', 
    period: '/mo', 
    features: ['Up to 10,000 Alumni', '10 Admin Seats', 'Advanced Analytics', 'Priority Support', 'Custom Branding'],
    isCurrent: true,
    color: 'bg-blue-50 border-blue-200 ring-2 ring-blue-500 ring-offset-2'
  },
  { 
    name: 'Enterprise', 
    price: 'Custom', 
    period: '', 
    features: ['Unlimited Alumni', 'Unlimited Admins', 'Full API Access', 'Dedicated Account Manager', 'SLA Guarantee'],
    isCurrent: false,
    color: 'bg-indigo-50 border-indigo-200'
  },
];

const INVOICES = [
  { id: 'INV-2024-001', date: 'Feb 1, 2024', amount: '$149.00', status: 'Paid' },
  { id: 'INV-2024-002', date: 'Jan 1, 2024', amount: '$149.00', status: 'Paid' },
  { id: 'INV-2023-012', date: 'Dec 1, 2023', amount: '$149.00', status: 'Paid' },
  { id: 'INV-2023-011', date: 'Nov 1, 2023', amount: '$149.00', status: 'Paid' },
];

export const Billing: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Billing & Subscription</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your university's subscription, payment methods, and billing history.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 font-bold text-sm">
          <CheckCircle2 size={18} />
          Subscription Active
        </div>
      </div>

      {/* Subscription Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Current Plan Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Current Plan</h3>
                <p className="text-sm text-slate-500">You are currently on the Professional Plan</p>
              </div>
              <Button variant="outline" size="sm">Change Plan</Button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Cost</p>
                <p className="text-2xl font-bold text-slate-900">$149.00</p>
                <p className="text-xs text-slate-500 mt-1">Next billing date: March 1, 2024</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Payment Method</p>
                <div className="flex items-center gap-2 text-slate-900 font-medium">
                  <CreditCard size={18} className="text-slate-400" />
                  <span>•••• 4242</span>
                </div>
                <button className="text-xs text-blue-600 font-bold mt-1 hover:underline">Update Method</button>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Usage Status</p>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Alumni Limit</span>
                  <span>6,355 / 10,000</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '63.55%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Available Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`p-5 rounded-xl border flex flex-col ${plan.color}`}>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-slate-900">{plan.name}</h4>
                  {plan.isCurrent && (
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded uppercase">Current</span>
                  )}
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-sm text-slate-500">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-xs text-slate-600 flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {!plan.isCurrent && (
                  <Button variant="outline" size="sm" className="w-full">
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Upgrade'}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Billing History & Payment */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <History size={20} className="text-slate-400" />
              Recent Invoices
            </h3>
            <div className="space-y-4">
              {INVOICES.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between group">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{invoice.id}</p>
                    <p className="text-xs text-slate-500">{invoice.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900">{invoice.amount}</span>
                    <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-6 text-blue-600" rightIcon={<ChevronRight size={16} />}>
              View All Invoices
            </Button>
          </div>

          <div className="bg-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <Shield size={32} className="mb-4 text-indigo-300" />
              <h4 className="text-lg font-bold mb-2">Need Enterprise Support?</h4>
              <p className="text-sm text-indigo-100 mb-6">Get dedicated support, custom contracts, and advanced security features.</p>
              <Button size="sm" className="bg-white text-indigo-900 hover:bg-indigo-50 border-none">
                Contact Sales
              </Button>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-800 rounded-full blur-2xl opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
};
