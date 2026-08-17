<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: '1.0.0',
    title: 'Employees API',
    description: 'REST API documentation for employee management.'
)]
#[OA\Server(url: '/api', description: 'Current API server')]
#[OA\Schema(
    schema: 'Employee',
    required: ['id', 'full_name', 'email', 'salary', 'hire_date', 'status'],
    properties: [
        new OA\Property(property: 'id', type: 'integer', example: 1),
        new OA\Property(property: 'full_name', type: 'string', example: 'Khalil Zerzour'),
        new OA\Property(property: 'email', type: 'string', format: 'email', example: 'khalil@example.com'),
        new OA\Property(property: 'salary', type: 'number', format: 'double', example: 45000),
        new OA\Property(property: 'hire_date', type: 'string', format: 'date', example: '2026-08-14'),
        new OA\Property(property: 'status', description: '1 = active, 2 = inactive, 3 = suspended', type: 'integer', enum: [1, 2, 3], example: 1),
        new OA\Property(property: 'photo', type: 'string', format: 'uri', nullable: true, example: 'https://example.com/photo.jpg'),
        new OA\Property(property: 'created_at', type: 'string', format: 'date-time', nullable: true),
        new OA\Property(property: 'updated_at', type: 'string', format: 'date-time', nullable: true),
        new OA\Property(property: 'deleted_at', type: 'string', format: 'date-time', nullable: true),
    ],
    type: 'object'
)]
#[OA\Schema(
    schema: 'EmployeeInput',
    required: ['full_name', 'email', 'salary', 'hire_date', 'status'],
    properties: [
        new OA\Property(property: 'full_name', type: 'string', example: 'Khalil Zerzour'),
        new OA\Property(property: 'email', type: 'string', format: 'email', example: 'khalil@example.com'),
        new OA\Property(property: 'salary', type: 'number', example: 45000),
        new OA\Property(property: 'hire_date', type: 'string', format: 'date', example: '2026-08-14'),
        new OA\Property(property: 'status', type: 'integer', enum: [1, 2, 3], example: 1),
        new OA\Property(property: 'photo', type: 'string', format: 'uri', nullable: true),
    ],
    type: 'object'
)]
#[OA\Schema(
    schema: 'EmployeeResponse',
    properties: [
        new OA\Property(property: 'success', type: 'boolean', example: true),
        new OA\Property(property: 'data', ref: '#/components/schemas/Employee'),
        new OA\Property(property: 'message', type: 'string', example: 'Employee retrieved successfully'),
    ],
    type: 'object'
)]
#[OA\Schema(
    schema: 'EmployeeListResponse',
    properties: [
        new OA\Property(property: 'success', type: 'boolean', example: true),
        new OA\Property(property: 'data', type: 'array', items: new OA\Items(ref: '#/components/schemas/Employee')),
        new OA\Property(property: 'message', type: 'string', example: 'Employees retrieved successfully'),
    ],
    type: 'object'
)]
#[OA\Schema(
    schema: 'UpdateEmployeeResponse',
    properties: [
        new OA\Property(property: 'success', type: 'boolean', example: true),
        new OA\Property(property: 'data', description: 'Whether the update succeeded', type: 'boolean', example: true),
        new OA\Property(property: 'message', type: 'string', example: 'Employee updated successfully'),
    ],
    type: 'object'
)]
#[OA\Schema(
    schema: 'DeleteEmployeeResponse',
    properties: [
        new OA\Property(property: 'success', type: 'boolean', example: true),
        new OA\Property(property: 'data', nullable: true, example: null),
        new OA\Property(property: 'message', type: 'string', example: 'Employee deleted successfully'),
    ],
    type: 'object'
)]
#[OA\Schema(
    schema: 'ValidationError',
    properties: [
        new OA\Property(property: 'message', type: 'string', example: 'The email field must be a valid email address.'),
        new OA\Property(
            property: 'errors',
            properties: [
                new OA\Property(property: 'email', type: 'array', items: new OA\Items(type: 'string'), example: ['The email field must be a valid email address.']),
            ],
            type: 'object'
        ),
    ],
    type: 'object'
)]
#[OA\Schema(
    schema: 'NotFoundError',
    properties: [
        new OA\Property(property: 'message', type: 'string', example: 'No query results for model [App\\Models\\Employee] 999'),
    ],
    type: 'object'
)]
class EmployeeApiDocumentation
{
    #[OA\Get(
        path: '/employees',
        summary: 'List employees',
        tags: ['Employees'],
        responses: [
            new OA\Response(response: 200, description: 'Employee list', content: new OA\JsonContent(ref: '#/components/schemas/EmployeeListResponse')),
        ]
    )]
    public function index(): void {}

    #[OA\Get(
        path: '/employees/search',
        summary: 'Search and sort employees',
        tags: ['Employees'],
        parameters: [
            new OA\Parameter(name: 'email', in: 'query', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'full_name', in: 'query', schema: new OA\Schema(type: 'string')),
            new OA\Parameter(name: 'status', description: '1 = active, 2 = inactive, 3 = suspended', in: 'query', schema: new OA\Schema(type: 'integer', enum: [1, 2, 3])),
            new OA\Parameter(name: 'sort', description: '1 = newest, 2 = salary descending, 3 = salary ascending', in: 'query', schema: new OA\Schema(type: 'integer', enum: [1, 2, 3])),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Search results', content: new OA\JsonContent(ref: '#/components/schemas/EmployeeListResponse')),
        ]
    )]
    public function search(): void {}

    #[OA\Get(
        path: '/employees/withDeleted',
        summary: 'List employees including deleted records',
        tags: ['Employees'],
        responses: [
            new OA\Response(response: 200, description: 'Employee list including deleted records', content: new OA\JsonContent(ref: '#/components/schemas/EmployeeListResponse')),
        ]
    )]
    public function withDeleted(): void {}

    #[OA\Get(
        path: '/employees/{employee}',
        summary: 'Get an employee',
        tags: ['Employees'],
        parameters: [new OA\Parameter(name: 'employee', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(response: 200, description: 'Employee found', content: new OA\JsonContent(ref: '#/components/schemas/EmployeeResponse')),
            new OA\Response(response: 404, description: 'Employee not found', content: new OA\JsonContent(ref: '#/components/schemas/NotFoundError')),
        ]
    )]
    public function show(): void {}

    #[OA\Post(
        path: '/employees',
        summary: 'Create an employee',
        requestBody: new OA\RequestBody(required: true, content: new OA\JsonContent(ref: '#/components/schemas/EmployeeInput')),
        tags: ['Employees'],
        responses: [
            new OA\Response(response: 201, description: 'Employee created', content: new OA\JsonContent(ref: '#/components/schemas/EmployeeResponse')),
            new OA\Response(response: 422, description: 'Invalid data', content: new OA\JsonContent(ref: '#/components/schemas/ValidationError')),
        ]
    )]
    public function store(): void {}

    #[OA\Put(
        path: '/employees/{id}',
        summary: 'Update an employee',
        tags: ['Employees'],
        parameters: [new OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        requestBody: new OA\RequestBody(required: true, content: new OA\JsonContent(
            properties: [
                new OA\Property(property: 'full_name', type: 'string'),
                new OA\Property(property: 'email', type: 'string', format: 'email'),
                new OA\Property(property: 'salary', type: 'number'),
                new OA\Property(property: 'hire_date', type: 'string', format: 'date'),
                new OA\Property(property: 'status', type: 'integer', enum: [1, 2, 3]),
                new OA\Property(property: 'photo', type: 'string', format: 'uri'),
            ],
            type: 'object'
        )),
        responses: [
            new OA\Response(response: 201, description: 'Employee updated', content: new OA\JsonContent(ref: '#/components/schemas/UpdateEmployeeResponse')),
            new OA\Response(response: 404, description: 'Employee not found', content: new OA\JsonContent(ref: '#/components/schemas/NotFoundError')),
            new OA\Response(response: 422, description: 'Invalid data', content: new OA\JsonContent(ref: '#/components/schemas/ValidationError')),
        ]
    )]
    public function update(): void {}

    #[OA\Delete(
        path: '/employees/{employee}',
        summary: 'Delete an employee (soft delete)',
        tags: ['Employees'],
        parameters: [new OA\Parameter(name: 'employee', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))],
        responses: [
            new OA\Response(response: 200, description: 'Employee deleted', content: new OA\JsonContent(ref: '#/components/schemas/DeleteEmployeeResponse')),
            new OA\Response(response: 404, description: 'Employee not found', content: new OA\JsonContent(ref: '#/components/schemas/NotFoundError')),
        ]
    )]
    public function destroy(): void {}
}
