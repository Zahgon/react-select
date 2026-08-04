import * as React from 'react';
import { useEffect, useState, ReactElement, ReactNode } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { ValueContainerProps } from '../components/containers';
import { GroupBase } from '../types';

export type ValueContainerComponent = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ValueContainerProps<Option, IsMulti, Group>
) => ReactElement;

interface IsMultiValueContainerProps extends ValueContainerProps {
  component: ValueContainerComponent;
}

// make ValueContainer a transition group
const AnimatedValueContainer =
  (WrappedComponent: ValueContainerComponent) =>
  <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
    props: ValueContainerProps<Option, IsMulti, Group>
  ) =>
    { throw new Error("STUB"); };

const IsMultiValueContainer = ({
  component,
  ...restProps
}: IsMultiValueContainerProps) => {
    throw new Error("STUB");
};

const useIsMultiValueContainer = ({
  children,
  ...props
}: ValueContainerProps) => {
  const {
    isMulti,
    hasValue,
    innerProps,
    selectProps: { components, controlShouldRenderValue },
  } = props;

  const [cssDisplayFlex, setCssDisplayFlex] = useState(
    isMulti && controlShouldRenderValue && hasValue
  );
  const [removingValue, setRemovingValue] = useState(false);

  useEffect(() => {
      throw new Error("STUB");
  }, [hasValue, cssDisplayFlex]);

  useEffect(() => {
      throw new Error("STUB");
  }, [removingValue, hasValue, cssDisplayFlex]);

  const onExited = () => setRemovingValue(true);

  const childMapper = (child: ReactNode) => {
      throw new Error("STUB");
  };

  const newInnerProps = {
    ...innerProps,
    style: {
      ...innerProps?.style,
      display: (isMulti && hasValue) || cssDisplayFlex ? 'flex' : 'grid',
    },
  };

  const newProps = {
    ...props,
    innerProps: newInnerProps,
    children: React.Children.toArray(children).map(childMapper),
  };

  return newProps;
};

export default AnimatedValueContainer;
