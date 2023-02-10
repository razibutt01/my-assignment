import React from 'react';
import { apiFetch } from '@/components/apiFetch';
type RoleType = {
    id: number;
    title: string;
    active: string;
    description: string;


}
const useRole = () => {
    const [data, setData] = React.useState<RoleType[]>([]);
    const [isPending, setIsPending] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const url = "http://localhost:8000/roles"
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

export default useRole;