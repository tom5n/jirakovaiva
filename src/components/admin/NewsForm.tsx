import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '@/lib/supabase'
import { Image as ImageIcon } from 'lucide-react'

const newsSchema = z.object({
  title: z.string().min(1, 'Název je povinný'),
  description: z.string().min(1, 'Popis je povinný'),
  created_at: z.string().optional(),
})

type NewsFormData = z.infer<typeof newsSchema>

const MAX_WIDTH = 1200;
const MAX_HEIGHT = 800;
const QUALITY = 0.85;

const compressImage = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Vypočítat nové rozměry zachováním poměru stran
      if (width > height) {
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Nelze vytvořit canvas context'));
        return;
      }
      
      // Vykreslit obrázek s vyhlazením
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      
      // Převest na blob s nastavenou kvalitou
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Nelze vytvořit blob'));
          }
        },
        'image/webp',
        QUALITY
      );
    };
    
    img.onerror = () => {
      reject(new Error('Nelze načíst obrázek'));
    };
  });
};

export default function NewsForm() {
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [useToday, setUseToday] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [compressing, setCompressing] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
  })

  const onSubmit = async (data: NewsFormData) => {
    try {
      setLoading(true)
      
      let imageUrl = ''
      if (image) {
        setCompressing(true)
        try {
          const compressedBlob = await compressImage(image)
          const compressedFile = new File([compressedBlob], image.name.replace(/\.[^/.]+$/, '.webp'), {
            type: 'image/webp',
            lastModified: Date.now(),
          })
          
          const fileExt = 'webp'
          const fileName = `${Math.random()}.${fileExt}`
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('news-images')
            .upload(fileName, compressedFile)

          if (uploadError) throw uploadError
          imageUrl = uploadData.path
        } finally {
          setCompressing(false)
        }
      }

      const dateToSave = useToday || !data.created_at ? new Date().toISOString() : new Date(data.created_at).toISOString();

      const { error } = await supabase.from('news').insert([
        {
          title: data.title,
          description: data.description,
          image_url: imageUrl,
          created_at: dateToSave,
        },
      ])

      if (error) throw error

      reset()
      setImage(null)
      setUseToday(true)
      setShowToast(true)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2500)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Název</label>
          <input
            type="text"
            {...register('title')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Popis</label>
          <textarea
            {...register('description')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Obrázek</label>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => document.getElementById('news-image-input')?.click()}
                className="inline-flex items-center px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-base bg-[#FFD1C1] text-[#21435F] rounded-xl font-medium shadow hover:bg-[#FFD1C1]/80 transition-colors focus:outline-none"
              >
                <ImageIcon size={20} className="mr-2" />
                Vybrat obrázek
              </button>
              {image && <span className="text-sm text-gray-700 truncate max-w-[180px]">{image.name}</span>}
            </div>
            <div className="flex items-center gap-2 bg-white/50 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-base rounded-xl">
              <input
                type="checkbox"
                id="useToday"
                checked={useToday}
                onChange={() => setUseToday(!useToday)}
                className="w-4 h-4 text-[#21435F] border-gray-300 rounded focus:ring-[#21435F]"
              />
              <label htmlFor="useToday" className="text-sm font-medium text-[#21435F] select-none cursor-pointer">Dnešní datum</label>
            </div>
          </div>
          <input
            id="news-image-input"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="hidden"
          />
        </div>

        {!useToday && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Datum</label>
            <input
              type="date"
              {...register('created_at')}
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-[#21435F] focus:ring-[#21435F] px-4 py-2 bg-white/50 text-[#21435F] font-['Montserrat']"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading || compressing}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-['Montserrat'] font-normal text-white bg-[#21435F] hover:bg-[#21435F]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#21435F]"
        >
          {loading ? 'Ukládání...' : compressing ? 'Optimalizace obrázku...' : 'Přidat novinku / událost'}
        </button>
      </form>
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-[#21435F] text-white px-6 py-3 rounded-2xl shadow-lg font-['Montserrat'] text-base animate-fade-in">
          Novinka / událost byla úspěšně uložena
        </div>
      )}
    </>
  )
} 