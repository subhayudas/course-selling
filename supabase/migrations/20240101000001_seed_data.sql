-- Seed data for the course selling website

-- Insert categories
INSERT INTO categories (name) VALUES
  ('Development'),
  ('Data Science'),
  ('Business'),
  ('Design'),
  ('Marketing'),
  ('Photography'),
  ('Music'),
  ('Health & Fitness');

-- Insert courses
INSERT INTO courses (
  title, 
  description, 
  image_url, 
  instructor_name, 
  price, 
  original_price, 
  rating, 
  students_count, 
  category_id, 
  level, 
  duration, 
  bestseller
) VALUES (
  'Complete Web Development Bootcamp',
  'Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js and more.',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'John Doe',
  99.99,
  199.99,
  4.8,
  12543,
  (SELECT id FROM categories WHERE name = 'Development'),
  'Beginner',
  '36 hours',
  TRUE
);

INSERT INTO courses (
  title, 
  description, 
  image_url, 
  instructor_name, 
  price, 
  original_price, 
  rating, 
  students_count, 
  category_id, 
  level, 
  duration, 
  featured
) VALUES (
  'Data Science and Machine Learning Bootcamp',
  'Master Data Science, Machine Learning, and Neural Networks with Python, R, and Tensorflow.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'Jane Smith',
  129.99,
  199.99,
  4.9,
  8765,
  (SELECT id FROM categories WHERE name = 'Data Science'),
  'Intermediate',
  '42 hours',
  TRUE
);

INSERT INTO courses (
  title, 
  description, 
  image_url, 
  instructor_name, 
  price, 
  original_price, 
  rating, 
  students_count, 
  category_id, 
  level, 
  duration
) VALUES (
  'UI/UX Design Masterclass',
  'Learn UI/UX design from scratch. Create beautiful user interfaces and experiences.',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'Michael Johnson',
  89.99,
  149.99,
  4.7,
  5432,
  (SELECT id FROM categories WHERE name = 'Design'),
  'All Levels',
  '28 hours'
);

INSERT INTO courses (
  title, 
  description, 
  image_url, 
  instructor_name, 
  price, 
  original_price, 
  rating, 
  students_count, 
  category_id, 
  level, 
  duration
) VALUES (
  'Digital Marketing Fundamentals',
  'Learn digital marketing strategies including SEO, social media, email marketing, and more.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'Emily Chen',
  79.99,
  129.99,
  4.6,
  3210,
  (SELECT id FROM categories WHERE name = 'Marketing'),
  'Beginner',
  '24 hours'
);

-- Insert course sections and lessons for the first course
INSERT INTO course_sections (course_id, title, order_index) VALUES
  ((SELECT id FROM courses WHERE title = 'Complete Web Development Bootcamp'), 'Getting Started', 1);

INSERT INTO course_lessons (
  section_id, 
  title, 
  duration, 
  is_free, 
  order_index
) VALUES
  ((SELECT id FROM course_sections WHERE title = 'Getting Started'), 'Course Introduction', '5 mins', TRUE, 1),
  ((SELECT id FROM course_sections WHERE title = 'Getting Started'), 'Setting Up Your Development Environment', '15 mins', TRUE, 2),
  ((SELECT id FROM course_sections WHERE title = 'Getting Started'), 'Understanding the Basics', '20 mins', FALSE, 3);

INSERT INTO course_sections (course_id, title, order_index) VALUES
  ((SELECT id FROM courses WHERE title = 'Complete Web Development Bootcamp'), 'HTML Fundamentals', 2);

INSERT INTO course_lessons (
  section_id, 
  title, 
  duration, 
  is_free, 
  order_index
) VALUES
  ((SELECT id FROM course_sections WHERE title = 'HTML Fundamentals'), 'Introduction to HTML', '25 mins', FALSE, 1),
  ((SELECT id FROM course_sections WHERE title = 'HTML Fundamentals'), 'HTML Document Structure', '30 mins', FALSE, 2),
  ((SELECT id FROM course_sections WHERE title = 'HTML Fundamentals'), 'Working with Text and Links', '35 mins', FALSE, 3),
  ((SELECT id FROM course_sections WHERE title = 'HTML Fundamentals'), 'HTML Forms and Input Elements', '40 mins', FALSE, 4);

-- Insert testimonials
INSERT INTO testimonials (name, role, content, rating, avatar_url) VALUES
  ('Sarah Miller', 'Frontend Developer', 'The web development course transformed my career. I went from knowing nothing about coding to landing a job as a frontend developer within 6 months.', 5, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'),
  ('David Rodriguez', 'Software Engineer', 'The data science bootcamp was exactly what I needed to transition into AI and machine learning. The projects were challenging and relevant to real-world problems.', 4, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'),
  ('Jennifer Chen', 'UX Designer', 'As someone transitioning careers, the UI/UX design course gave me the perfect foundation. The instructors were knowledgeable and the projects were relevant to real-world applications.', 5, 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80');

-- Insert features
INSERT INTO features (title, description, icon) VALUES
  ('Expert Instructors', 'Learn from industry professionals with years of experience', 'user'),
  ('Interactive Learning', 'Engage with quizzes, projects, and hands-on assignments', 'graduation-cap'),
  ('Flexible Scheduling', 'Learn at your own pace with lifetime access to courses', 'clock'),
  ('Certificate of Completion', 'Earn certificates to showcase your new skills', 'file-text');

-- Insert benefits
INSERT INTO benefits (title, description, color) VALUES
  ('Comprehensive Curriculum', 'Our courses cover everything from fundamental concepts to advanced techniques', 'bg-gradient-to-r from-purple-400 to-pink-400'),
  ('Real-World Projects', 'Build a portfolio of projects that demonstrate your skills to employers', 'bg-gradient-to-r from-blue-400 to-teal-400'),
  ('Career Support', 'Get guidance on job searching, resume building, and interview preparation', 'bg-gradient-to-r from-amber-400 to-orange-400');
