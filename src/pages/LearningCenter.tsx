
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { coursesData, mockCurriculum } from "@/data/mockData";
import { PlayCircle, CheckCircle, Clock, File, BookOpen, MessageSquare } from "lucide-react";

const LearningCenter = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState("content");
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  // Find the course
  const course = coursesData.find(c => c.id === courseId);
  
  // Initialize with the first lesson if none is selected
  useEffect(() => {
    if (!currentLessonId && mockCurriculum.length > 0 && mockCurriculum[0].lessons.length > 0) {
      setCurrentLessonId(mockCurriculum[0].lessons[0].id);
    }
  }, [currentLessonId]);
  
  // Get the current lesson
  const getCurrentLesson = () => {
    for (const section of mockCurriculum) {
      const lesson = section.lessons.find(l => l.id === currentLessonId);
      if (lesson) {
        return { section, lesson };
      }
    }
    return null;
  };
  
  const currentLessonInfo = getCurrentLesson();
  
  // Calculate course progress
  const totalLessons = mockCurriculum.reduce(
    (total, section) => total + section.lessons.length, 0
  );
  const completedLessons = Object.values(progress).filter(Boolean).length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  
  // Mark lesson as completed
  const markAsCompleted = (lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      [lessonId]: true
    }));
  };
  
  // Save notes for a lesson
  const saveNotes = (lessonId: string, content: string) => {
    setNotes(prev => ({
      ...prev,
      [lessonId]: content
    }));
  };
  
  if (!course) {
    return <div className="p-8">Course not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-20 bg-gray-50 dark:bg-gray-900 flex-grow">
        <div className="container mx-auto px-4">
          {/* Course Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center mr-4">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.duration}</span>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-100 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>{completedLessons} of {totalLessons} lessons completed</span>
              <span>{progressPercentage.toFixed(0)}% complete</span>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Curriculum Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold">Course Content</h3>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {mockCurriculum.map((section) => (
                    <AccordionItem key={section.id} value={section.id}>
                      <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <span className="font-medium">{section.title}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 p-2">
                          {section.lessons.map((lesson) => (
                            <Button
                              key={lesson.id}
                              variant="ghost"
                              className={`w-full justify-start text-left ${
                                currentLessonId === lesson.id 
                                  ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" 
                                  : ""
                              }`}
                              onClick={() => setCurrentLessonId(lesson.id)}
                            >
                              <div className="flex items-center w-full">
                                {progress[lesson.id] ? (
                                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                ) : (
                                  <PlayCircle className="h-4 w-4 mr-2" />
                                )}
                                <span className="truncate">{lesson.title}</span>
                                <span className="ml-auto text-xs text-gray-500">{lesson.duration}</span>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            
            {/* Main Lesson Display */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                {currentLessonInfo ? (
                  <>
                    {/* Video Player */}
                    <div className="bg-gray-900 aspect-video flex items-center justify-center">
                      <div className="text-center text-white">
                        <PlayCircle className="h-16 w-16 mx-auto mb-2 text-purple-400" />
                        <p>Video for "{currentLessonInfo.lesson.title}"</p>
                        <p className="text-sm text-gray-400">
                          From section: {currentLessonInfo.section.title}
                        </p>
                      </div>
                    </div>
                    
                    {/* Lesson Details */}
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">{currentLessonInfo.lesson.title}</h2>
                        <Button 
                          variant={progress[currentLessonId!] ? "outline" : "default"} 
                          onClick={() => markAsCompleted(currentLessonId!)}
                          className="gap-2"
                        >
                          {progress[currentLessonId!] ? (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              Completed
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              Mark as Complete
                            </>
                          )}
                        </Button>
                      </div>
                      
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList>
                          <TabsTrigger value="content">Content</TabsTrigger>
                          <TabsTrigger value="notes">My Notes</TabsTrigger>
                          <TabsTrigger value="resources">Resources</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="content" className="pt-4">
                          <div className="prose dark:prose-invert max-w-none">
                            <p>
                              This is the content for the "{currentLessonInfo.lesson.title}" lesson. 
                              In a real course, this area would contain detailed explanations,
                              code examples, images, and other relevant content for this specific lesson.
                            </p>
                            <p>
                              The content is structured to help you understand the concepts covered in this lesson
                              and to prepare you for the practical exercises that follow.
                            </p>
                            <h3>Key Points</h3>
                            <ul>
                              <li>First important concept in this lesson</li>
                              <li>Second important concept with detailed explanation</li>
                              <li>Practical applications of these concepts</li>
                              <li>Common mistakes to avoid</li>
                            </ul>
                            <p>
                              After studying this content, you should be able to apply these concepts
                              to solve real-world problems in this domain.
                            </p>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="notes" className="pt-4">
                          <div className="space-y-4">
                            <Textarea 
                              placeholder="Take notes for this lesson..." 
                              className="min-h-40" 
                              value={notes[currentLessonId!] || ''}
                              onChange={(e) => saveNotes(currentLessonId!, e.target.value)}
                            />
                            <Button>Save Notes</Button>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="resources" className="pt-4">
                          <div className="space-y-4">
                            <p className="text-sm text-gray-500">
                              Download additional resources for this lesson:
                            </p>
                            <div className="space-y-2">
                              <a href="#" className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                <File className="h-5 w-5 mr-2 text-blue-500" />
                                <span>Lesson Slides (PDF)</span>
                              </a>
                              <a href="#" className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                <File className="h-5 w-5 mr-2 text-blue-500" />
                                <span>Exercise Files (ZIP)</span>
                              </a>
                              <a href="#" className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                <File className="h-5 w-5 mr-2 text-blue-500" />
                                <span>Additional Reading (PDF)</span>
                              </a>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                    
                    {/* Navigation Controls */}
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                      <Button variant="outline">Previous Lesson</Button>
                      <Button>Next Lesson</Button>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center">
                    <p>Select a lesson to start learning</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LearningCenter;
