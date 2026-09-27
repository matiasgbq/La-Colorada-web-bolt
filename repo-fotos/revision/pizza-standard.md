# Patrón visual propuesto para pizzas

Estado: propuesta en laboratorio. Requiere aprobación de Matías antes de aplicarse en lote o publicarse.

## Composición

- Pizza real completa y centrada dentro de una caja oficial de La Colorada.
- Cámara aproximada a 35 grados sobre el producto.
- Encuadre horizontal 4:3, consistente entre todos los sabores.
- La pizza ocupa aproximadamente 70–80 % del cuadro, sin cortar bordes.
- Tapa y frente de la caja visibles para reforzar marca sin tapar el producto.

## Tratamiento

- Luz cálida y natural, detalle nítido y color realista.
- Mantener ingredientes, cantidad y apariencia del plato original.
- Sin precios, textos promocionales, manos, utensilios ni ingredientes decorativos inventados.
- Retoque permitido: exposición, balance de blancos, limpieza menor y composición en la caja.
- Cada candidata asistida por IA debe compararse contra la foto real y aprobarse manualmente.

## Salida

- Master de revisión: PNG o JPG de al menos 1200 × 900 px.
- Publicación web posterior: WebP 1200 × 900 px, calidad visual equivalente.
- PedidosYa: JPG o PNG menor a 6 MB, sujeto a su análisis y revisión editorial.

## Flujo

1. Confirmar que la foto corresponde al plato.
2. Generar una candidata estandarizada preservando la foto real.
3. Comparar original, recorte y candidata en `repo-fotos/revision/index.html`.
4. Matías aprueba, rechaza o pide un ajuste puntual.
5. Sólo las aprobadas se exportan a `public/images/menu/`.
