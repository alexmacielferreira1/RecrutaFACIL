import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
  it('envia credenciais válidas para abrir o dashboard', async () => {
    const onLogin = vi.fn()
    render(
      <MemoryRouter>
        <LoginPage onLogin={onLogin} />
      </MemoryRouter>,
    )

    await userEvent.type(screen.getByLabelText('E-mail corporativo'), 'rh@meurh.com.br')
    await userEvent.type(screen.getByLabelText('Senha'), 'Segura123!')
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(onLogin).toHaveBeenCalledWith({
      email: 'rh@meurh.com.br',
      password: 'Segura123!',
    })
  })
})
