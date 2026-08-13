# Employees Management Frontend

A modern employee management dashboard built with Next.js and TypeScript. It consumes the Laravel Employees API and provides a responsive interface for browsing and managing employee records.

## Features

- Responsive employee dashboard
- Employee table with key employment information
- Live search by full name or email
- Employee status filtering
- Sorting by newest record, highest salary, or lowest salary
- Create employee form
- Update employees from a modal interface
- Employee detail pages
- Soft-delete actions
- Client-side form validation
- Success and error toast notifications
- Optimized remote employee images
- Responsive Tailwind CSS interface with accessible focus states

## Tech Stack

- Next.js 16 with the App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- React Hook Form
- Zod
- `@hookform/resolvers`
- `nextjs-toast-notify`
- `@deemlol/next-icons`
- Next.js Image Optimization
- ESLint 9

## Project Structure

```text
app/
├── create-employee/           Create employee page
├── employee-details/[id]/     Dynamic employee details page
├── globals.css                Global visual system
├── layout.tsx                 Root application layout
└── page.tsx                   Dashboard page

components/
├── dashboard/                 Search, table, and row actions
├── form/                      Reusable employee form controls
├── Dashboard.tsx
├── EmployeeDetails.tsx
├── Modal.tsx
└── Navbar.tsx

services/employee-service.tsx  Laravel API integration
validators/employee-schema.ts  Zod validation schema
constants/                     Filter and sorting options
enums/                         Employee UI enums
types/                         Shared TypeScript declarations
```

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- The Laravel backend running locally or on a reachable server

### Installation

From the repository root:

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8000/api/employees
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint checks |

## Application Routes

| Route | Description |
| --- | --- |
| `/` | Employee dashboard with search, filters, sorting, and actions |
| `/create-employee` | Create a new employee |
| `/employee-details/[id]` | View a single employee's details |

## Form Validation

Employee forms are managed with React Hook Form and validated with Zod. The client validates:

- Full name length
- Email format
- Numeric salary
- Valid hire date
- Employee status
- Valid photo URL

The Laravel API performs server-side validation as the final source of truth.

## API Integration

The frontend reads the API base URL from:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8000/api/employees
```

The service layer provides functions for listing, searching, creating, updating, viewing, and deleting employees. API responses use a shared generic TypeScript response type.

## Production Build

```bash
npm run build
npm run start
```

Remote images are currently configured for `images.unsplash.com`. Add any additional production image hosts to `next.config.ts` before deployment.

## Backend

The Laravel API lives in the repository root. See the [backend README](../README.md) for endpoints, data fields, database setup, and backend commands.

## License

This project is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT).
