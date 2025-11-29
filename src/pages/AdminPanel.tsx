import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { format } from "date-fns";
import { Calendar, Users, DollarSign } from "lucide-react";

interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  profiles: {
    full_name: string;
  };
  services: {
    name: string;
    price: number;
  };
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (!roles) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/dashboard");
        return;
      }

      setIsAdmin(true);
      fetchAppointments();
    } catch (error) {
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select(`
          id,
          appointment_date,
          appointment_time,
          status,
          user_id,
          services (
            name,
            price
          )
        `)
        .order("appointment_date", { ascending: true })
        .order("appointment_time", { ascending: true });

      if (error) throw error;
      
      // Fetch user profiles separately
      const appointmentsWithProfiles = await Promise.all(
        (data || []).map(async (apt) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", apt.user_id)
            .single();
          
          return {
            ...apt,
            profiles: { full_name: profile?.full_name || "Unknown" }
          };
        })
      );
      
      setAppointments(appointmentsWithProfiles);
    } catch (error: any) {
      toast.error("Failed to load appointments");
    }
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast.success("Appointment status updated");
      fetchAppointments();
    } catch (error: any) {
      toast.error("Failed to update appointment");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const stats = {
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter(a => a.status === "pending").length,
    revenue: appointments
      .filter(a => a.status === "completed")
      .reduce((sum, a) => sum + Number(a.services.price), 0),
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Appointments</p>
                    <p className="text-3xl font-bold">{stats.totalAppointments}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Pending</p>
                    <p className="text-3xl font-bold">{stats.pendingAppointments}</p>
                  </div>
                  <Users className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Revenue (Completed)</p>
                    <p className="text-3xl font-bold">${stats.revenue.toFixed(2)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointments */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>All Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                {["all", "pending", "confirmed", "completed"].map(tab => (
                  <TabsContent key={tab} value={tab}>
                    <div className="space-y-4">
                      {appointments
                        .filter(a => tab === "all" || a.status === tab)
                        .map((appointment) => (
                          <Card key={appointment.id} className="shadow-soft">
                            <CardContent className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                                <div>
                                  <p className="font-semibold">{appointment.profiles.full_name}</p>
                                  <p className="text-sm text-muted-foreground">{appointment.services.name}</p>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {format(new Date(appointment.appointment_date), "MMM d, yyyy")}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {appointment.appointment_time}
                                </div>
                                <div className="text-primary font-semibold">
                                  ${appointment.services.price}
                                </div>
                                <div className="flex gap-2 items-center justify-end">
                                  <Badge className={getStatusColor(appointment.status)}>
                                    {appointment.status}
                                  </Badge>
                                  {appointment.status === "pending" && (
                                    <Button
                                      size="sm"
                                      onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                                    >
                                      Confirm
                                    </Button>
                                  )}
                                  {appointment.status === "confirmed" && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateAppointmentStatus(appointment.id, "completed")}
                                    >
                                      Complete
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
