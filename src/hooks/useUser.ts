import React from 'react';

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

export default useUser;