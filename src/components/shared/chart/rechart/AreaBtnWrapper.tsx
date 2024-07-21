export default function AreaBtnWrapper({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (
    e:
      | React.MouseEvent<HTMLUListElement>
      | React.KeyboardEvent<HTMLUListElement>,
  ) => void;
}) {
  return (
    <ul className={className} onClick={onClick}>
      {children}
    </ul>
  );
}
