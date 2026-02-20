import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Calendar, Phone, Sparkles, Map } from "lucide-react";

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
  const getGoogleMapsEmbedUrl = (location: string) => {
    const encodedLocation = encodeURIComponent(location);
    return `https://maps.google.com/maps?q=${encodedLocation}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  const hasGoogleMapsLocation = () => {
    return temple["Google maps Location"] &&
      temple["Google maps Location"] !== "NaN" &&
      temple["Google maps Location"] !== null;
  };

  const getLocationForMaps = () => {
    if (hasGoogleMapsLocation()) {
      return temple["Google maps Location"] as string;
    }
    return temple.Address;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
      <div className="border-b border-orange-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack} className="text-orange-700 hover:bg-orange-50 hover:text-orange-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Temples
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-slate-800">{temple.Name}</h1>
          <Badge className="bg-orange-500 text-white">{temple.State}</Badge>
          <Badge variant="secondary" className="bg-white text-slate-700 border border-orange-100">{temple.District}</Badge>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="overflow-hidden border-orange-200">
              <div className="relative aspect-video">
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
                {!hasGoogleMapsLocation() && (
                  <div className="absolute bottom-4 left-4 rounded-lg bg-black/70 px-3 py-2 text-sm text-white">
                    <Map className="mr-2 inline h-4 w-4" />
                    Using address for location
                  </div>
                )}
              </div>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-4">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="rounded-lg border border-orange-100 p-4">
                        <p className="text-sm text-slate-500">Location</p>
                        <p className="mt-1 text-slate-700">{temple.Address}</p>
                      </div>
                      <div className="rounded-lg border border-orange-100 p-4">
                        <p className="text-sm text-slate-500">Swayambhu</p>
                        <p className="mt-1 text-slate-700">{temple.Swayambhu === "Yes" ? "Yes" : "No"}</p>
                      </div>
                    </div>
                    {temple["Known For"] && (
                      <div className="rounded-lg border border-orange-100 p-4">
                        <p className="text-sm text-slate-500">Known For</p>
                        <p className="mt-1 text-slate-700">{temple["Known For"]}</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="history" className="mt-4">
                    <p className="leading-relaxed text-slate-700">{temple.History || "History details are not available."}</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">Temple Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 text-slate-700">
                  <MapPin className="mt-0.5 h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm text-slate-500">Village / Town / City</p>
                    <p className="font-medium">{temple["Village/Town/City"]}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-slate-700">
                  <Calendar className="mt-0.5 h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm text-slate-500">Swayambhu status</p>
                    <p className="font-medium">{temple.Swayambhu === "Yes" ? "Yes" : "No"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-slate-700">
                  <Phone className="mt-0.5 h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm text-slate-500">Contact</p>
                    <p className="font-medium">{temple["Contact Number"] || "Not available"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-white/80">
              <CardContent className="flex items-center gap-3 p-4 text-sm text-slate-700">
                <Sparkles className="h-4 w-4 text-orange-500" />
                Tip: check map details before planning your temple visit.
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
