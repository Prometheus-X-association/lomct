import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';
import { Control, FieldValues, Path } from 'react-hook-form';
import { cn } from '@src/lib/utils';

interface ICFormFieldProps<TFieldValues extends FieldValues> {
  required?: boolean;
  labelText?: string;
  tooltipText?: string;
  tooltipClassName?: string;
  placeholder: string;
  startAdornment?: React.ReactNode;
  control: Control<TFieldValues> | undefined;
  name: Path<TFieldValues>;
  onPasteBtnClick?: (val: string) => void;
}

function CFormField<TFieldValues extends React.ComponentProps<typeof Input>>({
  required,
  labelText,
  tooltipText,
  placeholder,
  startAdornment,
  control,
  name,
  onPasteBtnClick,
  tooltipClassName,
  ...props
}: ICFormFieldProps<TFieldValues>) {
  const [isShowTooltip, setIsShowTooltip] = React.useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="w-full">
          {labelText && (
            <FormLabel aria-required={!!required} className="font-normal">
              {labelText}
            </FormLabel>
          )}
          {tooltipText && isShowTooltip && (
            <span className="relative animate-in fade-in-0 zoom-in-95">
              <span
                className={cn(
                  'absolute bottom-0 left-1 w-[335px] bg-mainBlue09 rounded-t-lg rounded-r-lg p-3 text-white',
                  tooltipClassName,
                )}>
                {tooltipText}
              </span>
            </span>
          )}

          <FormControl>
            <Input
              required={!!required}
              isError={!!fieldState.error}
              placeholder={placeholder}
              startAdornment={startAdornment}
              onTooltipToggle={tooltipText ? isShow => setIsShowTooltip(isShow) : undefined}
              onPasteBtnClick={onPasteBtnClick}
              {...field}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CFormField;
