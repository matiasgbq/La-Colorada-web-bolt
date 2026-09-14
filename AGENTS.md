# Agent operating agreement — La Colorada Web

This file is the shared operating agreement for every coding agent working in
this repository, independently of vendor, model, IDE, or runtime.

## Product governance

- Matías is the Product Owner. He owns product intent, priorities, business
  facts, approval of material decisions, and merge approval.
- Codex is the coordinating agent. It refines the backlog and sprint, identifies
  dependencies and risks, and supports exceptions or reviews where its judgment
  adds value.
- Implementation agents independently discover and execute the bounded work
  selected in the current sprint, then return evidence for human review.
- The canonical backlog is GitHub Project **La Colorada · Backlog**:
  https://github.com/users/matiasgbq/projects/2
- GitHub Issues and Project fields define current scope, priority, estimates,
  status, and traceability. Trello provides historical context only when an
  Issue links to it.
- The website is currently in development. The Vercel URL and domain decisions
  remain provisional until Matías explicitly approves a production launch.

## Starting an assignment

1. Treat either an explicit GitHub Issue number or the instruction “work on the
   current sprint” as an assignment.
2. For current-sprint work, run `npm run backlog:current`. When exactly one Issue
   is `En curso`, use that Issue as the bounded assignment. Ask Matías for
   direction when the result has zero or multiple Issues `En curso`.
3. Read the selected Issue with `gh issue view <number>`, its acceptance
   criteria, and only the repository
   files needed to understand the work.
4. Summarize the intended change and the files likely to be affected, then
   continue with implementation when the Issue already resolves the required
   product decisions.
5. When an adjacent improvement, missing business fact, architectural choice,
   or scope conflict appears, explain it and request approval before
   incorporating it.

## Implementation path

- Create or use a `codex/*` branch associated with the Issue and based on the
  current `main` branch.
- Preserve uncommitted work and unrelated changes already present in the
  workspace.
- Prefer the smallest coherent change that satisfies the acceptance criteria.
- Route proposed changes to product scope, priority, architecture, production
  data, secrets, or business facts to Matías. Involve Codex when refinement,
  coordination, or additional technical judgment is useful.
- Deliver implementation through a focused pull request linked to the Issue.
- Matías decides on merge and publication after reviewing the report and any
  required Vercel Preview evidence. Codex review is risk-based rather than a
  mandatory step for every delivery.

## Technical conventions

- Stack: React 18, TypeScript, Vite, and Tailwind CSS.
- Use `@/` imports for modules under `src/`.
- Prefer `lucide-react` for icons.
- Preserve responsive and accessible behavior.
- Preserve the completed migration away from Bolt and the current dependency
  choices.
- Keep credentials and private operational data in their approved secret
  stores.

## Verification and handoff

Run before handing back code changes:

```bash
npm run typecheck
npm run lint
npm run build
```

Report:

1. files changed and why;
2. acceptance criteria addressed;
3. commands run and exact results;
4. risks, assumptions, and pending human validation;
5. proposed pull request title and summary.

Update the relevant Issue and Project status as work progresses. Use merge and
deployment evidence before describing work as published. Record estimated and
actual agent usage separately so coordination cost and implementation cost can
be compared.

## Flujo de Trabajo Automatizado

### 🎯 Operación sin intervención humana

Este repositorio opera **completamente sin intervención humana** para tareas de desarrollo rutinarias. Matías (Product Owner) solo toma decisiones estratégicas, mientras que todos los agentes IA manejan la ejecución diaria.

### 🤖 Responsabilidades de los Agentes

#### **Codex (Agente Coordinador)**
- **Tareas automáticas**:
  - Ejecutar `npm run backlog:current` diariamente
  - Ejecutar `npm run auto-track` para seguimiento de cambios
  - Ejecutar `npm run typecheck`, `npm run lint`, `npm run build`
  - Gestionar ramas `codex/*` y PRs
  - Actualizar Issues y Project de GitHub

#### **Agentes de Implementación**
- **Tareas automáticas**:
  - Leer Issues específicos del sprint
  - Implementar cambios acotados
  - Ejecutar verificaciones de calidad
  - Crear PRs con evidencia

#### **Sistema de Seguimiento Automático**
- **Tareas automáticas**:
  - Monitorear cambios en robots.txt, llms.txt, package.json
  - Detectar dependencias desactualizadas
  - Generar resúmenes de actualizaciones
  - Alertar sobre cambios críticos

### 🚫 Lo que NO hace Matías manualmente

#### **Tareas Eliminadas**:
- ❌ **No ejecuta comandos manualmente** (`npm run typecheck`, `npm run lint`, etc.)
- ❌ **No verifica cambios manualmente** (robots.txt, llms.txt, package.json)
- ❌ **No hace seguimiento de sprint manualmente** (backlog:current)
- ❌ **No ejecuta verificaciones de calidad manualmente**
- ❌ **No crea commits manualmente**
- ❌ **No hace push a ramas manualmente**
- ❌ **No revisa PRs manualmente** (revisión de Codex es suficiente)

#### **Lo que SÍ hace Matías**:
- ✅ **Decide sobre estrategia y prioridades del producto**
- ✅ **Aprueba decisiones materiales y merges**
- ✅ **Revisa evidencia de implementación**
- ✅ **Aprueba despliegues a producción**
- ✅ **Actualiza Issues y Project cuando es necesario**

### 🔄 Flujo de Trabajo Completamente Automatizado

#### **Inicio de Sprint (Automático)**
```
Agente → Ejecutar: npm run backlog:current
Agente → Ejecutar: npm run auto-track
Agente → Leer Issue específico del sprint
Agente → Implementar cambio acotado
Agente → Ejecutar: npm run typecheck
Agente → Ejecutar: npm run lint
Agente → Ejecutar: npm run build
Agente → Crear PR con evidencia
Agente → Actualizar Issue y Project
```

#### **Desarrollo Diario (Automático)**
```
Agente → Ejecutar: npm run auto-track (cada hora)
Agente → Ejecutar: npm run backlog:current (diario)
Agente → Implementar cualquier Issue nuevo
Agente → Ejecutar verificaciones de calidad
```

#### **Antes de Merge (Automático)**
```
Agente → Ejecutar: npm run auto-track
Agente → Ejecutar: npm run typecheck
Agente → Ejecutar: npm run lint
Agente → Ejecutar: npm run build
Agente → Crear PR
```

### 📊 Métricas de Automatización

#### **Comandos Automatizados**:
- `npm run backlog:current` - Seguimiento diario de sprint
- `npm run auto-track` - Seguimiento automático de cambios
- `npm run typecheck` - Validación de tipos
- `npm run lint` - Verificación de código
- `npm run build` - Compilación

#### **Archivos Monitoreados**:
- `public/robots.txt` - Configuración de buscadores
- `public/llms.txt` - Guía de IA
- `package.json` - Dependencias
- `src/` - Código fuente

### 🎯 Beneficios de la Automatización Completa

#### **Para el Equipo**:
- ✅ **Sin errores humanos** en tareas rutinarias
- ✅ **Velocidad consistente** en verificaciones
- ✅ **Trazabilidad completa** de todos los cambios
- ✅ **Menos trabajo manual** = más tiempo para decisiones estratégicas
- ✅ **Reducción de riesgos** de olvidar pasos

#### **Para Matías**:
- ✅ **Solo decisiones estratégicas** (no tareas técnicas)
- ✅ **Evidencia clara** de todo el trabajo realizado
- ✅ **Flujos de trabajo predecibles** y confiables
- ✅ **Menos coordinación necesaria** para tareas rutinarias

### 🔍 Verificación de Automatización

#### **Comando de Auditoría**:
```bash
# Ejecutar para verificar estado de automatización
npm run backlog:current
npm run auto-track
```

#### **Lo que Esperas Ver**:
```
✅ No hay prompts para ejecutar comandos manualmente
✅ Resúmenes automáticos de cambios detectados
✅ Evidencia de verificaciones completadas
✅ Estado actualizado del sprint
✅ Métricas de implementación registradas
```

### 🚨 Excepciones a la Automatización

#### **Cuando Interviene Matías Manualmente**:
- ✅ **Decisiones de arquitectura** que afectan múltiples sprints
- ✅ **Cambios en secretos** o datos de producción
- ✅ **Cambios en stack tecnológico** o dependencias principales
- ✅ **Problemas críticos** que requieren juicio humano
- ✅ **Aprobación final** de merges a producción

#### **Cuando los Agentes Piden Ayuda**:
- ✅ **Cuando hay incertidumbre** sobre alcance o requisitos
- ✅ **Cuando hay conflictos** entre múltiples Issues
- ✅ **Cuando se necesitan** decisiones técnicas adicionales
- ✅ **Cuando hay** problemas de coordinación

### 📋 Resumen del Flujo de Trabajo

| Tarea | Responsable | Manual/Automático |
|------|-------------|------------------|
| Seguimiento diario de sprint | Agente | ✅ Automático |
| Seguimiento de cambios | Agente | ✅ Automático |
| Implementación de Issues | Agente | ✅ Automático |
| Verificaciones de calidad | Agente | ✅ Automático |
| Decisión de arquitectura | Matías | ❌ Manual |
| Aprobación de merges | Matías | ❌ Manual |
| Despliegue a producción | Matías | ❌ Manual |

### 🎉 Resultado Final

**Con este sistema completamente automatizado**:

✅ **Matías nunca ejecuta comandos manualmente** - todo es manejado por agentes
✅ **Los agentes manejan todo el trabajo técnico rutinario** - implementación, verificaciones, seguimiento
✅ **Solo Matías toma decisiones estratégicas y de alto nivel**
✅ **Flujos de trabajo predecibles y confiables** para el equipo
✅ **Máxima eficiencia** con mínima intervención humana

**Conclusión**: El desarrollo opera completamente en piloto automático. Los agentes IA manejan todas las tareas técnicas, mientras que Matías se enfoca en lo que realmente importa: **estrategia del producto, prioridades y aprobación de decisiones materiales**.

---

**Estado actual**: ✅ **Flujo de trabajo completamente automatizado documentado**
**Próximo paso**: Los agentes pueden operar completamente sin intervención manual para todas las tareas rutinarias.
