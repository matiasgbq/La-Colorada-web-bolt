# Acuerdo operativo — La Colorada Web

Este contrato aplica a cualquier agente, sin importar proveedor, modelo, IDE o runtime.

## Gobierno

- Matías es el Product Owner: define prioridades, datos del negocio y aprueba decisiones materiales, merges y publicación.
- El backlog canónico es **La Colorada · Backlog**: https://github.com/users/matiasgbq/projects/2
- Cada trabajo se acota con un GitHub Issue. Trello es sólo contexto histórico cuando un Issue lo cita.
- Producción: https://lacoloradacocina.com.ar en Cloudflare Pages. Vercel se usa para desarrollo y previews.

## Inicio de una tarea

1. Usar el Issue indicado. Para “trabajá en el sprint actual”, ejecutar `npm run backlog:current` y continuar sólo si existe un único Issue `En curso`.
2. Leer el Issue, sus criterios y únicamente los archivos necesarios.
3. Resumir el cambio previsto y continuar cuando el Issue ya contiene las decisiones necesarias.
4. Consultar a Matías antes de sumar decisiones de producto, datos del negocio, arquitectura o alcance.

## Implementación

- Trabajar en una rama basada en `main` y preservar cambios ajenos.
- Preferir el cambio coherente más pequeño que cumpla los criterios.
- `src/site-data.ts` contiene los datos oficiales del negocio; `src/data.ts`, menú, galería y opiniones.
- `public/images/` contiene assets publicados. `repo-fotos/` es la biblioteca original y su revisión; preservar originales salvo aprobación explícita o invalidez técnica comprobada.
- Stack: React 18, TypeScript, Vite y Tailwind CSS. Usar imports `@/`, preferir `lucide-react` y preservar accesibilidad y comportamiento responsive.
- Mantener secretos y credenciales fuera del repositorio.

## Verificación y entrega

Ejecutar `npm run verify` antes de entregar. Informar archivos cambiados, criterios cubiertos, resultados, riesgos y validación humana pendiente.

La pull request referencia el Issue. Usar `Closes #N` sólo cuando el merge complete el trabajo; si depende del despliegue, usar `Refs #N`, verificar producción y cerrar después con evidencia. Mantener Issue y Project alineados con la realidad.
