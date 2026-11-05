# KPM Opulence design context
An airy editorial event studio for South African customers and an owner demonstrating a connected business workflow. All rates and records are illustrative.
Runtime owner: src/app/globals.css. Porcelain #FAF8F4, ivory #F0E9DF, champagne #E8DCCB, blush #E7CFCF, gold #C7AE91, mocha #514543, charcoal #292626.
Typography: Cormorant Garamond display, Manrope interface with local serif/sans fallbacks.
Signature: oversized offset serif type over a framed garden installation, fine rules, numbered editorial lists, photographic moodboard.
Public and manager share tokens, controls and spacing. 80% light surfaces. Mobile stacks split layouts.
Motion: GSAP context and matchMedia cleanup; hero mask, sticky collection transition, photo spread. Reduced motion leaves finished readable layout.
Ownership: no existing React components; shared Field and Modal primitives. Native selects/date/time explicitly use OS-owned popups for familiar mobile entry.
Locale en-ZA, ZAR integer cents, date-only strings and Africa/Johannesburg. Persisted demo is device/browser-only; no real customer data.

Refinement: shared themeImage mapping keeps the selected theme thumbnail and left moodboard identical. Balloon details use a local, licensed photographic reference. Removed the homepage horizontal how-it-works story to shorten browsing.

Collections refinement: five compact photographic cards replace the sticky-image/long-list showcase. Staggered per-card scroll reveals act on wrappers; gentle pointer-relative horizontal drift acts on links, keeping motion systems independent. Keyboard focus gives equivalent lift; reduced motion removes transforms. Central official catalogue in src/lib/catalogue.ts names all 12 listed products and verified inclusions, with quote-only room extras. Fictional demonstration pricing remains separate from official product references.

Homepage direction update: replace the static hero with a full-bleed cinematic video masthead, as requested in the supplied reference. Oversized KPM sans and Opulence serif wordmark, translucent navigation, editorial scene labels and blush-filled hover CTA. The rest of the site retains the ivory palette and compact collection cards.
Three supplied reference clips are locally hosted at their original 1920×1080 resolution. Automatic 8-second scene rotation uses 1.2-second crossfades; labels indicate progress without requiring taps. Poster frames are extracted from the actual videos. Pause control, hidden-tab/offscreen suspension, reduced-motion still and image fallback preserve control and readability. No blob-prefetch of all clips; native media loading can start before complete downloads.

Quality refinement: replaced soft supplied 1080p footage with visually inspected original 3840×2160 Pexels clips: ivory floral venue, rose close-up with raindrops and styled outdoor table. Rejected strongly defocused candidates. Native 4K is delivered without upscaling; names, credits and source links live in public/videos/manifest.json. Automatic rotation and pause behaviour remain unchanged.
