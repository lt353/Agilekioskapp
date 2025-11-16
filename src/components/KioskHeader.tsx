import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import uhmcLogo from "figma:asset/5fca0ebf16a2ce2bc8333471a1e56eff5fa8f1ac.png";

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
    <div className="bg-gradient-to-r from-[#004f71] via-[#00313c] to-[#004f71] shadow-lg">
      <div className="px-6 py-4 flex flex-col gap-3">
        {/* Top: Navigation Buttons */}
        <div className="flex gap-2 justify-center">
          {canGoBack && onBack && (
            <Button
              onClick={onBack}
              className="h-9 px-3 bg-[#afa96e] text-white hover:bg-[#789904] transition-all shadow-md"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          )}
          <Button
            onClick={onHome}
            className="h-9 px-4 bg-[#dd8a03] text-white hover:bg-[#ffb600] transition-all shadow-md"
          >
            Main Menu
          </Button>
          <Button
            onClick={onWelcome}
            className="h-9 px-4 bg-[#e63f51] text-white hover:bg-[#c72e41] transition-all shadow-md"
          >
            Start Screen
          </Button>
        </div>

        {/* Bottom: Logo and Title */}
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <img
              src={uhmcLogo}
              alt="UHMC Logo"
              className="h-12 object-contain"
            />
          </div>
          <div className="flex-1 flex justify-end">
            <h1 className="text-base text-white uppercase tracking-wider">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}