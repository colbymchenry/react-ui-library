# Troubleshooting Guide

## Import Issues

### Problem: "Cannot find module" errors when importing components

**Solution**: This has been fixed in version 1.0.2+ by switching from TypeScript compilation to Bun's bundler.

#### What was wrong:
- The previous build used TypeScript's compiler (`tsc`) which created separate files for each component
- TypeScript with `module: "ESNext"` doesn't add `.js` extensions to import statements
- Many Node.js environments require explicit file extensions for ESM modules
- This caused module resolution failures in projects trying to use the library

#### What we fixed:
1. Created a custom build script (`build.ts`) using Bun's bundler
2. Bun bundles all components into a single `dist/index.js` file
3. This eliminates the need for file extensions in relative imports
4. TypeScript declarations are still generated separately for full type support

### Correct Usage

After installing the package:

```bash
npm install @colbymchenry/react-ui-library
# or
bun add @colbymchenry/react-ui-library
```

Import components like this:

```typescript
import { Button, Card, Input, Select } from '@colbymchenry/react-ui-library';
import '@colbymchenry/react-ui-library/styles';
```

### Required Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react@^19.0.0 react-dom@^19.0.0
# or
bun add react@^19.0.0 react-dom@^19.0.0
```

### TypeScript Configuration

For best compatibility with this library, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "react-jsx"
  }
}
```

### CSS Imports

Don't forget to import the styles in your application's entry point:

```typescript
import '@colbymchenry/react-ui-library/styles';
```

If you're using Tailwind CSS, the components expect these colors to be defined in your `tailwind.config.js`:
- `primary`
- `secondary`
- `accent-purple`
- `active-green`
- `active-bg`

### Build Issues

If you're still experiencing issues after updating:

1. **Clear your node_modules and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Clear your build cache**:
   ```bash
   # For Next.js
   rm -rf .next
   
   # For Vite
   rm -rf node_modules/.vite
   
   # For Remix
   rm -rf .cache build
   ```

3. **Verify the package version**:
   ```bash
   npm list @colbymchenry/react-ui-library
   ```
   
   Make sure you're on version 1.0.2 or higher.

### Module Resolution Errors in Specific Bundlers

#### Webpack
Add to your `webpack.config.js`:
```javascript
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fullySpecified: false
  }
};
```

#### Vite
Usually works out of the box, but if you encounter issues, add to `vite.config.ts`:
```typescript
export default defineConfig({
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
});
```

## Getting Help

If you're still experiencing issues:

1. Check the [GitHub Issues](https://github.com/colbymchenry/react-ui-library/issues)
2. Create a new issue with:
   - Your package.json dependencies
   - Your bundler and version (webpack, vite, etc.)
   - The exact error message
   - Node.js version (`node --version`)

