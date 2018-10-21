import * as React from 'react'
import { create } from 'react-test-renderer'
import { Debounce, withDebouncedProps } from '../src'

describe('index', () => {
  describe('render-props', () => {
    it('should render at least', () =>
      expect(
        create(
          <Debounce props={{ test: 42 }} wait={0}>
            {({ test }) => <div>{test}</div>}
          </Debounce>,
        ).toJSON(),
      ).toMatchSnapshot())
  })

  describe('HOC', () => {
    let HOCed = withDebouncedProps({ test: 42 }, 0)(({ test }) => <div>{test}</div>)

    it('should render at least', () => expect(create(<HOCed />).toJSON()).toMatchSnapshot())
  })
})
