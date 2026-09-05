# Development rules

- The canonical product backlog is the GitHub Project **La Colorada · Backlog**:
  https://github.com/users/matiasgbq/projects/2
- GitHub Issues and Project fields are the source of truth for scope, priority,
  estimates, status, and traceability. Trello is historical and must not be
  used for new work or current-state decisions.
- Before proposing, prioritizing, or starting work, inspect the Project and
  search existing Issues to avoid duplicates.
- Matías is the Product Owner. Codex is the coordinating agent: clarify product
  intent, identify dependencies and risks, delegate only bounded work, verify
  results, and keep material decisions under human approval.
- Update the relevant Issue and Project status as work progresses. Do not mark
  work published without merge and production evidence when deployment applies.
- Record experimental Codex estimates and actual usage separately; do not
  present total process consumption as pure implementation cost.
- Stack: React 18, TypeScript, Vite, and Tailwind CSS.
- Use `@/` imports for modules under `src/`.
- Prefer `lucide-react` for icons before adding another icon library.
- Preserve responsive and accessible behavior.
- Before handing off code changes, run `npm run typecheck`, `npm run lint`, and `npm run build`.
- Do not reintroduce Bolt configuration, badges, or dependencies.
- Work on `codex/*` branches; do not edit `main` directly.
- Vercel remains connected to the repository; a local change is not deployed until its corresponding deployment is verified.
