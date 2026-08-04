/** @jsx jsx */
import {
  createContext,
  JSX,
  ReactElement,
  ReactNode,
  Ref,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { jsx } from '@emotion/react';
import { createPortal } from 'react-dom';
import { autoUpdate } from '@floating-ui/dom';
import useLayoutEffect from 'use-isomorphic-layout-effect';

import {
  animatedScrollTo,
  getBoundingClientObj,
  getScrollParent,
  getScrollTop,
  getStyleProps,
  normalizedHeight,
  scrollTo,
} from '../utils';
import {
  MenuPlacement,
  MenuPosition,
  CommonProps,
  GroupBase,
  CommonPropsAndClassName,
  CoercedMenuPlacement,
  CSSObjectWithLabel,
} from '../types';

// ==============================
// Menu
// ==============================

// Get Menu Placement
// ------------------------------

interface CalculatedMenuPlacementAndHeight {
  placement: CoercedMenuPlacement;
  maxHeight: number;
}
interface PlacementArgs {
  maxHeight: number;
  menuEl: HTMLDivElement | null;
  minHeight: number;
  placement: MenuPlacement;
  shouldScroll: boolean;
  isFixedPosition: boolean;
  controlHeight: number;
}

export function getMenuPlacement({
  maxHeight: preferredMaxHeight,
  menuEl,
  minHeight,
  placement: preferredPlacement,
  shouldScroll,
  isFixedPosition,
  controlHeight,
}: PlacementArgs): CalculatedMenuPlacementAndHeight {
  const scrollParent = getScrollParent(menuEl!);
  const defaultState: CalculatedMenuPlacementAndHeight = {
    placement: 'bottom',
    maxHeight: preferredMaxHeight,
  };

  // something went wrong, return default state
  if (!menuEl || !menuEl.offsetParent) return defaultState;

  // we can't trust `scrollParent.scrollHeight` --> it may increase when
  // the menu is rendered
  const { height: scrollHeight } = scrollParent.getBoundingClientRect();
  const {
    bottom: menuBottom,
    height: menuHeight,
    top: menuTop,
  } = menuEl.getBoundingClientRect();

  const { top: containerTop } = menuEl.offsetParent.getBoundingClientRect();
  const viewHeight = isFixedPosition
    ? window.innerHeight
    : normalizedHeight(scrollParent);
  const scrollTop = getScrollTop(scrollParent);

  const marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
  const marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
  const viewSpaceAbove = containerTop - marginTop;
  const viewSpaceBelow = viewHeight - menuTop;
  const scrollSpaceAbove = viewSpaceAbove + scrollTop;
  const scrollSpaceBelow = scrollHeight - scrollTop - menuTop;

  const scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
  const scrollUp = scrollTop + menuTop - marginTop;
  const scrollDuration = 160;

  switch (preferredPlacement) {
    case 'auto':
    case 'bottom':
      // 1: the menu will fit, do nothing
      if (viewSpaceBelow >= menuHeight) {
        return { placement: 'bottom', maxHeight: preferredMaxHeight };
      }

      // 2: the menu will fit, if scrolled
      if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }

        return { placement: 'bottom', maxHeight: preferredMaxHeight };
      }

      // 3: the menu will fit, if constrained
      if (
        (!isFixedPosition && scrollSpaceBelow >= minHeight) ||
        (isFixedPosition && viewSpaceBelow >= minHeight)
      ) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }

        // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.
        const constrainedHeight = isFixedPosition
          ? viewSpaceBelow - marginBottom
          : scrollSpaceBelow - marginBottom;

        return {
          placement: 'bottom',
          maxHeight: constrainedHeight,
        };
      }

      // 4. Forked beviour when there isn't enough space below

      // AUTO: flip the menu, render above
      if (preferredPlacement === 'auto' || isFixedPosition) {
        // may need to be constrained after flipping
        let constrainedHeight = preferredMaxHeight;
        const spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;

        if (spaceAbove >= minHeight) {
          constrainedHeight = Math.min(
            spaceAbove - marginBottom - controlHeight,
            preferredMaxHeight
          );
        }

        return { placement: 'top', maxHeight: constrainedHeight };
      }

      // BOTTOM: allow browser to increase scrollable area and immediately set scroll
      if (preferredPlacement === 'bottom') {
        if (shouldScroll) {
          scrollTo(scrollParent, scrollDown);
        }
        return { placement: 'bottom', maxHeight: preferredMaxHeight };
      }
      break;
    case 'top':
      // 1: the menu will fit, do nothing
      if (viewSpaceAbove >= menuHeight) {
        return { placement: 'top', maxHeight: preferredMaxHeight };
      }

      // 2: the menu will fit, if scrolled
      if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }

        return { placement: 'top', maxHeight: preferredMaxHeight };
      }

      // 3: the menu will fit, if constrained
      if (
        (!isFixedPosition && scrollSpaceAbove >= minHeight) ||
        (isFixedPosition && viewSpaceAbove >= minHeight)
      ) {
        let constrainedHeight = preferredMaxHeight;

        // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.
        if (
          (!isFixedPosition && scrollSpaceAbove >= minHeight) ||
          (isFixedPosition && viewSpaceAbove >= minHeight)
        ) {
          constrainedHeight = isFixedPosition
            ? viewSpaceAbove - marginTop
            : scrollSpaceAbove - marginTop;
        }

        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }

        return {
          placement: 'top',
          maxHeight: constrainedHeight,
        };
      }

      // 4. not enough space, the browser WILL NOT increase scrollable area when
      // absolutely positioned element rendered above the viewport (only below).
      // Flip the menu, render below
      return { placement: 'bottom', maxHeight: preferredMaxHeight };
    default:
      throw new Error(`Invalid placement provided "${preferredPlacement}".`);
  }

  return defaultState;
}

// Menu Component
// ------------------------------

export interface MenuPlacementProps {
  /** Set the minimum height of the menu. */
  minMenuHeight: number;
  /** Set the maximum height of the menu. */
  maxMenuHeight: number;
  /** Set whether the menu should be at the top, at the bottom. The auto options sets it to bottom. */
  menuPlacement: MenuPlacement;
  /** The CSS position value of the menu, when "fixed" extra layout management is required */
  menuPosition: MenuPosition;
  /** Set whether the page should scroll to show the menu. */
  menuShouldScrollIntoView: boolean;
}

export interface MenuProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group>,
    MenuPlacementProps {
  /** Reference to the internal element, consumed by the MenuPlacer component */
  innerRef: Ref<HTMLDivElement>;
  innerProps: JSX.IntrinsicElements['div'];
  isLoading: boolean;
  placement: CoercedMenuPlacement;
  /** The children to be rendered. */
  children: ReactNode;
}

interface PlacerProps {
  placement: CoercedMenuPlacement;
  maxHeight: number;
}

interface ChildrenProps {
  ref: Ref<HTMLDivElement>;
  placerProps: PlacerProps;
}

export interface MenuPlacerProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends CommonProps<Option, IsMulti, Group>,
    MenuPlacementProps {
  /** The children to be rendered. */
  children: (childrenProps: ChildrenProps) => ReactElement;
}

function alignToControl(placement: CoercedMenuPlacement) {
  const placementToCSSProp = { bottom: 'top', top: 'bottom' };
  return placement ? placementToCSSProp[placement] : 'bottom';
}
const coercePlacement = (p: MenuPlacement) => (p === 'auto' ? 'bottom' : p);

export const menuCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  {
    placement,
    theme: { borderRadius, spacing, colors },
  }: MenuProps<Option, IsMulti, Group>,
  unstyled: boolean
): CSSObjectWithLabel => { throw new Error("STUB"); };

const PortalPlacementContext =
  createContext<{
    setPortalPlacement: (placement: CoercedMenuPlacement) => void;
  } | null>(null);

// NOTE: internal only
export const MenuPlacer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: MenuPlacerProps<Option, IsMulti, Group>
) => {
    throw new Error("STUB");
};

const Menu = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: MenuProps<Option, IsMulti, Group>
) => {
    throw new Error("STUB");
};

export default Menu;

// ==============================
// Menu List
// ==============================

export interface MenuListProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** Set the max height of the Menu component  */
  maxHeight: number;
  /** The children to be rendered. */
  children: ReactNode;
  /** Inner ref to DOM ReactNode */
  innerRef: Ref<HTMLDivElement>;
  /** The currently focused option */
  focusedOption: Option;
  /** Props to be passed to the menu-list wrapper. */
  innerProps: JSX.IntrinsicElements['div'];
}
export const menuListCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  {
    maxHeight,
    theme: {
      spacing: { baseUnit },
    },
  }: MenuListProps<Option, IsMulti, Group>,
  unstyled: boolean
): CSSObjectWithLabel => { throw new Error("STUB"); };
export const MenuList = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: MenuListProps<Option, IsMulti, Group>
) => {
    throw new Error("STUB");
};

// ==============================
// Menu Notices
// ==============================

const noticeCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  {
    theme: {
      spacing: { baseUnit },
      colors,
    },
  }: NoticeProps<Option, IsMulti, Group>,
  unstyled: boolean
): CSSObjectWithLabel => { throw new Error("STUB"); };
export const noOptionsMessageCSS = noticeCSS;
export const loadingMessageCSS = noticeCSS;

export interface NoticeProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** The children to be rendered. */
  children: ReactNode;
  /** Props to be passed on to the wrapper. */
  innerProps: JSX.IntrinsicElements['div'];
}

export const NoOptionsMessage = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  children = 'No options',
  innerProps,
  ...restProps
}: NoticeProps<Option, IsMulti, Group>) => {
    throw new Error("STUB");
};

export const LoadingMessage = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>({
  children = 'Loading...',
  innerProps,
  ...restProps
}: NoticeProps<Option, IsMulti, Group>) => {
    throw new Error("STUB");
};

// ==============================
// Menu Portal
// ==============================

export interface MenuPortalProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  appendTo: HTMLElement | undefined;
  children: ReactNode; // ideally Menu<MenuProps>
  controlElement: HTMLDivElement | null;
  innerProps: JSX.IntrinsicElements['div'];
  menuPlacement: MenuPlacement;
  menuPosition: MenuPosition;
}

export interface PortalStyleArgs {
  offset: number;
  position: MenuPosition;
  rect: { left: number; width: number };
}

export const menuPortalCSS = ({
  rect,
  offset,
  position,
}: PortalStyleArgs): CSSObjectWithLabel => { throw new Error("STUB"); };

interface ComputedPosition {
  offset: number;
  rect: { left: number; width: number };
}

export const MenuPortal = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: MenuPortalProps<Option, IsMulti, Group>
) => {
    throw new Error("STUB");
};
