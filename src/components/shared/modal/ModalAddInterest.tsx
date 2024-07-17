import ModalLayout from './ModalLayout';
import InputSet from '../input';
import Searched from '@/components/stock/interest/Searched';
import Recent from '@/components/stock/interest/Recent';
import Popular from '@/components/stock/interest/Popular';
import { useCallback, useEffect, useState } from 'react';
import { businessAPI } from '@/service/apiInstance';
import useDebounce from '@/hooks/useDebounce';

export default function ModalAddInterest({
  isOpen,
  handleIsOpen,
}: {
  isOpen: boolean;
  handleIsOpen: () => void;
}) {
  const [searched, setSearched] = useState([]);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 1000);
  const { searchStock } = businessAPI;

  const fetchSearchResults = useCallback(
    (text: string) => {
      if (text) {
        searchStock({ searchText: text }).then((res) => {
          setSearched(res.stocks);
        });

        return;
      }

      setSearched([]);
    },
    [searchStock],
  );

  useEffect(() => {
    fetchSearchResults(debouncedSearchText);
  }, [debouncedSearchText, fetchSearchResults]);

  return (
    <ModalLayout
      title="관심 종목 추가"
      isOpen={isOpen}
      handleIsOpen={handleIsOpen}
    >
      <InputSet.Search
        onSubmit={fetchSearchResults}
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />

      {searched.length > 0 ? (
        <Searched />
      ) : (
        <>
          <Recent />
          <Popular />
        </>
      )}
    </ModalLayout>
  );
}
