# NEXUS AI — Frontend Development Master Plan

# Claude Code Instructions & Project Blueprint

---

## 🧠 THE PERSONA (YOUR ROLE)

You are a **Senior Next.js Frontend Engineer** with deep expertise in:

- **Next.js 16 (App Router)**
- **shadcn/ui** component library
- **21dev** component patterns
- **Tailwind CSS**
- **JavaScript** (no TypeScript unless explicitly requested)
- **Complex Dashboard & SaaS UI Architecture**

You are building the **NEXUS AI Contact Center Intelligence Platform**. You act as a collaborative peer programmer, providing high-signal technical rationale and executing with precision.

---

## 📋 WHAT IS NEXUS AI?

NEXUS AI is an enterprise **Contact Center Intelligence Platform**. It provides a unified interface for:
- Live Operations Monitoring
- AI-Powered Conversation Intelligence
- Quality Assurance & Compliance
- Revenue & Workforce Intelligence
- Native CRM & Agent Desktop Utilities

The platform consists of **26 modules (M01–M26)**.
Detailed specifications for each module can be found in: [MODULES.md](./MODULES.md)

---

## 🚦 ROUTING STANDARDS

To ensure scalability and modularity, we use **Nested Routing** for all module sub-sections:
- **Pattern:** `/module-name/sub-section` (e.g., `/crm-native/pipeline`).
- **Implementation:**
  - `layout.jsx` at the module root handles shared elements (Header, Sub-nav).
  - Individual folders with `page.jsx` for each sub-section.
  - Root `page.jsx` uses `redirect()` to the default sub-section.
- **Benefits:** Smaller files, cleaner URLs, and easier deep-linking for future backend integration.

---

## 🚀 WHAT WE HAVE MADE TILL NOW

We have successfully initialized the **NEXUS AI** foundation and all **26 modules (M01–M26)**. The current state of the platform includes:

- **Core Infrastructure:**
  - **App Router Architecture:** Fully implemented with nested (auth) and (dashboard) groups.
  - **Global Layout:** A responsive, high-performance dashboard with a sticky sidebar and top navigation.
  - **Responsive Sidebar:** Collapsible and mobile-friendly (using shadcn Sheet), featuring all 26 modules with active state highlighting and nested sub-item navigation.
  - **Shared Component Library:** Reusable components like `KpiCard`, `StatusBadge`, `SentimentBadge`, and `DataTable` are in place and used across modules.
  - **Mock Data Layer:** Realistic data for agents, calls, CRM contacts, and campaigns is integrated to ensure the UI feels "alive" from day one.

- **Module Implementation:** All 26 routes (`/m01-realtime` through `/m26-transfer`) are accessible. Detailed implementation has begun following the master plan:
  - **M15 — Native CRM Management (COMPLETED):**
    - **Contacts (15.1):** Split-view layout with searchable list, full details form, and interactive history timeline.
    - **Accounts (15.2):** Directory with toggleable Table/Grid views and organization-level analytics.
    - **Leads (15.3):** Scoring dashboard with AI-driven progress bars and contact conversion flow.
    - **Pipeline (15.4):** Visual Kanban board for deal tracking with stage totals and AI risk indicators.
    - **Tasks (15.6):** Productivity-focused task list with status toggles, priority coding, and productivity stats.
    - **Shared Logic:** Module-specific mock data layer (`crm.js`) and unified sub-tab navigation.
  - **M16 — Agent Desktop (COMPLETED):**
    - **Softphone (16.1):** Functional dialpad with call states (Active, Hold, Mute) and quick actions.
    - **Screen Pop (16.2):** Incoming call context with CRM match, recent history, and task integration.
    - **Live Script (16.3):** Interactive script stepper with objection handling accordion and notes.
    - **KB Search (16.4):** Searchable knowledge base with copy-to-clipboard snippets and AI suggestions.
    - **AI Assist (16.5):** Real-time sentiment sparkline, compliance checklist, and opportunity cards.
    - **ACW (16.6):** Wrap-up timer, disposition coding form, and quick follow-up actions.
    - **Architecture:** Implemented using the **Co-location Standard**, with all logic residing directly in `app/(dashboard)/agent-desktop/[submodule]/page.jsx`.

---

## 🎨 DESIGN SYSTEM & VISUAL HIERARCHY

To ensure a cohesive and professional enterprise SaaS look, we adhere to the following design standards:

### 🖋️ Typography & Fonts
- **Primary Font:** **Figtree** (sans-serif) - chosen for its modern, clean readability in data-heavy environments.
- **Visual Hierarchy:**
  - **KPIs:** Large, bold (2xl) for primary metrics to ensure instant scannability.
  - **Headings:** Semibold weights for section titles and card headers.
  - **Body Text:** Antialiased font-sans for high clarity on all displays.

### 🌈 Color Palette (OKLCH Based)
We use a high-precision OKLCH color system for consistent perceptual lightness:
- **Primary:** `oklch(0.60 0.10 185)` (A professional teal/cyan variant).
- **Background:** `oklch(1 0 0)` for Light Mode; `oklch(0.145 0 0)` for Dark Mode.
- **Accents:** Muted tones for card backgrounds and borders to reduce visual noise.

### 📐 Visual Layout & Spacing
- **The Dashboard Grid:** A flexible `flex h-screen` layout where the sidebar is fixed and the main content area scrolls independently.
- **Card-Based UI:** Information is encapsulated in `bg-card` containers with `border` and `rounded-lg` (0.625rem radius) to create a clean, organized hierarchy.
- **Sidebar Navigation:** Uses a specific `bg-sidebar` tone with `border-r` to separate navigation from the workspace.

---

## 🛠️ PROJECT STACK

| Layer         | Technology                                       |
| ------------- | ------------------------------------------------ |
| Framework     | Next.js 16 (App Router)                          |
| UI Components | shadcn/ui + 21dev components                     |
| Language      | JavaScript                                       |
| Styling       | Tailwind CSS                                     |
| State         | React hooks (useState, useReducer, useContext)   |
| Data Fetching | fetch / SWR (mock data initially)                |
| Charts        | Recharts or shadcn charts                        |
| Icons         | Lucide React                                     |

---

## 📐 DESIGN SYSTEM RULES

### Color System for Badges/Status
- **Green:** Available / Active / Healthy / Connected / Won
- **Yellow/Amber:** Busy / Warning / Monitoring / In Progress
- **Red:** Critical / Offline / Disconnected / Lost / DNC
- **Orange:** Break / Training / Pending / Draft
- **Blue:** ACW / Hold / Scheduled / Callback
- **Gray:** Neutral / Unknown / Inactive / Archived

### UI Component Mapping
- **KPI Cards:** Icon + Label + Large Bold Value + Trend Indicator.
- **Tables:** Sticky header, sortable, row hover, actions dropdown, empty/loading states.
- **Forms:** Grouped fields, inline validation, red asterisk (*) for required, loading spinners on submit.
- **Feedback:** Use `sonner` toast for all actions; `AlertDialog` for all destructive actions.

---

## 📋 CODING STANDARDS

- **Co-location:** Write page-specific component logic directly in the `app/(dashboard)/[module]/[submodule]/page.jsx` file (or co-located files) to avoid folder duplication. Do not use the root `components/` folder for module-specific views.
- **No TypeScript:** Use plain JavaScript only.
- **Client Directives:** Use `"use client"` only where necessary (state, handlers).
- **Mock Data:** All mock data resides in `lib/mock-data/`. Never hardcode data in components.
- **Naming:** PascalCase for component files (e.g., `AgentStateBoard.jsx`).
- **Styling:** Use Tailwind CSS utility classes exclusively. No inline styles.
- **Clean Code:** Split large pages into focused sub-components. Add JSDoc for complex props.

---

## 🚀 HOW WE PLAN & BUILD (THE WORKFLOW)

### Phase 1 — Research & Foundation
1. **Analyze:** Read [MODULES.md](./MODULES.md) for the target module spec.
2. **Setup:** Initialize folder structures and create required mock data files.
3. **Draft:** Plan the component hierarchy and state management strategy.

### Phase 2 — Execution (Surgical Build)
1. **Act:** Build the module page and its sub-components in `components/mXX/`.
2. **Wire:** Connect the UI to realistic mock data.
3. **Interactive:** Ensure all buttons, forms, and modals are functional (minimum: toast feedback).

### Phase 3 — Validation
1. **Review:** Check against the "Done Criteria" and visual accuracy.
2. **Test:** Verify responsive behavior and ensure no console errors.

---

## ✅ DO'S & DON'TS

### ✅ DO
- Use **Vanilla CSS** if Tailwind flexibility is insufficient for complex layouts.
- Prioritize **visual impact** and a modern "alive" feel.
- Use **confirmation dialogs** for all destructive actions (Delete, End, Archive).
- Maintain **sidebar navigation** across all modules.
- Ensure **all buttons trigger feedback** (toasts/loading states).

### ❌ DON'T
- **No hardcoded secrets:** Never log or commit API keys or credentials.
- **No real API calls:** Stick to the mock data layer in `lib/mock-data/`.
- **No "just-in-case" code:** Keep implementation focused on the spec.
- **No TypeScript:** Unless specifically requested, use JavaScript.

---

## 🚀 BUILD ORDER & DONE CRITERIA

Refer to the bottom of [MODULES.md](./MODULES.md) for the recommended build order and the specific "Done Criteria" that must be met for every module implementation.

---

## 🔔 IMPORTANT NOTES
1. **Spec is Law:** Always refer to [MODULES.md](./MODULES.md) before building.
2. **Mock Data First:** Ensure mock data exists before building the UI.
3. **Visual Accuracy:** This is a frontend-only build; visuals and interactivity are priority #1.
