# @colbymchenry/react-ui-library

A modern, accessible React component library built with TypeScript and Tailwind CSS. Features form components, dialogs, date pickers, phone inputs, and more with built-in Formik integration and dark mode support.

## ✨ Features

- 🎨 **Tailwind CSS** - Utility-first styling
- 🌓 **Dark Mode** - Built-in dark mode support
- 📝 **Formik Ready** - Seamless form integration
- 🔒 **TypeScript** - Full type safety
- ♿ **Accessible** - ARIA compliant components
- ⚡ **Bun Optimized** - Fast builds and installs
- 📦 **Tree Shakeable** - Import only what you need

## 🚀 Installation

### Install from GitHub

```bash
# Using Bun (recommended)
bun add github:colbymchenry/react-ui-library

# Using npm
npm install github:colbymchenry/react-ui-library

# Using yarn
yarn add github:colbymchenry/react-ui-library
```

### Install Specific Version/Tag

```bash
# Install from a specific release tag
bun add github:colbymchenry/react-ui-library#v1.0.0

# Install from a specific branch
bun add github:colbymchenry/react-ui-library#develop

# Install from a specific commit
bun add github:colbymchenry/react-ui-library#a1b2c3d
```

> **Having import issues?** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common solutions.

## 📦 Setup

### 1. Install Peer Dependencies

```bash
bun add react react-dom formik
```

### 2. Import Styles

In your root layout or main CSS file:

```tsx
// app/layout.tsx or app/globals.css
import '@colbymchenry/react-ui-library/styles';
```

### 3. Configure Tailwind

Add the library to your `tailwind.config.js` content array:

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
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

### 4. Add Material Icons (Optional)

If using components with icons (DatePicker, Dialog, etc.), add Material Symbols to your `<head>`:

```html
<link 
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" 
  rel="stylesheet" 
/>
```

## 🎨 Components

### Form Components

- **Input** - Text input with Formik support
- **Select** - Dropdown select with option children
- **FormGroup** - Polymorphic input/select (renders based on children)
- **Combobox** - Searchable select with filtering
- **DatePicker** - Calendar date picker
- **PhoneInput** - Country code + phone number input
- **AddMinus** - Quantity selector with +/- buttons

### Layout Components

- **Dialog** - Modal with fixed header/footer and scrollable content
- **Dropdown** - Positioned dropdown menu
- **Header** - Page header
- **PageShell** - Page layout wrapper
- **SectionHeader** - Section title with icon

### UI Components

- **Button** - Multiple variants (primary, secondary, pill, ghost, link)
- **Badge** - Status and feature badges
- **Typography** - Consistent text styling with variants
- **ThemeToggle** - Dark mode toggle
- **MaterialIcon** - Material Icons wrapper
- **Card** - Card container

## 📖 Usage Examples

### Basic Form

```tsx
import { FormGroup, Button } from '@colbymchenry/react-ui-library';

function MyForm() {
  return (
    <form>
      <FormGroup label="Email" name="email" type="email" />
      
      <FormGroup label="Country" name="country">
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </FormGroup>
      
      <Button variant="primary">Submit</Button>
    </form>
  );
}
```

### With Formik

```tsx
import { useFormik } from 'formik';
import { FormGroup, DatePicker, PhoneInput } from '@colbymchenry/react-ui-library';

function MyForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      birthDate: new Date(),
      phone: '',
    },
    onSubmit: (values) => console.log(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup 
        formik={formik} 
        name="email" 
        label="Email" 
        type="email" 
      />
      
      <DatePicker 
        formik={formik} 
        name="birthDate" 
        label="Birth Date" 
      />
      
      <PhoneInput 
        formik={formik} 
        name="phone" 
        label="Phone Number" 
      />
    </form>
  );
}
```

### Dialog with Footer

```tsx
import { Dialog, Button } from '@colbymchenry/react-ui-library';

function MyDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title="Subscription Details"
      subtitle="Manage your coffee subscription"
      closedBy="any"
      footer={
        <>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </>
      }
    >
      <div>Your scrollable content here</div>
    </Dialog>
  );
}
```

### Typography

```tsx
import { Typography } from '@colbymchenry/react-ui-library';

function Content() {
  return (
    <>
      <Typography variant="h1">Welcome</Typography>
      <Typography variant="body">
        This is body text with automatic dark mode support.
      </Typography>
      <Typography variant="caption">Last updated: Today</Typography>
    </>
  );
}
```

## 🎨 Tailwind CSS

This library is designed to work with Tailwind CSS. Ensure you have Tailwind configured in your consuming application with the following color variables:

```js
// tailwind.config.js
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#D11212',
        secondary: '#B00F0F',
        'background-light': '#FAFAFA',
        'background-dark': '#111827',
        // ... see documentation for full color palette
      },
    },
  },
};
```

## 🌓 Dark Mode

The library supports dark mode out of the box using Tailwind's class-based dark mode. Use the `ThemeToggle` component or add the `dark` class to your `<html>` element.

## 🔧 Development

### Build the Library

```bash
bun run build
```

This will:
1. Clean the dist folder
2. Bundle all components into a single ESM module using Bun's bundler
3. Generate TypeScript declarations
4. Copy CSS files and assets to dist

### Type Check

```bash
bun run type-check
```

## 📝 Requirements

- React ^19.0.0
- React DOM ^19.0.0
- Formik ^2.4.9 (for form components)
- Tailwind CSS (configured in your app)

## 🤝 Contributing

1. Clone the repository
2. Install dependencies: `bun install`
3. Make your changes
4. Build: `bun run build`
5. Test in a consuming app using `bun link`

## 📄 License

MIT

## 🔗 Links

- [Repository](https://github.com/your-username/react-ui-library)
- [Issues](https://github.com/your-username/react-ui-library/issues)
