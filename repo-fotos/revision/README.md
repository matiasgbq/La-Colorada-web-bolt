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

## Implementación candidata

La rama `codex/photo-audit-review` incluye una propuesta no destructiva para validar en Preview:

- copias WebP optimizadas en `public/images/menu/`;
- placeholders de marca cuando no existe una foto inequívoca del plato;
- menú y precios alineados con las dos imágenes vigentes del carrusel;
- originales preservados en `repo-fotos/platos/`.

El siguiente paso es la aprobación visual del Preview de Vercel antes de mezclar la rama a `main`.
