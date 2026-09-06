export async function login(
  credentials: LoginCredentials,
  fetcher: FetchLike = fetch,
  apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1',
): Promise<Session> {
  const demoEnabled = import.meta.env.VITE_DEMO_MODE === 'true'

  if (demoEnabled) {
    if (
      credentials.email === 'demo@recrutafacil.com' &&
      credentials.password === 'Demo123!'
    ) {
      return {
        accessToken: 'demo-token',
        user: {
          name: 'Usuário Demo',
          email: 'demo@recrutafacil.com',
          roles: ['admin', 'recruiter'],
          permissions: ['recruitment:read', 'recruitment:write'],
        },
      }
    }

    throw new Error('E-mail ou senha inválidos.')
  }

  const response = await fetcher(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('E-mail ou senha inválidos.')
    }

    throw new Error('Não foi possível entrar. Tente novamente.')
  }

  const data = (await response.json()) as LoginResponse

  return {
    accessToken: data.access_token,
    user: data.user,
  }
}