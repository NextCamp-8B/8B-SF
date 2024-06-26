'use client';

import Close from '@/assets/icons/close.svg';

type deleteProps = {
  type: 'all' | 'select';
  id?: string;
  data?: string;
  iscompleted?: boolean;
};

export default function DeleteSearch({
  type,
  data,
  onClick,
}: {
  type: 'all' | 'select';
  data: deleteProps[] | deleteProps | null;
  onClick?: () => void;
}) {
  return (
    <>
      {type === 'all' && (
        <button
          className="text-grayscale-600 font-medium text-md underline"
          onClick={onClick}
        >
          전체삭제
        </button>
      )}
      {type === 'select' && (
        <div onClick={onClick}>
          <Close width={24} height={24} />
        </div>
      )}
    </>
  );
}
