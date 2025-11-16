import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useEffect, useState } from 'react';

interface SurveyThankYouProps {
  onNavigate: (view: string, data?: any) => void;
  onHome: () => void;
  onWelcome: () => void;
}

export function SurveyThankYou({ onNavigate, onHome, onWelcome }: SurveyThankYouProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      onHome();
    }
  }, [countdown, onHome]);

  return (
    <div className="size-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full"
      >
        <Card className="p-16 bg-white text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"
          >
            <CheckCircle2 className="w-24 h-24 text-white" />
          </motion.div>

          <h2 className="text-6xl text-emerald-600 mb-6">THANK YOU! 🎉</h2>
          
          <p className="text-3xl text-slate-700 mb-8">
            Your feedback helps us make UHMC better!
          </p>

          <div className="mb-8 p-6 bg-emerald-50 rounded-xl">
            <p className="text-xl text-slate-600 mb-2">Want to share more?</p>
            <p className="text-2xl text-emerald-700">📧 Email us: feedback@hawaii.edu</p>
          </div>

          <p className="text-2xl text-slate-500 mb-8">
            Returning to home screen in {countdown} seconds...
          </p>

          <div className="flex gap-4">
            <Button
              onClick={() => onNavigate('menu')}
              variant="outline"
              className="flex-1 h-16 text-2xl"
            >
              Explore More
            </Button>
            <Button
              onClick={onHome}
              className="flex-1 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-2xl"
            >
              ← Home Now
            </Button>
            <Button
              onClick={onWelcome}
              className="flex-1 h-16 bg-gradient-to-r from-[#e63f51] to-[#c72e41] text-white text-2xl"
            >
              Welcome Screen
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
