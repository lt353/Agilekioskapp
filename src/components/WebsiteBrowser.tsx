import { ChevronLeft, Globe, HelpCircle, Mail, BookOpen, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import logoHorizontal from 'figma:asset/6fa94c71ec2ee687c0faebc27142ac7a7bcd153d.png';

interface WebsiteBrowserProps {
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function WebsiteBrowser({ onBack, onHome, onWelcome, canGoBack }: WebsiteBrowserProps) {
  const quickLinks = [
    {
      icon: Mail,
      title: 'Email',
      url: 'https://mail.google.com',
      color: 'from-[#e63f51] to-[#dd8a03]',
    },
    {
      icon: BookOpen,
      title: 'My Classes',
      url: 'https://laulima.hawaii.edu',
      color: 'from-[#004f71] to-[#00313c]',
    },
    {
      icon: DollarSign,
      title: 'Financial Aid',
      url: 'https://myuh.hawaii.edu',
      color: 'from-[#789904] to-[#afa96e]',
    },
  ];

  return (
    <div className="size-full bg-gradient-to-br from-[#f5f4f2] via-white to-[#f5f4f2] flex flex-col">
      {/* Header */}
      <div className="shadow-lg" style={{ background: 'linear-gradient(to right, var(--uhmc-deep-teal), var(--uhmc-dark-teal), var(--uhmc-deep-teal))' }}>
        <div className="px-12 py-6 flex items-center justify-between">
          <div className="flex gap-3">
            {canGoBack && (
              <Button
                onClick={onBack}
                variant="outline"
                className="h-12 px-4 gap-2 bg-[#afa96e] hover:bg-[#789904] border-[#afa96e] text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            )}
            <Button
              onClick={onHome}
              variant="outline"
              className="h-12 px-5 gap-2 bg-[#dd8a03] hover:bg-[#ffb600] border-[#dd8a03] text-white"
            >
              <span className="text-lg">Main Menu</span>
            </Button>
            <Button
              onClick={onWelcome}
              variant="outline"
              className="h-12 px-5 gap-2 bg-[#e63f51] hover:bg-[#c72e41] border-[#e63f51] text-white"
            >
              <span className="text-lg">Start Screen</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Globe className="w-10 h-10 text-white" />
            <h1 className="text-4xl text-white">maui.hawaii.edu</h1>
          </div>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <HelpCircle className="w-8 h-8" />
          </Button>
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 p-12">
        <Card className="size-full bg-white p-8 overflow-auto">
          {/* Simulated Browser Content */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-8">
                <img
                  src={logoHorizontal}
                  alt="UHMC Logo"
                  className="h-32 object-contain"
                />
              </div>
              <h1 className="text-5xl mb-4" style={{ color: 'var(--uhmc-deep-teal)' }}>University of Hawaiʻi Maui College</h1>
              <p className="text-3xl" style={{ color: 'var(--uhmc-dark-gray)' }}>Business Department</p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-12">
              <Card className="p-8 bg-gradient-to-br from-[#f5f4f2] to-[#afa96e]/20 text-center">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-2xl mb-2" style={{ color: 'var(--uhmc-dark-teal)' }}>Programs</h3>
                <p className="text-lg" style={{ color: 'var(--uhmc-dark-gray)' }}>Explore our degree options</p>
              </Card>
              <Card className="p-8 bg-gradient-to-br from-[#f5f4f2] to-[#004f71]/10 text-center">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-2xl mb-2" style={{ color: 'var(--uhmc-dark-teal)' }}>Apply</h3>
                <p className="text-lg" style={{ color: 'var(--uhmc-dark-gray)' }}>Start your application</p>
              </Card>
              <Card className="p-8 bg-gradient-to-br from-[#f5f4f2] to-[#789904]/10 text-center">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="text-2xl mb-2" style={{ color: 'var(--uhmc-dark-teal)' }}>Contact Us</h3>
                <p className="text-lg" style={{ color: 'var(--uhmc-dark-gray)' }}>Get in touch</p>
              </Card>
            </div>

            <div className="rounded-xl p-8 text-center" style={{ backgroundColor: 'var(--uhmc-warm-gray)/20' }}>
              <p className="text-2xl mb-4" style={{ color: 'var(--uhmc-dark-gray)' }}>
                For full website access, please use your personal device
              </p>
              <p className="text-xl" style={{ color: 'var(--uhmc-dark-gray)', opacity: 0.7 }}>
                This kiosk browser is limited to uhmc.hawaii.edu domain for security
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Links Footer */}
      <div className="bg-white border-t-2 border-slate-200 px-12 py-6">
        <div className="flex items-center justify-center gap-6">
          <span className="text-xl text-slate-600">Quick Links:</span>
          {quickLinks.map((link) => (
            <Button
              key={link.title}
              className={`h-14 px-8 gap-3 bg-gradient-to-r ${link.color} text-white`}
            >
              <link.icon className="w-6 h-6" />
              <span className="text-xl">{link.title}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Timeout Warning */}
      <div className="border-t-2 px-12 py-4 text-center" style={{ backgroundColor: '#ffb600/10', borderColor: 'var(--uhmc-bright-yellow)' }}>
        <p className="text-lg" style={{ color: 'var(--uhmc-dark-teal)' }}>
          ⏱️ This browser will return to home after 2 minutes of inactivity for your privacy
        </p>
      </div>
    </div>
  );
}