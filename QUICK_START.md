# Quick Start Guide

Get up and running with `@colbymchenry/react-ui-library` in under 2 minutes! ⚡

---

## Installation (3 Commands)

```bash
# 1. Install the library
bun add github:colbymchenry/react-ui-library

# 2. Install peer dependencies
bun add react react-dom formik

# 3. Done! Configure Tailwind (see below)
```

---

## Tailwind Configuration (Copy & Paste)

Create or update your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  presets: [require('@colbymchenry/react-ui-library/preset')],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@colbymchenry/react-ui-library/dist/**/*.js',
  ],
};
```

---

## Start Building 🚀

### Import and Use Components

```tsx
'use client';

import { useState } from 'react';
import { 
  Button, 
  FormGroup, 
  Dialog, 
  Typography,
  ThemeToggle 
} from '@colbymchenry/react-ui-library';

export default function MyPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark p-8">
      {/* Header with Theme Toggle */}
      <div className="flex justify-between items-center mb-8">
        <Typography variant="h1">Welcome</Typography>
        <ThemeToggle />
      </div>

      {/* Form */}
      <div className="max-w-md space-y-4">
        <FormGroup 
          label="Email" 
          name="email" 
          type="email" 
          placeholder="you@example.com"
        />
        
        <FormGroup label="Country" name="country">
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
        </FormGroup>

        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Open Dialog
        </Button>
      </div>

      {/* Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Welcome Dialog"
        subtitle="This is a dialog component"
        closedBy="any"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </>
        }
      >
        <Typography variant="body">
          This is the content of the dialog. It can scroll independently
          while the header and footer remain fixed.
        </Typography>
      </Dialog>
    </div>
  );
}
```

---

## Optional: Material Icons

Some components (DatePicker, Dialog) use Material Symbols. Add to your `app/layout.tsx`:

```tsx
export default function RootLayout({ children }) {
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

## Component Examples

### Buttons

```tsx
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="pill">Pill Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>
```

### Typography

```tsx
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="body">Body text</Typography>
<Typography variant="caption">Caption text</Typography>
```

### Form with Formik

```tsx
import { useFormik } from 'formik';
import { FormGroup, Button } from '@colbymchenry/react-ui-library';

function MyForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <FormGroup
        formik={formik}
        name="email"
        label="Email"
        type="email"
      />
      
      <FormGroup
        formik={formik}
        name="name"
        label="Full Name"
        type="text"
      />
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
```

### Dark Mode

```tsx
import { ThemeToggle } from '@colbymchenry/react-ui-library';

function MyComponent() {
  return (
    <div className="bg-background-light dark:bg-background-dark">
      <ThemeToggle />
      {/* Content automatically adapts to dark mode */}
    </div>
  );
}
```

---

## Available Components

### Forms
- `Input` - Text input
- `Select` - Dropdown select
- `FormGroup` - Smart input/select (polymorphic)
- `Combobox` - Searchable select
- `DatePicker` - Calendar date picker
- `PhoneInput` - Phone with country code
- `AddMinus` - Quantity selector

### Layout
- `Dialog` - Modal dialog
- `Dropdown` - Dropdown menu
- `Header` - Page header
- `PageShell` - Page layout
- `SectionHeader` - Section title
- `Card` - Card container

### UI
- `Button` - Button with variants
- `Badge` - Status badges
- `Typography` - Text with variants
- `ThemeToggle` - Dark mode toggle
- `MaterialIcon` - Material icons

---

## Next Steps

- 📖 Read the full [INSTALLATION.md](./INSTALLATION.md) for advanced configuration
- 🔧 See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) if you run into issues
- 🎨 Learn about [customization options](./README.md#customization)
- 🔄 Upgrading from an older version? See [MIGRATION.md](./MIGRATION.md)

---

## Need Help?

- **Installation Issues**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Configuration Help**: See [INSTALLATION.md](./INSTALLATION.md)
- **Component Examples**: See [README.md](./README.md)
- **Migration Guide**: See [MIGRATION.md](./MIGRATION.md)

Happy coding! 🎉

