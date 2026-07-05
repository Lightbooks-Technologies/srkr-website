import type { CollectionConfig } from 'payload'
import { newsRead, newsModify, isLoggedIn } from '../access'
import { rebuildOnPublish, rebuildOnDelete } from '../hooks/triggerDeploy'

// News & Updates module.
// Public API returns only Published items; Drafts are visible to logged-in staff.
// Department editors are scoped to department-level news for their own department.
export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'News Item', plural: 'News & Updates' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'status'],
    group: 'Content',
  },
  access: {
    read: newsRead,
    create: isLoggedIn,
    update: newsModify,
    delete: newsModify,
  },
  hooks: {
    // Force department editors to department-level news for their own department.
    beforeValidate: [
      ({ data, req }) => {
        const u = req.user
        if (u && u.role === 'editor' && u.department && data) {
          data.category = 'department'
          data.department = u.department
        }
        return data
      },
    ],
    afterChange: [rebuildOnPublish],
    afterDelete: [rebuildOnDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Date shown on the news card.',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd MMM yyyy' },
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'department',
      admin: {
        description: 'Category tagging for filtering.',
        // District-level tagging is reserved for admin/principal.
        condition: (_data, _sibling, { user }) => user?.role !== 'editor',
      },
      options: [
        { label: 'District-level', value: 'district' },
        { label: 'Department-level', value: 'department' },
      ],
    },
    {
      name: 'department',
      type: 'select',
      admin: {
        description: 'Only used when category is Department-level.',
        condition: (data, _sibling, { user }) =>
          user?.role !== 'editor' && data?.category === 'department',
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
        { label: 'Institute-wide', value: 'institute' },
      ],
    },
    { name: 'summary', type: 'richText', admin: { description: 'Short body / details (optional).' } },
    {
      name: 'links',
      type: 'array',
      label: 'Links',
      admin: { description: 'Add / edit / delete related links.' },
      labels: { singular: 'Link', plural: 'Links' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true, admin: { description: 'Full URL, e.g. https://…' } },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Optional image.' } },
    { name: 'attachment', type: 'upload', relationTo: 'media', admin: { description: 'Optional PDF/attachment.' } },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Draft (unpublished)', value: 'draft' },
        { label: 'Published (live)', value: 'published' },
      ],
    },
  ],
}
