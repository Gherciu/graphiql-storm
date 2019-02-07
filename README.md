### GraphiQl Storm

A GraphQl Web IDE

#### Usage
```bash
npm i graphiql-storm
```
your index.js
```js
import renderGraphiQlStorm from 'graphiql-storm'

renderGraphiQlStorm([{route:'http://localhost:2626/graphql'}])
```
your index.html 
```html
<html>
  <head>
    <title>GraphiQl Storm</title>
  </head>
  <body>
    <script src='/index.js'></script>
  </body>
</html>
```
