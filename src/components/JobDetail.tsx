import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { KioskHeader } from './KioskHeader';
import { MapPin, DollarSign, Clock, Mail, Phone, Building, ExternalLink, Calendar } from 'lucide-react';
import { JobListing } from '../data/jobsData';
import { formatPostedDate } from '../data/jobsDataLoader';
import { QRCodeSVG } from 'qrcode.react';

interface JobDetailProps {
  job: JobListing;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function JobDetail({ job, onBack, onHome, onWelcome, canGoBack }: JobDetailProps) {

  return (
    <div className="size-full bg-gradient-to-br from-[#f5f4f2] via-white to-[#f5f4f2] flex flex-col overflow-hidden">
      {/* Header */}
      <KioskHeader
        title="JOB DETAILS"
        onBack={onBack}
        onHome={onHome}
        onWelcome={onWelcome}
        canGoBack={canGoBack}
      />

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-6 space-y-4">
          {/* Job Title Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-5 bg-gradient-to-r from-[#004f71] to-[#00313c] text-white border-none shadow-lg">
              <h1 className="text-2xl mb-3">{job.title}</h1>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span className="font-semibold">{job.company}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </p>
                <div className="flex gap-4 flex-wrap">
                  <p className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    {job.wage}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {job.type}
                  </p>
                </div>
                {(job.min_hours || job.max_hours) && (
                  <p className="text-xs text-white/90">
                    Hours: {job.min_hours && `${job.min_hours}`}{job.min_hours && job.max_hours && '-'}{job.max_hours && `${job.max_hours}`} hours/week
                  </p>
                )}
                <div className="flex items-center gap-4 pt-1">
                  <p className="text-xs text-white/80">Posted: {formatPostedDate(job.posted_date)}</p>
                  {job.closing_date && (
                    <p className="text-xs text-white/80 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Closes: {new Date(job.closing_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {job.job_number && (
                  <p className="text-xs text-white/70">Job #: {job.job_number}</p>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Job Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-5 bg-white border border-[#789904] shadow-md">
              <h2 className="text-lg mb-3" style={{ color: 'var(--uhmc-deep-teal)' }}>
                Job Description:
              </h2>
              <p className="text-base mb-4" style={{ color: 'var(--uhmc-dark-gray)' }}>
                {job.description}
              </p>

              {job.responsibilities && job.responsibilities.length > 0 && (
                <>
                  <h3 className="text-base mb-2" style={{ color: 'var(--uhmc-deep-teal)' }}>
                    Responsibilities:
                  </h3>
                  <ul className="space-y-1 mb-4">
                    {job.responsibilities.map((resp: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-2" style={{ color: 'var(--uhmc-dark-gray)' }}>
                        <span className="text-[#789904] font-bold">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Card>
          </motion.div>

          {/* Qualifications */}
          {job.qualifications && job.qualifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-5 bg-white border border-[#dd8a03] shadow-md">
                <h2 className="text-lg mb-3" style={{ color: 'var(--uhmc-deep-teal)' }}>
                  Qualifications:
                </h2>
                <ul className="space-y-1">
                  {job.qualifications.map((qual: string, index: number) => (
                    <li key={index} className="text-sm flex items-start gap-2" style={{ color: 'var(--uhmc-dark-gray)' }}>
                      <span className="text-[#dd8a03] font-bold">•</span>
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}

          {/* How to Apply */}
          {(job.contact_email || job.contact_phone || job.contact_office || job.external_url) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-5 bg-gradient-to-br from-[#789904] to-[#afa96e] text-white border-none shadow-lg">
                <h2 className="text-lg mb-3">How to Apply:</h2>
                <div className="space-y-2 text-sm">
                  {job.contact_email && (
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="font-semibold">Email:</span> {job.contact_email}
                    </p>
                  )}
                  {job.contact_phone && (
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span className="font-semibold">Phone:</span> {job.contact_phone}
                    </p>
                  )}
                  {job.contact_office && (
                    <p className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      <span className="font-semibold">Office:</span> {job.contact_office}
                    </p>
                  )}
                  {job.external_url && (
                    <p className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      <span className="font-semibold">More Info:</span> {job.external_url}
                    </p>
                  )}
                  {job.source && (
                    <p className="text-xs text-white/80 pt-1">
                      Source: {job.source}
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          )}

          {/* More Resources - CareerLink & SECE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-2 pb-4"
          >
            <Card className="p-5 bg-gradient-to-br from-[#004f71] to-[#00313c] text-white border-none shadow-lg">
              <h2 className="text-lg mb-4">More Job Resources</h2>
              
              {/* CareerLink Information */}
              <div className="mb-5 pb-4 border-b border-white/20">
                <h3 className="text-base mb-2">Visit CareerLink</h3>
                <p className="text-sm text-white/90 mb-2">
                  For personalized career counseling and job search assistance
                </p>
                <div className="space-y-1 text-xs text-white/80">
                  <p className="flex items-center gap-2">
                    <Building className="w-3 h-3" />
                    <span><span className="font-semibold">Location:</span> TLC Building (The Learning Center)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    <span><span className="font-semibold">Phone:</span> (808) 984-3318</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    <span><span className="font-semibold">Email:</span> careerLK@hawaii.edu</span>
                  </p>
                </div>
              </div>

              {/* SECE with QR Code */}
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-base mb-2">Visit SECE Online</h3>
                  <p className="text-sm text-white/90 mb-2">
                    Student Employment & Career Experience - Browse more job opportunities online
                  </p>
                  <p className="text-xs text-white/80">
                    Scan the QR code to visit the SECE website on your phone
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-lg flex-shrink-0">
                  <QRCodeSVG
                    value="https://www.hawaii.edu/sece/"
                    size={120}
                    level="H"
                    fgColor="#004f71"
                    bgColor="#ffffff"
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
