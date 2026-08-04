import { useCallback, useEffect, useRef } from 'react';
import { supportsPassiveEvents } from '../utils';

const cancelScroll = (event: WheelEvent | TouchEvent) => {
    throw new Error("STUB");
};

interface Options {
  readonly isEnabled: boolean;
  readonly onBottomArrive?: (event: WheelEvent | TouchEvent) => void;
  readonly onBottomLeave?: (event: WheelEvent | TouchEvent) => void;
  readonly onTopArrive?: (event: WheelEvent | TouchEvent) => void;
  readonly onTopLeave?: (event: WheelEvent | TouchEvent) => void;
}

export default function useScrollCapture({
  isEnabled,
  onBottomArrive,
  onBottomLeave,
  onTopArrive,
  onTopLeave,
}: Options) {
    throw new Error("STUB");
}
