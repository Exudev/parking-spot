export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiOptions {
  method?: HttpMethod
  body?: unknown
  headers?: Record<string, string>
}

const API_BASE = import.meta.env.VITE_API_BASE;

export async function useApi<T = unknown>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  body: body ? JSON.stringify(body) : null,
  })

  if (!response.ok) {
    // Aquí podrías manejar errores de forma global
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return response.json() as Promise<T>
}
