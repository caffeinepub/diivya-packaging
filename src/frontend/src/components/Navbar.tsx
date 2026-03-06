import { cn } from "@/lib/utils";
import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home", ocid: "nav.home.link" },
  { label: "About", href: "#about", ocid: "nav.about.link" },
  { label: "Products", href: "#products", ocid: "nav.products.link" },
  { label: "Printing", href: "#printing", ocid: "nav.printing.link" },
  { label: "Contact", href: "#contact", ocid: "nav.contact.link" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border"
          : "bg-transparent",
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 flex-shrink-0"
            data-ocid="nav.home.link"
          >
            <img
              src="/assets/generated/logo-transparent.dim_300x100.png"
              alt="Diivya Packaging"
              className={cn(
                "h-9 md:h-11 w-auto object-contain transition-all duration-300",
                scrolled ? "brightness-100" : "brightness-0 invert",
              )}
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                data-ocid={link.ocid}
                className={cn(
                  "px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 relative group",
                  scrolled
                    ? "text-foreground/70 hover:text-foreground"
                    : "text-white/80 hover:text-white",
                )}
              >
                {link.label}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
              </a>
            ))}
            <a
              href="tel:+919876543210"
              data-ocid="nav.call.button"
              className="ml-3 flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-bold text-sm rounded-full hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              scrolled
                ? "text-foreground hover:bg-muted"
                : "text-white hover:bg-white/10",
            )}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-white border-t border-border shadow-xl"
          >
            <div className="px-4 py-5 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  data-ocid={link.ocid}
                  className="flex items-center px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg font-semibold tracking-wide transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 pb-1 space-y-2">
                <a
                  href="tel:+919876543210"
                  data-ocid="nav.mobile.call.button"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Us: +91 98765 43210
                </a>
                <button
                  type="button"
                  onClick={() => handleNavClick("#contact")}
                  data-ocid="nav.mobile.cta.button"
                  className="flex items-center justify-center w-full px-4 py-3 border-2 border-primary text-primary font-bold text-sm rounded-xl hover:bg-primary/5 transition-colors"
                >
                  Get a Free Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
