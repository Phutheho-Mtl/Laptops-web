
import useUser from "../components/authentication/Auth_context"
import AdminDashBoard from "./dashboard";
import Login from "./LoginPage"

const Index = () => {
  

  const user=useUser();

  if (!user) return <Login/>
  else return <AdminDashBoard/>

  
};

export default Index;
