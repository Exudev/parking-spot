
export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.log("klk",res);
    throw new Error(errorText || 'Error en la API')
  }

  return res.json()
}
