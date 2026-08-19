import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { DesignSystemProvider } from '../provider';

export function renderWithTheme(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: ({ children }) => <DesignSystemProvider>{children}</DesignSystemProvider>,
    ...options,
  });
}
