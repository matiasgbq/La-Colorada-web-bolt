# Herramienta interna de La Colorada

## Uso actual

Desde el 18/11/2026 el personal usa https://la-colorada-precios-local.vercel.app/ en la computadora del local. Es la base que Matías quiere evolucionar a un tablero de trabajo interno.

La implementación está en tools/precios-local. El proyecto Vercel la-colorada-precios-local despliega main desde esa carpeta. El sitio para clientes está en Cloudflare Pages y el proyecto Vercel de la web conserva su función de preview.

Hoy permite consultar precios, buscar por nombre/código, filtrar categorías y ver los atributos Veggie y Primaria. La calculadora de mostrador permite agregar platos, sumar/restar unidades, elegir ensalada con una tarta y vaciar con confirmación. El total se calcula con los precios unitarios tomados al agregar cada renglón.

La lista consulta el catálogo público oficial al abrir, al volver a la pestaña, al actualizar manualmente y cada cinco minutos mientras está visible. Filtra los platos ofrecidos y usa los mismos IDs y precios. Los renglones ya agregados conservan el precio que tomaron al agregarse; una actualización de la lista no recalcula ese pedido.

El pedido vive en memoria de la pestaña y se pierde al recargar o cerrar. La calculadora actual no genera registros compartidos, tickets, estados de cocina ni mensajes de WhatsApp.

## Acceso y datos

El enlace está destinado al uso interno y actualmente abre sin iniciar sesión. Tiene noindex, nofollow. Al desarrollar funciones con pedidos y datos personales, definir acceso del personal, persistencia y visibilidad por rol junto con #8/#24/#29 antes de exponer esos datos.

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

## Evidencia de la auditoría — 23/11/2026

Main auditado en c200ab6 (PR #114), con #111 y #112 también fusionadas. La página interna y su API devolvieron 80 platos más el adicional; el catálogo oficial expone 12 primarios. La documentación de uso de #115 seguía en borrador y se incorpora en la PR de esta auditoría. El flujo del carrusel #116 continúa como borrador separado.

El directorio de trabajo original permanece en una rama antigua con modificaciones locales ajenas; la auditoría se realizó en un worktree desde main para preservarlas.

No se verificaron métricas de GA4, indexación efectiva de Google ni la ficha de Business Profile en esta auditoría. Sus estados se siguen en #79, #107 y #98.
