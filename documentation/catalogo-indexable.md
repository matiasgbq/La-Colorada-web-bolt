# Catálogo indexable V1

Issue #96. Origen operativo: `MENU` / `CATEGORIES` en `src/data.ts`; datos del restaurante: `SITE` en `src/site-data.ts`. No hay conexión al Excel todavía.

## Salidas de un mismo build

En modo `full`:
- `/carta/`: HTML estático completo, fotos, categorías, precios ARS y enlace al menú interactivo para armar el pedido. No necesita JavaScript para leer los productos.
- `/catalogo.json`: contrato versión `1.0`; restaurante, reglas de pedido, categorías e items con `id`, `code`, nombre, descripción, precio, moneda, imagen y URL estable. Cada item informa active, available y availability según los atributos de la fuente; available ausente representa disponibilidad desconocida. No informa cantidades de stock.
- Los adicionales son hijos de su tarta (`optional`, `requiresParent`), nunca un producto vendible por separado. La suma se sigue resolviendo en el carrito existente.
- JSON-LD Restaurant enlaza `/carta/`; la carta contiene Menu, MenuSection, MenuItem y Offer. La URL de cada plato usa su código estable como ancla de la carta, no una supuesta página independiente.
- Sitemap incluye raíz, carta y las páginas definidas en src/discovery.ts; robots referencia sitemap; llms.txt y el footer enlazan la nueva carta, y la carta enlaza el JSON.

Modificar los datos del catálogo y reconstruir actualiza todas las salidas. No editar archivos generados. No se infieren variantes, alérgenos, dietas, nutrición ni disponibilidad. La etiqueta comercial existente viaja como `label`, sin convertirla automáticamente en una certificación dietaria.

## Publicación y previews

En modo `landing` no se emiten carta ni JSON, ni se enlazan en sitemap, llms.txt o footer. El middleware de desarrollo responde 404 para esas rutas. El hosting puede aplicar su fallback de SPA a rutas inexistentes, pero el catálogo no se incluye en esos archivos HTML.

El proyecto web de Vercel se usa para previews; el proyecto separado de precios es de uso interno del local. En la web, `vercel.json` agrega `X-Robots-Tag: noindex, follow` a las respuestas. Los builds con `VERCEL=1` o Cloudflare de rama distinta de main también incluyen meta noindex y `_headers`. Las URLs canónicas siempre apuntan al dominio oficial. En dev la carta también tiene noindex.

El menú fue publicado con aprobación el 05/11/2026. Las nuevas páginas siguen el sitemap del sitio. La solicitud y verificación de indexación se sigue en #107; publicar o solicitar rastreo no confirma inclusión en Google.

## Google Business Profile

El Issue #98 registra una carga por FoodMenus verificada el 11/11/2026: 80 platos, siete secciones y lectura posterior de nombres y precios. También registra enlaces propios preferidos para retiro y entrega. Esa evidencia es histórica; esta auditoría no volvió a consultar la ficha.

La sincronización recurrente y el manejo de expiración OAuth siguen pendientes en #98. Web y listado interno consumen el catálogo publicado; una carga puntual a Google no configura actualización automática.

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

## Activo y disponible — Issue #99

Los dos atributos opcionales se editan en cada registro de `src/data.ts`:

```ts
{ id: '...', code: '...', active: true, available: false, /* resto de datos */ }
```

- `active: false`: archivado, fuera de oferta; preservar el registro y su ID.
- `available: false`: oculto temporalmente; al habilitarlo vuelve con el mismo ID.
- Campos sin definir: conserva la oferta actual; disponibilidad desconocida. No se marcaron masivamente platos como disponibles ni se cambiaron precios.
- `isPublicDish` es el mismo filtro para grilla, búsqueda, carta, JSON y Schema. Los registros internos nunca se borran para ocultar un plato. Las categorías vacías no contienen ofertas.
- El JSON público solo contiene platos ofrecidos; incluye `active` y `available` (null si desconocido). No es un inventario administrativo de productos archivados.

El carrito solicita `/catalogo.json` sin caché antes de abrir la confirmación. Valida el formato, recalcula precios y adicionales desde la fuente publicada y conserva cantidades. Si un plato o su adicional desapareció, retira ese renglón y avisa. Si cambió el precio o descripción, actualiza y pide revisar antes de un nuevo intento. Una respuesta inválida, fallo HTTP o timeout bloquea continuar; nunca reemplaza un error con stock disponible.

Esto valida la oferta publicada al momento de preparar la confirmación, no reserva stock ni garantiza aceptación del local. Las modificaciones de datos siguen requiriendo build/deploy; la operación instantánea desde celulares pertenece a #8/#24. No hay panel en esta entrega.

Evidencia: tests con activo/disponible false y restauración por mismo ID, exclusión HTML/JSON/Schema, cambio de precio y retirada de adicional. Prueba de navegador con servidor de fixtures aislado: producto de $20.000 a $21.000 dispara aviso sin abrir confirmación; luego available=false lo retira del carrito. No se alteró el catálogo comercial durante esas simulaciones.


## Primarias y herramienta interna — 18/11/2026

primaryOrder en src/data.ts define la selección y el orden de los platos primarios por categoría. El JSON deriva primary y primaryOrder. Milanesas y Pizzas muestran seis primarios con expansión al resto; el buscador consulta todo el menú público. Ojear toda la carta ofrece una lista compacta de categorías y precios.

La herramienta interna consume este JSON y muestra sus atributos. Su contrato y estado operativo están en [Tablero interno](tablero-interno.md). La edición desde un administrador queda en #24.
