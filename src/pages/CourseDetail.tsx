
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { coursesData, mockCurriculum } from "@/data/mockData";
import { 
  Clock, 
  BadgeCheck, 
  BarChart, 
  Users, 
  Star, 
  BookOpen,
  Globe, 
  MessageCircle, 
  Award, 
  PlayCircle,
  ChevronRight,
  File
} from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState("overview");
  
  // Find the course based on the ID parameter
  const course = coursesData.find(course => course.id === id);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
            <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
            <Link to="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Calculate total course content
  const totalSections = mockCurriculum.length;
  const totalLessons = mockCurriculum.reduce((sum, section) => sum + section.lessons.length, 0);
  const totalDuration = mockCurriculum.reduce((sum, section) => {
    return sum + section.lessons.reduce((lessonSum, lesson) => {
      const minutes = parseInt(lesson.duration) || 0;
      return lessonSum + minutes;
    }, 0);
  }, 0);
  
  // Format hours and minutes
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;
  const formattedDuration = `${hours}h ${minutes}m`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-6 md:pt-32 md:pb-10 px-4 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Course Info */}
            <div className="md:w-7/12 lg:w-8/12 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-none">
                    {course.category}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-none">
                    {course.level}
                  </Badge>
                  {course.bestseller && (
                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-none">
                      Bestseller
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{course.title}</h1>
                
                <p className="text-lg text-gray-700 dark:text-gray-300">{course.description}</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-1" />
                  <span className="font-bold mr-1">{course.rating}</span>
                  <span className="text-muted-foreground">({course.studentsCount.toLocaleString()} students)</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-muted-foreground mr-1" />
                  <span>{course.duration}</span>
                </div>
                
                <div className="flex items-center">
                  <BadgeCheck className="w-5 h-5 text-muted-foreground mr-1" />
                  <span>Last updated 1 month ago</span>
                </div>
                
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-muted-foreground mr-1" />
                  <span>English</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" 
                    alt={course.instructor}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{course.instructor}</p>
                    <p className="text-sm text-muted-foreground">Course Instructor</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Course Card */}
            <div className="md:w-5/12 lg:w-4/12">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden sticky top-24">
                <div className="relative">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Button size="lg" className="gap-2">
                      <PlayCircle className="h-5 w-5" />
                      Watch Preview
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold">${course.price.toFixed(2)}</span>
                      {course.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through ml-2">
                          ${course.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {course.originalPrice && (
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-none">
                        {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full text-lg" size="lg">
                      Enroll Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      Add to Cart
                    </Button>
                  </div>
                  
                  <div className="text-sm text-center text-muted-foreground">
                    30-Day Money-Back Guarantee
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">This course includes:</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <BookOpen className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                        <span>{formattedDuration} of on-demand video</span>
                      </li>
                      <li className="flex items-start">
                        <File className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                        <span>{totalLessons} lessons in {totalSections} sections</span>
                      </li>
                      <li className="flex items-start">
                        <MessageCircle className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                        <span>Full lifetime access</span>
                      </li>
                      <li className="flex items-start">
                        <Globe className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                        <span>Access on mobile and desktop</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                        <span>Certificate of completion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Course Content Tabs */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <div className="border-b">
              <TabsList className="mx-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
            </div>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="py-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                    <div className="prose max-w-none dark:prose-invert">
                      <p>
                        This comprehensive course is designed for anyone who wants to learn {course.title.toLowerCase()}. 
                        Whether you're a complete beginner or have some experience, this course will take you 
                        from the basics to advanced concepts and practical applications.
                      </p>
                      <p>
                        Throughout this course, you'll work on real-world projects that will help you apply 
                        what you've learned and build a portfolio to showcase your skills to potential employers.
                      </p>
                      <h3>What you'll learn</h3>
                      <ul>
                        <li>Master the fundamentals and core concepts</li>
                        <li>Build practical, real-world projects from scratch</li>
                        <li>Learn best practices and professional workflows</li>
                        <li>Troubleshoot common problems and debug effectively</li>
                        <li>Stay up to date with the latest trends and technologies</li>
                      </ul>
                      <h3>Requirements</h3>
                      <ul>
                        <li>No prior knowledge needed - we'll start from the basics</li>
                        <li>A computer with internet access</li>
                        <li>Dedication and willingness to practice what you learn</li>
                      </ul>
                      <h3>Who this course is for</h3>
                      <ul>
                        <li>Beginners with no previous experience</li>
                        <li>Intermediate learners looking to fill gaps in their knowledge</li>
                        <li>Anyone wanting to stay current with industry standards</li>
                        <li>Professionals looking to upskill or change career paths</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="font-bold text-xl mb-4">Course Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 mr-2 text-purple-500" />
                          <span>Enrolled Students</span>
                        </div>
                        <span className="font-medium">{course.studentsCount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 mr-2 text-purple-500" />
                          <span>Course Rating</span>
                        </div>
                        <span className="font-medium">{course.rating} / 5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 mr-2 text-purple-500" />
                          <span>Lessons</span>
                        </div>
                        <span className="font-medium">{totalLessons}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <BarChart className="h-5 w-5 mr-2 text-purple-500" />
                          <span>Skill Level</span>
                        </div>
                        <span className="font-medium">{course.level}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-purple-500" />
                          <span>Duration</span>
                        </div>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 mr-2 text-purple-500" />
                          <span>Language</span>
                        </div>
                        <span className="font-medium">English</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Curriculum Tab */}
            <TabsContent value="curriculum" className="py-6">
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Course Content</h2>
                    <p className="text-muted-foreground">
                      {totalSections} sections • {totalLessons} lectures • {formattedDuration} total length
                    </p>
                  </div>
                  <Button variant="link" className="text-purple-600 dark:text-purple-400">
                    Expand All
                  </Button>
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {mockCurriculum.map((section, index) => (
                    <AccordionItem 
                      key={section.id} 
                      value={section.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div className="flex justify-between items-center w-full pr-4">
                          <div className="font-medium text-left">
                            <span className="text-muted-foreground mr-2">Section {index + 1}:</span> 
                            {section.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {section.lessons.length} lectures • {
                              (() => {
                                const sectionMinutes = section.lessons.reduce((sum, lesson) => {
                                  const minutes = parseInt(lesson.duration) || 0;
                                  return sum + minutes;
                                }, 0);
                                return sectionMinutes >= 60 
                                  ? `${Math.floor(sectionMinutes / 60)}h ${sectionMinutes % 60}m` 
                                  : `${sectionMinutes}m`;
                              })()
                            }
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-white dark:bg-gray-900">
                        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                          {section.lessons.map((lesson) => (
                            <li key={lesson.id} className="px-6 py-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <PlayCircle className="h-5 w-5 text-purple-500 mr-3" />
                                  <span>{lesson.title}</span>
                                  {lesson.free && (
                                    <Badge variant="outline" className="ml-3 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                                      Free
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
            
            {/* Instructor Tab */}
            <TabsContent value="instructor" className="py-6">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <img 
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80" 
                    alt={course.instructor}
                    className="w-32 h-32 object-cover rounded-full"
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold">{course.instructor}</h2>
                      <p className="text-purple-600 dark:text-purple-400">Senior Instructor & Course Developer</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium">4.8</span>
                        <span className="text-muted-foreground">Instructor Rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-5 w-5 text-muted-foreground" />
                        <span>243 Reviews</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span>24,531 Students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <span>7 Courses</span>
                      </div>
                    </div>
                    
                    <div className="prose max-w-none dark:prose-invert">
                      <p>
                        {course.instructor} is a senior developer and educator with over 10 years of industry experience. 
                        Specializing in {course.category.toLowerCase()}, they have worked with Fortune 500 companies 
                        and startups alike, bringing real-world expertise to their teaching.
                      </p>
                      <p>
                        Their teaching philosophy focuses on practical, hands-on learning that prepares students 
                        for real-world challenges. With a passion for mentoring new talent, they've helped 
                        thousands of students transition into successful careers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Reviews Tab */}
            <TabsContent value="reviews" className="py-6">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h3 className="text-5xl font-bold mb-1">{course.rating}</h3>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${
                              i < Math.floor(course.rating) 
                                ? 'text-yellow-500 fill-yellow-500' 
                                : i < course.rating 
                                  ? 'text-yellow-500 fill-yellow-500 opacity-50' 
                                  : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4">Course Rating</p>
                      
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map(stars => {
                          // Calculate percentage for each star rating (mock data)
                          const percentage = stars === 5 ? 78 : 
                                           stars === 4 ? 15 : 
                                           stars === 3 ? 5 : 
                                           stars === 2 ? 1 : 1;
                          
                          return (
                            <div key={stars} className="flex items-center gap-2">
                              <span className="text-sm w-8 text-right">{stars} stars</span>
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                                <div 
                                  className="bg-yellow-500 h-full rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-muted-foreground w-8">{percentage}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 space-y-6">
                    <h3 className="text-xl font-bold">Student Reviews</h3>
                    
                    <div className="space-y-6">
                      {/* Sample reviews */}
                      {[
                        {
                          name: "Alex Thompson",
                          date: "2 weeks ago",
                          rating: 5,
                          comment: "This course exceeded my expectations. The instructor explains complex concepts in a way that's easy to understand, and the projects are practical and relevant to real-world scenarios."
                        },
                        {
                          name: "Sarah Miller",
                          date: "1 month ago",
                          rating: 4,
                          comment: "Great course with lots of valuable content. The only reason I'm giving 4 stars instead of 5 is because some sections could use more examples. Otherwise, highly recommended!"
                        },
                        {
                          name: "Michael Johnson",
                          date: "2 months ago",
                          rating: 5,
                          comment: "This course helped me transition into a new career. The instructor is knowledgeable and responsive to questions. The curriculum is well-structured and builds skills progressively."
                        }
                      ].map((review, index) => (
                        <div key={index} className="border-b border-gray-200 dark:border-gray-800 last:border-0 pb-6 last:pb-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-medium">
                                {review.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <h4 className="font-medium">{review.name}</h4>
                                <p className="text-sm text-muted-foreground">{review.date}</p>
                              </div>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${
                                    i < review.rating 
                                      ? 'text-yellow-500 fill-yellow-500' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full">Load More Reviews</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Related Courses */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Courses</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coursesData
              .filter(c => c.category === course.category && c.id !== course.id)
              .slice(0, 4)
              .map(relatedCourse => (
                <Link key={relatedCourse.id} to={`/courses/${relatedCourse.id}`} className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img 
                        src={relatedCourse.imageUrl} 
                        alt={relatedCourse.title}
                        className="w-full aspect-video object-cover"
                      />
                      {relatedCourse.bestseller && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-amber-500">Bestseller</Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 line-clamp-2">
                        {relatedCourse.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{relatedCourse.instructor}</p>
                      <div className="flex items-center mb-2">
                        <span className="font-bold text-amber-500 mr-1">{relatedCourse.rating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${
                                i < Math.floor(relatedCourse.rating) 
                                  ? 'text-yellow-500 fill-yellow-500' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground ml-1">
                          ({relatedCourse.studentsCount.toLocaleString()})
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold">${relatedCourse.price.toFixed(2)}</span>
                          {relatedCourse.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              ${relatedCourse.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/courses">
              <Button variant="outline" className="gap-2">
                View All Courses
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
