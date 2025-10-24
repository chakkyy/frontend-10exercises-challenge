export type Role = 'admin' | 'editor' | 'viewer'

export type Permission =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'publish'
  | 'manage_users'
  | 'view_analytics'

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

export interface Resource {
  id: string
  title: string
  author: string
  status: 'draft' | 'published'
  createdAt: Date
}
