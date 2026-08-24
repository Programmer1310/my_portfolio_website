import React, { useEffect, useRef, useState } from "react";
import resumePdf from "../docs/amrutha_aug2026_resume.pdf";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Mail,
  Download,
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  Sparkles,
  Menu,
  X,
  Award,
  MapPin,
  Globe,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  THEME                                                             */
/* ------------------------------------------------------------------ */

const BG = "#0D0E12";

const ACCENT_MAP = {
  indigo: {
    text: "text-indigo-300",
    border: "hover:border-indigo-400/50",
    badge: "border-indigo-400/30 bg-indigo-400/10 text-indigo-200",
    dot: "bg-indigo-400",
    shadow: "0 0 50px -14px rgba(99,102,241,0.55)",
  },
  teal: {
    text: "text-teal-300",
    border: "hover:border-teal-400/50",
    badge: "border-teal-400/30 bg-teal-400/10 text-teal-200",
    dot: "bg-teal-400",
    shadow: "0 0 50px -14px rgba(20,184,166,0.55)",
  },
  rose: {
    text: "text-rose-300",
    border: "hover:border-rose-400/50",
    badge: "border-rose-400/30 bg-rose-400/10 text-rose-200",
    dot: "bg-rose-400",
    shadow: "0 0 50px -14px rgba(244,63,94,0.5)",
  },
  amber: {
    text: "text-amber-300",
    border: "hover:border-amber-400/50",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    dot: "bg-amber-400",
    shadow: "0 0 50px -14px rgba(251,191,36,0.5)",
  },
};

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Amrutha Shyam",
  subhead: "AI Engineer · MS Computer Science @ NYU Tandon",
  pitch:
    "Building intelligent systems at the intersection of deep learning, computer vision, and generative AI.",
  location: "New York",
  resumeUrl: resumePdf,
  //resumeUrl: "${import.meta.env.BASE_URL}amrutha_aug2026_resume.pdf",
  linkedin: "https://www.linkedin.com/in/amrutha-shyam-2893a6260", // Fixed: Added https://
  github: "https://github.com/Programmer1310",
  email: "mailto:as21083@nyu.edu",
};

const EDUCATION = [
  {
    school: "New York University, Tandon",
    degree: "M.S. in Computer Science",
    period: "Sep 2025 – May 2027 (expected)",
    accent: "indigo",
  },
  {
    school: "Vellore Institute of Technology (VIT), Chennai",
    degree: "B.Tech in CS, AI & ML specialization",
    period: "Sep 2021 – Apr 2025",
    accent: "teal",
  },
  {
    school: "Indian Institute of Technology, Madras",
    degree: "B.S. in Data Science & Programming (online)",
    period: "Sep 2021 – Apr 2025",
    accent: "rose",
  },
];

const SKILL_GROUPS = {
  "Machine Learning & AI": [
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "NLP",
    "Generative AI",
    "LLMs",
    "RAG",
    "Prompt Engineering",
    "GRU Sequence Modeling",
    "YOLO Object Detection",
    "Model Training & Evaluation",
  ],
  "Programming Languages": [
    "Python",
    "JavaScript",
    "Java",
    "C / C++",
    "C#",
    "SQL",
    "SQLite",
    "HTML",
    "CSS",
  ],
  "Libraries & Frameworks": [
    "PyTorch",
    "TensorFlow",
    "Scikit-learn",
    "OpenCV",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "Docker",
    "Git",
    "D3.js",
    "Spark",
    "Hadoop",
  ],
  "Data Science & Analytics": [
    "Predictive Modeling",
    "Quantitative Analysis",
    "Business Data Analysis",
    "Data Visualization",
    "Model Benchmarking",
    "Performance Metrics",
  ],
};

const SKILL_FILTERS = ["All", ...Object.keys(SKILL_GROUPS)];

const EXPERIENCE = [
  {
    company: "Cranium AI",
    role: "AI Engineering Intern",
    period: "Jun 2026 – Aug 2026",
    accent: "indigo",
    points: [
      "Architected 10+ public REST API endpoints in .NET 10/C#, incorporating cursor pagination to boost data access and streamline client integrations.",
      "Implemented granular enterprise RBAC features and automated database migrations, giving customers full permission control while closing security gaps.",
      "Authored an API Playbook and user documentation to accelerate onboarding, while adding xUnit regression guards to 1,700+ CI/CD tests to ensure zero-downtime releases.",
      "Streamlined engineering operations by scripting automated tools to resolve 3,000+ line API schema conflicts and co-authoring production hotfixes in Azure DevOps.",
    ],
  },
  {
    company: "TVS Credit",
    role: "Data Analytics Intern",
    period: "Aug 2023 – Oct 2023",
    accent: "teal",
    points: [
      "Led an independent ML-based customer micro-segmentation project, applying clustering algorithms to categorize 500,000 customers by financial behavior for targeted marketing.",
      "Collaborated with a team of data scientists to turn analysis into insights that guided senior management's customer-targeting decisions.",
      "Addressed data quality, feature engineering, and model performance issues to improve segmentation outcomes.",
    ],
  },
];

const PROJECT_FILTERS = [
  "All",
  "AI & Computer Vision",
  "LLM & Systems",
  "Data Science",
  "Software Engineering",
];

const PROJECTS = [
  {
    title: "LLM-Based AI Tutor Chatbot",
    period: "Nov 2025 – Dec 2025",
    category: "LLM & Systems",
    description:
      "AI tutor chatbot combining an LLM with a RAG pipeline and a knowledge graph built from course materials, with full speech-to-text and text-to-speech for voice and text-based learning.",
    metrics: ["RAG + Knowledge Graph", "Voice-enabled"],
    accent: "indigo",
  },
  {
    title: "YOLO Plant Disease Detection & Pesticide Recommendation",
    period: "Jan 2025 – Apr 2025",
    category: "AI & Computer Vision",
    description:
      "Benchmarked YOLOv5 and YOLOv8 on PlantSeg and PlantDoc, curating and augmenting 2,000 images and introducing Gaussian blur to boost detection accuracy.",
    metrics: ["0.864 mAP@50 (PlantSeg, v8)", "0.692 mAP@50 (PlantDoc, v8)"],
    accent: "teal",
  },
  {
    title: "GRU Tweet Authenticity Detection",
    period: "Sep 2024",
    category: "Data Science",
    description:
      "Real-time GRU-based model separating fake from authentic tweets, trained and evaluated across PolitiFact, GossipCop, and PHEME; co-authored into two conference papers.",
    metrics: ["96.25% accuracy", "3 datasets"],
    accent: "rose",
  },
  {
    title: "Improving the Billing Process at a Secondary Care Hospital",
    period: "May 2024 – Aug 2024",
    category: "Data Science",
    description:
      "Cleaned and analyzed 2,500 patient billing records from KSAS Health Center, surfacing five distinct error patterns and proposing fixes that improved billing accuracy and cut patient wait times.",
    metrics: ["2,500 records", "5 error patterns found"],
    accent: "amber",
  },
  {
    title: "Smart Medicine Box",
    period: "Jan 2024 – May 2024",
    category: "AI & Computer Vision",
    description:
      "IoT-enabled image classification system on a custom dataset, recognizing 20+ medicines and integrating reminders through a companion mobile app.",
    metrics: ["800+ images", "20+ medicines"],
    accent: "teal",
  },
  {
    title: "Amrutha Vani",
    period: "Apr 2023 – May 2023",
    category: "Software Engineering",
    description:
      "Full-stack music streaming application with user authentication, content playback, and listening analytics, built with HTML/CSS/JavaScript, Python, and SQLite.",
    metrics: ["Full-stack", "Auth + analytics"],
    accent: "indigo",
  },
];

const PUBLICATIONS = [
  {
    title:
      "Employing Gated Recurrent Units for the Identification of Fake and Authentic Tweets",
    venue: "ICRTAC '24 (publication in progress) and ICCCNT '25, IIT Indore",
  },
];

const CERTIFICATIONS = [
  {
    title: "Design Thinking: A Primer",
    org: "IIT Madras — NPTEL",
    detail: "Gold certificate, top 5% · 2021",
  },
  {
    title: "Innovation, Business Models, and Entrepreneurship",
    org: "IIT Madras — NPTEL",
    detail: "Top 5% · 2023",
  },
  {
    title: "Introduction to Internet of Things",
    org: "IIT Kharagpur — NPTEL",
    detail: "2024",
  },
];

/* ------------------------------------------------------------------ */
/*  AMBIENT ORB BACKGROUND                                            */
/* ------------------------------------------------------------------ */

function AmbientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute rounded-full bg-indigo-500"
        style={{ top: "-8rem", left: "8%", height: 420, width: 420, filter: "blur(120px)" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.28, scale: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
        className="absolute rounded-full bg-teal-400"
        style={{ top: "6rem", right: "6%", height: 380, width: 380, filter: "blur(130px)" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
        className="absolute rounded-full bg-rose-400"
        style={{ bottom: 0, left: "33%", height: 340, width: 340, filter: "blur(130px)" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SHARED BITS                                                       */
/* ------------------------------------------------------------------ */

function GlassCard({ children, className = "", accent = "indigo" }) {
  const a = ACCENT_MAP[accent];
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: a.shadow }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-300 ${a.border} ${className}`}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, sub }) {
  const words = title.split(" ");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12"
    >
      <p
        className="mb-3 text-xs font-medium uppercase text-teal-300/80"
        style={{ letterSpacing: "0.3em" }}
      >
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {words.map((w, i) =>
          i === words.length - 1 ? (
            <span
              key={i}
              className="bg-gradient-to-r from-indigo-300 via-violet-300 to-teal-300 bg-clip-text text-transparent"
            >
              {w}
            </span>
          ) : (
            <span key={i}>{w} </span>
          )
        )}
      </h2>
      {sub && <p className="mt-3 max-w-xl text-sm text-white/50">{sub}</p>}
    </motion.div>
  );
}

function FilterTabs({ options, active, onChange, layoutId }) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {options.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`relative rounded-full px-4 py-2 text-xs font-medium transition-colors ${
            active === f ? "text-white" : "text-white/60 hover:text-white"
          }`}
          style={active === f ? { color: BG } : undefined}
        >
          {active === f && (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 rounded-full bg-white"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{f}</span>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NAV                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "beyond", label: "Beyond Code" },
  { id: "contact", label: "Contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled ? "border-white/10 backdrop-blur-lg" : "border-transparent"
      }`}
      style={{ backgroundColor: scrolled ? "rgba(13,14,18,0.7)" : "transparent" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <button
          onClick={() => scrollTo("hero")}
          className="text-sm font-semibold tracking-wide text-white"
        >
          Amrutha Shyam
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          className="text-white/70 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 md:hidden"
            style={{ backgroundColor: BG }}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="py-2 text-left text-sm text-white/70 hover:text-white"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                              */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ backgroundColor: BG }}
    >
      <AmbientOrbs />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `linear-gradient(to bottom, transparent, transparent, ${BG})` }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-5xl px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60 backdrop-blur-md">
            <Sparkles size={13} className="text-teal-300" />
            Available for opportunities
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
            <MapPin size={13} /> {PROFILE.location}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl"
        >
          {PROFILE.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-4 text-lg text-white/60 sm:text-xl"
        >
          {PROFILE.subhead}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/45"
        >
          {PROFILE.pitch}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            onClick={() => scrollTo("projects")}
            className="group flex items-center gap-1.5 rounded-full bg-white px-5 py-3 text-sm font-medium"
            style={{ color: BG }}
          >
            Explore projects
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
          <button
            onClick={() => scrollTo("experience")}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
          >
            View experience
          </button>
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
          >
            <Download size={15} /> Resume
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
          >
            LinkedIn
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  EDUCATION                                                         */
/* ------------------------------------------------------------------ */

function Education() {
  return (
    <section id="education" className="relative px-6 py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Academics" title="Qualifications" />
        <div className="grid gap-5 sm:grid-cols-3">
          {EDUCATION.map((e, i) => (
            <motion.div
              key={e.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full"
            >
              <GlassCard accent={e.accent}>
                <div>
                  <GraduationCap size={20} className={ACCENT_MAP[e.accent].text} />
                  <h3 className="mt-4 text-base font-semibold text-white">{e.school}</h3>
                  <p className="mt-1 text-sm text-white/50">{e.degree}</p>
                </div>
                <p className="mt-6 text-xs uppercase tracking-widest text-white/35">{e.period}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SKILLS                                                            */
/* ------------------------------------------------------------------ */

const SKILL_ACCENTS = ["indigo", "teal", "amber", "rose"];

function Skills() {
  const [filter, setFilter] = useState("All");

  const visibleGroups =
    filter === "All" ? Object.entries(SKILL_GROUPS) : [[filter, SKILL_GROUPS[filter]]];

  return (
    <section id="skills" className="relative px-6 py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Stack" title="Technical toolkit" />

        <FilterTabs
          options={SKILL_FILTERS}
          active={filter}
          onChange={setFilter}
          layoutId="skill-pill"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleGroups.map(([group, items], gi) => {
              const groupIndex = Object.keys(SKILL_GROUPS).indexOf(group);
              const accent = SKILL_ACCENTS[groupIndex % SKILL_ACCENTS.length];
              return (
                <motion.div
                  key={group}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <GlassCard accent={accent}>
                    <div>
                      <h3 className="mb-4 text-sm font-semibold text-white/80">{group}</h3>
                      <div className="flex flex-wrap gap-2">
                        {items.map((s) => (
                          <motion.span
                            key={s}
                            whileHover={{ scale: 1.05 }}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 backdrop-blur-md transition-colors hover:border-white/25 hover:text-white"
                          >
                            {s}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  EXPERIENCE                                                        */
/* ------------------------------------------------------------------ */

function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Track record" title="Experience" />
        <div className="relative border-l border-white/10 pl-8">
          {EXPERIENCE.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative mb-6 last:mb-0"
            >
              <span
                className={`absolute top-7 h-3 w-3 rounded-full ${ACCENT_MAP[job.accent].dot}`}
                style={{ left: -38 }}
              />
              <GlassCard accent={job.accent}>
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ${ACCENT_MAP[job.accent].text}`}>
                        <Briefcase size={16} />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-white">{job.company}</h3>
                        <p className="text-sm text-white/50">{job.role}</p>
                      </div>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-white/35">
                      {job.period}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-white/55">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                          */
/* ------------------------------------------------------------------ */

function ProjectCard({ project }) {
  const a = ACCENT_MAP[project.accent];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <GlassCard accent={project.accent}>
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold text-white">{project.title}</h3>
            <span className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium uppercase tracking-wider ${a.badge}`}>
              {project.category}
            </span>
          </div>
          <p className="mt-1 text-xs uppercase tracking-widest text-white/30">{project.period}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/55">{project.description}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.metrics.map((m) => (
            <span
              key={m}
              className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70"
            >
              {m}
            </span>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative px-6 py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Selected work"
          title="Featured projects"
          sub="Filter by discipline to explore specific work."
        />

        <FilterTabs
          options={PROJECT_FILTERS}
          active={filter}
          onChange={setFilter}
          layoutId="project-pill"
        />

        <motion.div layout className="grid gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PUBLICATIONS & CERTIFICATIONS                                     */
/* ------------------------------------------------------------------ */

function PublicationsHonors() {
  return (
    <section className="relative px-6 py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Research" title="Publications & certifications" />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="h-full">
            <GlassCard accent="indigo">
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/50">
                  Conference paper
                </h3>
                {PUBLICATIONS.map((pub) => (
                  <div key={pub.title}>
                    <p className="text-sm leading-relaxed text-white">{pub.title}</p>
                    <p className="mt-2 text-xs text-indigo-300">{pub.venue}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
          <div className="h-full">
            <GlassCard accent="teal">
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/50">
                  Certifications
                </h3>
                <ul className="space-y-4">
                  {CERTIFICATIONS.map((c) => (
                    <li key={c.title} className="flex gap-2 text-sm text-white/70">
                      <Award size={15} className="mt-0.5 shrink-0 text-teal-300" />
                      <span>
                        <span className="text-white">{c.title}</span>
                        <span className="block text-xs text-white/40">
                          {c.org} · {c.detail}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BEYOND CODE                                                       */
/* ------------------------------------------------------------------ */

function BeyondCode() {
  return (
    <section id="beyond" className="relative px-6 py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Beyond code" title="Creative & cultural leadership" />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="h-full">
            <GlassCard accent="rose">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-400/10 text-rose-300">
                  <Sparkles size={20} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Classical dance & performance
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  Secretary of NYU Laya, the university's classical dance club. Completed the
                  Bharatanatyam Arangetram with a Certificate of Merit, and performed "Thadadhagai"
                  at the Chennai Cultural Season and the Madurai Meenakshi Temple. Previously
                  represented VIT in inter-college dance contests and choreographed for Team Lasya,
                  VIT's dance club.
                </p>
              </div>
            </GlassCard>
          </div>
          <div className="h-full">
            <GlassCard accent="amber">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300">
                  <Award size={20} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Technical community leadership
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  Organized IoT club activities and stalls at VIT's annual fest, Vibrance, and
                  took part in related workshops and sessions from 2022 to 2024.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT / FOOTER                                                  */
/* ------------------------------------------------------------------ */

function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28" style={{ backgroundColor: BG }}>
      <AmbientOrbs />
      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="mb-3 text-xs font-medium uppercase text-teal-300/80"
            style={{ letterSpacing: "0.3em" }}
          >
            Let's talk
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Building something in{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-teal-300 bg-clip-text text-transparent">
              AI or CV?
            </span>
          </h2>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <motion.a
              whileHover={{ scale: 1.04 }}
              href={PROFILE.email}
              className="flex items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-medium"
              style={{ color: BG }}
            >
              <Mail size={15} /> Email me
            </motion.a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 backdrop-blur-md hover:border-white/30 hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 backdrop-blur-md hover:border-white/30 hover:text-white"
            >
              <Globe size={15} /> GitHub
            </a>
          </div>
        </motion.div>
      </div>

      <footer className="relative mt-24 border-t border-white/10 pt-8 text-center text-xs text-white/30">
        © {new Date().getFullYear()} {PROFILE.name} — built with React, Tailwind & Framer Motion
      </footer>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ROOT                                                              */
/* ------------------------------------------------------------------ */

export default function PortfolioEditorial() {
  return (
    <div
      className="min-h-screen font-sans text-white selection:bg-indigo-400/30"
      style={{ backgroundColor: BG }}
    >
      <Nav />
      <Hero />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <PublicationsHonors />
      <BeyondCode />
      <Contact />
    </div>
  );
}