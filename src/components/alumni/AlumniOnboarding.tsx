import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Camera, 
  Linkedin, 
  MapPin, 
  Calendar,
  ChevronRight,
  Plus,
  X,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/Button';

interface AlumniOnboardingProps {
  onComplete: (percentage: number) => void;
  onSkip: () => void;
}

export const AlumniOnboarding: React.FC<AlumniOnboardingProps> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profilePhoto: '',
    location: '',
    linkedin: '',
    employmentStatus: '',
    company: '',
    university: '',
    businessName: '',
    skills: [] as string[],
    expertise: '',
    willingToMentor: false
  });

  const [skillInput, setSkillInput] = useState('');

  // Weighted scoring
  const calculateProgress = () => {
    let score = 0;
    if (formData.profilePhoto) score += 15;
    if (formData.location) score += 10;
    if (formData.linkedin) score += 10;
    if (formData.employmentStatus) score += 20;
    if (formData.company || formData.university || formData.businessName) score += 20;
    if (formData.skills.length > 0) score += 15;
    if (formData.expertise) score += 10;
    
    return Math.min(score, 100);
  };

  const progress = calculateProgress() + 20; // +20 for pre-filled academic info

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const isSectionComplete = (section: number) => {
    switch (section) {
      case 1: return !!(formData.location && formData.linkedin);
      case 2: return true; // Pre-filled
      case 3: return !!(formData.employmentStatus && (formData.company || formData.university || formData.businessName));
      case 4: return formData.skills.length > 0 && !!formData.expertise;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Build Your Alumni Profile</h1>
          <p className="text-slate-500">Complete at least 60% to unlock full access.</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-slate-700">Overall Progress</span>
            <span className={`text-sm font-bold ${progress >= 60 ? 'text-green-600' : 'text-blue-600'}`}>
              {progress}%
            </span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={`h-full rounded-full transition-all duration-500 ${
                progress >= 60 ? 'bg-green-500' : 'bg-blue-600'
              }`}
            />
          </div>
          
          {progress < 60 && (
            <div className="mt-4 flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
              <AlertCircle size={16} />
              <p className="text-xs font-medium">You need {60 - progress}% more to unlock the workspace.</p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar Checklist */}
          <div className="lg:col-span-1 space-y-4">
            {[
              { id: 1, label: 'Personal Information', icon: <User size={18} /> },
              { id: 2, label: 'Academic Information', icon: <GraduationCap size={18} /> },
              { id: 3, label: 'Career Information', icon: <Briefcase size={18} /> },
              { id: 4, label: 'Skills & Interests', icon: <Award size={18} /> },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setStep(s.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                  step === s.id 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  {s.icon}
                  <span className="text-sm font-bold">{s.label}</span>
                </div>
                {isSectionComplete(s.id) && (
                  <CheckCircle2 size={18} className={step === s.id ? 'text-white' : 'text-green-500'} />
                )}
              </button>
            ))}

            <div className="pt-4">
              <Button 
                className="w-full py-6 text-lg shadow-lg" 
                disabled={progress < 60}
                onClick={() => onComplete(progress)}
                rightIcon={<ArrowRight size={20} />}
              >
                Enter Alumni Workspace
              </Button>
              <div className="text-center mt-4 space-y-2">
                <button 
                  onClick={onSkip}
                  className="text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium"
                >
                  Skip for Prototype
                </button>
                <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  Prototype Mode – Profile Completion Simulated
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[500px]"
              >
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                    
                    <div className="flex flex-col items-center gap-4 py-4">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 overflow-hidden">
                          {formData.profilePhoto ? (
                            <img src={formData.profilePhoto} className="w-full h-full object-cover" alt="Profile" />
                          ) : (
                            <Camera size={32} />
                          )}
                        </div>
                        <button 
                          onClick={() => setFormData({...formData, profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256'})}
                          className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500">Upload a professional profile photo</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Current Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input 
                            type="text" 
                            placeholder="e.g. Dhaka, Bangladesh"
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL</label>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0077b5]" size={18} />
                          <input 
                            type="url" 
                            placeholder="linkedin.com/in/username"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-slate-900">Academic Information</h2>
                      <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded">Verified</span>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
                      <ShieldCheck className="text-blue-600 mt-0.5" size={20} />
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Academic information is pre-filled from university records and cannot be modified.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 border border-slate-100 rounded-lg bg-slate-50/50">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Student ID</label>
                        <p className="text-slate-900 font-mono font-medium">18101010</p>
                      </div>
                      <div className="p-4 border border-slate-100 rounded-lg bg-slate-50/50">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Department</label>
                        <p className="text-slate-900 font-medium">Computer Science & Engineering</p>
                      </div>
                      <div className="p-4 border border-slate-100 rounded-lg bg-slate-50/50">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Batch</label>
                        <p className="text-slate-900 font-medium">2018</p>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900">Career Information</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Current Employment Status</label>
                      <select 
                        value={formData.employmentStatus}
                        onChange={(e) => setFormData({...formData, employmentStatus: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      >
                        <option value="">Select Status</option>
                        <option value="Employed">Employed</option>
                        <option value="Higher Study">Higher Study</option>
                        <option value="Business">Business / Entrepreneur</option>
                        <option value="Job Seeking">Job Seeking</option>
                      </select>
                    </div>

                    {formData.employmentStatus === 'Employed' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Google, Pathao"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                        />
                      </motion.div>
                    )}

                    {formData.employmentStatus === 'Higher Study' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <label className="block text-sm font-medium text-slate-700 mb-1">University Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Georgia Tech, MIT"
                          value={formData.university}
                          onChange={(e) => setFormData({...formData, university: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                        />
                      </motion.div>
                    )}

                    {formData.employmentStatus === 'Business' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. My Startup Ltd."
                          value={formData.businessName}
                          onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                        />
                      </motion.div>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900">Skills & Interests</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Skills</label>
                      <div className="flex gap-2 mb-3">
                        <input 
                          type="text" 
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                          placeholder="Add a skill (e.g. React, Python)"
                          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                        />
                        <Button onClick={handleAddSkill} variant="outline">Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map(skill => (
                          <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100">
                            {skill}
                            <button onClick={() => removeSkill(skill)} className="hover:text-blue-900">
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Areas of Expertise</label>
                      <textarea 
                        rows={3}
                        placeholder="Briefly describe your core expertise..."
                        value={formData.expertise}
                        onChange={(e) => setFormData({...formData, expertise: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">Willing to Mentor</p>
                        <p className="text-xs text-slate-500">Allow others to see you are available for mentorship.</p>
                      </div>
                      <div 
                        onClick={() => setFormData({...formData, willingToMentor: !formData.willingToMentor})}
                        className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${formData.willingToMentor ? 'bg-blue-600' : 'bg-slate-300'}`}
                      >
                        <motion.div 
                          animate={{ x: formData.willingToMentor ? 24 : 4 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-12 flex justify-between items-center">
                  <button 
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                    className="text-sm font-bold text-slate-500 hover:text-slate-900 disabled:opacity-0 transition-all"
                  >
                    Back
                  </button>
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(Math.min(4, step + 1))}
                    disabled={step === 4}
                    rightIcon={<ChevronRight size={18} />}
                  >
                    Next Section
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

