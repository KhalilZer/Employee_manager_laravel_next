const BASE_URL = process.env.BASE_URL;

export const fetchALl = async (): Promise<serverResponse> => {
    const result = await fetch(`${BASE_URL}`);
    const allEmp = await result.json();
    return allEmp;
};
