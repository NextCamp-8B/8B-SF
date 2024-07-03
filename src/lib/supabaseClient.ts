import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 Supabase URL과 API 키를 가져옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Supabase 클라이언트를 생성합니다.
console.log('supabaseUrl', supabaseUrl, supabaseKey);
const supabase = createClient(supabaseUrl!, supabaseKey!);

export default supabase;
