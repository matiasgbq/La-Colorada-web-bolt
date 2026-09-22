# Revisión de fotos del menú

## Objetivo

Revisar y aprobar visualmente las fotos reales antes de conectarlas con el menú publicado.

## Estado reiniciable

- Issue: #45.
- Rama: `codex/photo-audit-review`.
- Los originales permanecen en `repo-fotos/platos/` sin modificaciones.
- La galería se genera con `node scripts/generate-photo-review.mjs`.
- Abrir `repo-fotos/revision/index.html` para comparar original y recorte de tarjeta.
- `inventario.json` contiene el estado técnico de cada archivo.

## Estados iniciales

- **Necesita edición:** imagen válida pendiente de aprobación, encuadre y WebP.
- **Dudosa:** el mismo archivo aparece asignado a varios platos o categorías.
- **Sin foto:** el archivo con extensión `.jpg` contiene JSON y no una imagen.
- **Lista:** se asignará después de la revisión humana.

## Próximo paso

Matías revisa la galería. Con su selección se genera una segunda tanda no destructiva de WebP optimizados y placeholders por categoría. La conexión con `src/data.ts` ocurre recién después de esa aprobación.
