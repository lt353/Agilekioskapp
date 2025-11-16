# UHMC Branding Guide

## Official Brand Colors

### Primary Brand Color
- **Deep Teal Blue**: `#004f71` (Pantone 3025 C)
  - CSS Variable: `var(--uhmc-deep-teal)`
  - Primary brand color for headers, main UI elements

### Secondary Neutrals
- **Dark Gray**: `#65665c` (Pantone 417 C)
  - CSS Variable: `var(--uhmc-dark-gray)`
  - For body text and secondary elements

- **Sage Green**: `#afa96e` (Pantone 5845 C)
  - CSS Variable: `var(--uhmc-sage-green)`
  - For secondary accents

- **Dark Teal**: `#00313c` (Pantone 547 C)
  - CSS Variable: `var(--uhmc-dark-teal)`
  - For darker UI elements and text

- **Warm Gray**: `#aca39a` (Pantone Warm Gray 5C)
  - CSS Variable: `var(--uhmc-warm-gray)`
  - For subtle backgrounds

### Third Level Accents
- **Coral Red**: `#e63f51` (Pantone 4058 C)
  - CSS Variable: `var(--uhmc-coral-red)`
  - For alert/attention elements

- **Olive Green**: `#789904` (Pantone 377 C)
  - CSS Variable: `var(--uhmc-olive-green)`
  - For success states and nature themes

- **Bright Yellow**: `#ffb600` (Pantone 7549 C)
  - CSS Variable: `var(--uhmc-bright-yellow)`
  - For highlights and warnings

- **Orange**: `#dd8a03` (Pantone 7564)
  - CSS Variable: `var(--uhmc-orange)`
  - For secondary highlights

## Typography

### Font Families
The project uses Google Fonts alternatives for the official UHMC brand fonts:

1. **Montserrat** (replaces Gotham Sans Serif)
   - CSS Variable: `var(--font-sans)`
   - Usage: Primary font for body text, headings, UI elements
   - Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

2. **Pacifico** (replaces Shelby Script)
   - CSS Variable: `var(--font-script)`
   - Usage: Decorative elements, special headings
   - Style: Cursive/script

3. **Cinzel** (replaces Trajan Serif)
   - CSS Variable: `var(--font-serif)`
   - Usage: Formal headings, special occasions
   - Weights: 400 (normal), 600 (semibold), 700 (bold)

### How to Use Fonts

```tsx
// Default sans-serif (Montserrat)
<h1>This uses Montserrat by default</h1>

// Script font for decorative text
<h1 style={{ fontFamily: 'var(--font-script)' }}>Welcome to UHMC</h1>

// Serif font for formal headings
<h1 style={{ fontFamily: 'var(--font-serif)' }}>Graduation Ceremony</h1>
```

## Logo Usage

### Available Logos

1. **Horizontal Logo** (`logoHorizontal`)
   ```tsx
   import logoHorizontal from 'figma:asset/6fa94c71ec2ee687c0faebc27142ac7a7bcd153d.png';
   ```
   - Use for: Headers, wide spaces, main branding areas
   - Contains full university name and Maui College text

2. **Square Logo** (`logoSquare`)
   ```tsx
   import logoSquare from 'figma:asset/b3cdec18145d7a61bc9506493cb5ee3b31502aa1.png';
   ```
   - Use for: Compact headers, icons, square spaces
   - Features UHMC initials with native symbol

### UHMCBranding Component

The `UHMCBranding` component provides consistent logo and branding display:

```tsx
import { UHMCBranding } from './components/UHMCBranding';

// Full horizontal logo
<UHMCBranding variant="full-logo" />

// Compact header with square logo
<UHMCBranding variant="compact" />

// Default header variant
<UHMCBranding variant="header" />

// Footer with contact info
<UHMCBranding variant="footer" />
```

## Color Usage in Components

### Using CSS Variables
```tsx
// Inline styles
<div style={{ color: 'var(--uhmc-deep-teal)' }}>Text</div>

// Background
<div style={{ backgroundColor: 'var(--uhmc-sage-green)' }}>Content</div>

// Gradients
<div style={{ 
  background: 'linear-gradient(to right, var(--uhmc-deep-teal), var(--uhmc-dark-teal))' 
}}>
  Header
</div>
```

### Using Tailwind Classes with Hex Colors
```tsx
// When you need specific UHMC colors in Tailwind
<button className="bg-[#004f71] text-white">
  Click Me
</button>

// Gradients
<div className="bg-gradient-to-r from-[#004f71] to-[#00313c]">
  Content
</div>
```

## Design Principles

1. **Primary Color Dominance**: Use Deep Teal Blue (#004f71) as the primary color for headers, main navigation, and key UI elements

2. **Accent Colors**: Use the third-level accent colors (Coral Red, Olive Green, Bright Yellow, Orange) sparingly for calls-to-action, highlights, and visual interest

3. **Neutral Backgrounds**: Use Warm Gray and light variations for backgrounds to maintain readability

4. **Typography Hierarchy**: 
   - Montserrat for all standard text
   - Pacifico for special decorative elements
   - Cinzel for formal/ceremonial content

5. **Logo Placement**: Always maintain clear space around logos and use on contrasting backgrounds for visibility

6. **Accessibility**: Ensure text meets WCAG contrast requirements, especially when using colored backgrounds

## Examples from the Codebase

See the following components for implementation examples:
- `/components/AttractMode.tsx` - Slideshow with brand colors
- `/components/MainMenu.tsx` - Menu buttons with gradient accents
- `/components/UHMCBranding.tsx` - Logo usage variants
- `/components/WebsiteBrowser.tsx` - Full branding integration
- `/styles/globals.css` - All color variables defined
