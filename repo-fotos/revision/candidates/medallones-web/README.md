# Medallones — imágenes y descripciones

Seguimiento: https://github.com/matiasgbq/La-Colorada-web-bolt/issues/82

## Recetas y copy

Fuente consultada en Drive: [Masala — Manual de recetas de medallones](https://drive.google.com/file/d/1rpAqXzT2lpQNScw4YlA8bWcWXF3cUN24/view). Se resumen ingredientes para describir el plato, sin copiar proporciones ni hacer afirmaciones nutricionales, de certificación o de ausencia de alérgenos. El plato gratinado lleva queso: etiqueta Veggie, sin afirmar vegano.

Se mantienen MED001–MED005 y $10.000 por plato. MED005 se presenta como Mijo y Calabaza; conserva el ID técnico `medallones-mijo`. Cada plato se describe como dos medallones gratinados con queso, orégano y una aceituna por unidad, con ensalada.

## Fuentes visuales

Originales y composiciones fuente conservados en esta carpeta, sin sobrescribir los originales anteriores de PeYa ni Drive. La web usa derivados WebP en `public/images/menu/medallones/`, compresión q85 sin alterar composición ni recortar.

| Archivo | Procedencia | Naturaleza |
|---|---|---|
| lentejas.png | [Drive, foto real v2](https://drive.google.com/file/d/1M-nO0xtn2AeQh6rS8YkH_0FzxhczcABV/view) | Plato oro preexistente, composición basada en medallón real |
| garbanzos.png | [Drive, garbanzos oro](https://drive.google.com/file/d/1QVxtDXNcrT6DIdL-6F-8zcv-0G63PFvD/view) | Plato oro preexistente, composición basada en medallón real |
| quinoa-curry.png | [Muestra curry de Drive](https://drive.google.com/file/d/1Af7Y6wDjF2CqTkBz3uYSBtJr0GK7zhUx/view) | Edición con image_gen para sumar orégano |
| porotos-colorados.png | Oro lentejas/garbanzos y receta de Masala | Composición ilustrativa con image_gen; pendiente aceptación visual, sin foto de porción real identificada |
| mijo.png | Oro lentejas/garbanzos y receta de Masala | Composición ilustrativa con image_gen; pendiente aceptación visual, sin foto de porción real identificada |

Las tres muestras de packaging de Masala consultadas son mockups; no se consideran fotografías reales del producto. No se trasladan sus afirmaciones nutricionales al menú. Las fotos reales base de garbanzo y lentejas siguen en `../peya/medallones/sources/`.

También se revisó La Colorada OS / Banco de contenido en Drive. Sus referencias son contexto visual; la receta se toma del manual Masala, no de los flyers.

## Prompts finales y método

Herramienta: `image_gen` integrada, con archivos locales de referencia. Sin API ni CLI de generación. Salidas conservadas también en la carpeta de generación original de Codex.

- **Quinoa, edición precisa:** objetivo `quinoa-curry-muestra.png`; referencia `lentejas-oro.png`. Cambiar únicamente agregando una pizca pequeña de orégano seco sobre el queso de cada medallón. Mantener plato, porciones, textura, queso, una aceituna verde por medallón, ensalada, fondo blanco, perspectiva y luz. Sin texto, logos, envases ni otros ingredientes. Horizontal 4:3.
- **Porotos, composición:** oro de lentejas y garbanzos como referencia del plato y formato artesanal; mockup de porotos únicamente como referencia de variedad, nunca foto real. Dos medallones bajos, compactos y algo irregulares de porotos colorados, zanahoria, hinojo y morrón, marrón rojizo sutil, queso gratinado, pizca de orégano y una aceituna por unidad. Plato blanco con lechuga, tomate y zanahoria. Fondo blanco y luz natural, horizontal 4:3. Sin carne, pan, envases, textos ni logos. Composición ilustrativa, no foto de una porción real.
- **Mijo, composición:** oro de garbanzos y lentejas como referencia del plato y formato artesanal; mockup de mijo únicamente como referencia de variedad. Dos medallones bajos, compactos y algo irregulares de mijo y calabaza anco, semillas de girasol y sésamo integradas, amarillo anaranjado suave, sin granos inflados gigantes. Queso gratinado, pizca de orégano y una aceituna por unidad. Plato blanco con lechuga, tomate y zanahoria. Fondo blanco y luz natural, horizontal 4:3. Sin carne, pan, envases, textos, logos ni semillas de zapallo. Composición ilustrativa, no foto de una porción real.

## Revisión

Comprobados cinco platos separados, con guarnición, dos unidades, queso, orégano y aceitunas. La selección final de fotos de porotos/mijo requiere aceptación de Matías antes de un nuevo merge o publicación. No se modifica precio ni disponibilidad.
