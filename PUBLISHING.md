# Publishing Guide

How to publish new versions of the component library to GitHub.

## Prerequisites

1. GitHub repository set up
2. All changes committed
3. Build passes successfully

## Release Process

### 1. Update Version

Update the version in `package.json`:

```json
{
  "version": "1.1.0"
}
```

### 2. Update Changelog

Add your changes to `CHANGELOG.md`:

```markdown
## [1.1.0] - 2024-12-17

### Added
- New component: XYZ
- Feature: ABC

### Fixed
- Bug in component DEF
```

### 3. Commit Changes

```bash
git add .
git commit -m "chore: bump version to 1.1.0"
```

### 4. Create Git Tag

```bash
# Create annotated tag
git tag -a v1.1.0 -m "Release v1.1.0"

# Push commits and tags
git push origin main
git push origin v1.1.0
```

### 5. Verify Release

- GitHub Actions will automatically run tests and build
- A GitHub Release will be created automatically
- Users can now install: `bun add github:colbymchenry/react-ui-library#v1.1.0`

## Quick Release Script

You can create a release script in `package.json`:

```json
{
  "scripts": {
    "release": "bun run build && git add . && git commit -m 'chore: release' && git push"
  }
}
```

## Versioning Guidelines

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features (backward compatible)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes (backward compatible)

### Examples

- New component: **MINOR** (1.0.0 → 1.1.0)
- Breaking API change: **MAJOR** (1.0.0 → 2.0.0)
- Bug fix: **PATCH** (1.0.0 → 1.0.1)
- New prop (optional): **MINOR** (1.0.0 → 1.1.0)
- Prop renamed: **MAJOR** (1.0.0 → 2.0.0)

## Testing Before Release

### 1. Build Successfully

```bash
bun run build
```

### 2. Type Check Passes

```bash
bun run type-check
```

### 3. Test in Consuming App

Use `bun link` to test locally before publishing:

```bash
# In library
cd react-ui-library
bun link
bun run build

# In your app
cd ../volcanica-customer-dashboard
bun link @colbymchenry/react-ui-library
```

## Unpublishing/Deleting a Tag

If you need to delete a release:

```bash
# Delete local tag
git tag -d v1.1.0

# Delete remote tag
git push origin :refs/tags/v1.1.0

# Also delete the GitHub Release via GitHub UI
```

## Branch Strategy

- `main` - Stable, production-ready code
- `develop` - Development branch for next release
- `feature/*` - Feature branches

```bash
# Create feature branch
git checkout -b feature/new-component

# When ready, merge to develop
git checkout develop
git merge feature/new-component

# When stable, merge to main and tag
git checkout main
git merge develop
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin main --tags
```

