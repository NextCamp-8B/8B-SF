export default function ChartLabel({
  as: Tag = 'div',
  children,
  className,
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) {
  return <Tag className={className}>{children}</Tag>;
}
