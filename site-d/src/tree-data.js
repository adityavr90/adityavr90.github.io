/**
 * ═══════════════════════════════════════════════════════════════════
 * THE CONSTELLATION
 * ═══════════════════════════════════════════════════════════════════
 *
 * Seven branches radiate from a central origin. Each node sits at a
 * (branch angle + offset, tier radius) polar coordinate, hand-laid like
 * a real skill tree rather than force-simulated, so the shape is stable
 * and deliberate. People navigate it by remembering where things are.
 *
 * ── EDITING GUIDE ──────────────────────────────────────────────────
 *
 *   kind:   'minor'    small dot, a skill or tool
 *           'notable'  larger ring, something you're known for
 *           'keystone' diamond, a defining capability (one per branch)
 *
 *   state:  'allocated' lit up, you have this
 *           'progress'  pulsing, actively working on it
 *           'locked'    dim dashed, on the roadmap, not yet
 *
 *   tier:   1 = closest to centre, 4 = outer edge
 *   off:    angular nudge within the branch sector, roughly -1 to 1.
 *           Two nodes in the same branch AND tier must not share an off.
 *
 * Add, edit or delete nodes freely. Edges are derived at runtime by
 * linking each node to its nearest neighbour one tier inward, so the tree
 * re-wires itself and nothing needs hand-maintaining.
 * ═══════════════════════════════════════════════════════════════════
 */

// Seven branches, evenly spaced at 360/7 ≈ 51.43° starting from straight up.
export const BRANCHES = {
  control: {
    label: 'CONTROL',
    tagline: 'Industrial systems and the things that break them',
    angle: -90,
    rgb: '0, 229, 255'          // cyan
  },
  assess: {
    label: 'ASSESS',
    tagline: 'Finding the holes, across every kind of estate',
    angle: -38.6,
    rgb: '52, 211, 153'         // emerald
  },
  govern: {
    label: 'GOVERN',
    tagline: 'Frameworks, standards, and making auditors happy',
    angle: 12.9,
    rgb: '167, 139, 250'        // violet
  },
  lead: {
    label: 'LEAD',
    tagline: 'Programmes, budgets, and the people who deliver them',
    angle: 64.3,
    rgb: '255, 176, 32'         // amber
  },
  build: {
    label: 'BUILD',
    tagline: 'Things I made because I wanted to see if I could',
    angle: 115.7,
    rgb: '163, 230, 53'         // lime
  },
  teach: {
    label: 'TEACH',
    tagline: 'Fifty-plus workshops before I ever wrote a consulting report',
    angle: 167.1,
    rgb: '96, 165, 250'         // sky
  },
  offline: {
    label: 'OFFLINE',
    tagline: 'What I do when the laptop is shut',
    angle: 218.6,
    rgb: '244, 114, 182'        // rose
  }
};

export const ORIGIN = {
  label: 'ADITYA',
  blurb:
    "I secure the systems that keep lights on, planes moving and refineries running. " +
    "It started with hacking films in school, went through a few hundred students in Indian lecture halls, " +
    "and ended up here. Dubai-based, twelve years in, still finding it interesting.",
  meta: 'Origin point · Dubai, UAE'
};

export const NODES = [
  // ─── CONTROL ─────────────────────────────────────────────────────
  { branch: 'control', tier: 1, off: -0.35, kind: 'minor', state: 'allocated',
    label: 'Electronics Eng',
    blurb: 'Circuits and signals, four years in Tamil Nadu. At the time it felt like a detour away from security. It turned out to be the single most useful thing on my CV for OT work. I already spoke the language of the engineers I would spend a decade talking to.',
    meta: 'B.E. · Anna University' },

  { branch: 'control', tier: 1, off: 0.35, kind: 'minor', state: 'allocated',
    label: 'Protocol Analysis',
    blurb: 'Modbus, DNP3, OPC and friends. Protocols written when the network was assumed to be a locked room, now sitting on estates that are anything but.',
    meta: 'Wireshark · tcpdump' },

  { branch: 'control', tier: 2, off: -0.45, kind: 'notable', state: 'allocated',
    label: 'IEC 62443',
    blurb: 'The standard that actually understands industrial systems. Zones, conduits, security levels. I have spent more hours arguing about SL-T definitions than I would like to admit.',
    meta: 'Certification in progress' },

  { branch: 'control', tier: 2, off: 0.45, kind: 'minor', state: 'allocated',
    label: 'NIST 800-82',
    blurb: 'The other reference everyone reaches for. Strong on risk framing, lighter on engineering detail than 62443.',
    meta: 'Applied across 60+ sites' },

  { branch: 'control', tier: 3, off: -0.55, kind: 'minor', state: 'allocated',
    label: 'Purdue Model',
    blurb: 'The layered reference architecture every OT conversation eventually returns to. Levels 0 to 5, and the DMZ that everyone draws and almost nobody implements properly.',
    meta: 'L0 → L5' },

  { branch: 'control', tier: 3, off: 0, kind: 'minor', state: 'allocated',
    label: 'Nozomi · Claroty',
    blurb: 'Passive OT monitoring platforms. Deployed, tuned, and occasionally defended to sceptical plant managers who did not want another box on their network.',
    meta: 'Detection & asset discovery' },

  { branch: 'control', tier: 3, off: 0.55, kind: 'minor', state: 'progress',
    label: 'OT Pen Testing',
    blurb: 'Going deeper on offensive OT, safely. Testing a live plant is nothing like testing a web app. Crash a PLC and something physical stops moving. The safety constraints are the interesting part.',
    meta: 'Learning now' },

  { branch: 'control', tier: 4, off: 0, kind: 'keystone', state: 'allocated',
    label: '60+ SITES',
    blurb: 'Directed OT security assessments across more than sixty critical infrastructure sites for the largest oil and gas operator in the UAE, using a control framework we built for the job. Refineries, offshore platforms, terminals. The scale is the part I am proudest of.',
    meta: 'Keystone · UAE & KSA' },

  // ─── ASSESS ──────────────────────────────────────────────────────
  { branch: 'assess', tier: 1, off: 0, kind: 'minor', state: 'allocated',
    label: 'Ethical Hacking',
    blurb: 'Where the whole thing actually started. Network security modules during my undergrad turned into evenings spent working out how any of it could be broken.',
    meta: 'Undergrad onwards' },

  { branch: 'assess', tier: 2, off: -0.45, kind: 'notable', state: 'allocated',
    label: 'Penetration Testing',
    blurb: 'Red team work across enterprise environments during the PwC years. The discipline that keeps everything else honest. It is hard to write a confident risk rating for something you have never tried to break.',
    meta: 'Enterprise & network' },

  { branch: 'assess', tier: 2, off: 0.45, kind: 'minor', state: 'allocated',
    label: 'Network Assessment',
    blurb: 'Segmentation that exists on the diagram but not on the wire. Almost every estate I have looked at is flatter than its owners believe.',
    meta: 'Architecture review' },

  { branch: 'assess', tier: 3, off: -0.55, kind: 'minor', state: 'allocated',
    label: 'Cloud Audits',
    blurb: 'CCSK-certified and applied in anger. Cloud reintroduced every misconfiguration problem we had solved on-premise, with a faster deployment pipeline attached.',
    meta: 'CCSK · CSA' },

  { branch: 'assess', tier: 3, off: 0, kind: 'minor', state: 'allocated',
    label: 'DevSecOps Audits',
    blurb: 'Reviewing pipelines rather than the things they deploy. Where security either becomes automatic or becomes a ticket everybody ignores.',
    meta: 'Pipeline security' },

  { branch: 'assess', tier: 3, off: 0.55, kind: 'minor', state: 'allocated',
    label: 'Forensics',
    blurb: 'From the Royal Holloway MSc, and put to use during the case work in India. Reconstructing what happened from what got left behind.',
    meta: 'Investigation' },

  { branch: 'assess', tier: 4, off: 0, kind: 'keystone', state: 'allocated',
    label: 'FULL SPECTRUM',
    blurb: 'Pentesting, governance, strategy, cloud audits, DevSecOps, network assessment, OT, programme management. Breadth is unfashionable advice, but in OT it is the whole job: you are the only person in the room who has to understand the PLC, the firewall, the framework and the budget at the same time.',
    meta: 'Keystone · the actual advantage' },

  // ─── GOVERN ──────────────────────────────────────────────────────
  { branch: 'govern', tier: 1, off: 0, kind: 'minor', state: 'allocated',
    label: 'MSc Infosec',
    blurb: 'Royal Holloway, distinction. I went to solidify a skillset I had built by curiosity and teaching, and came out with the structural half: security management, cryptography, testing, forensics. Still the best professional decision I have made.',
    meta: 'Royal Holloway · 2014' },

  { branch: 'govern', tier: 2, off: -0.55, kind: 'notable', state: 'allocated',
    label: 'ISO 27001',
    blurb: 'Lead Implementer since 2016. I have taken organisations from "we should probably do this" through to sustained certification more times than I can count.',
    meta: 'Lead Implementer · BSI' },

  { branch: 'govern', tier: 2, off: 0, kind: 'minor', state: 'allocated',
    label: 'NIST CSF',
    blurb: 'The framework executives actually understand. Genuinely useful as a translation layer between engineering reality and board expectations.',
    meta: 'Identify → Recover' },

  { branch: 'govern', tier: 2, off: 0.55, kind: 'minor', state: 'allocated',
    label: 'Cryptography',
    blurb: 'Formally, from the MSc. Mostly useful now for knowing when a vendor is overstating what their encryption actually protects.',
    meta: 'Royal Holloway' },

  { branch: 'govern', tier: 3, off: -0.55, kind: 'minor', state: 'allocated',
    label: 'NCA ECC / OTCC',
    blurb: 'Saudi regulatory frameworks. Working across the Gulf means knowing where the global standards stop and the national ones take over.',
    meta: 'KSA' },

  { branch: 'govern', tier: 3, off: 0, kind: 'minor', state: 'allocated',
    label: 'UAE IA',
    blurb: 'The UAE Information Assurance standard. Same job as ECC, different jurisdiction, subtly different expectations.',
    meta: 'UAE' },

  { branch: 'govern', tier: 3, off: 0.55, kind: 'minor', state: 'allocated',
    label: 'CISM',
    blurb: 'ISACA certification, 2025. The management-side counterpart to the technical work.',
    meta: 'ISACA · 2025' },

  { branch: 'govern', tier: 4, off: 0, kind: 'keystone', state: 'allocated',
    label: 'UNIFIED FRAMEWORK',
    blurb: 'Built a custom Unified Control Framework to assess sixty-plus sites consistently. Off-the-shelf frameworks each covered part of what we needed and none covered all of it, so we merged them into something that actually fit the client.',
    meta: 'Keystone · built from scratch' },

  // ─── LEAD ────────────────────────────────────────────────────────
  { branch: 'lead', tier: 1, off: 0, kind: 'minor', state: 'allocated',
    label: 'Consulting',
    blurb: 'Seven years at PwC, associate up to manager. Learned how to walk into an unfamiliar organisation and be useful inside a week.',
    meta: 'PwC · 2015–2022' },

  { branch: 'lead', tier: 2, off: -0.45, kind: 'notable', state: 'allocated',
    label: 'PMO Delivery',
    blurb: 'Running a multimillion-dollar security portfolio end to end: budget, resourcing, vendors, delivery. Ten-plus staff, everything on time.',
    meta: 'KPMG · current' },

  { branch: 'lead', tier: 2, off: 0.45, kind: 'minor', state: 'allocated',
    label: 'Board Reporting',
    blurb: 'Translating "the PLC firmware is six years out of date" into something a board can make a funding decision about, without overstating it in either direction.',
    meta: 'Exec communication' },

  { branch: 'lead', tier: 3, off: -0.45, kind: 'minor', state: 'allocated',
    label: 'Cyber Strategy',
    blurb: 'Multi-year security strategies and target architectures for government agencies and financial institutions. The part where you decide what not to do.',
    meta: 'Strategy & architecture' },

  { branch: 'lead', tier: 3, off: 0.45, kind: 'minor', state: 'progress',
    label: 'PMP',
    blurb: 'Formalising the delivery side. Planned for early 2027.',
    meta: 'PMI · planned Q1 2027' },

  { branch: 'lead', tier: 4, off: 0, kind: 'keystone', state: 'allocated',
    label: 'RISK ASSESSMENT',
    blurb: 'Led the IT/OT assessment and transformation roadmap for a several clients in the GCC. Oil & Gas, Airport ecosystem systems, where the consequence of getting it wrong is not just a data breach.',
    meta: 'Keystone · Cyber Risks' },

  // ─── BUILD ───────────────────────────────────────────────────────
  { branch: 'build', tier: 1, off: 0, kind: 'minor', state: 'allocated',
    label: 'Scripting',
    blurb: 'Automated configuration review scripts for OT assessments. The difference between checking forty devices by hand and checking four hundred properly.',
    meta: 'Assessment tooling' },

  { branch: 'build', tier: 2, off: -0.45, kind: 'notable', state: 'allocated',
    label: 'Home Lab',
    blurb: 'NAS, VPN servers, an OPNsense virtual firewall doing genuine segmentation, and home automation on top. It started as somewhere to test ideas without breaking anything that matters. It is now where most of my projects actually get built.',
    meta: 'OPNsense · NAS · VPN · automation' },

  { branch: 'build', tier: 2, off: 0.45, kind: 'minor', state: 'allocated',
    label: 'Local LLM Stack',
    blurb: 'Ollama running models locally with a Hermes agent deployment on top. Running it on my own hardware means I can experiment with agent behaviour without sending anything anywhere.',
    meta: 'Ollama · Hermes agents' },

  { branch: 'build', tier: 3, off: -0.55, kind: 'minor', state: 'allocated',
    label: 'Assessment Tool',
    blurb: 'A lightweight offline assessment tool. Load any control library, work through it, map evidence as you go. Every piece of evidence is stored with a hash, so integrity is provable later, which matters when a finding is challenged six months after the fact.',
    meta: 'Offline · evidence hashing' },

  { branch: 'build', tier: 3, off: 0, kind: 'minor', state: 'allocated',
    label: 'Asset Inventory',
    blurb: 'Built for the reality of OT site visits: no connectivity, limited time, and a plant full of equipment nobody has catalogued. Offline, fast, captures photos, and ships with a decent database of OT systems to pick from instead of typing model numbers into a spreadsheet.',
    meta: 'Offline · built for site work' },

  { branch: 'build', tier: 3, off: 0.55, kind: 'minor', state: 'progress',
    label: 'Secure AI Agents',
    blurb: 'Current rabbit hole. How you build agents that can be trusted with real access, how you observe what they are actually doing, and how fine-tuning shifts the risk picture. AI observability is the part nobody has properly solved.',
    meta: 'Observability · agents · fine-tuning' },

  { branch: 'build', tier: 4, off: 0, kind: 'keystone', state: 'progress',
    label: 'RISK PLATFORM',
    blurb: 'The big one. A custom cyber risk assessment and monitoring platform built to work for everyone in the chain (board members who need a position, and the analysts doing the actual work) and to scale from a small business to an enterprise. Most tools in this space pick one audience and one company size. This does not.',
    meta: 'Keystone · in development' },

  // ─── TEACH ───────────────────────────────────────────────────────
  { branch: 'teach', tier: 1, off: 0, kind: 'minor', state: 'allocated',
    label: 'Hacker Films',
    blurb: 'The honest origin story. I watched the films in school, thought it looked like the most interesting thing a person could possibly do, and went looking for how it actually worked. Reality turned out to be less neon and more interesting.',
    meta: 'Where it started' },

  { branch: 'teach', tier: 2, off: -0.45, kind: 'notable', state: 'allocated',
    label: '50+ Workshops',
    blurb: 'Delivered more than fifty cybersecurity workshops across cities and colleges in India. Standing in front of a room of students who will ask anything is the fastest way to find out which parts of your own knowledge are solid and which are just vocabulary.',
    meta: 'India · cities & colleges' },

  { branch: 'teach', tier: 2, off: 0.45, kind: 'minor', state: 'allocated',
    label: 'Cyber Cell Training',
    blurb: 'Ran training sessions for the cyber cells in Noida and Uttarakhand. A very different room to a lecture hall. These were people who would be applying it that week, on real cases.',
    meta: 'Law enforcement' },

  { branch: 'teach', tier: 3, off: -0.45, kind: 'minor', state: 'allocated',
    label: 'Case Support',
    blurb: 'Helped work several live cyber cases during those years. The clearest reminder I have had that the technical detail eventually attaches to a person having a genuinely bad time.',
    meta: 'Investigative support' },

  { branch: 'teach', tier: 3, off: 0.45, kind: 'minor', state: 'allocated',
    label: 'Mentoring',
    blurb: 'The habit never left. Several people I brought in as juniors are now running their own engagements, which holds up better over time than anything else on this tree.',
    meta: 'Team development' },

  { branch: 'teach', tier: 4, off: 0, kind: 'keystone', state: 'allocated',
    label: 'TRAINER FIRST',
    blurb: 'Before consulting, before the MSc, I taught. Fifty-plus workshops, police cyber cells, live cases, all before I had written a single client report. It permanently shaped how I work: if you cannot explain a risk to someone who has never heard of it, you probably do not understand it well enough yourself.',
    meta: 'Keystone · India, pre-2013' },

  // ─── OFFLINE ─────────────────────────────────────────────────────
  { branch: 'offline', tier: 1, off: 0, kind: 'minor', state: 'allocated',
    label: 'Photography',
    blurb: 'The one hobby with no wires in it. A useful counterweight to a job spent looking at systems.',
    meta: 'Shooting' },

  { branch: 'offline', tier: 2, off: -0.45, kind: 'minor', state: 'allocated',
    label: '3D Printing',
    blurb: 'Design it, print it, find out what you got wrong, print it again. Enormously satisfying, and a standing reminder that iteration beats planning.',
    meta: 'Design → print → repeat' },

  { branch: 'offline', tier: 2, off: 0.45, kind: 'notable', state: 'allocated',
    label: 'Drones',
    blurb: 'Flying them, and rather more often repairing them. A crashed drone is an unusually direct feedback loop.',
    meta: 'Fly · crash · rebuild' },

  { branch: 'offline', tier: 3, off: 0, kind: 'minor', state: 'allocated',
    label: 'Soldering Iron',
    blurb: 'Phones, laptops, drones. If it broke, I would rather open it than replace it. Board-level work, swapping components, occasionally rescuing something everyone else had written off.',
    meta: 'Board-level repair' },

  { branch: 'offline', tier: 4, off: 0, kind: 'keystone', state: 'allocated',
    label: 'STILL FIXING THINGS',
    blurb: 'I trained as an electronics engineer, spent a decade moving up into programme management, and still spend weekends with a soldering iron pulling components off a board. The through-line is the same thing that makes OT security work: an interest in how physical systems actually behave, rather than how the documentation says they should.',
    meta: 'Keystone · the through-line' }
];
