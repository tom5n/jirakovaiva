import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface WorkingHour {
  weekday: number;
  start_time: string;
  end_time: string;
  enabled: boolean;
}

const days = [
  { key: 1, label: 'Pondělí' },
  { key: 2, label: 'Úterý' },
  { key: 3, label: 'Středa' },
  { key: 4, label: 'Čtvrtek' },
  { key: 5, label: 'Pátek' },
  { key: 6, label: 'Sobota' },
  { key: 7, label: 'Neděle' },
];

export default function WorkingHours() {
  const [hours, setHours] = useState<WorkingHour[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string|null>(null);

  useEffect(() => {
    const fetchHours = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('working_hours')
        .select('*')
        .order('weekday');

      if (error) {
        console.error('Error fetching working hours:', error);
        setToast('Chyba při načítání pracovní doby.');
        return;
      }

      setHours(
        days.map(d => {
          const found = data?.find((x: any) => x.weekday === d.key);
          return found ? {
            weekday: d.key,
            start_time: found.start_time ? found.start_time.substring(0, 5) : '',
            end_time: found.end_time ? found.end_time.substring(0, 5) : '',
            enabled: found.enabled ?? true
          } : {
            weekday: d.key,
            start_time: '',
            end_time: '',
            enabled: true
          };
        })
      );
      setLoading(false);
    };

    fetchHours();
  }, []);

  const handleChange = (weekday: number, field: 'start_time'|'end_time', value: string) => {
    setHours(prev => prev.map(h => 
      h.weekday === weekday 
        ? { ...h, [field]: value } 
        : h
    ));
  };

  const handleToggle = (weekday: number) => {
    setHours(prev => prev.map(h => 
      h.weekday === weekday 
        ? { ...h, enabled: !h.enabled } 
        : h
    ));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    
    const dataToSave = hours.map(h => ({
      weekday: h.weekday,
      start_time: h.start_time || null,
      end_time: h.end_time || null,
      enabled: h.enabled
    }));

    console.log('Ukládám všechna data:', dataToSave);

    const { error } = await supabase
      .from('working_hours')
      .upsert(dataToSave, { 
        onConflict: 'weekday',
        ignoreDuplicates: false
      });

    setSaving(false);
    if (error) {
      console.error('Detailní chyba při ukládání:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      setToast(`Chyba při ukládání: ${error.message}`);
    } else {
      setToast('Pracovní doba uložena.');
    }
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#21435F] font-['Dancing_Script']">Nastavení pracovní doby</h2>
        <button
          type="button"
          onClick={handleSaveAll}
          disabled={saving}
          className={`px-6 py-2 rounded-xl font-medium shadow-md transition-all duration-200 text-white ${saving ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#21435F] hover:bg-[#18324a]'}`}
        >
          {saving ? 'Ukládání...' : 'Uložit vše'}
        </button>
      </div>
      {loading ? (
        <div className="text-gray-500">Načítání...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-[600px] w-full bg-white shadow border border-[#21435F]/10">
            <thead>
              <tr className="text-[#21435F] text-sm uppercase tracking-wide">
                <th className="py-3 px-4 text-left font-semibold">Den</th>
                <th className="py-3 px-4 text-center font-semibold">Od</th>
                <th className="py-3 px-4 text-center font-semibold">Do</th>
                <th className="py-3 px-4 text-right font-semibold pr-6">Aktivní</th>
              </tr>
            </thead>
            <tbody>
              {days.map(day => {
                const h = hours.find(x => x.weekday === day.key) || { 
                  weekday: day.key,
                  start_time: '', 
                  end_time: '', 
                  enabled: true 
                };
                return (
                  <tr key={day.key} className={`border-b border-[#21435F]/10 ${h.enabled ? '' : 'bg-gray-50 text-gray-400'}`}>
                    <td className="py-3 px-4 font-medium text-[#21435F] text-base">{day.label}</td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="time"
                        value={h.start_time}
                        onChange={e => handleChange(day.key, 'start_time', e.target.value)}
                        className="border rounded-lg px-3 py-1 text-base focus:ring-[#21435F] focus:border-[#21435F] bg-white shadow-sm w-28 mx-auto"
                        required={h.enabled}
                        disabled={!h.enabled}
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="time"
                        value={h.end_time}
                        onChange={e => handleChange(day.key, 'end_time', e.target.value)}
                        className="border rounded-lg px-3 py-1 text-base focus:ring-[#21435F] focus:border-[#21435F] bg-white shadow-sm w-28 mx-auto"
                        required={h.enabled}
                        disabled={!h.enabled}
                      />
                    </td>
                    <td className="py-3 px-4 text-right pr-6">
                      <button
                        type="button"
                        onClick={() => handleToggle(day.key)}
                        className={`w-11 h-6 rounded-full border-2 flex items-center transition-colors duration-200 ml-auto ${h.enabled ? 'bg-[#21435F]/90 border-[#21435F]' : 'bg-gray-200 border-gray-300'}`}
                        title={h.enabled ? 'Den je aktivní' : 'Den je vypnutý'}
                      >
                        <span className={`block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ${h.enabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[200] px-6 py-3 rounded-2xl shadow-lg font-['Montserrat'] text-base animate-fade-in transition-all bg-[#21435F] text-white">
          {toast}
        </div>
      )}
    </div>
  );
} 