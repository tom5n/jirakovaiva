import { useState } from 'react'
import { Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ADMIN_USERNAME = "ivajirakova";
const ADMIN_PASSWORD = "Farmasi8053.";

export default function AuthForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Uložit session do cookies s nastavením pro celou doménu
      document.cookie = "admin_session=1; path=/; max-age=86400"
      setShowToast(true)
      // Počkat na uložení cookie
      setTimeout(() => {
        navigate('/admin')
      }, 1000)
    } else {
      setError('Nesprávné uživatelské jméno nebo heslo.')
    }
    
    setLoading(false)
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[#FFD1C1] focus:ring-2 focus:ring-[#21435F] focus:outline-none text-[#21435F] bg-white/30 backdrop-blur-md placeholder-[#bfa9a0] transition shadow-sm"

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{
        backgroundImage: 'url(/images/logingradient.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <button
        onClick={() => window.location.href = '/'}
        className="fixed bottom-6 left-6 z-50 bg-[#21435F] text-white p-3 rounded-full shadow-lg hover:bg-[#18324a] transition flex items-center justify-center"
        title="Domů"
      >
        <Home size={22} />
      </button>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-10 flex flex-col gap-7"
        style={{ boxShadow: '0 8px 32px 0 rgba(33,67,95,0.10)' }}
      >
        <div className="flex flex-col items-center -mb-2">
          <h2 className="text-4xl section-title font-semibold text-[#21435F] tracking-tight text-left w-full mb-2">Přihlásit se</h2>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#21435F] mb-1">Uživatelské jméno</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className={inputClass}
            placeholder="Zadejte uživatelské jméno"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#21435F] mb-1">Heslo</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className={inputClass}
            placeholder="Zadejte heslo"
          />
        </div>
        {error && <div className="text-red-600 text-center text-sm -mt-2">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-[#21435F] text-white font-normal text-base shadow-md hover:bg-[#18324a] transition font-['Montserrat']"
        >
          <span className="section-title text-base text-white font-['Montserrat'] font-normal">
            {loading ? 'Přihlašuji...' : 'Přihlásit se'}
          </span>
        </button>
      </form>
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-[#21435F] text-white px-6 py-3 rounded-2xl shadow-lg font-['Montserrat'] text-base animate-fade-in">
          Úspěšně přihlášeno
        </div>
      )}
    </div>
  )
} 