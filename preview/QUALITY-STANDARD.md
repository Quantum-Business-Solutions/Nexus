# The Quantum Website Standard

**Client-facing.** This is what every website we build is guaranteed to have on the day it goes
live, and how you can check it yourself. Paste it into the proposal, the ClientCommand plan and the
handover. Every line maps to a check in `process/qa-process.md` that produces evidence, and the
evidence is delivered to you, not summarised for you.

Version 1.0, 2026-09-06. Owner: Shawn Peterson. Changes go through `process/RUNBOOK.md`.

---

## What you are guaranteed

### 1. It is yours, not ours

- The site names your company in its structured data, its titles, its footer and its social tags.
  No trace of Quantum Business Solutions, our booking links or our navigation remains anywhere in
  the HTML. Checked by machine on every page, not by eye.
- Your LinkedIn company page and your other verified profiles are declared in the site's
  Organization schema, so search and answer engines resolve your company to the right entity.

### 2. Every page works on a phone first

- No horizontal scrolling at 390px wide. No text under 13px. Form fields at 16px or larger so
  iPhones do not zoom on tap. Every tap target at least 24px, with 44px as the goal.
- Sticky headers and bars never take more than a quarter of the screen.
- Navigation reachable by touch on every page, and the hero headline sized for a phone.
- We look at every page on a real phone before it ships. The gate reports it; a person confirms it.

### 3. Readable by everyone

- Text contrast meets WCAG AA (4.5:1) everywhere, including accent text on light backgrounds,
  which is where most sites fail. Buttons pass on their own colour.
- Exactly one H1 per page, headings in order, alt text on every image, a skip link, and keyboard
  focus that is visible. Checked with axe-core at three screen widths.
- Motion respects the visitor's reduced-motion setting.

### 4. Fast

- Images sized, dimensioned and lazy-loaded below the fold; the hero image prioritised.
- Font connections pre-established; no layout shift (CLS) from images or fonts.
- We measure Core Web Vitals on the staging URL before launch and report the numbers.

### 5. Found

- Every page has a title, a meta description, a canonical URL, an Open Graph image and Twitter
  card, so links shared in email, Slack, LinkedIn and Teams render properly.
- Structured data is present, valid and correct: Organization and WebSite on the home page,
  BreadcrumbList on inner pages, FAQ and Article markup where the content earns it, and never
  markup that claims something the page does not show.
- Every URL that earned traffic on your old site gets a permanent (301) redirect. We list them,
  and we test them after launch.
- An SEO baseline is recorded before we touch anything, so the effect of the work can be measured.

### 6. Converts

- Two ways to act on every page: a hard offer (book, call, request) and a soft one (a download, an
  assessment, a calculator) for the visitor who is not ready yet.
- Every form delivers to a named person on your team, and we send a test submission through it
  with you before launch.
- No broken internal links. Checked on every page.

### 7. Written like a person

- No placeholder text, no lorem ipsum, no template copy left over from another client.
- No generic claims. Every headline passes the test: could a competitor truthfully say this? If
  yes, it does not ship.
- No em dashes, no filler openers, no stacked adjectives. The copy reads like your best
  salesperson on a good day, and it is reviewed by a person, not just a model.

### 8. Balanced and finished

- Card grids never leave an orphan: no row of six over a row of two. Checked at every width.
- Every image is a real image or a deliberately blank surface. Nothing generated is passed off as
  a photograph of your people or your premises.
- Every page scores at least 80 out of 100 on our automated gate, and you receive the score
  sheet.

### 9. Editable by your team

- Built on HubSpot's drag-and-drop editor with the theme's own modules, so your team can change
  copy, images and sections without a developer.
- A recorded walkthrough of how to edit the site, delivered with the launch.

### 10. Supported after launch

- Anything on this list that is found not to hold in the first 30 days after launch is fixed at no
  charge.
- 30, 60 and 90 days after launch you receive a performance read against the baseline: traffic,
  the pages that earn it, and what we would change next.

---

## What you receive as evidence

| Item | What it is | When |
|---|---|---|
| Gate report | Per page: every check above, pass or fail, with the score | Before launch, and after |
| Screenshots | Every page at 390, 768 and 1440 wide | Before launch |
| Accessibility report | axe-core results, three widths, per page | Before launch |
| Structured data validation | Rich Results Test and schema.org validator results, five page types | Before launch |
| Redirect map | Old URL, new URL, tested status | At launch |
| Form test record | Who received the test submission, and when | Before launch |
| Baseline and 30/60/90 reads | Organic traffic, keywords, top pages, value | Day 1, then 30/60/90 |
| Recorded walkthrough | How to edit the site | At launch |

## What this standard does not promise

Rankings, traffic growth or lead volume. Those depend on the market, your offer and the content
you publish after launch. What we promise is that nothing about the build will be the reason they
do not come, and that you can see the proof.
