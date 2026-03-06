# Diivya Packaging

## Current State
- Static marketing website with Navbar, Hero, Marquee, About, Products, WhyUs, Contact, Footer sections.
- Contact details (phone, email, address) are hardcoded in ContactSection.tsx and Footer.tsx as placeholder values.
- Backend has a `submitContactForm` and `getAllContactFormEntries` function for handling contact form submissions.
- No admin panel or authentication exists.

## Requested Changes (Diff)

### Add
- Authorization component (Internet Identity login) so only the admin can access the admin panel.
- Backend functions to store and retrieve contact details (phone, email, address, maps URL).
- Admin page/panel accessible via a hidden route (e.g. `/admin`) where the logged-in owner can update phone, email, address, and Google Maps link.
- Admin panel shows current values and provides an editable form to update them.
- Frontend reads contact details from the backend and displays them dynamically in ContactSection and Footer.

### Modify
- ContactSection.tsx: phone, email, address, and maps link loaded from backend instead of hardcoded.
- Footer.tsx: phone, email, address loaded from backend instead of hardcoded.
- App.tsx: Add routing to support `/admin` route alongside the main page.

### Remove
- Hardcoded placeholder contact details from ContactSection.tsx and Footer.tsx.

## Implementation Plan
1. Select `authorization` Caffeine component.
2. Regenerate Motoko backend to add:
   - `ContactDetails` type: phone, email, address, mapsUrl fields.
   - `getContactDetails()` query — returns current contact details (with sensible defaults).
   - `updateContactDetails(phone, email, address, mapsUrl)` — admin-only update (uses authorization).
3. Frontend:
   - Add react-router-dom for `/` and `/admin` routes.
   - Create `useContactDetails` query hook and `useUpdateContactDetails` mutation hook.
   - Update ContactSection to use dynamic contact details from backend.
   - Update Footer to use dynamic contact details from backend.
   - Create `AdminPage` component: login with Internet Identity, form to edit phone/email/address/mapsUrl, save button.
   - Add a small hidden "Admin" link in the footer.
