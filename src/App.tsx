import { useState, useEffect } from 'react';
import { AttractMode } from './components/AttractMode';
import { MainMenu } from './components/MainMenu';
import { ProgramsLanding } from './components/ProgramsLanding';
import { ProgramDetail } from './components/ProgramDetail';
import { DirectoryLanding } from './components/DirectoryLanding';
import { FloorSelection } from './components/FloorSelection';
import { FloorMap } from './components/FloorMap';
import { Floor1ListView } from './components/Floor1ListView';
import { Floor2ListView } from './components/Floor2ListView';
import { RoomDetail } from './components/RoomDetail';
import { NameSearch } from './components/NameSearch';
import { SearchResults } from './components/SearchResults';
import { JobsLanding } from './components/JobsLanding';
import { JobsListings } from './components/JobsListings';
import { JobDetail } from './components/JobDetail';
import { SurveyIntro } from './components/SurveyIntro';
import { SurveyQuestion } from './components/SurveyQuestion';
import { SurveyThankYou } from './components/SurveyThankYou';
import { EventsLanding } from './components/EventsLanding';
import { EventDetail } from './components/EventDetail';
import { WebsiteBrowser } from './components/WebsiteBrowser';
import { clearRoomCache } from './data/roomDataLoader';

type ViewType = 
  | 'attract' 
  | 'menu' 
  | 'programs' 
  | 'program-detail'
  | 'directory'
  | 'floor-selection'
  | 'floor-map'
  | 'floor1-list'
  | 'floor2-list'
  | 'room-detail'
  | 'name-search'
  | 'search-results'
  | 'jobs' 
  | 'jobs-listings'
  | 'job-detail'
  | 'survey-intro'
  | 'survey-question'
  | 'survey-thanks'
  | 'events'
  | 'event-detail'
  | 'website';

interface ViewState {
  view: ViewType;
  data?: any;
}

export default function App() {
  const [viewStack, setViewStack] = useState<ViewState[]>([{ view: 'attract' }]);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [showInactivityWarning, setShowInactivityWarning] = useState(false);

  const currentView = viewStack[viewStack.length - 1];

  // Clear room cache on app mount to ensure fresh data
  useEffect(() => {
    console.log('🔄 App mounted - clearing room cache to fetch fresh data');
    clearRoomCache();
  }, []);

  // Auto-return to attract mode after inactivity
  useEffect(() => {
    const handleInteraction = () => {
      setLastInteraction(Date.now());
      setShowInactivityWarning(false);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keypress', handleInteraction);

    const interval = setInterval(() => {
      const idleTime = Date.now() - lastInteraction;
      
      // Show warning at 2 minutes (120 seconds)
      if (idleTime > 120000 && idleTime < 135000 && currentView.view !== 'attract') {
        setShowInactivityWarning(true);
      }
      
      // Return to attract at 2 minutes 15 seconds (135 seconds)
      if (idleTime > 135000 && currentView.view !== 'attract') {
        setViewStack([{ view: 'attract' }]);
        setShowInactivityWarning(false);
      }
    }, 1000);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keypress', handleInteraction);
      clearInterval(interval);
    };
  }, [lastInteraction, currentView.view]);

  const navigate = (view: ViewType, data?: any) => {
    setViewStack([...viewStack, { view, data }]);
    setLastInteraction(Date.now());
    setShowInactivityWarning(false);
  };

  const goBack = () => {
    if (viewStack.length > 1) {
      setViewStack(viewStack.slice(0, -1));
    }
    setLastInteraction(Date.now());
    setShowInactivityWarning(false);
  };

  const goHome = () => {
    setViewStack([{ view: 'menu' }]);
    setLastInteraction(Date.now());
    setShowInactivityWarning(false);
  };

  const goToAttract = () => {
    setViewStack([{ view: 'attract' }]);
    setLastInteraction(Date.now());
    setShowInactivityWarning(false);
  };

  const canGoBack = viewStack.length > 1;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center md:p-4">
      {/* Kiosk Container - Responsive: full screen on mobile, 540x960 on desktop/kiosk */}
      <div className="relative bg-white w-full h-screen md:w-[540px] md:h-[960px] md:shadow-2xl" style={{ overflow: 'hidden' }}>
        {currentView.view === 'attract' && <AttractMode onTouch={() => navigate('menu')} />}
        {currentView.view === 'menu' && <MainMenu onNavigate={navigate} onWelcome={goToAttract} />}
        {currentView.view === 'programs' && <ProgramsLanding onNavigate={navigate} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'program-detail' && <ProgramDetail program={currentView.data} onNavigate={navigate} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'directory' && <DirectoryLanding onNavigate={navigate} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'floor-selection' && <FloorSelection onNavigate={navigate} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'floor-map' && <FloorMap floor={currentView.data} onNavigate={navigate} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'floor1-list' && <Floor1ListView onNavigate={navigate} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'floor2-list' && <Floor2ListView onNavigate={navigate} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'room-detail' && <RoomDetail room={currentView.data} onNavigate={navigate} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'name-search' && <NameSearch onNavigate={navigate} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'search-results' && <SearchResults query={currentView.data} onNavigate={navigate} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'jobs' && <JobsLanding onNavigate={navigate} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'jobs-listings' && <JobsListings onNavigate={navigate} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'job-detail' && <JobDetail job={currentView.data} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'survey-intro' && <SurveyIntro onNavigate={navigate} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'survey-question' && <SurveyQuestion onNavigate={navigate} onBack={goBack} onHome={goHome} onWelcome={goToAttract} />}
        {currentView.view === 'survey-thanks' && <SurveyThankYou onNavigate={navigate} onHome={goHome} onWelcome={goToAttract} />}
        {currentView.view === 'events' && <EventsLanding onNavigate={navigate} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'event-detail' && <EventDetail event={currentView.data} onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}
        {currentView.view === 'website' && <WebsiteBrowser onBack={goBack} onHome={goHome} onWelcome={goToAttract} canGoBack={canGoBack} />}

        {/* Inactivity Warning */}
        {showInactivityWarning && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-gradient-to-r from-[#e63f51] to-[#dd8a03] rounded-2xl p-8 shadow-2xl animate-pulse mx-4 border-4 border-white">
              <p className="text-2xl text-white text-center">Returning to welcome screen in 15 seconds...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
