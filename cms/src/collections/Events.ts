import type { CollectionConfig } from 'payload'
import { eventRead, eventModify, isLoggedIn } from '../access'
import { rebuildOnPublish, rebuildOnDelete } from '../hooks/triggerDeploy'

// Upcoming Events module.
// Public API returns only Published events; Drafts are visible to logged-in staff.
// Department editors are scoped to their own department (see access.ts + hook below).
export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Event', plural: 'Upcoming Events' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'department', 'date', 'status'],
    group: 'Content',
  },
  access: {
    read: eventRead,
    create: isLoggedIn,
    update: eventModify,
    delete: eventModify,
  },
  hooks: {
    // Force a department editor's records to their own department, regardless of input.
    beforeValidate: [
      ({ data, req }) => {
        const u = req.user
        if (u && u.role === 'editor' && u.department && data) {
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
      name: 'department',
      type: 'select',
      required: true,
      admin: {
        description: 'Department-wise categorization.',
        // Department editors don't choose — it's locked to their own department.
        condition: (_data, _sibling, { user }) => user?.role !== 'editor',
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
    {
      type: 'row',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
          admin: {
            width: '50%',
            date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd MMM yyyy, h:mm a' },
          },
        },
        { name: 'venue', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      name: 'dateText',
      type: 'text',
      admin: {
        description: 'Optional display text for multi-day events, e.g. "29 June – 3 July, 2026". Overrides the formatted date on the website.',
      },
    },
    { name: 'description', type: 'richText' },
    {
      name: 'registrationLink',
      type: 'text',
      admin: { description: 'Full registration URL, e.g. https://forms.gle/…' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Banner / poster image.' },
    },
    {
      name: 'attachment',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional brochure / PDF.' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Draft (hidden)', value: 'draft' },
        { label: 'Published (live)', value: 'published' },
      ],
    },
  ],
}
