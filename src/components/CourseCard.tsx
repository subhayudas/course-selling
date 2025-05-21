
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export interface CourseData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: string;
  instructorAvatar?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  studentsCount: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  featured?: boolean;
  bestseller?: boolean;
}

interface CourseCardProps {
  course: CourseData;
  featured?: boolean;
}

export function CourseCard({ course, featured = false }: CourseCardProps) {
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${featured ? 'glass-card' : ''}`}>
        <div className="relative">
          <img 
            src={course.imageUrl} 
            alt={course.title}
            className="h-48 w-full object-cover"
          />
          {course.bestseller && (
            <Badge className="absolute top-2 left-2 bg-amber-500 text-white">
              Bestseller
            </Badge>
          )}
          {course.featured && (
            <Badge className="absolute top-2 left-2 bg-purple-600 text-white">
              Featured
            </Badge>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <Badge variant="outline" className="bg-white/20 text-white border-white/40">
              {course.category}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-bold text-lg line-clamp-2">{course.title}</h3>
          
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <span>{course.level}</span>
            <span>•</span>
            <span>{course.duration}</span>
          </div>
          
          <div className="flex items-center mt-2">
            {course.instructorAvatar ? (
              <img 
                src={course.instructorAvatar} 
                alt={course.instructor}
                className="h-6 w-6 rounded-full mr-2"
              />
            ) : (
              <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-xs font-medium text-purple-700 dark:text-purple-300 mr-2">
                {course.instructor.charAt(0)}
              </div>
            )}
            <span className="text-sm">{course.instructor}</span>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.round(course.rating) ? 'text-amber-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs ml-1">({course.studentsCount})</span>
            </div>
            
            <div>
              {course.originalPrice && (
                <span className="text-xs line-through text-muted-foreground mr-1">
                  ${course.originalPrice}
                </span>
              )}
              <span className="font-bold text-base">${course.price}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
