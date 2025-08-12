export const API_BASE =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_API_URL
    : (import.meta.env.VITE_API_URL ?? 'http://localhost:3000');

console.log('API_BASE =', API_BASE);
