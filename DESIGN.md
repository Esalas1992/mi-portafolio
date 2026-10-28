---
name: Cybernetic Craft
colors:
  surface: "#131317"
  surface-dim: "#131317"
  surface-bright: "#39393d"
  surface-container-lowest: "#0e0e11"
  surface-container-low: "#1b1b1f"
  surface-container: "#201f23"
  surface-container-high: "#2a292d"
  surface-container-highest: "#353438"
  on-surface: "#e5e1e6"
  on-surface-variant: "#bbc9cf"
  inverse-surface: "#e5e1e6"
  inverse-on-surface: "#303034"
  outline: "#859399"
  outline-variant: "#3c494e"
  surface-tint: "#47d6ff"
  primary: "#a5e7ff"
  on-primary: "#003543"
  primary-container: "#00d2ff"
  on-primary-container: "#00566a"
  inverse-primary: "#00677f"
  secondary: "#adc6ff"
  on-secondary: "#002e6a"
  secondary-container: "#0566d9"
  on-secondary-container: "#e6ecff"
  tertiary: "#69f6b9"
  on-tertiary: "#003824"
  tertiary-container: "#48d99e"
  on-tertiary-container: "#005b3d"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#b6ebff"
  primary-fixed-dim: "#47d6ff"
  on-primary-fixed: "#001f28"
  on-primary-fixed-variant: "#004e60"
  secondary-fixed: "#d8e2ff"
  secondary-fixed-dim: "#adc6ff"
  on-secondary-fixed: "#001a42"
  on-secondary-fixed-variant: "#004395"
  tertiary-fixed: "#6ffbbe"
  tertiary-fixed-dim: "#4edea3"
  on-tertiary-fixed: "#002113"
  on-tertiary-fixed-variant: "#005236"
  background: "#071014"
  on-background: "#e5e1e6"
  surface-variant: "#353438"
  surface-base: "#071014"
  surface-raised: "#0d0d12"
  surface-card: "#121218"
  surface-hover: "#1a1a24"
  border-subtle: rgba(255, 255, 255, 0.08)
  border-glow: rgba(0, 210, 255, 0.35)
  text-primary: "#f3f4f6"
  text-secondary: "#9ca3af"
  text-muted: "#6b7280"
typography:
  display-hero:
    fontFamily: JetBrains Mono
    fontSize: 56px
    fontWeight: "700"
    lineHeight: 64px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: JetBrains Mono
    fontSize: 36px
    fontWeight: "700"
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-xl:
    fontFamily: JetBrains Mono
    fontSize: 40px
    fontWeight: "600"
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: JetBrains Mono
    fontSize: 28px
    fontWeight: "600"
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 28px
    fontWeight: "600"
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 22px
    fontWeight: "500"
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: "500"
    lineHeight: 26px
    letterSpacing: 0em
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "400"
    lineHeight: 18px
    letterSpacing: 0em
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: "500"
    lineHeight: 18px
    letterSpacing: 0.02em
  label-badge:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: "600"
    lineHeight: 14px
    letterSpacing: 0.06em
  label-micro:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: "500"
    lineHeight: 12px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

This design system embodies the ethos of precision engineering, technical craftsmanship, and modern software architecture. Targeted at tech leads, engineering directors, and discerning collaborators, the aesthetic projects uncompromised clarity, high agency, and absolute command of the craft.

The design movement combines **Terminal-Inspired Minimalism** with **Dark Cybernetic Glassmorphism**. The visual plane is deliberate and restrained: near-void obsidian foundations, razor-sharp architectural layouts, and meticulous monospaced typography punctuated by laser-focused electric cyan accents. Visual clutter is stripped away in favor of high-density data, subtle luminous edge definition, and code-native hierarchy.

## Colors

The palette establishes an ultra-deep black core punctuated by high-frequency electric cyan and engineering blues.

- **Primary (`#00d2ff`)**: Electric Cyan. Used as the principal focal driver—active states, primary calls-to-action, active status indicators, and luminous keylines.
- **Secondary (`#3b82f6`)**: Deep Cobalt. Provides tonal support to the primary cyan, suitable for interactive gradients, structural tags, and secondary accents.
- **Tertiary (`#10b981`)**: Terminal Mint. Dedicated to operational statuses, active deployments, and Git/telemetry confirmations.
- **Neutral (`#071014`)**: Deep Teal Black. Sets the ground foundation across all viewports to maximize dynamic contrast against foreground elements.

All surfaces adhere to strict contrast checks against `surface-base` (`#071014`) and `surface-card` (`#121218`), with text tokens strictly partitioned between primary white (`#f3f4f6`) and subdued slate tones (`#9ca3af`, `#6b7280`).

## Typography

Typography is unified exclusively under **JetBrains Mono**. This commits the system entirely to the engineering discipline, evoking the precision of modern IDEs, technical documentation, and high-frequency developer workflows.

Letter-spacing is dialed tighter on larger headlines (`-0.04em` to `-0.02em`) to maintain editorial tension and prevent monospaced words from visually falling apart at large scale. Smaller labels and badges leverage generous positive tracking (`0.02em` to `0.08em`) with uppercase transformations for scannable, HUD-like information architecture.

## Layout & Spacing

The system is constructed around a disciplined 12-column grid capped at a maximum width of `1280px` for ultra-wide displays. Spacing relies on a base 4px/8px modular rhythm designed for high-density, legible data output.

- **Desktop (1024px+)**: 12-column grid, `24px` (`1.5rem`) gutters, dynamic margins that auto-center the main canvas.
- **Tablet (768px - 1023px)**: 8-column grid, `20px` gutters, `2rem` outer section margins.
- **Mobile (< 768px)**: 4-column single-axis stack, `16px` (`1rem`) gutters, `1.25rem` side margins.

Content density stays compact inside components (`space-xs` to `space-md`), while macro layout divisions employ structural breathing room (`space-xl` to `space-2xl`) to maintain visual cadence.

## Elevation & Depth

Depth is achieved through **low-contrast luminous borders** and **surface-container layering**, entirely avoiding generic fuzzy drop shadows.

1. **Surface 0 (Canvas)**: `#071014` flat background.
2. **Surface 1 (Panels & Cards)**: `#121218` background with an ultra-thin perimeter border (`1px solid rgba(255, 255, 255, 0.08)`).
3. **Surface 2 (Overlays & Active Cards)**: `#181822` background with backdrop blur (`blur(12px)`).
4. **Cyan Edge (Interactive Hover)**: Interactive cards and buttons escalate the border tint (`1px solid rgba(0, 210, 255, 0.45)`). No glows, no drop shadows.

## Shapes

The primary shape philosophy is **Soft Structural (Level 1)**: crisp, disciplined, and slightly tempered to prevent visual harshness while maintaining an architectural feel.

- Standard cards, containers, input fields, and dialogs utilize `4px` (`0.25rem`) corner rounding.
- High-level viewport sections or nested modal sheets may scale up to `8px` (`0.5rem`).
- Badges, status pills, and specific category chips depart into complete full-radius pills (`9999px`) to create intentional contrast against the otherwise rectangular, architectural layout.

## Components

### Buttons

- **Primary**: Background `#00d2ff`, text `#071014`, font weight 600. On hover: subtle scale transform (`1.02`) and brightness lift, no glow.
- **Secondary / Outline**: Background transparent, border `1px solid rgba(255, 255, 255, 0.12)`, text `#f3f4f6`. On hover: border color `#00d2ff`, text `#00d2ff`, background `rgba(0, 210, 255, 0.05)`.
- **Ghost Terminal**: Monospaced text with a prefix prompt `>` that shifts horizontally on hover (`transform: translateX(4px)`).

### Badges & Tech Chips

- Enclosed in fully rounded pill shapes (`border-radius: 9999px`).
- Background: `rgba(255, 255, 255, 0.04)`, border `1px solid rgba(255, 255, 255, 0.08)`.
- Typography: `label-badge` (11px, weight 600, uppercase).
- Accent variants (e.g., active stack, status indicator) feature a 6px pulsing dot using `#00d2ff` or `#10b981`.

### Project & Portfolio Cards

- Background `#121218`, border `1px solid rgba(255, 255, 255, 0.08)`.
- Padding: `1.5rem` (`space-lg`).
- Transitions: Smooth 200ms ease on border-color and box-shadow. On hover, the border shifts to `rgba(0, 210, 255, 0.4)` with an internal subtle radiant gradient overlay.
- Metric indicators inside cards use high-contrast numerical highlights paired with muted sublabels.

### Form Inputs & Code Search

- Background: `#0d0d12`.
- Border: `1px solid rgba(255, 255, 255, 0.1)`.
- Text color: `#f3f4f6`, placeholder `#6b7280`.
- Focus State: Border snaps to `#00d2ff`, box shadow `0 0 0 1px #00d2ff`.
- Leading indicator or prompt icon styled as a terminal command prompt (`$ ` or `> `).

### Telemetry / Metrics Blocks

- Designed for high visual density: large bold metric value, micro-label description below, framed by thin hairline borders separating data points in a cohesive modular row.
