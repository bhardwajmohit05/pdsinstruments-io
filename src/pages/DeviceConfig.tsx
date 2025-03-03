
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const DeviceConfig = () => {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // Mock device config data
  const [deviceConfig, setDeviceConfig] = useState({
    general: {
      deviceName: "Flow Meter 1",
      location: "Water Treatment Plant",
      description: "Main water flow measurement device",
    },
    hwra: {
      breakdownTimeout: "300",
      type: "Flow Meter",
      NOC_Number: "HWRA-12345",
      ip: "192.168.1.100",
      port: "1883",
      userKey: "user_key_123",
      companyName: "Water Solutions Inc.",
      absractionStructureNumber: "AS-789",
      vendorFirmName: "IoSense Technologies",
      latitude: "28.6139",
      longitude: "77.2090",
    },
    communication: {
      mqttServer: "mqtt.example.com",
      mqttPort: "1883",
      mqttUsername: "device_fl001",
      mqttPassword: "******",
      useTLS: true,
      reportingInterval: "15",
    },
  });

  const handleInputChange = (section: keyof typeof deviceConfig, field: string, value: string | boolean) => {
    setDeviceConfig({
      ...deviceConfig,
      [section]: {
        ...deviceConfig[section],
        [field]: value,
      },
    });
  };

  const handleSaveConfig = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Configuration Saved",
        description: "Device configuration has been updated successfully.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Device Configuration</h1>
              <p className="text-muted-foreground">Device ID: {deviceId}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate(`/devices/${deviceId}`)}>
                Cancel
              </Button>
              <Button onClick={handleSaveConfig} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Configuration"}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="hwra">HWRA Integration</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Configure basic device information and settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="deviceName">Device Name</Label>
                    <Input
                      id="deviceName"
                      value={deviceConfig.general.deviceName}
                      onChange={(e) => handleInputChange("general", "deviceName", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Device Location</Label>
                    <Input
                      id="location"
                      value={deviceConfig.general.location}
                      onChange={(e) => handleInputChange("general", "location", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={deviceConfig.general.description}
                      onChange={(e) => handleInputChange("general", "description", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hwra">
              <Card>
                <CardHeader>
                  <CardTitle>HWRA Portal Integration</CardTitle>
                  <CardDescription>
                    Configure settings for the HWRA government portal integration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="breakdownTimeout">Breakdown Timeout (seconds) *</Label>
                      <Input
                        id="breakdownTimeout"
                        value={deviceConfig.hwra.breakdownTimeout}
                        onChange={(e) => handleInputChange("hwra", "breakdownTimeout", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Device Type *</Label>
                      <Input
                        id="type"
                        value={deviceConfig.hwra.type}
                        onChange={(e) => handleInputChange("hwra", "type", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="NOC_Number">NOC Number *</Label>
                      <Input
                        id="NOC_Number"
                        value={deviceConfig.hwra.NOC_Number}
                        onChange={(e) => handleInputChange("hwra", "NOC_Number", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="ip">IP Address *</Label>
                      <Input
                        id="ip"
                        value={deviceConfig.hwra.ip}
                        onChange={(e) => handleInputChange("hwra", "ip", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="port">Port *</Label>
                      <Input
                        id="port"
                        value={deviceConfig.hwra.port}
                        onChange={(e) => handleInputChange("hwra", "port", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="userKey">User Key *</Label>
                      <Input
                        id="userKey"
                        value={deviceConfig.hwra.userKey}
                        onChange={(e) => handleInputChange("hwra", "userKey", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={deviceConfig.hwra.companyName}
                        onChange={(e) => handleInputChange("hwra", "companyName", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="absractionStructureNumber">Abstraction Structure Number *</Label>
                      <Input
                        id="absractionStructureNumber"
                        value={deviceConfig.hwra.absractionStructureNumber}
                        onChange={(e) => handleInputChange("hwra", "absractionStructureNumber", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="vendorFirmName">Vendor Firm Name *</Label>
                      <Input
                        id="vendorFirmName"
                        value={deviceConfig.hwra.vendorFirmName}
                        onChange={(e) => handleInputChange("hwra", "vendorFirmName", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="latitude">Latitude *</Label>
                      <Input
                        id="latitude"
                        value={deviceConfig.hwra.latitude}
                        onChange={(e) => handleInputChange("hwra", "latitude", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="longitude">Longitude *</Label>
                      <Input
                        id="longitude"
                        value={deviceConfig.hwra.longitude}
                        onChange={(e) => handleInputChange("hwra", "longitude", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">* Required fields for HWRA integration</p>
                  <Button onClick={() => {
                    toast({
                      title: "Test Connection",
                      description: "Successfully connected to HWRA portal.",
                    });
                  }}>
                    Test HWRA Connection
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="communication">
              <Card>
                <CardHeader>
                  <CardTitle>Communication Settings</CardTitle>
                  <CardDescription>
                    Configure MQTT server settings for data transmission.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mqttServer">MQTT Server</Label>
                    <Input
                      id="mqttServer"
                      value={deviceConfig.communication.mqttServer}
                      onChange={(e) => handleInputChange("communication", "mqttServer", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mqttPort">MQTT Port</Label>
                    <Input
                      id="mqttPort"
                      value={deviceConfig.communication.mqttPort}
                      onChange={(e) => handleInputChange("communication", "mqttPort", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mqttUsername">MQTT Username</Label>
                    <Input
                      id="mqttUsername"
                      value={deviceConfig.communication.mqttUsername}
                      onChange={(e) => handleInputChange("communication", "mqttUsername", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mqttPassword">MQTT Password</Label>
                    <Input
                      id="mqttPassword"
                      type="password"
                      value={deviceConfig.communication.mqttPassword}
                      onChange={(e) => handleInputChange("communication", "mqttPassword", e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="useTLS" 
                      checked={deviceConfig.communication.useTLS as boolean}
                      onCheckedChange={(checked) => 
                        handleInputChange("communication", "useTLS", Boolean(checked))
                      }
                    />
                    <Label htmlFor="useTLS">Use TLS/SSL for connection</Label>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reportingInterval">Reporting Interval (minutes)</Label>
                    <Input
                      id="reportingInterval"
                      value={deviceConfig.communication.reportingInterval}
                      onChange={(e) => handleInputChange("communication", "reportingInterval", e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => {
                    toast({
                      title: "Test Connection",
                      description: "Successfully connected to MQTT server.",
                    });
                  }}>
                    Test MQTT Connection
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default DeviceConfig;
