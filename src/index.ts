import * as React from 'react'
import debounce from 'lodash.debounce'

export interface DebounceProps<T> {
    props: T
    wait: number
    children(attr: T): React.ReactChild | Array<React.ReactChild> | null
}

export class Debounce<T extends Object> extends React.Component<DebounceProps<T>, T> {
    debouncedSetState = debounce(this.setState, this.props.wait)

    componentDidUpdate() {
        this.debouncedSetState(this.props.props)
    }

    render() {
        return this.props.children(this.state || {} as T)
    }
}

export default Debounce
