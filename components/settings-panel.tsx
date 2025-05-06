"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Moon, Sun, Monitor } from "lucide-react"

interface SettingsPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userType: "patient" | "doctor" | "clinic" | "admin"
}

export function SettingsPanel({ open, onOpenChange, userType }: SettingsPanelProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [autoLogout, setAutoLogout] = useState("30")
  const [language, setLanguage] = useState("en")
  const [fontSize, setFontSize] = useState([16])
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [dataSharing, setDataSharing] = useState("minimal")

  // Ensure theme is only accessed on client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Customize your experience and manage your account preferences.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="appearance" className="mt-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Theme</h3>
              <div className="grid grid-cols-3 gap-4">
                <div
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer ${theme === "light" ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}
                  onClick={() => setTheme("light")}
                >
                  <Sun className="h-6 w-6" />
                  <span>Light</span>
                </div>
                <div
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer ${theme === "dark" ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="h-6 w-6" />
                  <span>Dark</span>
                </div>
                <div
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer ${theme === "system" ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}
                  onClick={() => setTheme("system")}
                >
                  <Monitor className="h-6 w-6" />
                  <span>System</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Font Size</h3>
                  <p className="text-sm text-muted-foreground">Adjust the text size</p>
                </div>
                <span className="font-medium">{fontSize[0]}px</span>
              </div>
              <Slider defaultValue={fontSize} max={24} min={12} step={1} onValueChange={setFontSize} />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Small</span>
                <span>Medium</span>
                <span>Large</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Language</h3>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Enable Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive alerts and updates</p>
                </div>
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>

              {notificationsEnabled && (
                <>
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                    </div>
                    <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                  </div>

                  <div className="space-y-2 pt-2">
                    <h4 className="font-medium">Notification Types</h4>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="appointment-reminders">Appointment Reminders</Label>
                        <Switch id="appointment-reminders" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="health-alerts">Health Alerts</Label>
                        <Switch id="health-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="messages">New Messages</Label>
                        <Switch id="messages" defaultChecked />
                      </div>
                      {userType === "doctor" ||
                        (userType === "clinic" && (
                          <div className="flex items-center justify-between">
                            <Label htmlFor="patient-updates">Patient Updates</Label>
                            <Switch id="patient-updates" defaultChecked />
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Security</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch id="two-factor" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-medium">Auto Logout</h4>
                <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                <Select value={autoLogout} onValueChange={setAutoLogout}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-medium">Change Password</h4>
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="mt-2 bg-blue-600 hover:bg-blue-700">Update Password</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Data Sharing</h3>
              <RadioGroup value={dataSharing} onValueChange={setDataSharing}>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="minimal" id="minimal" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="minimal">Minimal Sharing</Label>
                    <p className="text-sm text-muted-foreground">Only share essential data with healthcare providers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="standard">Standard Sharing</Label>
                    <p className="text-sm text-muted-foreground">Share relevant health data with your care team</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="research" id="research" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="research">Research Contribution</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow anonymized data to be used for medical research
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {userType === "patient" && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Health Data Preferences</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="share-vitals">Share Vital Signs</Label>
                  <Switch id="share-vitals" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="share-location">Share Location Data</Label>
                  <Switch id="share-location" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="share-medications">Share Medication Information</Label>
                  <Switch id="share-medications" defaultChecked />
                </div>
              </div>
            )}

            {(userType === "doctor" || userType === "clinic") && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Professional Preferences</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="availability-status">Show Availability Status</Label>
                  <Switch id="availability-status" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="patient-requests">Allow Direct Patient Requests</Label>
                  <Switch id="patient-requests" defaultChecked />
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => onOpenChange(false)}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
