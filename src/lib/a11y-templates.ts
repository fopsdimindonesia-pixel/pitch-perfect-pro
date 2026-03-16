/**
 * Accessibility Template
 * Standard structure for all pages - ensures WCAG 2.1 AA compliance
 */

/**
 * TEMPLATE 1: Simple Page Layout
 * 
 * Use for pages with basic content structure
 */
export const simplePageTemplate = `
export default function PageName() {
  return (
    <main role="main" aria-label="Page description">
      {/* Page header section */}
      <section aria-labelledby="page-title">
        <h1 id="page-title">Page Title</h1>
        <p className="text-muted-foreground">Page description or subtitle</p>
      </section>

      {/* Main content section */}
      <section aria-label="Main content">
        {/* Content here */}
      </section>
    </main>
  );
}
`;

/**
 * TEMPLATE 2: Page with Multiple Sections
 * 
 * Use for pages with metrics, tables, and multiple content areas
 */
export const multiSectionPageTemplate = `
export default function PageName() {
  return (
    <main role="main" aria-label="Page description">
      {/* Header */}
      <section aria-labelledby="page-title">
        <h1 id="page-title">Page Title</h1>
        <p className="text-muted-foreground">Subtitle or description</p>
      </section>

      {/* Metrics/Stats Section */}
      <section 
        aria-labelledby="metrics-title"
        className="grid grid-cols-1 sm:grid-cols-4 gap-4"
      >
        <h2 id="metrics-title" className="sr-only">Key Metrics</h2>
        {/* Metric cards */}
      </section>

      {/* Data/Content Section */}
      <section aria-labelledby="content-title">
        <h2 id="content-title">Section Title</h2>
        {/* Table, list, or other content */}
      </section>

      {/* Additional Actions/Info */}
      <section aria-labelledby="actions-title">
        <h2 id="actions-title">Additional Information</h2>
        {/* Extra content */}
      </section>
    </main>
  );
}
`;

/**
 * TEMPLATE 3: Page with Form
 * 
 * Use for pages with form inputs and validation
 */
export const formPageTemplate = `
export default function FormPage() {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormValidation({
    initialValues: { /* initial form data */ },
    schema: { /* validation schema */ },
    onSubmit: async (values) => { /* handle submit */ },
  });

  return (
    <main role="main" aria-label="Form page description">
      <section aria-labelledby="form-title">
        <h1 id="form-title">Form Title</h1>
      </section>

      <section aria-label="Form content">
        <form onSubmit={handleSubmit} noValidate>
          {/* Form fields with error messages */}
          <div>
            <label htmlFor="field-id">Field Label</label>
            <input
              id="field-id"
              name="fieldName"
              type="text"
              value={values.fieldName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!touched.fieldName && !!errors.fieldName}
              aria-describedby={touched.fieldName && errors.fieldName ? 'error-field' : undefined}
            />
            {touched.fieldName && errors.fieldName && (
              <p id="error-field" role="alert" className="text-red-600 text-sm mt-1">
                {errors.fieldName}
              </p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}
`;

/**
 * TEMPLATE 4: Page with Tabs/Navigation
 * 
 * Use for pages with tab-based content
 */
export const tabbedPageTemplate = `
export default function TabbedPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', content: <OverviewTab /> },
    { id: 'details', label: 'Details', content: <DetailsTab /> },
    { id: 'analytics', label: 'Analytics', content: <AnalyticsTab /> },
  ];

  return (
    <main role="main" aria-label="Page with tabbed content">
      <section aria-labelledby="page-title">
        <h1 id="page-title">Page Title</h1>
      </section>

      <section aria-label="Tab navigation">
        <div role="tablist" aria-label="Content tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={tab.id}
            role="tabpanel"
            aria-labelledby={tab.id}
            hidden={activeTab !== tab.id}
          >
            {tab.content}
          </div>
        ))}
      </section>
    </main>
  );
}
`;

/**
 * ARIA ATTRIBUTES GUIDE
 * 
 * Main landmarks:
 * - role="main" - Primary content area (one per page)
 * - role="navigation" - Navigation section
 * - role="complementary" - Sidebar/supplementary content
 * - role="contentinfo" - Footer
 * - role="search" - Search form
 * 
 * Headings:
 * - Always use proper heading hierarchy (h1, h2, h3...)
 * - Link headings to sections with aria-labelledby
 * - Use aria-label for sections without visible labels
 * 
 * Forms:
 * - Always label inputs with <label htmlFor="id">
 * - Use aria-invalid for validation errors
 * - Use aria-describedby to link inputs to error messages
 * - Use role="alert" for error messages
 * 
 * Sections:
 * - Use <section> for major content areas
 * - Always provide aria-label or aria-labelledby
 * - Use aria-label for descriptive labels
 * - Use aria-labelledby to link to heading elements
 * 
 * Tables:
 * - Use proper <table> structure
 * - Scope attributes on <th> (row, col, rowgroup, colgroup)
 * - Use caption for table title
 * 
 * Modal/Dialog:
 * - Use role="dialog" or <dialog> element
 * - Set aria-modal="true"
 * - Focus trap within modal
 * - Close with ESC key
 */

/**
 * ACCESSIBILITY CHECKLIST
 * 
 * ✓ Page has main role="main"
 * ✓ All major sections have aria-label or aria-labelledby
 * ✓ Proper heading hierarchy (no skipping levels)
 * ✓ Links have descriptive text
 * ✓ Buttons have visible labels or aria-label
 * ✓ Form fields have labels
 * ✓ Error messages use role="alert"
 * ✓ Color not only indicator of status
 * ✓ Images have alt text
 * ✓ Videos have captions/transcripts
 * ✓ Focus indicators visible
 * ✓ Keyboard navigation works
 * ✓ Text contrast meets WCAG AA (4.5:1)
 */
