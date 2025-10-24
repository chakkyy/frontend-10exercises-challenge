export interface ProfileData {
  name?: string
  email?: string
  bio?: string
  avatar?: string
}

export interface ProfileUpdateResponse {
  success: boolean
  data?: ProfileData
  message?: string
}

export interface ApiError {
  message: string
  code?: string
}
