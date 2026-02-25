import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  X, 
  Globe, 
  Shield, 
  CreditCard, 
  Mail, 
  MessageSquare, 
  Bot, 
  BarChart3, 
  ExternalLink,
  Zap,
  Lock,
  Smartphone,
  Database,
  Cloud,
  Code
} from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data for Integrations
const INTEGRATIONS = [
  {
    id: 'sendgrid',
    name: 'SendGrid',
    category: 'Email Services',
    description: 'Send transactional and campaign emails reliably.',
    logo: <Mail className="text-blue-500" size={32} />,
    status: 'Connected',
    fields: ['API Key', 'Sender Email']
  },
  {
    id: 'mailgun',
    name: 'Mailgun',
    category: 'Email Services',
    description: 'Powerful APIs that enable you to send, receive, and track email.',
    logo: <Mail className="text-red-500" size={32} />,
    status: 'Not Connected',
    fields: ['API Key', 'Domain']
  },
  {
    id: 'ses',
    name: 'Amazon SES',
    category: 'Email Services',
    description: 'Cost-effective, flexible, and scalable email service.',
    logo: <Cloud className="text-orange-500" size={32} />,
    status: 'Not Connected',
    fields: ['Access Key', 'Secret Key', 'Region']
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payment Gateways',
    description: 'Process event payments and donations globally.',
    logo: <CreditCard className="text-indigo-500" size={32} />,
    status: 'Connected',
    fields: ['Publishable Key', 'Secret Key']
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'Payment Gateways',
    description: 'Simple and secure payment solutions.',
    logo: <CreditCard className="text-blue-700" size={32} />,
    status: 'Not Connected',
    fields: ['Client ID', 'Client Secret']
  },
  {
    id: 'sslcommerz',
    name: 'SSLCommerz',
    category: 'Payment Gateways',
    description: 'Largest payment gateway in Bangladesh.',
    logo: <CreditCard className="text-green-600" size={32} />,
    status: 'Not Connected',
    fields: ['Store ID', 'Store Password']
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    category: 'Messaging',
    description: 'Connect with alumni via WhatsApp messages.',
    logo: <MessageSquare className="text-green-500" size={32} />,
    status: 'Not Connected',
    fields: ['API Token', 'Phone Number ID']
  },
  {
    id: 'twilio',
    name: 'Twilio',
    category: 'Messaging',
    description: 'Send SMS and voice messages globally.',
    logo: <Smartphone className="text-red-500" size={32} />,
    status: 'Not Connected',
    fields: ['Account SID', 'Auth Token', 'From Number']
  },
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'AI & Automation',
    description: 'Enhance content generation and smart segmentation.',
    logo: <Bot className="text-teal-600" size={32} />,
    status: 'Connected',
    fields: ['API Key', 'Organization ID']
  },
  {
    id: 'google_analytics',
    name: 'Google Analytics',
    category: 'Analytics & Tracking',
    description: 'Track user traffic and engagement.',
    logo: <BarChart3 className="text-orange-500" size={32} />,
    status: 'Connected',
    fields: ['Measurement ID']
  },
  {
    id: 'custom_domain',
    name: 'Custom Domain',
    category: 'Domain & Security',
    description: 'Use your own domain for the alumni portal.',
    logo: <Globe className="text-blue-600" size={32} />,
    status: 'Not Connected',
    fields: ['Domain Name']
  },
  {
    id: 'google_oauth',
    name: 'Google OAuth',
    category: 'Domain & Security',
    description: 'Allow alumni to sign in with Google.',
    logo: <Lock className="text-red-500" size={32} />,
    status: 'Connected',
    fields: ['Client ID', 'Client Secret']
  }
];

const CATEGORIES = [
  'Email Services',
  'Payment Gateways',
  'Messaging',
  'AI & Automation',
  'Analytics & Tracking',
  'Domain & Security'
];

export const Integrations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [integrations, setIntegrations] = useState(INTEGRATIONS);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleConnect = (integration: any) => {
    setSelectedIntegration(integration);
  };

  const handleSaveConnection = () => {
    setIsConnecting(true);
    // Simulate API call
    setTimeout(() => {
      setIntegrations(integrations.map(i => 
        i.id === selectedIntegration.id ? { ...i, status: 'Connected' } : i
      ));
      setIsConnecting(false);
      setSelectedIntegration(null);
      showToast(`${selectedIntegration.name} connected successfully`);
    }, 1500);
  };

  const handleDisconnect = () => {
    if (window.confirm(`Are you sure you want to disconnect ${selectedIntegration.name}?`)) {
      setIntegrations(integrations.map(i => 
        i.id === selectedIntegration.id ? { ...i, status: 'Not Connected' } : i
      ));
      setSelectedIntegration(null);
      showToast(`${selectedIntegration.name} disconnected`);
    }
  };

  const filteredIntegrations = integrations.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || 
                          (filterStatus === 'Connected' && item.status === 'Connected') ||
                          (filterStatus === 'Not Connected' && item.status === 'Not Connected');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 relative min-h-[600px]">
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
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <X size={18} />}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Integrations</h1>
            <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
              Prototype Mode – Integration Status Simulated
            </span>
          </div>
          <p className="text-slate-500 mt-1">Connect external services to power your alumni platform.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search integrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            <option value="Connected">Connected</option>
            <option value="Not Connected">Not Connected</option>
          </select>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="space-y-10">
        {CATEGORIES.map(category => {
          const categoryItems = filteredIntegrations.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryItems.map(item => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col h-full group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-white group-hover:border-blue-100 transition-colors">
                        {item.logo}
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{item.name}</h4>
                    <p className="text-sm text-slate-500 mb-6 flex-1">{item.description}</p>
                    
                    <Button 
                      variant={item.status === 'Connected' ? 'outline' : 'primary'} 
                      onClick={() => handleConnect(item)}
                      className="w-full"
                    >
                      {item.status === 'Connected' ? 'Configure' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Configuration Modal */}
      <AnimatePresence>
        {selectedIntegration && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIntegration(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                      {selectedIntegration.logo}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">{selectedIntegration.name}</h2>
                      <p className="text-xs text-slate-500">{selectedIntegration.category}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedIntegration(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {selectedIntegration.fields.map((field: string) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{field}</label>
                      <input 
                        type={field.toLowerCase().includes('secret') || field.toLowerCase().includes('password') || field.toLowerCase().includes('token') ? 'password' : 'text'} 
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder={`Enter ${field}`}
                        defaultValue={selectedIntegration.status === 'Connected' ? '****************' : ''}
                      />
                    </div>
                  ))}
                  
                  {selectedIntegration.status === 'Connected' && (
                    <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
                      <CheckCircle2 size={14} />
                      <span>Connection active. Last synced 2 mins ago.</span>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                  {selectedIntegration.status === 'Connected' ? (
                    <button 
                      onClick={handleDisconnect}
                      className="text-sm text-red-600 hover:text-red-700 font-medium px-2"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <div />
                  )}
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setSelectedIntegration(null)}>Cancel</Button>
                    <Button onClick={handleSaveConnection} disabled={isConnecting}>
                      {isConnecting ? 'Connecting...' : selectedIntegration.status === 'Connected' ? 'Save Changes' : 'Connect'}
                    </Button>
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
