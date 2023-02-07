import React from 'react';
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
        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) { // error coming back from server
                        throw Error('could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    setIsPending(false);
                    setData(data);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted')
                    } else {
                        // auto catches network / connection error
                        setIsPending(false);
                        setError(err.message);
                    }
                })
        }, 1000);

        // abort the fetch
        return () => abortCont.abort();
    }, [url])

    return { data, isPending, error };
}

export default useRole;