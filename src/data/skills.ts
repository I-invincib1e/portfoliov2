export type Skill = { title: string; description: string };

export const skills: Skill[] = [
  {
    title: 'AI / LLM Integration',
    description: 'Integrating and orchestrating large language models with LangChain, Groq, OpenAI and the TypeGPT API. Building agentic systems with multi-model workflows.',
  },
  {
    title: 'Frontend Engineering',
    description: 'Crafting fast, clean, responsive UIs with Next.js, React, Tailwind and ShadCN. Strong focus on UX, motion (Framer Motion / GSAP) and design systems.',
  },
  {
    title: 'Realtime Web Apps',
    description: 'Realtime features built on Supabase and WebSockets — live chat, presence and dynamic UI with minimal latency.',
  },
  {
    title: 'Machine Learning & MLOps',
    description: 'ML pipelines, model deployment and serving LLMs via APIs. Comfortable with Pydantic, FastAPI and scalable model integration.',
  },
];
