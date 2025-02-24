import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@src/lib/utils';
import { Spinner } from './spinner';

const buttonVariants = cva(
  'inline-flex items-center justify-center transition-colors whitespace-nowrap rounded-xl text-sm font-medium disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'font-normal  bg-[#1F8AFF] text-primary-foreground hover:bg-[#196ECC] focus-visible:ring-mainBlue05',
        icon: 'bg-mainBlue03 cursor-pointer hover:bg-mainBlue02 focus-visible:ring-mainBlue05',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'text-mainBlue07 hover:text-mainBlue08 group-hover:[&_path]:fill-mainBlue08 font-semibold focus-visible:ring-mainBlue02',
        link: 'flex gap-1 font-semibold text-sm group-hover:text-cyan09 group-hover:[&_path]:fill-cyan09 fill-cyan09 [&_path]:transition-colors focus-visible:ring-neutral03',
      },
      size: {
        default: 'h-10 px-4 py-2',
        s: 'p-2 rounded-xl',
        sm: 'rounded-[8px] p-1',
        lg: 'px-12 py-2',
        icon: 'py-2.5 px-2',
        xs: 'px-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        // children={<Spinner show={true} size="small" />}
      >
        <span className={cn(isLoading ? 'opacity-0 flex' : 'contents')}>{children}</span>
        {isLoading && (
          <span className="absolute">
            <Spinner show={true} size="small" />
          </span>
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
