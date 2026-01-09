import { useState } from "react";
import SupabaseClient from "../Client_apis/Supabase_client"


type Laptop_info={
    brand :string,
    laptop_name:string,
    specificications :string,
    condition : string,
    price : number,
    image1_url: string,
    image2_url: string,
    image3_url : string|null,
    avail_quantity : number
}



const ImagesUploader=()=>{
const [Laptop,setLaptop]=useState<Laptop_info |null>(null)
const [image,setimage]=useState<File | null>(null);
const [uploading,setUploading]=useState(false)
const [loadingProduct,setLoadingProduct]=useState(false)
const [imagePreview,setImagePreview]=useState<string|null>(null)
const [image1_url,setImage1_url]=useState<string|null>(null)
const [image2_url,setImage2_url]=useState<string|null>(null)
const [image3_url,setImage3_url]=useState<string|null>(null)


const HandleFileChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0]
    //if the file exits
    if (file){
        //validate file types
        const Validfiles=["image/png", "image/jpeg", "image/jpg", "image/svg+xml"]
        if (!Validfiles.includes(file.type)){
            alert("Please Upload a valid image type ((PNG, JPEG, or SVG))")
            return
        }

        //size validation
        if (file.size>5 * 1024 * 1024){
            alert("Image size limit is 5mb")
            return 
        }

        //This means the image exists and has correct file size
        setimage(file)

        const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
}

const HandleImageRemove=()=>{
    setimage(null)
    setImagePreview(null)
}



//The function takes a url for an image and sets it to the url returned by supabase
//The functions takes the setter and returns the new state
const HandleUpload=async ( setter :React.Dispatch<React.SetStateAction<string|null>>)=>{

    setUploading(true)
    //If there has been an image selected for uploading
    try{
        if(image){
        const FileExt=image.name.split(".").pop()
        const FileName= `BobbysRefurbished-${Date.now()}.${FileExt}`//Use the storename and date for the file name
        const FilePath=FileName;

        console.log("Uploading image on supabase")

        const { data: UploadData, error: UploadError } = await SupabaseClient.storage
          .from("Laptops-Images")
          .upload(FilePath,image, {
            cacheControl: "3600",
            upsert: false,
          })

        if (UploadError){
            console.log("The was an upload error",UploadError)
            throw new Error(`The was an error uploading the image : ${UploadError.message}`)
        }

        console.log(`The upload was succesful : ${UploadData}`)

        //We then get the public url of the image uploaded
        const {data :{publicUrl},}=SupabaseClient.storage.from("Laptops-Images").getPublicUrl(FilePath)

        //return the url of the image
        setter(publicUrl)
    
    }
    setUploading(false)

    }
    catch(err){
        alert("There was an error When uploading image")
        throw new Error(`Error uploading image + ${err.message}`)

    }
    finally{
        setUploading(false)

    }

}

//The function below adds all laptop details to the DB

const AddLaptop=async(details:Laptop_info)=>{

    setLoadingProduct(true)
    //Send image detailes to database if they are fine

    try {
        if (details){
            const { error:InsertError}= await SupabaseClient
            .from('laptops')
            .insert({brand:details.brand,laptop_name:details.laptop_name,
                specifications:details.specificications,
                laptop_condition:details.condition,
                laptop_price:details.price,
                image1_url:details.image1_url,
                image2_url:details.image2_url,
                image3_url:details?.image3_url,
                available_quantity:details.avail_quantity})
            
            if (InsertError){
                alert("There was an error adding this laptop to the DB")
                throw new Error(`There was an error here : ${InsertError.message}`)
            }

        }
        setLoadingProduct(true)  
    } catch (error) {
        console.log(`Error with the details added : ${error.message}`)
        throw new Error("The details provided had an error")
        
    }

}






return (
  <div style={{ padding: "1rem", maxWidth: "500px", margin: "auto" }}>
    <h1>Upload Laptop Details</h1>

    {/* BRAND */}
    <input
      type="text"
      placeholder="Brand"
      className="border p-2 w-full"
      onChange={(e) => setLaptop(prev => ({ ...prev, brand: e.target.value }))}
    />

    {/* LAPTOP NAME */}
    <input
      type="text"
      placeholder="Laptop Name"
      className="border p-2 w-full mt-2"
      onChange={(e) => setLaptop(prev => ({ ...prev, laptop_name: e.target.value }))}
    />

    {/* SPECS */}
    <textarea
      placeholder="Specifications"
      className="border p-2 w-full mt-2"
      onChange={(e) => setLaptop(prev => ({ ...prev, specificications: e.target.value }))}
    />

    {/* CONDITION */}
    <input
      type="text"
      placeholder="Condition e.g Refurbished"
      className="border p-2 w-full mt-2"
      onChange={(e) => setLaptop(prev => ({ ...prev, condition: e.target.value }))}
    />

    {/* PRICE */}
    <input
      type="number"
      placeholder="Price"
      className="border p-2 w-full mt-2"
      onChange={(e) => setLaptop(prev => ({ ...prev, price: Number(e.target.value) }))}
    />

    {/* QUANTITY */}
    <input
      type="number"
      placeholder="Quantity"
      className="border p-2 w-full mt-2"
      onChange={(e) => setLaptop(prev => ({ ...prev, avail_quantity: Number(e.target.value) }))}
    />


    {/* IMAGE UPLOAD SECTIONS */}
    <div className="mt-4">
      <h3>Upload Images</h3>

      {/* File Select */}
      <input
        type="file"
        accept="image/*"
        className="border p-2 mt-2 w-full"
        onChange={HandleFileChange}
      />

      {/* Preview */}
      {imagePreview && <img src={imagePreview} width="150" alt="preview" className="mt-2" />}

      {/* Upload buttons */}
      <button className="bg-blue-500 text-white p-2 mt-2 w-full"
        disabled={uploading}
        onClick={() => HandleUpload(setImage1_url)}>
        Upload Image 1
      </button>

      <button className="bg-blue-500 text-white p-2 mt-2 w-full"
        disabled={uploading}
        onClick={() => HandleUpload(setImage2_url)}>
        Upload Image 2
      </button>

      <button className="bg-blue-500 text-white p-2 mt-2 w-full"
        disabled={uploading}
        onClick={() => HandleUpload(setImage3_url)}>
        Upload Image 3 (Optional)
      </button>

      <button className="bg-red-500 text-white p-2 mt-2 w-full"
        onClick={HandleImageRemove}>
        Remove Selected Image
      </button>
    </div>


    {/* SUBMIT */}
    <button
      className="bg-green-600 text-white p-3 mt-4 w-full font-bold"
      disabled={loadingProduct || uploading}
      onClick={() => {
        if (!Laptop || !image1_url || !image2_url) {
          alert("Fill all required fields + upload Image 1 and 2");
          return;
        }

        AddLaptop({
          ...Laptop,
          image1_url,
          image2_url,
          image3_url,
        });
      }}
    >
      Add Laptop
    </button>

  </div>
);


}

export default ImagesUploader