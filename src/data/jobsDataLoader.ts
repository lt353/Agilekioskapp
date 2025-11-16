import { jobListings as localJobListings, JobListing } from './jobsData';
import { getSupabaseClient, testSupabaseConnection } from './supabaseClient';

// Cache for job listings data
let cachedJobListings: JobListing[] | null = null;
let isFetching = false;
let fetchPromise: Promise<JobListing[]> | null = null;
let hasTestedConnection = false;

/**
 * Fetch job listings from Supabase or use local fallback
 * This function caches the result and reuses it for subsequent calls
 */
export async function getJobListings(): Promise<JobListing[]> {
  // Return cached data if available
  if (cachedJobListings) {
    return cachedJobListings;
  }

  // If already fetching, wait for that promise
  if (isFetching && fetchPromise) {
    return fetchPromise;
  }

  // Start fetching
  isFetching = true;
  fetchPromise = (async () => {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        console.info('No Supabase connection - using local job listings data');
        cachedJobListings = localJobListings;
        return localJobListings;
      }

      // Test connection on first run
      if (!hasTestedConnection) {
        hasTestedConnection = true;
        await testSupabaseConnection();
      }

      console.log('🔄 Fetching job listings from Supabase... (timestamp:', new Date().toISOString(), ')');
      
      const { data, error, status, statusText } = await supabase
        .from('job_openings')
        .select('*')
        .eq('active', true)
        .order('posted_date', { ascending: false });

      if (error) {
        console.error('❌ Error fetching job listings from Supabase:', {
          error,
          status,
          statusText,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        console.info('Using local job listings fallback data');
        cachedJobListings = localJobListings;
        return localJobListings;
      }

      if (!data || data.length === 0) {
        console.info('ℹ️ No job listings in Supabase table yet. Using local data for preview.');
        console.info('💡 Add job listings to your "job_openings" table in Supabase to see real data.');
        cachedJobListings = localJobListings;
        return localJobListings;
      }

      console.log('✅ Successfully fetched', data.length, 'job listings from Supabase');
      
      // Transform the data to match our JobListing interface
      const jobListings: JobListing[] = data.map((job: any) => ({
        id: job.id.toString(),
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        wage: job.wage,
        description: job.description,
        responsibilities: job.responsibilities || [],
        qualifications: job.qualifications || [],
        contact_email: job.contact_email,
        contact_phone: job.contact_phone,
        contact_office: job.contact_office,
        posted_date: job.posted_date,
        closing_date: job.closing_date,
        active: job.active,
        source: job.source,
        external_url: job.external_url,
        job_number: job.job_number,
        min_hours: job.min_hours,
        max_hours: job.max_hours,
      }));

      cachedJobListings = jobListings;
      return jobListings;

    } catch (error) {
      console.error('❌ Exception while fetching job listings from Supabase:', error);
      console.info('Using local job listings fallback data');
      cachedJobListings = localJobListings;
      return localJobListings;
    } finally {
      isFetching = false;
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}

/**
 * Get a single job listing by ID
 */
export async function getJobById(id: string): Promise<JobListing | null> {
  const allJobs = await getJobListings();
  return allJobs.find(job => job.id === id) || null;
}

/**
 * Clear the cache to force a fresh fetch on next call
 * Useful when you know the data has been updated
 */
export function clearJobListingsCache(): void {
  cachedJobListings = null;
  fetchPromise = null;
  console.log('🗑️ Job listings cache cleared');
}

/**
 * Format posted date for display
 */
export function formatPostedDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}