import * as React from 'react'
import debounce from 'lodash.debounce'

export type DebounceProps<T> = T & {
  wait: number
  children(attr: T): React.ReactChild | Array<React.ReactChild> | null
}

export class Debounce<T extends Object> extends React.PureComponent<DebounceProps<T>, T> {
  debouncedSetState = debounce(this.setState, this.props.wait)

  componentDidUpdate() {
    // had to cast to any because of https://github.com/Microsoft/TypeScript/issues/10727
    const { children, wait, ...propsToDebounce } = this.props as any
    this.debouncedSetState(propsToDebounce as T)
  }

  render() {
    // had to cast to any because of https://github.com/Microsoft/TypeScript/issues/10727
    const { children, wait, ...propsToDebounce } = this.props as any
    return children(this.state || (propsToDebounce as T))
  }
}

export function withDebouncedProps<T extends Object>(props: T, wait: number) {
  return (Component: React.ComponentType<T>) =>
    class DebounceHOC extends React.PureComponent {
      render() {
        return (
          <Debounce {...{ ...(props as Object), wait }}>{debouncedProps => <Component {...debouncedProps} />}</Debounce>
        )
      }
    }
}

export default Debounce
