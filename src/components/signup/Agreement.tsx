import React, { useState, useEffect } from 'react';
import AgreementBox from '@/components/signup/AgreementBox';
import Wrapper from '@/components/shared/Wrapper';
import CheckBox from '@/components/shared/Checkbox';
import TextButton from '@/components/shared/buttons/TextButton';
import usePageStore from '@/store/signupStepStore';
import { useTranslations } from 'next-intl';

export default function Agreement() {
  const { setPageStep } = usePageStore();
  const t = useTranslations();

  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [policyChecked, setPolicyChecked] = useState(false);

  const handleAllCheckedChange = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setTermsChecked(newChecked);
    setPolicyChecked(newChecked);
  };

  const handleTermsChange = () => {
    const newChecked = !termsChecked;
    setTermsChecked(newChecked);
  };

  const handlePolicyChange = () => {
    const newChecked = !policyChecked;
    setPolicyChecked(newChecked);
  };

  useEffect(() => {
    setAllChecked(termsChecked && policyChecked);
  }, [termsChecked, policyChecked]);

  return (
    <Wrapper padding="px-24 py-20" width="w-[616px]">
      <div className="flex flex-col justify-center w-[412px]">
        <h3 className="h3 font-bold text-center mb-10 text-primary-900">
          {t('SignUp.terms')}
        </h3>

        {/* 약관동의*/}
        <div className="flex flex-col gap-y-4">
          {/* 이용약관 개인정보 처리방침 */}
          <div className="w-full flex justify-between items-center">
            <span className="b3">{t('SignUp.agree_all')}</span>
            <CheckBox.Rounded
              className="ml-auto"
              checked={allChecked}
              onChange={handleAllCheckedChange}
            />
          </div>

          <hr className="w-full border-t border-grayscale-400" />

          {/* 서비스 이용약관(필수) */}
          <AgreementBox
            title={t('SignUp.terms_of_use')}
            content={t('SignUp.Agreement.serviceTerms')}
            checkboxLabel={t('SignUp.agree')}
            checked={termsChecked}
            onChange={handleTermsChange}
          />

          {/* 개인정보 처리방침(필수) */}
          <AgreementBox
            title={t('SignUp.privacy_policy')}
            content={t('SignUp.Agreement.privacyPolicy')}
            checkboxLabel={t('SignUp.agree')}
            checked={policyChecked}
            onChange={handlePolicyChange}
          />
        </div>
        <TextButton
          disabled={!allChecked}
          className="w-full mx-auto mt-8"
          onClick={() => setPageStep('auth')}
        >
          {t('SignUp.next')}
        </TextButton>
      </div>
    </Wrapper>
  );
}
