import { createClient } from '@/utils/supabase/server';

export async function GET(requset: Request) {
  const supabase = createClient();
  const { data: news, error } = await supabase
    .from('news')
    .select()
    .order('view', { ascending: false })
    .limit(3);

  return Response.json({
    newsList: news,
  });
}
