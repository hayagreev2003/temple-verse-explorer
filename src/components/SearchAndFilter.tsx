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
    district: 'all',
    swayambhu: 'all'
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
    const resetFilters = { state: 'all', district: 'all', swayambhu: 'all' };
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
            placeholder="Search temples by name, location, or district..."
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
          
          {(filters.state !== 'all' || filters.district !== 'all' || filters.swayambhu !== 'all') && (
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
                  <SelectItem value="Telangana">Telangana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
              <Select value={filters.district} onValueChange={(value) => handleFilterChange('district', value)}>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Swayambhu</label>
              <Select value={filters.swayambhu} onValueChange={(value) => handleFilterChange('swayambhu', value)}>
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
        )}
      </div>
    </Card>
  );
};
