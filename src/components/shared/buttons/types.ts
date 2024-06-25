export enum ButtonStyleTypes {
  Primary = 'primary',
  Success = 'success',
  Danger = 'danger',
  Gray = 'gray',
  Blue = 'blue',
  Light = 'light',
  Kakao = 'kakao',
  Naver = 'naver',
  Google = 'google',
  Disabled = 'disabled',
}

// ButtonBase size style
// text: {
//   sm: 'h-9 w-96 b-5',
//   md: 'h-14 w-96 b-4',
//   lg: 'h-16 w-96 b-3',
//   hf: 'h-9 w-[120px] b5',
// },
// icon: {
//   sm: 'w-5 h-5 b-4',
//   md: 'w-[22px] h-[22px] b-3',
//   lg: 'w-6 h-6 b-2',
//   hf: 'h-5 w-5 b5',
// },

// IconButtonBase에 size style
// text: {
//   sm: 'h-9 w-96 b-5',
//   md: 'h-14 w-96 b-4',
//   lg: 'h-16 w-96 b-3',
//   hf: 'h-9 w-[120px] b5',
// },
// icon: {
//   sm: 'w-5 h-5 b-4',
//   md: 'w-[22px] h-[22px] b-3',
//   lg: 'w-6 h-6 b-2',
//   hf: 'h-5 w-5 b5',
// },

export type ButtonSizeTypes =
  | 'sm'
  | 'md'
  | 'lg'
  | 'hf'
  | 'kakao'
  | 'naver'
  | 'google';

// hf 사이즈는 '중복확인', 헤더에 로그인, 로그아웃, 관심종목에 '추가', 마이페이지에 '정보 수정' 버튼 등에 사용
