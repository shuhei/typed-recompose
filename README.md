# WIP: Typing HOCs with recompose

It's hard to keep prop types of underlying components of HOCs. Even [the official documentation](https://flowtype.org/docs/react.html#higher-order-components) is not working well. It's even harder to have multiple HOCs typed and maintain with peer developers. Here comes recompose, the HOC utility module.

`recompose` still doesn't have official flowtype definition, but there are some efforts:

- https://github.com/acdlite/recompose/pull/241
- https://github.com/flowtype/flow-typed/pull/624

This gist is an effort to make it happen based on the PRs above.

## Implementation details

- In a union type, a specific type should come before more general types.
  - NG: `T | Fn1<A, B>`
  - OK: `Fn1<A, B> | T`
- HOCs that provide additional props may return `HOC<$Shape<A & B>, B>`. In this way, the underlying component can ignore some unnecessary intermediate props.
  - For example:
  ```js
  const withOpen = withValue(false, (open, setOpen) => ({ open, setOpen }));
  const withToggle = withProps(({ open, setOpen }) => ({ toggle: () => setOpen(!open) }));

  // `Something` doesn't need `setOpen`!
  function Something({ open, toggle }) { /* ... */ }
  const enhancedSomething = compose(withOpen, withToggle)(Something);
  ```