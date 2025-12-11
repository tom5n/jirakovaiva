import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, User, Users, Briefcase, Crown, Check, ArrowRight, ChevronRight as ChevronRightIcon, Calendar, Mail, Phone } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import NewsNavbar from '@/components/NewsNavbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import SeoHead from '../components/SeoHead'

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
  program: z.string().min(1, 'Program je povinný'),
})

type ReservationFormData = z.infer<typeof reservationSchema>

const allTimeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
]

const weekDays = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']

const packages = [
  {
    title: "Individuální koučink & mentoring",
    price: "od 2 500 Kč / hod",
    description: "Osobní, profesní a mindset coaching vedený online i offline s naprosto individuálním přístupem.",
    icon: User,
  },
  {
    title: "Koučink pro rodiny a rodiče s dětmi",
    price: "od 2 900 Kč / hod",
    description: "Podporuji rodiče, kteří hledají cestu k lepší komunikaci se svými dětmi, řeší krizové situace, rodinné napětí nebo hledají společný jazyk v náročných obdobích. Koučink pomáhá posílit vztahy, pochopení i vzájemnou důvěru.",
    icon: Users,
  },
  {
    title: "Koučink pro začínající podnikatele",
    price: "od 3 200 Kč / hod",
    description: "Pomáhám lidem, kteří se chtějí pustit do vlastního podnikání, najít směr, strategii i sebejistotu. Společně nastavíme kroky, mindset i jasný plán, aby podnikání bylo udržitelné a dávalo smysl.",
    icon: Briefcase,
  },
  {
    title: "Coaching pro ženy a maminky po mateřské",
    price: "od 2 400 Kč / hod",
    description: "Podpora při návratu do práce, při změně kariéry nebo v období, kdy ženy často ztrácí sebevědomí, jistotu a orientaci v pracovním prostředí. Pomáhám jim znovu najít své místo, rytmus a sílu.",
    icon: Crown,
  },
  {
    title: "Leadership koučink a firemní mentoring",
    price: "od 4 500 Kč / hod",
    description: "Práce s lídry, manažery a týmy na zvyšování výkonu, sebevědomí, komunikace a firemní kultury. Podpora při řízení lidí, motivaci a práci s tlakem i zodpovědností.",
    icon: Briefcase,
  },
  {
    title: "Týmový rozvoj a facilitace",
    price: "od 6 900 Kč / hod",
    description: "Rozvojové workshopy, podpora týmů v komunikaci, spolupráci, řešení konfliktů a budování společné strategie. Posiluji důvěru, respekt i efektivitu ve skupinách.",
    icon: Users,
  },
  {
    title: "Exkluzivní Premium Balíček",
    price: "75 000 Kč",
    description: "Tento 3měsíční transformační program je určen pro ty, kteří chtějí udělat zásadní životní nebo profesní změnu a potřebují jasný směr, podporu a vedení.",
    icon: Crown,
  },
];

export default function Reservation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [workingHour, setWorkingHour] = useState<WorkingHour | null>(null)
  const [workingHoursAll, setWorkingHoursAll] = useState<WorkingHour[]>([])
  const [phoneInput, setPhoneInput] = useState('');
  const [isRezitHovered, setIsRezitHovered] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(1);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  })

  const formValues = watch()

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setValue('date', date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setValue('time', time)
  }

  const handleProgramSelect = (program: string) => {
    setSelectedProgram(program)
    setValue('program', program)
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
    // Ochrana proti duplikátním odesláním
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true)
    const { firstName, lastName, email, phone, date, time, program } = data
    const dateObj = new Date(date);
    // Uložím datum jako YYYY-MM-DD v lokálním čase
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    // Kontrola duplikátu - zkontroluj, zda už neexistuje rezervace se stejným datem, časem a emailem
    const { data: existingReservation } = await supabase
      .from('reservations')
      .select('id')
      .eq('date', dateStr)
      .eq('time', time)
      .eq('email', email)
      .eq('status', 'pending')
      .maybeSingle();

    if (existingReservation) {
      setIsSubmitting(false);
      alert('Rezervace s tímto datem, časem a emailem již existuje. Prosím zkontrolujte své rezervace.');
      return;
    }

    const { error } = await supabase.from('reservations').insert([
      {
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone.replace(/\s/g, ''),
        date: dateStr, // přesně YYYY-MM-DD
        time,
        program: program || null,
        status: 'pending',
      },
    ])
    
    if (error) {
      setIsSubmitting(false);
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
            program,
          }),
        });
      } catch (e) {
        // případně logovat chybu
      }
      
      // Reset formuláře a návrat na krok 1
      reset();
      setSelectedProgram('');
      setSelectedDate('');
      setSelectedTime('');
      setPhoneInput('');
      setCurrentStep(1);
      setIsSubmitting(false);
      
      alert('Rezervace byla úspěšně odeslána!')
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
    if (!selectedDate) {
      const today = new Date();
      today.setHours(0,0,0,0);
      const todayIso = today.toISOString();
      setSelectedDate(todayIso);
      setValue('date', todayIso);
    }
  }, []);

  // Načti program z location state a automaticky ho vyber
  useEffect(() => {
    const programFromState = location.state?.program;
    if (programFromState) {
      // Ověř, že program existuje v seznamu balíčků
      const programExists = packages.some(pkg => pkg.title === programFromState);
      if (programExists) {
        setSelectedProgram(programFromState);
        setValue('program', programFromState);
      }
      // Vyčisti state, aby se při refreshi neopakovalo
      window.history.replaceState({}, document.title);
    }
  }, [location.state, setValue]);

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

  const renderProgressIndicator = () => (
    <div className="flex items-center mb-8 w-full">
      {[1, 2, 3, 4].map((step, index) => {
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        return (
          <React.Fragment key={step}>
            <div className="flex items-center justify-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold font-['Montserrat'] transition-all duration-300 ${
                  isActive
                    ? 'bg-[#21435F] text-white'
                    : isCompleted
                    ? 'bg-[#21435F] text-white'
                    : 'bg-transparent border-2 border-[#21435F]/30 text-[#21435F]/50'
                }`}
              >
                {isCompleted ? <Check size={20} /> : step}
              </div>
            </div>
            {index < 3 && (
              <div className="flex items-center justify-center flex-1">
                <ChevronRightIcon
                  size={32}
                  strokeWidth={2.5}
                  className={`transition-colors duration-300 ${
                    step < currentStep ? 'text-[#21435F]' : 'text-[#21435F]/30'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  const renderStep1 = () => (
    <div className="p-8">
      {renderProgressIndicator()}
      
      <h2 className="text-2xl font-semibold text-[#21435F] mb-2 font-['Montserrat'] text-center">Výběr programu</h2>
      <p className="text-base text-gray-600 mb-8 font-['Montserrat'] text-center">Vyberte si program, který si přejete rezervovat</p>
      
      <div className="space-y-4 mb-8">
        {packages.map((pkg, index) => {
          const Icon = pkg.icon;
          const isSelected = selectedProgram === pkg.title;
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleProgramSelect(pkg.title)}
              className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-[#21435F] bg-[#21435F]/5 shadow-md'
                  : 'border-[#21435F]/20 bg-white hover:border-[#21435F]/40 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-[#21435F] text-white' : 'bg-[#21435F]/10 text-[#21435F]'
                }`}>
                  {isSelected ? <Check size={24} /> : <Icon size={24} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[#21435F] font-['Montserrat']">{pkg.title}</h3>
                    <span className="text-base text-gray-600 font-['Montserrat']">{pkg.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-['Montserrat'] leading-relaxed">{pkg.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          disabled={!selectedProgram}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 font-['Montserrat'] ${
            selectedProgram
              ? 'bg-[#21435F] text-white hover:bg-[#21435F]/90 shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Další
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="p-8">
      {renderProgressIndicator()}
      
      <h2 className="text-2xl font-semibold text-[#21435F] mb-2 font-['Montserrat'] text-center">Výběr data a času</h2>
      <p className="text-base text-gray-600 mb-8 font-['Montserrat'] text-center">Zvolte den a čas vaší rezervace</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Kalendář */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={prevMonth}
              className="p-2 hover:bg-[#21435F]/10 rounded-lg transition-colors text-[#21435F]"
            >
              <ChevronLeft size={24} />
            </button>
            <h3 className="text-lg font-semibold text-[#21435F] font-['Montserrat']">
              {(() => {
                const label = currentMonth.toLocaleDateString('cs-CZ', { month: 'long', year: 'numeric' });
                return label.charAt(0).toUpperCase() + label.slice(1);
              })()}
            </h3>
            <button
              type="button"
              onClick={nextMonth}
              className="p-2 hover:bg-[#21435F]/10 rounded-lg transition-colors text-[#21435F]"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-[#21435F]/70 py-2 font-['Montserrat']">
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
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-lg text-center text-base font-normal transition-colors font-['Montserrat'] ${
                    !date ? 'invisible' :
                    selectedDate === date?.toISOString()
                      ? 'bg-[#21435F] text-white shadow-md'
                      : isToday && isDisabled
                        ? 'outline outline-2 outline-[#21435F] bg-gray-100 text-gray-400 cursor-not-allowed'
                        : isToday
                          ? 'outline outline-2 outline-[#21435F] text-[#21435F]'
                          : isDisabled
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'hover:bg-[#21435F]/10 text-[#21435F] border border-[#21435F]/20'
                  }`}
                >
                  {date?.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Časové sloty */}
        <div>
          <h3 className="text-lg font-semibold text-[#21435F] mb-6 font-['Montserrat']">Vyberte čas</h3>
          <div className="grid grid-cols-3 gap-3">
            {(() => {
              if (timeSlots.length === 0) {
                const isTodaySelected = selectedDate && (new Date(selectedDate)).toDateString() === (new Date()).toDateString();
                return <div className="col-span-3 text-center text-gray-400 font-['Montserrat']">{isTodaySelected ? 'Dnes už není možné vytvořit rezervaci.' : 'V tento den není možné vytvořit rezervaci.'}</div>;
              }
              // Filtruj pouze budoucí a volné časy
              const available = timeSlots.filter(time => {
                const isPast = selectedDate && isPastTime(selectedDate, time);
                const isBooked = bookedTimes.includes(time);
                return !isPast && !isBooked;
              });
              if (available.length === 0) {
                const isToday = selectedDate && (new Date(selectedDate)).toDateString() === (new Date()).toDateString();
                return <div className="col-span-3 text-center text-gray-400 font-['Montserrat']">{isToday ? 'Dnes už není možné vytvořit rezervaci.' : 'V tento den není možné vytvořit rezervaci.'}</div>;
              }
              return available.map(time => (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleTimeSelect(time)}
                  className={`p-3 rounded-xl text-center transition-all font-medium text-base font-['Montserrat'] ${
                    selectedTime === time
                      ? 'bg-[#21435F] text-white shadow-md'
                      : 'bg-white hover:bg-[#21435F]/10 text-[#21435F] border border-[#21435F]/20'
                  }`}
                >
                  {time}
                </button>
              ));
            })()}
          </div>
          {errors.time && (
            <p className="mt-2 text-sm text-red-600 font-['Montserrat']">{errors.time.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 font-['Montserrat'] border-2 border-[#21435F] text-[#21435F] hover:bg-[#21435F]/10"
        >
          <ArrowLeft size={18} />
          Zpět
        </button>
        <button
          type="button"
          onClick={() => {
            if (selectedDate && selectedTime) {
              setCurrentStep(3);
            }
          }}
          disabled={!selectedDate || !selectedTime}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 font-['Montserrat'] ${
            selectedDate && selectedTime
              ? 'bg-[#21435F] text-white hover:bg-[#21435F]/90 shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Další
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="p-8">
      {renderProgressIndicator()}
      
      <h2 className="text-2xl font-semibold text-[#21435F] mb-2 font-['Montserrat'] text-center">Kontaktní údaje</h2>
      <p className="text-base text-gray-600 mb-8 font-['Montserrat'] text-center">Zadejte prosím své kontaktní údaje pro potvrzení rezervace</p>
      
      <div className="space-y-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#21435F] mb-2 font-['Montserrat']">Jméno *</label>
            <input
              type="text"
              {...register('firstName')}
              placeholder="Vaše jméno"
              className="w-full h-12 p-3 border border-[#21435F]/20 rounded-xl focus:ring-[#21435F] focus:border-[#21435F] transition bg-white text-base font-['Montserrat']"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600 font-['Montserrat']">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#21435F] mb-2 font-['Montserrat']">Příjmení *</label>
            <input
              type="text"
              {...register('lastName')}
              placeholder="Vaše příjmení"
              className="w-full h-12 p-3 border border-[#21435F]/20 rounded-xl focus:ring-[#21435F] focus:border-[#21435F] transition bg-white text-base font-['Montserrat']"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600 font-['Montserrat']">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#21435F] mb-2 font-['Montserrat']">E-mail *</label>
          <input
            type="email"
            {...register('email')}
            placeholder="vas@email.cz"
            className="w-full h-12 p-3 border border-[#21435F]/20 rounded-xl focus:ring-[#21435F] focus:border-[#21435F] transition bg-white text-base font-['Montserrat']"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 font-['Montserrat']">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#21435F] mb-2 font-['Montserrat']">Telefon *</label>
          <div className="flex gap-2">
            <div className="flex-shrink-0">
              <div className="h-12 px-4 border border-[#21435F]/20 rounded-xl bg-gray-50 flex items-center text-[#21435F] font-medium font-['Montserrat']">
                +420
              </div>
            </div>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9 ]*"
              maxLength={11}
              value={phoneInput}
              onChange={handlePhoneChange}
              placeholder="123 456 789"
              className="flex-1 h-12 p-3 border border-[#21435F]/20 rounded-xl focus:ring-[#21435F] focus:border-[#21435F] transition bg-white text-base tracking-widest font-['Montserrat']"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 font-['Montserrat']">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 font-['Montserrat'] border-2 border-[#21435F] text-[#21435F] hover:bg-[#21435F]/10"
        >
          <ArrowLeft size={18} />
          Zpět
        </button>
        <button
          type="button"
          onClick={() => {
            // Validace formuláře
            if (selectedProgram && selectedDate && selectedTime) {
              setCurrentStep(4);
            }
          }}
          disabled={!selectedProgram || !selectedDate || !selectedTime}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 font-['Montserrat'] ${
            selectedProgram && selectedDate && selectedTime
              ? 'bg-[#21435F] text-white hover:bg-[#21435F]/90 shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Další
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('cs-CZ', options);
  };

  const getPackagePrice = (program: string) => {
    const pkg = packages.find(p => p.title === program);
    return pkg ? pkg.price : '';
  };

  const getPackageIcon = (program: string) => {
    const pkg = packages.find(p => p.title === program);
    return pkg ? pkg.icon : User;
  };

  const renderStep4 = () => {
    const formValues = watch();
    return (
      <div className="p-8">
        {renderProgressIndicator()}
        
        <h2 className="text-2xl font-semibold text-[#21435F] mb-2 font-['Montserrat'] text-center">Shrnutí objednávky</h2>
        <p className="text-base text-gray-600 mb-8 font-['Montserrat'] text-center">Zkontrolujte údaje před odesláním rezervace</p>
        
        <div className="border border-[#21435F]/20 rounded-xl bg-white p-6 mb-8">
          <div className="space-y-6">
            {/* Program */}
            {selectedProgram && (() => {
              const ProgramIcon = getPackageIcon(selectedProgram);
              return (
                <div className="flex items-start gap-4 pb-6 border-b border-[#21435F]/10">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#21435F]/10 text-[#21435F] flex items-center justify-center">
                    <ProgramIcon size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#21435F] mb-2 font-['Montserrat']">Program</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-base text-gray-700 font-['Montserrat']">{selectedProgram}</p>
                      <span className="text-base text-gray-600 font-['Montserrat']">{getPackagePrice(selectedProgram)}</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Datum a čas */}
            {selectedDate && selectedTime && (
              <div className="flex items-start gap-4 pb-6 border-b border-[#21435F]/10">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#21435F]/10 text-[#21435F] flex items-center justify-center">
                  <Calendar size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#21435F] mb-1 font-['Montserrat']">Datum a čas</h3>
                  <p className="text-base text-gray-700 font-['Montserrat']">{formatDate(selectedDate)}</p>
                  <p className="text-base text-gray-700 font-['Montserrat']">{selectedTime}</p>
                </div>
              </div>
            )}

            {/* Kontaktní údaje */}
            <div className="flex items-start gap-4 pb-6 border-b border-[#21435F]/10">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#21435F]/10 text-[#21435F] flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#21435F] mb-2 font-['Montserrat']">Kontaktní údaje</h3>
                <div className="space-y-1">
                  <p className="text-base text-gray-700 font-['Montserrat']">
                    {formValues.firstName && formValues.lastName ? `${formValues.firstName} ${formValues.lastName}` : ''}
                  </p>
                  <p className="text-base text-gray-700 font-['Montserrat']">
                    {formValues.email || ''}
                  </p>
                  <p className="text-base text-gray-700 font-['Montserrat']">
                    {phoneInput ? `+420 ${phoneInput}` : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Poznámka (volitelná) */}
            <div>
              <label className="block text-sm font-medium text-[#21435F] mb-2 font-['Montserrat']">
                Poznámka (volitelná)
              </label>
              <textarea
                placeholder="Máte nějaké speciální požadavky?"
                rows={4}
                className="w-full p-3 border border-[#21435F]/20 rounded-xl focus:ring-[#21435F] focus:border-[#21435F] transition bg-white text-base font-['Montserrat'] resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 font-['Montserrat'] border-2 border-[#21435F] text-[#21435F] hover:bg-[#21435F]/10"
          >
            <ArrowLeft size={18} />
            Zpět
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 font-['Montserrat'] bg-[#21435F] text-white hover:bg-[#21435F]/90 shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Odesílání...' : 'Rezervovat'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <SeoHead
        title="Rezervace schůzky | Ivana Jiráková"
        description="Rezervujte si termín na kosmetiku nebo konzultaci s Ivanou Jirákovou. Rychlá online rezervace, osobní přístup a moderní salon."
        url="https://www.jirakovaiva.cz/rezervace"
      />
      <div className="min-h-screen bg-[#FFD1C1]">
        <NewsNavbar />
        <main>
          <section className="py-16 md:py-24 bg-[#F3E8E2]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8 pt-8 sm:pt-0">
                <h2 className="section-title inline-block text-[#21435F] font-['Dancing_Script'] text-4xl md:text-5xl mb-4 animate-fade-in">
                  Rezervace schůzky
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto animate-fade-in">
                  Vyberte si termín a čas, který vám vyhovuje. Ráda s vámi proberu možnosti spolupráce a pomohu vám na vaší cestě k úspěchu.
                </p>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white rounded-2xl shadow-lg border border-[#21435F] overflow-hidden animate-fade-in max-w-4xl mx-auto">
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                  {currentStep === 4 && renderStep4()}
                </div>
              </form>
              
              {/* Rezit Logo */}
              <div className="mt-8 flex justify-center animate-fade-in">
                <a
                  href="https://rezit.cz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-opacity hover:opacity-90 cursor-pointer"
                  onMouseEnter={() => setIsRezitHovered(true)}
                  onMouseLeave={() => setIsRezitHovered(false)}
                >
                  <div className="bg-white/80 backdrop-blur-sm border border-[#478df6]/25 hover:border-[#478df6]/50 rounded-full px-4 py-2 flex items-center gap-3 transition-colors duration-300">
                    <div className="relative">
                      <img
                        src="/images/rezit/rezitdark1.webp"
                        alt="Rezit - Rezervační systémy"
                        className={`rezit-logo h-auto max-w-[42px] md:max-w-[50px] transition-opacity duration-500 ${
                          isRezitHovered ? 'opacity-0' : 'opacity-100'
                        }`}
                      />
                      <img
                        src="/images/rezit/rezitdark2.webp"
                        alt="Rezit - Rezervační systémy"
                        className={`rezit-logo absolute top-0 left-0 h-auto max-w-[42px] md:max-w-[50px] transition-opacity duration-500 ${
                          isRezitHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </div>
                    <span className="text-xs md:text-sm text-[#21435F]/70 font-outfit font-light">|</span>
                    <span className="text-xs md:text-sm text-[#21435F]/70 font-outfit font-light">Rezervační systém bez měsíčních poplatků</span>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
