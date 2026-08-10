interface IEmployee {
    id: number;
    full_name: string;
    email: string;
    salary: number;
    hire_date: Date;
    status: number;
    photo: string;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
}
