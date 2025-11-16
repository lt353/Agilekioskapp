import logoHorizontal from 'figma:asset/6fa94c71ec2ee687c0faebc27142ac7a7bcd153d.png';
import logoSquare from 'figma:asset/b3cdec18145d7a61bc9506493cb5ee3b31502aa1.png';

interface UHMCBrandingProps {
  variant?: 'header' | 'footer' | 'compact' | 'full-logo';
  className?: string;
}

export function UHMCBranding({ variant = 'header', className = '' }: UHMCBrandingProps) {
  if (variant === 'full-logo') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <img
          src={logoHorizontal}
          alt="University of Hawaii Maui College"
          className="h-24 md:h-32 object-contain"
        />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src={logoSquare}
          alt="UHMC Logo"
          className="w-12 h-12 object-contain"
        />
        <div>
          <div className="text-sm" style={{ color: 'var(--uhmc-deep-teal)' }}>UNIVERSITY OF HAWAIʻI</div>
          <div className="text-xs" style={{ color: 'var(--uhmc-dark-teal)' }}>MAUI COLLEGE</div>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`py-6 px-8 ${className}`} style={{ background: 'linear-gradient(to right, var(--uhmc-deep-teal), var(--uhmc-dark-teal))' }}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <img
              src={logoSquare}
              alt="UHMC Logo"
              className="w-16 h-16 object-contain bg-white rounded-lg p-2"
            />
            <div className="text-white">
              <div className="text-lg">University of Hawaiʻi Maui College</div>
              <div className="text-sm opacity-90">Ka Lama Building • Business Department</div>
            </div>
          </div>
          <div className="text-white text-right text-sm">
            <div>310 W. Kaʻahumanu Ave.</div>
            <div>Kahului, HI 96732</div>
            <div className="mt-1">(808) 984-3500</div>
          </div>
        </div>
      </div>
    );
  }

  // Default header variant
  return (
    <div className={`bg-white/95 px-8 py-6 rounded-2xl shadow-2xl ${className}`}>
      <img
        src={logoHorizontal}
        alt="University of Hawaii Maui College"
        className="h-16 object-contain mx-auto"
      />
    </div>
  );
}
