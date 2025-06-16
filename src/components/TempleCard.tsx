
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Camera } from "lucide-react";

interface Temple {
  id: number;
  name: string;
  location: string;
  state: string;
  deity: string;
  builtYear: string;
  architectureStyle: string;
  significance: string;
  image: string;
  timings: string;
  festivals: string[];
  nearestStation: string;
  entryFee: string;
}

interface TempleCardProps {
  temple: Temple;
  onClick: () => void;
}

export const TempleCard = ({ temple, onClick }: TempleCardProps) => {
  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border-orange-100 overflow-hidden"
      onClick={onClick}
    >
      <div className="aspect-video bg-gradient-to-br from-orange-100 to-amber-100 relative overflow-hidden">
        <img 
          src={temple.image} 
          alt={temple.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop";
          }}
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-orange-500 text-white">
            {temple.architectureStyle}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-1">
            {temple.name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="line-clamp-1">{temple.location}, {temple.state}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Deity:</span>
            <span className="font-medium text-orange-700">{temple.deity}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Built:</span>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1 text-gray-400" />
              <span className="font-medium">{temple.builtYear}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {temple.significance}
        </p>

        <div className="pt-2 border-t border-orange-50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Entry: {temple.entryFee}</span>
            <div className="flex items-center">
              <Camera className="h-3 w-3 mr-1" />
              <span>View Details</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
