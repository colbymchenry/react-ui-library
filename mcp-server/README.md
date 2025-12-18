# Volcanica UI Library MCP Server

An MCP (Model Context Protocol) server that provides on-demand documentation for the Volcanica React UI component library. AI assistants can query specific components without loading the entire documentation.

## 🚀 Quick Setup (One Step!)

Add to your `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "volcanica-ui": {
      "command": "npx",
      "args": ["-y", "@colbymchenry/ui-library-mcp"]
    }
  }
}
```

Then restart Cursor. **That's it!** ✨

> npx automatically downloads and runs the latest version - no installation needed.

---

## 🔧 Alternative: Local Development Setup

If you're developing the MCP server itself:

```bash
cd mcp-server
npm install
npm run build
```

Then use this config:

```json
{
  "mcpServers": {
    "volcanica-ui": {
      "command": "node",
      "args": ["/path/to/react-ui-library/mcp-server/dist/index.js"]
    }
  }
}
```

---

## 🛠️ Available Tools

### `list_components`

List all available components with brief descriptions.

**Parameters:**
- `category` (optional): Filter by category (`form`, `layout`, `ui`, `feedback`, `navigation`)

**Example Usage:**
> "List all form components in the Volcanica UI library"

---

### `get_component`

Get detailed documentation for a specific component including all props, examples, and best practices.

**Parameters:**
- `name` (required): Component name (e.g., `Button`, `Input`, `Card`)

**Example Usage:**
> "Get the documentation for the Button component"

---

### `search_components`

Search for components by keyword. Searches names, descriptions, and best practices.

**Parameters:**
- `query` (required): Search keyword (e.g., `loading`, `form`, `icon`)

**Example Usage:**
> "Search for components related to loading states"

---

### `get_setup_guide`

Get installation, configuration, and setup instructions.

**Example Usage:**
> "How do I set up the Volcanica UI library?"

---

### `get_common_patterns`

Get common code patterns for specific scenarios.

**Parameters:**
- `scenario` (required): One of:
  - `form_with_validation` - Complete form with Formik validation
  - `social_signin` - Google/social login buttons
  - `loading_button` - Button loading states
  - `modal_dialog` - Dialog/modal patterns
  - `dashboard_layout` - Dashboard page structure
  - `data_table_row` - Table row with actions

**Example Usage:**
> "Show me the pattern for social sign-in buttons"

---

## 📝 Usage Examples

### In Your AI Prompt

```
I need to create a form with email and password fields using the Volcanica UI library.
```

The AI will automatically:
1. Call `list_components` to see available form components
2. Call `get_component` for `Input` and `Button` details
3. Optionally call `get_common_patterns` with `form_with_validation`

### Asking About Specific Features

```
How do I add a loading state to a button?
```

The AI will call `search_components` with "loading" or `get_component` with "Button".

### Getting Setup Help

```
Set up the Volcanica UI library in my project
```

The AI will call `get_setup_guide` for installation instructions.

---

## 🔧 Development

### File Structure

```
mcp-server/
├── src/
│   ├── index.ts           # Main MCP server entry point
│   └── components-data.ts # Component documentation data
├── dist/                  # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

### Adding New Components

1. Add the component documentation to `src/components-data.ts`
2. Follow the `ComponentDoc` interface structure
3. Rebuild: `npm run build`

### Adding New Patterns

1. Add to the `commonPatterns` object in `src/index.ts`
2. Add the scenario to the `get_common_patterns` tool enum
3. Rebuild: `npm run build`

---

## 🐛 Troubleshooting

### Server Not Connecting

1. Ensure the path in `mcp.json` is absolute
2. Check the server is built: `ls dist/index.js`
3. Test manually: `node dist/index.js`

### Tool Not Found

Restart Cursor after adding/modifying the MCP configuration.

### Updates Not Reflected

1. Rebuild the server: `npm run build`
2. Restart Cursor

---

## 📋 Component Categories

| Category    | Components                                           |
|-------------|------------------------------------------------------|
| `form`      | Input, Select, FormGroup, Combobox, DatePicker, PhoneInput, AddMinus |
| `layout`    | Card, PageShell, Header, SectionHeader               |
| `ui`        | Button, Badge, Typography, MaterialIcon, ThemeToggle |
| `feedback`  | Dialog                                               |
| `navigation`| Dropdown                                             |

---

## 📄 License

MIT

