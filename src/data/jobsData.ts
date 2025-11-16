// Local fallback data for job listings
// This data is used when Supabase is unavailable

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string; // "Part-time", "Full-time", etc.
  wage: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  contact_email?: string;
  contact_phone?: string;
  contact_office?: string;
  posted_date: string;
  closing_date?: string;
  active: boolean;
  source: string; // "SECE", "Manual", etc.
  external_url?: string;
  job_number?: string;
  min_hours?: number;
  max_hours?: number;
}

// Local fallback job listings
export const jobListings: JobListing[] = [
  {
    id: '1',
    title: 'Student Office Assistant',
    company: 'UHMC Business Office',
    location: 'Ka Lama Building, Room 105',
    type: 'Part-time',
    wage: '$16/hr',
    description: 'Assist with administrative tasks, filing, and front desk support.',
    responsibilities: [
      'Answer phones and greet visitors',
      'File and organize documents',
      'Assist with data entry and record keeping',
      'Support administrative staff with daily tasks',
    ],
    qualifications: [
      'Currently enrolled UHMC student',
      'Strong organizational skills',
      'Professional communication abilities',
      'Basic computer skills (Word, Excel)',
    ],
    contact_email: 'businessoffice@hawaii.edu',
    contact_phone: '(808) 984-3500',
    contact_office: 'Ka Lama 105',
    posted_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    active: true,
    source: 'Manual',
    min_hours: 10,
    max_hours: 20,
  },
  {
    id: '2',
    title: 'Front Desk Associate',
    company: 'Grand Wailea Resort',
    location: 'Wailea, Maui',
    type: 'Full-time',
    wage: '$20/hr + Benefits',
    description: 'Provide exceptional guest service at a luxury resort front desk.',
    responsibilities: [
      'Check guests in and out efficiently',
      'Handle guest inquiries and requests',
      'Process reservations and payments',
      'Coordinate with other departments',
      'Resolve guest concerns professionally',
    ],
    qualifications: [
      'Hospitality or customer service experience',
      'Excellent communication skills',
      'Professional appearance and demeanor',
      'Ability to work flexible hours including weekends',
      'Computer proficiency',
    ],
    contact_email: 'careers@grandwailea.com',
    contact_phone: '(808) 875-1234',
    contact_office: 'HR Department',
    posted_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    active: true,
    source: 'SECE',
    external_url: 'https://hawaii.edu/sece/',
  },
  {
    id: '3',
    title: 'Accounting Intern',
    company: 'Island Financial Services',
    location: 'Kahului, Maui',
    type: 'Part-time',
    wage: '$18/hr',
    description: 'Gain hands-on experience in accounting and bookkeeping.',
    responsibilities: [
      'Assist with accounts payable and receivable',
      'Help prepare financial statements',
      'Support tax preparation activities',
      'Maintain organized financial records',
      'Learn accounting software systems',
    ],
    qualifications: [
      'Accounting or business student',
      'Basic knowledge of accounting principles',
      'Detail-oriented and organized',
      'Proficient in Excel and basic software',
      'Eager to learn and grow',
    ],
    contact_email: 'hr@islandfinancial.com',
    contact_phone: '(808) 877-4321',
    contact_office: 'Main Office',
    posted_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    active: true,
    source: 'Manual',
    min_hours: 15,
    max_hours: 25,
  },
];
