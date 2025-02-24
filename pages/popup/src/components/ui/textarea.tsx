import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  startAdornment?: React.ReactNode;
  isError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, isError, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <textarea
      className={cn(
        'p-2 min-h-[80px] bg-mainBlue01 rounded-xl w-full focus-visible:outline-none',
        isFocused && !isError && 'bg-mainBlue02',
        isError && 'bg-signalRed02',
        className,
      )}
      ref={ref}
      {...props}
      onFocus={() => {
        props.onFocus?.();
        setIsFocused(true);
      }}
      onBlur={() => {
        props.onBlur?.();
        setIsFocused(false);
      }}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
