export interface News {
  id: string
  title: string
  description: string
  image_url: string
  created_at: string
  user_id: string
}

export interface User {
  id: string
  email: string
  created_at: string
} 