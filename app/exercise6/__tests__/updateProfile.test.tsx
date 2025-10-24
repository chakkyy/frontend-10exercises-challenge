import { updateProfile } from '../lib/updateProfile'
import { ProfileData } from '../types'

global.fetch = jest.fn()

describe('updateProfile - Unit Tests', () => {
  const mockProfileData: ProfileData = {
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software developer',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Success scenarios', () => {
    it('should successfully update profile with valid data', async () => {
      const mockResponse = {
        id: 1,
        ...mockProfileData,
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      })

      const result = await updateProfile(mockProfileData)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockResponse)
      expect(result.message).toBe('Profile updated successfully')
    })

    it('should call API with correct parameters', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProfileData,
      })

      await updateProfile(mockProfileData)

      expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockProfileData),
      })
    })

    it('should handle partial profile updates', async () => {
      const partialData: ProfileData = {
        name: 'Jane Smith',
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => partialData,
      })

      const result = await updateProfile(partialData)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(partialData)
    })
  })

  describe('Error scenarios', () => {
    it('should throw error when profile data is empty', async () => {
      await expect(updateProfile({})).rejects.toThrow('Profile data cannot be empty')
      expect(global.fetch).not.toHaveBeenCalled()
    })

    it('should throw error when email format is invalid', async () => {
      const invalidData: ProfileData = {
        email: 'invalid-email',
      }

      await expect(updateProfile(invalidData)).rejects.toThrow('Invalid email format')
      expect(global.fetch).not.toHaveBeenCalled()
    })

    it('should throw error when API returns 400 error', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
      })

      await expect(updateProfile(mockProfileData)).rejects.toThrow('Failed to update profile: 400')
    })

    it('should throw error when API returns 500 error', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      await expect(updateProfile(mockProfileData)).rejects.toThrow('Failed to update profile: 500')
    })

    it('should throw error when network fails', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      await expect(updateProfile(mockProfileData)).rejects.toThrow('Network error')
    })

    it('should handle unexpected errors gracefully', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce('Unexpected error')

      await expect(updateProfile(mockProfileData)).rejects.toThrow('An unexpected error occurred')
    })
  })

  describe('Email validation', () => {
    it('should accept valid email addresses', async () => {
      const validEmails = ['test@example.com', 'user.name@example.co.uk', 'user+tag@example.com']

      for (const email of validEmails) {
        ;(global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({ email }),
        })

        const result = await updateProfile({ email })
        expect(result.success).toBe(true)
      }
    })

    it('should reject invalid email addresses', async () => {
      const invalidEmails = ['invalid', 'invalid@', '@example.com', 'invalid@.com']

      for (const email of invalidEmails) {
        await expect(updateProfile({ email })).rejects.toThrow('Invalid email format')
      }
    })
  })
})
