import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-3 min-h-[600px]">
        <Outlet />
        <Toaster offset={10} />
      </main>
      <Footer />
    </>
  );
}
