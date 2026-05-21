export type ProjectStatus = 'Idea' | 'Building' | 'Live' | 'Archived';
export type ProjectRole = 'Builder' | 'Engineer' | 'Product Designer';

export type StaticProject = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  featured: boolean;
  status?: ProjectStatus;
  role?: ProjectRole;
  problemSolved?: string;
  outcome?: string;
};

export const allProjects: StaticProject[] = [
  {
    slug: 'ai-receptionist',
    title: 'AI Receptionist',
    description: 'A voice-first AI system that handles inbound calls, routes conversations, books appointments, and responds in natural language — replacing hold queues with instant, intelligent interactions.',
    image: '',
    tags: ['Voice AI', 'Python', 'Real-time', 'Telephony'],
    link: '',
    github: '',
    featured: true,
    status: 'Building',
    role: 'Builder',
    problemSolved: 'Small businesses lose leads because no one answers after-hours calls or during peak volume.',
    outcome: 'MVP handles inbound routing, appointment scheduling, and natural voice responses with sub-2s latency.',
  },
  {
    slug: 'skillbarter',
    title: 'SkillBarter',
    description: 'A credit-based skill exchange platform where professionals trade expertise without money — design a logo, get accounting help. Credits keep the marketplace fair and liquid.',
    image: '',
    tags: ['React', 'Supabase', 'Product Design', 'SaaS'],
    link: '',
    github: '',
    featured: true,
    status: 'Building',
    role: 'Builder',
    problemSolved: 'Freelancers and early-stage founders need services but lack cash — barter is inefficient without a trust system.',
    outcome: 'Designed credit engine, reputation system, and matching algorithm. Product system documented end-to-end.',
  },
  {
    slug: 'deep-research-agent',
    title: 'Deep Research Agent',
    description: 'An AI agent that takes a research question, autonomously searches across sources, synthesizes findings, and returns structured reports with citations — deep work on autopilot.',
    image: '',
    tags: ['AI Agents', 'LangChain', 'Python', 'RAG'],
    link: '',
    github: '',
    featured: true,
    status: 'Building',
    role: 'Builder',
    problemSolved: 'Manual research takes hours of tab-switching and note-taking before you can synthesize anything useful.',
    outcome: 'Agent produces structured research reports from a single prompt, with cited sources and confidence scores.',
  },
  {
    slug: 'pyscrape',
    title: 'Pyscrape',
    description: 'A multi-backend Python scraper that picks the right engine per site — BeautifulSoup, Selenium, or headless browsers — so data pipelines ship instead of stalling on fetchers.',
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Python', 'Automation', 'Web Scraping'],
    link: 'https://github.com/I-invincib1e/Pyscrape',
    github: 'https://github.com/I-invincib1e/Pyscrape',
    featured: true,
    status: 'Live',
    role: 'Engineer',
    problemSolved: 'Scraping real sites means juggling multiple libraries and anti-bot workarounds for every target.',
    outcome: 'Multi-backend engine selection handles diverse targets. Open-source with active usage.',
  },
  {
    slug: 'cleanengine',
    title: 'CleanEngine',
    description: 'Automates data profiling, cleaning and EDA in one pass — turning raw CSVs into ready-to-model datasets with a single command.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Python', 'AI/ML', 'Automation'],
    link: 'https://github.com/I-invincib1e/CleanEngine',
    github: 'https://github.com/I-invincib1e/CleanEngine',
    featured: true,
    status: 'Live',
    role: 'Engineer',
    problemSolved: 'Data teams lose days to manual cleaning and exploratory analysis before they can model anything.',
    outcome: 'Single-command pipeline from raw data to clean, profiled, model-ready datasets.',
  },
  {
    slug: 'quick-link',
    title: 'Quick-Link',
    description: 'Self-hostable URL shortener with analytics and custom slugs — own the link layer without another SaaS subscription.',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['JavaScript', 'SaaS', 'Backend'],
    link: 'https://github.com/I-invincib1e/Quick-Link',
    github: 'https://github.com/I-invincib1e/Quick-Link',
    featured: false,
    status: 'Live',
    role: 'Engineer',
    problemSolved: 'Teams need trackable short links without subscribing to yet another SaaS.',
    outcome: 'Self-hosted solution with custom slugs and built-in analytics.',
  },
  {
    slug: 'go-pro',
    title: 'Go-Pro',
    description: 'Curated set of practical Go builds — a toolkit and reference for backend services.',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Go', 'Backend', 'Toolkit'],
    link: 'https://github.com/I-invincib1e/Go-Pro',
    github: 'https://github.com/I-invincib1e/Go-Pro',
    featured: false,
    status: 'Archived',
    role: 'Engineer',
    problemSolved: 'Going deep on Go requires small, end-to-end projects that actually compile and run.',
    outcome: 'Learning reference for Go backend patterns.',
  },
  {
    slug: 'here-i-come-python',
    title: 'Here I Come, Python',
    description: 'A structured Python reference built from first principles — from basics to advanced concepts, used as a teaching artefact.',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Python', 'Education'],
    link: 'https://github.com/I-invincib1e/Here-i-come-Python',
    github: 'https://github.com/I-invincib1e/Here-i-come-Python',
    featured: false,
    status: 'Archived',
    role: 'Engineer',
  },
];
