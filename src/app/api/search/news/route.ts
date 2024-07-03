import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();
  const { data: stock, error } = await supabase
    .from('news')
    .select('*');

  return Response.json({ stocks: stock });
}
