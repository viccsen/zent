import * as React from 'react';
import { findDOMNode } from 'react-dom';
import Context, { IPopoverContext } from './Context';

export interface IPopoverAnchorProps {
  onClick?: () => void;
}

class PopoverAnchor extends React.Component<IPopoverAnchorProps> {
  static contextType = Context;
  declare context: IPopoverContext;

  getElement() {
    return findDOMNode(this);
  }

  componentDidMount() {
    this.context.popover.getAnchor = () => this.getElement();
  }

  componentWillUnmount() {
    this.context.popover.getAnchor = null;
  }

  render() {
    return this.props.children;
  }
}

export default PopoverAnchor;
