// @flow
import React from 'react';

import { withValue } from '../withValue';

type Props = {
  a: boolean,
  setA: (a: boolean) => void,
  b: number,
};

const Comp = (props: Props) => (
  <div><pre>{JSON.stringify(props, null, 2)}</pre></div>
);

const CV = withValue(false, (a, setA) => ({ a, setA }))(Comp);
<CV b={2} />;
// $ExpectError
<CV b="foo" />;

// $ExpectError
<CV />;

const CVF = withValue(
  ({ b }) => (b > 0),
  (a, setA) => ({ a, setA })
)(Comp);
<CVF b={2} />;
// $ExpectError
<CVF b="foo" />;

// $ExpectError
<CVF />;
