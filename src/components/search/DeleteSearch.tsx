'use client';

import Close from '@/assets/icons/close.svg';
import { stocksProps } from './InputItem';

export default function DeleteSearch({
  type,
  data,
  session,
  setRecentDatas,
}: {
  type: 'all' | 'select';
  data?: stocksProps | null;
  session: any;
  setRecentDatas: (data: stocksProps[] | null) => void;
}) {
  const deleteStock = async () => {
    let url = `/api/search/recent?type=${type}&userId=${session.id}`;

    if (type === 'select' && data) {
      url += `&stockId=${data.stock_id}`;
    }

    const response = await fetch(url, { method: 'DELETE' });
    if (response.ok) {
      const updatedResponse = await fetch(
        `/api/search/recent?userId=${session.id}`,
      );
      if (updatedResponse.ok) {
        const updatedData = await updatedResponse.json();
        setRecentDatas(updatedData.stocks);
      }
    }
  };

  return (
    <>
      {type === 'all' && (
        <button
          className="text-grayscale-600 font-medium text-md underline"
          onClick={() => deleteStock()}
        >
          전체삭제
        </button>
      )}
      {type === 'select' && (
        <div onClick={() => deleteStock()}>
          <Close width={24} height={24} />
        </div>
      )}
    </>
  );
}
