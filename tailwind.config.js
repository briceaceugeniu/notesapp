import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            height: {
                '80vh': '80vh',
            },
            boxShadow: {
                'ct1': '0 0 12px 10px rgba(244, 241, 245, 1)',
            },
            backgroundColor: {
                'ct1': 'rgba(244, 241, 245, 1)',
                'ct2': 'rgb(244 241 245 / 52%)',
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
