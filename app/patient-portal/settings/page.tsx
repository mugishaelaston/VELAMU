"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Moon, Sun, UserCog, Globe, FileText, HelpCircle, ChevronRight, LogOut } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function PatientSettings() {
  const router = useRouter()
  const { toast } = useToast()
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [appNotifications, setAppNotifications] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [language, setLanguage] = useState("english")

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
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })
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
                  <Button variant="outline" size="sm">
                    A-
                  </Button>
                  <Button variant="outline" size="sm">
                    A
                  </Button>
                  <Button variant="outline" size="sm">
                    A+
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
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
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
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
                <Switch id="two-factor" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Password</Label>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Login Sessions</Label>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">Chrome on Windows • IP: 192.168.1.1</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Active
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Data Privacy</Label>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Manage how your data is used and shared</p>
                  <Button variant="outline">Privacy Settings</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
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
              <div className="space-y-2">
                <Label>Personal Information</Label>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Update your name, contact details, and address</p>
                  <Button variant="outline">Edit Profile</Button>
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
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Subscription</Label>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Premium Plan</p>
                    <p className="text-sm text-muted-foreground">Renews on May 15, 2023</p>
                  </div>
                  <Button variant="outline">Manage Plan</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Danger Zone</Label>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
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
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <p className="font-medium">Documentation</p>
                      <p className="text-sm text-muted-foreground">Read guides and documentation</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-auto" />
                </Button>

                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <p className="font-medium">FAQs</p>
                      <p className="text-sm text-muted-foreground">Find answers to common questions</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-auto" />
                </Button>

                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <p className="font-medium">Community</p>
                      <p className="text-sm text-muted-foreground">Join the My Health community</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-auto" />
                </Button>

                <Button variant="outline" className="h-auto p-4 justify-start">
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
