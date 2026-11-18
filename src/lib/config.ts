// ─── EDIT THESE ─────────────────────────────────────────────────────────────
export const BRAND = 'NOOR WALLEY';                       // store name shown in the header
export const TAGLINE = 'T-Shirts';             // small line in the footer
// WhatsApp number for orders: digits only, with country code (e.g. 923001234567).
// Can also be set at build time with the VITE_WHATSAPP environment variable.
export const WHATSAPP: string = ((import.meta as any).env?.VITE_WHATSAPP as string | undefined) || '923154429417';
export const CURRENCY = 'Rs.';
// Vertical position of the rail's rod inside each garment photo, as % of the image height.
// Real photos with the hanger hook at the very top → about 3. Adjust if the rod looks off.
export const ROD_OFFSET_PCT = 3.2;
