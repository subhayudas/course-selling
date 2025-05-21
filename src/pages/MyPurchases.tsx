
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Clock, Calendar, Download, CreditCard } from "lucide-react";
import { coursesData } from "@/data/mockData";

// Mock purchased courses
const purchasedCourses = [
  {
    ...coursesData[0],
    purchaseDate: "2023-05-15",
    progress: 75,
    expiryDate: null, // No expiry (lifetime access)
    certificateAvailable: true,
  },
  {
    ...coursesData[3],
    purchaseDate: "2023-04-03",
    progress: 100,
    expiryDate: null, // No expiry (lifetime access)
    certificateAvailable: true,
  }
];

// Mock certificates
const certificates = [
  {
    id: "cert-1",
    courseId: coursesData[3].id,
    courseName: coursesData[3].title,
    issueDate: "2023-05-01",
    completionDate: "2023-04-30",
  }
];

// Mock receipts
const receipts = [
  {
    id: "rcpt-1",
    courseId: coursesData[0].id,
    courseName: coursesData[0].title,
    purchaseDate: "2023-05-15",
    amount: 99.99,
    paymentMethod: "Credit Card •••• 4242",
  },
  {
    id: "rcpt-2",
    courseId: coursesData[3].id,
    courseName: coursesData[3].title,
    purchaseDate: "2023-04-03",
    amount: 69.99,
    paymentMethod: "PayPal",
  }
];

const MyPurchases = () => {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-20 pb-10 bg-gray-50 dark:bg-gray-900 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">My Purchases</h1>
          <p className="text-gray-500 mb-6">Manage your courses, certificates, and payment history</p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="receipts">Payment History</TabsTrigger>
            </TabsList>
            
            {/* My Courses Tab */}
            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-white/90 text-black">
                            {course.category}
                          </Badge>
                          <Badge variant={course.progress === 100 ? "default" : "outline"} className="bg-green-500/90 text-white">
                            {course.progress === 100 ? "Completed" : `${course.progress}% Complete`}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Purchased on {new Date(course.purchaseDate).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-2 bg-purple-600"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{course.duration}</span>
                          </div>
                          {course.expiryDate ? (
                            <span className="text-amber-500">
                              Expires: {new Date(course.expiryDate).toLocaleDateString()}
                            </span>
                          ) : (
                            <span className="text-green-600">Lifetime Access</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex gap-2">
                      <Link to={`/learning/${course.id}`} className="flex-1">
                        <Button className="w-full gap-2">
                          <PlayCircle className="h-4 w-4" />
                          {course.progress > 0 ? "Continue Learning" : "Start Learning"}
                        </Button>
                      </Link>
                      
                      {course.certificateAvailable && course.progress === 100 && (
                        <Button variant="outline" className="gap-2">
                          <Download className="h-4 w-4" />
                          Certificate
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
                
                {purchasedCourses.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                      <CreditCard className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No courses purchased yet</h3>
                    <p className="text-gray-500 mb-6">
                      Browse our course catalog and find something that interests you.
                    </p>
                    <Link to="/courses">
                      <Button>Browse Courses</Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Certificates Tab */}
            <TabsContent value="certificates">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((certificate) => {
                  const course = coursesData.find(c => c.id === certificate.courseId);
                  return (
                    <Card key={certificate.id} className="overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-white text-center">
                        <h3 className="text-lg font-bold mb-2">Certificate of Completion</h3>
                        <p className="text-sm opacity-80">This certifies that</p>
                        <p className="text-xl font-semibold my-2">Jane Doe</p>
                        <p className="text-sm opacity-80">has successfully completed</p>
                        <p className="text-lg font-medium my-2">{certificate.courseName}</p>
                        <p className="text-sm opacity-80">on {new Date(certificate.completionDate).toLocaleDateString()}</p>
                      </div>
                      
                      <CardContent className="pt-4 pb-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Issued on {new Date(certificate.issueDate).toLocaleDateString()}</span>
                          <span className="text-blue-600">ID: {certificate.id}</span>
                        </div>
                      </CardContent>
                      
                      <CardFooter>
                        <div className="flex gap-2 w-full">
                          <Button variant="outline" className="flex-1 gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                          <Button className="flex-1">Share</Button>
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
                
                {certificates.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                      <Download className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No certificates yet</h3>
                    <p className="text-gray-500 mb-6">
                      Complete a course to earn your first certificate.
                    </p>
                    <Link to="/courses">
                      <Button>Browse Courses</Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Payment History Tab */}
            <TabsContent value="receipts">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>
                    View your payment history and download receipts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {receipts.length > 0 ? (
                    <div className="rounded-lg overflow-hidden border">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800 text-sm">
                          <tr>
                            <th className="py-3 px-4 text-left font-medium">Date</th>
                            <th className="py-3 px-4 text-left font-medium">Course</th>
                            <th className="py-3 px-4 text-left font-medium">Payment Method</th>
                            <th className="py-3 px-4 text-right font-medium">Amount</th>
                            <th className="py-3 px-4 text-right font-medium">Receipt</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {receipts.map((receipt) => (
                            <tr key={receipt.id}>
                              <td className="py-3 px-4 text-sm">
                                {new Date(receipt.purchaseDate).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4">
                                <Link to={`/courses/${receipt.courseId}`} className="text-blue-600 hover:underline">
                                  {receipt.courseName}
                                </Link>
                              </td>
                              <td className="py-3 px-4 text-sm">{receipt.paymentMethod}</td>
                              <td className="py-3 px-4 text-right font-medium">${receipt.amount.toFixed(2)}</td>
                              <td className="py-3 px-4 text-right">
                                <Button variant="ghost" size="sm" className="text-blue-500 gap-1">
                                  <Download className="h-4 w-4" />
                                  PDF
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                        <CreditCard className="h-8 w-8 text-gray-500" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">No payment history</h3>
                      <p className="text-gray-500 mb-6">
                        You have not made any purchases yet.
                      </p>
                      <Link to="/courses">
                        <Button>Browse Courses</Button>
                      </Link>
                    </div>
                  )}
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

export default MyPurchases;
