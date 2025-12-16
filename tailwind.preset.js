/**
 * Tailwind CSS Preset for @colbymchenry/react-ui-library
 * 
 * This preset includes all required configuration for the component library:
 * - Color palette (primary, backgrounds, text, borders, accents)
 * - Typography (font families for display and body text)
 * - Border radius values (default, xl, 2xl)
 * - Box shadows (soft, card, float)
 * - Dark mode configuration (class-based)
 * 
 * Usage:
 * // tailwind.config.js
 * export default {
 *   presets: [require('@colbymchenry/react-ui-library/preset')],
 *   content: [
 *     './app/**\/*.{js,ts,jsx,tsx}',
 *     './node_modules/@colbymchenry/react-ui-library/dist/**\/*.js',
 *   ],
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
        
        // Accent colors
        'accent-purple': '#8B5CF6',
        'gift-bg': '#F5F3FF',
        'active-green': '#10B981',
        'active-bg': '#ECFDF5',
        'warn-orange': '#F59E0B',
        'light-orange-bg': '#FFFBEB',
      },
      
      fontFamily: {
        // Display font for headings (h1-h6)
        display: ['var(--font-display)', 'sans-serif'],
        // Body font for regular text
        body: ['var(--font-body)', 'sans-serif'],
      },
      
      borderRadius: {
        // Default border radius for components
        DEFAULT: '0.5rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      
      boxShadow: {
        // Subtle shadow for hover states
        soft: '0 2px 10px rgba(0, 0, 0, 0.03)',
        // Shadow for card components
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        // Elevated shadow for dialogs and dropdowns
        float: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [
    (() => {
      try {
        // eslint-disable-next-line global-require
        return require('@tailwindcss/forms');
      } catch {
        return undefined;
      }
    })(),
    (() => {
      try {
        // eslint-disable-next-line global-require
        return require('@tailwindcss/container-queries');
      } catch {
        return undefined;
      }
    })(),
  ].filter(Boolean),
};

