
import { Card, CardContent } from "@/components/ui/card";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  content: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="glass-card transition-all duration-300 hover:shadow-lg h-full">
      <CardContent className="p-6">
        {/* Rating */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={`h-5 w-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        
        {/* Content */}
        <p className="text-foreground/80 mb-6 italic">"{testimonial.content}"</p>
        
        {/* User */}
        <div className="flex items-center">
          {testimonial.avatarUrl ? (
            <img 
              src={testimonial.avatarUrl} 
              alt={testimonial.name}
              className="h-10 w-10 rounded-full mr-3 object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-sm font-medium text-purple-700 dark:text-purple-300 mr-3">
              {testimonial.name.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
