export default function ModalTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={className} id="modal-title">
      {children}
    </h2>
  );
}
