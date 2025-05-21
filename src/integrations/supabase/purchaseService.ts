import { supabase } from './client';
import { Tables, TablesInsert, TablesUpdate } from './types';

export type Purchase = Tables<'purchases'>;
export type PurchaseInsert = TablesInsert<'purchases'>;
export type PurchaseUpdate = TablesUpdate<'purchases'>;

export const purchaseService = {
  /**
   * Get all purchases for a user
   */
  async getUserPurchases(userId: string): Promise<{ data: Purchase[] | null; error: any }> {
    const { data, error } = await supabase
      .from('purchases')
      .select('*, courses(*)')
      .eq('user_id', userId)
      .order('purchase_date', { ascending: false });
    
    return { data, error };
  },

  /**
   * Check if a user has purchased a course
   */
  async hasUserPurchasedCourse(userId: string, courseId: string): Promise<{ purchased: boolean; error: any }> {
    const { data, error } = await supabase
      .from('purchases')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .eq('status', 'completed')
      .maybeSingle();
    
    return { purchased: !!data, error };
  },

  /**
   * Get a purchase by ID
   */
  async getPurchase(purchaseId: string): Promise<{ data: Purchase | null; error: any }> {
    const { data, error } = await supabase
      .from('purchases')
      .select('*, courses(*)')
      .eq('id', purchaseId)
      .single();
    
    return { data, error };
  },

  /**
   * Create a new purchase
   */
  async createPurchase(purchase: PurchaseInsert): Promise<{ data: Purchase | null; error: any }> {
    const { data, error } = await supabase
      .from('purchases')
      .insert(purchase)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Update a purchase
   */
  async updatePurchase(purchaseId: string, updates: PurchaseUpdate): Promise<{ data: Purchase | null; error: any }> {
    const { data, error } = await supabase
      .from('purchases')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', purchaseId)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Get all purchases for a course
   */
  async getCoursePurchases(courseId: string): Promise<{ data: Purchase[] | null; error: any }> {
    const { data, error } = await supabase
      .from('purchases')
      .select('*, profiles(*)')
      .eq('course_id', courseId)
      .order('purchase_date', { ascending: false });
    
    return { data, error };
  },

  /**
   * Get purchase statistics
   */
  async getPurchaseStats(): Promise<{ data: any | null; error: any }> {
    const { data: totalPurchases, error: totalError } = await supabase
      .from('purchases')
      .select('id', { count: 'exact' });
    
    if (totalError) {
      return { data: null, error: totalError };
    }

    const { data: totalRevenue, error: revenueError } = await supabase
      .from('purchases')
      .select('amount')
      .eq('status', 'completed');
    
    if (revenueError) {
      return { data: null, error: revenueError };
    }

    const revenue = totalRevenue.reduce((sum, purchase) => sum + purchase.amount, 0);

    return { 
      data: {
        totalPurchases: totalPurchases.length,
        totalRevenue: revenue
      }, 
      error: null 
    };
  },
};
