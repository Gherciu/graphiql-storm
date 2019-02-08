### GraphiQl Storm

A GraphQl Web IDE [DEMO](https://gherciu.github.io/graphiql-storm/)

![GraphiQl Storm](/src/demo.png)

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
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GraphiQl Storm</title>
  </head>
  <body>
      <script src='index.js'></script>
  </body>
</html>
```
