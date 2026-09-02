import type { ComponentPropsWithRef } from 'react';
import { Styled__Name__, type __Name__Size, type __Name__Variant } from './__Name__.styles';

export interface __Name__Props extends ComponentPropsWithRef<'__element__'> {
  variant?: __Name__Variant;
  size?: __Name__Size;
}

export function __Name__({ variant = 'default', size = 'md', ...props }: __Name__Props) {
  return <Styled__Name__ $variant={variant} $size={size} {...props} />;
}
