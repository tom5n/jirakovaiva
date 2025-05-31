import NewsForm from '@/components/admin/NewsForm'
import NewsList from '@/components/admin/NewsList'
import TemplatesForm from '@/components/admin/TemplatesForm'
import TemplatesList from '@/components/admin/TemplatesList'
import AdminReservationsCalendar from '@/components/admin/AdminReservationsCalendar'
import WorkingHours from '@/components/admin/WorkingHours'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'
import { LogOut, Newspaper, FileText, Calendar, CheckSquare, Check, X, Trash2 } from 'lucide-react'

// Přidání Google fontu Dancing Script pouze pro tento soubor
const dancingFontUrl = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap';

function ApproveReservationsList() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rejectId, setRejectId] = useState<string|null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [toast, setToast] = useState<{text: string, type: 'success'|'error'}|null>(null);

  const showToast = (text: string, type: 'success'|'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchReservations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });
    if (!error) setReservations(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleApprove = async (id: string) => {
    const { error } = await supabase.from('reservations').update({ status: 'confirmed' }).eq('id', id);
    if (!error) showToast('Rezervace byla potvrzena.');
    else showToast('Chyba při potvrzení rezervace.', 'error');
    fetchReservations();
  };
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('reservations').delete().eq('id', id);
    if (!error) showToast('Rezervace byla smazána.');
    else showToast('Chyba při mazání rezervace.', 'error');
    fetchReservations();
  };
  const handleReject = (id: string) => {
    setRejectId(id);
    setRejectReason('');
  };
  const handleRejectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rejectId) {
      const { error } = await supabase.from('reservations').update({ status: 'cancelled', reject_reason: rejectReason }).eq('id', rejectId);
      if (!error) showToast('Rezervace byla zamítnuta.');
      else showToast('Chyba při zamítnutí rezervace.', 'error');
      setRejectId(null);
      setRejectReason('');
      fetchReservations();
    }
  };
  return (
    <div className="space-y-2">
      {/* Hlavička gridu */}
      <div className="hidden md:grid grid-cols-[1.2fr_1.7fr_1.2fr_1fr_0.8fr_0.7fr] gap-x-6 px-3 pb-1 text-sm text-[#21435F] font-semibold uppercase tracking-wide select-none">
        <span>Jméno</span>
        <span>Email</span>
        <span>Telefon</span>
        <span>Datum</span>
        <span>Čas</span>
        <span className="text-right block">Akce</span>
      </div>
      {/* Mobilní hlavička */}
      <div className="md:hidden flex gap-x-4 px-3 pb-1 text-sm text-[#21435F] font-semibold uppercase tracking-wide select-none">
        <span>Jméno</span>
        <span>Email</span>
        <span>Telefon</span>
        <span>Datum</span>
        <span>Čas</span>
        <span className="text-right block">Akce</span>
      </div>
      {/* Seznam rezervací */}
      <div className="space-y-2 overflow-x-auto">
        {reservations.filter(r => r.status === 'pending').length === 0 && (
          <div className="text-gray-500 text-center py-8">Žádné rezervace ke schválení.</div>
        )}
        {reservations.filter(r => r.status === 'pending').map(r => (
          <div
            key={r.id}
            className="grid grid-cols-[1.2fr_1.7fr_1.2fr_1fr_0.8fr_0.7fr] gap-x-6 items-center px-3 py-2 rounded-lg border border-[#21435F]/10 bg-white/70 hover:bg-white transition-all text-sm md:text-base min-w-[600px]"
            style={{ minWidth: 600 }}
          >
            <span className="font-semibold text-[#21435F]">{r.first_name} {r.last_name}</span>
            <span className="text-gray-600">{r.email}</span>
            <span className="text-gray-600">{r.phone}</span>
            <span className="text-gray-600 whitespace-nowrap">{new Date(r.date).toLocaleDateString('cs-CZ')}</span>
            <span className="text-gray-600 whitespace-nowrap">{r.time}</span>
            <span className="flex gap-1">
              <button onClick={() => handleApprove(r.id)} title="Potvrdit" className="p-2 rounded-full hover:bg-green-100 text-green-700 transition"><Check size={18} /></button>
              <button onClick={() => handleReject(r.id)} title="Zamítnout" className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"><X size={18} /></button>
              <button onClick={() => handleDelete(r.id)} title="Smazat" className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"><Trash2 size={18} /></button>
            </span>
          </div>
        ))}
      </div>
      {rejectId !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]" />
          <form onSubmit={handleRejectSubmit} className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 z-[101] relative flex flex-col gap-4">
            <button type="button" onClick={() => { setRejectId(null); setRejectReason(''); }} className="absolute top-4 right-4 text-gray-400 hover:text-[#21435F] text-2xl font-bold">×</button>
            <h3 className="text-xl font-bold text-[#21435F] mb-2 text-center">Zamítnout rezervaci</h3>
            <label className="block text-base font-medium text-[#21435F] mb-1" htmlFor="reject-reason">Důvod zamítnutí</label>
            <textarea
              id="reject-reason"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-[#21435F] focus:border-[#21435F] transition bg-white text-base min-h-[80px]"
              placeholder="Zadejte důvod zamítnutí..."
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              required
            />
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-gray-200 text-[#21435F] font-medium hover:bg-gray-300 transition"
                onClick={() => { setRejectId(null); setRejectReason(''); }}
              >
                Zpět
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
              >
                Odeslat
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Toast notifikace */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[200] px-6 py-3 rounded-2xl shadow-lg font-['Montserrat'] text-base animate-fade-in transition-all
          ${toast.type === 'success' ? 'bg-[#21435F] text-white' : 'bg-red-600 text-white'}`}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('news')
  const [templateCount, setTemplateCount] = useState(0)

  useEffect(() => {
    // Kontrola přihlášení při načtení stránky
    const adminSession = document.cookie.includes('admin_session=1');
    if (!adminSession) {
      navigate('/login');
    }
  }, [navigate])

  useEffect(() => {
    const fetchTemplateCount = async () => {
      const { count } = await supabase
        .from('templates')
        .select('*', { count: 'exact', head: true })
      setTemplateCount(count || 0)
    }
    fetchTemplateCount()
  }, [activeSection])

  useEffect(() => {
    // Dynamicky přidat font do hlavičky dokumentu
    const link = document.createElement('link');
    link.href = dancingFontUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleLogout = () => {
    // Odstranit cookie při odhlášení
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = '/login';
  }

  // Pokud není přihlášen, nevykresluj nic
  if (!document.cookie.includes('admin_session=1')) {
    return null;
  }

  return (
    <div className="min-h-screen flex" style={{
      backgroundImage: 'url(/images/dashboardBG.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {/* Sidebar */}
      <div className="w-64 bg-white/20 backdrop-blur-xl border-r border-white/30 h-screen fixed left-0 top-0 p-6 hidden sm:block">
        <div 
          className="text-3xl mb-12 text-center"
          style={{ fontFamily: '"Dancing Script", cursive', color: '#21435F', fontWeight: 700 }}
        >
          Ivana Jiráková
        </div>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveSection('news')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'news' 
                ? 'bg-[#21435F] text-white' 
                : 'text-[#21435F] hover:bg-white/20'
            }`}
          >
            <Newspaper size={20} />
            <span>Novinky a události</span>
          </button>
          <button
            onClick={() => setActiveSection('templates')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'templates' 
                ? 'bg-[#21435F] text-white' 
                : 'text-[#21435F] hover:bg-white/20'
            }`}
          >
            <FileText size={20} />
            <span>Šablony</span>
          </button>
          <button
            onClick={() => setActiveSection('reservations')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'reservations' 
                ? 'bg-[#21435F] text-white' 
                : 'text-[#21435F] hover:bg-white/20'
            }`}
          >
            <Calendar size={20} />
            <span>Rezervace</span>
          </button>
          <button
            onClick={() => setActiveSection('approve')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'approve' 
                ? 'bg-[#21435F] text-white' 
                : 'text-[#21435F] hover:bg-white/20'
            }`}
          >
            <CheckSquare size={20} />
            <span>Ke schválení</span>
          </button>
          <button
            onClick={() => setActiveSection('working_hours')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeSection === 'working_hours' 
                ? 'bg-[#21435F] text-white' 
                : 'text-[#21435F] hover:bg-white/20'
            }`}
          >
            <Calendar size={20} />
            <span>Pracovní doba</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 sm:ml-64 flex items-center justify-center min-h-screen p-8 pb-24 sm:pb-8">
        <div className="max-w-7xl w-full">
          {activeSection === 'news' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="bg-white/80 rounded-2xl shadow p-6">
                <h2 className="truncate text-2xl section-title font-semibold text-[#21435F] tracking-tight mb-4">Přidat novinku / událost</h2>
                <NewsForm />
              </div>
              <div className="bg-white/80 rounded-2xl shadow p-6">
                <h2 className="truncate text-2xl section-title font-semibold text-[#21435F] tracking-tight mb-4">Seznam novinek a událostí</h2>
                <div className="max-h-[420px] overflow-y-auto pr-2">
                  <NewsList />
                </div>
              </div>
            </div>
          )}
          {activeSection === 'templates' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="bg-white/80 rounded-2xl shadow p-6 h-full flex flex-col">
                <h2 className="truncate text-2xl section-title font-semibold text-[#21435F] tracking-tight mb-4">Přidat šablonu</h2>
                <TemplatesForm templateCount={templateCount} />
              </div>
              <div className="bg-white/80 rounded-2xl shadow p-6">
                <h2 className="truncate text-2xl section-title font-semibold text-[#21435F] tracking-tight mb-4">Seznam šablon</h2>
                <div className="pr-2">
                  <TemplatesList />
                </div>
              </div>
            </div>
          )}
          {activeSection === 'reservations' && (
            <div className="bg-white/80 rounded-2xl shadow p-6">
              <h2 className="text-3xl font-bold text-[#21435F] mb-2 font-['Dancing_Script']">Kalendář rezervací</h2>
              <AdminReservationsCalendar />
            </div>
          )}
          {activeSection === 'approve' && (
            <div className="bg-white/80 rounded-2xl shadow p-6">
              <h2 className="truncate text-3xl section-title font-bold font-['Dancing_Script'] text-[#21435F] tracking-tight mb-4">Rezervace ke schválení</h2>
              <ApproveReservationsList />
            </div>
          )}
          {activeSection === 'working_hours' && (
            <div className="bg-white/80 rounded-2xl shadow p-6">
              <WorkingHours />
            </div>
          )}
        </div>
      </div>

      {/* Logout Button desktop */}
      <button
        onClick={handleLogout}
        className="fixed bottom-6 left-6 z-50 bg-[#21435F] text-white p-3 rounded-full shadow-lg hover:bg-[#18324a] transition flex items-center justify-center hidden sm:flex"
        title="Odhlásit se"
      >
        <LogOut size={22} />
      </button>

      {/* Bottom navbar mobile */}
      <nav className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 z-50 flex sm:hidden">
        <button
          onClick={() => setActiveSection('news')}
          className={`flex-1 flex flex-col items-center justify-center py-2 ${activeSection === 'news' ? 'text-[#21435F]' : 'text-gray-500'}`}
        >
          {activeSection === 'news' && (
            <div className="mb-1 w-6 h-1 rounded-full bg-[#21435F]" />
          )}
          <Newspaper size={22} />
          <span className="text-xs mt-1">Novinky</span>
        </button>
        <button
          onClick={() => setActiveSection('templates')}
          className={`flex-1 flex flex-col items-center justify-center py-2 ${activeSection === 'templates' ? 'text-[#21435F]' : 'text-gray-500'}`}
        >
          {activeSection === 'templates' && (
            <div className="mb-1 w-6 h-1 rounded-full bg-[#21435F]" />
          )}
          <FileText size={22} />
          <span className="text-xs mt-1">Šablony</span>
        </button>
        <button
          onClick={() => setActiveSection('reservations')}
          className={`flex-1 flex flex-col items-center justify-center py-2 ${activeSection === 'reservations' ? 'text-[#21435F]' : 'text-gray-500'}`}
        >
          {activeSection === 'reservations' && (
            <div className="mb-1 w-6 h-1 rounded-full bg-[#21435F]" />
          )}
          <Calendar size={22} />
          <span className="text-xs mt-1">Rezervace</span>
        </button>
        <button
          onClick={() => setActiveSection('approve')}
          className={`flex-1 flex flex-col items-center justify-center py-2 ${activeSection === 'approve' ? 'text-[#21435F]' : 'text-gray-500'}`}
        >
          {activeSection === 'approve' && (
            <div className="mb-1 w-6 h-1 rounded-full bg-[#21435F]" />
          )}
          <CheckSquare size={22} />
          <span className="text-xs mt-1">Ke schválení</span>
        </button>
        <button
          onClick={() => setActiveSection('working_hours')}
          className={`flex-1 flex flex-col items-center justify-center py-2 ${activeSection === 'working_hours' ? 'text-[#21435F]' : 'text-gray-500'}`}
        >
          {activeSection === 'working_hours' && (
            <div className="mb-1 w-6 h-1 rounded-full bg-[#21435F]" />
          )}
          <Calendar size={22} />
          <span className="text-xs mt-1">Prac. doba</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex-1 flex flex-col items-center justify-center py-2 text-gray-500"
        >
          <LogOut size={22} />
          <span className="text-xs mt-1">Odhlásit</span>
        </button>
      </nav>
    </div>
  )
} 