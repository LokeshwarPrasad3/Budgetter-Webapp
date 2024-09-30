import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerType {
  inputDate: Date | undefined;
  setInputDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function DatePicker({ inputDate, setInputDate }: DatePickerType) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !inputDate && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {inputDate ? (
            format(inputDate, 'PPP')
          ) : (
            <span>{new Date().toLocaleDateString()}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={inputDate}
          onSelect={setInputDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
