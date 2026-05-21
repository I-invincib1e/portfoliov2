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

export type PostChapterKind = 'premise' | 'stakes' | 'hypothesis' | 'friction' | 'resolution' | 'field_note';
export type PostBlockKind = PostChapterKind | 'paragraph' | 'image' | 'code' | 'quote' | 'list' | 'callout' | 'divider';

export type PostSection = {
  kind: PostBlockKind;
  body?: string;
  confidence?: number;
  src?: string;
  alt?: string;
  caption?: string;
  language?: string;
  filename?: string;
  items?: string[];
  tone?: 'note' | 'warn' | 'tip';
  attribution?: string;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_url: string;
  tags: string[];
  series: string;
  series_slug: string | null;
  stage: string;
  confidence: number;
  reading_time_min: number;
  sections: PostSection[];
  body_md: string | null;
  published_at: string | null;
  view_count: number;
  related_slugs: string[];
};

export type Series = {
  slug: string;
  title: string;
  summary: string;
  accent_color: string;
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

export async function fetchPostsByTag(tag: string): Promise<Post[]> {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .contains('tags', [tag])
    .order('published_at', { ascending: false });
  return (data ?? []) as Post[];
}

export async function fetchPostsBySeries(seriesSlug: string): Promise<Post[]> {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .eq('series_slug', seriesSlug)
    .order('published_at', { ascending: true });
  return (data ?? []) as Post[];
}

export async function fetchSeries(): Promise<Series[]> {
  const { data } = await supabase.from('series').select('*').order('slug');
  return (data ?? []) as Series[];
}

export async function fetchSeriesBySlug(slug: string): Promise<Series | null> {
  const { data } = await supabase.from('series').select('*').eq('slug', slug).maybeSingle();
  return (data ?? null) as Series | null;
}

export async function incrementPostView(slug: string): Promise<void> {
  await supabase.rpc('increment_post_view', { post_slug: slug });
}

export async function subscribeNewsletter(email: string) {
  return supabase.from('subscribers').insert({ email, status: 'pending' });
}

export type BuildLog = {
  id: string;
  slug: string;
  title: string;
  body_md: string;
  tags: string[];
  published: boolean;
  created_at: string;
};

export async function fetchBuildLogs(limit?: number): Promise<BuildLog[]> {
  let q = supabase
    .from('build_logs')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  if (limit) q = q.limit(limit);
  const { data } = await q;
  return (data ?? []) as BuildLog[];
}

export async function fetchBuildLog(slug: string): Promise<BuildLog | null> {
  const { data } = await supabase
    .from('build_logs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  return (data ?? null) as BuildLog | null;
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
  const result = await supabase.from('contact_messages').insert(payload);
  if (!result.error) {
    // Fire-and-forget notification email
    fetch(`${url}/functions/v1/contact-notify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${anon}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }
  return result;
}
