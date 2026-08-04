/** @jsx jsx */
import { FocusEventHandler, FunctionComponent } from 'react';
import { jsx } from '@emotion/react';

const RequiredInput: FunctionComponent<{
  readonly name?: string;
  readonly onFocus: FocusEventHandler<HTMLInputElement>;
}> = ({ name, onFocus }) => { throw new Error("STUB"); };

export default RequiredInput;
