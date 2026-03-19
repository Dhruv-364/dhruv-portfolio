"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

import { portfolioData } from "./portfolioData";

type BlogSlug = (typeof portfolioData.blog.posts)[number]["slug"] | null;
const sectionIds = portfolioData.nav.map((item) => item.id);

function TypewriterName({ text, className = "text-white" }: { text: string; className?: string }) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleChars((current) => {
        if (current >= text.length) {
          clearInterval(interval);
          return current;
        }

        return current + 1;
      });
    }, 120);

    const cursorBlink = setInterval(() => {
      setShowCursor((current) => !current);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorBlink);
    };
  }, [text]);

  return (
    <span
      className="inline-flex items-baseline leading-none align-baseline"
      style={{ minHeight: "1em" }}
    >
      <span className={className}>{text.slice(0, visibleChars)}</span>
      <span className="ml-1 text-slate-400 inline-block" style={{ width: "0.6ch" }}>
        {showCursor ? "▍" : " "}
      </span>
    </span>
  );
}

function BlogContent({ slug }: { slug: Exclude<BlogSlug, null> }) {
  const post = portfolioData.blog.posts.find((item) => item.slug === slug);

  if (!post) return null;

  return (
    <article className="mx-auto max-w-3xl pr-2">
      <h2 className="text-3xl font-black mb-5 text-white">{post.title}</h2>

      {post.blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h3 key={`${post.slug}-heading-${index}`} className="text-xl font-semibold mt-8 mb-3 text-[#d8c09b]">
              {block.text}
            </h3>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={`${post.slug}-list-${index}`}
              className="list-disc list-inside text-slate-300 mb-5 space-y-2"
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <p
            key={`${post.slug}-paragraph-${index}`}
            className="text-slate-300 mb-5 whitespace-pre-line leading-8"
          >
            {block.text}
          </p>
        );
      })}
    </article>
  );
}

function SectionHeader({
  kicker,
  title,
  subtitle,
  status,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  status: string;
}) {
  return (
    <div className="scan-divider flex flex-col gap-5 md:flex-row md:items-end md:justify-between pb-6 mb-10">
      <div className="max-w-2xl">
        <p className="section-kicker mb-3">{kicker}</p>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">{title}</h2>
        <p className="text-[15px] md:text-base text-slate-400 mt-3">{subtitle}</p>
      </div>
      <div className="self-start md:self-end">
        <span className="warm-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-mono uppercase tracking-[0.22em]">
          <span className="pulse-line inline-block h-2 w-2 rounded-full bg-[rgba(240,196,141,0.9)]" />
          {status}
        </span>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [status, setStatus] = useState("");
  const [openPost, setOpenPost] = useState<BlogSlug>(null);
  const [activeSection, setActiveSection] = useState<string>(portfolioData.nav[0].id);
  const phoneHref = `tel:${portfolioData.hero.phone.replace(/\s+/g, "")}`;
  const emailHref = `mailto:${portfolioData.hero.email}`;

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

  useEffect(() => {
    const onScroll = () => {
      let current = sectionIds[0];

      sectionIds.forEach((id) => {
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
    } catch (error: unknown) {
      console.error("EmailJS error:", error);
      setStatus("❌ Failed to send message. Please try again.");
    }
  };

  return (
    <main className="min-h-screen text-slate-200 scroll-smooth">
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(2,7,11,0.72)] backdrop-blur-2xl">
        <div className="wide-frame px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 font-extrabold tracking-tight text-lg">
            <span className="flex h-10 min-w-[3.25rem] items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-3 text-slate-200 font-mono text-sm">
              {">_"}
            </span>
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {portfolioData.hero.name}
            </span>
          </a>

          <nav className="hidden md:flex gap-2">
            {portfolioData.nav.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium border transition-all ${
                    isActive
                      ? "text-white border-white/16 bg-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.16)]"
                      : "text-slate-300 border-white/10 bg-white/[0.03] hover:text-white hover:border-white/16 hover:bg-white/[0.07]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

        </div>
      </header>

      <section className="relative wide-frame px-6 pt-12 pb-24 md:pt-18 md:pb-28">
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

        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/6 blur-3xl" />
        <div className="absolute -bottom-24 right-[8%] h-80 w-80 rounded-full bg-[#f0c48d]/10 blur-3xl" />

        <div className="section-panel relative overflow-hidden rounded-[40px] px-7 py-8 md:px-10 md:py-10 xl:px-14 xl:py-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-[54%] hidden w-px bg-gradient-to-b from-transparent via-white/6 to-transparent xl:block" />
          <div className="relative z-10 hero-grid min-h-[64vh] items-center">
            <div className="reveal relative">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="section-kicker">{portfolioData.hero.eyebrow}</span>
              </div>

              <h1 className="cover-title max-w-4xl text-[3.3rem] text-white md:text-[5.2rem] xl:text-[5.6rem]">
                Hi, I&apos;m
                <span className="mt-3 block">
                  <TypewriterName
                    text={portfolioData.hero.name}
                    className="bg-gradient-to-r from-[#fff2b3] via-[#f0c96a] to-[#c9932f] bg-clip-text text-transparent"
                  />
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-[0.96rem] leading-7 text-slate-300 xl:text-[1rem] xl:leading-8">
                {portfolioData.hero.summary}
              </p>
              <p className="mt-2 whitespace-pre-line font-mono text-[12px] uppercase tracking-[0.08em] text-slate-400">
                {portfolioData.hero.education}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {portfolioData.hero.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] ${
                      index % 2 === 0
                        ? "border-cyan-400/30 bg-cyan-400/14 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.14)]"
                        : "border-[#f0c48d]/30 bg-[#f0c48d]/14 text-[#fff1d6] shadow-[0_0_18px_rgba(240,196,141,0.12)]"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={portfolioData.hero.primaryCta.href}
                  download={portfolioData.hero.primaryCta.download}
                  className="group rounded-full bg-white px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-slate-950 transition hover:bg-slate-100"
                >
                  {portfolioData.hero.primaryCta.label}
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>

                <a
                  href={portfolioData.hero.secondaryCta.href}
                  className="rounded-full border border-white/14 bg-white/[0.03] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-slate-100 transition hover:border-white/20 hover:bg-white/[0.08]"
                >
                  {portfolioData.hero.secondaryCta.label}
                </a>
              </div>

              <div className="mt-8 grid gap-2 md:grid-cols-3 md:max-w-[640px]">
                <div className="glass-band flex min-h-[74px] flex-col justify-center rounded-[16px] px-3 py-2.5 text-center">
                  <p className="section-kicker mb-1.5">Specialty</p>
                  <p className="text-[12px] text-white font-semibold leading-4">Security Research</p>
                </div>
                <div className="glass-band flex min-h-[74px] flex-col justify-center rounded-[16px] px-3 py-2.5 text-center">
                  <p className="section-kicker mb-1.5">Field</p>
                  <p className="text-[12px] text-white font-semibold leading-4">Blue Team / SOC</p>
                </div>
                <div className="glass-band flex min-h-[74px] flex-col justify-center rounded-[16px] px-3 py-2.5 text-center">
                  <p className="section-kicker mb-1.5">Availability</p>
                  <p className="text-[12px] text-white font-semibold leading-4">Open to roles</p>
                </div>
              </div>
            </div>

            <div className="reveal relative xl:pl-10">
              <div className="relative">
                <div className="absolute -inset-6 rounded-[38px] bg-gradient-to-br from-white/6 via-transparent to-[#f0c48d]/8 blur-2xl" />
                <div className="angled-card p-5 md:p-6 xl:p-7">
                  <div className="mb-6">
                    <div className="relative overflow-hidden rounded-[30px]">
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                      <div className="relative h-[15.6rem] w-full">
                        <Image
                          src={portfolioData.hero.profileImage.src}
                          alt={portfolioData.hero.profileImage.alt}
                          fill
                          sizes="(min-width: 1280px) 420px, 100vw"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 z-20 p-3.5">
                        <h3 className="text-[1.55rem] font-black text-white">{portfolioData.hero.name}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 border-t border-white/10 pt-3">
                    <a
                      href={phoneHref}
                      aria-label="Call phone number"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-[#f0c48d]/40 hover:bg-[#f0c48d]/12 hover:text-white"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 fill-current"
                      >
                        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24c1.12.37 2.33.56 3.59.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.26.19 2.47.56 3.59a1 1 0 0 1-.24 1l-2.2 2.2Z" />
                      </svg>
                    </a>
                    <a
                      href={emailHref}
                      aria-label="Send email"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-[#ea4335]/40 hover:bg-[#ea4335]/12 hover:text-white"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 fill-current"
                      >
                        <path d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25V6.75Zm2.2-.25 7.8 6.05 7.8-6.05a1.25 1.25 0 0 0-.55-.1H4.75c-.2 0-.39.03-.55.1Zm15.3 2.16-6.88 5.34a1 1 0 0 1-1.24 0L4.5 8.66v8.59c0 .69.56 1.25 1.25 1.25h13.5c.69 0 1.25-.56 1.25-1.25V8.66Z" />
                      </svg>
                    </a>
                    <a
                      href={portfolioData.hero.linkedinHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn profile"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/12 hover:text-white"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 fill-current"
                      >
                        <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19ZM8.34 10.61H5.67V18H8.34V10.61ZM7 6.38A1.56 1.56 0 1 0 7 9.5A1.56 1.56 0 1 0 7 6.38ZM18.33 13.5C18.33 11.14 17.82 9.32 15.06 9.32C13.73 9.32 12.85 10.05 12.49 10.75H12.45V10.61H9.89V18H12.56V14.34C12.56 13.37 12.74 12.43 13.94 12.43C15.12 12.43 15.14 13.53 15.14 14.4V18H17.81L18.33 13.5Z" />
                      </svg>
                    </a>
                  </div>

                  <div className="mx-auto mt-4 w-fit whitespace-nowrap rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-center text-[10px] font-mono uppercase tracking-[0.12em] text-green-300">
                    {portfolioData.hero.status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 wide-frame px-6 py-20 md:py-24">
        <div className="rounded-[34px] px-2 py-2 md:px-4 md:py-4">
          <SectionHeader
            kicker="Selected Systems"
            title={portfolioData.projects.title}
            subtitle={portfolioData.projects.subtitle}
            status={portfolioData.projects.status}
          />

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">
            {portfolioData.projects.items.map((project, index) => (
              <div
                key={project.title}
                className="angled-card reveal group flex h-full flex-col p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(0,0,0,0.22)]"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-2xl">
                      {project.icon}
                    </div>
                    <div>
                      <p className="section-kicker mb-2">System {String(index + 1).padStart(2, "0")}</p>
                      <h3 className="text-[1.55rem] md:text-[1.7rem] font-black text-white">{project.title}</h3>
                    </div>
                  </div>
                </div>

                <p className="mb-4 max-w-2xl text-sm leading-6 text-slate-300">{project.desc}</p>

                <ul className="mb-5 list-disc space-y-2 pl-5 text-sm text-slate-400 marker:text-[#d8c09b]">
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="pl-1">
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-chip rounded-full px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="scroll-mt-24 wide-frame px-6 py-20 md:py-24">
        <div className="rounded-[34px] px-2 py-2 md:px-4 md:py-4">
          <SectionHeader
            kicker="Operational Timeline"
            title={portfolioData.experience.title}
            subtitle={portfolioData.experience.subtitle}
            status={portfolioData.experience.status}
          />

        <div className="timeline-rail space-y-8 xl:space-y-12 pl-0 lg:pl-16">
          {portfolioData.experience.items.map((item) => (
            <div
              key={`${item.company}-${item.role}`}
              className="angled-card reveal p-6 md:p-7"
            >
              <div className="relative">
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="section-kicker mb-2">Experience</p>
                    <h3 className="text-2xl font-black text-white">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-base text-[#d8c09b]">
                      {item.company}
                    </p>
                  </div>
                  <span className="rounded-full border border-[#f0c48d]/25 bg-[#f0c48d]/10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] text-[#f0d7b2]">
                    {item.period}
                  </span>
                </div>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{item.summary}</p>

                <div className="mt-6 grid gap-6 text-sm text-slate-400 xl:grid-cols-2">
                  <div>
                    <p className="mb-3 font-semibold uppercase tracking-[0.16em] text-xs text-slate-200">How It Worked</p>
                    <ul className="space-y-2.5">
                      {item.workflow.map((entry) => (
                        <li key={entry} className="border-b border-white/6 pb-2 last:border-b-0 last:pb-0">
                          {entry}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-3 font-semibold uppercase tracking-[0.16em] text-xs text-slate-200">
                      {item.focusTitle}
                    </p>
                    <ul className="space-y-2.5">
                      {item.focusItems.map((entry) => (
                        <li key={entry} className="border-b border-white/6 pb-2 last:border-b-0 last:pb-0">
                          {entry}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 text-sm text-slate-300">
                  <p className="mb-3 font-semibold uppercase tracking-[0.16em] text-xs text-slate-200">Impact</p>
                  <div className="grid gap-3 md:grid-cols-3">
                    {item.impact.map((entry) => (
                      <div key={entry} className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
                        {entry}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section id="blog" className="scroll-mt-24 wide-frame px-6 py-20 md:py-24">
        <div className="rounded-[34px] px-2 py-2 md:px-4 md:py-4">
          <SectionHeader
            kicker="Research Journal"
            title={portfolioData.blog.title}
            subtitle={portfolioData.blog.subtitle}
            status={portfolioData.blog.status}
          />

          <div className="grid gap-8 md:grid-cols-2">
            {portfolioData.blog.posts.map((post, index) => (
              <div
                key={post.slug}
                className="angled-card reveal group flex h-full flex-col p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(0,0,0,0.2)]"
              >
                <div className="relative flex h-full flex-col">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <p className="section-kicker">Essay {String(index + 1).padStart(2, "0")}</p>
                    <span className="rounded-full border border-white/8 bg-white/[0.02] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-slate-400">
                      Article
                    </span>
                  </div>

                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tag}
                        className={`${tagIndex === 0 ? "warm-chip" : "tag-chip"} rounded-full px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em]`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="mb-2 text-[1.45rem] font-black text-white">{post.title}</h3>
                  <p className="flex-1 text-sm leading-6 text-slate-400">{post.excerpt}</p>

                  <button
                    onClick={() => setOpenPost(post.slug)}
                    className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-left text-slate-100 font-mono text-[11px] uppercase tracking-[0.14em] hover:bg-white/[0.06]"
                  >
                    Read article <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {openPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={() => setOpenPost(null)}
        >
          <div
            className="section-panel relative w-full max-w-5xl mx-4 rounded-[30px] border border-white/10 text-slate-200 shadow-[0_0_60px_rgba(255,255,255,0.08)] animate-[fadeIn_0.25s_ease-out] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-7 py-5 border-b border-white/10 bg-[rgba(8,12,18,0.82)] backdrop-blur-xl sticky top-0 z-10">
              <div>
                <p className="section-kicker mb-1">Secure Document Viewer</p>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Article Mode</p>
              </div>
              <button
                onClick={() => setOpenPost(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:text-white hover:border-white/20"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[80vh] overflow-y-auto px-7 py-8 md:px-10 md:py-10">
              <BlogContent slug={openPost} />
            </div>
          </div>
        </div>
      )}

      <section id="certs" className="scroll-mt-24 wide-frame px-6 py-20 md:py-24">
        <div className="rounded-[34px] px-2 py-2 md:px-4 md:py-4">
          <SectionHeader
            kicker="Verified Credentials"
            title={portfolioData.certifications.title}
            subtitle={portfolioData.certifications.subtitle}
            status="Verified Archive"
          />

        {portfolioData.certifications.groups.map((group) => (
          <div key={group.year} className="mb-10 last:mb-0">
            <div className="scan-divider flex items-center gap-3 mb-5 pb-4">
              <div className="h-2.5 w-2.5 rounded-full bg-[#d8c09b]" />
              <h3 className="text-2xl font-black text-white font-mono">{group.year}</h3>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {group.items.map((cert) => (
                <a
                  key={`${cert.name}-${cert.org}`}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`angled-card group reveal flex h-full flex-col p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)] ${
                    cert.featured
                      ? "ring-1 ring-white/14"
                      : ""
                  }`}
                >
                  {cert.featured && (
                    <span className="absolute top-4 right-4 warm-chip rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]">
                      Featured
                    </span>
                  )}

                  <span className="absolute top-4 left-4 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-slate-400">
                    {cert.tag}
                  </span>

                  <div className="mt-6 flex min-h-[72px] items-center gap-3">
                    <div className="relative rounded-2xl border border-white/10 bg-white p-1.5">
                      <Image
                        src={cert.logo}
                        alt={cert.org}
                        width={38}
                        height={38}
                        className="relative h-auto w-[38px] object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="font-editorial text-[1.2rem] text-white transition-colors">
                        {cert.name}
                      </p>
                      <p className="text-sm text-slate-400">{cert.org}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-5 text-sm">
                    <span className="text-slate-400 transition-colors uppercase tracking-[0.14em] text-[11px]">
                      Verify Credential
                    </span>
                    <span className="text-slate-200 group-hover:translate-x-1 transition-transform">↗</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 wide-frame px-6 py-16 md:py-18 relative">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="section-panel relative z-10 rounded-[34px] px-6 py-6 md:px-9 md:py-7 xl:px-12 xl:py-8">
          <div className="scan-divider mb-8 pb-5 text-center">
            <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              {portfolioData.contact.title}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-[15px] text-slate-400 md:text-base">
              {portfolioData.contact.intro}
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <form onSubmit={sendMessage} className="angled-card reveal p-6 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-mono uppercase tracking-[0.2em] text-slate-400">Your name</label>
                <input
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-mono uppercase tracking-[0.2em] text-slate-400">Your email</label>
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-mono uppercase tracking-[0.2em] text-slate-400">Your message</label>
                <textarea
                  name="message"
                  required
                  placeholder="Tell me about your project, role, or idea..."
                  className="min-h-[136px] w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 focus:outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-slate-100"
              >
                Send Message
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>

              {status && <p className="text-sm text-slate-400 mt-2">{status}</p>}
            </form>
          </div>
        </div>
      </section>

      <footer className="px-6 pb-14 pt-6">
        <div className="section-panel relative wide-frame rounded-[34px] px-7 py-8 md:px-12 xl:px-16">
          <div className="absolute left-1/2 top-0 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between text-slate-400 text-sm">
            <div className="text-center md:text-left">
              <p className="font-medium text-base">
                © {new Date().getFullYear()} <span className="text-white">{portfolioData.footer.name}</span>
              </p>
              <p className="text-xs text-slate-500 mt-2 uppercase tracking-[0.18em]">
                {portfolioData.footer.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-center text-xs">
              {portfolioData.nav.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="rounded-full border border-white/10 px-4 py-2 uppercase tracking-[0.16em] hover:border-white/18 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4">
              {portfolioData.footer.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition ${
                    social.label === "LinkedIn"
                      ? "hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/12 hover:text-white"
                      : "hover:border-[#ea4335]/40 hover:bg-[#ea4335]/12 hover:text-white"
                  }`}
                >
                  {social.label === "LinkedIn" ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19ZM8.34 10.61H5.67V18H8.34V10.61ZM7 6.38A1.56 1.56 0 1 0 7 9.5A1.56 1.56 0 1 0 7 6.38ZM18.33 13.5C18.33 11.14 17.82 9.32 15.06 9.32C13.73 9.32 12.85 10.05 12.49 10.75H12.45V10.61H9.89V18H12.56V14.34C12.56 13.37 12.74 12.43 13.94 12.43C15.12 12.43 15.14 13.53 15.14 14.4V18H17.81L18.33 13.5Z" />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25V6.75Zm2.2-.25 7.8 6.05 7.8-6.05a1.25 1.25 0 0 0-.55-.1H4.75c-.2 0-.39.03-.55.1Zm15.3 2.16-6.88 5.34a1 1 0 0 1-1.24 0L4.5 8.66v8.59c0 .69.56 1.25 1.25 1.25h13.5c.69 0 1.25-.56 1.25-1.25V8.66Z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center text-xs uppercase tracking-[0.18em] text-slate-500">
            {portfolioData.footer.bottomLine}
          </div>
        </div>
      </footer>
    </main>
  );
}
