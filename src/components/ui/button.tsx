import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xs font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88548] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-[#b88548] text-white hover:bg-[#a07136] shadow-sm hover:shadow-md border border-[#a07136]/30',
        secondary:
          'bg-[#f5efe4] text-[#423830] hover:bg-[#ebd8c0] border border-[#ebd8c0]',
        outline:
          'bg-white text-[#2c2520] border border-[#ebd8c0] hover:bg-[#fbf8f2] hover:border-[#b88548]/60 shadow-2xs',
        ghost:
          'text-[#423830] hover:bg-[#f5efe4] hover:text-[#2c2520]',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 shadow-sm',
        link:
          'text-[#b88548] underline-offset-4 hover:underline p-0 h-auto font-medium',
        gold:
          'bg-[#faf1e3] text-[#855b25] border border-[#d6ba92] hover:bg-[#ebd8bd] shadow-2xs font-bold uppercase tracking-wider',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-[11px] rounded-lg',
        lg: 'h-12 px-6 text-sm rounded-xl',
        icon: 'h-9 w-9 p-0 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
