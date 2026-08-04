/** @jsx jsx */
import { JSX, Ref } from 'react';
import { jsx } from '@emotion/react';
import { removeProps } from '../utils';

export default function DummyInput({
  innerRef,
  ...props
}: JSX.IntrinsicElements['input'] & {
  readonly innerRef: Ref<HTMLInputElement>;
}) {
    throw new Error("STUB");
}
