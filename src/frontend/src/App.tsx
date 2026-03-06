import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MarqueeStrip from "./components/MarqueeStrip";
import Navbar from "./components/Navbar";
import ProductsSection from "./components/ProductsSection";
import WhyUsSection from "./components/WhyUsSection";
import AdminPage from "./pages/AdminPage";

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return pathname;
}

export default function App() {
  const pathname = usePathname();

  if (pathname === "/admin") {
    return (
      <>
        <Toaster position="top-right" richColors />
        <AdminPage />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" richColors />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <ProductsSection />
        <WhyUsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
