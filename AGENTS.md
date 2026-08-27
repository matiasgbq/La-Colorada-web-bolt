# Development rules

- Stack: React 18, TypeScript, Vite, and Tailwind CSS.
- Use `@/` imports for modules under `src/`.
- Prefer `lucide-react` for icons before adding another icon library.
- Preserve responsive and accessible behavior.
- Before handing off code changes, run `npm run typecheck`, `npm run lint`, and `npm run build`.
- Do not reintroduce Bolt configuration, badges, or dependencies.
- Work on `codex/*` branches; do not edit `main` directly.
- Vercel remains connected to the repository; a local change is not deployed until its corresponding deployment is verified.
