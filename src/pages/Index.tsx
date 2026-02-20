import { useMemo, useState } from "react";
import { MapPinned, Sparkles, Landmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { TempleCard } from "@/components/TempleCard";
import { TempleDetail } from "@/components/TempleDetail";
import { sampleTemples } from "@/data/temples";

const Index = () => {
  const [filteredTemples, setFilteredTemples] = useState(sampleTemples);
  const [selectedTemple, setSelectedTemple] = useState(null);

  const stats = useMemo(() => {
    const districts = new Set(sampleTemples.map((temple) => temple.District)).size;
    const swayambhuTemples = sampleTemples.filter((temple) => temple.Swayambhu === "Yes").length;

    return {
      totalTemples: sampleTemples.length,
      districts,
      swayambhuTemples,
    };
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filtered = sampleTemples.filter((temple) =>
      temple.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      temple.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      temple.District.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTemples(filtered);
  };

  type TempleFilters = { state: string; district: string; swayambhu: string };

  const handleFilter = (filters: TempleFilters) => {
    let filtered = sampleTemples;

    if (filters.state && filters.state !== "all") {
      filtered = filtered.filter((temple) => temple.State === filters.state);
    }

    if (filters.district && filters.district !== "all") {
      filtered = filtered.filter((temple) => temple.District === filters.district);
    }

    if (filters.swayambhu && filters.swayambhu !== "all") {
      filtered = filtered.filter((temple) => temple.Swayambhu === filters.swayambhu);
    }

    setFilteredTemples(filtered);
  };

  if (selectedTemple) {
    return <TempleDetail temple={selectedTemple} onBack={() => setSelectedTemple(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
      <div className="border-b border-orange-100/70 bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 py-10">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
              <Sparkles className="mr-1 h-3.5 w-3.5" /> Curated spiritual destinations
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-800 md:text-5xl">
              Sacred Temples of India
            </h1>
            <p className="text-base text-slate-600 md:text-lg">
              Discover timeless architecture, rich traditions, and divine stories behind ancient temples.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="border-orange-100 bg-white/70">
              <CardContent className="flex items-center gap-3 p-4">
                <Landmark className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-xs text-slate-500">Temples Listed</p>
                  <p className="text-xl font-semibold text-slate-800">{stats.totalTemples}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-orange-100 bg-white/70">
              <CardContent className="flex items-center gap-3 p-4">
                <MapPinned className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-xs text-slate-500">Districts Covered</p>
                  <p className="text-xl font-semibold text-slate-800">{stats.districts}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-orange-100 bg-white/70">
              <CardContent className="flex items-center gap-3 p-4">
                <Sparkles className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-xs text-slate-500">Swayambhu Temples</p>
                  <p className="text-xl font-semibold text-slate-800">{stats.swayambhuTemples}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">Explore temples</h2>
          <Badge variant="secondary" className="bg-white text-slate-600 border border-orange-100">
            {filteredTemples.length} results
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTemples.map((temple) => (
            <TempleCard key={temple.id} temple={temple} onClick={() => setSelectedTemple(temple)} />
          ))}
        </div>

        {filteredTemples.length === 0 && (
          <Card className="mt-6 border-dashed border-orange-200 bg-white/70">
            <CardContent className="py-12 text-center text-slate-600">
              No temples found matching your criteria.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
