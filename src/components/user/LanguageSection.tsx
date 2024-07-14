'use client';
import { useEffect, useState } from 'react';
import LanguageButton from '../shared/buttons/LanguageButton';
import SectionBox from './SectionBox';
import { Locale } from '@/types/next-auth';
import useSessionData from '@/hooks/user/useSessionData';
import { useRouter } from 'next/navigation';
import AuthPopup from '../signup/Popup';
import usePopupStore from '@/store/userPopup';

export default function LanguageSection() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] =
    useState<Locale>('ko');
  const { user, update } = useSessionData();
  const { isShowPopup, popupMsg, hidePopup, showPopup } =
    usePopupStore();

  // 초기 언어 값 설정
  useEffect(() => {
    if (user?.language) {
      setSelectedLanguage(user.language);
    }
  }, [user]);

  const handleLanguageChange = async (language: Locale) => {
    setSelectedLanguage(language);

    // 서버에 요청 보내기
    const formData = new FormData();
    formData.append('language', language);
    formData.append('accessToken', user.accessToken);
    formData.append('refreshToken', user.refreshToken);

    const response = await fetch('/api/language', {
      method: 'POST',
      body: formData,
    });
    try {
      if (response.ok) {
        const { data } = await response.json();
        await update({ ...data.user.user_metadata });
        router.replace(`/${language}/user/language`);
      } else {
        showPopup(
          '언어 설정 실패',
          '다시 시도하시거나, 고객센터에 문의해주세요.',
        );
      }
    } catch (error: any) {
      showPopup('언어 설정 실패', error);
    }
  };
  return (
    <>
      {isShowPopup && (
        <AuthPopup
          onClose={hidePopup}
          error={true}
          title={popupMsg.title}
          errorMessage={popupMsg.msg}
        />
      )}
      <SectionBox
        title=" 언어설정"
        description="  이 설정에서 번역할 언어를 선택하시면 뉴스 및
                      리포트에서 설정하신 언어로 번역정보를 확인할
                      수 있습니다."
      />
      <div className="flex gap-4 flex-wrap">
        {/* language 버튼 */}
        <LanguageButton
          checked={selectedLanguage === 'ko'}
          onClick={() => handleLanguageChange('ko')}
        />
        <LanguageButton.Us
          checked={selectedLanguage === 'en'}
          onClick={() => handleLanguageChange('en')}
        />
        <LanguageButton.Cn
          checked={selectedLanguage === 'zh'}
          onClick={() => handleLanguageChange('zh')}
        />
        <LanguageButton.Jp
          checked={selectedLanguage === 'ja'}
          onClick={() => handleLanguageChange('ja')}
        />
        <LanguageButton.Fr
          checked={selectedLanguage === 'fr'}
          onClick={() => handleLanguageChange('fr')}
        />
      </div>
    </>
  );
}
