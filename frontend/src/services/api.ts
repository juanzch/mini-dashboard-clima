import { getToken } from './auth';

const API = process.env.NEXT_PUBLIC_API_URL;

export async function fetchWithAuth<TResponse>(
  path: string,
  options: RequestInit = {}
): Promise<TResponse> {
  const token = getToken();

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`);
  }

  return res.json();
}