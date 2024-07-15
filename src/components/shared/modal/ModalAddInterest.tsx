import ModalLayout from './ModalLayout';
import InputSet from '../input';
import Searched from '@/components/stock/interest/Searched';
import Recent from '@/components/stock/interest/Recent';
import Popular from '@/components/stock/interest/Popular';

export default function ModalAddInterest({
  isOpen,
  handleIsOpen,
}: {
  isOpen: boolean;
  handleIsOpen: () => void;
}) {
  return (
    <ModalLayout
      title="관심 종목 추가"
      isOpen={isOpen}
      handleIsOpen={handleIsOpen}
    >
      <InputSet.Search />
      {/* 검색 결과 */}
      <Searched />
      {/* 최근 검색한 종목 */}
      <Recent />
      {/* 인기 검색어 */}
      <Popular />
    </ModalLayout>
  );
}
