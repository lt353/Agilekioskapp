import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useState } from 'react';

interface SurveyQuestionProps {
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
}

export function SurveyQuestion({ onNavigate, onHome, onWelcome }: SurveyQuestionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 0,
      question: 'How satisfied are you with the Business Department\'s support services?',
      type: 'emoji' as const,
      options: [
        { emoji: '😊', label: 'VERY SATISFIED' },
        { emoji: '🙂', label: 'SATISFIED' },
        { emoji: '😐', label: 'NEUTRAL' },
        { emoji: '😕', label: 'UNSATISFIED' },
      ],
    },
    {
      id: 1,
      question: 'What would you like to see more of on campus?',
      type: 'multiple-choice' as const,
      options: [
        'Career workshops and networking events',
        'Study spaces and group work areas',
        'Food and beverage options',
        'Student clubs and organizations',
      ],
    },
    {
      id: 2,
      question: 'Any suggestions to improve the Business Department? (Optional)',
      type: 'text' as const,
      options: [],
    },
  ];

  const question = questions[currentQuestion];
  const totalQuestions = questions.length;

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onNavigate('survey-thanks');
      }
    }, 300);
  };

  return (
    <div className="size-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-700 shadow-lg">
        <div className="px-12 py-6 flex items-center justify-between">
          <div className="flex gap-4">
            <Button
              onClick={onHome}
              variant="ghost"
              className="h-16 px-6 text-white hover:bg-white/10"
            >
              <X className="w-8 h-8" />
            </Button>
            <Button
              onClick={onWelcome}
              variant="outline"
              className="h-16 px-6 bg-[#e63f51] hover:bg-[#c72e41] border-[#e63f51] text-white"
            >
              <span className="text-xl">Welcome</span>
            </Button>
          </div>
          <h1 className="text-3xl text-white">QUESTION {currentQuestion + 1} OF {totalQuestions}</h1>
          <div className="w-24" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-12 py-12">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="max-w-4xl w-full"
        >
          <Card className="p-12 bg-white">
            <h2 className="text-4xl text-slate-900 mb-12 text-center leading-relaxed">
              {question.question}
            </h2>

            {question.type === 'emoji' && (
              <div className="grid grid-cols-2 gap-6">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option.label)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl hover:from-emerald-100 hover:to-teal-100 transition-all border-2 border-transparent hover:border-emerald-500"
                  >
                    <div className="text-7xl mb-4">{option.emoji}</div>
                    <div className="text-2xl text-slate-800">{option.label}</div>
                  </motion.button>
                ))}
              </div>
            )}

            {question.type === 'multiple-choice' && (
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:from-emerald-100 hover:to-teal-100 transition-all border-2 border-transparent hover:border-emerald-500 text-left"
                  >
                    <div className="text-2xl text-slate-800">{option}</div>
                  </motion.button>
                ))}
              </div>
            )}

            {question.type === 'text' && (
              <div className="space-y-6">
                <textarea
                  placeholder="Share your thoughts... (or click Skip)"
                  className="w-full h-48 p-6 text-2xl border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:outline-none resize-none"
                />
                <div className="flex gap-4">
                  <Button
                    onClick={() => handleAnswer('')}
                    variant="outline"
                    className="flex-1 h-16 text-2xl"
                  >
                    Skip
                  </Button>
                  <Button
                    onClick={() => handleAnswer('submitted')}
                    className="flex-1 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-2xl"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Progress Indicator */}
          <div className="flex gap-2 justify-center mt-8">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-3 rounded-full transition-all ${
                  index === currentQuestion
                    ? 'w-12 bg-emerald-600'
                    : index < currentQuestion
                    ? 'w-3 bg-emerald-400'
                    : 'w-3 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
