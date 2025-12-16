# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2024-12-16

### Fixed
- **Critical**: Fixed module resolution issues that prevented components from being imported in consuming projects
- Replaced TypeScript compiler (`tsc`) with Bun's bundler for proper ESM module generation
- Bundle now outputs a single `index.js` file, eliminating relative import path issues
- Updated TypeScript configuration from `moduleResolution: "bundler"` to `moduleResolution: "node"` for better compatibility
- Added `build:assets` step to ensure assets folder is copied to dist

### Changed
- Refactored build process to use custom `build.ts` script with Bun's native bundler
- Improved package.json exports configuration with explicit `default` export
- Added `./assets/*` and `./package.json` to exports map for better package consumption
- Simplified npm scripts (removed separate build:clean, build:ts, build:css, build:assets scripts)

### Added
- Added `TROUBLESHOOTING.md` with comprehensive guide for installation and import issues
- Better build logging with emoji indicators for each build step
- Source maps for both JavaScript and TypeScript declarations

## [1.0.0] - 2024-12-16

### Added
- Initial release
- Form components: Input, Select, FormGroup, Combobox, DatePicker, PhoneInput, AddMinus
- Layout components: Dialog, Dropdown, Header, PageShell, SectionHeader
- UI components: Button, Badge, Typography, ThemeToggle, MaterialIcon, Card
- Dark mode support with class-based toggling
- Formik integration for all form components
- TypeScript definitions
- Tailwind CSS styling
- Comprehensive component documentation

### Features
- Fixed header/footer in Dialog with scrollable content
- Searchable Combobox with country flags support
- Calendar-based DatePicker
- Phone input with country code selector
- Quantity selector with +/- controls
- 6 button variants (primary, secondary, pill, small-pill, link, ghost)
- 9 typography variants
- Polymorphic FormGroup (auto-renders as input or select)

## [Unreleased]

### Planned
- Component playground/documentation site
- Additional form validation helpers
- More card variants
- Animation utilities
- Testing utilities

