import type { CollectionConfig } from 'payload'
import { isAdmin, userRead, userUpdate, adminFieldOnly } from '../access'

// Admin accounts. Auth is email + password (managed here by SRKR admins).
// Only Super Admins can create/delete accounts and change roles/departments.
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Administration',
  },
  auth: true,
  access: {
    read: userRead,
    create: isAdmin,
    update: userUpdate,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      required: true,
      // Only admins may set/alter roles (prevents privilege escalation).
      access: { create: adminFieldOnly, update: adminFieldOnly },
      options: [
        { label: 'Super Admin', value: 'admin' },
        { label: 'Principal', value: 'principal' },
        { label: 'Department Editor', value: 'editor' },
      ],
    },
    {
      name: 'department',
      type: 'select',
      access: { create: adminFieldOnly, update: adminFieldOnly },
      admin: {
        description: 'For Department Editors — which department they manage.',
        condition: (data) => data?.role === 'editor',
      },
      options: [
        { label: 'Computer Science & Engineering (CSE)', value: 'cse' },
        { label: 'Electronics & Communication (ECE)', value: 'ece' },
        { label: 'Electrical & Electronics (EEE)', value: 'eee' },
        { label: 'Mechanical Engineering', value: 'mech' },
        { label: 'Civil Engineering', value: 'civil' },
        { label: 'Information Technology (IT)', value: 'it' },
        { label: 'AI & Data Science (AIDS)', value: 'aids' },
        { label: 'AI & Machine Learning (AIML)', value: 'aiml' },
        { label: 'CSBS', value: 'csbs' },
      ],
    },
  ],
}
