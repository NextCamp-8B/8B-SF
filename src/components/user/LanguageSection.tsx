import { LanguageType } from './types';
import LanguageButton from '../shared/buttons/LanguageButton';
import SectionBox from './SectionBox';

type LanguageSectionProps = {
  selectedLanguage: LanguageType;
  setSelectedLanguage: (language: LanguageType) => void;
};

export default function LanguageSection({
  selectedLanguage,
  setSelectedLanguage,
}: LanguageSectionProps) {
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
          checked={selectedLanguage === 'kr'}
          onClick={() => setSelectedLanguage('kr')}
        />
        <LanguageButton.Us
          checked={selectedLanguage === 'us'}
          onClick={() => setSelectedLanguage('us')}
        />
        <LanguageButton.Cn
          checked={selectedLanguage === 'cn'}
          onClick={() => setSelectedLanguage('cn')}
        />
        <LanguageButton.Jp
          checked={selectedLanguage === 'jp'}
          onClick={() => setSelectedLanguage('jp')}
        />
        <LanguageButton.Fr
          checked={selectedLanguage === 'fr'}
          onClick={() => setSelectedLanguage('fr')}
        />
      </div>
    </>
  );
}
