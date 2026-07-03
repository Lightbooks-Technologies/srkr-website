import type { APIRoute } from 'astro';
import { academicCalendarData } from '../../data/academicCalendar';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const academicYearParam = url.searchParams.get('academicYear')?.toLowerCase();
  const degreeParam = url.searchParams.get('degree')?.toLowerCase();
  const yearParam = url.searchParams.get('year')?.toLowerCase();

  // Extract unique options from the base dataset
  const academicYears = Array.from(new Set(academicCalendarData.map(c => c.academicYear)));
  
  const degreesSet = new Set<string>();
  const yearsSet = new Set<string>();

  academicCalendarData.forEach(ac => {
    ac.entries.forEach(entry => {
      if (entry.degree) degreesSet.add(entry.degree);
      if (entry.year) yearsSet.add(entry.year);
    });
  });

  const options = {
    academicYears,
    degrees: Array.from(degreesSet),
    years: Array.from(yearsSet)
  };

  let filtered = academicCalendarData;

  // 1. Filter by academic year (e.g. 2025-26)
  if (academicYearParam) {
    filtered = filtered.filter(ac => ac.academicYear.toLowerCase() === academicYearParam);
  }

  // 2. Filter entries inside years by degree or student year
  if (degreeParam || yearParam) {
    filtered = filtered.map(ac => {
      let entries = ac.entries;

      if (degreeParam) {
        entries = entries.filter(e => e.degree.toLowerCase() === degreeParam);
      }
      if (yearParam) {
        entries = entries.filter(e => e.year.toLowerCase() === yearParam);
      }

      return {
        ...ac,
        entries,
      };
    }).filter(ac => ac.entries.length > 0);
  }

  return new Response(JSON.stringify({ options, data: filtered }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
