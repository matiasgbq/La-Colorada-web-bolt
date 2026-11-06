# Fotos y especialidades indexables — Issue #103

Páginas: `/pizzas/`, `/empanadas/`, `/milanesas/`, `/tartas/` y `/la-colorada-veggie/`.

`src/discovery.ts` aporta contexto editorial y el código de imagen preferida. Productos, precios, fotos y disponibilidad se derivan de `src/data.ts` con el filtro público compartido. No se duplica el catálogo. Veggie muestra las cinco variedades de medallones con queso: vegetarianas, no veganas. Su identidad visual es verde.

Se reutilizan las fotos publicadas aprobadas; algunas son retoques o composiciones basadas en referencias. No se afirma que todas sean fotografías originales sin edición. Se preservan los originales y su procedencia en `repo-fotos/`.

Cada página contiene HTML accesible, fotos, texto, precios, canonical, metadatos sociales y Schema de su categoría. El sitemap incluye las imágenes disponibles y excluye placeholders. No hay contenido exclusivo para robots. El menú principal y el carrito mantienen su comportamiento.

Verificación: `npm run verify` y revisión visual local. Previews y localhost siguen sin indexación; landing no publica las nuevas páginas.

Tras aprobación de Matías para merge/publicación: comprobar HTTP, canonical, fotos y sitemap en el dominio oficial; solicitar rastreo de las cinco páginas en Search Console. La selección de imágenes y los tiempos de indexación dependen de Google. No se modificó Google Business Profile.

Referencia oficial: https://developers.google.com/search/docs/appearance/google-images
