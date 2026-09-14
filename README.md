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

**El desarrollo opera completamente en piloto automático** - no es necesario ejecutar comandos manualmente.

Los agentes IA manejan todo el proceso automáticamente:

### 🚀 Flujo de Trabajo Automatizado

1. **Agentes coordinadores** (Codex) ejecutan:
   - `npm run backlog:current` - Identificar sprint actual
   - `npm run auto-track` - Monitorear cambios automáticamente
   - `npm run typecheck`, `npm run lint`, `npm run build` - Verificaciones de calidad

2. **Agentes de implementación**:
   - Leer Issues específicos del sprint
   - Implementar cambios acotados
   - Crear PRs con evidencia
   - Gestionar ramas `codex/*`

3. **Matías (Product Owner)** solo toma decisiones estratégicas:
   - Aprobación de arquitectura y stack tecnológico
   - Decisión final de merges a producción
   - Prioridades del producto y aprobaciones

### 🔧 Comandos Manuales (Ocasionales)

Si necesitas intervenir manualmente:

```bash
# Verificar estado actual del sprint (ejecutado automáticamente por agentes)
npm run backlog:current

# Verificar cambios automáticamente (ejecutado automáticamente por agentes)
npm run auto-track
```

### 📊 Evidencia de Automatización

Todo el trabajo se registra automáticamente:
- **Issues actualizados** con estado y evidencia
- **Commits automáticos** con mensajes detallados
- **PRs creados** con previews de Vercel
- **Logs de seguimiento** de cambios detectados

## Verificación

**Las verificaciones operan completamente en piloto automático**:

Los agentes ejecutan automáticamente:

```bash
npm run typecheck
npm run lint
npm run build
```

### ✅ Resultado

- **Sin errores humanos** en tareas rutinarias
- **Velocidad consistente** en verificaciones
- **Trazabilidad completa** de todos los cambios
- **Evidencia clara** para aprobación de Matías

### 🔍 Monitoreo Automático

El sistema monitorea automáticamente:

- **Archivos críticos**: `robots.txt`, `llms.txt`
- **Dependencias**: `package.json`
- **Código fuente**: `src/` y componentes principales
- **Cambios de estado**: Issues y Project de GitHub

### 📋 Flujo de Trabajo Completo

1. **Agentes coordinadores** identifican y ejecutan trabajo
2. **Agentes de implementación** realizan cambios específicos
3. **Sistema automático** monitorea y registra todo
4. **Matías** revisa evidencia y aprueba estratégicamente
5. **Despliegue automático** cuando se aprueba

### 🎯 Beneficios

✅ **Matías nunca ejecuta comandos manualmente** - todo es manejado por agentes
✅ **Los agentes manejan todo el trabajo técnico rutinario** - implementación, verificaciones, seguimiento
✅ **Solo Matías toma decisiones estratégicas y de alto nivel**
✅ **Flujos de trabajo predecibles y confiables** para el equipo
✅ **Máxima eficiencia** con mínima intervención humana

**Conclusión**: El desarrollo opera completamente en piloto automático. Los agentes IA manejan todas las tareas técnicas, mientras que Matías se enfoca en lo que realmente importa: **estrategia del producto, prioridades y aprobación de decisiones materiales**.

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
