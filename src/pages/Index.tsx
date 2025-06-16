
import { useState } from "react";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { TempleCard } from "@/components/TempleCard";
import { TempleDetail } from "@/components/TempleDetail";
import { sampleTemples } from "@/data/temples";

const Index = () => {
  const [filteredTemples, setFilteredTemples] = useState(sampleTemples);
  const [selectedTemple, setSelectedTemple] = useState(null);

  const handleSearch = (searchTerm: string) => {
    const filtered = sampleTemples.filter(temple =>
      temple.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      temple.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      temple.deity.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTemples(filtered);
  };

  const handleFilter = (filters: any) => {
    let filtered = sampleTemples;

    if (filters.state && filters.state !== 'all') {
      filtered = filtered.filter(temple => temple.state === filters.state);
    }

    if (filters.deity && filters.deity !== 'all') {
      filtered = filtered.filter(temple => temple.deity === filters.deity);
    }

    if (filters.architecture && filters.architecture !== 'all') {
      filtered = filtered.filter(temple => temple.architectureStyle === filters.architecture);
    }

    setFilteredTemples(filtered);
  };

  if (selectedTemple) {
    return (
      <TempleDetail 
        temple={selectedTemple} 
        onBack={() => setSelectedTemple(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
            Sacred Temples of India
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Discover the rich heritage and spiritual significance of ancient temples across India
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-8">
        <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
      </div>

      {/* Temple Grid */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemples.map((temple) => (
            <TempleCard 
              key={temple.id} 
              temple={temple} 
              onClick={() => setSelectedTemple(temple)}
            />
          ))}
        </div>
        
        {filteredTemples.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No temples found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
