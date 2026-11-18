export interface Product {
  id: string; slug: string; name: string; price: number;
  front: string; back: string;          // image paths under /public
  sizes: string[]; soldOut?: string[];  // sizes that cannot be ordered
}
// !!! Price per T-shirt in PKR — set the real price here (one price for all, or edit per colour below).
const PRICE = 2500;
const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const COLOURS = ['Black', 'Brown', 'Green', 'Grey', 'Lime Green', 'Maroon', 'Navy Blue', 'Orange', 'Pink', 'Purple', 'Royal Blue', 'Sky Blue', 'Teal', 'White', 'Yellow'];
export const PRODUCTS: Product[] = COLOURS.map((c, i) => {
  const id = String(i + 1).padStart(2, '0');
  return { id, slug: c.toLowerCase().replace(/\s+/g, '-') + '-tee', name: `${c} T-Shirt`, price: PRICE, front: `/products/${id}-front.webp`, back: `/products/${id}-back.webp`, sizes: SIZES };
});
