# NEXUS AI — Frontend Development Master Plan

# Claude Code Instructions & Project Blueprint

---

## 🧠 YOUR ROLE

You are a **Senior Next.js Frontend Engineer** with deep expertise in:

- Next.js 16 (App Router)
- shadcn/ui component library
- 21dev component patterns
- JavaScript (no TypeScript unless explicitly requested)
- Tailwind CSS
- Complex dashboard and SaaS UI architecture

You are building the **NEXUS AI Contact Center Intelligence Platform** — a large-scale, enterprise SaaS frontend. Your job is to read this file carefully, understand the full scope of the product, and execute the plan module by module with precision and consistency.

---

## 📁 PROJECT STACK

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
| Layout        | Responsive sidebar layout with nested navigation |

---

## 📋 WHAT IS NEXUS AI?

NEXUS AI is an enterprise **Contact Center Intelligence Platform**. It gives supervisors, managers, agents, and admins a unified interface to monitor live operations, analyze AI-powered conversation intelligence, manage quality assurance, track revenue signals, manage workforce, and much more.

The platform has **26 modules (M01–M26)**, each with multiple menu sections, submenus, and detailed field-level specifications. Every field has a defined type, data type, validation rules, and API endpoint reference.

---

## 🗂️ MODULE OVERVIEW

| ID  | Module Name                               | Description                                                                       | Menu Items |
| --- | ----------------------------------------- | --------------------------------------------------------------------------------- | ---------- |
| M01 | Real-Time Operations Dashboard            | Live monitoring, queue mgmt, supervisor command center, live sentiment            | 12         |
| M02 | AI Conversation Intelligence              | Transcription, NLU, summarization, topic/intent/entity extraction                 | 10         |
| M03 | Quality Assurance & Compliance            | Automated scorecards, compliance packs, coaching workflows, QA reports            | 11         |
| M04 | Revenue Intelligence Layer                | Churn prediction, upsell signals, CLV tracking, sales analytics                   | 10         |
| M05 | Workforce Intelligence                    | Agent profiles, gamification, wellbeing engine, WFM forecasting                   | 12         |
| M06 | Customer Experience & Journey             | Journey mapping, VoC analytics, self-service & deflection analytics               | 9          |
| M07 | Reporting & BI Studio                     | Dashboard builder, report library, scheduled distribution, executive AI           | 10         |
| M08 | AI Supervisor Copilot                     | Real-time assist, coaching AI, NL query, shift briefings, alerts                  | 8          |
| M09 | Call Recording & Playback                 | Recording library, search & filter, playback controls, compliance flags           | 9          |
| M10 | Telephony Integration Hub                 | PBX connectors, SIP config, CDR mapping, real-time event streams                  | 8          |
| M11 | Integrations & Ecosystem                  | CRM sync, collaboration tools, data warehouse, webhook management                 | 10         |
| M12 | Administration & Settings                 | Tenant config, user mgmt, roles, billing, audit, white-label                      | 14         |
| M13 | Agent Self-Service Portal                 | Agent dashboard, performance, coaching inbox, gamification, schedule              | 9          |
| M14 | Security & Compliance Center              | Access logs, data governance, privacy controls, DLP, certifications               | 8          |
| M15 | CRM — Native Contact & Lead Management   | Built-in CRM: contacts, leads, accounts, pipelines, deals, tasks                  | 6          |
| M16 | Agent Desktop — Unified Softphone        | WebRTC softphone, CTI screen pop, live script, KB search, AI assist, ACW          | 6          |
| M17 | Outbound Dialer & Campaign Manager        | Predictive/Progressive/Preview dialing, campaign builder, pacing, DNC scrub       | 3          |
| M18 | Inbound Call Routing & IVR Builder        | Visual IVR/ACD flow builder, skill-based routing, callbacks, overflow             | 4          |
| M19 | Data Upload & Bulk Import Engine          | Excel/CSV upload wizard, field mapping, deduplication, DNC scrub, error reporting | 2          |
| M20 | Supervisor Agentic Role & Automation      | AI-autonomous supervisor actions, coaching triggers, escalation chains            | 3          |
| M21 | Asterisk Integration Deep-Dive Config     | AMI/ARI credentials, PJSIP/SIP trunk setup, WebRTC gateway, dialplan mapping      | 4          |
| M22 | Script & Knowledge Base Builder           | Call script builder with branching, objection library, KB article manager         | 2          |
| M23 | Robocall / Automated Voice Campaign       | Outbound IVR blast, TTS, DTMF capture, opt-out handling, compliance throttling    | 1          |
| M24 | After-Call Work & Disposition Mgmt        | Wrap-up codes, disposition trees, ACW timer rules, auto-CRM update                | 2          |
| M25 | DNC & Compliance List Management          | Do-Not-Call registry, national DNC API, state-level rules, consent lifecycle      | 3          |
| M26 | Call Transfer, Conference & Warm Transfer | Blind/warm/attended transfer, conference bridge, supervisor warm transfer         | 2          |

---

## 🏗️ PHASE 1 — PROJECT SETUP & FOUNDATION

**Do this first before building any module**

### Step 1.1 — Initialize Project

```bash
npx create-next-app@latest nexus-ai --javascript --tailwind --eslint --app --no-src-dir
cd nexus-ai
```

### Step 1.2 — Install shadcn/ui

```bash
npx shadcn@latest init
```

Install these shadcn components as needed throughout the build:

- button, input, label, badge, card, dialog, sheet, dropdown-menu
- select, checkbox, switch, radio-group, slider, textarea
- table, tabs, tooltip, popover, command, calendar
- progress, avatar, separator, scroll-area, skeleton
- alert, toast (sonner), collapsible, accordion

### Step 1.3 — Install Additional Dependencies

```bash
npm install recharts lucide-react date-fns clsx tailwind-merge
npm install @radix-ui/react-icons
```

### Step 1.4 — Folder Structure

Create this folder structure inside `app/`:

```
app/
├── (auth)/
│   └── login/page.jsx
├── (dashboard)/
│   ├── layout.jsx
│   ├── page.jsx
│   ├── m01-realtime/page.jsx
│   ├── m02-conversation/page.jsx
│   ├── m03-qa/page.jsx
│   ├── m04-revenue/page.jsx
│   ├── m05-workforce/page.jsx
│   ├── m06-cx-journey/page.jsx
│   ├── m07-reporting/page.jsx
│   ├── m08-supervisor-ai/page.jsx
│   ├── m09-recording/page.jsx
│   ├── m10-telephony/page.jsx
│   ├── m11-integrations/page.jsx
│   ├── m12-admin/page.jsx
│   ├── m13-agent-portal/page.jsx
│   ├── m14-security/page.jsx
│   ├── m15-crm/page.jsx
│   ├── m16-agent-desktop/page.jsx
│   ├── m17-dialer/page.jsx
│   ├── m18-ivr/page.jsx
│   ├── m19-data-upload/page.jsx
│   ├── m20-supervisor-agent/page.jsx
│   ├── m21-asterisk/page.jsx
│   ├── m22-scripts-kb/page.jsx
│   ├── m23-robocall/page.jsx
│   ├── m24-acw/page.jsx
│   ├── m25-dnc/page.jsx
│   └── m26-transfer/page.jsx
components/
├── layout/
│   ├── Sidebar.jsx
│   ├── TopNav.jsx
│   └── ModuleHeader.jsx
├── shared/
│   ├── StatusBadge.jsx
│   ├── SentimentBadge.jsx
│   ├── KpiCard.jsx
│   ├── DataTable.jsx
│   ├── FilterBar.jsx
│   ├── EmptyState.jsx
│   ├── LoadingSkeleton.jsx
│   └── ConfirmDialog.jsx
├── m01/ ... m26/
lib/
├── mock-data/
│   ├── agents.js
│   ├── calls.js
│   ├── queues.js
│   ├── contacts.js
│   ├── campaigns.js
│   ├── scripts.js
│   └── ... (one file per data domain)
├── utils.js
└── constants.js
```

### Step 1.5 — Global Layout & Sidebar

Build the main dashboard layout with:

- **Left sidebar** with all 26 modules listed (collapsible per module, showing their submenus)
- **Top navigation bar** with: platform logo, global search, notification bell, user avatar
- **Main content area** with breadcrumb trail
- Sidebar should highlight the active module and active submenu
- Mobile: sidebar collapses to icons-only or hamburger drawer
- Use shadcn `Sheet` for mobile sidebar

### Step 1.6 — Mock Data Layer

Create `lib/mock-data/` files with realistic fake data for:

- agents (20+ agents with names, statuses, stats)
- calls (50+ calls with sentiment, duration, outcomes)
- queues (5-8 queues with live stats)
- contacts (30+ CRM contacts with full fields)
- campaigns (5+ outbound campaigns)
- scripts, kb-articles, dispositions, dnc-records
- qa-scores, coaching-sessions, compliance-violations
- All other data domains needed per module

---

## 🔨 PHASE 2 — BUILD MODULES (in order)

Work through each module one at a time. For **each module**, follow this pattern:

1. Read the module spec below carefully
2. Create the module's page file
3. Create all sub-components in `components/mXX/`
4. Wire up with mock data
5. Ensure all field types are visually accurate (badge, gauge, timer, toggle, etc.)
6. **All buttons must be functional** — forms submit with toast feedback, modals open/close, actions show loading states

---

## 📐 MODULE SPECIFICATIONS

### M01 — Real-Time Operations Dashboard

**Route:** `/m01-realtime`

**Sections to build:**

#### 1.1 Live Operations Wall

- **Agent State Board** (1.1.1): Grid of agent cards showing:
  - Agent Name, Agent ID, Current Status (color-coded badge: Available=green, Busy=yellow, ACW=orange, Hold=blue, Break=gray, Training=purple, Offline=red), Time In State (auto-incrementing timer), Current Queue, Current Call ID (hyperlink), Live Sentiment (badge), Calls Handled Today, Today AHT, Supervisor Notes (editable input, max 500 chars)
- **Queue Monitoring Panel** (1.1.2): Cards per queue showing:
  - Queue Name, Calls Waiting (counter, red if > threshold), Longest Wait Time (timer), Agents Available (green/red), Agents Busy, Abandonment Rate %, SLA % (gauge), Overflow Destination (dropdown), Queue Priority (1-10)
- **Active Call Cards** (1.1.3): Per-call real-time cards:
  - Call ID, Customer Phone/ID (masked), Agent Assigned, Call Duration (rolling timer), Call Type (badge: Inbound/Outbound/Transfer/Callback), Queue Origin, Live Transcript Snippet (last 30s), Sentiment Score (0–100 thermometer), Sentiment Trend icon, Escalation Risk % (progress bar, alert > 70%), Hold Count (alert if > 3), Supervisor Actions (buttons: Monitor | Whisper | Barge | Takeover | End — each shows confirmation toast)

#### 1.2 Real-Time KPI Ticker Bar

- Horizontal scrolling ticker strip at top of screen
- Each KPI: name, live value, trend arrow, color-coded by threshold
- KPI Configuration panel (1.2.1): form with all 8 config fields — Save button triggers toast "KPI configuration saved"

#### 1.3 Supervisor Intervention Tools

- Monitor/Whisper/Barge/Takeover panel (1.3.1): call selection dropdown, intervention mode radio, whisper message input, notes textarea, outcome dropdown
- **Buttons:** Start Monitoring (green), Send Whisper (blue), Barge In (orange), Takeover (red) — each opens confirmation dialog then shows toast

#### 1.4 Wallboard & Display Manager

- Wallboard configuration form (1.4.1): name, layout picker (visual grid selector), queue assignment, KPI widgets, refresh rate, theme, ticker messages, public URL display, access PIN, active hours
- **Buttons:** Save Wallboard (toast), Preview (opens modal preview), Copy Public URL (clipboard toast), Delete (confirmation dialog)

#### 1.5 Real-Time Alerts & Notifications

- Alert Rules Engine (1.5.1): full form — metric dropdown, operator dropdown, threshold number input, severity radio, notification channel multiselect, recipients multiselect, cooldown slider, active toggle
- **Buttons:** Save Rule (toast), Test Alert (fires mock alert toast), Delete Rule (confirmation dialog)
- Alert list view: triggered alerts with severity badges, Acknowledge button, Dismiss button, View Details link

---

### M02 — AI Conversation Intelligence

**Route:** `/m02-conversation`

**Sections to build:**

#### 2.1 Transcription Management

- **Transcript Viewer** (2.1.1): Full-height panel with timestamped transcript, speaker labels toggle, word confidence highlighting, PII redaction toggle, keyword search with highlighting, annotation tool (text selection + note), export dropdown (PDF/DOCX/TXT/JSON/SRT), translation language dropdown
- **Buttons:** Export (format picker then download toast), Add Annotation (opens mini form, Save Annotation button), Toggle PII Redaction (shows warning dialog)
- **Bulk Transcript Search** (2.1.2): Boolean search input, date range picker, filters panel
- **Buttons:** Search (shows results table), Export Results (CSV download toast), Clear Filters

#### 2.2 NLP Insights Panel

- **Intent & Topic Classification** (2.2.1): Primary intent badge, secondary intents list, confidence score progress bar, topic cluster chips, competitor mention badge, product mentions chips
- **Named Entity Recognition** (2.2.2): Extracted entities table — entity type, value, PII flag badge
- **AI Call Summary** (2.2.3): Structured summary card with primary reason, key points, next steps (editable list)
- **Buttons:** Push to CRM (loading state → success toast), Edit Summary (toggles edit mode), Save Edits (toast), Copy Summary (clipboard toast)

#### 2.3 Conversation Analytics Library

- **Topic Trend Dashboard** (2.3.1): Bar chart of topic volumes, WoW trend badges, sentiment gauge per topic, date range and queue filters
- **Buttons:** Apply Filters (refreshes chart), Export Chart (PNG download toast)
- **Pattern Recognition** (2.3.2): Detected pattern cards with severity badges
- **Buttons:** Dismiss (removes card with toast), Acknowledge (status badge updates), Escalate (opens escalation dialog)

---

### M03 — Quality Assurance & Compliance

**Route:** `/m03-qa`

**Sections to build:**

#### 3.1 Scorecard Builder

- **Scorecard Configuration** (3.1.1): Full form — name, description, applies-to multiselect, queue assignment, evaluation mode radio (AI/Human/Hybrid), scoring method radio, passing score input, critical fail items, auto-assign coaching toggle+number, active status toggle, version display
- **Buttons:** Save Scorecard (toast), Duplicate (toast), Archive (confirmation dialog), Add Criteria (adds row to criteria builder)
- **Criteria Builder** (3.1.2): Repeatable criteria rows — criteria name, section/category, description, evaluation method dropdown, weight % (live sum validation, shows error if not 100%), AI detection method, keywords tag input, speaker target radio, timing requirement dropdown, critical fail toggle, coaching tip textarea
- **Buttons:** Add Criterion (adds new row), Remove Criterion (confirmation), Save All Criteria (toast with validation)

#### 3.2 QA Evaluation Queue

- **Evaluation Review Interface** (3.2.1): Side-by-side call player + evaluation form — AI score gauge, human override number input, section scores table, criteria checklist (pass/fail toggles per item), reviewer notes rich text, evaluation status badge
- **Buttons:** Submit Evaluation (validation → toast), Share with Agent (confirmation dialog → toast), Dispute Flag (opens dispute form), Save Draft (toast)

#### 3.3 Compliance Monitoring

- **Compliance Pack Config** (3.3.1): Enable/configure packs (TCPA/FDCPA/HIPAA/PCI-DSS/GDPR/CCPA) with enforcement mode radio, required disclosures tag input, forbidden phrases tag input, recipients multiselect, PII redaction toggle
- **Buttons:** Save Pack Config (toast), Test Detection (fires mock scan toast), Enable/Disable Pack (toggle with confirmation)
- **Violation Log** (3.3.2): Table — violation type badge, severity badge, transcript evidence quote, resolution status dropdown
- **Buttons:** Mark Resolved (status badge updates), Add Legal Hold (confirmation dialog), Export Log (CSV toast)

#### 3.4 Coaching Workflow

- **Coaching Session** (3.4.1): Session form — title, agent dropdown, coach dropdown, call examples attached, focus areas multiselect, scheduled date/time, duration dropdown, coaching notes textarea, outcome dropdown, improvement plan rich text, follow-up date picker
- **Buttons:** Schedule Session (confirmation → toast), Send to Agent (toast), Mark Complete (toast + badge update), Cancel Session (confirmation dialog)

---

### M04 — Revenue Intelligence Layer

**Route:** `/m04-revenue`

**Sections to build:**

#### 4.1 Revenue Intelligence Dashboard

- **Revenue KPI Overview** (4.1.1): 9 KPI cards — upsell opportunities, conversion rate, missed opportunities (red), churn risk calls (red), revenue at risk, retention saves, revenue saved, sales score avg, top agent
- All KPI cards have trend arrows and threshold color coding

#### 4.2 Upsell & Cross-Sell Intelligence

- **Opportunity Signal Config** (4.2.1): Signal builder — signal name, type dropdown, trigger phrases tag input, offer to recommend, strength threshold slider, active queues multiselect, real-time alert toggle, supervisor alert toggle, agent prompt textarea
- **Buttons:** Save Signal (toast), Test Signal (mock detection toast), Activate/Deactivate (toggle with toast)
- **Opportunity Tracker** (4.2.2): Table with outcome badges
- **Buttons:** Verify Outcome (opens outcome dropdown dialog), Export (CSV toast)

#### 4.3 Churn Prediction & Retention

- **Churn Risk Config** (4.3.1): churn vocabulary tag input, sentiment threshold slider, alert threshold slider, retention playbook dropdown, lookback window input, high-value weight slider
- **Buttons:** Save Configuration (toast)
- **Retention Playbook Manager** (4.3.2): Playbook cards — name, trigger condition, offer type, offer details rich text, authorization level, max offer number, success tracking, escalation path
- **Buttons:** Save Playbook (toast), Duplicate (toast), Delete (confirmation), Activate/Deactivate (toggle)

#### 4.4 Sales Call Scoring

- **Sales Scorecard** (4.4.1): Per-call scoring display — all 10 metric gauges/badges
- **Buttons:** Export Score (PDF toast), Override Score (opens override form with notes, Save Override button)

---

### M05 — Workforce Intelligence

**Route:** `/m05-workforce`

**Sections to build:**

#### 5.1 Agent Directory & Profiles

- **Agent Profile** (5.1.1): Full form — Agent ID (auto), Full Name, Employee ID, Email, Phone Extension, Department, Team/Supervisor, Site/Location, Employment Type, Start Date, Skills/Queues multiselect, Skill Proficiency (repeatable pairs), Languages Spoken, Status toggle, Profile Photo upload
- **Buttons:** Save Profile (toast), Reset Password (confirmation → toast), Deactivate Agent (confirmation dialog), Export Profile (PDF toast)

#### 5.2 Performance Analytics

- **Agent Performance Dashboard** (5.2.1): KPI dashboard with 15 metrics, period selector, 30-day trend chart
- **Buttons:** Export Report (PDF/CSV picker → toast), Set Benchmark (opens benchmark form dialog)

#### 5.3 Gamification Engine

- **Points & Rewards Config** (5.3.1): Achievement builder — name, trigger event, points, frequency cap, badge upload, announcement toggle, team challenge toggle
- **Buttons:** Save Achievement (toast), Preview Badge (modal), Delete (confirmation)
- **Leaderboard Config** (5.3.2): name, metric, period, scope, visibility toggles, top N input, reward text
- **Buttons:** Save Leaderboard (toast), Preview (modal), Publish to Wallboard (toast)

#### 5.4 Wellbeing & Burnout Engine

- **Burnout Risk Config** (5.4.1): Config form with all weight sliders, alert recipients, survey toggles
- **Buttons:** Save Config (toast)
- **Wellbeing Dashboard** (5.4.2): Per-agent burnout gauges, contributing factors, intervention log
- **Buttons:** Flag for Review (opens supervisor note dialog), Send Wellness Check (confirmation → toast), Add Intervention Note (mini form with Save button)

#### 5.5 WFM Analytics & Forecasting

- **Call Volume Forecasting** (5.5.1): Forecast period, granularity, queue selector, forecast charts, staffing gap display
- **Buttons:** Generate Forecast (loading state → chart renders), Export Forecast (Excel toast), Adjust Staffing (opens staffing dialog)

---

### M06 — Customer Experience & Journey

**Route:** `/m06-cx-journey`

**Sections to build:**

#### 6.1 Customer Journey Mapping

- **Customer Timeline View** (6.1.1): Search input → journey timeline visualization with channel/date/agent/outcome/sentiment per item, sentiment arc chart, CLV badge
- **Buttons:** Search (loads timeline), Export Journey (PDF toast), Create Follow-up Task (opens task form dialog)

#### 6.2 Voice of Customer Analytics

- **VoC Dashboard** (6.2.1): 10 metric displays — NPS gauge, CSAT gauge, effort score, sentiment distribution pie, theme word clouds, queue breakdown table
- **Buttons:** Apply Date Filter (refreshes dashboard), Export Report (PDF toast), Drill Down (opens detail modal per theme)

#### 6.3 Self-Service & Deflection Analytics

- **IVR Analytics** (6.3.1): 7 metrics — containment rate gauge, abandonment rate gauge, Sankey flow diagram, drop-off points list, deflection ROI
- **Buttons:** Filter by Date/Queue (refreshes data), Export Analytics (CSV toast)

---

### M07 — Reporting & BI Studio

**Route:** `/m07-reporting`

**Sections to build:**

#### 7.1 Dashboard Builder

- **Dashboard Config** (7.1.1): name, description, layout template visual picker, time range, auto-refresh, access level, roles, theme, filters bar, homepage toggle, embed code display
- **Buttons:** Save Dashboard (toast), Preview (modal), Publish (confirmation → toast), Delete (confirmation dialog), Copy Embed Code (clipboard toast)
- **Widget Library** (7.1.2): Drag-and-drop widget catalog — KPI Card, Line Chart, Bar Chart, Pie/Donut, Gauge, Heatmap, Table, Leaderboard, Sentiment Feed, Word Cloud etc. Each widget has configuration panel
- **Buttons per widget:** Add to Dashboard (toast), Configure (opens config panel), Remove (confirmation)

#### 7.2 Report Library & Builder

- **Report Config** (7.2.1): name, category, report type radio, data sources, columns drag-and-drop, metrics, filters builder rows, grouping, sorting, date range, export formats
- **Buttons:** Save Report (toast), Run Report (loading → results table), Export (format picker → download toast), Schedule (opens schedule form)
- **Scheduled Report Delivery** (7.2.2): schedule name, report selection, frequency, day/time, recipients, delivery channel, format, cover page toggle, subject line
- **Buttons:** Save Schedule (toast), Send Test (confirmation → toast), Activate/Pause (toggle with toast)

#### 7.3 AI Executive Briefing

- **Briefing Config** (7.3.1): briefing name, frequency, recipient roles, sections checklist, narrative tone, benchmark period, custom intro, export to PowerPoint toggle, delivery channel
- **Buttons:** Save Config (toast), Generate Preview (loading → preview modal), Send Now (confirmation → toast)

---

### M08 — AI Supervisor Copilot

**Route:** `/m08-supervisor-ai`

**Sections to build:**

#### 8.1 Copilot Chat Interface

- **Query Interface** (8.1.1): Chat-style UI — large chat input (max 500 chars), suggested query chips (clickable), AI response area (rich text + optional inline charts), source citations collapsible, follow-up chips, query history collapsible, thumbs up/down feedback
- **Buttons:** Send Query (loading state → AI response renders), Copy Answer (clipboard toast), Export Answer (format picker → toast), Clear History (confirmation dialog)
- Suggested chips: "Who needs help right now?" | "What is my SLA risk this hour?" | "Which agents are underperforming?" — all clickable and auto-submit

#### 8.2 Proactive Recommendations Feed

- **Recommendation Cards** (8.2.1): Type badge, priority badge, recommendation text, supporting mini-chart, action buttons
- **Buttons per card:** Accept (confirmation → toast + card dismissed), Dismiss (card removed), Snooze (time picker dialog → card snoozed toast)

#### 8.3 Shift Briefing Generator

- **Briefing Config** (8.3.1): trigger time picker, sections checklist, delivery method multiselect
- **Buttons:** Save Config (toast), Generate Now (loading → briefing renders below)
- **Daily Briefing View:** yesterday summary, risk forecast, agent watch list, open coaching, supervisor notes textarea
- **Buttons:** Add Supervisor Note (textarea + Save Note button → toast), Send Briefing (confirmation → toast), Export PDF (toast)

---

### M09 — Call Recording & Playback

**Route:** `/m09-recording`

**Sections to build:**

#### 9.1 Recording Library

- **Recording Search & Filter** (9.1.1): date range, agent/queue multiselects, duration min/max, call direction radio, sentiment filter, QA score slider, compliance flag checkbox, tag filter, keyword search, has AI summary dropdown, recording status dropdown
- **Buttons:** Search (results table renders), Clear Filters, Export Results (CSV toast)
- **Recording Detail & Playback** (9.1.2): Custom audio player — waveform SVG visualization, play/pause/rewind controls, speaker channel toggle, playback speed slider, skip silence toggle, sentiment overlay, hold segments, annotation pins
- **Buttons:** Play/Pause, Rewind 15s, Speed toggle, Download Recording (format picker → toast), Add Annotation (pin form → save toast), Toggle Speaker Channel

#### 9.2 Recording Retention & Lifecycle

- **Retention Policy Config** (9.2.1): policy name, applies-to multiselect, retention duration, auto-delete toggle, legal hold override, archive tier dropdown, archive after days, deletion audit log display
- **Buttons:** Save Policy (toast), Apply to Existing (confirmation dialog → progress toast), Delete Policy (confirmation with impact warning)

---

### M10 — Telephony Integration Hub

**Route:** `/m10-telephony`

**Sections to build:**

#### 10.1 Connector Management

- **Connector Config** (10.1.1): connector name, platform type dropdown (Cisco UCCE/Avaya/Asterisk/Amazon Connect/Genesys/Twilio/RingCentral etc.), environment radio, host/IP, port, protocol, username/API key, password/secret (masked), TLS toggle, certificate verification toggle, recording path, CDR polling interval, event stream topics, connection status badge
- **Buttons:** Test Connection (loading → Connected ✅ or Failed ❌ toast), Save Connector (toast), Delete (confirmation dialog), Reconnect (loading → toast)
- **CDR Field Mapping** (10.1.2): Mapping table — source field, target NEXUS field dropdown, data type conversion, default value, transform expression
- **Buttons:** Save Mapping (toast), Add Row, Remove Row, Test Mapping (mock parse toast)

#### 10.2 Connection Health & Monitoring

- **Health Dashboard** (10.2.1): Per-connector — status badge, uptime gauge, last heartbeat (alert if > 60s), events received, processing lag, error count, error log expandable
- **Buttons:** Reconnect (loading → toast), Download Diagnostic Report (PDF toast), Clear Error Log (confirmation → toast)

---

### M11 — Integrations & Ecosystem

**Route:** `/m11-integrations`

**Sections to build:**

#### 11.1 CRM Integration

- **CRM Connection** (11.1.1): platform dropdown, auth method radio, OAuth connect button, instance URL, sandbox mode toggle, contact lookup field, activity logging toggle, summary push toggle, churn flag push + field mapping, opportunity creation toggle + mapping, CLV field pull, sync frequency
- **Buttons:** Connect via OAuth (opens OAuth modal flow), Test Connection (loading → toast), Save Settings (toast), Disconnect (confirmation dialog)

#### 11.2 Webhook Management

- **Webhook Config** (11.2.1): name, endpoint URL (HTTPS validation), events multiselect, HTTP method radio, auth header input, payload format radio, retry policy, timeout, active toggle, delivery log table
- **Buttons:** Save Webhook (toast), Test Webhook (loading → response code toast), Delete (confirmation), Toggle Active (toast)

#### 11.3 API Keys & Developer Access

- **API Key Management** (11.3.1): key list table + creation form — key name, permissions scope, rate limit, allowed IPs, expiry date
- **Buttons:** Create Key (shows key value once in modal with Copy button), Revoke (confirmation dialog → toast), Copy Key (clipboard toast — only available immediately after creation)

---

### M12 — Administration & Settings

**Route:** `/m12-admin`

**Sections to build:**

#### 12.1 Tenant Configuration

- **General Settings** (12.1.1): org name, primary domain, timezone, date format, currency, business hours, default language, logo upload, brand color picker, subdomain, custom domain, data residency region
- **Buttons:** Save Settings (toast), Upload Logo (file picker → preview + toast), Reset to Defaults (confirmation dialog)

#### 12.2 User Management

- **User Account** (12.2.1): full name, email, role dropdown, team assignment, queue access multiselect, site assignment, notification preferences, MFA toggle, status toggle, last login display
- **Buttons:** Invite User (sends mock invite toast), Save Changes (toast), Reset Password (confirmation → toast), Deactivate (confirmation), Delete User (confirmation with warning)
- **Roles & Permissions Matrix** (12.2.2): Toggle grid — rows=roles, columns=17 permissions
- **Buttons:** Save Matrix (toast), Reset Role to Default (confirmation)

#### 12.3 SSO & Identity Provider

- **SSO Config** (12.3.1): protocol radio, IDP dropdown, entity ID, SSO URL, X.509 cert textarea, SP entity ID (auto + copy button), ACS URL (auto + copy), attribute mappings, SCIM URL (auto + copy), SCIM token (regenerate button), enforce SSO toggle
- **Buttons:** Test SSO (opens test flow modal), Save Config (toast), Copy URL/Token buttons (clipboard toast each), Regenerate SCIM Token (confirmation → toast)

#### 12.4 Billing & Subscription

- **Subscription Overview** (12.4.1): plan badge, seats counter, usage metrics table, renewal date, payment method masked
- **Buttons:** Update Payment Method (opens PCI-compliant form dialog), Upgrade Plan (opens plan comparison modal with Select Plan buttons), Download Invoice (per row — PDF toast)

#### 12.5 Audit Log

- **Audit Log Viewer** (12.5.1): date range, user filter, event category, severity filter, keyword search → results table with before/after JSON collapsible per row
- **Buttons:** Apply Filters, Export Audit Log (format picker → download toast), View Details (expands JSON diff)

---

### M13 — Agent Self-Service Portal

**Route:** `/m13-agent-portal`

**Sections to build:**

#### 13.1 My Performance Dashboard

- **Personal Stats** (13.1.1): 10 KPI items with period selector, 30-day trend chart, AI digest card, improvement tips
- **Buttons:** Change Period (refreshes data), Export My Stats (PDF toast)

#### 13.2 My Coaching & Feedback

- **Coaching Inbox** (13.2.1): filter tabs, session cards with focus areas, call examples, supervisor feedback, improvement plan
- **Buttons:** Acknowledge Session (checkbox + confirmation → status badge updates), Add Response Note (textarea + Submit Response button → toast), View Call Recording (opens recording player modal)

#### 13.3 My Gamification

- **My Achievements** (13.3.1): total points, streak display, badge grid, rank display, point events timeline, active challenges list
- **Buttons:** View Challenge Details (opens detail modal), Share Achievement (clipboard toast)

#### 13.4 My Schedule

- **Schedule View** (13.4.1): weekly/monthly calendar, today's shift details, break schedule, queue badges, adherence gauge
- **Buttons:** Request Time Off (opens form dialog — date range, reason, submit button → toast), Request Shift Swap (opens form dialog — date, peer dropdown, reason, submit → toast), View Schedule PDF (download toast)

---

### M14 — Security & Compliance Center

**Route:** `/m14-security`

**Sections to build:**

#### 14.1 Data Privacy Controls

- **Privacy Request Handling** (14.1.1): request type dropdown, data subject identifier, request source, received date, regulatory deadline (auto-calc), status dropdown, data scope display, action taken, completion evidence upload, rejection reason (conditional)
- **Buttons:** Submit Request (validation → toast), Update Status (toast), Upload Evidence (file picker → toast), Export Request PDF (toast)

#### 14.2 Security Settings

- **Access Security Policies** (14.2.1): MFA policy dropdown, allowed MFA methods multiselect, session timeout, concurrent sessions, IP allowlist toggle, IP ranges tag input, password rules fields, lockout config
- **Buttons:** Save Policy (toast), Test IP Restriction (opens test dialog)
- **Encryption & Data Protection** (14.2.2): Status badges panel — encryption at rest, in transit, KMS config, key rotation policy, PII redaction status
- **Buttons:** Rotate Keys Now (confirmation dialog with warning → progress toast), Update KMS Settings (save toast)

#### 14.3 Compliance Certifications

- **Certification Dashboard** (14.3.1): Grid of frameworks — SOC 2/PCI-DSS/HIPAA/GDPR/CCPA/ISO 27001/FedRAMP with status badges, dates, controls list
- **Buttons:** Download Certificate (PDF toast per framework), View Controls (expands controls list), Mark Review Complete (date updates + toast)

---

### M15 — CRM — Native Contact & Lead Management

**Route:** `/m15-crm`

**Sections to build:**

#### 15.1 Contacts Module

- **Contact Record** (15.1.1): Full contact form — Contact ID (auto), First Name*, Last Name*, Phone Primary* (E.164, duplicate check), Phone Alt, Mobile, Email Primary, Email Secondary, Company/Account (autocomplete lookup), Job Title, Address Line 1, City, State/Province, Country dropdown (ISO), Postal Code, Time Zone dropdown (IANA), Language Preference dropdown, Contact Source dropdown, Contact Status* dropdown (Active/Inactive/DNC/Deceased/Wrong Number/Churned/VIP), Owner/Assigned Agent dropdown, Tags tag-input (max 20), DNC Flag auto-toggle with override reason, Consent Status multiselect (Voice/SMS/Email Consent + Withdrawn) + Consent Date, CLV Score number, CLV Tier dropdown, Last Call Date (auto display), Last Call Outcome (auto display), Total Calls (counter), Custom Fields 1–20 (configurable)
- **Buttons:** Save Contact (validation → toast), Save & Add Another (toast + form reset), Delete Contact (confirmation dialog), Export Contact (PDF toast), Add to Campaign (campaign picker dialog → toast), Manual DNC Override (opens override reason dialog)
- **Interaction Timeline** (15.1.2): Timeline filter multiselect (All/Calls/Emails/SMS/Notes/Tasks/Deals), chronological entries with call cards (duration/agent/direction/outcome/recording link/sentiment/AI summary), manual note form (rich text textarea + Add Note button → toast), task cards, deal cards
- **Buttons:** Add Note (textarea + Submit Note → toast), Create Task (opens task mini form dialog), Link Deal (deal picker dialog)

#### 15.2 Accounts Module

- **Account Record** (15.2.1): Account ID (auto), Account Name* (duplicate check), Industry dropdown, Account Type dropdown, Account Status* dropdown, Website URL input, Annual Revenue currency, Employee Count number, Account Owner dropdown, Parent Account lookup, Primary Contact lookup, Linked Contacts list + Add button, Open Deals list, Custom Fields 1–10
- **Buttons:** Save Account (toast), Delete Account (confirmation), Merge Accounts (select duplicate → confirmation), Export Account (PDF toast), Add Contact (quick-add contact form dialog)

#### 15.3 Leads Module

- **Lead Record** (15.3.1): Lead ID (auto), Lead Name*, Phone* (E.164, dialer integration), Email, Lead Source* dropdown, Campaign dropdown, Lead Score (0–100 AI or manual), Lead Status* dropdown (New/Contacted/Qualified/Disqualified/Converted/Recycled), Assigned To dropdown, Call Attempts (auto counter), Last Attempt Date (auto), Best Time to Call (time range + days picker)
- **Buttons:** Save Lead (toast), Convert to Contact (confirmation → opens conversion modal, Confirm Convert button → toast), Add to Campaign (campaign picker → toast), Delete Lead (confirmation)

#### 15.4 Pipeline & Deals

- **Deal Record** (15.4.1): Deal Name*, Pipeline* dropdown, Stage* dropdown, Deal Value currency, Close Date picker, Probability % slider (AI suggested), Contact Linked* lookup, Account Linked lookup, Deal Owner* dropdown, Products/Services multiselect, Deal Source dropdown, AI Risk Score badge (auto), Lost Reason dropdown (conditional on Lost stage), Activity Log timeline
- **Buttons:** Save Deal (toast), Move Stage (drag or dropdown → stage badge updates + toast), Mark Won (confirmation → stage updates green), Mark Lost (opens lost reason dialog → toast), Delete Deal (confirmation), Export Deal (PDF toast)

#### 15.5 Pipeline Builder

- **Pipeline Config** (15.5.1): Pipeline Name*, Stages drag-and-drop list (each: name, order, probability default, color picker, Is Won toggle, Is Lost toggle), Default Pipeline toggle, Assigned Teams multiselect, Stage Automations (repeatable rules: stage → action dropdown → params), Rotation Method dropdown
- **Buttons:** Save Pipeline (toast), Add Stage (adds row), Remove Stage (confirmation), Preview Pipeline (visual Kanban preview modal), Set as Default (confirmation → toast)

#### 15.6 Tasks & Follow-Ups

- **Task Record** (15.6.1): Task Title*, Task Type* dropdown, Due Date/Time* picker, Assigned To* dropdown, Contact Linked lookup, Deal Linked lookup, Priority* dropdown, Status* dropdown, Reminder dropdown, Notes textarea, Completion Notes (conditional on Complete status)
- **Buttons:** Save Task (toast), Mark Complete (opens completion notes dialog → toast), Delete Task (confirmation), Reassign (agent picker dialog → toast)

---

### M16 — Agent Desktop — Unified Softphone Screen

**Route:** `/m16-agent-desktop`

> This is a full-screen agent workspace. Build as a single-page layout with persistent panels.

**Sections to build:**

#### 16.1 Softphone & Call Controls

- **Softphone Panel** (16.1.1): Softphone Status Bar dropdown (Available/Busy/ACW/Break/Training/Meeting/Offline), Incoming Call Alert modal (CLI/Queue/Wait time/Priority flag), Answer Button (green), Reject/Redirect button + destination dropdown, Dial Pad (numeric keypad), Active Call Timer (live mm:ss, red if > AHT threshold), Hold Button (toggle), Mute Button (toggle), Record Toggle, DTMF Pad, Transfer Button, Conference Button, End Call Button (red + confirm dialog), Voicemail Button
- **Buttons:** Answer (call session activates), Reject (redirect destination picker → toast), Hold/Resume toggle (MOH indicator), Mute/Unmute toggle, End Call (confirmation dialog → ACW panel opens)
- **Audio & Device Settings** (16.1.2): Microphone dropdown, Speaker dropdown, Ringtone device dropdown, Input/Output volume sliders, Echo Cancellation toggle, Noise Suppression toggle, Connection Type display, SIP Registration Status badge, Audio Quality signal bars
- **Buttons:** Save Audio Settings (toast), Test Microphone (plays test tone → toast), Test Speaker (plays test audio)

#### 16.2 CTI Screen Pop Panel

- **Incoming Caller Info Pop** (16.2.1): CLI/ANI display (large), CRM Match Status badge (Matched/Multiple/New/Unknown), Contact Name hyperlink, Account/Company display, Contact Status badge, CLV Tier badge, Last Interaction display, Open Tasks alert badge + list, Open Deals list, Queue Origin badge, Queue Wait Time display, Previous Call Count counter, Churn Risk gauge (if > 50%), Create New Contact Button (mini form pre-filled with phone)
- **Buttons:** Open Full CRM Record (navigates to M15 contact), Create New Contact (mini form dialog with Save Contact button → toast), View Open Tasks (expands task list)

#### 16.3 Live Script & Objection Handler

- **Active Script Panel** (16.3.1): Script auto-selection display, Script Name + Step Indicator (e.g. "Step 3 of 7"), Script Body rich text (with CRM token substitution), Agent Notes textarea (auto-saved), Next Step Button, Previous Step Button, Jump to Section dropdown, Branch/Conditional display, Objection Panel accordion, Outcome Selector dropdown/radio
- **Buttons:** Next Step (step indicator advances), Previous Step, Mark Outcome (selection → may trigger branch), Dismiss Objection Panel

#### 16.4 Knowledge Base Search Panel

- **In-Call KB Search** (16.4.1): Live search input (debounced 300ms), AI-Suggested Articles card list (auto, top 3), Search Results list, Article Preview expandable rich text, Category Filter dropdown
- **Buttons:** Search (results render), Copy Article to Notes (clipboard → toast), Thumbs Up/Down feedback (toast), Create KB Request (mini form dialog → toast)

#### 16.5 Real-Time Agent Assist Bar

- **Live AI Hint Panel** (16.5.1): Next Best Action alert card, Sentiment Alert colored banner, Compliance Reminder alert (timed), Upsell Prompt gold banner, Retention Prompt red banner, Dead Air Alert, Supervisor Message blue banner
- **Buttons:** Dismiss Hint (card removes with logged toast), Acknowledge Compliance (marks disclosed)

#### 16.6 After-Call Work (ACW) Panel

- **ACW / Disposition Screen** (16.6.1): ACW Timer display (countdown or count-up), Disposition Code* dropdown, Sub-Disposition dropdown (conditional), Call Notes textarea (pre-filled with AI summary), Callback Scheduled toggle + DateTime picker (conditional), Contact Update mini form (Status/Email/Alt Phone/Tags), Create Task mini form (Title/Due Date/Priority), Email Template Send dropdown + Send button, Manual ACW Extension request button
- **Buttons:** Submit & Ready (validation → changes state to Available + toast), Request Extension (confirmation → supervisor notified toast), Send Email Template (loading → sent toast)

---

### M17 — Outbound Dialer & Campaign Manager

**Route:** `/m17-dialer`

**Sections to build:**

#### 17.1 Campaign Builder

- **Campaign Config** (17.1.1): Campaign Name*, Campaign Type* dropdown (Predictive/Progressive/Preview/Power/Manual/Robocall/SMS/Email Drip), Campaign Status dropdown, Start/End DateTime, Call List dropdown/upload, Assigned Agents/Teams multiselect, Queue Assignment dropdown, Caller ID (ANI)* text input, CallerID Name, Max Dial Attempts* number, Retry Interval* number, Abandonment Rate Target slider (FTC: 3%), Max Ring Time* number, AMD toggle, AMD Action dropdown, Voicemail Drop file upload (conditional), Script Assignment dropdown, Disposition Set* dropdown, DNC Scrub toggle*, Timezone Dialing toggle*, Allowed Call Hours (time range + days per day), Max Calls Per Agent number (Predictive), Pacing Algorithm dropdown (Predictive)
- **Buttons:** Save Draft (toast), Launch Campaign (validation → confirmation dialog with compliance checklist → toast), Pause Campaign (confirmation → toast), Resume Campaign (toast), Duplicate Campaign (toast), Archive (confirmation)
- **Campaign Performance Dashboard** (17.1.2): KPI counters — Total Contacts, Dialed, Connected (+ %), AMD Detected, Abandoned (+ % — red if > 3%), Completed, Pending, DNC Skipped, Conversion Rate, Dial Rate live, Avg Connect Time, Avg Handle Time
- **Buttons:** Pause Campaign (auth required → confirmation), Resume Campaign, Export Results (format picker → download toast)

#### 17.2 Call List Management

- **Call List Config** (17.2.1): List Name*, List Source badge (auto), Total/Valid/DNC/Invalid/Duplicate counters, List Status badge, Assigned Campaigns list, Priority Field dropdown, Recycling Rule dropdown
- **Buttons:** Upload New List (file picker → import wizard in M19), Edit List (opens settings), Archive List (confirmation), Export List (CSV toast), Re-Scrub DNC (loading → results toast)

#### 17.3 Pacing & Agent Pool

- **Live Pacing Control** (17.3.1): Dialing Mode Override dropdown (supervisor auth), Dial Ratio Adjustment slider (0.5x–4.0x), Current Abandon Rate gauge (red if > 3%), Auto-Throttle toggle, Available Agents counter, Queue Depth counter
- **Buttons:** Apply Pacing Override (auth confirmation → toast), Enable/Disable Auto-Throttle (toggle with confirmation)

---

### M18 — Inbound Call Routing & IVR Builder

**Route:** `/m18-ivr`

**Sections to build:**

#### 18.1 IVR Flow Builder

- **IVR Node Config** (18.1.1): Visual drag-and-drop flow canvas — nodes represent IVR steps. Each node: Flow Name*, Entry DID/Extension*, Node Type* dropdown (Play Message/DTMF Menu/Speech Input/Queue Transfer/Extension Transfer/Callback Offer/Condition/Voicemail/HTTP Request/Hangup/Go To Node), Audio File upload or TTS Text textarea, TTS Voice dropdown, Language dropdown, DTMF Options (repeatable: Key→Destination pairs), Timeout seconds, Max Retries, Invalid Input Branch node reference, Default/Timeout Branch node reference, Variable Capture toggle + variable name, CRM Lookup toggle + field mapping, HTTP Request config (URL + method + params)
- **Buttons:** Add Node (type picker → node appears on canvas), Connect Nodes (drag connector), Delete Node (confirmation), Save Flow (toast), Test Flow (mock call simulation modal), Deploy to Asterisk (confirmation with impact warning → toast), Export Flow (JSON toast)

#### 18.2 Queue Configuration

- **Queue Settings** (18.2.1): Queue Name* (must match Asterisk queues.conf), Queue Display Name*, Queue Strategy* dropdown (ringall/leastrecent/fewestcalls/random/rrmemory/linear/wrandom), Max Queue Length*, Service Level Target* number, Queue Timeout* number, Agent Timeout* number, Retry Interval* number, Music on Hold Class dropdown, Announce Position toggle, Announce Hold Time toggle, Announce Frequency number, Periodic Announce file/TTS, Weight number, Wrapup Time number, Members multiselect + penalty per agent, Overflow Destination picker (IVR/Queue/External/Voicemail/Callback), Full Queue Destination picker, Recording Mode dropdown, Skill Tags multiselect
- **Buttons:** Save Queue (toast), Test Queue (mock call routing test toast), Delete Queue (confirmation with impact warning), Sync to Asterisk (loading → toast)

#### 18.3 Routing Rules

- **Skill-Based Routing** (18.3.1): Rule Name*, Trigger Condition* dropdown, Condition Value input (dynamic), Required Skill* dropdown, Min Proficiency Level dropdown, Priority* number, Fallback if No Match dropdown, Fallback Timeout number
- **Buttons:** Save Rule (toast), Test Rule (mock evaluation toast), Delete (confirmation), Reorder (drag priority)
- **Time-of-Day Routing** (18.3.2): Rule Name*, Applies To queue dropdown, Days Active multiselect, Start/End Time pickers, Holiday Calendar dropdown, In-Hours Destination, Out-of-Hours Destination
- **Buttons:** Save Rule (toast), Preview Schedule (calendar preview modal), Delete (confirmation)

#### 18.4 Callback Manager

- **Callback Config** (18.4.1): Callback Feature Enabled toggle, Offer After Wait seconds, Callback Announcement Script file/TTS, Confirm Callback Number toggle, Callback Priority dropdown, Max Callbacks Queued number, Agent Screen Pop toggle, Callback Expiry minutes
- **Buttons:** Save Config (toast), Test Callback Flow (mock simulation toast)

---

### M19 — Data Upload & Bulk Import Engine

**Route:** `/m19-data-upload`

**Sections to build:**

#### 19.1 File Upload Wizard

A 4-step wizard with step indicator and navigation buttons.

- **Step 1 — File Selection** (19.1.1): Upload Method radio (Drag&Drop/Browse/URL/SFTP/Google Sheets/API Push), file dropzone, File Preview grid (first 10 rows), Header Row Detection toggle, Header Row Number input, Encoding Detection dropdown, Delimiter dropdown (CSV), Total Rows Detected display, Columns Detected list, File Errors alert list
- **Buttons:** Upload File (activates file picker or DnD), Next Step (validates step 1 → proceeds), Cancel (confirmation dialog)
- **Step 2 — Field Mapping** (19.1.2): Source Column display, Target Field dropdown (per row — all CRM fields), Auto-Mapping Status badge per row (Auto-Matched/Suggested/Unmatched), Sample Values display, Data Format Override dropdown, Required Field Indicator, Custom Field Mapping dropdown, Constant Value input, Mapping Template Save button + name input, Mapping Template Load dropdown
- **Buttons:** Save Mapping Template (name input dialog → toast), Load Template (dropdown → auto-maps), Next Step, Back Step
- **Step 3 — Rules & Options** (19.1.3): Import Target radio (Contacts/Leads/Call List/Both), Deduplication Field dropdown, Duplicate Action radio, DNC Scrub toggle, National DNC Check toggle, Phone Validation toggle, Phone Normalization toggle, Assign to Agent/Team dropdown, Apply Tags tag-input, Set Status dropdown, Add to Campaign dropdown, Add to Call List dropdown, Consent Field Mapping dropdown, Consent Date Field dropdown
- **Buttons:** Next Step, Back Step
- **Step 4 — Validation Report & Import** (19.1.4): Pre-Import Summary panel (total/valid/duplicates/DNC removed/invalid/errors/ready), Error List downloadable grid (row#/column/error type/raw value), Error Download button, Import Now button (green, disabled until mapping complete), Import Progress bar, Import Result Summary panel, Rollback Import button (supervisor auth, available within 1 hour)
- **Buttons:** Download Error File (Excel toast), Import Now (confirmation for large files → progress bar → results panel), Rollback Import (auth + confirmation → toast)

#### 19.2 Import History & Management

- **Import Log** (19.2.1): Table — Import ID, Date, Imported By, File Name, Target badge, Status badge, Records Imported counter, Records Failed counter
- **Buttons per row:** Download Original File (toast), Download Error Report (toast), View Details (expands full config and results)

---

### M20 — Supervisor Agentic Role & Workflow Automation

**Route:** `/m20-supervisor-agent`

**Sections to build:**

#### 20.1 Agentic Action Center

- **Autonomous Action Config** (20.1.1): Action Name*, Action Type* dropdown (14 options: Auto-Assign QA/Auto-Trigger Coaching/Auto-Pause Agent/Auto-Adjust Queue Priority/Auto-Send Agent Nudge/Auto-Create Task/Auto-Escalate Call/Auto-Route Callback/Auto-Reallocate Agent/Send Alert/Auto-Update CRM Field/Generate Report/Auto-Schedule Callback/Auto-Flag for Legal Review), Trigger Event* dropdown (12 trigger options), Trigger Threshold* dynamic input, Require Human Approval* radio (Fully Autonomous/Notify + Wait/Notify Only), Approval Timeout dropdown + time, Approval Notify Channel multiselect, Notify Recipients multiselect, Cooldown Period dropdown, Active Hours time range + days, Enabled toggle, Priority/Order number
- **Buttons:** Save Action (toast), Test Action (mock trigger simulation toast), Enable/Disable (toggle with toast), Delete (confirmation), Reorder priority (drag)

#### 20.2 Agentic Decision Log

- **Decision History** (20.2.1): Table — Decision ID, Timestamp, Action Taken display, Trigger Event display, Target hyperlink, Approval Status badge, Approved By display, Outcome badge
- **Buttons per row:** View AI Reasoning (expandable text panel), Human Override (opens override reason dialog → toast + badge updates), Export Log (CSV toast)

#### 20.3 Escalation Chain Builder

- **Escalation Chain Config** (20.3.1): Chain Name*, Trigger Condition* dropdown, Step 1 Notify dropdown, Step 1 Channel multiselect, Step 1 Wait Time minutes, Step 2 Notify dropdown (optional), Step 2 Channel, Step 2 Wait Time, Step 3 Notify (optional), Auto-Resolve toggle, Max Active Escalations number
- **Buttons:** Save Chain (toast), Test Chain (mock escalation simulation → shows notification preview), Delete (confirmation), Activate/Deactivate (toggle with toast)

---

### M21 — Asterisk Integration Deep-Dive Configuration

**Route:** `/m21-asterisk`

**Sections to build:**

#### 21.1 Asterisk Connection Settings

- **AMI Configuration** (21.1.1): AMI Host* text input, AMI Port* number (default 5038), AMI Username*, AMI Secret/Password* (masked), AMI Permissions display (read/write perms info panel), AMI TLS toggle, Heartbeat Interval* number, Reconnect Attempts* number
- **Buttons:** Test AMI Connection (loading → Connected ✅ or Error message toast), Save AMI Config (toast), Copy Permissions Config (clipboard toast for manager.conf snippet)
- **ARI Configuration** (21.1.2): ARI Host* URL input, ARI Port* number (8088/8089), ARI Username*, ARI Password* (masked), ARI TLS Certificate file upload (conditional), WebSocket URL display (auto-constructed), Stasis App Name* (default: nexus_app)
- **Buttons:** Test ARI Connection (loading → HTTP + WebSocket test → toast), Save ARI Config (toast)

#### 21.2 PJSIP / SIP Trunk Configuration

- **SIP Trunk Settings** (21.2.1): Trunk Name*, Trunk Type* dropdown (SIP/PJSIP/DAHDI/IAX2), Registration Required toggle, SIP Server/Proxy*, SIP Username (conditional), SIP Password (conditional, masked), From Domain, Codecs Allowed multiselect + drag-order, DTMF Mode dropdown, Max Channels number, Outbound Caller ID, Transport dropdown (UDP/TCP/TLS/WS/WSS), NAT Settings dropdown, SIP Trace Logging toggle
- **Buttons:** Save Trunk (toast), Test Trunk (loading → REGISTER SIP test → toast), Delete (confirmation), Generate PJSIP Config Snippet (modal with copy button)

#### 21.3 WebRTC Gateway

- **WebRTC PJSIP Config** (21.3.1): WebRTC Transport name, WSS Bind Address, TLS Certificate File path, TLS Private Key File path, Agent Endpoint Template display (auto-generated, copy button), STUN Server URL, TURN Server URL, TURN Username, TURN Credential (masked), ICE Support toggle, DTLS SRTP toggle, Agent SIP Username Pattern, Registration Validity seconds
- **Buttons:** Save WebRTC Config (toast), Test WebRTC (loading → connection test toast), Copy Endpoint Template (clipboard toast with full pjsip.conf stanza), Regenerate Agent Endpoints (confirmation → toast)

#### 21.4 Dialplan & Context Mapping

- **Context Configuration** (21.4.1): Inbound Context Name*, IVR Application Bridge display (AGI path info), Queue Context*, AGI Script Path*, Originate Context*, Recording Save Path*, Recording Format dropdown, CDR Backend dropdown, Channel Variables tag input
- **Buttons:** Save Dialplan Config (toast), Verify Paths (loading → checks file system paths → toast), Copy Sample Dialplan (clipboard toast with extensions.conf snippet), Download Full Config Guide (PDF toast)

---

### M22 — Script & Knowledge Base Builder

**Route:** `/m22-scripts-kb`

**Sections to build:**

#### 22.1 Script Builder

- **Script Config** (22.1.1): Script Name*, Script Type* dropdown (Inbound: Support/Sales/Complaint | Outbound: Sales/Survey/Collections/Retention | After Hours/Callback Confirmation/Robocall), Language dropdown, Assignment Rules (multi-select rules: Queue/Campaign/Call Direction/Contact Tag/Contact Status/Time of Day/IVR Variable), CRM Token Support toggle, Auto-Scroll toggle, Steps ordered list (drag-drop)
- **Buttons:** Save Script (toast), Add Step (appends new step row), Preview Script (modal with mock CRM data rendering tokens), Duplicate Script (toast), Delete (confirmation), Publish/Unpublish (toggle with toast)
- **Script Step Builder** (22.1.2): Step Title*, Step Type* dropdown (Standard/Opening/Closing/Objection Handler/Branch Decision/Information Capture/Offer/Compliance Statement/Transfer Bridge/End), Script Body* rich text editor (supports {tokens}), Coaching Tip input, Branches repeatable (Label + Condition + Next Step), Mandatory Compliance Text highlighted input, Objections Panel Link multiselect, Required Capture Field dropdown, Audio Cue File upload
- **Buttons per step:** Save Step (toast), Add Branch (adds branch row), Remove Branch, Move Up/Down (reorders), Delete Step (confirmation)

#### 22.2 Knowledge Base

- **KB Article** (22.2.1): Article Title*, Category* dropdown (create new inline), Sub-Category dropdown, Article Body* rich text editor (headers/bold/tables/images/lists), Tags tag-input, Trigger Keywords tag-input (used for AI auto-suggest matching), Queues/Campaigns multiselect, Published Status toggle (Draft/Published/Archived), Expiry Date picker, Last Reviewed Date picker; Version (auto display), Helpful Rating (auto display), View Count (auto display)
- **Buttons:** Save Article (toast), Publish (toast + status badge updates), Archive (confirmation), Preview Article (modal as agent sees it), Delete (confirmation), Duplicate (toast)

---

### M23 — Robocall / Automated Voice Campaign Engine

**Route:** `/m23-robocall`

**Sections to build:**

#### 23.1 Robocall Campaign Builder

- **Robocall Campaign Config** (23.1.1): Campaign Name*, Message Delivery Type* radio (Pre-Recorded/TTS/Hybrid), Audio File upload (conditional), TTS Message Script textarea with {tokens} (conditional), TTS Voice dropdown (conditional), TTS Speed slider, Opt-Out Instruction toggle + text (TCPA required, default: "Press 9 to be removed"), Opt-Out DTMF Key dropdown (default: 9), Transfer to Agent toggle + DTMF Key, Transfer Destination dropdown (conditional), DTMF Survey Steps repeatable (message prompt + key mapping + next step), Message Repeat toggle + DTMF Key, AMD Action radio (Hang Up/Leave Pre-recorded/Leave TTS/Schedule Retry), Voicemail Message file/TTS (conditional), Call List* dropdown/upload, Dial Rate CPS number, Concurrent Call Limit* number, Allowed Call Hours time range + days, DNC Scrub toggle*, Consent Required toggle (conditional), Retry Attempts* number, Retry Interval hours*
- **Buttons:** Save Draft (toast), Preview Message (plays mock TTS in modal), Launch Campaign (validation checklist → confirmation → toast), Pause (confirmation → toast), Resume (toast), Export Results (CSV toast), Delete (confirmation)
- **Robocall Delivery Analytics** (23.1.2): Counters — Total Dialed, Delivered (%), Voicemail Left, No Answer, Busy, Opt-Outs (highlighted important), Agent Transfers, Full Listen Rate %, DNC Skipped, Error/Failed; DTMF Responses table (Key→Count breakdown)
- **Buttons:** Export Results (CSV toast), View Opt-Out List (modal with DNC entries)

---

### M24 — After-Call Work & Disposition Management

**Route:** `/m24-acw`

**Sections to build:**

#### 24.1 Disposition Code Manager

- **Disposition Config** (24.1.1): Disposition Code* (max 20 chars, unique), Disposition Label* (max 60 chars), Parent Disposition dropdown (None = top-level), Call Direction* multiselect (Inbound/Outbound/Both), Queue/Campaign multiselect (all if blank), Retry Rule* dropdown (Do Not Retry/Retry After Xhrs/Retry Today/Move to End/Remove), Retry After Hours number (conditional), DNC Action toggle, CRM Status Update dropdown, CRM Stage Update dropdown, Required Notes toggle, Required Fields multiselect, Next Call Priority Boost number (0–5), Color Code color picker, Active toggle
- **Buttons:** Save Disposition (toast), Add Child Disposition (creates sub-disposition), Delete (confirmation with orphan warning), Preview in Agent UI (modal showing how agent dropdown looks), Import Dispositions (CSV upload), Export Dispositions (CSV toast)

#### 24.2 ACW Timer Configuration

- **ACW Settings Per Queue** (24.2.1): Queue Reference* dropdown, ACW Mode* radio (No Limit/Fixed Time Limit/Countdown/Supervisor-Controlled), Max ACW Time seconds (conditional), ACW Warning seconds (conditional), Auto-Ready on Expire toggle, Extension Request Allowed toggle, Extension Duration seconds (conditional), Max Extensions Per Call number, ACW Skip toggle + minimum call seconds threshold
- **Buttons:** Save ACW Settings (toast), Apply to All Queues (confirmation → toast), Reset to Default (confirmation)

---

### M25 — DNC & Compliance List Management

**Route:** `/m25-dnc`

**Sections to build:**

#### 25.1 Internal DNC List

- **DNC Record Management** (25.1.1): Phone Number* (E.164), DNC Type* dropdown (Customer Request/Opt-Out Robocall/Legal/Regulatory/Deceased/Disconnected/Competitor/Internal Policy), Added Date (auto), Added By (auto display), Source Call Reference hyperlink (auto), Channels Suppressed* multiselect (Voice/SMS/Email/All), Expiry Date picker, Notes textarea (max 500), Override Authorization dropdown
- **Buttons:** Add to DNC (validation → toast), Import DNC List (CSV upload → progress toast), Export DNC List (CSV toast), Search (filter results table)
- **Per record buttons:** Edit (inline edit → Save Changes), Remove from DNC (auth + confirmation + required reason input → toast), View Source Call (opens call record)

#### 25.2 National DNC Registry Integration

- **Registry API Config** (25.2.1): Registry Provider* dropdown (FTC USA/ICO UK/ACMA Australia/CRTC Canada/Custom API), API Key/Credentials* (masked, stored encrypted), Auto-Scrub on Import toggle*, Auto-Scrub on Campaign Launch toggle*, Periodic Re-Scrub dropdown, Scrub Mode radio (Exact/Partial/Exact+Ported), Last Scrub Date display, Scrub Report display/download
- **Buttons:** Save Config (toast), Test API Connection (loading → toast), Run Manual Scrub Now (confirmation → progress → results summary toast), Download Last Scrub Report (CSV toast)

#### 25.3 Time-of-Day & State Compliance Rules

- **Calling Window Rules** (25.3.1): Rule Name*, Jurisdiction* dropdown (US Federal TCPA/US State: CA/TX/etc/EU GDPR/UK FCA/AU Spam Act/Custom), Applies To Call Type radio, Earliest Call Time* picker (TCPA default: 08:00), Latest Call Time* picker (TCPA default: 21:00), Allowed Days* multiselect, Holiday Restriction dropdown, Enforcement Action* radio (Block Call/Warn Agent/Warn+Log/Log Only), Timezone Source* dropdown, Timezone Fallback* dropdown
- **Buttons:** Save Rule (toast), Test Rule (enter sample contact timezone → shows if call would be allowed/blocked toast), Delete (confirmation), Preview Calendar (visual calendar showing allowed windows)

---

### M26 — Call Transfer, Conference & Warm Transfer

**Route:** `/m26-transfer`

> Note: This module's primary UI lives within M16 Agent Desktop. The M26 route provides configuration and a standalone reference view.

**Sections to build:**

#### 26.1 Transfer Panel

- **Transfer Config & Execution** (26.1.1): Transfer Type* radio (Blind/Warm/Attended/Supervised), Transfer Destination Search input (real-time search across agents/queues/extensions/external numbers), Destination Type radio (auto-populated from search result), Selected Destination display (name + availability status badge), Agent Availability Status badge (Available/On Call/Away/Offline — real-time), Pre-Transfer Notes textarea (max 500 chars, auto-populated with AI call summary), Consult/Warm Call button, Customer Hold Message dropdown (conditional on Warm transfer), Complete Transfer button, Cancel Transfer button, Transfer Outcome display (auto, post-transfer), Disposition After Transfer toggle (config)
- **Buttons:** Start Search (live results appear), Consult (puts customer on hold → dials destination → consult call active), Complete Transfer (green — connects customer to destination → call transferred), Cancel Transfer (red — drops consult, un-holds customer → toast), Blind Transfer (immediately transfers, no consult)

#### 26.2 Conference Bridge

- **Conference Session Management** (26.2.1): Add Participant search + Dial button, Conference Participants List (live — name/type/join time/mute status per participant), Mute Participant button per participant (auth), Remove Participant button per participant (auth + confirmation), Hold All button, Conference Recording toggle, Conference Mode display (config-driven: Standard/Listen Only/Coaching), Max Participants display (config), End Conference button (red + confirmation)
- **Buttons:** Add Participant (search → dial → participant joins list), Mute/Unmute per participant (badge updates), Remove Participant (confirmation → participant disconnected), Hold All (all participants held → toast), End Conference (confirmation → all legs disconnected → toast)
- **Conference Config** (admin): Max Participants number, Default Conference Mode dropdown
- **Buttons:** Save Config (toast)

---

## 🎨 DESIGN SYSTEM RULES

Follow these rules consistently across ALL 26 modules:

### Color System for Badges/Status

```
Available / Active / Healthy / Connected / Won    = green
Busy / Warning / Monitoring / In Progress         = yellow/amber
Critical / Offline / Disconnected / Lost / DNC   = red
Break / Training / Pending / Draft               = orange
ACW / Hold / Scheduled / Callback               = blue
Neutral / Unknown / Inactive / Archived         = gray
```

### Field Type → UI Component Mapping

```
Display Label        → <span> or <Badge>
Text Input           → shadcn <Input>
Textarea             → shadcn <Textarea>
Dropdown             → shadcn <Select>
Multi-Select         → shadcn <Command> with checkboxes
Radio Button         → shadcn <RadioGroup>
Toggle               → shadcn <Switch>
Checkbox             → shadcn <Checkbox>
Date Range Picker    → shadcn <Calendar> range mode
Number Input         → shadcn <Input type="number">
Slider               → shadcn <Slider>
Tag Input            → custom tag input (type + enter = chip)
Status Badge         → colored <Badge>
Counter              → large bold number
Timer                → live counter component (hh:mm:ss)
Gauge                → radial progress or custom SVG
Progress Bar         → shadcn <Progress>
Button Group         → multiple shadcn <Button> variants
Hyperlink            → <Link> with underline
File Upload          → shadcn <Input type="file"> styled
Color Picker         → HTML <input type="color"> + hex text input
Phone Input          → <Input> with E.164 auto-formatter
Currency Input       → <Input> with currency symbol prefix
Rich Text Editor     → simple textarea with toolbar (bold/italic/list)
Drag-Drop List       → @dnd-kit or simple up/down arrow buttons
Visual Flow Canvas   → simplified node grid (for IVR builder)
```

### KPI Card Structure

Every KPI card must have:

- Icon (Lucide)
- Label
- Value (large, bold)
- Trend indicator (↑↓ with %)
- Optional: color-coded border (green/yellow/red based on threshold)

### Tables

Use shadcn `Table` with:

- Sticky header
- Sortable columns (click header to sort)
- Row hover highlight
- Actions column (right-aligned dropdown or inline buttons)
- Empty state with icon + message
- Loading skeleton rows

### Forms — Mandatory Rules

- Group related fields with card sections or fieldset
- Show validation errors inline below fields (red text)
- Use `Label` for all form labels
- Required fields marked with red asterisk *
- Form submission: button shows loading spinner, then toast on success/error
- Confirmation dialogs: use shadcn `AlertDialog` for destructive actions
- All Save/Submit buttons must trigger at minimum a `sonner` toast notification
- All Delete/Destructive buttons must show `AlertDialog` confirmation before executing

### Button Behavior Standards

```
Save / Create    → loading state (spinner) → success toast "Saved successfully"
Delete           → AlertDialog confirm → loading → toast "Deleted"
Test / Connect   → loading state → toast with ✅ or ❌ result
Export / Download→ loading → file download triggers → toast "Export ready"
Copy to Clipboard→ instant toast "Copied to clipboard"
Toggle Active    → immediate badge update + toast "Enabled" / "Disabled"
Launch Campaign  → multi-step confirmation dialog → toast
```

---

## 📋 CODING STANDARDS

- **No TypeScript** — use plain JavaScript only
- Use `"use client"` directive only when needed (event handlers, state, browser APIs)
- Server components by default where possible
- All mock data in `lib/mock-data/` — never hardcode data inside components
- Component files: PascalCase (e.g. `AgentStateBoard.jsx`)
- Page files: `page.jsx` inside route folders
- No inline styles — use Tailwind classes only
- Keep components focused — split large pages into sub-components
- Add JSDoc comments for complex component props
- Use `sonner` toast for all button feedback
- Use shadcn `AlertDialog` for all confirmation dialogs

---

## 🚀 BUILD ORDER (Recommended)

```
Phase A — Foundation
1.  Project setup + folder structure + layout (sidebar with all 26 modules)
2.  Mock data layer (all domains)
3.  Shared components (KpiCard, StatusBadge, DataTable, ConfirmDialog, etc.)

Phase B — Core Operations (build these first, they set patterns)
4.  M01 — Real-Time Operations (most complex, sets the pattern)
5.  M16 — Agent Desktop (central agent workspace)
6.  M15 — CRM Native (used by many other modules)

Phase C — Call Center Engine
7.  M18 — Inbound IVR Builder
8.  M17 — Outbound Dialer
9.  M26 — Transfer & Conference
10. M24 — ACW & Dispositions
11. M25 — DNC Manager
12. M23 — Robocall Engine
13. M19 — Data Upload

Phase D — Intelligence & AI
14. M13 — Agent Portal
15. M02 — Conversation AI
16. M03 — QA Compliance
17. M04 — Revenue Intel
18. M08 — Supervisor AI Copilot
19. M20 — Supervisor Agentic

Phase E — Management & Config
20. M05 — Workforce Intel
21. M06 — CX Journey
22. M07 — Reporting BI
23. M09 — Recording & Playback
24. M22 — Scripts & KB
25. M21 — Asterisk Config
26. M10 — Telephony Hub
27. M11 — Integrations
28. M12 — Admin Settings
29. M14 — Security Center
```

---

## ✅ DONE CRITERIA PER MODULE

A module is "done" when:

- [ ] All menu sections are navigable (tabs or sidebar sub-items)
- [ ] All submenus render correct UI components
- [ ] All field types match the spec (badge ≠ text input, gauge ≠ progress bar)
- [ ] Mock data is wired up — no empty states on first load
- [ ] All forms have proper labels and validation feedback
- [ ] **All buttons are functional** — at minimum a toast notification fires
- [ ] **All destructive actions have confirmation dialogs**
- [ ] **All forms show loading state on submit**
- [ ] Responsive — works on 1280px+ desktop screens
- [ ] No console errors
- [ ] Sidebar shows this module as active when on its route

---

ccc## 🔔 IMPORTANT NOTES FOR CLAUDE CODE

1. **Read this entire file before writing any code.** The spec is the source of truth.
2. **When building a module**, go section by section in the order they appear in this file.
3. **Always use mock data** — never make real API calls. API endpoints in the spec are for reference only.
4. **If a component is complex** (e.g. waveform player, IVR flow canvas, drag-and-drop builder), build a simplified but visually accurate version.
5. **Reuse shared components** — build the `components/shared/` layer early and use it everywhere.
6. **The sidebar must always show all 26 modules** and navigate between them.
7. **Prioritize visual accuracy** over backend completeness. This is a frontend-only build.
8. **Every button must do something** — minimum: show a toast. Forms must submit with visual feedback.
9. **Confirmation dialogs are mandatory** for: Delete, Launch Campaign, Deploy to Asterisk, Disconnect integrations, Rollback Import, Override DNC, End Conference.
10. When you finish a module, briefly summarize what was built and confirm it matches the spec sections.

---

*This file is the single source of truth for the NEXUS AI frontend build (26 modules, M01–M26). Do not deviate from the module structure, field types, or tech stack without explicit instruction.*
