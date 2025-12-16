# Installation Guide

This guide walks you through installing and configuring the component library in your Next.js application.

## Quick Start (3 Steps) 🚀

### Step 1: Install the Library

```bash
cd your-project
bun add github:colbymchenry/react-ui-library#v1.0.0
```

**Your `package.json` will now include:**
```json
{
  "dependencies": {
    "@colbymchenry/react-ui-library": "github:colbymchenry/react-ui-library#v1.0.0"
  }
}
```

### Step 2: Install Required Peer Dependencies

```bash
bun add react react-dom formik
```

### Step 3: Configure Tailwind CSS

Update your `tailwind.config.js` or `tailwind.config.mjs`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  presets: [require('@colbymchenry/react-ui-library/preset')],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Required: Add the library to Tailwind's content scanning
    './node_modules/@colbymchenry/react-ui-library/dist/**/*.js',
  ],
};
```

**That's it!** 🎉 The preset automatically includes:
- ✅ Dark mode configuration (`darkMode: 'class'`)
- ✅ All required color tokens
- ✅ Component styles (auto-imported)

---

## Optional: Add Material Symbols Font

Some components use Material Symbols icons. Add this to your `app/layout.tsx`:

In your `app/layout.tsx`:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## Start Using Components

```tsx
import { 
  Button, 
  FormGroup, 
  Dialog, 
  Typography 
} from '@colbymchenry/react-ui-library';

export default function MyPage() {
  return (
    <div>
      <Typography variant="h1">Welcome</Typography>
      <FormGroup label="Email" name="email" type="email" />
      <Button variant="primary">Submit</Button>
    </div>
  );
}
```

---

## What's Automated? ✨

The library now handles these automatically:

1. **✅ Styles auto-import** - No need to manually import styles
2. **✅ Color configuration** - The preset includes all required colors
3. **✅ Dark mode setup** - Configured automatically via preset

## What You Still Need to Do?

**Only one thing:** Add the library to Tailwind's `content` array.

```js
content: [
  './node_modules/@colbymchenry/react-ui-library/dist/**/*.js',
]
```

**Why is this required?**  
The library uses Tailwind utility classes (like `bg-primary`, `hover:bg-secondary`). Tailwind's JIT compiler must scan the library files to generate the necessary CSS. This is unavoidable for any Tailwind-based component library.

## Updating the Library

To update to the latest version:

```bash
# Update to latest from main branch
bun update @colbymchenry/react-ui-library

# Or reinstall specific version
bun remove @colbymchenry/react-ui-library
bun add github:colbymchenry/react-ui-library#v1.1.0
```

## Local Development with `bun link`

If you're developing the library and want to test changes locally:

```bash
# In the library directory
cd react-ui-library
bun link

# In your consuming app
cd your-app
bun link @colbymchenry/react-ui-library

# After making changes to the library, rebuild
cd react-ui-library
bun run build
```

---

## Advanced Configuration

### Manual Style Import (Not Required)

If you need to manually control when styles load:

```tsx
// Instead of auto-import, you can still import manually
import '@colbymchenry/react-ui-library/styles';
```

### Custom Tailwind Configuration

If you need to customize colors or add your own:

```js
/** @type {import('tailwindcss').Config} */
export default {
  presets: [require('@colbymchenry/react-ui-library/preset')],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@colbymchenry/react-ui-library/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // Override library colors
        primary: '#FF0000', // Your custom primary color
        // Or add your own colors
        brand: '#123456',
      },
    },
  },
};
```

### Without Using the Preset

If you prefer not to use the preset, you can configure manually:

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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

---

## Troubleshooting

### Components Not Styled Correctly

**Problem:** Components appear unstyled or broken.

**Solution:** 
1. Ensure you're using the preset: `presets: [require('@colbymchenry/react-ui-library/preset')]`
2. Verify Tailwind config includes the library in `content` array
3. Run `bun run build` in your project to regenerate Tailwind CSS

### Dark Mode Not Working

**Problem:** Dark mode styles not applying.

**Solution:**
1. The preset automatically configures dark mode
2. Use the `ThemeToggle` component or manually add `dark` class to `<html>`
3. Make sure you're using the preset in your Tailwind config

### TypeScript Errors

**Problem:** Type errors when importing components.

**Solution:**
1. Make sure `@types/react` and `@types/react-dom` are installed
2. Check that your `tsconfig.json` includes `"moduleResolution": "bundler"`
3. Restart your TypeScript server

### Material Icons Not Showing

**Problem:** Icons appear as empty boxes or text.

**Solution:**
Add Material Symbols font to your layout:
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
```

### Styles Not Loading

**Problem:** Components have no styles at all.

**Solution:**
Styles should auto-import. If they don't:
1. Make sure you're importing components from the package
2. Check your bundler supports CSS imports in JS files
3. Manually import: `import '@colbymchenry/react-ui-library/styles'`

