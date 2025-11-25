import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import logoSquare from 'figma:asset/uhmc-logo-square.png';

interface MainMenuProps {
  onNavigate: (view: string, data?: any) => void;
  onWelcome: () => void;
}

export function MainMenu({ onNavigate, onWelcome }: MainMenuProps) {
  const menuItems = [
    {
      id: 'programs',
      title: 'PROGRAMS',
      color: 'from-[#004f71] to-[#00313c]',
      hoverColor: 'hover:from-[#006491] hover:to-[#004f71]',
      active: true,
    },
    {
      id: 'directory',
      title: 'BUILDING DIRECTORY',
      color: 'from-[#789904] to-[#afa96e]',
      hoverColor: 'hover:from-[#8fb005] hover:to-[#c4be82]',
      active: true,
    },
    {
      id: 'jobs',
      title: 'JOBS & CAREERS',
      color: 'from-[#dd8a03] to-[#e63f51]',
      hoverColor: 'hover:from-[#ffb600] hover:to-[#ff5a6e]',
      active: true,
    },
  ];

  return (
    <div className="size-full bg-gradient-to-br from-[#f5f4f2] via-white to-[#f5f4f2] flex flex-col">
      {/* Header */}
      <div className="py-6" style={{ background: 'linear-gradient(to right, var(--uhmc-deep-teal), var(--uhmc-dark-teal), var(--uhmc-deep-teal))' }}>
        <div className="px-8 flex flex-col gap-4">
          {/* Top: Return to Start Button */}
          <div className="flex justify-center">
            <Button
              onClick={onWelcome}
              className="h-9 px-4 bg-[#e63f51] text-white hover:bg-[#c72e41] transition-all shadow-md"
            >
              Start Screen
            </Button>
          </div>

          {/* Bottom: Logo and Text */}
          <div className="flex items-center gap-6">
            <img
              src={logoSquare}
              alt="UHMC Logo"
              className="w-32 h-32 object-contain"
            />
            <div>
              <h1 className="text-3xl text-white mb-1">Ka Lama</h1>
              <p className="text-lg text-white/90">What would you like to explore?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="flex-1 px-8 py-8 flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto w-full">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card
                onClick={() => item.active && onNavigate(item.id)}
                className={`h-[140px] bg-gradient-to-br ${item.color} ${item.active ? item.hoverColor + ' cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-75'} transition-all duration-300 hover:shadow-2xl border-none overflow-hidden group`}
              >
                <div className="h-full flex flex-col items-center justify-center text-white p-6">
                  <h2 className="text-4xl text-center font-semibold">{item.title}</h2>
                  {!item.active && (
                    <p className="text-base text-white/80 mt-2">Future Feature</p>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Info - Fixed at Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="px-8 pb-6 text-center"
      >
        <p className="text-base" style={{ color: 'var(--uhmc-dark-gray)' }}>
          This screen will automatically return to the welcome screen after 60 seconds of inactivity
        </p>
      </motion.div>
    </div>
  );
}