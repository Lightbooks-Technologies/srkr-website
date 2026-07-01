# SRKR Website API Endpoints Documentation

This document describes how to use and filter the JSON API endpoints for retrieving **Syllabus & Model Papers** and **Academic Calendars**.

---

## 1. Syllabus API Endpoint

### Endpoint URL
```http
GET /api/syllabus.json
```

### Description
Returns a list of structured syllabus regulations, degree programs, departments, year-wise syllabus links, and model papers.

### Query Parameters
All query parameters are case-insensitive and optional:

| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `regulation` | `string` | Filter by syllabus regulation year. | `r23` |
| `degree` | `string` | Filter by degree program. | `B.Tech` |
| `department` | `string` | Filter by department/branch. | `CSE` |
| `year` | `string` | Filter documents by specific student year. | `III` |

### JSON Response Format
```json
{
  "options": {
    "regulations": ["R25", "R24", "R23", "R20"],
    "degrees": ["M.Tech", "BBA", "B.Tech"],
    "departments": ["CSE", "ECE", "EEE", "MECH", "IT", "CIVIL", "BBA", "AIDS", "AIML", "CSIT", "CSBS", "CSD", "CIC", "OPEN ELECTIVES", "HONOURS", "MINORS"],
    "years": ["Combined", "I", "II", "III", "IV", "OE-I", "OE-II", "CSE", "IT", "ECE", "EEE", "MECH", "CIVIL", "AIDS", "CIC", "AIML"]
  },
  "data": [
    {
      "regulation": "R23",
      "title": "R23 Syllabus & Model Papers",
      "entries": [
        {
          "department": "CSE",
          "degree": "B.Tech",
          "syllabus": [
            { "year": "I", "url": "/files/SYLLABUS/R23/B.Tech_R23_I_Year_CSE_Syllabus_FINAL.pdf" },
            { "year": "II", "url": "/files/SYLLABUS/R23/B.Tech_R23_II_Year_CSE_Syllabus_FINAL.pdf" },
            { "year": "III", "url": "/files/SYLLABUS/R23/R23_3rd_YEAR_CSE_SYLLABUS.pdf" }
          ],
          "modelPapers": [
            { "year": "I", "url": "/files/SYLLABUS/R23/B.Tech_R23_I_Year_CSE_MQP_FINAL.pdf" },
            { "year": "II", "url": "/files/SYLLABUS/R23/B.Tech_R23_II_Year_CSE_MQP_FINAL.pdf" },
            { "year": "III", "url": "/files/SYLLABUS/R23/R23_3RD_YEAR_CSE_MQPS.pdf" }
          ]
        }
      ]
    }
  ]
}
```

---

## 2. Academic Calendar API Endpoint

### Endpoint URL
```http
GET /api/academic-calendar.json
```

### Description
Returns structured lists of download links for academic calendars across multiple years and degrees.

### Query Parameters
All query parameters are case-insensitive and optional:

| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `academicYear` | `string` | Filter by academic year. | `2025-26` |
| `degree` | `string` | Filter by degree program. | `B.Tech` |
| `year` | `string` | Filter by student year. | `II & III` |

### JSON Response Format
```json
{
  "options": {
    "academicYears": ["2025-26", "2024-25", "2023-24", "2022-23", "2021-22", "2020-21", "2019-20", "2018-19", "2017-18", "2016-17"],
    "degrees": ["B.Tech", "BBA", "M.Tech"],
    "years": ["I", "II & III", "IV", "II", "All"]
  },
  "data": [
    {
      "academicYear": "2025-26",
      "entries": [
        { "degree": "B.Tech", "year": "I", "url": "/files/ac/I_YEAR_B.TECH_ACADEMIC_CALENDAR_2025-26.pdf" },
        { "degree": "B.Tech", "year": "II & III", "url": "/files/ac/II_III_B.Tech_Academic_Calendar_2025-26.pdf" },
        { "degree": "BBA", "year": "I", "url": "/files/ac/I_YEAR_BBA_ACADEMIC_2025-26.pdf" }
      ]
    }
  ]
}
```
