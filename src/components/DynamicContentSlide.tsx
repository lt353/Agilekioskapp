import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import QRCode from 'qrcode';

// UHMC branding colors
const UHMC_COLORS = {
  primaryBlue: '#004f71',
  darkBlue: '#00313c',
  gold: '#789904',
};

// Default fallback image when no image provided
const DEFAULT_FALLBACK_IMAGE = 'https://res.cloudinary.com/sae-design-group/image/upload/q_auto,f_auto/v1594941946/maui-college-images/find-yourself-image_yangtc.jpg';

export interface DynamicContent {
  id: string;
  type: 'event' | 'announcement' | 'promotion';
  title: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  event_date?: string; // ISO timestamp
  learn_more_url?: string;
  gradient_colors?: string;
  template_variant?: 1 | 2 | 3;
  display_order?: number;
  active: boolean;
}

interface DynamicContentSlideProps {
  content: DynamicContent;
}

export function DynamicContentSlide({ content }: DynamicContentSlideProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  // Generate QR code when component mounts or URL changes
  useEffect(() => {
    if (content.learn_more_url) {
      QRCode.toDataURL(content.learn_more_url, {
        width: 160,
        margin: 2,
        color: {
          dark: UHMC_COLORS.primaryBlue,
          light: '#FFFFFF',
        },
      })
        .then(setQrCodeUrl)
        .catch((err) => console.error('QR Code generation failed:', err));
    }
  }, [content.learn_more_url]);

  // Format event date for display
  const formatEventDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const fullDate = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    return { month, day, weekday, time, fullDate };
  };

  // Use provided image or fallback
  const imageUrl = content.image_url || DEFAULT_FALLBACK_IMAGE;
  
  // Use provided gradient or default
  const gradientClass = content.gradient_colors || 'from-[#004f71]/70 via-[#00313c]/60 to-[#004f71]/70';

  // Render appropriate template based on type and variant
  if (content.type === 'event') {
    return renderEventTemplate(content, imageUrl, gradientClass, qrCodeUrl, formatEventDate);
  } else if (content.type === 'announcement') {
    return renderAnnouncementTemplate(content, imageUrl, gradientClass, qrCodeUrl);
  } else if (content.type === 'promotion') {
    return renderPromotionTemplate(content, imageUrl, gradientClass, qrCodeUrl);
  }

  return null;
}

// EVENT TEMPLATE 1: Split screen with large date badge
function EventTemplate1({ content, imageUrl, gradientClass, qrCodeUrl, dateInfo }: any) {
  return (
    <div className="relative size-full">
      <ImageWithFallback src={imageUrl} alt={content.title} className="size-full object-cover" />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />

      <div className="absolute inset-0 flex flex-col">
        {/* Top Date Badge Section */}
        <div className="flex-1 flex items-center justify-center px-3 md:px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-3 md:p-6 shadow-2xl text-center"
          >
            <div className="text-sm md:text-xl mb-1 tracking-wide" style={{ color: UHMC_COLORS.gold }}>
              {dateInfo.weekday}
            </div>
            <div className="text-xl md:text-4xl mb-2" style={{ color: UHMC_COLORS.primaryBlue }}>
              {dateInfo.month}
            </div>
            <div className="text-3xl md:text-6xl mb-2" style={{ color: UHMC_COLORS.darkBlue }}>
              {dateInfo.day}
            </div>
            <div className="text-base md:text-2xl" style={{ color: UHMC_COLORS.gold }}>
              {dateInfo.time}
            </div>
          </motion.div>
        </div>

        {/* Bottom Info Section */}
        <div className="bg-white/95 p-3 md:p-6">
          <h2 className="text-lg md:text-3xl mb-2" style={{ color: UHMC_COLORS.primaryBlue }}>
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="text-sm md:text-xl mb-3 text-gray-700">{content.subtitle}</p>
          )}
          {content.description && (
            <p className="text-base text-gray-600 mb-4">{content.description}</p>
          )}

          {qrCodeUrl && (
            <div className="flex items-center gap-4">
              <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20 md:w-32 md:h-32" />
              <div>
                <p className="text-sm md:text-xl" style={{ color: UHMC_COLORS.primaryBlue }}>
                  Scan for details
                </p>
                <p className="text-sm text-gray-600">{dateInfo.fullDate}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Touch to Begin indicator - bottom center above progress bar, but top right since QR code blocks bottom */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-6 right-6 text-sm md:text-lg text-white/80 z-20"
      >
        👆 Touch to begin
      </motion.div>
    </div>
  );
}

// EVENT TEMPLATE 2: Diagonal split design
function EventTemplate2({ content, imageUrl, gradientClass, qrCodeUrl, dateInfo }: any) {
  return (
    <div className="relative size-full overflow-hidden">
      <ImageWithFallback src={imageUrl} alt={content.title} className="size-full object-cover" />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8">
        {/* Date Badge Pill */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-full px-4 md:px-8 py-4 mb-3 md:mb-6 shadow-2xl flex items-center gap-4"
        >
          <span className="text-lg md:text-3xl">📅</span>
          <div>
            <div className="text-sm tracking-wide mb-1" style={{ color: UHMC_COLORS.gold }}>
              {dateInfo.weekday}
            </div>
            <div className="text-base md:text-2xl" style={{ color: UHMC_COLORS.primaryBlue }}>
              {dateInfo.month} {dateInfo.day}
            </div>
            <div className="text-sm md:text-lg text-gray-600">{dateInfo.time}</div>
          </div>
        </motion.div>

        {/* Bold Typography */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-5xl text-white text-center mb-4 leading-tight"
        >
          {content.title}
        </motion.h1>

        {content.subtitle && (
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base md:text-2xl text-white/90 text-center mb-3 md:mb-6"
          >
            {content.subtitle}
          </motion.p>
        )}

        {/* QR Code Section */}
        {qrCodeUrl && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl p-3 md:p-6 shadow-2xl text-center"
          >
            <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20 md:w-32 md:h-32 mx-auto mb-3" />
            <p className="text-sm md:text-xl" style={{ color: UHMC_COLORS.primaryBlue }}>
              Scan to register
            </p>
          </motion.div>
        )}
      </div>

      {/* Touch to Begin indicator - bottom center above indicators */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-sm md:text-lg text-white/80 z-20"
      >
        👆 Touch to begin
      </motion.div>
    </div>
  );
}

// EVENT TEMPLATE 3: White card overlay
function EventTemplate3({ content, imageUrl, gradientClass, qrCodeUrl, dateInfo }: any) {
  return (
    <div className="relative size-full">
      <ImageWithFallback src={imageUrl} alt={content.title} className="size-full object-cover" />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />

      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 md:p-8 shadow-2xl max-w-md w-full"
        >
          <div className="text-center mb-3 md:mb-6">
            <div className="text-2xl md:text-5xl mb-4">📅</div>
            <h2 className="text-lg md:text-3xl mb-3" style={{ color: UHMC_COLORS.primaryBlue }}>
              {content.title}
            </h2>
            <div className="text-sm tracking-wide mb-1" style={{ color: UHMC_COLORS.gold }}>
              {dateInfo.weekday}
            </div>
            <div className="text-sm md:text-xl mb-2" style={{ color: UHMC_COLORS.primaryBlue }}>
              {dateInfo.month} {dateInfo.day} • {dateInfo.time}
            </div>
            {content.subtitle && (
              <p className="text-sm md:text-lg text-gray-700 mb-2">{content.subtitle}</p>
            )}
            {content.description && (
              <p className="text-base text-gray-600 mb-3 md:mb-6">{content.description}</p>
            )}
          </div>

          {/* QR Code */}
          {qrCodeUrl && (
            <div className="flex flex-col items-center">
              <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24 md:w-36 md:h-36 mb-3" />
              <p className="text-sm md:text-lg" style={{ color: UHMC_COLORS.primaryBlue }}>
                Learn more
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Touch to Begin indicator - bottom center above progress bar */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-sm md:text-lg text-white/80 z-20"
      >
        👆 Touch to begin
      </motion.div>
    </div>
  );
}

// ANNOUNCEMENT TEMPLATE 1: Centered design
function AnnouncementTemplate1({ content, imageUrl, gradientClass, qrCodeUrl }: any) {
  return (
    <div className="relative size-full">
      <ImageWithFallback src={imageUrl} alt={content.title} className="size-full object-cover" />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-full px-4 md:px-8 py-3 mb-3 md:mb-6 shadow-lg"
        >
          <span className="text-sm md:text-xl tracking-wider" style={{ color: UHMC_COLORS.primaryBlue }}>
            ANNOUNCEMENT
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-5xl text-white mb-4 max-w-md leading-tight"
        >
          {content.title}
        </motion.h1>

        {/* Subtitle */}
        {content.subtitle && (
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base md:text-2xl text-white/90 mb-4"
          >
            {content.subtitle}
          </motion.p>
        )}

        {/* Description */}
        {content.description && (
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm md:text-lg text-white/80 mb-3 md:mb-6 max-w-sm"
          >
            {content.description}
          </motion.p>
        )}

        {/* QR Code */}
        {qrCodeUrl && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-2xl p-3 md:p-6 shadow-2xl"
          >
            <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20 md:w-32 md:h-32 mx-auto mb-3" />
            <p className="text-sm md:text-xl" style={{ color: UHMC_COLORS.primaryBlue }}>
              Learn more
            </p>
          </motion.div>
        )}
      </div>

      {/* Touch to Begin indicator - bottom center above indicators */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-sm md:text-lg text-white/80 z-20"
      >
        👆 Touch to begin
      </motion.div>
    </div>
  );
}

// ANNOUNCEMENT TEMPLATE 2: Vertical split
function AnnouncementTemplate2({ content, imageUrl, gradientClass, qrCodeUrl }: any) {
  return (
    <div className="relative size-full flex flex-col">
      {/* Top: Image (50%) */}
      <div className="h-1/2 relative">
        <ImageWithFallback src={imageUrl} alt={content.title} className="size-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />

      </div>

      {/* Bottom: Content Panel (50%) */}
      <div className="h-1/2 bg-white relative">
        {/* Colored accent border */}
        <div
          className="absolute left-0 top-0 right-0 h-1"
          style={{ backgroundColor: UHMC_COLORS.gold }}
        />

        <div className="h-full flex flex-col justify-center px-4 md:px-8 py-3 md:py-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-sm md:text-lg tracking-wider mb-2 md:mb-4" style={{ color: UHMC_COLORS.gold }}>
              ANNOUNCEMENT
            </div>

            <h2 className="text-lg md:text-3xl mb-2 md:mb-4 leading-tight" style={{ color: UHMC_COLORS.primaryBlue }}>
              {content.title}
            </h2>

            {content.subtitle && (
              <p className="text-sm md:text-xl mb-3 text-gray-700">{content.subtitle}</p>
            )}

            {content.description && (
              <p className="text-base text-gray-600 mb-2 md:mb-4">{content.description}</p>
            )}

            {/* QR Code */}
            {qrCodeUrl && (
              <div className="flex items-center gap-4">
                <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20 md:w-28 md:h-28" />
                <p className="text-base" style={{ color: UHMC_COLORS.primaryBlue }}>
                  Scan for<br />more info
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Touch to Begin indicator - bottom center above progress bar */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-sm md:text-lg text-gray-800 z-20"
      >
        👆 Touch to begin
      </motion.div>
    </div>
  );
}

// ANNOUNCEMENT TEMPLATE 3: Ribbon banner style
function AnnouncementTemplate3({ content, imageUrl, gradientClass, qrCodeUrl }: any) {
  return (
    <div className="relative size-full">
      <ImageWithFallback src={imageUrl} alt={content.title} className="size-full object-cover" />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />

      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
        <motion.div
          initial={{ rotate: -2, scale: 0.95, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 md:p-8 shadow-2xl max-w-md w-full relative"
        >
          {/* Corner accent squares */}
          <div
            className="absolute top-0 left-0 w-10 h-10 rounded-tl-2xl"
            style={{ backgroundColor: UHMC_COLORS.gold }}
          />
          <div
            className="absolute bottom-0 right-0 w-10 h-10 rounded-br-2xl"
            style={{ backgroundColor: UHMC_COLORS.gold }}
          />

          <div className="text-sm md:text-xl mb-2 md:mb-4 tracking-wider" style={{ color: UHMC_COLORS.primaryBlue }}>
            IMPORTANT ANNOUNCEMENT
          </div>

          <h2 className="text-xl md:text-4xl mb-2 md:mb-4 leading-tight" style={{ color: UHMC_COLORS.darkBlue }}>
            {content.title}
          </h2>

          {content.subtitle && (
            <p className="text-base md:text-2xl mb-3" style={{ color: UHMC_COLORS.gold }}>
              {content.subtitle}
            </p>
          )}

          {content.description && (
            <p className="text-sm md:text-lg text-gray-700 mb-3 md:mb-6">{content.description}</p>
          )}

          {/* QR Code */}
          {qrCodeUrl && (
            <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
              <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20 md:w-28 md:h-28" />
              <div>
                <p className="text-sm md:text-lg mb-1" style={{ color: UHMC_COLORS.primaryBlue }}>
                  Scan to learn more
                </p>
                <p className="text-sm text-gray-600">Get all the details</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Touch to Begin indicator - bottom center above progress bar */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-sm md:text-lg text-white/80 z-20"
      >
        👆 Touch to begin
      </motion.div>
    </div>
  );
}

// PROMOTION TEMPLATE 1: Bold centered CTA
function PromotionTemplate1({ content, imageUrl, gradientClass, qrCodeUrl }: any) {
  return (
    <div className="relative size-full">
      <ImageWithFallback src={imageUrl} alt={content.title} className="size-full object-cover" />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 text-center">
        {/* Pulsing subtitle badge */}
        {content.subtitle && (
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="rounded-full px-4 md:px-8 py-3 mb-3 md:mb-6 shadow-lg"
            style={{ backgroundColor: UHMC_COLORS.gold }}
          >
            <span className="text-sm md:text-xl text-white tracking-wide">
              {content.subtitle}
            </span>
          </motion.div>
        )}

        {/* Massive title */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-6xl text-white mb-3 md:mb-6 max-w-md leading-tight"
        >
          {content.title}
        </motion.h1>

        {/* Description */}
        {content.description && (
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-2xl text-white/90 mb-4 md:mb-8 max-w-sm"
          >
            {content.description}
          </motion.p>
        )}

        {/* QR Code with "Scan Now" */}
        {qrCodeUrl && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl p-3 md:p-6 shadow-2xl"
          >
            <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24 md:w-36 md:h-36 mx-auto mb-4" />
            <p className="text-lg md:text-3xl" style={{ color: UHMC_COLORS.primaryBlue }}>
              Scan Now
            </p>
          </motion.div>
        )}
      </div>

      {/* Touch to Begin indicator - top right since QR code and content block bottom */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-6 right-6 text-sm md:text-lg text-white/80 z-20"
      >
        👆 Touch to begin
      </motion.div>
    </div>
  );
}

// PROMOTION TEMPLATE 2: Bottom-weighted design
function PromotionTemplate2({ content, imageUrl, gradientClass, qrCodeUrl }: any) {
  return (
    <div className="relative size-full">
      <ImageWithFallback src={imageUrl} alt={content.title} className="size-full object-cover" />
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80`} />

      <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-8 pb-4 md:pb-8">
        {/* Tilted badge for subtitle */}
        {content.subtitle && (
          <motion.div
            initial={{ rotate: -3, x: -50, opacity: 0 }}
            animate={{ rotate: -2, x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="self-start bg-white rounded-xl px-3 md:px-6 py-3 mb-2 md:mb-4 shadow-xl"
            style={{ transform: 'rotate(-2deg)' }}
          >
            <span className="text-sm md:text-xl" style={{ color: UHMC_COLORS.primaryBlue }}>
              {content.subtitle}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-5xl text-white mb-2 md:mb-4 leading-tight"
        >
          {content.title}
        </motion.h1>

        {/* Description */}
        {content.description && (
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm md:text-lg text-white/90 mb-3 md:mb-6 max-w-sm"
          >
            {content.description}
          </motion.p>
        )}

        {/* "Take Action" QR Section */}
        {qrCodeUrl && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-xl p-5 shadow-2xl self-start flex items-center gap-4"
          >
            <div>
              <p className="text-sm md:text-xl mb-1" style={{ color: UHMC_COLORS.primaryBlue }}>
                Take Action
              </p>
              <p className="text-sm text-gray-600">Scan to get started</p>
            </div>
            <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20 md:w-28 md:h-28" />
          </motion.div>
        )}
      </div>

      {/* Touch to Begin indicator - top right corner since bottom is filled with content */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-6 right-6 text-sm md:text-lg text-white/80 z-20"
      >
        👆 Touch to begin
      </motion.div>
    </div>
  );
}

// PROMOTION TEMPLATE 3: Feature highlight with side image
function PromotionTemplate3({ content, imageUrl, gradientClass, qrCodeUrl }: any) {
  return (
    <div className="relative size-full flex flex-col">
      {/* Top: Solid gradient background (60%) */}
      <div
        className="h-[60%] flex items-center justify-center px-4 md:px-8 relative"
        style={{ background: `linear-gradient(135deg, ${UHMC_COLORS.primaryBlue} 0%, ${UHMC_COLORS.darkBlue} 100%)` }}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          {content.subtitle && (
            <div className="text-sm md:text-xl mb-2 md:mb-4" style={{ color: UHMC_COLORS.gold }}>
              {content.subtitle}
            </div>
          )}

          <h1 className="text-2xl md:text-5xl text-white mb-5 leading-tight">
            {content.title}
          </h1>

          {content.description && (
            <p className="text-sm md:text-lg text-white/90 mb-3 md:mb-6">
              {content.description}
            </p>
          )}

          {/* QR Code in frosted glass card */}
          {qrCodeUrl && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 inline-block">
              <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20 md:w-32 md:h-32 mx-auto mb-3" />
              <p className="text-sm md:text-xl text-white">Get Started</p>
            </div>
          )}
        </motion.div>

      </div>

      {/* Bottom: Image (40%) */}
      <div className="h-[40%] relative">
        <ImageWithFallback src={imageUrl} alt={content.title} className="size-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Touch to Begin indicator - bottom center above progress bar */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-sm md:text-lg text-white/80 z-20"
      >
        👆 Touch to begin
      </motion.div>
    </div>
  );
}

// Main render function that routes to appropriate template
function renderEventTemplate(
  content: DynamicContent,
  imageUrl: string,
  gradientClass: string,
  qrCodeUrl: string,
  formatEventDate: (date: string) => any
) {
  const variant = content.template_variant || 1;
  const dateInfo = content.event_date ? formatEventDate(content.event_date) : null;

  const props = { content, imageUrl, gradientClass, qrCodeUrl, dateInfo };

  switch (variant) {
    case 1:
      return <EventTemplate1 {...props} />;
    case 2:
      return <EventTemplate2 {...props} />;
    case 3:
      return <EventTemplate3 {...props} />;
    default:
      return <EventTemplate1 {...props} />;
  }
}

function renderAnnouncementTemplate(
  content: DynamicContent,
  imageUrl: string,
  gradientClass: string,
  qrCodeUrl: string
) {
  const variant = content.template_variant || 1;
  const props = { content, imageUrl, gradientClass, qrCodeUrl };

  switch (variant) {
    case 1:
      return <AnnouncementTemplate1 {...props} />;
    case 2:
      return <AnnouncementTemplate2 {...props} />;
    case 3:
      return <AnnouncementTemplate3 {...props} />;
    default:
      return <AnnouncementTemplate1 {...props} />;
  }
}

function renderPromotionTemplate(
  content: DynamicContent,
  imageUrl: string,
  gradientClass: string,
  qrCodeUrl: string
) {
  const variant = content.template_variant || 1;
  const props = { content, imageUrl, gradientClass, qrCodeUrl };

  switch (variant) {
    case 1:
      return <PromotionTemplate1 {...props} />;
    case 2:
      return <PromotionTemplate2 {...props} />;
    case 3:
      return <PromotionTemplate3 {...props} />;
    default:
      return <PromotionTemplate1 {...props} />;
  }
}