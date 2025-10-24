# Exercise 9 Solution: Role-Based Access Control (RBAC)

## Implementation Overview

This solution implements a **RBAC system** with:

- ✅ Role-based permissions (admin, editor, viewer)
- ✅ Permission checking utilities
- ✅ Conditional UI rendering
- ✅ Type-safe implementation with TypeScript
- ✅ Scalable architecture for adding new roles/permissions

## Architecture

### File Structure

```
exercise9/
├── components/
│   └── RBACDemo.tsx           # Interactive demo component
├── lib/
│   └── rbac.ts                # Permission checking utilities
├── types.ts                   # TypeScript interfaces
├── page.tsx                   # Exercise page
├── solution.md                # This file
└── README.md                  # Exercise instructions
```

## Core Concepts

### 1. TypeScript Types

```typescript
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
```

**Key Features:**

- **Role**: Union type for type safety
- **Permission**: Granular permissions for fine-grained control
- **User**: Extends to include role information

### 2. Permission Mapping

The core of RBAC is the permission matrix that maps roles to permissions:

```typescript
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: ['create', 'read', 'update', 'delete', 'publish', 'manage_users', 'view_analytics'],
  editor: ['create', 'read', 'update', 'publish', 'view_analytics'],
  viewer: ['read'],
}
```

**Design Decision**: Hierarchical permissions where:

- **Admin** has all permissions (full access)
- **Editor** can manage content but not delete or manage users
- **Viewer** has read-only access

### 3. Permission Checking Functions

#### Basic Permission Check

```typescript
export const hasPermission = (userRole: Role, permission: Permission): boolean => {
  const rolePermissions = ROLE_PERMISSIONS[userRole]
  return rolePermissions.includes(permission)
}
```

**Usage:**

```typescript
if (hasPermission(user.role, 'delete')) {
  // allow some action or render specific UI
}
```

#### Multiple Permission Checks

```typescript
export const hasAnyPermission = (userRole: Role, permissions: Permission[]): boolean => {
  return permissions.some((permission) => hasPermission(userRole, permission))
}

export const hasAllPermissions = (userRole: Role, permissions: Permission[]): boolean => {
  return permissions.every((permission) => hasPermission(userRole, permission))
}
```

**Usage:**

```typescript
// Can edit OR publish
if (hasAnyPermission(user.role, ['update', 'publish'])) {
  // Show a specific section
}

// Must have both permissions
if (hasAllPermissions(user.role, ['delete', 'manage_users'])) {
  // Show admin panel
}
```

## Conditional Rendering Patterns

### Pattern 1: Simple Conditional Rendering

```typescript
{hasPermission(currentUser.role, 'delete') && (
  <Button onClick={handleDelete}>Delete</Button>
)}
```

**Use Case**: Show/hide elements based on single permission

### Pattern 2: Ternary for Different UI

```typescript
{hasPermission(user.role, 'update') ? (
  <Button>Edit</Button>
) : (
  <Button disabled>View Only</Button>
)}
```

**Use Case**: Show different UI based on permission level

### Pattern 3: Early Return

```typescript
const ResourceActions = ({ user, resource }) => {
  if (!hasPermission(user.role, 'read')) {
    return null
  }

  return (
    <div>
      <Button>View</Button>
      {hasPermission(user.role, 'update') && <Button>Edit</Button>}
      {hasPermission(user.role, 'delete') && <Button>Delete</Button>}
    </div>
  )
}
```

**Use Case**: Complex permission-based component rendering

### Pattern 4: Permission-Based Component Wrapper

```typescript
const ProtectedAction = ({
  permission,
  children
}: {
  permission: Permission
  children: React.ReactNode
}) => {
  const { user } = useAuth()

  if (!hasPermission(user.role, permission)) {
    return null
  }

  return <>{children}</>
}

// Usage
<ProtectedAction permission="delete">
  <Button>Delete</Button>
</ProtectedAction>
```

**Use Case**: Reusable permission wrapper for cleaner code

## Production Considerations

### What's Not Implemented (But Should Be in Production)

#### 1. **Authentication Integration**

```typescript
// integrate with auth provider
import { useAuth } from '@/lib/auth'

const MyComponent = () => {
  const { user } = useAuth() // Get user from auth context

  return (
    <>
      {hasPermission(user.role, 'delete') && (
        <Button>Delete</Button>
      )}
    </>
  )
}
```

**Recommended Libraries:**

- NextAuth.js / Auth.js for authentication
- Clerk, Auth0, or Supabase Auth for managed solutions

#### 2. **Backend Permission Verification**

```typescript
// NEVER trust client-side checks alone
// Always verify on the backend

// Frontend (UI only)
if (hasPermission(user.role, 'delete')) {
  await deleteResource(id)
}

// Backend (actual authorization)
app.delete('/api/resources/:id', async (req, res) => {
  const user = await getUserFromSession(req)

  if (!hasPermission(user.role, 'delete')) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  // Proceed with deletion
})
```

**Critical**: Frontend checks are for UX only. Backend must enforce permissions.

## Security Best Practices

1. **Never Rely on Frontend Alone**: Always verify permissions on the backend
2. **Fail Secure**: Default to denying access if permission is unclear
3. **Regular Reviews**: Periodically review and update role permissions
4. **Principle of Least Privilege**: Grant minimum permissions necessary
5. **Time-Limited Permissions**: Consider temporary elevated access when needed

## References

- [OWASP: Access Control](https://owasp.org/www-community/Access_Control)
- [NIST RBAC Standard](https://csrc.nist.gov/projects/role-based-access-control)
- [CASL Documentation](https://casl.js.org/)
- [Auth0: RBAC Guide](https://auth0.com/docs/manage-users/access-control/rbac)
