import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2, Eye, Download, ChevronRight, ChevronLeft, Search } from 'lucide-react';

interface SpoluvkondiciRegistration {
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

const ITEMS_PER_PAGE = 15;

export default function SpoluvkondiciRegistrations({ count }: { count: number }) {
  const [registrations, setRegistrations] = useState<SpoluvkondiciRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState<SpoluvkondiciRegistration | null>(null);
  const [toast, setToast] = useState<{text: string, type: 'success'|'error'}|null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [allRegistrations, setAllRegistrations] = useState<SpoluvkondiciRegistration[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const showToast = (text: string, type: 'success'|'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchRegistrations = async (page: number = 1) => {
    setLoading(true);
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const { count, error: countError } = await supabase
      .from('spoluvkondici_registrations')
      .select('*', { count: 'exact', head: true });

    if (!countError && count !== null) {
      setTotalCount(count);
    }

    const { data, error } = await supabase
      .from('spoluvkondici_registrations')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + ITEMS_PER_PAGE - 1);

    if (error) {
      console.error('Error fetching registrations:', error);
      showToast('Chyba při načítání přihlášek.', 'error');
    } else {
      setRegistrations(data || []);
    }
    setLoading(false);
  };

  const fetchAllRegistrations = async () => {
    const { data, error } = await supabase
      .from('spoluvkondici_registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAllRegistrations(data);
    }
  };

  useEffect(() => {
    fetchRegistrations(currentPage);
    fetchAllRegistrations();
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Opravdu chcete smazat tuto přihlášku?')) {
      const { error } = await supabase
        .from('spoluvkondici_registrations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting registration:', error);
        showToast('Chyba při mazání přihlášky.', 'error');
      } else {
        showToast('Přihláška byla smazána.');
        fetchRegistrations(currentPage);
        fetchAllRegistrations();
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['Jméno', 'Příjmení', 'Email', 'Telefon', 'Ulice', 'PSČ', 'Město', 'Zpráva', 'Datum odeslání'];
    const csvData = allRegistrations.map(reg => [
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
    link.setAttribute('download', `spoluvkondici_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRegistrations = searchQuery
    ? allRegistrations.filter(reg => {
        const query = searchQuery.toLowerCase();
        return (
          reg.name.toLowerCase().includes(query) ||
          reg.surname.toLowerCase().includes(query) ||
          reg.email.toLowerCase().includes(query) ||
          reg.phone.includes(query)
        );
      })
    : registrations;

  const filteredTotalCount = searchQuery
    ? filteredRegistrations.length
    : totalCount;

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#21435F] mx-auto"></div>
          <p className="mt-2 text-gray-600">Načítání přihlášek...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <h2 className="truncate text-3xl section-title font-bold font-['Dancing_Script'] text-[#21435F] tracking-tight">
          Spolu v Kondici ({count})
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Hledat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[#21435F]/20 rounded-lg focus:ring-[#21435F] focus:border-[#21435F] transition bg-white text-base w-full md:w-64"
            />
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-[#21435F] text-white rounded-lg hover:bg-[#21435F]/90 transition-colors"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_0.8fr] gap-x-4 px-3 pb-1 text-sm text-[#21435F] font-semibold uppercase tracking-wide select-none">
          <span>Jméno</span>
          <span>Email</span>
          <span>Telefon</span>
          <span>Datum</span>
          <span className="text-right block">Akce</span>
        </div>

        <div className="space-y-2">
          {filteredRegistrations.length === 0 && (
            <div className="text-gray-500 text-center py-8">
              {searchQuery ? 'Nenalezeny žádné přihlášky.' : 'Žádné přihlášky.'}
            </div>
          )}
          {filteredRegistrations.map(reg => (
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

        {!searchQuery && totalCount > ITEMS_PER_PAGE && (
          <div className="flex justify-between items-center gap-4 mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#21435F] text-white hover:bg-[#21435F]/90'
              }`}
            >
              <ChevronLeft size={18} />
              Zpět
            </button>
            <span className="text-sm text-gray-600">
              Zobrazeno {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalCount)} - {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} z {totalCount}
            </span>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage * ITEMS_PER_PAGE >= totalCount}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage * ITEMS_PER_PAGE >= totalCount
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#21435F] text-white hover:bg-[#21435F]/90'
              }`}
            >
              Další
              <ChevronRight size={18} />
            </button>
          </div>
        )}
        {searchQuery && filteredTotalCount > 0 && (
          <div className="flex justify-center items-center mt-4">
            <span className="text-sm text-gray-600">
              Nalezeno {filteredTotalCount} {filteredTotalCount === 1 ? 'přihláška' : filteredTotalCount < 5 ? 'přihlášky' : 'přihlášek'}
            </span>
          </div>
        )}
      </div>

      <div className="md:hidden space-y-2">
        {filteredRegistrations.length === 0 && (
          <div className="text-gray-500 text-center py-8">
            {searchQuery ? 'Nenalezeny žádné přihlášky.' : 'Žádné přihlášky.'}
          </div>
        )}
        {filteredRegistrations.map(reg => (
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

        {!searchQuery && totalCount > ITEMS_PER_PAGE && (
          <div className="flex flex-col items-center gap-4 mt-4">
            <span className="text-sm text-gray-600">
              Zobrazeno {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalCount)} - {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} z {totalCount}
            </span>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex-1 justify-center ${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#21435F] text-white hover:bg-[#21435F]/90'
                }`}
              >
                <ChevronLeft size={18} />
                Zpět
              </button>
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage * ITEMS_PER_PAGE >= totalCount}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex-1 justify-center ${
                  currentPage * ITEMS_PER_PAGE >= totalCount
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#21435F] text-white hover:bg-[#21435F]/90'
                }`}
              >
                Další
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
        {searchQuery && filteredTotalCount > 0 && (
          <div className="flex justify-center items-center mt-4">
            <span className="text-sm text-gray-600">
              Nalezeno {filteredTotalCount} {filteredTotalCount === 1 ? 'přihláška' : filteredTotalCount < 5 ? 'přihlášky' : 'přihlášek'}
            </span>
          </div>
        )}
      </div>

      {selectedRegistration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]" />
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 z-[101] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#21435F]">Detail přihlášky</h3>
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
                <label className="text-sm font-medium text-gray-500">Datum odeslání</label>
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
