import ProfileUpdate from '@/components/user/ProfileUpdated';
import CheckPassword from '@/components/user/CheckPassword';
import UserAccountEdit from '@/components/user/UserAccountEdit';
import { auth as getSession } from '@/auth';
import { Session } from 'next-auth';

export default async function Modals() {
  const { user } = (await getSession()) as Session;

  return (
    <>
      <ProfileUpdate user={user} />
      <CheckPassword />
      <UserAccountEdit />
    </>
  );
}
