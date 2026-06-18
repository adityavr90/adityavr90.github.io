// shared/cv-data.js
export const cv = {
  name: 'Aditya Vignesh Ram G K',
  title: 'Senior IT/OT Security Manager',
  subtitle: 'IEC 62443 & NIST 800-82 Specialist',
  tagline: 'Securing Critical Infrastructure Across the Middle East',
  contact: {
    phone: '+971568804898',
    email: 'adityavr90@gmail.com',
    location: 'Dubai, United Arab Emirates',
    linkedin: '' // add LinkedIn URL before launch
  },
  summary: 'IT/OT Cybersecurity Program Lead and OT Specialist with 10+ years of cross-functional experience at Big 4 firms (KPMG, PwC) specializing in securing large-scale Industrial Control Systems (ICS) and Operational Technology (OT). Proven track record directing multimillion-dollar security programs and risk assessments across 60+ critical infrastructure sites in the UAE/KSA.',
  stats: [
    { value: 10, suffix: '+', label: 'Years Experience' },
    { value: 60, suffix: '+', label: 'Sites Assessed' },
    { value: 2, suffix: '', label: 'Big 4 Firms' }
  ],
  experience: [
    {
      title: 'IT/OT Cyber Security Manager',
      company: 'KPMG Lower Gulf',
      location: 'Dubai, UAE',
      period: 'Sep 2022 — Present',
      highlights: [
        'Managed PMO for a multimillion-dollar cybersecurity portfolio with 10+ staff — 100% on-time delivery',
        'Directed OT cybersecurity assessments across 60+ sites for the largest oil & gas company in UAE using a custom Unified Control Framework',
        'Led high-stakes IT/OT assessment and transformation roadmap for a major UAE Air Navigation entity',
        'Identified critical OT vulnerabilities; delivered remediation plans aligned with NIST CSF and IEC 62443',
        'Led ISO 27001 audit readiness and tracked key security KPIs aligned with regulatory goals'
      ]
    },
    {
      title: 'Cyber Security Manager',
      company: 'PwC Middle East',
      location: 'Dubai, UAE',
      period: 'Sep 2015 — Sep 2022',
      highlights: [
        'Conducted comprehensive OT security assessments for a leading chemical manufacturer with custom automated configuration reviews',
        'Delivered risk-based cybersecurity audits across IT and OT for government, finance, and manufacturing sectors',
        'Crafted cybersecurity strategies and enterprise security architectures for government agencies aligned with ISO 27001, NIST CSF, NCA, HCIS',
        'Performed standards-based assessments ensuring compliance with NIST 800-82 and the NIS Directive',
        'Mentored junior staff and championed a culture of continuous learning'
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
  certifications: [
    { name: 'Certified Information Security Manager (CISM)', issuer: 'ISACA', date: 'Jun 2025', status: 'active' },
    { name: 'ISO 27001 Lead Implementer', issuer: 'BSI', date: 'Dec 2016', status: 'active' },
    { name: 'Certificate of Cloud Security Knowledge v4', issuer: 'Cloud Security Alliance', date: 'May 2022', status: 'active' },
    { name: 'Certified Ethical Hacker (CEH v7)', issuer: 'EC-Council', date: 'Sep 2011', status: 'active' },
    { name: 'G42 Cloud Certified Associate', issuer: 'G42', date: 'May 2021', status: 'active' },
    { name: 'Maritime Cybersecurity Essentials', issuer: 'Northeast Maritime Institute', date: 'Aug 2023', status: 'active' },
    { name: 'Getting Started in OT/ICS Penetration Testing', issuer: '', date: 'Aug 2025', status: 'active' },
    { name: 'Nuclear Security Threats and Risks: Cyber Threats', issuer: 'IAEA', date: 'Sep 2025', status: 'active' },
    { name: 'AI Security Governance', issuer: 'Securiti', date: 'Aug 2025', status: 'active' },
    { name: 'ISA/IEC 62443', issuer: 'ISA', date: '', status: 'in-progress' },
    { name: 'Project Management Professional (PMP)', issuer: 'PMI', date: 'Q1 2026', status: 'planned' }
  ],
  skills: {
    core: [
      'IT/OT Security Program Management',
      'Project Lifecycle Management',
      'GRC Strategy & Regulatory Compliance',
      'OT & ICS Security Assessment',
      'Cyber Program Design & Board Reporting',
      'Security Architecture Oversight',
      'Digital Transformation Delivery',
      'Team Leadership & Mentorship'
    ],
    standards: [
      'ISA/IEC 62443', 'ISO 27001', 'NIST 800-82', 'NIST CSF',
      'NIST 800-53', 'ISO 27002', 'NCA ECC', 'NCA OTCC', 'UAE IA', 'CAF'
    ],
    tools: [
      'Nessus', 'Nozomi', 'Claroty', 'Kali Linux',
      'Wireshark', 'VirtualBox', 'BloodHound', 'BurpSuite', 'nmap'
    ]
  },
  projects: [
    // Add before launch: { title, description, tags: [], link, impact: 'LOW'|'MEDIUM'|'HIGH' }
  ],
  blog: [
    // Add before launch: { title, date, category, readTime, excerpt, link }
  ]
};
