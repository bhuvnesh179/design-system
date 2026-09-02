import { screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { renderWithTheme } from '../../test/render';
import { __Name__ } from './__Name__';

describe('__Name__', () => {
  it('renders its children', () => {
    renderWithTheme(<__Name__>Content</__Name__>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('passes ref as a regular prop', () => {
    const ref = createRef<__ElementType__>();
    renderWithTheme(<__Name__ ref={ref}>Content</__Name__>);
    expect(ref.current).toBeInstanceOf(__ElementType__);
  });
});
