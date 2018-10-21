# react-debounce-props
[![npm version](https://badge.fury.io/js/react-debounce-props.svg)](https://badge.fury.io/js/react-debounce-props)
[![Build Status](https://travis-ci.com/kitos/react-debounce-props.svg?branch=master)](https://travis-ci.com/kitos/react-debounce-props)
[![codecov](https://codecov.io/gh/kitos/react-debounce-props/branch/master/graph/badge.svg)](https://codecov.io/gh/kitos/react-debounce-props)

Tiny render-prop component for props debouncing

## Install

### Using npm

`npm i 'react-debounce-props' --save`

Then, use it as usual:

```JS
// using ES6 modules
import { Debounce } from 'react-debounce-props'

// using CommonJS modules
const { Debounce } = require('react-debounce-props') 
```

### 1998 Script Tag (UMD build)

The UMD build is also available on [unpkg][unpkg]:

```HTML
<script src="https://unpkg.com/react@16.4.1/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-debounce-props"></script>
```

The package is avalable on `window.ReactDebounceProps`

## Usage

### Debounce state

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

        <Debounce props={{ debouncedValue: this.state.value }} wait={250}>
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

[codesandbox example](https://codesandbox.io/embed/o7o2yz08yq?autoresize=1&fontsize=12&hidenavigation=1)

### Debounce props

```JS
import React from 'react'
import ReactDOM from 'react-dom'
import Debounce from 'react-debounce-props'

class App extends React.Component {
  state = {}

  render() {
    return null
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

### With redux

### High order component
