
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Download } from "lucide-react";

// Generate mock data for the device
const generateMockData = (deviceId: string) => {
  const now = new Date();
  const data = [];
  
  for (let i = 0; i < 20; i++) {
    const timestamp = new Date(now.getTime() - i * 3600000); // Every hour
    data.push({
      id: `${deviceId}-reading-${i}`,
      timestamp: timestamp.toISOString(),
      totalizer: (1245.67 - i * 0.5).toFixed(2),
      flowRate: (12.5 - (Math.random() * 5)).toFixed(2),
      temperature: (22.4 + (Math.random() * 2 - 1)).toFixed(1),
      battery: Math.max(30, 85 - i),
      signal: Math.max(0, 92 - i * 2),
    });
  }
  
  return data;
};

interface DeviceDataTableProps {
  deviceId: string;
}

const DeviceDataTable: React.FC<DeviceDataTableProps> = ({ deviceId }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const mockData = generateMockData(deviceId);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="grid gap-2">
          <div className="text-sm font-medium">Start Date</div>
          <DatePicker date={startDate} setDate={setStartDate} />
        </div>
        <div className="grid gap-2">
          <div className="text-sm font-medium">End Date</div>
          <DatePicker date={endDate} setDate={setEndDate} />
        </div>
        <Button className="ml-auto">
          <Download className="h-4 w-4 mr-2" /> Export Data
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Totalizer (m³)</TableHead>
              <TableHead>Flow Rate (m³/h)</TableHead>
              <TableHead>Temperature (°C)</TableHead>
              <TableHead>Battery (%)</TableHead>
              <TableHead>Signal (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((reading) => (
              <TableRow key={reading.id}>
                <TableCell>
                  {new Date(reading.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{reading.totalizer}</TableCell>
                <TableCell>{reading.flowRate}</TableCell>
                <TableCell>{reading.temperature}</TableCell>
                <TableCell>{reading.battery}</TableCell>
                <TableCell>{reading.signal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DeviceDataTable;
