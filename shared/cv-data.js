// shared/cv-data.js
//
// ─────────────────────────────────────────────────────────────────────────
// TODO BEFORE PUBLISHING — items marked [NUMBER NEEDED] are placeholders.
// Replace them with real figures, or delete the phrase entirely. Do not
// publish a guess. Search this file for "[NUMBER NEEDED]" to find them all.
// ─────────────────────────────────────────────────────────────────────────

export const cv = {
  name: 'Aditya Vignesh Ram G K',
  title: 'Senior IT/OT Security Manager',
  subtitle: 'IEC 62443 & NIST 800-82 Specialist',
  tagline: 'Securing Critical Infrastructure Across the Middle East',
  contact: {
    phone: '+971568804898',
    email: 'adityavr90@gmail.com',
    location: 'Dubai, United Arab Emirates',
    linkedin: 'https://www.linkedin.com/in/adityavrgk/'
  },

  // Tightened: dropped "proven track record" (filler) and "grid resilience"
  // (off-message — your work is oil & gas and aviation, not power).
  summary:
    'IT/OT cybersecurity program lead with 10+ years at Big 4 firms (KPMG, PwC) securing large-scale ' +
    'Industrial Control Systems across the Gulf. I direct multimillion-dollar security programs and ' +
    'risk assessments spanning 60+ critical infrastructure sites in the UAE and KSA, translating ' +
    'IEC 62443 and NIST 800-82 into regional regulatory context (UAE IA, NCA ECC) and board-level decisions.',

  // Third stat was "2 Big 4 Firms" — number of employers isn't an achievement.
  // Replaced with standards coverage, which is verifiable from skills.standards below.
  stats: [
    { value: 10, suffix: '+', label: 'Years Experience' },
    { value: 60, suffix: '+', label: 'Sites Assessed' },
    { value: 10, suffix: '+', label: 'Standards Applied' }
  ],

  experience: [
    {
      title: 'IT/OT Cyber Security Manager',
      company: 'KPMG Lower Gulf',
      location: 'Dubai, UAE',
      period: 'Sep 2022 — Present',
      highlights: [
        // Merged the two duplicate PMO/portfolio bullets from the PDF into one.
        'Ran the PMO for a multimillion-dollar OT security portfolio — 10+ staff, budget and vendor delivery, 100% on-time completion',
        'Directed OT security assessments across 60+ sites for the UAE\'s largest oil & gas operator, using a purpose-built Unified Control Framework',
        'Led IT/OT assessment and transformation roadmap for a major UAE air navigation entity, covering critical airport ecosystem systems',
        // [NUMBER NEEDED] How many findings? What share was remediated, over what period?
        'Surfaced critical OT vulnerabilities and built remediation roadmaps against NIST CSF and IEC 62443',
        'Delivered executive risk reporting and security KPI dashboards that informed board-level investment decisions',
        'Drove ISO 27001 audit readiness from gap assessment through to sustained compliance'
      ]
    },
    {
      title: 'Cyber Security Manager',
      company: 'PwC Middle East',
      location: 'Dubai, UAE',
      period: 'Sep 2015 — Sep 2022',

      // Your PDF says you progressed Associate → Manager, but the header showed
      // one title for 7 years, which reads as stagnation. This surfaces it.
      //
      // Better still: fill in the `roles` array below with your real promotion
      // dates and the site will render the full ladder instead. Uncomment and
      // correct the dates — I've left them blank rather than guess.
      //
      // roles: [
      //   { title: 'Manager',                   period: 'Mon YYYY — Sep 2022' },
      //   { title: 'Senior Consultant',         period: 'Mon YYYY — Mon YYYY' },
      //   { title: 'Consultant',                period: 'Mon YYYY — Mon YYYY' },
      //   { title: 'Associate',                 period: 'Sep 2015 — Mon YYYY' }
      // ],
      progression: 'Progressed from Associate to Manager',

      highlights: [
        'Led OT security assessments for a leading chemical manufacturer, building technical checklists and automated configuration review scripts',
        'Delivered risk-based IT and OT audits across government, financial services, and manufacturing clients',
        'Built cybersecurity strategies and enterprise security architectures for government agencies against ISO 27001, NIST CSF, NCA, and HCIS',
        'Ran standards-based assessments for compliance with NIST 800-82 and the NIS Directive',
        // [NUMBER NEEDED] Team size mentored? Anyone you promoted?
        'Presented audit findings to senior leadership and mentored junior consultants'
      ]
    }
  ],

  education: [
    {
      degree: 'MSc in Information Security',
      institution: 'Royal Holloway, University of London',
      location: 'London, UK',
      period: '2013 — 2014',
      note: 'Distinction & First-Class Honours'
    },
    {
      degree: 'B.E. in Electronics & Communication Engineering',
      institution: 'Syed Ammal Engineering College, Anna University',
      location: 'Tamil Nadu, India',
      period: '2007 — 2011'
    }
  ],

  // Split into two tiers. Listing "Getting Started in OT/ICS Pen Testing" beside
  // CISM dragged the whole list down — vendor courses and webinars now sit in
  // their own block where they read as continuous learning instead of credentials.
  certifications: [
    { name: 'Certified Information Security Manager (CISM)', issuer: 'ISACA', date: 'Jun 2025', status: 'active' },
    { name: 'ISO 27001 Lead Implementer', issuer: 'BSI', date: 'Dec 2016', status: 'active' },
    { name: 'Certificate of Cloud Security Knowledge v4', issuer: 'Cloud Security Alliance', date: 'May 2022', status: 'active' },
    // Dropped the "v7" — that version retired long ago and the label dates you
    // harder than the year does. Consider removing this entirely: a 15-year-old
    // CEH adds little next to CISM at manager level.
    { name: 'Certified Ethical Hacker', issuer: 'EC-Council', date: '2011', status: 'active' },
    { name: 'ISA/IEC 62443 Cybersecurity Specialist', issuer: 'ISA', date: '', status: 'in-progress' },
    // Consider GICSP here instead of PMP — it's the credential the OT community
    // recognises, and it reinforces the specialist positioning you're leading with.
    { name: 'Project Management Professional (PMP)', issuer: 'PMI', date: 'Q1 2026', status: 'planned' }
  ],

  development: [
    { name: 'Nuclear Security Threats and Risks: Cyber Threats', issuer: 'IAEA', date: 'Sep 2025' },
    { name: 'Getting Started in OT/ICS Penetration Testing', issuer: '', date: 'Aug 2025' },
    { name: 'AI Security Governance', issuer: 'Securiti', date: 'Aug 2025' },
    { name: 'Maritime Cybersecurity Essentials', issuer: 'Northeast Maritime Institute', date: 'Aug 2023' },
    { name: 'G42 Cloud Certified Associate', issuer: 'G42', date: 'May 2021' },
    // This was in your PDF but missing from the site — the two had drifted apart.
    { name: 'Diploma in Cyber Law', issuer: 'Asian School of Cyber Laws', date: 'Jul 2012' }
  ],

  skills: {
    core: [
      'IT/OT Security Program Management',
      'OT & ICS Security Assessment',
      'GRC Strategy & Regulatory Compliance',
      'Cyber Program Design & Board Reporting',
      'Security Architecture Oversight',
      'Project Lifecycle Management',
      'Digital Transformation Delivery',
      'Team Leadership & Mentorship'
    ],
    standards: [
      'ISA/IEC 62443', 'ISO 27001', 'NIST 800-82', 'NIST CSF',
      'NIST 800-53', 'ISO 27002', 'NCA ECC', 'NCA OTCC', 'UAE IA', 'CAF'
    ],
    // Was one flat "Technical Tools" list mixing OT monitoring platforms with
    // pentest tooling and VirtualBox (not a security tool — removed). Split so
    // the OT platforms lead, since that's what your positioning rests on.
    otPlatforms: ['Nozomi Networks', 'Claroty', 'Tenable/Nessus'],
    assessment: ['Wireshark', 'nmap', 'Kali Linux', 'Burp Suite', 'BloodHound']
  },

  // Empty sections now hide themselves rather than rendering "coming soon",
  // which reads as an unfinished site. Add entries here and they reappear
  // automatically, nav link included.
  projects: [
    // { title, description, tags: [], link }
  ],
  blog: [
    // { title, date, category, readTime, excerpt, link }
  ]
};
