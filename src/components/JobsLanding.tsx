import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { KioskHeader } from './KioskHeader';
import { Phone, Mail, ExternalLink, QrCode, Briefcase } from 'lucide-react';
import QRCode from 'qrcode';
import React from 'react';
import { getRoomDatabase } from '../data/roomDataLoader';
import { trackScreenClick } from '../data/supabaseClient';

interface JobsLandingProps {
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function JobsLanding({ onNavigate, onBack, onHome, onWelcome, canGoBack }: JobsLandingProps) {
  const [qrCodes, setQrCodes] = React.useState({
    goodJobsHawaii: '',
    careerLink: '',
    sece: '',
  });

  // Generate QR codes on mount
  React.useEffect(() => {
    const generateQRCodes = async () => {
      try {
        const goodJobsQR = await QRCode.toDataURL('https://uhcc.hawaii.edu/goodjobshawaii/', {
          width: 120,
          margin: 1,
          color: {
            dark: '#004f71',
            light: '#ffffff',
          },
        });
        const careerLinkQR = await QRCode.toDataURL('https://maui.hawaii.edu/careerlink', {
          width: 120,
          margin: 1,
          color: {
            dark: '#004f71',
            light: '#ffffff',
          },
        });
        const seceQR = await QRCode.toDataURL('https://hawaii.edu/sece/', {
          width: 120,
          margin: 1,
          color: {
            dark: '#004f71',
            light: '#ffffff',
          },
        });

        setQrCodes({
          goodJobsHawaii: goodJobsQR,
          careerLink: careerLinkQR,
          sece: seceQR,
        });
      } catch (error) {
        console.error('Error generating QR codes:', error);
      }
    };

    generateQRCodes();
  }, []);

  // Handle room navigation
  const handleRoom131Click = async () => {
    try {
      const roomDatabase = await getRoomDatabase();
      const room131 = roomDatabase['131'];
      if (room131) {
        onNavigate('room-detail', room131);
      } else {
        console.error('Room 131 not found in database');
      }
    } catch (error) {
      console.error('Error fetching Room 131 data:', error);
    }
  };

  // Handle job listings navigation with tracking
  const handleViewJobOpenings = () => {
    trackScreenClick('Jobs & Careers > View Current Job Openings');
    onNavigate('jobs-listings');
  };

  return (
    <div className="size-full bg-gradient-to-br from-[#f5f4f2] via-white to-[#f5f4f2] flex flex-col overflow-hidden" style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to bottom right, #f5f4f2, #ffffff, #f5f4f2)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <KioskHeader
        title="JOBS & CAREERS"
        onBack={onBack}
        onHome={onHome}
        onWelcome={onWelcome}
        canGoBack={canGoBack}
      />

      {/* Content - No Scroll */}
      <div className="flex-1 px-6 py-5 flex flex-col">
        <div className="space-y-3 flex-1">
          {/* In-Person Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card
              onClick={handleRoom131Click}
              className="p-4 bg-gradient-to-br from-[#004f71] to-[#00313c] text-white border-none shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              style={{
                padding: '16px',
                background: 'linear-gradient(to bottom right, #004f71, #00313c)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '12px'
              }}
            >
              <div className="flex items-start gap-3" style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <div className="flex-1" style={{ flex: 1 }}>
                  <h2 className="text-base mb-2" style={{
                    fontSize: '1rem',
                    marginBottom: '8px',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}>📍 Good Jobs Hawaii</h2>
                  <p className="text-sm mb-1" style={{
                    fontSize: '0.875rem',
                    marginBottom: '4px',
                    color: '#ffffff'
                  }}>
                    <span className="font-semibold" style={{ fontWeight: '600' }}>Room 131, 1st Floor</span> - Marshall Norman
                  </p>
                  <p className="text-xs text-white/90 mb-2" style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '8px'
                  }}>
                    Get personalized help with job searches and career planning
                  </p>
                  <p className="text-xs text-white/80" style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    Tap for room details →
                  </p>
                </div>
                {qrCodes.goodJobsHawaii && (
                  <div className="bg-white p-1.5 rounded shadow-md flex-shrink-0" style={{
                    backgroundColor: '#ffffff',
                    padding: '6px',
                    borderRadius: '8px',
                    flexShrink: 0
                  }}>
                    <img src={qrCodes.goodJobsHawaii} alt="Good Jobs Hawaii QR" className="w-24 h-24" style={{
                      width: '96px',
                      height: '96px'
                    }} />
                    <p className="text-[8px] text-center text-[#004f71] mt-1" style={{
                      fontSize: '8px',
                      textAlign: 'center',
                      color: '#004f71',
                      marginTop: '4px'
                    }}>Scan for info</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* CareerLink Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 bg-white border-2 border-[#789904] shadow-md" style={{
              padding: '16px',
              backgroundColor: '#ffffff',
              border: '2px solid #789904',
              borderRadius: '12px'
            }}>
              <div className="flex items-start gap-3" style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <div className="flex-1" style={{ flex: 1 }}>
                  <h2 className="text-base mb-1" style={{
                    fontSize: '1rem',
                    marginBottom: '4px',
                    color: '#004f71',
                    fontWeight: '600'
                  }}>
                    CareerLink Services
                  </h2>
                  <p className="text-xs mb-2" style={{
                    fontSize: '0.75rem',
                    marginBottom: '8px',
                    color: '#5a5a5a'
                  }}>
                    Job announcements, resume & cover letter help, job prep, and internships for students and alumni.
                  </p>
                  <div className="space-y-0.5 text-xs" style={{
                    fontSize: '0.75rem',
                    color: '#5a5a5a'
                  }}>
                    <p style={{ color: '#5a5a5a' }}><span className="font-semibold" style={{ fontWeight: '600' }}>Location:</span> TLC Building</p>
                    <p className="flex items-center gap-1" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#5a5a5a'
                    }}>
                      <Phone className="w-3 h-3" style={{ width: '12px', height: '12px' }} />
                      808-984-3318
                    </p>
                    <p className="flex items-center gap-1" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#5a5a5a'
                    }}>
                      <Mail className="w-3 h-3" style={{ width: '12px', height: '12px' }} />
                      careerLK@hawaii.edu
                    </p>
                  </div>
                </div>
                {qrCodes.careerLink && (
                  <div className="bg-[#f5f4f2] p-1.5 rounded border-2 border-[#789904] flex-shrink-0" style={{
                    backgroundColor: '#f5f4f2',
                    padding: '6px',
                    borderRadius: '8px',
                    border: '2px solid #789904',
                    flexShrink: 0
                  }}>
                    <img src={qrCodes.careerLink} alt="CareerLink QR" className="w-24 h-24" style={{
                      width: '96px',
                      height: '96px'
                    }} />
                    <p className="text-[8px] text-center text-[#789904] mt-1" style={{
                      fontSize: '8px',
                      textAlign: 'center',
                      color: '#789904',
                      marginTop: '4px'
                    }}>Scan to visit</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* SECE Online Jobs Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4 bg-gradient-to-br from-[#dd8a03] to-[#ffb600] text-white border-none shadow-md" style={{
              padding: '16px',
              background: 'linear-gradient(to bottom right, #dd8a03, #ffb600)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px'
            }}>
              <div className="flex items-start gap-3" style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <div className="flex-1" style={{ flex: 1 }}>
                  <h2 className="text-base mb-1" style={{
                    fontSize: '1rem',
                    marginBottom: '4px',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}>🌐 SECE Online Job Services</h2>
                  <p className="text-xs mb-2" style={{
                    fontSize: '0.75rem',
                    marginBottom: '8px',
                    color: '#ffffff'
                  }}>
                    UH Student Employment & Career Engagement connects students with employers online.
                  </p>
                  <p className="text-xs mb-2" style={{
                    fontSize: '0.75rem',
                    marginBottom: '8px',
                    color: '#ffffff'
                  }}>
                    UH and Non-UH Employers post jobs on SECE
                  </p>
                  <div className="flex items-center gap-1.5 text-xs bg-white/20 rounded px-2 py-1" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    padding: '4px 8px'
                  }}>
                    <ExternalLink className="w-3 h-3" style={{ width: '12px', height: '12px' }} />
                    <span className="font-semibold" style={{ fontWeight: '600', color: '#ffffff' }}>hawaii.edu/sece/</span>
                  </div>
                </div>
                {qrCodes.sece && (
                  <div className="bg-white p-1.5 rounded shadow-md flex-shrink-0" style={{
                    backgroundColor: '#ffffff',
                    padding: '6px',
                    borderRadius: '8px',
                    flexShrink: 0
                  }}>
                    <img src={qrCodes.sece} alt="SECE QR" className="w-24 h-24" style={{
                      width: '96px',
                      height: '96px'
                    }} />
                    <p className="text-[8px] text-center text-[#dd8a03] mt-1" style={{
                      fontSize: '8px',
                      textAlign: 'center',
                      color: '#dd8a03',
                      marginTop: '4px'
                    }}>Scan to visit</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* View Current Openings Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <Button
            onClick={handleViewJobOpenings}
            className="w-full h-16 bg-gradient-to-r from-[#004f71] to-[#00313c] text-white hover:from-[#006491] hover:to-[#004f71] shadow-lg"
            style={{
              width: '100%',
              height: '64px',
              background: 'linear-gradient(to right, #004f71, #00313c)',
              color: '#ffffff',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}
          >
            <Briefcase className="w-6 h-6 mr-2" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
            <span className="text-xl" style={{ fontSize: '1.25rem', color: '#ffffff' }}>View Current Job Openings</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
