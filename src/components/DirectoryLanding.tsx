import { motion } from 'motion/react';
import { Card } from './ui/card';
import { KioskHeader } from './KioskHeader';
import { trackScreenClick } from '../data/supabaseClient';

interface DirectoryLandingProps {
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function DirectoryLanding({ onNavigate, onBack, onHome, onWelcome, canGoBack }: DirectoryLandingProps) {
  const handleBrowseByFloor = () => {
    trackScreenClick('Building Directory > Browse by Floor');
    onNavigate('floor-selection');
  };

  const handleSearchByName = () => {
    trackScreenClick('Building Directory > Search by Name');
    onNavigate('name-search');
  };

  return (
    <div className="size-full bg-gradient-to-br from-[#afa96e]/20 via-white to-[#aca39a]/10 flex flex-col" style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to bottom right, rgba(175, 169, 110, 0.2), #ffffff, rgba(172, 163, 154, 0.1))',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <KioskHeader 
        title="Building Directory" 
        onBack={onBack} 
        onHome={onHome}
        onWelcome={onWelcome}
        canGoBack={canGoBack}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-12 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
          style={{
            marginBottom: '48px',
            textAlign: 'center'
          }}
        >
          <h2 className="text-3xl text-[#004f71] mb-3" style={{
            fontSize: '1.875rem',
            color: '#004f71',
            marginBottom: '12px',
            fontWeight: '600',
          fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
          }}>UHMC Ka Lama Building</h2>
          <p className="text-xl text-[#65665c]" style={{
            fontSize: '1.25rem',
            color: '#65665c',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>What would you like to explore?</p>
        </motion.div>

        {/* Buttons */}
        <div className="space-y-6 mb-8">
          {/* Browse by Floor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card
              onClick={handleBrowseByFloor}
              className="p-8 bg-gradient-to-r from-[#004f71] to-[#00313c] cursor-pointer hover:shadow-2xl transition-all border-0"
              style={{
                padding: '32px',
                background: 'linear-gradient(to right, #004f71, #00313c)',
                cursor: 'pointer',
                border: 'none',
                borderRadius: '12px'
              }}
            >
              <div className="text-center" style={{
                textAlign: 'center'
              }}>
                <h3 className="text-2xl text-white mb-2" style={{
                  fontSize: '1.5rem',
                  color: '#ffffff',
                  marginBottom: '8px',
                  fontWeight: '600',
                fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
                }}>Browse by Floor</h3>
                <p className="text-base text-white/80" style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>View interactive floor maps</p>
              </div>
            </Card>
          </motion.div>

          {/* Search by Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              onClick={handleSearchByName}
              className="p-8 bg-gradient-to-r from-[#789904] to-[#afa96e] cursor-pointer hover:shadow-2xl transition-all border-0"
              style={{
                padding: '32px',
                background: 'linear-gradient(to right, #789904, #afa96e)',
                cursor: 'pointer',
                border: 'none',
                borderRadius: '12px'
              }}
            >
              <div className="text-center" style={{
                textAlign: 'center'
              }}>
                <h3 className="text-2xl text-white mb-2" style={{
                  fontSize: '1.5rem',
                  color: '#ffffff',
                  marginBottom: '8px',
                  fontWeight: '600',
                fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
                }}>Search by Name</h3>
                <p className="text-base text-white/80" style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>Find faculty or staff member</p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Help Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-auto"
          style={{
            marginTop: 'auto'
          }}
        >
          <div className="bg-gradient-to-r from-[#ffb600] to-[#dd8a03] rounded-lg p-4 text-center shadow-md" style={{
            background: 'linear-gradient(to right, #ffb600, #dd8a03)',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <p className="text-base text-white" style={{
              fontSize: '1rem',
              color: '#ffffff',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
              Need help? Visit Admissions Room 201
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}