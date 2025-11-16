import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { KioskHeader } from './KioskHeader';
import { getRoomColor } from '../data/roomData';
import { useState, useEffect, useRef } from 'react';
import { getRoomDatabase } from '../data/roomDataLoader';
import floor1Image from "figma:asset/55a4e16928950039c9d966eb374cf92c3359bb03.png";
import floor2Image from "figma:asset/ce34bbc7916da202b5c59759323925e07ec34292.png";
import { MapPin } from 'lucide-react';

interface RoomDetailProps {
  room: { 
    roomNumber: string;
    name?: string;
    type?: string;
    floor?: number;
    occupant?: string;
    department?: string;
    hours?: string;
    phone?: string;
    email?: string;
    description?: string;
  };
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function RoomDetail({ room, onBack, onHome, onWelcome, canGoBack, onNavigate }: RoomDetailProps) {
  const [roomDatabase, setRoomDatabase] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [pinPosition, setPinPosition] = useState<{ x: number; y: number } | null>(null);

  // Image map data for floor 1 rooms
  const floor1Areas = [
    { id: "A-1", coords: "623,158,686,222" },
    { id: "101", coords: "526,158,527,359,564,355,567,316,617,313,616,158" },
    { id: "102", coords: "613,405,709,608" },
    { id: "103", coords: "690,158,983,356" },
    { id: "103A", coords: "903,92,983,151" },
    { id: "104A", coords: "715,410,867,609" },
    { id: "104B", coords: "874,408,982,607" },
    { id: "105", coords: "622,231,688,357" },
    { id: "107", coords: "236,228,354,424" },
    { id: "108", coords: "260,477,387,659" },
    { id: "109", coords: "135,479,254,659" },
    { id: "106", coords: "391,478,462,613" },
    { id: "110", coords: "394,620,463,659" },
    { id: "111", coords: "414,716,462,828" },
    { id: "112", coords: "359,718,407,830" },
    { id: "113", coords: "308,718,355,828" },
    { id: "114", coords: "252,718,300,831" },
    { id: "115", coords: "194,715,247,830" },
    { id: "116", coords: "145,718,193,828" },
    { id: "117", coords: "7,670,86,727" },
    { id: "118", coords: "4,606,89,665" },
    { id: "119", coords: "5,541,89,599" },
    { id: "120", coords: "5,478,87,537" },
    { id: "121", coords: "3,416,88,475" },
    { id: "122", coords: "5,351,88,410" },
    { id: "123", coords: "5,291,89,348" },
    { id: "124", coords: "5,227,88,288" },
    { id: "125", coords: "133,226,233,286" },
    { id: "126", coords: "134,292,233,353" },
    { id: "127", coords: "133,361,234,422" },
    { id: "130", coords: "526,6,581,104" },
    { id: "131", coords: "586,7,642,103" },
    { id: "132", coords: "647,7,703,101" },
    { id: "133", coords: "708,7,764,102" },
    { id: "134", coords: "769,6,824,103" },
    { id: "135", coords: "830,7,884,102" },
    { id: "137", coords: "567,315,620,356" },
  ];

  // Image map data for floor 2 rooms
  const floor2Areas = [
    { id: "201", coords: "511,169,712,354" },
    { id: "202", coords: "597,383,778,574" },
    { id: "203", coords: "722,224,723,167,924,169,924,356,722,357,723,316,769,315,768,223" },
    { id: "203A", coords: "720,225,768,315" },
    { id: "204", coords: "785,387,959,574" },
    { id: "206", coords: "292,481,456,660" },
    { id: "207", coords: "110,242,350,426" },
    { id: "208", coords: "133,479,287,660" },
    { id: "209", coords: "6,243,104,412" },
    { id: "211", coords: "407,708,457,816" },
    { id: "212", coords: "355,709,403,814" },
    { id: "213", coords: "301,708,351,816" },
    { id: "214", coords: "249,708,298,816" },
    { id: "215", coords: "197,708,245,816" },
    { id: "216", coords: "143,708,191,816" },
    { id: "217", coords: "4,660,87,718" },
    { id: "218", coords: "6,602,87,657" },
    { id: "219", coords: "7,541,88,595" },
    { id: "220", coords: "5,478,87,536" },
    { id: "221", coords: "6,419,86,474" },
    { id: "230", coords: "511,14,567,106" },
    { id: "231", coords: "573,15,626,104" },
    { id: "232", coords: "632,14,685,106" },
    { id: "233", coords: "692,14,744,106" },
    { id: "234", coords: "751,15,803,106" },
    { id: "235", coords: "810,14,863,105" },
  ];

  // Load room database from Supabase
  useEffect(() => {
    async function loadRoomData() {
      const data = await getRoomDatabase();
      setRoomDatabase(data);
      setIsLoading(false);
    }
    loadRoomData();
  }, []);

  // Try to get detailed room data from database, otherwise use what was passed in
  const dbData = roomDatabase[room.roomNumber] || roomDatabase[`${room.roomNumber}-${room.floor}`];
  
  const roomData = {
    number: room.roomNumber,
    name: room.name || dbData?.name || 'Room Information',
    type: room.type || dbData?.type || 'office',
    floor: room.floor || dbData?.floor || (room.roomNumber.startsWith('2') ? 2 : 1),
    occupant: room.occupant || dbData?.occupant,
    department: room.department || dbData?.department,
    hours: room.hours || dbData?.hours || 'Mon-Fri 8:00 AM - 4:30 PM',
    phone: room.phone || dbData?.phone,
    email: room.email || dbData?.email,
    description: room.description || dbData?.description,
  };

  const roomColor = getRoomColor(roomData.type as any);

  // Get room coordinates from area maps
  const getRoomCoordinates = (roomNum: string, floor: number) => {
    const areas = floor === 1 ? floor1Areas : floor2Areas;
    const area = areas.find(a => a.id === roomNum);
    
    if (!area) return null;
    
    // Calculate center point from coordinates
    const coords = area.coords.split(',').map(Number);
    let centerX = 0;
    let topY = 0;
    
    // For rectangular areas (4 coords), calculate center X and top Y
    if (coords.length === 4) {
      centerX = (coords[0] + coords[2]) / 2;
      topY = Math.min(coords[1], coords[3]); // Use the top edge
    } else {
      // For polygons, calculate average X and minimum Y
      const xCoords = coords.filter((_, i) => i % 2 === 0);
      const yCoords = coords.filter((_, i) => i % 2 === 1);
      centerX = xCoords.reduce((a, b) => a + b, 0) / xCoords.length;
      topY = Math.min(...yCoords); // Use the top edge
    }
    
    // Apply offset adjustment: move left and up
    centerX = centerX - 35; // Move 35px left
    topY = topY - 35; // Move 35px up
    
    // Special adjustment for specific rooms: move 10px to the right
    const specialRooms = ['201', '203', '203A', '230', '231', '232', '233', '234', '235'];
    if (specialRooms.includes(roomNum)) {
      centerX = centerX + 10; // Move 10px right
    }
    
    return { x: centerX, y: topY };
  };
  
  // Original floor map dimensions
  const originalWidth = 990;
  const originalHeight = 840;

  const getTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      'faculty': 'Faculty Office',
      'student-services': 'Student Services Center',
      'administrative': 'Administrative Office',
      'restroom': 'Restroom',
      'stairs': 'Stairwell',
      'elevator': 'Elevator',
      'classroom': 'Classroom',
      'office': 'Office',
    };
    return labels[type] || 'Room';
  };

  const getTypeLabelTextColor = (type: string): string => {
    // Use black text for lighter background colors
    const blackTextTypes = ['classroom', 'office', 'administrative'];
    
    // Check if this type will use the default "Room" label (no match in getTypeLabel)
    const typeLabels = ['faculty', 'student-services', 'administrative', 'restroom', 'stairs', 'elevator', 'classroom', 'office'];
    const isDefaultRoom = !typeLabels.includes(type) || !type;
    
    if (blackTextTypes.includes(type) || isDefaultRoom) {
      return 'text-black';
    }
    return 'text-white';
  };

  const getDirections = (): string[] => {
    const floor = roomData.floor;
    const roomNum = parseInt(room.roomNumber);
    
    if (roomData.type === 'restroom' || roomData.type === 'elevator' || roomData.type === 'stairs') {
      return [
        `1. Take elevator or stairs to Floor ${floor}`,
        `2. Look for signage near the ${roomData.type === 'elevator' ? 'central hallway' : 'main corridor'}`,
        `3. ${roomData.name} is located in the center of the floor`,
      ];
    }
    
    // Determine wing based on room number
    let wing = 'Main Wing';
    if (roomNum >= 110 && roomNum < 130) {
      wing = 'South Wing (Bottom Corridor)';
    } else if (roomNum >= 130 && roomNum < 140) {
      wing = 'North Wing (Top Corridor)';
    } else if (roomNum >= 100 && roomNum < 110) {
      wing = 'East Wing (Right Side)';
    } else if (roomNum >= 210 && roomNum < 230) {
      wing = 'South Wing (Bottom Corridor)';
    } else if (roomNum >= 230 && roomNum < 240) {
      wing = 'North Wing (Top Corridor)';
    } else if (roomNum >= 200 && roomNum < 210) {
      wing = 'East Wing (Right Side)';
    }
    
    return [
      `1. Take stairs or elevator to Floor ${floor}`,
      `2. Turn and head toward ${wing}`,
      `3. Room ${room.roomNumber} will be on your left or right`,
      `4. Look for the room number on the door`,
    ];
  };

  useEffect(() => {
    const currentRef = imgRef.current;
    
    const handleLoad = () => {
      if (currentRef) {
        setImageDimensions({ width: currentRef.width, height: currentRef.height });
        
        // Calculate room coordinates
        const roomCoords = getRoomCoordinates(room.roomNumber, roomData.floor);
        
        if (roomCoords) {
          setPinPosition({
            x: (roomCoords.x / originalWidth) * currentRef.width,
            y: (roomCoords.y / originalHeight) * currentRef.height,
          });
        }
      }
    };
    
    if (currentRef) {
      if (currentRef.complete) {
        handleLoad();
      } else {
        currentRef.addEventListener('load', handleLoad);
      }
    }
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('load', handleLoad);
      }
    };
  }, [room.roomNumber, roomData.floor]);

  return (
    <div className="size-full bg-gradient-to-br from-[#afa96e]/20 via-white to-[#aca39a]/10 flex flex-col">
      {/* Header */}
      <KioskHeader 
        title={`Room ${room.roomNumber}`} 
        onBack={onBack} 
        onHome={onHome}
        onWelcome={onWelcome}
        canGoBack={canGoBack}
      />

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          {/* Floor Map with Location Pin */}
          <Card className="p-3 bg-white border-4 border-[#789904] shadow-xl overflow-hidden">
            <div className="text-center mb-2">
              <div 
                className={`inline-block px-3 py-1 rounded-full text-sm shadow-lg mb-2 ${getTypeLabelTextColor(roomData.type)}`}
                style={{ backgroundColor: roomColor }}
              >
                {getTypeLabel(roomData.type)}
              </div>
            </div>
            
            <div className="relative w-full max-w-sm mx-auto">
              <img 
                ref={imgRef}
                src={roomData.floor === 1 ? floor1Image : floor2Image}
                alt={`Floor ${roomData.floor} Map`}
                className="w-full h-auto rounded-lg"
              />
              
              {/* Location Pin */}
              {pinPosition && (
                <motion.div
                  initial={{ scale: 0, y: -20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="absolute"
                  style={{
                    left: `${pinPosition.x}px`,
                    top: `${pinPosition.y}px`,
                    transform: 'translate(-50%, -100%)',
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <MapPin 
                      className="text-[#FF0000] drop-shadow-lg" 
                      size={32} 
                      fill="#FF0000"
                      strokeWidth={2}
                    />
                  </motion.div>
                  
                  {/* Room number label */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-[#004f71] text-white px-2 py-0.5 rounded-full text-xs whitespace-nowrap shadow-lg">
                    {room.roomNumber}
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="text-center mt-3 text-xs text-[#65665c]">
              Floor {roomData.floor} - Ka Lama Building
            </div>
          </Card>

          {/* Room Information */}
          <Card className="p-5 bg-white border-4 border-[#004f71] shadow-xl">
            <div className="text-center mb-4">
              <h3 className="text-2xl text-[#004f71] mb-2">
                Room {room.roomNumber} - {roomData.name}
              </h3>
              {roomData.description && (
                <p className="text-base text-[#65665c] mt-2">{roomData.description}</p>
              )}
            </div>

            {/* Room Information Grid */}
            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 bg-gradient-to-r from-[#afa96e]/20 to-white rounded-lg border-2 border-[#afa96e]">
                <div className="text-sm text-[#65665c] mb-1">Location</div>
                <div className="text-lg text-[#004f71]">Floor {roomData.floor}, Ka Lama Building</div>
              </div>

              {roomData.occupant && (
                <div className="p-4 bg-white rounded-lg border-2 border-[#004f71]">
                  <div className="text-sm text-[#65665c] mb-1">Occupant</div>
                  <div className="text-lg text-[#004f71]">{roomData.occupant}</div>
                </div>
              )}

              {roomData.department && (
                <div className="p-4 bg-white rounded-lg border-2 border-[#789904]">
                  <div className="text-sm text-[#65665c] mb-1">Department</div>
                  <div className="text-lg text-[#004f71]">{roomData.department}</div>
                </div>
              )}

              <div className="p-4 bg-white rounded-lg border-2 border-[#afa96e]">
                <div className="text-sm text-[#65665c] mb-1">Hours</div>
                <div className="text-lg text-[#004f71]">{roomData.hours}</div>
              </div>

              {roomData.phone && (
                <div className="p-4 bg-white rounded-lg border-2 border-[#ffb600]">
                  <div className="text-sm text-[#65665c] mb-1">Phone</div>
                  <div className="text-lg text-[#004f71]">{roomData.phone}</div>
                </div>
              )}

              {roomData.email && (
                <div className="p-4 bg-white rounded-lg border-2 border-[#dd8a03]">
                  <div className="text-sm text-[#65665c] mb-1">Email</div>
                  <div className="text-lg text-[#004f71]">{roomData.email}</div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}