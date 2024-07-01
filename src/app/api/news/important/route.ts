import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();
  const { data: news, error } = await supabase
    .from('news')
    .select()
    .order('view', { ascending: false })
    .limit(1)
    .single();

  return Response.json({ news: news });
}
