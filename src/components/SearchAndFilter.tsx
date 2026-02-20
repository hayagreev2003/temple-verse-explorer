import { useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SearchAndFilterProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (filters: { state: string; district: string; swayambhu: string }) => void;
}

export const SearchAndFilter = ({ onSearch, onFilter }: SearchAndFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    state: "all",
    district: "all",
    swayambhu: "all",
  });
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount = useMemo(
    () => Object.values(filters).filter((value) => value !== "all").length,
    [filters]
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = { state: "all", district: "all", swayambhu: "all" };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <Card className="border-orange-200/80 bg-white/80 shadow-lg backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base text-slate-800">Search & refine</CardTitle>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              {activeFilterCount} active
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search temples by name, location, or district..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-12 border-orange-200 pl-10 text-base focus-visible:ring-orange-300"
          />
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-orange-200 text-orange-700 hover:bg-orange-50"
          >
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          {activeFilterCount > 0 && (
            <Button variant="ghost" onClick={resetFilters} className="text-orange-600 hover:text-orange-700">
              Clear Filters
            </Button>
          )}
        </div>

        {showFilters && (
          <>
            <Separator className="bg-orange-100" />
            <div className="grid grid-cols-1 gap-4 pt-1 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">State</label>
                <Select value={filters.state} onValueChange={(value) => handleFilterChange("state", value)}>
                  <SelectTrigger className="border-orange-200">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="Telangana">Telangana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">District</label>
                <Select value={filters.district} onValueChange={(value) => handleFilterChange("district", value)}>
                  <SelectTrigger className="border-orange-200">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Districts</SelectItem>
                    <SelectItem value="Ranga Reddy">Ranga Reddy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Swayambhu</label>
                <Select value={filters.swayambhu} onValueChange={(value) => handleFilterChange("swayambhu", value)}>
                  <SelectTrigger className="border-orange-200">
                    <SelectValue placeholder="Select Swayambhu" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
