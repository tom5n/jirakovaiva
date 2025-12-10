import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { X } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'

type StaticText = {
  id: string
  key: string
  value: string
  section: string
  created_at: string
  updated_at: string
}

type EditSectionModalProps = {
  texts: StaticText[]
  labels: Record<string, string>
  onClose: () => void
  onUpdate: () => void
  title: string
}

type SectionFormData = {
  [key: string]: string
}

export default function EditSectionModal({ texts, labels, onClose, onUpdate, title }: EditSectionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { control, handleSubmit } = useForm<SectionFormData>({
    defaultValues: Object.fromEntries(texts.map(t => [t.key, t.value]))
  })

  const onSubmit = async (data: SectionFormData) => {
    setIsSubmitting(true)
    try {
      for (const text of texts) {
        if (data[text.key] !== text.value) {
          const { error } = await supabase
            .from('static_texts')
            .update({ value: data[text.key] })
            .eq('id', text.id)
          if (error) throw error
        }
      }
      onUpdate()
      onClose()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]" />
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 z-[101]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#21435F] font-['Dancing_Script']">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {texts.map((text) => (
            <div key={text.key}>
              <label className="block text-sm font-medium text-[#21435F] mb-1">
                {labels[text.key] || text.key}
              </label>
              <Controller
                name={text.key}
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={
                      text.key.endsWith('_title') ||
                      text.key.endsWith('_button') ||
                      text.key === 'cta_primary' ||
                      text.key === 'cta_secondary'
                        ? 1 : 4
                    }
                    style={{
                      resize: 'vertical',
                      overflow: 'auto',
                      minHeight: (text.key.endsWith('_title') || text.key.endsWith('_button') || text.key === 'cta_primary' || text.key === 'cta_secondary') ? 38 : 100,
                      height: 'auto',
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#21435F] focus:border-[#21435F] auto-resize-textarea"
                    onInput={e => {
                      e.currentTarget.style.height = 'auto';
                      e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                      field.onChange(e);
                    }}
                  />
                )}
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#21435F] text-white py-2 px-4 rounded-lg hover:bg-[#21435F]/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Ukládání...' : 'Uložit změny'}
          </button>
        </form>
      </div>
    </div>
  )
} 