'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to the App</h1>
      <div className="space-x-4">
        <Button variant="outline" className="text-blue-500 " onClick={() => router.push("/login")}>
          Login
        </Button>
        <Button variant="outline" className="text-blue-500 " onClick={() => router.push("/register")}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default Home;
