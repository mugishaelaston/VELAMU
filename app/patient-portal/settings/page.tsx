"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Moon,
  Sun,
  UserCog,
  Globe,
  FileText,
  HelpCircle,
  ChevronRight,
  LogOut,
  Bell,
  CreditCard,
  Eye,
  EyeOff,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { HeartbeatThrobber } from "@/components/heartbeat-throbber"

export default function PatientSettings() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Theme settings
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("english")
  const [textSize, setTextSize] = useState("medium")

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [appNotifications, setAppNotifications] = useState(true)
  const [appointmentReminders, setAppointmentReminders] = useState(true)
  const [medicationReminders, setMedicationReminders] = useState(true)
  const [healthAlerts, setHealthAlerts] = useState(true)

  // Security settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [biometricLogin, setBiometricLogin] = useState(false)
  const [dataSharing, setDataSharing] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Account settings
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [phone, setPhone] = useState("+1 (555) 123-4567")
  const [address, setAddress] = useState("123 Health St, Medical City, MC 12345")
  const [emergencyContact, setEmergencyContact] = useState("Jane Doe (+1 555-987-6543)")
  const [bio, setBio] = useState("I'm focused on improving my health through regular exercise and a balanced diet.")

  // Simulate loading data
  useEffect(() => {
    setLoading(true)
    // Simulate API call to fetch user settings
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode)
    // In a real app, you would update the theme here
    document.documentElement.classList.toggle("dark")
    toast({
      title: !darkMode ? "Dark mode enabled" : "Light mode enabled",
      description: "Your theme preference has been saved.",
    })
  }

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been successfully logged out.",
    })
    // In a real app, you would handle logout logic here
    setTimeout(() => router.push("/login"), 1000)
  }

  const saveSettings = () => {
    setSaving(true)
    // Simulate API call to save settings
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      })
    }, 1000)
  }

  const changePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your new password and confirmation match.",
        variant: "destructive",
      })
      return
    }

    if (newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Your password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    // Simulate API call to change password
    setTimeout(() => {
      setSaving(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      toast({
        title: "Password changed",
        description: "Your password has been updated successfully.",
      })
    }, 1000)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <HeartbeatThrobber size="lg" showText />
        <p className="mt-4 text-muted-foreground">Loading your settings...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="appearance">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how My Health looks on your device.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-5 w-5" />
                  <Switch id="dark-mode" checked={darkMode} onCheckedChange={handleDarkModeToggle} />
                  <Moon className="h-5 w-5" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Language</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="chinese">Chinese</option>
                </select>
              </div>

              <div className="space-y-4">
                <Label>Text Size</Label>
                <div className="flex space-x-4">
                  <Button
                    variant={textSize === "small" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTextSize("small")}
                  >
                    A-
                  </Button>
                  <Button
                    variant={textSize === "medium" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTextSize("medium")}
                  >
                    A
                  </Button>
                  <Button
                    variant={textSize === "large" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTextSize("large")}
                  >
                    A+
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Color Theme</Label>
                <div className="grid grid-cols-4 gap-4">
                  <div
                    className="h-10 w-10 rounded-full bg-blue-600 cursor-pointer ring-2 ring-offset-2 ring-blue-600"
                    onClick={() => {
                      toast({
                        title: "Blue theme selected",
                        description: "Your color theme has been updated.",
                      })
                    }}
                  />
                  <div
                    className="h-10 w-10 rounded-full bg-green-600 cursor-pointer"
                    onClick={() => {
                      toast({
                        title: "Green theme selected",
                        description: "Your color theme has been updated.",
                      })
                    }}
                  />
                  <div
                    className="h-10 w-10 rounded-full bg-purple-600 cursor-pointer"
                    onClick={() => {
                      toast({
                        title: "Purple theme selected",
                        description: "Your color theme has been updated.",
                      })
                    }}
                  />
                  <div
                    className="h-10 w-10 rounded-full bg-red-600 cursor-pointer"
                    onClick={() => {
                      toast({
                        title: "Red theme selected",
                        description: "Your color theme has been updated.",
                      })
                    }}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} disabled={saving}>
                {saving ? <HeartbeatThrobber className="mr-2" size="sm" /> : null}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive appointment reminders and updates via email</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive text message alerts for important updates</p>
                </div>
                <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="app-notifications">In-App Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications within the My Health app</p>
                </div>
                <Switch id="app-notifications" checked={appNotifications} onCheckedChange={setAppNotifications} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="appointment-reminders">Appointment Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminders about upcoming appointments</p>
                </div>
                <Switch
                  id="appointment-reminders"
                  checked={appointmentReminders}
                  onCheckedChange={setAppointmentReminders}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="medication-reminders">Medication Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminders to take your medications</p>
                </div>
                <Switch
                  id="medication-reminders"
                  checked={medicationReminders}
                  onCheckedChange={setMedicationReminders}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="health-alerts">Health Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts about critical health metrics</p>
                </div>
                <Switch id="health-alerts" checked={healthAlerts} onCheckedChange={setHealthAlerts} />
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Quiet Hours</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quiet-start" className="text-sm">
                      Start Time
                    </Label>
                    <Input
                      id="quiet-start"
                      type="time"
                      defaultValue="22:00"
                      onChange={() => {
                        toast({
                          title: "Quiet hours updated",
                          description: "Your quiet hours have been updated.",
                        })
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quiet-end" className="text-sm">
                      End Time
                    </Label>
                    <Input
                      id="quiet-end"
                      type="time"
                      defaultValue="07:00"
                      onChange={() => {
                        toast({
                          title: "Quiet hours updated",
                          description: "Your quiet hours have been updated.",
                        })
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} disabled={saving}>
                {saving ? <HeartbeatThrobber className="mr-2" size="sm" /> : null}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and privacy preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  id="two-factor"
                  checked={twoFactorAuth}
                  onCheckedChange={(checked) => {
                    setTwoFactorAuth(checked)
                    if (checked) {
                      toast({
                        title: "2FA Setup Required",
                        description: "Please set up two-factor authentication to continue.",
                      })
                    }
                  }}
                />
              </div>

              {twoFactorAuth && (
                <div className="ml-6 p-4 bg-muted rounded-md">
                  <p className="text-sm font-medium mb-2">Set up Two-Factor Authentication</p>
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-white p-4 rounded-md">
                      {/* Placeholder for QR code */}
                      <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                        <p className="text-xs text-gray-500">QR Code</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Scan this QR code with your authenticator app or enter the code manually:
                  </p>
                  <div className="flex items-center mb-4">
                    <Input value="ABCD-EFGH-IJKL-MNOP" readOnly className="font-mono text-center" />
                    <Button variant="outline" size="sm" className="ml-2">
                      Copy
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="verification-code" className="text-sm">
                      Enter verification code
                    </Label>
                    <div className="flex gap-2">
                      <Input id="verification-code" placeholder="Enter 6-digit code" />
                      <Button>Verify</Button>
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="biometric-login">Biometric Login</Label>
                  <p className="text-sm text-muted-foreground">Use fingerprint or face recognition to log in</p>
                </div>
                <Switch
                  id="biometric-login"
                  checked={biometricLogin}
                  onCheckedChange={(checked) => {
                    setBiometricLogin(checked)
                    toast({
                      title: checked ? "Biometric login enabled" : "Biometric login disabled",
                      description: checked
                        ? "You can now use biometric authentication to log in."
                        : "Biometric authentication has been disabled.",
                    })
                  }}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Change Password</Label>
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    onClick={changePassword}
                    disabled={!currentPassword || !newPassword || !confirmPassword || saving}
                  >
                    {saving ? <HeartbeatThrobber className="mr-2" size="sm" /> : null}
                    Change Password
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Login Sessions</Label>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-xs text-muted-foreground">Chrome on Windows • IP: 192.168.1.1</p>
                      <p className="text-xs text-muted-foreground">Started: Today, 10:30 AM</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-green-600">
                      Active
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <div>
                      <p className="font-medium">Mobile App</p>
                      <p className="text-xs text-muted-foreground">iPhone 13 • IP: 192.168.1.2</p>
                      <p className="text-xs text-muted-foreground">Last active: Yesterday, 8:15 PM</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                      onClick={() => {
                        toast({
                          title: "Session terminated",
                          description: "The mobile app session has been terminated.",
                        })
                      }}
                    >
                      Terminate
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Data Privacy</Label>
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Data Sharing</p>
                    <p className="text-xs text-muted-foreground">Allow sharing anonymized health data for research</p>
                  </div>
                  <Switch
                    checked={dataSharing}
                    onCheckedChange={(checked) => {
                      setDataSharing(checked)
                      toast({
                        title: checked ? "Data sharing enabled" : "Data sharing disabled",
                        description: checked
                          ? "Your anonymized health data will be shared for research purposes."
                          : "Your health data will not be shared for research purposes.",
                      })
                    }}
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => {
                    toast({
                      title: "Privacy settings",
                      description: "Advanced privacy settings page opened.",
                    })
                  }}
                >
                  Advanced Privacy Settings
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} disabled={saving}>
                {saving ? <HeartbeatThrobber className="mr-2" size="sm" /> : null}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your personal information and account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Profile Information</Label>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Upload photo",
                          description: "Profile photo upload dialog opened.",
                        })
                      }}
                    >
                      Change Photo
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency-contact">Emergency Contact</Label>
                    <Input
                      id="emergency-contact"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us a bit about yourself..."
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Connected Devices</Label>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <div>
                      <p className="font-medium">Life Suit</p>
                      <p className="text-sm text-muted-foreground">Connected • Last synced 2 hours ago</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Syncing device",
                            description: "Syncing data from Life Suit...",
                          })
                          setTimeout(() => {
                            toast({
                              title: "Sync complete",
                              description: "Life Suit data has been synced successfully.",
                            })
                          }, 2000)
                        }}
                      >
                        Sync
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Device settings",
                            description: "Life Suit settings page opened.",
                          })
                        }}
                      >
                        Settings
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <div>
                      <p className="font-medium">Smart Watch</p>
                      <p className="text-sm text-muted-foreground">Connected • Last synced 5 hours ago</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Syncing device",
                            description: "Syncing data from Smart Watch...",
                          })
                          setTimeout(() => {
                            toast({
                              title: "Sync complete",
                              description: "Smart Watch data has been synced successfully.",
                            })
                          }, 2000)
                        }}
                      >
                        Sync
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Device settings",
                            description: "Smart Watch settings page opened.",
                          })
                        }}
                      >
                        Settings
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    toast({
                      title: "Connect device",
                      description: "Device connection wizard opened.",
                    })
                  }}
                >
                  Connect New Device
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Subscription</Label>
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
                  <div>
                    <p className="font-medium text-blue-600">Premium Plan</p>
                    <p className="text-sm">Renews on May 15, 2023 • $9.99/month</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Manage subscription",
                        description: "Subscription management page opened.",
                      })
                    }}
                  >
                    Manage Plan
                  </Button>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium">Payment Method</p>
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="text-sm">•••• •••• •••• 4242</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto"
                      onClick={() => {
                        toast({
                          title: "Update payment method",
                          description: "Payment method update dialog opened.",
                        })
                      }}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Danger Zone</Label>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-red-600">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      toast({
                        title: "Delete account",
                        description: "Account deletion confirmation dialog opened.",
                        variant: "destructive",
                      })
                    }}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} disabled={saving}>
                {saving ? <HeartbeatThrobber className="mr-2" size="sm" /> : null}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
              <CardDescription>Get help with using My Health and find resources.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-4 justify-start"
                  onClick={() => {
                    toast({
                      title: "Documentation",
                      description: "Opening documentation in a new tab.",
                    })
                  }}
                >
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <p className="font-medium">Documentation</p>
                      <p className="text-sm text-muted-foreground">Read guides and documentation</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-auto" />
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 justify-start"
                  onClick={() => {
                    toast({
                      title: "FAQs",
                      description: "Opening frequently asked questions in a new tab.",
                    })
                  }}
                >
                  <div className="flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <p className="font-medium">FAQs</p>
                      <p className="text-sm text-muted-foreground">Find answers to common questions</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-auto" />
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 justify-start"
                  onClick={() => {
                    toast({
                      title: "Community",
                      description: "Opening community forum in a new tab.",
                    })
                  }}
                >
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <p className="font-medium">Community</p>
                      <p className="text-sm text-muted-foreground">Join the My Health community</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-auto" />
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 justify-start"
                  onClick={() => {
                    toast({
                      title: "Contact Support",
                      description: "Opening support contact form.",
                    })
                  }}
                >
                  <div className="flex items-center">
                    <UserCog className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <p className="font-medium">Contact Support</p>
                      <p className="text-sm text-muted-foreground">Get help from our support team</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-auto" />
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Submit a Support Ticket</Label>
                <div className="space-y-2">
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Describe your issue in detail..." rows={4} />
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Response time: Usually within 24 hours</p>
                    <Button
                      onClick={() => {
                        toast({
                          title: "Ticket submitted",
                          description: "Your support ticket has been submitted successfully.",
                        })
                      }}
                    >
                      Submit Ticket
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-muted p-4 rounded-md">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-blue-600" />
                  <p className="font-medium">System Status</p>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <p className="text-sm">My Health Platform</p>
                    <p className="text-sm text-green-600 font-medium">Operational</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Life Suit Integration</p>
                    <p className="text-sm text-green-600 font-medium">Operational</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Appointment Scheduling</p>
                    <p className="text-sm text-green-600 font-medium">Operational</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Notification System</p>
                    <p className="text-sm text-yellow-600 font-medium">Partial Outage</p>
                  </div>
                </div>
                <Button
                  variant="link"
                  className="p-0 h-auto mt-2 text-sm"
                  onClick={() => {
                    toast({
                      title: "System status",
                      description: "Opening system status page in a new tab.",
                    })
                  }}
                >
                  View detailed status
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Need immediate assistance? Call our support line at 1-800-HEALTH
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Button variant="outline" className="w-full" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  )
}
