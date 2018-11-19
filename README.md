# react-debounce-props
[![npm version](https://badge.fury.io/js/react-debounce-props.svg)](https://badge.fury.io/js/react-debounce-props)
[![Build Status](https://travis-ci.com/kitos/react-debounce-props.svg?branch=master)](https://travis-ci.com/kitos/react-debounce-props)
[![codecov](https://codecov.io/gh/kitos/react-debounce-props/branch/master/graph/badge.svg)](https://codecov.io/gh/kitos/react-debounce-props)

[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/react.svg?style=for-the-badge)](https://unpkg.com/react-debounce-props@1.0.0/dist/umd/react-debounce-props.js)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react.svg?style=for-the-badge)](https://unpkg.com/react-debounce-props@1.0.0/dist/umd/react-debounce-props.js)

Tiny render-prop/HOC/hook component for props/state debouncing

## Install

### Using npm

`npm i react-debounce-props --save`

Then, use it as usual:

```JS
// using ES6 modules
import { Debounce } from 'react-debounce-props'

// using CommonJS modules
const { Debounce } = require('react-debounce-props') 
```

### 1998 Script Tag (UMD build)

The UMD build is also available on [unpkg](https:/unpkg.com):

```HTML
<script src="https://unpkg.com/react@16.4.1/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-debounce-props"></script>
```

The package is avalable on `window.ReactDebounceProps`

## Usage

### Hook

```JS
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDebounce } from "react-debounce-props";

let App = () => {
  let [value, setValue] = useState("");
  let debouncedValue = useDebounce(value, 250);

  return (
    <div className="App">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Type smth..."
      />

      <div>
        Normal value: <b>{value}</b>
      </div>

      <div>
        Debounced value: <b>{debouncedValue}</b>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

[![Edit debounce-input](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0483602w5l?autoresize=1&hidenavigation=1)

### render-prop

#### Debounce state

This lib can easily replace [react-debounce-input](https://github.com/nkbt/react-debounce-input) cause it is more generic.

```JS
import React from 'react'
import ReactDOM from 'react-dom'
import Debounce from 'react-debounce-props'

class App extends React.Component {
  state = {}

  render() {
    return (
      <div>
        <input
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
          placeholder="Type smth..."
        />

        <div>
          Normal value: <b>{this.state.value}</b>
        </div>

        <Debounce debouncedValue={this.state.value} wait={250}>
          {({ debouncedValue }) => (
            <div>
              Debounced value: <b>{debouncedValue}</b>
            </div>
          )}
        </Debounce>
      </div>
    )
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

[![Edit kx3wow4wmr](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/kx3wow4wmr?autoresize=1&fontsize=13&hidenavigation=1&moduleview=1)

#### Debounce props

You can also debounce props passed from parent components:

```JS
import Debounce from 'react-debounce-props'

let MyComponent = ({ frequentlyUpdatedProp }) => (
  <Debounce lessFrequentlyUpdatedProp={frequentlyUpdatedProp} wait={250}>
    {({ lessFrequentlyUpdatedProp }) => (
      <b>{lessFrequentlyUpdatedProp}!</b>
    )}
  </Debounce>
)
```

as well as from other *render-props* (e.g. from new [React context](https://reactjs.org/docs/context.html#consumer)):

```JS
import Debounce from 'react-debounce-props'

let MyComponent = () => (
  <SomeContextConsumer>
    {frequentlyUpdatedProp => (
      <Debounce lessFrequentlyUpdatedProp={frequentlyUpdatedProp} wait={250}>
        {({ lessFrequentlyUpdatedProp }) => (
          <b>{lessFrequentlyUpdatedProp}!</b>
        )}
      </Debounce>
    )}
  </SomeContextConsumer>
)
```

### High order component

Cause *render-props* approach is more powerful this lib can replace HOC of [react-debounced-props](https://github.com/saltycrane/react-debounced-props) as well.

Use `withDebouncedProps` for that:

```JS
import { withDebouncedProps } from 'react-debounce-props'

const MyDebouncedComponent = withDebouncedProps(
  { frequentlyUpdatedProp: 42 }, 200
)(MyComponent);
```

## Useful links

[Use a Render Prop!](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)

[downshift](https://github.com/paypal/downshift) 🏎
