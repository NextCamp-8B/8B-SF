import InputSet from '../shared/input';
import TextButton from '../shared/buttons/TextButton';
import { ChangeEvent, FormEvent } from 'react';
import { useTranslations } from 'next-intl';

type UserAccountForm = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isSubmit: boolean;
  value: {
    signupId: string;
    name: string;
    signupPhone: string;
    birth: string;
  };
  onChangeInputValue: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDuplicate: () => Promise<'duplicate' | 'possible'>;
  isLoading: boolean;
  isSocial: boolean;
  handleUpdatePw: () => Promise<void>;
  handleShowWidthdrawl: () => void;
};

export default function UserAccountForm({
  onSubmit,
  isSubmit,
  value,
  onChangeInputValue,
  handleDuplicate,
  isLoading,
  isSocial,
  handleUpdatePw,
  handleShowWidthdrawl,
}: UserAccountForm) {
  const t = useTranslations();
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-start w-[386px] h-full"
    >
      <InputSet className="flex flex-col gap-4">
        {!isSocial && (
          <InputSet.DuplicateCheck
            onChange={onChangeInputValue}
            onClick={handleDuplicate}
            value={value.signupId}
            type="text"
            concept="signupId"
            isLoading={isLoading}
            isSubmit={isSubmit}
          />
        )}
        <InputSet.Validated
          onChange={onChangeInputValue}
          value={value.name}
          type="text"
          concept="name"
          isSubmit={isSubmit}
        />
        <InputSet.Validated
          onChange={onChangeInputValue}
          value={value.signupPhone}
          type="text"
          concept="signupPhone"
          isSubmit={isSubmit}
        />
        <InputSet.Validated
          onChange={onChangeInputValue}
          value={value.birth}
          type="text"
          concept="birth"
          isSubmit={isSubmit}
        />
        <TextButton type="submit" className="w-full mt-8">
          {t('MyPage.edit')}
        </TextButton>
      </InputSet>
      {!isSocial && (
        <button
          onClick={handleUpdatePw}
          type="button"
          className="border-none bg-grayscale-0 text-center mt-4"
        >
          {t('MyPage.change_password')}
        </button>
      )}
      <button
        type="button"
        className="border-none bg-grayscale-0 text-center underline mt-4 text-warning-100"
        onClick={handleShowWidthdrawl}
      >
        {t('MyPage.delete_account')}
      </button>
    </form>
  );
}
