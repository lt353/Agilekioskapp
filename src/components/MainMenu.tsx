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
      inlineBackground: 'linear-gradient(to bottom right, #004f71, #00313c)',
      active: true,
    },
    {
      id: 'directory',
      title: 'BUILDING DIRECTORY',
      color: 'from-[#789904] to-[#afa96e]',
      hoverColor: 'hover:from-[#8fb005] hover:to-[#c4be82]',
      inlineBackground: 'linear-gradient(to bottom right, #789904, #afa96e)',
      active: true,
    },
    {
      id: 'jobs',
      title: 'JOBS & CAREERS',
      color: 'from-[#dd8a03] to-[#c72e41]',
      hoverColor: 'hover:from-[#ffb600] hover:to-[#e63f51]',
      inlineBackground: 'linear-gradient(to bottom right, #dd8a03, #c72e41)',
      active: true,
    },
  ];

  return (
    <div className="size-full bg-gradient-to-br from-[#f5f4f2] via-white to-[#f5f4f2] flex flex-col" style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to bottom right, #f5f4f2, #ffffff, #f5f4f2)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div className="py-6" style={{
        background: 'linear-gradient(to right, #004f71, #003e56, #004f71)',
        padding: '24px 0'
      }}>
        <div className="px-8 flex flex-col gap-4">
          {/* Top: Return to Start Button */}
          <div className="flex justify-center">
            <Button
              onClick={onWelcome}
              className="h-9 px-4 bg-[#e63f51] text-white hover:bg-[#c72e41] transition-all shadow-md"
              style={{
                backgroundColor: '#e63f51',
                color: '#ffffff',
                height: '36px',
                padding: '0 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
              }}
            >
              Start Screen
            </Button>
          </div>

          {/* Bottom: Logo and Text */}
          <div className="flex items-center gap-6" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}>
            <img
              src={logoSquare}
              alt="UHMC Logo"
              className="w-32 h-32 object-contain"
              style={{
                width: '128px',
                height: '128px',
                objectFit: 'contain'
              }}
            />
            <div>
              <h1 className="text-3xl text-white mb-1" style={{
                fontSize: '1.875rem',
                color: '#ffffff',
                marginBottom: '4px',
                fontWeight: '600',
              fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
              }}>Ka Lama</h1>
              <p className="text-lg text-white/90" style={{
                fontSize: '1.125rem',
                color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>What would you like to explore?</p>
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
                className={`h-[180px] bg-gradient-to-br ${item.color} ${item.active ? item.hoverColor + ' cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-75'} transition-all duration-300 hover:shadow-2xl border-none overflow-hidden group`}
                style={{
                  background: item.inlineBackground,
                  height: '180px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: item.active ? 'pointer' : 'not-allowed',
                  opacity: item.active ? 1 : 0.75,
                  overflow: 'hidden'
                }}
              >
                <div className="h-full flex flex-col items-center justify-center text-white p-6" style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  padding: '24px'
                }}>
                  <h2 className="text-4xl text-center font-semibold" style={{
                    fontSize: '2.25rem',
                    textAlign: 'center',
                    fontWeight: '600',
                    color: '#ffffff',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{item.title}</h2>
                  {!item.active && (
                    <p className="text-base text-white/80 mt-2" style={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginTop: '8px',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>Future Feature</p>
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
        style={{
          padding: '0 32px 24px',
          textAlign: 'center'
        }}
      >
        <p className="text-base" style={{
          color: '#5a5a5a',
          fontSize: '1rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
          This screen will automatically return to the welcome screen after 60 seconds of inactivity
        </p>
      </motion.div>
    </div>
  );
}