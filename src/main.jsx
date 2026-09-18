import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Edit3,
  LayoutDashboard,
  Lightbulb,
  Menu,
  Moon,
  PenLine,
  Play,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  firebaseReady,
  hydrateUser,
  loginUser,
  logoutUser,
  registerUser,
  watchAuth,
} from "./firebase";
import "./styles.css";

const creators = [
  {
    id: 1,
    name: "Maya Chen",
    role: "Brand designer & visual storyteller",
    category: "Design",
    skills: ["Brand identity", "Figma", "Art direction"],
    price: 85,
    rating: 4.9,
    reviews: 38,
    location: "Toronto, CA",
    initials: "MC",
    color: "peach",
    available: true,
    verified: true,
    image: "https://i.pravatar.cc/160?img=47",
    bio: "I help early-stage teams turn a good idea into a visual identity people remember. My process is collaborative, practical, and built for momentum.",
    services: [
      "Brand identity sprint",
      "Logo and visual system",
      "Pitch deck design",
    ],
    portfolio: ["Lumen Notes", "Kite Labs", "Common Ground"],
    responseTime: "Usually replies in 2h",
    languages: ["English", "Mandarin"],
  },
  {
    id: 2,
    name: "Arjun Mehta",
    role: "Full-stack builder for ambitious teams",
    category: "Coding",
    skills: ["React", "Node.js", "MVPs"],
    price: 65,
    rating: 5.0,
    reviews: 24,
    location: "Bengaluru, IN",
    initials: "AM",
    color: "mint",
    available: true,
    verified: true,
    image: "https://i.pravatar.cc/160?img=12",
    bio: "I build fast, thoughtful web products for founders who need a reliable technical partner from first prototype to launch day.",
    services: ["MVP development", "React web apps", "API integrations"],
    portfolio: ["StudyBuddy", "ParcelPilot", "Loop Finance"],
    responseTime: "Usually replies in 1h",
    languages: ["English", "Hindi"],
  },
  {
    id: 3,
    name: "Noah Williams",
    role: "Short-form video that stops the scroll",
    category: "Video",
    skills: ["Editing", "Motion", "TikTok"],
    price: 50,
    rating: 4.8,
    reviews: 51,
    location: "Austin, US",
    initials: "NW",
    color: "lavender",
    available: false,
    verified: true,
    image: "https://i.pravatar.cc/160?img=11",
    bio: "I turn raw footage into sharp, energetic short-form content that feels native to the platform and true to your voice.",
    services: ["Short-form editing", "Motion graphics", "Content repurposing"],
    portfolio: ["Northstar Coffee", "Motive Run Club", "Good News Daily"],
    responseTime: "Usually replies in 4h",
    languages: ["English", "Spanish"],
  },
  {
    id: 4,
    name: "Sofia Alvarez",
    role: "Your patient, practical study partner",
    category: "Tutoring",
    skills: ["Calculus", "Study plans", "SAT"],
    price: 30,
    rating: 4.9,
    reviews: 67,
    location: "Madrid, ES",
    initials: "SA",
    color: "yellow",
    available: true,
    verified: false,
    image: "https://i.pravatar.cc/160?img=32",
    bio: "I make intimidating subjects feel manageable. Together we build a study plan that fits your schedule, learning style, and goals.",
    services: ["Calculus tutoring", "SAT preparation", "Study planning"],
    portfolio: ["120+ tutoring hours", "SAT score +180", "Peer mentor"],
    responseTime: "Usually replies in 3h",
    languages: ["English", "Spanish"],
  },
  {
    id: 5,
    name: "Eli Brooks",
    role: "Words with a point of view",
    category: "Writing",
    skills: ["Copywriting", "Blogs", "SEO"],
    price: 42,
    rating: 4.7,
    reviews: 29,
    location: "London, UK",
    initials: "EB",
    color: "blue",
    available: true,
    verified: true,
    image: "https://i.pravatar.cc/160?img=68",
    bio: "I write clear, warm copy for products that have something meaningful to say, from landing pages to long-form thought leadership.",
    services: ["Website copy", "SEO blog posts", "Brand voice guide"],
    portfolio: ["Fieldwork Journal", "Onda Health", "Morrow Studio"],
    responseTime: "Usually replies in 2h",
    languages: ["English", "French"],
  },
  {
    id: 6,
    name: "Priya Nair",
    role: "Social strategy for the next big thing",
    category: "Social media",
    skills: ["Strategy", "Content", "Analytics"],
    price: 55,
    rating: 4.9,
    reviews: 43,
    location: "Mumbai, IN",
    initials: "PN",
    color: "pink",
    available: true,
    verified: true,
    image: "https://i.pravatar.cc/160?img=44",
    bio: "I help small teams show up consistently online without losing their personality. Strategy first, then content that earns attention.",
    services: ["Social strategy", "Monthly content plans", "Analytics review"],
    portfolio: ["Saffron Kitchen", "Moss & Co", "Her Campus Lab"],
    responseTime: "Usually replies in 3h",
    languages: ["English", "Hindi", "Malayalam"],
  },
  {
    id: 7,
    name: "Leo Park",
    role: "Producer, beatmaker, sound tinkerer",
    category: "Music",
    skills: ["Production", "Mixing", "Beats"],
    price: 60,
    rating: 4.8,
    reviews: 18,
    location: "Seoul, KR",
    initials: "LP",
    color: "mint",
    available: true,
    verified: false,
    image: "https://i.pravatar.cc/160?img=59",
    bio: "I produce warm, textured music for videos, games, and artists who want a sound that feels unmistakably theirs.",
    services: ["Original beats", "Song production", "Mixing and mastering"],
    portfolio: ["After Rain EP", "Mori Games", "Seoul Sessions"],
    responseTime: "Usually replies in 5h",
    languages: ["English", "Korean"],
  },
  {
    id: 8,
    name: "Amara Okafor",
    role: "Illustrations with a little mischief",
    category: "Design",
    skills: ["Illustration", "Procreate", "Editorial"],
    price: 48,
    rating: 4.9,
    reviews: 35,
    location: "Lagos, NG",
    initials: "AO",
    color: "peach",
    available: false,
    verified: true,
    image: "https://i.pravatar.cc/160?img=25",
    bio: "My illustrations bring a human, slightly playful edge to editorial stories, campaigns, and products that do not take themselves too seriously.",
    services: [
      "Editorial illustration",
      "Campaign artwork",
      "Custom icon sets",
    ],
    portfolio: ["Kinfolk Student", "Maji Water", "The Sunday Edit"],
    responseTime: "Usually replies in 6h",
    languages: ["English", "Yoruba"],
  },
  {
    id: 9,
    name: "Theo Martin",
    role: "Data made clear and useful",
    category: "Coding",
    skills: ["Python", "Data viz", "Dashboards"],
    price: 70,
    rating: 4.8,
    reviews: 22,
    location: "Paris, FR",
    initials: "TM",
    color: "lavender",
    available: true,
    verified: true,
    image: "https://i.pravatar.cc/160?img=60",
    bio: "I turn messy data into dashboards and stories that help teams make better decisions without needing a statistics degree.",
    services: ["Data dashboards", "Python analysis", "Data storytelling"],
    portfolio: ["Civic Pulse", "Transit Lens", "Open Climate Data"],
    responseTime: "Usually replies in 2h",
    languages: ["English", "French"],
  },
  {
    id: 10,
    name: "Jade Wilson",
    role: "A content calendar you will actually use",
    category: "Social media",
    skills: ["Instagram", "Growth", "Reels"],
    price: 38,
    rating: 4.7,
    reviews: 31,
    location: "Melbourne, AU",
    initials: "JW",
    color: "yellow",
    available: true,
    verified: false,
    image: "https://i.pravatar.cc/160?img=49",
    bio: "I build social systems people can actually keep up with: clear content pillars, scroll-stopping Reels, and growth you can measure.",
    services: ["Instagram strategy", "Reels packages", "Creator campaigns"],
    portfolio: ["Sunday Market", "Brightside Yoga", "Tiny Table"],
    responseTime: "Usually replies in 4h",
    languages: ["English", "Portuguese"],
  },
  {
    id: 11,
    name: "Samir Haddad",
    role: "Arabic-English translator & editor",
    category: "Writing",
    skills: ["Translation", "Editing", "Research"],
    price: 34,
    rating: 5.0,
    reviews: 16,
    location: "Amman, JO",
    initials: "SH",
    color: "blue",
    available: true,
    verified: true,
    image: "https://i.pravatar.cc/160?img=53",
    bio: "I help ideas travel across languages without losing their nuance. My work is careful, natural, and always edited by a human ear.",
    services: [
      "Arabic-English translation",
      "Copy editing",
      "Research support",
    ],
    portfolio: ["Amman Cultural Lab", "Atlas Journal", "Namaa Foundation"],
    responseTime: "Usually replies in 2h",
    languages: ["Arabic", "English", "French"],
  },
  {
    id: 12,
    name: "Rina Ito",
    role: "Product tutorials people finish",
    category: "Video",
    skills: ["YouTube", "Tutorials", "Voiceover"],
    price: 45,
    rating: 4.8,
    reviews: 27,
    location: "Tokyo, JP",
    initials: "RI",
    color: "pink",
    available: true,
    verified: true,
    image: "https://i.pravatar.cc/160?img=48",
    bio: "I make product tutorials that respect the viewer's time: clear scripts, calm voiceovers, and edits that make complicated tools click.",
    services: [
      "Product walkthroughs",
      "YouTube tutorials",
      "Voiceover editing",
    ],
    portfolio: ["Flowdesk Academy", "Nori App", "Maker Manual"],
    responseTime: "Usually replies in 3h",
    languages: ["English", "Japanese"],
  },
  {
    id: 13,
    name: "Lucas Silva",
    role: "Guitar lessons for curious beginners",
    category: "Music",
    skills: ["Guitar", "Songwriting", "Theory"],
    price: 25,
    rating: 4.9,
    reviews: 40,
    location: "São Paulo, BR",
    initials: "LS",
    color: "peach",
    available: true,
    verified: false,
    image: "https://i.pravatar.cc/160?img=68",
    bio: "I teach guitar through songs you actually want to play, with patient lessons that make theory feel useful instead of abstract.",
    services: [
      "Beginner guitar lessons",
      "Songwriting sessions",
      "Theory coaching",
    ],
    portfolio: ["40+ student songs", "Samba Sessions", "Open Mic Club"],
    responseTime: "Usually replies in 3h",
    languages: ["Portuguese", "English", "Spanish"],
  },
  {
    id: 14,
    name: "Fatima Zahra",
    role: "Make complex chemistry click",
    category: "Tutoring",
    skills: ["Chemistry", "IB", "Exam prep"],
    price: 32,
    rating: 4.9,
    reviews: 55,
    location: "Rabat, MA",
    initials: "FZ",
    color: "mint",
    available: true,
    verified: true,
    image: "https://i.pravatar.cc/160?img=45",
    bio: "I make chemistry less mysterious with visual explanations, exam strategies, and lessons designed around the way each student learns.",
    services: ["IB Chemistry", "Exam preparation", "Concept breakdowns"],
    portfolio: ["55+ five-star lessons", "IB mentor", "Science Club Lead"],
    responseTime: "Usually replies in 2h",
    languages: ["English", "Arabic", "French"],
  },
  {
    id: 15,
    name: "Ben Carter",
    role: "Tiny apps with a big point of view",
    category: "Coding",
    skills: ["JavaScript", "Prototypes", "UX"],
    price: 58,
    rating: 4.8,
    reviews: 19,
    location: "New York, US",
    initials: "BC",
    color: "lavender",
    available: false,
    verified: true,
    image: "https://i.pravatar.cc/160?img=3",
    bio: "I prototype small, opinionated products that help teams test an idea before spending months building the wrong thing.",
    services: ["Clickable prototypes", "JavaScript builds", "UX experiments"],
    portfolio: ["Habit Loop", "Campus Cart", "Signal Notes"],
    responseTime: "Usually replies in 5h",
    languages: ["English"],
  },
];
const categories = [
  "All creators",
  "Design",
  "Coding",
  "Video",
  "Tutoring",
  "Writing",
  "Music",
  "Social media",
];
const testimonials = [
  {
    quote:
      "I booked a designer on Tuesday and had a whole new brand by Friday. The quality is genuinely wild.",
    name: "Aisha Rahman",
    role: "Founder, Lumen Notes",
    initials: "AR",
    color: "peach",
  },
  {
    quote:
      "SkillSwap helped me turn the thing I was “pretty good at” into my first 10 paying clients.",
    name: "Diego Morales",
    role: "Creator & CS student",
    initials: "DM",
    color: "mint",
  },
  {
    quote:
      "The AI match was uncannily good. I found someone who understood the brief before I finished writing it.",
    name: "Nora Bennett",
    role: "Indie maker",
    initials: "NB",
    color: "lavender",
  },
];

function Avatar({ creator, small = false }) {
  return (
    <div className={`avatar ${creator.color} ${small ? "small" : ""}`}>
      {creator.image ? <img src={creator.image} alt="" /> : creator.initials}
    </div>
  );
}
function IconButton({ label, children, onClick, active }) {
  return (
    <button
      className={`icon-button ${active ? "active" : ""}`}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span className="logo-mark">
        <Sparkles size={15} fill="currentColor" />
      </span>
      <span>
        SkillSwap<span className="logo-ai">AI</span>
      </span>
    </div>
  );
}

function CreatorCard({
  creator,
  saved,
  comparing,
  onSave,
  onCompare,
  onBook,
  onView,
}) {
  return (
    <article className="creator-card">
      <div className="card-top">
        <div className="availability">
          {creator.available ? (
            <>
              <span className="status-dot" /> Available this week
            </>
          ) : (
            "Next available soon"
          )}
          <IconButton
            label={saved ? "Remove from saved" : "Save creator"}
            active={saved}
            onClick={() => onSave(creator.id)}
          >
            <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
          </IconButton>
        </div>
        <div className="profile-row">
          <Avatar creator={creator} />
          <div className="profile-copy">
            <h3>
              {creator.name}{" "}
              {creator.verified && (
                <ShieldCheck
                  className="verified"
                  size={15}
                  fill="currentColor"
                />
              )}
            </h3>
            <p>{creator.role}</p>
            <span className="location">{creator.location}</span>
          </div>
        </div>
      </div>
      <div className="skill-list">
        {creator.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
      <div className="card-bottom">
        <div className="rating">
          <Star size={14} fill="currentColor" />{" "}
          <strong>{creator.rating}</strong> <span>({creator.reviews})</span>
        </div>
        <div className="price">
          <span>from</span> ${creator.price}
          <small>/hr</small>
        </div>
      </div>
      <button
        className={`compare-toggle ${comparing ? "selected" : ""}`}
        onClick={() => onCompare(creator.id)}
      >
        {comparing ? "Added to compare" : "Compare creator"}
      </button>
      <div className="card-actions">
        <button className="button ghost" onClick={() => onView(creator)}>
          View profile <ArrowRight size={15} />
        </button>
        <button className="button dark" onClick={() => onBook(creator)}>
          Book <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}

const matchSignals = {
  Design: [
    "design",
    "designer",
    "brand",
    "branding",
    "logo",
    "visual",
    "figma",
    "illustration",
  ],
  Coding: [
    "code",
    "coding",
    "developer",
    "development",
    "app",
    "website",
    "react",
    "javascript",
    "python",
    "mvp",
  ],
  Video: [
    "video",
    "editing",
    "edit",
    "reel",
    "reels",
    "tiktok",
    "youtube",
    "motion",
  ],
  Tutoring: [
    "tutor",
    "tutoring",
    "study",
    "exam",
    "sat",
    "math",
    "calculus",
    "chemistry",
    "lesson",
  ],
  Writing: [
    "write",
    "writing",
    "copy",
    "copywriting",
    "blog",
    "seo",
    "content",
    "translation",
  ],
  Music: [
    "music",
    "song",
    "songwriting",
    "guitar",
    "beat",
    "beats",
    "production",
    "mixing",
  ],
  "Social media": [
    "social",
    "instagram",
    "growth",
    "analytics",
    "content calendar",
    "reels",
  ],
};

function getCreatorMatches(brief) {
  const normalizedBrief = brief.toLowerCase();
  const requestedBudget = normalizedBrief.match(/\$\s?(\d+)/)?.[1];
  const budget = requestedBudget ? Number(requestedBudget) : null;
  const words = normalizedBrief.split(/[^a-z0-9]+/).filter(Boolean);

  return creators
    .map((creator) => {
      const creatorText =
        `${creator.name} ${creator.role} ${creator.category} ${creator.skills.join(" ")}`.toLowerCase();
      const categorySignal = Object.entries(matchSignals).find(([, signals]) =>
        signals.some((signal) => normalizedBrief.includes(signal)),
      )?.[0];
      const matchedSkills = creator.skills.filter((skill) =>
        normalizedBrief.includes(skill.toLowerCase()),
      );
      const matchedWords = words.filter(
        (word) => word.length > 3 && creatorText.includes(word),
      );
      let score = 35 + creator.rating * 5;
      if (creator.available) score += 7;
      if (categorySignal === creator.category) score += 27;
      if (matchedSkills.length) score += matchedSkills.length * 12;
      score += Math.min(matchedWords.length * 3, 12);
      if (budget) score += creator.price <= budget ? 8 : -4;

      const reason = matchedSkills.length
        ? `Strong on ${matchedSkills.slice(0, 2).join(" + ")}`
        : categorySignal === creator.category
          ? `Specialist in ${creator.category.toLowerCase()}`
          : creator.role;

      return {
        ...creator,
        matchScore: Math.min(99, Math.round(score)),
        matchReason: `${reason}. ${creator.available ? "Available this week." : "Next opening soon."}`,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
}

function HeroMatchmaker({ onBook }) {
  const [brief, setBrief] = useState("");
  const [matches, setMatches] = useState([]);
  const [running, setRunning] = useState(false);

  const findMatches = () => {
    if (!brief.trim()) return;
    setRunning(true);
    window.setTimeout(() => {
      setMatches(getCreatorMatches(brief));
      setRunning(false);
    }, 550);
  };

  return (
    <div className="hero-matchmaker">
      <div className="hero-matchmaker-heading">
        <span className="ai-spark mini">
          <Sparkles size={14} />
        </span>
        <div>
          <p className="eyebrow">AI creator matchmaker</p>
          <strong>Describe the work. We’ll find the fit.</strong>
        </div>
      </div>
      <div className="hero-matchmaker-input">
        <input
          value={brief}
          onChange={(event) => setBrief(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && findMatches()}
          placeholder="e.g. Launch video for my climate app..."
          aria-label="Describe the project you need help with"
        />
        <button onClick={findMatches} disabled={!brief.trim() || running}>
          {running ? (
            <span className="button-spinner dark-spinner" />
          ) : (
            <Sparkles size={15} />
          )}
          {running ? "Matching..." : "Find my match"}
        </button>
      </div>
      {matches.length > 0 && (
        <div className="hero-match-results">
          {matches.slice(0, 2).map((creator) => (
            <button
              className="hero-match-result"
              key={creator.id}
              onClick={() => onBook(creator)}
            >
              <Avatar creator={creator} small />
              <span>
                <b>{creator.name}</b>
                <small>{creator.matchReason}</small>
              </span>
              <strong>{creator.matchScore}%</strong>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AIWorkbench({ onClose, onBook }) {
  const [mode, setMode] = useState("match");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(false);
  const [matches, setMatches] = useState([]);
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceCategory, setServiceCategory] = useState("Design");
  const [experience, setExperience] = useState("Intermediate");
  const [complexity, setComplexity] = useState("Standard");
  const modes = [
    { id: "match", icon: Target, label: "Find my match" },
    { id: "description", icon: PenLine, label: "Write my brief" },
    { id: "price", icon: TrendingUp, label: "Price my service" },
  ];
  const run = () => {
    if (!input.trim()) return;
    setIsRunning(true);
    window.setTimeout(() => {
      if (mode === "match") {
        setMatches(getCreatorMatches(input));
      } else if (mode === "description") {
        setGeneratedDescription(
          `I offer ${serviceTitle || input.trim()} for ambitious ${serviceCategory.toLowerCase()} projects. Expect thoughtful strategy, clear communication, and polished execution from brief to final delivery. My ${experience.toLowerCase()}-level process is built for ${complexity.toLowerCase()} projects that need work people are proud to share.`,
        );
      }
      setResult(true);
      setIsRunning(false);
    }, 650);
  };
  return (
    <div className="modal-backdrop">
      <div className="ai-modal">
        <button className="close" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="ai-header">
          <div className="ai-spark">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="eyebrow">SkillSwap AI workbench</p>
            <h2>
              Turn the blank page
              <br />
              <i>into momentum.</i>
            </h2>
          </div>
        </div>
        <div className="ai-tabs">
          {modes.map(({ id, icon: I, label }) => (
            <button
              key={id}
              className={mode === id ? "selected" : ""}
              onClick={() => {
                setMode(id);
                setResult(false);
                setMatches([]);
                setIsRunning(false);
              }}
            >
              <I size={17} />
              {label}
            </button>
          ))}
        </div>
        {!result ? (
          <>
            <label className="input-label">
              {mode === "match"
                ? "What are you trying to make?"
                : mode === "description"
                  ? "Tell us about the service"
                  : "What service do you offer?"}
            </label>
            {mode === "description" ? (
              <div className="ai-form-grid">
                <label className="input-label">
                  Service title
                  <input
                    value={serviceTitle}
                    onChange={(event) => setServiceTitle(event.target.value)}
                    placeholder="e.g. Brand identity sprint"
                  />
                </label>
                <label className="input-label">
                  Category
                  <select
                    value={serviceCategory}
                    onChange={(event) => setServiceCategory(event.target.value)}
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </label>
                <label className="input-label">
                  What does it include?
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="e.g. Logo, color palette, and a mini brand guide..."
                  />
                </label>
              </div>
            ) : mode === "price" ? (
              <div className="ai-form-grid pricing-fields">
                <label className="input-label">
                  Category
                  <select
                    value={serviceCategory}
                    onChange={(event) => setServiceCategory(event.target.value)}
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </label>
                <label className="input-label">
                  Experience
                  <select
                    value={experience}
                    onChange={(event) => setExperience(event.target.value)}
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Senior</option>
                  </select>
                </label>
                <label className="input-label">
                  Complexity
                  <select
                    value={complexity}
                    onChange={(event) => setComplexity(event.target.value)}
                  >
                    <option>Simple</option>
                    <option>Standard</option>
                    <option>Complex</option>
                  </select>
                </label>
                <label className="input-label">
                  Extra context
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="e.g. A two-week MVP with analytics..."
                  />
                </label>
              </div>
            ) : (
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. A launch video for my climate app..."
              />
            )}
            {mode === "match" && (
              <div className="ai-examples">
                <span>Try a brief:</span>
                {[
                  "Launch video for my app",
                  "React MVP under $70/hr",
                  "Brand identity for a café",
                ].map((example) => (
                  <button key={example} onClick={() => setInput(example)}>
                    {example}
                  </button>
                ))}
              </div>
            )}
            <button
              className="button coral full"
              onClick={run}
              disabled={!input.trim() || isRunning}
            >
              {isRunning ? (
                <span className="button-spinner" />
              ) : (
                <Sparkles size={16} />
              )}{" "}
              {isRunning
                ? "Thinking through the brief..."
                : mode === "match"
                  ? "Find my people"
                  : "Make it brilliant"}{" "}
              {!isRunning && <ArrowRight size={16} />}
            </button>
          </>
        ) : (
          <div className="ai-result">
            <div className="result-heading">
              <Check size={17} />{" "}
              {mode === "match"
                ? "3 thoughtful matches found"
                : "Here is a strong starting point"}
            </div>
            {mode === "match" ? (
              <div className="match-list">
                {matches.map((c) => (
                  <div className="match" key={c.id}>
                    <Avatar creator={c} small />
                    <div>
                      <strong>{c.name}</strong>
                      <span>{c.matchReason}</span>
                    </div>
                    <button className="match-book" onClick={() => onBook(c)}>
                      <b>{c.matchScore}%</b>
                      <span>match</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="generated-result">
                <p className="generated-copy">
                  {mode === "price"
                    ? `Suggested range: $${experience === "Senior" ? "65–95" : experience === "Advanced" ? "50–80" : experience === "Beginner" ? "20–40" : "35–65"}/hr. For a ${complexity.toLowerCase()} ${serviceCategory.toLowerCase()} project, anchor the quote around a clear first milestone.`
                    : `“${generatedDescription}”`}
                </p>
                {mode === "description" && (
                  <button
                    className="copy-button"
                    onClick={() =>
                      navigator.clipboard?.writeText(generatedDescription)
                    }
                  >
                    <Check size={14} /> Copy description
                  </button>
                )}
              </div>
            )}
            <button className="button dark full" onClick={onClose}>
              Explore the marketplace
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CompareModal({ creators: comparedCreators, onClose, onBook }) {
  return (
    <div className="modal-backdrop">
      <div className="compare-modal">
        <button
          className="close"
          onClick={onClose}
          aria-label="Close comparison"
        >
          <X size={20} />
        </button>
        <div className="compare-heading">
          <p className="eyebrow">Decision support</p>
          <h2>Compare your shortlist.</h2>
          <p>
            See the practical differences at a glance, then choose the creator
            who fits the brief and the budget.
          </p>
        </div>
        <div className="compare-grid">
          {comparedCreators.map((creator) => (
            <div className="compare-column" key={creator.id}>
              <Avatar creator={creator} />
              <h3>{creator.name}</h3>
              <span className="compare-role">
                {creator.category} · {creator.location}
              </span>
              <div className="compare-score">
                <Star size={14} fill="currentColor" /> {creator.rating}{" "}
                <span>({creator.reviews})</span>
              </div>
              <div className="compare-detail">
                <span>From</span>
                <strong>${creator.price}/hr</strong>
              </div>
              <div className="compare-detail">
                <span>Response</span>
                <strong>
                  {creator.responseTime.replace("Usually replies in ", "")}
                </strong>
              </div>
              <div className="compare-detail">
                <span>Availability</span>
                <strong>
                  {creator.available ? "This week" : "Next opening"}
                </strong>
              </div>
              <div className="compare-skills">
                {creator.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              <button
                className="button coral full"
                onClick={() => onBook(creator)}
              >
                Choose {creator.name.split(" ")[0]} <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileModal({ creator, onClose, onBook }) {
  return (
    <div className="modal-backdrop">
      <div className="profile-modal">
        <button className="close" onClick={onClose}>
          <X size={20} />
        </button>
        <div className={`profile-hero ${creator.color}`}>
          <Avatar creator={creator} />
          <div>
            <h2>
              {creator.name}{" "}
              {creator.verified && (
                <ShieldCheck
                  className="verified"
                  size={17}
                  fill="currentColor"
                />
              )}
            </h2>
            <p>{creator.role}</p>
            <span>
              {creator.location} · {creator.responseTime}
            </span>
          </div>
        </div>
        <div className="profile-body">
          <div>
            <h4>About the work</h4>
            <p>{creator.bio}</p>
            <div className="profile-services">
              {creator.services.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </div>
            <div className="portfolio-strip">
              {creator.portfolio.map((project, index) => (
                <div
                  className={`portfolio portfolio-${index + 1}`}
                  key={project}
                >
                  <span>{project}</span>
                </div>
              ))}
            </div>
            <p className="profile-languages">
              <strong>Languages:</strong> {creator.languages.join(" · ")}
            </p>
          </div>
          <aside>
            <div className="profile-stat">
              <Star size={15} fill="currentColor" /> <b>{creator.rating}</b>{" "}
              <span>{creator.reviews} reviews</span>
            </div>
            <div className="profile-stat">
              <Clock3 size={15} /> <span>From</span> <b>${creator.price}/hr</b>
            </div>
            <button
              className="button coral full"
              onClick={() => onBook(creator)}
            >
              Request a booking <ArrowRight size={16} />
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

function AuthModal({ onClose, onSuccess }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("Client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const nextUser = firebaseReady
        ? mode === "signup"
          ? await registerUser({ name, email, password, role })
          : await loginUser(email, password)
        : {
            uid: `demo-${Date.now()}`,
            name: mode === "signup" ? name : "Alex Morgan",
            email,
            role: mode === "signup" ? role : "Client",
          };
      onSuccess(nextUser);
    } catch (authError) {
      setError(
        authError.code === "auth/invalid-credential"
          ? "That email or password is not correct."
          : authError.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="auth-modal">
        <button className="close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        <div className="auth-intro">
          <div className="ai-spark">
            <Sparkles size={20} />
          </div>
          <p className="eyebrow">Join the swap</p>
          <h2>{mode === "login" ? "Welcome back." : "Make your move."}</h2>
          <p>
            {mode === "login"
              ? "Pick up where your next great collaboration left off."
              : "Find your people, share your skills, and make something useful."}
          </p>
        </div>
        <div className="auth-tabs">
          <button
            className={mode === "login" ? "selected" : ""}
            onClick={() => setMode("login")}
          >
            Log in
          </button>
          <button
            className={mode === "signup" ? "selected" : ""}
            onClick={() => setMode("signup")}
          >
            Create account
          </button>
        </div>
        <form onSubmit={submit} className="auth-form">
          {mode === "signup" && (
            <label>
              Your name
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Alex Morgan"
              />
            </label>
          )}
          <label>
            Email address
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password
            <input
              required
              minLength={6}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="6+ characters"
            />
          </label>
          {mode === "signup" && (
            <div>
              <span className="auth-label">I am joining as a...</span>
              <div className="role-picker">
                {[
                  ["Client", "I need great work"],
                  ["Creator", "I offer great work"],
                ].map(([value, description]) => (
                  <button
                    type="button"
                    key={value}
                    className={role === value ? "selected" : ""}
                    onClick={() => setRole(value)}
                  >
                    <strong>{value}</strong>
                    <span>{description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {error && <p className="auth-error">{error}</p>}
          {!firebaseReady && (
            <p className="auth-demo-note">
              Demo mode is active. Add Firebase environment variables for live
              accounts.
            </p>
          )}
          <button className="button coral full" disabled={loading}>
            {loading
              ? "One moment..."
              : mode === "login"
                ? "Log in"
                : "Create my account"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
}

export function App() {
  const [theme, setTheme] = useState("light");
  const [activeCategory, setActiveCategory] = useState("All creators");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState([1, 6, 12]);
  const [compareIds, setCompareIds] = useState([]);
  const [modal, setModal] = useState(null);
  const [bookings, setBookings] = useState([creators[1], creators[4]]);
  const [notice, setNotice] = useState("");
  const [view, setView] = useState("home");
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    if (!firebaseReady) {
      setAuthLoading(false);
      return undefined;
    }
    return watchAuth(async (firebaseUser) => {
      setUser(firebaseUser ? await hydrateUser(firebaseUser) : null);
      setAuthLoading(false);
    });
  }, []);
  const filtered = useMemo(
    () =>
      creators.filter(
        (c) =>
          (activeCategory === "All creators" ||
            c.category === activeCategory) &&
          `${c.name} ${c.role} ${c.skills.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [activeCategory, query],
  );
  const searchSuggestions = useMemo(() => {
    if (!query.trim()) return [];
    const normalizedQuery = query.toLowerCase();
    const categorySuggestions = categories
      .slice(1)
      .filter((category) => category.toLowerCase().includes(normalizedQuery))
      .map((category) => ({ type: "category", label: category }));
    const creatorSuggestions = creators
      .filter((creator) =>
        `${creator.name} ${creator.role}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
      .slice(0, 3)
      .map((creator) => ({ type: "creator", label: creator.name, creator }));
    return [...categorySuggestions, ...creatorSuggestions].slice(0, 4);
  }, [query]);
  const save = (id) => {
    const wasSaved = saved.includes(id);
    setSaved((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );
    setNotice(
      wasSaved ? "Removed from your shortlist" : "Saved to your shortlist",
    );
    window.setTimeout(() => setNotice(""), 2200);
  };
  const toggleCompare = (id) => {
    setCompareIds((current) =>
      current.includes(id)
        ? current.filter((currentId) => currentId !== id)
        : current.length < 3
          ? [...current, id]
          : current,
    );
    if (!compareIds.includes(id) && compareIds.length >= 3) {
      setNotice("Compare up to 3 creators at a time");
      window.setTimeout(() => setNotice(""), 2200);
    }
  };
  const book = (creator) => {
    setBookings((current) => [...current, creator]);
    setModal({ type: "booked", creator });
  };
  const handleLogin = async () => {
    if (user) {
      await logoutUser();
      setUser(null);
      setView("home");
      return;
    }
    setModal({ type: "auth" });
  };
  const handleAuthSuccess = (nextUser) => {
    setUser(nextUser);
    setModal(null);
  };
  return (
    <div className={`app ${theme}`}>
      <header className="site-header" id="top">
        <Logo />
        <nav className={menu ? "open" : ""}>
          <button
            onClick={() => {
              setView("home");
              setMenu(false);
            }}
          >
            Find talent
          </button>
          <button onClick={() => setModal({ type: "ai" })}>
            AI assistant <span className="new-pill">NEW</span>
          </button>
          <button
            onClick={() =>
              user ? setView("dashboard") : setModal({ type: "auth" })
            }
          >
            Dashboard
          </button>
        </nav>
        <div className="header-actions">
          <IconButton
            label="Toggle theme"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </IconButton>
          {user ? (
            <button className="user-chip" onClick={handleLogin} title="Log out">
              <span>{user.name?.slice(0, 2).toUpperCase()}</span>
              {user.name}
              <ChevronDown size={15} />
            </button>
          ) : (
            <button
              className="login-button"
              onClick={handleLogin}
              disabled={authLoading}
            >
              Log in <ArrowRight size={15} />
            </button>
          )}
          <IconButton label="Open menu" onClick={() => setMenu(!menu)}>
            <Menu size={20} />
          </IconButton>
        </div>
      </header>
      {view === "dashboard" && user ? (
        <Dashboard
          user={user}
          bookings={bookings}
          saved={saved}
          onBack={() => setView("home")}
          onAI={() => setModal({ type: "ai" })}
        />
      ) : (
        <>
          <main>
            <section className="hero">
              <div className="hero-copy">
                <div className="kicker">
                  <span className="pulse" /> The student-powered marketplace
                </div>
                <h1>
                  Good work,
                  <br />
                  <em>swapped.</em>
                </h1>
                <p>
                  Find the sharp minds behind the next big thing. Or become one.
                </p>
                <div className="hero-buttons">
                  <button
                    className="button coral"
                    onClick={() =>
                      document
                        .getElementById("marketplace")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Explore creators <ArrowRight size={17} />
                  </button>
                  <button
                    className="text-button"
                    onClick={() => setModal({ type: "ai" })}
                  >
                    <Sparkles size={17} /> Find my perfect match
                  </button>
                </div>
                <div className="social-proof">
                  <div className="avatar-stack">
                    {creators.slice(0, 4).map((c) => (
                      <Avatar key={c.id} creator={c} small />
                    ))}
                  </div>
                  <div>
                    <div className="rating">
                      <Star size={13} fill="currentColor" /> <b>4.9/5</b>
                    </div>
                    <span>from 2,400+ happy swaps</span>
                  </div>
                </div>
                <HeroMatchmaker onBook={book} />
              </div>
              <div className="hero-art">
                <div className="art-note note-one">
                  <Sparkles size={17} />
                  <span>
                    Make something
                    <br />
                    <b>worth sharing.</b>
                  </span>
                </div>
                <div className="art-note note-two">
                  <span className="mini-line" />
                  <span>
                    Creators who
                    <br />
                    <b>get it.</b>
                  </span>
                </div>
                <div className="art-circle">
                  <div className="circle-inner">
                    <Play size={29} fill="currentColor" />
                  </div>
                </div>
                <div className="art-caption">
                  01 <span /> built for the in-betweeners
                </div>
              </div>
            </section>
            <section className="ticker">
              <span>Creators with range</span>
              <span>↓</span>
              <span>Projects with purpose</span>
              <span>↓</span>
              <span>Skills that travel</span>
              <span>↓</span>
              <span>Ideas into action</span>
            </section>
            <section className="proof-section">
              <div className="proof-intro">
                <p className="eyebrow">The network is moving</p>
                <h2>
                  Small teams.
                  <br />
                  <i>Big momentum.</i>
                </h2>
                <p>
                  SkillSwap gives ambitious people a faster way to find the
                  exact skill their next idea needs.
                </p>
              </div>
              <div className="proof-stats">
                <div>
                  <strong>2.4k</strong>
                  <span>successful swaps</span>
                </div>
                <div>
                  <strong>15</strong>
                  <span>skill categories</span>
                </div>
                <div>
                  <strong>4.9/5</strong>
                  <span>average rating</span>
                </div>
                <div>
                  <strong>38</strong>
                  <span>countries represented</span>
                </div>
              </div>
            </section>
            <section className="featured-section">
              <div className="section-heading compact">
                <div>
                  <p className="eyebrow">Handpicked this week</p>
                  <h2>
                    Meet the
                    <br />
                    <i>standouts.</i>
                  </h2>
                </div>
                <div className="heading-side">
                  <p>
                    Three creators with the range, reliability, and point of
                    view to move your project forward.
                  </p>
                  <button
                    className="text-button"
                    onClick={() =>
                      document
                        .getElementById("marketplace")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Browse all creators <ArrowRight size={16} />
                  </button>
                </div>
              </div>
              <div className="featured-grid">
                {creators.slice(0, 3).map((creator) => (
                  <CreatorCard
                    key={creator.id}
                    creator={creator}
                    saved={saved.includes(creator.id)}
                    comparing={compareIds.includes(creator.id)}
                    onSave={save}
                    onCompare={toggleCompare}
                    onBook={book}
                    onView={(nextCreator) =>
                      setModal({ type: "profile", creator: nextCreator })
                    }
                  />
                ))}
              </div>
            </section>
            <section className="marketplace" id="marketplace">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">The marketplace</p>
                  <h2>
                    Meet the people
                    <br />
                    <i>behind the work.</i>
                  </h2>
                </div>
                <div className="heading-side">
                  <p>
                    Every creator here is learning, building, and making an
                    impact. Find your next collaborator.
                  </p>
                  <button
                    className="text-button"
                    onClick={() => setModal({ type: "ai" })}
                  >
                    Let AI guide me <Sparkles size={16} />
                  </button>
                </div>
              </div>
              <div className="market-controls">
                <div className="search-box">
                  <Search size={18} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search skills, names, or vibes..."
                  />
                  {searchSuggestions.length > 0 && (
                    <div className="search-suggestions">
                      {searchSuggestions.map((suggestion) => (
                        <button
                          key={`${suggestion.type}-${suggestion.label}`}
                          onClick={() => {
                            setQuery(suggestion.label);
                            if (suggestion.type === "category")
                              setActiveCategory(suggestion.label);
                          }}
                        >
                          {suggestion.type === "category" ? (
                            <Compass size={14} />
                          ) : (
                            <Search size={14} />
                          )}
                          <span>{suggestion.label}</span>
                          <small>
                            {suggestion.type === "category"
                              ? "Category"
                              : "Creator"}
                          </small>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="filter-scroll">
                  {categories.map((c) => (
                    <button
                      key={c}
                      className={activeCategory === c ? "active" : ""}
                      onClick={() => setActiveCategory(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              {compareIds.length > 0 && (
                <div className="compare-tray">
                  <div>
                    <strong>
                      {compareIds.length} creator
                      {compareIds.length === 1 ? "" : "s"} shortlisted
                    </strong>
                    <span>Add up to 3 to make a confident choice.</span>
                  </div>
                  <button
                    className="button dark"
                    onClick={() => setModal({ type: "compare" })}
                    disabled={compareIds.length < 2}
                  >
                    Compare now <ArrowRight size={15} />
                  </button>
                </div>
              )}
              <div className="creator-grid">
                {filtered.map((c) => (
                  <CreatorCard
                    key={c.id}
                    creator={c}
                    saved={saved.includes(c.id)}
                    comparing={compareIds.includes(c.id)}
                    onSave={save}
                    onCompare={toggleCompare}
                    onBook={book}
                    onView={(creator) => setModal({ type: "profile", creator })}
                  />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="empty-state">
                  <Search size={28} />
                  <h3>No perfect match yet.</h3>
                  <p>
                    Try a different keyword or ask our AI assistant to help.
                  </p>
                  <button
                    className="button coral"
                    onClick={() => setModal({ type: "ai" })}
                  >
                    Ask AI <Sparkles size={15} />
                  </button>
                </div>
              )}
              <div className="browse-all">
                <span>Showing {filtered.length} of 15 creators</span>
                <button
                  className="button dark"
                  onClick={() => {
                    setActiveCategory("All creators");
                    setQuery("");
                  }}
                >
                  View everyone <ArrowRight size={16} />
                </button>
              </div>
            </section>
            <section className="ai-banner">
              <div className="ai-banner-icon">
                <Sparkles size={25} />
              </div>
              <div>
                <p className="eyebrow">A little help, when you need it</p>
                <h2>Not sure where to start?</h2>
                <p>
                  Tell us what you are making. Our AI will find the right human
                  to help.
                </p>
              </div>
              <button
                className="button light"
                onClick={() => setModal({ type: "ai" })}
              >
                Meet your match <ArrowRight size={16} />
              </button>
            </section>
            <section className="ai-advantage-section">
              <div className="section-heading compact">
                <div>
                  <p className="eyebrow">Why SkillSwap AI?</p>
                  <h2>
                    Better decisions,
                    <br />
                    <i>made human.</i>
                  </h2>
                </div>
                <p className="heading-side">
                  AI handles the searching, shaping, and sense-making. People do
                  the work that makes it matter.
                </p>
              </div>
              <div className="ai-advantage-grid">
                <div>
                  <div className="advantage-icon">
                    <Target size={18} />
                  </div>
                  <b>Match with context</b>
                  <p>
                    Recommendations use your brief, budget, skills,
                    availability, and creator track record.
                  </p>
                </div>
                <div>
                  <div className="advantage-icon mint-advantage">
                    <PenLine size={18} />
                  </div>
                  <b>Start with clarity</b>
                  <p>
                    Turn a half-formed service idea into a polished brief or a
                    service page in seconds.
                  </p>
                </div>
                <div>
                  <div className="advantage-icon yellow-advantage">
                    <TrendingUp size={18} />
                  </div>
                  <b>Price with confidence</b>
                  <p>
                    See a practical range based on experience, category, and
                    project complexity before you book.
                  </p>
                </div>
              </div>
            </section>
            <section className="how-section" id="how-it-works">
              <div className="section-heading compact">
                <div>
                  <p className="eyebrow">The good stuff</p>
                  <h2>
                    More than a<br />
                    <i>transaction.</i>
                  </h2>
                </div>
                <p className="heading-side">
                  The best work happens when talented people find each other at
                  exactly the right moment.
                </p>
              </div>
              <div className="feature-grid">
                <div className="feature-card feature-coral">
                  <span className="feature-number">01</span>
                  <Users size={26} />
                  <h3>
                    Human first,
                    <br />
                    always.
                  </h3>
                  <p>
                    Real people with real skills. No agency layers, no mystery.
                    Just good work between humans.
                  </p>
                </div>
                <div className="feature-card feature-yellow">
                  <span className="feature-number">02</span>
                  <Compass size={26} />
                  <h3>
                    Find your
                    <br />
                    people.
                  </h3>
                  <p>
                    Search by skill, style, or a feeling. Our marketplace makes
                    the right fit feel obvious.
                  </p>
                </div>
                <div className="feature-card feature-mint">
                  <span className="feature-number">03</span>
                  <Zap size={26} />
                  <h3>
                    Make moves
                    <br />
                    together.
                  </h3>
                  <p>
                    Simple bookings, clear expectations, and the space to make
                    something you are proud of.
                  </p>
                </div>
              </div>
            </section>
            <section className="voices" id="voices">
              <div className="voices-heading">
                <p className="eyebrow">In their words</p>
                <h2>
                  Good things
                  <br />
                  <i>are happening.</i>
                </h2>
                <div className="voice-controls">
                  <IconButton
                    label="Previous testimonial"
                    onClick={() =>
                      document
                        .querySelector(
                          ".testimonial-grid blockquote:first-child",
                        )
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                        })
                    }
                  >
                    <ArrowRight
                      size={17}
                      style={{ transform: "rotate(180deg)" }}
                    />
                  </IconButton>
                  <IconButton
                    label="Next testimonial"
                    onClick={() =>
                      document
                        .querySelector(
                          ".testimonial-grid blockquote:last-child",
                        )
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                        })
                    }
                  >
                    <ArrowRight size={17} />
                  </IconButton>
                </div>
              </div>
              <div className="testimonial-grid">
                {testimonials.map((t) => (
                  <blockquote key={t.name}>
                    <div className="quote-mark">“</div>
                    <p>{t.quote}</p>
                    <footer>
                      <div className={`avatar ${t.color} small`}>
                        {t.initials}
                      </div>
                      <div>
                        <strong>{t.name}</strong>
                        <span>{t.role}</span>
                      </div>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>
          </main>
          <footer className="site-footer">
            <div className="footer-top">
              <div>
                <Logo />
                <p>
                  Good work, swapped.
                  <br />
                  Built for the in-betweeners.
                </p>
                <div className="socials">
                  <Sparkles size={17} />
                  <Users size={17} />
                  <Compass size={17} />
                </div>
              </div>
              <div className="footer-links">
                <div>
                  <b>Explore</b>
                  <a href="#marketplace">Find talent</a>
                  <a href="#how-it-works">How it works</a>
                  <button
                    className="footer-link"
                    onClick={() => setModal({ type: "ai" })}
                  >
                    AI assistant
                  </button>
                </div>
                <div>
                  <b>Build with us</b>
                  <button
                    className="footer-link"
                    onClick={() => setModal({ type: "auth" })}
                  >
                    Become a creator
                  </button>
                  <a href="#marketplace">Creator resources</a>
                  <a href="#voices">Community</a>
                </div>
                <div>
                  <b>Company</b>
                  <a href="#top">About SkillSwap</a>
                  <a href="#how-it-works">Safety & trust</a>
                  <a href="mailto:hello@skillswap.ai">Contact</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2024 SkillSwap AI</span>
              <span>Made for ambitious humans.</span>
              <span>Privacy · Terms</span>
            </div>
          </footer>
        </>
      )}
      {modal?.type === "ai" && (
        <AIWorkbench onClose={() => setModal(null)} onBook={book} />
      )}
      {modal?.type === "auth" && (
        <AuthModal
          onClose={() => setModal(null)}
          onSuccess={handleAuthSuccess}
        />
      )}
      {modal?.type === "profile" && (
        <ProfileModal
          creator={modal.creator}
          onClose={() => setModal(null)}
          onBook={book}
        />
      )}
      {modal?.type === "compare" && (
        <CompareModal
          creators={creators.filter((creator) =>
            compareIds.includes(creator.id),
          )}
          onClose={() => setModal(null)}
          onBook={book}
        />
      )}
      {modal?.type === "booked" && (
        <div className="modal-backdrop">
          <div className="success-modal">
            <div className="success-icon">
              <Check size={28} />
            </div>
            <p className="eyebrow">Request sent</p>
            <h2>You are on your way to good work.</h2>
            <p>
              Your booking request is with {modal.creator.name}. They usually
              reply within a couple of hours.
            </p>
            <button className="button dark full" onClick={() => setModal(null)}>
              Back to exploring
            </button>
          </div>
        </div>
      )}
      {notice && (
        <div className="toast">
          <Check size={15} /> {notice}
        </div>
      )}
    </div>
  );
}

function Dashboard({ user, bookings, saved, onBack, onAI }) {
  const creator = user?.role === "Creator";
  const savedCreators = creators.filter((creatorProfile) =>
    saved.includes(creatorProfile.id),
  );
  return (
    <main className="dashboard">
      <div className="dashboard-top">
        <button className="text-button" onClick={onBack}>
          ← Back to marketplace
        </button>
        <span className="dashboard-label">
          <LayoutDashboard size={16} />{" "}
          {creator ? "Creator dashboard" : "Client dashboard"}
        </span>
      </div>
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">
            Good morning, {user?.name?.split(" ")[0] || "Alex"}
          </p>
          <h1>{creator ? "Your creative studio." : "Your project space."}</h1>
        </div>
        <button className="button coral" onClick={onAI}>
          <Sparkles size={16} /> AI assistant
        </button>
      </div>
      <div className="dashboard-stats">
        <div>
          <span>Active bookings</span>
          <strong>{bookings.length || 2}</strong>
          <small>
            <TrendingUp size={13} /> 18% this month
          </small>
        </div>
        <div>
          <span>{creator ? "Profile views" : "Saved creators"}</span>
          <strong>{creator ? "248" : saved.length || 4}</strong>
          <small>
            <Users size={13} /> growing nicely
          </small>
        </div>
        <div>
          <span>{creator ? "Your rating" : "Completed swaps"}</span>
          <strong>{creator ? "4.9" : "12"}</strong>
          <small>
            <Star size={13} fill="currentColor" /> top 5% this week
          </small>
        </div>
      </div>
      <section className="dashboard-insights">
        <div className="insight-card insight-ai">
          <div className="insight-icon">
            <Sparkles size={17} />
          </div>
          <div>
            <p className="eyebrow">AI insight</p>
            <strong>
              {creator
                ? "Your profile is 18% more discoverable this week."
                : "Your brief matches 3 creators with 90%+ fit."}
            </strong>
            <span>
              {creator
                ? "Add one portfolio item to keep the momentum."
                : "The fastest next step is to compare your shortlist."}
            </span>
          </div>
          <button className="text-button" onClick={onAI}>
            Ask AI <ArrowRight size={14} />
          </button>
        </div>
        <div className="insight-card">
          <div className="insight-icon mint-icon">
            <TrendingUp size={17} />
          </div>
          <div>
            <p className="eyebrow">Trending now</p>
            <strong>Short-form video + React MVPs</strong>
            <span>Most requested skills in the last 7 days.</span>
          </div>
          <span className="trend-badge">+28%</span>
        </div>
        <div className="insight-card">
          <div className="insight-icon yellow-icon">
            <Target size={17} />
          </div>
          <div>
            <p className="eyebrow">Smart suggestion</p>
            <strong>
              {creator
                ? "Offer a 48-hour starter package."
                : "Compare Maya and Arjun next."}
            </strong>
            <span>
              {creator
                ? "Clear packages convert better for first bookings."
                : "They are the strongest fit for your recent activity."}
            </span>
          </div>
        </div>
      </section>
      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Your activity</p>
              <h2>{creator ? "Upcoming bookings" : "Recent bookings"}</h2>
            </div>
            <button className="text-button" onClick={onBack}>
              Browse marketplace <ArrowRight size={15} />
            </button>
          </div>
          {bookings.length ? (
            bookings.map((b, i) => (
              <div className="booking-row" key={`${b.id}-${i}`}>
                <Avatar creator={b} small />
                <div>
                  <strong>{b.name}</strong>
                  <span>{creator ? "Brand identity sprint" : b.role}</span>
                </div>
                <span className="booking-date">
                  <Clock3 size={14} />{" "}
                  {i === 0 ? "Tomorrow, 10:00" : "Oct 28, 14:00"}
                </span>
                <span className="booking-status">Confirmed</span>
              </div>
            ))
          ) : (
            <div className="booking-row">
              <div className="empty-avatar">
                <Plus size={18} />
              </div>
              <div>
                <strong>No bookings yet</strong>
                <span>Find your next great collaboration.</span>
              </div>
              <button className="button ghost" onClick={onBack}>
                Browse creators
              </button>
            </div>
          )}
        </section>
        <section className="panel profile-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Your profile</p>
              <h2>{creator ? "Looking good." : "Make it yours."}</h2>
            </div>
            <Edit3 size={18} />
          </div>
          <div className="profile-progress">
            <div className="progress-ring">78%</div>
            <div>
              <strong>Profile strength</strong>
              <p>
                {creator
                  ? "You are standing out."
                  : "A complete profile gets 3x more replies."}
              </p>
            </div>
          </div>
          <button className="button dark full" onClick={onAI}>
            <Settings2 size={15} /> Edit profile
          </button>
        </section>
      </div>
      <div className="dashboard-lower">
        <section className="panel analytics-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">This month</p>
              <h2>Momentum report</h2>
            </div>
            <TrendingUp size={19} className="panel-accent" />
          </div>
          <div className="analytics-bars">
            <div>
              <span>Profile views</span>
              <b>248</b>
              <i style={{ width: "82%" }} />
            </div>
            <div>
              <span>Booking conversion</span>
              <b>18%</b>
              <i style={{ width: "58%" }} />
            </div>
            <div>
              <span>Reply rate</span>
              <b>94%</b>
              <i style={{ width: "94%" }} />
            </div>
          </div>
        </section>
        <section className="panel saved-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Your shortlist</p>
              <h2>Saved creators</h2>
            </div>
            <Bookmark size={18} className="panel-accent" />
          </div>
          <div className="saved-list">
            {savedCreators.map((creatorProfile) => (
              <div className="saved-creator" key={creatorProfile.id}>
                <Avatar creator={creatorProfile} small />
                <div>
                  <strong>{creatorProfile.name}</strong>
                  <span>
                    {creatorProfile.category} · ${creatorProfile.price}/hr
                  </span>
                </div>
                <Star size={13} fill="currentColor" />
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="dashboard-tip">
        <Lightbulb size={21} />
        <div>
          <strong>Small idea, big difference</strong>
          <p>
            Add one portfolio piece this week. Creators with 3+ pieces get 42%
            more bookings.
          </p>
        </div>
        <ArrowRight size={18} />
      </div>
    </main>
  );
}
