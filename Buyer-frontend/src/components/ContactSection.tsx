import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send
} from "lucide-react";
import ContactCard from "./contactForm";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions? Ready to purchase or book a repair? Contact us today!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    
                    <p className="text-muted-foreground text-sm">(+27)60 443 5742</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    {/* Replace with your email */}
                    <p className="text-muted-foreground text-sm">mtloungfellang@gmail.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    {/* Replace with your address */}
                    <p className="text-muted-foreground text-sm">344 Francis Baard Street,  
                      E and T container market,
                      Shop 66, City, 1234</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Hours</h4>
                    {/* Replace with your hours */}
                    <p className="text-muted-foreground text-sm">Mon-Fri: 8am - 7pm<br />Sat-Sun: 9am - 7pm</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-0">
                <iframe
                src="https://www.google.com/maps/embed?pb=https://maps.app.goo.gl/71FDPgRzaBpBjWz47"
                className="w-full h-64 rounded-lg border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                />
              </CardContent>
          </Card>
          </div>

          {/* Contact form */}
            <ContactCard/>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
