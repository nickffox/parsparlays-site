
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#eef9ff',
                    100: '#d8f0ff',
                    200: '#b8e4ff',
                    300: '#86d2ff',
                    400: '#4abaff',
                    500: '#0ea5e9',
                    600: '#098fd0',
                    700: '#0a75a9',
                    800: '#0c5f88',
                    900: '#0e4f70'
                }
            },
        },
    },
    plugins: [],
}    