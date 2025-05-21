
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { coursesData } from '@/data/mockData';
import { Clock, Star, FileText, Play, Settings, User, Book } from 'lucide-react';

// Mock enrolled courses (for demonstration)
const enrolledCourses = [
  {
    ...coursesData[0],
    progress: 75,
    lastAccessed: '2023-05-20T10:30:00Z',
    nextLesson: 'Advanced Techniques',
    completedLessons: 12,
    totalLessons: 16
  },
  {
    ...coursesData[2],
    progress: 30,
    lastAccessed: '2023-05-18T14:15:00Z',
    nextLesson: 'Email Marketing Fundamentals',
    completedLessons: 4,
    totalLessons: 14
  },
  {
    ...coursesData[3],
    progress: 10,
    lastAccessed: '2023-05-15T09:45:00Z',
    nextLesson: 'User Research Methods',
    completedLessons: 2,
    totalLessons: 20
  }
];

// Mock achievements
const achievements = [
  {
    id: '1',
    title: 'Quick Learner',
    description: 'Completed your first course',
    icon: 'rocket',
    earned: true,
    date: '2023-04-10'
  },
  {
    id: '2',
    title: 'Dedicated Student',
    description: 'Studied for 10 consecutive days',
    icon: 'calendar',
    earned: true,
    date: '2023-04-25'
  },
  {
    id: '3',
    title: 'Knowledge Seeker',
    description: 'Enrolled in 3 different courses',
    icon: 'book',
    earned: true,
    date: '2023-05-05'
  },
  {
    id: '4',
    title: 'Master of Craft',
    description: 'Complete all courses in a single category',
    icon: 'award',
    earned: false
  }
];

// Mock certificates
const certificates = [
  {
    id: '1',
    title: 'Web Development Bootcamp',
    issueDate: '2023-04-15',
    imageUrl: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '2',
    title: 'Digital Marketing Masterclass',
    issueDate: '2023-05-10',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
  }
];

const UserDashboard = () => {
  const [tab, setTab] = useState('courses');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Dashboard Header */}
      <section className="pt-24 pb-6 md:pt-32 md:pb-10 px-4 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white text-xl font-bold">
                JD
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-heading">Welcome back, Jane!</h1>
                <p className="text-muted-foreground">Continue your learning journey</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Account Settings
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-purple-400 hover:opacity-90">
                Browse Courses
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Progress Summary */}
      <section className="py-6 px-4 border-b">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300">
                  <Book className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                  <div className="text-sm text-muted-foreground">Enrolled Courses</div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-300">
                  <Play className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">16</div>
                  <div className="text-sm text-muted-foreground">Hours of Learning</div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-300">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{certificates.length}</div>
                  <div className="text-sm text-muted-foreground">Certificates</div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-300">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{achievements.filter(a => a.earned).length}</div>
                  <div className="text-sm text-muted-foreground">Achievements</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Dashboard Content */}
      <section className="py-8 px-4 flex-grow">
        <div className="container mx-auto">
          <Tabs value={tab} onValueChange={setTab} className="space-y-8">
            <TabsList>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>
            
            {/* My Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-heading">Your Enrolled Courses</h2>
                <Link to="/courses">
                  <Button variant="outline" size="sm">
                    Browse More Courses
                  </Button>
                </Link>
              </div>
              
              {enrolledCourses.length > 0 ? (
                <div className="space-y-6">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="glass-card p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="sm:w-1/4">
                          <img 
                            src={course.imageUrl} 
                            alt={course.title}
                            className="w-full aspect-video object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                            <h3 className="text-lg font-bold">{course.title}</h3>
                            <Badge variant="outline" className="mt-1 sm:mt-0 w-fit">
                              {course.category}
                            </Badge>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center justify-between mb-1 text-sm">
                                <span>Progress</span>
                                <span>{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm">
                              <div className="flex items-center gap-1">
                                <Play className="h-4 w-4 text-muted-foreground" />
                                <span>{course.completedLessons}/{course.totalLessons} lessons completed</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                              <div>
                                <span className="text-sm text-muted-foreground">Next lesson: </span>
                                <span className="font-medium">{course.nextLesson}</span>
                              </div>
                              
                              <Link to={`/courses/${course.id}`}>
                                <Button>Continue Learning</Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 mx-auto mb-4">
                    <Book className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No enrolled courses yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start your learning journey by enrolling in a course
                  </p>
                  <Link to="/courses">
                    <Button className="bg-gradient-to-r from-purple-600 to-purple-400 hover:opacity-90">
                      Browse Courses
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <h2 className="text-2xl font-bold font-heading">Your Achievements</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`glass-card p-6 text-center ${!achievement.earned ? 'opacity-50' : ''}`}
                  >
                    <div className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center text-purple-600 dark:text-purple-300">
                      {achievement.earned ? (
                        <div className="h-full w-full rounded-full bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white">
                          <Star className="h-8 w-8" />
                        </div>
                      ) : (
                        <div className="h-full w-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                          <User className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{achievement.description}</p>
                    
                    {achievement.earned ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Earned on {new Date(achievement.date!).toLocaleDateString()}
                      </Badge>
                    ) : (
                      <Badge variant="outline">In Progress</Badge>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Certificates Tab */}
            <TabsContent value="certificates" className="space-y-6">
              <h2 className="text-2xl font-bold font-heading">Your Certificates</h2>
              
              {certificates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.map((certificate) => (
                    <div key={certificate.id} className="glass-card overflow-hidden">
                      <div className="relative">
                        <img 
                          src={certificate.imageUrl} 
                          alt={certificate.title}
                          className="w-full aspect-[4/3] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-end">
                          <div className="p-4 text-white">
                            <h3 className="font-bold text-lg">{certificate.title}</h3>
                            <p className="text-sm opacity-90">
                              Issued on {new Date(certificate.issueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <Button variant="outline" size="sm">View Certificate</Button>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 mx-auto mb-4">
                    <FileText className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No certificates yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Complete a course to earn your first certificate
                  </p>
                  <Link to="/courses">
                    <Button className="bg-gradient-to-r from-purple-600 to-purple-400 hover:opacity-90">
                      Browse Courses
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            {/* Account Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-2xl font-bold font-heading">Account Settings</h2>
              
              <div className="glass-card p-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="sm:w-1/4 flex flex-col items-center">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white text-3xl font-bold mb-4">
                      JD
                    </div>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">First Name</label>
                        <Input type="text" defaultValue="Jane" className="glass-input" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Last Name</label>
                        <Input type="text" defaultValue="Doe" className="glass-input" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email</label>
                        <Input type="email" defaultValue="jane.doe@example.com" className="glass-input" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Phone Number</label>
                        <Input type="tel" defaultValue="+1 (555) 123-4567" className="glass-input" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-bold mb-2">Notification Preferences</h3>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded text-purple-600" defaultChecked />
                          <span>Course updates and announcements</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded text-purple-600" defaultChecked />
                          <span>New course recommendations</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded text-purple-600" />
                          <span>Newsletter and promotional emails</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button className="bg-gradient-to-r from-purple-600 to-purple-400 hover:opacity-90">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Helper function to create a dynamic input component
const Input = ({ type, defaultValue, className, ...props }: any) => {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      className={`w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
};

export default UserDashboard;
