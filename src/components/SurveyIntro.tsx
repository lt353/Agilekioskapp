import { motion } from 'motion/react';
import { ChevronLeft, Clock, Lock, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface SurveyIntroProps {
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function SurveyIntro({ onNavigate, onBack, onHome, onWelcome, canGoBack }: SurveyIntroProps) {
  return (
    <div className="size-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-auto flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-700 shadow-lg">
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
          <h1 className="text-4xl text-white">We Want Your Feedback!</h1>
          <div className="w-40" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-12 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl w-full"
        >
          <Card className="p-12 bg-white text-center">
            <h2 className="text-5xl text-emerald-900 mb-6">Help Us Improve UHMC!</h2>
            <p className="text-2xl text-slate-700 mb-8">
              Your opinion matters. Take our quick 3-question survey about campus life.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="flex flex-col items-center">
                <Clock className="w-16 h-16 text-emerald-600 mb-3" />
                <h3 className="text-xl text-slate-900 mb-2">⏱️ Time:</h3>
                <p className="text-lg text-slate-600">Less than 1 minute</p>
              </div>
              <div className="flex flex-col items-center">
                <Lock className="w-16 h-16 text-cyan-600 mb-3" />
                <h3 className="text-xl text-slate-900 mb-2">🔒 Anonymous:</h3>
                <p className="text-lg text-slate-600">No personal info collected</p>
              </div>
              <div className="flex flex-col items-center">
                <TrendingUp className="w-16 h-16 text-teal-600 mb-3" />
                <h3 className="text-xl text-slate-900 mb-2">🎁 Impact:</h3>
                <p className="text-lg text-slate-600">We read every response!</p>
              </div>
            </div>

            {/* Illustration */}
            <div className="mb-12">
              <div className="text-9xl">💬</div>
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <Button
                onClick={() => onNavigate('survey-question', { questionIndex: 0 })}
                className="w-full h-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-3xl hover:from-emerald-500 hover:to-teal-500"
              >
                START SURVEY
              </Button>
              <Button
                onClick={onHome}
                variant="outline"
                className="w-full h-16 text-2xl text-slate-600"
              >
                NO THANKS
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}