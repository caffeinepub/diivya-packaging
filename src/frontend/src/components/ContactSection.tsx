import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useContactDetails, useSubmitContactForm } from "../hooks/useQueries";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const mutation = useSubmitContactForm();
  const { data: contactDetails, isLoading: contactLoading } =
    useContactDetails();

  const phoneNumber = contactDetails?.phoneNumber ?? "+91 98765 43210";
  const emailAddress =
    contactDetails?.emailAddress ?? "info@diivyapackaging.com";
  const physicalAddress =
    contactDetails?.physicalAddress ?? "123 Industrial Area, Phase 2";
  const googleMapsUrl =
    contactDetails?.googleMapsUrl ??
    "https://maps.google.com/?q=Industrial+Area+India";

  const contactCards = [
    {
      icon: Phone,
      label: "Call Us Directly",
      value: phoneNumber,
      sub: "Mon–Sat: 9 AM – 6 PM",
      action: "Call Now",
      href: `tel:${phoneNumber.replace(/\s+/g, "")}`,
      ocid: "contact.phone.card",
      btnOcid: "contact.call.button",
    },
    {
      icon: Mail,
      label: "Send Us an Email",
      value: emailAddress,
      sub: "We reply within 24 hours",
      action: "Email Now",
      href: `mailto:${emailAddress}`,
      ocid: "contact.email.card",
      btnOcid: "contact.email.button",
    },
    {
      icon: MapPin,
      label: "Visit Our Office",
      value: physicalAddress,
      sub: "India",
      action: "Get Directions",
      href: googleMapsUrl,
      ocid: "contact.address.card",
      btnOcid: "contact.directions.button",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await mutation.mutateAsync({ name, email, message });
      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      toast.success(
        "Your message has been sent! We'll be in touch within 24 hours.",
      );
    } catch {
      toast.error(
        "Failed to send message. Please try again or call us directly.",
      );
    }
  };

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-24 md:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-5">
            <span className="section-tag">Contact Us</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground leading-tight tracking-tight">
            Let's Work Together
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-base leading-relaxed">
            Reach out — we respond within 24 hours. Let's talk about what you
            need and get you a custom quote today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left: Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-5"
          >
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  data-ocid={card.ocid}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/8 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        {card.label}
                      </div>
                      {contactLoading ? (
                        <Skeleton className="h-4 w-36 mb-1" />
                      ) : (
                        <div className="font-bold text-foreground text-sm leading-snug truncate">
                          {card.value}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {card.sub}
                      </div>
                    </div>
                  </div>
                  <a
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      card.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    data-ocid={card.btnOcid}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-md hover:shadow-primary/25 hover:-translate-y-0.5"
                  >
                    {card.action}
                    {card.href.startsWith("http") && (
                      <ExternalLink className="w-3.5 h-3.5" />
                    )}
                  </a>
                </motion.div>
              );
            })}

            {/* Business hours */}
            <div className="bg-secondary/40 border border-secondary/60 rounded-2xl p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-secondary-foreground/50 mb-3">
                Business Hours
              </div>
              <div className="space-y-1.5">
                {[
                  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
                  { day: "Saturday", time: "9:00 AM – 2:00 PM" },
                  { day: "Sunday", time: "Closed" },
                ].map((row) => (
                  <div key={row.day} className="flex justify-between text-sm">
                    <span className="text-secondary-foreground/70 font-medium">
                      {row.day}
                    </span>
                    <span className="text-secondary-foreground font-semibold">
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                data-ocid="contact.success_state"
                className="p-12 bg-card border border-border rounded-2xl text-center shadow-sm"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-9 h-9 text-green-600" />
                </div>
                <h3 className="font-display font-black text-2xl text-foreground mb-2">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground text-base mb-8 max-w-xs mx-auto">
                  Thank you for reaching out. Our team will respond within 24
                  hours with a custom quote.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  data-ocid="contact.reset.button"
                  className="px-7 py-3 bg-primary text-primary-foreground font-bold text-sm rounded-full hover:bg-primary/90 transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-5"
              >
                <div>
                  <h3 className="font-display font-black text-2xl text-foreground mb-1">
                    Send Us a Message
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Fill in your details and we'll get back to you promptly.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-name"
                      className="text-sm font-semibold text-foreground"
                    >
                      Full Name <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="Rajesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="name"
                      data-ocid="contact.name.input"
                      className="h-11 bg-background border-border focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-email"
                      className="text-sm font-semibold text-foreground"
                    >
                      Email Address <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="rajesh@yourcompany.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      data-ocid="contact.email.input"
                      className="h-11 bg-background border-border focus-visible:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-phone"
                    className="text-sm font-semibold text-foreground"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    data-ocid="contact.phone.input"
                    className="h-11 bg-background border-border focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-message"
                    className="text-sm font-semibold text-foreground"
                  >
                    Your Message <span className="text-primary">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us about your packaging requirements — product type, quantity needed, dimensions, any special printing or finishing requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    data-ocid="contact.message.textarea"
                    className="bg-background border-border focus-visible:ring-primary resize-none"
                  />
                </div>

                {mutation.isError && (
                  <p
                    data-ocid="contact.error_state"
                    className="text-destructive text-sm font-medium"
                  >
                    Something went wrong. Please try again or call us directly
                    at {phoneNumber}.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  data-ocid="contact.submit.button"
                  className="w-full py-4 bg-primary text-primary-foreground font-black uppercase tracking-wider text-sm rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                >
                  {mutation.isPending && (
                    <Loader2
                      className="w-4 h-4 animate-spin"
                      data-ocid="contact.loading_state"
                    />
                  )}
                  {mutation.isPending
                    ? "Sending your message..."
                    : "Send Message"}
                </button>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  We respect your privacy. Your information will only be used to
                  respond to your enquiry.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
