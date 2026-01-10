
import {createClient} from "@supabase/supabase-js"

const Supabase_url=import.meta.env.VITE_SUPABASE_URL;
const Supabase_api_key=import.meta.env.VITE_SUPABASE_ANON_KEY;


if (!Supabase_api_key || !Supabase_url){
    throw new Error("Missing Supabase URL or Supabase Anon Key,Check enviroment variables")
}

const SupabaseClient=createClient(Supabase_url,Supabase_api_key)

export default SupabaseClient;