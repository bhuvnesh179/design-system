# @100xbansal/tokens

Design tokens used by [`@100xbansal/ui`](https://www.npmjs.com/package/@100xbansal/ui): color palette, semantic light/dark colors, spacing, typography, radii, shadows, breakpoints, z-indices, and durations.

## Install

```sh
npm install @100xbansal/tokens
```

## Usage

```ts
import { darkColors, lightColors, palette, radii, space } from '@100xbansal/tokens';

const card = {
  padding: space[4],
  borderRadius: radii.lg,
  background: lightColors.bgSubtle,
};
```

All tokens are plain `as const` objects, so values are fully typed.

## License

MIT
