# Chamie Cakes Design System

**Product Type**: Premium Custom Cakes & Confections
**Landing Pattern**: Hero-Centric + Social Proof + Visual Gallery
**UI Style**: Minimalist Luxury (Black & White palette, 32px border-radii, premium typography, subtle depth, high-end editorial feel)

## Colors
- **Primary**: `#000000` (Pure Black) - Used for primary headings, buttons, and high-contrast elements.
- **Secondary**: `#4B5563` (Slate 600) - Used for secondary text and subtle accents.
- **Accent**: `#F3F4F6` (Slate 100) - Used for backgrounds and soft containers.
- **Background**: `#FFFFFF` (Pure White) - Main page background.
- **Text**: `#111827` (Gray 900) - Main body text.

## Typography
- **Headings**: Outfit (Sans-serif, bold, tracking-tight) - Modern, clean, and premium.
- **Body**: Inter (Sans-serif, clean, highly readable).

## Key Design Tokens
- **Border Radius**: `32px` (radius-3xl/4xl) for main containers and hero elements.
- **Shadows**: Subtle `shadow-2xl` for depth on primary cards.
- **Transitions**: 400-600ms for premium, fluid motion (Framer Motion).

## Anti-Patterns
- 🚫 Bright colors (Pink/Green/Gold from previous iterations)
- 🚫 Sharp corners (always use 32px for main elements)
- 🚫 Harsh shadows
- 🚫 Low contrast text
- 🚫 Cluttered layouts

## Pre-Delivery Checklist
- [ ] WCAG AA contrast (B&W ensures this)
- [ ] `cursor-pointer` on all interactive elements
- [ ] `prefers-reduced-motion` compliance
- [ ] Responsive parity (375px to 1440px)
- [ ] Consistently applied 32px border-radius
