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
