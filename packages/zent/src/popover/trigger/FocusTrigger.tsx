import * as React from 'react';
import { isElement } from 'react-is';
import Context from '../Context';
import Anchor from '../Anchor';
import { cloneElement } from 'react';

export interface IPopoverFocusTriggerChildProps<T extends Element = Element> {
  onFocus?: (...args: any[]) => void;
  onBlur?: (...args: any[]) => void;
}

export interface IPopoverFocusTriggerProps<
  ChildProps extends IPopoverFocusTriggerChildProps
> {
  children?:
    | string
    | number
    | React.ReactElement<ChildProps, any>
    | ((childProps: IPopoverFocusTriggerChildProps) => React.ReactNode);
}

export function PopoverFocusTrigger<
  ChildProps extends IPopoverFocusTriggerChildProps = IPopoverFocusTriggerChildProps
>({ children }: IPopoverFocusTriggerProps<ChildProps>) {
  const ctx = React.useContext(Context);
  if (!ctx) {
    throw new Error('PopoverFocusTrigger must be child of Popover');
  }
  const childProps: IPopoverFocusTriggerChildProps = {
    onFocus(...args: any[]) {
      if (isElement(children)) {
        children.props.onFocus?.(...args);
      }
      ctx.popover.setVisible(true);
    },
    onBlur(...args: any[]) {
      if (isElement(children)) {
        children.props.onBlur?.(...args);
      }
      ctx.popover.setVisible(false);
    },
  };
  let child: React.ReactNode;
  if (typeof children === 'function') {
    child = children(childProps);
  } else if (isElement(children)) {
    child = cloneElement(children, childProps);
  } else {
    child = <span {...childProps}>{children}</span>;
  }
  return <Anchor>{child}</Anchor>;
}

export default PopoverFocusTrigger;
