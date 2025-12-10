import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '@/lib/supabase'
import { FileText, Instagram, Lightbulb, ClipboardCheck, BookOpen, Sparkles, Link, Upload } from 'lucide-react'
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

type TemplatesFormProps = {
  templateCount: number
}

const iconOptions = [
  { value: 'FileText', label: 'Dokument', icon: <FileText size={24} className="text-[#21435F]" /> },
  { value: 'Instagram', label: 'Instagram', icon: <Instagram size={24} className="text-[#21435F]" /> },
  { value: 'Lightbulb', label: 'Žárovka', icon: <Lightbulb size={24} className="text-[#21435F]" /> },
  { value: 'ClipboardCheck', label: 'Kontrolní seznam', icon: <ClipboardCheck size={24} className="text-[#21435F]" /> },
  { value: 'BookOpen', label: 'Kniha', icon: <BookOpen size={24} className="text-[#21435F]" /> },
  { value: 'Sparkles', label: 'Jiskry', icon: <Sparkles size={24} className="text-[#21435F]" /> },
]

export default function TemplatesForm({ templateCount }: TemplatesFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<string>('FileText')
  const [isIconMenuOpen, setIsIconMenuOpen] = useState(false)
  const [inputType, setInputType] = useState<'link' | 'file'>('file')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      icon: 'FileText',
      title: '',
      description: '',
      cta: '',
      href: '',
    }
  })

  useEffect(() => {
    setValue('icon', selectedIcon)
  }, [selectedIcon, setValue])

  console.log('Form errors:', errors)
  console.log('Form values:', watch())
  console.log('Selected icon:', selectedIcon)

  const onSubmit = async (data: TemplateFormData) => {
    console.log('Form submitted!')
    setIsSubmitting(true)
    try {
      console.log('Form data:', data)
      console.log('Selected file:', selectedFile)
      console.log('Input type:', inputType)
      
      let fileUrl = ''
      
      if (selectedFile) {
        console.log('Uploading file...')
        const fileExt = selectedFile.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('templates')
          .upload(fileName, selectedFile)

        if (uploadError) {
          console.error('Upload error:', uploadError)
          throw uploadError
        }

        const { data: { publicUrl } } = supabase.storage
          .from('templates')
          .getPublicUrl(fileName)

        fileUrl = publicUrl
        console.log('File uploaded, URL:', fileUrl)
      }

      const { file, ...templateDataWithoutFile } = data

      const templateData = {
        ...templateDataWithoutFile,
        href: inputType === 'link' ? data.href : fileUrl,
        icon: selectedIcon,
      }
      console.log('Inserting template:', templateData)

      const { error } = await supabase
        .from('templates')
        .insert([templateData])

      if (error) {
        console.error('Database error:', error)
        throw error
      }

      console.log('Template created successfully')
      reset()
      setSelectedIcon('FileText')
      setSelectedFile(null)
      setInputType('file')
    } catch (error) {
      console.error('Error in onSubmit:', error)
    } finally {
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

  const handleFormSubmit = (e: React.FormEvent) => {
    console.log('Form submit event triggered')
    e.preventDefault()
    handleSubmit(onSubmit)(e)
  }

  const isLimitReached = templateCount >= 2
  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {isLimitReached && (
        <div className="mb-4 p-3 border border-gray-300 rounded-lg text-gray-500 text-center text-sm bg-transparent">
          Lze přidat maximálně 2 šablony. Pro přidání nové nejprve smažte některou stávající.
        </div>
      )}
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
              setValue('href', '')
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
        <input type="hidden" {...register('icon')} />
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
            <div className="fixed inset-0 z-40" onClick={() => setIsIconMenuOpen(false)} />
            <div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
              <div className="grid grid-cols-3 gap-3">
                {iconOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSelectedIcon(option.value)
                      setValue('icon', option.value)
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

      <button
        type="submit"
        disabled={isSubmitting || isLimitReached}
        onClick={() => console.log('Submit button clicked')}
        className="w-full bg-[#21435F] text-white py-2 px-4 rounded-lg hover:bg-[#21435F]/90 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Ukládání...' : 'Přidat šablonu'}
      </button>
    </form>
  )
} 