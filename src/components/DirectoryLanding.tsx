import { motion } from 'motion/react';
import { Card } from './ui/card';
import { KioskHeader } from './KioskHeader';

interface DirectoryLandingProps {
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function DirectoryLanding({ onNavigate, onBack, onHome, onWelcome, canGoBack }: DirectoryLandingProps) {
  return (
    <div className="size-full bg-gradient-to-br from-[#afa96e]/20 via-white to-[#aca39a]/10 flex flex-col">
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
        >
          <h2 className="text-3xl text-[#004f71] mb-3">UHMC Ka Lama Building</h2>
          <p className="text-xl text-[#65665c]">What would you like to explore?</p>
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
              onClick={() => onNavigate('floor-selection')}
              className="p-8 bg-gradient-to-r from-[#004f71] to-[#00313c] cursor-pointer hover:shadow-2xl transition-all border-0"
            >
              <div className="text-center">
                <h3 className="text-2xl text-white mb-2">Browse by Floor</h3>
                <p className="text-base text-white/80">View interactive floor maps</p>
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
              onClick={() => onNavigate('name-search')}
              className="p-8 bg-gradient-to-r from-[#789904] to-[#afa96e] cursor-pointer hover:shadow-2xl transition-all border-0"
            >
              <div className="text-center">
                <h3 className="text-2xl text-white mb-2">Search by Name</h3>
                <p className="text-base text-white/80">Find faculty or staff member</p>
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
        >
          <div className="bg-gradient-to-r from-[#ffb600] to-[#dd8a03] rounded-lg p-4 text-center shadow-md">
            <p className="text-base text-white">
              Need help? Visit Admissions Room 201
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}