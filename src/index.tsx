import * as React from 'react'
import debounce from 'lodash.debounce'

export interface DebounceProps<T> {
  props: T
  wait: number
  children(attr: T): React.ReactChild | Array<React.ReactChild> | null
}

export class Debounce<T extends Object> extends React.PureComponent<DebounceProps<T>, T> {
  debouncedSetState = debounce(this.setState, this.props.wait)

  componentDidUpdate() {
    this.debouncedSetState(this.props.props)
  }

  render() {
    return this.props.children(this.state || this.props.props)
  }
}

export let withDebouncedProps = (props, wait: number) => Component =>
  class DebounceHOC extends React.PureComponent {
    render() {
      return <Debounce {...{ props, wait }}>{debouncedProps => <Component {...debouncedProps} />}</Debounce>
    }
  }

export default Debounce
