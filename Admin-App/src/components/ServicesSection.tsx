import { Card, CardContent } from "@/components/ui/card";
import { 
  Monitor, 
  Battery, 
  HardDrive, 
  ShieldCheck, 
  Database, 
  Wrench 
} from "lucide-react";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <Monitor className="w-8 h-8" />,
    title: "Screen Replacement",
    description: "Cracked or damaged screen? We replace LCD and LED screens for all laptop brands.",
  },
  {
    icon: <Battery className="w-8 h-8" />,
    title: "Battery Replacement",
    description: "Restore your laptop's battery life with genuine replacement batteries.",
  },
  {
    icon: <HardDrive className="w-8 h-8" />,
    title: "Hardware Upgrades",
    description: "RAM upgrades, SSD installations, and other hardware improvements.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Virus Removal",
    description: "Complete malware removal and security optimization for your system.",
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Data Recovery",
    description: "Professional data recovery from damaged or corrupted drives.",
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "General Repairs",
    description: "Keyboard fixes, charging port repairs, and comprehensive diagnostics.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20">
      <div className="container px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Repair <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional laptop repair services with quick turnaround times and quality guaranteed.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="group bg-card/30 border-border/50 hover:border-primary/50 hover:bg-card/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-semibold">{service.title}</h3>
                
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
