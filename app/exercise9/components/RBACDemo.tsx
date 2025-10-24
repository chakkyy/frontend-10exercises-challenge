'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { User, Resource, Role } from '../types'
import { hasPermission, getRolePermissions } from '../lib/rbac'

const SAMPLE_USERS: User[] = [
  {
    id: '1',
    name: 'Alice Admin',
    email: 'alice@example.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Bob Editor',
    email: 'bob@example.com',
    role: 'editor',
  },
  {
    id: '3',
    name: 'Charlie Viewer',
    email: 'charlie@example.com',
    role: 'viewer',
  },
]

const SAMPLE_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Q4 Financial Report',
    author: 'John Doe',
    status: 'published',
    createdAt: new Date('2025-10-01'),
  },
  {
    id: '2',
    title: 'Marketing Strategy Draft',
    author: 'Jane Smith',
    status: 'draft',
    createdAt: new Date('2025-10-15'),
  },
  {
    id: '3',
    title: 'Product Roadmap 2026',
    author: 'Mike Johnson',
    status: 'published',
    createdAt: new Date('2025-09-20'),
  },
]

export const RBACDemo = () => {
  const [currentUser, setCurrentUser] = useState<User>(SAMPLE_USERS[0])
  const [resources] = useState<Resource[]>(SAMPLE_RESOURCES)
  const [actionLog, setActionLog] = useState<string[]>([])

  const handleRoleChange = (userId: string) => {
    const user = SAMPLE_USERS.find((u) => u.id === userId)
    if (user) {
      setCurrentUser(user)
      setActionLog([])
    }
  }

  const logAction = (action: string, allowed: boolean) => {
    const timestamp = new Date().toLocaleTimeString()
    const status = allowed ? '✅ Allowed' : '❌ Denied'
    setActionLog((prev) => [`[${timestamp}] ${status}: ${action}`, ...prev].slice(0, 5))
  }

  const handleAction = (action: string, permission: 'create' | 'update' | 'delete' | 'publish') => {
    const allowed = hasPermission(currentUser.role, permission)
    logAction(action, allowed)

    if (allowed) {
      // actual API call would be here
    }
  }

  const getRoleBadgeColor = (role: Role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      case 'editor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'viewer':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    return status === 'published'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
  }

  const permissions = getRolePermissions(currentUser.role)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="user-select">Current User</Label>
        <select
          id="user-select"
          value={currentUser.id}
          onChange={(e) => handleRoleChange(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {SAMPLE_USERS.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.role})
            </option>
          ))}
        </select>
      </div>

      <Card className="p-4 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">{currentUser.name}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{currentUser.email}</p>
          </div>
          <Badge className={getRoleBadgeColor(currentUser.role)}>{currentUser.role}</Badge>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Permissions:</p>
          <div className="flex flex-wrap gap-2">
            {permissions.map((permission) => (
              <Badge
                key={permission}
                variant="outline"
                className="text-xs bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700"
              >
                {permission}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Resources</h3>
        {resources.map((resource) => (
          <Card key={resource.id} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{resource.title}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  By {resource.author} • {resource.createdAt.toLocaleDateString()}
                </p>
              </div>
              <Badge className={getStatusBadgeColor(resource.status)}>{resource.status}</Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => logAction(`View "${resource.title}"`, true)}
                className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700"
              >
                View
              </Button>

              {hasPermission(currentUser.role, 'update') && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction(`Edit "${resource.title}"`, 'update')}
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-300"
                >
                  Edit
                </Button>
              )}

              {hasPermission(currentUser.role, 'publish') && resource.status === 'draft' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction(`Publish "${resource.title}"`, 'publish')}
                  className="bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-300"
                >
                  Publish
                </Button>
              )}

              {hasPermission(currentUser.role, 'delete') && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction(`Delete "${resource.title}"`, 'delete')}
                  className="bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-300"
                >
                  Delete
                </Button>
              )}

              {!hasPermission(currentUser.role, 'delete') && (
                <Button
                  size="sm"
                  variant="outline"
                  disabled
                  onClick={() => handleAction(`Delete "${resource.title}"`, 'delete')}
                  className="opacity-40 cursor-not-allowed bg-zinc-100 text-zinc-400 border-zinc-200 dark:bg-zinc-800/50 dark:text-zinc-600 dark:border-zinc-700"
                  title="You don't have permission to delete"
                >
                  Delete
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {actionLog.length > 0 && (
        <Card className="p-4 bg-zinc-50 dark:bg-zinc-800/50">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            Action Log
          </h3>
          <div className="space-y-2">
            {actionLog.map((log, index) => (
              <p key={index} className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
                {log}
              </p>
            ))}
          </div>
        </Card>
      )}

      <div className="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">How it works</h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>
            • <strong>Admin</strong> can do everything: create, read, update, delete, publish,
            manage users
          </li>
          <li>
            • <strong>Editor</strong> can create, read, update, and publish content (no delete)
          </li>
          <li>
            • <strong>Viewer</strong> can only read content (no modifications)
          </li>
          <li>
            • Buttons are conditionally rendered using{' '}
            <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">
              hasPermission()
            </code>
          </li>
        </ul>
      </div>
    </div>
  )
}
