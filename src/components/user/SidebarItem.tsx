'use client';

import { SectionType } from './types';
type SidebarItemProps = {
  section: SectionType;
  selectedSection: SectionType;
  handleSelectedSection: (section: SectionType) => void;
  label: string;
};

export default function SidebarItem({
  section,
  selectedSection,
  handleSelectedSection,
  label,
}: SidebarItemProps) {
  const isSelected = selectedSection === section;
  return (
    <li className={`${isSelected ? 'relative font-bold' : ''}`}>
      <button onClick={() => handleSelectedSection(section)}>
        {label}
      </button>
      {isSelected && (
        <div className="absolute -left-[24px] -top-3 bottom-0 w-2 h-14 bg-primary-900"></div>
      )}
    </li>
  );
}
