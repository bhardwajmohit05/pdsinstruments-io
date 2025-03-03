
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Battery, Signal, Download, BarChart4, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DeviceChart from "@/components/devices/DeviceChart";
import DeviceDataTable from "@/components/devices/DeviceDataTable";

const DeviceDetail = () => {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState("daily");
  const [isUploading, setIsUploading] = useState(false);

  // Mock device data - in a real app, you would fetch this based on deviceId
  const device = {
    id: deviceId || "FL-001",
    name: "Flow Meter 1",
    type: "Flow Meter",
    user: "John Doe",
    status: "Online",
    lastSeen: "Just now",
    battery: 85,
    signal: 92,
    lastReading: {
      timestamp: new Date().toISOString(),
      totalizer: 1245.67,
      flowRate: 12.5,
      temperature: 22.4,
    },
  };

  // Function to download report
  const handleDownloadReport = () => {
    toast({
      title: "Report Requested",
      description: "Your report is being generated and will download shortly.",
    });
    // In a real app, this would trigger a download
  };

  // Function to send data to HWRA
  const handleSendToHWRA = () => {
    setIsUploading(true);
    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Data Sent Successfully",
        description: "The data has been uploaded to HWRA portal.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{device.name}</h1>
              <p className="text-muted-foreground">Device ID: {device.id}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline"
                onClick={() => navigate(`/devices/${deviceId}/config`)}
              >
                Configure Device
              </Button>
              <Button 
                variant="outline"
                onClick={handleDownloadReport}
              >
                <Download className="h-4 w-4 mr-2" /> Download Report
              </Button>
              <Button 
                onClick={handleSendToHWRA}
                disabled={isUploading}
              >
                <Upload className="h-4 w-4 mr-2" /> {isUploading ? "Sending..." : "Send to HWRA"}
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Last Totalizer Reading
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{device.lastReading.totalizer.toFixed(2)} m³</div>
                <p className="text-xs text-muted-foreground">
                  Last updated: {new Date(device.lastReading.timestamp).toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Flow Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{device.lastReading.flowRate.toFixed(2)} m³/h</div>
                <p className="text-xs text-muted-foreground">
                  Last updated: {new Date(device.lastReading.timestamp).toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Battery Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Battery className="h-5 w-5" />
                  <div 
                    className={`text-2xl font-bold ${
                      device.battery > 50 ? "text-green-600" : 
                      device.battery > 20 ? "text-yellow-600" : "text-red-600"
                    }`}
                  >
                    {device.battery}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Estimated {Math.round(device.battery / 5)} days remaining
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Signal Strength
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Signal className="h-5 w-5" />
                  <div 
                    className={`text-2xl font-bold ${
                      device.signal > 70 ? "text-green-600" : 
                      device.signal > 30 ? "text-yellow-600" : "text-red-600"
                    }`}
                  >
                    {device.signal}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {device.signal > 70 ? "Excellent" : device.signal > 30 ? "Good" : "Poor"} connection
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="chart" className="space-y-4">
            <TabsList>
              <TabsTrigger value="chart">Charts</TabsTrigger>
              <TabsTrigger value="data">Raw Data</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>Consumption Data</CardTitle>
                    <CardDescription>
                      Water consumption over time
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="timeRange">Time Range:</Label>
                    <Select
                      defaultValue={timeRange}
                      onValueChange={setTimeRange}
                    >
                      <SelectTrigger className="w-[180px]" id="timeRange">
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <DeviceChart timeRange={timeRange} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="data">
              <Card>
                <CardHeader>
                  <CardTitle>Sensor Readings</CardTitle>
                  <CardDescription>
                    Raw sensor data from the device
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DeviceDataTable deviceId={device.id} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default DeviceDetail;
