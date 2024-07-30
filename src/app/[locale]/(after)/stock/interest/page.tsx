'use client';

import ModalAddInterest from '@/components/shared/modal/ModalAddInterest';
import RequestWrapper from '@/components/stock/RequestWrapper';
import { UserData } from '@/service/serviceType';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

/**
 * @description
 *  - 반응형 대응 전까지 1214px 고정
 */
export default function Interest() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();
  const user = data?.user as UserData;
  const handleIsOpen = () => {
    setIsOpen((open) => !open);
  };

  return (
    <div
      className="w-full max-w-[1214px] min-w-[1214px] flex flex-col gap-6"
      aria-hidden={isOpen}
    >
      <ModalAddInterest
        isOpen={isOpen}
        handleIsOpen={handleIsOpen}
        user={user}
      />
      <RequestWrapper
        handleIsOpen={handleIsOpen}
        user={user}
        isOpen={isOpen}
      />
    </div>
  );
}
