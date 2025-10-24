import { ProfileData, ProfileUpdateResponse } from '../types'

const API_URL = 'https://jsonplaceholder.typicode.com/users/1'

export const updateProfile = async (data: ProfileData): Promise<ProfileUpdateResponse> => {
  // Validate input
  if (!data || Object.keys(data).length === 0) {
    throw new Error('Profile data cannot be empty')
  }

  if (data.email && !isValidEmail(data.email)) {
    throw new Error('Invalid email format')
  }

  try {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.status}`)
    }

    const updatedData = await response.json()

    return {
      success: true,
      data: updatedData,
      message: 'Profile updated successfully',
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unexpected error occurred')
  }
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
