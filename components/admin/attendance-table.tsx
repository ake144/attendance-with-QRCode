import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

  interface AttendanceData {
    name: string
    phone: string
    attendanceCount: number
    }
  
  interface AttendanceTableProps {
    data: AttendanceData[]
  }
  
  export function AttendanceTable({ data }: AttendanceTableProps) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Attendance Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell className="text-right">{item.attendanceCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
  
  