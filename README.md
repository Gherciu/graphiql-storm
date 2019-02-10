### GraphiQl Storm

A GraphQl Web IDE [DEMO](https://gherciu.github.io/graphiql-storm/)

![GraphiQl Storm](https://github.com/Gherciu/graphiql-storm/blob/master/src/demo.png?raw=true)

#### Usage
```bash
npm i graphiql-storm
```
```js
  import graphiQlStorm from 'graphiql-storm'

  graphiQlStorm([{route:'https://countries.trevorblades.com/'}])
```
bundle this file with webpack ```webpack index.js  -o bundle.index.js```

#### OR use cdn:
```html
  <script src='https://cdn.jsdelivr.net/npm/graphiql-storm@1.1.3/dist/index.js'></script>
  <script>
      graphiQlStorm([{route:'https://countries.trevorblades.com/'}])
  </script>
```

#### If you like this repository star⭐ and watch👀 on  [GitHub](https://github.com/Gherciu/graphiql-storm)
