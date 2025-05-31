import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import NewsNavbar from '@/components/NewsNavbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

type WorkingHour = {
  weekday: number;
  start_time: string | null;
  end_time: string | null;
  enabled: boolean;
};

const reservationSchema = z.object({
  firstName: z.string().min(1, 'Jméno je povinné'),
  lastName: z.string().min(1, 'Příjmení je povinné'),
  email: z.string().email('Neplatný email'),
  phone: z.string().min(1, 'Telefon je povinný'),
  date: z.string().min(1, 'Datum je povinné'),
  time: z.string().min(1, 'Čas je povinný'),
})

type ReservationFormData = z.infer<typeof reservationSchema>

const allTimeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
]

const weekDays = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']

export default function Reservation() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [workingHour, setWorkingHour] = useState<WorkingHour | null>(null)
  const [workingHoursAll, setWorkingHoursAll] = useState<WorkingHour[]>([])
  const [phoneInput, setPhoneInput] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  })

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setValue('date', date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setValue('time', time)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // jen čísla
    if (value.length > 9) value = value.slice(0, 9);
    // Formát XXX XXX XXX
    let formatted = value;
    if (value.length > 3 && value.length <= 6) {
      formatted = value.slice(0, 3) + ' ' + value.slice(3);
    } else if (value.length > 6) {
      formatted = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
    }
    setPhoneInput(formatted);
    setValue('phone', formatted);
  };

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true)
    const { firstName, lastName, email, phone, date, time } = data
    const dateObj = new Date(date);
    // Uložím datum jako YYYY-MM-DD v lokálním čase
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const { error } = await supabase.from('reservations').insert([
      {
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone.replace(/\s/g, ''),
        date: dateStr, // přesně YYYY-MM-DD
        time,
        status: 'pending',
      },
    ])
    setIsSubmitting(false)
    if (error) {
      alert('Chyba při ukládání rezervace: ' + error.message)
    } else {
      // Odeslat email na info@jirakovaiva.cz
      try {
        await fetch('/api/notify-reservation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            date: dateStr,
            time,
          }),
        });
      } catch (e) {
        // případně logovat chybu
      }
      alert('Rezervace byla úspěšně odeslána!')
      // případně reset formuláře nebo redirect
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const days = []

    // Upraveno: Zarovnání na pondělí (první sloupec)
    const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    for (let i = 0; i < offset; i++) {
      days.push(null)
    }

    // Přidání dnů v měsíci
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      d.setHours(0, 0, 0, 0);
      days.push(d)
    }

    return days
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  // Zjisti den v týdnu (1=pondělí, 7=neděle)
  const getWeekday = (dateStr: string) => {
    const d = new Date(dateStr)
    let day = d.getDay();
    if (day === 0) day = 7; // neděle
    return day;
  }

  // Načti pracovní dobu pro vybraný den
  useEffect(() => {
    if (!selectedDate) {
      setWorkingHour(null);
      return;
    }
    const fetchWorkingHour = async () => {
      const weekday = getWeekday(selectedDate);
      const { data, error } = await supabase
        .from('working_hours')
        .select('*')
        .eq('weekday', weekday)
        .single();
      if (!error && data) {
        setWorkingHour(data);
      } else {
        setWorkingHour(null);
      }
    };
    fetchWorkingHour();
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedDate) return;
    const fetchBooked = async () => {
      const dateStr = new Date(selectedDate).toISOString().slice(0, 10);
      const { data, error } = await supabase
        .from('reservations')
        .select('time')
        .eq('date', dateStr)
        .eq('status', 'confirmed');
      if (!error && data) {
        setBookedTimes(data.map((r: any) => r.time));
      }
    };
    fetchBooked();
  }, [selectedDate]);

  // Vygeneruj časové sloty podle pracovní doby
  const getAvailableTimeSlots = () => {
    if (!workingHour || !workingHour.enabled || !workingHour.start_time || !workingHour.end_time) return [];
    const start = parseInt(workingHour.start_time.split(':')[0], 10);
    const end = parseInt(workingHour.end_time.split(':')[0], 10);
    return allTimeSlots.filter(slot => {
      const hour = parseInt(slot.split(':')[0], 10);
      return hour >= start && hour < end;
    });
  };
  const timeSlots = getAvailableTimeSlots();

  // Načti všechny pracovní dny v měsíci pro zvýraznění zavřených dnů
  useEffect(() => {
    const fetchAll = async () => {
      const { data, error } = await supabase
        .from('working_hours')
        .select('*');
      if (!error && data) setWorkingHoursAll(data);
    };
    fetchAll();
  }, []);

  // Nastav automaticky dnešní den po načtení stránky
  useEffect(() => {
    const initializeCalendar = async () => {
      if (!selectedDate) {
        const today = new Date();
        today.setHours(0,0,0,0);
        const todayIso = today.toISOString();
        setSelectedDate(todayIso);
        setValue('date', todayIso);
      }

      // Zkontroluj dostupné termíny v aktuálním měsíci
      const days = getDaysInMonth(currentMonth);
      let hasAvailableSlots = false;

      for (const date of days) {
        if (!date) continue;
        
        const isToday = date && date.toDateString() === new Date().toDateString();
        const isPast = date && !isToday && date < new Date(new Date().setHours(0,0,0,0));
        const isClosed = isClosedDay(date);
        
        if (isPast || isClosed) continue;

        // Zkontroluj pracovní dobu pro tento den
        const weekday = getWeekday(date.toISOString());
        const { data: workingHour } = await supabase
          .from('working_hours')
          .select('*')
          .eq('weekday', weekday)
          .single();

        if (!workingHour || !workingHour.enabled || !workingHour.start_time || !workingHour.end_time) continue;

        // Zkontroluj obsazené časy pro tento den
        const dateStr = date.toISOString().slice(0, 10);
        const { data: reservations } = await supabase
          .from('reservations')
          .select('time')
          .eq('date', dateStr)
          .eq('status', 'confirmed');

        const bookedTimes = reservations?.map(r => r.time) || [];
        const availableTimeSlots = getAvailableTimeSlots().filter(time => !bookedTimes.includes(time));

        if (availableTimeSlots.length > 0) {
          hasAvailableSlots = true;
          break;
        }
      }

      if (!hasAvailableSlots) {
        const nextMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
        setCurrentMonth(nextMonthDate);
      }
    };

    initializeCalendar();
  }, []); // Spustí se pouze při načtení komponenty

  // Pomocná funkce: je den zavřený?
  const isClosedDay = (date: Date | null) => {
    if (!date) return false;
    let day = date.getDay();
    if (day === 0) day = 7;
    const wh = workingHoursAll.find(x => x.weekday === day);
    return wh ? !wh.enabled : false;
  };

  // Pomocná funkce: je čas v minulosti?
  const isPastTime = (dateStr: string, time: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    if (date < new Date(now.setHours(0,0,0,0))) return true; // minulý den
    if (date > new Date(new Date().setHours(23,59,59,999))) return false; // budoucí den
    // dnes: porovnej čas
    const [h, m] = time.split(':').map(Number);
    const slotDate = new Date(dateStr);
    slotDate.setHours(h, m, 0, 0);
    return slotDate < new Date();
  };

  return (
    <div className="min-h-screen bg-[#FFD1C1]">
      <NewsNavbar />
      <main>
        <section className="py-16 md:py-24 bg-[#F3E8E2]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="section-title inline-block text-[#21435F] font-['Dancing_Script'] text-4xl md:text-5xl mb-4 animate-fade-in">
                Rezervace schůzky
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto animate-fade-in">
                Vyberte si termín a čas, který vám vyhovuje. Ráda s vámi proberu možnosti spolupráce a pomohu vám na vaší cestě k úspěchu.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white rounded-2xl shadow-lg border border-[#21435F] overflow-hidden animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Kalendář */}
                  <div className="p-6 min-h-[420px] border-b lg:border-b-0 lg:border-r border-[#21435F]/20">
                    <h2 className="text-xl font-semibold text-[#21435F] mb-6 font-['Montserrat']">Vyberte datum</h2>
                    <div className="flex items-center justify-between mb-6">
                      <button
                        type="button"
                        onClick={prevMonth}
                        className="p-2 hover:bg-[#21435F]/10 rounded-lg transition-colors text-[#21435F]"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <h2 className="text-lg font-semibold text-[#21435F]">
                        {(() => {
                          const label = currentMonth.toLocaleDateString('cs-CZ', { month: 'long', year: 'numeric' });
                          return label.charAt(0).toUpperCase() + label.slice(1);
                        })()}
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
                        const isToday = date && date.toDateString() === new Date().toDateString();
                        const isPast = date && !isToday && date < new Date(new Date().setHours(0,0,0,0));
                        const isClosed = date && isClosedDay(date);
                        const isDisabled = (!date || (isPast && !isToday) || isClosed);
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => date && handleDateSelect(date.toISOString())}
                            disabled={isDisabled}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-lg text-center text-lg font-normal transition-colors
                              ${!date ? 'invisible' :
                                selectedDate === date?.toISOString()
                                  ? 'bg-[#21435F] text-white shadow-md'
                                  : isToday && isDisabled
                                    ? 'outline outline-2 outline-[#21435F] bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : isToday
                                    ? 'outline outline-2 outline-[#21435F] text-[#21435F]'
                                    : isDisabled
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'hover:bg-[#21435F]/10 text-[#21435F]'}
                            `}
                          >
                            {date?.getDate()}
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
                        <span className="w-4 h-4 rounded-lg bg-gray-100 border border-gray-300 inline-block"></span>
                        <span>Nedostupný den</span>
                      </div>
                    </div>
                  </div>

                  {/* Časové sloty */}
                  <div className="p-6 min-h-[420px] border-b lg:border-b-0 lg:border-r border-[#21435F]/20">
                    <h2 className="text-xl font-semibold text-[#21435F] mb-6 font-['Montserrat']">Vyberte čas</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {(() => {
                        if (timeSlots.length === 0) {
                          const isTodaySelected = selectedDate && (new Date(selectedDate)).toDateString() === (new Date()).toDateString();
                          return <div className="col-span-2 text-center text-gray-400">{isTodaySelected ? 'Dnes už není možné vytvořit rezervaci.' : 'V tento den není možné vytvořit rezervaci.'}</div>;
                        }
                        // Filtruj pouze budoucí a volné časy
                        const available = timeSlots.filter(time => {
                          const isPast = selectedDate && isPastTime(selectedDate, time);
                          const isBooked = bookedTimes.includes(time);
                          return !isPast && !isBooked;
                        });
                        if (available.length === 0) {
                          // Pokud je dnes a všechny časy už proběhly, zobraz hlášku
                          const isToday = selectedDate && (new Date(selectedDate)).toDateString() === (new Date()).toDateString();
                          return <div className="col-span-2 text-center text-gray-400">{isToday ? 'Dnes už není možné vytvořit rezervaci.' : 'V tento den není možné vytvořit rezervaci.'}</div>;
                        }
                        return available.map(time => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => handleTimeSelect(time)}
                            className={`p-3 rounded-xl text-center transition-all font-medium text-base
                              ${selectedTime === time
                                ? 'bg-[#21435F] text-white shadow-md'
                                : 'bg-white hover:bg-[#21435F]/10 text-[#21435F] border border-[#21435F]/20'}
                            `}
                          >
                            {time}
                          </button>
                        ));
                      })()}
                    </div>
                    {errors.time && (
                      <p className="mt-2 text-sm text-red-600">{errors.time.message}</p>
                    )}
                  </div>

                  {/* Formulář */}
                  <div className="p-6 min-h-[420px]">
                    <h2 className="text-xl font-semibold text-[#21435F] mb-6 font-['Montserrat']">Osobní údaje</h2>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-[#21435F] mb-1">Jméno *</label>
                        <input
                          type="text"
                          {...register('firstName')}
                          className="w-full h-12 p-3 border border-[#21435F]/20 rounded-xl focus:ring-[#21435F] focus:border-[#21435F] transition bg-white text-base"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#21435F] mb-1">Příjmení *</label>
                        <input
                          type="text"
                          {...register('lastName')}
                          className="w-full h-12 p-3 border border-[#21435F]/20 rounded-xl focus:ring-[#21435F] focus:border-[#21435F] transition bg-white text-base"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#21435F] mb-1">Email *</label>
                        <input
                          type="email"
                          {...register('email')}
                          className="w-full h-12 p-3 border border-[#21435F]/20 rounded-xl focus:ring-[#21435F] focus:border-[#21435F] transition bg-white text-base"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#21435F] mb-1">Telefon *</label>
                        <input
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9 ]*"
                          maxLength={11} // 9 číslic + 2 mezery
                          value={phoneInput}
                          onChange={handlePhoneChange}
                          className="w-full h-12 p-3 border border-[#21435F]/20 rounded-xl focus:ring-[#21435F] focus:border-[#21435F] transition bg-white text-base tracking-widest"
                          placeholder="123 456 789"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                      </div>
                      <div className="flex justify-end mt-6">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-[#21435F] text-white hover:bg-[#21435F]/90 transition-all duration-300 px-8 py-4 rounded-xl font-medium shadow-md hover:shadow-lg w-full"
                        >
                          {isSubmitting ? 'Odesílání...' : 'Rezervovat schůzku'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 