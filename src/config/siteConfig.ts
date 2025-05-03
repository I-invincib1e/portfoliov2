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
  email: "contact@rushikeshpawar.com",
  location: "Mumbai, India",
  
  // Social media links
  social: {
    github: "https://github.com/Neorex80",
    linkedin: "https://www.linkedin.com/in/devrex/",
    twitter: "https://twitter.com/username",
    instagram: "https://www.instagram.com/k_rishi.exe/",
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
    // For light mode
    light: {
      softPink: "#F7CFD8",
      paleLime: "#F4F8D3",
      teal: "#A6D6D6",
      lavender: "#8E7DBE"
    }
  }
};

// Projects featured in the work section
export const projects = [
  {
    title: "AI Prompt Generator",
    description: "Build a prompt generator tool that suggests better prompts for different LLMs (Gemini, GPT, Claude, etc.).",
    link: "#",
    github: "https://github.com/username/ai-prompt-generator"
  },
  {
    title: "Mini LLM Chatbot",
    description: "A chatbot with presets using Groq or TypeGPT API to interact with different models.",
    link: "#",
    github: "https://github.com/username/mini-llm-chatbot"
  },
  {
    title: "Modern Portfolio Website",
    description: "The current responsive portfolio website built with React, TypeScript, and GSAP animations.",
    link: "#",
    github: "https://github.com/username/portfolio-website"
  }
];

// Detailed projects for the bento box in work section
export const detailedProjects = [
  {
    title: "Data Dashboard with Charts",
    description: "Interactive dashboard pulling public data (COVID-19 or Stock Data) with visualizations using chart.js and Tailwind CSS.",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["React", "Chart.js", "Tailwind CSS", "Public APIs"],
    link: "#",
    github: "https://github.com/username/data-dashboard"
  },
  {
    title: "EDA on Real-World Dataset",
    description: "Exploratory Data Analysis on a Kaggle dataset showcasing insights through a Jupyter Notebook with markdown explanations.",
    image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Python", "Pandas", "Data Analysis", "Jupyter"],
    link: "#",
    github: "https://github.com/username/kaggle-eda-project"
  }
];

// All projects for the projects page
export const allProjects = [
  {
    title: "AI Prompt Generator",
    description: "Build a prompt generator tool that suggests better prompts for different LLMs (Gemini, GPT, Claude, etc.).",
    image: "https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["React", "TypeScript", "OpenAI API", "AI"],
    link: "#",
    github: "https://github.com/username/ai-prompt-generator",
    featured: true
  },
  {
    title: "Mini LLM Chatbot",
    description: "A chatbot with presets using Groq or TypeGPT API to interact with different models.",
    image: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["React", "TypeScript", "Groq API", "AI"],
    link: "#",
    github: "https://github.com/username/mini-llm-chatbot",
    featured: true
  },
  {
    title: "Modern Portfolio Website",
    description: "The current responsive portfolio website built with React, TypeScript, and GSAP animations.",
    image: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["React", "TypeScript", "GSAP", "Styled Components"],
    link: "#",
    github: "https://github.com/username/portfolio-website",
    featured: true
  },
  {
    title: "Data Dashboard with Charts",
    description: "Interactive dashboard pulling public data (COVID-19 or Stock Data) with visualizations using chart.js and Tailwind CSS.",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["React", "Chart.js", "Tailwind CSS", "Public APIs"],
    link: "#",
    github: "https://github.com/username/data-dashboard",
    featured: true
  },
  {
    title: "EDA on Real-World Dataset",
    description: "Exploratory Data Analysis on a Kaggle dataset showcasing insights through a Jupyter Notebook with markdown explanations.",
    image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Python", "Pandas", "Data Analysis", "Jupyter"],
    link: "#",
    github: "https://github.com/username/kaggle-eda-project",
    featured: true
  },
  {
    title: "E-Commerce Store Front",
    description: "A modern e-commerce storefront with shopping cart and checkout functionality.",
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    link: "#",
    github: "https://github.com/username/ecommerce-store",
    featured: false
  },
  {
    title: "Weather Application",
    description: "A weather application that displays current weather and forecast data for any location.",
    image: "https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["React", "Weather API", "CSS", "JavaScript"],
    link: "#",
    github: "https://github.com/username/weather-app",
    featured: false
  },
  {
    title: "Task Management App",
    description: "A task management application with drag-and-drop functionality for organizing tasks.",
    image: "https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tags: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    link: "#",
    github: "https://github.com/username/task-management",
    featured: false
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