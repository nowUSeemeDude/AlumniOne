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
import { SpaceManagement } from './components/dashboard/SpaceManagement';
import { Billing } from './components/dashboard/Billing';
import { AlumniOnboarding } from './components/alumni/AlumniOnboarding';
import { AlumniWorkspaceLayout } from './components/alumni/AlumniWorkspaceLayout';
import { AlumniHome } from './components/alumni/AlumniHome';
import { AlumniCommunity } from './components/alumni/AlumniCommunity';
import { AlumniOpportunities } from './components/alumni/AlumniOpportunities';
import { AlumniEvents } from './components/alumni/AlumniEvents';
import { AlumniProfilePage } from './components/alumni/AlumniProfilePage';
import { LoginModal } from './components/auth/LoginModal';
import { authService, User } from './services/authService';

type AppState = 'landing' | 'onboarding' | 'dashboard' | 'alumni-onboarding' | 'alumni-dashboard' | 'system-admin' | 'university-admin';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(authService.getCurrentUser());
  const [activeDashboardTab, setActiveDashboardTab] = useState('dashboard');
  const [activeAlumniTab, setActiveAlumniTab] = useState('home');
  const [alumniProgress, setAlumniProgress] = useState(0);

  const handleStartTrial = () => setAppState('onboarding');
  const handleOnboardingComplete = () => setAppState('dashboard');
  
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    switch (user.role) {
      case 'SYSTEM_ADMIN':
        setAppState('dashboard'); // For now using same dashboard but role-filtered
        break;
      case 'UNIVERSITY_ADMIN':
        setAppState('dashboard');
        break;
      case 'SPACE_ADMIN':
        setAppState('dashboard');
        break;
      case 'ALUMNI':
        setAppState('alumni-onboarding');
        break;
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
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
    const userRole = currentUser?.role || 'SPACE_ADMIN';

    switch (activeDashboardTab) {
      case 'dashboard':
        return <DashboardHome userRole={userRole} />;
      case 'alumni':
        return <AlumniManagement onNavigate={setActiveDashboardTab} userRole={userRole} />;
      case 'alumni-profile':
        return <AlumniProfile onBack={() => setActiveDashboardTab('alumni')} />;
      case 'events':
        return <EventsCalendar userRole={userRole} />;
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
      case 'spaces':
        return <SpaceManagement />;
      case 'billing':
        return <Billing />;
      case 'settings':
        return <Settings userRole={userRole} />;
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
          onLogin={() => setIsLoginModalOpen(true)} 
        />
      )}

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
      
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
          userRole={currentUser?.role || 'SPACE_ADMIN'}
          userName={currentUser?.name || 'Admin'}
        >
          {renderDashboardContent()}
        </DashboardLayout>
      )}
    </>
  );
}
