/**
 * Structured syllabus data for SRKR Engineering College.
 * Single source of truth consumed by both the syllabus page and the /api/syllabus.json endpoint.
 *
 * Structure:
 *   regulation  – e.g. "R25", "R23", "R20"
 *   entries     – list of programme entries under that regulation
 *     department     – short dept code / label
 *     degree         – e.g. "B.Tech", "M.Tech", "BBA"
 *     specialization – (optional) specialization label for M.Tech
 *     syllabus       – array of { year, url } objects
 *     modelPapers    – array of { year, url } objects
 *                      (year is "I", "II", "III", "IV" or "Combined" for single-PDF entries)
 */

export interface SyllabusDocument {
  /** Year label: "I", "II", "III", "IV", or "Combined" */
  year: string;
  /** Relative URL path to the PDF (always starts with /files/SYLLABUS/…) */
  url: string;
}

export interface SyllabusEntry {
  /** Short department / programme code, e.g. "CSE", "CIVIL", "HONOURS" */
  department: string;
  /** Degree awarded: "B.Tech" | "M.Tech" | "BBA" */
  degree: string;
  /** Specialization – only present for M.Tech programmes */
  specialization?: string;
  syllabus: SyllabusDocument[];
  modelPapers: SyllabusDocument[];
}

export interface SyllabusRegulation {
  /** Regulation code shown in accordions, e.g. "R25", "R23" */
  regulation: string;
  /** Human-readable title shown in accordions */
  title: string;
  entries: SyllabusEntry[];
}

// ---------------------------------------------------------------------------
// R25 – M.Tech (latest regulation)
// ---------------------------------------------------------------------------
const r25: SyllabusRegulation = {
  regulation: 'R25',
  title: 'R25 Syllabus & Model Papers',
  entries: [
    {
      department: 'CSE',
      degree: 'M.Tech',
      specialization: 'Computer Science and Technology',
      syllabus: [{ year: 'Combined', url: '/files/SYLLABUS/r25_mtech/R25_M Tech_CSE_CST Syllabus.pdf' }],
      modelPapers: [{ year: 'Combined', url: '/files/SYLLABUS/r25_mtech/R25 M.Tech-CSE(CST) MQPS.pdf' }],
    },
    {
      department: 'ECE',
      degree: 'M.Tech',
      specialization: 'Communication Systems',
      syllabus: [{ year: 'Combined', url: '/files/SYLLABUS/r25_mtech/R25_M.Tech_ECE_CS_Syllabus.pdf' }],
      modelPapers: [{ year: 'Combined', url: '/files/SYLLABUS/r25_mtech/R25 M.TECH-ECE-CS MQPS.pdf' }],
    },
    {
      department: 'EEE',
      degree: 'M.Tech',
      specialization: 'Power Systems & Automation',
      syllabus: [{ year: 'Combined', url: '/files/SYLLABUS/r25_mtech/R25_M.Tech_SYLLABUS_EEE-PS&A.pdf' }],
      modelPapers: [{ year: 'Combined', url: '/files/SYLLABUS/r25_mtech/R25_M.Tech_EEE-PS&A MQPS.pdf' }],
    },
    {
      department: 'MECH',
      degree: 'M.Tech',
      specialization: 'CAD/CAM',
      syllabus: [{ year: 'Combined', url: '/files/SYLLABUS/r25_mtech/R25-MECH-Syllabus-CADCAM.pdf' }],
      modelPapers: [{ year: 'Combined', url: '/files/SYLLABUS/r25_mtech/R25-M.TECH-MECH-CADCAM MQPS.pdf' }],
    },
    {
      department: 'IT',
      degree: 'M.Tech',
      specialization: 'Information Technology',
      syllabus: [{ year: 'Combined', url: '/files/SYLLABUS/r25_mtech/R25-MTECH-IT-SYLLABUS.pdf' }],
      modelPapers: [{ year: 'Combined', url: '/files/SYLLABUS/r25_mtech/R25-M.Tech IT MQP.pdf' }],
    },
    {
      department: 'CIVIL',
      degree: 'M.Tech',
      specialization: 'Structural Engineering',
      syllabus: [{ year: 'Combined', url: '/files/SYLLABUS/r25_mtech/R25_M.Tech_CIVIL_SE Syllabus.pdf' }],
      modelPapers: [{ year: 'Combined', url: '/files/SYLLABUS/r25_mtech/R25_MTECH-CIVIL-MQPS.pdf' }],
    },
  ],
};

// ---------------------------------------------------------------------------
// R24 – BBA
// ---------------------------------------------------------------------------
const r24: SyllabusRegulation = {
  regulation: 'R24',
  title: 'R24 Syllabus & Model Papers',
  entries: [
    {
      department: 'BBA',
      degree: 'BBA',
      syllabus: [
        { year: 'I', url: '/files/SYLLABUS/R24/Syllabus_R24_B.B.A_B.B.A_1781.pdf' },
        { year: 'II', url: '/files/SYLLABUS/R24/Syllabus_R24_B.B.A_B.B.A_1894.pdf' },
      ],
      modelPapers: [
        { year: 'I', url: '/files/SYLLABUS/R23/BBA_R24_I_Year_MQP.pdf' },
        { year: 'II', url: '/files/SYLLABUS/R23/BBA_R24_II_Year_II_SEM_MQP_old.pdf' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// R23 – B.Tech (all branches)
// ---------------------------------------------------------------------------
const r23: SyllabusRegulation = {
  regulation: 'R23',
  title: 'R23 Syllabus & Model Papers',
  entries: [
    {
      department: 'AIDS',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23 I_Year_ AIDS_ Syllabus_ FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23 II_Year_ AIDS_ Syllabus_ FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3rd_YEAR_AIDS_SYLLABUS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/B.Tech _R23 _IV_ Year_AIDS.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech _R23 _I_ Year_ AIDS_ MQP _FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech _R23 _II_ Year_ AIDS_ MQP _FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3RD_YEAR_AIDS_MQPS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/Model_QP/AIDS MQPS.pdf' },
      ],
    },
    {
      department: 'AIML',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I _Year_ AIML _Syllabus _FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II _Year_ AIML _Syllabus _FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3rd_YEAR_AIML_SYLLABUS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/B.Tech _R23 _IV_ Year_AIML.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech _R23 _I_ Year_ AIML_ MQP_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech _R23 _II_ Year_ AIML_ MQP_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3RD_YEAR_AIML_MQPS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/Model_QP/AIML MQPS.pdf' },
      ],
    },
    {
      department: 'CSIT',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I _Year_ CSIT_ Syllabus_ FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II _Year_ CSIT_ Syllabus_ FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3rd_YEAR_CSIT_SYLLABUS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/B.Tech _R23 _IV_ Year_CSIT.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_Year_CSIT_ MQP_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_Year_CSIT_ MQP_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3RD_YEAR_CSIT_MQPS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/Model_QP/CSIT MQPS.pdf' },
      ],
    },
    {
      department: 'CIVIL',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23 _I _Year_ CIVIL_ Syllabus _FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23 _II _Year_ CIVIL_ Syllabus _FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3rd_YEAR_CIVIL_SYLLABUS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/B.Tech _R23 _IV_ Year_CIVIL.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_ R23_ I _Year _CIVIL_ MQP_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_ R23_ II _Year _CIVIL_ MQP_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3RD_YEAR_CIVIL_MQPS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/Model_QP/CIVIL MQPS.pdf' },
      ],
    },
    {
      department: 'CSBS',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_ I_Year_CSBS_Syllabus_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_ II_Year_CSBS_Syllabus_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3rd_YEAR_CSBS_SYLLABUS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/B.Tech _R23 _IV_ Year_CSBS.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_ Year_ CSBS_MQP_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_ Year_ CSBS_MQP_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3RD_YEAR_CSBS_MQPS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/Model_QP/CSBS MQPS.pdf' },
      ],
    },
    {
      department: 'CSD',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_Year_CSG_Syllabus_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_Year_CSG_Syllabus_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3rd_YEAR_CSD_SYLLABUS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/B.Tech _R23 _IV_ Year_CSD.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_Year_CSG_MQP_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_Year_CSG_MQP_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3RD_YEAR_CSD_MQPS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/Model_QP/CSD MQPS.pdf' },
      ],
    },
    {
      department: 'CSE',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_Year_CSE_Syllabus_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_Year_CSE_Syllabus_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3rd_YEAR_CSE_SYLLABUS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/B.Tech _R23 _IV_ Year_CSE.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_Year_CSE_MQP_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_Year_CSE_MQP_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3RD_YEAR_CSE_MQPS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/Model_QP/CSE MQPS.pdf' },
      ],
    },
    {
      department: 'CIC',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_Year_CIC_Syllabus_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_Year_CIC_Syllabus_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3rd_YEAR_CIC_SYLLABUS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/B.Tech _R23 _IV_ Year_CIC.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_Year_CIC_MQP_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_Year_CIC_MQP_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3RD_YEAR_CIC_MQPS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/Model_QP/CIC MQPS.pdf' },
      ],
    },
    {
      department: 'ECE',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_Year_ECE_Syllabus_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_Year_ECE_Syllabus_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3rd_YEAR_ECE_SYLLABUS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/B.Tech _R23 _IV_ Year_ECE.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_Year_ECE_MQP_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_Year_ECE_MQP_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3RD_YEAR_ECE_MQPS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/Model_QP/ECE MQPS.pdf' },
      ],
    },
    {
      department: 'EEE',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_Year_EEE_Syllabus_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_Year_EEE_Syllabus_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3rd_YEAR_EEE_SYLLABUS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/B.Tech _R23 _IV_ Year_EEE.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_Year_EEE_MQP_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_Year_EEE_MQP_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3RD_YEAR_EEE_MQPS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/Model_QP/EEE MQPS.pdf' },
      ],
    },
    {
      department: 'IT',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_Year_IT_Syllabus_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_Year_IT_Syllabus_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3rd_YEAR_IT_SYLLABUS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/B.Tech _R23 _IV_ Year_IT.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_Year_IT_MQP_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_Year_IT_MQP_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3RD_YEAR_IT_MQPS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/Model_QP/IT MQPS.pdf' },
      ],
    },
    {
      department: 'MECH',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_Year_MECH_Syllabus_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_Year_MECH_Syllabus_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3rd_YEAR_MECH_SYLLABUS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/B.Tech _R23 _IV_ Year_MECH.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R23/B.Tech_R23_I_Year_ME_MQP_FINAL.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R23/B.Tech_R23_II_Year_ME_MQP_FINAL.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R23/R23_3RD_YEAR_MECH_MQPS.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R23/Model_QP/MECH MQPS.pdf' },
      ],
    },
    {
      department: 'OPEN ELECTIVES',
      degree: 'B.Tech',
      syllabus: [
        { year: 'OE-I',  url: '/files/SYLLABUS/R23_OE/23_SERIES_OE_1_syllabus.pdf' },
        { year: 'OE-II', url: '/files/SYLLABUS/R23/23_SERIES_OE_2_syllabus.pdf' },
        { year: 'OE-III', url: '/files/SYLLABUS/R23_OE/OE-III SYLLABUS.pdf' },
        { year: 'OE-IV',  url: '/files/SYLLABUS/R23_OE/OE-IV SYLLABUS.pdf' },
      ],
      modelPapers: [
        { year: 'OE-I',  url: '/files/SYLLABUS/R23_OE/R23_OE-I_MQP.pdf' },
        { year: 'OE-II', url: '/files/SYLLABUS/R23/23_SERIES_OE_2_MQP.pdf' },
        { year: 'OE-III', url: '/files/SYLLABUS/R23_OE/OE-III MQPS.pdf' },
        { year: 'OE-IV',  url: '/files/SYLLABUS/R23_OE/OE-IV MQPS.pdf' },
      ],
    },
    {
      department: 'HONOURS',
      degree: 'B.Tech',
      syllabus: [
        { year: 'CSE',   url: '/files/SYLLABUS/R23/R23_CSE_HONORS_SYLLABUS_MQP.pdf' },
        { year: 'IT',    url: '/files/SYLLABUS/R23/R23_IT_HONORS_SYLLABUS_MQP.pdf' },
        { year: 'ECE',   url: '/files/SYLLABUS/R23/R23_ECE_HONORS_SYLLABUS_MQP.pdf' },
        { year: 'EEE',   url: '/files/SYLLABUS/R23/R23_EEE_HONORS_SYLLABUS_MQP.pdf' },
        { year: 'MECH',  url: '/files/SYLLABUS/R23/R23_MECH_HONORS_SYLLABUS_MQP.pdf' },
        { year: 'CIVIL', url: '/files/SYLLABUS/R23/R23_CIVIL_HONORS_SYLLABUS_MQP.pdf' },
      ],
      modelPapers: [],
    },
    {
      department: 'MINORS',
      degree: 'B.Tech',
      syllabus: [
        { year: 'CSE',   url: '/files/SYLLABUS/R23/R23_CSE_MINORS_SYLLABUS_MQP.pdf' },
        { year: 'IT',    url: '/files/SYLLABUS/R23/R23_IT_MINORS_SYLLABUS_MQP.pdf' },
        { year: 'ECE',   url: '/files/SYLLABUS/R23/R23_ECE_MINORS_SYLLABUS_MQP.pdf' },
        { year: 'EEE',   url: '/files/SYLLABUS/R23/R23_EEE_MINORS_SYLLABUS_MQP.pdf' },
        { year: 'MECH',  url: '/files/SYLLABUS/R23/R23_MECH_MINORS_SYLLABUS_MQP.pdf' },
        { year: 'AIDS',  url: '/files/SYLLABUS/R23/R23_AIDS_MINORS_SYLLABUS_MQP.pdf' },
        { year: 'CIC',   url: '/files/SYLLABUS/R23/R23_CIC_MINORS_SYLLABUS_MQP.pdf' },
        { year: 'AIML',  url: '/files/SYLLABUS/R23/R23_AIML_MINORS_SYLLABUS_MQP.pdf' },
        { year: 'CIVIL', url: '/files/SYLLABUS/R23/R23_CIVIL_MINORS_SYLLABUS_MQP.pdf' },
      ],
      modelPapers: [],
    },
  ],
};

// ---------------------------------------------------------------------------
// R20 – B.Tech (all branches, 4-year data)
// ---------------------------------------------------------------------------
const r20: SyllabusRegulation = {
  regulation: 'R20',
  title: 'R20 Syllabus & Model Papers',
  entries: [
    {
      department: 'AIDS',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R20/AIDS-R20-Syllabus.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-AIDS-SYLLABUS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_AIDS_Syllabus_FINAL_ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_aids_syllabus_final_ws.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R20/R20-AIDS-MODELPAPERS.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-AIDS-MODEL-PAPERS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_AIDS_Model_Papers_FINAL_ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_aids_mqp_final_ws.pdf' },
      ],
    },
    {
      department: 'AIML',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R20/R20-I-Year-AIML-Syllabus.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/B.Tech_R20_II_Year_AIML_Syllabus.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_AIML_Syllabus.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/B.Tech R20 IV Year AIML Syllabus FINAL ws.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R20/R20-I-Year-AIML-Model-Papers.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/B.Tech_R20_II_Year_AIML_MQP.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_AIML_MQP.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/B.Tech R20 IV Year AIML MQP FINAL ws.pdf' },
      ],
    },
    {
      department: 'CIVIL',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R20/CE-R20-Syllabus.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-CE-SYLLABUS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_CIVIL_Syllabus_FINAL_ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_civil_syllabus_final_ws.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R20/R20-CE-MODELPAPERS.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-CE-MODEL-PAPERS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_CIVIL_Model_Papers_FINAL_ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_civil_mqp_final_ws.pdf' },
      ],
    },
    {
      department: 'CSBS',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R20/CSBS-R20-Syllabus.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-CSBS-SYLLABUS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_CSBS_Syllabus_FINAL_ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_csbs_syllabus_final_ws.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R20/R20-CSBS-MODELPAPERS.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-CSBS-MODEL_PAPERS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_CSBS_Model_Papers_FINAL_ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_csbs_mqp_final_ws.pdf' },
      ],
    },
    {
      department: 'CSD',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R20/R20-I-Year-CSD-Syllabus.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/B.Tech_R20_II_Year_CSG_Syllabus.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_CSG_Syllabus.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/B.Tech R20 IV Year CSG Syllabus FINAL ws.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R20/R20-I-Year-CSD-Model-Papers.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/B.Tech_R20_II_Year_CSG_MQP.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_CSG_MQP.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/B.Tech R20 IV Year CSG MQP FINAL ws.pdf' },
      ],
    },
    {
      department: 'CSE',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R20/CSE-R20-Syllabus.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-CSE-SYLLABUS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_CSE_Syllabus_FINAL_ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_cse_syllabus_final_ws.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R20/R20-CSE-MODELPAPERS.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-CSE-MODEL-PAPERS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_CSE_Model_Papers_FINAL_ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_cse_mqp_final_ws.pdf' },
      ],
    },
    {
      department: 'CIC',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R20/R20_CSE_IoT_1ST_YEAR_Syllabus.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/R20_CIC_2nd_YEAR_SYLLABUS_FINAL_ws.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/R20-CIC 3rd Year Syllabus final ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/R20_4th_year_CIC_SYLLABUS.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R20/R20_CSE_IoT_1ST_YEAR_Model_Papers.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/R20_CIC_2nd_YEAR_MQP_FINAL_ws.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/R20-CIC 3rd Year MQP final ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/R20_4th_year_CIC_MQP.pdf' },
      ],
    },
    {
      department: 'ECE',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R20/ECE-R20-Syllabus.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-ECE-SYLLABUS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_ECE_Syllabus_FINAL_ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_ece_syllabus_final_ws.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R20/R20-ECE-MODELPAPERS.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-ECE-MODEL-PAPERS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_ECE_Model_Papers_FINAL_ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_ece_mqp_final_ws.pdf' },
      ],
    },
    {
      department: 'EEE',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R20/EEE-R20-Syllabus.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-EEE-SYLLABUS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_EEE_Syllabus_FINAL.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_eee_syllabus_final_ws.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R20/R20-EEE-MODELPAPERS.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-EEE-MODEL-PAPERS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_EEE_Model_Papers_FINAL_ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_eee_mqp_final_ws.pdf' },
      ],
    },
    {
      department: 'IT',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R20/IT-R20-Syllabus.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-IT-SYLLABUS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_IT_Syllabus_FINAL_ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_it_syllabus_final_ws.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R20/R20-IT-MODELPAPERS.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-IT-MODEL-PAPERS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_IT_Model_Papers_FINAL_ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_it_mqp_final_ws.pdf' },
      ],
    },
    {
      department: 'MECH',
      degree: 'B.Tech',
      syllabus: [
        { year: 'I',   url: '/files/SYLLABUS/R20/MECH-R20-Syllabus.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-MECH-SYLLABUS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_MECH_Syllabus_FINAL_ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_mech_syllabus_final_ws.pdf' },
      ],
      modelPapers: [
        { year: 'I',   url: '/files/SYLLABUS/R20/R20-MECH-MODELPAPERS.pdf' },
        { year: 'II',  url: '/files/SYLLABUS/R20/II-R20-MECH-MODEL-PAPERS.pdf' },
        { year: 'III', url: '/files/SYLLABUS/R20/B.Tech_R20_III_Year_MECH_Model_Papers_FINAL_ws.pdf' },
        { year: 'IV',  url: '/files/SYLLABUS/R20/b.tech_r20_iv_year_mech_mqp_final_ws.pdf' },
      ],
    },
  ],
};

/** Full list of all syllabus regulations, newest first. */
export const syllabusData: SyllabusRegulation[] = [r25, r24, r23, r20];
