
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { coursesData } from "@/data/mockData";

const AdminCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter courses based on search query
  const filteredCourses = coursesData.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Courses Management</h1>
            <Link to="/admin/courses/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Course
              </Button>
            </Link>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search courses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Courses Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <img 
                          src={course.imageUrl} 
                          alt={course.title} 
                          className="h-10 w-16 object-cover rounded"
                        />
                        <span className="line-clamp-1">{course.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>${course.price.toFixed(2)}</TableCell>
                    <TableCell>{course.studentsCount.toLocaleString()}</TableCell>
                    <TableCell>{course.rating}</TableCell>
                    <TableCell>
                      <Badge variant={course.bestseller ? "default" : "outline"}>
                        {course.bestseller ? "Bestseller" : "Normal"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link to={`/admin/courses/${course.id}`}>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;
