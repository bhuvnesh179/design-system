---
name: new-component
description: Scaffold a new React 19 component in @100xbansal/ui with styled-components styles, a Storybook story with play-function tests, a Vitest unit test, and the barrel export. Use when the user asks to create, add, or scaffold a component (e.g. "add a Badge component", "/new-component Card").
argument-hint: <ComponentName> [short description]
---

# New component

Scaffold a component in `packages/ui/src/components/<Name>/` that matches the existing
`Button` and `TextField` components. Read one of them first if you haven't this session;
they are the source of truth when this file and the code disagree.

## 1. Confirm the spec before writing files

Derive from the request: **Name** (PascalCase), the **root element** (`div`, `button`, `span`,
`input`...), **variants/sizes**, and **props**. If the name, the root element, or the
variants are ambiguous, ask the user with AskUserQuestion. Don't guess the API of a
public component. If `packages/ui/src/components/<Name>/` already exists, stop and ask.

## 2. Create the files

Copy each template from `templates/` (next to this file), replacing `__Name__` with the
component name, `__element__` with the root tag (`div`), and `__ElementType__` with its DOM
type (`HTMLDivElement`):

| Template                | Destination                                            |
| ----------------------- | ------------------------------------------------------ |
| `Component.tsx`         | `packages/ui/src/components/<Name>/<Name>.tsx`         |
| `Component.styles.ts`   | `packages/ui/src/components/<Name>/<Name>.styles.ts`   |
| `Component.stories.tsx` | `packages/ui/src/components/<Name>/<Name>.stories.tsx` |
| `Component.test.tsx`    | `packages/ui/src/components/<Name>/<Name>.test.tsx`    |
| `index.ts`              | `packages/ui/src/components/<Name>/index.ts`           |

Then flesh them out for the real props/variants. The templates are a starting point.

Append the export to `packages/ui/src/index.ts`, keeping the component exports alphabetical:

```ts
export * from './components/<Name>';
```

## 3. Conventions (must follow)

**React 19**

- `ref` is a regular prop. Type props as `ComponentPropsWithRef<'element'>`. Never use `forwardRef`.
- Function declarations (`export function Name`), no `React.FC`, no default exports.
- Use `useId` for generated ids. Use React 19 APIs where they fit: `use(Context)`,
  `<Context value>` as a provider, `useFormStatus` / `useActionState` for form-aware components.
- Spread remaining props onto the root element so consumers can pass `className`, `aria-*`, `data-*`.

**styled-components**

- Styles live in `<Name>.styles.ts`; the `.tsx` file holds no CSS.
- Style-only props are transient (`$variant`, `$size`) so they never reach the DOM.
- Use only theme values (`theme.colors.*`, `theme.space[n]`, `theme.radii.*`, `theme.fontSizes.*`,
  `theme.durations.*`). No hard-coded hex colors. If a needed token is missing, add it to
  `packages/tokens/src/index.ts` (both `lightColors` and `darkColors` for colors) and tell the user.
- Variant/size maps are `Record<Variant, (theme: DefaultTheme) => RuleSet>`, as in `Button.styles.ts`.
- Include a `&:focus-visible` outline using `theme.colors.focusRing` on interactive elements.

**Accessibility**

- Use the correct native element/role first; add ARIA only when native semantics fall short.
- Stories run through `@storybook/addon-a11y` with `test: 'error'`, so violations fail the build.

**Stories (`<Name>.stories.tsx`)**

- `title: 'Components/<Name>'`, `tags: ['autodocs']`, `satisfies Meta<typeof Name>`.
- Import `Meta`/`StoryObj` from `@storybook/react-vite`, test utils from `storybook/test`.
- One story per variant/state. At least one story has a `play` function that asserts behavior
  (use the `canvas` arg, `userEvent`, `expect`, and `fn()` for callbacks).

**Unit tests (`<Name>.test.tsx`)**

- Render with `renderWithTheme` from `../../test/render`; query by role/label, not test ids.
- Cover: default render, each interactive behavior, the ref reaching the DOM node.

**Docs**: one-line JSDoc on non-obvious props only.

## 4. Verify

Run from the repo root and fix every failure before reporting done:

```sh
pnpm turbo run typecheck lint test --filter=@100xbansal/ui
pnpm turbo run build --filter=@100xbansal/ui
```

Storybook story tests (`pnpm --filter @100xbansal/storybook test`) need Playwright Chromium. Run them if
Chromium is installed; otherwise say you skipped them.

## 5. Changeset

A new public component is a **minor** change. Create `.changeset/<kebab-name>.md`:

```md
---
'@100xbansal/ui': minor
---

Add `<Name>` component.
```

Add `'@100xbansal/tokens': minor` too if you added tokens. Don't run `changeset version`
or publish; that's the `release` skill's job.

## 6. Report

List the files created/changed, the public props API, and the verification results. Mention
`pnpm storybook` for viewing it at http://localhost:6006.
