import type { Access, FieldAccess } from 'payload'

// Role helpers -------------------------------------------------------------
export const isAdmin: Access = ({ req: { user } }) => user?.role === 'admin'
export const isAdminOrPrincipal: Access = ({ req: { user } }) =>
  user?.role === 'admin' || user?.role === 'principal'
export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

// Field-level: only admins may change this field (prevents privilege escalation)
export const adminFieldOnly: FieldAccess = ({ req: { user } }) => user?.role === 'admin'

// EVENTS -------------------------------------------------------------------
// Public: only published. Admin/Principal: all. Editor: only their department.
export const eventRead: Access = ({ req: { user } }) => {
  if (!user) return { status: { equals: 'published' } }
  if (user.role === 'admin' || user.role === 'principal') return true
  return { department: { equals: user.department } }
}
export const eventModify: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin' || user.role === 'principal') return true
  if (user.role === 'editor' && user.department)
    return { department: { equals: user.department } }
  return false
}

// NEWS ---------------------------------------------------------------------
// Editors are limited to department-level news for their own department.
export const newsRead: Access = ({ req: { user } }) => {
  if (!user) return { status: { equals: 'published' } }
  if (user.role === 'admin' || user.role === 'principal') return true
  return {
    and: [{ category: { equals: 'department' } }, { department: { equals: user.department } }],
  }
}
export const newsModify: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin' || user.role === 'principal') return true
  if (user.role === 'editor' && user.department)
    return {
      and: [{ category: { equals: 'department' } }, { department: { equals: user.department } }],
    }
  return false
}

// USERS --------------------------------------------------------------------
// Admin/Principal read all; everyone else only themselves. Only admin manages accounts.
export const userRead: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin' || user.role === 'principal') return true
  return { id: { equals: user.id } }
}
export const userUpdate: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return { id: { equals: user.id } } // self-service profile edits
}
