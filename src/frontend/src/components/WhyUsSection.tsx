import { Check } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    title: "ISO-grade quality materials",
    desc: "Only premium-grade kraft, corrugated board, and rigid chipboard — every batch tested for strength and durability.",
  },
  {
    title: "In-house colour offset printing press",
    desc: "Full-colour CMYK offset printing on-site means faster turnaround, lower cost, and perfect print consistency.",
  },
  {
    title: "Custom dimensions & finishes",
    desc: "Any size, any shape, any finish — matte lamination, gloss, foil, embossing, or spot UV. We make it happen.",
  },
  {
    title: "Bulk orders with on-time dispatch",
    desc: "Efficient production lines built for volume without compromise. Committed timelines, zero excuses.",
  },
];

export default function WhyUsSection() {
  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="printing"
      className="py-24 md:py-32 bg-secondary relative overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #fff 0px, #fff 1px, transparent 1px, transparent 32px)",
        }}
      />
      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/6 rounded-tr-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-3 bg-primary/20 rounded-2xl rotate-2 opacity-60" />
            <img
              src="/assets/generated/quality-craftsmanship.dim_800x600.jpg"
              alt="Quality craftsmanship at Diivya Packaging"
              loading="lazy"
              className="relative w-full rounded-xl object-cover shadow-2xl"
              style={{ aspectRatio: "4/3" }}
            />
            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-5 -right-5 bg-primary text-primary-foreground px-5 py-4 rounded-2xl shadow-2xl text-center"
            >
              <div className="font-display font-black text-3xl leading-none">
                100%
              </div>
              <div className="text-primary-foreground/80 text-xs uppercase tracking-wider mt-1 font-semibold">
                In-House Made
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Text + features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/30 text-primary bg-primary/10">
                Our Strengths
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-black text-primary-foreground leading-[1.05] tracking-tight mb-6">
              Built With Precision.
              <br />
              <span className="text-primary">Delivered With Pride.</span>
            </h2>

            <p className="text-primary-foreground/60 text-base leading-relaxed mb-9">
              From raw material to finished packaging — everything happens under
              our roof. That's how we guarantee consistency, speed, and quality
              every single order.
            </p>

            {/* Feature list */}
            <div className="space-y-5 mb-10">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.09 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-md shadow-primary/30 mt-0.5">
                    <Check
                      className="w-5 h-5 text-primary-foreground"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-primary-foreground text-sm mb-1">
                      {feat.title}
                    </div>
                    <div className="text-primary-foreground/55 text-sm leading-relaxed">
                      {feat.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleScrollToContact}
              data-ocid="printing.sample.button"
              className="px-8 py-4 bg-primary text-primary-foreground font-black text-sm uppercase tracking-wider rounded-full hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5"
            >
              Request a Sample
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
