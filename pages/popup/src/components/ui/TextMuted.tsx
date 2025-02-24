import { cn } from '@/lib/utils';

const variants = {
  s: 'text-neutral06 font-normal text-xs',
  m: 'text-neutral08 font-normal text-sm text-center',
};

function TextMuted({
  className,
  children,
  variant = 's',
}: {
  className?: string;
  children?: React.ReactNode;
  variant?: 's' | 'm';
}) {
  return <p className={cn(variants[variant], className)}>{children}</p>;
}

export default TextMuted;
