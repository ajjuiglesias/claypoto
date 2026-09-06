import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[90px] w-full rounded-xl border border-[#ebd8c0] bg-white px-3.5 py-2.5 text-sm text-[#2c2520] placeholder:text-[#9e8976] focus-visible:outline-none focus-visible:border-[#b88548] focus-visible:ring-1 focus-visible:ring-[#b88548] disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-2xs resize-y',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
