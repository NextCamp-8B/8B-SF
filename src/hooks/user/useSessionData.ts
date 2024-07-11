import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// 로그인 한 유저의 session 확인 커스텀 훅
// return 값
// useSsession 의 로딩 
// socail 유저인지 
// user 데이터 
const useSessionData = () => {
  const { data: session, status, update } = useSession();
  const [isSocial, setIsSocial] = useState(false);
  const provider = session?.user?.provider;
  useEffect(() => {
    if (status === 'authenticated'  &&  session?.user?.provider && provider === 'kakao' || provider === 'google' || provider === 'naver'  ) {
      setIsSocial(true);
    }
  }, [provider, session, status]);

  return { isSocial, loading: status === 'loading', user: session?.user as User, update };
};

export default useSessionData;
