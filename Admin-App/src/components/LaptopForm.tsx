"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Laptop, Check } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import ImageDropzone from "./ImageDropZone";
import SupabaseClient from "../Client_apis/Supabase_client";

// =====================
// Validation Schema
// =====================
const formSchema = z.object({
  brand: z.string().min(2).max(50),
  laptop_name: z.string().min(5).max(100),
  specifications: z.string().min(20).max(1000),
  condition: z.enum(["Refurbished", "Brand New", "Used"]),
  price: z.number().min(1),
  avail_quantity: z.number().int().min(1),
  image1_url: z.string().min(1),
  image2_url: z.string().min(1),
  image3_url: z.string().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

const LaptopForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // =====================
  // Insert to DB
  // =====================
  const AddLaptop = async (values: FormValues) => {
    const { error: InsertError } = await SupabaseClient.from("laptops").insert({
      brand: values.brand,
      laptop_name: values.laptop_name,
      specifications: values.specifications,
      laptop_condition: values.condition,
      laptop_price: values.price,
      image1_url: values.image1_url,
      image2_url: values.image2_url,
      image3_url: values.image3_url,
      available_quantity: values.avail_quantity,
    });

    if (InsertError) throw new Error(InsertError.message);
  };

  // =====================
  // React Hook Form Setup
  // =====================
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      laptop_name: "",
      specifications: "",
      condition: undefined,
      price: undefined,
      avail_quantity: undefined,
      image1_url: "",
      image2_url: "",
      image3_url: null,
    },
  });

  // =====================
  // Submit handler
  // =====================
  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await AddLaptop(values);
      toast.success("Laptop Added Successfully!", {
        description: `${values.brand} ${values.laptop_name} saved.`,
        icon: <Check className="w-4 h-4" />,
      });

      form.reset();
    } catch (error: any) {
      toast.error("Failed to add laptop", {
        description: error?.message || "Try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // =====================
  // UI
  // =====================
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl border-0 bg-card">
      <CardHeader className="space-y-1 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary">
            <Laptop className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Add New Laptop</CardTitle>
            <CardDescription>Fill in the details to add a new laptop</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-10">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand *</FormLabel>
                    <FormControl><Input disabled={isSubmitting} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="laptop_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Laptop Name *</FormLabel>
                    <FormControl><Input disabled={isSubmitting} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Specs */}
            <div className="pl-10">
              <FormField
                control={form.control}
                name="specifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specifications *</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[120px]" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-10">
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition *</FormLabel>
                    <Select disabled={isSubmitting} value={field.value} onValueChange={field.onChange}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Brand New">Brand New</SelectItem>
                        <SelectItem value="Refurbished">Refurbished</SelectItem>
                        <SelectItem value="Used">Used</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price *</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={isSubmitting}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avail_quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity *</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} disabled={isSubmitting}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-10">
              <FormField
                control={form.control}
                name="image1_url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageDropzone
                        value={field.value || null}
                        onChange={(url) => field.onChange(url || "")}
                        label="Main Image"
                        required disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image2_url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageDropzone
                        value={field.value || null}
                        onChange={(url) => field.onChange(url || "")}
                        label="Second Image"
                        required disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image3_url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageDropzone
                        value={field.value}
                        onChange={field.onChange}
                        label="Third Image (Optional)"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4 border-t border-border">
              <Button type="submit" disabled={isSubmitting} className="min-w-[180px] font-semibold">
                {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Adding...</> :
                  <><Laptop className="w-4 h-4 mr-2" />Add Laptop</>}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LaptopForm;
