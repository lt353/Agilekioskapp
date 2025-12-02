import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import uhmcLogo from "figma:asset/uhmc-logo-square.png";

interface KioskHeaderProps {
  title: string;
  onBack?: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function KioskHeader({
  title,
  onBack,
  onHome,
  onWelcome,
  canGoBack,
}: KioskHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#004f71] via-[#00313c] to-[#004f71] shadow-lg" style={{
      background: 'linear-gradient(to right, #004f71, #00313c, #004f71)'
    }}>
      <div className="px-6 py-4 flex flex-col gap-3">
        {/* Top: Navigation Buttons */}
        <div className="flex gap-2 justify-center">
          {canGoBack && onBack && (
            <Button
              onClick={onBack}
              className="h-9 px-3 bg-[#afa96e] text-white hover:bg-[#789904] transition-all shadow-md"
              style={{
                backgroundColor: '#afa96e',
                color: '#ffffff',
                height: '36px',
                padding: '0 12px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ArrowLeft className="w-6 h-6" style={{ width: '24px', height: '24px' }} />
            </Button>
          )}
          <Button
            onClick={onHome}
            className="h-9 px-4 bg-[#dd8a03] text-white hover:bg-[#ffb600] transition-all shadow-md"
            style={{
              backgroundColor: '#dd8a03',
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
            Main Menu
          </Button>
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

        {/* Bottom: Logo and Title */}
        <div className="flex items-center justify-between" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div className="flex-1 flex justify-start" style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-start'
          }}>
            <img
              src={uhmcLogo}
              alt="UHMC Logo"
              className="h-12 object-contain"
              style={{
                height: '48px',
                objectFit: 'contain'
              }}
            />
          </div>
          <div className="flex-1 flex justify-end" style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <h1 className="text-base text-white uppercase tracking-wider" style={{
              fontSize: '1rem',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: '600',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
            }}>
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}