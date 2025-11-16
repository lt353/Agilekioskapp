import { motion } from 'motion/react';
import { ChevronLeft, Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { getSupabaseClient } from '../data/supabaseClient';

interface EventsLandingProps {
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function EventsLanding({ onNavigate, onBack, onHome, onWelcome, canGoBack }: EventsLandingProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for fallback
  const mockEvents = [
    {
      id: 1,
      title: 'Business Career Fair 2025',
      date: 'March 15, 2025',
      time: '10:00 AM - 2:00 PM',
      location: 'Ka Lama Building Courtyard',
      description: 'Meet with 20+ local employers and explore career opportunities in business, hospitality, accounting, and IT. Bring your resume!',
      image: 'https://images.unsplash.com/photo-1676276374429-3902f2666824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBmYWlyJTIwbmV0d29ya2luZ3xlbnwxfHx8fDE3NTk2MTgyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      isFeatured: true,
    },
    {
      id: 2,
      title: 'Accounting Workshop',
      date: 'March 20, 2025',
      time: '2:00 PM',
      location: 'Room 202',
      description: 'QuickBooks training session',
      image: 'https://images.unsplash.com/photo-1574607383077-47ddc2dc51c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2NvdW50aW5nJTIwZmluYW5jZSUyMGNhbGN1bGF0b3J8ZW58MXx8fHwxNzU5NjE0NjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: 'ABIT Speaker Series',
      date: 'March 25, 2025',
      time: '3:00 PM',
      location: 'Room 203',
      description: 'Guest speaker from Hawaiian Airlines',
      image: 'https://images.unsplash.com/photo-1591439657848-9f4b9ce436b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29tcHV0ZXIlMjBjb2Rpbmd8ZW58MXx8fHwxNzU5NTI0NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 4,
      title: 'Open House',
      date: 'March 30, 2025',
      time: '9:00 AM - 1:00 PM',
      location: 'Ka Lama Building',
      description: 'Explore our programs and meet faculty',
      image: 'https://images.unsplash.com/photo-1578060401546-a5cdf4c3da57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXdhaWklMjBjYW1wdXMlMjBvdXRkb29yJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzU5NjE4MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  // Fetch events from Supabase
  useEffect(() => {
    async function fetchEvents() {
      try {
        const supabase = getSupabaseClient();
        if (!supabase) {
          console.info('No Supabase connection - using mock events');
          setEvents(mockEvents);
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('active', true)
          .order('event_date', { ascending: true });

        if (error) {
          // Handle missing table or other errors gracefully
          if (error.code === 'PGRST204' || error.code === 'PGRST205') {
            console.info('Table "events" not found - using mock data. Set up your Supabase tables to enable dynamic events.');
          } else {
            console.error('Error fetching events:', error);
          }
          setEvents(mockEvents);
          setIsLoading(false);
          return;
        }

        // Transform Supabase data to match expected format
        const transformedEvents = data?.map((event: any) => ({
          id: event.id,
          title: event.title,
          date: new Date(event.event_date).toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          }),
          time: event.event_time || 'TBA',
          location: event.location || 'Ka Lama Building',
          description: event.description || '',
          image: event.image_url || mockEvents[0].image,
          isFeatured: event.is_featured || false,
        })) || mockEvents;

        setEvents(transformedEvents.length > 0 ? transformedEvents : mockEvents);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        setEvents(mockEvents);
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const featuredEvent = events.find(e => e.isFeatured) || events[0];
  const upcomingEvents = events.filter(e => e.id !== featuredEvent?.id).slice(0, 3);

  if (isLoading) {
    return (
      <div className="size-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-2xl text-emerald-700">Loading events...</div>
      </div>
    );
  }

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
          <h1 className="text-4xl text-white">Upcoming Events</h1>
          <div className="w-40" />
        </div>
      </div>

      {/* Content */}
      <div className="px-12 py-12">
        {/* Featured Event */}
        {featuredEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-3xl text-emerald-900 mb-6">📅 FEATURED EVENT:</h2>
            <Card
              onClick={() => onNavigate('event-detail', featuredEvent)}
              className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all bg-white"
            >
              <div className="grid grid-cols-2 gap-0">
                <div className="relative h-96">
                  <ImageWithFallback
                    src={featuredEvent.image}
                    alt={featuredEvent.title}
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white text-xl px-6 py-2">
                    FEATURED
                  </Badge>
                </div>
                <div className="p-12 flex flex-col justify-center">
                  <h3 className="text-5xl text-slate-900 mb-6">{featuredEvent.title}</h3>
                  <div className="space-y-4 text-2xl text-slate-700 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-7 h-7 text-emerald-600" />
                      {featuredEvent.date}
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-7 h-7 text-emerald-600" />
                      {featuredEvent.time}
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-7 h-7 text-emerald-600" />
                      {featuredEvent.location}
                    </div>
                  </div>
                  <p className="text-xl text-slate-600 mb-6">{featuredEvent.description}</p>
                  <div className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg text-2xl">
                    TAP FOR DETAILS →
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* This Month Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl text-emerald-900 mb-6">📅 THIS MONTH:</h2>
            <div className="grid grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    onClick={() => onNavigate('event-detail', event)}
                    className="overflow-hidden cursor-pointer hover:shadow-xl transition-all bg-white"
                  >
                    <div className="relative h-48">
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="size-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="text-xl text-emerald-600 mb-2">{event.date.split(',')[0]}</div>
                      <h3 className="text-2xl text-slate-900 mb-3">{event.title}</h3>
                      <div className="text-lg text-slate-600 mb-2">{event.time}</div>
                      <div className="text-lg text-slate-500">{event.location}</div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <Card className="p-8 bg-gradient-to-br from-emerald-600 to-teal-600 text-white text-center">
          <h3 className="text-3xl mb-4">Want to add your event?</h3>
          <p className="text-2xl">Contact: events@hawaii.edu</p>
        </Card>
      </div>
    </div>
  );
}