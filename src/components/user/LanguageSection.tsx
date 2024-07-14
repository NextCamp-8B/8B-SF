'use client';
import { useState } from 'react';
import LanguageButton from '../shared/buttons/LanguageButton';
import SectionBox from './SectionBox';
import { Locale } from '@/types/next-auth';

export default function LanguageSection() {
  const [selectedLanguage, setSelectedLanguage] =
    useState<Locale>('ko');

  return (
    <>
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
          onClick={() => setSelectedLanguage('ko')}
        />
        <LanguageButton.Us
          checked={selectedLanguage === 'en'}
          onClick={() => setSelectedLanguage('en')}
        />
        <LanguageButton.Cn
          checked={selectedLanguage === 'zh'}
          onClick={() => setSelectedLanguage('zh')}
        />
        <LanguageButton.Jp
          checked={selectedLanguage === 'ja'}
          onClick={() => setSelectedLanguage('ja')}
        />
        <LanguageButton.Fr
          checked={selectedLanguage === 'fr'}
          onClick={() => setSelectedLanguage('fr')}
        />
      </div>
    </>
  );
}
