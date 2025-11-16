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
    <div className="size-full bg-gradient-to-br from-[#f5f4f2] via-white to-[#f5f4f2] flex flex-col overflow-hidden">
      {/* Header */}
      <KioskHeader
        title="CURRENT OPENINGS"
        onBack={onBack}
        onHome={onHome}
        onWelcome={onWelcome}
        canGoBack={canGoBack}
      />

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-6 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <h2 className="text-xl mb-2" style={{ color: 'var(--uhmc-deep-teal)' }}>
              Available Opportunities
            </h2>
            <p className="text-sm" style={{ color: 'var(--uhmc-dark-gray)' }}>
              Tap any job to see full details
            </p>
          </motion.div>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-lg" style={{ color: 'var(--uhmc-medium-gray)' }}>
                Loading job opportunities...
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-lg" style={{ color: 'var(--uhmc-dark-gray)' }}>
                {error}
              </p>
            </motion.div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-lg" style={{ color: 'var(--uhmc-dark-gray)' }}>
                No job openings available at this time.
              </p>
              <p className="text-sm mt-2" style={{ color: 'var(--uhmc-medium-gray)' }}>
                Check back soon or visit the career services listed on the previous screen.
              </p>
            </motion.div>
          )}

          {!loading && !error && jobs.length > 0 && (
            <div className="space-y-3">
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
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg" style={{ color: 'var(--uhmc-deep-teal)' }}>
                        {job.title}
                      </h3>
                      <span className="text-xs bg-[#789904] text-white px-2 py-1 rounded">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-sm mb-1" style={{ color: 'var(--uhmc-dark-gray)' }}>
                      <span className="font-semibold">{job.company}</span>
                    </p>
                    <p className="text-xs mb-2" style={{ color: 'var(--uhmc-dark-gray)' }}>
                      {job.location} • {job.wage}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--uhmc-dark-gray)' }}>
                      {job.description}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs" style={{ color: 'var(--uhmc-medium-gray)' }}>
                        Posted: {formatPostedDate(job.posted_date)}
                      </span>
                      <span className="text-sm" style={{ color: 'var(--uhmc-deep-teal)' }}>
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
