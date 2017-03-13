// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { compose, withState, withProps } from 'recompose';

import { SomeComponent, AnotherFunc } from './lib/comps';

// const withS = withState('open', 'setOpen', false);
const withS = withState('open', 'setOpen', ({ label }) => !!label);
const withP = withProps(({ open, setOpen }) => ({
  toggle: () => setOpen(!open),
  close: () => setOpen(false),
}));
export const withOpenState = compose(withS, withP);

function renderComponents(container: HTMLElement) {
  const Some = withOpenState(SomeComponent);
  render(<Some label="hello" />, container);
  // Should get an error but doesn't work.
  render(<Some label={123} />, container);

  const Another = withOpenState(AnotherFunc);
  // Should get an error but doesn't work.
  render(<Another label={123} />, container);
}
