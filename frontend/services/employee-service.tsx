import { employeeInput, employeeSchema } from "@/validators/employee-schema";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchALlEmployees = async (): Promise<serverResponse> => {
    const result = await fetch(`${BASE_URL}`);
    const allEmp = await result.json();
    return allEmp;
};

export const searchEmployees = async (
    keyParam: string[],
    valueParam: (string | number)[],
): Promise<serverResponse> => {
    const params = new URLSearchParams();

    keyParam.forEach((key, index) => {
        params.append(key, String(valueParam[index]));
    });

    const result = await fetch(`${BASE_URL}/search?${params}`);
    const allEmp = await result.json();
    return allEmp;
};

export const putEmployee = async (
    id: number | undefined,
    payload: employeeInput,
): Promise<serverResponse> => {
    const parseValidation = employeeSchema.safeParse(payload);

    if (!parseValidation.success) {
        return {
            data: null,
            success: false,
            message: String(parseValidation.error.flatten().fieldErrors),
        };
    }
    const result = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(parseValidation.data),
    });

    const empUpdated = await result.json();
    return empUpdated;
};
export const craeteEmployee = async (
    payload: employeeInput,
): Promise<serverResponse> => {
    const parseValidation = employeeSchema.safeParse(payload);

    if (!parseValidation.success) {
        return {
            data: null,
            success: false,
            message: String(parseValidation.error.flatten().fieldErrors),
        };
    }
    const result = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(parseValidation.data),
    });

    const empCreated = await result.json();
    return empCreated;
};

export const deleteEmployee = async (id: number): Promise<serverResponse> => {
    const result = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const deleted = await result.json();

    return deleted;
};
