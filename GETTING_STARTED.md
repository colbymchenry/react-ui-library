# Getting Started with the Component Library

## 📦 What You Have

Your component library is now a standalone npm package that can be installed directly from GitHub without publishing to npm.

## 🏗️ Project Structure

```
react-ui-library/
├── src/
│   ├── components/        # All React components
│   │   ├── material-icon/
│   │   ├── ui-button/
│   │   ├── ui-input/
│   │   ├── ui-dialog/
│   │   └── ...
│   ├── lib/              # Utilities
│   │   └── cx.ts         # Class name helper
│   ├── styles/           # CSS files
│   │   ├── index.css     # Main styles export
│   │   ├── dialog.css
│   │   ├── dropdown.css
│   │   └── ...
│   ├── assets/           # Static assets
│   │   └── countries.json
│   └── index.ts          # Main exports
├── dist/                 # Built output (generated)
├── package.json
├── tsconfig.json
├── bunfig.toml
├── .github/
│   └── workflows/        # CI/CD pipelines
├── README.md
├── CHANGELOG.md
└── INSTALLATION.md
```

## 🚀 Next Steps

### 1. Push to GitHub

```bash
cd react-ui-library

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Component library setup"

# Create GitHub repository (via GitHub UI or CLI)
# Then add remote and push
git remote add origin https://github.com/colbymchenry/react-ui-library.git
git branch -M main
git push -u origin main
```

### 2. Create First Release

```bash
# Tag version 1.0.0
git tag -a v1.0.0 -m "Release v1.0.0 - Initial release"
git push origin v1.0.0
```

### 3. Install in Your App

In your main project (`volcanica-customer-dashboard`):

```bash
cd ../volcanica-customer-dashboard
bun add github:colbymchenry/react-ui-library#v1.0.0
```

### 4. Configure Your App

Update your app's `tailwind.config.mjs` to include the library:

```js
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@colbymchenry/react-ui-library/dist/**/*.js',
  ],
  // ... rest of your config
};
```

Import styles in `app/layout.tsx`:

```tsx
import '@colbymchenry/react-ui-library/styles';
import './globals.css';
```

### 5. Start Using Components

```tsx
import { Button, FormGroup, Dialog } from '@colbymchenry/react-ui-library';

export default function MyPage() {
  return (
    <div>
      <FormGroup label="Email" name="email" type="email" />
      <Button variant="primary">Submit</Button>
    </div>
  );
}
```

## 🔄 Development Workflow

### Making Changes to the Library

1. **Edit components** in `src/components/`
2. **Run type check:** `bun run type-check`
3. **Build:** `bun run build`
4. **Test in consuming app** using `bun link`
5. **Commit changes:** `git add . && git commit -m "feat: add new feature"`
6. **Bump version** in `package.json`
7. **Create tag:** `git tag -a v1.1.0 -m "Release v1.1.0"`
8. **Push:** `git push origin main --tags`

### Testing Changes Locally (Before Release)

```bash
# In library
cd react-ui-library
bun link
bun run build --watch  # Rebuild on changes

# In your app (different terminal)
cd ../volcanica-customer-dashboard
bun link @colbymchenry/react-ui-library
bun dev
```

Any changes you make to the library will be reflected in your app after rebuilding.

### Unlinking (Return to Published Version)

```bash
cd volcanica-customer-dashboard
bun unlink @colbymchenry/react-ui-library
bun install --force
```

## 📝 Available Scripts

In the library directory:

```bash
bun run build        # Clean, compile TypeScript, copy CSS
bun run build:clean  # Remove dist folder
bun run build:ts     # Compile TypeScript only
bun run build:css    # Copy CSS files only
bun run type-check   # Run TypeScript type checking
```

## 🎯 Features

### ✅ What's Included

- ✅ TypeScript compilation with declaration files
- ✅ Source maps for debugging
- ✅ CSS files bundled
- ✅ Assets (countries.json) included
- ✅ Tree-shakeable exports
- ✅ Formik integration
- ✅ Dark mode support
- ✅ GitHub Actions CI/CD
- ✅ Comprehensive documentation

### 📦 What Gets Published

When users install from GitHub, they get:
- `dist/` - Compiled JavaScript + TypeScript declarations
- `src/assets/` - Static assets (countries.json)
- `README.md` - Documentation

Source code is NOT included in the package (stays in GitHub).

## 🔐 Private Repository

If you want to keep the library private:

1. Make the GitHub repo private
2. Users need to authenticate to install:

```bash
# Generate a GitHub Personal Access Token
# Then install with:
bun add git+https://YOUR_TOKEN@github.com/colbymchenry/react-ui-library.git#v1.0.0
```

Or use SSH:

```bash
bun add git+ssh://git@github.com/colbymchenry/react-ui-library.git#v1.0.0
```

## 📚 Additional Resources

- [INSTALLATION.md](./INSTALLATION.md) - Detailed installation guide
- [PUBLISHING.md](./PUBLISHING.md) - How to release new versions
- [CHANGELOG.md](./CHANGELOG.md) - Version history
- [README.md](./README.md) - Component documentation

## 🎉 You're Ready!

Your component library is now:
- ✅ Built and ready to use
- ✅ Configured for GitHub installation
- ✅ Set up with CI/CD
- ✅ Fully documented

Push to GitHub and start using it in your projects! 🚀

