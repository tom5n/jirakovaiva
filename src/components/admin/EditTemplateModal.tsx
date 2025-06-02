import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '@/lib/supabase'
import { FileText, Instagram, Lightbulb, ClipboardCheck, BookOpen, Sparkles, X, Link, Upload } from 'lucide-react'
import React from 'react'

const templateSchema = z.object({
  title: z.string().min(1, 'Název je povinný'),
  description: z.string().min(1, 'Popis je povinný'),
  cta: z.string().min(1, 'Text tlačítka je povinný'),
  href: z.string().optional(),
  file: z.any().optional(),
  icon: z.string().min(1, 'Ikona je povinná'),
}).refine((data) => data.href || data.file, {
  message: 'Musíte vyplnit buď odkaz nebo nahrát soubor',
  path: ['href'],
})

type TemplateFormData = z.infer<typeof templateSchema>

const iconOptions = [
  { value: 'FileText', label: 'Dokument', icon: <FileText size={24} className="text-[#21435F]" /> },
  { value: 'Instagram', label: 'Instagram', icon: <Instagram size={24} className="text-[#21435F]" /> },
  { value: 'Lightbulb', label: 'Žárovka', icon: <Lightbulb size={24} className="text-[#21435F]" /> },
  { value: 'ClipboardCheck', label: 'Kontrolní seznam', icon: <ClipboardCheck size={24} className="text-[#21435F]" /> },
  { value: 'BookOpen', label: 'Kniha', icon: <BookOpen size={24} className="text-[#21435F]" /> },
  { value: 'Sparkles', label: 'Jiskry', icon: <Sparkles size={24} className="text-[#21435F]" /> },
]

type Template = {
  id: string
  title: string
  description: string
  cta: string
  href: string
  icon: string
  created_at: string
}

type EditTemplateModalProps = {
  template: Template
  onClose: () => void
  onUpdate: () => void
}

export default function EditTemplateModal({ template, onClose, onUpdate }: EditTemplateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadPhase, setUploadPhase] = useState<'uploading' | 'processing' | 'saving'>('uploading')
  const [selectedIcon, setSelectedIcon] = useState<string>(template.icon)
  const [isIconMenuOpen, setIsIconMenuOpen] = useState(false)
  const [inputType, setInputType] = useState<'link' | 'file'>(template.href ? 'link' : 'file')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      title: template.title,
      description: template.description,
      cta: template.cta,
      href: template.href,
      icon: template.icon,
    },
  })

  useEffect(() => {
    setValue('icon', selectedIcon)
  }, [selectedIcon, setValue])

  console.log('Form errors:', errors)
  console.log('Form values:', watch())
  console.log('Selected icon:', selectedIcon)

  const onSubmit = async (data: TemplateFormData) => {
    setIsSubmitting(true)
    setUploadProgress(0)
    setUploadPhase('uploading')
    
    // Simulace progress baru
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 1
      })
    }, 100)

    try {
      let fileUrl = template.href
      
      if (selectedFile) {
        try {
          const fileExt = selectedFile.name.split('.').pop()
          const fileName = `${Math.random()}.${fileExt}`
          
          setUploadPhase('uploading')
          const { error: uploadError, data: uploadData } = await supabase.storage
            .from('templates')
            .upload(fileName, selectedFile, {
              cacheControl: '3600',
              upsert: false
            } as any)

          if (uploadError) {
            console.error('Upload error:', uploadError)
            throw new Error('Nepodařilo se nahrát soubor. Zkuste to prosím znovu.')
          }

          setUploadPhase('processing')
          const { data: { publicUrl } } = supabase.storage
            .from('templates')
            .getPublicUrl(fileName)

          fileUrl = publicUrl
        } catch (error) {
          console.error('File upload error:', error)
          throw new Error('Nepodařilo se nahrát soubor. Zkuste to prosím znovu.')
        }
      }

      setUploadPhase('saving')
      const { file, ...templateDataWithoutFile } = data

      const templateData = {
        ...templateDataWithoutFile,
        href: inputType === 'link' ? data.href : fileUrl,
        icon: selectedIcon,
      }

      const { error: updateError } = await supabase
        .from('templates')
        .update(templateData)
        .eq('id', template.id)

      if (updateError) {
        console.error('Database error:', updateError)
        throw new Error('Nepodařilo se uložit změny. Zkuste to prosím znovu.')
      }

      setUploadProgress(100)
      setTimeout(() => {
        onUpdate()
        onClose()
      }, 500) // Malé zpoždění, aby uživatel viděl 100%
    } catch (error) {
      console.error('Error in onSubmit:', error)
      alert(error instanceof Error ? error.message : 'Něco se pokazilo. Zkuste to prosím znovu.')
    } finally {
      clearInterval(progressInterval)
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('File selected:', file.name)
      setSelectedFile(file)
      setValue('file', file)
      setValue('href', '')
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]" />
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto z-[101]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#21435F] font-['Dancing_Script']">Upravit šablonu</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Název šablony
            </label>
            <input
              type="text"
              {...register('title')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#21435F] focus:border-[#21435F]"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message?.toString()}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Popis
            </label>
            <textarea
              {...register('description')}
              rows={3}
              maxLength={130}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#21435F] focus:border-[#21435F]"
            />
            <div className="text-right text-xs text-gray-500">{watch('description')?.length || 0}/130 znaků</div>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message?.toString()}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text tlačítka
            </label>
            <input
              type="text"
              {...register('cta')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#21435F] focus:border-[#21435F]"
            />
            {errors.cta && (
              <p className="mt-1 text-sm text-red-600">{errors.cta.message?.toString()}</p>
            )}
          </div>

          <div>
            <div className="flex items-center space-x-4 mb-2">
              <button
                type="button"
                onClick={() => {
                  setInputType('file')
                  setValue('href', '')
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  inputType === 'file'
                    ? 'bg-[#21435F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Upload size={20} />
                <span>Soubor</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputType('link')
                  setSelectedFile(null)
                  setValue('href', template.href)
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  inputType === 'link'
                    ? 'bg-[#21435F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Link size={20} />
                <span>Odkaz</span>
              </button>
            </div>

            {inputType === 'link' ? (
              <div>
                <input
                  type="text"
                  {...register('href')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#21435F] focus:border-[#21435F]"
                  placeholder="Zadejte odkaz"
                />
                {errors.href && (
                  <p className="mt-1 text-sm text-red-600">{errors.href.message?.toString()}</p>
                )}
              </div>
            ) : (
              <div>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  />
                  <div className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#21435F] focus:border-[#21435F] flex items-center justify-between bg-white">
                    <div className="flex items-center">
                      <Upload size={20} className="text-[#21435F] mr-2" />
                      <span className="text-gray-600">
                        {selectedFile ? selectedFile.name : 'Vyberte soubor'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {selectedFile ? 'Změnit' : 'Procházet'}
                    </span>
                  </div>
                </div>
                {errors.file && (
                  <p className="mt-1 text-sm text-red-600">{errors.file.message?.toString()}</p>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ikona
            </label>
            <button
              type="button"
              onClick={() => setIsIconMenuOpen(!isIconMenuOpen)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#21435F] focus:border-[#21435F] flex items-center justify-between"
            >
              <div className="flex items-center">
                {iconOptions.find(option => option.value === selectedIcon)?.icon}
                <span className="ml-2">
                  {iconOptions.find(option => option.value === selectedIcon)?.label}
                </span>
              </div>
              <svg
                className={`w-5 h-5 transition-transform ${isIconMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isIconMenuOpen && (
              <>
                <div className="fixed inset-0 z-[60]" onClick={() => setIsIconMenuOpen(false)} />
                <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-[70]">
                  <div className="grid grid-cols-3 gap-3">
                    {iconOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setSelectedIcon(option.value)
                          setIsIconMenuOpen(false)
                        }}
                        className={`p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${
                          selectedIcon === option.value 
                            ? 'bg-[#21435F] text-white' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {React.cloneElement(option.icon, {
                          className: selectedIcon === option.value ? 'text-white' : 'text-[#21435F]'
                        })}
                        <span className="text-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Zrušit
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 py-2 rounded-xl bg-[#21435F] text-white font-medium transition ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#21435F]/90'
              }`}
            >
              {isSubmitting ? 'Ukládání...' : 'Uložit změny'}
            </button>
          </div>

          {isSubmitting && selectedFile && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-[#21435F] h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                {uploadPhase === 'uploading' && 'Nahrávání souboru...'}
                {uploadPhase === 'processing' && 'Zpracování souboru...'}
                {uploadPhase === 'saving' && 'Ukládání změn...'}
                {' '}{uploadProgress}%
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
} 