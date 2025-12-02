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
    <div className="size-full bg-gradient-to-br from-[#f5f4f2] via-white to-[#f5f4f2] flex flex-col overflow-hidden" style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to bottom right, #f5f4f2, white, #f5f4f2)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <KioskHeader
        title="JOB DETAILS"
        onBack={onBack}
        onHome={onHome}
        onWelcome={onWelcome}
        canGoBack={canGoBack}
      />

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto" style={{
        flex: '1',
        overflowY: 'auto'
      }}>
        <div className="px-6 py-6 space-y-4" style={{
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingTop: '24px',
          paddingBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Job Title Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-5 bg-gradient-to-r from-[#004f71] to-[#00313c] text-white border-none shadow-lg" style={{
              padding: '20px',
              background: 'linear-gradient(to bottom right, #004f71, #00313c)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <h1 className="text-2xl mb-3" style={{
                fontSize: '1.5rem',
                marginBottom: '12px',
                color: '#ffffff',
                fontWeight: '700',
                lineHeight: '2rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{job.title}</h1>
              <div className="space-y-2 text-sm" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.875rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                <p className="flex items-center gap-2" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                  <Building className="w-4 h-4" style={{ width: '16px', height: '16px', color: '#ffffff' }} />
                  <span className="font-semibold" style={{ fontWeight: '600', color: '#ffffff' }}>{job.company}</span>
                </p>
                <p className="flex items-center gap-2" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                  <MapPin className="w-4 h-4" style={{ width: '16px', height: '16px', color: '#ffffff' }} />
                  {job.location}
                </p>
                <div className="flex gap-4 flex-wrap" style={{
                  display: 'flex',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}>
                  <p className="flex items-center gap-2" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                    <DollarSign className="w-4 h-4" style={{ width: '16px', height: '16px', color: '#ffffff' }} />
                    {job.wage}
                  </p>
                  <p className="flex items-center gap-2" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                    <Clock className="w-4 h-4" style={{ width: '16px', height: '16px', color: '#ffffff' }} />
                    {job.type}
                  </p>
                </div>
                {(job.min_hours || job.max_hours) && (
                  <p className="text-xs text-white/90" style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '400',
                    lineHeight: '1rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                    Hours: {job.min_hours && `${job.min_hours}`}{job.min_hours && job.max_hours && '-'}{job.max_hours && `${job.max_hours}`} hours/week
                  </p>
                )}
                <div className="flex items-center gap-4 pt-1" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  paddingTop: '4px'
                }}>
                  <p className="text-xs text-white/80" style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '400',
                    lineHeight: '1rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>Posted: {formatPostedDate(job.posted_date)}</p>
                  {job.closing_date && (
                    <p className="text-xs text-white/80 flex items-center gap-1" style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: '400',
                      lineHeight: '1rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                      <Calendar className="w-3 h-3" style={{ width: '12px', height: '12px', color: 'rgba(255, 255, 255, 0.8)' }} />
                      Closes: {new Date(job.closing_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {job.job_number && (
                  <p className="text-xs text-white/70" style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: '400',
                    lineHeight: '1rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>Job #: {job.job_number}</p>
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
            <Card className="p-5 bg-white border border-[#789904] shadow-md" style={{
              padding: '20px',
              backgroundColor: '#ffffff',
              border: '1px solid #789904',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 className="text-lg mb-3" style={{
                fontSize: '1.125rem',
                color: '#004f71',
                marginBottom: '12px',
                fontWeight: '600',
                lineHeight: '1.75rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                Job Description:
              </h2>
              <p className="text-base mb-4" style={{
                fontSize: '1rem',
                color: '#4a4a4a',
                marginBottom: '16px',
                fontWeight: '400',
                lineHeight: '1.5rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                {job.description}
              </p>

              {job.responsibilities && job.responsibilities.length > 0 && (
                <>
                  <h3 className="text-base mb-2" style={{
                    fontSize: '1rem',
                    color: '#004f71',
                    marginBottom: '8px',
                    fontWeight: '600',
                    lineHeight: '1.5rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                    Responsibilities:
                  </h3>
                  <ul className="space-y-1 mb-4" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    marginBottom: '16px'
                  }}>
                    {job.responsibilities.map((resp: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-2" style={{
                        fontSize: '0.875rem',
                        color: '#4a4a4a',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontWeight: '400',
                        lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                        <span className="text-[#789904] font-bold" style={{
                          color: '#789904',
                          fontWeight: '700',
                        fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
                        }}>•</span>
                        <span style={{ color: '#4a4a4a', fontSize: '0.875rem', fontWeight: '400',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{resp}</span>
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
              <Card className="p-5 bg-white border border-[#dd8a03] shadow-md" style={{
                padding: '20px',
                backgroundColor: '#ffffff',
                border: '1px solid #dd8a03',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <h2 className="text-lg mb-3" style={{
                  fontSize: '1.125rem',
                  color: '#004f71',
                  marginBottom: '12px',
                  fontWeight: '600',
                  lineHeight: '1.75rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                  Qualifications:
                </h2>
                <ul className="space-y-1" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  {job.qualifications.map((qual: string, index: number) => (
                    <li key={index} className="text-sm flex items-start gap-2" style={{
                      fontSize: '0.875rem',
                      color: '#4a4a4a',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      fontWeight: '400',
                      lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                      <span className="text-[#dd8a03] font-bold" style={{
                        color: '#dd8a03',
                        fontWeight: '700',
                      fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
                      }}>•</span>
                      <span style={{ color: '#4a4a4a', fontSize: '0.875rem', fontWeight: '400',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{qual}</span>
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
              <Card className="p-5 bg-gradient-to-br from-[#789904] to-[#afa96e] text-white border-none shadow-lg" style={{
                padding: '20px',
                background: 'linear-gradient(to bottom right, #789904, #afa96e)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <h2 className="text-lg mb-3" style={{
                  fontSize: '1.125rem',
                  color: '#ffffff',
                  marginBottom: '12px',
                  fontWeight: '600',
                  lineHeight: '1.75rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>How to Apply:</h2>
                <div className="space-y-2 text-sm" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '0.875rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                  {job.contact_email && (
                    <p className="flex items-center gap-2" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      fontWeight: '400',
                      lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                      <Mail className="w-4 h-4" style={{ width: '16px', height: '16px', color: '#ffffff' }} />
                      <span className="font-semibold" style={{ fontWeight: '600', color: '#ffffff' }}>Email:</span> {job.contact_email}
                    </p>
                  )}
                  {job.contact_phone && (
                    <p className="flex items-center gap-2" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      fontWeight: '400',
                      lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                      <Phone className="w-4 h-4" style={{ width: '16px', height: '16px', color: '#ffffff' }} />
                      <span className="font-semibold" style={{ fontWeight: '600', color: '#ffffff' }}>Phone:</span> {job.contact_phone}
                    </p>
                  )}
                  {job.contact_office && (
                    <p className="flex items-center gap-2" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      fontWeight: '400',
                      lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                      <Building className="w-4 h-4" style={{ width: '16px', height: '16px', color: '#ffffff' }} />
                      <span className="font-semibold" style={{ fontWeight: '600', color: '#ffffff' }}>Office:</span> {job.contact_office}
                    </p>
                  )}
                  {job.external_url && (
                    <p className="flex items-center gap-2" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      fontWeight: '400',
                      lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                      <ExternalLink className="w-4 h-4" style={{ width: '16px', height: '16px', color: '#ffffff' }} />
                      <span className="font-semibold" style={{ fontWeight: '600', color: '#ffffff' }}>More Info:</span> {job.external_url}
                    </p>
                  )}
                  {job.source && (
                    <p className="text-xs text-white/80 pt-1" style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      paddingTop: '4px',
                      fontWeight: '400',
                      lineHeight: '1rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
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
            style={{
              paddingTop: '8px',
              paddingBottom: '16px'
            }}
          >
            <Card className="p-5 bg-gradient-to-br from-[#004f71] to-[#00313c] text-white border-none shadow-lg" style={{
              padding: '20px',
              background: 'linear-gradient(to bottom right, #004f71, #00313c)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 className="text-lg mb-4" style={{
                fontSize: '1.125rem',
                color: '#ffffff',
                marginBottom: '16px',
                fontWeight: '600',
                lineHeight: '1.75rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>More Job Resources</h2>

              {/* CareerLink Information */}
              <div className="mb-5 pb-4 border-b border-white/20" style={{
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h3 className="text-base mb-2" style={{
                  fontSize: '1rem',
                  color: '#ffffff',
                  marginBottom: '8px',
                  fontWeight: '600',
                  lineHeight: '1.5rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>Visit CareerLink</h3>
                <p className="text-sm text-white/90 mb-2" style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '8px',
                  fontWeight: '400',
                  lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                  For personalized career counseling and job search assistance
                </p>
                <div className="space-y-1 text-xs text-white/80" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                  <p className="flex items-center gap-2" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '400',
                    lineHeight: '1rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                    <Building className="w-3 h-3" style={{ width: '12px', height: '12px', color: 'rgba(255, 255, 255, 0.8)' }} />
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.75rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}><span className="font-semibold" style={ fontWeight: '600', fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif' }>Location:</span> TLC Building (The Learning Center)</span>
                  </p>
                  <p className="flex items-center gap-2" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '400',
                    lineHeight: '1rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                    <Phone className="w-3 h-3" style={{ width: '12px', height: '12px', color: 'rgba(255, 255, 255, 0.8)' }} />
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.75rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}><span className="font-semibold" style={ fontWeight: '600', fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif' }>Phone:</span> (808) 984-3318</span>
                  </p>
                  <p className="flex items-center gap-2" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '400',
                    lineHeight: '1rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                    <Mail className="w-3 h-3" style={{ width: '12px', height: '12px', color: 'rgba(255, 255, 255, 0.8)' }} />
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.75rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}><span className="font-semibold" style={ fontWeight: '600', fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif' }>Email:</span> careerLK@hawaii.edu</span>
                  </p>
                </div>
              </div>

              {/* SECE with QR Code */}
              <div className="flex items-start gap-4" style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}>
                <div className="flex-1" style={{ flex: '1' }}>
                  <h3 className="text-base mb-2" style={{
                    fontSize: '1rem',
                    color: '#ffffff',
                    marginBottom: '8px',
                    fontWeight: '600',
                    lineHeight: '1.5rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>Visit SECE Online</h3>
                  <p className="text-sm text-white/90 mb-2" style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '8px',
                    fontWeight: '400',
                    lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                    Student Employment & Career Experience - Browse more job opportunities online
                  </p>
                  <p className="text-xs text-white/80" style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '400',
                    lineHeight: '1rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                    Scan the QR code to visit the SECE website on your phone
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-lg flex-shrink-0" style={{
                  backgroundColor: '#ffffff',
                  padding: '12px',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  flexShrink: 0
                }}>
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
