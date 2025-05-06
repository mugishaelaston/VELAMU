"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Moon, Sun, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function ClinicSettings() {
  const router = useRouter()
  const { toast } = useToast()
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [appNotifications, setAppNotifications] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(true)
  const [hipaaCompliance, setHipaaCompliance] = useState(true)
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
      <h1 className="text-3xl font-bold mb-6">Clinic Settings</h1>

      <Tabs defaultValue="appearance">
        <TabsList className="grid w-full grid-cols-6 mb-8">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="clinic">Clinic Info</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how My Health Clinic Portal looks for your staff.</CardDescription>
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
                <Label>Clinic Dashboard Layout</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <div className="w-full h-4 bg-primary/20 mb-2 rounded"></div>
                    <div className="grid grid-cols-2 gap-1 w-full">
                      <div className="h-8 bg-primary/20 rounded"></div>
                      <div className="h-8 bg-primary/20 rounded"></div>
                    </div>
                    <p className="text-xs mt-2">Standard</p>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <div className="grid grid-cols-3 gap-1 w-full">
                      <div className="h-4 bg-primary/20 rounded"></div>
                      <div className="h-4 bg-primary/20 rounded"></div>
                      <div className="h-4 bg-primary/20 rounded"></div>
                    </div>
                    <div className="w-full h-12 bg-primary/20 my-2 rounded"></div>
                    <div className="w-full h-4 bg-primary/20 rounded"></div>
                    <p className="text-xs mt-2">Compact</p>
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
              <CardDescription>Control how and when your clinic receives notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive appointment alerts and patient updates via email
                  </p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive text message alerts for urgent matters</p>
                </div>
                <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="app-notifications">In-App Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications within the My Health Clinic Portal
                  </p>
                </div>
                <Switch id="app-notifications" checked={appNotifications} onCheckedChange={setAppNotifications} />
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Notification Recipients</Label>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <div>
                      <p className="font-medium">Admin Staff</p>
                      <p className="text-sm text-muted-foreground">All administrative notifications</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <div>
                      <p className="font-medium">Medical Staff</p>
                      <p className="text-sm text-muted-foreground">Patient-related notifications only</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
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
              <CardDescription>Manage your clinic's security and compliance settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for all staff accounts</p>
                </div>
                <Switch id="two-factor" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="hipaa-compliance">HIPAA Compliance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable additional security measures for HIPAA compliance
                  </p>
                </div>
                <Switch id="hipaa-compliance" checked={hipaaCompliance} onCheckedChange={setHipaaCompliance} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Password Policy</Label>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Minimum password length</p>
                    <select className="p-1 border rounded-md">
                      <option>8 characters</option>
                      <option>10 characters</option>
                      <option>12 characters</option>
                      <option>14 characters</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Password expiration</p>
                    <select className="p-1 border rounded-md">
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                      <option>Never</option>
                    </select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Access Logs</Label>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">View detailed access logs for your clinic portal</p>
                  <Button variant="outline">View Logs</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Data Encryption</Label>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">End-to-end encryption</p>
                    <p className="text-sm text-muted-foreground">
                      All patient data is encrypted at rest and in transit
                    </p>
                  </div>
                  <Shield className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="clinic">
          <Card>
            <CardHeader>
              <CardTitle>Clinic Information</CardTitle>
              <CardDescription>Manage your clinic's profile and business details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Clinic Profile</Label>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Northside Medical Center</p>
                    <p className="text-sm text-muted-foreground">123 Health Avenue, Medical District, CA 90210</p>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Business Hours</Label>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Monday - Friday</p>
                    <p className="text-sm">8:00 AM - 6:00 PM</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Saturday</p>
                    <p className="text-sm">9:00 AM - 2:00 PM</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Sunday</p>
                    <p className="text-sm">Closed</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Edit Hours
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Contact Information</Label>
                <div className="space-y-1">
                  <p className="text-sm">Phone: (555) 123-4567</p>
                  <p className="text-sm">Email: info@northsidemedical.com</p>
                  <p className="text-sm">Website: www.northsidemedical.com</p>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Edit Contact Info
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Billing Information</Label>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Manage billing details and payment methods</p>
                  <Button variant="outline">Billing Settings</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Staff Management</CardTitle>
              <CardDescription>Manage your clinic's staff accounts and permissions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Staff Members</h3>
                <Button>Add Staff Member</Button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-medium">JD</span>
                    </div>
                    <div>
                      <p className="font-medium">Dr. John Doe</p>
                      <p className="text-sm text-muted-foreground">Chief Medical Officer • Admin</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Permissions
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-medium">JS</span>
                    </div>
                    <div>
                      <p className="font-medium">Jane Smith</p>
                      <p className="text-sm text-muted-foreground">Office Manager • Admin</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Permissions
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-medium">RJ</span>
                    </div>
                    <div>
                      <p className="font-medium">Dr. Robert Johnson</p>
                      <p className="text-sm text-muted-foreground">Physician • Standard</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Permissions
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-medium">MW</span>
                    </div>
                    <div>
                      <p className="font-medium">Mary Williams</p>
                      <p className="text-sm text-muted-foreground">Nurse • Standard</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Permissions
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Role Management</Label>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Configure staff roles and access permissions</p>
                  <Button variant="outline">Manage Roles</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Invite Staff</Label>
                <div className="flex space-x-2">
                  <input type="email" placeholder="Email address" className="flex-1 p-2 border rounded-md" />
                  <Button>Send Invite</Button>
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
              <CardDescription>Get help with using the My Health Clinic Portal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Documentation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <p className="font-medium">User Guide</p>
                      <p className="text-sm text-muted-foreground">Learn how to use the clinic portal</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <p className="font-medium">Admin Guide</p>
                      <p className="text-sm text-muted-foreground">Advanced settings and configurations</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <p className="font-medium">HIPAA Compliance</p>
                      <p className="text-sm text-muted-foreground">Ensuring patient data security</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <p className="font-medium">Life Suit Integration</p>
                      <p className="text-sm text-muted-foreground">Working with Life Suit wearable data</p>
                    </div>
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Contact Support</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-medium">?</span>
                    </div>
                    <div>
                      <p className="font-medium">Technical Support</p>
                      <p className="text-sm text-muted-foreground">support@myhealth.com • (555) 987-6543</p>
                    </div>
                  </div>
                  <Button className="w-full">Contact Support Team</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Training Resources</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <div className="text-left">
                      <p className="font-medium">Video Tutorials</p>
                      <p className="text-sm text-muted-foreground">Step-by-step video guides</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <div className="text-left">
                      <p className="font-medium">Webinars</p>
                      <p className="text-sm text-muted-foreground">Upcoming and recorded training sessions</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <div className="text-left">
                      <p className="font-medium">FAQ</p>
                      <p className="text-sm text-muted-foreground">Frequently asked questions</p>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                Log Out
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
