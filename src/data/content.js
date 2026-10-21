// All portfolio content in one place so the layout components stay
// presentational and the copy can be edited without touching markup.

export const profile = {
  name: "Anas Khan",
  role: "Backend / Full-Stack Developer",
  location: "India",
  email: "anaskhan.cs01@gmail.com",
  resume: "/Anas-Resume.pdf",
  availability: "Open to backend & full-stack roles",
  // The masthead: one oversized line that fills the measure, per the hero
  // references. Characters listed in `outline` are stroked rather than
  // filled, so the portrait reads through them while the rest of the name
  // stays solid.
  //
  // The portrait's placement against the type lives in the `.masthead`
  // rules in index.css, where the type's own metrics are available.
  headline: ["Anas Khan"],
  outline: {
    "Anas Khan": [3, 5],
  },
  statement: ["builds systems", "that scale."],
  summary:
    "I design scalable APIs and microservice-based systems, then ship them with clean architecture, sensible observability, and code the next engineer can trust.",
  photo: {
    src: new URL("../assets/profile-circle.png", import.meta.url).href,
    alt: "Anas Khan, backend and full-stack developer",
    width: 560,
    height: 560,
  },
  // Full cutout on transparency — the masthead fuses the portrait with the
  // display type, so it needs the subject on alpha rather than a circle.
  cutout: {
    src: new URL("../assets/profile-cutout.png", import.meta.url).href,
    alt: "Anas Khan",
    width: 761,
    height: 827,
  },
  // A tighter head crop for the phone hero, where the portrait stands on
  // its own instead of dissolving into the wordmark. Same subject, cropped
  // to the head with a short fade at the neck.
  head: {
    src: new URL("../assets/profile-head.png", import.meta.url).href,
    alt: "Anas Khan",
    width: 569,
    height: 766,
  },
};

export const socials = [
  {
    label: "GitHub",
    href: "https://github.com/anasdotio",
    handle: "@anasdotio",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anaskhan12/",
    handle: "/in/anaskhan12",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/anas_thakur_841/",
    handle: "@anas_thakur_841",
  },
  {
    label: "Email",
    href: "mailto:anaskhan.cs01@gmail.com",
    handle: "anaskhan.cs01@gmail.com",
  },
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "process", label: "Process" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export const stats = [
  { value: "04", label: "Core domains" },
  { value: "02", label: "Products shipped" },
  { value: "20+", label: "Technologies" },
  { value: "B.Tech", label: "CSE, 2025" },
];

export const marqueeItems = [
  "Node.js",
  "Express",
  "React",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "Docker",
  "AWS",
  "GraphQL",
  "Prisma",
  "Python",
  "Nginx",
  "CI/CD",
  "Linux",
];

export const about = {
  eyebrow: "About / 01",
  statement: ["I don't just write code.", "I engineer outcomes."],
  body: [
    "I build scalable web applications and backend services that solve real business problems. With hands-on experience across Node.js, Express, MongoDB and AWS, I focus on secure, maintainable software while continuously improving performance and developer experience.",
    "Most of my work lives where the data model, the API contract and the deployment pipeline all have to agree with each other — which is exactly where clean architecture pays for itself.",
  ],
  principles: [
    {
      title: "Engineering with intent",
      text: "Great software isn't just working code — it's understanding the problem, choosing the right boundaries, and writing code the next engineer can trust. I optimise for clarity and maintainability, not cleverness.",
    },
    {
      title: "Reliability is not a phase",
      text: "I think about failure from day one. Validation, error handling, indexing and caching are part of the feature, not an afterthought bolted on once the demo works.",
    },
    {
      title: "Full-lifecycle ownership",
      text: "From modelling the schema to building the API, wiring the container and pushing to production — I want to own the whole path so nothing gets lost in translation between layers.",
    },
    {
      title: "Always compounding",
      text: "Shipping a project teaches more than a tutorial does. I'm currently going deeper into system design, Docker and CI/CD so the systems I build can actually carry load.",
    },
  ],
  domains: [
    { icon: "Code2", label: "Backend", desc: "Node.js, Express, Python" },
    { icon: "Database", label: "Database", desc: "PostgreSQL, MongoDB, Redis" },
    { icon: "Zap", label: "APIs", desc: "REST, GraphQL, WebSocket" },
    { icon: "Globe", label: "DevOps", desc: "Docker, AWS, CI/CD" },
  ],
};

export const skillGroups = [
  {
    category: "Backend",
    eyebrow: "01 / Core",
    description: "Building reliable APIs and service-oriented systems.",
    icon: "Code2",
    items: ["Node.js", "Express", "Python", "REST APIs", "GraphQL"],
  },
  {
    category: "Database",
    eyebrow: "02 / Data",
    description: "Designing fast, resilient data and caching layers.",
    icon: "Database",
    items: ["MongoDB", "PostgreSQL", "Redis", "Prisma"],
  },
  {
    category: "DevOps",
    eyebrow: "03 / Ship",
    description: "Automating delivery and keeping systems observable.",
    icon: "Cloud",
    items: ["Docker", "AWS", "CI/CD", "Nginx"],
  },
  {
    category: "Tools",
    eyebrow: "04 / Flow",
    description: "A dependable toolkit for focused daily development.",
    icon: "Wrench",
    items: ["Git", "Linux", "VS Code", "Postman"],
  },
];

export const toolbelt = [
  "Node.js",
  "Express",
  "React",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "Prisma",
  "Docker",
  "AWS",
  "CI/CD",
  "Nginx",
  "GraphQL",
  "Python",
  "Git",
  "Linux",
  "Postman",
  "WebSocket",
  "JWT",
];

export const projects = [
  {
    number: "01",
    title: "AI Interview Report Generator",
    description:
      "An AI-powered interview report generator that analyses resumes against job descriptions to identify skill gaps, generate personalised interview questions, and build a 7-day adaptive preparation roadmap.",
    image: new URL("../assets/project2.jpg", import.meta.url).href,
    tech: ["Node.js", "MongoDB", "Express.js", "React.js"],
    github: "https://github.com/anasdotio/Ai-Interview-Report-Generator",
    status: "Featured",
  },
  {
    number: "02",
    title: "RAG AI Document Chatbox",
    description:
      "An intelligent document assistant that uses retrieval-augmented generation to search uploaded files and answer questions with grounded, conversational responses that cite their source.",
    tech: ["RAG", "LLM", "Node.js", "Vector Database"],
    status: "In progress",
  },
];

export const process = {
  eyebrow: "Process / 04",
  title: "How I build software",
  description:
    "A repeatable path from a vague requirement to something running in production.",
  steps: [
    {
      title: "Discover",
      text: "Understand the actual problem, the users, and the constraints before touching code.",
    },
    {
      title: "Design",
      text: "Model the data, define the API contracts, and decide where each boundary belongs.",
    },
    {
      title: "Build",
      text: "Implement in small, testable modules with validation and error handling in place.",
    },
    {
      title: "Ship",
      text: "Containerise, wire up CI/CD, and make the service observable in production.",
    },
    {
      title: "Iterate",
      text: "Measure what matters, fix the bottleneck, and keep the codebase honest over time.",
    },
  ],
};

export const journey = {
  education: [
    {
      title: "B.Tech in Computer Science & Engineering",
      year: "2023 — 2025",
      description:
        "Completed a Bachelor's degree in Computer Science & Engineering with a focus on backend systems and databases.",
    },
    {
      title: "Diploma in Computer Science & Engineering",
      year: "2021 — 2023",
      description: "Completed a Diploma in Computer Science & Engineering.",
    },
  ],
  experience: [
    {
      title: "Full-Stack Developer Intern",
      company: "Unlink Technology",
      location: "Sector 132, Noida, India",
      year: "Jun 2025 — Aug 2025",
      points: [
        "Collaborated with cross-functional teams to design and implement full-stack features, improving overall user experience across production web applications.",
        "Developed, tested, and maintained RESTful APIs using Node.js and Express.js to streamline data communication between frontend and backend services.",
        "Managed and optimized database operations in both MongoDB and SQL environments, strengthening data integrity and query performance in a live production setting.",
        "Contributed to the full software development lifecycle (SDLC) including code reviews, debugging, and deployment of production-ready features.",
      ],
    },
    {
      title: "Frontend Developer Intern",
      company: "Featherone",
      year: "Jul 2022 — Aug 2022",
      description:
        "Worked as a frontend developer intern, learning React.js and Tailwind CSS alongside a production team.",
    },
    {
      title: "Student Coordinator — Techfest",
      year: "2025",
      description:
        "Led a team of 20+ students to organise the annual techfest, managing technical events, workshops, and 300+ participants.",
    },
  ],
};
