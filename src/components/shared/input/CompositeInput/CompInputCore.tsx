type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export default function CompInputCore({
  className,
  ...props
}: Props) {
  return <input className={className} name={props.id} {...props} />;
}
