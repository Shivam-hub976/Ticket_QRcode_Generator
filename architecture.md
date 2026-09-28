# QRCore: Enterprise Ticket Management — Architecture & API Specifications

## 1. System Overview

**QRCore** is a lightweight, responsive digital ticket management tool designed to eliminate manual paper systems and Excel-based workflows for operational floor staff.

It provides instant QR code payload generation, strict XSS input sanitization, and graceful failure handling for unreliable 3G network environments.

---

## 2. Database Schema (MongoDB / NoSQL Model)

**Collection Name:** `Tickets`

| Field Name    | Type       | Constraints                             | Description                                                 |
| ------------- | ---------- | --------------------------------------- | ----------------------------------------------------------- |
| `_id`         | `ObjectId` | Primary Key, Auto-generated             | Internal database reference                                 |
| `ticketId`    | `String`   | Unique, Required                        | Business key (e.g., `TKT-6416`) encoded into the QR payload |
| `title`       | `String`   | Required, Sanitized                     | Brief summary of the floor issue                            |
| `description` | `String`   | Required, Sanitized                     | Complete details of the operational issue                   |
| `priority`    | `String`   | Enum: `Low`, `Medium`, `High`           | Escalation level for floor staff                            |
| `status`      | `String`   | Enum: `Open`, `In Progress`, `Resolved` | Operational state of the ticket                             |
| `createdBy`   | `String`   | Required, Sanitized                     | Staff ID or badge number of reporter                        |
| `createdAt`   | `Date`     | Auto-generated                          | Timestamp when the ticket was created                       |
| `updatedAt`   | `Date`     | Auto-generated                          | Timestamp when the ticket was last updated                  |

---

## 3. API Contracts

### A. Create Ticket & Generate QR Payload

**Endpoint:** `POST /api/v1/tickets`

**Headers:**

```http
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "Main Floor Router Down",
  "description": "Primary router on Section B is offline after power surge.",
  "priority": "High",
  "createdBy": "Staff-1194"
}
```

**Success Response — 201 Created:**

```json
{
  "success": true,
  "data": {
    "_id": "66f7d1b2e4b0a1c2d3e4f5a6",
    "ticketId": "TKT-6416",
    "title": "Main Floor Router Down",
    "description": "Primary router on Section B is offline after power surge.",
    "priority": "High",
    "status": "Open",
    "createdBy": "Staff-1194",
    "createdAt": "2026-09-28T10:30:00.000Z",
    "updatedAt": "2026-09-28T10:30:00.000Z"
  }
}
```

---

### B. Fetch All Tickets with Pagination & Filtering

**Endpoint:** `GET /api/v1/tickets`

**Query Parameters:**

```text
?status=Open&limit=20&page=1
```

**Success Response — 200 OK:**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "66f7d1b2e4b0a1c2d3e4f5a6",
      "ticketId": "TKT-6416",
      "title": "Main Floor Router Down",
      "description": "Primary router on Section B is offline after power surge.",
      "priority": "High",
      "status": "Open",
      "createdBy": "Staff-1194",
      "createdAt": "2026-09-28T10:30:00.000Z"
    }
  ]
}
```

---

### C. Fetch Single Ticket by ID

**Endpoint:** `GET /api/v1/tickets/:ticketId`

**Success Response — 200 OK:**

```json
{
  "success": true,
  "data": {
    "_id": "66f7d1b2e4b0a1c2d3e4f5a6",
    "ticketId": "TKT-6416",
    "title": "Main Floor Router Down",
    "description": "Primary router on Section B is offline after power surge.",
    "priority": "High",
    "status": "Open",
    "createdBy": "Staff-1194",
    "createdAt": "2026-09-28T10:30:00.000Z"
  }
}
```
