import React from 'react';
import { apiFetch } from '@/components/apiFetch';

type UserType = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    phone: number
}
const useUser = () => {
    const [data, setData] = React.useState<UserType[]>([]);
    const [isPending, setIsPending] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const url = "http://localhost:8000/users"
    React.useEffect(() => {
        const abortCont = new AbortController();

        const fetchData = async () => {
            try {
                const data = await apiFetch(url, { signal: abortCont.signal })
                setIsPending(false);
                setData(data);
                setError(null);
            } catch (err: any) {
                if (err.name === 'AbortError') {
                    // do nothing, the fetch was aborted
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            }
        };

        setTimeout(fetchData, 1000);

        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error };
}

export default useUser;