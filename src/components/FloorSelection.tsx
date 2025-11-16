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
    <div className="size-full bg-gradient-to-br from-[#afa96e]/20 via-white to-[#aca39a]/10 flex flex-col">
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
        <div className="bg-gradient-to-r from-[#ffb600] to-[#dd8a03] rounded-lg p-4 mb-6 shadow-lg max-w-2xl mx-auto">
          <p className="text-xl text-white text-center">
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
            >
              <h3 className="text-4xl text-white text-center mb-6">Floor 1</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-base text-white/90">
                {floor1Rooms.map((room, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ffb600] flex-shrink-0 mt-1"></div>
                    <span className="leading-tight">{room}</span>
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
            >
              <h3 className="text-4xl text-white text-center mb-6">Floor 2</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-base text-white/90">
                {floor2Rooms.map((room, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ffb600] flex-shrink-0 mt-1"></div>
                    <span className="leading-tight">{room}</span>
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
