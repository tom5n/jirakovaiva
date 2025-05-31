import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { News } from '@/types'
import EditNewsModal from './EditNewsModal'
import { Pencil, Trash2, MoreVertical } from 'lucide-react'

export default function NewsList() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [menuId, setMenuId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setNews(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteNews = async (id: string) => {
    try {
      const { error } = await supabase.from('news').delete().eq('id', id)
      if (error) throw error
      fetchNews()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) {
    return <div>Načítání...</div>
  }

  return (
    <div className="space-y-6">
      {news.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow rounded-lg p-6 flex justify-between items-start relative cursor-pointer"
          onClick={() => setActiveId(activeId === item.id ? null : item.id)}
        >
          <div className="flex space-x-4">
            {item.image_url && (
              <img
                src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/news-images/${item.image_url}`}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
            )}
            <div>
              <h3 className="line-clamp-1 break-all text-lg font-medium max-w-[180px]">{item.title}</h3>
              <p className="line-clamp-2 text-gray-600 mt-1 max-w-[180px]">{item.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(item.created_at).toLocaleDateString('cs-CZ')}
              </p>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 flex gap-2 sm:flex-row flex-col items-end">
            <button
              onClick={(e) => { e.stopPropagation(); setEditingNews(item); }}
              className="p-2 text-[#21435F] hover:bg-[#21435F]/10 rounded-lg transition-colors sm:block hidden"
              title="Upravit"
            >
              <Pencil size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(item.id); }}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors sm:block hidden"
              title="Smazat"
            >
              <Trash2 size={20} />
            </button>
            <div className="relative sm:hidden">
              <button
                onClick={(e) => { e.stopPropagation(); setMenuId(menuId === item.id ? null : item.id); }}
                className="p-2 text-[#21435F] hover:bg-[#21435F]/10 rounded-lg transition-colors"
                title="Více akcí"
              >
                <MoreVertical size={20} />
              </button>
              {menuId === item.id && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuId(null)}
                  />
                  <div className="absolute bottom-10 right-0 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col z-50 min-w-[120px]">
                    <button
                      onClick={(e) => { e.stopPropagation(); setEditingNews(item); setMenuId(null); }}
                      className="px-4 py-2 text-[#21435F] hover:bg-[#21435F]/10 rounded-t-xl text-left transition-colors"
                    >
                      Upravit
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(item.id); setMenuId(null); }}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-xl text-left transition-colors"
                    >
                      Smazat
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      {editingNews && (
        <EditNewsModal
          news={editingNews}
          onClose={() => setEditingNews(null)}
          onUpdate={fetchNews}
        />
      )}

      {/* Confirm delete popup */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]" />
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-xs w-full flex flex-col items-center z-[101]">
            <div className="text-lg font-semibold text-[#21435F] mb-4 text-center">Opravdu chcete smazat tuto novinku / událost?</div>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-xl bg-gray-200 text-[#21435F] font-medium hover:bg-gray-300 transition"
              >
                Zrušit
              </button>
              <button
                onClick={() => { deleteNews(confirmDeleteId); setConfirmDeleteId(null); }}
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