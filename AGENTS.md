# Agent operating agreement — La Colorada Web

This file is the shared operating agreement for every coding agent working in
this repository, independently of vendor, model, IDE, or runtime.

## Product governance

- Matías is the Product Owner. He owns product intent, priorities, business
  facts, approval of material decisions, and merge approval.
- Codex is the coordinating agent. It refines scope, identifies dependencies
  and risks, prepares bounded assignments, verifies delivery, and maintains
  traceability.
- Implementation agents execute one bounded assignment and return evidence for
  review.
- The canonical backlog is GitHub Project **La Colorada · Backlog**:
  https://github.com/users/matiasgbq/projects/2
- GitHub Issues and Project fields define current scope, priority, estimates,
  status, and traceability. Trello provides historical context only when an
  Issue links to it.
- The website is currently in development. The Vercel URL and domain decisions
  remain provisional until Matías explicitly approves a production launch.

## Starting an assignment

1. Receive an explicit GitHub Issue number or another bounded assignment from
   Matías or the coordinating agent.
2. Read the current Issue, its acceptance criteria, and only the repository
   files needed to understand the work.
3. Inspect the GitHub Project and search related Issues when proposing scope or
   priorities.
   Start with `npm run backlog:current` to obtain the active sprint, work in
   progress, and blockers through the authenticated GitHub CLI. Then read the
   selected Issue with `gh issue view <number>`.
4. Summarize the intended change and the files likely to be affected.
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
  data, secrets, or business facts to Matías and the coordinating agent.
- Deliver implementation through a focused pull request linked to the Issue.
- Matías decides on merge and publication after review, verification, and any
  required Vercel Preview evidence.

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
