import * as React from 'react'
import { useEffect, useState } from 'react'

export type DebounceProps<T> = T & {
  wait: number
  children(attr: T): React.ReactChild | Array<React.ReactChild> | null
}

export class Debounce<T extends Object> extends React.PureComponent<DebounceProps<T>, T> {
  tid: any = null

  componentDidUpdate() {
    // had to cast to any because of https://github.com/Microsoft/TypeScript/issues/10727
    const { children, wait, ...propsToDebounce } = this.props as any

    this.clearTimeout()

    this.tid = setTimeout(() => {
      this.tid = null
      this.setState(propsToDebounce)
    }, wait)
  }

  componentWillUnmount() {
    this.clearTimeout()
  }

  clearTimeout() {
    clearTimeout(this.tid)
    this.tid = null
  }

  render() {
    // had to cast to any because of https://github.com/Microsoft/TypeScript/issues/10727
    const { children, wait, ...propsToDebounce } = this.props as any
    return children(this.state || (propsToDebounce as T))
  }
}

export function withDebouncedProps<T extends Object>(keysToDebounce: (keyof T)[], wait: number) {
  return (Component: React.ComponentType<T & { debounced: T }>) => (ownProps: T) => {
    let propsToDebounce = keysToDebounce.reduce(
      (res, key) => {
        res[key] = ownProps[key]

        return res
      },
      {} as T,
    )

    return (
      <Debounce<T> {...propsToDebounce} wait={wait}>
        {debouncedProps => <Component {...ownProps} debounced={debouncedProps} />}
      </Debounce>
    )
  }
}

export function useDebounce<T>(value: T, wait = 0): T {
  let [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      let tid = setTimeout(() => setDebouncedValue(value), wait)

      return () => clearTimeout(tid)
    },
    [value],
  )

  return debouncedValue
}

export default Debounce
