# La Colorada — Web

Sitio oficial de La Colorada, en la Galería Colorada de La Horqueta, San Isidro. Presenta el negocio, menú, galería, opiniones, ubicación y canales de pedido.

## Enlaces y gobierno

- Producción: https://lacoloradacocina.com.ar
- Desarrollo y previews: Vercel
- Herramienta interna del local: [Precios y pedido de mostrador](https://la-colorada-precios-local.vercel.app/)
- Repositorio: https://github.com/matiasgbq/La-Colorada-web-bolt
- Backlog: https://github.com/users/matiasgbq/projects/2

Matías es el Product Owner. GitHub Issues define alcance y aceptación; GitHub Project, prioridad y estado; las pull requests, trazabilidad, evidencia y preview. Trello es histórico.

## Fuentes canónicas

- `src/site-data.ts`: datos oficiales y URL canónica.
- `src/data.ts`: menú, galería y opiniones.
- `public/images/`: imágenes publicadas y carrusel.
- `repo-fotos/`: originales, inventario y revisión.
- `vite/siteArtifacts.ts`: metadatos, JSON-LD, `robots.txt`, `sitemap.xml` y `llms.txt` derivados.

Stack: React 18, TypeScript, Vite, Tailwind CSS y Lucide React.

## Herramienta interna del local

Desde el 18/11/2026, el personal del local usa [Precios y pedido de mostrador](https://la-colorada-precios-local.vercel.app/) para consultar precios y calcular el total frente al cliente. El enlace está destinado al equipo del local y abre sin iniciar sesión.

- Para consultar un precio, elegí una categoría o buscá por nombre o código. La columna de atributos muestra Veggie y Primaria cuando corresponden. Las filas **Primaria** aparecen primero en cada categoría; con el filtro **Todo** se pueden plegar/desplegar secciones individualmente o usar **Expandir todas / Contraer todas**. Una búsqueda despliega los resultados coincidentes.
- Para calcular un pedido, usá **Agregar**, **+** y **−**. Las tartas tienen la opción **Con ensalada**. En **Pizza mitad y mitad** (plegada por defecto) se eligen dos variedades y se cobra el 50 % del precio publicado de cada una, sumados y redondeados al peso; fainá queda excluida de esa combinación. Al terminar, usá **Vaciar pedido**.
- El pedido y los precios unitarios que tomó al agregar cada plato quedan en la pestaña hasta vaciar el pedido o recargar. Es una calculadora de mostrador, sin historial ni envío a cocina.
- La lista consulta el [catálogo publicado](https://lacoloradacocina.com.ar/catalogo.json) al abrir, al volver a la pestaña, cada cinco minutos mientras esté visible y al pulsar **Actualizar precios**. Los cambios de precio se hacen en el catálogo.
- El proyecto separado de Vercel `la-colorada-precios-local` despliega desde `main` con raíz `tools/precios-local`. Después de publicar, verificar que abra la lista, que se puedan agregar platos y que `/api/catalog` entregue datos.

### Prototipo de desarrollo — Central de pedidos (24/11/2026)

Esta rama experimental agrega navegación entre nuevo pedido, consulta de precios y cola de pedidos simulados, con datos de entrega y pago. Solo datos ficticios en memoria; no usar en operación real. Ver [alcance y próximos cortes](documentation/tablero-interno.md#prototipo-de-central--24112026-rama-de-desarrollo-no-publicado). No implica publicación en producción.

### Visión de evolución del panel interno

Esta misma dirección es la base de un futuro **sistema interno de organización y operación del local**, no solamente una calculadora: se busca ordenar la recepción de pedidos, el seguimiento de preparación, retiro y delivery, el trabajo entre mostrador y cocina y la administración autorizada del catálogo. Es una **visión en descubrimiento**, no un diseño cerrado ni funcionalidades ya disponibles. Los flujos, roles, persistencia, impresión y conexiones con WhatsApp se decidirán con Matías y Lucho a partir del uso real.

- **Estado y alcance vigente:** [documentación de la herramienta interna](documentation/tablero-interno.md).
- **Pedidos y operación futura:** Issue #29.
- **Editor de productos y precios:** Issues #8 y #24, sujetos a prototipo y aprobación.
- **Sincronización de canales y flyers:** Issue #120.
- **Sistema de trabajo multiagente y mantenimiento documental:** [AGENTS.md](AGENTS.md) y [plantilla de PR](.github/pull_request_template.md).

## Comandos

- `npm run dev` — servidor local.
- `npm run build` — compilación en `dist/`.
- `npm run preview` — sirve la compilación.
- `npm run typecheck` — TypeScript.
- `npm run lint` — ESLint.
- `npm run verify` — valida código y los modos `full` y `landing`.
- `npm run backlog:current` — muestra el trabajo activo; requiere GitHub CLI autenticado.

Ver [estado y evolución del tablero interno](documentation/tablero-interno.md).

## Carrusel

El Hero incorpora en cada build todas las imágenes compatibles ubicadas directamente en `public/images/`, ordenadas alfabéticamente con comparación numérica. Para actualizarlo, agregar o eliminar archivos y usar prefijos `01-`, `02-`, etc.

Admite AVIF, GIF, JPEG, JPG, PNG, SVG y WebP. Para menús se recomienda orientación vertical cercana a `1131 × 1600 px` y menos de `500 KB`. Las carpetas internas (`gallery/`, `menu/`, `social/`) no forman parte del carrusel.

## Modos y despliegue

- `full`: sitio completo con menú y carrito; producción actual en Cloudflare Pages, valor por defecto y previews de Vercel.
- `landing`: alternativa de rollback, sin menú ni carrito y con pedido por WhatsApp.

El lanzamiento oficial fue aprobado por Matías y verificado el 05/11/2026. El dominio oficial publica el menú interactivo, `/carta/` (HTML completo) y `/catalogo.json` desde el mismo catálogo.

Cloudflare Pages:

```text
Production branch: main
Build command: npm run build
Build output directory: dist
Environment variable: VITE_SITE_MODE=full
```

Para volver temporalmente a `landing`, cambiar la variable a `VITE_SITE_MODE=landing` y reconstruir/desplegar `main`; ese modo no publica la carta ni el JSON. El tag `full-site-before-landing-mvp-2026-09-23` conserva un respaldo adicional. Vercel permanece con `noindex` para evitar indexar las previews.
