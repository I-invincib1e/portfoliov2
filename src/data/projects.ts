export type StaticProject = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  featured: boolean;
};

export const allProjects: StaticProject[] = [
  {
    slug: 'pyscrape',
    title: 'Pyscrape',
    description: 'Scraping real sites means juggling BeautifulSoup, Selenium and anti-bot workarounds for every target. Pyscrape is a multi-backend Python scraper that picks the right engine per site — so data pipelines ship instead of stalling on fetchers.',
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Python', 'Automation', 'Web Scraping'],
    link: 'https://github.com/I-invincib1e/Pyscrape',
    github: 'https://github.com/I-invincib1e/Pyscrape',
    featured: true,
  },
  {
    slug: 'cleanengine',
    title: 'CleanEngine',
    description: 'Data teams lose days to manual cleaning and exploratory analysis before they can model anything. CleanEngine automates profiling, cleaning and EDA in one pass — turning raw CSVs into ready-to-model datasets with a single command.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Python', 'AI/ML', 'Automation'],
    link: 'https://github.com/I-invincib1e/CleanEngine',
    github: 'https://github.com/I-invincib1e/CleanEngine',
    featured: true,
  },
  {
    slug: 'quick-link',
    title: 'Quick-Link',
    description: 'Teams need trackable short links without subscribing to yet another SaaS. Quick-Link is a self-hostable URL shortener with analytics and custom slugs — drop it on a server and own the link layer.',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['JavaScript', 'SaaS', 'Backend'],
    link: 'https://github.com/I-invincib1e/Quick-Link',
    github: 'https://github.com/I-invincib1e/Quick-Link',
    featured: true,
  },
  {
    slug: 'go-pro',
    title: 'Go-Pro',
    description: 'Going deep on Go requires small, end-to-end projects that actually compile and run. Go-Pro is a curated set of practical Go builds — a toolkit and reference for backend services.',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Go', 'Backend', 'Toolkit'],
    link: 'https://github.com/I-invincib1e/Go-Pro',
    github: 'https://github.com/I-invincib1e/Go-Pro',
    featured: false,
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
  },
];
