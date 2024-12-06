'use client'

import { AttendanceTable } from '@/components/admin/attendance-table'
import { DateRangeForm } from '@/components/admin/date-range-form'
import { useState } from 'react'


interface AttendanceData {
    name: string
    phone: string
    attendanceCount: number
    }



export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([])



  const fetchAttendance = async (startDate: Date, endDate: Date, order = "desc") => {
    try {
      const response = await fetch(`/api/trackUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate, order }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch attendance data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };



  
const handleDateRangeSubmit = async (startDate: Date, endDate: Date) => {

    const data = await fetchAttendance(startDate, endDate);

    setAttendanceData(data)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Attendance Tracker</h1>
      <DateRangeForm onSubmit={handleDateRangeSubmit} />
      <AttendanceTable data={attendanceData} />
    </div>
  )
}

