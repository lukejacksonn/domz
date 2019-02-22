# domz
> a proxy function to help build virtual DOM trees from functions

A proxy for react `createElement` (or `h` if using Preact, Hyperapp etc.) that allows you to describe interfaces much with JSX but just using regular JavaScript function calls instead. Views built like this require no transpilation and no prior knowledge of proprietary syntax. This is not a novel concept but the implementation is quite unique.

```js
import domz from 'https://unpkg.com/domz'
const { div, h1, button, ul, li } = domz(React.createElement)  

ReactDOM.render(
  div([
    h1('Look Ma, optional props argument!'),
    button({ onclick: console.log }, 'Click Me'),
    ul([1,2,3].map(li)),
  ]),
  document.body
)
```

## Features

- No transpilation step or proprietary syntax
- Exhaustive tag list and compatible with custom tags
- Option props arguments for extra terse container elements
- Designed to be generic and work with various frameworks
- Extra small source that can be imported as an ES module

## Usage

This library is intended to be framework agnostic. So before using the package you need to configure it to create virtual dom nodes in a shape the framework you are using expects to receive. You can then go ahead and destructure whatever DOM elements you need from it.

```js
const { div, h1, button } = domz(React.createElement)  
const { div, h1, button } = domz(Preact.h)
const { div, h1, button } = domz(Hyperapp.h)
```

If you want to go totally rogue you could bind the configured `domz` instance to the window to make it globally available throughout your project.

```js
window.domz = domz(React.createElement)
```

## Implementation

The `domz` function generates the HTML tags upon request (and caches them in case they are requested again) using a JavaScript `Proxy`. This means that (unlike some solutions) the source code is very small and comprehendible. It might seem like magic at first but don't be dismayed, it is just JavaScript and it has great [browser support](https://caniuse.com/#feat=proxy).

```js
(...args) => args[0] && typeof args[0] === "object" && !Array.isArray(args[0])
    ? h(name, ...args)
    : h(name, {}, ...args))
```

Essentially all the proxy does is forward the name and arguments (props?, children) of the original function invocation to another function that will call `createElement` or `h` appropriately.

## Acknowledgement

This project took inspiration from a few other implementations namely:

- [`@hyperapp/html`](https://github.com/Swizz/hyperapp-html) by [Quentin Gerodel](https://github.com/Swizz)
- [`htm`](https://github.com/developit/htm) by [Jason Miller](https://github.com/developit)
- [`elementx`](https://github.com/queckezz/elementx) by [Fabian Eichenberger](https://github.com/queckezz)
- [`ijk`](https://github.com/lukejacksonn/ijk) by [Luke Jackson](https://github.com/lukejacksonn)
