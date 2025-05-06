/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'primary': '#4318ff',
                'primary-hover': '#603cff',
                'text-primary': '#1b2559',
                'text-secondary': '#718096',
                'border-light': '#e0e5f2',
                'bg-light': '#f4f7fe',
            },
        },
    },
    plugins: [],
}