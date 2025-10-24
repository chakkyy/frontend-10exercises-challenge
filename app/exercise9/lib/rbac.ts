import { Role, Permission } from '../types'

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: ['create', 'read', 'update', 'delete', 'publish', 'manage_users', 'view_analytics'],
  editor: ['create', 'read', 'update', 'publish', 'view_analytics'],
  viewer: ['read'],
}

export const hasPermission = (userRole: Role, permission: Permission): boolean => {
  const rolePermissions = ROLE_PERMISSIONS[userRole]
  return rolePermissions.includes(permission)
}

export const hasAnyPermission = (userRole: Role, permissions: Permission[]): boolean => {
  return permissions.some((permission) => hasPermission(userRole, permission))
}

export const hasAllPermissions = (userRole: Role, permissions: Permission[]): boolean => {
  return permissions.every((permission) => hasPermission(userRole, permission))
}

export const getRolePermissions = (userRole: Role): Permission[] => {
  return ROLE_PERMISSIONS[userRole]
}

export const hasHigherPrivilege = (role1: Role, role2: Role): boolean => {
  const role1Permissions = ROLE_PERMISSIONS[role1].length
  const role2Permissions = ROLE_PERMISSIONS[role2].length
  return role1Permissions > role2Permissions
}
