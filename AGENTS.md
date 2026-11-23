# Acuerdo operativo — La Colorada Web

Este contrato aplica a cualquier agente, sin importar proveedor, modelo, IDE o runtime.

## Gobierno

- Matías es el Product Owner: define prioridades, datos del negocio y aprueba decisiones materiales, merges y publicación.
- El backlog canónico es **La Colorada · Backlog**: https://github.com/users/matiasgbq/projects/2
- Cada trabajo se acota con un GitHub Issue. Trello es sólo contexto histórico cuando un Issue lo cita.
- Producción: https://lacoloradacocina.com.ar en Cloudflare Pages. Vercel aloja desarrollo/previews y la herramienta interna del local en https://la-colorada-precios-local.vercel.app (proyecto separado, raíz tools/precios-local).

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

## Documentación viva y contexto para cualquier agente

- Antes de modificar una funcionalidad, leer el código actual y su documento operativo: `README.md` (mapa del proyecto), `documentation/tablero-interno.md` (estado/visión del panel), `documentation/catalogo-indexable.md` (catálogo y publicación) y los Issues relacionados. Los documentos históricos (`MENU-UPDATE.md`, inventarios fechados) no sustituyen datos vigentes ni deben reescribirse retroactivamente.
- **Cada cambio funcional debe incluir en la misma PR la actualización mínima de los Markdown afectados**, o indicar explícitamente «sin cambios documentales» con motivo verificable. No depender de que Matías recuerde solicitarlo: la responsabilidad es de quien implementa, sea Codex, ChatGPT, Copilot u otro agente.
- No copiar precios, listados y reglas de negocio como una segunda fuente canónica en documentos. Referenciar código/contratos/Issues, diferenciar claramente «implementado», «en prueba», «pendiente» y «visión», y conservar decisiones anteriores con fecha cuando haga falta.
- El panel interno ya existe en `tools/precios-local/` y en la URL de Vercel definida arriba. Su **objetivo futuro** es servir como sistema interno de organización del trabajo cotidiano de La Colorada (pedidos, preparación y coordinación entre roles/canales), sin arquitectura ni flujo definitivo aprobado. Ver `documentation/tablero-interno.md` e Issue #29; no presentar capacidades futuras como existentes.
- En cambios al panel interno, verificar **además** su HTML/JS, cálculo y endpoint `/api/catalog`; `npm run verify` cubre principalmente la web y no equivale a prueba funcional completa de la herramienta interna.
- Si un cambio afecta precio/catálogo, evaluar su impacto en carta web, JSON/SEO, mostrador, flyers y Google Business Profile. Las sincronizaciones futuras se siguen en #120: ninguna se considera realizada sin verificación en cada destino.

## Verificación y entrega

Ejecutar `npm run verify` antes de entregar. Informar archivos cambiados, criterios cubiertos, resultados, riesgos y validación humana pendiente.

La pull request referencia el Issue. Usar `Closes #N` sólo cuando el merge complete el trabajo; si depende del despliegue, usar `Refs #N`, verificar producción y cerrar después con evidencia. Mantener Issue y Project alineados con la realidad.
