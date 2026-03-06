import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  LogIn,
  LogOut,
  Package,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useContactDetails,
  useIsAdmin,
  useUpdateContactDetails,
} from "../hooks/useQueries";

export default function AdminPage() {
  const { login, clear, identity, isLoggingIn, isInitializing } =
    useInternetIdentity();

  const isLoggedIn = !!identity;

  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: contactDetails, isLoading: detailsLoading } =
    useContactDetails();
  const updateMutation = useUpdateContactDetails();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Pre-fill form when contact details load
  useEffect(() => {
    if (contactDetails) {
      setPhone(contactDetails.phoneNumber);
      setEmail(contactDetails.emailAddress);
      setAddress(contactDetails.physicalAddress);
      setMapsUrl(contactDetails.googleMapsUrl);
    }
  }, [contactDetails]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);
    try {
      await updateMutation.mutateAsync({
        phoneNumber: phone,
        emailAddress: email,
        physicalAddress: address,
        googleMapsUrl: mapsUrl,
      });
      setSaveSuccess(true);
      toast.success("Contact details updated successfully!");
      setTimeout(() => setSaveSuccess(false), 5000);
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  };

  // Loading state while initializing identity
  if (isInitializing) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Package className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground text-sm font-medium">
            Initializing...
          </p>
        </div>
      </div>
    );
  }

  // Not logged in — show login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          {/* Card */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-xl shadow-foreground/5">
            {/* Logo */}
            <div className="flex justify-center mb-7">
              <img
                src="/assets/generated/logo-transparent.dim_300x100.png"
                alt="Diivya Packaging"
                className="h-10 w-auto object-contain"
              />
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-7 h-7 text-primary" />
              </div>
              <h1 className="font-display font-black text-2xl text-foreground mb-1.5">
                Admin Panel
              </h1>
              <p className="text-muted-foreground text-sm">
                Sign in to manage your website contact details.
              </p>
            </div>

            {/* Login button */}
            <Button
              onClick={login}
              disabled={isLoggingIn}
              data-ocid="admin.login.button"
              className="w-full h-12 font-bold text-sm rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Connecting...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login with Internet Identity
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-5">
              Secure, decentralized login — no passwords required.
            </p>
          </div>

          {/* Back to site */}
          <div className="text-center mt-5">
            <a
              href="/"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              ← Back to website
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // Logged in, checking admin role
  if (adminLoading) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Package className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground text-sm font-medium">
            Checking permissions...
          </p>
        </div>
      </div>
    );
  }

  // Logged in but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="bg-card border border-border rounded-2xl p-8 shadow-xl shadow-foreground/5 text-center">
            <div className="w-14 h-14 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-7 h-7 text-destructive" />
            </div>
            <h2 className="font-display font-black text-xl text-foreground mb-2">
              Access Denied
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Your account does not have administrator privileges. Please
              contact the site owner.
            </p>
            <Button
              onClick={clear}
              variant="outline"
              data-ocid="admin.logout.button"
              className="w-full rounded-xl"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <a
              href="/"
              className="block text-center text-xs text-muted-foreground mt-4 hover:text-foreground transition-colors"
            >
              ← Back to website
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin view — full edit form
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/logo-transparent.dim_300x100.png"
              alt="Diivya Packaging"
              className="h-8 w-auto object-contain"
            />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              ← View Site
            </a>
            <Button
              onClick={clear}
              variant="outline"
              size="sm"
              data-ocid="admin.logout.button"
              className="rounded-lg text-sm"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Page heading */}
          <div className="mb-10">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <h1 className="font-display font-black text-3xl text-foreground">
                Contact Details
              </h1>
            </div>
            <p className="text-muted-foreground text-sm ml-11.5">
              Update your business contact information. Changes appear instantly
              on the website.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            {detailsLoading ? (
              <div data-ocid="admin.loading_state" className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-11 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-6">
                {/* Phone */}
                <div className="space-y-2">
                  <Label
                    htmlFor="admin-phone"
                    className="text-sm font-semibold text-foreground"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="admin-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    data-ocid="admin.phone.input"
                    className="h-11 bg-background border-border focus-visible:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Displayed on the website and used for "Call Now" button.
                  </p>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="admin-email"
                    className="text-sm font-semibold text-foreground"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="info@diivyapackaging.com"
                    autoComplete="email"
                    data-ocid="admin.email.input"
                    className="h-11 bg-background border-border focus-visible:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Displayed in the contact section and footer.
                  </p>
                </div>

                {/* Physical Address */}
                <div className="space-y-2">
                  <Label
                    htmlFor="admin-address"
                    className="text-sm font-semibold text-foreground"
                  >
                    Physical Address
                  </Label>
                  <Textarea
                    id="admin-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Industrial Area, Phase 2&#10;Your City, State — India"
                    rows={3}
                    data-ocid="admin.address.input"
                    className="bg-background border-border focus-visible:ring-primary resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Shown in the contact section and footer.
                  </p>
                </div>

                {/* Google Maps URL */}
                <div className="space-y-2">
                  <Label
                    htmlFor="admin-maps"
                    className="text-sm font-semibold text-foreground"
                  >
                    Google Maps URL
                  </Label>
                  <Input
                    id="admin-maps"
                    type="url"
                    value={mapsUrl}
                    onChange={(e) => setMapsUrl(e.target.value)}
                    placeholder="https://maps.google.com/?q=Your+Address"
                    data-ocid="admin.maps.input"
                    className="h-11 bg-background border-border focus-visible:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Used for the "Get Directions" button. Paste a Google Maps
                    share link here.
                  </p>
                </div>

                {/* Feedback states */}
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    data-ocid="admin.success_state"
                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm font-medium text-green-800">
                      Contact details updated successfully! Changes are live on
                      the website.
                    </p>
                  </motion.div>
                )}

                {updateMutation.isError && (
                  <div
                    data-ocid="admin.error_state"
                    className="flex items-center gap-3 p-4 bg-destructive/8 border border-destructive/20 rounded-xl"
                  >
                    <ShieldAlert className="w-5 h-5 text-destructive flex-shrink-0" />
                    <p className="text-sm font-medium text-destructive">
                      Failed to save. Please try again.
                    </p>
                  </div>
                )}

                {/* Save button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={updateMutation.isPending}
                    data-ocid="admin.save.button"
                    className="w-full h-12 font-bold text-sm rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {updateMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                        Saving changes...
                      </>
                    ) : (
                      "Save Contact Details"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Info note */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            All changes are saved to the blockchain and reflected instantly
            across the entire website.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
