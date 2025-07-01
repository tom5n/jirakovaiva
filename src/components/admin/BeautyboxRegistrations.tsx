import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2, Eye, Download } from 'lucide-react';

interface BeautyboxRegistration {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  street: string | null;
  zip: string | null;
  city: string | null;
  message: string | null;
  created_at: string;
}

export default function BeautyboxRegistrations({ count }: { count: number }) {
  const [registrations, setRegistrations] = useState<BeautyboxRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState<BeautyboxRegistration | null>(null);
  const [toast, setToast] = useState<{text: string, type: 'success'|'error'}|null>(null);

  const showToast = (text: string, type: 'success'|'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('beautybox_registrations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching registrations:', error);
      showToast('Chyba při načítání registrací.', 'error');
    } else {
      setRegistrations(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Opravdu chcete smazat tuto registraci?')) {
      const { error } = await supabase
        .from('beautybox_registrations')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting registration:', error);
        showToast('Chyba při mazání registrace.', 'error');
      } else {
        showToast('Registrace byla smazána.');
        fetchRegistrations();
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['Jméno', 'Příjmení', 'Email', 'Telefon', 'Ulice', 'PSČ', 'Město', 'Zpráva', 'Datum registrace'];
    const csvData = registrations.map(reg => [
      reg.name,
      reg.surname,
      reg.email,
      reg.phone,
      reg.street || '',
      reg.zip || '',
      reg.city || '',
      reg.message || '',
      new Date(reg.created_at).toLocaleDateString('cs-CZ')
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `beautybox_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#21435F] mx-auto"></div>
          <p className="mt-2 text-gray-600">Načítání registrací...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <h2 className="truncate text-3xl section-title font-bold font-['Dancing_Script'] text-[#21435F] tracking-tight">
          Beautybox ({count})
        </h2>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-[#21435F] text-white rounded-lg hover:bg-[#21435F]/90 transition-colors"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>
      {/* Desktop view */}
      <div className="hidden md:block">
        {/* Hlavička gridu */}
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_0.8fr] gap-x-4 px-3 pb-1 text-sm text-[#21435F] font-semibold uppercase tracking-wide select-none">
          <span>Jméno</span>
          <span>Email</span>
          <span>Telefon</span>
          <span>Datum</span>
          <span className="text-right block">Akce</span>
        </div>
        
        {/* Seznam registrací */}
        <div className="space-y-2">
          {registrations.length === 0 && (
            <div className="text-gray-500 text-center py-8">Žádné registrace.</div>
          )}
          {registrations.map(reg => (
            <div
              key={reg.id}
              className="grid grid-cols-[1fr_1.5fr_1fr_1fr_0.8fr] gap-x-4 items-center px-3 py-2 rounded-lg border border-[#21435F]/10 bg-white/70 hover:bg-white transition-all text-sm md:text-base"
            >
              <span className="font-semibold text-[#21435F]">{reg.name} {reg.surname}</span>
              <span className="text-gray-600">{reg.email}</span>
              <span className="text-gray-600">{reg.phone}</span>
              <span className="text-gray-600 whitespace-nowrap">
                {new Date(reg.created_at).toLocaleDateString('cs-CZ')}
              </span>
              <span className="flex gap-1 justify-end">
                <button 
                  onClick={() => setSelectedRegistration(reg)} 
                  title="Zobrazit detail" 
                  className="p-2 rounded-full hover:bg-blue-100 text-blue-700 transition"
                >
                  <Eye size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(reg.id)} 
                  title="Smazat" 
                  className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
                >
                  <Trash2 size={18} />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-2">
        {registrations.length === 0 && (
          <div className="text-gray-500 text-center py-8">Žádné registrace.</div>
        )}
        {registrations.map(reg => (
          <button
            key={reg.id}
            onClick={() => setSelectedRegistration(reg)}
            className="w-full p-4 bg-white rounded-xl shadow border border-[#21435F]/10 flex flex-col gap-2 text-left"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#21435F]">{reg.name} {reg.surname}</span>
              <span className="text-sm text-[#21435F]/70">
                {new Date(reg.created_at).toLocaleDateString('cs-CZ')}
              </span>
            </div>
            <div className="text-sm text-gray-600">{reg.email}</div>
            <div className="text-sm text-gray-600">{reg.phone}</div>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]" />
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 z-[101] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#21435F]">Detail registrace</h3>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Jméno a příjmení</label>
                <p className="text-[#21435F] font-medium">{selectedRegistration.name} {selectedRegistration.surname}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-[#21435F]">{selectedRegistration.email}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Telefon</label>
                <p className="text-[#21435F]">{selectedRegistration.phone}</p>
              </div>
              
              {selectedRegistration.street && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Adresa</label>
                  <p className="text-[#21435F]">
                    {selectedRegistration.street}<br />
                    {selectedRegistration.zip} {selectedRegistration.city}
                  </p>
                </div>
              )}
              
              {selectedRegistration.message && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Zpráva</label>
                  <p className="text-[#21435F] whitespace-pre-wrap">{selectedRegistration.message}</p>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-gray-500">Datum registrace</label>
                <p className="text-[#21435F]">
                  {new Date(selectedRegistration.created_at).toLocaleString('cs-CZ')}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => handleDelete(selectedRegistration.id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Smazat
              </button>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Zavřít
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-[200] px-4 py-2 rounded-lg text-white ${
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {toast.text}
        </div>
      )}
    </div>
  );
} 