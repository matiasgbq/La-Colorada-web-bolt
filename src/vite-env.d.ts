/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_MODE?: 'landing' | 'full';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'virtual:menu-flyers' {
  type MenuFlyer = {
    readonly src: string;
    readonly alt: string;
  };

  const menuFlyers: readonly MenuFlyer[];
  export default menuFlyers;
}
