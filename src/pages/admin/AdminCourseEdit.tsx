
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { coursesData, categories, mockCurriculum } from "@/data/mockData";
import { Plus, Upload, X, Move, PlaySquare, File } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminCourseEdit = () => {
  const { id } = useParams();
  const isNewCourse = id === "new";
  const [activeTab, setActiveTab] = useState("basic");
  
  // Find the course data if editing an existing course
  const existingCourse = coursesData.find(c => c.id === id);
  
  // Form state
  const [formData, setFormData] = useState({
    title: existingCourse?.title || "",
    description: existingCourse?.description || "",
    price: existingCourse?.price || 0,
    originalPrice: existingCourse?.originalPrice || 0,
    category: existingCourse?.category || categories[0],
    level: existingCourse?.level || "Beginner",
    duration: existingCourse?.duration || "",
    imageUrl: existingCourse?.imageUrl || "",
    instructor: existingCourse?.instructor || "Admin"
  });
  
  // Curriculum state
  const [curriculum, setCurriculum] = useState(mockCurriculum);
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle select field changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isNewCourse ? "Course Created" : "Course Updated",
      description: `${formData.title} has been ${isNewCourse ? "created" : "updated"} successfully.`,
    });
  };
  
  // Add new section to curriculum
  const addSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      title: "New Section",
      lessons: []
    };
    setCurriculum([...curriculum, newSection]);
  };
  
  // Add new lesson to a section
  const addLesson = (sectionId: string) => {
    const updatedCurriculum = curriculum.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: [
            ...section.lessons,
            { 
              id: `lesson-${Date.now()}`, 
              title: "New Lesson", 
              duration: "0 mins", 
              free: false 
            }
          ]
        };
      }
      return section;
    });
    setCurriculum(updatedCurriculum);
  };
  
  // Update section title
  const updateSectionTitle = (sectionId: string, newTitle: string) => {
    const updatedCurriculum = curriculum.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          title: newTitle
        };
      }
      return section;
    });
    setCurriculum(updatedCurriculum);
  };
  
  // Update lesson details
  const updateLesson = (sectionId: string, lessonId: string, field: string, value: any) => {
    const updatedCurriculum = curriculum.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                [field]: value
              };
            }
            return lesson;
          })
        };
      }
      return section;
    });
    setCurriculum(updatedCurriculum);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">
            {isNewCourse ? "Create New Course" : `Edit Course: ${existingCourse?.title}`}
          </h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="pricing">Pricing & Details</TabsTrigger>
            </TabsList>
            
            {/* Basic Info Tab */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Course Information</CardTitle>
                  <CardDescription>
                    Enter the basic details about your course.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Course Title</label>
                    <Input 
                      name="title" 
                      value={formData.title} 
                      onChange={handleChange} 
                      placeholder="Enter course title" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      name="description" 
                      value={formData.description} 
                      onChange={handleChange} 
                      placeholder="Enter course description" 
                      rows={5} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Level</label>
                      <Select 
                        value={formData.level} 
                        onValueChange={(value) => handleSelectChange("level", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="All Levels">All Levels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <Input 
                      name="duration" 
                      value={formData.duration} 
                      onChange={handleChange} 
                      placeholder="e.g., 20 hours" 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Curriculum Tab */}
            <TabsContent value="curriculum">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>
                    Organize your course content into sections and lessons.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {curriculum.map((section, sectionIndex) => (
                    <div key={section.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <Input
                          value={section.title}
                          onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                          className="font-medium text-lg w-full max-w-md"
                        />
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Move className="h-4 w-4 mr-2" />
                            Reorder
                          </Button>
                          <Button size="sm" variant="destructive">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3 ml-6">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div key={lesson.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                            <div className="flex items-center flex-1">
                              <PlaySquare className="h-5 w-5 mr-3 text-purple-500" />
                              <Input
                                value={lesson.title}
                                onChange={(e) => updateLesson(section.id, lesson.id, "title", e.target.value)}
                                className="max-w-xs"
                              />
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Input 
                                value={lesson.duration} 
                                onChange={(e) => updateLesson(section.id, lesson.id, "duration", e.target.value)}
                                className="w-24" 
                                placeholder="Duration" 
                              />
                              
                              <div className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  id={`free-${lesson.id}`} 
                                  checked={lesson.free}
                                  onChange={(e) => updateLesson(section.id, lesson.id, "free", e.target.checked)}
                                  className="mr-2" 
                                />
                                <label htmlFor={`free-${lesson.id}`}>Free Preview</label>
                              </div>
                              
                              <Button size="sm" variant="ghost">
                                <Upload className="h-4 w-4" />
                              </Button>
                              
                              <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="ml-8" 
                          onClick={() => addLesson(section.id)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Lesson
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button onClick={addSection}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Section
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Media Tab */}
            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <CardTitle>Course Media</CardTitle>
                  <CardDescription>
                    Upload your course thumbnail and promotional video.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Course Thumbnail</h3>
                    <div className="flex items-start space-x-4">
                      {formData.imageUrl ? (
                        <div className="relative">
                          <img 
                            src={formData.imageUrl} 
                            alt="Course thumbnail" 
                            className="w-64 h-40 object-cover rounded-lg"
                          />
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="absolute top-2 right-2 h-8 w-8 p-0"
                            onClick={() => setFormData({...formData, imageUrl: ""})}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-64 h-40 border-2 border-dashed border-gray-300 rounded-lg p-6">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Upload thumbnail image</p>
                          <Input 
                            type="file" 
                            className="hidden" 
                            id="thumbnail-upload" 
                            accept="image/*"
                          />
                          <label htmlFor="thumbnail-upload">
                            <Button variant="outline" size="sm" className="mt-2" as="span">
                              Browse Files
                            </Button>
                          </label>
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-2">
                          Upload a high-quality image that represents your course. 
                          Recommended size: 1280x720 pixels.
                        </p>
                        <Input 
                          name="imageUrl" 
                          value={formData.imageUrl} 
                          onChange={handleChange} 
                          placeholder="Or enter image URL" 
                          className="mb-2"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Promotional Video</h3>
                    <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <PlaySquare className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Upload promotional video</p>
                      <Input 
                        type="file" 
                        className="hidden" 
                        id="video-upload" 
                        accept="video/*"
                      />
                      <label htmlFor="video-upload">
                        <Button variant="outline" className="mt-2" as="span">
                          Browse Files
                        </Button>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Pricing Tab */}
            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Additional Details</CardTitle>
                  <CardDescription>
                    Set your course pricing and additional metadata.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price ($)</label>
                      <Input 
                        type="number" 
                        name="price" 
                        value={formData.price} 
                        onChange={handleChange} 
                        placeholder="Enter price" 
                        min="0" 
                        step="0.01" 
                      />
                      <p className="text-xs text-gray-500">Current price for the course</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Original Price ($)</label>
                      <Input 
                        type="number" 
                        name="originalPrice" 
                        value={formData.originalPrice} 
                        onChange={handleChange} 
                        placeholder="Enter original price" 
                        min="0" 
                        step="0.01" 
                      />
                      <p className="text-xs text-gray-500">Original price (for discount display)</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="bestseller" />
                      <label htmlFor="bestseller" className="text-sm font-medium">Mark as Bestseller</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="featured" />
                      <label htmlFor="featured" className="text-sm font-medium">Feature on Homepage</label>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Submit Button */}
              <div className="mt-6 flex justify-end">
                <Button onClick={handleSubmit} size="lg" className="px-6">
                  {isNewCourse ? "Create Course" : "Save Changes"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseEdit;
