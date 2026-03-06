import { Clock, Layers, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { value: "500+", label: "Happy Clients", icon: Users },
  { value: "10+", label: "Years of Excellence", icon: Clock },
  { value: "3", label: "Product Lines", icon: Layers },
];

export default function AboutSection() {
  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      data-ocid="about.section"
      className="py-24 md:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Section tag */}
            <div className="mb-5">
              <span className="section-tag">About Diivya Packaging</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground leading-[1.05] tracking-tight mb-6">
              India's Trusted
              <br />
              <span className="text-primary">Packaging Partner</span>
            </h2>

            <div className="space-y-4 text-foreground/70 text-base leading-relaxed mb-8">
              <p>
                Diivya Packaging was founded with a singular mission: to deliver
                packaging solutions that don't just contain — they communicate.
                We believe your packaging is your first handshake with your
                customer, and we make sure it's a strong one.
              </p>
              <p>
                We manufacture corrugated boxes, rigid premium boxes, and run
                our own full-colour offset printing press — all under one roof.
                This means faster turnaround, tighter quality control, and
                seamless coordination from design to dispatch.
              </p>
              <p>
                From small businesses to large industrial clients, we deliver
                custom packaging solutions tailored to every industry — FMCG,
                electronics, fashion, food, gifting, and more.
              </p>
            </div>

            <button
              type="button"
              onClick={handleScrollToContact}
              data-ocid="about.cta.button"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background font-bold uppercase tracking-wider text-sm rounded-full hover:bg-foreground/90 transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
            >
              Partner With Us
            </button>
          </motion.div>

          {/* Right: Image + stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-6"
          >
            {/* Image with accent border */}
            <div className="relative">
              <div className="absolute -inset-2 bg-primary/15 rounded-2xl -rotate-1" />
              <img
                src="/assets/generated/factory-floor.dim_800x500.jpg"
                alt="Diivya Packaging factory floor"
                loading="lazy"
                className="relative w-full rounded-xl object-cover shadow-2xl"
                style={{ aspectRatio: "16/10" }}
              />
              {/* Floating tag */}
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-5 py-3 rounded-xl shadow-xl font-bold text-sm uppercase tracking-wider">
                Since Inception
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="bg-card border border-border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="font-display font-black text-2xl text-foreground leading-none">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-xs mt-1 leading-snug">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
