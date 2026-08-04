/** @jsx jsx */
import { JSX, ReactNode } from 'react';
import { jsx } from '@emotion/react';
import {
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  GroupBase,
} from '../types';
import { getStyleProps } from '../utils';

export interface PlaceholderProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** The children to be rendered. */
  children: ReactNode;
  /** props passed to the wrapping element for the group. */
  innerProps: JSX.IntrinsicElements['div'];
  isDisabled: boolean;
  isFocused: boolean;
}

export const placeholderCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  { theme: { spacing, colors } }: PlaceholderProps<Option, IsMulti, Group>,
  unstyled: boolean
): CSSObjectWithLabel => { throw new Error("STUB"); };

const Placeholder = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: PlaceholderProps<Option, IsMulti, Group>
) => {
    throw new Error("STUB");
};

export default Placeholder;
