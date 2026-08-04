/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Fragment, ReactElement, RefCallback, MouseEvent } from 'react';
import useScrollCapture from './useScrollCapture';
import useScrollLock from './useScrollLock';

interface Props {
  readonly children: (ref: RefCallback<HTMLElement>) => ReactElement;
  readonly lockEnabled: boolean;
  readonly captureEnabled: boolean;
  readonly onBottomArrive?: (event: WheelEvent | TouchEvent) => void;
  readonly onBottomLeave?: (event: WheelEvent | TouchEvent) => void;
  readonly onTopArrive?: (event: WheelEvent | TouchEvent) => void;
  readonly onTopLeave?: (event: WheelEvent | TouchEvent) => void;
}

const blurSelectInput = (event: MouseEvent<HTMLDivElement>) => {
    throw new Error("STUB");
};

export default function ScrollManager({
  children,
  lockEnabled,
  captureEnabled = true,
  onBottomArrive,
  onBottomLeave,
  onTopArrive,
  onTopLeave,
}: Props) {
    throw new Error("STUB");
}
