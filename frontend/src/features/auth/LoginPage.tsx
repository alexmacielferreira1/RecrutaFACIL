import { FormEvent, useState } from 'react'
import { ArrowRight, BarChart3, BriefcaseBusiness, LockKeyhole, Mail, ShieldCheck, Target, Users } from 'lucide-react'

export type LoginCredentials = { email: string; password: string }

type LoginPageProps = {
  onLogin: (credentials: LoginCredentials) => void | Promise<void>
}

const highlights = [
  { icon: Users, label: 'Colaboradores ativos', value: '1.248', delta: '+12%' },
  { icon: BarChart3, label: 'Engajamento', value: '87%', delta: '+8%' },
  { icon: Target, label: 'Metas atingidas', value: '92%', delta: '+15%' },
]

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await onLogin({ email, password })
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Não foi possível entrar.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-story" aria-label="MEU RH">
        <div className="brand"><BriefcaseBusiness size={28} /> MEU <strong>RH</strong></div>
        <div className="story-copy">
          <span className="accent-line" />
          <h1>Pessoas no centro.<br />Decisões mais claras.</h1>
          <p>Uma jornada integrada para encontrar, desenvolver e valorizar talentos.</p>
        </div>
        <div className="highlight-stack">
          {highlights.map(({ icon: Icon, label, value, delta }) => (
            <article className="highlight-card" key={label}>
              <span className="highlight-icon"><Icon size={22} /></span>
              <span><small>{label}</small><strong>{value}</strong></span>
              <em>{delta}</em>
            </article>
          ))}
        </div>
        <div className="story-orb story-orb-one" /><div className="story-orb story-orb-two" />
      </section>

      <section className="login-form-panel">
        <form className="login-form" onSubmit={submit}>
          <span className="user-mark"><Users size={30} /></span>
          <h2>Acesse sua conta</h2>
          <p>Bem-vindo de volta ao seu espaço de pessoas.</p>
          <label>E-mail corporativo
            <span className="input-wrap"><Mail size={19} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu.nome@empresa.com.br" required /></span>
          </label>
          <label>Senha
            <span className="input-wrap"><LockKeyhole size={19} /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" required /></span>
          </label>
          <div className="login-options"><label className="remember"><input type="checkbox" /> Lembrar de mim</label><a href="#recuperar">Esqueci minha senha</a></div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button" type="submit" disabled={submitting}>{submitting ? 'Entrando...' : 'Entrar'} <ArrowRight size={18} /></button>
          <p className="security-note"><ShieldCheck size={18} /> Ambiente seguro para sua jornada profissional</p>
        </form>
      </section>
    </main>
  )
}
