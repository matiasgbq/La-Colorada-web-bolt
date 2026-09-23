export type SiteMode = 'landing' | 'full';

export const SITE_MODE: SiteMode =
  import.meta.env.VITE_SITE_MODE === 'landing' ? 'landing' : 'full';

export const IS_FULL_SITE = SITE_MODE === 'full';
