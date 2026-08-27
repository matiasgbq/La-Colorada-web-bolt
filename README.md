# La Colorada — Web

Sitio de La Colorada mantenido con **Codex**, versionado en **GitHub** y publicado en **Vercel**.

- Producción: https://la-colorada-web-bolt.vercel.app
- Repositorio: https://github.com/matiasgbq/La-Colorada-web-bolt

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

## Flujo de trabajo

1. Crear o reutilizar una rama `codex/*` basada en `main`.
2. Implementar y verificar localmente con Codex.
3. Publicar una pull request para obtener una preview de Vercel.
4. Revisar y aprobar.
5. Integrar en `main`; Vercel mantiene la publicación de producción.

Bolt ya no es necesario para desarrollar o mantener el proyecto.
