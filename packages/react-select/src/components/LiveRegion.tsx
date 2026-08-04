/** @jsx jsx */
import { Fragment, ReactNode, useMemo } from 'react';
import { jsx } from '@emotion/react';
import A11yText from '../internal/A11yText';
import { defaultAriaLiveMessages, AriaSelection } from '../accessibility';

import { CommonProps, GroupBase, OnChangeValue, Options } from '../types';

// ==============================
// Root Container
// ==============================

export interface LiveRegionProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends CommonProps<Option, IsMulti, Group> {
  children: ReactNode;
  innerProps: { className?: string };
  // Select state variables
  ariaSelection: AriaSelection<Option, IsMulti>;
  focusedOption: Option | null;
  focusedValue: Option | null;
  selectValue: Options<Option>;
  focusableOptions: Options<Option>;
  isFocused: boolean;
  id: string;
  isAppleDevice: boolean;
}

const LiveRegion = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: LiveRegionProps<Option, IsMulti, Group>
) => {
    throw new Error("STUB");
};

export default LiveRegion;
