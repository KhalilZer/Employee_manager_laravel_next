import z from "zod";

export const employeeSchema = z.object({
    full_name: z.string().min(3, "Full name must contain at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    salary: z.number(),
    hire_date: z.iso.date("Please enter a valid hire date"),
    status: z.number(),
    photo: z.string().url("Please enter a valid photo URL"),
});

export type EmployeeInput = z.infer<typeof employeeSchema>;
