export interface Programs {
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


export const programs: Programs[] = [
  {
    slug: 'csit',
    code: 'CSIT',
    name: 'CS & IT',
    fullName: 'Department of Computer Science & Information Technology',
    icon: 'fa-light fa-display-code',
    established: 2020,
    intake: 120,
    hod: 'Dr.N.Gopala Krishna Murthy',
    hodDesignation: 'Professor & Program Coordinator',
    hodEmail: 'csit@srkrec.ac.in',
    email: 'csit@srkrec.ac.in',
    phone: '+91 08816 223332',
    tagline: 'Established 2020 · B.Tech CS & Information Technology',
    legacyCode: 'csit',
  },
  {
    slug: 'aiml',
    code: 'AIML',
    name: 'AI & ML',
    fullName: 'Department of Artificial Intelligence & Machine Learning',
    icon: 'fa-light fa-brain-circuit',
    established: 2021,
    intake: 240,
    hod: 'Dr. G.N.V.G. Sirisha',
    hodDesignation: 'Associate Professor & Program Coordinator',
    hodEmail: 'pc.aiml@srkrec.ac.in',
    email: 'pc.aiml@srkrec.ac.in',
    phone: '+91 08816 223332',
    tagline: 'Established 2021 · B.Tech AI & ML · Industry Aligned Curriculum',
    legacyCode: 'aiml',
  },
  {
    slug: 'aids',
    code: 'AIDS',
    name: 'AI & Data Science',
    fullName: 'Department of Artificial Intelligence & Data Science',
    icon: 'fa-light fa-chart-network',
    established: 2021,
    intake: 240,
    hod: 'Dr. B.V.D.S.Sekhar',
    hodDesignation: 'Professor & Program Coordinator',
    hodEmail: 'hod.aids@srkrec.ac.in',
    email: 'hod.aids@srkrec.ac.in',
    phone: '+91 08816 223332',
    tagline: 'Established 2021 · B.Tech AI & Data Science',
    legacyCode: 'aids',
  },
  {
    slug: 'csbs',
    code: 'CSBS',
    name: 'CS & Business',
    fullName: 'Department of Computer Science & Business Systems',
    icon: 'fa-light fa-chart-line',
    established: 2021,
    intake: 60,
    hod: 'Name  Name',
    hodDesignation: 'Associate Professor & Program Coordinator',
    hodEmail: 'hod.csbs@srkrec.ac.in',
    email: 'hod.csbs@srkrec.ac.in',
    phone: '+91 08816 223332',
    tagline: 'Established 2021 · B.Tech CS & Business Systems · TCS Curriculum',
    legacyCode: 'csbs',
  },
  {
    slug: 'cic',
    code: 'CIC',
    name: 'CSE - IoT & Cyber',
    fullName: 'Department of CSE (IoT, Cyber Security & Blockchain Technology)',
    icon: 'fa-light fa-shield-keyhole',
    established: 2022,
    intake: 60,
    hod: 'Dr. k. V. Krishnam Raju',
    hodDesignation: 'Associate Professor & Program Coordinator',
    hodEmail: 'hod.cic@srkrec.ac.in',
    email: 'hod.cic@srkrec.ac.in',
    phone: '+91 08816 223332',
    tagline: 'Established 2022 · B.Tech CSE — IoT, Cyber Security & Blockchain',
    legacyCode: 'cic',
  },
  {
    slug: 'csd',
    code: 'CSD',
    name: 'CS & Design',
    fullName: 'Department of Computer Science & Design',
    icon: 'fa-light fa-pen-ruler',
    established: 2021,
    intake: 60,
    hod: 'Dr. M. Suresh Babu',
    hodDesignation: 'Associate Professor & Program Coordinator',
    hodEmail: 'hod.csd@srkrec.ac.in',
    email: 'hod.csd@srkrec.ac.in',
    phone: '+91 08816 223332',
    tagline: 'Established 2021 · B.Tech CS & Design · Creative Tech Programs',
    legacyCode: 'csd',
  }
];
export function getProgram(slug: string): Programs | undefined {
  return programs.find((p) => p.slug === slug);
}
