
import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  UserCog,
  Mail,
  Calendar,
  MoreHorizontal, 
  ArrowUpDown,
  CheckCircle,
  XCircle 
} from "lucide-react";

// Mock users data
const users = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex.thompson@example.com',
    role: 'student',
    enrolledCourses: 3,
    lastActive: '2023-06-10',
    dateJoined: '2023-01-15',
    verified: true,
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Miller',
    email: 'sarah.miller@example.com',
    role: 'student',
    enrolledCourses: 2,
    lastActive: '2023-06-12',
    dateJoined: '2023-02-20',
    verified: true,
    status: 'active'
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'instructor',
    enrolledCourses: 0,
    lastActive: '2023-06-11',
    dateJoined: '2022-11-05',
    verified: true,
    status: 'active'
  },
  {
    id: '4',
    name: 'Emily Chen',
    email: 'emily.chen@example.com',
    role: 'student',
    enrolledCourses: 1,
    lastActive: '2023-05-30',
    dateJoined: '2023-03-12',
    verified: false,
    status: 'pending'
  },
  {
    id: '5',
    name: 'Robert Brown',
    email: 'robert.brown@example.com',
    role: 'admin',
    enrolledCourses: 0,
    lastActive: '2023-06-12',
    dateJoined: '2022-10-01',
    verified: true,
    status: 'active'
  },
  {
    id: '6',
    name: 'Jessica Lee',
    email: 'jessica.lee@example.com',
    role: 'student',
    enrolledCourses: 4,
    lastActive: '2023-06-08',
    dateJoined: '2023-01-22',
    verified: true,
    status: 'active'
  },
  {
    id: '7',
    name: 'Michael Williams',
    email: 'michael.williams@example.com',
    role: 'instructor',
    enrolledCourses: 0,
    lastActive: '2023-06-09',
    dateJoined: '2022-12-14',
    verified: true,
    status: 'active'
  },
  {
    id: '8',
    name: 'David Kim',
    email: 'david.kim@example.com',
    role: 'student',
    enrolledCourses: 2,
    lastActive: '2023-05-20',
    dateJoined: '2023-02-28',
    verified: true,
    status: 'inactive'
  }
];

// Stats for the dashboard
const userStats = [
  { title: 'Total Users', value: '845', change: '+12.5%' },
  { title: 'Active Users', value: '712', change: '+5.3%' },
  { title: 'New Users (30d)', value: '124', change: '+18.7%' },
  { title: 'Avg. Courses per User', value: '2.3', change: '+1.2%' }
];

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  
  // Filter users based on search query and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">User Management</h1>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New User
            </Button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {userStats.map((stat, index) => (
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
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                      <UserCog className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select
              className="px-3 py-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="instructor">Instructors</option>
              <option value="admin">Admins</option>
            </select>
          </div>
          
          {/* Users Table */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Role
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Enrolled Courses</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Last Active
                        <ArrowUpDown className="h-3 w-3 ml-1" />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-medium">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Mail className="h-4 w-4" />
                          <span>{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          user.role === 'admin' ? "default" : 
                          user.role === 'instructor' ? "secondary" : "outline"
                        }>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{user.enrolledCourses}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{user.lastActive}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {user.status === 'active' ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : user.status === 'inactive' ? (
                            <XCircle className="h-4 w-4 text-red-500" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                          )}
                          <span className={`capitalize ${
                            user.status === 'active' ? 'text-green-600' :
                            user.status === 'inactive' ? 'text-red-600' :
                            'text-yellow-600'
                          }`}>
                            {user.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No users found matching your search criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
