# Revisión de fotos del menú

Esta carpeta permite revisar visualmente la biblioteca antes de publicar assets.

- Fuente de originales: `repo-fotos/platos/`.
- Generación: `node scripts/generate-photo-review.mjs`.
- Vista: `repo-fotos/revision/index.html`.
- Inventario técnico: `repo-fotos/revision/inventario.json`.
- Seguimiento funcional: Issue #27.

Los originales válidos se preservan aunque estén duplicados o su asociación sea dudosa. La vista compara original y recorte aproximado; aprobar una foto y convertirla a WebP es una decisión posterior.

## Faltantes conocidos

Se eliminaron once archivos de 69 bytes que tenían extensión `.jpg` pero contenían una respuesta JSON `Image not found`: seis pizzas, dos milanesas y tres platos de pastas. El faltante queda registrado sin conservar archivos engañosos.
