/**
 * Structured academic calendar data for SRKR Engineering College.
 * Contains listings of academic calendars spanning multiple years.
 *
 * Structure:
 *   academicYear – e.g. "2025-26", "2024-25"
 *   entries      – list of calendar links for different degrees & years
 *     degree     – "B.Tech" | "M.Tech" | "BBA"
 *     year       – e.g. "I", "II", "III", "IV", "II & III", "All" (for combined files)
 *     url        – link to PDF or image file
 */

export interface CalendarEntry {
  degree: 'B.Tech' | 'M.Tech' | 'BBA';
  /** Student year(s) targeted: "I", "II", "III", "IV", "II & III", "All" */
  year: string;
  /** Relative URL path to file */
  url: string;
}

export interface AcademicCalendarYear {
  academicYear: string;
  entries: CalendarEntry[];
}

export const academicCalendarData: AcademicCalendarYear[] = [
  {
    academicYear: '2025-26',
    entries: [
      { degree: 'B.Tech', year: 'I', url: '/files/ac/I_YEAR_B.TECH_ACADEMIC_CALENDAR_2025-26.pdf' },
      { degree: 'B.Tech', year: 'II & III', url: '/files/ac/II_III_B.Tech_Academic_Calendar_2025-26.pdf' },
      { degree: 'B.Tech', year: 'IV', url: '/files/ac/IV_B.Tech_Academic_Calendar_2025-26.pdf' },
      { degree: 'BBA', year: 'I', url: '/files/ac/I_YEAR_BBA_ACADEMIC_2025-26.pdf' },
      { degree: 'BBA', year: 'II', url: '/files/ac/II_YEAR_BBA_ACADEMIC_2025-26.pdf' },
      { degree: 'M.Tech', year: 'II', url: '/files/ac/II_YEAR_M.TECH_ACADEMIC_CALENDAR_2025-26.pdf' },
    ],
  },
  {
    academicYear: '2024-25',
    entries: [
      { degree: 'B.Tech', year: 'All', url: '/files/ac/btech_academic_calendar_2024_2025.jpg' },
      { degree: 'M.Tech', year: 'All', url: '/files/ac/M.Tech Academic Calendar 2024-25.pdf' },
    ],
  },
  {
    academicYear: '2023-24',
    entries: [
      { degree: 'B.Tech', year: 'All', url: '/files/ac/btech_academic_calendar_2023_2024.pdf' },
      { degree: 'M.Tech', year: 'All', url: '/files/ac/mtech_academic_calendar_2023_2024.pdf' },
    ],
  },
  {
    academicYear: '2022-23',
    entries: [
      { degree: 'B.Tech', year: 'All', url: '/files/ac/btech_academic_calendar_2022_2023.jpg' },
      { degree: 'B.Tech', year: 'I', url: '/files/ac/academic_calendar_2022_year1.pdf' },
    ],
  },
  {
    academicYear: '2021-22',
    entries: [
      { degree: 'B.Tech', year: 'All', url: '/files/ac/academic_calendar_btech_2021_22.jpg' },
      { degree: 'M.Tech', year: 'All', url: '/files/ac/academic_calendar_mtech_2021_22.jpg' },
    ],
  },
  {
    academicYear: '2020-21',
    entries: [
      { degree: 'B.Tech', year: 'All', url: '/files/ac/btech_academic_calendar_2020_2021.jpg' },
      { degree: 'M.Tech', year: 'All', url: '/files/ac/academic_calendar_mtech_2020_2021.jpg' },
    ],
  },
  {
    academicYear: '2019-20',
    entries: [
      { degree: 'B.Tech', year: 'All', url: '/files/ac/academic_calendar_2019_2020.jpg' },
      { degree: 'M.Tech', year: 'All', url: '/files/ac/2019-2020_ACADEMIC_CALENDAR_MTech.pdf' },
    ],
  },
  {
    academicYear: '2018-19',
    entries: [
      { degree: 'B.Tech', year: 'All', url: '/files/ac/academic_calendar_2018_2019.pdf' },
      { degree: 'M.Tech', year: 'All', url: '/files/ac/2018-2019_ACADEMIC_CALENDAR_MTech.pdf' },
    ],
  },
  {
    academicYear: '2017-18',
    entries: [
      { degree: 'B.Tech', year: 'All', url: '/files/ac/academic_calendar_2017_2018.pdf' },
      { degree: 'M.Tech', year: 'All', url: '/files/ac/2017-2018_ACADEMIC_CALENDAR_MTech.pdf' },
    ],
  },
  {
    academicYear: '2016-17',
    entries: [
      { degree: 'B.Tech', year: 'All', url: '/files/ac/academic_calendar_2016_2017.pdf' },
      { degree: 'M.Tech', year: 'All', url: '/files/ac/2016-2017_ACADEMIC_CALENDAR_MTech.pdf' },
    ],
  },
];
