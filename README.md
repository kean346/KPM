# KPM Opulence — The Event Studio
A Next.js/TypeScript product demonstration by paceIT, built on the editorial concepts in the MIT-licensed 8B florist template. Original HTML builds, licence and credits are preserved.

## Run locally
Requires Node 20.9+ and npm.
    npm ci
    npm run dev
Open http://localhost:3000. For production: npm run build, then npm start.

## Explore the connected demo
Click **Explore the Experience**, then **Load Example**. Continue through the six Event Studio steps and submit the fictional enquiry. The default is Romantic Proposal / Blush Elegance, flowers and candles on, balloons off, 21 November 2026 at 18:30 in Pretoria. The calculated illustrative estimate is R3,900.
Open **View in Studio Manager**, create a quotation, edit a line item, save, download the PDF, mark accepted, and confirm booking. Open 21 November in the calendar. Clients, overview metrics, analytics and activity reflect those same records.
Accepted quotations are locked. Duplicate quote/booking actions reuse the existing record. Catalogue changes apply only to future estimates.
Use Settings to export a JSON backup or reset the browser demo (confirmation required).

## Routes
- / — animated editorial homepage
- /collections — collection overview
- /collections/romantic-proposals, /collections/room-setups, /collections/floral-arrangements, /collections/balloon-styling, /collections/heart-boxes
- /gallery — filtered inspiration and keyboard-accessible image dialog
- /studio — six-step configurator with saved draft
- /studio/review — review saved draft
- /enquiry/success/[id] — saved enquiry reference
- /admin — overview and activity
- /admin/enquiries and /admin/enquiries/[id]
- /admin/quotations and /admin/quotations/[id]
- /admin/bookings, /admin/calendar
- /admin/clients and /admin/clients/[id]
- /admin/packages, /admin/analytics, /admin/settings

## Persistence and security
No credentials or paid infrastructure required. Data stays in localStorage on this browser and origin, with storage-event updates across tabs. No cross-device synchronisation. Storage errors produce visible feedback; backup before clearing browser data. Simultaneous writes are last-writer-wins, not multi-user transactions.
Use fictional information only. There is no authentication, secure file upload, email delivery, payment processing, actual booking availability, customer tracking portal or production data endpoint.
The MongoDB server-only adapter is an integration foundation, deliberately not exposed through routes. MONGODB_URI and MONGODB_DB are documented in .env.example. Before connecting real records, implement authenticated server sessions, tenant authorisation, validated API operations, workspace creation, conflict retry, retention/consent rules, rate limiting, backups and auditing. Client-side state must then be replaced with authorised repository calls. Merely adding an environment variable does not enable database mode.

## Verify
    npm run typecheck
    npm run lint
    npm test
    npm run build
    npx playwright install chromium
Start the dev server in a separate terminal, then:
    npm run test:e2e
Tests cover price snapshots, catalogue updates, status gates, idempotency, linked records and the browser quotation/calendar journey. Browser tests use a clean context.

## Deploy to Vercel
Push this folder as the project root (or set Root Directory to KPM if the containing folder is your repository). Import the Git repository in Vercel; select Next.js, install with npm ci and build with npm run build. No environment variables are needed for the browser demo. Every visitor receives isolated browser data. Use a preview deployment to verify the workflow before sharing. No deployment was created by this implementation.
Do not enable public real-data submission until authentication and authorised persistence are implemented.

## Assets and design
See AUDIT.md for the local image manifest, original animation audit and official-business source. CREDITS.md and LICENSE retain upstream attribution. All photos are illustrative Unsplash editorial inspiration, not verified KPM work. Palette, packages and pricing are proposed demonstration designs. No official KPM photography was copied.
Cormorant Garamond and Manrope are hosted locally (SIL Open Font License, licence files in public/fonts); system fonts are fallbacks.
Balloon styling uses a licensed pink-and-white balloon garland inspiration photo. Classic Red Romance is a proposed direction; the available candle/floral photograph does not depict an exact red-rose room setup.
The video hero uses native media and CSS crossfades; GSAP provides scoped editorial reveals, staggered collection-card reveals, photo-spread motion. Native scrolling is retained; Lenis was intentionally omitted. Reduced motion shows finished layouts.

## Remaining production work
Configure business-approved prices, terms, tax, deposits and package availability; supplied brand assets and verified project imagery; authenticated MongoDB operations; delivery and messaging providers if wanted. The date defaults are presentation examples, not a live availability calendar. Demo walkthrough controls provide manual navigation, rather than automating business decisions.


## Verification environment notes
The managed Windows test browser cancels even minimal native Blob downloads. The default E2E test requires a successfully saved download; KPM_SANDBOX_DOWNLOAD_FALLBACK=1 explicitly enables a documented environment-only fallback that captures the exact PDF Blob bytes, checks the PDF header and saves them with the runner. The download event and filename are still checked. Native save completion must be rechecked outside this sandbox.
npm audit --omit=dev reports zero production dependency vulnerabilities at implementation time. Eight moderate advisories remain in the development lint dependency chain (minimatch / typescript-eslint); review upstream updates before CI deployment.

## Official catalogue references
The five homepage collections are compact cards with viewport-triggered staggered reveals, pointer-relative horizontal movement, keyboard focus treatment and reduced-motion support. The catalogue in src/lib/catalogue.ts records 12 product names from KPM’s official website, verified room-package inclusions, Heart Box contents and four quote-only room-setup extras. Package references and extras can be selected in the studio and persist into enquiry summaries and PDF exports. Official product links let customers check the source. No official fixed prices were supplied by these pages; existing demo estimates remain illustrative. The former /collections/bespoke-celebrations link is retained as an alias for the gift-box collection.

## Cinematic homepage
Three original 3840×2160 Pexels stock clips replace the earlier soft 1080p reference videos. The selected scenes show an ivory floral venue, a detailed rose close-up and a styled celebration table. They were visually inspected and their encoded dimensions checked in the browser; the original masters are retained; desktop background delivery uses compressed 1080p derivatives. See public/videos/manifest.json and CREDITS.md for author/source/licence details.
Automatic 8-second rotation, 1.2-second crossfades, pause/resume, hidden-tab/offscreen suspension and reduced-motion posters remain supported. These are inspiration scenes, not KPM project footage. The 4K originals prioritise quality and are large assets; a production video CDN with adaptive delivery can provide lower-bandwidth variants.

## Sharing and icons
The branded share card is served at /opengraph-image.png (1200×630), with Open Graph and large Twitter-card metadata. /favicon.ico contains 16/32/48px variants; /icon.png is 512px and /apple-icon.png is 180px.
For a custom production domain, set NEXT_PUBLIC_SITE_URL to its full HTTPS origin. Vercel's production project URL is detected automatically; localhost is only a development fallback. Social platforms may retain an older cached preview after deployment.

Mobile performance refinement: phones use dedicated 1080×1920 H.264 fast-start clips (6.26 MB, 3.82 MB, 3.60 MB) instead of the 4K masters (28.13 MB, 47.80 MB, 26.89 MB), about 87% less combined video data. Desktop uses fast-start 1080p derivatives of the same scenes (12.8 MB combined versus 102.8 MB for the original masters, 87.5% smaller). The original 4K masters remain available in the repository. Only the active clip preloads; reduced-motion/data-saver visitors receive a poster until they opt into playback. Mobile WebP posters, 44px controls and 16px studio inputs improve loading, touch and iOS behaviour.

Playback restoration: the hero now uses the pre-mobile-optimization playback policy, including next-scene preloading and automatic playback when reduced motion is off. Data-saver mode no longer forces a manual Play action. All viewports use the lighter landscape HD derivatives; portrait assets and original masters remain in the repository. The mobile Discover link is visible again. Browser autoplay restrictions can still prevent playback; reduced-motion preferences remain respected.


Phone loading and inspiration motion: phones select dedicated landscape 960×540 fast-start H.264 clips (about 448–646 KB each) through native media sources before playback. Only the active film preloads; later scenes load when played. Autoplay remains enabled without a data-saver Play gate. Desktop keeps 1080p delivery. The inspiration edit uses a scroll-driven rise, spread and settle sequence with three columns on phones; collection cards use pointer tilt without an idle render loop. Reduced motion retains static readable layouts. The two supplied depth-lookbook/carousel references informed transform interpolation and perspective; no remote reference media or extra animation library is required.

Playback correction: the homepage is now server-rendered immediately rather than gated on localStorage hydration. The initial video has native autoplay, muted, playsInline and loop attributes; there are no Play/Pause film controls. Font variants no longer all preload ahead of media. The inspiration fan is a timed approximately two-second sequence triggered on entry, rather than a scrub that can finish before the frames are visible. Reduced-motion settings still receive a static arrangement.
Startup follow-up: the first phone clip uses a 640×360 derivative capped at 250 kbps. Small WebP previews replace large JPEG posters; inactive scenes have no poster request. A cold Chromium phone test at simulated 1.6 Mbps / 150 ms latency improved from 9.7 s to 3.6 s for first playback in the local environment; deployed-device timing remains unverified.
