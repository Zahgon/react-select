import * as React from 'react';
import { useEffect, useState } from 'react';
import { ComponentType, CSSProperties, ReactNode, useRef } from 'react';
import { Transition } from 'react-transition-group';
import {
  ExitHandler,
  TransitionStatus,
} from 'react-transition-group/Transition';

// ==============================
// Fade Transition
// ==============================

type FadeProps<ComponentProps> = {
  component: ComponentType<ComponentProps>;
  in?: boolean;
  onExited?: ExitHandler<undefined | HTMLElement>;
  duration?: number;
} & ComponentProps;
export const Fade = <ComponentProps extends {}>({
  component: Tag,
  duration = 1,
  in: inProp,
  onExited,
  ...props
}: FadeProps<ComponentProps>) => {
    throw new Error("STUB");
};

// ==============================
// Collapse Transition
// ==============================

export const collapseDuration = 260;

type Width = number | 'auto';
interface CollapseProps {
  children: ReactNode;
  in?: boolean;
  onExited?: ExitHandler<undefined | HTMLElement>;
}

// wrap each MultiValue with a collapse transition; decreases width until
// finally removing from DOM
export const Collapse = ({ children, in: _in, onExited }: CollapseProps) => {
    throw new Error("STUB");
};
