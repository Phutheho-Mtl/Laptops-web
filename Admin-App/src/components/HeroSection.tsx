import { Button } from "@/components/ui/button";
import { Monitor } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/10 text-white animate-fade-in">
  <Monitor className="w-6 h-6" />
  <span className="text-3xl md:text-4xl font-extrabold tracking-tight">
    Bobby&apos;s Refurbished PCs
  </span>
</div>



            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Premium Laptop{" "}
              <span className="text-gradient">Sales & Repair</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Your trusted partner for quality laptops and expert repair services. 
              We bring technology to life with professional care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <a href="#products">
              <Button size="lg" className="glow-hover transition-all duration-300">
                View Our Laptops
              </Button>
              </a>
              <a href="#contact">
  <Button
    size="lg"
    variant="outline"
    className="border-primary/50 hover:bg-primary/10"
  >
    Contact Us
  </Button>
</a>
            </div>
          </div>

          {/* Hero image placeholder */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.4s" }}>
  <div className="relative aspect-square max-w-lg mx-auto">
    {/* Glow effect */}
    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />

    {/* Placeholder frame */}
    <div className="relative z-10 w-full h-full rounded-2xl border border-primary/30 bg-card/50 backdrop-blur flex items-center justify-center overflow-hidden">
      
      {/* Image INSIDE the placeholder */}
      <img
        src="/laptop-images/khusa45.jpg"
        alt="Laptop"
        className="w-full h-full object-contain"
      />

      {/* Optional fallback (only if no image) */}
      {false && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <Monitor className="w-24 h-24 mx-auto text-primary mb-4" />
            <p className="text-muted-foreground text-sm">
              Hero Image Placeholder
              <br />
              <span className="text-xs">(Replace with your laptop image)</span>
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
