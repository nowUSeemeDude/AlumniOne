import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { OnboardingContainer } from './components/onboarding/OnboardingContainer';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { AlumniManagement } from './components/dashboard/AlumniManagement';
import { InviteAlumni } from './components/dashboard/InviteAlumni';
import { AlumniProfile } from './components/dashboard/AlumniProfile';
import { EventsCalendar } from './components/dashboard/EventsCalendar';
import { JobBoard } from './components/dashboard/JobBoard';
import { Companies } from './components/dashboard/Companies';
import { Communication } from './components/dashboard/Communication';
import { Integrations } from './components/dashboard/Integrations';
import { Analytics } from './components/dashboard/Analytics';
import { Finance } from './components/dashboard/Finance';
import { VotingModule } from './components/dashboard/VotingModule';
import { Settings } from './components/dashboard/Settings';
import { AlumniOnboarding } from './components/alumni/AlumniOnboarding';
import { AlumniWorkspaceLayout } from './components/alumni/AlumniWorkspaceLayout';
import { AlumniHome } from './components/alumni/AlumniHome';
import { AlumniCommunity } from './components/alumni/AlumniCommunity';
import { AlumniOpportunities } from './components/alumni/AlumniOpportunities';
import { AlumniEvents } from './components/alumni/AlumniEvents';
import { AlumniProfilePage } from './components/alumni/AlumniProfilePage';

type AppState = 'landing' | 'onboarding' | 'dashboard' | 'alumni-onboarding' | 'alumni-dashboard';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [activeDashboardTab, setActiveDashboardTab] = useState('dashboard');
  const [activeAlumniTab, setActiveAlumniTab] = useState('home');
  const [alumniProgress, setAlumniProgress] = useState(0);

  const handleStartTrial = () => setAppState('onboarding');
  const handleOnboardingComplete = () => setAppState('dashboard');
  const handleLogin = () => setAppState('dashboard');
  const handleAlumniLogin = () => setAppState('alumni-onboarding');
  const handleLogout = () => {
    setAppState('landing');
    setActiveAlumniTab('home');
  };

  const handleAlumniOnboardingComplete = (progress: number) => {
    setAlumniProgress(progress);
    setAppState('alumni-dashboard');
  };

  const renderAlumniContent = () => {
    switch (activeAlumniTab) {
      case 'home':
        return <AlumniHome progress={alumniProgress} onEditProfile={() => setActiveAlumniTab('profile')} />;
      case 'community':
        return <AlumniCommunity />;
      case 'opportunities':
        return <AlumniOpportunities />;
      case 'events':
        return <AlumniEvents />;
      case 'profile':
        return <AlumniProfilePage />;
      default:
        return <AlumniHome progress={alumniProgress} onEditProfile={() => setActiveAlumniTab('profile')} />;
    }
  };

  const renderDashboardContent = () => {
    switch (activeDashboardTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'alumni':
        return <AlumniManagement onNavigate={setActiveDashboardTab} />;
      case 'alumni-profile':
        return <AlumniProfile onBack={() => setActiveDashboardTab('alumni')} />;
      case 'events':
        return <EventsCalendar />;
      case 'jobs':
        return <JobBoard />;
      case 'companies':
        return <Companies />;
      case 'communication':
        return <Communication />;
      case 'analytics':
        return <Analytics />;
      case 'finance':
        return <Finance />;
      case 'voting':
        return <VotingModule />;
      case 'integrations':
        return <Integrations />;
      case 'invite-alumni':
        return <InviteAlumni onBack={() => setActiveDashboardTab('alumni')} />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="flex items-center justify-center h-96 text-slate-500">
            <p>Module coming soon...</p>
          </div>
        );
    }
  };

  return (
    <>
      {appState === 'landing' && (
        <LandingPage 
          onStartTrial={handleStartTrial} 
          onLogin={handleLogin} 
          onAlumniLogin={handleAlumniLogin}
        />
      )}
      
      {appState === 'onboarding' && (
        <OnboardingContainer onCancel={handleOnboardingComplete} />
      )}

      {appState === 'alumni-onboarding' && (
        <AlumniOnboarding 
          onComplete={handleAlumniOnboardingComplete} 
          onSkip={() => handleAlumniOnboardingComplete(45)} 
        />
      )}

      {appState === 'alumni-dashboard' && (
        <AlumniWorkspaceLayout 
          activeTab={activeAlumniTab}
          onTabChange={setActiveAlumniTab}
          onLogout={handleLogout}
        >
          {renderAlumniContent()}
        </AlumniWorkspaceLayout>
      )}

      {appState === 'dashboard' && (
        <DashboardLayout 
          activeTab={activeDashboardTab} 
          onTabChange={setActiveDashboardTab}
          onLogout={handleLogout}
        >
          {renderDashboardContent()}
        </DashboardLayout>
      )}
    </>
  );
}
