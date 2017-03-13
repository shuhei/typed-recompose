// @flow
import React, { Component } from 'react';
import { render } from 'react-dom';
import { compose, withProps, renameProp } from 'recompose';

import { withValue } from './lib/withValue';
import { SomeComponent, AnotherFunc } from './lib/comps';

// const withS = withValue(false, (open, setOpen) => ({ open, setOpen }));
const withS = withValue(
  ({ label }) => !!label,
  (open, setOpen) => ({ open, setOpen })
);

const withP = withProps(({ open, setOpen }) => ({
  onToggle: () => setOpen(!open),
}));

export const withOpenState = compose(withS, withP);

function renderComponents(container: HTMLElement) {
  // `compose` generates cleaner errors than withS(withP(comp))
  // const A = withP(SomeComponent);
  // const Some = withS(A);
  const Some = withOpenState(SomeComponent);
  // const Some = withS(withP(SomeComponent));
  render(<Some label="hello" />, container);
  // Should get an error and works
  render(<Some label={123} />, container);

  const Another = withOpenState(AnotherFunc);
  // Should get an error and works
  // render(<Another label={123} />, container);
}
