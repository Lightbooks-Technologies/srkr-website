import type { APIRoute } from 'astro';
import { syllabusData } from '../../data/syllabus';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const regulationParam = url.searchParams.get('regulation')?.toLowerCase();
  const degreeParam = url.searchParams.get('degree')?.toLowerCase();
  const departmentParam = url.searchParams.get('department')?.toLowerCase();
  const yearParam = url.searchParams.get('year')?.toLowerCase();

  // Extract unique options from the base dataset
  const regulations = Array.from(new Set(syllabusData.map(r => r.regulation)));
  
  const degreesSet = new Set<string>();
  const departmentsSet = new Set<string>();
  const yearsSet = new Set<string>();

  syllabusData.forEach(reg => {
    reg.entries.forEach(entry => {
      if (entry.degree) degreesSet.add(entry.degree);
      if (entry.department) departmentsSet.add(entry.department);
      entry.syllabus.forEach(doc => {
        if (doc.year) yearsSet.add(doc.year);
      });
      entry.modelPapers.forEach(doc => {
        if (doc.year) yearsSet.add(doc.year);
      });
    });
  });

  const options = {
    regulations,
    degrees: Array.from(degreesSet),
    departments: Array.from(departmentsSet),
    years: Array.from(yearsSet)
  };

  let filtered = syllabusData;

  // 1. Filter by regulation (e.g. r25, r23)
  if (regulationParam) {
    filtered = filtered.filter(reg => reg.regulation.toLowerCase() === regulationParam);
  }

  // 2. Filter entries inside regulations by degree or department
  if (degreeParam || departmentParam || yearParam) {
    filtered = filtered.map(reg => {
      let entries = reg.entries;

      if (degreeParam) {
        entries = entries.filter(e => e.degree.toLowerCase() === degreeParam);
      }
      if (departmentParam) {
        entries = entries.filter(e => e.department.toLowerCase() === departmentParam);
      }

      // Filter documents (syllabus/modelPapers) by year if requested
      if (yearParam) {
        entries = entries.map(e => {
          return {
            ...e,
            syllabus: e.syllabus.filter(doc => doc.year.toLowerCase() === yearParam),
            modelPapers: e.modelPapers.filter(doc => doc.year.toLowerCase() === yearParam),
          };
        }).filter(e => e.syllabus.length > 0 || e.modelPapers.length > 0);
      }

      return {
        ...reg,
        entries,
      };
    }).filter(reg => reg.entries.length > 0);
  }

  return new Response(JSON.stringify({ options, data: filtered }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
