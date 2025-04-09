
import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  Camera, 
  Clock, 
  Download, 
  Globe, 
  Lock, 
  LogOut, 
  Trash2, 
  Upload, 
  User, 
  Sparkles,
  Save,
  Moon,
  Sun
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TopNavBar from '@/components/TopNavBar';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const Settings = () => {
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [energyLevels, setEnergyLevels] = useState({
    morning: 'high',
    afternoon: 'medium',
    evening: 'low',
  });
  
  // Sample state for form values
  const [profileData, setProfileData] = useState({
    name: 'Jordan Smith',
    email: 'jordan.smith@example.com',
    timezone: 'America/New_York',
    language: 'English',
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const handleDeleteAccount = () => {
    setShowDeleteDialog(false);
    toast({
      title: "Account deleted",
      description: "Your account has been deleted successfully",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar />
      
      <main className="container mx-auto py-6 px-4 md:px-6 space-y-8 max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Settings</h1>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
        
        {/* Profile Settings */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <User className="mr-2 h-5 w-5" />
            Profile Settings
          </h2>
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="mt-2">
                  <Camera className="mr-2 h-4 w-4" />
                  Change Photo
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={profileData.name} 
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={profileData.email} 
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value="••••••••" />
                <Button variant="link" className="h-auto p-0 text-sm">Change password</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input 
                    id="timezone" 
                    value={profileData.timezone} 
                    onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input 
                    id="language" 
                    value={profileData.language} 
                    onChange={(e) => setProfileData({...profileData, language: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Calendar Sync */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Calendar Sync
          </h2>
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Google Calendar</h3>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Disconnect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Apple Calendar</h3>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-blue-800" />
                </div>
                <div>
                  <h3 className="font-medium">Outlook</h3>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            
            <div className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Label className="font-medium">Sync tasks with calendar</Label>
                  <p className="text-sm text-muted-foreground">Show your habits and tasks in your calendar</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Default calendar</Label>
                  <p className="text-sm text-muted-foreground">Select your primary calendar</p>
                </div>
                <select className="px-3 py-2 rounded-md border">
                  <option>Google Calendar</option>
                  <option>Apple Calendar</option>
                  <option>Outlook</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        
        {/* AI Preferences */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Sparkles className="mr-2 h-5 w-5" />
            AI Preferences
          </h2>
          <Separator />
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="ai-level" className="font-medium block mb-2">AI Automation Level</Label>
              <ToggleGroup type="single" defaultValue="assisted" id="ai-level" className="justify-start">
                <ToggleGroupItem value="manual" className="px-4">
                  <span className="text-sm">Manual</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="assisted" className="px-4">
                  <span className="text-sm">Assisted</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="automatic" className="px-4">
                  <span className="text-sm">Automatic</span>
                </ToggleGroupItem>
              </ToggleGroup>
              <p className="text-sm text-muted-foreground mt-2">
                Choose how much control AI has in scheduling and managing your tasks
              </p>
            </div>
            
            <div>
              <Label htmlFor="task-tone" className="font-medium block mb-2">Task Tone</Label>
              <ToggleGroup type="single" defaultValue="motivational" id="task-tone" className="justify-start">
                <ToggleGroupItem value="casual" className="px-4">
                  <span className="text-sm">Casual</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="motivational" className="px-4">
                  <span className="text-sm">Motivational</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="neutral" className="px-4">
                  <span className="text-sm">Neutral</span>
                </ToggleGroupItem>
              </ToggleGroup>
              <p className="text-sm text-muted-foreground mt-2">
                Set the tone for AI-generated content and reminders
              </p>
            </div>
            
            <div>
              <Label htmlFor="ai-frequency" className="font-medium block mb-2">AI Suggestion Frequency</Label>
              <select id="ai-frequency" className="w-full max-w-xs px-3 py-2 rounded-md border">
                <option>Frequent (multiple times per day)</option>
                <option>Moderate (once daily)</option>
                <option>Minimal (weekly digest)</option>
                <option>Off (manual only)</option>
              </select>
              <p className="text-sm text-muted-foreground mt-2">
                How often do you want to receive AI-powered suggestions?
              </p>
            </div>
          </div>
        </section>
        
        {/* Energy Level Settings */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Sun className="mr-2 h-5 w-5" />
            <Moon className="mr-2 h-5 w-5" />
            Energy Level Settings
          </h2>
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Show energy profile</Label>
                <p className="text-sm text-muted-foreground">Display your energy levels on calendar views</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Collapsible className="border rounded-lg p-4">
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <span className="font-medium">Default Energy Levels</span>
                <Button variant="ghost" size="sm">Edit</Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="font-medium">Time of Day</div>
                    <div className="text-center font-medium">Low</div>
                    <div className="text-center font-medium">Medium</div>
                    <div className="text-center font-medium">High</div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div>Morning (6AM - 12PM)</div>
                    <div className="flex justify-center">
                      <input 
                        type="radio" 
                        name="morning" 
                        checked={energyLevels.morning === 'low'} 
                        onChange={() => setEnergyLevels({...energyLevels, morning: 'low'})}
                      />
                    </div>
                    <div className="flex justify-center">
                      <input 
                        type="radio" 
                        name="morning" 
                        checked={energyLevels.morning === 'medium'} 
                        onChange={() => setEnergyLevels({...energyLevels, morning: 'medium'})}
                      />
                    </div>
                    <div className="flex justify-center">
                      <input 
                        type="radio" 
                        name="morning" 
                        checked={energyLevels.morning === 'high'} 
                        onChange={() => setEnergyLevels({...energyLevels, morning: 'high'})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div>Afternoon (12PM - 6PM)</div>
                    <div className="flex justify-center">
                      <input 
                        type="radio" 
                        name="afternoon" 
                        checked={energyLevels.afternoon === 'low'} 
                        onChange={() => setEnergyLevels({...energyLevels, afternoon: 'low'})}
                      />
                    </div>
                    <div className="flex justify-center">
                      <input 
                        type="radio" 
                        name="afternoon" 
                        checked={energyLevels.afternoon === 'medium'} 
                        onChange={() => setEnergyLevels({...energyLevels, afternoon: 'medium'})}
                      />
                    </div>
                    <div className="flex justify-center">
                      <input 
                        type="radio" 
                        name="afternoon" 
                        checked={energyLevels.afternoon === 'high'} 
                        onChange={() => setEnergyLevels({...energyLevels, afternoon: 'high'})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div>Evening (6PM - 12AM)</div>
                    <div className="flex justify-center">
                      <input 
                        type="radio" 
                        name="evening" 
                        checked={energyLevels.evening === 'low'} 
                        onChange={() => setEnergyLevels({...energyLevels, evening: 'low'})}
                      />
                    </div>
                    <div className="flex justify-center">
                      <input 
                        type="radio" 
                        name="evening" 
                        checked={energyLevels.evening === 'medium'} 
                        onChange={() => setEnergyLevels({...energyLevels, evening: 'medium'})}
                      />
                    </div>
                    <div className="flex justify-center">
                      <input 
                        type="radio" 
                        name="evening" 
                        checked={energyLevels.evening === 'high'} 
                        onChange={() => setEnergyLevels({...energyLevels, evening: 'high'})}
                      />
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <div className="flex items-center justify-between mt-4">
              <div>
                <Label className="font-medium">Allow AI to suggest energy updates</Label>
                <p className="text-sm text-muted-foreground">Let AI analyze your patterns and suggest energy level adjustments</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>
        
        {/* Notification & Reminder Settings */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notifications & Reminders
          </h2>
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Daily Reminders</h3>
                <p className="text-sm text-muted-foreground">Get a summary of your daily tasks each morning</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive summary emails and important alerts</p>
              </div>
              <Switch />
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Custom Notification Times</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="morning-reminder">Morning Reminder</Label>
                  <Input id="morning-reminder" type="time" defaultValue="08:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evening-reminder">Evening Reminder</Label>
                  <Input id="evening-reminder" type="time" defaultValue="20:00" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Privacy & Permissions */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Lock className="mr-2 h-5 w-5" />
            Privacy & Permissions
          </h2>
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Data Export</h3>
                <p className="text-sm text-muted-foreground">Download all your data in JSON or CSV format</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
            
            <div className="space-y-3 p-4 border rounded-lg">
              <h3 className="font-medium">App Permissions</h3>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="permission-calendar" defaultChecked />
                <Label htmlFor="permission-calendar" className="text-sm">
                  Calendar access
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="permission-notifications" defaultChecked />
                <Label htmlFor="permission-notifications" className="text-sm">
                  Notification permissions
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="permission-location" />
                <Label htmlFor="permission-location" className="text-sm">
                  Location access
                </Label>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <Label className="text-sm">View our privacy policy for more information</Label>
              <Button variant="link" className="h-auto p-0">Privacy Policy</Button>
            </div>
          </div>
        </section>
        
        {/* Account Actions */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <User className="mr-2 h-5 w-5" />
            Account Actions
          </h2>
          <Separator />
          
          <div className="space-y-4 mt-4">
            <Button variant="outline" className="w-full sm:w-auto" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
            
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full sm:w-auto">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Account</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
                  </DialogDescription>
                </DialogHeader>
                <div className="pt-4">
                  <Label htmlFor="confirm-delete">Type "DELETE" to confirm</Label>
                  <Input id="confirm-delete" className="mt-2" />
                </div>
                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={handleDeleteAccount}>Permanently Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Settings;
