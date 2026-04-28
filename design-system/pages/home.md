# Home Page Design System Override

## Sections
1. **HERO**: Full-bleed parallax hero with cake image. Headline: "Custom Cakes for Life's Sweetest Moments". Subheadline: "Handcrafted in Dallas/Fort Worth". Two CTAs: "Start Your Order" (gold, primary) and "View Gallery" (outline).
2. **FEATURED CATEGORIES**: 4 bento-grid cards (Wedding, Birthday, Kids, Holiday) with soft hover-lift animation. Each card links to gallery filter.
3. **HOW IT WORKS**: 3-step timeline with scroll-reveal animation. Steps: "Share Your Vision" → "We Design & Bake" → "Enjoy Your Creation". Use Intersection Observer for scroll-triggered reveal.
4. **TESTIMONIALS**: Horizontal carousel (auto-rotate 4s). 3 testimonial cards with 5-star ratings.
5. **CTA BANNER**: Full-width soft pink background. Headline: "Ready to Create Your Custom Cake?". Button: "Start Your Order →". Below: "Or call Chamie at 713.269.3696".

## Animations
- Hero headline: fade-in on load (0.5s)
- Category cards: staggered reveal on scroll
- How It Works: each step reveals sequentially
- Testimonial carousel: smooth slide transition
- CTA button: subtle pulse animation on idle (after 5s)

## Mobile
Stack all sections. Sticky "Order Now" floating button at bottom. Click-to-call phone number in header.
