async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(input: string) => request<T>(input),
  post: <T>(input: string, body: unknown) =>
    request<T>(input, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  patch: <T>(input: string, body: unknown) =>
    request<T>(input, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
};
