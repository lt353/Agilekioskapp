import { createClient } from '@supabase/supabase-js';

// Single shared Supabase client instance
let supabase: any = null;

export function getSupabaseClient() {
  // Return existing instance if already created
  if (supabase) {
    return supabase;
  }

  const supabaseUrl = 'https://hteypaznunqzuekdhppt.supabase.co';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0ZXlwYXpudW5xenVla2RocHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MDM2NjksImV4cCI6MjA3ODI3OTY2OX0.rGAO4YJpXfhPKoQSiHAa5qW5Ts8kGF5sfLLus1vcIVo';
  
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client created:', supabaseUrl);
    return supabase;
  }
  
  console.info('Supabase not configured - using mock data');
  return null;
}

// Test connection function
export async function testSupabaseConnection() {
  const client = getSupabaseClient();
  if (!client) {
    console.error('❌ No Supabase client');
    return false;
  }
  
  try {
    console.log('🔄 Testing connection to rooms table...');
    const { data, error, status, statusText } = await client
      .from('rooms')
      .select('*', { count: 'exact', head: true });
    
    console.log('Response:', { data, error, status, statusText });
    
    if (error) {
      console.error('❌ Error:', JSON.stringify(error, null, 2));
      return false;
    }
    
    console.log('✅ Connection successful!');
    return true;
  } catch (err) {
    console.error('❌ Exception:', err);
    return false;
  }
}
