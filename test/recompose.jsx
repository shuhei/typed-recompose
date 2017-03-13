// @flow
import React from 'react';
import {
  compose,
  id,
  mapProps,
  withProps,
  withPropsOnChange,
  withHandlers,
  defaultProps,
  renameProp,
  renameProps,
  flattenProp,
  withState,
  withReducer,
  branch,
  renderComponent,
  renderNothing,
  shouldUpdate,
  pure,
  onlyUpdateForKeys,
  withContext,
  getContext,
  lifecycle,
  toClass,
  setStatic,
  setDisplayName,
  getDisplayName,
  wrapDisplayName,
  shallowEqual,
  isClassComponent,
  createEagerElement,
  createEagerFactory,
  createSink,
  componentFromProp,
  nest,
  hoistStatics
} from 'recompose';
import type { Component } from 'recompose';

type Props1 = {
  a: string,
  b: number
};


const C1: Component<Props1> = (props: Props1) => <div><pre>{JSON.stringify(props, null, 2)}</pre></div>;

// mapProps
const C2 = mapProps(({ a }: $Shape<{ a: string }>): Props1 => ({ a, b: a.length }))(C1);
<C2 a="foo" />;
// $ExpectError
<C2 a={1} />; // a is not a string


// withProps
const C3 = withProps({ a: 's', b: 1 })(C1);
<C3 />;
const C4 = withProps((ownProps: { a: string }): { b: number } => ({
  b: ownProps.a.length,
}))(C1);
<C4 a="foo" />; // b will be added on
const C4_2 = withProps((ownProps: { a: string }): { b: number } => ({
  b: ownProps.a.length,
}))(C1);

// $ExpectError
<C4_2 />; // missing a


// withPropsOnChange
const C5 = withPropsOnChange(['a'], ({ a }: { a: string }): { b: number } => ({
  b: a.length,
}))(C1);
<C5 a="foo" />;
const C6 = withPropsOnChange(['xxx'], ({ a }: { a: string }): { b: number } => ({
  b: a.length,
}))(C1);

<C6 a="foo" xxx="bar" />;
// $ExpectError
<C6 a="foo" />; // xxx not in props

const C7 = withPropsOnChange(
  (props, nextProps) => props.a === nextProps.a,
  ownProps => ({ b: ownProps.a.length })
)(C1);
<C7 a="foo" />;
const C8 = withPropsOnChange(
  (props, nextProps) => props.xxx === nextProps.a, // extra props should be allowed
  ownProps => ({ b: ownProps.a.length })
)(C1);

// $ExpectError
<C8 a="foo" />; // missing `xxx`

// withHandlers
const C9_1 = (props: { onChange: Function }) => <div><pre>{JSON.stringify(props, null, 2)}</pre></div>;
const C9 = withHandlers({
  onChange: props => event => {
    props.updateValue(event.target.value);
  }
})(C9_1);
<C9 />;
const C10 = withHandlers({})(C9_1);
// $ExpectError
<C10 />;  // missing onChange


// defaultProps
const C11 = defaultProps({ a: 's' })(C1);
<C11 b={2} />;
<C11 a="foo" b={2} />;
// $ExpectError
<C11 a={1} b={2} />;


// renameProp
const C12 = renameProp('a', 'cc')(C1);
<C12 cc="foo" b={2} />;
// $ExpectError
<C12 cc={1} b={2} />; // Wrong type

// $ExpectError
<C12 cc="foo" />; // Missing prop `b`


// renameProps
const C13 = renameProps({'a': 'ccc'})(C1);
<C13 ccc="foo" b={2} />;
// $ExpectError
<C13 ccc={1} b={2} />; // Wrong type

// $ExpectError
<C13 ccc="foo" />; // Missing prop `b`


// flattenProp
const C14 = flattenProp('object')(C1);
<C14 object={{ a: 'foo', b: 1 }} />;
const C15 = flattenProp('xxx')(C1);
// $ExpectError
<C15 object={{ a: 'foo', b: 1 }} />; // xxx not in props


// withState
type Props2 = {
  counter: number,
  setCounter: (a: number) => void,
};
const C16_1: Component<Props2> = (props: Props2) => <div><pre>{JSON.stringify(props, null, 2)}</pre></div>;
const C16 = withState(
  'counter',
  'setCounter',
  0
)(C16_1);
<C16 />;
const C17 = withState(
  'counter',
  'setCounter',
  (props: { bar: number }): number => props.bar + 1
)(C16_1);
<C17 bar={1} />;
// $ExpectError
<C17 bar="baz" />; // Can not add 1 to string "baz"

// $ExpectError
<C17 /> // Prop `bar` is missing


// withReducer
type Action = { type: 'increment', payload: number };
type Props3 = {
  counter: number,
  dispatch: (action: Action) => void,
};
const C18_1: Component<Props3> = (props: Props3) => <div><pre>{JSON.stringify(props, null, 2)}</pre></div>;
const C18 = withReducer(
  'counter',
  'dispatch',
  (count: number, action: Action): number => count + action.payload,
  0
)(C18_1);
<C18 />;
const C19 = withReducer(
  'counter',
  'dispatch',
  (count: number, action: Action): number => count + action.payload,
  // $ExpectError
  "0" // "0" is not a number

)(C18_1);
<C19 />;
const C20 = withReducer(
  'counter',
  'dispatch',
  // $ExpectError
  (count: number, action: Action) => "" + count + action.payload, // result is not a number

  0
)(C18_1);
<C20 />;


// branch
const C21 = branch(
  ({ addA }: { addA: boolean }): boolean => addA,
  withProps({ a: 'foo' }),
)(C1);
<C21 addA b={2} />;
// $ExpectError
<C21 b={2} />; // Missing `addA`.

// renderComponent
const Loading = () => <div>Loading...</div>;
const C22 = renderComponent(Loading)(C1);
<C22 />;
const C22_1 = renderComponent(C1)(Loading);
<C22_1 a="foo" b={1} />;
// $ExpectError
<C22_1 a={2} b={1} />; // `a` should be string

const C22_2 = renderComponent('hello')(C1);
<C22_2 />;

// renderNothing
const C23 = renderNothing()(C1);
<C23 />;


// shouldUpdate
const C24 = shouldUpdate(
  (props, nextProps) => props.a === nextProps.a,
)(C1);
<C24 a="foo" b={1} />;
const C25 = shouldUpdate(
  (props, nextProps) => props.xxx === nextProps.a, // xxx is not in Props1
  // $ExpectError
)(C1); // TODO: Why is error happen here and not 2 lines above?

<C25 a="foo" b={1} />;


// pure
const C26 = pure(C1);
<C26 a="foo" b={3} />;
// $ExpectError
const C27 = pure(C1); // TODO: Why does error happen here and not next line?

<C27 b={5} /> // missing a


// TODO: onlyUpdateForKeys
// TODO: withContext
// TODO: getContext
// TODO: lifecycle
// TODO: toClass
// TODO: setStatic
// TODO: setDisplayName
// TODO: getDisplayName
// TODO: wrapDisplayName
// TODO: shallowEqual
// TODO: isClassComponent
// TODO: createEagerElement
// TODO: createEagerFactory
// TODO: createSink
// TODO: componentFromProp
// TODO: compose
