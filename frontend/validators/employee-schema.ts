import z from "zod";

export const employeeSchema = z.object({
    full_name: z.string().min(3, "FullName must be min 3 "),
    email: z.string().email("FullName must be min 3 "),
    salary: z.number(),
    hire_date: z.iso.date("Invalid date"),
    status: z.number(),
    photo: z.string().url("Url Invalid"),
});

export type employeeInput = z.infer<typeof employeeSchema>;
