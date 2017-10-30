# latex2react

```
yarn add latex2react
```

  or

```
npm install --save latex2react
```

### usage

For now, we just add one `Context` and all math will be rendered on the page. Keeps it simple.

```js
import React, { Component } from 'react';

import { Context } from 'latex2react';

const math = `
Remember, you are a function of the sum of living things...

$$
\\frac{\\delta}{\\delta u} \\int_{birth}^{death} f(life) du = \\mbox{your life}
$$
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Context>
          <div />
        </Context>
        <div>
          25 is $5^2$ hi yes this is cool, you can literally just write $\LaTeX$
          right here!
        </div>
        <div>{math}</div>
      </div>
    );
  }
}

export default App;
```
