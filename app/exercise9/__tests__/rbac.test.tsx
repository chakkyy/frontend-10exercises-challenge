import { hasPermission, getRolePermissions } from '../lib/rbac'

describe('RBAC Permission System', () => {
  describe('hasPermission', () => {
    it('admin has all permissions', () => {
      expect(hasPermission('admin', 'create')).toBe(true)
      expect(hasPermission('admin', 'delete')).toBe(true)
      expect(hasPermission('admin', 'manage_users')).toBe(true)
    })

    it('editor can create and update but not delete', () => {
      expect(hasPermission('editor', 'create')).toBe(true)
      expect(hasPermission('editor', 'update')).toBe(true)
      expect(hasPermission('editor', 'publish')).toBe(true)
      expect(hasPermission('editor', 'delete')).toBe(false)
      expect(hasPermission('editor', 'manage_users')).toBe(false)
    })

    it('viewer can only read', () => {
      expect(hasPermission('viewer', 'read')).toBe(true)
      expect(hasPermission('viewer', 'create')).toBe(false)
      expect(hasPermission('viewer', 'delete')).toBe(false)
    })
  })

  describe('getRolePermissions', () => {
    it('returns correct permissions for each role', () => {
      expect(getRolePermissions('admin')).toHaveLength(7)
      expect(getRolePermissions('editor')).toHaveLength(5)
      expect(getRolePermissions('viewer')).toHaveLength(1)
    })
  })
})
