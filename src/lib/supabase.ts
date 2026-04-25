import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, anon);

export type Availability = {
  id: string;
  status: string;
  message: string;
  updated_at: string;
};

export async function fetchAvailability(): Promise<Availability | null> {
  const { data } = await supabase
    .from('availability')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return data as Availability | null;
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
