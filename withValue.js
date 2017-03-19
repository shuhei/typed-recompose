import { Component } from 'react'
import createHelper from 'recompose/createHelper'
import { createEagerFactory } from 'recompose'

// https://github.com/acdlite/recompose/pull/241#issuecomment-269765711
const withValueImpl = (initialState, mapStateProps) => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)
  return class extends Component {
    state = {
      stateValue: typeof initialState === 'function'
        ? initialState(this.props)
        : initialState
    };

    updateStateValue = (updateFn, callback) => (
      this.setState(({ stateValue }) => ({
        stateValue: typeof updateFn === 'function'
          ? updateFn(stateValue)
          : updateFn
      }), callback)
    );

    render() {
      return factory({
        ...this.props,
        ...mapStateProps(this.state.stateValue, this.updateStateValue),
      });
    }
  }
};

const withValue = createHelper(withValueImpl, 'withValue');
export default withValue;
