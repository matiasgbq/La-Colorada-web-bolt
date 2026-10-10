# Analytics de La Colorada

Issue: https://github.com/matiasgbq/La-Colorada-web-bolt/issues/77

## Instalación y configuración

GA4: G-KBYW046E26. Propiedad: 558313622; cuenta: 411499010; flujo: 16101425887. La etiqueta se carga una vez, sólo con build de producción y hostname lacoloradacocina.com.ar o www.lacoloradacocina.com.ar. No se carga en localhost, Vercel ni otros subdominios de Cloudflare. No agregar otra etiqueta por Cloudflare o Tag Manager. Merge y publicación requieren aprobación de Matías.

Antes de publicar, en Administrar de GA4:
1. Confirmar que el flujo web corresponde al dominio y al ID anterior. Usar zona horaria Argentina y moneda ARS.
2. En Medición mejorada, desactivar clics salientes y cambios de página basados en historial. Los enlaces de pedidos contienen mensajes; no recoger sus URLs. La vista inicial se envía por la etiqueta. No enviar datos personales en URLs o etiquetas de campañas.
3. Crear definición personalizada de ámbito evento para `contact_position` (posición del botón).
4. Marcar `whatsapp_click` como evento clave. Para la tasa, usar sesiones con ese evento, no cantidad de clics ni total de eventos clave.
5. Revisar tráfico interno en modo prueba antes de excluirlo. No activar filtros definitivos sin revisar su efecto.

No se habilitan Google Signals ni personalización publicitaria. La URL de página enviada se limita a origen y ruta; no se envían query ni fragmentos. Se admite utm_source, utm_medium y utm_campaign como etiquetas de 1–80 caracteres alfanuméricos, guion o guion bajo. Ejemplo: ?utm_source=instagram&utm_medium=social&utm_campaign=perfil. No usar nombres de personas ni clientes en estas etiquetas. El referrer se limita al origen. Validar atribución en GA4 después del despliegue. La política de privacidad y la configuración de consentimiento son una revisión pendiente antes de publicación.

## Eventos

| Evento | Disparador | contact_position |
| --- | --- | --- |
| whatsapp_click | Clic en enlace de WhatsApp | hero, location, order_modal |
| phone_click | Clic en enlace de teléfono | hero, location |
| directions_click | Clic en Cómo llegar | location |

No se envían URL del enlace, teléfono, mensaje, productos, total ni datos del cliente. Los eventos no confirman conversación, llamada, visita al local, pedido ni venta.

## Validación después del despliegue

Probar instalación desde GA4/Tag Assistant, revisar una sola carga de gtag y una vista de página; comprobar los tres eventos en Tiempo real y DebugView. Cada clic debe producir un evento con la posición correspondiente y sin datos del pedido. Probar navegación a WhatsApp y teléfono; el seguimiento no bloquea los enlaces. Confirmar ausencia de la etiqueta en previews. Registrar evidencia en el Issue antes de cerrarlo.

Guía oficial: https://support.google.com/analytics/answer/9322688?hl=es

## Reporte de los lunes

Periodo: lunes a domingo anterior en zona horaria Argentina. Emitir reporte semanal a las 09:00 de Argentina, cuando exista acceso verificable a GA4. Identificar fecha de extracción; domingo puede contener datos aún pendientes de procesamiento.

- Sesiones totales y variación contra semana anterior.
- Sesiones por canal y fuente/medio.
- Sesiones con al menos un whatsapp_click.
- Tasa de contacto = sesiones con whatsapp_click / sesiones totales × 100. Denominador cero: sin datos, no 0%.
- Cantidad de clics en teléfono y ubicación; separar clics de sesiones.
- Una observación respaldada y una acción recomendada.

Primeras cuatro semanas completas desde validación: línea de base sin metas inventadas. Semanas incompletas se identifican y no se comparan como equivalentes. Mantener separados pedidos/ventas confirmados, que requieren otra fuente.

Se verificó acceso directo a GA4 desde Chrome el 10/10/2026. Cuenta La-Colorada; propiedad LaColoradacocina; Argentina/Buenos Aires y ARS. Asistente completado, clics salientes e historial desactivados; dimensión Posición del contacto (contact_position, ámbito evento) creada y whatsapp_click registrado como evento clave. Aún no se recibieron datos porque la etiqueta no está publicada. GSC Wizard rechazó la consulta por suscripción vencida; no contratar para resolverlo. MVP: reportes nativos de GA4/exportación; evolución: API oficial con acceso de lectura y automatización propia, sin intermediarios. Automatización en pausa hasta disponer de datos y validación de producción; no inventar números.

## Cierre MVP

Completar #77 al publicar con aprobación y verificar visitas, los tres contactos y consulta de KPIs en GA4. La automatización por API se considera evolución posterior y no condiciona la instalación inicial. No cambiar el modo landing de producción ni publicar el menú.
