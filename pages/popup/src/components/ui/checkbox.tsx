import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef } from 'react';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 border-2 border-cyan04 hover:border-cyan07 data-[state=checked]:border-cyan07 p-[1px] rounded-sm focus-visible:outline-none focus-visible:ring-2',
      className,
    )}
    {...props}>
    <CheckboxPrimitive.Indicator className={cn('flex h-full bg-cyan08 rounded-[2px]')} />
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
