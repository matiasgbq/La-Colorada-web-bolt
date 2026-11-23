# Carrusel desde ChatGPT

Repositorio operativo: matiasgbq/La-Colorada-web-bolt.
Seguimiento: Issue #93.
Backlog: https://github.com/users/matiasgbq/projects/2

## Pedido desde el celular

Adjuntar una imagen y pedir «Agregá esta foto al carrusel de La Colorada al final y prepará la vista previa». Para retirar, pedir «Mostrame las fotos actuales del carrusel» y después identificar la foto por su nombre.

## Flujo con repositorio y terminal

1. Leer main, AGENTS.md e Issue #93. Crear una rama codex/ desde main.
2. Ejecutar npm run carousel -- list y mostrar los archivos actuales en orden.
3. Para agregar, inspeccionar la imagen adjunta, conservar su contenido y extensión y ejecutar npm run carousel -- add /ruta/imagen.webp 08-promocion.webp. Elegir un nombre libre y comprobar su posición con list, que usa el mismo orden alfabético/numeral que el Hero. Los archivos actuales tienen nombres de distintos formatos. El comando evita sobreescribir archivos.
4. Para retirar, ejecutar npm run carousel -- remove 08-promocion.webp. Conserva una copia en repo-fotos/carrusel-retirado y exige al menos una imagen activa.
5. Ejecutar npm run verify, abrir la PR referenciando #93 y mostrar el preview. Matías aprueba merge y publicación.
6. Después de publicar, verificar el carrusel del dominio oficial y dejar evidencia en la PR.

El Hero descubre los archivos de imagen directamente en public/images en cada build. El nombre controla su orden. Las subcarpetas de public/images pertenecen a otros usos.

## ChatGPT con el conector GitHub

El conector puede crear ramas, blobs binarios en base64, árboles, commits y PR. Si el chat tiene acceso a los bytes del adjunto, puede aplicar el mismo cambio con esas herramientas. Para retirar, copiar el archivo al archivo histórico y quitarlo del árbol activo en el mismo commit.

Comprobar primero las herramientas disponibles en ese chat. Si faltan acceso a los bytes o ejecución para verificar, informar el paso pendiente y continuar en Codex con el repositorio. Las capacidades observadas en Codex no garantizan que otro chat tenga las mismas herramientas.

## Acceso al backlog

La instalación GitHub observada el 23/11/2026 permite leer y escribir el repositorio. El conector disponible en esta sesión ofrece herramientas para Issues y PR, sin herramientas de GitHub Projects. La autorización project del CLI permite gestionar el tablero desde Codex cuando Matías completa el consentimiento de GitHub. Es un acceso distinto al conector de ChatGPT.

El modo Full access del plugin afecta al plugin completo. Su cambio fue rechazado por la revisión automática por exceder el alcance solicitado, limitado a La Colorada. Mantener este estado pendiente hasta decidir el alcance de la instalación o del permiso.

## Alcance entregado

Comando de operación y flujo documentado. La prueba con un adjunto real desde ChatGPT móvil queda pendiente. El alta en Projects y el modo Full access requieren completar sus autorizaciones. El administrador visual para Matías y Lucho continúa en #93.
