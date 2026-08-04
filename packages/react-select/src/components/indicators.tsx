/** @jsx jsx */
import { JSX, ReactNode } from 'react';
import { jsx, keyframes } from '@emotion/react';

import {
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  GroupBase,
} from '../types';
import { getStyleProps } from '../utils';

// ==============================
// Dropdown & Clear Icons
// ==============================

const Svg = ({
  size,
  ...props
}: JSX.IntrinsicElements['svg'] & { size: number }) => { throw new Error("STUB"); };

export type CrossIconProps = JSX.IntrinsicElements['svg'] & { size?: number };
export const CrossIcon = (props: CrossIconProps) => { throw new Error("STUB"); };
export type DownChevronProps = JSX.IntrinsicElements['svg'] & { size?: number };
export const DownChevron = (props: DownChevronProps) => { throw new Error("STUB"); };

// ==============================
// Dropdown & Clear Buttons
// ==============================

export interface DropdownIndicatorProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** The children to be rendered inside the indicator. */
  children?: ReactNode;
  /** Props that will be passed on to the children. */
  innerProps: JSX.IntrinsicElements['div'];
  /** The focused state of the select. */
  isFocused: boolean;
  isDisabled: boolean;
}

const baseCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  {
    isFocused,
    theme: {
      spacing: { baseUnit },
      colors,
    },
  }:
    | DropdownIndicatorProps<Option, IsMulti, Group>
    | ClearIndicatorProps<Option, IsMulti, Group>,
  unstyled: boolean
): CSSObjectWithLabel => { throw new Error("STUB"); };

export const dropdownIndicatorCSS = baseCSS;
export const DropdownIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => {
    throw new Error("STUB");
};

export interface ClearIndicatorProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** The children to be rendered inside the indicator. */
  children?: ReactNode;
  /** Props that will be passed on to the children. */
  innerProps: JSX.IntrinsicElements['div'];
  /** The focused state of the select. */
  isFocused: boolean;
}

export const clearIndicatorCSS = baseCSS;
export const ClearIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ClearIndicatorProps<Option, IsMulti, Group>
) => {
    throw new Error("STUB");
};

// ==============================
// Separator
// ==============================

export interface IndicatorSeparatorProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  isDisabled: boolean;
  isFocused: boolean;
  innerProps?: JSX.IntrinsicElements['span'];
}

export const indicatorSeparatorCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  {
    isDisabled,
    theme: {
      spacing: { baseUnit },
      colors,
    },
  }: IndicatorSeparatorProps<Option, IsMulti, Group>,
  unstyled: boolean
): CSSObjectWithLabel => { throw new Error("STUB"); };

export const IndicatorSeparator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: IndicatorSeparatorProps<Option, IsMulti, Group>
) => {
    throw new Error("STUB");
};

// ==============================
// Loading
// ==============================

const loadingDotAnimations = keyframes`
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
`;

export const loadingIndicatorCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  {
    isFocused,
    size,
    theme: {
      colors,
      spacing: { baseUnit },
    },
  }: LoadingIndicatorProps<Option, IsMulti, Group>,
  unstyled: boolean
): CSSObjectWithLabel => { throw new Error("STUB"); };

interface LoadingDotProps {
  delay: number;
  offset: boolean;
}
const LoadingDot = ({ delay, offset }: LoadingDotProps) => { throw new Error("STUB"); };

export interface LoadingIndicatorProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** Props that will be passed on to the children. */
  innerProps: JSX.IntrinsicElements['div'];
  /** The focused state of the select. */
  isFocused: boolean;
  isDisabled: boolean;
  /** Set size of the container. */
  size: number;
}
export const LoadingIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  innerProps,
  isRtl,
  size = 4,
  ...restProps
}: LoadingIndicatorProps<Option, IsMulti, Group>) => {
    throw new Error("STUB");
};
