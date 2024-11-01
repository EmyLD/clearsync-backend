// supabase.service.ts
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }

  async getAllUsers() {
    const { data, error } = await this.supabase.from('users').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  async addUser(userData: any) {
    const { data, error } = await this.supabase
      .from('users')
      .insert([userData]);
    if (error) throw new Error(error.message);
    return data;
  }
}
