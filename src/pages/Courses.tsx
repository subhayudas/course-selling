
import { useState, useEffect } from 'react';
import { CourseCard } from "@/components/CourseCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { coursesData, categories } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { courseService } from '@/integrations/supabase/courseService';
import { categoryService } from '@/integrations/supabase/categoryService';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [allCourses, setAllCourses] = useState([]);
  const [categoriesList, setCategoriesList] = useState(categories);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch courses and categories from Supabase
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
          setAllCourses(formattedCourses);
          setFilteredCourses(formattedCourses);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort courses
  useEffect(() => {
    if (allCourses.length === 0) return;

    // Filter courses based on search query and category
    let filtered = [...allCourses];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(lowercaseQuery) ||
        course.description.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Sort courses
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.studentsCount - a.studentsCount);
        break;
      case 'newest':
        // Sort by created_at if available, otherwise by ID
        filtered.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
  }, [selectedCategory, searchQuery, sortBy, allCourses]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header Section */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12 px-4 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-900">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-2">Course Library</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-heading heading-gradient mb-4">
            Browse Our Course Catalog
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive selection of courses designed to help you develop in-demand skills for today's job market.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 px-4 border-b">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-4">
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CategoryFilter
                categories={categoriesList}
                selectedCategory={selectedCategory}
                onChange={setSelectedCategory}
              />

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                <Select
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="py-12 px-4 flex-grow">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2">Loading courses...</h3>
              <p className="text-muted-foreground">
                Please wait while we fetch the courses.
              </p>
            </div>
          ) : filteredCourses.length > 0 ? (
            <>
              <div className="mb-6 text-sm text-muted-foreground">
                Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or browse a different category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
