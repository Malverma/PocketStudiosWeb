# Pocket Studios LLC — Website Specification

## 1. Overview

The website is the public home of Pocket Studios LLC. It introduces the studio, shows its applications and games, and gives visitors a way to get in touch.

**Primary goals**
- Present Pocket Studios LLC as a credible, professional software development studio.
- Showcase the studio's applications and games in a clear, browsable format.
- Provide a simple, reliable way to contact the studio.

**Tone of voice:** All copy must be professional, concise, and written in complete sentences. Avoid slang, exclamation-heavy phrasing, and informal language.

---

## 2. Design Principles

- **Clean and minimal:** Generous whitespace, a restrained color palette, and a clear typographic hierarchy.
- **Consistent:** Shared spacing scale, components, and interaction patterns across all tabs.
- **Responsive:** Fully usable on desktop, tablet, and mobile.
- **Accessible:** Meets WCAG 2.1 AA (color contrast, keyboard navigation, focus states, semantic HTML, alt text).
- **Fast:** Lightweight assets, optimized images, and minimal client-side JavaScript.

### 2.1 Visual Style

| Element | Guideline |
|---|---|
| Color palette | Neutral base (white / off-white / near-black) with a single accent color for links, buttons, and active states. |
| Typography | One clean sans-serif family (e.g., Inter). Headings in semibold, body in regular weight. |
| Corners & shadows | Subtle rounded corners (8–12px) and soft, low-contrast shadows on cards. |
| Iconography | Simple line icons; platform icons for Windows, Linux, Android, and Apple. |
| Theme | Light mode by default; dark mode support via `prefers-color-scheme` is recommended. |

---

## 3. Site Structure

The site uses a top navigation bar with three tabs:

1. **About** (default landing tab)
2. **Applications**
3. **Contact**

### 3.1 Header / Navigation

- Pocket Studios LLC logo or wordmark on the left; clicking it returns to the About tab.
- Tab links on the right: **About**, **Applications**, **Contact**.
- The active tab is visually indicated (accent underline or highlight).
- On mobile, the navigation collapses into a menu button.
- Each tab has its own URL using hash routes (`#/about`, `#/applications`, `#/contact`) so it can be linked and bookmarked.

### 3.2 Footer

- Text: "© {current year} Pocket Studios LLC. All rights reserved."
- Optional links to the three tabs.

---

## 4. About Tab

### 4.1 Purpose
Explain who Pocket Studios LLC is and what it builds.

### 4.2 Layout
- Hero section with the studio name and a short tagline.
- A short body section describing the studio.
- An optional "What We Build" section with two cards: **Applications** and **Games**.

### 4.3 Content (draft copy)

**Heading:** Pocket Studios LLC

**Tagline:** Software development for PC and mobile.

**Body:**
> Pocket Studios LLC is a software development studio that designs and builds applications and games for PC and mobile platforms. We are committed to delivering software that is reliable, intuitive, and carefully crafted. Our team focuses on thoughtful design, solid engineering, and a consistent experience across every platform we support.

**What We Build:**
- **Applications:** We develop practical, well-designed applications for Windows, Linux, Android, and Apple platforms.
- **Games:** We create engaging games for PC and mobile devices with a focus on quality and polish.

**Call to action:** A button labeled "View Our Work" that navigates to the Applications tab.

---

## 5. Applications Tab

### 5.1 Purpose
Showcase all of the studio's products, divided into applications and games.

### 5.2 Layout

```
┌──────────────────────────────────────────────────────────────┐
│  Applications                                   [ Filter ▾ ] │
├──────────────────────────────┬───────────────────────────────┤
│  Applications                │  Games                        │
│                              │                               │
│  ┌────────────────────────┐  │  ┌─────────────────────────┐  │
│  │ App card               │  │  │ Game card               │  │
│  └────────────────────────┘  │  └─────────────────────────┘  │
│  ┌────────────────────────┐  │  ┌─────────────────────────┐  │
│  │ App card               │  │  │ Game card               │  │
│  └────────────────────────┘  │  └─────────────────────────┘  │
└──────────────────────────────┴───────────────────────────────┘
```

- The content area is split down the center into two equal-width columns.
  - **Left column:** Applications
  - **Right column:** Games
- A thin vertical divider separates the two columns.
- Each column has its own heading and lists its items as cards.
- **Mobile:** The columns stack vertically, with Applications above Games.

### 5.3 Filter Button

- Positioned in the **top-right corner** of the Applications tab, aligned with the page heading.
- Opens a dropdown panel with the following filter options:

| Group | Options |
|---|---|
| Type | Applications, Games |
| Platform | Windows, Linux, Android, Apple |

**Behavior**
- Options are checkboxes, so multiple filters can be combined.
- Within a group, options combine with **OR** (e.g., Windows or Linux).
- Between groups, filters combine with **AND** (e.g., Games that support Android).
- **Type filter:**
  - "Applications" only: show only the Applications column, expanded to full width.
  - "Games" only: show only the Games column, expanded to full width.
  - Both or neither selected: show both columns.
- **Platform filter:** Hides any card that does not support at least one selected platform.
- The filter button shows a badge with the number of active filters.
- A "Clear filters" action resets all selections.
- Filtering happens instantly on the client without a page reload.
- Active filters are reflected in the URL (e.g., `#/applications?type=games&platform=android`) so filtered views can be shared.
- The dropdown closes on outside click or the Escape key and is fully keyboard accessible.

### 5.4 Product Card

Each card displays:
- Thumbnail or icon image
- Product name
- A one- to two-sentence professional description
- Platform icons/badges (Windows, Linux, Android, Apple)
- Optional link(s): "Learn More", store, or download link

Cards have a subtle hover state (slight lift or border highlight).

### 5.5 Empty States

- If a column has no items that match the active filters, it displays: "No items match the selected filters."
- If no products have been published yet, a column displays: "New releases are coming soon."

### 5.6 Data Model

Products are stored in a single data file (`data/products.js`, which sets `window.PRODUCTS`) so new items can be added without code changes.

```json
{
  "id": "example-app",
  "name": "Example App",
  "type": "application",
  "description": "A short, professional description of the product.",
  "platforms": ["windows", "linux", "android", "apple"],
  "image": "/images/example-app.png",
  "links": {
    "learnMore": "",
    "store": ""
  }
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | string | Unique identifier |
| `name` | string | Display name |
| `type` | `"application"` \| `"game"` | Determines the column |
| `description` | string | One to two professional sentences |
| `platforms` | string[] | Any of `windows`, `linux`, `android`, `apple` |
| `image` | string | Path to thumbnail |
| `links` | object | Optional external links |

---

## 6. Contact Tab

### 6.1 Purpose
Allow visitors to reach Pocket Studios LLC for inquiries, support, or business opportunities.

### 6.2 Content (draft copy)

**Heading:** Contact Us

**Body:**
> We welcome inquiries regarding our applications, games, and business opportunities. Please reach out using the information below, and a member of our team will respond as soon as possible.

**Email:** _(to be provided)_

### 6.3 Implementation Notes
- The email address is intentionally left blank and will be added later.
- Store the email address as a single configuration value (e.g., `CONTACT_EMAIL = ""`) so it can be updated in one place.
- When populated, render the email as a `mailto:` link.
- While the value is empty, display "Email address coming soon." in place of the link.
- An optional contact form (name, email, subject, message) may be added in a later phase.

---

## 7. Technical Requirements

- **Stack:** Plain HTML, CSS, and JavaScript with no build step.
- **Hosting:** GitHub Pages from https://github.com/Malverma/PocketStudiosWeb (`main` branch, repository root).
- **SEO:** Unique page titles and meta descriptions per tab, Open Graph tags, and a favicon.
- **Browser support:** Latest two versions of Chrome, Firefox, Safari, and Edge.
- **Performance target:** Lighthouse score of 90 or higher in Performance, Accessibility, Best Practices, and SEO.

---

## 8. Acceptance Criteria

- [ ] The navigation bar shows About, Applications, and Contact, with the active tab highlighted.
- [ ] The About tab describes Pocket Studios LLC as a software development studio for PC and mobile applications and games.
- [ ] All site copy is written in professional, complete sentences.
- [ ] The Applications tab is split down the center, with Applications on the left and Games on the right.
- [ ] A filter button in the top-right corner of the Applications tab filters by Applications, Games, Windows, Linux, Android, and Apple.
- [ ] Filtering by type alone shows only the matching column at full width.
- [ ] The Applications tab layout stacks vertically on mobile.
- [ ] The Contact tab displays a placeholder because the email address is currently blank.
- [ ] The site is responsive and meets WCAG 2.1 AA.

---

## 9. Open Items

- Contact email address (currently blank)
- Logo and brand accent color
- Initial list of applications and games, with images and descriptions
- Custom domain (optional)
