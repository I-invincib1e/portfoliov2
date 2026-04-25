import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, anon);

export type NowWidget = {
  id: string;
  location: string;
  status: string;
  currently_reading: string;
  currently_listening: string;
  updated_at: string;
};

export async function fetchNow(): Promise<NowWidget | null> {
  const { data } = await supabase
    .from('now_widget')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return data as NowWidget | null;
}

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  cover_url: string;
  repo_url: string;
  live_url: string;
  featured: boolean;
  position: number;
};

export async function fetchProjects(opts?: { featuredOnly?: boolean }): Promise<Project[]> {
  let q = supabase.from('projects').select('*').eq('published', true).order('position', { ascending: true });
  if (opts?.featuredOnly) q = q.eq('featured', true);
  const { data } = await q;
  return (data ?? []) as Project[];
}

export type PostSection = {
  kind: 'premise' | 'stakes' | 'hypothesis' | 'friction' | 'resolution' | 'field_note';
  body: string;
  confidence?: number;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_url: string;
  tags: string[];
  series: string;
  stage: string;
  confidence: number;
  reading_time_min: number;
  sections: PostSection[];
  published_at: string | null;
  view_count: number;
};

export async function fetchPosts(): Promise<Post[]> {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });
  return (data ?? []) as Post[];
}

export async function fetchPost(slug: string): Promise<Post | null> {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  return data as Post | null;
}

export type ContactPayload = {
  name: string;
  email: string;
  project_type: string;
  budget: string;
  timeline: string;
  message: string;
};

export async function submitContactMessage(payload: ContactPayload) {
  return supabase.from('contact_messages').insert(payload);
}
