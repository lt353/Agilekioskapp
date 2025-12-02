import { motion } from 'motion/react';
import { Card } from './ui/card';
import { KioskHeader } from './KioskHeader';
import { useState, useEffect } from 'react';
import { getJobListings, formatPostedDate } from '../data/jobsDataLoader';
import { JobListing } from '../data/jobsData';

interface JobsListingsProps {
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function JobsListings({ onNavigate, onBack, onHome, onWelcome, canGoBack }: JobsListingsProps) {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const jobListings = await getJobListings();
        setJobs(jobListings);
        setError(null);
      } catch (err) {
        console.error('Error loading job listings:', err);
        setError('Unable to load job listings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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
        title="CURRENT OPENINGS"
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
            style={{
              textAlign: 'center',
              marginBottom: '16px'
            }}
          >
            <h2 className="text-xl mb-2" style={{
              fontSize: '1.25rem',
              color: '#004f71',
              marginBottom: '8px',
              fontWeight: '600',
              lineHeight: '1.75rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
              Available Opportunities
            </h2>
            <p className="text-sm" style={{
              fontSize: '0.875rem',
              color: '#4a4a4a',
              fontWeight: '400',
              lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
              Tap any job to see full details
            </p>
          </motion.div>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
              style={{
                textAlign: 'center',
                paddingTop: '48px',
                paddingBottom: '48px'
              }}
            >
              <p className="text-lg" style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                fontWeight: '500',
                lineHeight: '1.75rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                Loading job opportunities...
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
              style={{
                textAlign: 'center',
                paddingTop: '48px',
                paddingBottom: '48px'
              }}
            >
              <p className="text-lg" style={{
                fontSize: '1.125rem',
                color: '#4a4a4a',
                fontWeight: '500',
                lineHeight: '1.75rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                {error}
              </p>
            </motion.div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
              style={{
                textAlign: 'center',
                paddingTop: '48px',
                paddingBottom: '48px'
              }}
            >
              <p className="text-lg" style={{
                fontSize: '1.125rem',
                color: '#4a4a4a',
                marginBottom: '8px',
                fontWeight: '500',
                lineHeight: '1.75rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                No job openings available at this time.
              </p>
              <p className="text-sm mt-2" style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginTop: '8px',
                fontWeight: '400',
                lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                Check back soon or visit the career services listed on the previous screen.
              </p>
            </motion.div>
          )}

          {!loading && !error && jobs.length > 0 && (
            <div className="space-y-3" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card
                    onClick={() => onNavigate('job-detail', job)}
                    className="p-4 bg-white hover:shadow-lg transition-all cursor-pointer border-l-4 border-[#004f71] hover:border-[#dd8a03]"
                    style={{
                      padding: '16px',
                      backgroundColor: '#ffffff',
                      borderLeft: '4px solid #004f71',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div className="flex justify-between items-start mb-2" style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '8px'
                    }}>
                      <h3 className="text-lg" style={{
                        fontSize: '1.125rem',
                        color: '#004f71',
                        fontWeight: '600',
                        lineHeight: '1.75rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                        {job.title}
                      </h3>
                      <span className="text-xs bg-[#789904] text-white px-2 py-1 rounded" style={{
                        fontSize: '0.75rem',
                        backgroundColor: '#789904',
                        color: '#ffffff',
                        paddingLeft: '8px',
                        paddingRight: '8px',
                        paddingTop: '4px',
                        paddingBottom: '4px',
                        borderRadius: '6px',
                        fontWeight: '500',
                        lineHeight: '1rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                        {job.type}
                      </span>
                    </div>
                    <p className="text-sm mb-1" style={{
                      fontSize: '0.875rem',
                      color: '#4a4a4a',
                      marginBottom: '4px',
                      lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                      <span className="font-semibold" style={ fontWeight: '600', fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif' }>{job.company}</span>
                    </p>
                    <p className="text-xs mb-2" style={{
                      fontSize: '0.75rem',
                      color: '#4a4a4a',
                      marginBottom: '8px',
                      fontWeight: '400',
                      lineHeight: '1rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                      {job.location} • {job.wage}
                    </p>
                    <p className="text-sm" style={{
                      fontSize: '0.875rem',
                      color: '#4a4a4a',
                      fontWeight: '400',
                      lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                      {job.description}
                    </p>
                    <div className="mt-3 flex justify-between items-center" style={{
                      marginTop: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span className="text-xs" style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '400',
                        lineHeight: '1rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                        Posted: {formatPostedDate(job.posted_date)}
                      </span>
                      <span className="text-sm" style={{
                        fontSize: '0.875rem',
                        color: '#004f71',
                        fontWeight: '500',
                        lineHeight: '1.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                        Tap for details →
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
