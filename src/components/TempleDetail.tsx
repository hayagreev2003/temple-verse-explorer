
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Clock, Train, IndianRupee, Sparkles } from "lucide-react";

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

interface TempleDetailProps {
  temple: Temple;
  onBack: () => void;
}

export const TempleDetail = ({ temple, onBack }: TempleDetailProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Temples
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <Card className="overflow-hidden border-orange-200">
              <div className="aspect-video relative">
                <img 
                  src={temple.image} 
                  alt={temple.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop";
                  }}
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-orange-500 text-white text-sm px-3 py-1">
                    {temple.architectureStyle} Architecture
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Temple Information */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center">
                  <Sparkles className="h-6 w-6 mr-2 text-orange-500" />
                  About {temple.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {temple.significance}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3 text-orange-500" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm">{temple.location}, {temple.state}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3 text-orange-500" />
                    <div>
                      <p className="font-medium">Built</p>
                      <p className="text-sm">{temple.builtYear}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Festivals */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Major Festivals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {temple.festivals.map((festival, index) => (
                    <Badge key={index} variant="outline" className="border-orange-300 text-orange-700">
                      {festival}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Deity Info */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Temple Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Primary Deity</p>
                  <p className="text-xl font-bold text-orange-700">{temple.deity}</p>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-orange-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-orange-500" />
                      <span className="text-sm">Timings</span>
                    </div>
                    <span className="text-sm font-medium">{temple.timings}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <IndianRupee className="h-4 w-4 mr-2 text-orange-500" />
                      <span className="text-sm">Entry Fee</span>
                    </div>
                    <span className="text-sm font-medium">{temple.entryFee}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Train className="h-4 w-4 mr-2 text-orange-500" />
                      <span className="text-sm">Nearest Station</span>
                    </div>
                    <span className="text-sm font-medium">{temple.nearestStation}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-orange-200">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Get Directions
                  </Button>
                  <Button variant="outline" className="w-full border-orange-300 text-orange-700 hover:bg-orange-50">
                    Share Temple
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
