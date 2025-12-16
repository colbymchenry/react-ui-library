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

## 🚀 Quick Start

```bash
# 1. Install the library
bun add github:colbymchenry/react-ui-library

# 2. Install peer dependencies
bun add react react-dom formik
```

Then add the preset to your `tailwind.config.js`:

```js
export default {
  presets: [require('@colbymchenry/react-ui-library/preset')],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@colbymchenry/react-ui-library/dist/**/*.js',
  ],
};
```

**That's it!** Start using components immediately. 🎉

> 📚 **New to the library?** See [QUICK_START.md](./QUICK_START.md) for a guided tutorial with examples.

### Install Specific Version

```bash
# Install from a specific release tag
bun add github:colbymchenry/react-ui-library#v1.0.3

# Install from a specific branch
bun add github:colbymchenry/react-ui-library#develop

# Install from a specific commit
bun add github:colbymchenry/react-ui-library#a1b2c3d
```

> **Having issues?** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for solutions.

## 📦 Setup (2 Steps)

### 1. Install Peer Dependencies

```bash
bun add react react-dom formik
```

### 2. Add Library to Tailwind Content

Update your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    // ⚠️ REQUIRED: Add this line
    './node_modules/@colbymchenry/react-ui-library/dist/**/*.js',
  ],
  // ... rest of your config
};
```

**That's it!** ✨ Everything else is automatic:
- ✅ Component styles auto-import
- ✅ Works with your existing Tailwind config
- ✅ No additional configuration needed

> **Why is this required?** Tailwind must scan the library to generate CSS for its utility classes. This is unavoidable for any Tailwind-based component library.

### 3. Add Material Icons (Optional)

If using components with icons (DatePicker, Dialog, etc.), add Material Symbols to your `<head>`:

```html
<link 
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" 
  rel="stylesheet" 
/>
```

> **📚 Full Installation Guide:** See [INSTALLATION.md](./INSTALLATION.md) for detailed setup instructions and advanced configuration options.

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

## 🎨 Customization

### Custom Colors

Define colors in your Tailwind config to customize the library:

```js
// tailwind.config.js
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@colbymchenry/react-ui-library/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF0000',    // Customize library colors
        secondary: '#CC0000',
        brand: '#123456',      // Add your own colors
      },
    },
  },
};
```

### Using the Preset (Optional)

For the library's complete theme configuration:

```js
export default {
  presets: [require('@colbymchenry/react-ui-library/preset')],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@colbymchenry/react-ui-library/dist/**/*.js',
  ],
};
```

The preset includes:
- ✅ Colors (primary, backgrounds, text, borders, accents)
- ✅ Typography (display and body fonts)
- ✅ Border radius values
- ✅ Box shadows
- ✅ Dark mode configuration

For more options, see [INSTALLATION.md](./INSTALLATION.md).

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
