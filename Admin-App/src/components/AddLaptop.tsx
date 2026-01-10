
import SupabaseClient from "../Client_apis/Supabase_client"
import { useState } from "react"


type laptop_details={
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



//here we build the form

return(
    <div>

    </div>

)

}