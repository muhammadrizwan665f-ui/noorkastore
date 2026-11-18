export interface Product {
  id: string; slug: string; name: string; price: number;
  front: string; back: string;          // image paths under /public
  sizes: string[]; soldOut?: string[];  // sizes that cannot be ordered
}
const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const P = (n: number, name: string, price: number, soldOut: string[] = []): Product => {
  const id = String(n).padStart(2, '0');
  return { id, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + id, name, price, front: `/products/${id}-front.svg`, back: `/products/${id}-back.svg`, sizes: SIZES, soldOut };
};
// PLACEHOLDER LIST — replace names, prices and image files with the real 15 pieces.
export const PRODUCTS: Product[] = [
  P(1, 'Essential Tee Sand', 3200), P(2, 'Field Jacket Rust', 14500), P(3, 'Poplin Shirt Navy', 6800), P(4, 'Hooded Sweat Black', 9800, ['XXL']),
  P(5, 'Essential Tee Sage', 3200), P(6, 'Work Shirt Stone', 7200), P(7, 'Coach Jacket Ink', 12800), P(8, 'Hooded Sweat Grey', 9800),
  P(9, 'Poplin Shirt White', 6800), P(10, 'Essential Tee Clay', 3200, ['S']), P(11, 'Field Jacket Olive', 14500), P(12, 'Work Shirt Sky', 7200),
  P(13, 'Hooded Sweat Plum', 9800), P(14, 'Coach Jacket Sand', 12800), P(15, 'Essential Tee Ink', 3200),
];
