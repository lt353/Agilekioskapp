import { motion } from 'motion/react';
import { Card } from './ui/card';
import { KioskHeader } from './KioskHeader';

interface FloorSelectionProps {
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

const floor1Rooms = [
  'Faculty Offices',
  'Veteran\'s Resource Center',
  'Hawaii Child Welfare',
  'Pai Ka Mana',
  'Educational Opportunity Center',
  'Good Jobs Hawaii',
];

const floor2Rooms = [
  'Faculty Offices',
  'Admissions & Records',
  'Financial Aid Office',
  'Maui United Way',
];

export function FloorSelection({ onNavigate, onBack, onHome, onWelcome, canGoBack }: FloorSelectionProps) {
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
        title="Select a Floor" 
        onBack={onBack} 
        onHome={onHome}
        onWelcome={onWelcome}
        canGoBack={canGoBack}
      />

      {/* Content */}
      <div className="flex-1 overflow-auto px-12 py-8">
        {/* Instruction Text */}
        <div className="bg-gradient-to-r from-[#ffb600] to-[#dd8a03] rounded-lg p-4 mb-6 shadow-lg max-w-2xl mx-auto" style={{
          background: 'linear-gradient(to right, #ffb600, #dd8a03)',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          maxWidth: '672px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <p className="text-xl text-white text-center" style={{
            fontSize: '1.25rem',
            color: '#ffffff',
            textAlign: 'center',
            fontWeight: '500',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
          }}>
            Select a floor to view the interactive map
          </p>
        </div>

        <div className="space-y-8 max-w-2xl mx-auto">
          {/* Floor 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card
              onClick={() => onNavigate('floor-map', { floor: 1 })}
              className="h-80 p-8 bg-gradient-to-r from-[#004f71] to-[#00313c] cursor-pointer hover:shadow-2xl hover:scale-105 transition-all border-0"
              style={{
                height: '320px',
                padding: '32px',
                background: 'linear-gradient(to right, #004f71, #00313c)',
                cursor: 'pointer',
                border: 'none',
                borderRadius: '12px'
              }}
            >
              <h3 className="text-4xl text-white text-center mb-6" style={{
                fontSize: '2.25rem',
                color: '#ffffff',
                textAlign: 'center',
                marginBottom: '24px',
                fontWeight: '700',
                fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
              }}>Floor 1</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-base text-white/90" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                columnGap: '16px',
                rowGap: '12px',
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.9)',
                fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
              }}>
                {floor1Rooms.map((room, index) => (
                  <div key={index} className="flex items-start gap-2" style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}>
                    <div className="w-3 h-3 rounded-full bg-[#ffb600] flex-shrink-0 mt-1" style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: '#ffb600',
                      flexShrink: 0,
                      marginTop: '4px'
                    }}></div>
                    <span className="leading-tight" style={{
                      lineHeight: '1.25',
                      color: '#ffffff'
                    }}>{room}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Floor 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              onClick={() => onNavigate('floor-map', { floor: 2 })}
              className="h-80 p-8 bg-gradient-to-r from-[#789904] to-[#afa96e] cursor-pointer hover:shadow-2xl hover:scale-105 transition-all border-0"
              style={{
                height: '320px',
                padding: '32px',
                background: 'linear-gradient(to right, #789904, #afa96e)',
                cursor: 'pointer',
                border: 'none',
                borderRadius: '12px'
              }}
            >
              <h3 className="text-4xl text-white text-center mb-6" style={{
                fontSize: '2.25rem',
                color: '#ffffff',
                textAlign: 'center',
                marginBottom: '24px',
                fontWeight: '700',
                fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
              }}>Floor 2</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-base text-white/90" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                columnGap: '16px',
                rowGap: '12px',
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.9)',
                fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
              }}>
                {floor2Rooms.map((room, index) => (
                  <div key={index} className="flex items-start gap-2" style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}>
                    <div className="w-3 h-3 rounded-full bg-[#ffb600] flex-shrink-0 mt-1" style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: '#ffb600',
                      flexShrink: 0,
                      marginTop: '4px'
                    }}></div>
                    <span className="leading-tight" style={{
                      lineHeight: '1.25',
                      color: '#ffffff'
                    }}>{room}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
