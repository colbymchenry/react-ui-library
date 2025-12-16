/**
 * Tailwind CSS Preset for @colbymchenry/react-ui-library
 * 
 * This preset includes all required configuration for the component library.
 * Simply add this preset to your Tailwind config to use the library.
 * 
 * Usage:
 * // tailwind.config.js
 * export default {
 *   presets: [require('@colbymchenry/react-ui-library/preset')],
 *   content: ['./app/**\/*.{js,ts,jsx,tsx}'],
 * };
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: '#D11212',
        secondary: '#B00F0F',
        
        // Background colors
        'background-light': '#FAFAFA',
        'background-dark': '#111827',
        
        // Card colors
        'card-light': '#FFFFFF',
        'card-dark': '#1F2937',
        
        // Text colors
        'text-light': '#111827',
        'text-dark': '#F3F4F6',
        'text-muted-light': '#6B7280',
        'text-muted-dark': '#9CA3AF',
        
        // Border colors
        'border-light': '#E5E7EB',
        'border-dark': '#374151',
      },
    },
  },
};

