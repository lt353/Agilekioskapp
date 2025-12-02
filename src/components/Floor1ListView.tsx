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
    <div
      className="size-full bg-gradient-to-br from-[#afa96e]/20 via-white to-[#aca39a]/10 flex flex-col"
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom right, rgba(175, 169, 110, 0.2), #ffffff, rgba(172, 163, 154, 0.1))',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <KioskHeader
        title="Floor 1"
        onBack={onBack}
        onHome={onHome}
        onWelcome={onWelcome}
        canGoBack={canGoBack}
      />

      {/* Content */}
      <div
        className="flex-1 overflow-hidden px-4 py-3 flex flex-col"
        style={{
          flex: 1,
          overflow: 'hidden',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Switch to Map View Button */}
        <Button
          onClick={() => onNavigate('floor-map', { floor: 1 })}
          className="h-12 mb-3 bg-gradient-to-r from-[#ffb600] to-[#dd8a03] text-white shadow-lg hover:shadow-xl transition-all"
          style={{
            height: '48px',
            marginBottom: '12px',
            background: 'linear-gradient(to right, #ffb600, #dd8a03)',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 600,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '100%',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}
        >
          <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600,
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
            Switch to Map View
          </span>
        </Button>

        {/* Search Box */}
        <div
          className="relative mb-3"
          style={{
            position: 'relative',
            marginBottom: '12px'
          }}
        >
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#65665c] w-5 h-5"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#65665c',
              width: '20px',
              height: '20px'
            }}
          />
          <Input
            type="text"
            placeholder="Search this floor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 border-2 border-[#aca39a] focus:border-[#004f71]"
            style={{
              paddingLeft: '40px',
              height: '48px',
              border: '2px solid #aca39a',
              borderRadius: '8px',
              fontSize: '16px',
              width: '100%',
              backgroundColor: '#ffffff',
              color: '#000000',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}
          />
        </div>

        {/* Scrollable Room List */}
        <div
          className="flex-1 overflow-y-auto space-y-3 pb-4"
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingBottom: '16px'
          }}
        >
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
                style={{ marginBottom: '12px' }}
              >
                {/* Category Header */}
                <div
                  className="pt-2"
                  style={{ paddingTop: '8px' }}
                >
                  <h3
                    className="text-sm text-[#004f71] uppercase tracking-wide px-1"
                    style={{
                      fontSize: '14px',
                      color: '#004f71',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      paddingLeft: '4px',
                      paddingRight: '4px',
                      fontWeight: 700,
                      marginBottom: '4px',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}
                  >
                    {category}
                  </h3>
                  <div
                    className="h-0.5 mt-1"
                    style={{
                      height: '2px',
                      marginTop: '4px',
                      backgroundColor: colors.border
                    }}
                  />
                </div>

                {/* Room Cards */}
                <div
                  className="space-y-2"
                  style={{ marginTop: '8px' }}
                >
                  {filteredRooms.map((room) => (
                    <Card
                      key={room.number}
                      onClick={() => handleRoomClick(room)}
                      className="p-3 cursor-pointer transition-all hover:shadow-lg active:scale-98 border-2"
                      style={{
                        padding: '12px',
                        cursor: 'pointer',
                        backgroundColor: colors.bg,
                        borderColor: colors.border,
                        border: `2px solid ${colors.border}`,
                        borderRadius: '8px',
                        marginBottom: '8px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div
                        className="flex items-center justify-between"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div
                          className="flex-1 min-w-0"
                          style={{
                            flex: 1,
                            minWidth: 0
                          }}
                        >
                          <div
                            className="flex items-center gap-2 mb-1"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '4px',
                              flexWrap: 'wrap'
                            }}
                          >
                            <span
                              className="text-[#004f71]"
                              style={{
                                color: '#004f71',
                                fontWeight: 700,
                                fontSize: '16px',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}
                            >
                              Room {room.number}
                            </span>
                            {room.occupant && (
                              <span
                                className="text-[#004f71]"
                                style={{
                                  color: '#004f71',
                                  fontSize: '16px',
                                  fontWeight: 400,
                                fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
                                }}
                              >
                                - {room.occupant}
                              </span>
                            )}
                            {!room.occupant && room.name && room.name !== 'Faculty Office' && (
                              <span
                                className="text-[#004f71]"
                                style={{
                                  color: '#004f71',
                                  fontSize: '16px',
                                  fontWeight: 400,
                                fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
                                }}
                              >
                                - {room.name}
                              </span>
                            )}
                          </div>
                          {room.department && (
                            <p
                              className="text-sm text-[#65665c]"
                              style={{
                                fontSize: '14px',
                                color: '#65665c',
                                margin: 0,
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}
                            >
                              {room.department}
                            </p>
                          )}
                          {room.description && !room.department && (
                            <p
                              className="text-sm text-[#65665c]"
                              style={{
                                fontSize: '14px',
                                color: '#65665c',
                                margin: 0,
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}
                            >
                              {room.description}
                            </p>
                          )}
                        </div>
                        <ChevronRight
                          className="w-6 h-6 text-[#004f71] flex-shrink-0"
                          style={{
                            width: '24px',
                            height: '24px',
                            color: '#004f71',
                            flexShrink: 0
                          }}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* End of Directory Message */}
          <div
            className="text-center py-4"
            style={{
              textAlign: 'center',
              paddingTop: '16px',
              paddingBottom: '16px'
            }}
          >
            <p
              className="text-sm text-[#999999]"
              style={{
                fontSize: '14px',
                color: '#999999',
                margin: 0,
                fontWeight: 400,
              fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
              }}
            >
              End of Floor 1 Directory
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
