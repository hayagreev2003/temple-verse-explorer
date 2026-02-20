import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, Map, Phone } from "lucide-react";

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
  const getGoogleMapsEmbedUrl = (location: string) => {
    const encodedLocation = encodeURIComponent(location);
    return `https://maps.google.com/maps?q=${encodedLocation}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  const hasGoogleMapsLocation = () => {
    return temple["Google maps Location"] && temple["Google maps Location"] !== "NaN" && temple["Google maps Location"] !== null;
  };

  const getLocationForMaps = () => {
    if (hasGoogleMapsLocation()) {
      return temple["Google maps Location"] as string;
    }
    return temple.Address;
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-orange-100/80 bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <iframe
          src={getGoogleMapsEmbedUrl(getLocationForMaps())}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
        />
        <div className="absolute right-3 top-3 flex gap-2">
          <Badge className="bg-white/90 text-slate-700">{temple.State}</Badge>
          <Badge className={temple.Swayambhu === "Yes" ? "bg-orange-500 text-white" : "bg-slate-600 text-white"}>
            {temple.Swayambhu === "Yes" ? "Swayambhu" : "Historic"}
          </Badge>
        </div>
        {!hasGoogleMapsLocation() && (
          <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
            <Map className="mr-1 inline h-3 w-3" />
            Using address for location
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-lg text-slate-800 transition-colors group-hover:text-orange-600">
          {temple.Name}
        </CardTitle>
        <div className="flex items-center text-sm text-slate-600">
          <MapPin className="mr-1 h-3.5 w-3.5" />
          <span className="line-clamp-1">{temple.Address}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 pt-0 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">District</span>
          <span className="font-medium text-orange-700">{temple.District}</span>
        </div>
        {temple["Known For"] && <p className="line-clamp-2 leading-relaxed text-slate-600">{temple["Known For"]}</p>}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-orange-50 pt-4 text-xs text-slate-500">
        <div className="line-clamp-1 flex items-center gap-1">
          <Phone className="h-3.5 w-3.5" />
          {temple["Contact Number"] || "No contact"}
        </div>
        <div className="flex items-center text-orange-600">
          <Camera className="mr-1 h-3.5 w-3.5" />
          View details
        </div>
      </CardFooter>
    </Card>
  );
};
