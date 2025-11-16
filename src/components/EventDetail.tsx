import { motion } from 'motion/react';
import { ChevronLeft, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventDetailProps {
  event: any;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function EventDetail({ event, onBack, onHome, onWelcome, canGoBack }: EventDetailProps) {
  return (
    <div className="size-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-700 shadow-lg sticky top-0 z-10">
        <div className="px-12 py-6 flex items-center justify-between">
          <div className="flex gap-3">
            {canGoBack && (
              <Button
                onClick={onBack}
                variant="outline"
                className="h-12 px-4 gap-2 bg-[#afa96e] hover:bg-[#789904] border-[#afa96e] text-white"
              >
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
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
          <h1 className="text-4xl text-white">Event Details</h1>
          <div className="w-40" />
        </div>
      </div>

      {/* Content */}
      <div className="px-12 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Event Image */}
          <Card className="overflow-hidden mb-8 bg-white">
            <div className="relative h-96">
              <ImageWithFallback
                src={event.image}
                alt={event.title}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-12">
                <h2 className="text-6xl text-white mb-4">{event.title}</h2>
              </div>
            </div>
          </Card>

          {/* Event Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <Card className="p-8 bg-white">
              <h3 className="text-2xl text-slate-900 mb-6">EVENT INFORMATION</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Calendar className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg text-slate-600">Date</div>
                    <div className="text-2xl text-slate-900">{event.date}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-8 h-8 text-cyan-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg text-slate-600">Time</div>
                    <div className="text-2xl text-slate-900">{event.time}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg text-slate-600">Location</div>
                    <div className="text-2xl text-slate-900">{event.location}</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
              <h3 className="text-2xl mb-6">REGISTER NOW</h3>
              <div className="bg-white rounded-xl p-6 mb-6">
                <div className="w-full aspect-square bg-slate-800 flex items-center justify-center text-white text-4xl">
                  QR CODE
                </div>
              </div>
              <p className="text-xl">Scan to add to your calendar or register</p>
            </Card>
          </div>

          {/* Description */}
          <Card className="p-8 bg-white mb-8">
            <h3 className="text-3xl text-slate-900 mb-6">ABOUT THIS EVENT</h3>
            <p className="text-2xl text-slate-700 leading-relaxed mb-6">
              {event.description}
            </p>
            {event.id === 1 && (
              <>
                <h4 className="text-2xl text-slate-900 mb-4 mt-8">What to Bring:</h4>
                <ul className="space-y-2 text-xl text-slate-700">
                  <li>• Multiple copies of your resume</li>
                  <li>• Professional attire recommended</li>
                  <li>• Notepad for taking notes</li>
                  <li>• Questions for employers</li>
                </ul>

                <h4 className="text-2xl text-slate-900 mb-4 mt-8">Participating Employers:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-emerald-50 rounded-lg text-center text-lg">Hawaiian Airlines</div>
                  <div className="p-4 bg-cyan-50 rounded-lg text-center text-lg">Grand Wailea Resort</div>
                  <div className="p-4 bg-teal-50 rounded-lg text-center text-lg">First Hawaiian Bank</div>
                  <div className="p-4 bg-blue-50 rounded-lg text-center text-lg">Maui County</div>
                  <div className="p-4 bg-green-50 rounded-lg text-center text-lg">Alexander & Baldwin</div>
                  <div className="p-4 bg-emerald-50 rounded-lg text-center text-lg">+ 15 more!</div>
                </div>
              </>
            )}
          </Card>

          {/* Contact */}
          <Card className="p-8 bg-white">
            <div className="flex items-center gap-6">
              <Users className="w-16 h-16 text-emerald-600" />
              <div>
                <h3 className="text-2xl text-slate-900 mb-2">Questions?</h3>
                <p className="text-xl text-slate-600">Contact the Business Department Office</p>
                <p className="text-lg text-emerald-600">Room 101 • (808) 984-3500</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}