# Employees Management API

A RESTful employee management API built with Laravel. It provides a clean backend for creating, browsing, searching, updating, and soft-deleting employee records. A Next.js client is included in the [`frontend`](./frontend) directory.

## Features

- Create and validate employee records
- List all active employee records
- Retrieve a single employee by ID
- Update existing employee information
- Soft-delete employees without permanently removing their data
- Retrieve records including soft-deleted employees
- Search employees by full name or email
- Filter employees by status
- Sort employees by creation date or salary
- Consistent JSON response structure
- Service-layer architecture to keep controllers focused

## Tech Stack

- PHP 8.3+
- Laravel 13
- Laravel Eloquent ORM
- Laravel Form Requests
- PHP enums for employee statuses
- Laravel Sanctum
- PHPUnit 12
- Laravel Pint
- SQLite by default, with support for other Laravel-compatible databases

## Project Structure

```text
app/
├── Enums/EmployeeStatusEnum.php
├── Helpers/ResponseHelper.php
├── Http/
│   ├── Controllers/EmployeeController.php
│   └── Requests/EmployeeRequest.php
├── Models/Employee.php
└── Services/EmployeeService.php

database/migrations/       Database schema
routes/api.php             Employee API routes
frontend/                  Next.js web client
```

## Employee Data Model

| Field | Type | Description |
| --- | --- | --- |
| `id` | Integer | Auto-generated identifier |
| `full_name` | String | Employee's full name |
| `email` | String | Unique email address |
| `salary` | Number | Employee salary |
| `hire_date` | Date | Employment start date |
| `status` | Integer | `1` Active, `2` Off, `3` Holidays |
| `photo` | String/null | URL of the employee photo |
| `created_at` | Timestamp | Record creation date |
| `updated_at` | Timestamp | Last update date |
| `deleted_at` | Timestamp/null | Soft-delete date |

## API Endpoints

All endpoints are prefixed with `/api/employees`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/employees` | List employees |
| `GET` | `/api/employees/search` | Search, filter, and sort employees |
| `GET` | `/api/employees/withDeleted` | List employees including soft-deleted records |
| `GET` | `/api/employees/{id}` | Retrieve one employee |
| `POST` | `/api/employees` | Create an employee |
| `PUT` | `/api/employees/{id}` | Update an employee |
| `DELETE` | `/api/employees/{id}` | Soft-delete an employee |

### Search Parameters

The search endpoint accepts the following query parameters:

| Parameter | Values | Description |
| --- | --- | --- |
| `full_name` | String | Match names beginning with the supplied value |
| `email` | String | Match emails beginning with the supplied value |
| `status` | `0`, `1`, `2`, `3` | All, Active, Off, or Holidays |
| `sort` | `1`, `2`, `3` | Newest, highest salary, or lowest salary |

Example:

```http
GET /api/employees/search?full_name=John&status=1&sort=2
```

### Response Format

Successful requests use a consistent response envelope:

```json
{
  "success": true,
  "data": {},
  "message": "Retrieved successfully"
}
```

## Getting Started

### Prerequisites

- PHP 8.3 or later
- Composer
- A supported database such as SQLite or MySQL
- Node.js and npm if you also want to run the frontend

### Backend Installation

```bash
git clone <repository-url>
cd employees_project_BE
composer install
cp .env.example .env
php artisan key:generate
```

Configure the database variables in `.env`, then run:

```bash
php artisan migrate
php artisan serve
```

The backend is available by default at `http://localhost:8000`, with employee endpoints under `http://localhost:8000/api/employees`.

## Docker Setup

The repository includes a [`docker-compose.yaml`](./docker-compose.yaml) file for running the PostgreSQL database. The Laravel backend and Next.js frontend run directly on the host machine and are not currently containerized.

### Docker Services

| Service | Image | Container | Host Port | Container Port |
| --- | --- | --- | --- | --- |
| PostgreSQL | `postgres:18.4-alpine3.24` | `pg_emplyee_container` | `5555` | `5432` |

The database uses the following development credentials:

| Variable | Value |
| --- | --- |
| Database | `db_employee` |
| Username | `postgres` |
| Password | `postgres` |

These credentials are intended for local development only and should be replaced with secure values in a production environment.

### Start PostgreSQL

Make sure Docker Desktop or the Docker Engine is running, then execute:

```bash
docker compose up -d
```

Configure the Laravel `.env` file to connect to the container through its published host port:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5555
DB_DATABASE=db_employee
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

Run the database migrations after the container is ready:

```bash
php artisan migrate
```

You can then start the backend normally:

```bash
php artisan serve
```

### Useful Docker Commands

```bash
# View running services
docker compose ps

# Follow PostgreSQL logs
docker compose logs -f db

# Stop and remove the container
docker compose down

# Stop the container and permanently remove its database volume
docker compose down -v
```

PostgreSQL data is persisted in the named `posgres_data` Docker volume. The `docker compose down -v` command deletes that volume and all stored development data, so use it carefully.

### Run the Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

If `frontend/.env.example` is not present, create `frontend/.env.local` with:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:8000/api/employees
```

Open `http://localhost:3000` in your browser. Full frontend documentation is available in [`frontend/README.md`](./frontend/README.md).

## Development Commands

```bash
# Run the backend
php artisan serve

# Run automated tests
composer test

# Format PHP code
./vendor/bin/pint

# Clear Laravel caches
php artisan optimize:clear
```

## Architecture

The API separates responsibilities across a controller, form request, service, model, enum, and response helper. Controllers handle HTTP input and output, the service contains employee operations and query building, and Eloquent manages persistence and soft deletion.

## License

This project is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT).
