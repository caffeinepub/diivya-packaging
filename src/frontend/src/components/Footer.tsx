import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { useContactDetails } from "../hooks/useQueries";

const currentYear = new Date().getFullYear();

const quickLinks = [
  { label: "Home", href: "#home", ocid: "footer.home.link" },
  { label: "About Us", href: "#about", ocid: "footer.about.link" },
  { label: "Products", href: "#products", ocid: "footer.products.link" },
  { label: "Printing", href: "#printing", ocid: "footer.printing.link" },
  { label: "Contact", href: "#contact", ocid: "footer.contact.link" },
];

const products = [
  "Corrugated Boxes",
  "Rigid / Gift Boxes",
  "Custom Packaging",
  "Offset Printing",
  "Luxury Gift Boxes",
  "Industrial Boxes",
];

export default function Footer() {
  const { data: contactDetails } = useContactDetails();

  const phoneNumber = contactDetails?.phoneNumber ?? "+91 98765 43210";
  const emailAddress =
    contactDetails?.emailAddress ?? "info@diivyapackaging.com";
  const physicalAddress =
    contactDetails?.physicalAddress ?? "123 Industrial Area, India";

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <img
              src="/assets/generated/logo-transparent.dim_300x100.png"
              alt="Diivya Packaging"
              className="h-10 w-auto object-contain brightness-0 invert mb-5"
            />
            <p className="text-primary-foreground/55 text-sm leading-relaxed mb-6">
              Precision Packaging. Powerful Printing.
              <br />
              Your end-to-end packaging partner in India.
            </p>
            {/* Contact quick icons */}
            <div className="space-y-3">
              <a
                href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary transition-colors text-sm group"
                data-ocid="footer.call.link"
              >
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                {phoneNumber}
              </a>
              <a
                href={`mailto:${emailAddress}`}
                className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary transition-colors text-sm group"
                data-ocid="footer.email.link"
              >
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                {emailAddress}
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/60 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                {physicalAddress}
              </div>
            </div>
          </div>

          {/* Products column */}
          <div>
            <h3 className="font-display font-bold text-xs uppercase tracking-widest text-primary-foreground/40 mb-6">
              Products
            </h3>
            <ul className="space-y-3">
              {products.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => handleNavClick("#products")}
                    className="text-primary-foreground/60 hover:text-primary text-sm transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-xs uppercase tracking-widest text-primary-foreground/40 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    data-ocid={link.ocid}
                    className="text-primary-foreground/60 hover:text-primary text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get a Quote CTA */}
          <div>
            <h3 className="font-display font-bold text-xs uppercase tracking-widest text-primary-foreground/40 mb-6">
              Get Started
            </h3>
            <p className="text-primary-foreground/55 text-sm leading-relaxed mb-5">
              Ready to discuss your packaging needs? Get in touch today for a
              free consultation and custom quote.
            </p>
            <button
              type="button"
              onClick={() => handleNavClick("#contact")}
              data-ocid="footer.quote.button"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-bold text-sm rounded-full hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-primary/30"
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-primary-foreground/40 text-xs text-center sm:text-left">
              © {currentYear} Diivya Packaging. All Rights Reserved. |
              Manufacturers of Corrugated &amp; Rigid Boxes
            </p>
            <p className="text-primary-foreground/25 text-xs mt-1 text-center sm:text-left">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                caffeine.ai
              </a>
              {" · "}
              <a
                href="/admin"
                data-ocid="footer.admin.link"
                className="hover:text-primary/60 transition-colors"
              >
                Admin
              </a>
            </p>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            data-ocid="footer.scroll-top.button"
            className="w-9 h-9 bg-primary-foreground/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
