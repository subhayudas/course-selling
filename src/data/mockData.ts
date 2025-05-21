
import { CourseData } from '@/components/CourseCard';
import { Testimonial } from '@/components/TestimonialCard';

// Mock course data
export const coursesData: CourseData[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js and more.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    instructor: 'John Doe',
    price: 99.99,
    originalPrice: 199.99,
    rating: 4.8,
    studentsCount: 12543,
    category: 'Development',
    level: 'Beginner',
    duration: '36 hours',
    bestseller: true
  },
  {
    id: '2',
    title: 'Data Science and Machine Learning Fundamentals',
    description: 'Master the essential skills for data science and machine learning with Python.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    instructor: 'Sarah Johnson',
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.7,
    studentsCount: 9876,
    category: 'Data Science',
    level: 'Intermediate',
    duration: '28 hours',
    featured: true
  },
  {
    id: '3',
    title: 'Digital Marketing Masterclass',
    description: 'Complete guide to digital marketing: SEO, social media, email marketing, and more.',
    imageUrl: 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    instructor: 'Michael Williams',
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.5,
    studentsCount: 7654,
    category: 'Marketing',
    level: 'All Levels',
    duration: '24 hours'
  },
  {
    id: '4',
    title: 'UI/UX Design Principles',
    description: 'Learn the principles of user interface and user experience design for digital products.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    instructor: 'Emily Chen',
    price: 69.99,
    originalPrice: 119.99,
    rating: 4.9,
    studentsCount: 5432,
    category: 'Design',
    level: 'Beginner',
    duration: '20 hours',
    bestseller: true
  },
  {
    id: '5',
    title: 'Business Strategy and Management',
    description: 'Comprehensive course on business strategy, management, and leadership principles.',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    instructor: 'Robert Brown',
    price: 129.99,
    originalPrice: 199.99,
    rating: 4.6,
    studentsCount: 4321,
    category: 'Business',
    level: 'Intermediate',
    duration: '32 hours'
  },
  {
    id: '6',
    title: 'Mobile App Development with Flutter',
    description: 'Create beautiful native apps for iOS and Android with Flutter framework.',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    instructor: 'David Kim',
    price: 109.99,
    originalPrice: 179.99,
    rating: 4.8,
    studentsCount: 7890,
    category: 'Development',
    level: 'Intermediate',
    duration: '30 hours'
  },
  {
    id: '7',
    title: 'Photography Fundamentals',
    description: 'Master the basics of photography, including composition, lighting, and editing.',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    instructor: 'Jessica Lee',
    price: 59.99,
    originalPrice: 99.99,
    rating: 4.7,
    studentsCount: 6543,
    category: 'Photography',
    level: 'Beginner',
    duration: '18 hours'
  },
  {
    id: '8',
    title: 'Artificial Intelligence: Deep Learning',
    description: 'Advanced course on deep learning algorithms and neural networks.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    instructor: 'Alex Thompson',
    price: 149.99,
    originalPrice: 229.99,
    rating: 4.9,
    studentsCount: 3456,
    category: 'Data Science',
    level: 'Advanced',
    duration: '40 hours',
    featured: true
  }
];

// Mock testimonials
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Miller',
    role: 'Frontend Developer',
    content: 'The web development course transformed my career. I went from knowing nothing about coding to landing a job as a frontend developer within 6 months.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '2',
    name: 'James Wilson',
    role: 'Marketing Specialist',
    content: "The digital marketing masterclass provided practical, actionable strategies that I was able to implement immediately. My company's online presence has improved dramatically.",
    rating: 4,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '3',
    name: 'Jennifer Chen',
    role: 'UX Designer',
    content: 'As someone transitioning careers, the UI/UX design course gave me the perfect foundation. The instructors were knowledgeable and the projects were relevant to real-world applications.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  }
];

// Mock categories
export const categories = [
  'Development',
  'Data Science',
  'Business',
  'Design',
  'Marketing',
  'Photography',
  'Music',
  'Health & Fitness'
];

// Mock features for the homepage
export const features = [
  {
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with years of experience',
    icon: 'user'
  },
  {
    title: 'Interactive Learning',
    description: 'Engage with quizzes, projects, and hands-on assignments',
    icon: 'graduation-cap'
  },
  {
    title: 'Flexible Scheduling',
    description: 'Learn at your own pace with lifetime access to courses',
    icon: 'clock'
  },
  {
    title: 'Certificate of Completion',
    description: 'Earn certificates to showcase your new skills',
    icon: 'file-text'
  }
];

// Mock benefits for the homepage
export const benefits = [
  {
    title: 'Comprehensive Curriculum',
    description: 'Our courses cover everything from fundamental concepts to advanced techniques',
    color: 'bg-gradient-to-r from-purple-400 to-pink-400'
  },
  {
    title: 'Real-World Projects',
    description: 'Build a portfolio of projects that demonstrate your skills to employers',
    color: 'bg-gradient-to-r from-blue-400 to-teal-400'
  },
  {
    title: 'Career Support',
    description: 'Get guidance on job searching, resume building, and interview preparation',
    color: 'bg-gradient-to-r from-amber-400 to-orange-400'
  }
];

// Mock course curriculum for course detail pages
export const mockCurriculum = [
  {
    id: '1',
    title: 'Getting Started',
    lessons: [
      { id: '1-1', title: 'Course Introduction', duration: '5 mins', free: true },
      { id: '1-2', title: 'Setting Up Your Development Environment', duration: '15 mins', free: true },
      { id: '1-3', title: 'Understanding the Basics', duration: '20 mins', free: false }
    ]
  },
  {
    id: '2',
    title: 'Core Concepts',
    lessons: [
      { id: '2-1', title: 'Fundamental Principles', duration: '25 mins', free: false },
      { id: '2-2', title: 'Building Your First Project', duration: '40 mins', free: false },
      { id: '2-3', title: 'Common Patterns and Practices', duration: '35 mins', free: false },
      { id: '2-4', title: 'Advanced Techniques', duration: '45 mins', free: false }
    ]
  },
  {
    id: '3',
    title: 'Real-World Applications',
    lessons: [
      { id: '3-1', title: 'Case Study: Industry Example', duration: '30 mins', free: false },
      { id: '3-2', title: 'Building a Complete Project', duration: '60 mins', free: false },
      { id: '3-3', title: 'Optimization and Best Practices', duration: '25 mins', free: false }
    ]
  },
  {
    id: '4',
    title: 'Next Steps',
    lessons: [
      { id: '4-1', title: 'Career Opportunities', duration: '20 mins', free: false },
      { id: '4-2', title: 'Further Learning Resources', duration: '15 mins', free: false },
      { id: '4-3', title: 'Course Conclusion', duration: '10 mins', free: false }
    ]
  }
];
