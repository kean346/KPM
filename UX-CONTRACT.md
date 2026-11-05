# Interaction contract
Authority: user master implementation brief, sections 14–28 and 35.
Demo lifecycle: enquiry -> draft quotation -> accepted quotation -> confirmed booking. Booking requires accepted quotation; duplicate creation is idempotent. Totals derive from line items, tax, charges and discounts in integer cents.
Persistence: local browser storage; refresh and cross-tab updates supported. No authentication or external side effects. Sample-only consent required.
Forms save draft automatically, own field errors, preserve values. Native date/time/select UI accepted. Save feedback uses one aria-live status. Native dialog owns focus trapping, Escape and restoration.
Tables: local search and bounded pages of 8. Search intentionally transient to keep fictional contact data out of URL.
Reset requires app-owned confirmation. No real money, email or availability promises.

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
| --- | --- | --- | --- | --- |
| Select/Listbox | Native select | experience.tsx / OS popup | native only | browser mobile |
| Date | Native date, time and month | experience.tsx / OS popup | native only | browser workflow |
| Form | Field and configSchema | experience.tsx / model.ts | stepper, inline manager | unit and browser |
| Scrollbar | Global stylesheet | globals.css | standard and WebKit | viewport check |
| Toast | Experience aria-live status | experience.tsx | success and error copy | browser workflow |
| CRUD | mutate and domain functions | model.ts | browser-only transactions | model tests |
