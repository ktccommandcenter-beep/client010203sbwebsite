# Zaddy Products - UI/UX Standard Operating Procedure (SOP)

This document outlines the core design elements, technical strategies, and brand guidelines established to achieve the "Ferrari.com-like" premium tier aesthetic for the Zaddy Products web application.

---

## 1. Core Brand Aesthetic
**Objective**: Maintain a "Premium Luxury Glass" aesthetic. The interface should feel cinematic, authoritative, and effortlessly sleek, moving away from "busy" layouts toward a highly curated experience.
- **Tone**: Cinematic, bold, uncrowded, and refined.
- **Visual Mechanics**: Fluid animations, dynamic backdrop blurring, deep black-on-black layering, iridescent effects, and seamless scroll transitions.

## 2. Typography & Color Palette
Typography is used to separate the brand from standard e-commerce templates.
- **Headings (Display)**: `Cormorant` (`font-display`). Used for sophisticated, commanding headers.
- **Body Text**: `Montserrat` (`font-sans`). Used for clean, geometric, and legible product descriptions.
- **Accents**: Gold (`text-gold`). Used sparingly for highlighting key benefits without cluttering the UI.
- **Special Formatting (B.D.E.)**: The "Bold. Dominant. Effortless" tenet and related B.D.E. products must use the agreed-upon **"Trend chasing" style: `font-display italic text-gold`**. 
  - *Rule*: Avoid aggressive colors (like harsh crimson reds) for emphasis; instead, rely on this premium typographic contrast.

## 3. Dynamic Hero Section (Scroll-Expansion)
The Hero section is the user's first impression and sets the cinematic tone. Always use the custom `ScrollExpandMedia` component.
- **Video Looping Strategy**: Background lifestyle videos must loop seamlessly. We enforce a programmatic JavaScript clamp (e.g., forcing a restart at exactly `17.0s`) to ensure only the highest-quality, most relevant segment plays repeatedly.
- **Inverse Scroll Animation**: The video should load at maximum viewport real estate (95vw) to completely immerse the user, then geometrically shrink into a cleanly contained frame as they scroll down.
- **Logo Presentation**: Allow the lifestyle video to "breathe" before showing the brand. The central Zaddy logo should fade in slowly (e.g., `8000ms` delay) independent of scroll, and gently expand as the user scrolls down the page.
- **Contrast Control**: Place a heavily darkened, blurred overlay (e.g., `bg-black/80 backdrop-blur-[8px]`) directly behind the video component. This prevents sharp visual clashes and guarantees the white logo/text remains legible over any frame of the video.

## 4. Mobile Video Policies (The "Holy Grail" Background Video Strategy)
Mobile browsers (especially iOS Safari) heavily police auto-playing video, often overlaying an unwanted "Play" button or seizing fullscreen control. To ensure the Hero video acts strictly as a background aesthetic:
- **HTML Attributes**: Always include this strict block on the `<video>` tag:
  `autoPlay`, `muted`, `playsInline`, `loop`, `tabIndex={-1}`, `disablePictureInPicture`, `disableRemotePlayback`, and `{...({ 'webkit-playsinline': 'true' } as any)}`.
- **CSS Pointer Interventions**: Apply `pointer-events: none` to the `<video>` tag so the device ignores physical taps on the element.
- **Webkit Overrides**: Globally hide iOS native controls via the main stylesheet (`index.css`):
  ```css
  video::-webkit-media-controls { display: none !important; opacity: 0 !important; }
  ```
- **React Mount Injection**: Explicitly execute a programmatic `video.play().catch(...)` inside a `useEffect` hook to aggressively force playback when the component mounts, bypassing strict mobile data-saver constraints.

## 5. Asset & Layout Management
- **Source of Truth**: Only use canonical, high-resolution assets served directly from the official Shopify CDN (`zaddyproducts.com/cdn/shop/files/...`).
- **Whitespace**: Ensure product cards have sufficient internal padding and negative space. Do not crowd typography against product imagery. Let the products breathe.

## 6. Metadata and SEO (Vercel/Social Sharing)
Preview links sent to clients or shared on social media must immediately reflect the premium nature of the brand before the user even clicks.
- **Document Title**: `Zaddy | High-Performance Grooming` *(Do not use default framework titles).*
- **Open Graph (OG) Tags**: Always populate `og:title`, `og:description`, and `og:image` inside `index.html`. Link the `og:image` to a high-quality, wide Shopify CDN asset.
- **Twitter Cards**: Include `twitter:card="summary_large_image"` to ensure full-bleed image previews when links are texted or shared.
