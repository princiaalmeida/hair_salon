import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import haircutImage from "@/assets/service-haircut.jpg";
import facialImage from "@/assets/service-facial.jpg";
import spaImage from "@/assets/service-spa.jpg";
import stylingImage from "@/assets/service-styling.jpg";

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration_minutes: number;
}

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("category", { ascending: true })
        .order("price", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      toast.error("Failed to load services");
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryImage = (category: string) => {
    switch (category) {
      case "haircut":
        return haircutImage;
      case "facial":
        return facialImage;
      case "spa":
        return spaImage;
      case "styling":
        return stylingImage;
      default:
        return haircutImage;
    }
  };

  const categories = ["all", ...new Set(services.map(s => s.category))];
  const filteredServices = (category: string) =>
    category === "all" ? services : services.filter(s => s.category === category);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <p className="text-muted-foreground">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of beauty and wellness treatments
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-5 mb-12">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="haircut">Haircut</TabsTrigger>
              <TabsTrigger value="facial">Facial</TabsTrigger>
              <TabsTrigger value="spa">Spa</TabsTrigger>
              <TabsTrigger value="styling">Styling</TabsTrigger>
            </TabsList>

            {categories.map(category => (
              <TabsContent key={category} value={category} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices(category).map(service => (
                    <Card key={service.id} className="overflow-hidden shadow-soft hover:shadow-elegant transition-smooth">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={getCategoryImage(service.category)}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-4 right-4 bg-primary">
                          {service.category}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-semibold mb-2">{service.name}</h3>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{service.duration_minutes} min</span>
                          </div>
                          <div className="text-2xl font-bold text-primary">
                            ${service.price.toFixed(2)}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button
                          className="w-full"
                          onClick={() => navigate("/booking", { state: { serviceId: service.id } })}
                        >
                          Book Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
