'use client';
import { useEffect, useState } from 'react';
import LanguageButton from '../shared/buttons/LanguageButton';
import SectionBox from './SectionBox';
import { Locale } from '@/types/next-auth';
import useSessionData from '@/hooks/user/useSessionData';
import { useRouter } from 'next/navigation';
import AuthPopup from '../signup/Popup';
import usePopupStore from '@/store/userPopup';
import { useTranslations } from 'next-intl';

export default function LanguageSection() {
  const t = useTranslations('MyPage');
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
          t('languageSettingError.error'),
          t('languageSettingError.message'),
        );
      }
    } catch (error: any) {
      showPopup(t('languageSettingError.error'), error);
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
        title={t('languages')}
        description={t('languages_content')}
      />
      <div className="flex gap-4 flex-wrap">
        {/* language 버튼 */}
        <LanguageButton.Kr
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
