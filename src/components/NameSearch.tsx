import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { KioskHeader } from './KioskHeader';
import { useState, useEffect } from 'react';
import { getRoomDatabase } from '../data/roomDataLoader';
import { KEYBOARD_KEY_PRESS_DURATION } from '../constants/timeouts';

interface NameSearchProps {
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function NameSearch({ onNavigate, onBack, onHome, onWelcome, canGoBack }: NameSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [roomDatabase, setRoomDatabase] = useState<Record<string, any>>({});

  const keyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
  ];

  // Load room database from Supabase
  useEffect(() => {
    async function loadRoomData() {
      const data = await getRoomDatabase();
      setRoomDatabase(data);
    }
    loadRoomData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const results = Object.values(roomDatabase).filter((room) => {
        // Search across multiple fields
        const searchableText = [
          room.occupant,
          room.name,
          room.description,
          room.department,
        ]
          .filter(Boolean) // Remove undefined/null values
          .join(' ')
          .toLowerCase();
        
        return searchableText.includes(query);
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleKeyPress = (key: string) => {
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), KEYBOARD_KEY_PRESS_DURATION);
    
    if (key === '⌫') {
      setSearchQuery((prev) => prev.slice(0, -1));
    } else {
      setSearchQuery((prev) => prev + key);
    }
  };

  const handleClear = () => {
    setPressedKey('Clear');
    setTimeout(() => setPressedKey(null), KEYBOARD_KEY_PRESS_DURATION);
    setSearchQuery('');
  };

  const handleSpace = () => {
    setPressedKey('Space');
    setTimeout(() => setPressedKey(null), KEYBOARD_KEY_PRESS_DURATION);
    setSearchQuery((prev) => prev + ' ');
  };

  return (
    <div className="size-full bg-gradient-to-br from-[#afa96e]/20 via-white to-[#aca39a]/10 flex flex-col" style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to bottom right, rgba(175, 169, 110, 0.2), #ffffff, rgba(172, 163, 154, 0.1))',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <KioskHeader
        title="Search by Name"
        onBack={onBack}
        onHome={onHome}
        onWelcome={onWelcome}
        canGoBack={canGoBack}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 py-4 overflow-hidden" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '16px',
        paddingBottom: '16px',
        overflow: 'hidden'
      }}>
        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3"
          style={{ marginBottom: '12px' }}
        >
          <Input
            type="text"
            placeholder="Enter name to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 text-base text-center border-4 border-[#004f71] focus:border-[#ffb600] bg-white shadow-lg"
            style={{
              height: '48px',
              fontSize: '16px',
              textAlign: 'center',
              border: '4px solid #004f71',
              backgroundColor: '#ffffff',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              borderRadius: '6px',
              color: '#004f71',
              padding: '12px',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}
          />
        </motion.div>

        {/* Search Results and Keyboard */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Results Header */}
          <div className="bg-gradient-to-r from-[#004f71] to-[#00313c] rounded-lg p-2 mb-3 shadow-lg" style={{
            background: 'linear-gradient(to right, #004f71, #00313c)',
            borderRadius: '8px',
            padding: '8px',
            marginBottom: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}>
            <p className="text-sm text-white text-center" style={{
              fontSize: '14px',
              color: '#ffffff',
              textAlign: 'center',
              margin: 0,
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
              {searchQuery.trim() ? `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''}` : 'Results will appear here'}
            </p>
          </div>

          {/* Search Results */}
          <div className="mb-3 overflow-auto" style={{
            maxHeight: '180px',
            marginBottom: '12px',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}>
            {searchQuery.trim().length === 0 ? (
              <div className="text-center py-4" style={{
                textAlign: 'center',
                paddingTop: '16px',
                paddingBottom: '16px'
              }}>
                <p className="text-xs text-[#65665c]" style={{
                  fontSize: '12px',
                  color: '#65665c',
                  margin: 0,
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>Start typing to search</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-4" style={{
                textAlign: 'center',
                paddingTop: '16px',
                paddingBottom: '16px'
              }}>
                <div className="text-2xl mb-1" style={{
                  fontSize: '24px',
                  marginBottom: '4px',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>❌</div>
                <p className="text-xs text-[#65665c]" style={{
                  fontSize: '12px',
                  color: '#65665c',
                  margin: 0,
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>No results found</p>
              </div>
            ) : (
              <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {searchResults.map((room, index) => (
                  <motion.div
                    key={room.number}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      onClick={() =>
                        onNavigate('room-detail', {
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
                        })
                      }
                      className="p-3 bg-white border-2 border-[#789904] hover:border-[#ffb600] cursor-pointer hover:shadow-lg transition-all"
                      style={{
                        padding: '12px',
                        backgroundColor: '#ffffff',
                        border: '2px solid #789904',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <h3 className="text-sm text-[#004f71] mb-1" style={{
                        fontSize: '14px',
                        color: '#004f71',
                        marginBottom: '4px',
                        fontWeight: '600',
                        margin: '0 0 4px 0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                        {room.occupant || room.name}
                      </h3>
                      {room.occupant && room.name && (
                        <p className="text-xs text-[#65665c] mb-1" style={{
                          fontSize: '12px',
                          color: '#65665c',
                          marginBottom: '4px',
                          margin: '0 0 4px 0',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{room.name}</p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-[#65665c]" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        color: '#65665c',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                        <span className="bg-[#004f71] text-white px-2 py-0.5 rounded" style={{
                          backgroundColor: '#004f71',
                          color: '#ffffff',
                          paddingLeft: '8px',
                          paddingRight: '8px',
                          paddingTop: '2px',
                          paddingBottom: '2px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                        fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
                        }}>Room {room.number}</span>
                        <span className="bg-[#789904] text-white px-2 py-0.5 rounded" style={{
                          backgroundColor: '#789904',
                          color: '#ffffff',
                          paddingLeft: '8px',
                          paddingRight: '8px',
                          paddingTop: '2px',
                          paddingBottom: '2px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                        fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
                        }}>Floor {room.floor}</span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* On-Screen Keyboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-3 bg-gradient-to-br from-[#aca39a]/10 to-white border-4 border-[#65665c] shadow-xl" style={{
              padding: '12px',
              background: 'linear-gradient(to bottom right, rgba(172, 163, 154, 0.1), #ffffff)',
              border: '4px solid #65665c',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              borderRadius: '8px'
            }}>
              <div className="space-y-1.5" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {/* Keyboard Rows */}
                {keyboard.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex justify-center gap-1"
                    style={{
                      paddingLeft: rowIndex === 1 ? '15px' : rowIndex === 2 ? '15px' : '0',
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    {row.map((key) => (
                      <button
                        key={key}
                        onClick={() => handleKeyPress(key)}
                        className={`w-9 h-9 rounded text-sm transition-all shadow-md flex items-center justify-center
                          ${pressedKey === key
                            ? 'bg-[#ffb600] text-white scale-95 shadow-sm'
                            : 'bg-gradient-to-b from-white to-[#afa96e]/20 text-[#004f71] hover:bg-[#afa96e]/30 active:scale-95'
                          }
                          border-2 border-[#65665c]`}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          transition: 'all 0.15s',
                          boxShadow: pressedKey === key
                            ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: pressedKey === key
                            ? '#ffb600'
                            : 'linear-gradient(to bottom, #ffffff, rgba(175, 169, 110, 0.2))',
                          color: pressedKey === key ? '#ffffff' : '#004f71',
                          border: '2px solid #65665c',
                          cursor: 'pointer',
                          fontWeight: '600',
                          transform: pressedKey === key ? 'scale(0.95)' : 'scale(1)',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                ))}

                {/* Bottom Row - Space, Clear */}
                <div className="flex justify-center gap-2 mt-2" style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px'
                }}>
                  <button
                    onClick={handleClear}
                    className={`px-6 h-9 rounded text-sm transition-all shadow-md
                      ${pressedKey === 'Clear'
                        ? 'bg-[#dd8a03] scale-95 shadow-sm'
                        : 'bg-gradient-to-r from-[#e63f51] to-[#e63f51]/80 hover:from-[#e63f51]/90 hover:to-[#e63f51]/70 active:scale-95'
                      }
                      text-white border-2 border-[#e63f51]`}
                    style={{
                      paddingLeft: '24px',
                      paddingRight: '24px',
                      height: '36px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      transition: 'all 0.15s',
                      boxShadow: pressedKey === 'Clear'
                        ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      background: pressedKey === 'Clear'
                        ? '#dd8a03'
                        : 'linear-gradient(to right, #e63f51, rgba(230, 63, 81, 0.8))',
                      color: '#ffffff',
                      border: '2px solid #e63f51',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transform: pressedKey === 'Clear' ? 'scale(0.95)' : 'scale(1)',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleSpace}
                    className={`px-12 h-9 rounded text-sm transition-all shadow-md
                      ${pressedKey === 'Space'
                        ? 'bg-[#ffb600] scale-95 shadow-sm'
                        : 'bg-gradient-to-r from-[#789904] to-[#afa96e] hover:from-[#789904]/90 hover:to-[#afa96e]/90 active:scale-95'
                      }
                      text-white border-2 border-[#789904]`}
                    style={{
                      paddingLeft: '48px',
                      paddingRight: '48px',
                      height: '36px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      transition: 'all 0.15s',
                      boxShadow: pressedKey === 'Space'
                        ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      background: pressedKey === 'Space'
                        ? '#ffb600'
                        : 'linear-gradient(to right, #789904, #afa96e)',
                      color: '#ffffff',
                      border: '2px solid #789904',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transform: pressedKey === 'Space' ? 'scale(0.95)' : 'scale(1)',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}
                  >
                    Space
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
