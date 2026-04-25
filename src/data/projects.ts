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
    description: 'Professional Python web scraper with multi-backend support — built by analyzing simple scrapers and integrating powerful libraries.',
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Python', 'Web Scraping', 'BeautifulSoup', 'Selenium'],
    link: 'https://github.com/I-invincib1e/Pyscrape',
    github: 'https://github.com/I-invincib1e/Pyscrape',
    featured: true,
  },
  {
    slug: 'cleanengine',
    title: 'CleanEngine',
    description: 'Automated data cleaning, profiling and EDA in one engine — streamline your preprocessing workflow.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Python', 'Data Cleaning', 'EDA', 'Pandas'],
    link: 'https://github.com/I-invincib1e/CleanEngine',
    github: 'https://github.com/I-invincib1e/CleanEngine',
    featured: true,
  },
  {
    slug: 'go-pro',
    title: 'Go-Pro',
    description: 'Practical, beginner-friendly Go projects — perfect for learning and building a useful toolkit.',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Go', 'Backend', 'Learning'],
    link: 'https://github.com/I-invincib1e/Go-Pro',
    github: 'https://github.com/I-invincib1e/Go-Pro',
    featured: true,
  },
  {
    slug: 'quick-link',
    title: 'Quick-Link',
    description: 'Fast and efficient URL shortening service for simplified link management.',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['JavaScript', 'Backend', 'URL Shortener'],
    link: 'https://github.com/I-invincib1e/Quick-Link',
    github: 'https://github.com/I-invincib1e/Quick-Link',
    featured: true,
  },
  {
    slug: 'here-i-come-python',
    title: 'Here I Come, Python',
    description: 'Comprehensive Python learning resource — from basics to advanced concepts.',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Python', 'Education', 'Tutorial'],
    link: 'https://github.com/I-invincib1e/Here-i-come-Python',
    github: 'https://github.com/I-invincib1e/Here-i-come-Python',
    featured: false,
  },
];
