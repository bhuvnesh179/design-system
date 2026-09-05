# design-system

React 19 design system: a Turborepo + pnpm monorepo with styled-components and Storybook 10.

| Package                                 | Description                                   |
| --------------------------------------- | --------------------------------------------- |
| [`@100xbansal/ui`](packages/ui)         | Components, theme, and `DesignSystemProvider` |
| [`@100xbansal/tokens`](packages/tokens) | Design tokens                                 |
| [`storybook`](apps/storybook)           | Component docs and playground (private)       |

## Development

Requires Node 22+ and pnpm 11.

```sh
pnpm install
pnpm storybook      # http://localhost:6006
pnpm build          # build all packages
pnpm test           # unit tests + story tests
pnpm lint
pnpm typecheck
```

Story tests run in a real browser. Install it once with `pnpm --filter storybook exec playwright install chromium`.

## Releasing

Versioning uses [Changesets](https://github.com/changesets/changesets).

```sh
pnpm changeset          # describe your change
pnpm version-packages   # bump versions and write changelogs
pnpm release            # build and publish to npm
```

## License

[MIT](LICENSE)
