import supabase from '@/lib/supabaseClient';

// 사용자 존재 여부 확인 함수
export async function getUserByEmail(email: string) {
  const { data: existingUser, error } = await supabase
    .from('user')
    .select('*')
    .eq('email', email)
    .single();
  if (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
  return existingUser;
}

// userId로 이메일 조회 함수
export async function getEmailByUserId(userId: string) {
  const { data: userData, error: userError } = await supabase
    .from('user')
    .select('email')
    .eq('user_id', userId)
    .single();
  if (userError) {
    console.error('Error fetching email by user ID:', userError);
    throw userError;
  }
  return userData?.email || null;
}

// 사용자 이미 소셜로 회원가입한 유저인지 체크 함수
export async function checkSocialUser(
  email: string,
  provider: string,
) {
  const { data: socialUser, error } = await supabase
    .from('user')
    .select('*')
    .eq('email', email)
    .eq('provider_account_id', provider)
    .single();
  if (error) {
    console.error('Error checking social user:', error);
    throw error;
  }
  return socialUser;
}

// 이메일 중복 체크 함수
export async function checkEmailExists(
  email: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from('user')
    .select('email')
    .eq('email', email);
  if (error) {
    console.error('Error checking email:', error);
    throw error;
  }
  return data.length > 0;
}

// 아이디 중복 체크 함수
export async function checkUserIdExists(userId: string) {
  const { data, error } = await supabase
    .from('user')
    .select('user_id')
    .eq('user_id', userId);

  if (error) {
    console.error('Error checking user ID:', error);
    throw error;
  }

  return data.length > 0;
}

// 이전 프로필 이미지 삭제 함수
export const deleteProfileImage = async (profileImage: string) => {
  const { error } = await supabase.storage
    .from('8b-sf')
    .remove([`profile_img/${profileImage}`]);
  if (error) {
    throw new Error('프로필 이미지 삭제 오류');
  }
};

// URL에서 이미지를 다운로드하고 Blob으로 반환 함수.
export const fetchImageAsBlob = async (
  imageUrl: string,
): Promise<Blob> => {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error('이미지 다운로드 오류');
  }
  return await response.blob();
};

// 프로필 이미지 설정 함수
export async function uploadProfileImage(
  fileName: string,
  file: File,
): Promise<string> {
  const { error } = await supabase.storage
    .from('8b-sf')
    .upload(`profile_img/${fileName}`, file);

  if (error) {
    console.error(error, '프로필이미지 설정 오류');
    throw new Error('프로필이미지 설정 오류');
  }

  const { data: publicUrlData } = supabase.storage
    .from('8b-sf')
    .getPublicUrl(`profile_img/${fileName}`);

  if (!publicUrlData || !publicUrlData.publicUrl) {
    throw new Error('Public URL 생성 오류');
  }

  return publicUrlData.publicUrl;
}
