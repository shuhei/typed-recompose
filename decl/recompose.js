declare module 'recompose' {

   /*
    Fn1 = Function with arity of 1
    HOC = Higher order component
    SCU = Should component update function
  */

  declare type FunctionComponent<A> = (props: A) => ?React$Element<any>;

  declare type ClassComponent<D, A, S> = Class<React$Component<D, A, S>>;

  declare type Component<A> = FunctionComponent<A> | ClassComponent<any, A, any>;

  declare type Fn1<A, B> = (a: A) => B;

  declare type HOC<A, B> = Fn1<Component<A>, Component<B>>;

  declare type SCU<A> = (props: A, nextProps: A) => boolean;

  declare function id<A>(a: A): A;
  declare function compose<A, B, C, D, E, F, G, H, I, J, K, L, M, O, P, Q>(pq: Fn1<P, Q>, op: Fn1<O, P>, mo: Fn1<M, O>, lm: Fn1<L, M>, kl: Fn1<K, L>, jk: Fn1<J, K>, ij: Fn1<I, J>, hi: Fn1<H, I>, gh: Fn1<G, H>, fg: Fn1<F, G>, ef: Fn1<E, F>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, E>;
  declare function compose<A, B, C, D, E, F, G, H, I, J, K, L, M, O, P>(op: Fn1<O, P>, mo: Fn1<M, O>, lm: Fn1<L, M>, kl: Fn1<K, L>, jk: Fn1<J, K>, ij: Fn1<I, J>, hi: Fn1<H, I>, gh: Fn1<G, H>, fg: Fn1<F, G>, ef: Fn1<E, F>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, E>;
  declare function compose<A, B, C, D, E, F, G, H, I, J, K, L, M, O>(mo: Fn1<M, O>, lm: Fn1<L, M>, kl: Fn1<K, L>, jk: Fn1<J, K>, ij: Fn1<I, J>, hi: Fn1<H, I>, gh: Fn1<G, H>, fg: Fn1<F, G>, ef: Fn1<E, F>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, E>;
  declare function compose<A, B, C, D, E, F, G, H, I, J, K, L, M>(lm: Fn1<L, M>, kl: Fn1<K, L>, jk: Fn1<J, K>, ij: Fn1<I, J>, hi: Fn1<H, I>, gh: Fn1<G, H>, fg: Fn1<F, G>, ef: Fn1<E, F>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, E>;
  declare function compose<A, B, C, D, E, F, G, H, I, J, K, L>(kl: Fn1<K, L>, jk: Fn1<J, K>, ij: Fn1<I, J>, hi: Fn1<H, I>, gh: Fn1<G, H>, fg: Fn1<F, G>, ef: Fn1<E, F>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, E>;
  declare function compose<A, B, C, D, E, F, G, H, I, J, K>(jk: Fn1<J, K>, ij: Fn1<I, J>, hi: Fn1<H, I>, gh: Fn1<G, H>, fg: Fn1<F, G>, ef: Fn1<E, F>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, E>;
  declare function compose<A, B, C, D, E, F, G, H, I, J>(ij: Fn1<I, J>, hi: Fn1<H, I>, gh: Fn1<G, H>, fg: Fn1<F, G>, ef: Fn1<E, F>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, E>;
  declare function compose<A, B, C, D, E, F, G, H, I>(hi: Fn1<H, I>, gh: Fn1<G, H>, fg: Fn1<F, G>, ef: Fn1<E, F>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, E>;
  declare function compose<A, B, C, D, E, F, G, H>(gh: Fn1<G, H>, fg: Fn1<F, G>, ef: Fn1<E, F>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, E>;
  declare function compose<A, B, C, D, E, F, G>(fg: Fn1<F, G>, ef: Fn1<E, F>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, E>;
  declare function compose<A, B, C, D, E, F>(ef: Fn1<E, F>, de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, E>;
  declare function compose<A, B, C, D, E>(de: Fn1<D, E>, cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, E>;
  declare function compose<A, B, C, D>(cd: Fn1<C, D>, bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, D>;
  declare function compose<A, B, C>(bc: Fn1<B, C>, ab: Fn1<A, B>): Fn1<A, C>;
  declare function compose<A, B>(ab: Fn1<A, B>): Fn1<A, B>;
  declare function compose<A>(): id<A>;

  declare function mapProps<A, B>(
    propsMapper: Fn1<B, A>
  ): HOC<A, B>;

  declare function withProps<A, B>(
    createProps: Fn1<B, A> | A
  ): HOC<$Shape<A & B>, B>;

  // declare function withPropsOnChange<A, B, D: $Diff<B, A>>(
    // shouldMapOrKeys: Array<$Keys<D>> | SCU<D>,
    // createProps: Fn1<D, A>
  // ): HOC<B, D>;
  declare function withPropsOnChange<A, B>(
    shouldMapOrKeys: Array<$Keys<B>> | SCU<B>,
    createProps: Fn1<B, A>
  // ): HOC<A & B, B>;
  ): HOC<$Shape<A & B>, B>;
  // ): HOC<$Shape<A> & B, B>;

  declare function withHandlers<B, A: { [key: string]: (props: B) => Function }>(
    handlerCreators: A
  ): HOC<$Shape<A & B>, B>

  declare function defaultProps<A, D: $Shape<A>, B: $Diff<A, D>>(
    props: D
  ): HOC<A, B>;

  // TODO: Any way to relate A and B?
  declare function renameProp<A, B>(
    oldName: $Keys<A>,
    newName: $Keys<B>
  ): HOC<A, B>;

  // TODO: Any way to relate A and B?
  declare function renameProps<A, B>(
    nameMap: { [key: $Keys<A>]: $Keys<B> }
  ): HOC<A, B>;

  declare function flattenProp<A, B>(
    propName: $Keys<B>
  ): HOC<A, B>;

  declare function withState<A, B, T>(
    stateName: string,
    stateUpdaterName: string,
    initialState: Fn1<B, T> | T
  ): HOC<$Shape<A & B>, B>;

  declare function withReducer<A, B, Action, State>(
    stateName: string,
    dispatchName: string,
    reducer: (state: State, action: Action) => State,
    initialState: State
  ): HOC<A, B>;

  declare function branch<A, B>(
    test: Fn1<B, boolean>,
    left: HOC<A, B>,
    right?: HOC<A, B>
  ): HOC<A, B>;

  declare function renderComponent<A, B>(C: Component<A>): HOC<B, A>;
  declare function renderComponent<A>(C: string): HOC<A, {}>;

  declare function renderNothing<A>(): HOC<A, {}>;

  declare function shouldUpdate<A>(
    test: SCU<A>
  ): HOC<A, A>;

  declare function pure<A>(C: Component<A>): FunctionComponent<A>;

  declare function onlyUpdateForKeys<A>(propKeys: Array<$Keys<A>>): HOC<A, A>;

  declare function withContext<A, B>(
    childContextTypes: Object,
    getChildContext: (props: Object) => Object
  ): HOC<A, B>;

  declare function getContext<A, B, C: Object>(
    contextTypes: C
  ): HOC<A & { [ key: $Keys<C> ]: any }, B>;

  declare function lifecycle<A>(
    spec: Object,
  ): HOC<A, A>;

  declare function toClass<A>(): HOC<A, A>;

  declare function setStatic<A>(
    key: string,
    value: any
  ): HOC<A, A>;

  declare function setDisplayName<A>(
    displayName: string
  ): HOC<A, A>;

  declare function getDisplayName<A>(C: Component<A>): string;

  declare function wrapDisplayName<A>(C: Component<A>, wrapperName: string): string;

  declare function shallowEqual(a: Object, b: Object): boolean;

  declare function isClassComponent(value: any): boolean;

  declare type ReactNode = React$Element<any> | Array<React$Element<any>>;

  declare function createEagerElement<A>(
    type: Component<A> | string,
    props: ?A,
    children?: ?ReactNode
  ): React$Element<any>;

  declare function createEagerFactory<A>(
      type: Component<A> | string,
    ): (
      props: ?A,
      children?: ?ReactNode
  ) => React$Element<any>;

  declare function createSink<A>(callback: (props: A) => void): Component<A>;

  declare function componentFromProp<A>(propName: string): Component<A>;

  declare function nest<A>(
    ...Components: Array<Component<any> | string>
  ): Component<A>

  declare function hoistStatics<A, B, H: HOC<A, B>>(hoc: H): H;

}
