import React, { useState } from 'react';
import { OnboardingLayout } from './OnboardingLayout';
import { Step1Welcome } from './Step1Welcome';
import { Step2PortalType } from './Step2PortalType';
import { Step3OrgDetails } from './Step3OrgDetails';
import { Step4AdminSetup } from './Step4AdminSetup';
import { Step5Result } from './Step5Result';
import { Step6DashboardWizard } from './Step6DashboardWizard';
import { OnboardingData, PortalType } from './types';

interface OnboardingContainerProps {
  onCancel: () => void;
}

export const OnboardingContainer: React.FC<OnboardingContainerProps> = ({ onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    portalType: null,
    orgDetails: {
      name: '',
      country: 'Bangladesh',
    },
    adminDetails: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (section: keyof OnboardingData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const handlePortalTypeSelect = (type: PortalType) => {
    setFormData((prev) => ({ ...prev, portalType: type }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Welcome onNext={nextStep} />;
      case 2:
        return (
          <Step2PortalType
            selectedType={formData.portalType}
            onSelect={handlePortalTypeSelect}
            onNext={nextStep}
          />
        );
      case 3:
        return (
          <Step3OrgDetails
            portalType={formData.portalType!}
            data={formData.orgDetails}
            onChange={(data) => updateFormData('orgDetails', data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <Step4AdminSetup
            portalType={formData.portalType!}
            data={formData.adminDetails}
            onChange={(data) => updateFormData('adminDetails', data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <Step5Result
            portalType={formData.portalType!}
            orgName={formData.orgDetails.name || formData.orgDetails.departmentName || 'Organization'}
            onNext={nextStep}
          />
        );
      case 6:
        return <Step6DashboardWizard onFinish={onCancel} />;
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout currentStep={step} totalSteps={6}>
      {renderStep()}
    </OnboardingLayout>
  );
};
