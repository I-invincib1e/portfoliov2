export type Certificate = {
  title: string;
  organization: string;
  date: string;
  credentialID: string;
  credentialURL: string;
  description: string;
  image: string;
};

export const certificates: Certificate[] = [
  {
    title: 'Crash Course on Python',
    organization: 'Google',
    date: 'May 2023',
    credentialID: '12fea1beba62af21d8e50297',
    credentialURL: 'https://coursera.org/share/12fea1beba62af21d8e50297a7ec7c1e',
    description: 'Fundamentals of Python programming — variables, functions, loops, basic data structures and problem-solving through scripting.',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Machine Learning with Python',
    organization: 'IBM',
    date: 'July 2023',
    credentialID: '23746c0f9e4ed409d1fe97463',
    credentialURL: 'https://coursera.org/share/23746c0f9e4ed409d1fe97463cb70418',
    description: 'Regression, classification, clustering and an intro to deep learning, applied with Python tooling.',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Generative AI for Everyone',
    organization: 'DeepLearning.AI',
    date: 'September 2023',
    credentialID: '74d84414ef23ca2aa76e410a1',
    credentialURL: 'https://coursera.org/share/74d84414ef23ca2aa76e410a1fdf6441',
    description: 'Generative AI concepts, prompt engineering, language model behaviour and responsible AI practices.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Google Prompting Essentials',
    organization: 'Google',
    date: 'March 2024',
    credentialID: '03a7897c16b990c5443a0d0c6c',
    credentialURL: 'https://coursera.org/share/03a7897c16b990c5443a0d0c6c302441',
    description: 'Prompt engineering techniques for LLMs — system prompts, optimisation patterns and AI-application design.',
    image: 'https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];
