
import { createClient, SupabaseClient as SBClient } from "@supabase/supabase-js";

const Supabase_url:string=import.meta.env.VITE_SUPABASE_URL;
const Supabase_api_key:string=import.meta.env.VITE_SUPABASE_ANON_KEY;


if (!Supabase_api_key || !Supabase_url){
    throw new Error("Missing Supabase URL or Supabase Anon Key,Check enviroment variables")
}
const SupabaseClient:SBClient =createClient(Supabase_url,Supabase_api_key,{
    auth:{
        persistSession: true,
        storage: sessionStorage,
        autoRefreshToken: true,
    }
})

export default SupabaseClient;