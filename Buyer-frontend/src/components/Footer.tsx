import { Laptop, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Laptop className="w-8 h-8 text-primary" />
              {/* Replace with your business name */}
              <span className="text-xl font-bold">Bobby's Refurbished PCs</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your trusted partner for quality laptops and expert repair services.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <a href="#products" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Featured Laptops
              </a>
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Repair Services
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact Us
              </a>
            </nav>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex gap-4">
              {/* Replace # with your social media links */}
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center text-muted-foreground text-sm">
          {/* Replace with your business name */}
          <p>© {currentYear} Bobby's refurbished PCs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
