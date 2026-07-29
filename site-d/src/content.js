/**
 * All the prose lives here, so you can rewrite it without touching markup.
 *
 * Voice: warm and human. Talking to a peer, not a hiring panel. Short
 * sentences. If a line makes you wince reading it aloud, cut it.
 *
 * The story below is drafted from what you've told me. Read it as a first
 * draft in your voice, not gospel. The emotional beats are my reading of
 * the facts, and you should overwrite anything that isn't how it felt.
 */

export const STORY = {
  title: 'How I ended up here',
  paras: [
    "It started with hacker movies and books. I went looking for how it actually worked, and the real version turned out to be less neon and considerably more interesting.",

    "I studied electronics engineering, hit the network security modules, and started properly exploring ethical hacking. Then, slightly unusually, I taught before I ever consulted. Fifty-plus workshops across colleges in India, training for the police cyber cells in Noida and Uttarakhand, and a hand in a few live cases. Standing in front of a room that can ask you anything does something permanent to how you explain things.",

    "An MSc at Royal Holloway gave that a spine, and I went into Big 4 consulting: seven years at PwC across pentesting, governance, cloud and DevSecOps. A few years in, a chance came up to work on OT, and the electronics degree I had half-written-off as a detour became the most useful thing on my CV. Most security people find industrial environments alien. I already spoke that language.",

    "Now it is KPMG, running OT programmes: sixty-plus sites for a national oil and gas operator, an air navigation authority, chemical plants. The current thread is AI: how to use it, how to defend against it, how to build it into an enterprise without creating a new category of problem. That is what the home lab is for. I still want to build things, and I still spend weekends with a soldering iron."
  ]
};

export const BUILDS = {
  title: "Things I've built",
  intro:
    "Mostly born out of frustration on site. The tool I wanted did not exist, was priced for an enterprise, " +
    "or assumed an internet connection I did not have. So I built it.",
  items: [
    {
      name: 'Cyber risk assessment & monitoring platform',
      tags: ['AI', 'In development', 'Flagship'],
      body:
        "The big one. Most risk platforms pick an audience (either the board or the analysts) and pick a company size, " +
        "usually large. This is built to work across both. A CISO gets a defensible position, the person doing the actual " +
        "assessment gets a tool that does not fight them, and a fifty-person company can use it without an implementation project."
    },
    {
      name: 'Offline assessment tool',
      tags: ['Offline-first', 'Evidence integrity'],
      body:
        "Load any control library, work through the assessment, map evidence as you go. Every piece of evidence is stored " +
        "with a hash, so integrity is provable later. That matters more than it sounds: when a finding is challenged months " +
        "after the fact, being able to prove the screenshot is the one you took that day ends the argument."
    },
    {
      name: 'OT asset inventory tool',
      tags: ['Offline-first', 'OT site work'],
      body:
        "Built for the reality of an OT site visit: no connectivity, a tight window, and a plant full of equipment nobody has " +
        "ever properly catalogued. Lightweight, fully offline, captures photos alongside each asset, and ships with a solid " +
        "database of OT systems to select from rather than typing model numbers into a spreadsheet on your knee."
    },
    {
      name: 'The home lab',
      tags: ['NAS', 'OPNsense', 'Ollama', 'Automation'],
      body:
        "NAS, VPN servers, an OPNsense virtual firewall doing genuine segmentation, home automation, and a local LLM stack " +
        "running Ollama with Hermes agents on top. Started as somewhere to test ideas without breaking anything that matters. " +
        "It is now where most of the projects above actually get built."
    }
  ]
};

export const NOW = {
  title: "What I'm into right now",
  note: 'Current rabbit holes, honestly reported.',
  items: [
    {
      label: 'Secure AI agents',
      body:
        "How do you build an agent you can trust with real access? Running models locally means I can experiment with agent " +
        "behaviour without sending anything anywhere, which makes the interesting failure modes safe to look at directly.",
      state: 'progress'
    },
    {
      label: 'AI observability',
      body:
        "The part nobody has properly solved. We are deploying systems whose reasoning we cannot inspect into places where " +
        "we historically demanded audit trails for everything. That gap is going to matter.",
      state: 'progress'
    },
    {
      label: 'Fine-tuning',
      body: "Mostly to understand how much the risk picture shifts once you start altering a model rather than just prompting it.",
      state: 'progress'
    },
    {
      label: 'ISA/IEC 62443 certification',
      body: "Formalising the thing I already do daily. Working through the specialist track.",
      state: 'progress'
    },
    {
      label: 'OT/ICS penetration testing',
      body:
        "Going deeper on the offensive side. Testing a live plant is nothing like testing a web app. Get it wrong and " +
        "something physical stops moving. The safety constraints are the interesting part.",
      state: 'progress'
    },
    {
      label: 'Nuclear security',
      body:
        "Took the IAEA course on cyber threats to nuclear facilities. Sobering, and a useful reference point for how " +
        "seriously consequence-driven security can get.",
      state: 'done'
    }
  ]
};

export const OFFLINE = {
  title: 'Away from the laptop',
  intro: 'A pattern I only noticed after listing them: almost everything I do for fun involves taking something apart.',
  items: [
    {
      label: 'Photography',
      body: "The one hobby with no wires in it. A useful counterweight to a job spent staring at systems."
    },
    {
      label: '3D printing',
      body: "Design it, print it, discover what you got wrong, print it again. A good standing reminder that iteration beats planning."
    },
    {
      label: 'Drones',
      body: "Flying them, and rather more often repairing them. A crashed drone is an unusually direct feedback loop."
    },
    {
      label: 'Fixing my own electronics',
      body:
        "Phones, laptops, drones. If it broke, I would rather open it than replace it. Board-level work, swapping components, " +
        "occasionally rescuing something everyone else had written off. Fifteen years after the electronics degree, still the " +
        "most satisfying thing I do."
    }
  ]
};

export const HI = {
  title: 'Say hi',
  body:
    "Happy to talk about OT security, industrial systems, building tools, AI in security, or why your plant network is " +
    "flatter than you think. Consulting, advisory, speaking. I did fifty-odd workshops before I did any of this " +
    "professionally, so I am always up for teaching something.",
  outro: "I reply to everything that isn't a recruiter template."
};
