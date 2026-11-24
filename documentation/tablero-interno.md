# Herramienta interna de La Colorada

## Uso actual

Desde el 18/11/2026 el personal usa https://la-colorada-precios-local.vercel.app/ en la computadora del local. Es la base que Matías quiere evolucionar a un tablero de trabajo interno.

La implementación está en tools/precios-local. El proyecto Vercel la-colorada-precios-local despliega main desde esa carpeta. El sitio para clientes está en Cloudflare Pages y el proyecto Vercel de la web conserva su función de preview.

Hoy permite consultar precios, buscar por nombre/código, filtrar categorías y ver los atributos Veggie y Primaria. Las filas marcadas Primaria van primero dentro de cada categoría; al ver Todo se pueden expandir o contraer las secciones individualmente o todas juntas. Al buscar, las secciones con coincidencias se abren para mostrar resultados; la elección de secciones plegadas se conserva durante los refrescos de datos en la misma pestaña. La calculadora de mostrador permite agregar platos, sumar/restar unidades, elegir ensalada con una tarta, preparar pizzas mitad y mitad y vaciar con confirmación. La sección mitad y mitad está plegada por defecto; se eligen dos variedades de pizza (no fainá), se toma el 50 % del precio de cada pizza entera publicada, se suman ambos importes y se redondea al peso. No hay selector de política de cobro. El total se calcula con los precios unitarios tomados al agregar cada renglón.

La lista consulta el catálogo público oficial al abrir, al volver a la pestaña, al actualizar manualmente y cada cinco minutos mientras está visible. Filtra los platos ofrecidos y usa los mismos IDs y precios. Los renglones ya agregados conservan el precio que tomaron al agregarse; una actualización de la lista no recalcula ese pedido.

El pedido vive en memoria de la pestaña y se pierde al recargar o cerrar. La calculadora actual no genera registros compartidos, tickets, estados de cocina ni mensajes de WhatsApp.

## Acceso y datos

El enlace está destinado al uso interno y actualmente abre sin iniciar sesión. Tiene noindex, nofollow. Al desarrollar funciones con pedidos y datos personales, definir acceso del personal, persistencia y visibilidad por rol junto con #8/#24/#29 antes de exponer esos datos.

## Objetivo del desarrollo interno — visión abierta (23/11/2026)

El propósito es contar con **un lugar de trabajo interno compartido y simple**, partiendo de la herramienta de precios actual. No se adoptó todavía un diseño definitivo ni se decidió cómo se implementará cada módulo. Los ejemplos siguientes son hipótesis de evolución que habrá que validar con la operación real, sin añadir complejidad innecesaria.

## Visión de Matías — 23/11/2026

Evolucionar esta misma herramienta para que quien atiende en el local pueda gestionar el trabajo cotidiano desde la computadora.

- Tomar pedidos de mostrador o teléfono y generar su ticket.
- Ver pedidos pendientes de preparar, retirar, enviar y entregar.
- Tener una vista de cocina con los platos que hay que preparar y cambios de estado.
- Recibir mensajes de WhatsApp mediante una integración autorizada y preparar pedidos estructurados para revisión.
- Compartir los pedidos entre mostrador y cocina usando el mismo catálogo y los mismos códigos.

Estas capacidades quedan en Backlog/Discovery dentro de #29. La impresora y el formato del ticket, estados definitivos, flujo de aceptación, usuarios y conexión de WhatsApp se definen con Matías y el equipo. El soporte MCP y los agentes se conectarán a las mismas reglas de negocio cuando existan esas operaciones.

## Próximo alcance a definir

Retomar #29 y relevar un pedido real de mostrador y uno telefónico de principio a fin. Definir cuándo se guarda, quién acepta, cómo llega a cocina, qué se imprime y cómo se cierra. Decidir persistencia, control de acceso y tratamiento de reintentos antes de implementar el primer pedido compartido.

La conexión de Supabase y las herramientas disponibles de n8n son capacidades de desarrollo; su disponibilidad no demuestra que la central o la integración de WhatsApp estén implementadas.

## Mantenimiento y estado documental

El código de `tools/precios-local/` determina las funciones actualmente disponibles. Este documento describe su operación y la visión, pero no replica el catálogo ni sus precios: esa fuente vigente es `src/data.ts` y el JSON publicado. **Cada PR que altere el panel debe ajustar su descripción operativa en este documento y, si corresponde, el resumen del README**, siguiendo `AGENTS.md` y la plantilla de PR, sin esperar una solicitud manual de Matías. Mantener la evidencia histórica de abajo sin editarla retroactivamente.

## Evidencia de la auditoría — 23/11/2026

Main auditado en c200ab6 (PR #114), con #111 y #112 también fusionadas. La página interna y su API devolvieron 80 platos más el adicional; el catálogo oficial expone 12 primarios. La documentación de uso de #115 seguía en borrador y se incorpora en la PR de esta auditoría. El flujo del carrusel #116 continúa como borrador separado.

El directorio de trabajo original permanece en una rama antigua con modificaciones locales ajenas; la auditoría se realizó en un worktree desde main para preservarlas.

No se verificaron métricas de GA4, indexación efectiva de Google ni la ficha de Business Profile en esta auditoría. Sus estados se siguen en #79, #107 y #98.

## Evolución posterior a esa auditoría — 23/11/2026

- PR #119 incorporó al panel interno una sección plegable «Pizza mitad y mitad» para pedidos de mostrador.
- Refinamiento posterior: regla única **50 % de cada variedad**, sin regla alternativa del precio más alto y sin incluir fainá. Se conserva el precio de cada renglón al agregarlo; sin histórico de pedidos ni sincronización con cocina.
- Los Issues #8, #24, #29 y #120 expresan posibles próximos desarrollos; no equivalen a funcionalidades publicadas.

## Prototipo de central — 24/11/2026 (rama de desarrollo, no publicado)

Refs #29. Este corte experimental propone tres vistas: Nuevo pedido (catálogo vigente, carrito y datos), En curso (cola y estado) y Consulta de precios (sin controles de compra). Se conservan búsqueda, primarias, adicionales y regla mitad y mitad. El modelo `tools/precios-local/order-model.js` separa ítems, importes, canal, entrega, datos de cliente, pago y estado de la interfaz. Los pedidos nuevos requieren revisión; delivery exige dirección; el método de pago es independiente de si se pagó. Estados de prueba: nuevo → confirmado → preparación → listo → en camino (delivery) → entregado; cancelación desde estados abiertos. Los registros son ficticios y solo viven en memoria de una pestaña, sin almacenamiento, envío, acceso compartido ni impresión. No cargar datos reales en esta preview. La UI permite simular ingreso manual de WhatsApp/web; no implica integración.

### Próximo corte: captura web y WhatsApp (propuesta, no implementado)

Hoy `src/components/OrderModal.tsx` confirma un carrito y abre WhatsApp con texto generado por `src/cart-items.ts`. Agregar en la confirmación un paso compacto: nombre, retiro/delivery, dirección estructurada (calle, número, localidad, piso/depto, referencias) obligatoria solo para delivery, medio de pago y notas. Teléfono solo cuando sea necesario para coordinar. No recolectar números de tarjeta ni asumir que una transferencia fue pagada. Primero validar UX y reglas de entrega con el local; luego POST de solicitud a API autenticada para operadores / endpoint público restringido para clientes con validación servidor de SKUs, precios, disponibilidad, idempotencia y límites de abuso. Devolver referencia de solicitud, no promesa de aceptación. WhatsApp puede recibir referencia y confirmación; no enviar datos personales en parámetros de analítica ni logs.

Separar persistencia de clientes/direcciones, pedidos, renglones (precio histórico y variantes), eventos de estado y pagos. Supabase es candidato, no decisión: requiere Auth, RLS por rol y acceso restringido al personal antes de guardar datos reales; backend valida transición, total y duplicados. Webhook oficial WhatsApp Business → bandeja de mensajes → propuesta estructurada por código/variante → revisión humana → pedido confirmado. Vincular el ID externo y usar idempotencia. La central consulta pedidos compartidos y puede tener vista de cocina sin teléfono/dirección; no usar scraping de WhatsApp. Mantener la carta publicada como fuente de precios durante la transición. Próximos pasos: acordar entrega, pagos, seguridad, persistencia, API y pruebas con Matías y Lucho antes de merge. No se activaron servicios ni se cambió el sitio público.
