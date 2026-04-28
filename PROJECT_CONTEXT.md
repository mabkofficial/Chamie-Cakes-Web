# Chamie Cakes | Project Context & Documentation

## 🎂 Project Overview
**Chamie Cakes** is a high-end, boutique custom cake studio based in the Dallas/Fort Worth (DFW) metroplex. The platform serves as a digital flagship for **Chamie Rochelle**, a sculptural cake artist specializing in sophisticated, artisanal creations for weddings and milestone celebrations.

### 🎯 Objective
The primary goal of this project is to provide a "Minimalist Luxury" digital experience that guides high-intent clients from inspiration (Gallery) to detailed inquiry (Multi-Step Order Form).

---

## 🎨 Design Philosophy: "Minimalist Luxury"
The brand identity is built on a **Strict Neutral (Black & White)** palette, emphasizing high-quality photography and elegant typography.

- **Palette**: Strictly #000000 (Primary) and #FFFFFF (Background). Accents are restricted to subtle Slates/Grays for depth.
- **Typography**: 
  - **Headings**: *Outfit* (Bold, Tracking-tight) - Modern, sculptural, and authoritative.
  - **Body**: *Inter* (Regular, Leading-relaxed) - Highly readable and clean.
- **Radii**: Standardized **32px to 40px** rounded corners for a soft, premium feel.
- **Animations**: Subtle entrance fades and spring-based transitions using *Framer Motion*.

---

## 🛠 Technology Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 4+
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Content**: Static Markdown with Gray-matter (Content Layer)
- **Type Safety**: TypeScript (Strict)

---

## 🏗 Project Structure & Architecture

### 1. Centralized Configuration (`src/lib/config.ts`)
The `SITE_CONFIG` object is the single source of truth for all brand and contact data:
- Site Name, Description, and Metadata.
- Contact Details (Phone: 713.269.3696, Email: hello@chamiecakes.com).
- Booking Status and Lead Times.
- Social Media Links.

### 2. Standardized UI Primitives (`src/components/ui/`)
All pages MUST use these primitives to maintain aesthetic parity:
- **`Heading`**: Standardized typography scaling (h1-h6).
- **`Badge`**: Categorization and status labels (Portfolio, Connect, Journey).
- **`Section`**: The global layout wrapper that enforces uniform padding and container constraints.

### 3. Content Layer (`src/lib/content.ts`)
A type-safe utility for fetching and parsing markdown files from `src/content/`.
- **Cakes**: Individual cake profiles (Name, Category, Description, Image).
- **Pages**: Static content for the About page and other text-heavy sections.

---

## 📄 Page Breakdown

### 🏠 Home (`app/page.tsx`)
- **Hero**: High-impact introduction with "Minimalist Luxury" aesthetic.
- **Previews**: Snippets of the "How It Works" and "About" sections.
- **Social Proof**: Standardized Testimonials and FAQ modules.

### 🖼 Gallery (`app/gallery/page.tsx`)
- **Filterable Grid**: Modular grid allowing clients to browse by category (Wedding, Birthday, Minimalist).
- **Process & Flavors**: Contextual sections explaining the booking journey and signature taste profiles.

### 📖 About (`app/about/page.tsx`)
- **The Story**: Focuses on Chamie Rochelle's artistry and vision.
- **Image/Text Balance**: Uses a sculptural 4:5 aspect ratio for portraits.

### 📝 Order / Inquiry (`app/order/page.tsx`)
- **Multi-Step Form**: A sophisticated, logic-driven inquiry flow that captures specific event details without overwhelming the user.

### ✉️ Contact (`app/contact/page.tsx`)
- **Direct Connect**: Centralized contact info and a simple "Send a Note" fallback form.

---

## 🚀 Key Implementation Rules
1. **No Ad-hoc Colors**: Always use Tailwind theme variables (`primary`, `border`, `muted`) or strict Black/White.
2. **Standardized Radii**: All cards and containers must use the design system's `rounded-[32px]` or `rounded-[40px]`.
3. **SEO First**: Use the `SITE_CONFIG` to generate metadata and JSON-LD schema on every page.
4. **Content-Driven**: All portfolio items must be added via `src/content/cakes/*.md` files to be automatically rendered in the gallery.

---

## 📞 Contact Information
- **Phone/Text**: 713.269.3696
- **Email**: hello@chamiecakes.com
- **Instagram**: @chamiecakes
- **Location**: Dallas/Fort Worth Metroplex, Texas
