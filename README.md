### GraphiQl Storm

A GraphQl Web IDE

#### Usage
install graphiql-storm
```bash
npm i graphiql-storm
```
and in your index.js file
```js
import renderGraphiQlStorm from 'graphiql-storm'

renderGraphiQlStorm([{route:'http://localhost:2626/graphql'}])
```
and add index.js to your index.html 
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
