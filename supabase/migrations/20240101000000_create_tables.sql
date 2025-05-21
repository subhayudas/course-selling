-- Create tables for the course selling website

-- Profiles table (already exists in the schema)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read any profile
CREATE POLICY "Anyone can view profiles" ON profiles
  FOR SELECT USING (true);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policy to allow users to insert their own profile
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read categories
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);

-- Create policy to allow only authenticated users with admin role to insert/update/delete categories
CREATE POLICY "Only admins can modify categories" ON categories
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Courses table (extend the existing schema to match the CourseData interface)
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  instructor_id UUID REFERENCES profiles(id),
  instructor_name TEXT,
  price DECIMAL(10, 2),
  original_price DECIMAL(10, 2),
  rating DECIMAL(3, 2),
  students_count INTEGER DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'All Levels')),
  duration TEXT,
  bestseller BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for courses
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read courses
CREATE POLICY "Anyone can view courses" ON courses
  FOR SELECT USING (true);

-- Create policy to allow only authenticated users with admin or instructor role to insert/update courses
CREATE POLICY "Only admins and instructors can modify courses" ON courses
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR 
    (auth.jwt() ->> 'role' = 'instructor' AND instructor_id = auth.uid())
  );

-- Course sections table (for curriculum)
CREATE TABLE IF NOT EXISTS course_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for course_sections
ALTER TABLE course_sections ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read course_sections
CREATE POLICY "Anyone can view course sections" ON course_sections
  FOR SELECT USING (true);

-- Create policy to allow only authenticated users with admin or instructor role to modify course_sections
CREATE POLICY "Only admins and instructors can modify course sections" ON course_sections
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR 
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = course_sections.course_id 
      AND courses.instructor_id = auth.uid()
    )
  );

-- Course lessons table
CREATE TABLE IF NOT EXISTS course_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES course_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration TEXT,
  is_free BOOLEAN DEFAULT FALSE,
  order_index INTEGER NOT NULL,
  video_url TEXT,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for course_lessons
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read course_lessons
CREATE POLICY "Anyone can view course lessons" ON course_lessons
  FOR SELECT USING (true);

-- Create policy to allow only authenticated users with admin or instructor role to modify course_lessons
CREATE POLICY "Only admins and instructors can modify course lessons" ON course_lessons
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR 
    EXISTS (
      SELECT 1 FROM course_sections 
      JOIN courses ON course_sections.course_id = courses.id
      WHERE course_sections.id = course_lessons.section_id 
      AND courses.instructor_id = auth.uid()
    )
  );

-- Purchases table (already exists in the schema)
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for purchases
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own purchases
CREATE POLICY "Users can view their own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow admins to read all purchases
CREATE POLICY "Admins can view all purchases" ON purchases
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- Create policy to allow users to insert their own purchases
CREATE POLICY "Users can insert their own purchases" ON purchases
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  course_id UUID REFERENCES courses(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read testimonials
CREATE POLICY "Anyone can view testimonials" ON testimonials
  FOR SELECT USING (true);

-- Create policy to allow only authenticated users with admin role to modify testimonials
CREATE POLICY "Only admins can modify testimonials" ON testimonials
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Features table (for homepage)
CREATE TABLE IF NOT EXISTS features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for features
ALTER TABLE features ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read features
CREATE POLICY "Anyone can view features" ON features
  FOR SELECT USING (true);

-- Create policy to allow only authenticated users with admin role to modify features
CREATE POLICY "Only admins can modify features" ON features
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Benefits table (for homepage)
CREATE TABLE IF NOT EXISTS benefits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for benefits
ALTER TABLE benefits ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read benefits
CREATE POLICY "Anyone can view benefits" ON benefits
  FOR SELECT USING (true);

-- Create policy to allow only authenticated users with admin role to modify benefits
CREATE POLICY "Only admins can modify benefits" ON benefits
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
