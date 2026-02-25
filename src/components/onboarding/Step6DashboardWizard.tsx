import React from 'react';
import { Button } from '../ui/Button';
import { CheckCircle2, Upload, UserPlus, Calendar, Rocket, LayoutDashboard } from 'lucide-react';

interface Step6DashboardWizardProps {
  onFinish: () => void;
}

export const Step6DashboardWizard: React.FC<Step6DashboardWizardProps> = ({ onFinish }) => {
  const steps = [
    {
      icon: <Upload size={20} />,
      title: "Upload Logo & Branding",
      desc: "Customize the look of your portal",
      completed: false
    },
    {
      icon: <UserPlus size={20} />,
      title: "Invite First 10 Alumni",
      desc: "Add members via email or bulk import",
      completed: false
    },
    {
      icon: <Calendar size={20} />,
      title: "Create Your First Event",
      desc: "Schedule a reunion or meetup",
      completed: false
    },
    {
      icon: <Rocket size={20} />,
      title: "Explore Features",
      desc: "Take a tour of the admin tools",
      completed: false
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Dashboard Header Mockup */}
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={20} />
            <span className="font-bold">AlumniOne Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-blue-600 px-3 py-1 rounded-full text-xs font-medium">
               Trial: 14 Days Left
             </div>
             <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs">
               AD
             </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to your new dashboard!</h2>
            <p className="text-gray-600">Let's get your portal set up and ready for your community.</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Setup Progress</span>
              <span className="text-sm font-medium text-blue-600">0% Complete</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-0" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {steps.map((step, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group bg-white">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.desc}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-blue-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button onClick={onFinish}>
              Enter Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
