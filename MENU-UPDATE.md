# Actualización provisional del menú — 28/10/2026

Issue: https://github.com/matiasgbq/La-Colorada-web-bolt/issues/80

## Fuente y decisiones

Matías autorizó usar el flyer adjunto (precios impresos al 20/10/2026), hasta que él y Lucho concilien el Excel como fuente única para todas las herramientas. No hay importación automática ni acceso al Excel original en esta entrega.

- Pizzas: solamente grandes; no se incorporan chicas, medianas, individuales ni media pizza.
- Excepciones expresas: Anchoas PIZ007 sigue a $29.000 (flyer $25.000); Muzzarella, Rúcula y Huevo PIZ004 sigue a $22.000 (sin equivalente en flyer).
- Lasagna mixta PAS003 conserva $11.000: ya estaba en web pero no aparece en flyer; pendiente de Lucho.
- Sección propia **Medallones**, separada de Pastas y Más. Cinco variedades de medallones, cada una a $10.000. Sustituyen la ficha genérica `medallones-veg`; no hay persistencia de carrito ni duplicado publicado.
- Empanada La Colorada EMP012: $3.000 y descripción literal del flyer, sin inventar receta secreta.
- Los platos con guarnición se ofrecen con ensalada, sin selector. El cliente puede aclarar cambios por WhatsApp.
- Ensalada para tarta ADI001: $2.500 por tarta seleccionada. Se elige antes de agregarla; con/sin ensalada son renglones distintos. Cantidad, eliminación y total incluyen el adicional; no se puede pedir solo. Para cambiar la opción se quita el renglón y se vuelve a agregar.
- Los códigos son literales y permanentes, no dependen de la posición. No renumerar ni reutilizar códigos retirados. Los IDs técnicos anteriores se conservan salvo la ficha de medallones desglosada.
- Fotos faltantes: se usan placeholders existentes, sin atribuir una foto de otro producto.
- No se modifica el carrusel de flyers ni se publica producción. Landing permanece configurado como antes; lanzamiento sujeto a revisión humana.

## Próximas decisiones con Lucho

Conciliar Excel y flyer, aprobar catálogo/porciones y disponibilidad habitual, resolver excepciones de pizzas y lasagna mixta. Después vincular el Excel con estos códigos. El panel de visibilidad y automatización se retoman en #24/#8; no están implementados.

## Mapeo para conciliar Excel

Los precios siguientes son la instantánea de esta entrega, no otra fuente mantenida en paralelo. La fuente operativa provisional de la web es `src/data.ts`.

| Código | ID técnico | Producto | Precio ARS |
|---|---|---|---:|
| PIZ001 | `muzzarella` | Muzzarella | 20000 |
| PIZ002 | `muzz-albahaca` | Muzzarella y Albahaca | 22000 |
| PIZ003 | `muzz-rucula` | Muzzarella y Rúcula | 22500 |
| PIZ004 | `muzz-rucula-huevo` | Muzzarella, Rúcula y Huevo | 22000 |
| PIZ005 | `muzz-jamon-huevo` | Muzzarella, Jamón y Huevo | 25000 |
| PIZ006 | `muzz-jamon-morron` | Muzzarella, Jamón y Morrón | 28000 |
| PIZ007 | `muzz-anchoas` | Anchoas | 29000 |
| PIZ008 | `4-quesos` | 4 Quesos | 31000 |
| PIZ009 | `provolone` | Provolone | 28000 |
| PIZ010 | `calabresa` | Calabresa | 26000 |
| PIZ011 | `napolitana` | Napolitana | 25000 |
| PIZ012 | `napolitana-jamon` | Napolitana con Jamón | 28000 |
| PIZ013 | `jamon-crudo-rucula` | Jamón Crudo y Rúcula | 29000 |
| PIZ014 | `palmitos` | Palmitos | 29000 |
| PIZ015 | `fugazeta` | Fugazeta | 22000 |
| PIZ016 | `faina` | Fainá | 2000 |
| PIZ017 | `muzz-huevo` | Muzzarella y Huevo | 23000 |
| PIZ018 | `muzz-jamon` | Muzzarella y Jamón | 24000 |
| PIZ019 | `muzzarella-anchoas` | Muzzarella y Anchoas | 28000 |
| EMP001 | `carne-suave` | Carne Suave | 3000 |
| EMP002 | `carne-picante` | Carne Picante | 3000 |
| EMP003 | `carne-cuchillo` | Carne Cortada a Cuchillo | 3500 |
| EMP004 | `pollo` | Pollo | 3000 |
| EMP005 | `verdura` | Verdura | 3000 |
| EMP006 | `humita` | Humita | 3000 |
| EMP007 | `jamon-queso` | Jamón y Queso | 3000 |
| EMP008 | `roquefort` | Roquefort | 3000 |
| EMP009 | `queso-cebolla` | Queso y Cebolla | 3000 |
| EMP010 | `capresse` | Capresse | 3000 |
| EMP011 | `crudo-queso` | Crudo y Queso | 3000 |
| EMP012 | `empanada-la-colorada` | La Colorada (de la Casa) | 3000 |
| ENS001 | `ensalada-dia` | Ensalada del Día | 12000 |
| ENS002 | `ensalada-dia-veg` | Ensalada del Día Vegetariana | 10000 |
| ENS003 | `mix-verdes` | Mix Verdes | 11000 |
| ENS004 | `cesar` | César | 12000 |
| TAR001 | `tarta-verdura` | Tarta de Verdura | 9000 |
| TAR002 | `tarta-calabaza` | Tarta de Calabaza | 9000 |
| TAR003 | `tarta-humita` | Tarta de Humita | 9500 |
| TAR004 | `tarta-zapallito` | Tarta de Zapallito | 9000 |
| TAR005 | `tarta-jamon-queso` | Tarta de Jamón y Queso | 9500 |
| TAR006 | `tarta-capresse` | Tarta Capresse | 9500 |
| MIL001 | `mila-ternera` | Milanesa de Ternera al Horno | 13000 |
| MIL002 | `mila-gratinada` | Milanesa con Muzzarella | 15000 |
| MIL003 | `mila-muzz-albahaca` | Milanesa con Muzzarella y Albahaca | 15500 |
| MIL004 | `mila-rucula-huevo` | Milanesa con Muzzarella, Rúcula y Huevo | 16000 |
| MIL005 | `mila-napolitana` | Milanesa a la Napolitana | 17000 |
| MIL006 | `mila-napolitana-jamon` | Milanesa Napolitana con Jamón | 18500 |
| MIL007 | `mila-crudo-rucula` | Milanesa con Jamón Crudo y Rúcula | 20000 |
| MIL008 | `mila-jamon-morron` | Milanesa con Muzzarella, Jamón y Morrón | 20000 |
| MIL009 | `mila-provolone` | Milanesa al Provolone | 21000 |
| MIL010 | `mila-4-quesos` | Milanesa 4 Quesos | 23000 |
| MIL011 | `veg-fugazetta` | Berenjena o Zucchini Fugazetta | 12000 |
| MIL012 | `veg-muzzarella` | Berenjena o Zucchini con Muzzarella | 11000 |
| MIL013 | `veg-napolitana` | Berenjena o Zucchini a la Napolitana | 11000 |
| MIL014 | `veg-rucula-huevo` | Berenjena o Zucchini con Muzzarella, Rúcula y Huevo | 12000 |
| MIL015 | `veg-napolitana-jamon` | Berenjena o Zucchini Napolitana con Jamón | 14000 |
| MIL016 | `veg-jamon-huevo` | Berenjena o Zucchini con Muzzarella, Jamón y Huevo | 14000 |
| MIL017 | `veg-jamon-morron` | Berenjena o Zucchini con Muzzarella, Jamón y Morrón | 16000 |
| MIL018 | `veg-provolone` | Berenjena o Zucchini al Provolone | 17000 |
| MIL019 | `veg-4-quesos` | Berenjena o Zucchini 4 Quesos | 18000 |
| MIL020 | `veg-crudo-rucula` | Berenjena o Zucchini con Jamón Crudo y Rúcula | 18000 |
| MIL021 | `suprema-pollo` | Suprema de Pollo | 12000 |
| MIL022 | `suprema-gratinada` | Suprema de Pollo Gratinada | 13000 |
| MIL023 | `pechuga-grille` | Pechuga Grillé | 13500 |
| MIL024 | `grille-gratinado` | Grillé Gratinado | 15000 |
| PAS001 | `lasagna-carne` | Lasagna de Carne | 12000 |
| PAS002 | `lasagna-verdura` | Lasagna de Verdura | 11000 |
| PAS003 | `lasagna-carne-verdura` | Lasagna de Carne y Verdura | 11000 |
| PAS004 | `canelones-verdura` | Canelones de Verdura | 12000 |
| PAS005 | `canelones-calabaza` | Canelones de Calabaza | 12000 |
| PAS006 | `pastel-papas` | Pastel de Papas | 12000 |
| PAS007 | `omelette-jamon-queso` | Omelette de Jamón y Queso | 10000 |
| PAS008 | `omelette-capresse` | Omelette Capresse | 10000 |
| PAS009 | `falafel` | Falafel con Salsa Tai | 10000 |
| MED001 | `medallones-lentejas` | Medallones de Lentejas Gratinados | 10000 |
| MED002 | `medallones-garbanzos` | Medallones de Garbanzos Gratinados | 10000 |
| MED003 | `medallones-quinoa-curry` | Medallones de Quinoa al Curry Gratinados | 10000 |
| MED004 | `medallones-porotos-colorados` | Medallones de Porotos Colorados Gratinados | 10000 |
| MED005 | `medallones-mijo` | Medallones de Mijo Gratinados | 10000 |
| PAS015 | `pastel-calabaza` | Pastel de Calabaza | 12000 |
| ADI001 | vinculado a cada tarta | Ensalada para tarta | 2500 |

## Verificación

`npm run verify` incluye typecheck, lint, verificación funcional de catálogo/carrito (`scripts/verify-menu.mjs`) y builds con controles de producto en modos full y landing. La revisión visual de mobile y la aceptación del menú corresponden a la revisión previa al lanzamiento.

Resultado: `npm run verify` y `git diff --check` aprobados. Verificación de navegador desktop y móvil (390px): selección de ensalada, total de una y dos tartas, eliminación del renglón y detalle en confirmación/URL WhatsApp. No se envió pedido. Lint: 0 errores, 2 advertencias existentes de react-refresh. Pendiente aceptación humana del catálogo y lanzamiento.

## Integración

Preparado sobre main al 28/10/2026, conservando las fotos y la búsqueda sin distinción de tildes ya integradas. No incluye cambios locales ajenos de reseñas, datos institucionales ni servicios.
