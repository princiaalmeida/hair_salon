import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Sparkles, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">About Elegance Salon</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Where beauty meets artistry, and every visit is an experience in luxury
            </p>
          </div>

          {/* Our Story */}
          <div className="max-w-4xl mx-auto mb-20">
            <Card className="shadow-soft">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2010, Elegance Salon has been at the forefront of beauty innovation for over a decade. 
                    What started as a small boutique salon has grown into a premier destination for those seeking 
                    exceptional beauty services in an atmosphere of refined luxury.
                  </p>
                  <p>
                    Our journey has been guided by a simple yet powerful philosophy: every client deserves to feel 
                    beautiful, confident, and pampered. We've built our reputation on combining expert technical 
                    skills with genuine care and attention to detail.
                  </p>
                  <p>
                    Today, we're proud to be recognized as one of the leading salons in the region, trusted by 
                    thousands of clients who return to us time and again for our exceptional service and warm, 
                    welcoming atmosphere.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Our Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center shadow-soft hover:shadow-elegant transition-smooth">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                  <p className="text-muted-foreground">
                    We strive for perfection in every service we provide
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft hover:shadow-elegant transition-smooth">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Passion</h3>
                  <p className="text-muted-foreground">
                    Our love for beauty drives everything we do
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft hover:shadow-elegant transition-smooth">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    Always staying ahead with the latest trends and techniques
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-soft hover:shadow-elegant transition-smooth">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-muted-foreground">
                    Building lasting relationships with our clients
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Our Team */}
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-soft">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6">Our Expert Team</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our team of certified beauty professionals brings together decades of combined experience. 
                  Each member is carefully selected not just for their technical expertise, but for their 
                  dedication to making every client feel special.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We invest heavily in ongoing training and education, ensuring our team stays current with 
                  the latest techniques, trends, and product innovations. When you visit Elegance Salon, 
                  you're in the hands of true beauty artists who are passionate about their craft.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">15+</div>
                    <p className="text-muted-foreground">Expert Stylists</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                    <p className="text-muted-foreground">Happy Clients</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">13</div>
                    <p className="text-muted-foreground">Years of Excellence</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
