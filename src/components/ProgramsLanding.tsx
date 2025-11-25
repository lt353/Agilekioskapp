import { motion } from 'motion/react';
import { Card } from './ui/card';
import { KioskHeader } from './KioskHeader';
import { trackScreenClick } from '../data/supabaseClient';
import busImage from 'figma:asset/business-program.png';
import hostImage from 'figma:asset/hospitality-program.png';
import accImage from 'figma:asset/accounting-program.png';
import abitImage from 'figma:asset/abit-program.png';

interface ProgramsLandingProps {
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function ProgramsLanding({ onNavigate, onBack, onHome, onWelcome, canGoBack }: ProgramsLandingProps) {
  const programs = [
    {
      id: 'business',
      title: 'Business (BUS)',
      description: 'Wide range of courses in entrepreneurship, accounting, and business management',
      image: busImage,
      color: 'from-[#004f71] to-[#00313c]',
      degrees: ['CO', 'CA', 'AAS'],
      duration: '1-2 years',
      avgSalary: 'Varies by role',
    },
    {
      id: 'hospitality',
      title: 'Hospitality (HOST)',
      description: 'Leadership in hospitality with Hawaiian culture & global awareness',
      image: hostImage,
      color: 'from-[#789904] to-[#afa96e]',
      degrees: ['CO', 'CA', 'AAS'],
      duration: 'Short-term to 2 years',
      avgSalary: '100% Job Placement',
    },
    {
      id: 'accounting',
      title: 'Accounting (ACC)',
      description: 'Careers in accounting with small businesses, hotels, and organizations',
      image: accImage,
      color: 'from-[#ffb600] to-[#dd8a03]',
      degrees: ['CA', 'AAS'],
      duration: '1-2 years',
      avgSalary: 'Entry to Advanced',
    },
    {
      id: 'abit',
      title: 'ABIT (Applied Business & IT)',
      description: 'Combine business knowledge with technology skills',
      image: abitImage,
      color: 'from-[#00313c] to-[#789904]',
      degrees: ['BAS'],
      duration: '4 years (2 years transfer)',
      avgSalary: '$86K-$127K',
    },
  ];

  // Map program IDs to screen names for analytics
  const getScreenName = (programId: string) => {
    const nameMap: Record<string, string> = {
      'business': 'Programs > Business',
      'hospitality': 'Programs > Hospitality',
      'accounting': 'Programs > Accounting',
      'abit': 'Programs > ABIT',
    };
    return nameMap[programId] || `Programs > ${programId}`;
  };

  const handleProgramClick = (program: any) => {
    // Track the click
    trackScreenClick(getScreenName(program.id));
    // Navigate to the program detail
    onNavigate('program-detail', program);
  };

  return (
    <div className="size-full bg-gradient-to-br from-[#afa96e]/20 via-white to-[#aca39a]/10 flex flex-col">
      {/* Header */}
      <KioskHeader 
        title="Programs" 
        onBack={onBack} 
        onHome={onHome}
        onWelcome={onWelcome}
        canGoBack={canGoBack}
      />

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-center"
        >
          <h2 className="text-xl mb-2" style={{ color: 'var(--uhmc-dark-teal)' }}>Choose a program to learn more:</h2>
          <p className="text-base" style={{ color: 'var(--uhmc-deep-teal)' }}>Four pathways to your future success</p>
        </motion.div>

        <div className="space-y-3">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                onClick={() => handleProgramClick(program)}
                className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="flex h-32">
                  {/* Image Section */}
                  <div className="relative w-32 flex-shrink-0">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="size-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${program.color} opacity-30`} />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-3 flex flex-col justify-center">
                    <h3 className="text-base text-slate-900 mb-1">{program.title}</h3>
                    <p className="text-sm text-slate-700 mb-2 line-clamp-2">{program.description}</p>
                    
                    <div className="flex gap-3 text-xs text-slate-600">
                      <div>📜 {program.degrees.join(', ')}</div>
                      <div>⏱️ {program.duration}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
