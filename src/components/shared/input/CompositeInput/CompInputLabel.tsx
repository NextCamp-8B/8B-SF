type Props = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
  className?: string;
};

export default function CompInputLabel({
  children,
  className,
  ...props
}: Props) {
  return (
    <label className={className} {...props}>
      {children}
    </label>
  );
}
