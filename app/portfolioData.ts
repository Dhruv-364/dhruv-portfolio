export type NavItem = {
  href: string;
  id: string;
  label: string;
};

export type Project = {
  title: string;
  icon: string;
  desc: string;
  bullets: string[];
  tags: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  workflow: string[];
  focusTitle: string;
  focusItems: string[];
  impact: string[];
};

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  blocks: ArticleBlock[];
};

export type Certification = {
  name: string;
  org: string;
  logo: string;
  link: string;
  tag: string;
  featured?: boolean;
};

export type CertificationGroup = {
  year: string;
  items: Certification[];
};

export const portfolioData = {
  nav: [
    { href: "#projects", id: "projects", label: "Projects" },
    { href: "#experience", id: "experience", label: "Experience" },
    { href: "#blog", id: "blog", label: "Blog" },
    { href: "#certs", id: "certs", label: "Certifications" },
    { href: "#contact", id: "contact", label: "Contact" },
  ] satisfies NavItem[],
  hero: {
    eyebrow: "Cybersecurity & Forensics",
    name: "Dhruv Verma",
    summary:
      "CompTIA Security+ Certified | Cybersecurity Enthusiast | SOC, Risk & Security | Data-Driven Decision Making",
    education: "B.Tech CSE (Cybersecurity & Forensics), UPES (2022–2026)\nDelhi, India",
    tags: ["SOC", "Blue Team", "Threat Intel", "Network Security", "IAM"],
    primaryCta: {
      href: "/DhruvVerma-Resume.pdf",
      label: "⬇ Download Resume",
      download: true,
    },
    secondaryCta: {
      href: "#projects",
      label: "🛠 View Projects",
    },
    profileImage: {
      src: "/profile3.png",
      alt: "Dhruv Verma",
    },
    phone: "+91 9667580400",
    email: "dhruvverma.1877@gmail.com",
    linkedinHref: "https://linkedin.com/in/dhruvverma364",
    status: "OPEN TO INTERNSHIPS & FULL-TIME ROLES",
  },
  projects: {
    title: "Projects",
    subtitle: "Selected Security & Engineering Work",
    status: "STATUS: ACTIVE",
    items: [
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
    ] satisfies Project[],
  },
  experience: {
    title: "Experience",
    subtitle: "Hands-on Industry Internships in Security & Infrastructure",
    status: "FIELD WORK • SECURITY • ANALYSIS",
    items: [
      {
        company: "IBM",
        role: "Cybersecurity & IoT Intern",
        period: "Jun 2025 – Jul 2025",
        summary:
          "Worked on designing and implementing an IoT-based Laser Tripwire Intrusion Detection System focused on real-time detection, event logging, and alerting for perimeter security scenarios.",
        workflow: [
          "Designed tripwire detection logic using ESP8266 microcontroller",
          "Captured intrusion events and transmitted telemetry to backend",
          "Built Python-based logging & alerting pipeline",
          "Stored events for analysis and incident review",
          "Fine-tuned thresholds to reduce false positives",
        ],
        focusTitle: "🛠 Tech & Tools",
        focusItems: [
          "ESP8266, IoT sensors, Python",
          "Logging & alerting scripts",
          "Basic anomaly detection logic",
          "Remote telemetry synchronization",
        ],
        impact: [
          "Improved intrusion detection reliability",
          "Reduced false triggers through calibration & filtering",
          "Delivered a working prototype for real-world perimeter monitoring",
        ],
      },
      {
        company: "TP Power Plus",
        role: "Network Security & Cloud Analyst Trainee",
        period: "Jun 2025 – Jul 2025",
        summary:
          "Worked on understanding and assessing the security posture of AMI smart meter infrastructure, focusing on network architecture review, access control analysis, and security documentation.",
        workflow: [
          "Gained a strong understanding of AMI smart meter infrastructure",
          "Reviewed existing smart meter network architecture",
          "Analyzed network design from a security perspective",
          "Identified access control and remote connectivity gaps",
          "Documented security controls and compliance posture",
        ],
        focusTitle: "🛠 Focus Areas",
        focusItems: [
          "Network security assessment",
          "Access control review",
          "Infrastructure security fundamentals",
          "Security documentation & compliance mapping",
          "Risk identification in enterprise environments",
        ],
        impact: [
          "Improved visibility into security gaps within smart meter infrastructure",
          "Contributed to clearer identification of risk areas in AMI deployments",
        ],
      },
    ] satisfies Experience[],
  },
  blog: {
    title: "Insights & Writeups",
    subtitle: "Threat research, security observations, and practical notes from hands-on learning and analysis.",
    status: "RESEARCH LOG",
    posts: [
      {
        slug: "honeypot",
        title: "How Honeypots Help in Threat Intelligence 🕵️‍♂️🍯",
        excerpt:
          "How honeypots turn real-world attacks into actionable threat intelligence and help security teams stay ahead of attackers.",
        tags: ["Honeypots", "Threat Intel", "Blue Team", "SOC"],
        blocks: [
          {
            type: "paragraph",
            text: "In cybersecurity, most defenses are reactive. We wait for alerts, we investigate incidents, we patch, and we move on. But what if, instead of just waiting for attackers to show up, we invite them in on our own terms?",
          },
          { type: "paragraph", text: "That’s exactly what honeypots do." },
          {
            type: "paragraph",
            text: "A honeypot is a deliberately vulnerable system designed to look real, valuable, and tempting to attackers. But behind the scenes, it’s being carefully monitored. Every scan, every login attempt, every malicious command tells a story. And that story is pure gold for threat intelligence.",
          },
          { type: "heading", text: "Turning Attacks into Insights" },
          {
            type: "paragraph",
            text: "When an attacker interacts with a honeypot, they’re not just hacking a fake system. They’re revealing their tools, techniques, and intentions. You get to see:",
          },
          {
            type: "list",
            items: [
              "What kinds of attacks are trending (bruteforce, malware drops, exploit attempts, etc.)",
              "Which vulnerabilities are being targeted the most",
              "What tools and scripts attackers are using in the wild",
              "How attackers move once they think they’re inside a system",
            ],
          },
          {
            type: "paragraph",
            text: "This is real-world, hands-on threat data, not theory and not lab simulations.",
          },
          { type: "heading", text: "Why This Matters for Threat Intelligence" },
          {
            type: "paragraph",
            text: "Threat intelligence is all about understanding your enemy before they hit your real systems. Honeypots help you do exactly that by acting like early-warning radar.",
          },
          {
            type: "list",
            items: [
              "Spot new attack patterns early",
              "Update detection rules (SIEM, IDS/IPS, EDR) with real attacker behavior",
              "Improve firewall rules, access controls, and monitoring strategies",
              "Build more realistic incident response playbooks",
            ],
          },
          {
            type: "paragraph",
            text: "In short: honeypots turn unknown threats into known ones.",
          },
          { type: "heading", text: "The Psychological Edge" },
          {
            type: "paragraph",
            text: "There’s also something quietly satisfying about honeypots: attackers think they’re winning, but they’re actually teaching you how to defend better.",
          },
          {
            type: "paragraph",
            text: "While your production systems stay isolated and safe, the honeypot absorbs the noise, the probes, and the attacks, acting like a decoy that protects the real assets and feeds your security team with valuable intelligence.",
          },
          { type: "heading", text: "Not Just for Big Companies" },
          {
            type: "paragraph",
            text: "Today, even students, researchers, and small security teams use honeypots to study attack behavior. From SSH honeypots logging brute-force attempts to web honeypots capturing exploit payloads, they’re an incredible learning and research tool, especially if you’re building projects in cybersecurity or threat research.",
          },
          { type: "heading", text: "The Big Picture" },
          {
            type: "paragraph",
            text: "Honeypots don’t replace traditional security controls. But they supercharge your understanding of threats. They shift you from a purely defensive mindset to a proactive, intelligence-driven one.",
          },
          {
            type: "paragraph",
            text: "You’re no longer just blocking attacks. You’re studying the attackers.",
          },
          {
            type: "paragraph",
            text: "And in cybersecurity, knowledge is one of the strongest defenses you can have.",
          },
        ],
      },
      {
        slug: "vpn",
        title: "Breaking Down VPN Security 🔐🌍",
        excerpt:
          "What VPNs really protect, what they don’t, and why they should be part of a layered security strategy.",
        tags: ["VPN", "Network Security", "Blue Team", "SOC"],
        blocks: [
          {
            type: "paragraph",
            text: "“Just use a VPN.” We hear this advice everywhere, on tech blogs, in YouTube ads, even in casual conversations about privacy. But what does a VPN actually do for your security? And just as importantly, what does it not do?",
          },
          {
            type: "paragraph",
            text: "Let’s break it down without the buzzwords.",
          },
          { type: "heading", text: "What a VPN Really Is" },
          {
            type: "paragraph",
            text: "At its core, a VPN (Virtual Private Network) creates a secure, encrypted tunnel between your device and a remote server. Instead of your internet traffic going directly from you to a website or service, it first passes through this tunnel.",
          },
          {
            type: "paragraph",
            text: "Think of it like this:\nWithout a VPN, your data is like a postcard. Anyone handling it along the way can peek at it.\nWith a VPN, your data is inside a sealed envelope. Still delivered, but not easily readable by outsiders.",
          },
          { type: "heading", text: "What Problems a VPN Actually Solves" },
          {
            type: "paragraph",
            text: "A good VPN helps with:",
          },
          {
            type: "list",
            items: [
              "Encryption of traffic, especially on public Wi-Fi (cafes, airports, hotels)",
              "Hiding your real IP address, adding a layer of privacy",
              "Safer remote access for employees connecting to company systems",
              "Reducing exposure to local network attacks like sniffing or MITM attempts",
            ],
          },
          {
            type: "paragraph",
            text: "In short, a VPN protects your data in transit.",
          },
          { type: "heading", text: "What a VPN Does Not Do" },
          {
            type: "paragraph",
            text: "This part is important and often misunderstood.",
          },
          {
            type: "paragraph",
            text: "A VPN does not:",
          },
          {
            type: "list",
            items: [
              "Make you anonymous on the internet",
              "Protect you from phishing or malicious websites",
              "Stop malware from infecting your system",
              "Fix weak passwords or poor security habits",
              "Make you hack-proof",
            ],
          },
          {
            type: "paragraph",
            text: "If you log into a shady site, download malware, or reuse weak passwords, a VPN can’t save you. It’s not a magic shield. It’s just one security layer.",
          },
          { type: "heading", text: "VPN Security: It’s About Trust" },
          {
            type: "paragraph",
            text: "When you use a VPN, you’re shifting trust. Instead of trusting your ISP or the local network, you’re trusting the VPN provider. That’s why provider choice, logging policies, and encryption standards actually matter.",
          },
          {
            type: "paragraph",
            text: "In enterprise environments, this is why organizations:",
          },
          {
            type: "list",
            items: [
              "Use strong authentication (MFA, certificates)",
              "Enforce strict access policies",
              "Monitor VPN usage and logs",
              "Combine VPNs with Zero Trust and endpoint security",
            ],
          },
          {
            type: "paragraph",
            text: "A VPN is most powerful when it’s part of a bigger security strategy, not the whole strategy.",
          },
          { type: "heading", text: "The Big Picture" },
          {
            type: "paragraph",
            text: "VPNs are not about being invisible. They’re about being safer, more private, and more controlled, especially when data is moving across untrusted networks.",
          },
          {
            type: "paragraph",
            text: "Used properly, a VPN is a solid, practical security tool. Used blindly, it becomes a false sense of safety.",
          },
          {
            type: "paragraph",
            text: "Real security isn’t about one tool. It’s about layers, awareness, and smart choices.",
          },
        ],
      },
    ] satisfies BlogPost[],
  },
  certifications: {
    title: "Certifications",
    subtitle:
      "A curated record of industry credentials reflecting my growth in cybersecurity, secure systems, and practical technical capability.",
    groups: [
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
    ] satisfies CertificationGroup[],
  },
  contact: {
    title: "Get in Touch",
    intro:
      "For projects, internships, full-time opportunities, or meaningful collaborations, feel free to reach out. I’m always open to connecting.",
  },
  footer: {
    name: "Dhruv Verma",
    subtitle: "Portfolio",
    bottomLine: "Designed & developed by Dhruv Verma",
    socials: [
      {
        href: "https://linkedin.com/in/dhruvverma364",
        label: "LinkedIn",
      },
      {
        href: "mailto:dhruvverma.1877@gmail.com",
        label: "Gmail",
      },
    ],
  },
} as const;
