import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-xl border border-[#ebd8c0] bg-white px-3.5 py-2 text-sm text-[#2c2520] placeholder:text-[#9e8976] focus-visible:outline-none focus-visible:border-[#b88548] focus-visible:ring-1 focus-visible:ring-[#b88548] disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-2xs',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
