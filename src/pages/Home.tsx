import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Clock, Award, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-salon.jpg";
import haircutImage from "@/assets/service-haircut.jpg";
import facialImage from "@/assets/service-facial.jpg";
import spaImage from "@/assets/service-spa.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Elegant salon interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Experience
              <span className="block bg-gradient-to-r from-primary to-rose-gold-light bg-clip-text text-transparent">
                True Elegance
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Transform your beauty with our premium salon services. Expert stylists, luxury treatments, and personalized care await you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/booking">
                <Button size="lg" className="shadow-elegant">
                  Book Appointment
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg">Experience excellence in every service</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center shadow-soft hover:shadow-elegant transition-smooth border-border/50">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Stylists</h3>
                <p className="text-muted-foreground">
                  Certified professionals with years of experience
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-elegant transition-smooth border-border/50">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Products</h3>
                <p className="text-muted-foreground">
                  Only the finest beauty and hair care products
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-elegant transition-smooth border-border/50">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
                <p className="text-muted-foreground">
                  Convenient scheduling to fit your lifestyle
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-elegant transition-smooth border-border/50">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personal Care</h3>
                <p className="text-muted-foreground">
                  Customized treatments for your unique needs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground text-lg">Discover our range of luxury treatments</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="overflow-hidden group shadow-soft hover:shadow-elegant transition-smooth">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={haircutImage} 
                  alt="Haircut services" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-2">Haircuts & Styling</h3>
                <p className="text-muted-foreground mb-4">
                  Expert cuts and styling tailored to your unique features
                </p>
                <p className="text-primary font-semibold">Starting from $45</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group shadow-soft hover:shadow-elegant transition-smooth">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={facialImage} 
                  alt="Facial treatments" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-2">Facial Treatments</h3>
                <p className="text-muted-foreground mb-4">
                  Rejuvenating facials for radiant, healthy skin
                </p>
                <p className="text-primary font-semibold">Starting from $60</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group shadow-soft hover:shadow-elegant transition-smooth">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={spaImage} 
                  alt="Spa services" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-2">Spa & Relaxation</h3>
                <p className="text-muted-foreground mb-4">
                  Complete wellness packages for total relaxation
                </p>
                <p className="text-primary font-semibold">Starting from $75</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button size="lg">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-background/10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4">Ready for Your Transformation?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience the elegance difference
          </p>
          <Link to="/booking">
            <Button size="lg" variant="secondary" className="shadow-elegant">
              Book Your Appointment
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
