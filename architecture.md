# QRCore: Enterprise Ticket Management - Architecture

## 1. Database Schema (Entity-Relationship Diagram)

We will use a NoSQL document structure (MongoDB style), as it fits perfectly with the MERN stack.

**Collection: `Tickets`**

- `_id`: ObjectId (Primary Key, Auto-generated)
- `ticketId`: String (Unique, e.g., "TKT-1001" - used for the QR code payload)
- `title`: String (Required, sanitized)
- `description`: String (Required, sanitized)
- `priority`: String (Enum: "Low", "Medium", "High")
- `status`: String (Enum: "Open", "In Progress", "Resolved")
- `qrCodeUrl`: String (URL or Base64 string of the generated QR code)
- `createdBy`: String (Staff ID or Name)
- `createdAt`: Date (Timestamp)
- `updatedAt`: Date (Timestamp)

## 2. API Contracts

These are the endpoints the frontend will eventually communicate with.

### A. Create Ticket & Generate QR

- **Endpoint:** `POST /api/v1/tickets`
- **Request Body:**

  ```json
  {
    "title": "Network Router Down",
    "description": "Main floor router needs reboot.",
    "priority": "High",
    "createdBy": "Staff-042"
  }
  ```

- **Response (201 Created):** `Returns the complete ticket object including the newly generated qrCodeUrl.`

### B. Fetch All Tickets

- **Endpoint:** `GET /api/v1/tickets`

- **Query Params:** `?status=Open&limit=20 (For handling empty states and large lists gracefully)`

- **Response (200 OK):** `Returns an array of ticket objects.`

### C. Fetch Single Ticket

- **Endpoint:** `GET /api/v1/tickets/:ticketId`

- **Response (200 OK):** `Returns the specific ticket object.`
