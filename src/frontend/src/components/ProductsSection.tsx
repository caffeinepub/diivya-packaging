import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const products = [
  {
    title: "Corrugated Boxes",
    subtitle: "Durable Shipping Solutions",
    image: "/assets/generated/corrugated-boxes.dim_600x400.jpg",
    description:
      "Engineered for strength and efficiency — our corrugated boxes protect your goods from factory floor to final delivery. Available in single, double, and triple-wall construction.",
    features: [
      "Custom sizes & shapes",
      "High crush resistance",
      "Eco-friendly kraft material",
    ],
    ocid: "products.corrugated.card",
    enquireOcid: "products.corrugated.enquire.button",
  },
  {
    title: "Rigid Boxes",
    subtitle: "Premium Gift & Luxury Packaging",
    image: "/assets/generated/rigid-boxes.dim_600x400.jpg",
    description:
      "Structured rigid boxes that deliver an unforgettable unboxing experience. Perfect for luxury products, corporate gifting, and high-end retail with magnetic closures and premium finishes.",
    features: [
      "Luxury matte & gloss finishes",
      "Custom inserts & padding",
      "Brand-ready printing",
    ],
    ocid: "products.rigid.card",
    enquireOcid: "products.rigid.enquire.button",
  },
  {
    title: "Offset Printing",
    subtitle: "In-House Colour Press",
    image: "/assets/generated/offset-printing.dim_600x400.jpg",
    description:
      "Our in-house offset press delivers vibrant, photorealistic multi-colour printing directly on your packaging. Pantone matching, spot UV, foil stamping — your brand, brilliantly rendered.",
    features: [
      "Pantone colour matching",
      "Spot UV & foil options",
      "High-volume efficiency",
    ],
    ocid: "products.printing.card",
    enquireOcid: "products.printing.enquire.button",
  },
];

export default function ProductsSection() {
  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="products" className="py-24 md:py-32 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-5">
            <span className="section-tag">What We Make</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground leading-tight tracking-tight">
            Every Box Crafted to
            <br />
            <span className="text-primary">Protect, Impress & Deliver.</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Three specialized product lines, one integrated manufacturing
            facility. Everything produced in-house with precision your business
            demands.
          </p>
        </motion.div>

        {/* Product cards */}
        <div className="grid md:grid-cols-3 gap-7">
          {products.map((product, i) => (
            <motion.article
              key={product.title}
              data-ocid={product.ocid}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl hover:shadow-black/10 transition-all duration-300 hover:-translate-y-2 flex flex-col"
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "3/2" }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{ transition: "transform 0.7s ease" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">
                    {product.subtitle}
                  </div>
                  <h3 className="font-display font-black text-2xl text-white leading-tight">
                    {product.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-7 flex-1">
                  {product.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2.5 text-sm text-foreground/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  onClick={handleScrollToContact}
                  data-ocid={product.enquireOcid}
                  className="flex items-center justify-between w-full px-5 py-3 bg-primary/8 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 hover:border-primary rounded-xl font-bold text-sm uppercase tracking-wide transition-all duration-300 group/btn"
                >
                  Enquire Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
