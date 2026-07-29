/**
 * Derives the capability graph from the shared CV data.
 *
 * Everything here is generated from `cv` so the graph and the written
 * dossier can never drift apart. Edit shared/cv-data.js and both update.
 */

export const DOMAIN_COLORS = {
  ot:        { rgb: '0, 229, 255',  name: 'cyan'   },
  lead:      { rgb: '255, 176, 32', name: 'amber'  },
  grc:       { rgb: '167, 139, 250', name: 'violet' },
  assess:    { rgb: '52, 211, 153', name: 'green'  }
};

export function buildGraph(cv, { compact = false } = {}) {
  const nodes = [];
  const links = [];
  let uid = 0;

  const add = (n) => { n.id = uid++; nodes.push(n); return n; };
  const link = (a, b) => links.push({ a: a.id, b: b.id });

  // ── Root ──────────────────────────────────────────────────────
  const root = add({
    kind: 'root',
    label: 'AVR',
    domain: 'ot',
    r: 26,
    detail: {
      kicker: 'Operator',
      title: cv.name,
      body: cv.summary,
      list: cv.stats.map(s => `${s.value}${s.suffix} ${s.label}`)
    }
  });

  // ── Domains ───────────────────────────────────────────────────
  const trim = (arr, n) => (compact ? arr.slice(0, n) : arr);

  const domains = [
    {
      key: 'ot',
      label: 'OT & ICS SECURITY',
      body: 'Securing industrial control systems across oil & gas, aviation and chemical manufacturing. Assessment, segmentation and remediation from the field layer up.',
      leaves: trim([
        'IEC 62443', 'NIST 800-82', 'Purdue Model',
        ...(cv.skills.otPlatforms || []),
        'Site Assessment', 'OT Risk Modelling'
      ], 4)
    },
    {
      key: 'lead',
      label: 'PROGRAM LEADERSHIP',
      body: 'Running multimillion-dollar security portfolios end to end: PMO, budget, vendor delivery and the board reporting that keeps it funded.',
      leaves: trim([
        'PMO Delivery', 'Board Reporting', 'Budget & Resourcing',
        'Team Leadership', 'Transformation Roadmaps'
      ], 4)
    },
    {
      key: 'grc',
      label: 'STANDARDS & GRC',
      body: 'Translating global frameworks into Gulf regulatory context, and back again. The part most programs get wrong.',
      leaves: trim(cv.skills.standards || [], 5)
    },
    {
      key: 'assess',
      label: 'TECHNICAL ASSESSMENT',
      body: 'Hands-on assessment capability underneath the management layer. Configuration review, protocol analysis and controlled testing.',
      leaves: trim(cv.skills.assessment || [], 3)
    }
  ];

  domains.forEach((d) => {
    const dn = add({
      kind: 'domain',
      label: d.label,
      domain: d.key,
      r: 13,
      detail: {
        kicker: 'Domain',
        title: d.label,
        body: d.body,
        list: d.leaves
      }
    });
    link(root, dn);

    d.leaves.forEach((leaf) => {
      const ln = add({
        kind: 'leaf',
        label: leaf,
        domain: d.key,
        r: 5.5,
        detail: {
          kicker: d.label,
          title: leaf,
          body: '',
          list: []
        }
      });
      link(dn, ln);
    });
  });

  return { nodes, links };
}
