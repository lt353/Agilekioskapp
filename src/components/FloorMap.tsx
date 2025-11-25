import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { KioskHeader } from "./KioskHeader";
import { useState, useEffect, useRef } from "react";
import {
  getRoomColor,
  getRoomHoverColor,
  type RoomData,
} from "../data/roomData";
import { getRoomDatabase } from "../data/roomDataLoader";
import { FLOOR_MAP_SCALE_DELAY } from "../constants/timeouts";
import floor1Image from "figma:asset/floor-1-map.png";
import floor2Image from "figma:asset/floor-2-map.png";

interface FloorMapProps {
  floor: { floor: number };
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

// Image map data for floor 1 rooms (using coordinates from the provided HTML image maps)
const floor1Areas = [
  { id: "A-1", coords: "623,158,686,222", shape: "rect" as const },
  { id: "101", coords: "526,158,527,359,564,355,567,316,617,313,616,158", shape: "poly" as const },
  { id: "102", coords: "613,405,709,608", shape: "rect" as const },
  { id: "103", coords: "690,158,983,356", shape: "rect" as const },
  { id: "103A", coords: "903,92,983,151", shape: "rect" as const },
  { id: "104A", coords: "715,410,867,609", shape: "rect" as const },
  { id: "104B", coords: "874,408,982,607", shape: "rect" as const },
  { id: "105", coords: "622,231,688,357", shape: "rect" as const },
  { id: "107", coords: "236,228,354,424", shape: "rect" as const },
  { id: "108", coords: "260,477,387,659", shape: "rect" as const },
  { id: "109", coords: "135,479,254,659", shape: "rect" as const },
  { id: "106", coords: "391,478,462,613", shape: "rect" as const },
  { id: "110", coords: "394,620,463,659", shape: "rect" as const },
  { id: "111", coords: "414,716,462,828", shape: "rect" as const },
  { id: "112", coords: "359,718,407,830", shape: "rect" as const },
  { id: "113", coords: "308,718,355,828", shape: "rect" as const },
  { id: "114", coords: "252,718,300,831", shape: "rect" as const },
  { id: "115", coords: "194,715,247,830", shape: "rect" as const },
  { id: "116", coords: "145,718,193,828", shape: "rect" as const },
  { id: "117", coords: "7,670,86,727", shape: "rect" as const },
  { id: "118", coords: "4,606,89,665", shape: "rect" as const },
  { id: "119", coords: "5,541,89,599", shape: "rect" as const },
  { id: "120", coords: "5,478,87,537", shape: "rect" as const },
  { id: "121", coords: "3,416,88,475", shape: "rect" as const },
  { id: "122", coords: "5,351,88,410", shape: "rect" as const },
  { id: "123", coords: "5,291,89,348", shape: "rect" as const },
  { id: "124", coords: "5,227,88,288", shape: "rect" as const },
  { id: "125", coords: "133,226,233,286", shape: "rect" as const },
  { id: "126", coords: "134,292,233,353", shape: "rect" as const },
  { id: "127", coords: "133,361,234,422", shape: "rect" as const },
  { id: "130", coords: "526,6,581,104", shape: "rect" as const },
  { id: "131", coords: "586,7,642,103", shape: "rect" as const },
  { id: "132", coords: "647,7,703,101", shape: "rect" as const },
  { id: "133", coords: "708,7,764,102", shape: "rect" as const },
  { id: "134", coords: "769,6,824,103", shape: "rect" as const },
  { id: "135", coords: "830,7,884,102", shape: "rect" as const },
  { id: "137", coords: "567,315,620,356", shape: "rect" as const },
];

// Image map data for floor 2 rooms
const floor2Areas = [
  { id: "201", coords: "511,169,712,354", shape: "rect" as const },
  { id: "202", coords: "597,383,778,574", shape: "rect" as const },
  { id: "203", coords: "722,224,723,167,924,169,924,356,722,357,723,316,769,315,768,223", shape: "poly" as const },
  { id: "203A", coords: "720,225,768,315", shape: "rect" as const },
  { id: "204", coords: "785,387,959,574", shape: "rect" as const },
  { id: "206", coords: "292,481,456,660", shape: "rect" as const },
  { id: "207", coords: "110,242,350,426", shape: "rect" as const },
  { id: "208", coords: "133,479,287,660", shape: "rect" as const },
  { id: "209", coords: "6,243,104,412", shape: "rect" as const },
  { id: "211", coords: "407,708,457,816", shape: "rect" as const },
  { id: "212", coords: "355,709,403,814", shape: "rect" as const },
  { id: "213", coords: "301,708,351,816", shape: "rect" as const },
  { id: "214", coords: "249,708,298,816", shape: "rect" as const },
  { id: "215", coords: "197,708,245,816", shape: "rect" as const },
  { id: "216", coords: "143,708,191,816", shape: "rect" as const },
  { id: "217", coords: "4,660,87,718", shape: "rect" as const },
  { id: "218", coords: "6,602,87,657", shape: "rect" as const },
  { id: "219", coords: "7,541,88,595", shape: "rect" as const },
  { id: "220", coords: "5,478,87,536", shape: "rect" as const },
  { id: "221", coords: "6,419,86,474", shape: "rect" as const },
  { id: "230", coords: "511,14,567,106", shape: "rect" as const },
  { id: "231", coords: "573,15,626,104", shape: "rect" as const },
  { id: "232", coords: "632,14,685,106", shape: "rect" as const },
  { id: "233", coords: "692,14,744,106", shape: "rect" as const },
  { id: "234", coords: "751,15,803,106", shape: "rect" as const },
  { id: "235", coords: "810,14,863,105", shape: "rect" as const },
];

export function FloorMap({
  floor,
  onNavigate,
  onBack,
  onHome,
  onWelcome,
  canGoBack,
}: FloorMapProps) {
  const [currentFloor, setCurrentFloor] = useState(floor.floor);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(
    null,
  );
  const [scaledAreas, setScaledAreas] = useState<typeof floor1Areas>([]);
  const [roomDatabase, setRoomDatabase] = useState<Record<string, any>>({});
  const imgRef = useRef<HTMLImageElement>(null);

  // Load room database from Supabase
  useEffect(() => {
    async function loadRoomData() {
      const data = await getRoomDatabase();
      setRoomDatabase(data);
    }
    loadRoomData();
  }, []);

  // Original image dimensions (measured from coordinate ranges)
  const originalWidth = 990;  // Floor plans are approximately 990px wide
  const originalHeight = 840; // Floor plans are approximately 840px tall
  
  // Target display width to fit kiosk screen
  const displayWidth = 500;

  const floorImage =
    currentFloor === 1 ? floor1Image : floor2Image;
  const areas =
    currentFloor === 1 ? floor1Areas : floor2Areas;

  // Scale coordinates when floor changes or image loads
  useEffect(() => {
    const scaleCoordinates = () => {
      if (!imgRef.current) return;
      
      const displayedWidth = imgRef.current.clientWidth;
      const displayedHeight = imgRef.current.clientHeight;
      
      const scaleX = displayedWidth / originalWidth;
      const scaleY = displayedHeight / originalHeight;
      
      const scaled = areas.map(area => {
        const coords = area.coords.split(',').map(coord => {
          const num = parseFloat(coord);
          const index = area.coords.split(',').indexOf(coord);
          // Even indices are X coordinates, odd are Y
          return index % 2 === 0 ? Math.round(num * scaleX) : Math.round(num * scaleY);
        });
        
        return {
          ...area,
          coords: coords.join(',')
        };
      });
      
      setScaledAreas(scaled);
    };

    // Scale on mount and when floor changes
    const timer = setTimeout(scaleCoordinates, FLOOR_MAP_SCALE_DELAY);
    return () => clearTimeout(timer);
  }, [currentFloor, areas]);

  const handleRoomClick = (roomId: string) => {
    const roomData = roomDatabase[roomId];
    if (roomData) {
      onNavigate("room-detail", {
        roomNumber: roomData.number,
        name: roomData.name,
        type: roomData.type,
        floor: roomData.floor,
        occupant: roomData.occupant,
        department: roomData.department,
        hours: roomData.hours,
        phone: roomData.phone,
        email: roomData.email,
        description: roomData.description,
      });
    }
  };

  const switchFloor = (newFloor: number) => {
    setCurrentFloor(newFloor);
    setHoveredRoom(null);
  };

  return (
    <div className="size-full bg-gradient-to-br from-[#afa96e]/20 via-white to-[#aca39a]/10 flex flex-col">
      {/* Header */}
      <KioskHeader 
        title={`Floor ${currentFloor}`} 
        onBack={onBack} 
        onHome={onHome}
        onWelcome={onWelcome}
        canGoBack={canGoBack}
      />

      {/* Content */}
      <div className="flex-1 overflow-hidden px-4 py-3 flex flex-col">
        {/* Floor Navigation */}
        <div className="flex gap-4 justify-center mb-3">
          <Button
            onClick={() => switchFloor(1)}
            className={`h-12 px-10 text-base shadow-lg transition-all ${
              currentFloor === 1
                ? "bg-gradient-to-r from-[#004f71] to-[#00313c] text-white"
                : "bg-gradient-to-r from-[#afa96e] to-[#aca39a] text-white hover:from-[#789904] hover:to-[#afa96e]"
            }`}
          >
            Floor 1
          </Button>
          <Button
            onClick={() => switchFloor(2)}
            className={`h-12 px-10 text-base shadow-lg transition-all ${
              currentFloor === 2
                ? "bg-gradient-to-r from-[#004f71] to-[#00313c] text-white"
                : "bg-gradient-to-r from-[#afa96e] to-[#aca39a] text-white hover:from-[#789904] hover:to-[#afa96e]"
            }`}
          >
            Floor 2
          </Button>
        </div>

        {/* Interactive Map */}
        <motion.div
          key={currentFloor}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-3 bg-white border-4 border-[#789904] shadow-xl mb-3">
            <div className="relative flex justify-center">
              <div className="relative">
                {/* Floor plan image with clickable map */}
                <img
                  ref={imgRef}
                  src={floorImage}
                  alt={`Floor ${currentFloor} map`}
                  useMap={`#floor-${currentFloor}-map`}
                  style={{ width: `${displayWidth}px`, height: 'auto' }}
                  onLoad={() => {
                    // Trigger coordinate scaling after image loads
                    const timer = setTimeout(() => {
                      if (imgRef.current) {
                        const displayedWidth = imgRef.current.clientWidth;
                        const displayedHeight = imgRef.current.clientHeight;
                        
                        const scaleX = displayedWidth / originalWidth;
                        const scaleY = displayedHeight / originalHeight;
                        
                        const scaled = areas.map(area => {
                          const coords = area.coords.split(',').map((coord, index) => {
                            const num = parseFloat(coord);
                            return index % 2 === 0 ? Math.round(num * scaleX) : Math.round(num * scaleY);
                          });
                          
                          return {
                            ...area,
                            coords: coords.join(',')
                          };
                        });
                        
                        setScaledAreas(scaled);
                      }
                    }, 50);
                  }}
                />

                {/* Image map definition with scaled coordinates */}
                <map name={`floor-${currentFloor}-map`}>
                  {scaledAreas.map((area) => {
                    const roomData = roomDatabase[area.id];
                    if (!roomData) return null;

                    return (
                      <area
                        key={area.id}
                        alt={roomData.name}
                        title={`${roomData.number} - ${roomData.name}`}
                        href="#"
                        coords={area.coords}
                        shape={area.shape}
                        onClick={(e) => {
                          e.preventDefault();
                          handleRoomClick(area.id);
                        }}
                        onMouseEnter={() => setHoveredRoom(area.id)}
                        onMouseLeave={() => setHoveredRoom(null)}
                        className="cursor-pointer"
                      />
                    );
                  })}
                </map>
              </div>
            </div>

          </Card>
        </motion.div>

        {/* Instruction Text */}
        <div className="bg-gradient-to-r from-[#ffb600] to-[#dd8a03] rounded-lg p-3 mb-3 shadow-lg">
          <p className="text-base text-white text-center">
            Touch any room on the map for more details
          </p>
        </div>

        {/* Legend */}
        <Card className="p-3 bg-slate-200 border-2 border-[#65665c] mb-3">
          <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded border border-slate-400" style={{ backgroundColor: getRoomColor("faculty") }}></div>
              <span className="text-slate-800" style={{ fontWeight: 600 }}>Faculty</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded border border-slate-400" style={{ backgroundColor: getRoomColor("student-services") }}></div>
              <span className="text-slate-800" style={{ fontWeight: 600 }}>Services</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded border border-slate-400" style={{ backgroundColor: getRoomColor("administrative") }}></div>
              <span className="text-slate-800" style={{ fontWeight: 600 }}>Admin</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded border border-slate-400" style={{ backgroundColor: getRoomColor("restroom") }}></div>
              <span className="text-slate-800" style={{ fontWeight: 600 }}>Restroom</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded border border-slate-400" style={{ backgroundColor: getRoomColor("stairs") }}></div>
              <span className="text-slate-800" style={{ fontWeight: 600 }}>Stairs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded border border-slate-400" style={{ backgroundColor: getRoomColor("elevator") }}></div>
              <span className="text-slate-800" style={{ fontWeight: 600 }}>Elevator</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded border border-slate-400" style={{ backgroundColor: getRoomColor("unassigned") }}></div>
              <span className="text-slate-800" style={{ fontWeight: 600 }}>Unassigned</span>
            </div>
          </div>
        </Card>

        {/* Switch to List View Button */}
        <Button
          onClick={() => onNavigate(currentFloor === 1 ? 'floor1-list' : 'floor2-list')}
          className="w-full h-12 bg-gradient-to-r from-[#004f71] to-[#00313c] text-white shadow-lg hover:shadow-xl transition-all"
        >
          Switch to List View
        </Button>
      </div>
    </div>
  );
}