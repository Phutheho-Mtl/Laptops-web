import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Laptop, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  brand: string;
  status: "used" | "refurbished" | "New";
  specs: string;
  price: string;
  images:string[];
}




const products: Product[] = [
  {
    id: 1,
    name: "Inspiron 16-5630",
    brand: "Dell",
    status : "used",
    specs: "Intel i5 11th Gen, 16GB RAM, 512GB SSD",
    price: "R6 000",
    images:[
      "/public/laptop-images/Hp-Corei5-4500-im1.jpeg",
      "/public/laptop-images/Hp-Corei5-4500-im2.jpeg",
      "/public/laptop-images/Hp-Corei5-4500-im3.jpeg",
    ]
  },
  {
    id: 2,
    name: "ThinkPad E14",
    brand: "Lenovo",
    status: "used",
    specs: "Intel i7, 16GB RAM, 512GB SSD",
    price: "R15,499",
    images:[
      "/public/laptop-images/Halaand.jpg",
      "/public/laptop-images/khusa45.jpg",
      "/public/laptop-images/Halaand.jpg",
    ]
  },
  {
    id: 3,
    name: "Latitude 5520",
    brand: "Dell",
    status : "used",
    specs: "Intel i5, 8GB RAM, 256GB SSD",
    price: "R10,999",
    images:[
      "/public/laptop-images/Halaand.jpg",
      "/public/laptop-images/khusa45.jpg",
      "/public/laptop-images/Halaand.jpg",
    ]
  },
  {
    id: 4,
    name: "VivoBook 15",
    brand: "ASUS",
    status :"used",
    specs: "AMD Ryzen 5, 8GB RAM, 512GB SSD",
    price: "R9,499",
    images:[
      "/public/laptop-images/Halaand.jpg",
      "/public/laptop-images/khusa45.jpg",
      "/public/laptop-images/Halaand.jpg",
    ]
  },
  {
    id: 5,
    name: "Aspire 5",
    brand: "Acer",
    status : "refurbished",
    specs: "Intel i5, 8GB RAM, 256GB SSD",
    price: "R8,999",
    images:[
      "/public/laptop-images/Halaand.jpg",
      "/public/laptop-images/khusa45.jpg",
      "/public/laptop-images/Halaand.jpg",
    ]
  },
  {
    id: 6,
    name: "MacBook Air M1",
    brand: "Apple",
    status :"New",
    specs: "M1 Chip, 8GB RAM, 256GB SSD",
    price: "R18,999",
    images:[
      "/public/laptop-images/Halaand.jpg",
      "/public/laptop-images/khusa45.jpg",
      "/public/laptop-images/Halaand.jpg",
    ]
  },
];

const FeaturedProducts = () => {

  const statusStyles: Record<string, string> = {
  new: "bg-green-500/10 text-green-600 border-green-500/30",
  refurbished: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  used: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
};

  const [open, setOpen] = useState(false);
const [activeImage, setActiveImage] = useState(0);
  return (
    <section id="products" className="py-20 bg-secondary/30">
      <div className="container px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured <span className="text-gradient">Laptops</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our selection of quality laptops. Contact us for current availability and pricing.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card
  key={product.id}
  className="group bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
>
  <CardContent className="p-0">
    {/* Cover image */}
    <img
      src={product.images[0]}
      alt={product.name}
      className="w-full aspect-[4/3] object-cover rounded-t-lg"
    />

    <div className="p-6 space-y-4">
      <div>
        <p className="text-sm text-primary font-medium">{product.brand}</p>
        <h3 className="text-xl font-semibold">{product.name}</h3>
      </div>

      <p className="text-sm text-muted-foreground">{product.specs}</p>

      {/* Price + Status + Button */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-2xl font-bold text-primary">
          {product.price}
        </span>

        <div className="flex items-center gap-3">
          {/* Status badge */}
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full border capitalize ${
              statusStyles[product.status]
            }`}
          >
            {product.status}
          </span>

          <Button size="sm" className="gap-2" onClick={() => setOpen(true)}>
            <MessageCircle className="w-4 h-4" />
            View
          </Button>
        </div>
      </div>
    </div>
  </CardContent>

  {/* Modal */}
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3">
          {product.name}
          <span
    className={`flex items-center px-4 py-2 text-sm font-semibold rounded-md border capitalize ${
      statusStyles[product.status]
    }`}
  >
    {product.status}
  </span>
        </DialogTitle>
      </DialogHeader>

      <img
        src={product.images[activeImage]}
        className="w-full aspect-[4/3] object-cover rounded-lg"
      />

      <div className="flex gap-3 mt-4">
        {product.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            onClick={() => setActiveImage(idx)}
            className={`w-20 h-16 object-cover rounded cursor-pointer border ${
              idx === activeImage ? "border-primary" : "border-border"
            }`}
          />
        ))}
      </div>
    </DialogContent>
  </Dialog>
</Card>


          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
