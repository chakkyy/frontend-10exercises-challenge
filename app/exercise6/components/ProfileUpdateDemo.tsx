'use client'

import { useState } from 'react'
import { updateProfile } from '../lib/updateProfile'
import { ProfileData } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const ProfileUpdateDemo = () => {
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    email: '',
    bio: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const dataToUpdate = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value && value.trim()) {
        acc[key as keyof ProfileData] = value
      }
      return acc
    }, {} as ProfileData)

    try {
      const result = await updateProfile(dataToUpdate)

      if (result.success) {
        setMessage({
          type: 'success',
          text: result.message || 'Profile updated successfully',
        })
        setFormData({ name: '', email: '', bio: '' })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to update profile',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm">
      <h3 className="text-lg font-semibold mb-6 text-zinc-900">Profile Update Demo</h3>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-zinc-700 font-medium">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            disabled={isLoading}
            className="bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-zinc-700 font-medium">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            disabled={isLoading}
            className="bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-zinc-700 font-medium">
            Bio
          </Label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            disabled={isLoading}
            rows={4}
            className="flex w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {message && (
          <div
            role="alert"
            data-testid="profile-message"
            className={`p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Updating...' : 'Update Profile'}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-zinc-200">
        <p className="text-sm text-zinc-600">
          <strong>Try it:</strong> Fill in at least one field and click update. The form validates
          email format and handles errors gracefully.
        </p>
        <p className="text-sm text-zinc-600">
          The purpose of this component is to have a real form that can be used on both unit and e2e
          tests.
        </p>
      </div>
    </div>
  )
}
