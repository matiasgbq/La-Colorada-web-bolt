# La Colorada — Web

Sitio oficial de La Colorada, en la Galería Colorada de La Horqueta, San Isidro. Presenta el negocio, menú, galería, opiniones, ubicación y canales de pedido.

## Enlaces y gobierno

- Producción: https://lacoloradacocina.com.ar
- Desarrollo y previews: Vercel
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

## Comandos

- `npm run dev` — servidor local.
- `npm run build` — compilación en `dist/`.
- `npm run preview` — sirve la compilación.
- `npm run typecheck` — TypeScript.
- `npm run lint` — ESLint.
- `npm run verify` — valida código y los modos `full` y `landing`.
- `npm run backlog:current` — muestra el trabajo activo; requiere GitHub CLI autenticado.

## Carrusel

El Hero incorpora en cada build todas las imágenes compatibles ubicadas directamente en `public/images/`, ordenadas alfabéticamente con comparación numérica. Para actualizarlo, agregar o eliminar archivos y usar prefijos `01-`, `02-`, etc.

Admite AVIF, GIF, JPEG, JPG, PNG, SVG y WebP. Para menús se recomienda orientación vertical cercana a `1131 × 1600 px` y menos de `500 KB`. Las carpetas internas (`gallery/`, `menu/`, `social/`) no forman parte del carrusel.

## Modos y despliegue

- `full`: sitio completo con menú y carrito; valor por defecto y previews de Vercel.
- `landing`: producción actual en Cloudflare Pages, sin menú ni carrito y con pedido por WhatsApp.

Cloudflare Pages:

```text
Production branch: main
Build command: npm run build
Build output directory: dist
Environment variable: VITE_SITE_MODE=landing
```

Para publicar `full`, cambiar esa variable y desplegar el último `main`. El tag `full-site-before-landing-mvp-2026-09-23` conserva un respaldo adicional.
