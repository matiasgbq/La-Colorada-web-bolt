# La Colorada — Web

Sitio de La Colorada mantenido con **Codex**, versionado en **GitHub** y publicado en **Vercel**.

- Producción: https://la-colorada-web-bolt.vercel.app
- Repositorio: https://github.com/matiasgbq/La-Colorada-web-bolt
- Backlog: https://github.com/users/matiasgbq/projects/2

## Gestión del producto

El GitHub Project **La Colorada · Backlog** es la fuente única de verdad para
iniciativas, historias, bugs, spikes, prioridades, estimaciones y estados.

- Matías actúa como Product Owner: define objetivos, prioridades y aprobaciones.
- Codex actúa como agente coordinador: refina, organiza, ejecuta o delega,
  verifica resultados y explica las implicancias técnicas.
- Los Issues contienen el alcance y la trazabilidad de cada trabajo.
- El Project muestra el estado operativo y la planificación vigente.
- El tablero anterior de Trello queda únicamente como archivo histórico.

Antes de iniciar trabajo, buscar un Issue existente para evitar duplicados. Las
ideas nuevas se registran usando las plantillas de User Story, Bug o Spike y se
incorporan al Project antes de ejecutarlas.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

## Desarrollo local

```bash
npm ci
npm run dev
```

## Verificación

```bash
npm run typecheck
npm run lint
npm run build
```

## Actualizar las fotos del carrusel

El Hero incluye automáticamente todas las imágenes compatibles que encuentre en
`public/images` durante cada build de Vite. Para actualizarlo desde GitHub:

1. Abrir la carpeta `public/images` en el repositorio.
2. Usar **Add file → Upload files** para subir una foto nueva, o abrir una foto y
   usar el ícono de papelera para eliminarla.
3. Nombrar los archivos con prefijos `01-`, `02-`, `03-` para controlar el orden
   del carrusel.
4. Guardar el cambio en una rama `codex/*` y revisar la preview de Vercel antes
   de integrarlo en `main`.

Formatos admitidos: AVIF, GIF, JPEG, JPG, PNG, SVG y WebP. Para los menús
actuales se recomienda orientación vertical, aproximadamente `1131 × 1600 px` y
un peso menor a `500 KB`. No dejar borradores ni duplicados en esa carpeta:
todo archivo de imagen compatible se publica en el carrusel.

## Flujo de trabajo

1. Elegir y refinar un Issue del GitHub Project.
2. Crear o reutilizar una rama `codex/*` basada en `main`.
3. Implementar y verificar localmente con Codex.
4. Publicar una pull request para obtener una preview de Vercel.
5. Revisar y aprobar.
6. Integrar en `main`, verificar producción y actualizar el Issue y el Project.

Bolt ya no es necesario para desarrollar o mantener el proyecto.
