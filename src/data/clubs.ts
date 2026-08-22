export interface Club {
  slug: string;
  name: string;
  fullName: string;
  dept: string;
  category: 'technical' | 'cultural' | 'service' | 'sports';
  advisor: string;
  mission: string;
  img: string;
  objectives: string[];
  activities: string[];
  upcomingEvents: string[];
  joinInfo: string;
  socials?: {
    website?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  vision?: string;
  leaders?: {
    role: string;
    name: string;
    details?: string;
  }[];
  detailedActivities?: {
    title: string;
    description: string;
  }[];
  industryConnect?: {
    title: string;
    description: string;
  }[];
  newsletters?: {
    title: string;
    pdfUrl: string;
  }[];
}

export const techClubs: Club[] = [
  {
    slug: 'ace',
    name: 'ACE - Association of Computer Engineers',
    fullName: 'Association of Computer Engineers',
    dept: 'CSE',
    category: 'technical',
    advisor: 'Faculty Coordinator, CSE',
    mission: 'Coding contests, local hackathons, and core computer science technical workshops.',
    img: '/assets/images/clubs/ace.jpg',
    objectives: [
      'Nurture competitive programming and algorithm skills among students.',
      'Provide workshops on software development best practices and tools.',
      'Bridge the gap between academic education and industry standards.',
      'Foster collaboration on open-source projects and local hackathons.'
    ],
    activities: [
      'Weekly algorithmic challenges and contests.',
      'Hands-on training sessions on Git, GitHub, and full-stack technologies.',
      'Annual departmental project exhibitions and hackathons.',
      'Invited lectures from industry veterans and alumni.'
    ],
    upcomingEvents: [
      'CodeStorm 24-hour hackathon',
      'Advanced Seminar on Web3 & Generative AI architectures'
    ],
    joinInfo: 'Open to all students of the CSE department. Registrations open during the first week of every semester.'
  },
  {
    slug: 'csi',
    name: 'CSI - Computer Society of India',
    fullName: 'Computer Society of India Student Branch',
    dept: 'IT',
    category: 'technical',
    advisor: 'CSI Faculty Advisor',
    mission: 'National-level IT workshops, student certifications, and institutional tech fests.',
    img: '/assets/images/clubs/csi.jpg',
    objectives: [
      'Promote information technology education and research collaborations.',
      'Provide a forum for student certifications and professional validation.',
      'Encourage technical writing, publication, and presentation skills.'
    ],
    activities: [
      'National and state-level technical paper presentations.',
      'Professional certification guidance programs (Oracle, AWS, Java).',
      'Inter-collegiate tech quizzes and gaming contests.'
    ],
    upcomingEvents: [
      'National IT Conclave & Paper Presentation',
      'Hands-on Boot Camp on Cloud Operations & DevOps'
    ],
    joinInfo: 'Open to IT and computer-related branches. Contact the CSI student coordinator to fill out membership forms.'
  },
  {
    slug: 'iete',
    name: 'IETE - The Institution of Electronics and Telecommunication Engineers',
    fullName: 'The Institution of Electronics and Telecommunication Engineers',
    dept: 'ECE',
    category: 'technical',
    advisor: 'IETE Faculty Advisor',
    mission: 'Electronics design, telecom workshops, and emerging communication technology seminars.',
    img: '/assets/images/clubs/iete.jpg',
    objectives: [
      'Advise and train students in hardware prototyping and IoT solutions.',
      'Keep students updated with the latest telecommunication standards and 5G/6G research.',
      'Host simulation workshops using industry-standard tools like MATLAB and LabVIEW.'
    ],
    activities: [
      'PCB Design and soldering workshops.',
      'Seminars on optical fiber networks, satellite communication, and embedded systems.',
      'Mini project expos focusing on hardware designs.'
    ],
    upcomingEvents: [
      'PCB Fabrication hands-on session',
      'Expert Lecture on 5G/6G RF design and development'
    ],
    joinInfo: 'Open to all students, with a primary focus on ECE and EEE branches. Registrations open bi-annually.'
  },
  {
    slug: 'aee',
    name: 'AEE - Association of Electrical Engineers',
    fullName: 'Association of Electrical Engineers',
    dept: 'EEE',
    category: 'technical',
    advisor: 'Faculty Coordinator, EEE',
    mission: 'Power systems, electrical design workshops, and renewable energy seminars.',
    img: '/assets/images/clubs/aee.jpg',
    objectives: [
      'Provide core technical skills in power systems, electric vehicles, and automation.',
      'Create awareness on green energy technologies and sustainable power grids.',
      'Encourage industrial visits and practical exposure to electrical substations.'
    ],
    activities: [
      'Workshops on MATLAB/Simulink for electrical simulations.',
      'Guest lectures from electricity board engineers and power plant experts.',
      'Electrical safety awareness programs and energy auditing activities.'
    ],
    upcomingEvents: [
      'Electric Vehicle (EV) Powertrain Workshop',
      'Campus energy conservation and audit initiative'
    ],
    joinInfo: 'Open to all EEE department students. Sign up via the AEE coordinator desk.'
  },
  {
    slug: 'ame',
    name: 'AME - Association of Mechanical Engineering',
    fullName: 'Association of Mechanical Engineering',
    dept: 'Mechanical',
    category: 'technical',
    advisor: 'Faculty Coordinator, Mechanical',
    mission: 'Departmental design challenges, manufacturing workshops, and guest lectures.',
    img: '/assets/images/clubs/ame.jpg',
    objectives: [
      'Develop design and modeling skills using CAD, SolidWorks, and ANSYS.',
      'Expose students to modern manufacturing techniques, robotics, and CNC machining.',
      'Encourage teamwork and problem-solving through departmental design challenges.'
    ],
    activities: [
      'CAD modeling challenges and drafting contests.',
      'Hands-on experience sessions on CNC programming and 3D printing.',
      'Technical debates on the future of robotics and automated manufacturing.'
    ],
    upcomingEvents: [
      'Robotics Fabrication Workshop',
      'SolidWorks 3D Modeling Competition'
    ],
    joinInfo: 'Open to all students of the Mechanical Engineering department. Join by contacting the department office.'
  },
  {
    slug: 'iipe',
    name: 'IIPE - Indian Institution of Production Engineers',
    fullName: 'Indian Institution of Production Engineers Student Chapter',
    dept: 'Mechanical',
    category: 'technical',
    advisor: 'IIPE Faculty Advisor',
    mission: 'Industrial engineering, production planning, and manufacturing technology conclaves.',
    img: '/assets/images/clubs/iipe.jpg',
    objectives: [
      'Foster interest in production engineering and optimization methodologies.',
      'Organize industrial conclaves and expert webinars on operations research.',
      'Expose students to inventory management, logistics, and quality assurance principles.'
    ],
    activities: [
      'Seminars on Six Sigma, Lean Manufacturing, and Just-In-Time production.',
      'Industrial visits to automobile and manufacturing assemblies.',
      'Case study competitions on plant layout optimizations.'
    ],
    upcomingEvents: [
      'Lean Operations Conclave',
      'Industry Visit to Visakhapatnam Steel Plant / local manufacturing units'
    ],
    joinInfo: 'Open to all engineering students interested in production and operations. Register through IIPE chapter leaders.'
  },
  {
    slug: 'iei',
    name: 'IEI - Institution of Engineers (India)',
    fullName: 'Institution of Engineers (India) Student Chapter',
    dept: 'Civil / Multi-disciplinary',
    category: 'technical',
    advisor: 'IEI Faculty Chapter Advisor',
    mission: 'Multi-disciplinary engineering seminars, standard codes, and sustainable infrastructure forums.',
    img: '/assets/images/clubs/iei.jpg',
    objectives: [
      'Provide a multi-disciplinary platform for civil, mechanical, and electrical engineering integration.',
      'Promote knowledge sharing through national standard codes (BIS, IRC).',
      'Highlight green building concepts and sustainable infrastructure.'
    ],
    activities: [
      'Sustainable concrete and brick design workshops.',
      'Technical quiz bowls covering general and civil engineering topics.',
      'Seminars on modern surveying tools (GIS, GPS, and drone technology).'
    ],
    upcomingEvents: [
      'Sustainable Concrete Mix Design Contest',
      'GIS & Remote Sensing Workshop'
    ],
    joinInfo: 'Open to all students across all engineering branches. Forms available at the Civil Engineering department.'
  },
  {
    slug: 'iste',
    name: 'ISTE - Indian Society for Technical Education',
    fullName: 'Indian Society for Technical Education Student Chapter',
    dept: 'College-wide',
    category: 'technical',
    advisor: 'ISTE Faculty Advisor',
    mission: 'Overall technical education promotion, faculty development support, and student soft skills training.',
    img: '/assets/images/clubs/iste.jpg',
    objectives: [
      'Enhance overall quality of technical education and professional behavior.',
      'Bridge the gap between technical skills and soft skills (leadership, public speaking).',
      'Conduct college-wide talent searches and innovative project competitions.'
    ],
    activities: [
      'Soft skills workshops and resume building classes.',
      'State-level student conventions and paper presentation contests.',
      'Mock HR interviews and aptitude test series.'
    ],
    upcomingEvents: [
      'Aptitude & Soft Skills Boot Camp',
      'ISTE Annual Student Convention'
    ],
    joinInfo: 'Open to all branches and years. Register to get lifetime ISTE student membership.',
    socials: {
      website: 'https://iste.org.in',
      instagram: 'https://www.instagram.com/iste_srkr',
      linkedin: 'https://www.linkedin.com/company/iste-srkr',
      youtube: 'https://www.youtube.com/@iste_srkr'
    }
  },
  {
  slug: 's-r-k-r-coding-club',
  name: 'S.R.K.R. Coding Club',
  fullName: 'SRKR Coding Club',
  dept: 'Student Clubs',
  category: 'technical',
  advisor: 'Haritha Priya . Dandu',
  mission: 'Our mission is to empower students to learn and apply technology, organize projects and events that enhance skills and creativity, and build a supportive community for growth and positive impact.',
  img: '/assets/images/clubs/srkr_coding_club.jpg',
  objectives: [
    'To improve student\'s programming, logical reasoning and problem-solving skills through practical exercises and challenging coding problems.',
    'To improve students\' application and software development skills through hands-on project based learning.',
    'To create a community of students with diverse technical skills who collaborate, learn from each other, share knowledge, and support continuous growth.',
    'To provide a platform for students to learn and showcase their coding skills by participating in coding competitions, hackathons, technical events.',
    'To make students industry-ready by guiding them in building professional portfolios, enhancing soft skills, and preparing them for technical interviews through regular coding practice, mentorship, and career-oriented training programs.'
  ],
  activities: [
    'HackOverflow',
    'Code Quest',
    'Edgecase',
    'Workshops',
    'Iconcoderz'
  ],
  upcomingEvents: [
    'DSA Training commences on 29 th July',
    'Self-driven activity workshop on Aug 3rd',
    'HackOverflow 2k26 – national level hackathon in Sep last week or oct 1 st week',
    'Coding Club Induction in Sep (after arrival of 1 st years)'
  ],
  joinInfo: 'Eligibility: Any SRKR student from any year and any branch is eligible to join the club. Registration Process: Fill out the club registration form, pay the registration fee ₹350, and complete the verification process to become an official club member.',
  socials: {
    website: 'https://srkrcodingclub.in',
    instagram: 'https://www.instagram.com/srkr_coding_club',
    linkedin: 'https://www.linkedin.com/in/srkr-coding-club-549799293/',
    youtube: 'https://www.youtube.com/@SRKRCODINGCLUB'
  }
}
];

export const culturalClubs: Club[] = [
  {
    slug: 'cine-club',
    name: 'Cine Club',
    fullName: 'SRKREC Cine Club',
    dept: 'College-wide',
    category: 'cultural',
    advisor: 'Cine Club Coordinator',
    mission: 'Film screenings, short film making, movie discussions, script writing, and creative cinematography activities.',
    img: '/assets/images/clubs/cini-club.jpg',
    objectives: [
      'Encourage visual storytelling, scriptwriting, and creative direction.',
      'Provide training in video editing, audio mixing, and cinematography.',
      'Offer a platform to exhibit student short films, documentaries, and creative edits.'
    ],
    activities: [
      'Regular short film making contests and screenplays reviews.',
      'Critique circles and cinema appreciation discussions.',
      'Hands-on training in editing software (Premiere Pro, DaVinci Resolve).'
    ],
    upcomingEvents: [
      'Annual Short Film Festival & Award Ceremony',
      'Workshop on Screenplay Writing & Creative Storytelling'
    ],
    joinInfo: 'Open to all students with a passion for film, editing, writing, or acting. Registrations open during annual club inductions.'
  },
  {
    slug: 'srkr-lolo',
    name: 'SRKR LOLO',
    fullName: 'SRKR LOLO Music Club',
    dept: 'College-wide',
    category: 'cultural',
    advisor: 'Music Club Coordinator',
    mission: 'Vocal & instrumental ensembles, jam sessions, college band.',
    img: '/assets/images/clubs/music-club.jpg',
    objectives: [
      'Provide a platforms for vocalists, instrumentalists, and music enthusiasts.',
      'Represent the college at national and regional cultural fests.',
      'Promote classical, fusion, and contemporary musical styles.'
    ],
    activities: [
      'Weekly jam sessions and unplugged music nights.',
      'Training workshops for instruments (guitar, keyboard, drums).',
      'Collaborations with local and regional musicians.'
    ],
    upcomingEvents: [
      'SAMAGRA Cultural Musical Night performance',
      'Unplugged Jam Session in the open-air theater'
    ],
    joinInfo: 'Open to all students. Auditions are conducted for the core performing group, while general membership is open to all.',
    socials: {
      instagram: 'https://www.instagram.com/srkr_lolo_music',
      youtube: 'https://www.youtube.com/@srkr_lolo_music',
      linkedin: 'https://www.linkedin.com/company/srkr-lolo-music'
    }
  },
  {
    slug: 'language-nest',
    name: 'Language Nest (Literary Club)',
    fullName: 'Language Nest Literary and Toastmasters Club',
    dept: 'College-wide',
    category: 'cultural',
    advisor: 'Toastmasters Faculty Advisor',
    mission: 'Debates, elocution, SRKR Toastmasters & creative writing.',
    img: '/assets/images/clubs/language-nest.jpg',
    objectives: [
      'Build confidence in public speaking, communication, and interpersonal skills.',
      'Hone creative writing and literary review capacities.',
      'Expose students to standard debate formats and global Toastmasters protocols.'
    ],
    activities: [
      'Weekly Toastmasters meetings with structured speech evaluations.',
      'Elocution, debate, and declamation competitions.',
      'Creative writing workshops and annual magazine contributions.'
    ],
    upcomingEvents: [
      'SRKR Youth Parliament Debate Championship',
      'Weekly Toastmasters Table Topics Session'
    ],
    joinInfo: 'Open to all branches and semesters. Feel free to attend any weekly meeting as a guest to join.'
  }
];

export const serviceClubs: Club[] = [
  {
    slug: 'nss',
    name: 'NSS — National Service Scheme',
    fullName: 'National Service Scheme SRKR Unit',
    dept: 'College-wide',
    category: 'service',
    advisor: 'NSS Program Officer',
    mission: 'Village outreach, blood donation drives, plantation & health camps.',
    img: '/assets/images/clubs/nss.jpg',
    objectives: [
      'Inculcate social welfare and community responsibility in students.',
      'Conduct rural development, cleanliness, and literacy drives.',
      'Coordinate emergency relief and medical assistance campaigns.'
    ],
    activities: [
      'Annual 7-day special village service camps.',
      'Regular blood donation registries and collection drives.',
      'Swachh Bharat cleanliness and tree plantation programs.'
    ],
    upcomingEvents: [
      'Blood Donation Drive on Independence/Republic Day',
      '7-Day NSS Rural Outreach Camp in neighboring villages'
    ],
    joinInfo: 'Enrollment opens at the start of the academic year for first and second-year students.'
  },
  {
    slug: 'sustainability-club',
    name: 'Sustainability Club',
    fullName: 'SRKREC Sustainability and Eco Club',
    dept: 'College-wide',
    category: 'service',
    advisor: 'Eco Club Advisor',
    mission: 'Plantation drives, plastic-free campus & sustainability projects.',
    img: '/assets/images/clubs/eco-club.jpg',
    objectives: [
      'Promote environmental awareness and eco-friendly habits on campus.',
      'Execute waste management and energy conservation projects.',
      'Advocate for organic gardening and biological conservation.'
    ],
    activities: [
      'Waste paper recycling drives and plastic-free campaign walks.',
      'Nurturing the green cover and herbal garden on campus.',
      'Workshops on composting and rain-water harvesting structures.'
    ],
    upcomingEvents: [
      'World Environment Day Plantation Event',
      'Zero-Waste Campus Hackathon (innovating recycled goods)'
    ],
    joinInfo: 'Open to all eco-conscious students. Sign up via the online membership portal.'
  },
  {
    slug: 'blood-donors-forum',
    name: 'Blood Donors Forum',
    fullName: 'SRKR Blood Donors Forum',
    dept: 'College-wide',
    category: 'service',
    advisor: 'Forum Faculty In-charge',
    mission: 'Voluntary blood-donation registry & emergency donor mobilisation.',
    img: '/assets/images/clubs/blood-donors-forum.jpg',
    objectives: [
      'Maintain an active database of student blood groups.',
      'Coordinate with regional blood banks and hospitals during emergencies.',
      'Raise awareness about the health benefits and critical need of regular blood donation.'
    ],
    activities: [
      '24/7 volunteer mobilization for emergency requests.',
      'Donor registration desks and blood grouping campaigns for new students.',
      'Seminars on blood safety and health hygiene.'
    ],
    upcomingEvents: [
      'Mega Voluntary Blood Donation Camp',
      'Awareness Campaign on Platelet and Plasma Donation'
    ],
    joinInfo: 'Register your details, contact number, and blood group at the forum coordinator desk.'
  }
];

export const sportsClubs: Club[] = [
  {
    slug: 'cricket-club',
    name: 'Cricket Club',
    fullName: 'SRKREC Cricket Club',
    dept: 'Sports',
    category: 'sports',
    advisor: 'Physical Director / Cricket Coach',
    mission: 'Regular cricket matches, coaching clinics, and intercollegiate cricket tournaments.',
    img: '/assets/images/clubs/cricket-club.jpg',
    objectives: [
      'Provide standard cricket training and skill development facilities.',
      'Select and train the college cricket team for university-level events.',
      'Promote sportsmanship and strategic game planning.'
    ],
    activities: [
      'Daily net practice and bowling machine sessions.',
      'Intra-college cricket tournament (Departmental League).',
      'Hosting friendly matches with visiting institutional teams.'
    ],
    upcomingEvents: [
      'JAITRA Sports Carnival Cricket Championship',
      'Inter-collegiate cricket trials'
    ],
    joinInfo: 'Open to all students. Registrations for net practice and trials are held at the sports office.'
  },
  {
    slug: 'volleyball-club',
    name: 'Volleyball Club',
    fullName: 'SRKREC Volleyball Club',
    dept: 'Sports',
    category: 'sports',
    advisor: 'Physical Education In-charge',
    mission: 'Inter-departmental volleyball competitions, team practice sessions, and skill-building camps.',
    img: '/assets/images/clubs/volleyball-club.jpg',
    objectives: [
      'Hone volleyball skills, agility, and team combinations.',
      'Maintain the standard volleyball court and amenities.',
      'Develop tournament play strategies.'
    ],
    activities: [
      'Regular evening practice matches.',
      'Annual departmental volleyball championship.',
      'Friendly inter-college fixtures.'
    ],
    upcomingEvents: [
      'JAITRA National Volleyball Tournament',
      'Departmental Volleyball League'
    ],
    joinInfo: 'Register with the student coordinator at the college volleyball courts.'
  },
  {
    slug: 'kabaddi-club',
    name: 'Kabaddi Club',
    fullName: 'SRKREC Kabaddi Club',
    dept: 'Sports',
    category: 'sports',
    advisor: 'Physical Education In-charge',
    mission: 'Traditional kabaddi training, intramural tournaments, and participation in intercollegiate events.',
    img: '/assets/images/clubs/kabaddi-club.jpg',
    objectives: [
      'Promote and sustain the traditional Indian sport of Kabaddi.',
      'Develop physical strength, endurance, and coordination.',
      'Participate in national and state-level engineering tournaments.'
    ],
    activities: [
      'Intense daily fitness drills and raiding/tackling practices.',
      'Host annual SRKR Kabaddi Premier League.',
      'Regular selection trials for the college team.'
    ],
    upcomingEvents: [
      'JAITRA Kabaddi Championship',
      'College Team Selection Trials'
    ],
    joinInfo: 'Register at the physical education department desk.'
  },
  {
    slug: 'basketball-club',
    name: 'Basketball Club',
    fullName: 'SRKREC Basketball Club',
    dept: 'Sports',
    category: 'sports',
    advisor: 'Physical Education In-charge',
    mission: 'Court practice sessions, college leagues, and participation in district-level basketball tournaments.',
    img: '/assets/images/clubs/basketball-club.jpg',
    objectives: [
      'Provide professional basketball coaching and tactical coordination.',
      'Maintain the state-of-the-art college basketball courts.',
      'Encourage fitness and speed endurance among student athletes.'
    ],
    activities: [
      'Dribbling, shooting, and tactical defense training.',
      'Inter-departmental 3x3 basketball league.',
      'Friendly matches with district club teams.'
    ],
    upcomingEvents: [
      'JAITRA Basketball Carnival',
      'SRKR Inter-Department 5v5 Tournament'
    ],
    joinInfo: 'Open to all students. Meet the basketball captain at the courts during practice hours.'
  },
  {
    slug: 'badminton-club',
    name: 'Badminton Club',
    fullName: 'SRKREC Badminton Club',
    dept: 'Sports',
    category: 'sports',
    advisor: 'Physical Director',
    mission: 'Singles and doubles practice, racket skill workshops, and campus badminton championships.',
    img: '/assets/images/clubs/badminton-club.jpg',
    objectives: [
      'Foster agility, hand-eye coordination, and racket skills.',
      'Make maximum utilization of indoor badminton facilities.',
      'Encourage recreation and stress-relief through active play.'
    ],
    activities: [
      'Singles/doubles round-robin practices.',
      'Annual intra-college badminton championship.',
      'Coaching camps for beginners.'
    ],
    upcomingEvents: [
      'JAITRA National Badminton Championship',
      'SRKR Singles & Doubles Open Tournament'
    ],
    joinInfo: 'Book your slot / register at the indoor sports complex office.'
  },
  {
    slug: 'football-club',
    name: 'Football Club',
    fullName: 'SRKREC Football Club',
    dept: 'Sports',
    category: 'sports',
    advisor: 'Physical Director / Football Coach',
    mission: 'Inter-departmental football tournaments, coaching sessions, and annual JAITRA sports carnival.',
    img: '/assets/images/clubs/football-club.jpg',
    objectives: [
      'Develop tactical understanding, team cooperation, and football skills.',
      'Train student players for JNTU and other national-level university games.',
      'Promote physical fitness and athletic discipline.'
    ],
    activities: [
      'Tactical sessions, match play drills, and endurance training.',
      'Annual departmental football tournament.',
      'Hosting friendly weekend matches.'
    ],
    upcomingEvents: [
      'JAITRA Sports Carnival Football Championship',
      'Inter-collegiate football selections'
    ],
    joinInfo: 'Report to the college main sports ground during evening session timings.'
  }
];

export const allClubs: Club[] = [
  ...techClubs,
  ...culturalClubs,
  ...serviceClubs,
  ...sportsClubs
];
