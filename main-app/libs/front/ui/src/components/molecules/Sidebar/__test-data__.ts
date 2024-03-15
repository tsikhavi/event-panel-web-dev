import { Map, Setting } from '../../../assets/images';

import { SidebarNavItems } from './Sidebar';

export const navigations: SidebarNavItems[] = [
  [
    {
      icon: Map,
      variant: 'head',
      label: 'Workspace',
    },
    { path: '/categories', label: 'Categories', variant: 'item' },
    { path: '/properties', label: 'Properties', variant: 'item' },
    { path: '/groups', label: 'Groups', variant: 'item' },
    { path: '/events', label: 'Events', variant: 'item' },
    { path: '/tags', label: 'Tags', variant: 'item' },
  ],
  [
    {
      icon: Setting,
      variant: 'head',
      label: 'Settings',
    },
    { path: '/workspace', label: 'Workspace Settings', variant: 'item' },
    { path: '/switch', label: 'Switch Workspace', variant: 'item' },
    { path: '/billing', label: 'Billing', variant: 'item' },
    { path: '/import', label: 'Import', variant: 'item' },
    { path: '/export', label: 'Export', variant: 'item' },
  ],
];
