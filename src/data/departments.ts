// Central registry of all academic departments at SRKR Engineering College.
// Single source of truth for navigation, department pages, and header menus.
// Update this file when adding a new department or changing dept-wide metadata.

export interface DepartmentRecruiter {
  name: string;
  logo?: string;
}

export interface Department {
  /** URL slug used in /departments/{slug}/ */
  slug: string;
  /** Short code (display): CSE, ECE, EEE, etc. */
  code: string;
  /** Short display name: "Civil Engineering" */
  name: string;
  /** Full official name */
  fullName: string;
  /** FontAwesome icon class (rendered inline) */
  icon: string;
  /** Year established */
  established: number;
  /** Current sanctioned intake (UG main program) */
  intake: number;
  /** Name of Head of Department */
  hod: string;
  /** HoD designation */
  hodDesignation: string;
  /** HoD email */
  hodEmail?: string;
  /** Generic department email */
  email: string;
  /** Department contact phone */
  phone?: string;
  /** Faculty image folder slug (defaults to slug) */
  facultyImageFolder?: string;
  /** Short one-line tagline for cards */
  tagline: string;
  /** Whether dept is NBA-accredited */
  nbaAccredited?: boolean;
  /** Original srkrec.ac.in code prefix used for old URLs (e.g. "cse", "mech") */
  legacyCode: string;
}

// Standard department sub-navigation labels and their relative paths.
// Used by DeptNav.astro and SrkrHeader.astro.
export const DEPT_NAV_ITEMS = [
  { label: 'Home',                 path: '' },
  { label: 'Academic Programs',    path: 'academic-programs/' },
  { label: 'Faculty',              path: 'faculty/' },
  { label: 'Committees',           path: 'committees/' },
  { label: 'Facilities',           path: 'facilities/' },
  { label: 'Research/Consultancy', path: 'research-consultancy/' },
  { label: 'Achievements',         path: 'achievements/' },
  { label: 'Placements',           path: 'placements/' },
  { label: 'Newsletter',           path: 'newsletter/' },
  { label: 'Brochure',             path: 'brochure/' },
] as const;

export const departments: Department[] = [
  {
    slug: 'civil',
    code: 'CIVIL',
    name: 'Civil',
    fullName: 'Department of Civil Engineering',
    icon: 'fa-light fa-building-columns',
    established: 1980,
    intake: 120,
    hod: 'Dr. G. Sri Bala',
    hodDesignation: 'Associate Professor & Head of Department',
    hodEmail: 'hod.civil@srkrec.ac.in',
    email: 'hod.civil@srkrec.ac.in',
    phone: '+91 884 222 6666',
    tagline: 'Established 1980 · NBA Accredited (4x) · B.Tech & M.Tech Programs',
    nbaAccredited: true,
    legacyCode: 'civil',
  },
  {
    slug: 'cse',
    code: 'CSE',
    name: 'CSE',
    fullName: 'Department of Computer Science & Engineering',
    icon: 'fa-light fa-laptop-code',
    established: 1991,
    intake: 300,
    hod: 'Dr. Bh. V. S. Rama Krishnam Raju',
    hodDesignation: 'Professor & Head of Department',
    hodEmail: 'cse@srkrec.ac.in',
    email: 'cse@srkrec.ac.in',
    phone: '+91 884 222 6666',
    tagline: 'Established 1991 · NBA Accredited · Research Centre (JNTUK) · B.Tech & M.Tech',
    nbaAccredited: true,
    legacyCode: 'cse',
  },
  {
    slug: 'ece',
    code: 'ECE',
    name: 'ECE',
    fullName: 'Department of Electronics & Communication Engineering',
    icon: 'fa-light fa-microchip',
    established: 1981,
    intake: 240,
    hod: 'Dr. S. S. Mohan Reddy',
    hodDesignation: 'Professor & Head of Department',
    hodEmail: 'ece@srkrec.ac.in',
    email: 'ece@srkrec.ac.in',
    phone: '+91 884 222 6666',
    tagline: 'Established 1981 · NBA Accredited · B.Tech, M.Tech & Ph.D Programs',
    nbaAccredited: true,
    legacyCode: 'ece',
  },
  {
    slug: 'eee',
    code: 'EEE',
    name: 'EEE',
    fullName: 'Department of Electrical & Electronics Engineering',
    icon: 'fa-light fa-bolt',
    established: 1980,
    intake: 120,
    hod: 'Dr. B. Ravi Kumar Varma',
    hodDesignation: 'Professor & Head of Department',
    hodEmail: 'eee@srkrec.ac.in',
    email: 'eee@srkrec.ac.in',
    phone: '+91 884 222 6666',
    tagline: 'Established 1980 · NBA Accredited · B.Tech & M.Tech Power Systems',
    nbaAccredited: true,
    legacyCode: 'eee',
  },
  
  {
    slug: 'mechanical',
    code: 'ME',
    name: 'Mechanical',
    fullName: 'Department of Mechanical Engineering',
    icon: 'fa-light fa-gears',
    established: 1980,
    intake: 120,
    hod: 'Dr. K. Sita Rama Raju',
    hodDesignation: 'Professor & Head of Department',
    hodEmail: 'mech@srkrec.ac.in',
    email: 'mech@srkrec.ac.in',
    phone: '+91 884 222 6666',
    tagline: 'Established 1980 · NBA Accredited · B.Tech & M.Tech Programs',
    nbaAccredited: true,
    legacyCode: 'mech',
  },
  {
    slug: 'it',
    code: 'IT',
    name: 'IT',
    fullName: 'Department of Information Technology',
    icon: 'fa-light fa-network-wired',
    established: 2001,
    intake: 180,
    hod: 'Dr. P. Ravi Kiran Varma',
    hodDesignation: 'Professor & Head of Department',
    hodEmail: 'hod.it@srkrec.ac.in',
    email: 'hod.it@srkrec.ac.in',
    phone: '+91 884 222 6666',
    tagline: 'Established 2001 · NBA Accredited · B.Tech Information Technology',
    nbaAccredited: true,
    legacyCode: 'it',
  },

];

export function getDepartment(slug: string): Department | undefined {
  return departments.find((d) => d.slug === slug);
}
