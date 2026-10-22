# Cobalt Flow — Style Reference & Design System
> Clean, friendly multi-step onboarding wizard. A luminous royal blue banner anchors a crisp white card surface with generous rounded corners, clear progressive disclosure stepper, and accessible form inputs.

**Theme:** light

Cobalt Flow operates as an onboarding and multi-step data collection card: a crisp white surface (#ffffff) set against a soft ice-blue background (#eaf0f9). A deep royal cobalt header banner (#3d52d5) establishes brand authority and focus at the top of the container, while step-by-step indicator nodes guide the user through a low-friction progressive workflow. Color is used with intentional hierarchy: vibrant cobalt blue directs focus to active stages and the primary "Next" action, subtle slate grays handle resting inputs and secondary text, and soft outlines frame non-destructive actions.

---

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Cobalt Core | `#3d52d5` | `--color-cobalt-core` | Primary brand accent, modal header banner, active stepper ring/text, primary CTA background |
| Cobalt Hover | `#3143b8` | `--color-cobalt-hover` | Hover state for primary action buttons |
| Canvas Ice | `#eaf0f9` | `--color-canvas-ice` | Full-page background canvas providing subtle contrast behind the card |
| Card Surface | `#ffffff` | `--color-card-surface` | Elevated card container and input field backgrounds |
| Ink Slate | `#1e293b` | `--color-ink-slate` | Primary headings and input text on white surfaces |
| Text White | `#ffffff` | `--color-text-white` | Header banner titles, subheadings, and primary button labels |
| Muted Indigo | `#dbe4ff` | `--color-muted-indigo` | Header subtitle text, subtle focus halos, light pill accents |
| Border Ghost | `#e2e8f0` | `--color-border-ghost` | Card boundaries, resting input borders, and stepper connector lines |
| Ash Gray | `#94a3b8` | `--color-ash-gray` | Inactive step numbers/labels, input placeholders, icon glyph strokes |
| Soft Blue Outline | `#cbd5e1` | `--color-soft-blue-outline` | Border for the 'Previous' secondary button |
| Focus Glow | `rgba(61, 82, 213, 0.20)` | `--color-focus-glow` | Outline ring for focused input elements |

---

## Tokens — Typography

### Primary Font — Inter / Plus Jakarta Sans
Modern, geometric sans-serif prioritizing legibility at small sizes and high clarity inside forms and data labels.

- **Fallbacks:** `ui-sans-serif`, `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`
- **Weights:** 
  - `400` (Regular): Input text, placeholders, helper labels
  - `500` (Medium): Secondary buttons, inactive steps, input labels
  - `600` (Semi-Bold): Active step title, section subheaders, primary action button
  - `700` (Bold): Card banner main title

### Type Scale

| Role | Size | Line Height | Weight | Letter Spacing | Token |
|------|------|-------------|--------|----------------|-------|
| Banner Title | 22px | 1.25 | 700 | -0.02em | `--text-banner-title` |
| Banner Subtitle | 13px | 1.4 | 400 | 0.00em | `--text-banner-sub` |
| Section Title | 17px | 1.3 | 700 | -0.01em | `--text-section-title` |
| Form Label | 13px | 1.4 | 600 | 0.00em | `--text-form-label` |
| Input Text | 14px | 1.5 | 400 | 0.00em | `--text-input` |
| Stepper Label | 12px | 1.3 | 500 / 600 | 0.00em | `--text-stepper` |
| Button Label | 14px | 1.4 | 600 | 0.00em | `--text-btn` |

---

## Tokens — Spacing & Geometry

**Base unit:** 4px / 8px  
**Container max-width:** `560px`  
**Card Corner Radius:** `20px`  
**Card Shadow:** `0 12px 32px -4px rgba(30, 41, 59, 0.08), 0 4px 12px -2px rgba(30, 41, 59, 0.04)`

### Border Radius

| Element | Value | Token |
|---------|-------|-------|
| Card Shell | 20px | `--radius-card` |
| Header Banner (top only) | 20px 20px 0 0 | `--radius-banner` |
| Input Fields | 10px | `--radius-input` |
| Stepper Badge Circle | 9999px (Full) | `--radius-circle` |
| Action Buttons | 10px | `--radius-button` |

---

## Component Specifications

### 1. Header Banner
- **Container:** Full-width top block pinned to card header. Background `#3d52d5`, border-radius `20px 20px 0 0`.
- **Padding:** 28px vertical, 24px horizontal. Text centered.
- **Title:** "Create Your Account" in `#ffffff` (22px, Bold).
- **Subtitle:** "Join our community in just a few simple steps" in `#e0e7ff` (13px, Regular).

### 2. Multi-Step Stepper Bar
- **Container:** Horizontal layout below banner, padding `24px 32px 16px 32px`.
- **Connector Line:** 2px height, `#e2e8f0`, centered vertically relative to the step circles.
- **Step Node Structure:**
  - **Active / Current (Step 1):**
    - Circle: 32px diameter, background `#ffffff`, border `2px solid #3d52d5`.
    - Content: Step number `1` in `#3d52d5`, weight 600, 13px.
    - Label below: "Personal" in `#3d52d5`, weight 600, 12px, margin-top 6px.
  - **Upcoming / Inactive (Steps 2, 3, 4):**
    - Circle: 32px diameter, background `#ffffff`, border `2px solid #e2e8f0`.
    - Content: Step numbers (`2`, `3`, `4`) in `#94a3b8`, weight 500, 13px.
    - Label below: ("Account", "Preferences", "Review") in `#94a3b8`, weight 500, 12px, margin-top 6px.

### 3. Form Body & Inputs
- **Section Heading:** Centered "Personal Information" in `#1e293b` (17px, Bold), margin-bottom 20px.
- **Grid Layout:** 
  - 2-column split for First Name & Last Name (gap: 16px).
  - 1-column full width for Email Address and Phone Number (gap: 16px).
- **Input Fields:**
  - Background: `#ffffff`.
  - Border: `1px solid #cbd5e1` (resting).
  - Radius: `10px`.
  - Height / Padding: `42px` height, `12px 14px` padding.
  - Text: 14px `#1e293b`, placeholder `#94a3b8`.
  - Icons (Email / Phone): Left-aligned at `16px` width, color `#94a3b8`, input text indented `38px` from left.
  - Focus state: Border `#3d52d5`, box-shadow `0 0 0 3px rgba(61, 82, 213, 0.20)`.

### 4. Navigation Buttons (Action Footer)
- **Container:** Flex container with `justify-content: space-between`, margin-top 24px, padding-top 12px.
- **Secondary Button (Previous):**
  - Background: Transparent / `#ffffff`.
  - Border: `1px solid #cbd5e1`.
  - Text: `#3d52d5`, 14px, weight 500.
  - Icon: Left arrow `←` preceding label.
  - Radius: `10px`, padding: `10px 20px`.
  - Hover: Background `#f8fafc`, border `#94a3b8`.
- **Primary Button (Next):**
  - Background: `#3d52d5`.
  - Border: None.
  - Text: `#ffffff`, 14px, weight 600.
  - Icon: Right arrow `→` following label.
  - Radius: `10px`, padding: `10px 24px`.
  - Hover: Background `#3143b8`, box-shadow `0 4px 12px rgba(61, 82, 213, 0.25)`.

---

## Do's and Don'ts

### Do
- Keep all steps visible on desktop so the user clearly anticipates form length and progress.
- Maintain consistent 10px corner radiuses across both input fields and control buttons.
- Display relevant input icons (envelope, phone receiver) on the left side of specific fields to accelerate visual recognition.
- Keep the header banner integrated inside the card so the card feels like an isolated floating application module.

### Don't
- Don't change the primary CTA color across steps (keep `#3d52d5` as the steady progression cue).
- Don't use heavy harsh shadows; use soft diffused slate drop-shadows.
- Don't hide the "Previous" button except on Step 1 (where it can be disabled or omitted).
- Don't place labels inside inputs as placeholders only; always maintain explicit top labels for accessibility.

---

## Tailwind v4 CSS Custom Properties Implementation

```css
:root {
  /* Colors */
  --color-cobalt-core: #3d52d5;
  --color-cobalt-hover: #3143b8;
  --color-canvas-ice: #eaf0f9;
  --color-card-surface: #ffffff;
  --color-ink-slate: #1e293b;
  --color-border-ghost: #e2e8f0;
  --color-ash-gray: #94a3b8;
  --color-soft-blue-outline: #cbd5e1;

  /* Geometry */
  --radius-card: 20px;
  --radius-input: 10px;
  --radius-btn: 10px;
}

@theme {
  --color-cobalt: #3d52d5;
  --color-cobalt-dark: #3143b8;
  --color-canvas: #eaf0f9;
  --color-ink: #1e293b;
  --color-ash: #94a3b8;
}
```