export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 21s-7-6.4-7-11.6C5 5.3 8.1 2.5 12 2.5s7 2.8 7 6.9C19 14.6 12 21 12 21z" />
      <path d="M9 10.2l2 2 4-4.2" />
    </svg>
  );
}