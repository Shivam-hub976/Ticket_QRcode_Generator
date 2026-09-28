<div align="center">

# 🎫 QRCore — Enterprise Ticket Management System

**Digital Ticket QR Code Generator for Floor Operations**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-5.0.2-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-0052CC?style=for-the-badge)](#)

[Live Demo Deployment](https://ticket-q-rcode-generator.vercel.app) • [Architecture Docs](./architecture.md) • [Prompt Log](./Prompts.md)

</div>

---

## Executive Overview

**QRCore** is a lightweight digital ticket management system designed to replace manual paper workflows and fragmented Excel spreadsheets used by operational floor staff. Built using a strict Test-Driven Development (TDD) methodology, the application enables staff to instantly generate tickets, automatically encode data into scannable SVG QR codes, and reliably operate in environments with poor network connectivity.

---

## Key Capabilities

- **Instant QR Payload Generation:** Converts ticket data into unique business IDs (e.g., `TKT-6416`) and instantly renders resolution-independent SVG QR codes for hardware scanners.
- **Resilience & Edge-Case Handling:** Simulates 3G network latency with asynchronous accessible loading states (`role="status"`) and provides clear visual feedback (`No data found`) during empty states.
- **Enterprise Security (XSS):** Intercepts all text inputs using `DOMPurify` to sanitize malicious scripts before state submission.
- **Accessibility:** Features semantic HTML, ARIA labeling, high-contrast monochromatic UI, and inline SVG favicons.

---

## Tech Stack & Dependencies

| Category           | Technology               | Purpose                                             |
| :----------------- | :----------------------- | :-------------------------------------------------- |
| **Core Framework** | React 18 & Vite          | Component-based UI and high-speed build tooling     |
| **Styling**        | Tailwind CSS v4          | Utility-first monochromatic corporate design system |
| **Testing**        | Vitest & Testing Library | Fast unit testing and DOM assertion frameworks      |
| **Utilities**      | `qrcode.react`           | Vector-based SVG QR code rendering                  |
| **Security**       | `dompurify`              | Client-side XSS input sanitization                  |

---

## 📂 Project Structure

```text
qrcore-enterprise/
├── architecture.md          # Database Schema (ERD) & API Specifications
├── PROMPTS.md               # Prompt Traceability & AI Workflow Log
├── README.md                # System Overview
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── TicketForm.jsx       # Input, validation, XSS sanitization
    │   │   ├── TicketForm.test.jsx  # Form validation TDD tests
    │   │   ├── TicketList.jsx       # QR generation, empty/loading states
    │   │   └── TicketList.test.jsx  # Edge-case TDD tests
    │   ├── App.jsx                  # Main state & latency simulation
    │   ├── index.css                # Tailwind @theme configuration
    │   ├── main.jsx                 # Application entry point
    │   └── setupTests.js            # Vitest DOM assertions configuration
    ├── index.html                   # HTML entry point with inline SVG favicon
    └── package.json                 # Project scripts & dependencies
```

---

## Quality Assurance & Scripts

QRCore enforces code quality via Vitest unit tests and ESLint. Run these commands in the `/client` directory:

- **`npm run test`** — Executes the complete Vitest test suite.
- **`npm run lint`** — Scans for unused variables, missing imports, and code quality issues.
- **`npm run build`** — Compiles the optimized, production-ready application bundle.

---
