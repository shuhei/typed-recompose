// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';

import { SomeComponent, AnotherFunc } from './lib/comps';

type AdditionalProps = {
  open: boolean,
  onToggle: () => void,
  setOpen: (open: boolean) => void,
};

type State = {
  open: boolean,
};

export function withOpenState<Props, C: React$Component<*, Props, *>>(
  // This should take also stateless functional component but doens't work...
  // Komponent: Class<C> | (props: Props) => ?React$Element<any>,
  Komponent: Class<C>,
): Class<React$Component<void, $Diff<Props, AdditionalProps>, *>> {
  class WithOpenState extends Component {
    state: State;

    constructor(props: any) {
      super(props);

      this.state = {
        open: false,
      };
    }

    handleToggle = () => {
      this.setState({ open: !this.state.open });
    };

    setOpen = (open: boolean) => {
      this.setState({ open });
    };

    render() {
      return React.createElement(Komponent, {
        open: this.state.open,
        onToggle: this.handleToggle,
        setOpen: this.setOpen,
      });
    }
  }
  return WithOpenState;
}

function renderComponents(container: HTMLElement) {
  const Some = withOpenState(SomeComponent);
  // Should get an error and works.
  // render(<Some label={123} />, container);

  const Another = withOpenState(AnotherFunc);
  // Should get an error but doesn't work.
  // It's because the HOC doesn't accept stateless functional component...
  // render(<Another label={123} />, container);
}
