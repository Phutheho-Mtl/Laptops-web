
import SupabaseClient from "@/Client_apis/Supabase_client";
import { Laptop } from "lucide-react";

const Login = () => {
  const HandleLogin = async () => {
    await SupabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:8080",
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="bg-blue-500 p-4 rounded-full">
            <Laptop className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to Bobby's Refurbished Laptop</h1>
          <p className="text-gray-500">
            Sign in with your Google account to manage and explore laptops
          </p>
        </div>

        {/* Google Login Button */}
        <div className="flex justify-center">
          <button
            onClick={HandleLogin}
            className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors duration-200"
          >
            <img
              src="https://www.svgrepo.com/show/353817/google-icon.svg"
              alt="Google Logo"
              className="w-6 h-6 mr-3"
            />
            Sign in with Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-4">
          &copy; {new Date().getFullYear()} Bobby's Refurbished Laptops. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
