import { roomDatabase as localRoomDatabase, RoomData } from './roomData';
import { getSupabaseClient, testSupabaseConnection } from './supabaseClient';

// Cache for room data
let cachedRoomData: Record<string, RoomData> | null = null;
let isFetching = false;
let fetchPromise: Promise<Record<string, RoomData>> | null = null;
let hasTestedConnection = false;

/**
 * Fetch room data from Supabase or use local fallback
 * This function caches the result and reuses it for subsequent calls
 */
export async function getRoomDatabase(): Promise<Record<string, RoomData>> {
  // Return cached data if available
  if (cachedRoomData) {
    return cachedRoomData;
  }

  // If already fetching, wait for that promise
  if (isFetching && fetchPromise) {
    return fetchPromise;
  }

  // Start fetching
  isFetching = true;
  fetchPromise = (async () => {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        console.info('No Supabase connection - using local room data');
        cachedRoomData = localRoomDatabase;
        return localRoomDatabase;
      }

      // Test connection on first run
      if (!hasTestedConnection) {
        hasTestedConnection = true;
        await testSupabaseConnection();
      }

      console.log('🔄 Fetching rooms from Supabase... (timestamp:', new Date().toISOString(), ')');
      
      // Note: Adding a timestamp to ensure we're not getting cached data
      const { data, error, status, statusText } = await supabase
        .from('rooms')
        .select('*')
        .eq('active', true)
        .order('number', { ascending: true });
      
      console.log('Rooms response:', { 
        dataCount: data?.length, 
        error: error ? JSON.stringify(error, null, 2) : null, 
        status, 
        statusText 
      });
      
      if (data && data.length > 0) {
        console.log('📊 First 3 rooms from Supabase:');
        data.slice(0, 3).forEach(room => {
          console.log(`  - Room ${room.number}: ${room.name}`);
        });
        
        // Show ALL room numbers to help debug
        const allRoomNumbers = data.map(r => r.number).sort();
        console.log('🔢 All room numbers in Supabase:', allRoomNumbers);
        
        // Check specifically for room101 to help debug
        const room101 = data.find(r => r.number === '101');
        if (room101) {
          console.log('🔍 Room 101 found:', room101);
        } else {
          console.warn('⚠️ Room 101 NOT FOUND in Supabase data');
          console.log('💡 Check: Does room 101 exist in your table? Is active=true?');
        }
      }

      if (error) {
        // Handle missing table or other errors gracefully
        if (error.code === 'PGRST204' || error.code === 'PGRST205') {
          console.info('Table "rooms" not found - using local room data. Set up your Supabase tables to enable dynamic room management.');
        } else if (error.code === '42501' || error.message?.includes('permission denied') || error.message?.includes('RLS')) {
          console.error('⚠️ RLS POLICY ERROR: Row Level Security is blocking access to rooms table.');
          console.error('Fix: In Supabase Dashboard, go to Authentication > Policies > rooms > Create a policy to allow SELECT for anon users.');
          console.error('Full error:', error);
        } else {
          console.error('Error fetching rooms from Supabase (code: ' + error.code + '):', error);
        }
        cachedRoomData = localRoomDatabase;
        return localRoomDatabase;
      }

      if (!data || data.length === 0) {
        console.warn('⚠️ No room data in Supabase (or all rooms have active=false) - using local room data');
        console.log('💡 TIP: Check that your rooms table has data and that the "active" column is set to true');
        cachedRoomData = localRoomDatabase;
        return localRoomDatabase;
      }

      // Transform Supabase data to match RoomData format
      const transformedRooms: Record<string, RoomData> = {};
      data.forEach((room: any) => {
        transformedRooms[room.number] = {
          number: room.number,
          name: room.name,
          type: room.type,
          floor: room.floor,
          occupant: room.occupant,
          department: room.department,
          category: room.category,
          hours: room.hours,
          phone: room.phone,
          email: room.email,
          description: room.description,
          position: room.position ? JSON.parse(room.position) : undefined,
        };
      });

      console.log(`✅ Successfully loaded ${data.length} rooms from Supabase`);
      cachedRoomData = transformedRooms;
      return transformedRooms;
    } catch (error) {
      console.error('Failed to fetch room data:', error);
      cachedRoomData = localRoomDatabase;
      return localRoomDatabase;
    } finally {
      isFetching = false;
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}

/**
 * Get room database synchronously (returns cached data or local fallback)
 * Use getRoomDatabase() for async fetching
 */
export function getRoomDatabaseSync(): Record<string, RoomData> {
  return cachedRoomData || localRoomDatabase;
}

/**
 * Clear the cache (useful for refreshing data)
 */
export function clearRoomCache() {
  cachedRoomData = null;
}

/**
 * Get rooms grouped by category for a specific floor
 * This uses the cached/synced room database
 */
export function getRoomsByFloorAndCategory(floor: 1 | 2): Record<string, RoomData[]> {
  const roomDb = getRoomDatabaseSync();
  const floorRooms = Object.values(roomDb).filter(room => room.floor === floor);
  const grouped: Record<string, RoomData[]> = {};

  floorRooms.forEach(room => {
    const category = room.category || 'Other';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(room);
  });

  return grouped;
}
