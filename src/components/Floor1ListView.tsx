import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { KioskHeader } from "./KioskHeader";
import { Input } from "./ui/input";
import { Search, ChevronRight } from "lucide-react";
import { getCategoryColor, type RoomData } from "../data/roomData";
import { getRoomsByFloorAndCategory } from "../data/roomDataLoader";
import { useState, useEffect } from "react";

interface Floor1ListViewProps {
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function Floor1ListView({ onNavigate, onBack, onHome, onWelcome, canGoBack }: Floor1ListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roomsByCategory, setRoomsByCategory] = useState<Record<string, RoomData[]>>({});
  
  // Load room data from Supabase
  useEffect(() => {
    const roomData = getRoomsByFloorAndCategory(1);
    setRoomsByCategory(roomData);
  }, []);

  // Define category order for Floor 1
  const categoryOrder = [
    'Student Services / Resource Centers',
    'Faculty Offices - Social Science',
    'Faculty Offices - Humanities',
    'Faculty Offices - STEM Department',
    'Faculty Offices - Other Departments',
    'Program / Service Offices',
  ];

  // Filter rooms based on search
  const filterRooms = (rooms: RoomData[]) => {
    if (!searchQuery.trim()) return rooms;
    const query = searchQuery.toLowerCase();
    return rooms.filter(room => 
      room.number.toLowerCase().includes(query) ||
      room.name.toLowerCase().includes(query) ||
      room.occupant?.toLowerCase().includes(query) ||
      room.department?.toLowerCase().includes(query)
    );
  };

  const handleRoomClick = (room: RoomData) => {
    onNavigate("room-detail", {
      roomNumber: room.number,
      name: room.name,
      type: room.type,
      floor: room.floor,
      occupant: room.occupant,
      department: room.department,
      hours: room.hours,
      phone: room.phone,
      email: room.email,
      description: room.description,
    });
  };

  return (
    <div className="size-full bg-gradient-to-br from-[#afa96e]/20 via-white to-[#aca39a]/10 flex flex-col">
      {/* Header */}
      <KioskHeader 
        title="Floor 1" 
        onBack={onBack} 
        onHome={onHome}
        onWelcome={onWelcome}
        canGoBack={canGoBack}
      />

      {/* Content */}
      <div className="flex-1 overflow-hidden px-4 py-3 flex flex-col">
        {/* Switch to Map View Button */}
        <Button
          onClick={() => onNavigate('floor-map', { floor: 1 })}
          className="h-12 mb-3 bg-gradient-to-r from-[#ffb600] to-[#dd8a03] text-white shadow-lg hover:shadow-xl transition-all"
        >
          Switch to Map View
        </Button>

        {/* Search Box */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#65665c] w-5 h-5" />
          <Input
            type="text"
            placeholder="Search this floor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 border-2 border-[#aca39a] focus:border-[#004f71]"
          />
        </div>

        {/* Scrollable Room List */}
        <div className="flex-1 overflow-y-auto space-y-3 pb-4">
          {categoryOrder.map(category => {
            const rooms = roomsByCategory[category];
            if (!rooms || rooms.length === 0) return null;

            const filteredRooms = filterRooms(rooms);
            if (filteredRooms.length === 0) return null;

            const colors = getCategoryColor(category);

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                {/* Category Header */}
                <div className="pt-2">
                  <h3 className="text-sm text-[#004f71] uppercase tracking-wide px-1" style={{ fontWeight: 700 }}>
                    {category}
                  </h3>
                  <div 
                    className="h-0.5 mt-1" 
                    style={{ backgroundColor: colors.border }}
                  />
                </div>

                {/* Room Cards */}
                <div className="space-y-2">
                  {filteredRooms.map((room) => (
                    <Card
                      key={room.number}
                      onClick={() => handleRoomClick(room)}
                      className="p-3 cursor-pointer transition-all hover:shadow-lg active:scale-98 border-2"
                      style={{ 
                        backgroundColor: colors.bg,
                        borderColor: colors.border
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[#004f71]" style={{ fontWeight: 700 }}>
                              Room {room.number}
                            </span>
                            {room.occupant && (
                              <span className="text-[#004f71]">
                                - {room.occupant}
                              </span>
                            )}
                            {!room.occupant && room.name && room.name !== 'Faculty Office' && (
                              <span className="text-[#004f71]">
                                - {room.name}
                              </span>
                            )}
                          </div>
                          {room.department && (
                            <p className="text-sm text-[#65665c]">
                              {room.department}
                            </p>
                          )}
                          {room.description && !room.department && (
                            <p className="text-sm text-[#65665c]">
                              {room.description}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="w-6 h-6 text-[#004f71] flex-shrink-0" />
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* End of Directory Message */}
          <div className="text-center py-4">
            <p className="text-sm text-[#999999]">End of Floor 1 Directory</p>
          </div>
        </div>
      </div>
    </div>
  );
}
