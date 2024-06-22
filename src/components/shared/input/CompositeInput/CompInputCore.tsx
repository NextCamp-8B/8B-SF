type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export default function CompInputLabel({
  className,
  ...props
}: Props) {
  return <input className={className} {...props} />;
}
