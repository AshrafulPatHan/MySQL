import Home from "@/components/Home/Home";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/Navigation/Footer";


export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <Home/>
      <Footer/>
    </div>
  );
}
