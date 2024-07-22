import React from 'react';
import { SelectedOption } from '../shared/dropdown/types';
import { Dropdown } from '../shared/dropdown';
import CompositeInput from '../shared/input/CompositeInput';
import TextButton from '@/components/shared/buttons/TextButton';
import InputSet from '@/components/shared/input';
import { useTranslations } from 'next-intl';

type WithdrawalForm = {
  reason: string;
  etc: string;
  setEtc: (value: string) => void;
  handleSelected: (value: SelectedOption) => void;
};

export default function WithdrawalForm({
  reason,
  etc,
  setEtc,
  handleSelected,
}: WithdrawalForm) {
  const t = useTranslations('MyPage');

  const withdrawalOptions: SelectedOption[] = [
    {
      value: 'reason1',
      text: t('reason_1'),
      selected: false,
    },
    {
      value: 'reason2',
      text: t('reason_2'),
      selected: false,
    },
    {
      value: 'reason3',
      text: t('reason_3'),
      selected: false,
    },
    {
      value: 'reason4',
      text: t('reason_4'),
      selected: false,
    },
    {
      value: 'reason5',
      text: t('reason_5'),
      selected: false,
    },
  ];

  return (
    <InputSet className="flex flex-col gap-2 w-[386px]">
      <Dropdown.Default
        label={t('delete_account_reason')}
        initialOptions={withdrawalOptions}
        selectOption={handleSelected}
      />
      {reason === t('reason_5') && (
        <CompositeInput.Input
          id="stock"
          type="text"
          value={etc}
          onChange={(e) => setEtc(e.target.value)}
          className="border border-grayscale-400 b4 font-normal placeholder-grayscale-400 p-4 rounded-lg"
          placeholder={t('placeholder_account')}
        />
      )}
      <TextButton className="w-full mt-8">
        {t('delete_account')}
      </TextButton>
    </InputSet>
  );
}
