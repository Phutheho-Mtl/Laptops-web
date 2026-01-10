import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Laptop, MessageCircle } from "lucide-react";
import SupabaseClient from "../Client_apis/Supabase_client";
import { Toaster} from "@/components/ui/sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState,useEffect } from "react";

interface Product {
  laptop_id: number;
  laptop_name: string;
  brand: string;
  laptop_condition: "used" | "refurbished" | "New";
  specifications: string;
  laptop_price: string;
  image1_url:string,
  image2_url:string,
  image3_url:string|null,
  available_quantity:number
}



const FeaturedProducts = () => {
  const [laptops, setLaptops]=useState<Product[]>([]);
  const [isLoading,setIsLoading]=useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [open, setOpen]=useState(false);

useEffect(()=>{
  const Fetchproducts=async()=>{

    setIsLoading(true)

    try {

      const {data,error :FetchError}=await SupabaseClient
      .from<Product>('laptops') //Instead of casting we can tell typescipt to infer to products
      .select('*') 
      
      if(FetchError){
        alert(`THE WAS AN ERROR WHILE FETCHING PCS`)
        throw new Error(`Error message : ${FetchError.message}`)
      }

      
      setLaptops(data)
      setIsLoading(false)//or we continue loading and stop when laptops have been set
    } catch (error) {
      alert(`ERROR FETCHING`)
      throw new Error(`Fetching failed : ${error.message}`)
      
    }


  };

  Fetchproducts();

},[])
  



  const statusStyles: Record<string, string> = {
  new: "bg-green-500/10 text-green-600 border-green-500/30",
  refurbished: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  used: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
};

 



//if loading insert a spinner on this component else load it 

if(isLoading) return <Toaster/>


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
          {laptops.map((product, index) => (
            <Card
  key={product.laptop_id}
  className="group bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
>
  <CardContent className="p-0">
    {/* Cover image */}
    <img
      src={product.image1_url}
      alt={product.laptop_name}
      className="w-full aspect-[4/3] object-cover rounded-t-lg"
    />

    <div className="p-6 space-y-4">
      <div>
        <p className="text-sm text-primary font-medium">{product.brand}</p>
        <h3 className="text-xl font-semibold">{product.laptop_name}</h3>
      </div>

      <p className="text-sm text-muted-foreground">{product.specifications}</p>

      {/* Price + Status + Button */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-2xl font-bold text-primary">
          {product.laptop_price}
        </span>

        <div className="flex items-center gap-3">
          {/* Status badge */}
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full border capitalize ${
              statusStyles[product.laptop_condition]
            }`}
          >
            {product.laptop_condition}
          </span>

          <Button size="sm" className="gap-2" onClick={() => {
  setSelectedProduct(product);
  setActiveImage(0); // reset image index
}}>
  <MessageCircle className="w-4 h-4" />
  View
</Button>
        </div>
      </div>
    </div>
  </CardContent>

  {/* Modal */}
  
<Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
  {selectedProduct && (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3">
          {selectedProduct.laptop_name}
          <span
            className={`flex items-center px-4 py-2 text-sm font-semibold rounded-md border capitalize ${
              statusStyles[selectedProduct.laptop_condition]
            }`}
          >
            {selectedProduct.laptop_condition}
          </span>
        </DialogTitle>
      </DialogHeader>

      {/* Build images array from separate DB fields */}
      {(() => {
        const images = [
          selectedProduct.image1_url,
          selectedProduct.image2_url,
          selectedProduct.image3_url ?? selectedProduct.image1_url,
        ];

        return (
          <>
            <img
              src={images[activeImage]}
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />

            <div className="flex gap-3 mt-4">
              {images.map((img, idx) => (
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
          </>
        );
      })()}
    </DialogContent>
  )}
</Dialog>

</Card>


          ))}
        </div>
      </div>
    </section>
  );


 
};

export default FeaturedProducts;


