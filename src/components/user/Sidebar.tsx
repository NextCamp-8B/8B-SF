'use client';
import Wrapper from '@/components/shared/Wrapper';
import SidebarItem from '@/components/user/SidebarItem';
import { usePathname } from 'next/navigation';
import { SectionType } from '@/types/mypage';
import { useTranslations } from 'next-intl';

export default function Sidebar() {
  const t = useTranslations();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const selectedSection = pathSegments[
    pathSegments.length - 1
  ] as SectionType; // 경로의 마지막 부분 추출

  return (
    <>
      <Wrapper padding="px-6 py-8" width="w-[285px]">
        <div className="h-full pr-4 w-64">
          <ul className="space-y-8 text-primary-900 b2 font-medium">
            <SidebarItem
              section="profile"
              selectedSection={selectedSection}
              label={t('MyPage.personal_information')}
            />
            <SidebarItem
              section="language"
              selectedSection={selectedSection}
              label={t('MyPage.languages')}
            />
            <SidebarItem
              section="terms"
              selectedSection={selectedSection}
              label={t('MyPage.terms_of_use')}
            />
          </ul>
        </div>
      </Wrapper>
    </>
  );
}
