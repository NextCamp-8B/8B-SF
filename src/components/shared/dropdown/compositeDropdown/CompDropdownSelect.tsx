import Down from '@/assets/icons/down.svg';

export default function CompDropdownSelect({
  children,
  classNameWrapper,
  classNameSelected,
  classNameSVG,
}: {
  children: React.ReactNode;
  className?: string;
  classNameWrapper?: string;
  classNameSelected?: string;
  classNameSVG?: string;
}) {
  /**
   * span: 314 / (314 + 24) = 0.929
     Down: 24 / (314 + 24) = 0.071
   */
  return (
    <div tabIndex={0} className={classNameWrapper}>
      <span className={classNameSelected}>{children}</span>
      <Down className={classNameSVG} />
    </div>
  );
}
