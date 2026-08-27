/// <reference types="vite/client" />

declare module 'virtual:menu-flyers' {
  type MenuFlyer = {
    readonly src: string;
    readonly alt: string;
  };

  const menuFlyers: readonly MenuFlyer[];
  export default menuFlyers;
}
