# @100xbansal/ui

React 19 component library built with styled-components.

## Install

```sh
npm install @100xbansal/ui styled-components react react-dom
```

Peer dependencies: `react@^19`, `react-dom@^19`, `styled-components@^6.1`.

## Usage

Wrap your app once in `DesignSystemProvider`. It sets up the theme, light/dark color mode, and global styles.

```tsx
import { Button, DesignSystemProvider, TextField } from '@100xbansal/ui';

export function App() {
  return (
    <DesignSystemProvider defaultColorMode="light">
      <TextField label="Email" type="email" />
      <Button variant="primary">Get started</Button>
    </DesignSystemProvider>
  );
}
```

Switch color mode from any component with `useColorMode()`:

```tsx
const { colorMode, toggleColorMode } = useColorMode();
```

### Next.js App Router

Every export is marked `"use client"`, so you can import components from Server Components. For
server-side rendered styles without a flash of unstyled content, set up the
[styled-components registry](https://nextjs.org/docs/app/guides/css-in-js#styled-components).

## Components

- `Button`: `variant` (`primary` | `secondary` | `ghost` | `danger`), `size`, `loading`, `fullWidth`, `startIcon`, `endIcon`. Submit buttons show a spinner automatically while their `<form action>` is pending.
- `TextField`: `label`, `hint`, `error`, plus every native `<input>` prop.

Both take `ref` as a regular prop.

## License

MIT
