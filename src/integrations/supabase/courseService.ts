import { supabase } from './client';
import { Tables, TablesInsert, TablesUpdate } from './types';

export type Course = Tables<'courses'>;
export type CourseInsert = TablesInsert<'courses'>;
export type CourseUpdate = TablesUpdate<'courses'>;

export type CourseSection = Tables<'course_sections'>;
export type CourseSectionInsert = TablesInsert<'course_sections'>;
export type CourseSectionUpdate = TablesUpdate<'course_sections'>;

export type CourseLesson = Tables<'course_lessons'>;
export type CourseLessonInsert = TablesInsert<'course_lessons'>;
export type CourseLessonUpdate = TablesUpdate<'course_lessons'>;

export const courseService = {
  /**
   * Get all courses
   */
  async getCourses(): Promise<{ data: Course[] | null; error: any }> {
    const { data, error } = await supabase
      .from('courses')
      .select('*, categories(name)')
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  /**
   * Get featured courses
   */
  async getFeaturedCourses(limit = 4): Promise<{ data: Course[] | null; error: any }> {
    const { data, error } = await supabase
      .from('courses')
      .select('*, categories(name)')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    return { data, error };
  },

  /**
   * Get bestseller courses
   */
  async getBestsellerCourses(limit = 4): Promise<{ data: Course[] | null; error: any }> {
    const { data, error } = await supabase
      .from('courses')
      .select('*, categories(name)')
      .eq('bestseller', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    return { data, error };
  },

  /**
   * Get courses by category
   */
  async getCoursesByCategory(categoryId: string): Promise<{ data: Course[] | null; error: any }> {
    const { data, error } = await supabase
      .from('courses')
      .select('*, categories(name)')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  /**
   * Get a course by ID
   */
  async getCourse(courseId: string): Promise<{ data: Course | null; error: any }> {
    const { data, error } = await supabase
      .from('courses')
      .select('*, categories(name)')
      .eq('id', courseId)
      .single();
    
    return { data, error };
  },

  /**
   * Create a new course
   */
  async createCourse(course: CourseInsert): Promise<{ data: Course | null; error: any }> {
    const { data, error } = await supabase
      .from('courses')
      .insert(course)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Update a course
   */
  async updateCourse(courseId: string, updates: CourseUpdate): Promise<{ data: Course | null; error: any }> {
    const { data, error } = await supabase
      .from('courses')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', courseId)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Delete a course
   */
  async deleteCourse(courseId: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId);
    
    return { error };
  },

  /**
   * Get course sections
   */
  async getCourseSections(courseId: string): Promise<{ data: CourseSection[] | null; error: any }> {
    const { data, error } = await supabase
      .from('course_sections')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index', { ascending: true });
    
    return { data, error };
  },

  /**
   * Get course section with lessons
   */
  async getCourseSectionsWithLessons(courseId: string): Promise<{ data: any[] | null; error: any }> {
    const { data: sections, error: sectionsError } = await supabase
      .from('course_sections')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index', { ascending: true });
    
    if (sectionsError || !sections) {
      return { data: null, error: sectionsError };
    }

    const sectionsWithLessons = await Promise.all(
      sections.map(async (section) => {
        const { data: lessons, error: lessonsError } = await supabase
          .from('course_lessons')
          .select('*')
          .eq('section_id', section.id)
          .order('order_index', { ascending: true });
        
        if (lessonsError) {
          console.error('Error fetching lessons:', lessonsError);
          return { ...section, lessons: [] };
        }
        
        return { ...section, lessons: lessons || [] };
      })
    );
    
    return { data: sectionsWithLessons, error: null };
  },

  /**
   * Create a course section
   */
  async createCourseSection(section: CourseSectionInsert): Promise<{ data: CourseSection | null; error: any }> {
    const { data, error } = await supabase
      .from('course_sections')
      .insert(section)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Update a course section
   */
  async updateCourseSection(sectionId: string, updates: CourseSectionUpdate): Promise<{ data: CourseSection | null; error: any }> {
    const { data, error } = await supabase
      .from('course_sections')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sectionId)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Delete a course section
   */
  async deleteCourseSection(sectionId: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('course_sections')
      .delete()
      .eq('id', sectionId);
    
    return { error };
  },

  /**
   * Get course lessons
   */
  async getCourseLessons(sectionId: string): Promise<{ data: CourseLesson[] | null; error: any }> {
    const { data, error } = await supabase
      .from('course_lessons')
      .select('*')
      .eq('section_id', sectionId)
      .order('order_index', { ascending: true });
    
    return { data, error };
  },

  /**
   * Create a course lesson
   */
  async createCourseLesson(lesson: CourseLessonInsert): Promise<{ data: CourseLesson | null; error: any }> {
    const { data, error } = await supabase
      .from('course_lessons')
      .insert(lesson)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Update a course lesson
   */
  async updateCourseLesson(lessonId: string, updates: CourseLessonUpdate): Promise<{ data: CourseLesson | null; error: any }> {
    const { data, error } = await supabase
      .from('course_lessons')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', lessonId)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Delete a course lesson
   */
  async deleteCourseLesson(lessonId: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('course_lessons')
      .delete()
      .eq('id', lessonId);
    
    return { error };
  },

  /**
   * Upload a course image
   */
  async uploadCourseImage(courseId: string, file: File): Promise<{ path: string | null; error: any }> {
    const fileExt = file.name.split('.').pop();
    const filePath = `courses/${courseId}/${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error } = await supabase.storage
      .from('courses')
      .upload(filePath, file);

    if (error) {
      return { path: null, error };
    }

    const { data } = supabase.storage.from('courses').getPublicUrl(filePath);
    return { path: data.publicUrl, error: null };
  },
};
