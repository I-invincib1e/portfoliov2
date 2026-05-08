export type Skill = { title: string; description: string };

export const skills: Skill[] = [
  {
    title: 'AI / LLM Integration',
    description: 'Integrating and orchestrating large language models with LangChain, Groq, OpenAI and the TypeGPT API. Building agentic systems with multi-model workflows.',
  },
  {
    title: 'Product Engineering',
    description: 'Shipping production-grade interfaces with Next.js, React, Tailwind and ShadCN — tuned for UX, motion (Framer Motion / GSAP) and design systems that hold up under real use.',
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
