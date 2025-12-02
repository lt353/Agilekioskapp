import { motion } from 'motion/react';
import { Card } from './ui/card';
import { KioskHeader } from './KioskHeader';

interface ProgramDetailProps {
  program: any;
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function ProgramDetail({ program, onNavigate, onBack, onHome, onWelcome, canGoBack }: ProgramDetailProps) {
  const programDetails: Record<string, any> = {
    abit: {
      fullTitle: 'ABIT - APPLIED BUSINESS & INFORMATION TECHNOLOGY',
      programType: 'Bachelor of Applied Science (BAS) - 4-year degree',
      overview: 'The BAS in Applied Business and Information Technology (ABIT) program presents an exceptional opportunity for those looking to enhance their business acumen and technology expertise. This innovative hybrid degree equips students with vital business, entrepreneurship, and technology skills, preparing them for a dynamic job market. Graduates from the ABIT program are poised to excel—many successfully enter graduate school, launch their startups, or secure rewarding positions in organizations of all sizes.',
      passionAreas: [
        'Technology Entrepreneurship - Launch your own tech startup',
        'Information Technology Services - Manage IT systems and infrastructure',
        'Cybersecurity - Protect organizations from digital threats',
        'Project Management - Lead teams and deliver successful projects',
        'Artificial Intelligence/Machine Learning - Work with cutting-edge AI technology',
      ],
      pathways: [
        { title: 'Full 4-Year Program', credits: '121 credits (8 semesters)' },
        { title: 'Transfer Path', credits: '60 upper division credits (4 semesters) - 100% online' },
      ],
      careerFocus: [
        'Technology Entrepreneurship',
        'Cybersecurity & IT Services',
        'Artificial Intelligence/Machine Learning',
        'Project Management',
        'Software Development',
      ],
      topCareers: [
        { title: 'Software Developer', salary: '$110,140/year' },
        { title: 'Information Security Analyst', salary: '$103,590/year' },
        { title: 'Data Scientist', salary: '$98,230/year' },
        { title: 'Computer Research Scientist', salary: '$126,830/year' },
        { title: 'Business Analyst (Hawaii)', salary: '$68,346/year avg' },
      ],
      specialFeatures: [
        'NSA Cybersecurity Certificate upon graduation',
        'Industry certifications (Google, CompTIA) aligned with courses',
        'Most affordable upper division in UH System ($3,672/semester)',
        'Transfer agreements with all UH community colleges',
      ],
      contacts: [
        { name: 'Dr. Debasis Bhattacharya', email: 'debasisb@hawaii.edu', phone: '(808) 984-3619' },
        { name: 'Linda Fujitani', email: 'lkfujita@hawaii.edu', phone: '(808) 984-3226', appointments: '(808) 984-3306' },
      ],
      website: 'maui.hawaii.edu/programs/abit',
    },
    business: {
      fullTitle: 'BUSINESS ADMINISTRATION',
      programType: 'Certificates and Associate in Applied Science (AAS)',
      overview: 'Interested in a career in business but not sure where to start? The Business Administration program at UH Maui College offers a wide range of courses in entrepreneurship, accounting, and business management to help you advance your business career or give you the skills to start your own small business. The UH Maui College Business Administration program offers certificates and degrees to help you reach your goals. With an AAS degree, you can also transfer to bachelor degree programs at UH Maui College or UH West Oahu.',
      pathways: [
        { title: 'Certificate (CO)', credits: '9-12 credits (1 semester or less)' },
        { title: 'Certificate (CA)', credits: '30 credits (~1 year)' },
        { title: 'AAS Degree', credits: '61 credits (~2 years)' },
        { title: 'AAS-Business Technology', credits: '61 credits with tech focus' },
      ],
      learningAreas: [
        'Leadership & Business Ethics',
        'Management Functions (Planning, Organizing, Leading, Controlling)',
        'Accounting Principles',
        'Marketing & Sales Strategies',
        'Business Communication',
        'Mathematics for Business',
      ],
      careers: [
        'Business Owner/Entrepreneur',
        'Operations Manager',
        'Marketing Specialist',
        'Sales Professional',
        'Business Analyst',
        'Office Manager',
        'Retail Management',
      ],
      transferOptions: [
        'UH Maui College ABIT Bachelor\'s Program',
        'UH West Oahu',
        'UH Mānoa',
        'Other 4-year business programs',
      ],
      contacts: [
        { name: 'Dr. Gil Logan', email: 'glogan@hawaii.edu', phone: '(808) 984-3344' },
        { name: 'Linda Fujitani', email: 'lkfujita@hawaii.edu', phone: '(808) 984-3226', appointments: '(808) 984-3306' },
      ],
      website: 'maui.hawaii.edu/programs/busc',
    },
    hospitality: {
      fullTitle: 'HOSPITALITY & TOURISM',
      programType: 'ACPHA Accredited - Certificates and Associate in Applied Science (AAS)',
      overview: 'The Hospitality & Tourism (HOST) program at UH Maui College is accredited by the Accreditation Commission for Programs in Hospitality Administration (ACPHA) — one of the leading hospitality programs in the Pacific. The program is organized with a core of courses focusing on various aspects of the hotel industry, enveloped by a variety of business and general education courses to broaden students\' backgrounds and enhance employability.',
      keyStats: [
        { label: '100% Job Placement Rate', value: '' },
        { label: '24 Current Majors', value: '' },
        { label: '75% Retention Rate', value: '' },
      ],
      pathways: [
        { title: 'Certificate (CO)', credits: 'Short-term focused training' },
        { title: 'Certificate (CA)', credits: '~1 year foundational training' },
        { title: 'AAS Degree', credits: '63-64 credits (2 years)' },
      ],
      uniqueFeatures: [
        'ACPHA Accreditation (only one in Hawaii)',
        'International Internships Available',
        'Study Abroad Opportunities',
        'Hawaiian Cultural Focus',
        'Industry-Experienced Faculty (CHE certified)',
      ],
      careers: [
        'Hotel/Resort Manager',
        'Event Planner/Coordinator',
        'Food & Beverage Manager',
        'Tourism Marketing Manager',
        'Convention Services Manager',
        'Restaurant Manager',
        'Spa Manager',
        'Hospitality Consultant',
      ],
      industries: 'Hotels, Resorts, Restaurants, Event Venues, Tourism Agencies, Cruise Lines, Airlines',
      transferPartners: [
        'UH West Oahu (Articulation Agreement)',
        'Northern Arizona University (Articulation Agreement)',
      ],
      contacts: [
        { name: 'Lorelle Peros, CHE', email: 'lorelle@hawaii.edu', phone: '(808) 984-3343' },
        { name: 'Linda Fujitani', email: 'lkfujita@hawaii.edu', phone: '(808) 984-3226', appointments: '(808) 984-3306' },
      ],
      website: 'maui.hawaii.edu/programs/host',
    },
    accounting: {
      fullTitle: 'ACCOUNTING',
      programType: 'Certificates and Associate in Applied Science (AAS)',
      overview: 'The Accounting Program at UH Maui College prepares you for careers in accounting with small businesses, hotels, service industries, and other organizations on Maui and beyond. With the Certificate of Achievement, you can launch your career in entry-level positions such as Accounting Clerk, Accounting Assistant, or Accounts Payable/Receivable Clerk. Continue on to earn the Associate in Applied Science degree, which opens the door to even more opportunities as a Bookkeeper, Accounting Technician, or Office Manager. With additional education, you can advance further to become an Accountant or Auditor.',
      additionalInfo: 'The Accounting program at UH Maui College is designed to prepare students for entry-level positions in the accounting profession within government and private business. Students who select the Accounting program should have the interest and aptitude for computational work.',
      whyAccounting: [
        'Always in High Demand',
        'Job Security (AI-resistant profession)',
        'Competitive Salaries',
        'Global Opportunities',
        'Work Flexibility (remote/hybrid options)',
        'Universal Need (every business needs accountants)',
      ],
      pathways: [
        { title: 'Certificate (CA)', credits: '30 credits (~1 year)' },
        { title: 'AAS Degree', credits: '60-61 credits (~2 years)' },
      ],
      careerProgression: {
        certificate: [
          'Accounting Clerk',
          'Accounting Assistant',
          'Accounts Payable/Receivable Clerk',
        ],
        aas: [
          'Bookkeeper',
          'Accounting Technician',
          'Office Manager',
          'Payroll Specialist',
        ],
        additional: [
          'Accountant',
          'Auditor',
          'Tax Preparer',
          'Financial Analyst',
        ],
      },
      learningAreas: [
        'Financial & Managerial Accounting',
        'Hawaii & Federal Tax Law',
        'Payroll Processing',
        'QuickBooks Software',
        'Excel for Accounting',
        'Accounting Cycle & Financial Statements',
      ],
      specialRequirements: [
        'Grade of C or better required in accounting courses',
        'Letter grades required (not pass/fail)',
      ],
      transferOptions: 'UH Maui ABIT, UH Mānoa Shidler College, UH Hilo, UH West Oahu',
      contacts: [
        { name: 'Aubrey Weston', email: 'aubrey77@hawaii.edu', phone: '(808) 984-3470' },
        { name: 'Linda Fujitani', email: 'lkfujita@hawaii.edu', phone: '(808) 984-3226', appointments: '(808) 984-3306' },
      ],
      website: 'maui.hawaii.edu/programs/accounting',
    },
  };

  const details = programDetails[program.id];

  return (
    <div className="size-full bg-gradient-to-br from-[#afa96e]/20 via-white to-[#aca39a]/10 flex flex-col" style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom right, rgba(175, 169, 110, 0.2), white, rgba(172, 163, 154, 0.1))', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <KioskHeader 
        title={details.fullTitle} 
        onBack={onBack} 
        onHome={onHome}
        onWelcome={onWelcome}
        canGoBack={canGoBack}
      />

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6" style={{ flex: '1', overflow: 'auto', paddingLeft: '32px', paddingRight: '32px', paddingTop: '24px', paddingBottom: '24px' }}>
        {/* Program Type */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-[#004f71] to-[#00313c] border-0" style={{ background: 'linear-gradient(to bottom right, #004f71, #00313c)', padding: '32px', borderRadius: '12px', border: 'none', marginBottom: '24px' }}>
          <h3 className="text-3xl text-[#ffb600]" style={{ fontSize: '1.875rem', color: '#ffb600', fontWeight: '700', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{details.programType}</h3>
        </Card>

        {/* Overview */}
        <Card className="p-8 mb-6 bg-white" style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
          <h3 className="text-3xl text-slate-900 mb-4" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>OVERVIEW</h3>
          <p className="text-lg text-slate-700 leading-relaxed" style={{ fontSize: '1.125rem', color: '#334155', lineHeight: '1.75',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{details.overview}</p>
          {details.additionalInfo && (
            <p className="text-lg text-slate-700 leading-relaxed mt-4" style={{ fontSize: '1.125rem', color: '#334155', lineHeight: '1.75', marginTop: '16px',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{details.additionalInfo}</p>
          )}
        </Card>

        {/* ABIT-Specific Content */}
        {program.id === 'abit' && (
          <>
            {/* Passion Areas */}
            <Card className="p-8 mb-6 bg-gradient-to-br from-emerald-600 to-teal-600 text-white" style={{ background: 'linear-gradient(to bottom right, #059669, #0d9488)', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl mb-4" style={{ fontSize: '1.875rem', color: '#ffffff', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>IF YOUR PASSION LIES IN THE FOLLOWING, ABIT IS FOR YOU!</h3>
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {details.passionAreas.map((passion: string, index: number) => (
                  <div key={index} className="p-4 bg-white/10 rounded-lg" style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                    <p className="text-lg break-words" style={{ fontSize: '1.125rem', color: '#ffffff', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{passion}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Two Pathways */}
            <Card className="p-8 mb-6 bg-white" style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl text-slate-900 mb-4" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>TWO PATHWAYS</h3>
              <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {details.pathways.map((pathway: any, index: number) => (
                  <div key={index} className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg" style={{ padding: '20px', background: 'linear-gradient(to right, #ecfdf5, #f0fdfa)', borderRadius: '8px' }}>
                    <h4 className="text-2xl text-emerald-700 mb-2" style={{ fontSize: '1.5rem', color: '#047857', marginBottom: '8px', fontWeight: '600',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{pathway.title}</h4>
                    <p className="text-lg text-slate-700" style={{ fontSize: '1.125rem', color: '#334155', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{pathway.credits}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Career Focus Areas */}
            <Card className="p-8 mb-6 bg-white" style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl text-slate-900 mb-4" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>CAREER FOCUS AREAS</h3>
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {details.careerFocus.map((focus: string, index: number) => (
                  <div key={index} className="p-4 bg-emerald-50 rounded-lg" style={{ padding: '16px', background: '#ecfdf5', borderRadius: '8px' }}>
                    <p className="text-lg text-slate-700 break-words" style={{ fontSize: '1.125rem', color: '#334155', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{focus}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Careers & Salaries */}
            <Card className="p-8 mb-6 bg-white" style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl text-slate-900 mb-4" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>TOP CAREERS & SALARIES</h3>
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {details.topCareers.map((career: any, index: number) => (
                  <div key={index} className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg flex justify-between items-center" style={{ padding: '20px', background: 'linear-gradient(to right, #ecfdf5, #f0fdfa)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 className="text-xl text-slate-900 break-words" style={{ fontSize: '1.25rem', color: '#0f172a', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{career.title}</h4>
                    <p className="text-2xl text-emerald-700 flex-shrink-0 ml-4" style={{ fontSize: '1.5rem', color: '#047857', flexShrink: '0', marginLeft: '16px', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{career.salary}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Special Features */}
            <Card className="p-8 mb-6 bg-gradient-to-br from-[#004f71] to-[#00313c] text-white" style={{ background: 'linear-gradient(to bottom right, #004f71, #00313c)', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl mb-4" style={{ fontSize: '1.875rem', color: '#ffffff', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>SPECIAL FEATURES</h3>
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {details.specialFeatures.map((feature: string, index: number) => (
                  <div key={index} className="p-4 bg-white/10 rounded-lg" style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                    <p className="text-lg break-words" style={{ fontSize: '1.125rem', color: '#ffffff', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{feature}</p>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* Business-Specific Content */}
        {program.id === 'business' && (
          <>
            {/* Flexible Pathways */}
            <Card className="p-8 mb-6 bg-white" style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl text-slate-900 mb-4" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>FLEXIBLE PATHWAYS</h3>
              <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {details.pathways.map((pathway: any, index: number) => (
                  <div key={index} className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg bg-[rgb(93,142,217)]" style={{ padding: '20px', background: 'linear-gradient(to right, #ecfdf5, #f0fdfa)', borderRadius: '8px' }}>
                    <h4 className="text-2xl text-emerald-700 mb-2" style={{ fontSize: '1.5rem', color: '#047857', marginBottom: '8px', fontWeight: '600',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{pathway.title}</h4>
                    <p className="text-lg text-slate-700" style={{ fontSize: '1.125rem', color: '#334155', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{pathway.credits}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* What You'll Learn */}
            <Card className="p-8 mb-6 bg-white" style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl text-slate-900 mb-4" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>WHAT YOU'LL LEARN</h3>
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {details.learningAreas.map((area: string, index: number) => (
                  <div key={index} className="p-4 bg-emerald-50 rounded-lg" style={{ padding: '16px', background: '#ecfdf5', borderRadius: '8px' }}>
                    <p className="text-lg text-slate-700 break-words" style={{ fontSize: '1.125rem', color: '#334155', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{area}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Career Opportunities */}
            <Card className="p-8 mb-6 bg-white" style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl text-slate-900 mb-4" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>CAREER OPPORTUNITIES</h3>
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {details.careers.map((career: string, index: number) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg" style={{ padding: '16px', background: 'linear-gradient(to right, #ecfdf5, #f0fdfa)', borderRadius: '8px' }}>
                    <p className="text-lg text-slate-700 break-words" style={{ fontSize: '1.125rem', color: '#334155', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{career}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Transfer Options */}
            <Card className="p-8 mb-6 bg-gradient-to-br from-[#004f71] to-[#00313c] text-white" style={{ background: 'linear-gradient(to bottom right, #004f71, #00313c)', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl mb-4" style={{ fontSize: '1.875rem', color: '#ffffff', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>TRANSFER OPTIONS</h3>
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {details.transferOptions.map((option: string, index: number) => (
                  <div key={index} className="p-4 bg-white/10 rounded-lg" style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                    <p className="text-lg break-words" style={{ fontSize: '1.125rem', color: '#ffffff', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{option}</p>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* Hospitality-Specific Content */}
        {program.id === 'hospitality' && (
          <>
            {/* Key Statistics */}
            <Card className="mb-6 bg-gradient-to-br from-[#004f71] to-[#00313c] text-white px-[15px] py-[32px]" style={{ background: 'linear-gradient(to bottom right, #004f71, #00313c)', paddingLeft: '15px', paddingRight: '15px', paddingTop: '32px', paddingBottom: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl mb-4" style={{ fontSize: '1.875rem', color: '#ffffff', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>KEY STATISTICS</h3>
              <div className="grid grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {details.keyStats.map((stat: any, index: number) => (
                  <div key={index} className="text-center bg-white/10 rounded-lg px-[10px] py-[16px]" style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', paddingLeft: '10px', paddingRight: '10px', paddingTop: '16px', paddingBottom: '16px' }}>
                    <p className="text-2xl break-words text-[16px] px-[1px] py-[0px] text-center" style={{ fontSize: '16px', color: '#ffffff', wordWrap: 'break-word', paddingLeft: '1px', paddingRight: '1px', paddingTop: '0px', paddingBottom: '0px', textAlign: 'center', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Program Options */}
            <Card className="p-8 mb-6 bg-white" style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl text-slate-900 mb-4" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>PROGRAM OPTIONS</h3>
              <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {details.pathways.map((pathway: any, index: number) => (
                  <div key={index} className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg" style={{ padding: '20px', background: 'linear-gradient(to right, #ecfdf5, #f0fdfa)', borderRadius: '8px' }}>
                    <h4 className="text-2xl text-emerald-700 mb-2" style={{ fontSize: '1.5rem', color: '#047857', marginBottom: '8px', fontWeight: '600',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{pathway.title}</h4>
                    <p className="text-lg text-slate-700" style={{ fontSize: '1.125rem', color: '#334155', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{pathway.credits}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Unique Features */}
            <Card className="p-8 mb-6 bg-white" style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl text-slate-900 mb-4" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>UNIQUE FEATURES</h3>
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {details.uniqueFeatures.map((feature: string, index: number) => (
                  <div key={index} className="p-4 bg-[rgb(60,139,165)] rounded-lg" style={{ padding: '16px', background: 'rgb(60, 139, 165)', borderRadius: '8px' }}>
                    <p className="text-lg text-[rgb(250,252,255)] break-words font-bold" style={{ fontSize: '1.125rem', color: 'rgb(250, 252, 255)', wordWrap: 'break-word', fontWeight: '700', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{feature}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Career Paths */}
            <Card className="p-8 mb-6 bg-white" style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl text-slate-900 mb-4" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>CAREER PATHS</h3>
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {details.careers.map((career: string, index: number) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg" style={{ padding: '16px', background: 'linear-gradient(to right, #ecfdf5, #f0fdfa)', borderRadius: '8px' }}>
                    <p className="text-lg text-slate-700 break-words" style={{ fontSize: '1.125rem', color: '#334155', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{career}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Industries */}
            <Card className="p-8 mb-6 bg-gradient-to-br from-[#004f71] to-[#00313c] text-white" style={{ background: 'linear-gradient(to bottom right, #004f71, #00313c)', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl mb-4" style={{ fontSize: '1.875rem', color: '#ffffff', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>INDUSTRIES</h3>
              <p className="text-xl break-words" style={{ fontSize: '1.25rem', color: '#ffffff', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{details.industries}</p>
            </Card>

            {/* Transfer Partners */}
            <Card className="p-8 mb-6 bg-white" style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl text-slate-900 mb-4" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>TRANSFER PARTNERS</h3>
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {details.transferPartners.map((partner: string, index: number) => (
                  <div key={index} className="p-4 bg-emerald-50 rounded-lg" style={{ padding: '16px', background: '#ecfdf5', borderRadius: '8px' }}>
                    <p className="text-lg text-slate-700 break-words" style={{ fontSize: '1.125rem', color: '#334155', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{partner}</p>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* Accounting-Specific Content */}
        {program.id === 'accounting' && (
          <>
            {/* Why Accounting */}
            <Card className="p-8 mb-6 bg-gradient-to-br from-[#004f71] to-[#00313c] text-white" style={{ background: 'linear-gradient(to bottom right, #004f71, #00313c)', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl mb-4" style={{ fontSize: '1.875rem', color: '#ffffff', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>WHY ACCOUNTING?</h3>
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {details.whyAccounting.map((reason: string, index: number) => (
                  <div key={index} className="p-4 bg-white/10 rounded-lg" style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                    <p className="text-lg break-words" style={{ fontSize: '1.125rem', color: '#ffffff', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{reason}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Program Options */}
            <Card className="p-8 mb-6 bg-white" style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl text-slate-900 mb-4" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>PROGRAM OPTIONS</h3>
              <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {details.pathways.map((pathway: any, index: number) => (
                  <div key={index} className="p-5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg" style={{ padding: '20px', background: 'linear-gradient(to right, #fffbeb, #fefce8)', borderRadius: '8px' }}>
                    <h4 className="text-2xl text-amber-700 mb-2" style={{ fontSize: '1.5rem', color: '#b45309', marginBottom: '8px', fontWeight: '600',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{pathway.title}</h4>
                    <p className="text-lg text-slate-700" style={{ fontSize: '1.125rem', color: '#334155', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{pathway.credits}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Career Progression */}
            <Card className="p-8 mb-6 bg-white" style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl text-slate-900 mb-6" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '24px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>CAREER PROGRESSION</h3>

              <div className="mb-6" style={{ marginBottom: '24px' }}>
                <h4 className="text-2xl text-amber-700 mb-3" style={{ fontSize: '1.5rem', color: '#b45309', marginBottom: '12px', fontWeight: '600',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>With Certificate:</h4>
                <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {details.careerProgression.certificate.map((career: string, index: number) => (
                    <div key={index} className="p-3 bg-amber-50 rounded-lg" style={{ padding: '12px', background: '#fffbeb', borderRadius: '8px' }}>
                      <p className="text-lg text-slate-700 break-words" style={{ fontSize: '1.125rem', color: '#334155', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{career}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6" style={{ marginBottom: '24px' }}>
                <h4 className="text-2xl text-amber-700 mb-3" style={{ fontSize: '1.5rem', color: '#b45309', marginBottom: '12px', fontWeight: '600',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>With AAS Degree:</h4>
                <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {details.careerProgression.aas.map((career: string, index: number) => (
                    <div key={index} className="p-3 bg-amber-50 rounded-lg" style={{ padding: '12px', background: '#fffbeb', borderRadius: '8px' }}>
                      <p className="text-lg text-slate-700 break-words" style={{ fontSize: '1.125rem', color: '#334155', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{career}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '0' }}>
                <h4 className="text-2xl text-amber-700 mb-3" style={{ fontSize: '1.5rem', color: '#b45309', marginBottom: '12px', fontWeight: '600',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>With Additional Education:</h4>
                <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {details.careerProgression.additional.map((career: string, index: number) => (
                    <div key={index} className="p-3 bg-amber-50 rounded-lg" style={{ padding: '12px', background: '#fffbeb', borderRadius: '8px' }}>
                      <p className="text-lg text-slate-700 break-words" style={{ fontSize: '1.125rem', color: '#334155', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{career}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* What You'll Learn */}
            <Card className="p-8 mb-6 bg-white" style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl text-slate-900 mb-4" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>WHAT YOU'LL LEARN</h3>
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {details.learningAreas.map((area: string, index: number) => (
                  <div key={index} className="p-4 bg-amber-50 rounded-lg" style={{ padding: '16px', background: '#fffbeb', borderRadius: '8px' }}>
                    <p className="text-lg text-slate-700 break-words" style={{ fontSize: '1.125rem', color: '#334155', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{area}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Special Requirements */}
            <Card className="p-8 mb-6 bg-amber-50 border-l-4 border-amber-600" style={{ background: '#fffbeb', padding: '32px', borderRadius: '12px', marginBottom: '24px', borderLeft: '4px solid #d97706' }}>
              <h3 className="text-3xl text-slate-900 mb-4" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>SPECIAL REQUIREMENTS</h3>
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {details.specialRequirements.map((req: string, index: number) => (
                  <p key={index} className="text-lg text-slate-700 break-words" style={{ fontSize: '1.125rem', color: '#334155', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>• {req}</p>
                ))}
              </div>
            </Card>

            {/* Transfer Options */}
            <Card className="p-8 mb-6 bg-gradient-to-br from-[#004f71] to-[#00313c] text-white" style={{ background: 'linear-gradient(to bottom right, #004f71, #00313c)', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
              <h3 className="text-3xl mb-4" style={{ fontSize: '1.875rem', color: '#ffffff', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>TRANSFER OPTIONS</h3>
              <p className="text-xl break-words" style={{ fontSize: '1.25rem', color: '#ffffff', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{details.transferOptions}</p>
            </Card>
          </>
        )}

        {/* Contact Information - All Programs */}
        <Card className="p-8 mb-6 bg-white" style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', marginBottom: '24px' }}>
          <h3 className="text-3xl text-slate-900 mb-6" style={{ fontSize: '1.875rem', color: '#0f172a', marginBottom: '24px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>CONTACT INFORMATION</h3>
          <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {details.contacts.map((contact: any, index: number) => (
              <div key={index} className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg" style={{ padding: '24px', background: 'linear-gradient(to right, #ecfdf5, #f0fdfa)', borderRadius: '8px' }}>
                <h4 className="text-2xl text-slate-900 mb-3 break-words" style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '12px', wordWrap: 'break-word', fontWeight: '600',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{contact.name}</h4>
                <div className="space-y-1 text-slate-700" style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: '#334155' }}>
                  <p className="text-lg break-words" style={{ fontSize: '1.125rem', color: '#334155', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>Email: {contact.email}</p>
                  <p className="text-lg break-words" style={{ fontSize: '1.125rem', color: '#334155', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>Phone: {contact.phone}</p>
                  {contact.appointments && (
                    <p className="text-lg break-words" style={{ fontSize: '1.125rem', color: '#334155', wordWrap: 'break-word', margin: '0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>Appointments: {contact.appointments}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Website */}
        <Card className="p-8 bg-gradient-to-br from-[#004f71] to-[#00313c] text-white" style={{ background: 'linear-gradient(to bottom right, #004f71, #00313c)', padding: '32px', borderRadius: '12px' }}>
          <h3 className="text-3xl mb-4" style={{ fontSize: '1.875rem', color: '#ffffff', marginBottom: '16px', fontWeight: '700',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>LEARN MORE</h3>
          <p className="text-xl mb-3" style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '12px', margin: '0 0 12px 0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>Visit the program website:</p>
          <a
            href={`https://${details.website}`}
            className="text-2xl text-[#ffb600] underline hover:text-[#ffb600]/80 break-all inline-block"
            style={{ fontSize: '1.5rem', color: '#ffb600', textDecoration: 'underline', wordWrap: 'break-word', display: 'inline-block',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}
            target="_blank"
            rel="noopener noreferrer"
          >
            {details.website}
          </a>
        </Card>
      </div>
    </div>
  );
}
