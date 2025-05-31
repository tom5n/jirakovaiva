import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '@/lib/supabase'
import { Image as ImageIcon, X } from 'lucide-react'
import type { News } from '@/types'

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

interface EditNewsModalProps {
  news: News
  onClose: () => void
  onUpdate: () => void
}

export default function EditNewsModal({ news, onClose, onUpdate }: EditNewsModalProps) {
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [compressing, setCompressing] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: news.title,
      description: news.description,
      created_at: news.created_at ? new Date(news.created_at).toISOString().split('T')[0] : undefined,
    },
  })

  const onSubmit = async (data: NewsFormData) => {
    try {
      setLoading(true)
      
      let imageUrl = news.image_url
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

      const { error } = await supabase
        .from('news')
        .update({
          title: data.title,
          description: data.description,
          image_url: imageUrl,
          created_at: new Date(data.created_at!).toISOString(),
        })
        .eq('id', news.id)

      if (error) throw error

      setShowToast(true)
      setTimeout(() => {
        onUpdate()
        onClose()
      }, 1500)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]" />
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 z-[101]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#21435F] font-['Dancing_Script']">Upravit novinku</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#21435F]">Název</label>
              <input
                type="text"
                {...register('title')}
                className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-[#21435F] focus:ring-[#21435F] px-4 py-2 bg-white/80 text-[#21435F] font-['Montserrat']"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#21435F]">Popis</label>
              <textarea
                {...register('description')}
                rows={4}
                className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-[#21435F] focus:ring-[#21435F] px-4 py-2 bg-white/80 text-[#21435F] font-['Montserrat']"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#21435F] mb-1">Obrázek</label>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {(image
                    ? <img src={URL.createObjectURL(image)} alt="Náhled obrázku" className="w-14 h-14 object-cover rounded shadow border border-gray-200 transition-transform duration-200 hover:scale-150 hover:z-50 hover:shadow-2xl cursor-pointer" />
                    : news.image_url && (
                      <img
                        src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/news-images/${news.image_url}`}
                        alt="Aktuální obrázek"
                        className="w-14 h-14 object-cover rounded shadow border border-gray-200 transition-transform duration-200 hover:scale-150 hover:z-50 hover:shadow-2xl cursor-pointer"
                      />
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => document.getElementById('edit-news-image-input')?.click()}
                    className="inline-flex items-center px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-base bg-[#FFD1C1] text-[#21435F] rounded-xl font-medium shadow hover:bg-[#FFD1C1]/80 transition-colors focus:outline-none whitespace-nowrap"
                  >
                    <ImageIcon size={20} className="mr-2" />
                    Změnit obrázek
                  </button>
                  {image && <span className="text-sm text-[#21435F]/80 truncate max-w-[180px]">{image.name}</span>}
                </div>
              </div>
              <input
                id="edit-news-image-input"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="hidden"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#21435F]">Datum</label>
              <input
                type="date"
                {...register('created_at')}
                className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-[#21435F] focus:ring-[#21435F] px-4 py-2 bg-white/80 text-[#21435F] font-['Montserrat']"
              />
            </div>

            <button
              type="submit"
              disabled={loading || compressing}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-['Montserrat'] font-normal text-white bg-[#21435F] hover:bg-[#21435F]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#21435F] transition-colors"
            >
              {loading ? 'Ukládání...' : compressing ? 'Optimalizace obrázku...' : 'Uložit změny'}
            </button>
          </form>
        </div>
      </div>
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[40] bg-[#21435F] text-white px-6 py-3 rounded-2xl shadow-lg font-['Montserrat'] text-base animate-fade-in">
          Všechny změny byly úspěšně uloženy
        </div>
      )}
    </>
  )
} 