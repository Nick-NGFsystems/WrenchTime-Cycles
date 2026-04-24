# Moved — see the root CLAUDE.md

The canonical project notes for WrenchTime-Cycles live at the **repository root**:

- In-repo: [`../CLAUDE.md`](../CLAUDE.md)
- On GitHub: https://github.com/Nick-NGFsystems/WrenchTime-Cycles/blob/main/CLAUDE.md

## Why this file is here

This `wrenchtime-cycles/` subdirectory is a legacy parallel copy of the app — it used to contain the whole Next.js project when the repo was a monorepo layout. Active development now happens against the root (`app/`, `components/`, `lib/`, `prisma/`, etc.).

Any CLAUDE.md you previously had at this path was local-only and never synced with git, so updates to the root file never appeared here. This pointer replaces it so every path resolves to the current doc.

## If you're reading a stale version

- `git pull` on your local clone
- Delete any untracked `wrenchtime-cycles/CLAUDE.md` before pulling if git complains
- Confirm the last commit that touched the real CLAUDE.md matches what you see:
  ```bash
  git log -1 --format="%h %s %ci" -- CLAUDE.md
  ```

## TL;DR

**Read `../CLAUDE.md`.** This file exists only so that tools defaulting to `<repo>/wrenchtime-cycles/CLAUDE.md` don't find a stale version.
