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

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const supabase = createClient();
  const { data: news, error } = await supabase
    .from('news')
    .select('view')
    .eq('news_id', id)
    .maybeSingle();

  const update_view = await supabase
    .from('news')
    .update({ view: news?.view + 1 })
    .eq('news_id', id)
    .select('view')
    .single();
  // console.log(update_view.error);
  return Response.json({ data: update_view.data });
}
