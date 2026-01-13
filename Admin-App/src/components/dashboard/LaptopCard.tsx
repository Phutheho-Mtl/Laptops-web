import SupabaseClient from "@/Client_apis/Supabase_client"
import { useState } from "react";
import { Check, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export type Product = {
  laptop_id: number;
  laptop_name: string;
  brand: string;
  laptop_condition: "Used" | "Refurbished" | "New";
  specifications: string;
  laptop_price: string;
  image1_url:string,
  image2_url:string,
  image3_url:string|null,
  available_quantity:number
};

interface LaptopProductCardProps {
  laptop: Product;
  onDeleteSuccess?: () => void;
}

const conditionStyles = {
  "Brand New": "bg-green-500/10 text-green-600 border-green-500/20",
  Refurbished: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Used: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
};

const LaptopProductCard = ({ laptop, onDeleteSuccess }: LaptopProductCardProps) => {
  const [onDelete, setOnDelete] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const images=[
    laptop.image1_url,
    laptop.image2_url,
    laptop.image3_url,
  ].filter(Boolean) as string[];

  const handleDelete = async () => {
    setOnDelete(true);
    try {
      if (laptop.laptop_id) {
  const { data, error } = await SupabaseClient
    .from("laptops")
    .delete()
    .eq("laptop_id", laptop.laptop_id);

  if (error) {
    toast.error("Error deleting laptop record");
    return;
  }

  // remove uploaded images (e.g. 3 images stored under laptop-images/{id}/filename)
  const pathsToDelete = [
    laptop.image1_url,
    laptop.image2_url,
    laptop.image3_url ? laptop.image3_url : null,
  ].filter(Boolean); // removes null if no 3rd image

  const { error: storageError } = await SupabaseClient
    .storage
    .from("Laptops-Images")
    .remove(pathsToDelete);

  if (storageError) {
    toast.error("Deleted DB entry but failed to delete images");
  } else {
    toast.success("Laptop deleted & images removed!");
  }

  onDeleteSuccess?.();
}
    } catch (error: any) {
      toast.error("There was an error deleting", {
        description: error?.message || "Try again later.",
      });
    } finally {
      setOnDelete(false);
    }
  };

  // Update current slide when carousel scrolls
  carouselApi?.on("select", ()=>{
    setCurrentSlide(carouselApi.selectedScrollSnap());
  });

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Image Carousel */}
      <div className="relative">
        <Carousel setApi={setCarouselApi} className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={image}
                    alt={`${laptop.laptop_name} - Image ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100" />
              <CarouselNext className="right-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100" />
            </>
          )}
        </Carousel>

        {/* Dot Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => carouselApi?.scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentSlide === index
                    ? "w-4 bg-primary"
                    : "bg-primary/40 hover:bg-primary/60"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Condition Badge */}
        <Badge
          variant="outline"
          className={`absolute left-3 top-3 ${conditionStyles[laptop.laptop_condition]}`}
        >
          {laptop.laptop_condition}
        </Badge>
      </div>

      {/* Product Info */}
      <CardContent className="space-y-3 p-4">
        {/* Brand & Name */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {laptop.brand}
          </p>
          <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-foreground">
            {laptop.laptop_name}
          </h3>
        </div>

        {/* Specifications */}
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {laptop.specifications}
        </p>

        {/* Price & Stock */}
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-primary">
            R{laptop.laptop_price.toLocaleString()}
          </p>
          <span
            className={`text-sm font-medium ${
              laptop.available_quantity <= 3
                ? "text-destructive"
                : laptop.available_quantity <= 10
                ? "text-yellow-600"
                : "text-muted-foreground"
            }`}
          >
            {laptop.available_quantity <= 0
              ? "Out of stock"
              : laptop.available_quantity <= 3
              ? `Only ${laptop.available_quantity} left!`
              : `${laptop.available_quantity} in stock`}
          </span>
        </div>

        {/* Delete Button with Confirmation */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full gap-2"
              disabled={onDelete}
            >
              <Trash2 className="h-4 w-4" />
              {onDelete ? "Deleting..." : "Delete Laptop"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this laptop?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-semibold text-foreground">
                  {laptop.brand} {laptop.laptop_name}
                </span>
                ? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {onDelete ? "Deleting..." : "Yes, delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default LaptopProductCard;


