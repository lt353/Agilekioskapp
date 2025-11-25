// Comprehensive room data for UHMC Ka Lama Building

export interface RoomData {
  number: string;
  name: string;
  type: 'faculty' | 'student-services' | 'administrative' | 'restroom' | 'stairs' | 'elevator' | 'classroom' | 'office' | 'unassigned' | 'program-services';
  floor: 1 | 2;
  occupant?: string;
  department?: string;
  category?: string;
  hours?: string;
  phone?: string;
  email?: string;
  description?: string;
  position?: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

export const roomDatabase: Record<string, RoomData> = {
  // FLOOR 1 - STUDENT SERVICES / RESOURCE CENTERS
  '101': { 
    number: '101', 
    name: 'Pai Ka Mana / EOC', 
    type: 'student-services', 
    floor: 1,
    category: 'Student Services / Resource Centers',
    description: 'Student Support & Educational Opportunity Center',
    hours: 'Mon-Fri 8:00 AM - 4:30 PM'
  },
  '106': { 
    number: '106', 
    name: "Veteran's Resource Center", 
    type: 'student-services', 
    floor: 1,
    category: 'Student Services / Resource Centers',
    description: 'Support Services for Veterans',
    hours: 'Mon-Fri 8:00 AM - 4:30 PM'
  },

  // FLOOR 1 - FACULTY OFFICES - SOCIAL SCIENCE
  '110': { 
    number: '110', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 1, 
    occupant: 'Paul Thornton',
    department: 'Social Science',
    category: 'Faculty Offices - Social Science',
    hours: 'By appointment'
  },
  '111': { 
    number: '111', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 1, 
    occupant: 'Julie Powers',
    department: 'Social Science',
    category: 'Faculty Offices - Social Science',
    hours: 'By appointment'
  },
  '120': { 
    number: '120', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 1, 
    occupant: 'Selene LeGare',
    department: 'Social Science',
    category: 'Faculty Offices - Social Science',
    hours: 'By appointment'
  },
  '121': { 
    number: '121', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 1, 
    occupant: 'Melissa Kirkendall',
    department: 'Social Science',
    category: 'Faculty Offices - Social Science',
    hours: 'By appointment'
  },

  // FLOOR 1 - FACULTY OFFICES - HUMANITIES
  '117': { 
    number: '117', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 1, 
    occupant: 'Charlie Schlather',
    department: 'Humanities and Social Science',
    category: 'Faculty Offices - Humanities',
    hours: 'By appointment'
  },
  '119': { 
    number: '119', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 1, 
    occupant: 'Ron St. John',
    department: 'Humanities',
    category: 'Faculty Offices - Humanities',
    hours: 'By appointment'
  },
  '123': { 
    number: '123', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 1, 
    occupant: 'Liana Horovitz',
    department: 'Humanities',
    category: 'Faculty Offices - Humanities',
    hours: 'By appointment'
  },
  '125': { 
    number: '125', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 1, 
    occupant: 'Velma Panlasigui / Cathy Yago',
    department: 'Humanities and Social Science / Title III',
    category: 'Faculty Offices - Humanities',
    hours: 'By appointment'
  },

  // FLOOR 1 - FACULTY OFFICES - STEM DEPARTMENT
  '114': { 
    number: '114', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 1, 
    occupant: 'Tim Botkin',
    department: 'STEM Department',
    category: 'Faculty Offices - STEM Department',
    hours: 'By appointment'
  },
  '115': { 
    number: '115', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 1, 
    occupant: 'Meagan Jones',
    department: 'STEM Department',
    category: 'Faculty Offices - STEM Department',
    hours: 'By appointment'
  },
  '126': { 
    number: '126', 
    name: 'STEM Department Lecturers', 
    type: 'faculty', 
    floor: 1, 
    department: 'STEM Department',
    category: 'Faculty Offices - STEM Department',
    hours: 'By appointment'
  },

  // FLOOR 1 - FACULTY OFFICES - OTHER DEPARTMENTS
  '112': { 
    number: '112', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 1, 
    occupant: 'Gemma Medina',
    department: 'Early Childhood Education',
    category: 'Faculty Offices - Other Departments',
    hours: 'By appointment'
  },
  '113': { 
    number: '113', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 1, 
    occupant: 'Leanne Higa',
    department: 'Dental Hygiene',
    category: 'Faculty Offices - Other Departments',
    hours: 'By appointment'
  },
  '122': { 
    number: '122', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 1, 
    occupant: 'Liping Liu, PhD',
    department: 'Business and Hospitality',
    category: 'Faculty Offices - Other Departments',
    hours: 'By appointment'
  },

  // FLOOR 1 - PROGRAM / SERVICE OFFICES
  '127': { 
    number: '127', 
    name: 'Hawaii Child Welfare CQI', 
    type: 'program-services', 
    floor: 1,
    category: 'Program / Service Offices',
    description: 'Child Welfare Services',
    hours: 'Mon-Fri 8:00 AM - 4:30 PM'
  },
  '130': { 
    number: '130', 
    name: 'Staff Office', 
    type: 'office', 
    floor: 1, 
    occupant: 'Wayne Aguiran',
    category: 'Program / Service Offices',
    hours: 'Mon-Fri 8:00 AM - 4:30 PM'
  },
  '131': { 
    number: '131', 
    name: 'Good Jobs Hawaii', 
    type: 'program-services', 
    floor: 1, 
    occupant: 'Marshall Norman',
    category: 'Program / Service Offices',
    hours: 'Mon-Fri 8:00 AM - 4:30 PM'
  },
  '134': { 
    number: '134', 
    name: 'Staff Office', 
    type: 'office', 
    floor: 1, 
    occupant: 'Eri Nomura',
    category: 'Program / Service Offices',
    hours: 'Mon-Fri 8:00 AM - 4:30 PM'
  },

  // FLOOR 1 - OTHER ROOMS
  '102': { number: '102', name: 'Classroom', type: 'classroom', floor: 1, description: 'General classroom space' },
  '103': { number: '103', name: 'Classroom', type: 'classroom', floor: 1, description: 'General classroom space' },
  '103A': { number: '103A', name: 'Storage', type: 'office', floor: 1 },
  '104A': { number: '104A', name: 'Classroom', type: 'classroom', floor: 1 },
  '104B': { number: '104B', name: 'Classroom', type: 'classroom', floor: 1 },
  '105': { number: '105', name: 'Office', type: 'office', floor: 1 },
  '107': { number: '107', name: 'Classroom', type: 'classroom', floor: 1 },
  '108': { number: '108', name: 'Classroom', type: 'classroom', floor: 1 },
  '109': { number: '109', name: 'Classroom', type: 'classroom', floor: 1 },
  '116': { number: '116', name: 'Storage', type: 'office', floor: 1 },
  '118': { number: '118', name: 'Office', type: 'office', floor: 1 },
  '124': { number: '124', name: 'Office', type: 'office', floor: 1 },
  '132': { number: '132', name: 'Office', type: 'office', floor: 1 },
  '133': { number: '133', name: 'Office', type: 'office', floor: 1 },
  '135': { number: '135', name: 'Office', type: 'office', floor: 1 },
  '137': { number: '137', name: 'Office', type: 'office', floor: 1 },
  'A-1': { number: 'A-1', name: 'Restroom', type: 'restroom', floor: 1 },

  // FLOOR 2 - ADMINISTRATIVE OFFICES
  '201': { 
    number: '201', 
    name: 'Admission and Records Office', 
    type: 'administrative', 
    floor: 2,
    category: 'Administrative Offices',
    description: 'Student Services',
    hours: 'Mon-Fri 8:00 AM - 4:30 PM',
    phone: '(808) 984-3267'
  },
  '203': { 
    number: '203', 
    name: 'Financial Aid Office', 
    type: 'administrative', 
    floor: 2,
    category: 'Administrative Offices',
    description: 'Financial Services',
    hours: 'Mon-Fri 8:00 AM - 4:30 PM',
    phone: '(808) 984-3277'
  },
  '232': { 
    number: '232', 
    name: 'Financial Aid Director', 
    type: 'administrative', 
    floor: 2,
    category: 'Administrative Offices',
    description: 'Financial Services Administration',
    hours: 'Mon-Fri 8:00 AM - 4:30 PM'
  },

  // FLOOR 2 - FACULTY OFFICES - HAWAIIAN STUDIES
  '214': { 
    number: '214', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 2, 
    occupant: "Papaikani'au Kai'anui",
    department: 'Hawaiian Studies',
    category: 'Faculty Offices - Hawaiian Studies',
    hours: 'By appointment'
  },
  '215': { 
    number: '215', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 2, 
    occupant: 'Aubrey Matsuura',
    department: 'Hawaiian Studies',
    category: 'Faculty Offices - Hawaiian Studies',
    hours: 'By appointment'
  },

  // FLOOR 2 - FACULTY OFFICES - BUSINESS & HOSPITALITY
  '217': { 
    number: '217', 
    name: 'Business Administration Lecturers', 
    type: 'faculty', 
    floor: 2, 
    department: 'Business Administration',
    category: 'Faculty Offices - Business & Hospitality',
    hours: 'By appointment'
  },
  '218': { 
    number: '218', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 2, 
    occupant: 'Gil Logan',
    department: 'Business',
    category: 'Faculty Offices - Business & Hospitality',
    hours: 'By appointment'
  },
  '219': { 
    number: '219', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 2, 
    occupant: 'Lorelle Solanzo Peros',
    department: 'Business & Hospitality',
    category: 'Faculty Offices - Business & Hospitality',
    hours: 'By appointment'
  },
  '231': { 
    number: '231', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 2, 
    occupant: 'Aubrey Weston',
    department: 'Business & Hospitality (Accounting)',
    category: 'Faculty Offices - Business & Hospitality',
    hours: 'By appointment'
  },
  '234': { 
    number: '234', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 2, 
    occupant: 'Vincent Domingo',
    department: 'Business & Hospitality',
    category: 'Faculty Offices - Business & Hospitality',
    hours: 'By appointment'
  },

  // FLOOR 2 - FACULTY OFFICES - SOCIAL SCIENCE
  '230': { 
    number: '230', 
    name: 'Faculty Office', 
    type: 'faculty', 
    floor: 2, 
    occupant: 'Rosiana (Nani) Azman',
    department: 'Social Science',
    category: 'Faculty Offices - Social Science',
    hours: 'By appointment'
  },

  // FLOOR 2 - PROGRAM / SERVICE OFFICES
  '233': { 
    number: '233', 
    name: 'Maui United Way', 
    type: 'program-services', 
    floor: 2, 
    occupant: 'Nicholas Winfrey',
    category: 'Program / Service Offices',
    hours: 'Mon-Fri 8:00 AM - 4:30 PM'
  },

  // FLOOR 2 - VACANT / UNASSIGNED ROOMS
  '209': { 
    number: '209', 
    name: 'Unassigned', 
    type: 'unassigned', 
    floor: 2,
    category: 'Vacant / Unassigned Rooms',
    description: 'Currently unassigned'
  },
  '211': { 
    number: '211', 
    name: 'Unassigned', 
    type: 'unassigned', 
    floor: 2,
    category: 'Vacant / Unassigned Rooms',
    description: 'Currently unassigned'
  },
  '212': { 
    number: '212', 
    name: 'Unassigned', 
    type: 'unassigned', 
    floor: 2,
    category: 'Vacant / Unassigned Rooms',
    description: 'Currently unassigned'
  },
  '213': { 
    number: '213', 
    name: 'Unassigned', 
    type: 'unassigned', 
    floor: 2,
    category: 'Vacant / Unassigned Rooms',
    description: 'Currently unassigned'
  },
  '216': { 
    number: '216', 
    name: 'Unassigned', 
    type: 'unassigned', 
    floor: 2,
    category: 'Vacant / Unassigned Rooms',
    description: 'Currently unassigned'
  },
  '235': { 
    number: '235', 
    name: 'Unassigned', 
    type: 'unassigned', 
    floor: 2,
    category: 'Vacant / Unassigned Rooms',
    description: 'Currently unassigned'
  },

  // FLOOR 2 - OTHER ROOMS
  '202': { number: '202', name: 'Classroom', type: 'classroom', floor: 2 },
  '203A': { number: '203A', name: 'Storage', type: 'office', floor: 2 },
  '204': { number: '204', name: 'Classroom', type: 'classroom', floor: 2 },
  '206': { number: '206', name: 'Classroom', type: 'classroom', floor: 2 },
  '207': { number: '207', name: 'Classroom', type: 'classroom', floor: 2 },
  '208': { number: '208', name: 'Classroom', type: 'classroom', floor: 2 },
  '220': { number: '220', name: 'Office', type: 'office', floor: 2 },
  '221': { number: '221', name: 'Office', type: 'office', floor: 2 },
};

// Helper function to get room color based on type
export function getRoomColor(type: string): string {
  const colors: Record<string, string> = {
    'faculty': '#4A90E2',           // Blue
    'student-services': '#7ED957',   // Green
    'administrative': '#FFD700',     // Gold
    'restroom': '#76f6e7',          // Turquoise/Cyan
    'stairs': '#72d5f7',            // Light Blue/Cyan
    'elevator': '#fa8aeb',          // Pink/Magenta
    'classroom': '#B8D4E8',         // Light Blue
    'office': '#E8E8E8',            // Very Light Gray
    'program-services': '#FFC857',  // Amber
    'unassigned': '#fff8e6',        // Light Cream/Beige
  };
  return colors[type] || colors['office'];
}

// Helper function to get room hover color
export function getRoomHoverColor(type: string): string {
  const colors: Record<string, string> = {
    'faculty': '#357ABD',
    'student-services': '#6BBD45',
    'administrative': '#E5C100',
    'restroom': '#5dd9cb',          // Darker turquoise for hover
    'stairs': '#4eb8db',            // Darker blue for hover
    'elevator': '#e76cd1',          // Darker pink for hover
    'classroom': '#A0C4D8',
    'office': '#D0D0D0',
    'program-services': '#E5B245',
    'unassigned': '#f5e5b8',        // Darker cream for hover
  };
  return colors[type] || colors['office'];
}


// Get category color for list view
export function getCategoryColor(category: string): { border: string; bg: string; text: string } {
  const colors: Record<string, { border: string; bg: string; text: string }> = {
    'Student Services / Resource Centers': { border: '#7ED957', bg: '#E8F8E0', text: '#2D5016' },
    'Faculty Offices - Social Science': { border: '#4A90E2', bg: '#E3F2FD', text: '#1E3A5F' },
    'Faculty Offices - Humanities': { border: '#4A90E2', bg: '#E3F2FD', text: '#1E3A5F' },
    'Faculty Offices - STEM Department': { border: '#4A90E2', bg: '#E3F2FD', text: '#1E3A5F' },
    'Faculty Offices - Other Departments': { border: '#4A90E2', bg: '#E3F2FD', text: '#1E3A5F' },
    'Faculty Offices - Hawaiian Studies': { border: '#4A90E2', bg: '#E3F2FD', text: '#1E3A5F' },
    'Faculty Offices - Business & Hospitality': { border: '#4A90E2', bg: '#E3F2FD', text: '#1E3A5F' },
    'Program / Service Offices': { border: '#FFD700', bg: '#FFF9E6', text: '#6B5600' },
    'Administrative Offices': { border: '#FFD700', bg: '#FFF9E6', text: '#6B5600' },
    'Vacant / Unassigned Rooms': { border: '#CCCCCC', bg: '#F5F5F5', text: '#666666' },
  };
  return colors[category] || { border: '#E0E0E0', bg: '#F9F9F9', text: '#333333' };
}