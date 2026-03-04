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

The platform has **14 modules (M01–M14)**, each with multiple menu sections, submenus, and detailed field-level specifications. Every field has a defined type, data type, validation rules, and API endpoint reference.

---

## 🗂️ MODULE OVERVIEW

| ID  | Module Name                    | Description                                                             | Menu Items |
| --- | ------------------------------ | ----------------------------------------------------------------------- | ---------- |
| M01 | Real-Time Operations Dashboard | Live monitoring, queue mgmt, supervisor command center, live sentiment  | 12         |
| M02 | AI Conversation Intelligence   | Transcription, NLU, summarization, topic/intent/entity extraction       | 10         |
| M03 | Quality Assurance & Compliance | Automated scorecards, compliance packs, coaching workflows, QA reports  | 11         |
| M04 | Revenue Intelligence Layer     | Churn prediction, upsell signals, CLV tracking, sales analytics         | 10         |
| M05 | Workforce Intelligence         | Agent profiles, gamification, wellbeing engine, WFM forecasting         | 12         |
| M06 | Customer Experience & Journey  | Journey mapping, VoC analytics, self-service & deflection analytics     | 9          |
| M07 | Reporting & BI Studio          | Dashboard builder, report library, scheduled distribution, executive AI | 10         |
| M08 | AI Supervisor Copilot          | Real-time assist, coaching AI, NL query, shift briefings, alerts        | 8          |
| M09 | Call Recording & Playback      | Recording library, search & filter, playback controls, compliance flags | 9          |
| M10 | Telephony Integration Hub      | PBX connectors, SIP config, CDR mapping, real-time event streams        | 8          |
| M11 | Integrations & Ecosystem       | CRM sync, collaboration tools, data warehouse, webhook management       | 10         |
| M12 | Administration & Settings      | Tenant config, user mgmt, roles, billing, audit, white-label            | 14         |
| M13 | Agent Self-Service Portal      | Agent dashboard, performance, coaching inbox, gamification, schedule    | 9          |
| M14 | Security & Compliance Center   | Access logs, data governance, privacy controls, DLP, certifications     | 8          |

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
│   ├── layout.jsx                  ← Main dashboard layout with sidebar
│   ├── page.jsx                    ← Redirect to M01
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
│   └── m14-security/page.jsx
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
├── m01/ ... (module-specific components)
├── m02/
├── m03/
... and so on for each module
lib/
├── mock-data/
│   ├── agents.js
│   ├── calls.js
│   ├── queues.js
│   └── ... (one file per data domain)
├── utils.js
└── constants.js
```

### Step 1.5 — Global Layout & Sidebar

Build the main dashboard layout with:

- **Left sidebar** with all 14 modules listed (collapsible per module, showing their submenus)
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

  - Call ID, Customer Phone/ID (masked), Agent Assigned, Call Duration (rolling timer), Call Type (badge: Inbound/Outbound/Transfer/Callback), Queue Origin, Live Transcript Snippet (last 30s, updates every 2s), Sentiment Score (0–100 thermometer), Sentiment Trend (Rising/Stable/Falling/Critical icon), Escalation Risk % (progress bar, alert > 70%), Hold Count (alert if > 3), Supervisor Actions (buttons: Monitor | Whisper | Barge | Takeover | End)

#### 1.2 Real-Time KPI Ticker Bar

- Horizontal scrolling ticker strip at top of screen
- Each KPI: name, live value, trend arrow, color-coded by threshold
- KPI Configuration panel (1.2.1): form with all 8 config fields

#### 1.3 Supervisor Intervention Tools

- Monitor/Whisper/Barge/Takeover panel (1.3.1) with all 8 fields
- Call selection dropdown, intervention mode radio, whisper message input, notes textarea, outcome dropdown

#### 1.4 Wallboard & Display Manager

- Wallboard configuration form (1.4.1): name, layout picker (visual grid selector), queue assignment, KPI widgets, refresh rate, theme, ticker messages, public URL display, access PIN, active hours

#### 1.5 Real-Time Alerts & Notifications

- Alert Rules Engine (1.5.1): full form for defining alert rules (all 12 fields)
- Alert list view showing triggered alerts with severity badges

---

### M02 — AI Conversation Intelligence

**Route:** `/m02-conversation`

**Sections to build:**

#### 2.1 Transcription Management

- **Transcript Viewer** (2.1.1): Full-height panel with timestamped transcript, speaker labels toggle (Agent/Customer), word confidence highlighting (yellow for low confidence), PII redaction toggle (role-controlled), keyword search with highlighting, annotation/highlight tool (text selection + note), export dropdown (PDF/DOCX/TXT/JSON/SRT), translation language dropdown, audio-text sync (click word → jump player)
- **Bulk Transcript Search** (2.1.2): Full-featured search interface with:

  - Boolean search input (AND/OR/NOT), date range picker, agent/queue/sentiment/outcome filters, min duration input, speaker filter (Both/Agent Only/Customer Only), results list with match context snippets highlighted, export results button

#### 2.2 NLP Insights Panel

- **Intent & Topic Classification** (2.2.1): Display primary intent badge, secondary intents list, confidence score progress bar, topic cluster chips, RFC text, call outcome badge, follow-up flag, follow-up action text, competitor mention badge, product mentions chips
- **Named Entity Recognition** (2.2.2): Extracted entities table: Customer Name, Account/Order Numbers, Dates & Times, Monetary Amounts, Locations, Email/URL (PII flagged), Sentiment Per Entity (entity + sentiment pairs table)
- **AI Call Summary** (2.2.3): Structured summary card: primary reason, agent actions, resolution status badge, key points bullet list, sentiment summary, next steps (editable list), Push to CRM button, edit history collapsible, template used display

#### 2.3 Conversation Analytics Library

- **Topic Trend Dashboard** (2.3.1): Bar chart of topic volumes, WoW trend badges, sentiment gauge per topic, top agents ranked list, sample calls links, emerging topic flags, date range and queue filters
- **Pattern Recognition & Anomalies** (2.3.2): Table/card list of detected patterns with: pattern name, type badge (Repeat Contact/Dead Air/Transfer Loop etc.), affected call count, affected agents list, first detected date, severity badge, recommended action text, Dismiss/Acknowledge/Escalate buttons

---

### M03 — Quality Assurance & Compliance

**Route:** `/m03-qa`

**Sections to build:**

#### 3.1 Scorecard Builder

- **Scorecard Configuration** (3.1.1): Full form with all 11 fields — name, description, applies-to multiselect, queue assignment, evaluation mode (AI/Human/Hybrid radio), scoring method radio, passing score input, critical fail items, auto-assign coaching toggle+number, active status toggle, version display
- **Criteria Builder** (3.1.2): Repeatable criteria form with all 11 fields — criteria name, section/category, description, evaluation method (Yes/No/1-5/1-10 etc.), weight % (must sum to 100 warning), AI detection method, keywords/phrases tag input, speaker target radio, timing requirement dropdown, critical fail toggle, coaching tip textarea

#### 3.2 QA Evaluation Queue

- **Evaluation Review Interface** (3.2.1): Side-by-side view with call player + evaluation form showing: call record link, AI score gauge, human override number input, section scores table, criteria checklist (toggle pass/fail per criteria), reviewer notes rich text, call clips tagged (timestamp list), evaluation status badge, coaching triggered badge, share with agent button, dispute flag button

#### 3.3 Compliance Monitoring

- **Compliance Pack Configuration** (3.3.1): Enable/configure packs (TCPA/FDCPA/HIPAA/PCI-DSS/GDPR/CCPA etc.) with enforcement mode radio, required disclosures tag input, forbidden phrases tag input, recipients multiselect, PII redaction toggle, audit frequency dropdown
- **Compliance Violation Log** (3.3.2): Table of violations with: violation ID, call reference link, violation type badge, severity badge (Low/Medium/High/Critical), detection timestamp, transcript evidence quote block (highlighted), agent involved link, resolution status dropdown, remediation notes textarea, legal hold flag toggle

#### 3.4 Coaching Workflow

- **Coaching Session Management** (3.4.1): Session creation form + session list view with all 13 fields — session title, agent dropdown, coach dropdown, trigger source badge (auto), call examples attached, focus areas multiselect, scheduled date/time, duration dropdown, coaching notes (pre, hidden from agent), session outcome dropdown, improvement plan rich text, follow-up date picker, agent acknowledgment checkbox

---

### M04 — Revenue Intelligence Layer

**Route:** `/m04-revenue`

**Sections to build:**

#### 4.1 Revenue Intelligence Dashboard

- **Revenue KPI Overview** (4.1.1): 9 KPI cards — upsell opportunities counter, upsell conversion rate gauge, missed opportunities counter (red alert), churn risk calls counter (red), estimated revenue at risk (currency), retention saves counter (green), revenue saved estimate, sales call score avg gauge, top revenue agent display

#### 4.2 Upsell & Cross-Sell Intelligence

- **Opportunity Signal Configuration** (4.2.1): Signal builder form with all 9 fields — signal name, signal type dropdown, trigger phrases tag input, offer to recommend, strength threshold slider, active queues multiselect, real-time alert toggle, supervisor alert toggle, agent prompt text textarea
- **Opportunity Tracker** (4.2.2): Table of detected opportunities with all 9 columns — opportunity ID, call reference link, signal triggered badge, detection timestamp, offer made? badge, customer response badge (Accepted/Declined/Considering), estimated deal value currency, CRM deal created badge, outcome verified toggle

#### 4.3 Churn Prediction & Retention

- **Churn Risk Configuration** (4.3.1): Form with 6 fields — churn vocabulary tag input, sentiment threshold slider, alert threshold slider (default 70%), retention playbook dropdown, lookback window number input, high-value weight slider
- **Retention Playbook Manager** (4.3.2): Playbook cards with all 8 fields — playbook name, trigger condition dropdown, offer type dropdown, offer details rich text, authorization level dropdown, max offer per customer number, success tracking dropdown, escalation path dropdown

#### 4.4 Sales Call Scoring

- **Sales Scorecard** (4.4.1): Per-call scoring display with all 10 metrics — opening score, discovery score, value proposition score, objection handling score, close attempt boolean badge, talk-to-listen ratio gauge, question ratio percentage, competitor mention badge, outcome dropdown, total sales score composite gauge

---

### M05 — Workforce Intelligence

**Route:** `/m05-workforce`

**Sections to build:**

#### 5.1 Agent Directory & Profiles

- **Agent Profile** (5.1.1): Full agent record form with all 15 fields — Agent ID (auto), Full Name, Employee ID, Email, Phone Extension, Department, Team/Supervisor, Site/Location, Employment Type, Start Date, Skills/Queues multiselect, Skill Proficiency Level (repeatable queue+level pairs), Languages Spoken, Status toggle, Profile Photo upload

#### 5.2 Performance Analytics

- **Agent Performance Dashboard** (5.2.1): KPI dashboard with 15 metrics — period selector, total calls handled, AHT (with benchmark), avg talk time, avg hold time, ACW, FCR %, transfer rate %, escalation rate %, CSAT predicted gauge, QA score avg gauge, compliance score %, occupancy rate %, attendance rate %, 30-day trend chart (line chart with all KPIs togglable)

#### 5.3 Gamification Engine

- **Points & Rewards Configuration** (5.3.1): Achievement builder with 7 fields — achievement name, trigger event dropdown, points awarded number, frequency cap dropdown, badge unlocked dropdown/upload, announcement toggle, team challenge eligible toggle
- **Leaderboard Configuration** (5.3.2): Leaderboard form with 9 fields — leaderboard name, metric dropdown, period dropdown, scope dropdown, visible to agents toggle, display on wallboard toggle, show rank only toggle, top N number, reward text input

#### 5.4 Wellbeing & Burnout Engine

- **Burnout Risk Configuration** (5.4.1): Config form with 11 fields — master toggle, score threshold slider, lookback window, AHT variance weight slider, attendance decline weight slider, QA decline weight slider, sentiment delivery weight slider, ACW spike weight slider, alert recipients multiselect, agent pulse survey toggle, survey frequency dropdown
- **Wellbeing Dashboard** (5.4.2): Team wellbeing view with per-agent: burnout score gauge (0=Healthy, 100=Critical), risk level badge, burnout trend arrow, contributing factors ranked list, days since last PTO counter, recommended action text, supervisor intervention log, pulse survey results chart

#### 5.5 WFM Analytics & Forecasting

- **Call Volume Forecasting** (5.5.1): Forecast view with 10 fields — forecast period dropdown, granularity dropdown, queue selector, forecasted volume (line chart + table with confidence intervals), forecasted AHT line chart, recommended FTEs per interval, staffing gap delta (green=overstaffed/red=understaffed), external variables checkboxes, historical accuracy MAPE %, export button

---

### M06 — Customer Experience & Journey

**Route:** `/m06-cx-journey`

**Sections to build:**

#### 6.1 Customer Journey Mapping

- **Customer Timeline View** (6.1.1): Customer search → full journey view with 11 fields — search input (phone/email/CRM ID), linked CRM record, total interactions counter, first/last contact dates, channels used badge list, repeat contact flag, journey timeline visualization (chronological with channel/date/agent/outcome/sentiment per item), journey sentiment arc line chart, unresolved issues alert list, CLV tier badge (Platinum/Gold/Silver/Bronze)

#### 6.2 Voice of Customer Analytics

- **VoC Dashboard** (6.2.1): 10 metric displays — period selector, top positive themes (word cloud or ranked list), top negative themes (word cloud with alert for growing), predicted NPS gauge (-100 to +100 with confidence interval), NPS trend line, predicted CSAT gauge, effort score gauge (1-7 scale), sentiment distribution pie chart, product feedback signals list, queue breakdown table

#### 6.3 Self-Service & Deflection Analytics

- **IVR Analytics** (6.3.1): 7 metrics — containment rate gauge (target 60-80%), abandonment rate gauge (alert > 10%), menu path analysis (Sankey diagram or simplified flow), high drop-off points ranked list, self-service opportunity topics ranked list, deflection ROI currency, IVR satisfaction signal gauge

---

### M07 — Reporting & BI Studio

**Route:** `/m07-reporting`

**Sections to build:**

#### 7.1 Dashboard Builder

- **Dashboard Configuration** (7.1.1): Dashboard creation form with 11 fields — name, description, layout template (visual grid picker: 1-Col/2-Col/3-Col/4-Col/Masonry/Custom), default time range, auto-refresh interval, access level multiselect, assigned roles, theme/color scheme, filters bar multiselect, homepage toggle, embed code display (auto)
- **Widget Library** (7.1.2): Widget type catalog with all widget types available — KPI Card, Line Chart, Bar Chart, Pie/Donut, Gauge, Heatmap, Scatter, Table, Leaderboard, Sentiment Feed, Live Call Feed, Map, Funnel, Sankey, Word Cloud, Number Ticker, Alert Log. Each widget has: data source dropdown, metric/measure, dimension/grouping, time aggregation, filters, comparison period toggle, conditional formatting rules, widget title, drill-down target

#### 7.2 Report Library & Builder

- **Report Configuration** (7.2.1): Report builder form with 11 fields — name, category dropdown, report type radio, data sources multiselect, columns/dimensions drag-and-drop, metrics/measures multiselect, filters builder (field|operator|value rows), grouping/subtotals multiselect, sorting dropdown, date range default, export formats multiselect
- **Scheduled Report Delivery** (7.2.2): Schedule form with 11 fields — schedule name, report selection, frequency dropdown, day/time of delivery, internal recipients multiselect, external email tag input, delivery channel multiselect (Email/Slack/Teams/SFTP/S3), format dropdown, cover page toggle, custom subject line, active toggle

#### 7.3 AI Executive Briefing

- **Briefing Configuration** (7.3.1): Briefing setup form with 9 fields — briefing name, frequency, recipient roles multiselect, sections to include checklist (Performance Summary/Key Wins/Top Risks/Churn Alerts etc.), narrative tone dropdown, benchmark period dropdown, custom intro textarea, export to PowerPoint toggle, delivery channel multiselect

---

### M08 — AI Supervisor Copilot

**Route:** `/m08-supervisor-ai`

**Sections to build:**

#### 8.1 Copilot Chat Interface

- **Query Interface** (8.1.1): Chat-style interface with:
  - Large chat input (max 500 chars), suggested query chips (clickable: 'Who needs help right now?' | 'What is my SLA risk this hour?' etc.), AI response area (rich text + optional inline charts), source citations (collapsible links), follow-up suggestion chips, query history collapsible (last 30 days), thumbs up/down feedback buttons, export answer button (Copy/Email/Add to Report)

#### 8.2 Proactive Recommendations Feed

- **Recommendation Cards** (8.2.1): Feed of AI-generated recommendation cards each with:
  - Type badge (Staffing/Coaching/Queue Management/Escalation Risk/Revenue Opportunity etc.), priority badge (Low/Medium/High/Urgent), recommendation text, supporting data (mini chart or list), suggested action buttons (contextual), accept/dismiss/snooze buttons, timestamp, outcome tracking badge

#### 8.3 Shift Briefing Generator

- **Briefing Configuration** (8.3.1): Config form with 8 fields — trigger time picker, sections checklist, delivery method multiselect
- **Daily Briefing View**: Auto-generated briefing display with: yesterday summary AI text, today's risk forecast AI text, agent watch list (agents needing attention), open coaching sessions list, custom supervisor notes textarea

---

### M09 — Call Recording & Playback

**Route:** `/m09-recording`

**Sections to build:**

#### 9.1 Recording Library

- **Recording Search & Filter** (9.1.1): Advanced filter panel with 13 fields — date range picker, agent/queue multiselects, duration min/max number inputs, call direction radio, sentiment filter multiselect, QA score range slider, compliance flag checkbox, tag filter multiselect, keyword in transcript text search, has AI summary dropdown, recording status dropdown. Results shown as filterable table.
- **Recording Detail & Playback** (9.1.2): Full playback interface with:

  - Custom audio player (waveform visualization, SVG, color-coded by speaker channel), play/pause/rewind 15s controls, speaker channel toggle (Combined/Agent Only/Customer Only), playback speed slider (0.5x to 2x), skip silence toggle, timestamp jump (click timeline), sentiment overlay (color gradient on waveform), hold segments (gray shading), annotation pins on timeline (click to view note, add new pin), download recording button (MP3/WAV/PCI-safe)

#### 9.2 Recording Retention & Lifecycle

- **Retention Policy Configuration** (9.2.1): Policy form with 8 fields — policy name, applies to multiselect, retention duration (number + unit dropdown), auto-delete toggle (requires confirmation), legal hold override (locked on), archive tier dropdown (Hot/Warm/Cold/Archive), archive after days number, deletion audit log display (always on, immutable)

---

### M10 — Telephony Integration Hub

**Route:** `/m10-telephony`

**Sections to build:**

#### 10.1 Connector Management

- **Connector Configuration** (10.1.1): Connector setup form with 15 fields — connector name, platform type dropdown (Cisco UCCE/Avaya/Asterisk/Amazon Connect/Genesys/Twilio/RingCentral etc.), environment radio, host/IP, port, protocol dropdown, username/API key (masked input), password/secret (never shown after save), TLS toggle, certificate verification toggle, recording access path, CDR polling interval, event stream topics multiselect, test connection button (returns Connected ✅ / Failed ❌), connection status badge
- **CDR Field Mapping** (10.1.2): Mapping table with rows for: source field name, target NEXUS field dropdown, data type conversion dropdown, default value input, transform expression code input, validation rule input

#### 10.2 Connection Health & Monitoring

- **Health Dashboard** (10.2.1): Per-connector health view with 10 metrics — connector name, status badge, uptime % gauge, last heartbeat timestamp (alert if > 60s), events received (24h), event processing lag (alert > 5s), error count (24h), recent error log (last 20 errors, expandable), reconnect button, diagnostic report download button

---

### M11 — Integrations & Ecosystem

**Route:** `/m11-integrations`

**Sections to build:**

#### 11.1 CRM Integration

- **CRM Connection Setup** (11.1.1): CRM config form with 12 fields — CRM platform dropdown (Salesforce/HubSpot/Dynamics/Zoho/Zendesk etc.), auth method radio, OAuth connect button, CRM instance URL, sandbox mode toggle, contact lookup field dropdown, activity logging toggle, summary push toggle, churn flag push toggle + field mapping, opportunity creation toggle + object mapping, CLV field pull toggle + field name, sync frequency dropdown

#### 11.2 Webhook Management

- **Webhook Configuration** (11.2.1): Webhook form with 11 fields — webhook name, endpoint URL (HTTPS only), events to send multiselect (call.started/call.ended/qa.score.complete/compliance.violation etc.), HTTP method radio, auth header input (encrypted), payload format radio, retry policy dropdown, timeout number, active toggle, test webhook button (shows response code), delivery log (status/timestamp/response code/latency)

#### 11.3 API Keys & Developer Access

- **API Key Management** (11.3.1): API key table + creation form with 9 fields — key name, permissions scope multiselect, rate limit dropdown, allowed IPs tag input (CIDR), expiry date picker, API key value (shown once at creation, copy immediately), created date, last used, revoke button (requires confirmation)

---

### M12 — Administration & Settings

**Route:** `/m12-admin`

**Sections to build:**

#### 12.1 Tenant Configuration

- **General Settings** (12.1.1): Org settings form with 12 fields — organization name, primary domain, time zone dropdown (IANA), date format, currency (ISO4217), business hours (time range + days), default language, tenant logo upload (PNG/SVG, min 200x200px), brand primary color (color picker with hex input), subdomain text input, custom domain input (Enterprise), data residency region dropdown (US East/US West/EU/APAC/UK)

#### 12.2 User Management

- **User Account** (12.2.1): User form with 11 fields + user list table — full name, email, role dropdown (Super Admin/Tenant Admin/Manager/Supervisor/QA Analyst/Agent/Read Only/Custom), team assignment, queue access multiselect, site assignment, notification preferences checklist, MFA required toggle, status toggle, last login display, invite/reset password button
- **Roles & Permissions Matrix** (12.2.2): Matrix table where rows = roles, columns = permissions (17 permission toggles) — View Live Dashboard, Monitor Calls, Whisper/Barge/Takeover, View Recordings, Download Recordings, View Transcripts, View Unredacted PII, Run QA Evaluations, Manage Scorecards, View Agent Performance, Manage Agents, View Revenue Intel, Manage Integrations, Access Billing, Manage Users, Export Data. Toggle grid with role names as rows.

#### 12.3 SSO & Identity Provider

- **SSO Configuration** (12.3.1): SAML/OIDC config form with 14 fields — protocol radio (SAML 2.0/OpenID Connect), identity provider dropdown, IDP entity ID/issuer, IDP SSO URL, X.509 certificate textarea/upload, NEXUS SP entity ID (auto, copy button), NEXUS ACS URL (auto, copy button), attribute mapping email, attribute mapping name, attribute mapping role, SCIM provisioning URL (auto, copy), SCIM bearer token (display/regenerate), enforce SSO toggle, test SSO button

#### 12.4 Billing & Subscription

- **Subscription Overview** (12.4.1): Billing page with 10 items — current plan badge (Starter/Professional/Enterprise), active seats counter, monthly usage metrics table (API calls/Storage/Transcription hours/Seats used vs limits), renewal date, plan price, payment method (masked), update payment button (PCI-compliant form), upgrade plan button (plan comparison modal), download invoice buttons, invoice history table

#### 12.5 Audit Log

- **Audit Log Viewer** (12.5.1): Searchable audit log with 11 fields — date range filter, user filter, event category multiselect, severity filter, keyword search, event timestamp (UTC + tenant tz), actor display (name+email+IP), action description, affected resource hyperlink, before/after state JSON collapsible, export audit log button (CSV/PDF/JSON)

---

### M13 — Agent Self-Service Portal

**Route:** `/m13-agent-portal`

**Sections to build:**

#### 13.1 My Performance Dashboard

- **Personal Stats Overview** (13.1.1): Agent's own KPI view with 10 items — period selector, total calls today, My AHT (with team benchmark), My FCR rate gauge, My QA Score gauge (color vs passing score), My CSAT predicted gauge, compliance score gauge, 30-day performance trend line chart, daily performance digest AI text card, top 3 improvement tips bullet list

#### 13.2 My Coaching & Feedback

- **Coaching Inbox** (13.2.1): Agent's coaching inbox with filter tabs (All/Pending/Scheduled/Completed/Action Required) and per-session: session title, supervisor/coach name, focus areas chips, call examples hyperlinks (opens recording + transcript), supervisor feedback (read-only rich text), improvement plan display, agent acknowledgment checkbox (required to close), agent response notes textarea, session date display

#### 13.3 My Gamification

- **My Achievements** (13.3.1): Gamification hub with 9 items — total points counter (large), points this month counter, current streak display (e.g. '🔥 7-day QA streak'), badges earned (visual badge grid with icon/name/date), badges locked/next targets (grayed grid with progress bars), My Rank in team (e.g. 🥈 #2 of 15), My Rank company-wide, recent point events timeline, active challenges card list (name/contribution/deadline)

#### 13.4 My Schedule

- **Schedule View** (13.4.1): Agent schedule with 7 items — weekly/monthly calendar view (today highlighted, shifts color-coded by queue), today's shift details (start/end/breaks), break schedule list, queue assignment badges, schedule adherence gauge (%), time off request form + list (date range/reason/status), shift swap request form (date/peer/reason)

---

### M14 — Security & Compliance Center

**Route:** `/m14-security`

**Sections to build:**

#### 14.1 Data Privacy Controls

- **Privacy Request Handling** (14.1.1): Privacy request form + tracker with 10 fields — request type dropdown (Right to Access SAR/Erasure/Portability/Rectification/Opt-Out), data subject identifier input, request source dropdown, received date picker, regulatory deadline display (auto-calc: GDPR 30 days, CCPA 45 days), status dropdown, data scope display (AI auto-discovery), action taken display, completion evidence upload, rejection reason textarea (conditional)

#### 14.2 Security Settings

- **Access Security Policies** (14.2.1): Security policy form with 11 fields — MFA policy dropdown (Disabled/Optional/Required for Admins/Required for All), allowed MFA methods multiselect (TOTP/SMS/Email/FIDO2), session timeout number, concurrent sessions number, IP allowlist toggle, allowed IP ranges tag input (CIDR), password min length, password complexity multiselect, password expiry days, failed login lockout number (default 5), lockout duration minutes
- **Encryption & Data Protection Status** (14.2.2): Status display panel with 8 items — encryption at rest status badge (AES-256), encryption in transit badge (TLS 1.3), KMS key type display, customer KMS key ARN input (BYOK), key rotation policy dropdown, last key rotation date (alert if overdue), PII redaction status badge, audit log integrity badge

#### 14.3 Compliance Certifications

- **Certification Status Dashboard** (14.3.1): Grid of compliance frameworks with 7 fields per — framework name (SOC 2/PCI-DSS/HIPAA/GDPR/CCPA/ISO 27001/FedRAMP), status badge (Certified/In Progress/Planned/N/A), last audit date, next review date (alert 60 days prior), certificate download button, controls implemented expandable list (with last-tested dates), open findings counter (red if any critical)

---

## 🎨 DESIGN SYSTEM RULES

Follow these rules consistently across ALL modules:

### Color System for Badges/Status

```
Available / Active / Healthy / Connected = green
Busy / Warning / Monitoring = yellow/amber  
Critical / Offline / Disconnected / Danger = red
Break / Training / Pending = orange
ACW / Hold / In Progress = blue
Neutral / Unknown / Inactive = gray
```

### Field Type → UI Component Mapping

```
Display Label        → <span> or <Badge>
Text Input           → shadcn <Input>
Textarea             → shadcn <Textarea>
Dropdown             → shadcn <Select>
Multi-Select         → shadcn <Command> with checkboxes or multi-select component
Radio Button         → shadcn <RadioGroup>
Toggle               → shadcn <Switch>
Checkbox             → shadcn <Checkbox>
Date Range Picker    → shadcn <Calendar> range mode
Number Input         → shadcn <Input type="number">
Slider               → shadcn <Slider>
Tag Input            → custom tag input (type + enter = creates chip)
Status Badge         → colored <Badge>
Counter              → large bold number
Timer                → live counter component (hh:mm:ss)
Gauge                → radial progress or custom SVG
Progress Bar         → shadcn <Progress>
Button Group         → multiple shadcn <Button> variants
Hyperlink            → <Link> with underline
File Upload          → shadcn <Input type="file"> styled
Color Picker         → HTML <input type="color"> + hex text input
```

### KPI Card Structure

Every KPI card should have:

- Icon (Lucide)
- Label
- Value (large, bold)
- Trend indicator (↑↓ with %)
- Optional: color-coded border (green/yellow/red based on threshold)

### Tables

Use shadcn `Table` component with:

- Sticky header
- Sortable columns (click to sort)
- Row hover highlight
- Actions column (right-aligned with dropdown or buttons)
- Empty state with icon + message
- Loading skeleton rows

### Forms

- Group related fields with `<fieldset>` or card sections
- Show validation errors inline below fields
- Use `Label` from shadcn for all form labels
- Required fields marked with red asterisk
- Form submission shows loading state on button

---

## 📋 CODING STANDARDS

- **No TypeScript** — use plain JavaScript only
- **No `any` workarounds** — just clean JavaScript
- Use `"use client"` directive only when needed (event handlers, state, browser APIs)
- Server components by default where possible
- All mock data in `lib/mock-data/` — never hardcode data inside components
- Component files: PascalCase (e.g. `AgentStateBoard.jsx`)
- Page files: `page.jsx` inside route folders
- No inline styles — use Tailwind classes only
- Keep components focused — split large pages into multiple sub-components
- Add JSDoc comments for complex component props

---

## 🚀 BUILD ORDER (Recommended)

1. ✅ Project setup + folder structure + layout
2. ✅ Mock data layer
3. ✅ Shared components (KpiCard, StatusBadge, DataTable, etc.)
4. 🔨 M01 — Real-Time Operations (most complex, sets the pattern)
5. 🔨 M13 — Agent Portal (simpler, good for validation)
6. 🔨 M02 — Conversation AI
7. 🔨 M03 — QA Compliance
8. 🔨 M04 — Revenue Intel
9. 🔨 M05 — Workforce Intel
10. 🔨 M06 — CX Journey
11. 🔨 M07 — Reporting BI
12. 🔨 M08 — Supervisor AI Copilot
13. 🔨 M09 — Recording & Playback
14. 🔨 M12 — Admin Settings
15. 🔨 M14 — Security Center
16. 🔨 M10 — Telephony Hub
17. 🔨 M11 — Integrations

---

## ✅ DONE CRITERIA PER MODULE

A module is "done" when:

- [ ] All menu sections are navigable (tabs or sidebar sub-items)
- [ ] All submenus render correct UI components
- [ ] All field types match the spec (badge ≠ text input, gauge ≠ progress bar)
- [ ] Mock data is wired up — no empty states on first load (except where logically empty)
- [ ] All forms have proper labels and validation feedback
- [ ] Responsive — works on 1280px+ desktop screens at minimum
- [ ] No console errors
- [ ] All action buttons are present (even if they just show a toast for now)

---

## 🔔 IMPORTANT NOTES FOR CLAUDE CODE

1. **Read this entire file before writing any code.** The spec is the source of truth.
2. **When building a module**, go section by section in the order they appear in this file.
3. **Always use mock data** — never make real API calls. The API endpoints in the spec are for reference only.
4. **If a component is complex** (e.g. waveform player, Sankey diagram, drag-and-drop dashboard builder), build a simplified but visually accurate version using available libraries.
5. **Reuse shared components** — build the `components/shared/` layer early and use it everywhere.
6. **The sidebar must always show all 14 modules** and navigate between them. Do not skip sidebar integration for any module.
7. **Prioritize visual accuracy** over backend completeness. This is a frontend-only build.
8. When you finish a module, briefly summarize what was built and confirm it matches the spec sections listed.

---

*This file is the single source of truth for the NEXUS AI frontend build. Do not deviate from the module structure, field types, or tech stack without explicit instruction.*
