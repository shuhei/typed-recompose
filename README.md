# WIP: Typing HOCs with recompose

It's hard to keep prop types of underlying components of HOCs. Even [the official documentation](https://flowtype.org/docs/react.html#higher-order-components) is not working well. It's even harder to have multiple HOCs typed and maintain with peer developers. Here comes `recompose`, the HOC utility module. If we have `recompose` properly typed, we can omit typing of our own HOCs taking advantage of `recompose` and flowtype's type inference.

`recompose` still doesn't have official flowtype definition, but there are some efforts:

- https://github.com/acdlite/recompose/pull/241
- https://github.com/flowtype/flow-typed/pull/624

This gist is an effort to make it happen based on the PRs above.

## Goals

- Keep types of underlying component's `props`
- Allow underlying component to ignore additional `props` by HOC
- No additional type annotations on top of `recompose`

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
- `suppress_comment` suppresses also next next line in addition to next line. So put a new line after the suppression target line.
  - For example:
    ```
    // .flowconfig
    [options]
    suppress_comment=^ $ExpectError$
    // or
    suppress_comment=\\(.\\|\n\\)*\\$ExpectError
    ```
    
    ```js
    // $ExpectError
    'foo'.bar();
    'foo'.bar(); // This line's error is also suppressed!
    
    // $ExpectError
    'foo'.bar();

    'foo'.bar(); // This line's error is not suppressed!
    ```

## Reference

- [facebook/flow src/typing/type_annotation.ml](https://github.com/facebook/flow/blob/master/src/typing/type_annotation.ml)
- [facebook/flow lib/react.js](https://github.com/facebook/flow/blob/master/lib/react.js)
- [Flow type cheat sheet](http://www.saltycrane.com/blog/2016/06/flow-type-cheat-sheet/)
- [Secret Flow Types](https://medium.com/@raxwunter/secret-flow-types-86b2ebb30951#.fs3zi2lnb)
- [Generic React HOC](https://github.com/facebook/flow/issues/2521)
- [flowtypeのUtility Typeについて その1](http://qiita.com/kinzal/items/e1898c89af5618e18334) (Japanese)
- [flowtypeのUtility Typeについて その2](http://qiita.com/kinzal/items/c55f81e6af1a22a4763f) (Japanese)