
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User,
  Lock,
  Bell, 
  CreditCard, 
  LogOut,
  Mail,
  Phone,
  Camera,
  Save,
  Loader2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { profileService } from "@/integrations/supabase/profileService";
import { Profile } from "@/integrations/supabase/profileService";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    bio: "",
    avatar_url: ""
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    const { data, error } = await profileService.getProfile(user.id);
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load profile. Please try again.",
        variant: "destructive"
      });
    } else if (data) {
      setFormData({
        full_name: data.full_name || "",
        email: user.email || "",
        phone: data.phone || "",
        bio: data.bio || "",
        avatar_url: data.avatar_url || ""
      });
    }
    
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user?.id || !e.target.files?.[0]) return;

    const file = e.target.files[0];
    setIsSaving(true);

    try {
      const { path, error: uploadError } = await profileService.uploadAvatar(user.id, file);
      
      if (uploadError) throw uploadError;
      if (!path) throw new Error("Failed to get avatar URL");

      const { error: updateError } = await profileService.updateProfile(user.id, {
        avatar_url: path
      });

      if (updateError) throw updateError;

      setFormData(prev => ({ ...prev, avatar_url: path }));
      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile picture. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfileUpdate = async () => {
    if (!user?.id) return;

    setIsSaving(true);
    try {
      const { error } = await profileService.updateProfile(user.id, {
        full_name: formData.full_name,
        phone: formData.phone,
        bio: formData.bio
      });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      });

      if (error) throw error;

      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully."
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-20 pb-10 bg-gray-50 dark:bg-gray-900 flex-grow">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Billing</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and profile details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative">
                      {formData.avatar_url ? (
                        <img
                          src={formData.avatar_url}
                          alt="Profile"
                          className="h-24 w-24 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white text-3xl font-bold">
                          {formData.full_name ? formData.full_name.charAt(0).toUpperCase() : "U"}
                        </div>
                      )}
                      <label htmlFor="avatar-upload" className="absolute -bottom-1 -right-1 h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                        <Camera className="h-4 w-4" />
                        <input 
                          id="avatar-upload" 
                          type="file" 
                          className="sr-only" 
                          accept="image/*"
                          onChange={handleAvatarChange}
                          disabled={isLoading || isSaving}
                        />
                      </label>
                    </div>
                    
                    <div className="space-y-2 text-center sm:text-left">
                      <h3 className="font-medium">Profile Picture</h3>
                      <p className="text-sm text-gray-500">
                        Upload a profile picture to personalize your account.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 w-full">
                    <div>
                      <label htmlFor="full_name" className="block text-sm font-medium mb-1">Full Name</label>
                      <Input 
                        id="full_name" 
                        name="full_name" 
                        value={formData.full_name} 
                        onChange={handleChange} 
                        disabled={isLoading || isSaving}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                    <Input 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      disabled={true} 
                      className="bg-muted" 
                    />
                    <p className="text-xs text-muted-foreground mt-1">Email cannot be changed. Contact support for assistance.</p>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      disabled={isLoading || isSaving}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
                    <Textarea 
                      id="bio" 
                      name="bio" 
                      rows={4} 
                      value={formData.bio} 
                      onChange={handleChange} 
                      disabled={isLoading || isSaving}
                      placeholder="Tell us about yourself"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleProfileUpdate} 
                      className="w-full sm:w-auto" 
                      disabled={isLoading || isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" /> Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and account security settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium mb-1">Current Password</label>
                      <Input 
                        id="currentPassword" 
                        name="currentPassword" 
                        type="password" 
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordFormChange}
                        disabled={isSaving}
                        required 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium mb-1">New Password</label>
                      <Input 
                        id="newPassword" 
                        name="newPassword" 
                        type="password" 
                        value={passwordForm.newPassword}
                        onChange={handlePasswordFormChange}
                        disabled={isSaving}
                        required 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <Input 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordFormChange}
                        disabled={isSaving}
                        required 
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit" disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                          </>
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </div>
                  </form>
                  </div>
                  
                  <div className="border-t pt-4 space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-factor authentication is off</p>
                        <p className="text-sm text-gray-500">
                          Add an extra layer of security to your account by enabling two-factor authentication.
                        </p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 space-y-4">
                    <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Delete account</p>
                        <p className="text-sm text-gray-500">
                          Permanently delete your account and all associated data.
                        </p>
                      </div>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="font-medium">Email Notifications</h3>
                      
                      <div className="flex items-center justify-between py-2 border-b">
                        <div>
                          <p className="font-medium">Course Updates</p>
                          <p className="text-sm text-gray-500">
                            Get notified about new content in your enrolled courses.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-b">
                        <div>
                          <p className="font-medium">Promotions and Offers</p>
                          <p className="text-sm text-gray-500">
                            Receive updates about special offers and promotions.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-b">
                        <div>
                          <p className="font-medium">Achievement Notifications</p>
                          <p className="text-sm text-gray-500">
                            Get notified when you earn new achievements.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Newsletter</p>
                          <p className="text-sm text-gray-500">
                            Receive our weekly newsletter with educational content.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-medium">Push Notifications</h3>
                      
                      <div className="flex items-center justify-between py-2 border-b">
                        <div>
                          <p className="font-medium">Browser Notifications</p>
                          <p className="text-sm text-gray-500">
                            Allow browser notifications for important updates.
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Enable in Browser</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Preferences</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Billing Tab */}
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Payments</CardTitle>
                  <CardDescription>
                    Manage your payment methods and billing information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4 relative">
                      <div className="flex items-center">
                        <div className="mr-4">
                          <div className="bg-blue-500 p-2 rounded text-white">
                            <CreditCard className="h-5 w-5" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/2025</p>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-500">Remove</Button>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="gap-2">
                      <CreditCard className="h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Billing Address</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input defaultValue="Jane Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Company (Optional)</label>
                        <Input />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Address Line 1</label>
                        <Input defaultValue="123 Main St." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Address Line 2</label>
                        <Input defaultValue="Apt 4B" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">City</label>
                        <Input defaultValue="San Francisco" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">State / Province</label>
                        <Input defaultValue="CA" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">ZIP / Postal Code</label>
                        <Input defaultValue="94103" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Country</label>
                        <Input defaultValue="United States" />
                      </div>
                    </div>
                    
                    <Button>Update Billing Address</Button>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Billing History</h3>
                    
                    <div className="rounded-lg overflow-hidden border">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="py-3 px-4 text-left">Date</th>
                            <th className="py-3 px-4 text-left">Description</th>
                            <th className="py-3 px-4 text-right">Amount</th>
                            <th className="py-3 px-4 text-right">Receipt</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          <tr>
                            <td className="py-3 px-4">May 15, 2023</td>
                            <td className="py-3 px-4">Web Development Bootcamp</td>
                            <td className="py-3 px-4 text-right">$99.99</td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm" className="text-blue-500">Download</Button>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4">Apr 3, 2023</td>
                            <td className="py-3 px-4">UI/UX Design Principles</td>
                            <td className="py-3 px-4 text-right">$69.99</td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm" className="text-blue-500">Download</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AccountSettings;
