import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            'white': '#ffffff',
            'black': '#000000',
            'cor-80': '#443266',
            'cor-70': '#613B7D',
            'cor-60': '#8C489F',
            'cor-50': '#AD92C9',
            'cinza-escuro': '#434365',
            'cinza': '#8383A5',
            'cinza-claro': '#C3C3E5',
            'bege': '#D2D7D3',
            'claro': '#F1F0FF',
            'primary': '#3A539B',
            'secondary': '#777B88',
            'success': '#16A085',
            'warning': '#F5AB35',
            'danger': '#C0392B',
          },
    },

    plugins: [forms],
};
