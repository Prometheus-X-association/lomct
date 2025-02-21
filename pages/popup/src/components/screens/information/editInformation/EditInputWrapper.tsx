import TextMuted from '@/components/ui/TextMuted';
import { cn } from '@/lib/utils';
import { PropsWithChildren, ReactNode } from 'react';

type Chip = {
  icon?: ReactNode;
  text: string;
};

type EditInputWrapperProps = {
  titleIcon: ReactNode;
  title: string;
  value: string | Chip[];
  isDescription?: boolean;
  children: ReactNode;
  required?: boolean;
};

function EditInputWrapper({
  titleIcon,
  title,
  value,
  isDescription,
  required,
  children,
}: PropsWithChildren<EditInputWrapperProps>) {
  return (
    <div className="p-2 flex flex-col gap-3 bg-white rounded-2xl">
      <div
        className={cn('flex gap-2', typeof value === 'string' && 'items-center', isDescription && value && 'flex-col')}>
        <div>
          <div className="flex gap-1 items-center">
            {titleIcon}
            <b className={cn('font-medium', required && 'after:content-["_*"] after:text-[#F64E4E]')}>{title}:</b>
          </div>
        </div>
        {typeof value === 'string' ? (
          <TextMuted>{value}</TextMuted>
        ) : (
          <div className={cn('flex-1', isDescription && 'ml-3')}>
            {value.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1 bg-neutral01 py-0.5 px-2 mr-1 mb-1 rounded-xl">
                {item.icon} {item.text}
              </span>
            ))}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

export default EditInputWrapper;
