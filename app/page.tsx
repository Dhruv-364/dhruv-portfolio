"use client";

import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";

type BlogPost = "honeypot" | "vpn" | null;
function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState("".padEnd(text.length, "•"));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";

  const startScramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplay((prev) =>
        text
          .split("")
          .map((char, i) => {
            if (i < iteration) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1 / 3; // speed of reveal

      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
        setDisplay(text);
      }
    }, 30);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplay("".padEnd(text.length, "•"));
  };

  return (
    <span
      onMouseEnter={startScramble}
      onMouseLeave={reset}
      className="font-mono text-cyan-400 cursor-pointer select-none"
    >
      {display}
    </span>
  );
}
function AccessReveal({
  label,
  text,
  icon,
}: {
  label: string;
  text: string;
  icon: string;
}) {
  const [state, setState] = useState<"idle" | "checking" | "granted">("idle");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (state !== "idle") return;

    setState("checking");
    setProgress(0);

    // Fake decrypt progress
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += Math.random() * 12 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          setState("granted");
        }, 300);
      }
      setProgress(p);
    }, 120);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState("idle");
    setProgress(0);
  };

  return (
    <div
      onMouseEnter={start}
      onMouseLeave={reset}
      className="flex flex-col gap-1 cursor-pointer select-none"
    >
      <div className="flex items-center gap-2">
        <span>{icon}</span>

        {state === "idle" && (
          <span className="text-slate-400 font-mono text-sm">
            {label} — hover to access
          </span>
        )}

        {state === "checking" && (
          <span className="text-yellow-400 font-mono text-sm animate-pulse">
            DECRYPTING…
          </span>
        )}

        {state === "granted" && (
          <span className="flex items-center gap-2">
            <span className="text-green-400 font-mono text-sm mr-2">
              ACCESS GRANTED
            </span>
            <span className="font-mono text-cyan-400">{text}</span>
          </span>
        )}
      </div>

      {/* Progress Bar */}
      {state === "checking" && (
        <div className="w-full h-2 bg-black/40 rounded overflow-hidden border border-white/10">
          <div
            className="h-full bg-cyan-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
function TypewriterName({ text }: { text: string }) {
  const [display, setDisplay] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplay((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 120);

    const cursorBlink = setInterval(() => {
      setShowCursor((c) => !c);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorBlink);
    };
  }, [text]);

  return (
    <span
      className="
        inline-flex 
        items-baseline 
        leading-none
        align-baseline
      "
      style={{ minHeight: "1em" }}
    >
      <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
        {display}
      </span>
      <span
        className="ml-1 text-cyan-400 inline-block"
        style={{ width: "0.6ch" }}  // reserve cursor space
      >
        {showCursor ? "▍" : " "}
      </span>
    </span>
  );
}
export default function Portfolio() {
  const [status, setStatus] = useState("");
  const [openPost, setOpenPost] = useState<BlogPost>(null);

  // 🔥 ADD THESE
  const sections = ["projects", "experience", "blog", "certs", "contact"];
  const [activeSection, setActiveSection] = useState<string>("projects");
  const [menuOpen, setMenuOpen] = useState(false);

  // Your existing reveal animation effect
  useEffect(() => {
    const onScrollReveal = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) el.classList.add("show");
      });
    };
    onScrollReveal();
    window.addEventListener("scroll", onScrollReveal);
    return () => window.removeEventListener("scroll", onScrollReveal);
  }, []);

  // 🔥 ADD THIS SCROLL-SPY EFFECT
  useEffect(() => {
    const onScroll = () => {
      let current = "projects";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.target as HTMLFormElement;

    try {
      await emailjs.sendForm(
        "service_thxbm5g",
        "template_ob3syfr",
        form,
        "vXKAHCDsOIV6cMAPN"
      );

      setStatus("✅ Message sent successfully!");
      form.reset();
    } catch (error: any) {
  console.error("EmailJS error:", error);
  console.error("EmailJS error text:", error?.text);
  console.error("EmailJS status:", error?.status);
  setStatus("❌ Failed to send message. Please try again.");

    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-200 scroll-smooth">
      {/* Header */}
<header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
  <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    
    {/* Logo */}
    <a href="#" className="group flex items-center gap-2 font-extrabold tracking-tight text-lg">
      <span className="text-cyan-400 font-mono">&gt;_</span>
      <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
        Dhruv Verma
      </span>
      <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
        █
      </span>
    </a>

    {/* Desktop Nav */}
    <nav className="hidden md:flex gap-2">
      {[
        { href: "#projects", id: "projects", label: "Projects" },
        { href: "#experience", id: "experience", label: "Experience" },
        { href: "#blog", id: "blog", label: "Blog" },
        { href: "#certs", id: "certs", label: "Certifications" },
        { href: "#contact", id: "contact", label: "Contact" },
      ].map((item) => {
        const isActive = activeSection === item.id;

        return (
          <a
            key={item.id}
            href={item.href}
            className={`
              relative px-4 py-2 rounded-xl text-sm font-medium
              border transition-all
              ${
                isActive
                  ? "text-cyan-300 border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                  : "text-slate-300 border-white/10 bg-white/5 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-400/10"
              }
            `}
          >
            {item.label}
          </a>
        );
      })}
    </nav>

    {/* Mobile Hamburger */}
    <button
      onClick={() => setMenuOpen(true)}
      className="md:hidden text-slate-200 hover:text-cyan-400 transition"
    >
      ☰
    </button>
  </div>

  {/* Mobile Slide-out Menu */}
  <div
    className={`fixed inset-0 z-50 transition-all ${
      menuOpen ? "pointer-events-auto" : "pointer-events-none"
    }`}
  >
    {/* Backdrop */}
    <div
      onClick={() => setMenuOpen(false)}
      className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${
        menuOpen ? "opacity-100" : "opacity-0"
      }`}
    />

    {/* Panel */}
    <div
      className={`absolute right-0 top-0 h-full w-72 bg-slate-950 border-l border-white/10 p-6 transform transition-transform ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="font-bold text-cyan-400">Navigation</span>
        <button onClick={() => setMenuOpen(false)} className="text-slate-400 hover:text-white">
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {[
          { href: "#projects", id: "projects", label: "Projects" },
          { href: "#experience", id: "experience", label: "Experience" },
          { href: "#blog", id: "blog", label: "Blog" },
          { href: "#certs", id: "certs", label: "Certifications" },
          { href: "#contact", id: "contact", label: "Contact" },
        ].map((item) => {
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`
                px-4 py-3 rounded-xl border transition-all
                ${
                  isActive
                    ? "text-cyan-300 border-cyan-400/50 bg-cyan-400/10"
                    : "text-slate-300 border-white/10 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-400/10"
                }
              `}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  </div>
</header>

      {/* Hero */}
<section className="relative min-h-screen max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center overflow-hidden">

  {/* Grid Overlay */}
  <div className="absolute inset-0 pointer-events-none opacity-20">
    <div
      className="w-full h-full"
      style={{
        backgroundImage:
          "linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
  </div>

  {/* Subtle background glow */}
  <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
  <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

  {/* Left Content */}
  <div className="reveal relative z-10">
    <p className="uppercase text-cyan-400 tracking-widest text-xs font-bold mb-2">
      Cybersecurity & Forensics
    </p>

    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
  Hi, I’m <TypewriterName text="D hruv Verma" />
</h1>

    <p className="text-slate-300 mt-4 max-w-xl">
      CompTIA Security+ Certified • Cybersecurity Enthusiast • SOC, Risk & Security • Data-Driven Decision Making
    </p>

    <p className="text-slate-400 mt-2">
      B.Tech CSE (Cybersecurity & Forensics), UPES (2022–2026)
    </p>

    {/* Role badges */}
    <div className="flex flex-wrap gap-2 mt-5">
      {["SOC", "Blue Team", "Threat Intel", "Network Security", "IAM"].map((tag) => (
        <span
          key={tag}
          className="text-xs px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-300 bg-cyan-400/10 font-mono"
        >
          {tag}
        </span>
      ))}
    </div>

    {/* CTAs */}
    <div className="flex gap-4 mt-8 flex-wrap">
      <a
        href="/DhruvVerma-Resume.pdf"
        download
        className="group px-5 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-all flex items-center gap-2"
      >
        ⬇ Download Resume
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </a>

      <a
        href="#projects"
        className="px-5 py-3 rounded-xl border border-white/15 hover:bg-white/10 transition-all flex items-center gap-2"
      >
        🛠 View Projects
      </a>
    </div>
  </div>

  {/* Right Profile Card */}
  <div className="reveal relative z-10 p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl flex flex-col items-center text-center gap-6 shadow-lg">

    {/* Profile Image */}
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl animate-pulse" />
      <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.7)] relative">
        <img
          src="/profile2.png"
          alt="Dhruv Verma"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Secure Info Panel */}
    <div className="w-full space-y-4 text-slate-400 text-left">
      <AccessReveal icon="📍" label="Location" text="Delhi / Ghaziabad, India" />
      <AccessReveal icon="📞" label="Phone" text="+91 9667580400" />
      <AccessReveal icon="✉️" label="Email" text="dhruvverma.1877@gmail.com" />

      <div className="pt-2 text-center">
        <a
          href="https://linkedin.com/in/dhruvverma364"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-cyan-400 hover:underline font-mono"
        >
          🔗 linkedin.com/in/dhruv-verma
        </a>
      </div>
    </div>

    {/* Status badge */}
    <div className="mt-2 text-xs font-mono px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
      ● SYSTEM STATUS: OPEN TO INTERNSHIPS & FULL-TIME ROLES
    </div>
  </div>
</section>

      {/* Projects */}
<section id="projects" className="scroll-mt-24 max-w-6xl mx-auto px-6 py-20">
  <div className="flex items-center justify-between mb-10">
    <div>
      <h2 className="text-3xl font-bold text-cyan-400">Projects</h2>
      <p className="text-slate-400 text-sm mt-1 font-mono">
        Selected Security & Engineering Work
      </p>
    </div>
    <span className="text-xs text-slate-500 font-mono">STATUS: ACTIVE</span>
  </div>

  <div className="grid md:grid-cols-2 gap-8">
    {[
      {
        title: "Cognitive Honeypot for Cyber Attack Detection",
        icon: "🛡️",
        desc:
          "AI-enhanced honeypot platform designed to capture real-world attack behavior and convert it into actionable threat intelligence.",
        bullets: [
          "Deployed decoy services to attract real attackers",
          "Centralized logging for attack telemetry & analysis",
          "Automated reporting for SOC-style investigation",
          "Focused on reducing noise and improving signal quality",
        ],
        tags: ["Honeypot", "Threat Intel", "Python", "SIEM", "Blue Team"],
      },
      {
        title: "TraceLink — Geolocation Intelligence Platform",
        icon: "🌍",
        desc:
          "Network intelligence platform correlating IP geolocation with encrypted telemetry and anomaly detection.",
        bullets: [
          "Implemented AES-256 encrypted telemetry exchange",
          "Mapped IP metadata to geospatial insights",
          "Built basic anomaly detection heuristics",
          "Designed for security monitoring & investigation use-cases",
        ],
        tags: ["Python", "Crypto", "Telemetry", "Anomaly Detection", "Security"],
      },
      {
        title: "Secure Scout — Automated Vulnerability Scanner",
        icon: "🔎",
        desc:
          "Python-based vulnerability scanning workflow integrating Nmap with structured security reporting.",
        bullets: [
          "Automated host discovery and service enumeration",
          "Mapped findings to OWASP Top 10 categories",
          "Generated clean, analyst-friendly reports",
          "Reduced manual triage time for scan results",
        ],
        tags: ["Python", "Nmap", "OWASP", "Scanning", "AppSec"],
      },
      {
        title: "IoT Laser Tripwire IDS",
        icon: "📡",
        desc:
          "ESP8266-based perimeter intrusion detection system with real-time alerts and event logging.",
        bullets: [
          "Designed sensor-based intrusion detection workflow",
          "Implemented real-time alerting and logging",
          "Focused on reducing false triggers",
          "Built for low-cost, practical security deployments",
        ],
        tags: ["IoT", "IDS", "ESP8266", "Embedded", "Security"],
      },
    ].map((p) => (
      <div
        key={p.title}
        className="
          reveal group relative p-7 rounded-2xl border border-white/10 
          bg-gradient-to-br from-white/10 to-white/5 backdrop-blur
          transition-all duration-300
          hover:-translate-y-1 hover:border-cyan-400/40
          hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]
          overflow-hidden
        "
      >
        {/* Subtle scanline glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="text-3xl">{p.icon}</div>
          <h3 className="font-semibold text-lg text-slate-100">
            {p.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {p.desc}
        </p>

        {/* Bullet points */}
        <ul className="text-slate-400 text-sm space-y-1 mb-4 list-disc list-inside">
          {p.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full border border-cyan-400/30 text-cyan-300 bg-cyan-400/10 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Experience */}
<section id="experience" className="scroll-mt-24 max-w-6xl mx-auto px-6 py-20">
  <div className="flex items-center justify-between mb-10">
    <div>
      <h2 className="text-3xl font-bold text-cyan-400">Experience</h2>
      <p className="text-slate-400 text-sm mt-1 font-mono">
        Hands-on Industry Internships in Security & Infrastructure
      </p>
    </div>
    <span className="text-xs text-slate-500 font-mono">FIELD WORK • SECURITY • ANALYSIS</span>
  </div>

  <div className="space-y-10">

    {/* IBM */}
    <div className="
      reveal relative p-8 rounded-2xl border border-white/10 
      bg-gradient-to-br from-white/10 to-white/5 backdrop-blur
      transition-all duration-300
      hover:-translate-y-1 hover:border-cyan-400/40
      hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]
      overflow-hidden
    ">
      {/* Subtle scan glow */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent" />

      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h3 className="font-semibold text-xl text-slate-100">
            IBM — Cybersecurity & IoT Intern
          </h3>
          <span className="text-sm text-slate-400 font-mono">
            Jun 2025 – Jul 2025
          </span>
        </div>

        <p className="text-slate-400 mt-3">
          Worked on designing and implementing an{" "}
          <span className="text-cyan-300 font-medium">
            IoT-based Laser Tripwire Intrusion Detection System
          </span>{" "}
          focused on real-time detection, event logging, and alerting for
          perimeter security scenarios.
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm text-slate-400">
          <div>
            <p className="font-semibold text-slate-300 mb-2">🔁 Workflow</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Designed tripwire detection logic using ESP8266 microcontroller</li>
              <li>Captured intrusion events and transmitted telemetry to backend</li>
              <li>Built Python-based logging & alerting pipeline</li>
              <li>Stored events for analysis and incident review</li>
              <li>Fine-tuned thresholds to reduce false positives</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-slate-300 mb-2">🛠 Tech & Tools</p>
            <ul className="list-disc list-inside space-y-1">
              <li>ESP8266, IoT sensors, Python</li>
              <li>Logging & alerting scripts</li>
              <li>Basic anomaly detection logic</li>
              <li>Remote telemetry synchronization</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-slate-400 text-sm">
          <p className="font-semibold text-slate-300 mb-2">📈 Impact</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Improved intrusion detection reliability</li>
            <li>Reduced false triggers through calibration & filtering</li>
            <li>Delivered a working prototype for real-world perimeter monitoring</li>
          </ul>
        </div>
      </div>
    </div>

    {/* TP Power Plus */}
    <div className="
      reveal relative p-8 rounded-2xl border border-white/10 
      bg-gradient-to-br from-white/10 to-white/5 backdrop-blur
      transition-all duration-300
      hover:-translate-y-1 hover:border-cyan-400/40
      hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]
      overflow-hidden
    ">
      {/* Subtle scan glow */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent" />

      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h3 className="font-semibold text-xl text-slate-100">
            TP Power Plus — Network Security & Cloud Analyst Intern
          </h3>
          <span className="text-sm text-slate-400 font-mono">
            Jun 2025 – Jul 2025
          </span>
        </div>

        <p className="text-slate-400 mt-3">
          Worked on understanding and assessing the security posture of{" "}
          <span className="text-cyan-300 font-medium">
            AMI smart meter infrastructure
          </span>
          , focusing on network architecture review, access control analysis, and
          security documentation.
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm text-slate-400">
          <div>
            <p className="font-semibold text-slate-300 mb-2">🔁 Workflow</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Gained a strong understanding of AMI smart meter infrastructure</li>
              <li>Reviewed existing smart meter network architecture</li>
              <li>Analyzed network design from a security perspective</li>
              <li>Identified access control and remote connectivity gaps</li>
              <li>Documented security controls and compliance posture</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-slate-300 mb-2">🛠 Focus Areas</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Network security assessment</li>
              <li>Access control review</li>
              <li>Infrastructure security fundamentals</li>
              <li>Security documentation & compliance mapping</li>
              <li>Risk identification in enterprise environments</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-slate-400 text-sm">
          <p className="font-semibold text-slate-300 mb-2">📈 Impact</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Improved visibility into security gaps within smart meter infrastructure</li>
            <li>Contributed to clearer identification of risk areas in AMI deployments</li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</section>

      {/* Blog */}
<section id="blog" className="scroll-mt-24 max-w-6xl mx-auto px-6 py-20">
  <div className="flex items-center justify-between mb-10">
    <div>
      <h2 className="text-3xl font-bold text-cyan-400">Blog & Writeups</h2>
      <p className="text-slate-400 text-sm mt-1 font-mono">
        Security Notes • Threat Research • Practical Insights
      </p>
    </div>
    <span className="text-xs text-slate-500 font-mono">RESEARCH LOG</span>
  </div>

  <div className="grid md:grid-cols-2 gap-8">

    {/* Card 1 */}
    <div
      className="
        reveal relative p-7 rounded-2xl border border-white/10 
        bg-gradient-to-br from-white/10 to-white/5 backdrop-blur
        transition-all duration-300
        hover:-translate-y-1 hover:border-cyan-400/40
        hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]
        overflow-hidden
        group
      "
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent" />

      <div className="relative flex flex-col h-full">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {["Honeypots", "Threat Intel", "Blue Team", "SOC"].map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-2 text-slate-100">
            How Honeypots Help in Threat Intelligence 🕵️‍♂️🍯
          </h3>

          <p className="text-slate-400 text-sm">
            How honeypots turn real-world attacks into actionable threat intelligence
            and help security teams stay ahead of attackers.
          </p>
        </div>

        <button
          onClick={() => setOpenPost("honeypot")}
          className="mt-6 text-left text-cyan-400 font-semibold hover:underline font-mono"
        >
          Read full article →
        </button>
      </div>
    </div>

    {/* Card 2 */}
    <div
      className="
        reveal relative p-7 rounded-2xl border border-white/10 
        bg-gradient-to-br from-white/10 to-white/5 backdrop-blur
        transition-all duration-300
        hover:-translate-y-1 hover:border-cyan-400/40
        hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]
        overflow-hidden
        group
      "
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent" />

      <div className="relative flex flex-col h-full">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {["VPN", "Network Security", "Blue Team", "SOC"].map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-2 text-slate-100">
            Breaking Down VPN Security 🔐🌍
          </h3>

          <p className="text-slate-400 text-sm">
            What VPNs really protect, what they don’t, and why they should be part of
            a layered security strategy.
          </p>
        </div>

        <button
          onClick={() => setOpenPost("vpn")}
          className="mt-6 text-left text-cyan-400 font-semibold hover:underline font-mono"
        >
          Read full article →
        </button>
      </div>
    </div>

  </div>
</section>
      {/* Modal Overlay */}
{openPost && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    onClick={() => setOpenPost(null)}
  >
    <div
      className="
        relative bg-slate-950 text-slate-200 
        max-w-4xl w-full mx-4 
        rounded-2xl border border-white/10 
        shadow-[0_0_40px_rgba(34,211,238,0.15)]
        animate-[fadeIn_0.25s_ease-out]
        flex flex-col
      "
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/60 backdrop-blur sticky top-0 z-10">
        <span className="text-xs font-mono text-slate-400">
          SECURE DOCUMENT VIEWER
        </span>
        <button
          onClick={() => setOpenPost(null)}
          className="text-slate-400 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="max-h-[80vh] overflow-y-auto p-6 pr-4">

        {/* ================= HONEYPOT POST ================= */}
        {openPost === "honeypot" && (
          <div className="pr-2">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">
              How Honeypots Help in Threat Intelligence 🕵️‍♂️🍯
            </h2>

            <p className="text-slate-400 mb-4">
              In cybersecurity, most defenses are reactive. We wait for alerts, we investigate incidents, we patch, and we move on.
              But what if, instead of just waiting for attackers to show up, we invite them in—on our own terms?
            </p>

            <p className="text-slate-400 mb-4">
              That’s exactly what honeypots do.
            </p>

            <p className="text-slate-400 mb-4">
              A honeypot is a deliberately vulnerable system designed to look real, valuable, and tempting to attackers. But behind
              the scenes, it’s being carefully monitored. Every scan, every login attempt, every malicious command tells a story.
              And that story is pure gold for threat intelligence.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-cyan-300">
              Turning Attacks into Insights
            </h3>

            <p className="text-slate-400 mb-4">
              When an attacker interacts with a honeypot, they’re not just “hacking” a fake system—they’re revealing their tools,
              techniques, and intentions. You get to see:
            </p>

            <ul className="list-disc list-inside text-slate-400 mb-4 space-y-1">
              <li>What kinds of attacks are trending (bruteforce, malware drops, exploit attempts, etc.)</li>
              <li>Which vulnerabilities are being targeted the most</li>
              <li>What tools and scripts attackers are using in the wild</li>
              <li>How attackers move once they think they’re inside a system</li>
            </ul>

            <p className="text-slate-400 mb-4">
              This is real-world, hands-on threat data—not theory, not lab simulations.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-cyan-300">
              Why This Matters for Threat Intelligence
            </h3>

            <p className="text-slate-400 mb-4">
              Threat intelligence is all about understanding your enemy before they hit your real systems. Honeypots help you do
              exactly that by acting like early-warning radar.
            </p>

            <ul className="list-disc list-inside text-slate-400 mb-4 space-y-1">
              <li>Spot new attack patterns early</li>
              <li>Update detection rules (SIEM, IDS/IPS, EDR) with real attacker behavior</li>
              <li>Improve firewall rules, access controls, and monitoring strategies</li>
              <li>Build more realistic incident response playbooks</li>
            </ul>

            <p className="text-slate-400 mb-4">
              In short: honeypots turn unknown threats into known ones.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-cyan-300">
              The Psychological Edge
            </h3>

            <p className="text-slate-400 mb-4">
              There’s also something quietly satisfying about honeypots: attackers think they’re winning, but they’re actually
              teaching you how to defend better.
            </p>

            <p className="text-slate-400 mb-4">
              While your production systems stay isolated and safe, the honeypot absorbs the noise, the probes, and the attacks—
              acting like a decoy that protects the real assets and feeds your security team with valuable intelligence.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-cyan-300">
              Not Just for Big Companies
            </h3>

            <p className="text-slate-400 mb-4">
              Today, even students, researchers, and small security teams use honeypots to study attack behavior. From SSH honeypots
              logging brute-force attempts to web honeypots capturing exploit payloads, they’re an incredible learning and research
              tool—especially if you’re building projects in cybersecurity or threat research.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-cyan-300">
              The Big Picture
            </h3>

            <p className="text-slate-400 mb-2">
              Honeypots don’t replace traditional security controls. But they supercharge your understanding of threats. They shift
              you from a purely defensive mindset to a proactive, intelligence-driven one.
            </p>

            <p className="text-slate-400 font-semibold mb-2">
              You’re no longer just blocking attacks. You’re studying the attackers.
            </p>

            <p className="text-slate-400">
              And in cybersecurity, knowledge is one of the strongest defenses you can have.
            </p>
          </div>
        )}

        {/* ================= VPN POST ================= */}
        {openPost === "vpn" && (
          <div className="pr-2">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">
              Breaking Down VPN Security 🔐🌍
            </h2>

            <p className="text-slate-400 mb-4">
              “Just use a VPN.” We hear this advice everywhere—on tech blogs, in YouTube ads, even in casual conversations about
              privacy. But what does a VPN actually do for your security? And just as importantly—what does it not do?
            </p>

            <p className="text-slate-400 mb-4">
              Let’s break it down without the buzzwords.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-cyan-300">
              What a VPN Really Is
            </h3>

            <p className="text-slate-400 mb-4">
              At its core, a VPN (Virtual Private Network) creates a secure, encrypted tunnel between your device and a remote
              server. Instead of your internet traffic going directly from you to a website or service, it first passes through
              this tunnel.
            </p>

            <p className="text-slate-400 mb-4">
              Think of it like this:<br />
              Without a VPN, your data is like a postcard—anyone handling it along the way can peek at it.<br />
              With a VPN, your data is inside a sealed envelope—still delivered, but not easily readable by outsiders.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-cyan-300">
              What Problems a VPN Actually Solves
            </h3>

            <p className="text-slate-400 mb-4">
              A good VPN helps with:
            </p>

            <ul className="list-disc list-inside text-slate-400 mb-4 space-y-1">
              <li>Encryption of traffic, especially on public Wi-Fi (cafes, airports, hotels)</li>
              <li>Hiding your real IP address, adding a layer of privacy</li>
              <li>Safer remote access for employees connecting to company systems</li>
              <li>Reducing exposure to local network attacks like sniffing or MITM attempts</li>
            </ul>

            <p className="text-slate-400 mb-4">
              In short, a VPN protects your data in transit.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-cyan-300">
              What a VPN Does Not Do
            </h3>

            <p className="text-slate-400 mb-4">
              This part is important—and often misunderstood.
            </p>

            <p className="text-slate-400 mb-2">
              A VPN does not:
            </p>

            <ul className="list-disc list-inside text-slate-400 mb-4 space-y-1">
              <li>Make you anonymous on the internet</li>
              <li>Protect you from phishing or malicious websites</li>
              <li>Stop malware from infecting your system</li>
              <li>Fix weak passwords or poor security habits</li>
              <li>Make you “hack-proof”</li>
            </ul>

            <p className="text-slate-400 mb-4">
              If you log into a shady site, download malware, or reuse weak passwords, a VPN can’t save you. It’s not a magic
              shield—it’s just one security layer.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-cyan-300">
              VPN Security: It’s About Trust
            </h3>

            <p className="text-slate-400 mb-4">
              When you use a VPN, you’re shifting trust. Instead of trusting your ISP or the local network, you’re trusting the
              VPN provider. That’s why provider choice, logging policies, and encryption standards actually matter.
            </p>

            <p className="text-slate-400 mb-2">
              In enterprise environments, this is why organizations:
            </p>

            <ul className="list-disc list-inside text-slate-400 mb-4 space-y-1">
              <li>Use strong authentication (MFA, certificates)</li>
              <li>Enforce strict access policies</li>
              <li>Monitor VPN usage and logs</li>
              <li>Combine VPNs with Zero Trust and endpoint security</li>
            </ul>

            <p className="text-slate-400 mb-4">
              A VPN is most powerful when it’s part of a bigger security strategy—not the whole strategy.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-cyan-300">
              The Big Picture
            </h3>

            <p className="text-slate-400 mb-2">
              VPNs are not about being invisible. They’re about being safer, more private, and more controlled—especially when
              data is moving across untrusted networks.
            </p>

            <p className="text-slate-400 mb-2">
              Used properly, a VPN is a solid, practical security tool. Used blindly, it becomes a false sense of safety.
            </p>

            <p className="text-slate-400 font-semibold">
              Real security isn’t about one tool. It’s about layers, awareness, and smart choices.
            </p>
          </div>
        )}

      </div>
    </div>
  </div>
)}

      {/* Certifications — Timeline */}
<section id="certs" className="scroll-mt-24 max-w-6xl mx-auto px-6 py-16">
  <h2 className="text-3xl font-bold mb-2 text-cyan-400">Certifications</h2>
  <p className="text-slate-400 mb-10 max-w-2xl">
    A timeline of industry credentials validating my growth in cybersecurity and secure systems.
  </p>

  {[
    {
      year: "2026",
      items: [
        {
          name: "CompTIA Security+",
          org: "CompTIA",
          logo: "/certs/comptia.png",
          link: "https://cp.certmetrics.com/CompTIA/en/public/verify/credential/14d54d0a73064c5db3e883fbe1c19c89",
          featured: true,
          tag: "Professional",
        },
        {
          name: "HackerRank SQL",
          org: "HackerRank",
          logo: "/certs/hackerrank.png",
          link: "https://www.hackerrank.com/certificates/db70bd8f0c4e",
          tag: "Skill प्रमाण",
        },
      ],
    },
    {
      year: "2025",
      items: [
        {
          name: "Google Cybersecurity Professional",
          org: "Google",
          logo: "/certs/google.png",
          link: "https://www.coursera.org/account/accomplishments/specialization/X7A8OWJZD211",
          tag: "Professional",
        },
      ],
    },
    {
      year: "2024",
      items: [
        {
          name: "HackerRank Software Engineer",
          org: "HackerRank",
          logo: "/certs/hackerrank.png",
          link: "https://www.hackerrank.com/certificates/20dad540c2ed",
          tag: "Skill प्रमाण",
        },
        {
          name: "Cybersecurity Simulation",
          org: "Deloitte",
          logo: "/certs/deloitte.png",
          link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_G8MDEGHfgXbDNCeR3_1747287397083_completion_certificate.pdf",
          tag: "Simulation",
        },
        {
          name: "Cybersecurity Simulation",
          org: "Tata",
          logo: "/certs/tata.png",
          link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/gmf3ypEXBj2wvfQWC_ifobHAoMjQs9s6bKS_G8MDEGHfgXbDNCeR3_1744821350070_completion_certificate.pdf",
          tag: "Simulation",
        },
      ],
    },
  ].map((block) => (
    <div key={block.year} className="mb-12">
      {/* Year Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        <h3 className="text-xl font-bold text-slate-200 font-mono">
          {block.year}
        </h3>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Timeline Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pl-4">
        {block.items.map((cert) => (
          <a
            key={cert.name + cert.org}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group reveal relative p-6 rounded-2xl border 
              bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl
              transition-all duration-300 
              hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]
              ${cert.featured ? "border-cyan-400/60 shadow-[0_0_25px_rgba(34,211,238,0.35)]" : "border-white/10"}
            `}
          >
            {/* Featured Badge */}
            {cert.featured && (
              <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-yellow-400 text-black shadow-lg">
                ⭐ Featured
              </span>
            )}

            {/* Tag */}
            <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 font-mono">
              {cert.tag}
            </span>

            <div className="flex items-center gap-4 mt-6">
              {/* Logo */}
              <div className="relative">
                <div className="absolute inset-0 rounded bg-cyan-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src={cert.logo}
                  alt={cert.org}
                  className="relative w-12 h-12 object-contain bg-white rounded p-1 transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Text */}
              <div>
                <p className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {cert.name}
                </p>
                <p className="text-slate-400 text-sm">{cert.org}</p>
              </div>
            </div>

            {/* Verify Hint */}
            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">
                Verify Credential
              </span>
              <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">
                ↗
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  ))}
</section>

      {/* Contact */}
<section id="contact" className="scroll-mt-24 max-w-6xl mx-auto px-6 py-20 relative">
  {/* Subtle background glow */}
  <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
  <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

  <div className="relative z-10">
    <h2 className="text-3xl font-bold mb-2 text-cyan-400">Contact</h2>
    <p className="text-slate-400 mb-10 max-w-2xl">
      Whether it’s a project, internship, full-time role, or just a quick hello — my inbox is always open.
    </p>

    <div className="grid md:grid-cols-2 gap-10 items-start">
      {/* Left Info Panel */}
      <div className="reveal p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Let’s build something secure 👋</h3>
        <p className="text-slate-400 mb-6">
          I’m always interested in cybersecurity projects, internships, SOC roles, and security research collaborations.
          Feel free to reach out — I usually reply pretty fast 🙂
        </p>

        <div className="space-y-4 text-slate-300 font-mono text-sm">
          <div className="flex items-center gap-3">
            <span className="text-lg">📧</span>
            <ScrambleText text="dhruvverma.1877@gmail.com" />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-lg">📍</span>
            <span>Delhi / Ghaziabad, India</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-lg">💼</span>
            <span>Open to internships & full-time roles</span>
          </div>
        </div>

        {/* Status badge */}
        <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
          ● AVAILABLE FOR OPPORTUNITIES
        </div>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={sendMessage}
        className="reveal p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-lg space-y-5"
      >
        <div>
          <label className="block text-sm text-slate-400 mb-1">Your name</label>
          <input
            name="name"
            required
            placeholder="John Doe"
            className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Your email</label>
          <input
            name="email"
            required
            type="email"
            placeholder="john@example.com"
            className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Your message</label>
          <textarea
            name="message"
            required
            placeholder="Tell me about your project, role, or idea..."
            className="w-full px-4 py-2 rounded-xl bg-black/30 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 focus:outline-none min-h-[140px] transition"
          />
        </div>

        <button
          type="submit"
          className="group w-full px-5 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
        >
          Send Message
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>

        {status && (
          <p className="text-sm text-slate-400 mt-2">
            {status}
          </p>
        )}
      </form>
    </div>
  </div>
</section>

      <footer className="relative border-t border-white/10 bg-black/60 backdrop-blur py-10 mt-16">
  {/* Subtle glow */}
  <div className="absolute left-1/2 -top-10 w-72 h-20 -translate-x-1/2 bg-cyan-500/10 blur-3xl" />

  <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-sm">
    
    {/* Left: Copyright */}
    <div className="text-center md:text-left">
      <p className="font-medium">
        © {new Date().getFullYear()} <span className="text-slate-200">Dhruv Verma</span>
      </p>
      <p className="text-xs text-slate-500">
        Cybersecurity Portfolio • Built with a security-first mindset 🛡️
      </p>
    </div>

    {/* Center: Quick Links */}
    <div className="flex flex-wrap justify-center gap-4 text-xs">
      {["projects", "experience", "blog", "certs", "contact"].map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className="uppercase tracking-wider hover:text-cyan-400 transition-colors"
        >
          {id}
        </a>
      ))}
    </div>

    {/* Right: Social */}
    <div className="flex items-center gap-4">
      <a
        href="https://linkedin.com/in/dhruvverma364"
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
      >
        🔗 <span className="text-xs">LinkedIn</span>
      </a>
    </div>
  </div>

  {/* Bottom tiny line */}
  <div className="mt-6 text-center text-xs text-slate-500">
    Designed & developed by Dhruv Verma • Secured by good practices 😄
  </div>
</footer>
    </main>
  );
}