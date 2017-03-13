// @flow
import React, { Component } from 'react';

type SomeProps = {
  label: string,
  open: boolean,
  onToggle: () => void,
  // setOpen: (open: boolean) => void,
};

export class SomeComponent extends Component<void, SomeProps, void> {
  props: SomeProps;

  constructor(props: SomeProps) {
    super(props);
  }

  render() {
    const { label, open, onToggle } = this.props;
    return (
      <div>
        {open && (
          <button onClick={onToggle}>{label}</button>
        )}
      </div>
    );
  }
}

type AnotherProps = {
  label: string,
  open: boolean,
  onToggle: () => void,
  setOpen: (open: boolean) => void,
};

export function AnotherFunc({ label, open, onToggle }: AnotherProps) {
  return (
    <div>
      {open && (
        <button onClick={onToggle}>{label}</button>
      )}
    </div>
  );
}
