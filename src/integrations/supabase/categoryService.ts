import { supabase } from './client';
import { Tables, TablesInsert, TablesUpdate } from './types';

export type Category = Tables<'categories'>;
export type CategoryInsert = TablesInsert<'categories'>;
export type CategoryUpdate = TablesUpdate<'categories'>;

export const categoryService = {
  /**
   * Get all categories
   */
  async getCategories(): Promise<{ data: Category[] | null; error: any }> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });
    
    return { data, error };
  },

  /**
   * Get a category by ID
   */
  async getCategory(categoryId: string): Promise<{ data: Category | null; error: any }> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', categoryId)
      .single();
    
    return { data, error };
  },

  /**
   * Create a new category
   */
  async createCategory(category: CategoryInsert): Promise<{ data: Category | null; error: any }> {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Update a category
   */
  async updateCategory(categoryId: string, updates: CategoryUpdate): Promise<{ data: Category | null; error: any }> {
    const { data, error } = await supabase
      .from('categories')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', categoryId)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Delete a category
   */
  async deleteCategory(categoryId: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId);
    
    return { error };
  },
};
