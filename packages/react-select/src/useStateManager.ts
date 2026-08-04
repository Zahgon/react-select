import {
  ActionMeta,
  GroupBase,
  InputActionMeta,
  OnChangeValue,
  PropsValue,
} from './types';
import { PublicBaseSelectProps } from './Select';
import { useCallback, useState } from 'react';

type StateManagedPropKeys =
  | 'inputValue'
  | 'menuIsOpen'
  | 'onChange'
  | 'onInputChange'
  | 'onMenuClose'
  | 'onMenuOpen'
  | 'value';

type SelectPropsWithOptionalStateManagedProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = Omit<PublicBaseSelectProps<Option, IsMulti, Group>, StateManagedPropKeys> &
  Partial<PublicBaseSelectProps<Option, IsMulti, Group>>;

export interface StateManagerAdditionalProps<Option> {
  defaultInputValue?: string;
  defaultMenuIsOpen?: boolean;
  defaultValue?: PropsValue<Option>;
}

export type StateManagerProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> = SelectPropsWithOptionalStateManagedProps<Option, IsMulti, Group> &
  StateManagerAdditionalProps<Option>;

export default function useStateManager<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
  AdditionalProps
>({
  defaultInputValue = '',
  defaultMenuIsOpen = false,
  defaultValue = null,
  inputValue: propsInputValue,
  menuIsOpen: propsMenuIsOpen,
  onChange: propsOnChange,
  onInputChange: propsOnInputChange,
  onMenuClose: propsOnMenuClose,
  onMenuOpen: propsOnMenuOpen,
  value: propsValue,
  ...restSelectProps
}: StateManagerProps<Option, IsMulti, Group> &
  AdditionalProps): PublicBaseSelectProps<Option, IsMulti, Group> &
  Omit<
    AdditionalProps,
    keyof StateManagerAdditionalProps<Option> | StateManagedPropKeys
  > {
  const [stateInputValue, setStateInputValue] = useState(
    propsInputValue !== undefined ? propsInputValue : defaultInputValue
  );
  const [stateMenuIsOpen, setStateMenuIsOpen] = useState(
    propsMenuIsOpen !== undefined ? propsMenuIsOpen : defaultMenuIsOpen
  );
  const [stateValue, setStateValue] = useState(
    propsValue !== undefined ? propsValue : defaultValue
  );

  const onChange = useCallback(
    (value: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) => {
          throw new Error("STUB");
      },
    [propsOnChange]
  );
  const onInputChange = useCallback(
    (value: string, actionMeta: InputActionMeta) => {
          throw new Error("STUB");
      },
    [propsOnInputChange]
  );
  const onMenuOpen = useCallback(() => {
      throw new Error("STUB");
  }, [propsOnMenuOpen]);
  const onMenuClose = useCallback(() => {
      throw new Error("STUB");
  }, [propsOnMenuClose]);

  const inputValue =
    propsInputValue !== undefined ? propsInputValue : stateInputValue;
  const menuIsOpen =
    propsMenuIsOpen !== undefined ? propsMenuIsOpen : stateMenuIsOpen;
  const value = propsValue !== undefined ? propsValue : stateValue;

  return {
    ...restSelectProps,
    inputValue,
    menuIsOpen,
    onChange,
    onInputChange,
    onMenuClose,
    onMenuOpen,
    value,
  };
}
