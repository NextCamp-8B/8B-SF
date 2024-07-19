import { useTranslations } from 'next-intl';
import MyPageSection from './MyPageSection';
import TermsBox from './TermsBox';

export default function TermsSection() {
  const t = useTranslations('MyPage');
  return (
    <>
      <MyPageSection>
        <TermsBox
          title={t('terms_of_use')}
          content={t('terms_of_use_content')}
        />
      </MyPageSection>

      <MyPageSection>
        <TermsBox
          title={t('privacy_policy')}
          content={t('privacy_policy_content')}
        />
      </MyPageSection>
    </>
  );
}
