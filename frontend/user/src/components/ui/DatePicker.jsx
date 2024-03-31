"use client";
import * as React from "react";
import { format, isBefore, isToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DatePicker({ onSelectDate  }) {
  const [date, setDate] = React.useState();
  const handleDateSelect = (selectedDate) => {
    if (!isBefore(selectedDate, new Date()) || isToday(selectedDate)) {
      setDate(selectedDate);
      onSelectDate(selectedDate);
    } else {
      console.error("Selected date must be today or a future date");
      alert("Selected date must be today or a future date");
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}