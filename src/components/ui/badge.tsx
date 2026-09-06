import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors select-none',
  {
    variants: {
      variant: {
        default:
          'bg-[#b88548] text-white border border-transparent shadow-2xs',
        secondary:
          'bg-[#f5efe4] text-[#7a6a5b] border border-[#ebd8c0]',
        outline:
          'bg-white text-[#423830] border border-[#ebd8c0]',
        gold:
          'bg-[#faf1e3] text-[#855b25] border border-[#ebd8bd]',
        success:
          'bg-emerald-50 text-emerald-700 border border-emerald-200',
        destructive:
          'bg-red-50 text-red-700 border border-red-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
