import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import asadullah from "./assets/Asadullah_Noor_Resume.pdf";
import logo from "./assets/iasync-logo.png"; // save the iAsync logo image here

// ─── THEME (taken from the iAsync logo) ──────────────────────────────────────
const T = {
  navy: "#0F2A52",
  blue: "#1B64B0",
  cyan: "#1FB5E8",
  ink: "#14233B",
  muted: "#5B6B7E",
  line: "#E3EBF3",
  soft: "#F4F8FC",
  white: "#FFFFFF",
};
const GRAD = `linear-gradient(135deg, ${T.navy} 0%, ${T.blue} 55%, ${T.cyan} 100%)`;
const HEAD = "'Sora', sans-serif";
const BODY = "'Inter', sans-serif";

// ─── BREAKPOINT HOOK ─────────────────────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: w < 768, isTablet: w < 1024 };
}

// ─── PAGE ROUTING (hash based: #/about, #/projects ...) ──────────────────────
const PAGES = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/contact", label: "Contact" },
];

function useRoute() {
  const read = () => {
    const p = (window.location.hash || "#/").replace("#", "") || "/";
    return PAGES.some((x) => x.path === p) ? p : "/";
  };
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const fn = () => { setRoute(read()); window.scrollTo({ top: 0 }); };
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  const go = (path) => { window.location.hash = path; };
  return [route, go];
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const FEATURED = {
  title: "TickFlo",
  subtitle: "Multi-tenant Ticket Management SaaS",
  desc: "Our flagship product. A scalable ticket and issue management platform that helps businesses run internal workflows efficiently, built on real-world multi-tenant backend architecture at CYRANIX LLC.",
  tech: ["Node.js", "Express", "MongoDB", "Swagger", "Postman"],
  live: "https://tickflo.com/home",
};

const PROJECTS = [
  { title: "Ramy Pet Hospital", subtitle: "Veterinary Practice System", desc: "Full-stack practice management system for a veterinary client: client and pet records, appointments, lab reports (CBC, LFT, RFT, Parasites) and printable documents.", tech: ["React", "Node.js", "Express", "MongoDB Atlas"], live: null, github: null },
  { title: "Ramy Pet Store", subtitle: "Pet Store", desc: "Online store for Ramy Pet's products.", tech: ["React", "Node.js", "MongoDB"], live: null, github: null },
  { title: "Yardzai", subtitle: "Yard Sale Marketplace", desc: "A MERN-based platform to buy and sell pre-owned items locally, with a GraphQL API and smooth location-based experience.", tech: ["MongoDB", "Express", "Node.js", "GraphQL"], live: "https://yardze-web-production.up.railway.app/", github: null },
  { title: "Servacy", subtitle: "Home Services App", desc: "A MERN and GraphQL application for booking home services with a clean UI and seamless booking flow.", tech: ["React", "Node.js", "MongoDB", "GraphQL"], live: "https://tap-to-door.vercel.app/", github: null },
  { title: "JHS", subtitle: "School Management System", desc: "Built from requirement gathering to full implementation, modernizing a school that ran on paperwork for 4–5 decades.", tech: ["React", "Tailwind CSS", "Redux", "Node.js", "MongoDB"], live: "https://jhs-git-main-asadullah-noors-projects.vercel.app/login", github: null },
  { title: "Smart Micro-CRM", subtitle: "Mobile CRM · BSSE Final Year Project", desc: "Mobile CRM for schools, gyms and barber shops covering members, scheduling, fee tracking, staff, attendance and reports, with WhatsApp notifications.", tech: ["React Native", "Node.js", "MongoDB Atlas"], live: null, github: null },
  { title: "iAsync Lead CRM", subtitle: "Internal Automation Toolkit", desc: "A multi-tab React CRM for managing outreach leads, paired with a Python lead-finder that combines Google Places data with website scraping.", tech: ["React", "Python", "Google Places API"], live: null, github: null },
  { title: "XhaffiXhop", subtitle: "E-commerce Store", desc: "A modern e-commerce prototype with clean UI, smooth product browsing and full cart functionality.", tech: ["React", "Tailwind CSS"], live: "https://xhafeexhop.vercel.app/", github: null },
  { title: "InvoZone", subtitle: "Corporate Landing Page", desc: "A responsive corporate landing page built with modern UI principles and pixel-perfect implementation.", tech: ["React", "Tailwind CSS"], live: null, github: "https://github.com/Asadullah-Noor/InvoZone" },
  { title: "Awfera LLM Platform", subtitle: "AI Learning Platform", desc: "An educational platform focused on Large Language Models with course content, user dashboards and modern UX.", tech: ["React", "Node.js", "Express", "MongoDB"], live: null, github: null },
];

const FOCUS = [
  { title: "Agentic AI", text: "AI agents that plan, use tools and complete multi-step work, built with Python, LangChain and LangGraph." },
  { title: "Machine Learning", text: "Practical ML in Python, from data handling to models that power real product features." },
  { title: "Integration & Automation", text: "Connecting systems and automating workflows so teams spend time on decisions, not repetition." },
];

const SKILLS = {
  "AI & ML": ["Python", "Agentic AI", "LangChain", "LangGraph", "Machine Learning"],
  "Full Stack": ["JavaScript", "React", "Node.js", "Express.js", "MongoDB", "GraphQL", "Tailwind CSS"],
  Tools: ["Git", "Postman", "Swagger", "Figma", "Material UI", "Shadcn UI", "Cursor AI"],
};

// ─── SHARED UI ───────────────────────────────────────────────────────────────
function Button({ children, onClick, href, variant = "primary", type = "button", disabled }) {
  const base = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 26px", borderRadius: 10, fontFamily: BODY, fontSize: 14, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", textDecoration: "none", border: "1px solid transparent", transition: "all .25s ease", opacity: disabled ? 0.7 : 1 };
  const styles = {
    primary: { ...base, background: GRAD, color: T.white, boxShadow: "0 8px 24px rgba(27,100,176,.25)" },
    outline: { ...base, background: T.white, color: T.navy, border: `1px solid ${T.line}` },
    light: { ...base, background: T.white, color: T.navy },
  }[variant];
  const props = { style: styles, onMouseEnter: (e) => !disabled && (e.currentTarget.style.transform = "translateY(-2px)"), onMouseLeave: (e) => (e.currentTarget.style.transform = "none") };
  if (href) return <a href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>;
  return <button type={type} onClick={onClick} disabled={disabled} {...props}>{children}</button>;
}

function Tag({ children }) {
  return <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 500, color: T.blue, background: "rgba(31,181,232,.09)", border: "1px solid rgba(31,181,232,.22)", padding: "5px 12px", borderRadius: 100 }}>{children}</span>;
}

function PageHeader({ eyebrow, title, text }) {
  const { isMobile } = useBreakpoint();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: isMobile ? 32 : 52 }}>
      <div style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, letterSpacing: 2, color: T.cyan, textTransform: "uppercase", marginBottom: 12 }}>{eyebrow}</div>
      <h1 style={{ fontFamily: HEAD, fontSize: isMobile ? 30 : 44, fontWeight: 700, color: T.navy, lineHeight: 1.15, letterSpacing: -1, marginBottom: 14 }}>{title}</h1>
      {text && <p style={{ fontFamily: BODY, fontSize: isMobile ? 16 : 18, color: T.muted, lineHeight: 1.7, maxWidth: 640 }}>{text}</p>}
    </motion.div>
  );
}

function Wrap({ children }) {
  const { isMobile, isTablet } = useBreakpoint();
  return <div style={{ maxWidth: 1120, margin: "0 auto", padding: isMobile ? "104px 20px 64px" : isTablet ? "120px 32px 80px" : "132px 48px 96px" }}>{children}</div>;
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ route, go }) {
  const { isMobile } = useBreakpoint();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => setOpen(false), [route]);

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 72, padding: isMobile ? "0 20px" : "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,.88)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${scrolled || open ? T.line : "transparent"}`, transition: "border .3s" }}>
        <a href="#/" aria-label="iAsync home" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="iAsync" style={{ height: isMobile ? 34 : 42, width: "auto", mixBlendMode: "multiply" }} />
        </a>
        {!isMobile ? (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {PAGES.map((p) => (
              <a key={p.path} href={`#${p.path}`} style={{ position: "relative", padding: "8px 16px", fontFamily: BODY, fontSize: 14, fontWeight: 500, textDecoration: "none", color: route === p.path ? T.navy : T.muted, transition: "color .2s" }}>
                {p.label}
                {route === p.path && <motion.span layoutId="nav-underline" style={{ position: "absolute", left: 16, right: 16, bottom: 0, height: 2, borderRadius: 2, background: GRAD }} />}
              </a>
            ))}
            <div style={{ marginLeft: 12 }}><Button onClick={() => go("/contact")}>Get in touch</Button></div>
          </div>
        ) : (
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" style={{ background: "transparent", border: "none", width: 40, height: 40, display: "flex", flexDirection: "column", justifyContent: "center", gap: 5, alignItems: "center", cursor: "pointer" }}>
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} style={{ width: 22, height: 2, background: T.navy, borderRadius: 2, display: "block" }} />
            <motion.span animate={{ opacity: open ? 0 : 1 }} style={{ width: 22, height: 2, background: T.navy, borderRadius: 2, display: "block" }} />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} style={{ width: 22, height: 2, background: T.navy, borderRadius: 2, display: "block" }} />
          </button>
        )}
      </nav>
      <AnimatePresence>
        {isMobile && open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ position: "fixed", top: 72, left: 0, right: 0, zIndex: 99, background: T.white, borderBottom: `1px solid ${T.line}`, padding: "8px 0 16px", boxShadow: "0 20px 40px rgba(15,42,82,.08)" }}>
            {PAGES.map((p) => (
              <a key={p.path} href={`#${p.path}`} style={{ display: "block", padding: "14px 24px", fontFamily: BODY, fontSize: 16, fontWeight: 500, textDecoration: "none", color: route === p.path ? T.blue : T.ink, borderLeft: `3px solid ${route === p.path ? T.cyan : "transparent"}` }}>{p.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────
function FeaturedProduct() {
  const { isMobile } = useBreakpoint();
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      style={{ background: GRAD, borderRadius: 24, padding: isMobile ? 28 : 52, color: T.white, position: "relative", overflow: "hidden", boxShadow: "0 30px 70px rgba(27,100,176,.25)" }}>
      <div style={{ position: "absolute", right: -80, top: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,.08)" }} />
      <div style={{ position: "absolute", right: 60, bottom: -120, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,.06)" }} />
      <div style={{ position: "relative" }}>
        <span style={{ display: "inline-block", fontFamily: BODY, fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", background: "rgba(255,255,255,.16)", padding: "6px 14px", borderRadius: 100, marginBottom: 20 }}>★ Flagship Product</span>
        <h2 style={{ fontFamily: HEAD, fontSize: isMobile ? 34 : 52, fontWeight: 700, letterSpacing: -1, marginBottom: 8 }}>{FEATURED.title}</h2>
        <div style={{ fontFamily: BODY, fontSize: isMobile ? 15 : 17, fontWeight: 500, opacity: 0.85, marginBottom: 18 }}>{FEATURED.subtitle}</div>
        <p style={{ fontFamily: BODY, fontSize: isMobile ? 15 : 17, lineHeight: 1.75, opacity: 0.92, maxWidth: 640, marginBottom: 24 }}>{FEATURED.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {FEATURED.tech.map((t) => (
            <span key={t} style={{ fontFamily: BODY, fontSize: 12, fontWeight: 500, padding: "5px 12px", borderRadius: 100, background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.22)" }}>{t}</span>
          ))}
        </div>
        <Button href={FEATURED.live} variant="light">Visit TickFlo →</Button>
      </div>
    </motion.div>
  );
}

function HomePage({ go }) {
  const { isMobile, isTablet } = useBreakpoint();
  return (
    <>
      {/* Hero */}
      <div style={{ position: "relative", overflow: "hidden", background: `radial-gradient(ellipse at 85% 0%, rgba(31,181,232,.14), transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(27,100,176,.08), transparent 50%), ${T.white}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: isMobile ? "128px 20px 72px" : "176px 48px 112px" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span style={{ display: "inline-block", fontFamily: BODY, fontSize: 12, fontWeight: 600, letterSpacing: 2, color: T.blue, textTransform: "uppercase", background: "rgba(31,181,232,.1)", border: "1px solid rgba(31,181,232,.25)", padding: "7px 16px", borderRadius: 100, marginBottom: 26 }}>
              Integration · Automation · Solutions
            </span>
            <h1 style={{ fontFamily: HEAD, fontSize: isMobile ? 36 : isTablet ? 52 : 68, fontWeight: 700, color: T.navy, lineHeight: 1.08, letterSpacing: -2, marginBottom: 24, maxWidth: 860 }}>
              Intelligent systems built with <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Agentic AI & Machine Learning</span>
            </h1>
            <p style={{ fontFamily: BODY, fontSize: isMobile ? 16 : 20, color: T.muted, lineHeight: 1.7, maxWidth: 640, marginBottom: 36 }}>
              iAsync designs AI agents and ML-powered products in Python. Founded by Asadullah Noor, a MERN developer now going deep on agentic AI.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button onClick={() => go("/projects")}>View Projects</Button>
              <Button variant="outline" onClick={() => go("/contact")}>Contact Us</Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Focus */}
      <div style={{ background: T.soft, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: isMobile ? "56px 20px" : "88px 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "repeat(3,1fr)", gap: 20 }}>
            {FOCUS.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{ background: T.white, border: `1px solid ${T.line}`, borderRadius: 18, padding: 28 }}>
                <div style={{ width: 36, height: 4, borderRadius: 2, background: GRAD, marginBottom: 18 }} />
                <h3 style={{ fontFamily: HEAD, fontSize: 20, fontWeight: 600, color: T.navy, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontFamily: BODY, fontSize: 15, color: T.muted, lineHeight: 1.7 }}>{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: isMobile ? "56px 20px 72px" : "96px 48px 112px" }}>
        <FeaturedProduct />
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <Button variant="outline" onClick={() => go("/projects")}>See all projects →</Button>
        </div>
      </div>
    </>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function AboutPage() {
  const { isTablet } = useBreakpoint();
  const para = { fontFamily: BODY, fontSize: 17, color: T.muted, lineHeight: 1.85, marginBottom: 18 };
  const strong = { color: T.navy, fontWeight: 600 };
  return (
    <Wrap>
      <PageHeader eyebrow="About" title="The team behind the code" text="iAsync stands for integration, automation and solutions: software that connects things and takes work off people's plates." />
      <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.15fr 1fr", gap: isTablet ? 40 : 64, alignItems: "start" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}>
          <p style={para}><span style={strong}>iAsync</span> was founded by <span style={strong}>Asadullah Noor</span>, a MERN stack developer and agentic AI engineer based in Lahore.</p>
          <p style={para}>My journey began in 10th grade, when I discovered the power of building ideas through code. After school I built my foundation with FreeCodeCamp, learning not just to write code but to think like a developer.</p>
          <p style={para}>I started professionally at <span style={strong}>CYRANIX LLC</span>, a US-based remote startup, working on TickFlo, Yardzai and Servacy. That gave me real experience with multi-tenant backends, APIs and production deployments.</p>
          <p style={para}>Today I'm working in Python on <span style={strong}>Agentic AI and Machine Learning</span>, using LangChain and LangGraph to build agents that do real work. I'm also completing my BS in Software Engineering at the University of Central Punjab.</p>
          <div style={{ marginTop: 28 }}><Button href={asadullah} variant="outline">Download Founder's Resume</Button></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}>
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} style={{ background: T.soft, border: `1px solid ${T.line}`, borderRadius: 18, padding: 24, marginBottom: 16 }}>
              <div style={{ fontFamily: HEAD, fontSize: 15, fontWeight: 600, color: T.navy, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 22, height: 3, borderRadius: 2, background: GRAD, display: "block" }} />{cat}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{items.map((s) => <Tag key={s}>{s}</Tag>)}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </Wrap>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
function ProjectCard({ p, i }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: T.white, border: `1px solid ${hov ? "rgba(31,181,232,.5)" : T.line}`, borderRadius: 18, padding: 28, display: "flex", flexDirection: "column", transform: hov ? "translateY(-4px)" : "none", boxShadow: hov ? "0 20px 50px rgba(15,42,82,.09)" : "0 2px 8px rgba(15,42,82,.03)", transition: "all .3s ease" }}>
      <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, letterSpacing: 1, color: T.cyan, textTransform: "uppercase", marginBottom: 10 }}>{p.subtitle}</div>
      <h3 style={{ fontFamily: HEAD, fontSize: 21, fontWeight: 600, color: T.navy, marginBottom: 10 }}>{p.title}</h3>
      <p style={{ fontFamily: BODY, fontSize: 15, color: T.muted, lineHeight: 1.7, marginBottom: 18, flex: 1 }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 20 }}>{p.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {p.live && <a href={p.live} target="_blank" rel="noreferrer" style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: T.blue, textDecoration: "none" }}>Live demo →</a>}
        {p.github && <a href={p.github} target="_blank" rel="noreferrer" style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: T.muted, textDecoration: "none" }}>GitHub →</a>}
        {!p.live && !p.github && <span style={{ fontFamily: BODY, fontSize: 13, color: "#9AA8B8" }}>Private project</span>}
      </div>
    </motion.div>
  );
}

function ProjectsPage() {
  const { isMobile } = useBreakpoint();
  return (
    <Wrap>
      <PageHeader eyebrow="Projects" title="What we've built" text="Products and client work, from a multi-tenant SaaS to management systems for real businesses." />
      <div style={{ marginBottom: isMobile ? 32 : 48 }}><FeaturedProduct /></div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(320px,1fr))", gap: 22 }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
      </div>
    </Wrap>
  );
}

// ─── CONTACT (EmailJS) ───────────────────────────────────────────────────────
function ContactPage() {
  const { isTablet } = useBreakpoint();
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.msg.trim()) return "Please fill in all fields.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email address.";
    return "";
  };

  const send = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); setStatus("error"); return; }
    setStatus("sending"); setError("");
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        { name: form.name, email: form.email, message: form.msg },
        import.meta.env.VITE_EMAILJS_KEY
      );
      setStatus("sent");
      setForm({ name: "", email: "", msg: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Message could not be sent. Please try again or email us directly.");
      setStatus("error");
    }
  };

  const channels = [
    { label: "Email", value: "mrasadullahnoor@gmail.com", href: "mailto:mrasadullahnoor@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/xhaffi-xcript", href: "https://www.linkedin.com/in/xhaffi-xcript/" },
    { label: "GitHub", value: "github.com/Asadullah-Noor", href: "https://github.com/Asadullah-Noor" },
  ];

  const input = { width: "100%", padding: "14px 16px", borderRadius: 10, border: `1px solid ${T.line}`, background: T.white, fontFamily: BODY, fontSize: 15, color: T.ink, outline: "none", transition: "border .2s, box-shadow .2s" };
  const focus = (e) => { e.target.style.borderColor = T.cyan; e.target.style.boxShadow = "0 0 0 4px rgba(31,181,232,.12)"; };
  const blur = (e) => { e.target.style.borderColor = T.line; e.target.style.boxShadow = "none"; };
  const label = { fontFamily: BODY, fontSize: 13, fontWeight: 600, color: T.navy, display: "block", marginBottom: 8 };

  return (
    <Wrap>
      <PageHeader eyebrow="Contact" title="Let's build something together" text="Tell us about your project or idea. We usually reply within a day or two." />
      <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1.2fr", gap: isTablet ? 36 : 56, alignItems: "start" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          {channels.map((c) => (
            <a key={c.label} href={c.href} target={c.label === "Email" ? undefined : "_blank"} rel="noreferrer"
              style={{ display: "block", textDecoration: "none", background: T.soft, border: `1px solid ${T.line}`, borderRadius: 14, padding: "18px 22px", marginBottom: 14, transition: "all .25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(31,181,232,.5)"; e.currentTarget.style.background = T.white; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.background = T.soft; }}>
              <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, letterSpacing: 1, color: T.cyan, textTransform: "uppercase", marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontFamily: BODY, fontSize: 15, color: T.navy, wordBreak: "break-all" }}>{c.value}</div>
            </a>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          style={{ background: T.white, border: `1px solid ${T.line}`, borderRadius: 22, padding: isTablet ? 24 : 36, boxShadow: "0 24px 60px rgba(15,42,82,.07)" }}>
          {status === "sent" ? (
            <div style={{ textAlign: "center", padding: "36px 0" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: GRAD, color: T.white, fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>✓</div>
              <h3 style={{ fontFamily: HEAD, fontSize: 22, color: T.navy, marginBottom: 8 }}>Message sent</h3>
              <p style={{ fontFamily: BODY, fontSize: 15, color: T.muted, marginBottom: 24 }}>Thank you for reaching out. We'll get back to you soon.</p>
              <Button variant="outline" onClick={() => setStatus("idle")}>Send another message</Button>
            </div>
          ) : (
            <form onSubmit={send} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={label} htmlFor="c-name">Your name</label>
                <input id="c-name" style={input} value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} onFocus={focus} onBlur={blur} autoComplete="name" />
              </div>
              <div>
                <label style={label} htmlFor="c-email">Email address</label>
                <input id="c-email" type="email" style={input} value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} onFocus={focus} onBlur={blur} autoComplete="email" />
              </div>
              <div>
                <label style={label} htmlFor="c-msg">Message</label>
                <textarea id="c-msg" rows={5} placeholder="Tell us about your project..." style={{ ...input, resize: "vertical" }} value={form.msg} onChange={(e) => setForm((p) => ({ ...p, msg: e.target.value }))} onFocus={focus} onBlur={blur} />
              </div>
              {status === "error" && (
                <div role="alert" style={{ fontFamily: BODY, fontSize: 14, color: "#B42318", background: "#FEF3F2", border: "1px solid #FECDCA", borderRadius: 10, padding: "12px 16px" }}>{error}</div>
              )}
              <Button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send message →"}</Button>
            </form>
          )}
        </motion.div>
      </div>
    </Wrap>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  const { isMobile } = useBreakpoint();
  return (
    <footer style={{ background: T.soft, borderTop: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: isMobile ? "36px 20px" : "48px", display: "flex", flexDirection: isMobile ? "column" : "row", gap: 24, alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between" }}>
        <div>
          <img src={logo} alt="iAsync" style={{ height: 36, width: "auto", mixBlendMode: "multiply", marginBottom: 10 }} />
          <div style={{ fontFamily: BODY, fontSize: 13, color: T.muted }}>© 2026 iAsync. All rights reserved. Designed & built by Asadullah Noor.</div>
        </div>
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
          {PAGES.map((p) => <a key={p.path} href={`#${p.path}`} style={{ fontFamily: BODY, fontSize: 14, color: T.muted, textDecoration: "none" }}>{p.label}</a>)}
        </div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [route, go] = useRoute();

  useEffect(() => {
    const label = PAGES.find((p) => p.path === route)?.label;
    document.title = route === "/" ? "iAsync | Integration · Automation · Solutions" : `${label} | iAsync`;
  }, [route]);

  const pages = {
    "/": <HomePage go={go} />,
    "/about": <AboutPage />,
    "/projects": <ProjectsPage />,
    "/contact": <ContactPage />,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { -webkit-text-size-adjust:100%; scroll-behavior:smooth; }
        body { background:${T.white}; color:${T.ink}; font-family:${BODY}; overflow-x:hidden; -webkit-font-smoothing:antialiased; }
        ::placeholder { color:#9AA8B8; }
        ::selection { background:rgba(31,181,232,.25); }
        img { max-width:100%; }
      `}</style>
      <Nav route={route} go={go} />
      <AnimatePresence mode="wait">
        <motion.main key={route} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ minHeight: "100vh" }}>
          {pages[route]}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}