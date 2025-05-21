import { supabase } from './client';
import { Tables, TablesInsert, TablesUpdate } from './types';

export type Profile = Tables<'profiles'>;
export type ProfileInsert = TablesInsert<'profiles'>;
export type ProfileUpdate = TablesUpdate<'profiles'>;

export const profileService = {
  /**
   * Get a user's profile by ID
   */
  async getProfile(userId: string): Promise<{ data: Profile | null; error: any }> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    return { data, error };
  },

  /**
   * Create a new profile
   */
  async createProfile(profile: ProfileInsert): Promise<{ data: Profile | null; error: any }> {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Update a user's profile
   */
  async updateProfile(userId: string, updates: ProfileUpdate): Promise<{ data: Profile | null; error: any }> {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Upload a profile avatar
   */
  async uploadAvatar(userId: string, file: File): Promise<{ path: string | null; error: any }> {
    const fileExt = file.name.split('.').pop();
    const filePath = `avatars/${userId}/${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error } = await supabase.storage
      .from('profiles')
      .upload(filePath, file);

    if (error) {
      return { path: null, error };
    }

    const { data } = supabase.storage.from('profiles').getPublicUrl(filePath);
    return { path: data.publicUrl, error: null };
  },
};