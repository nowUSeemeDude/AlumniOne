import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { PortalType, OnboardingData } from './types';
import { Check, X } from 'lucide-react';

interface Step4AdminSetupProps {
  portalType: PortalType;
  data: OnboardingData['adminDetails'];
  onChange: (data: Partial<OnboardingData['adminDetails']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step4AdminSetup: React.FC<Step4AdminSetupProps> = ({ portalType, data, onChange, onNext, onBack }) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });

    if (name === 'email') {
      validateEmail(value);
    }
  };

  const validateEmail = (email: string) => {
    if (portalType === 'educational') {
      const publicDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      const domain = email.split('@')[1];
      if (domain && publicDomains.includes(domain)) {
        setEmailError('Please use an official institution email address.');
      } else {
        setEmailError('');
      }
    } else {
      setEmailError('');
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const strength = getPasswordStrength(data.password);
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  const isValid = 
    data.fullName && 
    data.email && 
    !emailError && 
    data.password && 
    data.password.length >= 8 && 
    data.password === confirmPassword;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Admin Account</h2>
        <p className="text-gray-600">You'll use these credentials to manage the portal.</p>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-all ${emailError ? 'border-red-300 focus:ring-red-200 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
            placeholder="john@institution.edu"
          />
          {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="••••••••"
          />
          {data.password && (
            <div className="mt-2">
              <div className="flex gap-1 h-1 mb-1">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-full transition-colors ${i < strength ? strengthColors[strength - 1] : 'bg-gray-200'}`} 
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 text-right">{strength > 0 ? strengthLabels[strength - 1] : ''}</p>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="••••••••"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" onClick={onNext} disabled={!isValid}>
          Create Account
        </Button>
      </div>
    </div>
  );
};
