import SupabaseClient from "@/Client_apis/Supabase_client";

import {useEffect,useState} from "react"
//The auth context collects the user information from Google after signIn then makes it available inside thea 
const useUser=()=>{
  const [user, setUser]=useState(null);

  useEffect(() => {
    SupabaseClient.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
    });
    const {data: listener } =SupabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return ()=>listener.subscription.unsubscribe();
  }, []);

  return user;
};

export default useUser;

