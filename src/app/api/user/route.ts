import { NextRequest, NextResponse } from 'next/server';
import supabase from '../../../lib/supabaseClient';
import {
  checkUserIdExists,
  uploadProfileImage,
} from '@/utils/supabase/supabaseHelper';
import generateFileName from '@/utils/generateFileName';

export type User = {
  id: number;
  password: string;
  phone_number: string;
  created_at: string;
  birth: string;
  profile_img?: string;
  nickname: string;
  interest_stock?: string;
  updated_at?: string;
  user_id: string;
  email: string;
};

// GET 유저id 중복 처리 확인
export async function GET(request: NextRequest) {
  try {
    const signupId = request.nextUrl.searchParams.get('signupId');

    if (!signupId) {
      return NextResponse.json(
        { error: 'signupId is required' },
        { status: 400 },
      );
    }
    // 아이디 중복 체크
    const data = await checkUserIdExists(signupId);

    if (data) {
      return NextResponse.json(
        { message: 'duplicate' },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { message: 'available' },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Unexpected error occurred' },
      { status: 500 },
    );
  }
}

// POST 요청 처리 - 회원가입
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const userId = formData.get('userId') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const birth = formData.get('birth') as string;
    const nickname = formData.get('nickname') as string;
    const name = formData.get('name') as string;
    const interestStock = formData.get('interestStock') as string;
    const providerAccountId = formData.get(
      'providerAccountId',
    ) as string;
    const profileImg = formData.get('profileImg') as File;
    if (
      !userId ||
      !password ||
      !nickname ||
      !phoneNumber ||
      !birth ||
      !name ||
      !email
    ) {
      return NextResponse.json(
        { error: '입력값이 부족합니다.' },
        { status: 400 },
      );
    }

    // 프로필 이미지 supabase 스토리지에 저장
    let profileFileImageUrl: string | null = null; //이미지 파일 url
    let profilFileImageName: string | null = null; //이미지 이름
    if (profileImg && profileImg.name) {
      profilFileImageName = generateFileName(profileImg?.name);

      const publicUrl = await uploadProfileImage(
        profilFileImageName,
        profileImg,
      );
      profileFileImageUrl = publicUrl;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          userId,
          name,
          birth,
          phone: phoneNumber,
          phoneNumber,
          profileImg: profileFileImageUrl,
          profileImgName: profilFileImageName,
          nickname,
          provider_account_id: providerAccountId,
          interestStock,
          // 관심종목 supabae 함수,트리거를 사용해 회원가입시
          // stock 테이블과 비교하여 interest_stock에 삽입
          // language: 'kr', //언어 설정 값 기본 'kr'
        },
      },
    });
    if (error) {
      throw error;
    }
    const response = NextResponse.json(
      { message: '회원가입 성공' },
      { status: 200 },
    );

    // 응답에 쿠키 삭제 설정 추가
    response.cookies.set('auth-token', '', {
      path: '/',
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: '회원가입 중 오류 발생' },
      { status: 500 },
    );
  }
}
