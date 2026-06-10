/**
 * Per-page SEO metadata (title, description, breadcrumb trail).
 *
 * Keyed by URL path WITH a trailing slash, e.g. '/college-profile/'.
 * Use `getPageSeo(Astro.url.pathname)` from any page to fetch.
 *
 * Title format guidelines:
 *   - Aim for 50–60 characters
 *   - Lead with the unique page topic
 *   - End with the brand "| SRKR Engineering College"
 *
 * Description guidelines:
 *   - Aim for 140–160 characters
 *   - Be specific (year founded, intake, accreditation, location)
 *   - End with a call to action where natural
 */

import { departments } from './departments';

export interface PageSeo {
  title: string;
  description: string;
  /** Optional H1 text override (defaults to the original page heading). */
  h1?: string;
  /** Breadcrumb trail, NOT including the homepage (added automatically). */
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const BRAND = 'SRKR Engineering College';

/** Build the breadcrumb trail with Home prepended. */
export function buildBreadcrumbs(
  trail: Array<{ name: string; url: string }> = [],
): Array<{ name: string; url: string }> {
  return [{ name: 'Home', url: '/' }, ...trail];
}

const home: PageSeo = {
  title: `${BRAND} | NAAC A++ Autonomous Engineering College, Bhimavaram`,
  description:
    'SRKR Engineering College, Bhimavaram (Est. 1980) — NAAC A++ accredited, autonomous engineering institution. NBA accredited B.Tech in CSE, ECE, EEE, Civil, Mechanical, IT. Top placements, world-class labs. Admissions 2025–26 open.',
};

const institutePages: Record<string, PageSeo> = {
  '/college-profile/': {
    title: `About SRKR | College Profile, History & Campus | ${BRAND}`,
    description:
      'Discover SRKR Engineering College — 45+ years of academic excellence since 1980, 30+ acre green campus in Bhimavaram, AP. NAAC A++ accredited autonomous institution offering premier UG, PG and research programs.',
    breadcrumbs: [{ name: 'About', url: '/college-profile/' }],
  },
  '/vision/': {
    title: `Vision & Mission | ${BRAND}, Bhimavaram`,
    description:
      'The vision and mission of SRKR Engineering College — to empower rural and aspiring students through world-class technical education, research and ethical leadership in Andhra Pradesh and beyond.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Vision & Mission', url: '/vision/' },
    ],
  },
  '/leadership/': {
    title: `Leadership Team | Director, Principal & Deans | ${BRAND}`,
    description:
      'Meet the leadership team of SRKR Engineering College — the Director, Principal, Deans and senior administrators driving academic excellence, research and student success.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Leadership', url: '/leadership/' },
    ],
  },
  '/governing/': {
    title: `Governing Body | Members & Functions | ${BRAND}`,
    description:
      'Governing Body of SRKR Engineering College — composition, members, roles and functions of the institution’s apex policy-making authority.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Governing Body', url: '/governing/' },
    ],
  },
  '/advisory-council/': {
    title: `College Advisory Council | ${BRAND}`,
    description:
      'College Advisory Council of SRKR Engineering College — distinguished industry, academia and alumni members providing strategic guidance on academic and research initiatives.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Advisory Council', url: '/advisory-council/' },
    ],
  },
  '/academic-council/': {
    title: `Academic Council | Composition & Functions | ${BRAND}`,
    description:
      'Academic Council of SRKR Engineering College — the apex academic body. Composition, functions, minutes and curriculum approvals as per UGC autonomous-institution norms.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Governance', url: '/college-profile/' },
      { name: 'Academic Council', url: '/academic-council/' },
    ],
  },
  '/board-of-studies/': {
    title: `Board of Studies (BoS) | Department-wise Composition | ${BRAND}`,
    description:
      'Board of Studies at SRKR Engineering College — department-wise composition, members, and curriculum-design responsibilities for B.Tech, M.Tech, MBA and MCA programs.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Governance', url: '/college-profile/' },
      { name: 'Board of Studies', url: '/board-of-studies/' },
    ],
  },
  '/central-committee/': {
    title: `College Level Committees | ${BRAND}`,
    description:
      'College-level statutory committees at SRKR — IQAC, Anti-Ragging, Grievance Redressal, Women Empowerment, SC/ST Cell, and other institutional committees.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Governance', url: '/college-profile/' },
      { name: 'Central Committee', url: '/central-committee/' },
    ],
  },
  '/financial-committee/': {
    title: `Finance Committee | ${BRAND}`,
    description:
      'Finance Committee of SRKR Engineering College — composition, functions and oversight of the institute’s financial planning, budgeting and audit processes.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Governance', url: '/college-profile/' },
      { name: 'Finance Committee', url: '/financial-committee/' },
    ],
  },
  '/iqac/': {
    title: `IQAC — Internal Quality Assurance Cell | ${BRAND}`,
    description:
      'Internal Quality Assurance Cell (IQAC) at SRKR Engineering College — composition, AQAR reports, meeting minutes, best practices and quality-enhancement initiatives.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Governance', url: '/college-profile/' },
      { name: 'IQAC', url: '/iqac/' },
    ],
  },
  '/org-structure/': {
    title: `Organizational Structure | ${BRAND}`,
    description:
      'Organizational structure of SRKR Engineering College — administrative hierarchy, academic governance and reporting lines from Director to Department Heads.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Organizational Structure', url: '/org-structure/' },
    ],
  },
  '/development-plan/': {
    title: `Institution Development Plan (IDP) | ${BRAND}`,
    description:
      'Institution Development Plan (IDP) of SRKR Engineering College — strategic roadmap covering academic, research, infrastructure and outreach goals for the coming years.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Institution Development Plan', url: '/development-plan/' },
    ],
  },
  '/vitals/': {
    title: `Institute at a Glance — Vitals & Statistics | ${BRAND}`,
    description:
      'SRKR Engineering College institutional vitals — NAAC, NBA, NIRF, AICTE, JNTUK, SIRO statistics, faculty count, publications, patents and admission codes.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Vitals', url: '/vitals/' },
    ],
  },
  '/prominent-alumni/': {
    title: `Prominent Alumni | Notable Achievers | ${BRAND}`,
    description:
      'Distinguished alumni of SRKR Engineering College — global leaders in technology, industry, research, entrepreneurship and public service, making SRKR proud worldwide.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Alumni', url: '/prominent-alumni/' },
    ],
  },
  '/messages/': {
    title: `Messages | President, Director & Principal | ${BRAND}`,
    description:
      'Welcome messages from the President, Director and Principal of SRKR Engineering College, sharing the institution’s vision, values and commitment to student success.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Messages', url: '/messages/' },
    ],
  },
  '/awards/': {
    title: `Institutional Awards & Honours | ${BRAND}`,
    description:
      'Awards and honours received by SRKR Engineering College and its faculty/students — recognitions from national bodies, industry, professional societies and government.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Awards & Honours', url: '/awards/' },
    ],
  },
  '/accreditations/': {
    title: `Accreditations | NAAC A++, NBA, NIRF, AICTE, UGC | ${BRAND}`,
    description:
      'Accreditations and approvals of SRKR Engineering College — NAAC A++ (Cycle II), NBA (B.Tech CSE/ECE/EEE/Civil/IT/ME), NIRF ranking, AICTE-approved, JNTUK-affiliated, SIRO-recognized.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Accreditations', url: '/accreditations/' },
    ],
  },
  '/rank/': {
    title: `Rankings | NIRF, ARIIA & Other Recognitions | ${BRAND}`,
    description:
      'SRKR Engineering College rankings — NIRF, ARIIA, India Today, Times, Outlook and other national/international recognitions that affirm our academic and research excellence.',
    breadcrumbs: [
      { name: 'About', url: '/college-profile/' },
      { name: 'Rankings', url: '/rank/' },
    ],
  },
  '/quick-links/': {
    title: `Quick Links | Important Pages & External Resources | ${BRAND}`,
    description:
      'Quick-links hub at SRKR Engineering College — admissions, exams portal, online fee payment, library, student login, e-resources and other frequently-accessed services.',
    breadcrumbs: [{ name: 'Quick Links', url: '/quick-links/' }],
  },
};

const admissionPages: Record<string, PageSeo> = {
  '/programmes/': {
    title: `Programs Offered | B.Tech, M.Tech, MBA, MCA | ${BRAND}`,
    description:
      'Academic programs at SRKR — 12 B.Tech specializations (CSE, ECE, EEE, Civil, Mech, IT, AI/ML, AI/DS, CSIT, CSBS, CIC, CSD), M.Tech, MBA and MCA. Total UG intake 1,860+ seats.',
    breadcrumbs: [
      { name: 'Admissions', url: '/programmes/' },
      { name: 'Programs', url: '/programmes/' },
    ],
  },
  '/procedure/': {
    title: `Admission Procedure & Eligibility 2025–26 | ${BRAND}`,
    description:
      'B.Tech, M.Tech, MBA and MCA admission procedure at SRKR Engineering College — eligibility, AP EAPCET/ECET/PGCET/ICET counselling, management quota, documents required.',
    breadcrumbs: [
      { name: 'Admissions', url: '/programmes/' },
      { name: 'Procedure', url: '/procedure/' },
    ],
  },
  '/regulations/': {
    title: `Academic Regulations | R20, R23 | ${BRAND}`,
    description:
      'Academic regulations governing B.Tech, M.Tech, MBA and MCA programs at SRKR Engineering College — autonomous-institution regulations, credit system and grading guidelines.',
    breadcrumbs: [
      { name: 'Admissions', url: '/programmes/' },
      { name: 'Academic Regulations', url: '/regulations/' },
    ],
  },
  '/admission-brochure/': {
    title: `Admission Brochure 2025–26 | Download | ${BRAND}`,
    description:
      'Download the SRKR Engineering College admission brochure 2025–26 — program details, eligibility, intake, fee structure, scholarships, placements and campus highlights.',
    breadcrumbs: [
      { name: 'Admissions', url: '/programmes/' },
      { name: 'Admission Brochure', url: '/admission-brochure/' },
    ],
  },
  '/fee/': {
    title: `Fee Structure 2025–26 | Tuition, Hostel & Scholarship | ${BRAND}`,
    description:
      'SRKR Engineering College fee structure 2025–26 — tuition, hostel, transportation. Government-fee-reimbursement eligibility, scholarships, payment plans and instalment options.',
    breadcrumbs: [
      { name: 'Admissions', url: '/programmes/' },
      { name: 'Fee Structure', url: '/fee/' },
    ],
  },
  '/online-fee/': {
    title: `Online Fee Payment Portal | ${BRAND}`,
    description:
      'Pay your SRKR Engineering College fees online — secure payment gateway for tuition, hostel, transportation and other institutional fees with instant receipts.',
    breadcrumbs: [
      { name: 'Quick Links', url: '/quick-links/' },
      { name: 'Online Fee Payment', url: '/online-fee/' },
    ],
  },
};

const academicPages: Record<string, PageSeo> = {
  '/syllabus/': {
    title: `Syllabus | B.Tech, M.Tech & MBA Curriculum | ${BRAND}`,
    description:
      'Syllabus and curriculum documents for all B.Tech, M.Tech, MBA and MCA programs at SRKR Engineering College — regulation-wise and department-wise downloads.',
    breadcrumbs: [
      { name: 'Academics', url: '/departments/' },
      { name: 'Syllabus', url: '/syllabus/' },
    ],
  },
  '/calender/': {
    title: `Academic Calendar 2025–26 | ${BRAND}`,
    description:
      'Academic calendar for SRKR Engineering College — semester schedules, examination dates, holidays, project reviews and important academic events for the year.',
    breadcrumbs: [
      { name: 'Academics', url: '/departments/' },
      { name: 'Academic Calendar', url: '/calender/' },
    ],
  },
  '/time-tables/': {
    title: `Class Time Tables | Department-wise | ${BRAND}`,
    description:
      'Class time tables for all departments and semesters at SRKR Engineering College — current schedule, faculty allocation and lab/lecture room assignments.',
    breadcrumbs: [
      { name: 'Academics', url: '/departments/' },
      { name: 'Time Tables', url: '/time-tables/' },
    ],
  },
  '/humanities/': {
    title: `Basic Sciences & Humanities | Faculty | ${BRAND}`,
    description:
      'Department of Basic Sciences & Humanities at SRKR Engineering College — Mathematics, Physics, Chemistry, English and Management courses with 50+ accomplished faculty.',
    breadcrumbs: [
      { name: 'Departments', url: '/departments/' },
      { name: 'Basic Sciences & Humanities', url: '/humanities/' },
    ],
  },
  '/departments/': {
    title: `Departments | 12 Engineering Specializations | ${BRAND}`,
    description:
      'Explore all 12 engineering departments at SRKR — CSE, ECE, EEE, Civil, Mechanical, IT, AI/ML, AI/DS, CSIT, CSBS, CIC, CSD. 1,860+ B.Tech seats, NBA-accredited core branches.',
    breadcrumbs: [{ name: 'Departments', url: '/departments/' }],
  },
};

const researchPages: Record<string, PageSeo> = {
  '/research-overview/': {
    title: `Research Overview | Centres, Projects & Patents | ${BRAND}`,
    description:
      'Research at SRKR Engineering College — SIRO-recognised, JNTUK research centres, sponsored projects worth crores, patents, publications and industry collaborations.',
    breadcrumbs: [
      { name: 'Research', url: '/research-overview/' },
      { name: 'Overview', url: '/research-overview/' },
    ],
  },
  '/development-cell/': {
    title: `Research & Development Cell (R&D) | ${BRAND}`,
    description:
      'Research and Development Cell at SRKR — coordinating sponsored projects, faculty research grants, technology transfer and industry-academia collaboration.',
    breadcrumbs: [
      { name: 'Research', url: '/research-overview/' },
      { name: 'R&D Cell', url: '/development-cell/' },
    ],
  },
  '/entrepreneurship-cell/': {
    title: `Entrepreneurship Development Cell (EDC) | ${BRAND}`,
    description:
      'Entrepreneurship Development Cell at SRKR Engineering College — fostering student start-ups, ideation programmes, incubation support and venture mentoring.',
    breadcrumbs: [
      { name: 'Research', url: '/research-overview/' },
      { name: 'EDC', url: '/entrepreneurship-cell/' },
    ],
  },
  '/research-committees/': {
    title: `Research Committees | ${BRAND}`,
    description:
      'Research committees at SRKR — Research Advisory Council, Doctoral Committees and IPR/Ethics Committees that govern the institute’s research activities.',
    breadcrumbs: [
      { name: 'Research', url: '/research-overview/' },
      { name: 'Committees', url: '/research-committees/' },
    ],
  },
  '/research-advisory/': {
    title: `Research Advisory Committee | ${BRAND}`,
    description:
      'Research Advisory Committee at SRKR — distinguished researchers from premier institutions providing strategic guidance on institute-wide research direction.',
    breadcrumbs: [
      { name: 'Research', url: '/research-overview/' },
      { name: 'Advisory Committee', url: '/research-advisory/' },
    ],
  },
  '/research-ethics/': {
    title: `Research Ethics Committee | ${BRAND}`,
    description:
      'Research Ethics Committee at SRKR Engineering College — oversight on research integrity, ethical clearance and responsible conduct of research.',
    breadcrumbs: [
      { name: 'Research', url: '/research-overview/' },
      { name: 'Ethics Committee', url: '/research-ethics/' },
    ],
  },
  '/ipr-cell/': {
    title: `IPR Cell | Patents & Intellectual Property | ${BRAND}`,
    description:
      'Intellectual Property Rights (IPR) Cell at SRKR Engineering College — patent filing support, IP awareness, technology transfer and commercialisation guidance.',
    breadcrumbs: [
      { name: 'Research', url: '/research-overview/' },
      { name: 'IPR Cell', url: '/ipr-cell/' },
    ],
  },
  '/iic/': {
    title: `Institution’s Innovation Council (IIC) | ${BRAND}`,
    description:
      'Institution’s Innovation Council (IIC) at SRKR — MoE-AICTE recognised council fostering innovation, design thinking, IPR and start-up culture among students and faculty.',
    breadcrumbs: [
      { name: 'Research', url: '/research-overview/' },
      { name: 'IIC', url: '/iic/' },
    ],
  },
  '/research-excellence/': {
    title: `Centres of Excellence | Research Hubs | ${BRAND}`,
    description:
      'Centres of Excellence at SRKR Engineering College — focused research hubs in AI/ML, IoT, embedded systems, structural engineering, energy and emerging technologies.',
    breadcrumbs: [
      { name: 'Research', url: '/research-overview/' },
      { name: 'Centres of Excellence', url: '/research-excellence/' },
    ],
  },
  '/research-centers/': {
    title: `Research Centres | JNTUK Recognised | ${BRAND}`,
    description:
      'JNTUK-recognised research centres at SRKR Engineering College offering Ph.D. programs across engineering disciplines and basic sciences.',
    breadcrumbs: [
      { name: 'Research', url: '/research-overview/' },
      { name: 'Research Centres', url: '/research-centers/' },
    ],
  },
  '/research-projects/': {
    title: `Sponsored Research Projects | DST, DBT, MSME | ${BRAND}`,
    description:
      'Ongoing and completed sponsored research projects at SRKR — funded by DST, DBT, AICTE, MSME, MoE and industry partners. Crores worth of active research grants.',
    breadcrumbs: [
      { name: 'Research', url: '/research-overview/' },
      { name: 'Projects', url: '/research-projects/' },
    ],
  },
  '/research-publications/': {
    title: `Research Publications | Scopus-Indexed | ${BRAND}`,
    description:
      'Faculty research publications at SRKR Engineering College — Scopus-indexed journal articles, conference papers, book chapters and citation metrics.',
    breadcrumbs: [
      { name: 'Research', url: '/research-overview/' },
      { name: 'Publications', url: '/research-publications/' },
    ],
  },
  '/research-supervisors/': {
    title: `Ph.D. Research Supervisors | ${BRAND}`,
    description:
      'List of JNTUK-recognised Ph.D. research supervisors at SRKR Engineering College — department-wise, with research focus areas and contact information.',
    breadcrumbs: [
      { name: 'Research', url: '/research-overview/' },
      { name: 'Supervisors', url: '/research-supervisors/' },
    ],
  },
  '/patents/': {
    title: `Patents Filed & Granted | ${BRAND}`,
    description:
      'Patents filed and granted by SRKR Engineering College faculty and students — Indian and international patents across engineering and applied science disciplines.',
    breadcrumbs: [
      { name: 'Research', url: '/research-overview/' },
      { name: 'Patents', url: '/patents/' },
    ],
  },
  '/mous/': {
    title: `MoUs | Industry & Academic Partnerships | ${BRAND}`,
    description:
      'Memoranda of Understanding (MoUs) at SRKR Engineering College — 100+ partnerships with industry leaders, IITs, NITs and international universities.',
    breadcrumbs: [
      { name: 'Research', url: '/research-overview/' },
      { name: 'MoUs', url: '/mous/' },
    ],
  },
};

const placementPages: Record<string, PageSeo> = {
  '/placements/': {
    title: `Placements | About Placement Cell | ${BRAND}`,
    description:
      'SRKR Placement Cell — 500+ recruiters annually including Amazon, TCS, Infosys, Cognizant, Capgemini, Wipro, Deloitte. Highest package 17.16 LPA (Amazon SDE, 2025–26).',
    breadcrumbs: [{ name: 'Placements', url: '/placements/' }],
  },
  '/placements-team/': {
    title: `Placements Team | Training & Placement Cell | ${BRAND}`,
    description:
      'Meet the Training & Placement Cell team at SRKR Engineering College — Dean, Officers, coordinators and student volunteers driving 500+ campus offers each year.',
    breadcrumbs: [
      { name: 'Placements', url: '/placements/' },
      { name: 'Team', url: '/placements-team/' },
    ],
  },
  '/placements-summary/': {
    title: `Placements Summary | Year-wise Statistics | ${BRAND}`,
    description:
      'Year-wise placement statistics at SRKR — total offers, top recruiters, highest/average packages and department-wise placement summaries from 2017 onwards.',
    breadcrumbs: [
      { name: 'Placements', url: '/placements/' },
      { name: 'Summary', url: '/placements-summary/' },
    ],
  },
  '/training/': {
    title: `Training Activities | Soft Skills & Aptitude | ${BRAND}`,
    description:
      'Training activities at SRKR — aptitude, soft skills, technical training, mock interviews, group discussions and certification programmes preparing students for placements.',
    breadcrumbs: [
      { name: 'Placements', url: '/placements/' },
      { name: 'Training', url: '/training/' },
    ],
  },
  '/internships/': {
    title: `Internship Opportunities | Industry Programs | ${BRAND}`,
    description:
      'Internship opportunities at SRKR Engineering College — summer internships, semester-long industry projects, virtual internships and research internships with top firms.',
    breadcrumbs: [
      { name: 'Placements', url: '/placements/' },
      { name: 'Internships', url: '/internships/' },
    ],
  },
  '/career-guidance/': {
    title: `Career Guidance | Counselling & Mentoring | ${BRAND}`,
    description:
      'Career guidance and counselling at SRKR Engineering College — one-on-one mentoring, career-path workshops, higher-studies counselling (GATE/GRE/CAT) and entrepreneurship guidance.',
    breadcrumbs: [
      { name: 'Placements', url: '/placements/' },
      { name: 'Career Guidance', url: '/career-guidance/' },
    ],
  },
};

const lifePages: Record<string, PageSeo> = {
  '/student-clubs/': {
    title: `Student Clubs & Chapters | ${BRAND}`,
    description:
      'Student clubs and professional chapters at SRKR — IEEE, IETE, ISTE, ASCE, SAE, ACE, ECE Association, and dozens of cultural, technical and social clubs.',
    breadcrumbs: [
      { name: 'Life @ SRKR', url: '/student-clubs/' },
      { name: 'Student Clubs', url: '/student-clubs/' },
    ],
  },
  '/activities/': {
    title: `Student Activities | Cultural & Technical Events | ${BRAND}`,
    description:
      'Student life at SRKR Engineering College — annual fests, technical symposia, hackathons, cultural events, sports tournaments and community-service activities.',
    breadcrumbs: [
      { name: 'Life @ SRKR', url: '/student-clubs/' },
      { name: 'Activities', url: '/activities/' },
    ],
  },
  '/sports/': {
    title: `Sports Facilities | Grounds, Indoor & Outdoor | ${BRAND}`,
    description:
      'World-class sports facilities at SRKR — cricket and football grounds, basketball/volleyball/tennis courts, indoor games, gym and athletics track for student wellbeing.',
    breadcrumbs: [
      { name: 'Life @ SRKR', url: '/student-clubs/' },
      { name: 'Sports', url: '/sports/' },
    ],
  },
  '/hostels/': {
    title: `Hostels | Boys & Girls Accommodation | ${BRAND}`,
    description:
      'On-campus hostels at SRKR Engineering College — separate, secure boys and girls accommodation with mess, Wi-Fi, recreation rooms, study spaces and 24×7 supervision.',
    breadcrumbs: [
      { name: 'Life @ SRKR', url: '/student-clubs/' },
      { name: 'Hostels', url: '/hostels/' },
    ],
  },
  '/transportation/': {
    title: `College Bus Transportation | Routes & Schedule | ${BRAND}`,
    description:
      'College bus transportation at SRKR — routes across East/West Godavari, Krishna and Visakhapatnam districts with comfortable, GPS-tracked, safe student transport.',
    breadcrumbs: [
      { name: 'Life @ SRKR', url: '/student-clubs/' },
      { name: 'Transportation', url: '/transportation/' },
    ],
  },
  '/well-being/': {
    title: `Student Well-Being | Counselling, Health & Welfare | ${BRAND}`,
    description:
      'Student well-being at SRKR — mental health counselling, medical centre, anti-ragging cell, women’s grievance committee and welfare initiatives for a safe campus.',
    breadcrumbs: [
      { name: 'Life @ SRKR', url: '/student-clubs/' },
      { name: 'Well-Being', url: '/well-being/' },
    ],
  },
  '/code-of-conduct/': {
    title: `Code of Conduct | Student & Faculty | ${BRAND}`,
    description:
      'Code of conduct at SRKR Engineering College — institutional values, academic integrity, anti-ragging policy, dress code and disciplinary guidelines for students and faculty.',
    breadcrumbs: [
      { name: 'Life @ SRKR', url: '/student-clubs/' },
      { name: 'Code of Conduct', url: '/code-of-conduct/' },
    ],
  },
  '/sustainability/': {
    title: `Sustainability & Green Initiatives | ${BRAND}`,
    description:
      'Sustainability initiatives at SRKR Engineering College — solar power, rainwater harvesting, e-waste management, green campus, energy audits and ISO 14001 commitments.',
    breadcrumbs: [
      { name: 'Life @ SRKR', url: '/student-clubs/' },
      { name: 'Sustainability', url: '/sustainability/' },
    ],
  },
  '/gallery/': {
    title: `Campus Gallery | Photos & Events | ${BRAND}`,
    description:
      'SRKR Engineering College photo gallery — campus, classrooms, labs, hostels, sports, events, fests, convocations and student-life moments.',
    breadcrumbs: [{ name: 'Gallery', url: '/gallery/' }],
  },
};

const facilityPages: Record<string, PageSeo> = {
  '/library/': {
    title: `Central Library | Books, Journals & E-Resources | ${BRAND}`,
    description:
      'Central Library at SRKR Engineering College — 50,000+ volumes, 100+ journals, e-resources via DELNET/NPTEL/IEEE Xplore, digital library, OPAC and IR.',
    breadcrumbs: [{ name: 'Facilities', url: '/facilities/' }, { name: 'Library', url: '/library/' }],
  },
  '/library-rules/': {
    title: `Library Rules & Services | ${BRAND}`,
    description:
      'Library rules, services and timings at SRKR Central Library — membership, issue/return, photocopy, reference, ILL, plagiarism check and discipline policy.',
    breadcrumbs: [
      { name: 'Facilities', url: '/facilities/' },
      { name: 'Library', url: '/library/' },
      { name: 'Rules', url: '/library-rules/' },
    ],
  },
  '/digital/': {
    title: `Digital Library & E-Resources | ${BRAND}`,
    description:
      'Digital library at SRKR — access to IEEE, Springer, ScienceDirect, Scopus, DELNET, NPTEL, NDL and 1,000+ open-access e-journals and e-books.',
    breadcrumbs: [
      { name: 'Facilities', url: '/facilities/' },
      { name: 'Digital Library', url: '/digital/' },
    ],
  },
  '/computer-center/': {
    title: `Central Computer Centre | ${BRAND}`,
    description:
      'Central Computer Centre at SRKR — 500+ networked PCs, gigabit campus LAN, 24×7 internet, Linux/Windows labs, server room and software-development infrastructure.',
    breadcrumbs: [
      { name: 'Facilities', url: '/facilities/' },
      { name: 'Computer Centre', url: '/computer-center/' },
    ],
  },
  '/tech-center/': {
    title: `Technology Centre | Innovation Hub | ${BRAND}`,
    description:
      'Technology Centre at SRKR — innovation hub with maker-space, 3D printing, electronics prototyping, AI/ML cluster and student project incubation facilities.',
    breadcrumbs: [
      { name: 'Facilities', url: '/facilities/' },
      { name: 'Tech Centre', url: '/tech-center/' },
    ],
  },
  '/facilities/': {
    title: `Campus Facilities | Labs, Library & Infrastructure | ${BRAND}`,
    description:
      'Campus facilities at SRKR Engineering College — modern classrooms, advanced labs, central library, hostels, transport, sports complex, medical centre and Wi-Fi campus.',
    breadcrumbs: [{ name: 'Facilities', url: '/facilities/' }],
  },
  '/foreign/': {
    title: `International Students | Foreign Admissions | ${BRAND}`,
    description:
      'Foreign students admissions at SRKR Engineering College — eligibility, application process, visa support, hostel accommodation and international student services.',
    breadcrumbs: [
      { name: 'Admissions', url: '/programmes/' },
      { name: 'Foreign Students', url: '/foreign/' },
    ],
  },
};

const miscPages: Record<string, PageSeo> = {
  '/blog/': {
    title: `News & Updates | ${BRAND}`,
    description:
      'Latest news, events, achievements and announcements from SRKR Engineering College — campus updates, placement news, research breakthroughs and student achievements.',
    breadcrumbs: [{ name: 'News', url: '/blog/' }],
  },
};

const flatMap: Record<string, PageSeo> = {
  '/': home,
  ...institutePages,
  ...admissionPages,
  ...academicPages,
  ...researchPages,
  ...placementPages,
  ...lifePages,
  ...facilityPages,
  ...miscPages,
};

// Department pages — auto-generate for all 12 from departments.ts
function buildDepartmentSeo() {
  const out: Record<string, PageSeo> = {};
  for (const d of departments) {
    const base = `/departments/${d.slug}/`;
    const deptCrumb = [
      { name: 'Departments', url: '/departments/' },
      { name: d.name, url: base },
    ];

    out[base] = {
      title: `${d.name} (${d.code}) | Department | ${BRAND}`,
      description:
        `Department of ${d.name} (${d.code}) at SRKR Engineering College, Bhimavaram. ` +
        `${d.tagline ? d.tagline + ' ' : ''}Intake ${d.intake}, NBA-accredited core branches, modern labs and strong placements.`,
      breadcrumbs: deptCrumb,
    };

    const sections: Array<{ slug: string; label: string; descSuffix: string }> = [
      { slug: 'academic-programs', label: 'Academic Programs', descSuffix: 'PEOs, POs, PSOs, course outcomes and curriculum details for the program.' },
      { slug: 'faculty', label: 'Faculty', descSuffix: 'Meet the qualified faculty — Professors, Associate and Assistant Professors with their specializations and credentials.' },
      { slug: 'committees', label: 'Committees', descSuffix: 'Department-level committees — academic, examination, anti-ragging, mentoring and student welfare bodies.' },
      { slug: 'facilities', label: 'Facilities', descSuffix: 'Laboratories, classrooms, software and infrastructure available to students and faculty.' },
      { slug: 'research-consultancy', label: 'Research & Consultancy', descSuffix: 'Sponsored research projects, publications, consultancy work and patents from the department.' },
      { slug: 'achievements', label: 'Achievements', descSuffix: 'Student and faculty achievements, awards, ranks, and notable recognitions over the years.' },
      { slug: 'placements', label: 'Placements', descSuffix: 'Recent campus placement records, top recruiters and year-wise placement statistics.' },
      { slug: 'newsletter', label: 'Newsletter', descSuffix: 'Department newsletter editions covering events, achievements, research and student activities.' },
      { slug: 'brochure', label: 'Brochure', descSuffix: 'Download the department brochure with full programme details, faculty, labs and placements.' },
    ];

    for (const s of sections) {
      out[`${base}${s.slug}/`] = {
        title: `${s.label} | ${d.name} (${d.code}) | ${BRAND}`,
        description: `${s.label} at the Department of ${d.name} (${d.code}), SRKR Engineering College. ${s.descSuffix}`,
        breadcrumbs: [...deptCrumb, { name: s.label, url: `${base}${s.slug}/` }],
      };
    }
  }
  return out;
}

const deptSeo = buildDepartmentSeo();
Object.assign(flatMap, deptSeo);

/**
 * Get SEO metadata for a given pathname.
 * Falls back to brand defaults if no entry exists.
 */
export function getPageSeo(pathname: string): PageSeo {
  const key = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return (
    flatMap[key] ?? {
      title: `${BRAND} | NAAC A++ Engineering College, Bhimavaram`,
      description:
        'SRKR Engineering College, Bhimavaram — NAAC A++ accredited autonomous institution offering premier engineering education across 12 specializations.',
    }
  );
}

export { flatMap as SEO_MAP };
