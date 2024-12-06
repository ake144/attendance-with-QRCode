'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'

interface DateRangeFormProps {
  onSubmit: (startDate: Date, endDate: Date) => void
}

export function DateRangeForm({ onSubmit }: DateRangeFormProps) {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (startDate && endDate) {
      onSubmit(startDate, endDate)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex flex-wrap gap-4 items-end">
      <div>
        <label htmlFor="start-date" className="block text-sm font-medium mb-1">Start Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-[200px] justify-start text-left font-normal ${!startDate && "text-muted-foreground"}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <label htmlFor="end-date" className="block text-sm font-medium mb-1">End Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-[200px] justify-start text-left font-normal ${!endDate && "text-muted-foreground"}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button type="submit" disabled={!startDate || !endDate}>Fetch Attendance Data</Button>
    </form>
  )
}

