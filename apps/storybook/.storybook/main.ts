import type { StorybookConfig } from '@storybook/react-vite';
import { defaultClientConditions } from 'vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: [
    '../src/**/*.mdx',
    '../../../packages/ui/src/**/*.mdx',
    '../../../packages/ui/src/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal: (viteConfig) => {
    // Resolve workspace packages to their TypeScript source for instant HMR without a build step.
    viteConfig.resolve ??= {};
    viteConfig.resolve.conditions = ['@100xbansal/source', ...defaultClientConditions];
    return viteConfig;
  },
};

export default config;
