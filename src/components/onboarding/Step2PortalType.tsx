import React from 'react';
import { Button } from '../ui/Button';
import { School, Users, Building2, GraduationCap } from 'lucide-react';
import { PortalType } from './types';

interface Step2PortalTypeProps {
  selectedType: PortalType | null;
  onSelect: (type: PortalType) => void;
  onNext: () => void;
}

export const Step2PortalType: React.FC<Step2PortalTypeProps> = ({ selectedType, onSelect, onNext }) => {
  const types = [
    {
      id: 'educational',
      icon: <School size={32} />,
      title: 'Educational Institution',
      description: 'University, College, School, Training Institute'
    },
    {
      id: 'department',
      icon: <GraduationCap size={32} />,
      title: 'Department / Batch',
      description: 'Faculty, Program, Graduation Batch'
    },
    {
      id: 'corporate',
      icon: <Building2 size={32} />,
      title: 'Corporate Network',
      description: 'Company alumni, industry network'
    },
    {
      id: 'club',
      icon: <Users size={32} />,
      title: 'Club / Community',
      description: 'Student clubs, associations, small communities'
    }
  ];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What type of alumni portal are you creating?</h2>
        <p className="text-gray-600">Choose the category that best fits your organization.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {types.map((type) => (
          <div
            key={type.id}
            onClick={() => onSelect(type.id as PortalType)}
            className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center text-center hover:shadow-md ${
              selectedType === type.id
                ? 'border-blue-600 bg-blue-50/50'
                : 'border-gray-100 hover:border-blue-200 bg-white'
            }`}
          >
            <div className={`mb-4 p-3 rounded-full ${selectedType === type.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-500'}`}>
              {type.icon}
            </div>
            <h3 className={`font-bold mb-1 ${selectedType === type.id ? 'text-blue-900' : 'text-gray-900'}`}>{type.title}</h3>
            <p className="text-sm text-gray-500">{type.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button size="lg" onClick={onNext} disabled={!selectedType}>
          Next Step
        </Button>
      </div>
    </div>
  );
};
