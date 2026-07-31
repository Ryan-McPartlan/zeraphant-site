export type ResumeBullet =
  | string
  | {
      kind: "link";
      before: string;
      href: string;
      label: string;
      after?: string;
    };

export type ResumeRole = {
  title: string;
  dates: string;
  bullets: ResumeBullet[];
};

export type ResumeEmployer = {
  name: string;
  location: string;
  roles: ResumeRole[];
};

export type ResumeEducation = {
  school: string;
  location: string;
  degree: string;
  dates: string;
  bullets: ResumeBullet[];
};

export type ResumeLeadershipItem =
  | { kind: "text"; text: string }
  | {
      kind: "link";
      before: string;
      href: string;
      label: string;
      after?: string;
    };

export const resume = {
  name: "Ryan McPartlan",
  contact: {
    city: "Yonkers, NY, 10701",
    email: "ryanmcp45@gmail.com",
    phone: "(914) 426-7358",
  },
  experience: [
    {
      name: "Enlighten Clinical Solutions",
      location: "Remote",
      roles: [
        {
          title: "CTO, Cofounder",
          dates: "2025 – Present",
          bullets: [
            "Created an Electronic Data Capture system for Clinical Trials.",
            "Designed the system to be extremely user friendly, requiring 3 clicks to achieve all major workflows.",
            "Utilized prefetching, database readmodels, and other techniques to achieve near-instant load times sitewide for millions of pieces of data.",
            "Fulfilled the highest compliance requirements for medical work, conforming to GDPR, HIPAA, SOC2.",
            "100% client satisfaction rate. Our clients have consistently recommended us and used us for future projects.",
            "Operated 24/7 engineering support.",
          ],
        },
      ],
    },
    {
      name: "Digital Ground Game",
      location: "Remote",
      roles: [
        {
          title: "Co-founder, Partnerships Director",
          dates: "2025 – Present",
          bullets: [
            "Co-founded Digital Ground Game, an organization dedicated to mobilizing New Media audiences.",
            "Connected with guests including Adam Mockler, Tim Miller, and a dozen other figures onto a fundraiser stream raising 260k.",
            "Assisted in coordinating our attendance at Libcon, where 40 New Media members and dozens of creators connected with Institutional Democrats like Ezra Klein and Anne Applebaum.",
            "Created and manage the organization Rolodex of 400 contacts.",
          ],
        },
      ],
    },
    {
      name: "Progressive Victory",
      location: "Pennsylvania",
      roles: [
        {
          title: "Pennsylvania Canvassing Director",
          dates: "2024",
          bullets: [
            "Led a team of 8 canvassers to knock 80k doors in the Pennsylvania area.",
            "Knocked 10k doors personally.",
            "Ranked #3 most persuasive across 70 canvassers.",
            "Hosted weekly canvassing events, and scaled these events to 6 other states PV was canvassing — resulting in 20k doorknocks and significant volunteer activation.",
            "Hosted a national event successfully after having our budget cut from $20k to $0, gathering over 100 canvassers with John Kerry as a speaker.",
          ],
        },
      ],
    },
    {
      name: "Google",
      location: "NYC, New York",
      roles: [
        {
          title: "Software Engineer, L4",
          dates: "Nov 2022 – Mar 2024",
          bullets: [
            "Quit Google quickly due to fundamental incompatibilities.",
            {
              kind: "link",
              before: "See my ",
              label: "blog post",
              href: "https://medium.com/@ryanmcpartlan/failing-loudly-84d6721689e6",
              after: " on the experience.",
            },
          ],
        },
      ],
    },
    {
      name: "Autonico",
      location: "NYC, New York",
      roles: [
        {
          title: "Founder",
          dates: "Mar 2023 – Jul 2023",
          bullets: [
            "Created Autonico.",
            "Built a product which aggregated real estate data onto standard forms, instantly completing a 10 hour workflow.",
            "Targeted a market of millions of real estate professionals who complete this workflow manually multiple times a month.",
            "Pivoted away after failing to sell.",
          ],
        },
      ],
    },
    {
      name: "Correlation One",
      location: "NYC, New York",
      roles: [
        {
          title: "Tech Lead – Training",
          dates: "Jan 2021 – Aug 2022",
          bullets: [
            "Led design of hundreds of changes to our Django API, postgres schema, and GCP/k8s infrastructure.",
            "Ensured engineering was never our limiting factor as we grew from 2m revenue to ~30m expected revenue.",
            "Audited cloud resource costs across all products, reducing costs by over 100k / year.",
            "Led numerous org-wide policy changes: Credential management, document management, GDPR compliance, phishing, cross-department communication pipeline, code standardization.",
            "Demanded a strong business case for all feature requests, ensuring my team's work was always high-value.",
            "Led design for all back-end technology including API, Schema, and Infrastructure changes.",
            "Coordinated bi-weekly releases of 5 major components of Training.",
            "Represented, advocated for, and mentored 5 engineers. Empowered my team to explore subjects they were interested in whenever possible, increasing their autonomy, morale, and overall output.",
            "Maintained strong interpersonal relationships within my team and among members of other departments, leading to high trust, excellent communication, and a positive environment across the organization.",
          ],
        },
        {
          title: "Tech Lead – Terminal",
          dates: "Jan 2020 – Dec 2020",
          bullets: [
            "Led development of hundreds of features on Terminal, a game-based coding competition.",
            "Audited cloud resource costs, reducing cost to run Terminal by over 30k / year.",
            "Mirrored Terminal infrastructure from GCP onto Azure to host competitions in China.",
            'Blocked low-leverage features and guided Terminal into "maintenance mode" when it was clear that we did not intend to scale, recovering thousands of engineering hours without any lost revenue.',
          ],
        },
        {
          title: "Software Engineer – Terminal",
          dates: "May 2018 – Dec 2019",
          bullets: [
            "Researched cutting-edge papers to create custom pathfinding algorithm to take advantage of unique constraints in our game. Resulted in 3 orders of magnitude improvement over simple A*.",
            "Designed and implemented a unique custom matchmaking rating system for our game based on Glicko2, dramatically increasing matchmaking quality and user contentment.",
            "Assisted in setting up sandboxed environments on k8s where user-submitted code could be executed securely.",
            "Worked to increase the consistency of our task queue system, making adjustments which cumulatively reduced unexpected task fail rate from ~1/10000 to zero after nearly a billion tasks.",
            "Optimized ORM queries throughout the code, increasing speed of various requests by orders of magnitude.",
          ],
        },
      ],
    },
  ] satisfies ResumeEmployer[],
  education: {
    school: "Manhattan College",
    location: "NYC, New York",
    degree: "BS Computer Science",
    dates: "2014-2018",
    bullets: [
      "Member of the Alumni Board, advising on curriculum improvements based on real career experience.",
      "Led 2 guest lectures on engineering process. Multiple students stayed hours afterwards for open discussion.",
      "4 time consecutive winner of the Manhattan college programming challenge.",
      "Set the all-time school record score for the Computer Science Final Exam score, which has yet to be beaten.",
    ],
  } satisfies ResumeEducation,
  leadership: [
    {
      kind: "text",
      text: "Assistant scoutmaster and former life scout in the Boy Scouts of America.",
    },
    {
      kind: "link",
      before:
        'Was invited to consult on the matchmaking system for "Dead by Daylight" after creating a video analyzing their matchmaking system – ',
      label: "https://www.youtube.com/watch?v=2B2tjQcSlNw",
      href: "https://www.youtube.com/watch?v=2B2tjQcSlNw",
    },
    {
      kind: "link",
      before: "Hobbyist Unity Game developer – ",
      label: "https://skelly1324.itch.io",
      href: "https://skelly1324.itch.io",
    },
    {
      kind: "link",
      before: "Open source: Identified a critical oversight in is-thirteen – ",
      label: "https://github.com/jezen/is-thirteen/issues/722",
      href: "https://github.com/jezen/is-thirteen/issues/722",
    },
  ] as ResumeLeadershipItem[],
  skills: [
    {
      label: "Backend",
      items:
        "Python, Django Web Framework, API Design, Schema design, DB normalization, SQL, Postgres, Jupyter",
    },
    {
      label: "DevOps",
      items: "GCP, Kubernetes, Appengine, Docker, CircleCI, Azure",
    },
    {
      label: "Interpersonal",
      items:
        "Empathetic, Positive, Constructive. Strong engineering philosophy. Passionate.",
    },
  ],
} as const;
