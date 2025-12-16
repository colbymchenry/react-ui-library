# Migration Guide

## Upgrading to v1.0.3+ (Simplified Installation)

Starting with version 1.0.3, the library installation has been significantly simplified using a Tailwind preset and automatic style imports.

### What Changed?

1. **Styles Auto-Import**: No need to manually import styles
2. **Tailwind Preset**: Use a preset instead of copying color configuration
3. **Simpler Config**: Reduced Tailwind config to just 3 lines

---

## Migrating Your Configuration

### Before (v1.0.2 and earlier)

```tsx
// app/layout.tsx
import '@colbymchenry/react-ui-library/styles'; // Manual import required
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```js
// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@colbymchenry/react-ui-library/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D11212',
        secondary: '#B00F0F',
        'background-light': '#FAFAFA',
        'background-dark': '#111827',
        'card-light': '#FFFFFF',
        'card-dark': '#1F2937',
        'text-light': '#111827',
        'text-dark': '#F3F4F6',
        'text-muted-light': '#6B7280',
        'text-muted-dark': '#9CA3AF',
        'border-light': '#E5E7EB',
        'border-dark': '#374151',
      },
    },
  },
};
```

### After (v1.0.3+)

```tsx
// app/layout.tsx
// No style import needed - handled automatically!
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```js
// tailwind.config.js
export default {
  presets: [require('@colbymchenry/react-ui-library/preset')],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@colbymchenry/react-ui-library/dist/**/*.js',
  ],
};
```

---

## Step-by-Step Migration

### Step 1: Update the Library

```bash
# Update to latest version
bun update @colbymchenry/react-ui-library

# Or reinstall specific version
bun remove @colbymchenry/react-ui-library
bun add github:colbymchenry/react-ui-library#v1.0.3
```

### Step 2: Remove Manual Style Import (Optional)

Remove this line from your `app/layout.tsx` or root file:

```tsx
// ❌ Remove this - no longer needed
import '@colbymchenry/react-ui-library/styles';
```

**Note:** You can keep this import if you want manual control over when styles load. Both approaches work!

### Step 3: Simplify Your Tailwind Config

Replace your existing config with the preset:

```js
/** @type {import('tailwindcss').Config} */
export default {
  presets: [require('@colbymchenry/react-ui-library/preset')],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@colbymchenry/react-ui-library/dist/**/*.js',
  ],
  // You can still add your own theme extensions
  theme: {
    extend: {
      // Your custom colors, fonts, etc.
    },
  },
};
```

### Step 4: Test Your Application

1. Restart your dev server
2. Verify components render correctly
3. Test dark mode functionality
4. Check that all colors match your expectations

---

## Keeping Custom Colors

If you customized the library's colors in your old config, you can still override them:

```js
export default {
  presets: [require('@colbymchenry/react-ui-library/preset')],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@colbymchenry/react-ui-library/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // Override library defaults
        primary: '#FF0000',
        secondary: '#CC0000',
        // Add your own colors
        brand: '#123456',
      },
    },
  },
};
```

---

## Not Using the Preset

If you prefer to manually configure everything (not recommended), you can continue using your old configuration. Just make sure to:

1. Keep the manual style import: `import '@colbymchenry/react-ui-library/styles';`
2. Maintain all color variables in your Tailwind config
3. Set `darkMode: 'class'` in your config

---

## Troubleshooting

### Styles Not Loading After Migration

**Solution:**
1. Clear your build cache: `rm -rf .next` (or equivalent for your framework)
2. Restart your dev server
3. If issues persist, manually import: `import '@colbymchenry/react-ui-library/styles';`

### Colors Look Different

**Solution:**
The preset uses the same colors as before. If colors look different:
1. Make sure you're not overriding colors elsewhere in your config
2. Clear your Tailwind cache
3. Rebuild your project

### TypeScript Errors

**Solution:**
1. Restart your TypeScript server
2. Run `bun install` to ensure all dependencies are updated
3. Check that `@types/react` and `@types/react-dom` are installed

---

## Benefits of the New Approach

✅ **Simpler Setup**: 3 lines instead of 30+  
✅ **Less Maintenance**: No need to keep color config in sync  
✅ **Automatic Updates**: Preset updates with library updates  
✅ **Still Flexible**: Can override any setting you need  
✅ **Better DX**: Works out of the box, no config churn

---

## Need Help?

- See [INSTALLATION.md](./INSTALLATION.md) for detailed setup instructions
- See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues
- Open an issue on GitHub if you encounter problems

