# HTML Design System

## Goal
Provide a simple, modern, conversion-friendly HTML system that can be generated quickly and implemented without a heavy framework.

## Typography
- Use one clean sans-serif family for body text.
- Use a strong, readable heading scale.
- Keep line length comfortable on desktop.
- Use larger headings and compact body copy.

### Suggested Scale
- H1: 2.5rem to 4rem
- H2: 1.75rem to 2.5rem
- H3: 1.25rem to 1.5rem
- Body: 1rem to 1.125rem

## Spacing
- Use an 8px base scale.
- Space sections generously.
- Keep card padding consistent.
- Avoid dense blocks of text.

## Color Palette Logic
- Use one primary action color.
- Use a neutral background and high-contrast text.
- Reserve accent colors for emphasis, not decoration.
- If dark mode is used, keep contrast strict.

## Button Hierarchy
- Primary CTA: solid fill, highest contrast.
- Secondary CTA: outline or subtle fill.
- Tertiary CTA: text link or inline action.

## CTA Styling
- Use action verbs.
- Keep the label short.
- Make the button large enough for touch.
- Repeat the CTA after major sections.

## Card Styling
- Use subtle borders or shadows.
- Keep corner radius consistent.
- Align content rhythm across cards.
- Avoid overly glossy or gimmicky effects.

## Section Layout Patterns
- Hero: two-column on desktop, single-column on mobile
- Proof: logo strip or compact cards
- Problem and solution: alternating blocks
- Offer stack: feature cards or table
- FAQ: accordion or stacked Q and A

## Responsive Grid Patterns
- 1 column on mobile
- 2 columns for benefits or proof
- 3 columns only when content is short and scannable

## Mobile-First Rules
- Put the core promise above the fold.
- Keep buttons full-width on small screens.
- Minimize horizontal layout dependency.
- Preserve readability before ornament.

## Accessibility Rules
- Use semantic HTML tags.
- Ensure heading order is logical.
- Provide alt text for meaningful images.
- Maintain sufficient color contrast.
- Do not rely on color alone to communicate state.

## Motion Limits
- Use subtle fades or slide-ins only if needed.
- Avoid autoplay background motion.
- Never let animation block content access.

## Image Placeholder Styling
- Use explicit dimensions.
- Show the role of the image.
- Add alt text that describes the image purpose.

## Form Styling
- Keep labels visible.
- Avoid placeholder-only labels.
- Make error states clear.
- Keep required fields minimal.

## FAQ Accordion Styling
- Use clear question labels.
- Allow generous click targets.
- Keep open/closed state obvious.

## Pricing Card Styling
- Highlight one recommended option.
- Use simple visual hierarchy.
- Avoid too many tiers unless necessary.

## Trust Badge Styling
- Use small, legible badges.
- Do not overload the hero with badges.
- Use badges only for real claims.

## CSS Variable Structure
```css
:root {
  --bg: #ffffff;
  --surface: #f7f7f7;
  --text: #111111;
  --muted: #666666;
  --border: #e6e6e6;
  --primary: #111111;
  --primary-contrast: #ffffff;
  --accent: #2563eb;
  --radius: 16px;
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}
```

## Example HTML/CSS Snippets
```html
<section class="hero">
  <h1>Build a landing page that actually converts</h1>
  <p>Clear structure, strong proof, and responsive HTML ready to ship.</p>
  <a class="btn btn-primary" href="#cta">Get started</a>
</section>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.875rem 1.25rem;
  border-radius: var(--radius);
  font-weight: 600;
}
.btn-primary {
  background: var(--primary);
  color: var(--primary-contrast);
}
```

## Practical Defaults
- Keep the design minimal unless the brand requires more personality.
- Let copy and hierarchy do most of the selling.
- Optimize for clarity over visual complexity.
