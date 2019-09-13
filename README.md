### GraphiQl Storm

A GraphQl Web IDE [DEMO](https://gherciu.github.io/graphiql-storm/)

![GraphiQl Storm](https://github.com/Gherciu/graphiql-storm/blob/master/src/demo.png?raw=true)

#### Usage

```html
<!--index.html-->
<script src="https://cdn.jsdelivr.net/npm/graphiql-storm@1.1.9/dist/index.js"></script>
<script>
  graphiQlStorm([{ route: 'https://countries.trevorblades.com/' }]);
</script>
```

**Or via npm**

```bash
npm i graphiql-storm
```

```js
// index.js
import graphiQlStorm from 'graphiql-storm';

graphiQlStorm([{ route: 'https://countries.trevorblades.com/' }]);
```

do not forgot to bundle this file with webpack `webpack index.js -o index.bundle.js` and then include the `index.bundle.js` in your `index.html`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**@Gherciu/graphiql-storm** © [GHERCIU](https://github.com/Gherciu), Released under the [MIT](https://github.com/Gherciu/graphiql-storm/blob/master/LICENSE) License.<br>
Authored and maintained by GHERCIU with help from contributors ([list](https://github.com/Gherciu/graphiql-storm/contributors)).

#### If you like this repository star⭐ and watch👀 on [GitHub](https://github.com/Gherciu/graphiql-storm)
