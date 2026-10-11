import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import asadullah from "./assets/Asadullah_Noor_Resume.pdf";

// ─── BREAKPOINT HOOK ──────────────────────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: w < 768, isTablet: w < 1024, w };
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_ITEMS = ["Home", "About", "Projects", "Fun Zone", "Contact"];

const SKILLS = {
  Programming: ["C++", "JavaScript", "Python"],
  Frontend: ["HTML", "CSS", "React", "Tailwind CSS", "Bootstrap"],
  Backend: ["Node.js", "Express.js", "MongoDB", "GraphQL"],
  "Agentic AI": ["LangChain", "LangGraph"],
  Tools: ["Git", "Postman", "Swagger", "Figma", "Shadcn UI", "Material UI", "Cursor AI"],
};

const LEVELS = {
  "C++": 90, JavaScript: 85, Python: 80,
  HTML: 95, CSS: 90, React: 82, "Tailwind CSS": 88, Bootstrap: 80,
  "Node.js": 80, "Express.js": 78, MongoDB: 75, GraphQL: 65,
  LangChain: 65, LangGraph: 60,
  Git: 85, Postman: 80, Swagger: 72, Figma: 75,
  "Shadcn UI": 70, "Material UI": 72, "Cursor AI": 78,
};

const SCOLORS = {
  Programming: "#d5fa02",
  Frontend: "#00f5d4",
  Backend: "#ff6b6b",
  "Agentic AI": "#c77dff",
  Tools: "#ffd93d",
};

const PROJECTS = [
  { title: "Zelvarq", subtitle: "Veterinary Clinic Management SaaS", desc: "A multi-tenant SaaS for veterinary clinics with Google sign-in, per-clinic branding, onboarding wizard, subscription billing and a superadmin panel. Covers patients & pets, appointments, consultations and expenses.", tech: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Cloudinary"], live: null, github: null, color: "#00f5d4" },
  { title: "Ramy Pet Hospital", subtitle: "Veterinary Practice System — Client Project", desc: "A full-stack MERN practice management system built for a client. Handles client and pet records, appointments, lab reports (CBC, LFT, RFT, Parasites) and printable documents.", tech: ["React", "Node.js", "Express", "MongoDB Atlas"], live: null, github: null, color: "#6bcb77" },
  { title: "Smart Micro-CRM", subtitle: "Mobile CRM for Small Organizations", desc: "A mobile CRM for schools, gyms and barber shops covering member management, scheduling, fee tracking, staff, attendance and reports, with WhatsApp notifications. Built as a BSSE final year project at UCP.", tech: ["React Native", "Node.js", "MongoDB Atlas", "WhatsApp API"], live: null, github: null, color: "#ffd93d" },
  { title: "JHS", subtitle: "School Management System", desc: "A comprehensive School Management System built from scratch — from requirement gathering to full implementation. Modernized a school that ran on paperwork for 4–5 decades using the MERN stack with modern UI components.", tech: ["React", "Tailwind CSS", "Redux", "ReChart", "Node.js", "Express", "MongoDB"], live: "https://jhs-git-main-asadullah-noors-projects.vercel.app/login", github: null, color: "#5e5ede" },
  { title: "iAsync Lead CRM", subtitle: "Internal Outreach Toolkit", desc: "A multi-tab React CRM we use to manage cold-outreach leads across industries and countries, paired with a Python lead-finder that combines Google Places data with website scraping.", tech: ["React", "Python", "Google Places API"], live: null, github: null, color: "#ff6b6b" },
  { title: "TickFlow", subtitle: "Multi-tenant Ticket Management", desc: "A scalable issue tracking system for businesses to manage internal workflows efficiently. Built with real-world backend architecture at CYRANIX LLC.", tech: ["Node.js", "Express", "MongoDB", "Swagger", "Postman"], live: "https://tickflo-fe-production.up.railway.app/auth/login", github: null, color: "#00b4d8" },
  { title: "Yardzai", subtitle: "Garage Selling — Yard Sale App", desc: "A MERN-based platform allowing users to buy and sell pre-owned items locally with GraphQL API and smooth location-based UX.", tech: ["MongoDB", "Express", "Node.js", "GraphQL"], live: null, github: null, color: "#f97316" },
  { title: "Servacy", subtitle: "Home Service Provider App", desc: "A MERN stack and GraphQL application providing a platform for users to book home services with a clean UI and seamless booking flow.", tech: ["MongoDB", "Express", "Node.js", "React", "GraphQL"], live: "https://tap-to-door.vercel.app/", github: null, color: "#e879f9" },
  { title: "XhaffiXhop", subtitle: "E-commerce Store", desc: "A modern e-commerce prototype with clean UI, smooth product browsing experience, and full cart functionality.", tech: ["React", "Tailwind CSS"], live: "https://xhafeexhop.vercel.app/", github: null, color: "#84cc16" },
  { title: "InvoZone", subtitle: "Corporate Landing Page", desc: "A responsive and visually engaging corporate landing page built with modern UI principles and pixel-perfect design implementation.", tech: ["React", "Tailwind CSS", "JavaScript"], live: null, github: "https://github.com/Asadullah-Noor/InvoZone", color: "#facc15" },
  { title: "Awfera LLM Platform", subtitle: "AI Learning Platform Clone", desc: "An educational platform focused on Large Language Models with rich course content, user dashboards, and modern UX.", tech: ["React", "Node.js", "Express", "MongoDB"], live: null, github: null, color: "#c77dff" },
];

// ─── NEURAL NETWORK BACKGROUND ────────────────────────────────────────────────
function ProBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const onMouse = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMouse);
    const N = 65;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
      r: Math.random() * 1.6 + 0.5, phase: Math.random() * Math.PI * 2,
    }));
    const CDIST = 130, MDIST = 160;
    const draw = () => {
      t += 0.011;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      [[0.17+0.09*Math.sin(t*0.26),0.28+0.11*Math.cos(t*0.21),0.50,0,245,212,0.052],
       [0.82+0.07*Math.cos(t*0.18),0.62+0.09*Math.sin(t*0.23),0.46,80,50,255,0.042],
       [0.48+0.13*Math.sin(t*0.15+1),0.12+0.07*Math.cos(t*0.19),0.38,0,150,220,0.036]
      ].forEach(([cx,cy,rs,r,g,b,a]) => {
        const gx=cx*canvas.width,gy=cy*canvas.height,gr=rs*canvas.width;
        const grad=ctx.createRadialGradient(gx,gy,0,gx,gy,gr);
        grad.addColorStop(0,`rgba(${r},${g},${b},${a})`); grad.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle=grad; ctx.fillRect(0,0,canvas.width,canvas.height);
      });
      nodes.forEach(n => {
        n.x+=n.vx; n.y+=n.vy;
        if(n.x<0||n.x>canvas.width) n.vx*=-1;
        if(n.y<0||n.y>canvas.height) n.vy*=-1;
        const dx=mouse.current.x-n.x, dy=mouse.current.y-n.y;
        const md=Math.sqrt(dx*dx+dy*dy);
        if(md<MDIST){n.x+=dx*0.0012; n.y+=dy*0.0012;}
      });
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<CDIST){
          const base=(1-dist/CDIST)*0.16;
          const mx=(nodes[i].x+nodes[j].x)/2-mouse.current.x;
          const my=(nodes[i].y+nodes[j].y)/2-mouse.current.y;
          const mdist=Math.sqrt(mx*mx+my*my);
          const boost=mdist<110?(1-mdist/110)*0.45:0;
          ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y);
          ctx.strokeStyle=`rgba(0,245,212,${base+boost})`; ctx.lineWidth=boost>0.08?1.1:0.5; ctx.stroke();
        }
      }
      nodes.forEach(n => {
        const pulse=Math.sin(t*1.4+n.phase)*0.5+0.5;
        const dx=mouse.current.x-n.x, dy=mouse.current.y-n.y;
        const md=Math.sqrt(dx*dx+dy*dy);
        const gb=md<90?(1-md/90):0;
        if(gb>0.08){
          ctx.beginPath(); ctx.arc(n.x,n.y,n.r*5,0,Math.PI*2);
          const halo=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*5);
          halo.addColorStop(0,`rgba(0,245,212,${gb*0.28})`); halo.addColorStop(1,"rgba(0,0,0,0)");
          ctx.fillStyle=halo; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r+gb*0.8,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,245,212,${0.22+pulse*0.5+gb*0.35})`; ctx.fill();
      });
      const sy=((t*36)%(canvas.height+80))-40;
      const sg=ctx.createLinearGradient(0,sy-50,0,sy+50);
      sg.addColorStop(0,"rgba(0,245,212,0)"); sg.addColorStop(0.5,"rgba(0,245,212,0.016)"); sg.addColorStop(1,"rgba(0,245,212,0)");
      ctx.fillStyle=sg; ctx.fillRect(0,sy-50,canvas.width,100);
      raf=requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize",resize); window.removeEventListener("mousemove",onMouse); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }} />;
}

// ─── CUSTOM CURSOR (desktop only) ────────────────────────────────────────────
function CustomCursor() {
  const dotPos = useRef({ x:0, y:0 });
  const ringPos = useRef({ x:0, y:0 });
  const [dot, setDot] = useState({ x:0, y:0 });
  const [ring, setRing] = useState({ x:0, y:0 });
  const [hovered, setHovered] = useState(false);
  const raf = useRef(null);
  useEffect(() => {
    const onMove = (e) => { dotPos.current={x:e.clientX,y:e.clientY}; setDot({x:e.clientX,y:e.clientY}); };
    const onOver = (e) => { if(e.target.closest("button,a,[data-hover]")) setHovered(true); };
    const onOut  = (e) => { if(!e.relatedTarget||!e.relatedTarget.closest("button,a,[data-hover]")) setHovered(false); };
    window.addEventListener("mousemove",onMove);
    window.addEventListener("mouseover",onOver);
    window.addEventListener("mouseout",onOut);
    const tick = () => {
      ringPos.current.x += (dotPos.current.x - ringPos.current.x) * 0.11;
      ringPos.current.y += (dotPos.current.y - ringPos.current.y) * 0.11;
      setRing({ x: ringPos.current.x, y: ringPos.current.y });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove",onMove); window.removeEventListener("mouseover",onOver); window.removeEventListener("mouseout",onOut); cancelAnimationFrame(raf.current); };
  }, []);
  const dotSize = 6, ringSize = hovered ? 48 : 30;
  return (
    <>
      <div style={{ position:"fixed", pointerEvents:"none", zIndex:9999, width:dotSize, height:dotSize, borderRadius:"50%", background:"#00f5d4", mixBlendMode:"screen", opacity:hovered?0:0.9, transform:`translate(${dot.x-dotSize/2}px,${dot.y-dotSize/2}px)`, transition:"opacity 0.2s ease", willChange:"transform" }} />
      <div style={{ position:"fixed", pointerEvents:"none", zIndex:9998, width:ringSize, height:ringSize, borderRadius:"50%", border:hovered?"1.5px dashed rgba(0,245,212,0.9)":"1px solid rgba(0,245,212,0.5)", transform:`translate(${ring.x-ringSize/2}px,${ring.y-ringSize/2}px)`, transition:"width 0.28s ease,height 0.28s ease,border 0.35s ease", willChange:"transform", animation:hovered?"cursorSpin 2.5s linear infinite":"none" }} />
      <style>{`@keyframes cursorSpin{from{transform:translate(${ring.x-24}px,${ring.y-24}px) rotate(0deg)}to{transform:translate(${ring.x-24}px,${ring.y-24}px) rotate(360deg)}}`}</style>
    </>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Hamburger({ open, onClick }) {
  return (
    <button onClick={onClick} aria-label="Menu"
      style={{ background:"transparent", border:"none", padding:"6px", cursor:"auto", display:"flex", flexDirection:"column", justifyContent:"center", gap:5, width:36, height:36, zIndex:201, position:"relative" }}>
      <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
        style={{ display:"block", width:22, height:2, background:"#00f5d4", borderRadius:2, transformOrigin:"center" }} />
      <motion.span animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        style={{ display:"block", width:22, height:2, background:"#00f5d4", borderRadius:2 }} />
      <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
        style={{ display:"block", width:22, height:2, background:"#00f5d4", borderRadius:2, transformOrigin:"center" }} />
    </button>
  );
}

function Nav({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  const go = (item) => { setActive(item); setMenuOpen(false); };

  const navBg = scrolled || menuOpen ? "rgba(5,8,16,0.96)" : "transparent";
  const navBlur = scrolled || menuOpen ? "blur(22px)" : "none";
  const navBorder = scrolled || menuOpen ? "1px solid rgba(0,245,212,0.08)" : "none";

  return (
    <>
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, padding: isMobile ? "0 20px" : "0 48px", height:68, display:"flex", alignItems:"center", justifyContent:"space-between", background:navBg, backdropFilter:navBlur, borderBottom:navBorder, transition:"background 0.4s ease, border 0.4s ease" }}>

        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} onClick={() => go("Home")}
          style={{ fontFamily:"'Orbitron',monospace", fontSize: isMobile ? 15 : 20, fontWeight:900, color:"#00f5d4", cursor: isMobile ? "auto" : "none", letterSpacing:1, userSelect:"none", zIndex:201 }}>
          ⟨ iAsync/⟩
        </motion.div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display:"flex", gap:6 }}>
            {NAV_ITEMS.map(item => (
              <motion.button key={item} onClick={() => go(item)} whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                style={{ background:active===item?"rgba(0,245,212,0.11)":"transparent", border:active===item?"1px solid rgba(0,245,212,0.42)":"1px solid transparent", color:active===item?"#00f5d4":"rgba(255,255,255,0.6)", padding:"8px 20px", borderRadius:8, cursor:"none", fontFamily:"'Space Mono',monospace", fontSize:13, letterSpacing:1, transition:"all 0.25s ease" }}>
                {item}
              </motion.button>
            ))}
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && <Hamburger open={menuOpen} onClick={() => setMenuOpen(o => !o)} />}
      </motion.nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ position:"fixed", top:68, left:0, right:0, zIndex:199, background:"rgba(5,8,16,0.98)", backdropFilter:"blur(24px)", borderBottom:"1px solid rgba(0,245,212,0.1)", padding:"10px 0 18px" }}>
            {NAV_ITEMS.map((item, i) => (
              <motion.button key={item}
                initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay: i * 0.055 }}
                onClick={() => go(item)}
                style={{ display:"block", width:"100%", textAlign:"left", background:"transparent", border:"none", borderLeft: active===item ? "3px solid #00f5d4" : "3px solid transparent", color: active===item ? "#00f5d4" : "rgba(255,255,255,0.7)", padding:"13px 28px", cursor:"auto", fontFamily:"'Space Mono',monospace", fontSize:15, letterSpacing:2, marginBottom:2, transition:"all 0.2s" }}>
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HomePage({ setActive }) {
  const { isMobile } = useBreakpoint();
  const words = [
    { text:"Web Development", dir:"left" }, { text:"MERN Stack", dir:"right" },
    { text:"Agentic AI", dir:"top" }, { text:"Digital Marketing", dir:"bottom" },
  ];
  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding: isMobile ? "90px 20px 60px" : "0 32px", position:"relative" }}>
      <div style={{ position:"absolute", top:"45%", left:"50%", transform:"translate(-50%,-50%)", width: isMobile ? 320 : 700, height: isMobile ? 320 : 700, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,245,212,0.045) 0%,transparent 65%)", pointerEvents:"none" }} />

      {/* Tags */}
      <div style={{ display:"flex", flexWrap:"wrap", gap: isMobile ? 8 : 12, justifyContent:"center", marginBottom: isMobile ? 24 : 32 }}>
        {words.map((w,i) => (
          <motion.span key={w.text}
            initial={{ x:w.dir==="left"?-120:w.dir==="right"?120:0, y:w.dir==="top"?-60:w.dir==="bottom"?60:0, opacity:0 }}
            animate={{ x:0, y:0, opacity:1 }}
            transition={{ delay:i*0.13, duration:1.1, ease:[0.22,1,0.36,1] }}
            style={{ fontFamily:"'Space Mono',monospace", fontSize: isMobile ? 10 : 13, letterSpacing: isMobile ? 1 : 3, color:"#00f5d4", textTransform:"uppercase", background:"rgba(0,245,212,0.06)", border:"1px solid rgba(0,245,212,0.22)", padding: isMobile ? "5px 12px" : "7px 18px", borderRadius:100 }}>
            {w.text}
          </motion.span>
        ))}
      </div>

      {/* Brand name */}
      <motion.h1 initial={{ opacity:0, scale:0.86 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.72, duration:1, ease:"easeOut" }}
        style={{ fontFamily:"'Orbitron',monospace", fontSize: isMobile ? "clamp(40px,14vw,64px)" : "clamp(48px,9vw,110px)", fontWeight:900, lineHeight:1.08, margin:"0 0 16px", background:"linear-gradient(135deg,#ffffff 22%,#00f5d4 62%,#00b4d8 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:-1 }}>
        iAsync
      </motion.h1>

      {/* Subtitle */}
      <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.02, duration:0.8 }}
        style={{ fontFamily:"'Space Mono',monospace", fontSize: isMobile ? 11 : "clamp(12px,1.8vw,16px)", color:"rgba(255,255,255,0.5)", letterSpacing: isMobile ? 1 : 3, marginBottom:14, textTransform:"uppercase", lineHeight:1.8 }}>
        Web Development & Digital Marketing · Lahore
      </motion.p>

      {/* Founder line */}
      <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.32, duration:1 }}
        style={{ fontFamily:"'Crimson Pro',serif", fontSize: isMobile ? 16 : "clamp(17px,2.2vw,22px)", color:"rgba(255,255,255,0.45)", fontStyle:"italic", marginBottom: isMobile ? 28 : 38, maxWidth:560, lineHeight:1.65, padding: isMobile ? "0 4px" : 0 }}>
        Founded by Asadullah Noor — MERN Stack Developer & Agentic AI Engineer
      </motion.p>

      {/* Tagline box */}
      <motion.div initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.52, duration:0.8 }}
        style={{ fontFamily:"'Orbitron',monospace", fontSize: isMobile ? 10 : "clamp(13px,1.8vw,18px)", letterSpacing: isMobile ? 2 : 4, color:"#00f5d4", textTransform:"uppercase", background:"rgba(0,245,212,0.05)", border:"1px solid rgba(0,245,212,0.18)", padding: isMobile ? "12px 18px" : "16px 32px", borderRadius:6, marginBottom: isMobile ? 32 : 48, maxWidth:"90vw", textAlign:"center" }}>
        Building Digital Stories Through Code
      </motion.div>

      {/* CTA Buttons */}
      <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.75, duration:0.6 }}
        style={{ display:"flex", gap: isMobile ? 10 : 16, flexWrap:"wrap", justifyContent:"center" }}>
        {[
          { label:"View Projects", action:() => setActive("Projects"), primary:true },
          { label:"Contact Us",   action:() => setActive("Contact"),  primary:false },
          { label:"Founder's Resume", action:() => window.open(asadullah,"_blank"), primary:false },
        ].map(({ label, action, primary }) => (
          <motion.button key={label} onClick={action}
            whileHover={{ scale:1.05, boxShadow:primary?"0 0 32px rgba(0,245,212,0.32)":"0 0 18px rgba(0,245,212,0.12)" }}
            whileTap={{ scale:0.97 }}
            style={{ padding: isMobile ? "11px 20px" : "14px 32px", borderRadius:8, cursor: isMobile ? "auto" : "none", fontFamily:"'Space Mono',monospace", fontSize: isMobile ? 11 : 13, letterSpacing:2, fontWeight:700, textTransform:"uppercase", background:primary?"linear-gradient(135deg,#00f5d4,#00b4d8)":"transparent", color:primary?"#05080e":"#00f5d4", border:primary?"none":"1px solid rgba(0,245,212,0.45)", transition:"all 0.3s" }}>
            {label}
          </motion.button>
        ))}
      </motion.div>

      {/* Scroll indicator — desktop only */}
      {!isMobile && (
        <motion.div animate={{ y:[0,10,0] }} transition={{ repeat:Infinity, duration:2.2 }}
          style={{ position:"absolute", bottom:36, display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(255,255,255,0.25)", letterSpacing:4 }}>SCROLL</span>
          <div style={{ width:1, height:38, background:"linear-gradient(to bottom,rgba(0,245,212,0.5),transparent)" }} />
        </motion.div>
      )}
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function SkillBar({ name, level, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true });
  return (
    <div ref={ref} style={{ marginBottom:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"rgba(255,255,255,0.75)" }}>{name}</span>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:14, color:color, opacity:0.85 }}>{level}%</span>
      </div>
      <div style={{ height:4, background:"rgba(255,255,255,0.07)", borderRadius:2, overflow:"hidden" }}>
        <motion.div initial={{ width:0 }} animate={{ width:inView?`${level}%`:0 }} transition={{ duration:1.3, delay, ease:"easeOut" }}
          style={{ height:"100%", borderRadius:2, background:`linear-gradient(90deg,${color},${color}65)` }} />
      </div>
    </div>
  );
}

function AboutPage() {
  const { isMobile, isTablet } = useBreakpoint();
  const bioLines = [
    <span><span style={{ color:"#00f5d4", fontWeight:700 }}>iAsync</span> is a web development and digital marketing business based in Lahore, founded by <span style={{ color:"#00f5d4", fontWeight:700 }}>Asadullah Noor</span> — a MERN stack developer and agentic AI engineer.</span>,
    <span>The journey began in 10th grade, when I discovered the power of building ideas through code. After high school I built my foundation through <span style={{ color:"#00b4d8" }}>FreeCodeCamp</span>, learning not just to write code, but to think like a developer.</span>,
    <span>My professional experience began at <span style={{ color:"#ffd93d" }}>CYRANIX LLC</span>, a US-based remote startup, where I worked on TickFlow (multi-tenant ticket management), Yardzai (a yard-sale marketplace) and Servacy (on-demand home services with GraphQL).</span>,
    <span>With iAsync, I now build custom software for real businesses — from a school management system that replaced decades of paperwork, to veterinary clinic software and a mobile CRM for small organizations.</span>,
    <span>I'm completing my BS in Software Engineering at the University of Central Punjab, and I'm focused on building <span style={{ color:"#c77dff" }}>AI-powered applications</span> with LangChain and LangGraph.</span>,
  ];

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding: isMobile ? "96px 20px 60px" : isTablet ? "100px 32px 70px" : "120px 48px 80px" }}>
      <motion.div initial={{ opacity:0, y:26 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
        <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize: isMobile ? "clamp(24px,7vw,40px)" : "clamp(28px,5vw,54px)", fontWeight:900, marginTop:12, marginBottom: isMobile ? 28 : 42, background:"linear-gradient(135deg,#fff,#00f5d4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          The Team Behind the Code
        </h2>
      </motion.div>

      {/* Stacks on mobile/tablet, side-by-side on desktop */}
      <div style={{ display:"grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap: isMobile ? 28 : isTablet ? 36 : 56, alignItems:"start" }}>

        {/* Left — Bio + Stats */}
        <motion.div initial={{ opacity:0, x: isMobile ? 0 : -38 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2, duration:0.8 }}>
          <div style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(0,245,212,0.09)", borderRadius:16, padding: isMobile ? 22 : 36 }}>
            {bioLines.map((text, i) => (
              <p key={i} style={{ fontFamily:"'Crimson Pro',serif", fontSize: isMobile ? 16 : 18, lineHeight:1.9, color:"rgba(255,255,255,0.72)", marginBottom: i < bioLines.length-1 ? 16 : 0 }}>
                {text}
              </p>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginTop:20 }}>
            {[{ l:"Projects", v:`${PROJECTS.length}+` }, { l:"Stack", v:"MERN" }, { l:"Base", v:"Lahore" }, { l:"Focus", v:"Web+AI" }].map(({ l, v }) => (
              <div key={l} style={{ background:"rgba(0,245,212,0.04)", border:"1px solid rgba(0,245,212,0.12)", borderRadius:12, padding: isMobile ? 16 : 20, textAlign:"center" }}>
                <div style={{ fontFamily:"'Orbitron',monospace", fontSize: isMobile ? 20 : 24, fontWeight:900, color:"#75c9be" }}>{v}</div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"rgba(255,255,255,0.45)", marginTop:6, letterSpacing:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Skills */}
        <motion.div initial={{ opacity:0, x: isMobile ? 0 : 38 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.35, duration:0.8 }}>
          {Object.entries(SKILLS).map(([cat, skills], ci) => (
            <div key={cat} style={{ marginBottom:30 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                <div style={{ width:24, height:2, background:SCOLORS[cat], borderRadius:1 }} />
                <span style={{ fontFamily:"'Orbitron',monospace", fontSize:13, color:SCOLORS[cat], letterSpacing:3, textTransform:"uppercase" }}>{cat}</span>
              </div>
              {skills.map((s, si) => (
                <SkillBar key={s} name={s} level={LEVELS[s]||75} color={SCOLORS[cat]} delay={ci*0.16+si*0.06} />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-40px" });
  const [hov, setHov] = useState(false);
  const { isMobile } = useBreakpoint();
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:50 }} animate={inView?{ opacity:1, y:0 }:{}}
      transition={{ delay:(index%3)*0.07, duration:0.62, ease:"easeOut" }}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)} whileHover={{ y:-6 }}
      style={{ background:hov?"rgba(255,255,255,0.045)":"rgba(255,255,255,0.025)", borderRadius:16, padding: isMobile ? 22 : 32, border:`1px solid ${hov?project.color+"45":"rgba(255,255,255,0.07)"}`, boxShadow:hov?`0 20px 55px ${project.color}14,inset 0 1px 0 ${project.color}18`:"none", transition:"all 0.3s ease", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${project.color},transparent)`, opacity:hov?1:0, transition:"opacity 0.3s" }} />
      <div style={{ fontFamily:"'Orbitron',monospace", fontSize: isMobile ? 40 : 56, fontWeight:900, color:`${project.color}10`, position:"absolute", top:10, right: isMobile ? 14 : 20, lineHeight:1, userSelect:"none" }}>
        {String(index+1).padStart(2,"0")}
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
        <div style={{ width:7, height:7, borderRadius:"50%", background:project.color, boxShadow:`0 0 10px ${project.color}`, flexShrink:0 }} />
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize: isMobile ? 10 : 13, color:project.color, letterSpacing:2, textTransform:"uppercase" }}>{project.subtitle}</span>
      </div>

      <h3 style={{ fontFamily:"'Orbitron',monospace", fontSize: isMobile ? 17 : 21, fontWeight:900, color:"#fff", marginBottom:10 }}>{project.title}</h3>
      <p style={{ fontFamily:"'Crimson Pro',serif", fontSize: isMobile ? 15 : 17, color:"rgba(255,255,255,0.65)", lineHeight:1.75, marginBottom:18 }}>{project.desc}</p>

      <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:18 }}>
        {project.tech.map(t => (
          <span key={t} style={{ fontFamily:"'Space Mono',monospace", fontSize: isMobile ? 10 : 13, letterSpacing:1, padding: isMobile ? "4px 10px" : "5px 13px", borderRadius:100, background:`${project.color}12`, border:`1px solid ${project.color}28`, color:project.color }}>
            {t}
          </span>
        ))}
      </div>

      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer"
            style={{ fontFamily:"'Space Mono',monospace", fontSize: isMobile ? 11 : 13, letterSpacing:2, cursor: isMobile ? "auto" : "none", color:project.color, textDecoration:"none", display:"flex", alignItems:"center", gap:5, padding: isMobile ? "8px 14px" : "9px 18px", border:`1px solid ${project.color}40`, borderRadius:6, background:`${project.color}08`, transition:"all 0.25s" }}>
            ▶ LIVE DEMO
          </a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer"
            style={{ fontFamily:"'Space Mono',monospace", fontSize: isMobile ? 11 : 13, letterSpacing:2, cursor: isMobile ? "auto" : "none", color:"rgba(255,255,255,0.55)", textDecoration:"none", display:"flex", alignItems:"center", gap:5, padding: isMobile ? "8px 14px" : "9px 18px", border:"1px solid rgba(255,255,255,0.14)", borderRadius:6, transition:"all 0.25s" }}>
            ⌥ GITHUB
          </a>
        )}
        {!project.live && !project.github && (
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize: isMobile ? 11 : 13, letterSpacing:2, color:"rgba(255,255,255,0.28)", padding: isMobile ? "8px 14px" : "9px 18px", border:"1px solid rgba(255,255,255,0.07)", borderRadius:6 }}>
            🔒 PRIVATE PROJECT
          </span>
        )}
      </div>
    </motion.div>
  );
}

function ProjectsPage() {
  const { isMobile, isTablet } = useBreakpoint();
  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding: isMobile ? "96px 20px 60px" : isTablet ? "100px 32px 70px" : "120px 48px 80px" }}>
      <motion.div initial={{ opacity:0, y:26 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
        <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize: isMobile ? "clamp(24px,7vw,40px)" : "clamp(28px,5vw,54px)", fontWeight:900, marginTop:12, marginBottom:12, background:"linear-gradient(135deg,#fff,#00f5d4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          What We've Built
        </h2>
        <p style={{ fontFamily:"'Crimson Pro',serif", fontSize: isMobile ? 16 : 18, color:"rgba(255,255,255,0.42)", marginBottom: isMobile ? 32 : 52 }}>
          Real-world products and client work across the full MERN stack
        </p>
      </motion.div>
      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(320px,1fr))", gap: isMobile ? 16 : 24 }}>
        {PROJECTS.map((p,i) => <ProjectCard key={p.title} project={p} index={i} />)}
      </div>
    </div>
  );
}

// ─── FUN ZONE ─────────────────────────────────────────────────────────────────
function RPS() {
  const [choice, setChoice] = useState(null);
  const [comp,   setComp]   = useState(null);
  const [result, setResult] = useState(null);
  const [score,  setScore]  = useState({ w:0, l:0, d:0 });
  const opts = ["🪨","📄","✂️"];
  const play = (i) => {
    const ci = Math.floor(Math.random()*3);
    setChoice(i); setComp(ci);
    if(i===ci){ setResult("Draw!"); setScore(s=>({...s,d:s.d+1})); }
    else if((i===0&&ci===2)||(i===1&&ci===0)||(i===2&&ci===1)){ setResult("You Win! 🎉"); setScore(s=>({...s,w:s.w+1})); }
    else { setResult("You Lose 💀"); setScore(s=>({...s,l:s.l+1})); }
  };
  return (
    <div style={{ textAlign:"center" }}>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:14, color:"#6bcb77", marginBottom:16, letterSpacing:2 }}>W:{score.w} · D:{score.d} · L:{score.l}</div>
      <div style={{ display:"flex", gap:14, justifyContent:"center", marginBottom:18 }}>
        {opts.map((o,i) => (
          <motion.button key={i} whileHover={{ scale:1.2, y:-4 }} whileTap={{ scale:0.9 }} onClick={() => play(i)}
            style={{ fontSize:34, background:"rgba(107,203,119,0.08)", border:"1px solid rgba(107,203,119,0.25)", borderRadius:12, padding:"10px 14px", cursor:"auto" }}>
            {o}
          </motion.button>
        ))}
      </div>
      {result && (
        <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
          style={{ fontFamily:"'Orbitron',monospace", fontSize:14, color:result.includes("Win")?"#6bcb77":result==="Draw!"?"#ffd93d":"#ff6b6b", lineHeight:2.2 }}>
          You: {opts[choice]}  vs  CPU: {opts[comp]}<br />{result}
        </motion.div>
      )}
    </div>
  );
}

function Memory() {
  const emojis = ["🚀","💻","🎮","🔥","⚡","🎯"];
  const init = () => [...emojis,...emojis].map((e,i) => ({ id:i, val:e, flipped:false, matched:false })).sort(() => Math.random()-0.5);
  const [cards, setCards] = useState(init);
  const [sel, setSel]     = useState([]);
  const [moves, setMoves] = useState(0);
  const flip = (id) => {
    if(sel.length===2) return;
    const card = cards.find(c => c.id===id);
    if(card.flipped||card.matched) return;
    const next = cards.map(c => c.id===id?{...c,flipped:true}:c);
    setCards(next);
    const ns = [...sel,id]; setSel(ns);
    if(ns.length===2){
      setMoves(m => m+1);
      const [a,b] = ns.map(id => next.find(c => c.id===id));
      if(a.val===b.val){ setTimeout(() => { setCards(c => c.map(x => ns.includes(x.id)?{...x,matched:true}:x)); setSel([]); }, 400); }
      else { setTimeout(() => { setCards(c => c.map(x => ns.includes(x.id)?{...x,flipped:false}:x)); setSel([]); }, 800); }
    }
  };
  const won = cards.every(c => c.matched);
  return (
    <div>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:14, color:"#c77dff", marginBottom:12, letterSpacing:2, textAlign:"center" }}>MOVES: {moves}</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:7, maxWidth:268, margin:"0 auto" }}>
        {cards.map(c => (
          <motion.div key={c.id} whileHover={{ scale:1.06 }} whileTap={{ scale:0.94 }} onClick={() => flip(c.id)}
            style={{ height:58, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, cursor:"auto", background:c.flipped||c.matched?"rgba(199,125,255,0.12)":"rgba(255,255,255,0.04)", border:`1px solid ${c.matched?"rgba(199,125,255,0.45)":c.flipped?"rgba(199,125,255,0.28)":"rgba(255,255,255,0.09)"}` }}>
            {c.flipped||c.matched?c.val:"?"}
          </motion.div>
        ))}
      </div>
      {won && <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ textAlign:"center", marginTop:12, fontFamily:"'Orbitron',monospace", fontSize:14, color:"#c77dff" }}>Won in {moves} moves! 🎉</motion.div>}
      <div style={{ textAlign:"center", marginTop:12 }}>
        <button onClick={() => { setCards(init()); setMoves(0); setSel([]); }}
          style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#c77dff", background:"rgba(199,125,255,0.08)", border:"1px solid rgba(199,125,255,0.25)", padding:"6px 16px", borderRadius:6, cursor:"auto" }}>
          RESET
        </button>
      </div>
    </div>
  );
}

function Typing() {
  const sentences = ["const studio = 'iAsync';","npm install talent ambition focus","git commit -m 'Building the future'","console.log('Hello World! 🚀');"];
  const [idx, setIdx]     = useState(0);
  const [typed, setTyped] = useState("");
  const [start, setStart] = useState(null);
  const [wpm, setWpm]     = useState(null);
  const target = sentences[idx];
  const handle = (e) => {
    const v = e.target.value;
    if(!start && v.length===1) setStart(Date.now());
    setTyped(v);
    if(v===target) setWpm(Math.round(target.split(" ").length/((Date.now()-start)/60000)));
  };
  return (
    <div>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, background:"rgba(0,0,0,0.3)", borderRadius:8, padding:14, marginBottom:10, lineHeight:1.9, letterSpacing:0.5, wordBreak:"break-all" }}>
        {target.split("").map((ch,i) => <span key={i} style={{ color:i<typed.length?(typed[i]===ch?"#00f5d4":"#ff6b6b"):"rgba(255,255,255,0.35)" }}>{ch}</span>)}
      </div>
      <input value={typed} onChange={handle} disabled={!!wpm} placeholder="Start typing..."
        style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(0,245,212,0.28)", color:"#fff", padding:"10px 14px", borderRadius:8, fontFamily:"'Space Mono',monospace", fontSize:13, outline:"none", boxSizing:"border-box", cursor:"auto" }} />
      {wpm && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ textAlign:"center", marginTop:12 }}>
          <div style={{ fontFamily:"'Orbitron',monospace", fontSize:28, color:"#00f5d4" }}>{wpm} WPM</div>
          <button onClick={() => { setTyped(""); setStart(null); setWpm(null); setIdx(i => (i+1)%sentences.length); }}
            style={{ marginTop:6, fontFamily:"'Space Mono',monospace", fontSize:13, color:"#00f5d4", background:"rgba(0,245,212,0.08)", border:"1px solid rgba(0,245,212,0.28)", padding:"7px 18px", borderRadius:6, cursor:"auto" }}>
            NEXT
          </button>
        </motion.div>
      )}
    </div>
  );
}

function FunZonePage() {
  const { isMobile, isTablet } = useBreakpoint();
  const games = [
    { title:"Rock Paper Scissors", icon:"🎮", color:"#6bcb77", comp:<RPS /> },
    { title:"Memory Match",        icon:"🧠", color:"#c77dff", comp:<Memory /> },
    { title:"Typing Speed Test",   icon:"⌨️",  color:"#00f5d4", comp:<Typing /> },
  ];
  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding: isMobile ? "96px 20px 60px" : isTablet ? "100px 32px 70px" : "120px 48px 80px" }}>
      <motion.div initial={{ opacity:0, y:26 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
        <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize: isMobile ? "clamp(24px,7vw,40px)" : "clamp(28px,5vw,54px)", fontWeight:900, marginTop:12, marginBottom:12, background:"linear-gradient(135deg,#fff,#ffd93d)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          Play & Interact
        </h2>
        <p style={{ fontFamily:"'Crimson Pro',serif", fontSize: isMobile ? 16 : 18, color:"rgba(255,255,255,0.42)", marginBottom: isMobile ? 32 : 52 }}>
          Great developers also know how to have fun
        </p>
      </motion.div>
      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(310px,1fr))", gap: isMobile ? 16 : 24 }}>
        {games.map((g,i) => (
          <motion.div key={g.title} initial={{ opacity:0, y:34 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.12, duration:0.62 }}
            style={{ background:"rgba(255,255,255,0.025)", border:`1px solid ${g.color}1e`, borderRadius:16, padding: isMobile ? 22 : 32 }}>
            <div style={{ fontSize:28, marginBottom:10 }}>{g.icon}</div>
            <h3 style={{ fontFamily:"'Orbitron',monospace", fontSize: isMobile ? 15 : 18, color:g.color, marginBottom:22, letterSpacing:1 }}>{g.title}</h3>
            {g.comp}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function ContactPage() {
  const { isMobile, isTablet } = useBreakpoint();
  const [form, setForm]       = useState({ name:"", email:"", msg:"" });
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState(null);

  const handleSend = async () => {
    if(!form.name||!form.email||!form.msg){ setError("Please fill all fields."); return; }
    setSending(true); setError(null);
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        { name:form.name, email:form.email, message:form.msg },
        import.meta.env.VITE_EMAILJS_KEY
      );
      setSent(true); setForm({ name:"", email:"", msg:"" });
    } catch(err) {
      console.error("EmailJS Error:",err);
      setError("Failed to send. Please try again.");
    } finally { setSending(false); }
  };

  const socials = [
    { label:"GitHub",   icon:"⌥",  href:"https://github.com/Asadullah-Noor",           sub:"Asadullah-Noor" },
    { label:"LinkedIn", icon:"in", href:"https://www.linkedin.com/in/xhaffi-xcript/",  sub:"Connect with us" },
    { label:"Email",    icon:"@",  href:"mailto:mrasadullahnoor@gmail.com",             sub:"mrasadullahnoor@gmail.com" },
  ];

  const inputStyle = { width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:8, color:"#fff", padding:"13px 16px", fontFamily:"'Space Mono',monospace", fontSize:14, outline:"none", boxSizing:"border-box", cursor:"auto", transition:"border-color 0.3s" };
  const labelStyle = { fontFamily:"'Space Mono',monospace", fontSize:14, color:"rgba(255,255,255,0.5)", letterSpacing:2, display:"block", marginBottom:10 };

  return (
    <div style={{ maxWidth:940, margin:"0 auto", padding: isMobile ? "96px 20px 60px" : isTablet ? "100px 32px 70px" : "120px 48px 80px" }}>
      <motion.div initial={{ opacity:0, y:26 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
        <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize: isMobile ? "clamp(24px,7vw,40px)" : "clamp(28px,5vw,54px)", fontWeight:900, marginTop:12, marginBottom:12, background:"linear-gradient(135deg,#fff,#00f5d4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          Let's Build Together
        </h2>
        <p style={{ fontFamily:"'Crimson Pro',serif", fontSize: isMobile ? 16 : 18, color:"rgba(255,255,255,0.42)", marginBottom: isMobile ? 28 : 48 }}>
          Have a project idea? Tell iAsync about it.
        </p>
      </motion.div>

      {/* Stacked on mobile/tablet, two-col on desktop */}
      <div style={{ display:"grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap: isMobile ? 28 : 56 }}>

        {/* LEFT — Socials */}
        <motion.div initial={{ opacity:0, x: isMobile ? 0 : -36 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2, duration:0.8 }}>
          <h3 style={{ fontFamily:"'Orbitron',monospace", fontSize:13, color:"rgba(255,255,255,0.38)", letterSpacing:3, marginBottom:18, textTransform:"uppercase" }}>Find Us Online</h3>
          {socials.map((s,i) => (
            <motion.a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3+i*0.09 }}
              whileHover={{ x:6 }}
              style={{ display:"flex", alignItems:"center", gap:14, padding: isMobile ? "12px 16px" : "16px 22px", borderRadius:12, marginBottom:12, textDecoration:"none", background:"rgba(255,255,255,0.025)", border:"1px solid rgba(0,245,212,0.09)", transition:"all 0.3s", cursor:"auto" }}>
              <div style={{ width:40, height:40, borderRadius:10, background:"rgba(0,245,212,0.08)", border:"1px solid rgba(0,245,212,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Space Mono',monospace", fontSize:14, color:"#00f5d4", flexShrink:0 }}>{s.icon}</div>
              <div style={{ minWidth:0, flex:1 }}>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"rgba(255,255,255,0.75)" }}>{s.label}</div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"rgba(255,255,255,0.42)", marginTop:4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.sub}</div>
              </div>
              <span style={{ marginLeft:"auto", color:"#00f5d4", fontSize:16, flexShrink:0 }}>→</span>
            </motion.a>
          ))}
          <div style={{ marginTop:28, padding: isMobile ? 18 : 24, background:"rgba(0,245,212,0.038)", border:"1px solid rgba(0,245,212,0.11)", borderRadius:12 }}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#00f5d4", letterSpacing:2, marginBottom:12 }}>WHAT WE OFFER</div>
            {["Websites & Web Apps", "Custom Software & SaaS", "Digital Marketing"].map(t => (
              <div key={t} style={{ fontFamily:"'Crimson Pro',serif", fontSize:18, color:"rgba(255,255,255,0.65)", marginBottom:10, display:"flex", gap:10 }}>
                <span style={{ color:"#00f5d4" }}>✓</span> {t}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Form */}
        <motion.div initial={{ opacity:0, x: isMobile ? 0 : 36 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.8 }}>
          {sent ? (
            <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} style={{ textAlign:"center", padding: isMobile ? 40 : 64 }}>
              <div style={{ fontSize:60, marginBottom:16 }}>🚀</div>
              <div style={{ fontFamily:"'Orbitron',monospace", fontSize:20, color:"#00f5d4" }}>Message Sent!</div>
              <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:18, color:"rgba(255,255,255,0.48)", marginTop:10 }}>We'll get back to you soon.</div>
              <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }} onClick={() => setSent(false)}
                style={{ marginTop:24, padding:"11px 28px", borderRadius:8, cursor:"auto", background:"transparent", color:"#00f5d4", border:"1px solid rgba(0,245,212,0.42)", fontFamily:"'Space Mono',monospace", fontSize:14, letterSpacing:2 }}>
                SEND ANOTHER
              </motion.button>
            </motion.div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
              {[{ key:"name", label:"Your Name", type:"text" },{ key:"email", label:"Email Address", type:"email" }].map(f => (
                <div key={f.key}>
                  <label style={labelStyle}>{f.label}</label>
                  <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]:e.target.value }))}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor="rgba(0,245,212,0.45)"}
                    onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.09)"} />
                </div>
              ))}
              <div>
                <label style={labelStyle}>Message</label>
                <textarea rows={5} value={form.msg} onChange={e => setForm(p => ({ ...p, msg:e.target.value }))}
                  placeholder="Tell us about your project..."
                  style={{ ...inputStyle, resize:"vertical" }}
                  onFocus={e => e.target.style.borderColor="rgba(0,245,212,0.45)"}
                  onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.09)"} />
              </div>
              {error && (
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:14, color:"#ff6b6b", padding:"11px 15px", background:"rgba(255,107,107,0.08)", border:"1px solid rgba(255,107,107,0.22)", borderRadius:6 }}>
                  ⚠ {error}
                </div>
              )}
              <motion.button whileHover={{ scale:1.02, boxShadow:"0 0 36px rgba(0,245,212,0.26)" }} whileTap={{ scale:0.98 }}
                onClick={handleSend} disabled={sending}
                style={{ padding:"16px", borderRadius:8, cursor:"auto", background:sending?"rgba(0,245,212,0.3)":"linear-gradient(135deg,#00f5d4,#00b4d8)", color:"#05080e", border:"none", fontFamily:"'Orbitron',monospace", fontSize:13, fontWeight:900, letterSpacing:3, transition:"all 0.3s" }}>
                {sending?"SENDING...":"SEND MESSAGE →"}
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ─── LOADING ──────────────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx]   = useState(0);
  const lines = ["> Initializing iAsync...","> Loading MERN stack modules...","> Connecting neural network...","> Ready."];
  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => { const n=Math.min(p+Math.random()*13,100); if(n>=100){ clearInterval(iv); setTimeout(onDone,550); } return n; });
    }, 88);
    const lv = setInterval(() => setLineIdx(l => Math.min(l+1,lines.length-1)), 480);
    return () => { clearInterval(iv); clearInterval(lv); };
  }, []);
  const p = Math.min(progress, 100);
  return (
    <motion.div exit={{ opacity:0 }} transition={{ duration:0.5 }}
      style={{ position:"fixed", inset:0, background:"#05080e", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:9999, padding:"0 24px" }}>
      <motion.div animate={{ rotate:360 }} transition={{ duration:1.7, repeat:Infinity, ease:"linear" }}
        style={{ width:52, height:52, borderRadius:"50%", border:"1.5px solid rgba(0,245,212,0.1)", borderTop:"1.5px solid #00f5d4", marginBottom:36 }} />
      <div style={{ marginBottom:20, textAlign:"center" }}>
        {lines.slice(0,lineIdx+1).map((l,i) => (
          <div key={i} style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:i===lineIdx?"#00f5d4":"rgba(255,255,255,0.2)", letterSpacing:2, marginBottom:5 }}>{l}</div>
        ))}
      </div>
      <div style={{ width:"min(220px,80vw)", height:2, background:"rgba(255,255,255,0.07)", borderRadius:1, overflow:"hidden" }}>
        <motion.div style={{ height:"100%", width:`${p}%`, background:"linear-gradient(90deg,#00f5d4,#00b4d8)", borderRadius:1, transition:"width 0.1s" }} />
      </div>
      <div style={{ fontFamily:"'Orbitron',monospace", fontSize:13, color:"rgba(0,245,212,0.5)", marginTop:10 }}>{Math.floor(p)}%</div>
    </motion.div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [active, setActive]   = useState("Home");
  const { isMobile } = useBreakpoint();

  // Update the browser tab title for the iAsync brand
  useEffect(() => { document.title = "iAsync | Web Development & Digital Marketing"; }, []);

  const pages = {
    Home:       <HomePage setActive={setActive} />,
    About:      <AboutPage />,
    Projects:   <ProjectsPage />,
    "Fun Zone": <FunZonePage />,
    Contact:    <ContactPage />,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Crimson+Pro:ital,wght@0,400;0,600;1,400;1,600&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { -webkit-text-size-adjust: 100%; }
        body { background:#05080e; color:#fff; overflow-x:hidden; }
        /* Custom cursor desktop only */
        @media (min-width: 769px) {
          body, *, input, textarea, button, a, select { cursor: none !important; }
        }
        @media (max-width: 768px) {
          body, *, input, textarea, button, a, select { cursor: auto !important; }
        }
        ::placeholder { color:rgba(255,255,255,0.2); font-family:'Space Mono',monospace; font-size:13px; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#05080e; }
        ::-webkit-scrollbar-thumb { background:rgba(0,245,212,0.22); border-radius:2px; }
        img, canvas { max-width: 100%; }
      `}</style>

      <AnimatePresence>{loading && <LoadingScreen onDone={() => setLoading(false)} />}</AnimatePresence>

      {!loading && (
        <>
          {/* Custom cursor only on desktop */}
          {!isMobile && <CustomCursor />}
          <ProBackground />
          <Nav active={active} setActive={setActive} />
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-14 }}
              transition={{ duration:0.42, ease:"easeInOut" }}
              style={{ position:"relative", zIndex:1, minHeight:"100vh" }}>
              {pages[active]}
            </motion.div>
          </AnimatePresence>
          <div style={{ textAlign:"center", padding: isMobile ? "24px 20px" : "36px 20px", borderTop:"1px solid rgba(255,255,255,0.05)", position:"relative", zIndex:1 }}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize: isMobile ? 11 : 13, color:"rgba(255,255,255,0.28)", letterSpacing:2 }}>
              © 2026 <span style={{ color:"#00f5d4" }}>iAsync</span>. All Rights Reserved.
            </div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize: isMobile ? 11 : 13, color:"rgba(216,194,194,0.7)", marginTop:6 }}>
              Designed & Built by Asadullah Noor
            </div>
          </div>
        </>
      )}
    </>
  );
}