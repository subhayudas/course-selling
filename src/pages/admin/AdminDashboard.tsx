
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  Users,
  BookOpen,
  DollarSign,
  BarChart
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data for dashboard stats
  const stats = [
    { title: "Total Students", value: "2,845", icon: Users, change: "+12.5%", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
    { title: "Active Courses", value: "32", icon: BookOpen, change: "+4.3%", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
    { title: "Revenue", value: "$42,582", icon: DollarSign, change: "+18.7%", color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
    { title: "Conversion Rate", value: "3.8%", icon: BarChart, change: "+2.1%", color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
  ];

  // Mock data for recent sales
  const recentSales = [
    { student: "Alex Thompson", course: "Web Development Bootcamp", price: "$99.99", date: "2023-06-12" },
    { student: "Sarah Miller", course: "UI/UX Design Principles", price: "$69.99", date: "2023-06-11" },
    { student: "John Doe", course: "Data Science Fundamentals", price: "$89.99", date: "2023-06-10" },
    { student: "Emily Chen", course: "Digital Marketing Masterclass", price: "$79.99", date: "2023-06-09" },
    { student: "Michael Williams", course: "Business Strategy and Management", price: "$129.99", date: "2023-06-08" },
  ];

  // Mock data for top performing courses
  const topCourses = [
    { title: "Web Development Bootcamp", enrollments: 843, revenue: "$84,257", rating: 4.8 },
    { title: "UI/UX Design Principles", enrollments: 562, revenue: "$39,277", rating: 4.9 },
    { title: "Data Science Fundamentals", enrollments: 489, revenue: "$43,989", rating: 4.7 },
    { title: "Digital Marketing Masterclass", enrollments: 376, revenue: "$30,064", rating: 4.5 },
    { title: "Business Strategy and Management", enrollments: 298, revenue: "$38,714", rating: 4.6 },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <p className="text-sm font-medium text-green-600 mt-1">
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Charts and Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Sales Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>Latest course purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b dark:border-gray-700">
                        <th className="pb-2 text-sm font-medium">Student</th>
                        <th className="pb-2 text-sm font-medium">Course</th>
                        <th className="pb-2 text-sm font-medium">Price</th>
                        <th className="pb-2 text-sm font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentSales.map((sale, index) => (
                        <tr key={index} className="border-b dark:border-gray-800 last:border-0">
                          <td className="py-3 text-sm">{sale.student}</td>
                          <td className="py-3 text-sm">{sale.course}</td>
                          <td className="py-3 text-sm">{sale.price}</td>
                          <td className="py-3 text-sm">{sale.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Top Performing Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Courses</CardTitle>
                <CardDescription>Courses with highest enrollments and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b dark:border-gray-700">
                        <th className="pb-2 text-sm font-medium">Course</th>
                        <th className="pb-2 text-sm font-medium">Enrollments</th>
                        <th className="pb-2 text-sm font-medium">Revenue</th>
                        <th className="pb-2 text-sm font-medium">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topCourses.map((course, index) => (
                        <tr key={index} className="border-b dark:border-gray-800 last:border-0">
                          <td className="py-3 text-sm">{course.title}</td>
                          <td className="py-3 text-sm">{course.enrollments}</td>
                          <td className="py-3 text-sm">{course.revenue}</td>
                          <td className="py-3 text-sm">{course.rating}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
