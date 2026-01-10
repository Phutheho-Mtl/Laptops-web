import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ImagesUploader from "@/components/ImageUploader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";

const Index = () => {
  const [Imageurl,setImageurl]=useState<string|null>(null)
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ImagesUploader value={Imageurl} setter={setImageurl}/>
      <FeaturedProducts />
      <ServicesSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
