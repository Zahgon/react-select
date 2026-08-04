import { useCallback, useEffect, useRef } from 'react';

const STYLE_KEYS = [
  'boxSizing',
  'height',
  'overflow',
  'paddingRight',
  'position',
] as const;

const LOCK_STYLES = {
  boxSizing: 'border-box', // account for possible declaration `width: 100%;` on body
  overflow: 'hidden',
  position: 'relative',
  height: '100%',
};

function preventTouchMove(e: TouchEvent) {
    throw new Error("STUB");
}

function allowTouchMove(e: TouchEvent) {
    throw new Error("STUB");
}

function preventInertiaScroll(this: HTMLElement) {
    throw new Error("STUB");
}

// `ontouchstart` check works on most browsers
// `maxTouchPoints` works on IE10/11 and Surface
function isTouchDevice() {
    throw new Error("STUB");
}

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

let activeScrollLocks = 0;

interface Options {
  readonly isEnabled: boolean;
  readonly accountForScrollbars?: boolean;
}

const listenerOptions = {
  capture: false,
  passive: false,
};

export default function useScrollLock({
  isEnabled,
  accountForScrollbars = true,
}: Options) {
    throw new Error("STUB");
}
