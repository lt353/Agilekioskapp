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

// Track click analytics for screens
export async function trackScreenClick(screenName: string) {
  const client = getSupabaseClient();
  if (!client) {
    console.warn('⚠️ Supabase client not available - click tracking disabled');
    return;
  }

  try {
    // First, try to get existing record
    const { data: existing, error: selectError } = await client
      .from('screen_analytics')
      .select('*')
      .eq('screen_name', screenName)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116 is "no rows returned" which is expected for new screens
      console.error('❌ Error fetching analytics:', selectError);
      return;
    }

    if (existing) {
      // Update existing record - increment click count and update last_clicked
      const { error: updateError } = await client
        .from('screen_analytics')
        .update({
          click_count: existing.click_count + 1,
          last_clicked: new Date().toISOString()
        })
        .eq('screen_name', screenName);

      if (updateError) {
        console.error('❌ Error updating analytics:', updateError);
      } else {
        console.log(`📊 Tracked click for "${screenName}" (total: ${existing.click_count + 1})`);
      }
    } else {
      // Insert new record
      const { error: insertError } = await client
        .from('screen_analytics')
        .insert({
          screen_name: screenName,
          click_count: 1,
          last_clicked: new Date().toISOString(),
          created_at: new Date().toISOString()
        });

      if (insertError) {
        console.error('❌ Error inserting analytics:', insertError);
      } else {
        console.log(`📊 Tracked first click for "${screenName}"`);
      }
    }
  } catch (err) {
    console.error('❌ Exception tracking click:', err);
  }
}
