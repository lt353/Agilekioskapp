import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DynamicContentSlide, DynamicContent } from './DynamicContentSlide';
import { getSupabaseClient } from '../data/supabaseClient';
import { ATTRACT_CONTENT_REFRESH_INTERVAL, ATTRACT_SLIDE_DURATION } from '../constants/timeouts';
import kaLamaBuilding from 'figma:asset/ka-lama-building.png';
import busImage from 'figma:asset/business-program.png';
import hostImage from 'figma:asset/hospitality-program.png';
import accImage from 'figma:asset/accounting-program.png';
import abitImage from 'figma:asset/abit-program.png';
import learnGrowImage from 'figma:asset/learn-grow-thrive.png';
import fourProgramsImage from 'figma:asset/four-programs.png';
import whatsInsideImage from 'figma:asset/whats-inside.png';

interface AttractModeProps {
  onTouch: () => void;
}

// Static slide interface
interface StaticSlide {
  id: string;
  type: 'static';
  title: string;
  subtitle: string;
  image: string;
  gradientColors: string;
  showTouchIndicator?: boolean;
}

// Combined slide type
type Slide = StaticSlide | { type: 'dynamic'; content: DynamicContent };



export function AttractMode({ onTouch }: AttractModeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Define static slides (always present) - using authentic UHMC photos
  const staticSlides: StaticSlide[] = [
    {
      id: 'welcome',
      type: 'static',
      title: 'Welcome to\nUHMC Ka Lama',
      subtitle: 'Touch anywhere to explore your future',
      image: kaLamaBuilding,
      gradientColors: 'from-[#004f71]/70 via-[#00313c]/60 to-[#004f71]/70',
      showTouchIndicator: true,
    },
    {
      id: 'whats-inside',
      type: 'static',
      title: "What's Inside the Kiosk",
      subtitle: 'Programs • Building Directory • Jobs & Career Info',
      image: whatsInsideImage,
      gradientColors: 'from-[#004f71]/85 via-[#00313c]/80 to-[#004f71]/85',
      showTouchIndicator: true,
    },
    {
      id: 'programs',
      type: 'static',
      title: 'Which Path Is Right for You?',
      subtitle: 'Explore Our Four Programs: Business, Hospitality, Accounting & ABIT',
      image: fourProgramsImage,
      gradientColors: 'from-[#00313c]/70 via-[#004f71]/60 to-[#00313c]/70',
      showTouchIndicator: true,
    },
    {
      id: 'inspiration',
      type: 'static',
      title: 'Learn. Grow. Succeed.',
      subtitle: 'On the beautiful island of Maui',
      image: learnGrowImage,
      gradientColors: 'from-[#004f71]/70 via-[#789904]/40 to-[#004f71]/70',
      showTouchIndicator: true,
    },
    {
      id: 'directory',
      type: 'static',
      title: 'Lost in Ka Lama?',
      subtitle: 'Search by Room, Name or Browse the Map',
      image: 'https://res.cloudinary.com/sae-design-group/image/upload/q_auto,f_auto/v1594941946/maui-college-images/find-yourself-image_yangtc.jpg',
      gradientColors: 'from-[#789904]/50 via-[#004f71]/60 to-[#789904]/50',
      showTouchIndicator: true,
    },
    {
      id: 'jobs-careers',
      type: 'static',
      title: 'Explore Jobs & Careers',
      subtitle: 'Find Openings & Career Resources',
      image: 'https://maui.hawaii.edu/wp-content/uploads/2016/06/acc.jpg',
      gradientColors: 'from-[#00313c]/70 via-[#004f71]/60 to-[#00313c]/70',
      showTouchIndicator: true,
    },
  ];

  // Mock dynamic content for preview (used when Supabase is not connected)
  // Using authentic UHMC photos matched to content - no repeats!
  const mockDynamicContent: DynamicContent[] = [
    // Event Templates
    {
      id: 'event-1',
      type: 'event',
      title: 'Business Career Fair',
      subtitle: 'Connect with Top Employers',
      description: 'Meet hiring managers from leading Maui businesses',
      image_url: 'https://media.mauinow.com/file/mauinow/2024/04/UHMC-Open-House-Fair-program-booth--1024x682.jpg',
      event_date: '2025-11-15T10:00:00',
      learn_more_url: 'https://maui.hawaii.edu/business/events',
      template_variant: 1,
      display_order: 1,
      active: true,
    },
    {
      id: 'event-2',
      type: 'event',
      title: 'Hospitality Workshop',
      subtitle: 'Master the Art of Service',
      description: 'Learn from award-winning hotel managers',
      image_url: 'https://noblechef.maui.hawaii.edu/wp-content/uploads/2025/02/Noble-chef-uhmc_5815.jpg',
      event_date: '2025-11-20T14:00:00',
      learn_more_url: 'https://maui.hawaii.edu/hospitality',
      template_variant: 2,
      display_order: 2,
      active: true,
    },
    {
      id: 'event-3',
      type: 'event',
      title: 'ABIT Tech Showcase',
      subtitle: 'Innovation & Technology',
      description: 'See student projects and innovations',
      image_url: 'https://media.mauinow.com/file/mauinow/2023/04/6-UHMC-ACM-Principles-of-Video-Editing-Class-1024x683.jpg',
      event_date: '2025-12-05T13:00:00',
      learn_more_url: 'https://maui.hawaii.edu/abit',
      template_variant: 3,
      display_order: 3,
      active: true,
    },
    // Announcement Templates
    {
      id: 'announcement-1',
      type: 'announcement',
      title: 'Spring Registration Open',
      subtitle: 'Enroll Now for Spring 2026',
      description: 'Register early to secure your classes and plan your path to success',
      image_url: 'https://maui.hawaii.edu/wp-content/uploads/2016/06/acc.jpg',
      learn_more_url: 'https://maui.hawaii.edu/registration',
      gradient_colors: 'from-[#004f71]/80 via-[#00313c]/70 to-[#004f71]/80',
      template_variant: 1,
      display_order: 4,
      active: true,
    },
    {
      id: 'announcement-2',
      type: 'announcement',
      title: 'New Scholarship Available',
      subtitle: '$5,000 Business Excellence Award',
      description: 'Applications now being accepted for qualified business students. Visit our Financial Aid Office in room 203 for more information.',
      image_url: 'https://media.mauinow.com/file/mauinow/2023/05/maui-spring-2023-commencement-1.-ajpg.jpg',
      template_variant: 2,
      display_order: 5,
      active: true,
    },
    {
      id: 'announcement-3',
      type: 'announcement',
      title: 'Library Extended Hours',
      subtitle: 'Now Open Until 10 PM',
      description: 'Study spaces available with free WiFi and resources',
      image_url: 'https://filamvoicemaui.com/wp-content/uploads/2022/03/f1-2_rodrigues_peralta.jpg',
      learn_more_url: 'https://maui.hawaii.edu/library',
      template_variant: 3,
      display_order: 6,
      active: true,
    },
    // Promotion Templates
    {
      id: 'promotion-1',
      type: 'promotion',
      title: 'Start Your Journey Today',
      subtitle: 'Limited Time Offer',
      description: 'Apply now and waive your application fee through November',
      image_url: 'https://filamvoicemaui.com/wp-content/uploads/2022/03/f1-1_uhmc_lead_image.jpg',
      learn_more_url: 'https://maui.hawaii.edu/apply',
      template_variant: 1,
      display_order: 7,
      active: true,
    },
    {
      id: 'promotion-2',
      type: 'promotion',
      title: 'Join Our ʻOhana',
      subtitle: 'Campus Tours Available',
      description: 'Experience UHMC and discover why students choose us',
      image_url: 'https://media.mauinow.com/file/mauinow/2024/10/uhmc-1img13493_15968l-1024x683.jpeg',
      learn_more_url: 'https://maui.hawaii.edu/tour',
      gradient_colors: 'from-[#00313c]/80 via-[#004f71]/70 to-[#789904]/60',
      template_variant: 2,
      display_order: 8,
      active: true,
    },
    {
      id: 'promotion-3',
      type: 'promotion',
      title: 'Financial Aid Available',
      subtitle: 'Make Your Education Affordable',
      description: 'Free FAFSA assistance and counseling services. Visit our Financial Aid Office in room 203 for more information.',
      image_url: 'https://hawaii.edu/_files/images/cards/maui.jpg',
      learn_more_url: 'https://maui.hawaii.edu/financialaid',
      template_variant: 3,
      display_order: 9,
      active: true,
    },
  ];

  // Fetch dynamic content from Supabase
  useEffect(() => {
    async function fetchDynamicContent() {
      try {
        const supabase = getSupabaseClient();
        if (!supabase) {
          // No Supabase configured, use mock dynamic content for preview
          console.info('No Supabase connection - using mock dynamic content for preview');
          const mixedSlides = mixSlides(staticSlides, mockDynamicContent);
          setSlides(mixedSlides);
          setIsLoading(false);
          return;
        }

        const { data, error, status, statusText } = await supabase
          .from('attract_content')
          .select('*')
          .eq('active', true)
          .order('display_order', { ascending: true });

        if (error) {
          // Handle missing table or other errors gracefully
          if (error.code === 'PGRST204' || error.code === 'PGRST205') {
            console.info('Table "attract_content" not found - using mock data. Set up your Supabase tables to enable dynamic content.');
          } else if (error.code === '42501' || error.message?.includes('permission denied') || error.message?.includes('RLS')) {
            console.error('⚠️ RLS POLICY ERROR: Row Level Security is blocking access to attract_content table.');
            console.error('Fix: In Supabase Dashboard, go to Authentication > Policies > attract_content > Create a policy to allow SELECT for anon users.');
            console.error('Full error:', error);
          } else {
            console.error('Error fetching dynamic content (code: ' + error.code + '):', error);
          }
          // Fallback to mock content on error
          const mixedSlides = mixSlides(staticSlides, mockDynamicContent);
          setSlides(mixedSlides);
          setIsLoading(false);
          return;
        }

        // Mix static and dynamic slides
        const dynamicContent: DynamicContent[] = data || [];
        
        if (dynamicContent.length === 0) {
          console.warn('⚠️ No attract_content data in Supabase (or all content has active=false) - using mock data');
          const mixedSlides = mixSlides(staticSlides, mockDynamicContent);
          setSlides(mixedSlides);
        } else {
          const mixedSlides = mixSlides(staticSlides, dynamicContent);
          setSlides(mixedSlides);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch dynamic content:', error);
        // Fallback to mock content on error
        const mixedSlides = mixSlides(staticSlides, mockDynamicContent);
        setSlides(mixedSlides);
        setIsLoading(false);
      }
    }

    fetchDynamicContent();
    
    // Refresh content every 5 minutes to pick up changes
    const intervalId = setInterval(() => {
      fetchDynamicContent();
    }, ATTRACT_CONTENT_REFRESH_INTERVAL);
    
    return () => clearInterval(intervalId);
  }, []);

  // Mix static slides with dynamic content
  function mixSlides(
    staticSlides: StaticSlide[],
    dynamicContent: DynamicContent[]
  ): Slide[] {
    // Always start with welcome slide
    const mixed: Slide[] = [staticSlides[0]];

    if (dynamicContent.length === 0) {
      // No dynamic content, return all static slides
      return staticSlides;
    }

    // Intersperse static and dynamic slides
    let staticIndex = 1; // Start from second static slide (first is already added)
    let dynamicIndex = 0;

    while (staticIndex < staticSlides.length || dynamicIndex < dynamicContent.length) {
      // Add a dynamic slide if available
      if (dynamicIndex < dynamicContent.length) {
        mixed.push({
          type: 'dynamic',
          content: dynamicContent[dynamicIndex],
        });
        dynamicIndex++;
      }

      // Add a static slide if available
      if (staticIndex < staticSlides.length) {
        mixed.push(staticSlides[staticIndex]);
        staticIndex++;
      }
    }

    return mixed;
  }

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, ATTRACT_SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (isLoading) {
    return (
      <div className="size-full flex items-center justify-center bg-gradient-to-br from-[#004f71] to-[#00313c]" style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #004f71, #00313c)'
      }}>
        <div className="text-center" style={{
          textAlign: 'center'
        }}>
          <div className="text-white text-4xl mb-4" style={{
            color: '#ffffff',
            fontSize: '36px',
            marginBottom: '16px',
            fontWeight: '700'
          }}>UHMC Ka Lama</div>
          <div className="text-white text-2xl" style={{
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: '500'
          }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="size-full flex items-center justify-center bg-gradient-to-br from-[#004f71] to-[#00313c]" style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #004f71, #00313c)'
      }}>
        <div className="text-center text-white" style={{
          textAlign: 'center',
          color: '#ffffff'
        }}>
          <p className="text-3xl" style={{
            fontSize: '30px',
            margin: 0,
            fontWeight: '600',
            color: '#ffffff'
          }}>No content available</p>
        </div>
      </div>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <div
      onClick={onTouch}
      onTouchStart={onTouch}
      className="size-full cursor-pointer relative overflow-hidden"
      style={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }}
        >
          {currentSlideData.type === 'static' ? (
            <StaticSlideContent slide={currentSlideData} />
          ) : (
            <DynamicContentSlide content={currentSlideData.content} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10" style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 10
      }}>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
            style={{
              height: '8px',
              borderRadius: '9999px',
              transition: 'all 0.5s',
              width: index === currentSlide ? '32px' : '8px',
              backgroundColor: index === currentSlide ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Static slide component
function StaticSlideContent({ slide }: { slide: StaticSlide }) {
  // Parse gradient colors from the className format to inline CSS
  const gradientMap: Record<string, string> = {
    'from-[#004f71]/70 via-[#00313c]/60 to-[#004f71]/70': 'linear-gradient(to bottom right, rgba(0, 79, 113, 0.7), rgba(0, 49, 60, 0.6), rgba(0, 79, 113, 0.7))',
    'from-[#004f71]/85 via-[#00313c]/80 to-[#004f71]/85': 'linear-gradient(to bottom right, rgba(0, 79, 113, 0.85), rgba(0, 49, 60, 0.8), rgba(0, 79, 113, 0.85))',
    'from-[#00313c]/70 via-[#004f71]/60 to-[#00313c]/70': 'linear-gradient(to bottom right, rgba(0, 49, 60, 0.7), rgba(0, 79, 113, 0.6), rgba(0, 49, 60, 0.7))',
    'from-[#004f71]/70 via-[#789904]/40 to-[#004f71]/70': 'linear-gradient(to bottom right, rgba(0, 79, 113, 0.7), rgba(120, 153, 4, 0.4), rgba(0, 79, 113, 0.7))',
    'from-[#789904]/50 via-[#004f71]/60 to-[#789904]/50': 'linear-gradient(to bottom right, rgba(120, 153, 4, 0.5), rgba(0, 79, 113, 0.6), rgba(120, 153, 4, 0.5))',
  };

  const gradientStyle = gradientMap[slide.gradientColors] || 'linear-gradient(to bottom right, rgba(0, 79, 113, 0.7), rgba(0, 49, 60, 0.6), rgba(0, 79, 113, 0.7))';

  return (
    <>
      {/* Background Image */}
      <ImageWithFallback
        src={slide.image}
        alt={slide.title}
        className="size-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradientColors}`} style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: gradientStyle
      }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center" style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '32px',
        paddingRight: '32px',
        textAlign: 'center'
      }}>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl text-white mb-6 max-w-md leading-tight whitespace-pre-line"
          style={{
            fontSize: '36px',
            color: '#ffffff',
            marginBottom: '24px',
            maxWidth: '28rem',
            lineHeight: '1.25',
            whiteSpace: 'pre-line',
            fontWeight: '700'
          }}
        >
          {slide.title}
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-2xl text-white/90 mb-8"
          style={{
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '32px',
            fontWeight: '500'
          }}
        >
          {slide.subtitle}
        </motion.p>
      </div>

      {/* Touch to Begin indicator - positioned above slide indicators */}
      {slide.showTouchIndicator && (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute left-1/2 transform -translate-x-1/2 text-xl text-white/80 z-20 ${
            slide.id === 'inspiration' ? 'top-8' : 'bottom-16'
          }`}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.8)',
            zIndex: 20,
            top: slide.id === 'inspiration' ? '32px' : 'auto',
            bottom: slide.id === 'inspiration' ? 'auto' : '64px',
            fontWeight: '600'
          }}
        >
          👆 Touch to begin
        </motion.div>
      )}
    </>
  );
}
