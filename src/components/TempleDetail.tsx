import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Clock, Train, IndianRupee, Sparkles } from "lucide-react";

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
              <div className="aspect-video relative bg-gradient-to-br from-orange-100 to-amber-100">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl text-orange-300">🕍</span>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-orange-500 text-white text-sm px-3 py-1">
                    {temple.State}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Temple Information */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center">
                  <Sparkles className="h-6 w-6 mr-2 text-orange-500" />
                  About {temple.Name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {temple.History && (
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {temple.History}
                  </p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3 text-orange-500" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm">{temple.Address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3 text-orange-500" />
                    <div>
                      <p className="font-medium">Swayambhu</p>
                      <p className="text-sm">{temple.Swayambhu === "Yes" ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {temple["Known For"] && (
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Known For</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{temple["Known For"]}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Temple Details */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Temple Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">District</p>
                  <p className="text-xl font-bold text-orange-700">{temple.District}</p>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-orange-100">
                  {temple["Contact Number"] && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-orange-500" />
                        <span className="text-sm">Contact</span>
                      </div>
                      <span className="text-sm font-medium">{temple["Contact Number"]}</span>
                    </div>
                  )}
                  
                  {temple["Village/Town/City"] && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                        <span className="text-sm">Village/Town/City</span>
                      </div>
                      <span className="text-sm font-medium">{temple["Village/Town/City"]}</span>
                    </div>
                  )}
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
