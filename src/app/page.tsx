import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { News } from '@/types'

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: news } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-12">Novinky a události</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {news?.map((item: News) => (
          <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
            {item.image_url && (
              <img
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news-images/${item.image_url}`}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(item.created_at).toLocaleDateString('cs-CZ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 