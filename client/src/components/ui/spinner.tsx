import { ComponentProps } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Spinner = ({
  className,
  ...props
}: ComponentProps<typeof Loader2>) => {
  return (
    <Loader2
      className={cn('h-8 w-8 animate-spin text-primary', className)}
      {...props}
    />
  );
};
