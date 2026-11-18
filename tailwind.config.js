/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    fontFamily: { sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'] },
    keyframes: { sway: { '0%,100%': { transform: 'rotate(0deg)' }, '25%': { transform: 'rotate(1.6deg)' }, '75%': { transform: 'rotate(-1.6deg)' } }, fade: { from: { opacity: 0 }, to: { opacity: 1 } }, slide: { from: { transform: 'translateX(100%)' }, to: { transform: 'none' } } },
    animation: { sway: 'sway 1.6s ease-in-out', fade: 'fade .35s ease both', slide: 'slide .3s cubic-bezier(.2,.8,.2,1) both' },
  } },
  plugins: [],
};
