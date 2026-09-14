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
