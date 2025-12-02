import { motion } from 'motion/react';
import { Card } from './ui/card';
import { KioskHeader } from './KioskHeader';
import { useState, useEffect } from 'react';
import { getRoomDatabase } from '../data/roomDataLoader';

interface SearchResultsProps {
  query: { query: string };
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
  onHome: () => void;
  onWelcome: () => void;
  canGoBack: boolean;
}

export function SearchResults({ query, onNavigate, onBack, onHome, onWelcome, canGoBack }: SearchResultsProps) {
  const searchQuery = query.query.toLowerCase();
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load room database and search
  useEffect(() => {
    async function loadAndSearch() {
      const roomDatabase = await getRoomDatabase();
      
      // Search through room database for matching occupants
      const searchResults = Object.values(roomDatabase).filter((room) => {
        if (!room.occupant) return false;
        return room.occupant.toLowerCase().includes(searchQuery);
      });
      
      setResults(searchResults);
      setIsLoading(false);
    }
    loadAndSearch();
  }, [searchQuery]);

  return (
    <div className="size-full bg-gradient-to-br from-[#afa96e]/20 via-white to-[#aca39a]/10 flex flex-col" style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to bottom right, rgba(175, 169, 110, 0.2), white, rgba(172, 163, 154, 0.1))',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <KioskHeader
        title="Search Results"
        onBack={onBack}
        onHome={onHome}
        onWelcome={onWelcome}
        canGoBack={canGoBack}
      />

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-4" style={{
        flex: '1',
        overflowY: 'auto',
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '16px',
        paddingBottom: '16px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
          style={{ marginBottom: '24px' }}
        >
          <div className="bg-gradient-to-r from-[#004f71] to-[#00313c] rounded-lg p-4 text-center shadow-lg" style={{
            background: 'linear-gradient(to bottom right, #004f71, #00313c)',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <p className="text-xl text-white" style={{
              fontSize: '1.25rem',
              color: '#ffffff',
              fontWeight: '500',
              lineHeight: '1.75rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
              {results.length} result{results.length !== 1 ? 's' : ''} for "{query.query}"
            </p>
          </div>
        </motion.div>

        {results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center py-12"
            style={{
              textAlign: 'center',
              paddingTop: '48px',
              paddingBottom: '48px'
            }}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#afa96e] to-[#aca39a] flex items-center justify-center mx-auto mb-6 shadow-lg" style={{
              width: '128px',
              height: '128px',
              borderRadius: '50%',
              background: 'linear-gradient(to bottom right, #afa96e, #aca39a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '24px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <span className="text-6xl" style={{
                fontSize: '3.75rem',
                lineHeight: '1',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>❌</span>
            </div>
            <p className="text-2xl text-[#004f71] mb-3" style={{
              fontSize: '1.5rem',
              color: '#004f71',
              marginBottom: '12px',
              fontWeight: '600',
              lineHeight: '2rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>No results found</p>
            <p className="text-lg text-[#65665c]" style={{
              fontSize: '1.125rem',
              color: '#65665c',
              fontWeight: '400',
              lineHeight: '1.75rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>Try a different search term</p>
          </motion.div>
        ) : (
          <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {results.map((room, index) => (
              <motion.div
                key={room.number}
                initial={{ opacity: 0, y: 20 }}
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
                  className="p-6 bg-gradient-to-r from-white to-[#afa96e]/10 border-4 border-[#789904] hover:border-[#ffb600] cursor-pointer hover:shadow-2xl transition-all"
                  style={{
                    padding: '24px',
                    background: 'linear-gradient(to right, #ffffff, rgba(175, 169, 110, 0.1))',
                    border: '4px solid #789904',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <div className="flex items-center justify-between" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div className="flex-1" style={{ flex: '1' }}>
                      <h3 className="text-xl text-[#004f71] mb-2" style={{
                        fontSize: '1.25rem',
                        color: '#004f71',
                        marginBottom: '8px',
                        fontWeight: '600',
                        lineHeight: '1.75rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{room.occupant}</h3>
                      {room.department && (
                        <p className="text-base text-[#65665c] mb-2" style={{
                          fontSize: '1rem',
                          color: '#65665c',
                          marginBottom: '8px',
                          fontWeight: '400',
                          lineHeight: '1.5rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>{room.department}</p>
                      )}
                      <div className="flex items-center gap-3 text-sm text-[#aca39a]" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '0.875rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                        <span className="bg-[#004f71] text-white px-3 py-1 rounded" style={{
                          backgroundColor: '#004f71',
                          color: '#ffffff',
                          paddingLeft: '12px',
                          paddingRight: '12px',
                          paddingTop: '4px',
                          paddingBottom: '4px',
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                        fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
                        }}>Room {room.number}</span>
                        <span className="bg-[#789904] text-white px-3 py-1 rounded" style={{
                          backgroundColor: '#789904',
                          color: '#ffffff',
                          paddingLeft: '12px',
                          paddingRight: '12px',
                          paddingTop: '4px',
                          paddingBottom: '4px',
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                        fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'
                        }}>Floor {room.floor}</span>
                      </div>
                    </div>
                    <div className="text-[#ffb600] text-3xl ml-4" style={{
                      color: '#ffb600',
                      fontSize: '1.875rem',
                      marginLeft: '16px',
                      fontWeight: '600',
                      lineHeight: '2.25rem',
            fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif'}}>
                      →
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
