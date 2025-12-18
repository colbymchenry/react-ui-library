#!/usr/bin/env node
/**
 * Colby McHenry React UI Library - MCP Server
 * 
 * This MCP server provides on-demand documentation for the Colby McHenry React UI
 * component library. AI assistants can query specific components, search for
 * patterns, and get setup guides without loading the entire documentation.
 * 
 * Available Tools:
 * - list_components: List all available components with brief descriptions
 * - get_component: Get detailed documentation for a specific component
 * - search_components: Search components by keyword or category
 * - get_setup_guide: Get installation and configuration instructions
 * - get_common_patterns: Get common usage patterns for specific scenarios
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { componentsData, libraryInfo, type ComponentDoc } from './components-data.js';

/**
 * Create and configure the MCP server
 */
const server = new Server(
  {
    name: 'colbymchenry-ui-library',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Tool definitions for the MCP server
 */
const tools: Tool[] = [
  {
    name: 'list_components',
    description: 'List all available components in the Colby McHenry React UI Library with brief descriptions. Use this to discover what components are available.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Filter by category: form, layout, ui, feedback, navigation. Leave empty for all.',
          enum: ['form', 'layout', 'ui', 'feedback', 'navigation'],
        },
      },
    },
  },
  {
    name: 'get_component',
    description: 'Get detailed documentation for a specific component including all props, examples, and best practices.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Component name (e.g., Button, Input, Card, Dialog)',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'search_components',
    description: 'Search for components by keyword. Searches names, descriptions, and best practices.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search keyword (e.g., "form", "loading", "icon", "modal")',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_setup_guide',
    description: 'Get installation, configuration, and setup instructions for the library.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_common_patterns',
    description: 'Get common code patterns for specific scenarios.',
    inputSchema: {
      type: 'object',
      properties: {
        scenario: {
          type: 'string',
          description: 'The scenario you need help with',
          enum: [
            'form_with_validation',
            'social_signin',
            'loading_button',
            'modal_dialog',
            'dashboard_layout',
            'data_table_row',
          ],
        },
      },
      required: ['scenario'],
    },
  },
];

/**
 * Handler for listing available tools
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

/**
 * Format component documentation as readable text
 */
function formatComponentDoc(component: ComponentDoc): string {
  let output = `# ${component.name}\n\n`;
  output += `**Import:** \`import { ${component.importName} } from '@colbymchenry/react-ui-library'\`\n\n`;
  output += `**Category:** ${component.category}\n\n`;
  output += `${component.description}\n\n`;

  // Props
  output += `## Props\n\n`;
  for (const prop of component.props) {
    const required = prop.required ? ' (required)' : '';
    const defaultVal = prop.default ? ` = ${prop.default}` : '';
    output += `### \`${prop.name}\`${required}\n`;
    output += `- **Type:** \`${prop.type}\`${defaultVal}\n`;
    output += `- ${prop.description}\n\n`;
  }

  // Examples
  output += `## Examples\n\n`;
  for (const example of component.examples) {
    output += `### ${example.title}\n`;
    output += `${example.description}\n\n`;
    output += '```tsx\n' + example.code + '\n```\n\n';
  }

  // Best Practices
  output += `## Best Practices\n\n`;
  for (const practice of component.bestPractices) {
    output += `- ${practice}\n`;
  }

  // Related
  if (component.relatedComponents.length > 0) {
    output += `\n## Related Components\n\n`;
    output += component.relatedComponents.join(', ');
  }

  return output;
}

/**
 * Format brief component listing
 */
function formatComponentBrief(component: ComponentDoc): string {
  return `- **${component.name}** (${component.category}): ${component.description.split('.')[0]}.`;
}

/**
 * Common patterns for specific scenarios
 */
const commonPatterns: Record<string, string> = {
  form_with_validation: `## Form with Validation (Formik)

\`\`\`tsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Select, Button, FormGroup } from '@colbymchenry/react-ui-library';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Min 8 characters').required('Required'),
  country: Yup.string().required('Please select a country'),
});

function MyForm() {
  const formik = useFormik({
    initialValues: { email: '', password: '', country: '' },
    validationSchema,
    onSubmit: async (values) => {
      // Handle submission
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        label="Email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && formik.errors.password}
      />

      <Select
        label="Country"
        name="country"
        options={[
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
        ]}
        value={formik.values.country}
        onChange={formik.handleChange}
        error={formik.touched.country && formik.errors.country}
      />

      <Button
        type="submit"
        variant="primary"
        loading={formik.isSubmitting}
        loadingText="Submitting..."
        className="w-full"
      >
        Submit
      </Button>
    </form>
  );
}
\`\`\``,

  social_signin: `## Social Sign-In Buttons

\`\`\`tsx
import { Button, MaterialIcon } from '@colbymchenry/react-ui-library';

function AuthButtons({ onGoogleSignIn, onEmailContinue, isLoading }) {
  return (
    <div className="space-y-4">
      {/* Google Sign-In */}
      <Button
        variant="social"
        iconLeading={
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
        }
        loading={isLoading}
        loadingText="Signing in..."
        onClick={onGoogleSignIn}
      >
        Sign in with Google
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <hr className="flex-1" />
        <span className="text-sm text-gray-500">or</span>
        <hr className="flex-1" />
      </div>

      {/* Email Continue */}
      <Button
        variant="primary"
        iconLeading={<MaterialIcon name="email" />}
        iconTrailing={<MaterialIcon name="arrow_forward" />}
        onClick={onEmailContinue}
        className="w-full"
      >
        Continue with Email
      </Button>
    </div>
  );
}
\`\`\``,

  loading_button: `## Loading Button States

\`\`\`tsx
import { Button, MaterialIcon } from '@colbymchenry/react-ui-library';

// Basic loading state
<Button
  variant="primary"
  loading={isLoading}
  loadingText="Processing..."
>
  Submit
</Button>

// With icons (icons hidden during loading)
<Button
  variant="primary"
  iconLeading={<MaterialIcon name="save" />}
  loading={isSaving}
  loadingText="Saving..."
>
  Save Changes
</Button>

// Form submit with Formik
<Button
  type="submit"
  variant="primary"
  loading={formik.isSubmitting}
  loadingText="Sending..."
  disabled={!formik.isValid}
>
  Send Message
</Button>

// Social button with loading
<Button
  variant="social"
  iconLeading={<GoogleLogo />}
  loading={isAuthenticating}
  loadingText="Signing in..."
  onClick={handleOAuth}
>
  Sign in with Google
</Button>
\`\`\`

**Key Points:**
- \`loading={true}\` automatically disables the button
- \`loadingText\` replaces children and hides icons
- Button shows loading state while maintaining layout
- Works with all button variants`,

  modal_dialog: `## Modal Dialog Patterns

\`\`\`tsx
import { useState } from 'react';
import { Dialog, Button, Input, MaterialIcon } from '@colbymchenry/react-ui-library';

function ConfirmDialog({ open, onClose, onConfirm, title, message }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
    >
      <p className="text-gray-600 dark:text-gray-300">{message}</p>
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Dialog>
  );
}

function FormDialog({ open, onClose, onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(new FormData(e.target));
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Add New Item"
      subtitle="Fill in the details below"
      closedBy="button" // Prevent accidental close
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="item-form"
            variant="primary"
            loading={isSubmitting}
            loadingText="Saving..."
          >
            Save
          </Button>
        </>
      }
    >
      <form id="item-form" onSubmit={handleSubmit} className="space-y-4">
        <Input label="Name" name="name" required />
        <Input label="Description" name="description" />
      </form>
    </Dialog>
  );
}
\`\`\``,

  dashboard_layout: `## Dashboard Layout

\`\`\`tsx
import { 
  PageShell, 
  Header, 
  Card, 
  Badge, 
  Typography,
  Button,
  MaterialIcon,
  SectionHeader
} from '@colbymchenry/react-ui-library';

function Dashboard() {
  return (
    <PageShell
      header={
        <Header
          title="Dashboard"
          subtitle="Welcome back, John!"
          actions={
            <Button 
              variant="primary"
              iconLeading={<MaterialIcon name="add" />}
            >
              New Project
            </Button>
          }
        />
      }
    >
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center justify-between mb-2">
              <Typography variant="label">Total Sales</Typography>
              <Badge variant="success">+12%</Badge>
            </div>
            <Typography variant="h2">$45,231</Typography>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-2">
              <Typography variant="label">Active Users</Typography>
              <Badge variant="info">Live</Badge>
            </div>
            <Typography variant="h2">1,234</Typography>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-2">
              <Typography variant="label">Pending</Typography>
              <Badge variant="warning">Action</Badge>
            </div>
            <Typography variant="h2">23</Typography>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <SectionHeader 
          title="Recent Activity"
          action={<Button variant="link">View All</Button>}
        />
        
        <Card>
          {/* Activity list content */}
        </Card>
      </div>
    </PageShell>
  );
}
\`\`\``,

  data_table_row: `## Data Table Row Actions

\`\`\`tsx
import { Button, Badge, Dropdown, MaterialIcon } from '@colbymchenry/react-ui-library';

function TableRow({ item, onEdit, onDelete, onDuplicate }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>
        <Badge variant={item.status === 'active' ? 'success' : 'warning'}>
          {item.status}
        </Badge>
      </td>
      <td>{item.date}</td>
      <td>
        <div className="flex items-center gap-2">
          {/* Quick actions */}
          <Button
            variant="ghost"
            onClick={() => onEdit(item)}
            aria-label="Edit"
          >
            <MaterialIcon name="edit" className="text-lg" />
          </Button>

          {/* More actions dropdown */}
          <Dropdown
            trigger={
              <Button variant="ghost" aria-label="More actions">
                <MaterialIcon name="more_vert" className="text-lg" />
              </Button>
            }
            align="right"
          >
            <div className="p-2 space-y-1 min-w-32">
              <button
                onClick={() => onDuplicate(item)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                Duplicate
              </button>
              <button
                onClick={() => onDelete(item)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-500"
              >
                Delete
              </button>
            </div>
          </Dropdown>
        </div>
      </td>
    </tr>
  );
}
\`\`\``,
};

/**
 * Handler for tool execution
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    // ========================================
    // LIST COMPONENTS
    // ========================================
    case 'list_components': {
      const category = (args as { category?: string }).category;
      let components = componentsData;

      if (category) {
        components = components.filter((c) => c.category === category);
      }

      const grouped: Record<string, ComponentDoc[]> = {};
      for (const comp of components) {
        if (!grouped[comp.category]) {
          grouped[comp.category] = [];
        }
        grouped[comp.category].push(comp);
      }

      let output = '# Colby McHenry React UI Library Components\n\n';
      output += `**Import:** \`import { ComponentName } from '@colbymchenry/react-ui-library'\`\n\n`;

      for (const [cat, comps] of Object.entries(grouped)) {
        output += `## ${cat.charAt(0).toUpperCase() + cat.slice(1)} Components\n\n`;
        for (const comp of comps) {
          output += formatComponentBrief(comp) + '\n';
        }
        output += '\n';
      }

      output += '\n---\n\nUse `get_component` to get detailed documentation for any component.';

      return {
        content: [{ type: 'text', text: output }],
      };
    }

    // ========================================
    // GET COMPONENT
    // ========================================
    case 'get_component': {
      const componentName = (args as { name: string }).name;
      const component = componentsData.find(
        (c) => c.name.toLowerCase() === componentName.toLowerCase()
      );

      if (!component) {
        const available = componentsData.map((c) => c.name).join(', ');
        return {
          content: [
            {
              type: 'text',
              text: `Component "${componentName}" not found.\n\nAvailable components: ${available}`,
            },
          ],
        };
      }

      return {
        content: [{ type: 'text', text: formatComponentDoc(component) }],
      };
    }

    // ========================================
    // SEARCH COMPONENTS
    // ========================================
    case 'search_components': {
      const query = (args as { query: string }).query.toLowerCase();
      const matches = componentsData.filter((c) => {
        const searchable = [
          c.name,
          c.description,
          c.category,
          ...c.bestPractices,
          ...c.props.map((p) => p.name + ' ' + p.description),
        ]
          .join(' ')
          .toLowerCase();

        return searchable.includes(query);
      });

      if (matches.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `No components found matching "${query}".\n\nTry searching for: form, button, input, loading, modal, icon, card, layout`,
            },
          ],
        };
      }

      let output = `# Search Results for "${query}"\n\n`;
      output += `Found ${matches.length} component(s):\n\n`;

      for (const comp of matches) {
        output += formatComponentBrief(comp) + '\n';
      }

      output += '\n---\n\nUse `get_component` with the component name for detailed documentation.';

      return {
        content: [{ type: 'text', text: output }],
      };
    }

    // ========================================
    // GET SETUP GUIDE
    // ========================================
    case 'get_setup_guide': {
      let output = '# Colby McHenry React UI Library - Setup Guide\n\n';
      output += `## Installation\n\n\`\`\`bash\n${libraryInfo.installation}\n\`\`\`\n\n`;
      output += `## Import Styles\n\nAdd to your root layout:\n\n\`\`\`tsx\n${libraryInfo.stylesImport}\n\`\`\`\n\n`;
      output += `## Tailwind Configuration\n\n\`\`\`js\n${libraryInfo.tailwindConfig}\n\`\`\`\n\n`;
      output += `## Material Icons (Optional)\n\nAdd to your HTML head for icon support:\n\n\`\`\`html\n${libraryInfo.materialIconsSetup}\n\`\`\`\n\n`;
      output += `## Theme Variables\n\nThe library uses these semantic tokens:\n\n`;
      for (const variable of libraryInfo.themeVariables) {
        output += `- \`${variable}\`\n`;
      }
      output += '\n## Basic Import Example\n\n';
      output += '```tsx\n';
      output += "import { Button, Input, Card, Dialog } from '@colbymchenry/react-ui-library';\n";
      output += "import '@colbymchenry/react-ui-library/styles';\n\n";
      output += 'function MyComponent() {\n';
      output += '  return (\n';
      output += '    <Card>\n';
      output += '      <Input label="Email" type="email" />\n';
      output += '      <Button variant="primary">Submit</Button>\n';
      output += '    </Card>\n';
      output += '  );\n';
      output += '}\n';
      output += '```';

      return {
        content: [{ type: 'text', text: output }],
      };
    }

    // ========================================
    // GET COMMON PATTERNS
    // ========================================
    case 'get_common_patterns': {
      const scenario = (args as { scenario: string }).scenario;
      const pattern = commonPatterns[scenario];

      if (!pattern) {
        const available = Object.keys(commonPatterns).join(', ');
        return {
          content: [
            {
              type: 'text',
              text: `Pattern "${scenario}" not found.\n\nAvailable patterns: ${available}`,
            },
          ],
        };
      }

      return {
        content: [{ type: 'text', text: pattern }],
      };
    }

    default:
      return {
        content: [{ type: 'text', text: `Unknown tool: ${name}` }],
      };
  }
});

/**
 * Start the MCP server
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Colby McHenry React UI Library MCP Server running');
}

main().catch(console.error);

