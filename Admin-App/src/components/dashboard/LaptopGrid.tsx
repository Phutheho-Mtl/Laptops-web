"use client";
import LaptopProductCard from "./LaptopCard";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import SupabaseClient from "@/Client_apis/Supabase_Client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import LaptopForm from "../Form_components/LaptopForm";

interface Product {
  laptop_id: number;
  laptop_name: string;
  brand: string;
  laptop_condition: "Used" | "Refurbished" | "New";
  specifications: string;
  laptop_price: string;
  image1_url: string;
  image2_url: string;
  image3_url: string | null;
  available_quantity: number;
}

const ProductGrid = () => {
  const [isLoading,SetIsLoading] = useState(false);
  const [laptops,SetLaptops] = useState<Product[]>([]);
  const [search,setSearch] = useState("");
  const [filter,setFilter] = useState("all");
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate=useNavigate()


  //Logout
   const handleLogout=async() => {
    const {error} = await SupabaseClient.auth.signOut();

    if (error) {
      toast.error("Logout failed", { description: error.message });
      return;
    }

    toast.success("Logged out successfully!");

    navigate("/");
  };

  // Fetch products
  const Fetchproducts=async()=> {
    SetIsLoading(true);

    try {
      const { data, error: FetchError }=await SupabaseClient
        .from<Product>("laptops")
        .select("*");

      if (FetchError) {
        toast.error("There was an error fetching Laptops", {
          description: FetchError?.message || "Check Console.",
        });
      }

      SetLaptops(data || []);
    } catch (error: any) {
      toast.error("There was an error fetching Laptops", {
        description: error?.message || "Refresh page.",
      });
    } finally {
      SetIsLoading(false);
    }
  };

  useEffect(() => {
    Fetchproducts();
  }, []);

  // Filtering + Searching
  const filteredLaptops = laptops.filter((laptop) => {
    const matchesSearch =
      laptop.brand.toLowerCase().includes(search.toLowerCase()) ||
      laptop.laptop_name.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || laptop.laptop_condition === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      
      {/* Top controls: Logout + Add Laptop */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button onClick={handleLogout} variant="outline" className="bg-red-50 text-red-600 hover:bg-red-100">
          Logout
        </Button>

        <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button className="mb-2">+ Add Laptop</Button>
          </DialogTrigger>

          <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Laptop</DialogTitle>
            </DialogHeader>

            <LaptopForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Input
          placeholder="Search by brand or model"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Brand New">Brand New</SelectItem>
            <SelectItem value="Refurbished">Refurbished</SelectItem>
            <SelectItem value="Used">Used</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading */}
      {isLoading && (
        <p className="text-center text-muted-foreground py-10">
          Loading laptops...
        </p>
      )}

      {/* Empty */}
      {!isLoading && filteredLaptops.length === 0 && (
        <p className="text-center text-muted-foreground py-10">
          No laptops matched your search/filter
        </p>
      )}

      {/* Grid */}
      {!isLoading && filteredLaptops.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLaptops.map((product) => (
            <LaptopProductCard
              key={product.laptop_id}
              laptop={product}
              onDeleteSuccess={() =>
                SetLaptops((prev) =>
                  prev.filter((p) => p.laptop_id !== product.laptop_id)
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;