import { supabase } from './client';
import { Tables, TablesInsert, TablesUpdate } from './types';

export type Testimonial = Tables<'testimonials'>;
export type TestimonialInsert = TablesInsert<'testimonials'>;
export type TestimonialUpdate = TablesUpdate<'testimonials'>;

export const testimonialService = {
  /**
   * Get all testimonials
   */
  async getTestimonials(): Promise<{ data: Testimonial[] | null; error: any }> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  /**
   * Get testimonials for a specific course
   */
  async getTestimonialsByCourse(courseId: string): Promise<{ data: Testimonial[] | null; error: any }> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('course_id', courseId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  /**
   * Get a testimonial by ID
   */
  async getTestimonial(testimonialId: string): Promise<{ data: Testimonial | null; error: any }> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', testimonialId)
      .single();
    
    return { data, error };
  },

  /**
   * Create a new testimonial
   */
  async createTestimonial(testimonial: TestimonialInsert): Promise<{ data: Testimonial | null; error: any }> {
    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonial)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Update a testimonial
   */
  async updateTestimonial(testimonialId: string, updates: TestimonialUpdate): Promise<{ data: Testimonial | null; error: any }> {
    const { data, error } = await supabase
      .from('testimonials')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', testimonialId)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Delete a testimonial
   */
  async deleteTestimonial(testimonialId: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', testimonialId);
    
    return { error };
  },

  /**
   * Upload a testimonial avatar
   */
  async uploadAvatar(file: File): Promise<{ path: string | null; error: any }> {
    const fileExt = file.name.split('.').pop();
    const filePath = `testimonials/${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error } = await supabase.storage
      .from('testimonials')
      .upload(filePath, file);

    if (error) {
      return { path: null, error };
    }

    const { data } = supabase.storage.from('testimonials').getPublicUrl(filePath);
    return { path: data.publicUrl, error: null };
  },
};
