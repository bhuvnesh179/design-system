---
name: release
description: Version and publish design-system packages with Changesets. Use when the user asks to add a changeset, bump versions, write the changelog, cut a release, or publish @100xbansal/ui or @100xbansal/tokens (e.g. "add a changeset for this", "prepare a release", "/release").
argument-hint: [changeset | version | publish]
---

# Release

Published packages: `@100xbansal/ui`, `@100xbansal/tokens`. Everything else
(`storybook`, `@100xbansal/eslint-config`, `@100xbansal/typescript-config`) is private
and never gets a changeset.

The flow has three stages. Do only the stage the user asked for; if they said "release"
without detail, go stage by stage and **stop for confirmation before stage 3**.

## Stage 1: Add a changeset

1. Work out what changed: `git status`, `git diff main...HEAD --stat`, and `git log main..HEAD --oneline`.
   Map changed files to packages (`packages/ui/**` → `@100xbansal/ui`, `packages/tokens/**` →
   `@100xbansal/tokens`). Ignore changes only to stories, tests, or private packages.
2. Check existing `.changeset/*.md` files (not `README.md`) so you don't duplicate an entry.
3. Choose the bump per package. We're pre-1.0 while versions are `0.x`, where a minor may
   contain breaking changes, but still call breaking changes out explicitly.
   - **major**: removed/renamed export or prop, changed default behavior, removed token.
   - **minor**: new component, prop, variant, or token.
   - **patch**: bug fix, style fix, docs in the published package, internal refactor.
     If you're unsure whether a change is breaking, ask the user.
4. Write `.changeset/<short-kebab-summary>.md`:

   ```md
   ---
   '@100xbansal/ui': minor
   ---

   Add `size` prop to `TextField`.
   ```

   The body is the changelog entry consumers read: user-facing, imperative ("Add…", "Fix…"),
   one line per change. For breaking changes, add a **Migration:** line saying exactly what to change.

Don't use the interactive `pnpm changeset` command; it needs a TTY. Write the file directly.

## Stage 2: Version

1. `pnpm changeset status` to preview the release plan. Show it to the user.
2. `pnpm version-packages`. This consumes the changesets, bumps `package.json` versions,
   updates internal `workspace:` dependents, and writes `CHANGELOG.md` files.
3. `pnpm install` to refresh the lockfile.
4. Verify the release builds cleanly:

   ```sh
   pnpm turbo run typecheck lint test build --filter='./packages/*'
   ```

5. Show the user the version bumps and the new `CHANGELOG.md` sections. Don't commit
   unless asked; if asked, use the message `chore: version packages`.

## Stage 3: Publish (needs explicit confirmation)

Publishing is irreversible (npm won't let you reuse a version). Before running anything:

1. Confirm with the user: the versions going out, the target registry (`npm config get registry`),
   and that they're logged in (`npm whoami`). If `whoami` fails, ask them to run
   `! npm login` themselves. Never handle tokens yourself.
2. `.changeset/config.json` has `"access": "restricted"`. Scoped packages publish **private** by
   default. If the user wants them public on npm, ask before changing it to `"public"`.
3. Only after an explicit "yes": `pnpm release` (builds all packages, then `changeset publish`,
   which publishes every package whose version isn't on the registry yet and creates git tags).
4. Report what was published, and remind the user to push the tags: `git push --follow-tags`.
   Don't push yourself unless asked.

## Pre-releases (only if asked)

`pnpm changeset pre enter <tag>` (e.g. `next`, `beta`), then run stages 1–3 as usual; versions
become `x.y.z-<tag>.N`. Exit with `pnpm changeset pre exit` before the stable release.
