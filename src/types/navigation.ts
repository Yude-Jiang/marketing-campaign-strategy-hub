import type { ElementType } from 'react';

/** Navigation group identifiers — matches the three nav sections in AppShell. */
export type NavGroup = 'v1' | 'v2' | 'legacy';

/** Canonical config shape for a single left-nav entry. */
export interface NavItemConfig {
  /** Stable unique key (kebab-case, matches route segment). */
  key: string;
  /** Display label shown in the sidebar. */
  label: string;
  /** Which section / phase this item belongs to. */
  group: NavGroup;
  /** Absolute path for React Router <NavLink>. */
  path: string;
  /** Lucide icon component rendered in the nav rail. */
  icon: ElementType;
}
