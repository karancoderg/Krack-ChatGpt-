/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all JS/TS/React files in src/
    "./app/**/*.{js,ts,jsx,tsx}", // If using Next.js App Router
    "./components/**/*.{js,ts,jsx,tsx}", // If you have a components folder
  ],
  theme: { extend: {} },
  plugins: [],
};
