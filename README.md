### GraphiQl Storm

A GraphQl Web IDE [DEMO](https://gherciu.github.io/graphiql-storm/)

![GraphiQl Storm](https://github.com/Gherciu/graphiql-storm/blob/master/src/demo.png?raw=true)

#### Usage
```bash
npm i graphiql-storm
```
#### your index.js
```js
import renderGraphiQlStorm from 'graphiql-storm'

renderGraphiQlStorm([{route:'https://countries.trevorblades.com/'}])
```
bundle this file with webpack ```webpack index.js  -o bundle.index.js```

#### your index.html 
```html
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GraphiQl Storm</title>
  </head>
  <body>
      <script src='bundle.index.js'></script>
  </body>
</html>
```
