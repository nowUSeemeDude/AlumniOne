import React from 'react';
import { Section } from './ui/Section';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Briefcase, 
  Heart, 
  MessageCircle, 
  BarChart3, 
  Shield 
} from 'lucide-react';
import { motion } from 'motion/react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <LayoutDashboard size={24} />,
      title: "Admin Dashboard",
      description: "Get a bird's-eye view of your community health, engagement metrics, and recent activities."
    },
    {
      icon: <Users size={24} />,
      title: "Alumni Directory",
      description: "Powerful search and filtering to help alumni find classmates, mentors, and networking opportunities."
    },
    {
      icon: <Calendar size={24} />,
      title: "Events Management",
      description: "Create, promote, and manage reunions, webinars, and meetups with integrated ticketing."
    },
    {
      icon: <Briefcase size={24} />,
      title: "Job Board",
      description: "Exclusive career opportunities posted by alumni and partner companies."
    },
    {
      icon: <Heart size={24} />,
      title: "Donation Module",
      description: "Accept donations easily via bKash, Nagad, Rocket, and Bank Cards with automated receipts."
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Messaging & Forums",
      description: "Private messaging and interest-based groups to foster deeper connections."
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Advanced Analytics",
      description: "Track engagement trends, event attendance, and fundraising performance."
    },
    {
      icon: <Shield size={24} />,
      title: "Role-Based Access",
      description: "Granular permissions for admins, chapter leaders, and alumni members."
    }
  ];

  return (
    <Section background="gray" id="features">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Features</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
          Everything You Need to Succeed
        </h2>
        <p className="text-lg text-gray-600">
          Powerful tools designed specifically for alumni relations and community building.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 group"
          >
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
