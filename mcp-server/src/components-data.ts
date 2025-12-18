/**
 * Component documentation data for the Colby McHenry React UI Library
 * 
 * This structured data allows AI assistants to query specific component
 * information on-demand without loading the entire documentation.
 */

export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export interface ComponentExample {
  title: string;
  description: string;
  code: string;
}

export interface ComponentDoc {
  name: string;
  importName: string;
  category: 'form' | 'layout' | 'ui' | 'feedback' | 'navigation';
  description: string;
  props: ComponentProp[];
  examples: ComponentExample[];
  bestPractices: string[];
  relatedComponents: string[];
}

/**
 * Complete documentation for all UI library components
 */
export const componentsData: ComponentDoc[] = [
  // ============================================
  // BUTTON COMPONENT
  // ============================================
  {
    name: 'Button',
    importName: 'Button',
    category: 'ui',
    description: 'Flexible button component with multiple variants, loading states, and icon support. Use for primary actions, secondary actions, social sign-in, and navigation.',
    props: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'pill' | 'small-pill' | 'link' | 'ghost' | 'social'",
        required: false,
        default: "'primary'",
        description: 'Visual style variant of the button'
      },
      {
        name: 'iconLeading',
        type: 'ReactNode',
        required: false,
        description: 'Icon or element to display before the button text'
      },
      {
        name: 'iconTrailing',
        type: 'ReactNode',
        required: false,
        description: 'Icon or element to display after the button text'
      },
      {
        name: 'loading',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Shows loading state and disables the button'
      },
      {
        name: 'loadingText',
        type: 'string',
        required: false,
        description: 'Text to display when loading (hides icons when set)'
      },
      {
        name: 'type',
        type: "'button' | 'submit' | 'reset'",
        required: false,
        default: "'button'",
        description: 'HTML button type attribute'
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional Tailwind CSS classes'
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        description: 'Disables the button (also true when loading)'
      }
    ],
    examples: [
      {
        title: 'Primary Action Button',
        description: 'Main call-to-action button with loading state',
        code: `<Button 
  variant="primary"
  loading={isSubmitting}
  loadingText="Saving..."
>
  Save Changes
</Button>`
      },
      {
        title: 'Button with Icons',
        description: 'Button with leading and trailing icons',
        code: `<Button 
  variant="primary"
  iconLeading={<MaterialIcon name="email" />}
  iconTrailing={<MaterialIcon name="arrow_forward" />}
>
  Continue with Email
</Button>`
      },
      {
        title: 'Social Sign-In Button',
        description: 'OAuth/social login button with the social variant',
        code: `<Button
  variant="social"
  iconLeading={
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92..." fill="#4285F4" />
      {/* Other Google logo paths */}
    </svg>
  }
  loading={isLoading}
  loadingText="Signing in..."
  onClick={handleGoogleSignIn}
>
  Sign in with Google
</Button>`
      },
      {
        title: 'Form Submit Button',
        description: 'Submit button for forms with Formik integration',
        code: `<Button
  type="submit"
  variant="primary"
  loading={formik.isSubmitting}
  loadingText="Sending..."
  className="w-full"
>
  Submit Form
</Button>`
      },
      {
        title: 'Ghost Button',
        description: 'Subtle button for secondary actions',
        code: `<Button variant="ghost" onClick={handleCancel}>
  Cancel
</Button>`
      },
      {
        title: 'Link Button',
        description: 'Button styled as a link',
        code: `<Button variant="link" onClick={handleLearnMore}>
  Learn More
</Button>`
      },
      {
        title: 'Pill Button with Icon',
        description: 'Rounded pill-shaped button for add actions',
        code: `<Button variant="pill" iconLeading={<MaterialIcon name="add" />}>
  Add Item
</Button>`
      }
    ],
    bestPractices: [
      'Use variant="primary" for main call-to-action buttons',
      'Use variant="secondary" for less important actions',
      'Use variant="social" for OAuth/social sign-in buttons',
      'Always provide loadingText for better UX during async operations',
      'Use type="submit" for form submission buttons',
      'Combine iconLeading/iconTrailing with MaterialIcon for consistent iconography',
      'Button is automatically disabled when loading={true}'
    ],
    relatedComponents: ['MaterialIcon', 'Input', 'FormGroup']
  },

  // ============================================
  // MATERIAL ICON COMPONENT
  // ============================================
  {
    name: 'MaterialIcon',
    importName: 'MaterialIcon',
    category: 'ui',
    description: 'Renders Google Material Symbols icons. Requires Material Symbols font to be loaded in your app.',
    props: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Material Symbols icon name (e.g., "home", "search", "add")'
      },
      {
        name: 'filled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Use filled icon variant'
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes for sizing and color'
      }
    ],
    examples: [
      {
        title: 'Basic Icon',
        description: 'Simple icon usage',
        code: `<MaterialIcon name="home" />`
      },
      {
        title: 'Icon with Custom Size',
        description: 'Icon with Tailwind size classes',
        code: `<MaterialIcon name="search" className="text-2xl" />`
      },
      {
        title: 'Filled Icon',
        description: 'Filled variant of an icon',
        code: `<MaterialIcon name="star" filled />`
      },
      {
        title: 'Icon with Color',
        description: 'Icon with custom color',
        code: `<MaterialIcon name="check_circle" className="text-green-500" />`
      },
      {
        title: 'Icon in Button',
        description: 'Using icons inside buttons',
        code: `<Button iconLeading={<MaterialIcon name="add" />}>
  Add Item
</Button>`
      }
    ],
    bestPractices: [
      'Ensure Material Symbols font is loaded in your HTML head',
      'Use className for sizing (text-sm, text-lg, text-2xl)',
      'Use className for colors (text-primary, text-green-500)',
      'Browse icons at fonts.google.com/icons'
    ],
    relatedComponents: ['Button']
  },

  // ============================================
  // INPUT COMPONENT (Alias for FormGroup)
  // ============================================
  {
    name: 'Input',
    importName: 'Input',
    category: 'form',
    description: 'Alias for FormGroup component. Use Input for semantic clarity when rendering text inputs, or use FormGroup directly. Both components are identical and support all the same props including icons, Formik integration, and error handling.',
    props: [
      {
        name: '...props',
        type: 'FormGroupProps',
        required: false,
        description: 'All props from FormGroup are supported. See FormGroup documentation for full prop list.'
      }
    ],
    examples: [
      {
        title: 'Basic Input',
        description: 'Input and FormGroup are interchangeable',
        code: `// These are equivalent:
<Input label="Email" name="email" type="email" />
<FormGroup label="Email" name="email" type="email" />`
      },
      {
        title: 'Input with Icon',
        description: 'Using leading icon',
        code: `<Input
  label="Email Address"
  name="email"
  type="email"
  iconLeading={<MaterialIcon name="mail" />}
  placeholder="you@example.com"
/>`
      },
      {
        title: 'Formik Integration',
        description: 'Automatic binding',
        code: `<Input
  formik={formik}
  name="email"
  label="Email"
  iconLeading={<MaterialIcon name="mail" />}
/>`
      }
    ],
    bestPractices: [
      'Input is an alias for FormGroup - they are 100% identical',
      'Use Input for semantic clarity when you specifically want a text input',
      'Use FormGroup when you need select or textarea variants',
      'See FormGroup documentation for complete prop list and examples'
    ],
    relatedComponents: ['FormGroup', 'MaterialIcon', 'Button']
  },

  // ============================================
  // SELECT COMPONENT (Alias for FormGroup)
  // ============================================
  {
    name: 'Select',
    importName: 'Select',
    category: 'form',
    description: 'Alias for FormGroup component. When you pass children (option elements), FormGroup automatically renders as a select. Use Select for semantic clarity when rendering dropdowns, or use FormGroup directly. Both are identical.',
    props: [
      {
        name: '...props',
        type: 'FormGroupProps',
        required: false,
        description: 'All props from FormGroup are supported. See FormGroup documentation for full prop list.'
      }
    ],
    examples: [
      {
        title: 'Basic Select',
        description: 'Select and FormGroup with children are interchangeable',
        code: `// These are equivalent:
<Select label="Country" name="country">
  <option value="">Select a country</option>
  <option value="us">United States</option>
</Select>

<FormGroup label="Country" name="country">
  <option value="">Select a country</option>
  <option value="us">United States</option>
</FormGroup>`
      },
      {
        title: 'Select with Icon',
        description: 'Using leading icon',
        code: `<Select
  label="Country"
  name="country"
  iconLeading={<MaterialIcon name="public" />}
>
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</Select>`
      },
      {
        title: 'Formik Integration',
        description: 'Automatic binding',
        code: `<Select
  formik={formik}
  name="country"
  label="Country"
  iconLeading={<MaterialIcon name="public" />}
>
  <option value="">Select a country</option>
  <option value="us">United States</option>
</Select>`
      }
    ],
    bestPractices: [
      'Select is an alias for FormGroup - they are 100% identical',
      'Use Select for semantic clarity when you specifically want a dropdown',
      'FormGroup auto-detects select mode when children (option elements) are provided',
      'See FormGroup documentation for complete prop list and examples'
    ],
    relatedComponents: ['FormGroup', 'MaterialIcon', 'Combobox']
  },

  // ============================================
  // FORM GROUP COMPONENT (Primary Form Field)
  // ============================================
  {
    name: 'FormGroup',
    importName: 'FormGroup',
    category: 'form',
    description: 'Unified form field component that renders as input, select, or textarea. The primary component for all form fields - supports leading/trailing icons, Formik integration, and modern styling. Input is an alias to this component.',
    props: [
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text displayed above the field (uppercase, bold styling)'
      },
      {
        name: 'as',
        type: "'input' | 'select' | 'textarea'",
        required: false,
        default: "'input'",
        description: 'Element variant - auto-detects "select" if children provided'
      },
      {
        name: 'iconLeading',
        type: 'ReactNode',
        required: false,
        description: 'Icon or element displayed at the start of the field'
      },
      {
        name: 'iconTrailing',
        type: 'ReactNode',
        required: false,
        description: 'Icon or element displayed at the end of the field'
      },
      {
        name: 'formik',
        type: 'FormikProps<any>',
        required: false,
        description: 'Formik instance for automatic value/onChange/onBlur/error binding'
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: 'Field name attribute (required when using formik prop)'
      },
      {
        name: 'error',
        type: 'string',
        required: false,
        description: 'Error message to display (overrides Formik error when provided)'
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: false,
        description: 'Option elements for select variant - presence of children auto-switches to select mode'
      },
      {
        name: 'fieldClassName',
        type: 'string',
        required: false,
        description: 'Additional CSS classes for the field element'
      },
      {
        name: 'containerClassName',
        type: 'string',
        required: false,
        description: 'Additional CSS classes for the outer container'
      }
    ],
    examples: [
      {
        title: 'Basic Input',
        description: 'Simple text input with label',
        code: `<FormGroup
  label="Email Address"
  name="email"
  type="email"
  placeholder="you@example.com"
/>`
      },
      {
        title: 'Input with Leading Icon',
        description: 'Email input with mail icon',
        code: `<FormGroup
  label="Email Address"
  name="email"
  type="email"
  iconLeading={<MaterialIcon name="mail" />}
  placeholder="you@example.com"
/>`
      },
      {
        title: 'Password Input with Icon',
        description: 'Password field with lock icon',
        code: `<FormGroup
  label="Password"
  name="password"
  type="password"
  iconLeading={<MaterialIcon name="lock" />}
  placeholder="Enter your password"
/>`
      },
      {
        title: 'Select Dropdown',
        description: 'Auto-detects select when children are provided',
        code: `<FormGroup label="Country" name="country">
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="uk">United Kingdom</option>
</FormGroup>`
      },
      {
        title: 'Select with Icon',
        description: 'Select dropdown with leading icon',
        code: `<FormGroup
  label="Country"
  name="country"
  iconLeading={<MaterialIcon name="public" />}
>
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</FormGroup>`
      },
      {
        title: 'Textarea',
        description: 'Multi-line text input',
        code: `<FormGroup
  as="textarea"
  label="Message"
  name="message"
  rows={4}
  placeholder="Enter your message..."
/>`
      },
      {
        title: 'Formik Integration',
        description: 'Automatic binding with Formik',
        code: `<FormGroup
  formik={formik}
  name="email"
  label="Email Address"
  type="email"
  iconLeading={<MaterialIcon name="mail" />}
  placeholder="you@example.com"
/>`
      },
      {
        title: 'Complete Login Form',
        description: 'Full form with Formik integration',
        code: `<form onSubmit={formik.handleSubmit} className="space-y-4">
  <FormGroup
    formik={formik}
    name="email"
    label="Email Address"
    type="email"
    iconLeading={<MaterialIcon name="mail" />}
    placeholder="you@example.com"
  />
  <FormGroup
    formik={formik}
    name="password"
    label="Password"
    type="password"
    iconLeading={<MaterialIcon name="lock" />}
    placeholder="Enter your password"
  />
  <Button type="submit" variant="primary" className="w-full">
    Sign In
  </Button>
</form>`
      }
    ],
    bestPractices: [
      'FormGroup is the primary form field component - use it for inputs, selects, and textareas',
      'Input is an alias to FormGroup for semantic clarity, both work identically',
      'Use iconLeading for context (mail for email, lock for password, search for search)',
      'When using formik prop, binding is automatic - no need for value/onChange/onBlur',
      'Children presence auto-switches to select mode - no need to set as="select"',
      'Icons automatically transition to primary color on focus',
      'Error styling is automatic when using formik prop'
    ],
    relatedComponents: ['MaterialIcon', 'Button', 'Checkbox', 'RadioGroup']
  },

  // ============================================
  // CARD COMPONENT
  // ============================================
  {
    name: 'Card',
    importName: 'Card',
    category: 'layout',
    description: 'Container component with consistent padding, borders, shadows, and dark mode support.',
    props: [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Card content'
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes for customization'
      }
    ],
    examples: [
      {
        title: 'Basic Card',
        description: 'Simple content card',
        code: `<Card>
  <h2 className="text-xl font-bold mb-2">Card Title</h2>
  <p>Card content goes here</p>
</Card>`
      },
      {
        title: 'Dashboard Stats Card',
        description: 'Card with header and stats',
        code: `<Card>
  <div className="flex items-center justify-between mb-4">
    <span className="text-sm text-gray-500">Total Sales</span>
    <Badge variant="success">+12%</Badge>
  </div>
  <div className="text-3xl font-bold">$45,231</div>
</Card>`
      },
      {
        title: 'Interactive Card',
        description: 'Card with hover effects',
        code: `<Card className="hover:shadow-lg transition-shadow cursor-pointer">
  <img src="/product.jpg" alt="Product" className="rounded-lg mb-4" />
  <h3 className="font-bold">Product Name</h3>
  <p className="text-primary font-bold">$99.99</p>
</Card>`
      }
    ],
    bestPractices: [
      'Use Cards to group related content',
      'Add hover effects for interactive cards',
      'Combine with Typography component for consistent text',
      'Use className for additional spacing and effects'
    ],
    relatedComponents: ['Typography', 'Badge', 'Button']
  },

  // ============================================
  // BADGE COMPONENT
  // ============================================
  {
    name: 'Badge',
    importName: 'Badge',
    category: 'ui',
    description: 'Small label component for status indicators, counts, or categories.',
    props: [
      {
        name: 'variant',
        type: "'default' | 'success' | 'warning' | 'error' | 'info'",
        required: false,
        default: "'default'",
        description: 'Color variant of the badge'
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Badge content (text or number)'
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes'
      }
    ],
    examples: [
      {
        title: 'Status Badges',
        description: 'Different status variants',
        code: `<Badge variant="success">Active</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="info">New</Badge>`
      },
      {
        title: 'Count Badge',
        description: 'Badge for counts',
        code: `<Badge>5</Badge>`
      },
      {
        title: 'Badge in Context',
        description: 'Badge used in a card header',
        code: `<div className="flex items-center justify-between">
  <h3>Orders</h3>
  <Badge variant="warning">3 Pending</Badge>
</div>`
      }
    ],
    bestPractices: [
      'Use success for positive states (active, completed)',
      'Use error for negative states (failed, error)',
      'Use warning for attention-needed states (pending)',
      'Use info for informational labels (new, beta)',
      'Keep badge text short and concise'
    ],
    relatedComponents: ['Card', 'Typography']
  },

  // ============================================
  // TYPOGRAPHY COMPONENT
  // ============================================
  {
    name: 'Typography',
    importName: 'Typography',
    category: 'ui',
    description: 'Consistent text styling component with semantic variants for headings, body text, captions, and labels.',
    props: [
      {
        name: 'variant',
        type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'label'",
        required: false,
        default: "'body'",
        description: 'Text style variant'
      },
      {
        name: 'as',
        type: 'keyof JSX.IntrinsicElements',
        required: false,
        description: 'Override the rendered HTML element'
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Text content'
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes'
      }
    ],
    examples: [
      {
        title: 'Headings',
        description: 'Different heading levels',
        code: `<Typography variant="h1">Page Title</Typography>
<Typography variant="h2">Section Title</Typography>
<Typography variant="h3">Subsection</Typography>`
      },
      {
        title: 'Body Text',
        description: 'Regular body text',
        code: `<Typography variant="body">
  This is regular body text with proper spacing and sizing.
</Typography>`
      },
      {
        title: 'Labels and Captions',
        description: 'Small text variants',
        code: `<Typography variant="label">Field Label</Typography>
<Typography variant="caption">Last updated: Today</Typography>`
      },
      {
        title: 'Custom Element',
        description: 'Override the HTML element',
        code: `<Typography variant="h2" as="h1">
  Styled as h2, rendered as h1
</Typography>`
      }
    ],
    bestPractices: [
      'Use semantic variants for consistent text styling',
      'Use "as" prop when SEO requires different heading hierarchy',
      'Typography automatically handles dark mode',
      'Combine with Tailwind utilities via className for spacing'
    ],
    relatedComponents: ['Card', 'Header', 'SectionHeader']
  },

  // ============================================
  // DIALOG COMPONENT
  // ============================================
  {
    name: 'Dialog',
    importName: 'Dialog',
    category: 'feedback',
    description: 'Modal dialog component with backdrop, close functionality, and scrollable content area.',
    props: [
      {
        name: 'open',
        type: 'boolean',
        required: true,
        description: 'Controls dialog visibility'
      },
      {
        name: 'onClose',
        type: '() => void',
        required: true,
        description: 'Callback when dialog should close'
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: 'Dialog title in header'
      },
      {
        name: 'subtitle',
        type: 'string',
        required: false,
        description: 'Subtitle below title'
      },
      {
        name: 'footer',
        type: 'ReactNode',
        required: false,
        description: 'Footer content (typically action buttons)'
      },
      {
        name: 'closedBy',
        type: "'button' | 'backdrop' | 'any'",
        required: false,
        default: "'any'",
        description: 'What can close the dialog'
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Dialog body content'
      }
    ],
    examples: [
      {
        title: 'Confirmation Dialog',
        description: 'Simple confirm/cancel dialog',
        code: `<Dialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
>
  <p>Are you sure you want to proceed?</p>
  <div className="flex gap-2 mt-4">
    <Button variant="primary" onClick={handleConfirm}>
      Confirm
    </Button>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
  </div>
</Dialog>`
      },
      {
        title: 'Dialog with Footer',
        description: 'Dialog with fixed footer buttons',
        code: `<Dialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit Profile"
  subtitle="Update your information"
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
  <Input label="Name" value={name} onChange={setName} />
  <Input label="Email" value={email} onChange={setEmail} />
</Dialog>`
      },
      {
        title: 'Form Dialog',
        description: 'Dialog containing a form',
        code: `<Dialog
  open={showForm}
  onClose={() => setShowForm(false)}
  title="Add New Item"
  closedBy="button"
>
  <form onSubmit={handleSubmit}>
    <Input label="Name" name="name" />
    <Input label="Email" type="email" name="email" />
    <Button type="submit" variant="primary" className="w-full mt-4">
      Submit
    </Button>
  </form>
</Dialog>`
      }
    ],
    bestPractices: [
      'Always provide onClose handler',
      'Use footer prop for consistent action button placement',
      'Set closedBy="button" for forms to prevent accidental data loss',
      'Keep dialog content focused on a single task',
      'Use title and subtitle for clear context'
    ],
    relatedComponents: ['Button', 'Input', 'FormGroup']
  },

  // ============================================
  // DROPDOWN COMPONENT
  // ============================================
  {
    name: 'Dropdown',
    importName: 'Dropdown',
    category: 'navigation',
    description: 'Custom dropdown menu with trigger element and positioned content.',
    props: [
      {
        name: 'trigger',
        type: 'ReactNode',
        required: true,
        description: 'Element that triggers the dropdown'
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Dropdown content'
      },
      {
        name: 'align',
        type: "'left' | 'right'",
        required: false,
        default: "'left'",
        description: 'Horizontal alignment of dropdown'
      }
    ],
    examples: [
      {
        title: 'User Menu',
        description: 'Dropdown for user actions',
        code: `<Dropdown 
  trigger={
    <button className="flex items-center gap-2">
      <MaterialIcon name="account_circle" />
      <span>John Doe</span>
    </button>
  }
  align="right"
>
  <div className="p-2 space-y-1">
    <button onClick={handleProfile}>Profile</button>
    <button onClick={handleSettings}>Settings</button>
    <hr />
    <button onClick={handleLogout}>Logout</button>
  </div>
</Dropdown>`
      },
      {
        title: 'Action Menu',
        description: 'Dropdown with action buttons',
        code: `<Dropdown
  trigger={<Button variant="secondary">Actions</Button>}
>
  <div className="p-2 space-y-2">
    <button onClick={handleEdit}>Edit</button>
    <button onClick={handleDuplicate}>Duplicate</button>
    <button onClick={handleDelete} className="text-red-500">Delete</button>
  </div>
</Dropdown>`
      }
    ],
    bestPractices: [
      'Use align="right" for dropdowns near the right edge',
      'Keep dropdown menus focused and not too long',
      'Use separators (hr) to group related actions',
      'Highlight destructive actions in red'
    ],
    relatedComponents: ['Button', 'MaterialIcon']
  },

  // ============================================
  // DATE PICKER COMPONENT
  // ============================================
  {
    name: 'DatePicker',
    importName: 'DatePicker',
    category: 'form',
    description: 'Calendar-based date selection input with optional min/max date constraints.',
    props: [
      {
        name: 'value',
        type: 'Date | null',
        required: true,
        description: 'Currently selected date'
      },
      {
        name: 'onChange',
        type: '(date: Date | null) => void',
        required: true,
        description: 'Callback when date changes'
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text'
      },
      {
        name: 'error',
        type: 'string',
        required: false,
        description: 'Error message'
      },
      {
        name: 'minDate',
        type: 'Date',
        required: false,
        description: 'Minimum selectable date'
      },
      {
        name: 'maxDate',
        type: 'Date',
        required: false,
        description: 'Maximum selectable date'
      }
    ],
    examples: [
      {
        title: 'Basic Date Picker',
        description: 'Simple date selection',
        code: `<DatePicker
  label="Select Date"
  value={selectedDate}
  onChange={setSelectedDate}
/>`
      },
      {
        title: 'Birth Date (Max Today)',
        description: 'Date picker that only allows past dates',
        code: `<DatePicker
  label="Birth Date"
  value={birthDate}
  onChange={setBirthDate}
  maxDate={new Date()}
/>`
      },
      {
        title: 'Future Date Only',
        description: 'Date picker for scheduling',
        code: `<DatePicker
  label="Appointment Date"
  value={appointmentDate}
  onChange={setAppointmentDate}
  minDate={new Date()}
/>`
      },
      {
        title: 'Formik Integration',
        description: 'Date picker with Formik',
        code: `<DatePicker
  label="Event Date"
  value={formik.values.eventDate}
  onChange={(date) => formik.setFieldValue('eventDate', date)}
  error={formik.touched.eventDate && formik.errors.eventDate}
/>`
      }
    ],
    bestPractices: [
      'Provide minDate/maxDate constraints when appropriate',
      'Use with FormGroup if you need custom wrapper styling',
      'For Formik, use setFieldValue to update the date',
      'Date values are JavaScript Date objects, not strings'
    ],
    relatedComponents: ['FormGroup', 'Input']
  },

  // ============================================
  // PHONE INPUT COMPONENT
  // ============================================
  {
    name: 'PhoneInput',
    importName: 'PhoneInput',
    category: 'form',
    description: 'International phone number input with country code dropdown and formatting.',
    props: [
      {
        name: 'value',
        type: 'string',
        required: true,
        description: 'Phone number value'
      },
      {
        name: 'onChange',
        type: '(value: string) => void',
        required: true,
        description: 'Callback when value changes'
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text'
      },
      {
        name: 'error',
        type: 'string',
        required: false,
        description: 'Error message'
      },
      {
        name: 'defaultCountry',
        type: 'string',
        required: false,
        default: "'US'",
        description: 'Default country code (ISO 3166-1 alpha-2)'
      }
    ],
    examples: [
      {
        title: 'Basic Phone Input',
        description: 'Simple phone number input',
        code: `<PhoneInput
  label="Phone Number"
  value={phone}
  onChange={setPhone}
  defaultCountry="US"
/>`
      },
      {
        title: 'Formik Integration',
        description: 'Phone input with Formik',
        code: `<PhoneInput
  label="Contact Number"
  value={formik.values.phone}
  onChange={(value) => formik.setFieldValue('phone', value)}
  error={formik.touched.phone && formik.errors.phone}
/>`
      },
      {
        title: 'International Default',
        description: 'Phone input with different default country',
        code: `<PhoneInput
  label="UK Phone"
  value={ukPhone}
  onChange={setUkPhone}
  defaultCountry="GB"
/>`
      }
    ],
    bestPractices: [
      'Set appropriate defaultCountry for your target audience',
      'Phone values include country code in E.164 format',
      'Validate phone numbers server-side for accuracy',
      'For Formik, use setFieldValue to update the value'
    ],
    relatedComponents: ['Input', 'FormGroup']
  },

  // ============================================
  // COMBOBOX COMPONENT
  // ============================================
  {
    name: 'Combobox',
    importName: 'Combobox',
    category: 'form',
    description: 'Searchable select/autocomplete input with filtering functionality.',
    props: [
      {
        name: 'options',
        type: 'Array<{ value: string; label: string }>',
        required: true,
        description: 'Array of selectable options'
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: 'Currently selected value'
      },
      {
        name: 'onChange',
        type: '(value: string) => void',
        required: true,
        description: 'Callback when value changes'
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Label text'
      },
      {
        name: 'error',
        type: 'string',
        required: false,
        description: 'Error message'
      },
      {
        name: 'placeholder',
        type: 'string',
        required: false,
        description: 'Placeholder text when empty'
      }
    ],
    examples: [
      {
        title: 'Searchable City Select',
        description: 'Combobox with many options',
        code: `<Combobox
  label="Select City"
  options={cities.map(city => ({ value: city.id, label: city.name }))}
  value={selectedCity}
  onChange={setSelectedCity}
  placeholder="Search cities..."
/>`
      },
      {
        title: 'User Search',
        description: 'Autocomplete for user selection',
        code: `<Combobox
  label="Assign To"
  options={users.map(u => ({ value: u.id, label: u.name }))}
  value={assignee}
  onChange={setAssignee}
  placeholder="Search users..."
  error={error}
/>`
      }
    ],
    bestPractices: [
      'Use Combobox when you have many options (>10)',
      'Use Select for smaller option lists',
      'Provide a helpful placeholder',
      'Options should have unique values'
    ],
    relatedComponents: ['Select', 'Input']
  },

  // ============================================
  // ADD MINUS COMPONENT
  // ============================================
  {
    name: 'AddMinus',
    importName: 'AddMinus',
    category: 'form',
    description: 'Quantity selector with increment/decrement buttons.',
    props: [
      {
        name: 'value',
        type: 'number',
        required: true,
        description: 'Current quantity value'
      },
      {
        name: 'onChange',
        type: '(value: number) => void',
        required: true,
        description: 'Callback when value changes'
      },
      {
        name: 'min',
        type: 'number',
        required: false,
        default: '0',
        description: 'Minimum allowed value'
      },
      {
        name: 'max',
        type: 'number',
        required: false,
        description: 'Maximum allowed value'
      },
      {
        name: 'step',
        type: 'number',
        required: false,
        default: '1',
        description: 'Increment/decrement step'
      }
    ],
    examples: [
      {
        title: 'Quantity Selector',
        description: 'Basic quantity input',
        code: `<AddMinus
  value={quantity}
  onChange={setQuantity}
  min={1}
  max={99}
/>`
      },
      {
        title: 'Custom Step',
        description: 'Increment by 5',
        code: `<AddMinus
  value={amount}
  onChange={setAmount}
  min={0}
  max={100}
  step={5}
/>`
      }
    ],
    bestPractices: [
      'Always set min to prevent negative values if not allowed',
      'Set max for inventory or limit-based quantities',
      'Use step for predefined increments'
    ],
    relatedComponents: ['Input', 'Button']
  },

  // ============================================
  // PAGE SHELL COMPONENT
  // ============================================
  {
    name: 'PageShell',
    importName: 'PageShell',
    category: 'layout',
    description: 'Main page layout wrapper providing consistent structure with header area.',
    props: [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Page content'
      },
      {
        name: 'header',
        type: 'ReactNode',
        required: false,
        description: 'Header component (typically Header)'
      }
    ],
    examples: [
      {
        title: 'Basic Page Layout',
        description: 'Page with header and content',
        code: `<PageShell
  header={
    <Header 
      title="Dashboard"
      actions={<Button>New Item</Button>}
    />
  }
>
  <div className="container mx-auto p-6">
    <Card>Page content here</Card>
  </div>
</PageShell>`
      }
    ],
    bestPractices: [
      'Use PageShell as the outermost layout component',
      'Combine with Header component for consistent headers',
      'Add padding/container to children as needed'
    ],
    relatedComponents: ['Header', 'SectionHeader', 'Card']
  },

  // ============================================
  // HEADER COMPONENT
  // ============================================
  {
    name: 'Header',
    importName: 'Header',
    category: 'layout',
    description: 'Page header component with title, subtitle, and action area.',
    props: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: 'Page title'
      },
      {
        name: 'subtitle',
        type: 'string',
        required: false,
        description: 'Subtitle or description'
      },
      {
        name: 'actions',
        type: 'ReactNode',
        required: false,
        description: 'Action buttons area'
      }
    ],
    examples: [
      {
        title: 'Simple Header',
        description: 'Header with title only',
        code: `<Header title="Dashboard" />`
      },
      {
        title: 'Header with Actions',
        description: 'Full header with subtitle and buttons',
        code: `<Header
  title="Products"
  subtitle="Manage your product catalog"
  actions={
    <Button 
      variant="primary" 
      iconLeading={<MaterialIcon name="add" />}
    >
      Add Product
    </Button>
  }
/>`
      }
    ],
    bestPractices: [
      'Use inside PageShell header prop',
      'Keep titles concise',
      'Use subtitle for additional context',
      'Place primary actions in the actions prop'
    ],
    relatedComponents: ['PageShell', 'SectionHeader', 'Button']
  },

  // ============================================
  // SECTION HEADER COMPONENT
  // ============================================
  {
    name: 'SectionHeader',
    importName: 'SectionHeader',
    category: 'layout',
    description: 'Section divider with title and optional action.',
    props: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: 'Section title'
      },
      {
        name: 'action',
        type: 'ReactNode',
        required: false,
        description: 'Action element (link or button)'
      }
    ],
    examples: [
      {
        title: 'Basic Section Header',
        description: 'Simple section divider',
        code: `<SectionHeader title="Personal Information" />`
      },
      {
        title: 'Section with Action',
        description: 'Section header with edit link',
        code: `<SectionHeader
  title="Billing Address"
  action={<Button variant="link">Edit</Button>}
/>`
      }
    ],
    bestPractices: [
      'Use to divide page sections visually',
      'Keep action buttons small (link or ghost variant)',
      'Use consistent naming across sections'
    ],
    relatedComponents: ['Header', 'Card', 'Typography']
  },

  // ============================================
  // THEME TOGGLE COMPONENT
  // ============================================
  {
    name: 'ThemeToggle',
    importName: 'ThemeToggle',
    category: 'ui',
    description: 'Dark/light mode toggle button.',
    props: [],
    examples: [
      {
        title: 'Basic Theme Toggle',
        description: 'Simple toggle button',
        code: `<ThemeToggle />`
      },
      {
        title: 'In Navigation',
        description: 'Theme toggle in header nav',
        code: `<nav className="flex items-center gap-4">
  <Logo />
  <nav>...</nav>
  <ThemeToggle />
</nav>`
      }
    ],
    bestPractices: [
      'Place in consistent location (header/nav)',
      'Works with Tailwind dark mode class strategy',
      'User preference persists in localStorage'
    ],
    relatedComponents: ['Header', 'PageShell']
  },

  // ============================================
  // SEPARATOR COMPONENT
  // ============================================
  {
    name: 'Separator',
    importName: 'Separator',
    category: 'ui',
    description: 'Horizontal divider line with optional centered label. Perfect for visually separating content sections or providing context between different form areas (e.g., "Or sign in with email"). Fully styled with Tailwind and automatic dark mode support.',
    props: [
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Optional label text displayed centered on the separator line (uppercase, bold styling)'
      },
      {
        name: 'lineClassName',
        type: 'string',
        required: false,
        default: '"border-border-light dark:border-border-dark"',
        description: 'Custom Tailwind classes for the border/line color'
      },
      {
        name: 'labelBgClassName',
        type: 'string',
        required: false,
        default: '"bg-card-light dark:bg-background-dark"',
        description: 'Custom Tailwind classes for the label background color'
      },
      {
        name: 'labelTextClassName',
        type: 'string',
        required: false,
        default: '"text-text-muted-light dark:text-text-muted-dark"',
        description: 'Custom Tailwind classes for the label text color'
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes for the container'
      }
    ],
    examples: [
      {
        title: 'Simple Line Separator',
        description: 'Basic horizontal divider without label',
        code: `<Separator />`
      },
      {
        title: 'Separator with Label',
        description: 'Divider with centered text',
        code: `<Separator label="Or continue with" />`
      },
      {
        title: 'Social Sign-In Divider',
        description: 'Common pattern for auth forms separating OAuth from email login',
        code: `<div className="space-y-4">
  <Button variant="social" iconLeading={<GoogleIcon />}>
    Sign in with Google
  </Button>
  
  <Separator label="Or sign in with email" />
  
  <Input label="Email" type="email" name="email" />
  <Input label="Password" type="password" name="password" />
</div>`
      },
      {
        title: 'Section Divider',
        description: 'Breaking up form sections',
        code: `<div className="space-y-6">
  <Input label="First Name" name="firstName" />
  <Input label="Last Name" name="lastName" />
  
  <Separator label="Contact Information" />
  
  <Input label="Email" type="email" name="email" />
  <PhoneInput label="Phone" value={phone} onChange={setPhone} />
</div>`
      },
      {
        title: 'Custom Colors',
        description: 'Separator with custom color classes',
        code: `<Separator
  label="Or sign in with email"
  lineClassName="border-gray-300 dark:border-gray-600"
  labelBgClassName="bg-white dark:bg-gray-900"
  labelTextClassName="text-gray-500 dark:text-gray-400"
/>`
      },
      {
        title: 'Branded Separator',
        description: 'Using brand colors for the separator',
        code: `<Separator
  label="Premium Features"
  lineClassName="border-primary/30"
  labelBgClassName="bg-background-light dark:bg-background-dark"
  labelTextClassName="text-primary"
/>`
      }
    ],
    bestPractices: [
      'Use without label for simple visual breaks between sections',
      'Use with label to provide context (e.g., alternative actions)',
      'Common use case: separating social OAuth buttons from email/password form',
      'Keep label text short and descriptive',
      'Automatically adapts to dark mode via Tailwind dark: variants',
      'Label appears uppercase with bold styling for visual hierarchy'
    ],
    relatedComponents: ['Button', 'Card', 'FormGroup']
  },

  // ============================================
  // CHECKBOX COMPONENT
  // ============================================
  {
    name: 'Checkbox',
    importName: 'Checkbox',
    category: 'form',
    description: 'Styled checkbox input with label, optional description, and Formik integration. Supports both controlled and uncontrolled usage patterns.',
    props: [
      {
        name: 'label',
        type: 'string',
        required: true,
        description: 'Label text displayed next to the checkbox'
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: 'Additional description text below the label'
      },
      {
        name: 'formik',
        type: 'FormikProps<any>',
        required: false,
        description: 'Formik instance for automatic checked/onChange/onBlur binding'
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: 'Input name attribute (required when using formik prop)'
      },
      {
        name: 'error',
        type: 'string',
        required: false,
        description: 'Error message to display below the checkbox'
      },
      {
        name: 'containerClassName',
        type: 'string',
        required: false,
        description: 'Additional CSS classes for the container'
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes for the checkbox input'
      }
    ],
    examples: [
      {
        title: 'Basic Checkbox',
        description: 'Simple checkbox with label',
        code: `<Checkbox
  label="Remember me"
  name="rememberMe"
  checked={rememberMe}
  onChange={(e) => setRememberMe(e.target.checked)}
/>`
      },
      {
        title: 'Checkbox with Description',
        description: 'Checkbox with additional context',
        code: `<Checkbox
  label="Email notifications"
  description="Receive emails about account activity and updates"
  name="emailNotifications"
  checked={notifications}
  onChange={(e) => setNotifications(e.target.checked)}
/>`
      },
      {
        title: 'Terms Agreement',
        description: 'Common pattern for terms acceptance',
        code: `<Checkbox
  label="I agree to the Terms of Service and Privacy Policy"
  name="agreeToTerms"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  error={!agreed && submitted ? "You must agree to continue" : undefined}
/>`
      },
      {
        title: 'Formik Integration',
        description: 'Checkbox with automatic Formik binding',
        code: `<Checkbox
  formik={formik}
  name="agreeToTerms"
  label="I agree to the Terms of Service"
  description="By checking this box, you agree to our terms"
/>`
      },
      {
        title: 'Login Form Remember Me',
        description: 'Typical remember me checkbox in login form',
        code: `<div className="flex items-center justify-between">
  <Checkbox
    label="Remember me"
    name="rememberMe"
    checked={rememberMe}
    onChange={(e) => setRememberMe(e.target.checked)}
  />
  <Button variant="link">Forgot password?</Button>
</div>`
      }
    ],
    bestPractices: [
      'Always provide a descriptive label',
      'Use description for additional context when needed',
      'For boolean Formik fields, the binding is automatic with checked state',
      'Use for single yes/no options, use RadioGroup for multiple choices',
      'Error messages appear below and indented to align with label'
    ],
    relatedComponents: ['RadioGroup', 'Input', 'FormGroup', 'Button']
  },

  // ============================================
  // RADIO GROUP COMPONENT
  // ============================================
  {
    name: 'RadioGroup',
    importName: 'RadioGroup',
    category: 'form',
    description: 'A group of styled radio button inputs with labels and optional descriptions. Supports horizontal and vertical layouts with Formik integration.',
    props: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Name attribute for the radio group (shared by all options)'
      },
      {
        name: 'options',
        type: 'RadioOption[]',
        required: true,
        description: 'Array of radio options: { value, label, description?, disabled? }'
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        description: 'Group label displayed above the options'
      },
      {
        name: 'direction',
        type: "'horizontal' | 'vertical'",
        required: false,
        default: "'vertical'",
        description: 'Layout direction for the radio options'
      },
      {
        name: 'formik',
        type: 'FormikProps<any>',
        required: false,
        description: 'Formik instance for automatic value/onChange binding'
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: 'Currently selected value (when not using formik)'
      },
      {
        name: 'onChange',
        type: '(e: ChangeEvent<HTMLInputElement>) => void',
        required: false,
        description: 'Change handler (when not using formik)'
      },
      {
        name: 'error',
        type: 'string',
        required: false,
        description: 'Error message to display below the group'
      },
      {
        name: 'containerClassName',
        type: 'string',
        required: false,
        description: 'Additional CSS classes for the container'
      }
    ],
    examples: [
      {
        title: 'Basic Radio Group',
        description: 'Simple vertical radio group',
        code: `<RadioGroup
  name="plan"
  label="Select a plan"
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise' },
  ]}
  value={selectedPlan}
  onChange={(e) => setSelectedPlan(e.target.value)}
/>`
      },
      {
        title: 'With Descriptions',
        description: 'Options with additional context',
        code: `<RadioGroup
  name="subscription"
  label="Choose your subscription"
  options={[
    { value: 'monthly', label: 'Monthly', description: '$9.99/month, cancel anytime' },
    { value: 'annual', label: 'Annual', description: '$99/year, save 17%' },
    { value: 'lifetime', label: 'Lifetime', description: '$299 one-time payment' },
  ]}
  value={subscription}
  onChange={(e) => setSubscription(e.target.value)}
/>`
      },
      {
        title: 'Horizontal Layout',
        description: 'Radio buttons in a row',
        code: `<RadioGroup
  name="size"
  label="Size"
  direction="horizontal"
  options={[
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'X-Large' },
  ]}
  value={size}
  onChange={(e) => setSize(e.target.value)}
/>`
      },
      {
        title: 'With Disabled Option',
        description: 'Some options can be disabled',
        code: `<RadioGroup
  name="shipping"
  label="Shipping Method"
  options={[
    { value: 'standard', label: 'Standard', description: '5-7 business days' },
    { value: 'express', label: 'Express', description: '2-3 business days' },
    { value: 'overnight', label: 'Overnight', description: 'Not available', disabled: true },
  ]}
  value={shipping}
  onChange={(e) => setShipping(e.target.value)}
/>`
      },
      {
        title: 'Formik Integration',
        description: 'Radio group with automatic Formik binding',
        code: `<RadioGroup
  formik={formik}
  name="paymentMethod"
  label="Payment Method"
  options={[
    { value: 'card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank', label: 'Bank Transfer' },
  ]}
/>`
      }
    ],
    bestPractices: [
      'Use RadioGroup when user must select exactly one option from a list',
      'Use Checkbox for single boolean yes/no options',
      'Provide descriptions for complex options that need explanation',
      'Use horizontal layout for 3-4 short options, vertical for longer lists',
      'Selected option label highlights in primary color for visual feedback',
      'Disable options that are temporarily unavailable rather than hiding them'
    ],
    relatedComponents: ['Checkbox', 'Select', 'Input', 'FormGroup']
  },

  // ============================================
  // ALERT COMPONENT
  // ============================================
  {
    name: 'Alert',
    importName: 'Alert',
    category: 'feedback',
    description: 'Displays informational, success, warning, or error messages with an optional icon and colored background. Perfect for form feedback, system notifications, or contextual information.',
    props: [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The content to display inside the alert'
      },
      {
        name: 'variant',
        type: "'info' | 'success' | 'warning' | 'error'",
        required: false,
        default: "'info'",
        description: 'The variant/color scheme of the alert'
      },
      {
        name: 'icon',
        type: 'string',
        required: false,
        description: 'Custom Material Symbols icon name (defaults based on variant: info, check_circle, warning, error)'
      },
      {
        name: 'showIcon',
        type: 'boolean',
        required: false,
        default: 'true',
        description: 'Whether to show the icon'
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: 'Optional title displayed above the content'
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes for the container'
      }
    ],
    examples: [
      {
        title: 'Info Alert',
        description: 'Default informational message',
        code: `<Alert>
  We'll send a secure magic link to your inbox.
</Alert>`
      },
      {
        title: 'Success Alert',
        description: 'Positive feedback message',
        code: `<Alert variant="success">
  Your changes have been saved successfully.
</Alert>`
      },
      {
        title: 'Warning Alert',
        description: 'Cautionary message',
        code: `<Alert variant="warning">
  Your session will expire in 5 minutes.
</Alert>`
      },
      {
        title: 'Error Alert',
        description: 'Error or failure message',
        code: `<Alert variant="error">
  There was an error processing your request. Please try again.
</Alert>`
      },
      {
        title: 'Alert with Title',
        description: 'Alert with prominent title',
        code: `<Alert variant="success" title="Payment successful">
  Your order has been placed and will ship within 2-3 business days.
</Alert>`
      },
      {
        title: 'Alert with Custom Icon',
        description: 'Using a different icon',
        code: `<Alert variant="info" icon="mail">
  Check your email for the verification link.
</Alert>`
      },
      {
        title: 'Alert without Icon',
        description: 'Text-only alert',
        code: `<Alert variant="warning" showIcon={false}>
  This action cannot be undone.
</Alert>`
      },
      {
        title: 'Form Validation Error',
        description: 'Common pattern for form errors',
        code: `{formError && (
  <Alert variant="error" title="Unable to sign in">
    {formError}
  </Alert>
)}

<form onSubmit={handleSubmit}>
  <Input formik={formik} name="email" label="Email" />
  <Input formik={formik} name="password" label="Password" type="password" />
  <Button type="submit">Sign In</Button>
</form>`
      }
    ],
    bestPractices: [
      'Use info for neutral information and tips',
      'Use success for positive confirmations and completed actions',
      'Use warning for cautionary messages that need attention',
      'Use error for failures, validation errors, and critical issues',
      'Add a title for important alerts that need emphasis',
      'Default icons are contextually appropriate, only override when needed',
      'Place form-level errors above the form, field-level errors use Input error prop'
    ],
    relatedComponents: ['Dialog', 'Button', 'Input']
  },

  // ============================================
  // SOCIAL PROOF COMPONENT
  // ============================================
  {
    name: 'SocialProof',
    importName: 'SocialProof',
    category: 'ui',
    description: 'Displays social proof with stacked user avatars, star ratings, and a subtitle. Features a glassmorphism design with backdrop blur. Used to build trust by showing that other users love the product.',
    props: [
      {
        name: 'avatars',
        type: 'string[]',
        required: false,
        default: '[]',
        description: 'Array of avatar image URLs to display as stacked circles'
      },
      {
        name: 'additionalCount',
        type: 'number',
        required: false,
        default: '0',
        description: 'Number of additional users beyond the shown avatars (displays as "+2k" etc.)'
      },
      {
        name: 'rating',
        type: 'number',
        required: false,
        default: '5',
        description: 'Star rating value (1-5), filled stars based on this value'
      },
      {
        name: 'subtitle',
        type: 'string',
        required: false,
        default: '"Trusted by Users"',
        description: 'Text to display below the star rating'
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes for the container'
      }
    ],
    examples: [
      {
        title: 'Full Social Proof',
        description: 'Complete social proof with avatars, count, rating, and subtitle',
        code: `<SocialProof
  avatars={[
    '/avatars/user1.jpg',
    '/avatars/user2.jpg',
    '/avatars/user3.jpg',
  ]}
  additionalCount={2000}
  rating={5}
  subtitle="Trusted by Coffee Lovers"
/>`
      },
      {
        title: 'Rating Only',
        description: 'Simple star rating with subtitle',
        code: `<SocialProof
  rating={5}
  subtitle="5-star rated product"
/>`
      },
      {
        title: 'Avatars with Count',
        description: 'Show user avatars and total count',
        code: `<SocialProof
  avatars={['/user1.jpg', '/user2.jpg', '/user3.jpg', '/user4.jpg']}
  additionalCount={500}
  subtitle="Happy customers"
/>`
      },
      {
        title: 'Partial Rating',
        description: 'Show a 4-star rating',
        code: `<SocialProof
  rating={4}
  subtitle="Highly rated"
/>`
      },
      {
        title: 'Hero Section Usage',
        description: 'Typical placement in a hero section',
        code: `<section className="relative bg-gray-900 text-white py-20">
  <div className="container mx-auto px-6">
    <h1 className="text-4xl font-bold mb-4">
      Premium Coffee Delivered
    </h1>
    <p className="text-gray-400 mb-8">
      Fresh roasted beans, shipped to your door.
    </p>
    
    <SocialProof
      avatars={['/avatar1.jpg', '/avatar2.jpg', '/avatar3.jpg']}
      additionalCount={5000}
      rating={5}
      subtitle="Loved by coffee enthusiasts"
    />
  </div>
</section>`
      }
    ],
    bestPractices: [
      'Use on landing pages and hero sections to build trust',
      'Show 3-4 avatars maximum for best visual balance',
      'Use real customer photos when possible for authenticity',
      'Large additionalCount values auto-format (2000 → "2k")',
      'Works best on dark backgrounds due to glassmorphism design',
      'Combine with testimonials for stronger social proof'
    ],
    relatedComponents: ['Card', 'Badge', 'MaterialIcon']
  }
];

/**
 * Get library metadata and setup information
 */
export const libraryInfo = {
  name: 'Colby McHenry React UI Library',
  package: '@colbymchenry/react-ui-library',
  version: '1.0.0',
  installation: `npm install @colbymchenry/react-ui-library`,
  stylesImport: `import '@colbymchenry/react-ui-library/styles';`,
  peerDependencies: ['react', 'react-dom', 'formik'],
  tailwindConfig: `// tailwind.config.js
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@colbymchenry/react-ui-library/dist/**/*.js',
  ],
  // Optional: use the library's preset
  presets: [require('@colbymchenry/react-ui-library/preset')],
};`,
  materialIconsSetup: `<link 
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" 
  rel="stylesheet" 
/>`,
  themeVariables: [
    'primary - Primary brand color',
    'secondary - Secondary/hover states',
    'text-light / text-dark - Text colors',
    'background-light / background-dark - Background colors',
    'border-light / border-dark - Border colors',
    'card-dark - Card backgrounds in dark mode'
  ]
};

