import { describe, expect, it, vi } from 'vitest'

import { login } from './auth-api'

describe('auth api', () => {
  it('envia credenciais e devolve a sessão tipada', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        access_token: 'token-real',
        token_type: 'bearer',
        expires_in: 900,
        user: { name: 'Daiane', email: 'daiane@empresa.com.br', roles: ['recruiter'], permissions: ['recruitment:read'] },
      }),
    })

    const session = await login(
      { email: 'daiane@empresa.com.br', password: 'teste' },
      fetcher,
      'http://localhost:8000/api/v1',
    )

    expect(fetcher).toHaveBeenCalledWith(
      'http://localhost:8000/api/v1/auth/login',
      expect.objectContaining({ method: 'POST' }),
    )
    expect(session.user.name).toBe('Daiane')
    expect(session.accessToken).toBe('token-real')
  })

  it('traduz login inválido para uma mensagem amigável', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: false, status: 401 })

    await expect(
      login({ email: 'teste@teste.com', password: 'errada' }, fetcher, '/api/v1'),
    ).rejects.toThrow('E-mail ou senha inválidos.')
  })
})
