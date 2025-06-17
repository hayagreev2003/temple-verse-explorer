import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Camera, Contact } from "lucide-react";

interface Temple {
  id: number;
  Name: string;
  Swayambhu: string | number;
  "Village/Town/City": string | number;
  Address: string;
  District: string;
  State: string;
  "Known For": string | number;
  "Google maps Location": string | number;
  "Contact Number": string | number;
  History: string | number;
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
      {/* <div className="aspect-video bg-gradient-to-br from-orange-100 to-amber-100 relative overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-4xl text-orange-300">🕍</span>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-orange-500 text-white">
            {temple.State}
          </Badge>
        </div>
      </div> */}
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-1">
            {temple.Name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="line-clamp-1">{temple.Address}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">District:</span>
            <span className="font-medium text-orange-700">{temple.District}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Swayambhu:</span>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1 text-gray-400" />
              <span className="font-medium">{temple.Swayambhu === "Yes" ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>

        {temple["Known For"] && (
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {temple["Known For"]}
          </p>
        )}

        <div className="pt-2 border-t border-orange-50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            {temple["Contact Number"] && (
              <span>Contact: {temple["Contact Number"]}</span>
            )}
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
