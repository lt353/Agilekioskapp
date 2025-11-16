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
    <div className="size-full bg-gradient-to-br from-[#afa96e]/20 via-white to-[#aca39a]/10 flex flex-col">
      {/* Header */}
      <KioskHeader 
        title="Search Results" 
        onBack={onBack} 
        onHome={onHome}
        onWelcome={onWelcome}
        canGoBack={canGoBack}
      />

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-r from-[#004f71] to-[#00313c] rounded-lg p-4 text-center shadow-lg">
            <p className="text-xl text-white">
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
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#afa96e] to-[#aca39a] flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-6xl">❌</span>
            </div>
            <p className="text-2xl text-[#004f71] mb-3">No results found</p>
            <p className="text-lg text-[#65665c]">Try a different search term</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
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
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl text-[#004f71] mb-2">{room.occupant}</h3>
                      {room.department && (
                        <p className="text-base text-[#65665c] mb-2">{room.department}</p>
                      )}
                      <div className="flex items-center gap-3 text-sm text-[#aca39a]">
                        <span className="bg-[#004f71] text-white px-3 py-1 rounded">Room {room.number}</span>
                        <span className="bg-[#789904] text-white px-3 py-1 rounded">Floor {room.floor}</span>
                      </div>
                    </div>
                    <div className="text-[#ffb600] text-3xl ml-4">
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
