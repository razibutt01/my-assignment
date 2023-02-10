import React from "react";
type APIOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    signal?: AbortSignal;
}

export async function apiFetch(
    url: string,
    options: APIOptions = { method: 'GET' }
): Promise<any> {
    const response = await fetch(url, {
        method: options.method,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
}