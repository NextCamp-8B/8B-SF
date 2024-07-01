import { createClient } from '@/utils/supabase/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const supabase = createClient();
  const { data: news, error } = await supabase
    .from('news')
    .select()
    .eq('news_id', id)
    .maybeSingle();

  return Response.json({ news: news });
}
