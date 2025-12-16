# Installation Guide

This guide walks you through installing and configuring the component library in your Next.js application.

## Step 1: Install from GitHub

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

## Step 2: Install Required Peer Dependencies

```bash
bun add react react-dom formik
```

## Step 3: Import Styles

In your `app/layout.tsx` or `app/globals.css`:

```tsx
// app/layout.tsx
import '@colbymchenry/react-ui-library/styles';
import './globals.css';
```

Or in your CSS:

```css
/* app/globals.css */
@import '@colbymchenry/react-ui-library/styles';
```

## Step 4: Configure Tailwind CSS

Update your `tailwind.config.js` or `tailwind.config.mjs`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // IMPORTANT: Use class-based dark mode
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Add the component library to content scanning
    './node_modules/@colbymchenry/react-ui-library/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // Required color variables for the library
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

## Step 5: Add Material Symbols Font

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

## Step 6: Start Using Components

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

## Troubleshooting

### Components Not Styled Correctly

**Problem:** Components appear unstyled or broken.

**Solution:** 
1. Make sure you imported the styles: `import '@colbymchenry/react-ui-library/styles';`
2. Verify Tailwind config includes the library in `content` array
3. Ensure required color variables are in your Tailwind config

### Dark Mode Not Working

**Problem:** Dark mode styles not applying.

**Solution:**
1. Set `darkMode: 'class'` in your `tailwind.config.js`
2. Use the `ThemeToggle` component or manually add `dark` class to `<html>`
3. Ensure you have dark mode color variables configured

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

