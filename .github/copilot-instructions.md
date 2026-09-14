# GitHub Copilot instructions — La Colorada

Read and follow the repository-root `AGENTS.md` before planning or editing.

## Role

- Matías is the Product Owner and approves product decisions and merges.
- Codex is the coordinating agent and owns refinement, dependencies, scope and final verification.
- Copilot is an implementation agent: execute one bounded GitHub Issue at a time.
- Use GitHub Project **La Colorada · Backlog** and its Issues as the source of truth for current decisions. Treat Trello only as historical context when an Issue links to it.

## Before editing

- Require an explicit Issue number and read its current description and acceptance criteria.
- Keep the implementation within the requested Issue and its acceptance criteria.
- When an adjacent improvement, uncertainty, missing business fact or conflict appears, explain it and request approval before incorporating it.
- Preserve uncommitted and unrelated user changes.
- Create or use a `codex/*` branch associated with the Issue, based on the current `main` branch.

## Implementation

- Stack: React 18, TypeScript, Vite and Tailwind CSS.
- Use `@/` imports for modules under `src/`.
- Prefer `lucide-react` for icons.
- Preserve responsive design and accessibility.
- Preserve the completed migration away from Bolt and the current dependency choices.
- Prefer the smallest change that satisfies the Issue acceptance criteria.
- Route proposed changes to priorities, scope, architecture, production data or business facts to Codex and Matías for approval.
- Deliver work as a reviewable pull request. Matías decides on merge and publication after Codex verification and Vercel Preview evidence.

## Verification and handoff

Run before handing work back:

```bash
npm run typecheck
npm run lint
npm run build
```

Report:

1. files changed and why;
2. acceptance criteria addressed;
3. commands run and exact results;
4. risks, assumptions or pending human validation;
5. proposed PR title and summary.

Hand the implementation back for review after completing the checks and report. Codex verifies the result, Vercel provides the Preview, and Matías decides whether to merge.
