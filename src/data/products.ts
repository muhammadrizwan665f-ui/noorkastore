export interface Product {
  id: string; slug: string; name: string; price: number;
  front: string; back: string;          // image paths under /public
  sizes: string[]; soldOut?: string[];  // sizes that cannot be ordered
}
// Price per T-shirt in PKR (Rs. 999 as in the design) — change here (one price for all, or edit per colour below).
const PRICE = 999;
const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const COLOURS = ['Black', 'Brown', 'Green', 'Grey', 'Lime Green', 'Maroon', 'Navy Blue', 'Orange', 'Pink', 'Purple', 'Royal Blue', 'Sky Blue', 'Teal', 'White', 'Yellow'];
export const PRODUCTS: Product[] = COLOURS.map((c, i) => {
  const id = String(i + 1).padStart(2, '0');
  return { id, slug: c.toLowerCase().replace(/\s+/g, '-') + '-tee', name: `${c} T-Shirt`, price: PRICE, front: `/products/${id}-front.webp`, back: `/products/${id}-back.webp`, sizes: SIZES };
});

// Homepage sections. New Arrivals = first 6 colours; Best Sellers = these ids (edit to match what really sells best).
export const NEW_ARRIVALS = PRODUCTS.slice(0, 6);
const BEST_IDS = ['07', '12', '10', '13', '14', '15'];
export const BEST_SELLERS = BEST_IDS.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean);
