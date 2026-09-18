# La Colorada — Web

La Colorada Web es el sitio del restaurante La Colorada, ubicado en la Galería
Colorada de La Horqueta, San Isidro. Incluye presentación, menú, galería,
opiniones, ubicación y opciones de contacto y pedido.

## Enlaces

- Producción: https://la-colorada-web-bolt.vercel.app
- Repositorio: https://github.com/matiasgbq/La-Colorada-web-bolt
- Backlog: https://github.com/users/matiasgbq/projects/2

## Gobierno del producto

El GitHub Project **La Colorada · Backlog** es la fuente de verdad para
iniciativas, historias, bugs, spikes, prioridades, estimaciones y estados.

- Matías es el Product Owner: define objetivos, prioridades y aprobaciones.
- Los Issues definen el alcance, los criterios de aceptación y la trazabilidad
  de cada trabajo.
- El Project refleja la planificación y el estado operativo.
- Las pull requests vinculan los cambios con su revisión, evidencia y preview.
- Los cambios se integran en `main` después de la aprobación correspondiente.
- Trello conserva únicamente información histórica cuando un Issue enlaza a él.

Antes de comenzar, buscar un Issue existente para evitar duplicados. Las ideas
nuevas se registran con las plantillas de User Story, Bug o Spike y se
incorporan al Project antes de iniciar su implementación.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

## Comandos

- `npm run dev` — inicia el servidor local de Vite.
- `npm run build` — genera la compilación de producción en `dist/`.
- `npm run preview` — sirve localmente la compilación generada.
- `npm run typecheck` — ejecuta la validación de tipos de TypeScript.
- `npm run lint` — ejecuta ESLint sobre el proyecto.
- `npm run backlog:current` — muestra los items `En curso`, `Bloqueado` o
  asociados a un sprint del Project. Requiere una sesión local autenticada de
  GitHub CLI.
- `npm run auto-track` — detecta cambios en `public/robots.txt`,
  `public/llms.txt` y las dependencias de `package.json`; registra los cambios
  detectados en `update-log.json`. Se ejecuta cuando se invoca el comando.

## Verificación

Antes de integrar un cambio, ejecutar:

```bash
npm run typecheck
npm run lint
npm run build
```

La pull request debe incluir la evidencia necesaria para revisar el alcance y
permitir la aprobación antes de integrar en `main`.

## Flujo de trabajo

1. Elegir y refinar un Issue del GitHub Project.
2. Crear o reutilizar una rama de trabajo basada en `main`.
3. Implementar el alcance definido y mantener su trazabilidad con el Issue.
4. Ejecutar las verificaciones del proyecto.
5. Publicar una pull request para revisión y preview de Vercel.
6. Tras la aprobación, integrar en `main` y verificar el despliegue.
7. Actualizar el Issue y el Project con el resultado y la evidencia.

## Carrusel de imágenes

El Hero obtiene durante cada build las imágenes compatibles de `public/images`
y las ordena alfabéticamente con comparación numérica. El carrusel cambia cada
5 segundos e incluye controles para navegar y seleccionar una imagen.

Para actualizarlo:

1. Agregar o eliminar archivos en `public/images`.
2. Usar prefijos `01-`, `02-`, `03-`, etc., para controlar el orden.
3. Revisar la preview de Vercel antes de integrar el cambio en `main`.

Formatos admitidos: AVIF, GIF, JPEG, JPG, PNG, SVG y WebP. Para los menús se
recomienda orientación vertical, aproximadamente `1131 × 1600 px`, y un peso
menor a `500 KB`.

Toda imagen compatible de `public/images` forma parte del carrusel, por lo que
no deben permanecer allí borradores ni duplicados. La build requiere al menos
una imagen compatible.

## Preview y despliegue

Las ramas y pull requests conectadas a Vercel permiten revisar los cambios antes
de integrarlos. El despliegue a producción se realiza después de la aprobación;
la preview no reemplaza la verificación del sitio publicado.
