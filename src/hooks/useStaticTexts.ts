import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export type StaticText = {
  id: string
  key: string
  value: string
  section: string
  created_at: string
  updated_at: string
}

export function useStaticTexts(section?: string) {
  const [data, setData] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const fetchTexts = async () => {
      try {
        let query = supabase.from('static_texts').select('*')
        if (section) query = query.eq('section', section)
        const { data, error } = await query
        if (error) throw error
        const texts = (data || []).reduce((acc: Record<string, string>, t: StaticText) => {
          acc[t.key] = t.value
          return acc
        }, {})
        setData(texts)
      } catch (e: any) {
        setError(e.message || 'Chyba při načítání textů')
      } finally {
        setLoading(false)
      }
    }
    fetchTexts()
  }, [section])

  return { data, loading, error }
} 