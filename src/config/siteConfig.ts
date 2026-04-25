/**
 * Site Configuration
 * 
 * This file contains all the configuration options for your portfolio.
 * Edit this file to personalize your portfolio with your own information.
 */

// Basic information
export const siteConfig = {
  // Personal Information
  name: "Rushikesh Pawar",
  title: "Designer & Developer",
  email: "rishipawar8999@gmail.com",
  location: "Mumbai, India",
  
  // Social media links
  social: {
    github: "https://github.com/I-invincib1e",
    linkedin: "https://www.linkedin.com/in/devrex/",
    twitter: "https://twitter.com/username",
    instagram: "https://www.instagram.com/i_invincib1e/",
    telegram: "https://t.me/iamproasfuck",
  },
  
  // Resume link (replace with your actual resume URL)
  resumeUrl: "/resume.pdf",
  
  // Theme colors (customize these to change the color scheme)
  theme: {
    // For dark mode
    dark: {
      primary: {
        500: "#0ea5e9" // Sky blue
      },
      secondary: {
        500: "#14b8a6" // Teal
      },
      accent: {
        500: "#f97316", // Orange
        600: "#ea580c"  // Darker orange
      }
    },
    // For light mode - updated colors
    light: {
      background: "#FAFAFA",
      surface: "#E4E5F1",
      muted: "#D2D3DB",
      text: "#484B6A",
      accent: "#9394A5"
    }
  }
};

// All projects in unified format
export const allProjects = [
  {
    title: "Pyscrape",
    description: "Professional Python Web Scraper with Multi-Backend Support - Built by analyzing simple scrapers and integrating powerful libraries.",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Python", "Web Scraping", "BeautifulSoup", "Selenium"],
    link: "https://github.com/I-invincib1e/Pyscrape",
    github: "https://github.com/I-invincib1e/Pyscrape",
    featured: true
  },
  {
    title: "CleanEngine",
    description: "Automated Data Cleaning, Profiling, and EDA in One Engine - Streamline your data preprocessing workflow.",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Python", "Data Cleaning", "EDA", "Pandas"],
    link: "https://github.com/I-invincib1e/CleanEngine",
    github: "https://github.com/I-invincib1e/CleanEngine",
    featured: true
  },
  {
    title: "Go-Pro",
    description: "Collection of small, practical, and beginner-friendly Go projects — perfect for learning and building a useful toolkit.",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Go", "Golang", "Backend", "Learning"],
    link: "https://github.com/I-invincib1e/Go-Pro",
    github: "https://github.com/I-invincib1e/Go-Pro",
    featured: true
  },
  {
    title: "Quick-Link",
    description: "Quick Link URL Shortener - Fast and efficient URL shortening service for simplified link management.",
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["URL Shortener", "Web App", "JavaScript", "Backend"],
    link: "https://github.com/I-invincib1e/Quick-Link",
    github: "https://github.com/I-invincib1e/Quick-Link",
    featured: true
  },
  {
    title: "Here i come Python",
    description: "Python Learning Guide: Complete Programming Education - Comprehensive resource for mastering Python from basics to advanced.",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Python", "Education", "Tutorial", "Learning"],
    link: "https://github.com/I-invincib1e/Here-i-come-Python",
    github: "https://github.com/I-invincib1e/Here-i-come-Python",
    featured: true
  }
];

// Blog posts for the blog page
export const blogPosts = [
  {
    id: 1,
    title: 'Creating Modern UI with React and TailwindCSS',
    excerpt: 'Learn how to combine React and TailwindCSS to create beautiful, responsive user interfaces.',
    date: 'June 15, 2023',
    readTime: '5 min read',
    tags: ['React', 'TailwindCSS', 'UI/UX'],
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'creating-modern-ui'
  },
  {
    id: 2,
    title: 'Animation Techniques with GSAP',
    excerpt: 'Discover how to create stunning animations using the GreenSock Animation Platform.',
    date: 'August 8, 2023',
    readTime: '7 min read',
    tags: ['GSAP', 'Animation', 'JavaScript'],
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'animation-techniques-gsap'
  },
  {
    id: 3,
    title: 'State Management in React: Context vs Redux',
    excerpt: 'Compare different state management approaches in React applications and learn when to use each.',
    date: 'October 25, 2023',
    readTime: '10 min read',
    tags: ['React', 'Context API', 'Redux'],
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'state-management-react'
  },
  {
    id: 4,
    title: 'Building a Portfolio with React and GSAP',
    excerpt: 'Step-by-step guide to creating an animated portfolio website using React and GSAP.',
    date: 'December 10, 2023',
    readTime: '8 min read',
    tags: ['React', 'GSAP', 'Portfolio'],
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    slug: 'building-portfolio-react-gsap'
  }
];

// Certificates for the certifications page
export const certificates = [
  {
    title: "Crash Course on Python",
    organization: "Google",
    date: "May 2023",
    credentialID: "12fea1beba62af21d8e50297",
    credentialURL: "https://coursera.org/share/12fea1beba62af21d8e50297a7ec7c1e",
    description: "Fundamentals of Python programming including variables, functions, loops, and basic data structures. Developed problem-solving skills through Python scripting.",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: "Machine Learning with Python",
    organization: "IBM",
    date: "July 2023",
    credentialID: "23746c0f9e4ed409d1fe97463",
    credentialURL: "https://coursera.org/share/23746c0f9e4ed409d1fe97463cb70418",
    description: "Comprehensive training in machine learning algorithms, techniques and applications using Python. Covered regression, classification, clustering, and deep learning.",
    image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: "Generative AI for Everyone",
    organization: "DeepLearning.AI",
    date: "September 2023",
    credentialID: "74d84414ef23ca2aa76e410a1",
    credentialURL: "https://coursera.org/share/74d84414ef23ca2aa76e410a1fdf6441",
    description: "Understanding of generative AI concepts, capabilities and applications. Learned about prompt engineering, language models, and responsible AI practices.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: "Google Prompting Essentials",
    organization: "Google",
    date: "March 2024",
    credentialID: "03a7897c16b990c5443a0d0c6c",
    credentialURL: "https://coursera.org/share/03a7897c16b990c5443a0d0c6c302441",
    description: "Mastered essential prompt engineering techniques for large language models. Learned how to craft effective prompts, implement system prompts, and optimize for different AI applications.",
    image: "https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

// Technology stack logos - customize with your own tech stack
export const technologies = [
  { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "GSAP", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/greensock.svg" },
  { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  // Added new technologies
  { name: "ShadCN", logo: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4" },
  { name: "Framer Motion", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/framer.svg" },
  { name: "Supabase", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/supabase.svg" },
  { name: "LangChain", logo: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
  { name: "Groq", logo: "https://avatars.githubusercontent.com/u/150674815?s=200&v=4" }
];

// Skills displayed in the about section
export const skills = [
  {
    title: "AI/LLM Integration",
    description: "Specialized in integrating and orchestrating large language models using LangChain, Groq, OpenAI, and the TypeGPT API. Building smart, agent-based systems with multi-model workflows."
  },
  {
    title: "Frontend Development",
    description: "Crafting fast, clean, and responsive UIs with Next.js, React, Tailwind CSS, and ShadCN. Strong focus on UX, animations (Framer Motion), and component-based design systems."
  },
  {
    title: "Realtime Web Apps",
    description: "Experienced in building real-time features using Supabase and WebSockets — including live chat apps and dynamic UI updates with minimal latency."
  },
  {
    title: "Machine Learning & MLOps",
    description: "Foundational understanding of ML pipelines, model deployment, and serving LLMs via APIs. Familiar with Pydantic, FastAPI, and principles of scalable model integration."
  }
];