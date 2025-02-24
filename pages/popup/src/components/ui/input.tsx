import * as React from 'react';

import { cn } from '@src/lib/utils';
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { ClipboardIcon, InfoIcon } from '@/assets/icons';
import { Button } from './button';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  tooltip?: string;
  onPasteBtnClick?: (val: string) => void;
  onTooltipToggle?: (isShow: boolean) => void;
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, startAdornment, endAdornment, onPasteBtnClick, tooltip, isError, onTooltipToggle, ...props },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div
        className={cn(
          'p-1 bg-mainBlue01 rounded-xl flex items-center gap-2',
          isFocused && !isError && 'bg-mainBlue02',
          isError && 'bg-signalRed02',
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}>
        {startAdornment && (
          <span
            className={cn(
              'py-2.5 px-3 bg-white rounded-xl border border-solid border-mainBlue02',
              isError && 'border-signalRed04',
            )}>
            {startAdornment}
          </span>
        )}
        <input
          type={type}
          className={cn(
            'w-full py-2 bg-transparent focus-visible:outline-none',
            !startAdornment && 'pl-3',
            !onPasteBtnClick && !endAdornment && !TooltipTrigger && 'pr-3',
            className,
          )}
          placeholder="Enter your email"
          ref={ref}
          {...props}
        />
        {onPasteBtnClick && (
          <Button
            variant="icon"
            size="icon"
            className="icon-button"
            onClick={async e => {
              e.preventDefault();
              e.stopPropagation();
              navigator.clipboard.readText().then(
                text => {
                  /* clipboard successfully set */
                  console.log('read lipboard successfully set text', text);
                  onPasteBtnClick(text);
                },
                e => {
                  /* clipboard write failed */
                  console.log('Clipboard read failed', e);
                },
              );
            }}>
            <ClipboardIcon />
          </Button>
        )}
        {endAdornment}
        {onTooltipToggle && (
          <Button
            variant="icon"
            size="icon"
            className="icon-button"
            onMouseOver={() => onTooltipToggle(true)}
            onMouseLeave={() => onTooltipToggle(false)}
            onFocus={() => onTooltipToggle(true)}
            onBlur={() => onTooltipToggle(false)}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}>
            <InfoIcon />
          </Button>
        )}

        {tooltip && !!onTooltipToggle && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className="icon-button"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}>
                <InfoIcon />
              </TooltipTrigger>
              <TooltipContent className="w-[335px] border-none" sideOffset={5}>
                {tooltip}
                <TooltipArrow className="translate-y-[-1px] fill-white animate-in fade-in-0 zoom-in-95 " />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
