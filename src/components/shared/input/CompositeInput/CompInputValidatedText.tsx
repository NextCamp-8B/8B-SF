type Props = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
  className?: string;
};

export default function CompoInputMain({
  children,
  className,
}: Props) {
  return <p className={className}>{children}</p>;
}
