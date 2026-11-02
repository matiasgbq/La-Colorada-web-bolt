# Catálogo indexable V1

Issue #96. Origen operativo: `MENU` / `CATEGORIES` en `src/data.ts`; datos del restaurante: `SITE` en `src/site-data.ts`. No hay conexión al Excel todavía.

## Salidas de un mismo build

En modo `full`:
- `/carta/`: HTML estático completo, fotos, categorías, precios ARS y enlace al menú interactivo para armar el pedido. No necesita JavaScript para leer los productos.
- `/catalogo.json`: contrato versión `1.0`; restaurante, reglas de pedido, categorías e items con `id`, `code`, nombre, descripción, precio, moneda, imagen y URL estable. Cada item tiene `availability: unknown`: no declara stock.
- Los adicionales son hijos de su tarta (`optional`, `requiresParent`), nunca un producto vendible por separado. La suma se sigue resolviendo en el carrito existente.
- JSON-LD Restaurant enlaza `/carta/`; la carta contiene Menu, MenuSection, MenuItem y Offer. La URL de cada plato usa su código estable como ancla de la carta, no una supuesta página independiente.
- Sitemap incluye raíz y carta; robots referencia sitemap; llms.txt y el footer enlazan la nueva carta, y la carta enlaza el JSON.

Modificar los datos del catálogo y reconstruir actualiza todas las salidas. No editar archivos generados. No se infieren variantes, alérgenos, dietas, nutrición ni disponibilidad. La etiqueta comercial existente viaja como `label`, sin convertirla automáticamente en una certificación dietaria.

## Publicación y previews

En modo `landing` no se emiten carta ni JSON, ni se enlazan en sitemap, llms.txt o footer. El middleware de desarrollo responde 404 para esas rutas. El hosting puede aplicar su fallback de SPA a rutas inexistentes, pero el catálogo no se incluye en esos archivos HTML.

Vercel se usa para pruebas: `vercel.json` agrega `X-Robots-Tag: noindex, follow` a las respuestas. Los builds con `VERCEL=1` o Cloudflare de rama distinta de main también incluyen meta noindex y `_headers`. Las URLs canónicas siempre apuntan al dominio oficial. En dev la carta también tiene noindex.

La publicación del menú en el dominio oficial sigue requiriendo aprobación. Antes de publicarlo, verificar acceso HTTP, canonical, robots, sitemap, Schema y Search Console. Esta V1 no modifica Google Business Profile y no garantiza indexación ni aparición en resultados enriquecidos.

## Google Business Profile

El próximo paso público será asociar la URL de la carta en el enlace de menú del perfil. Google puede extraer datos del sitio, pero no se considera una sincronización garantizada. Para sincronización explícita hay que verificar acceso a API, elegibilidad `canHaveFoodMenus`, leer el menú existente y presentar el diff antes de escribir con FoodMenus. Las fotos del menú nativo usan mediaKey. No se implementó un conector en V1.

Fuentes oficiales revisadas en #96:
- https://support.google.com/business/answer/9455840?hl=es
- https://developers.google.com/my-business/content/update-food-menus
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/docs/appearance/ai-features
- https://schema.org/Menu

## Futuro asistente

El JSON es una entrada de lectura, no una API que acepta pedidos. Un futuro asistente puede buscar por códigos y preparar un borrador; precios, cantidades y adicionales deben validarse contra el catálogo vigente con lógica determinista. El usuario confirma antes de continuar por WhatsApp; eso no prueba aceptación del local, pago ni venta. No se implementaron modelo, agente ni envío automático.

## Verificación

`npm run verify` comprueba paridad con el catálogo fuente, precios, IDs, fotos, adicionales, escape de contenido, HTML/JSON-LD y separación full/landing. La preview se comprueba además con:

```
VERCEL=1 VITE_SITE_MODE=full npx vite build --outDir .verify-dist/preview
VERCEL=1 SITE_MODE=full DIST_DIR=.verify-dist/preview node scripts/verify-product.mjs
```
