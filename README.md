# design-system

React 19 design system: a Turborepo + pnpm monorepo with styled-components and Storybook 10.

**Live Storybook: https://bhuvnesh179.github.io/design-system/**

| Package                                   | Description                                   |
| ----------------------------------------- | --------------------------------------------- |
| [`@100xbansal/ui`](packages/ui)           | Components, theme, and `DesignSystemProvider` |
| [`@100xbansal/tokens`](packages/tokens)   | Design tokens                                 |
| [`@100xbansal/storybook`](apps/storybook) | Component docs and playground (private)       |

## Documentation

| Doc                                  | Read it to…                                                  |
| ------------------------------------ | ------------------------------------------------------------ |
| [Architecture](docs/ARCHITECTURE.md) | Understand the packages, build, source resolution, and tests |
| [Contributing](CONTRIBUTING.md)      | Set up the repo, add a component, open a pull request        |
| [Releasing](docs/RELEASING.md)       | Publish to npm and use the packages in other projects        |

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

Story tests run in a real browser. Install it once with `pnpm --filter @100xbansal/storybook exec playwright install chromium`.

## Releasing

Versioning uses [Changesets](https://github.com/changesets/changesets).

```sh
pnpm changeset          # describe your change
pnpm version-packages   # bump versions and write changelogs
pnpm release            # build and publish to npm (run in a real terminal for 2FA)
```

Full steps: [docs/RELEASING.md](docs/RELEASING.md).

## License

[MIT](LICENSE)
