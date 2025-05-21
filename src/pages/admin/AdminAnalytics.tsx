
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for analytics
const revenueData = [
  { month: 'Jan', revenue: 4000, target: 3000 },
  { month: 'Feb', revenue: 5600, target: 4800 },
  { month: 'Mar', revenue: 6800, target: 6000 },
  { month: 'Apr', revenue: 7200, target: 7000 },
  { month: 'May', revenue: 8900, target: 7500 },
  { month: 'Jun', revenue: 9800, target: 8000 },
  { month: 'Jul', revenue: 7500, target: 8500 },
  { month: 'Aug', revenue: 8300, target: 9000 },
  { month: 'Sep', revenue: 10200, target: 9500 },
  { month: 'Oct', revenue: 11500, target: 10000 },
  { month: 'Nov', revenue: 12800, target: 11000 },
  { month: 'Dec', revenue: 15800, target: 12000 }
];

const enrollmentsData = [
  { month: 'Jan', enrollments: 120 },
  { month: 'Feb', enrollments: 145 },
  { month: 'Mar', enrollments: 186 },
  { month: 'Apr', enrollments: 193 },
  { month: 'May', enrollments: 220 },
  { month: 'Jun', enrollments: 253 },
  { month: 'Jul', enrollments: 198 },
  { month: 'Aug', enrollments: 210 },
  { month: 'Sep', enrollments: 265 },
  { month: 'Oct', enrollments: 290 },
  { month: 'Nov', enrollments: 310 },
  { month: 'Dec', enrollments: 345 }
];

const categoryData = [
  { name: 'Development', value: 42 },
  { name: 'Design', value: 28 },
  { name: 'Business', value: 15 },
  { name: 'Marketing', value: 10 },
  { name: 'Data Science', value: 5 }
];

const COLORS = ['#8b5cf6', '#6366f1', '#ec4899', '#f97316', '#10b981'];

const userAcquisitionData = [
  { source: 'Direct', value: 40 },
  { source: 'Social Media', value: 25 },
  { source: 'Google', value: 20 },
  { source: 'Referrals', value: 10 },
  { source: 'Email', value: 5 }
];

const completionRateData = [
  { course: 'Web Dev', started: 245, completed: 182 },
  { course: 'UX Design', started: 186, completed: 124 },
  { course: 'Marketing', started: 175, completed: 98 },
  { course: 'Data Science', started: 154, completed: 72 },
  { course: 'Business', started: 132, completed: 87 }
];

const AdminAnalytics = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
          
          <Tabs defaultValue="revenue" className="space-y-8">
            <TabsList>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="users">User Metrics</TabsTrigger>
            </TabsList>
            
            {/* Revenue Tab */}
            <TabsContent value="revenue">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analytics</CardTitle>
                    <CardDescription>
                      Monthly revenue performance compared to targets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={revenueData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="revenue" name="Revenue" fill="#8b5cf6" />
                          <Bar dataKey="target" name="Target" fill="#e2e8f0" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Total Revenue</CardTitle>
                      <CardDescription>Year to date</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">$105,240</div>
                      <p className="text-sm text-green-600 flex items-center mt-2">
                        <span className="text-lg mr-1">↑</span> 24.5% from last year
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Average Order Value</CardTitle>
                      <CardDescription>Year to date</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">$85.40</div>
                      <p className="text-sm text-green-600 flex items-center mt-2">
                        <span className="text-lg mr-1">↑</span> 12.3% from last year
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Conversion Rate</CardTitle>
                      <CardDescription>Year to date</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">3.8%</div>
                      <p className="text-sm text-green-600 flex items-center mt-2">
                        <span className="text-lg mr-1">↑</span> 1.2% from last year
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Enrollments Tab */}
            <TabsContent value="enrollments">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Enrollments Trend</CardTitle>
                    <CardDescription>
                      Monthly course enrollments over the past year
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={enrollmentsData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="enrollments" name="Enrollments" stroke="#8b5cf6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Course Completion Rates</CardTitle>
                    <CardDescription>
                      Percentage of students who complete each course
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={completionRateData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="course" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="started" name="Started" fill="#94a3b8" />
                          <Bar dataKey="completed" name="Completed" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Categories Tab */}
            <TabsContent value="categories">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Categories Distribution</CardTitle>
                    <CardDescription>
                      Breakdown of courses by category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Category</CardTitle>
                    <CardDescription>
                      Distribution of revenue across course categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Development', revenue: 42580 },
                            { name: 'Design', revenue: 28430 },
                            { name: 'Business', revenue: 15800 },
                            { name: 'Marketing', revenue: 10300 },
                            { name: 'Data Science', revenue: 8130 }
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                          <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Category Performance Metrics</CardTitle>
                    <CardDescription>
                      Detailed breakdown of key metrics by category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left border-b">
                            <th className="pb-2 pl-0">Category</th>
                            <th className="pb-2">Total Courses</th>
                            <th className="pb-2">Total Students</th>
                            <th className="pb-2">Avg. Course Rating</th>
                            <th className="pb-2">Avg. Completion Rate</th>
                            <th className="pb-2">Total Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3 pl-0 font-medium">Development</td>
                            <td className="py-3">42</td>
                            <td className="py-3">3,845</td>
                            <td className="py-3">4.8</td>
                            <td className="py-3">74%</td>
                            <td className="py-3">$42,580</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 pl-0 font-medium">Design</td>
                            <td className="py-3">28</td>
                            <td className="py-3">2,632</td>
                            <td className="py-3">4.9</td>
                            <td className="py-3">68%</td>
                            <td className="py-3">$28,430</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 pl-0 font-medium">Business</td>
                            <td className="py-3">15</td>
                            <td className="py-3">1,532</td>
                            <td className="py-3">4.6</td>
                            <td className="py-3">65%</td>
                            <td className="py-3">$15,800</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 pl-0 font-medium">Marketing</td>
                            <td className="py-3">10</td>
                            <td className="py-3">1,248</td>
                            <td className="py-3">4.5</td>
                            <td className="py-3">56%</td>
                            <td className="py-3">$10,300</td>
                          </tr>
                          <tr>
                            <td className="py-3 pl-0 font-medium">Data Science</td>
                            <td className="py-3">5</td>
                            <td className="py-3">854</td>
                            <td className="py-3">4.7</td>
                            <td className="py-3">47%</td>
                            <td className="py-3">$8,130</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Users Tab */}
            <TabsContent value="users">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Acquisition Sources</CardTitle>
                    <CardDescription>
                      How users are finding your platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={userAcquisitionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ source, percent }) => `${source}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {userAcquisitionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>
                      New user registrations over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { month: 'Jan', users: 45 },
                            { month: 'Feb', users: 62 },
                            { month: 'Mar', users: 78 },
                            { month: 'Apr', users: 84 },
                            { month: 'May', users: 96 },
                            { month: 'Jun', users: 105 },
                            { month: 'Jul', users: 87 },
                            { month: 'Aug', users: 92 },
                            { month: 'Sep', users: 110 },
                            { month: 'Oct', users: 124 },
                            { month: 'Nov', users: 135 },
                            { month: 'Dec', users: 152 }
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="users" 
                            name="New Users" 
                            stroke="#8b5cf6" 
                            strokeWidth={2} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>User Engagement Metrics</CardTitle>
                    <CardDescription>
                      Key metrics about user behavior and engagement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Avg. Session Duration</p>
                        <h3 className="text-2xl font-bold mt-1">18:24</h3>
                        <p className="text-sm text-green-600 mt-1">+2:15 from last month</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Avg. Pages per Session</p>
                        <h3 className="text-2xl font-bold mt-1">4.8</h3>
                        <p className="text-sm text-green-600 mt-1">+0.3 from last month</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Bounce Rate</p>
                        <h3 className="text-2xl font-bold mt-1">28.4%</h3>
                        <p className="text-sm text-green-600 mt-1">-2.1% from last month</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Return User Rate</p>
                        <h3 className="text-2xl font-bold mt-1">42.7%</h3>
                        <p className="text-sm text-green-600 mt-1">+3.5% from last month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
