import { createClient } from '@/utils/supabase/server';
import dayjs from 'dayjs';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
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
  const ip = req.headers.get('X-Forwarded-For');
  const id = params.id;
  const supabase = createClient();

  const { data: ipLog } = await supabase
    .from('news_iplog')
    .select('viewed_at')
    .eq('news_id', id)
    .eq('ip', ip)
    .maybeSingle();
  const now = dayjs().utc();
  // console.log(ipLog, id);
  const dayDiff = now.diff(ipLog?.viewed_at, 'day');
  const { data: news, error } = await supabase
    .from('news')
    .select('view')
    .eq('news_id', id)
    .maybeSingle();
  // 뉴스를 본 적이 없을 때
  if (!ipLog) {
    await supabase.from('news_iplog').insert({ news_id: id, ip });
    const update_view = await supabase
      .from('news')
      .update({ view: news?.view + 1 })
      .eq('news_id', id)
      .select('view')
      .single();
    return Response.json({ message: 'ip 없을 때 조회수 갱신 완료' });
  } else {
    if (dayDiff > 0) {
      const { error } = await supabase
        .from('news_iplog')
        .update({
          news_id: id,
          viewed_at: dayjs()
            .utc()
            .format('YYYY-MM-DDTHH:mm:ss.SSSS[+00:00]'),
          ip,
        })
        .eq('news_id', id)
        .eq('ip', ip);
      const update_view = await supabase
        .from('news')
        .update({ view: news?.view + 1 })
        .eq('news_id', id)
        .select('view')
        .single();
    }
    return Response.json({ message: '조회수 갱신 완료' });
  }
}
