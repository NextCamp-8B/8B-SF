import Link from 'next/link';
import { SectionType } from '@/types/mypage';
type SidebarItemProps = {
  section: SectionType;
  selectedSection: SectionType;
  label: string;
};

export default function SidebarItem({
  section,
  selectedSection,
  label,
}: SidebarItemProps) {
  const isSelected = selectedSection === section;
  return (
    <li className={`${isSelected ? 'relative font-bold' : ''}`}>
      <Link href={`/user/${section}`}> {label}</Link>
      {isSelected && (
        <div className="absolute -left-[24px] -top-3 bottom-0 w-2 h-14 bg-primary-900"></div>
      )}
    </li>
  );
}
