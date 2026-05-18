import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Pencil, Trash2, MoreVertical } from 'lucide-react'
import { FileText, Instagram, Lightbulb, ClipboardCheck, BookOpen, Sparkles } from 'lucide-react'
import EditTemplateModal from './EditTemplateModal'

type Template = {
  id: string
  title: string
  description: string
  cta: string
  href: string
  icon: string
  created_at: string
}

const iconComponents = {
  FileText: FileText,
  Instagram: Instagram,
  Lightbulb: Lightbulb,
  ClipboardCheck: ClipboardCheck,
  BookOpen: BookOpen,
  Sparkles: Sparkles,
}

export default function TemplatesList() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [menuId, setMenuId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTemplates(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteTemplate = async (id: string) => {
    try {
      // Nejprve získáme informace o šabloně, abychom věděli, jaký soubor mazat
      const { data: template, error: fetchError } = await supabase
        .from('templates')
        .select('href')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      // Pokud šablona obsahuje soubor, smažeme ho ze storage
      if (template?.href) {
        const fileName = template.href.split('/').pop()
        if (fileName) {
          const { error: deleteFileError } = await supabase.storage
            .from('templates')
            .remove([fileName])

          if (deleteFileError) {
            console.error('Error deleting file:', deleteFileError)
            // Pokračujeme i když se nepodaří smazat soubor
          }
        }
      }

      // Smažeme záznam z databáze
      const { error: deleteError } = await supabase
        .from('templates')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      // Aktualizujeme seznam
      await fetchTemplates()
    } catch (error) {
      console.error('Error:', error)
      alert('Nepodařilo se smazat šablonu. Zkuste to prosím znovu.')
    }
  }

  if (loading) {
    return <div>Načítání...</div>
  }

  return (
    <div className="space-y-6">
      {templates.map((template) => {
        const IconComponent = iconComponents[template.icon as keyof typeof iconComponents]
        return (
          <div
            key={template.id}
            className="bg-white shadow rounded-lg p-6 flex justify-between items-start relative"
          >
            <div className="flex space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-[#FFD1C1] rounded-full">
                {IconComponent && <IconComponent size={22} className="text-[#21435F]" />}
              </div>
              <div>
                <h3 className="line-clamp-1 break-all text-lg font-medium max-w-[180px]">
                  {template.title}
                </h3>
                <p className="line-clamp-2 text-gray-600 mt-1 max-w-[180px]">
                  {template.description}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(template.created_at).toLocaleDateString('cs-CZ')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setEditingTemplate(template)
                }}
                className="p-2 text-[#21435F] hover:bg-[#21435F]/10 rounded-lg transition-colors hidden sm:block"
                title="Upravit"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setConfirmDeleteId(template.id)
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors hidden sm:block"
                title="Smazat"
              >
                <Trash2 size={20} />
              </button>
              
              <div className="relative sm:hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setMenuId(menuId === template.id ? null : template.id)
                  }}
                  className="p-2 text-[#21435F] hover:bg-[#21435F]/10 rounded-lg transition-colors"
                  title="Více akcí"
                >
                  <MoreVertical size={20} />
                </button>
                
                {menuId === template.id && (
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingTemplate(template)
                        setMenuId(null)
                      }}
                      className="w-full px-4 py-2 text-left text-[#21435F] hover:bg-[#21435F]/10 flex items-center"
                    >
                      <Pencil size={16} className="mr-2" />
                      Upravit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setConfirmDeleteId(template.id)
                        setMenuId(null)
                      }}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Smazat
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}

      {editingTemplate && (
        <EditTemplateModal
          template={editingTemplate}
          onClose={() => setEditingTemplate(null)}
          onUpdate={() => {
            fetchTemplates()
            setEditingTemplate(null)
          }}
        />
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]" />
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-xs w-full flex flex-col items-center z-[101]">
            <div className="text-lg font-semibold text-[#21435F] mb-4 text-center">Opravdu chcete smazat tuto šablonu?</div>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-xl bg-gray-200 text-[#21435F] font-medium hover:bg-gray-300 transition"
              >
                Zrušit
              </button>
              <button
                onClick={() => { deleteTemplate(confirmDeleteId); setConfirmDeleteId(null); }}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
              >
                Smazat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 