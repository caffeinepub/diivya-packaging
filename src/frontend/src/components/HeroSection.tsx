import { Phone, Star } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1400x600.jpg')",
        }}
      />
      {/* Layered gradient: strong on left, fades right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
      {/* Bottom fade to background */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[oklch(96_0.008_80)] to-transparent" />

      {/* Diagonal line texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0px, #fff 1px, transparent 1px, transparent 50px)",
        }}
      />

      {/* In-House Printing Badge — floating */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute top-28 right-6 md:top-1/3 md:right-12 lg:right-20 z-20 hidden sm:block"
      >
        <div className="flex items-center gap-2.5 px-4 py-3 bg-accent text-accent-foreground rounded-xl shadow-2xl font-bold text-sm uppercase tracking-wider border border-accent/20">
          <Star className="w-4 h-4 fill-current" />
          In-House Offset Printing
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="h-px w-10 bg-accent block" />
            <span className="text-accent font-bold uppercase tracking-[0.18em] text-xs">
              Diivya Packaging · Est. India
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display font-black text-white leading-[0.93] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            Packaging That
            <br />
            <span className="text-primary">Speaks</span>
            <br />
            Before You Do.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="text-white/75 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl font-medium"
          >
            Manufacturers of Corrugated Boxes, Rigid Boxes &amp; Custom Printed
            Packaging — with our own Offset Printing Press.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            className="flex flex-wrap gap-4"
          >
            <button
              type="button"
              onClick={handleScrollToContact}
              data-ocid="hero.quote.button"
              className="px-8 py-4 bg-primary text-primary-foreground font-black text-sm uppercase tracking-wider rounded-full hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 hover:scale-105"
            >
              Get a Free Quote
            </button>
            <a
              href="tel:+919876543210"
              data-ocid="hero.call.button"
              className="flex items-center gap-2.5 px-8 py-4 bg-white/10 border-2 border-white/50 text-white font-black text-sm uppercase tracking-wider rounded-full hover:bg-white/20 hover:border-white transition-all duration-300 backdrop-blur-sm"
            >
              <Phone className="w-4 h-4" />
              Call Us: +91 98765 43210
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.68 }}
            className="mt-16 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 max-w-sm"
          >
            {[
              { value: "500+", label: "Happy Clients" },
              { value: "10+", label: "Years Exp." },
              { value: "3", label: "Product Lines" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-black text-primary font-display leading-none">
                  {stat.value}
                </div>
                <div className="text-white/50 text-xs uppercase tracking-wider mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.6,
            ease: "easeInOut",
          }}
          className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
