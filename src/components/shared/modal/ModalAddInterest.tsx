import ModalLayout from './ModalLayout';
import InputSet from '../input';
import Searched from '@/components/stock/interest/Searched';
import Recent from '@/components/stock/interest/Recent';
import Popular from '@/components/stock/interest/Popular';
import { useCallback, useEffect, useState } from 'react';
import { businessAPI } from '@/service/apiInstance';
import useDebounce from '@/hooks/useDebounce';
import { UUID } from 'crypto';
import { useGetPopular } from '@/hooks/useGetPopular';
import { useGetRecent } from '@/hooks/useGetRecent';
import { UserData } from '@/service/serviceType';
import { useTranslations } from 'next-intl';

export default function ModalAddInterest({
  isOpen,
  handleIsOpen,
  user,
}: {
  isOpen: boolean;
  handleIsOpen: () => void;
  user: UserData;
}) {
  const [searched, setSearched] = useState([]);
  const [searchText, setSearchText] = useState('');
  const { searchStock } = businessAPI;
  const userId = user && (user.id as UUID);
  const { popularStocks } = useGetPopular();
  const { recentStocks } = useGetRecent({ userId });
  const debouncedSearchText = useDebounce(searchText, 1000);
  const t = useTranslations();
  const fetchSearchResults = useCallback(
    (text: string) => {
      if (text && userId) {
        searchStock({ searchText: text, userId }).then((res) => {
          setSearched(res);
        });

        return;
      }

      setSearched([]);
    },
    [searchStock, userId],
  );

  useEffect(() => {
    fetchSearchResults(debouncedSearchText);
  }, [debouncedSearchText, fetchSearchResults]);

  useEffect(() => {
    if (!isOpen) {
      setSearchText('');
      setSearched([]);
    }
  }, [isOpen]);

  return (
    <ModalLayout
      title={t('InterestStock.add_stock_title')}
      isOpen={isOpen}
      handleIsOpen={handleIsOpen}
      width="w-[794px]"
    >
      <InputSet.Search
        onSubmit={fetchSearchResults}
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />

      {searched.length > 0 ? (
        <Searched searched={searched} userId={userId} />
      ) : (
        <>
          <Recent recentStocks={recentStocks} />
          <Popular popularStocks={popularStocks} />
        </>
      )}
    </ModalLayout>
  );
}
