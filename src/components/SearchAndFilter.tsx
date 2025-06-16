
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface SearchAndFilterProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (filters: any) => void;
}

export const SearchAndFilter = ({ onSearch, onFilter }: SearchAndFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    state: 'all',
    deity: 'all',
    architecture: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

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
    const resetFilters = { state: 'all', deity: 'all', architecture: 'all' };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search temples by name, location, or deity..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-12 text-lg border-orange-200 focus:border-orange-400"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-orange-200 text-orange-700 hover:bg-orange-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          
          {(filters.state !== 'all' || filters.deity !== 'all' || filters.architecture !== 'all') && (
            <Button
              variant="ghost"
              onClick={resetFilters}
              className="text-orange-600 hover:text-orange-700"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-orange-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <Select value={filters.state} onValueChange={(value) => handleFilterChange('state', value)}>
                <SelectTrigger className="border-orange-200">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                  <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="Odisha">Odisha</SelectItem>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deity</label>
              <Select value={filters.deity} onValueChange={(value) => handleFilterChange('deity', value)}>
                <SelectTrigger className="border-orange-200">
                  <SelectValue placeholder="Select Deity" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Deities</SelectItem>
                  <SelectItem value="Lord Shiva">Lord Shiva</SelectItem>
                  <SelectItem value="Lord Vishnu">Lord Vishnu</SelectItem>
                  <SelectItem value="Goddess Parvati">Goddess Parvati</SelectItem>
                  <SelectItem value="Lord Jagannath">Lord Jagannath</SelectItem>
                  <SelectItem value="Lord Krishna">Lord Krishna</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Architecture</label>
              <Select value={filters.architecture} onValueChange={(value) => handleFilterChange('architecture', value)}>
                <SelectTrigger className="border-orange-200">
                  <SelectValue placeholder="Select Architecture" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Styles</SelectItem>
                  <SelectItem value="Dravidian">Dravidian</SelectItem>
                  <SelectItem value="Rajput">Rajput</SelectItem>
                  <SelectItem value="Kalinga">Kalinga</SelectItem>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
