export interface Lead {
  id: number
  name: string
  email: string
  company: string
  phone: string
  website: string
}

export type SortField = 'name' | 'email' | 'company'
export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  field: SortField | null
  direction: SortDirection
}
