# QR único para oficinas

Issue: https://github.com/matiasgbq/La-Colorada-web-bolt/issues/101

## Enlace que se imprime

`https://lacoloradacocina.com.ar/o`

Mantener esta URL mientras existan impresos en circulación. Cloudflare Pages aplica `public/_redirects` (302); Vercel aplica la misma ruta mediante `vercel.json` (307). El destino es relativo al mismo sitio:

`/?utm_source=qr&utm_medium=offline&utm_campaign=oficinas#menu`

No usar un acortador externo ni poner las UTM largas dentro del QR. Si cambia el destino, actualizar la redirección y desplegar; no cambiar la URL impresa. La ruta no es una nueva página indexable y no se agrega al sitemap. No publicar ni imprimir en serie hasta aprobación y prueba con celular real.

## Impresión y lectura

- Negro puro sobre blanco, módulos cuadrados, sin logo ni ilustraciones sobre el código.
- Corrección M y margen blanco de al menos cuatro módulos en los cuatro lados.
- Archivo vectorial SVG de 50 × 50 mm, incluido el margen. PNG de alta resolución para herramientas que no admitan SVG.
- Conservar proporción, contraste y margen al colocarlo en un flyer; no recortar ni estirar.
- Papel mate y superficie plana; evitar reflejos y pliegues sobre el código.
- 50 mm es el tamaño inicial propuesto para lectura cercana en oficinas, no una garantía de velocidad o distancia. Probar el impreso final con distintos celulares y la luz del lugar antes de multiplicarlo.

## Medición

La etiqueta GA4 existente admite las tres UTM y solo funciona en el dominio oficial. No agregar otra etiqueta ni cambiar los eventos actuales.

En Adquisición de tráfico, filtrar Campaña de la sesión = `oficinas` y comprobar Fuente/medio de la sesión = `qr / offline`. Seguir sesiones, usuarios y sesiones con al menos un `whatsapp_click` (la tasa usa sesiones, no clics). Esto mide visitas atribuidas al enlace del QR e intención de contacto, no escaneos físicos ni pedidos/ventas confirmados. Si alguien comparte el enlace, ese tráfico también conserva la campaña. Bloqueadores y restricciones de Analytics pueden impedir medición.

No usar datos de clientes, personas ni oficinas identificables en las etiquetas. Las pruebas de atribución se hacen con campaña `oficinas_qa` para separarlas del uso comercial; descartar las lecturas de prueba previas al lanzamiento en los reportes.

## Validación

1. Decodificar SVG/PNG rasterizado y versiones reducidas; comprobar que devuelven exactamente la URL corta.
2. En la preview de Cloudflare y/o Vercel, comprobar redirección temporal, tres UTM y fragmento `#menu`, sin bucles. GA4 debe permanecer inactivo en previews.
3. Tras merge y despliegue aprobados, comprobar `/o` en el dominio oficial y el menú de destino.
4. Comprobar atribución con campaña de QA en GA4 y hacer prueba de cámara/impresión con Matías. No enviar un pedido ficticio.

Fuentes: [redirecciones de Cloudflare](https://developers.cloudflare.com/pages/configuration/redirects/), [campañas UTM en Google Analytics](https://support.google.com/analytics/answer/10917952), [margen de QR según DENSO WAVE](https://www.qrcode.com/en/howto/code.html/index.html).
