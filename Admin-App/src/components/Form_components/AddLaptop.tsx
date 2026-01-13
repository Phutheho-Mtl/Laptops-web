
import SupabaseClient from "@/Client_apis/Supabase_client"
import { useState } from "react"
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "../ui/sonner";
import ImageUploader from "./ImageUploader";



type laptop_details={
    laptop_id:string,
    brand:string;
    laptop_name :string,
    specifications :string,
    condition : "Refurbished" | "Brand New" | "Used",
    price :number,
    image1_url :string,
    image2_url :string,
    image3_url :string | null,
    avail_quantity :number
}

//define the form schema
const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})


const LaptopForm=()=>{
    const [image1_url,setImage1_url]=useState<string|null>(null)
    const [image2_url,setImage2_url]=useState<string|null>(null)
    const [image3_url,setImage3_url]=useState<string|null>(null)
    const [adding,setAdding]=useState(false)

//The function uploads the laptop into our database

const AddLaptop=async(details:laptop_details)=>{

    if(!details) return alert(`Fill in the entire form`)
        setAdding(true)

    try {
        const {error:InsertError}=await SupabaseClient
        .from("laptops")
        .insert({brand:details.brand,
                laptop_name:details.laptop_name,
                specifications:details.specifications,
                laptop_condition:details.condition,
                laptop_price:details.price,
                image1_url : details.image1_url,
                image2_url : details.image2_url,
                image3_url :details?.image3_url,
                available_quantity :details.avail_quantity
        })

        if(InsertError){
            console.log(`LAPTOP COULD NOT BE ADDED IN OUR DB`)
            throw new Error(`Error adding laptop : ${InsertError.message}`)
        }


        setAdding(false)
    } catch (error) {
        console.log(`DID NOT ADD LAPTOP`)
        throw new Error(`Error message : ${error.message}`)
    }
    finally{
        setAdding(false)
    }

}

//Here we build the default values for the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })


//function that runs when You submit the form
  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }





return(
    <div>

    </div>

)

}


