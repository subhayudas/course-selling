
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CategoryFilter } from "@/components/CategoryFilter";
import { CourseCard } from "@/components/CourseCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from '@/components/ui/badge';
import { courseService } from '@/integrations/supabase/courseService';
import { categoryService } from '@/integrations/supabase/categoryService';
import { testimonialService } from '@/integrations/supabase/testimonialService';
import { contentService } from '@/integrations/supabase/contentService';
import { coursesData, testimonials, categories, features, benefits } from '@/data/mockData';

import { Book, User, Clock, FileText, Search, Play } from 'lucide-react';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [courses, setCourses] = useState(coursesData);
  const [featuredCourses, setFeaturedCourses] = useState(coursesData.filter(course => course.featured).slice(0, 3));
  const [categoriesList, setCategoriesList] = useState(categories);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const [featuresList, setFeaturesList] = useState(features);
  const [benefitsList, setBenefitsList] = useState(benefits);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // Fetch categories
        const { data: categoriesData } = await categoryService.getCategories();
        if (categoriesData) {
          setCategoriesList(categoriesData.map(category => category.name));
        }

        // Fetch courses
        const { data: coursesData } = await courseService.getCourses();
        if (coursesData) {
          const formattedCourses = coursesData.map(course => ({
            id: course.id,
            title: course.title,
            description: course.description || '',
            imageUrl: course.image_url || '',
            instructor: course.instructor_name || '',
            price: course.price || 0,
            originalPrice: course.original_price || null,
            rating: course.rating || 0,
            studentsCount: course.students_count || 0,
            category: course.categories?.name || '',
            level: course.level || 'Beginner',
            duration: course.duration || '',
            bestseller: course.bestseller || false,
            featured: course.featured || false
          }));
          setCourses(formattedCourses);
        }

        // Fetch featured courses
        const { data: featuredData } = await courseService.getFeaturedCourses();
        if (featuredData) {
          const formattedFeatured = featuredData.map(course => ({
            id: course.id,
            title: course.title,
            description: course.description || '',
            imageUrl: course.image_url || '',
            instructor: course.instructor_name || '',
            price: course.price || 0,
            originalPrice: course.original_price || null,
            rating: course.rating || 0,
            studentsCount: course.students_count || 0,
            category: course.categories?.name || '',
            level: course.level || 'Beginner',
            duration: course.duration || '',
            bestseller: course.bestseller || false,
            featured: course.featured || false
          }));
          setFeaturedCourses(formattedFeatured);
        }

        // Fetch testimonials
        const { data: testimonialsData } = await testimonialService.getTestimonials();
        if (testimonialsData) {
          const formattedTestimonials = testimonialsData.map(testimonial => ({
            id: testimonial.id,
            name: testimonial.name,
            role: testimonial.role || '',
            content: testimonial.content,
            rating: testimonial.rating || 5,
            avatarUrl: testimonial.avatar_url || ''
          }));
          setTestimonialsList(formattedTestimonials);
        }

        // Fetch features
        const { data: featuresData } = await contentService.getFeatures();
        if (featuresData) {
          const formattedFeatures = featuresData.map(feature => ({
            title: feature.title,
            description: feature.description,
            icon: feature.icon
          }));
          setFeaturesList(formattedFeatures);
        }

        // Fetch benefits
        const { data: benefitsData } = await contentService.getBenefits();
        if (benefitsData) {
          const formattedBenefits = benefitsData.map(benefit => ({
            title: benefit.title,
            description: benefit.description,
            color: benefit.color
          }));
          setBenefitsList(formattedBenefits);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter courses by category
  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 px-4 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge variant="outline" className="mb-4 py-1.5 px-4 border-purple-300 bg-purple-100/50 text-purple-800 dark:border-purple-600 dark:bg-purple-900/20 dark:text-purple-300">
                Transform Your Skills with EduMaster
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 heading-gradient">
                Learn Without <br /> Limits
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                Discover expert-led courses in development, business, design, and more. Start your learning journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-400 hover:opacity-90 text-white">
                  Explore Courses
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Play className="h-4 w-4" />
                  Watch Demo
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-8 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-900 flex items-center justify-center overflow-hidden"
                      >
                        <img
                          src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`}
                          alt="User"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-medium">Join 50,000+ learners</span>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm font-medium ml-1">4.8/5 rating</span>
                </div>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-full h-full rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 transform rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="Students learning"
                  className="relative rounded-2xl shadow-xl object-cover w-full z-10 h-[350px] sm:h-[400px]"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 sm:right-12 glass-card p-4 shadow-xl z-20 rounded-xl w-60">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                    24
                  </div>
                  <div>
                    <p className="text-sm font-medium">New courses</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <Badge variant="outline" className="mb-2">Featured Courses</Badge>
              <h2 className="text-3xl font-bold font-heading heading-gradient">Popular Right Now</h2>
            </div>
            <Link to="/courses">
              <Button variant="link" className="mt-2 md:mt-0">
                View All Courses →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} featured={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2">Explore by Category</Badge>
            <h2 className="text-3xl font-bold font-heading heading-gradient mb-4">Find Your Perfect Course</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our comprehensive selection of courses across various disciplines to enhance your skills and advance your career.
            </p>
          </div>

          <CategoryFilter
            categories={categoriesList}
            selectedCategory={selectedCategory}
            onChange={setSelectedCategory}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {filteredCourses.slice(0, 8).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses">
              <Button variant="outline" size="lg">
                Browse All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2">Why Choose Us</Badge>
            <h2 className="text-3xl font-bold font-heading heading-gradient mb-4">The EduMaster Difference</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover what makes our platform the preferred choice for learners worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-6 flex flex-col items-center text-center animate-slide-up">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 mb-4">
                <User className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Expert Instructors</h3>
              <p className="text-muted-foreground">Learn from industry professionals with years of experience</p>
            </div>

            <div className="glass-card p-6 flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 mb-4">
                <Book className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Interactive Learning</h3>
              <p className="text-muted-foreground">Engage with quizzes, projects, and hands-on assignments</p>
            </div>

            <div className="glass-card p-6 flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 mb-4">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Flexible Scheduling</h3>
              <p className="text-muted-foreground">Learn at your own pace with lifetime access to courses</p>
            </div>

            <div className="glass-card p-6 flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300 mb-4">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Certificate of Completion</h3>
              <p className="text-muted-foreground">Earn certificates to showcase your new skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-2">Your Path to Success</Badge>
              <h2 className="text-3xl font-bold font-heading heading-gradient mb-4">Transform Your Career with In-Demand Skills</h2>
              <p className="text-muted-foreground mb-8">
                Our comprehensive curriculum, real-world projects, and career support will help you achieve your professional goals.
              </p>

              <div className="space-y-6">
                {isLoading ? (
                  <div className="text-center py-6">
                    <p>Loading benefits...</p>
                  </div>
                ) : benefitsList.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className={`h-10 w-10 rounded-full flex-shrink-0 ${benefit.color} flex items-center justify-center text-white`}>
                      <span>{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="mt-8 bg-gradient-to-r from-purple-600 to-purple-400 hover:opacity-90">
                Start Learning Now
              </Button>
            </div>

            <div className="relative">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-full h-full rounded-2xl bg-gradient-to-r from-blue-400 to-teal-400 transform -rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="Career growth"
                  className="relative rounded-2xl shadow-xl object-cover w-full z-10"
                />
              </div>

              <div className="absolute top-1/2 left-0 transform -translate-x-1/4 -translate-y-1/2 glass-card p-4 rounded-xl w-64 hidden md:block">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold">
                    +
                  </div>
                  <div>
                    <p className="text-sm font-medium">Average Salary Increase</p>
                    <p className="text-xl font-bold">38%</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 right-0 transform translate-x-1/4 glass-card p-4 rounded-xl w-48 hidden md:block">
                <p className="text-sm font-medium mb-2">Job Placement Rate</p>
                <div className="flex items-center gap-2">
                  <div className="text-xl font-bold">92%</div>
                  <div className="h-1.5 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2">Student Success Stories</Badge>
            <h2 className="text-3xl font-bold font-heading heading-gradient mb-4">What Our Students Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from our students who have transformed their careers with our courses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-3 text-center py-12">
                <p>Loading testimonials...</p>
              </div>
            ) : testimonialsList.length > 0 ? (
              testimonialsList.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p>No testimonials available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <NewsletterSignup />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
