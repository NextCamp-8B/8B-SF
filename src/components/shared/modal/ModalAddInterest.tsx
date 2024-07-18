import ModalLayout from './ModalLayout';
import InputSet from '../input';
import Searched from '@/components/stock/interest/Searched';
import Recent from '@/components/stock/interest/Recent';
import Popular from '@/components/stock/interest/Popular';
import { useCallback, useEffect, useState } from 'react';
import { businessAPI } from '@/service/apiInstance';
import useDebounce from '@/hooks/useDebounce';
import { useSession } from 'next-auth/react';
import { UUID } from 'crypto';
import { useGetPopular } from '@/hooks/useGetPopular';
import { useGetRecent } from '@/hooks/useGetRecent';

export default function ModalAddInterest({
  isOpen,
  handleIsOpen,
}: {
  isOpen: boolean;
  handleIsOpen: () => void;
}) {
  const [searched, setSearched] = useState([]);
  const [searchText, setSearchText] = useState('');
  const { searchStock } = businessAPI;
  const { data } = useSession();
  const userId = data?.user.id as UUID;
  const { popularStocks } = useGetPopular();
  const { recentStocks } = useGetRecent({ userId });
  const debouncedSearchText = useDebounce(searchText, 1000);
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

  return (
    <ModalLayout
      title="관심 종목 추가"
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
