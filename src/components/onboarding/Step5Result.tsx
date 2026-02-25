import React from 'react';
import { Button } from '../ui/Button';
import { PortalType } from './types';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface Step5ResultProps {
  portalType: PortalType;
  orgName: string;
  onNext: () => void;
}

export const Step5Result: React.FC<Step5ResultProps> = ({ portalType, orgName, onNext }) => {
  const isPending = portalType === 'educational';
  const subdomain = orgName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.alumnione.bd';

  return (
    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isPending ? 'bg-amber-50 text-amber-500' : 'bg-green-50 text-green-500'}`}
      >
        {isPending ? <Clock size={40} /> : <CheckCircle2 size={40} />}
      </motion.div>

      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        {isPending ? 'Request Submitted for Review' : 'Your Alumni Portal is Ready!'}
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {isPending 
          ? "Because you selected an Educational Institution, our team needs to verify your official status. This usually takes less than 24 hours." 
          : "Your organization has been set up successfully. You can now access your dashboard and start inviting members."}
      </p>

      {isPending ? (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          Status: Pending Approval
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8 inline-block">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Your Portal URL</p>
          <p className="text-blue-600 font-mono font-medium">{subdomain}</p>
        </div>
      )}

      <div>
        <Button size="xl" onClick={onNext} rightIcon={<ArrowRight size={20} />}>
          {isPending ? 'Go to Dashboard (Limited Access)' : 'Go to Dashboard'}
        </Button>
      </div>
    </div>
  );
};
