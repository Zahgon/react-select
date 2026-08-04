import * as React from 'react';
import { ReactElement } from 'react';
import { PlaceholderProps } from '../components/Placeholder';
import { Fade, collapseDuration } from './transitions';
import { GroupBase } from '../types';

export type PlaceholderComponent = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: PlaceholderProps<Option, IsMulti, Group>
) => ReactElement;

// fade in when last multi-value removed, otherwise instant
const AnimatedPlaceholder =
  (WrappedComponent: PlaceholderComponent) =>
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: PlaceholderProps<Option, IsMulti, Group>
  ) =>
    { throw new Error("STUB"); };

export default AnimatedPlaceholder;
