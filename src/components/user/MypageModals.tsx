import React from 'react';
import ProfileUpdate from '@/components/user/ProfileUpdated';
import CheckPassword from '@/components/user/CheckPassword';
import UserAccountEdit from '@/components/user/UserAccountEdit';

export default function Modals() {
  return (
    <>
      <ProfileUpdate />
      <CheckPassword />
      <UserAccountEdit />
    </>
  );
}
