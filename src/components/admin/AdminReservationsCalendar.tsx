import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const weekDays = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
const monthNames = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
];

export default function AdminReservationsCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedReservation, setSelectedReservation] = useState<any | null>(null);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [daysWithReservations, setDaysWithReservations] = useState<Set<string>>(new Set());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];
    for (let i = 1; i < (firstDayOfMonth === 0 ? 7 : firstDayOfMonth); i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      d.setHours(0, 0, 0, 0);
      days.push(d);
    }
    return days;
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const selectedDateStr = selectedDate ? new Date(selectedDate).toISOString().slice(0, 10) : '';

  useEffect(() => {
    if (!selectedDate) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      setSelectedDate(`${year}-${month}-${day}`);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedDate) return;
    const fetchReservations = async () => {
      setLoading(true);
      const dateStr = selectedDate;
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('date', dateStr)
        .eq('status', 'confirmed')
        .order('time', { ascending: true });
      if (!error) setReservations(data || []);
      setLoading(false);
    };
    fetchReservations();
  }, [selectedDate]);

  useEffect(() => {
    const fetchDays = async () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth() + 1;
      const from = `${year}-${String(month).padStart(2, '0')}-01`;
      const to = `${year}-${String(month).padStart(2, '0')}-31`;
      const { data, error } = await supabase
        .from('reservations')
        .select('date')
        .gte('date', from)
        .lte('date', to)
        .eq('status', 'confirmed');
      if (!error && data) {
        const days = new Set(
          data.map((r: any) => {
            if (typeof r.date === 'string') return r.date;
            const d = new Date(r.date);
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
          })
        );
        setDaysWithReservations(days);
      }
    };
    fetchDays();
  }, [currentMonth]);

  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-8">
        {/* Kalendář vlevo */}
        <div className="w-full md:w-1/2 bg-white/80 rounded-2xl shadow p-6 min-h-[420px]">
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={prevMonth}
              className="p-2 hover:bg-[#21435F]/10 rounded-lg transition-colors text-[#21435F]"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-semibold text-[#21435F]">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button
              type="button"
              onClick={nextMonth}
              className="p-2 hover:bg-[#21435F]/10 rounded-lg transition-colors text-[#21435F]"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-base font-medium text-[#21435F]/70 py-2">
                {day}
              </div>
            ))}
            {getDaysInMonth(currentMonth).map((date, index) => {
              const dayNum = date ? date.getDate() : undefined;
              const dateStr = date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : '';
              const isToday = date && date.toDateString() === new Date().toDateString();
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => date && setSelectedDate(dateStr)}
                  disabled={!date}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-lg text-center text-lg font-normal transition-colors flex flex-col items-center justify-center
                    ${!date ? 'invisible' :
                      selectedDate === dateStr
                        ? 'bg-[#21435F] text-white shadow-md'
                        : isToday
                        ? 'outline outline-2 outline-[#21435F] text-[#21435F]'
                        : 'hover:bg-[#21435F]/10 text-[#21435F]'}
                  `}
                >
                  <span className="relative w-full flex flex-col items-center">
                    {dayNum}
                    {dateStr && daysWithReservations.has(dateStr) && (
                      <span className={`mt-1 w-1.5 h-1.5 rounded-full block mx-auto
                        ${selectedDate === dateStr ? 'bg-white' : 'bg-[#21435F]'}`}></span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Vysvětlivky */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#21435F]/80 items-center justify-center text-center">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-lg bg-[#21435F] inline-block"></span>
              <span>Vybraný den</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-lg outline outline-2 outline-[#21435F] inline-block"></span>
              <span>Dnešní den</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-lg inline-block relative">
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#21435F]"></span>
              </span>
              <span>Den s rezervací</span>
            </div>
          </div>
        </div>
        {/* Rezervace na den vpravo */}
        <div className="w-full md:w-1/2 bg-white/80 rounded-2xl shadow p-6 min-h-[420px]">
          <h3 className="text-xl font-semibold text-[#21435F] mb-4 font-['Montserrat']">
            {selectedDate ? (
              <>Rezervace na {selectedDate && new Date(selectedDate).toLocaleDateString('cs-CZ')}</>
            ) : (
              <>Vyberte den v kalendáři</>
            )}
          </h3>
          {selectedDate && loading && (
            <div className="text-gray-500">Načítání rezervací...</div>
          )}
          {selectedDate && !loading && reservations.length === 0 && (
            <div className="text-gray-500">Žádné rezervace na tento den.</div>
          )}
          {selectedDate && !loading && reservations.length > 0 && (
            <ul className="space-y-2">
              {reservations.map((r, i) => (
                <li
                  key={r.id}
                  className="p-3 bg-gray-100 rounded-lg flex flex-row items-center gap-2 sm:grid sm:grid-cols-3 sm:gap-2"
                >
                  <span className="font-medium text-[#21435F] text-left text-sm sm:text-base min-w-[48px] sm:min-w-0 whitespace-nowrap">
                    {r.time}
                  </span>
                  <span
                    className="flex-1 text-center truncate text-sm sm:text-base px-1"
                    title={`${r.first_name} ${r.last_name}`}
                  >
                    <span className="sm:hidden">
                      {(() => {
                        const parts = `${r.first_name} ${r.last_name}`.split(' ');
                        if (parts.length > 1) {
                          return `${parts[0][0]}. ${parts.slice(1).join(' ')}`;
                        }
                        return `${r.first_name} ${r.last_name}`;
                      })()}
                    </span>
                    <span className="hidden sm:inline">{r.first_name} {r.last_name}</span>
                  </span>
                  <span className="text-right flex items-center justify-end gap-1 sm:gap-2 min-w-0">
                    <button type="button" onClick={() => setSelectedReservation(r)} className="ml-2 text-[#21435F] hover:text-[#18324a]" title="Zobrazit detail">
                      <Info size={18} />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
          {!selectedDate && (
            <div className="text-gray-500">Zvolte den pro zobrazení rezervací.</div>
          )}
        </div>
      </div>
      {selectedReservation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]" />
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto z-[101] relative">
            <button onClick={() => { setSelectedReservation(null); setShowCancelForm(false); setCancelReason(''); }} className="absolute top-4 right-4 text-gray-400 hover:text-[#21435F] text-2xl font-bold">×</button>
            {!showCancelForm ? (
              <>
                <h3 className="text-2xl font-bold text-[#21435F] mb-6 text-center">Detail klienta</h3>
                <div className="divide-y divide-gray-200">
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-medium text-[#21435F]">Jméno a příjmení:</span>
                    <span className="text-lg">{selectedReservation.first_name} {selectedReservation.last_name}</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-medium text-[#21435F]">Email:</span>
                    <span className="text-lg">{selectedReservation.email}</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-medium text-[#21435F]">Telefon:</span>
                    <span className="text-lg">{selectedReservation.phone}</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-medium text-[#21435F]">Čas:</span>
                    <span className="text-lg">{selectedReservation.time}</span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="font-medium text-[#21435F]">Datum:</span>
                    <span className="text-lg">{selectedDate && new Date(selectedDate).toLocaleDateString('cs-CZ')}</span>
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <button
                    className="bg-red-600 text-white px-6 py-2 rounded-xl font-medium shadow hover:bg-red-700 transition-colors"
                    onClick={() => setShowCancelForm(true)}
                  >
                    Zrušit rezervaci
                  </button>
                </div>
              </>
            ) : (
              <form
                className="flex flex-col gap-6 mt-2"
                onSubmit={e => { e.preventDefault(); /* zde bude logika pro odeslání */ }}
              >
                <h3 className="text-2xl font-bold text-[#21435F] mb-2 text-center">Zamítnout rezervaci</h3>
                <label className="block text-base font-medium text-[#21435F] mb-1" htmlFor="cancel-reason">Důvod zamítnutí</label>
                <textarea
                  id="cancel-reason"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-[#21435F] focus:border-[#21435F] transition bg-white text-base min-h-[80px]"
                  placeholder="Zadejte důvod zamítnutí..."
                  value={cancelReason}
                  onChange={e => setCancelReason(e.target.value)}
                  required
                />
                <div className="flex gap-4 justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-gray-200 text-[#21435F] font-medium hover:bg-gray-300 transition"
                    onClick={() => { setShowCancelForm(false); setCancelReason(''); }}
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
            )}
          </div>
        </div>
      )}
    </>
  );
} 