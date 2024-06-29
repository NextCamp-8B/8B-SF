'use client';
import { SectionType } from './types';
import Wrapper from '@/components/shared/Wrapper';
import SidebarItem from '@/components/user/SidebarItem';

type SidebarProps = {
  handleSelectedSection: (section: SectionType) => void;
  selectedSection: SectionType;
};

export default function Sidebar({
  handleSelectedSection,
  selectedSection,
}: SidebarProps) {
  return (
    <>
      <Wrapper padding="px-6 py-8" width="w-[285px]">
        <div className="h-full pr-4 w-64">
          <ul className="space-y-8 text-primary-900 b2 font-medium">
            <SidebarItem
              section="profile"
              selectedSection={selectedSection}
              handleSelectedSection={handleSelectedSection}
              label="개인정보 수정"
            />
            <SidebarItem
              section="language"
              selectedSection={selectedSection}
              handleSelectedSection={handleSelectedSection}
              label="언어 설정"
            />
            <SidebarItem
              section="terms"
              selectedSection={selectedSection}
              handleSelectedSection={handleSelectedSection}
              label="서비스 이용약관"
            />
          </ul>
        </div>
      </Wrapper>
    </>
  );
}
