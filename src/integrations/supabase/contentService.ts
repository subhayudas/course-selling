import { supabase } from './client';
import { Tables, TablesInsert, TablesUpdate } from './types';

export type Feature = Tables<'features'>;
export type FeatureInsert = TablesInsert<'features'>;
export type FeatureUpdate = TablesUpdate<'features'>;

export type Benefit = Tables<'benefits'>;
export type BenefitInsert = TablesInsert<'benefits'>;
export type BenefitUpdate = TablesUpdate<'benefits'>;

export const contentService = {
  /**
   * Get all features
   */
  async getFeatures(): Promise<{ data: Feature[] | null; error: any }> {
    const { data, error } = await supabase
      .from('features')
      .select('*')
      .order('created_at', { ascending: true });
    
    return { data, error };
  },

  /**
   * Get a feature by ID
   */
  async getFeature(featureId: string): Promise<{ data: Feature | null; error: any }> {
    const { data, error } = await supabase
      .from('features')
      .select('*')
      .eq('id', featureId)
      .single();
    
    return { data, error };
  },

  /**
   * Create a new feature
   */
  async createFeature(feature: FeatureInsert): Promise<{ data: Feature | null; error: any }> {
    const { data, error } = await supabase
      .from('features')
      .insert(feature)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Update a feature
   */
  async updateFeature(featureId: string, updates: FeatureUpdate): Promise<{ data: Feature | null; error: any }> {
    const { data, error } = await supabase
      .from('features')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', featureId)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Delete a feature
   */
  async deleteFeature(featureId: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('features')
      .delete()
      .eq('id', featureId);
    
    return { error };
  },

  /**
   * Get all benefits
   */
  async getBenefits(): Promise<{ data: Benefit[] | null; error: any }> {
    const { data, error } = await supabase
      .from('benefits')
      .select('*')
      .order('created_at', { ascending: true });
    
    return { data, error };
  },

  /**
   * Get a benefit by ID
   */
  async getBenefit(benefitId: string): Promise<{ data: Benefit | null; error: any }> {
    const { data, error } = await supabase
      .from('benefits')
      .select('*')
      .eq('id', benefitId)
      .single();
    
    return { data, error };
  },

  /**
   * Create a new benefit
   */
  async createBenefit(benefit: BenefitInsert): Promise<{ data: Benefit | null; error: any }> {
    const { data, error } = await supabase
      .from('benefits')
      .insert(benefit)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Update a benefit
   */
  async updateBenefit(benefitId: string, updates: BenefitUpdate): Promise<{ data: Benefit | null; error: any }> {
    const { data, error } = await supabase
      .from('benefits')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', benefitId)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Delete a benefit
   */
  async deleteBenefit(benefitId: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('benefits')
      .delete()
      .eq('id', benefitId);
    
    return { error };
  },
};
