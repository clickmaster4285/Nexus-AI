# PBX-CRM Backend
## FreePBX / Asterisk ↔ Node.js CRM Integration

---

## Project Structure

```
pbx-crm-backend/
│
├── server.js                       ← Entry point — run this
├── .env.example                    ← Copy to .env and fill in your values
├── package.json
│
├── config/
│   └── database.js                 ← MongoDB connection
│
├── services/
│   └── asteriskService.js          ← AMI connection + all call event handling
│
├── models/
│   ├── CallLog.js                  ← MongoDB schema for call records
│   └── Contact.js                  ← MongoDB schema for CRM contacts
│
├── controllers/
│   ├── callController.js           ← Logic for call log API endpoints
│   └── contactController.js        ← Logic for contacts API endpoints
│
├── routes/
│   ├── calls.js                    ← URL → controller mappings for /api/calls
│   └── contacts.js                 ← URL → controller mappings for /api/contacts
│
├── middleware/
│   └── errorHandler.js             ← Global error handler
│
└── utils/
    └── frontendSocketExample.js    ← Example code for your frontend
```

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your FreePBX IP, AMI credentials, and MongoDB URI
```

### 3. Enable AMI on FreePBX
SSH into your FreePBX server:
```bash
nano /etc/asterisk/manager.conf
```
Add:
```ini
[general]
enabled = yes
port = 5038
bindaddr = 0.0.0.0

[crmuser]
secret = yourSecretPassword
deny = 0.0.0.0/0.0.0.0
permit = 192.168.1.0/255.255.255.0
read = all
write = all
```
Then reload:
```bash
asterisk -rx "manager reload"
```

### 4. Start the server
```bash
# Development (auto-restart on file changes)
npm run dev

# Production
npm start
```

---

## API Reference

### Calls

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/calls | List call logs (paginated) |
| GET | /api/calls/stats | Dashboard statistics |
| GET | /api/calls/:id | Get single call log |
| PUT | /api/calls/:id/notes | Add notes to a call |
| POST | /api/calls/originate | Click-to-Call |

### Contacts

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/contacts | List/search contacts |
| POST | /api/contacts | Create contact |
| GET | /api/contacts/:id | Get contact + call history |
| PUT | /api/contacts/:id | Update contact |
| DELETE | /api/contacts/:id | Delete contact |

### Health

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/health | Server health check |

---

## Socket.io Events (Real-time)

| Event | Direction | Payload |
|-------|-----------|---------|
| `incoming-call` | Server → Browser | `{ uniqueId, callerNumber, dialledExt, contact, timestamp }` |
| `call-ended` | Server → Browser | `{ uniqueId, callLogId, disposition, duration }` |
| `join-extension` | Browser → Server | `"101"` (agent's extension) |

---

## How Each Feature Works

### 1. Popup on Incoming Call
1. Phone rings → Asterisk fires `Newchannel` AMI event
2. Backend receives event → looks up caller in Contacts collection
3. Backend emits `incoming-call` via Socket.io to all connected browsers
4. Frontend shows popup with contact info (or "Unknown Caller")

### 2. Auto Call Logging
1. Call ends → Asterisk fires `Hangup` AMI event
2. Backend creates a `CallLog` record in MongoDB
3. Backend emits `call-ended` to browsers so popup closes

### 3. Click-to-Call
1. Agent clicks "Call" button in CRM frontend
2. Frontend POSTs to `/api/calls/originate`
3. Backend sends `Originate` action to Asterisk via AMI
4. Asterisk rings the agent's phone → agent picks up → Asterisk dials customer

### 4. Recording Links
1. FreePBX starts recording → sets `MIXMONITOR_FILENAME` channel variable
2. Asterisk fires `VarSet` AMI event with the file path
3. Backend updates the `CallLog` with a public URL to the recording
4. Frontend can stream/download the recording via `/recordings/<filename>`
