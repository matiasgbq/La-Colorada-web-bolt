# Biblioteca de fotos y menú

`repo-fotos/platos/` conserva material fuente. No representa automáticamente el menú publicado ni garantiza que el nombre de archivo sea una asignación aprobada.

## Reglas

- Preservar originales válidos, incluso duplicados, hasta revisión humana.
- Tratar asociaciones repetidas o dudosas como candidatas.
- Registrar faltantes sin crear archivos falsos con extensión de imagen.
- Regenerar la revisión con `node scripts/generate-photo-review.mjs`.
- Publicar copias optimizadas en `public/images/menu/` sólo después de aprobarlas.

El Issue #27 es el seguimiento canónico para inventario, asociación, edición y publicación. Los conteos actuales viven en `repo-fotos/revision/inventario.json`, generado desde los archivos reales.
