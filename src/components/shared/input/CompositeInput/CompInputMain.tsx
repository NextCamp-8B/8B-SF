type Props = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
  className?: string;
};

export default function CompInputMain({
  children,
  className,
}: Props) {
  return <div className={className}>{children}</div>;
}
