<div align="center">
  <img width="200" height="200"
    src="https://raw.githubusercontent.com/Gherciu/graphiql-storm/master/logo.png">
  <h1>GraphiQl Storm</h1>
  <p>A GraphQl Web IDE. <a href="https://gherciu.github.io/graphiql-storm/" alt="graphiql-storm">DEMO</a>.</p>
</div>

![GraphiQl Storm](https://github.com/Gherciu/graphiql-storm/blob/master/src/demo.png?raw=true)

#### Features

- 💾 Export/Import workspaces
- ✨ Autocompletion & error highlighting
- 📚 Interactive, multi-column docs
- ⚙ Multiple Tabs & Endpoints

#### Usage

```html
<!--index.html-->
<script src="https://cdn.jsdelivr.net/npm/graphiql-storm@latest/dist/index.js"></script>
<script>
  graphiQlStorm([{ route: "https://countries.trevorblades.com/" }]);
</script>
```

**Or via npm**

```bash
npm i graphiql-storm
```

```js
// index.js
import graphiQlStorm from "graphiql-storm";

graphiQlStorm([{ route: "https://countries.trevorblades.com/" }]);
```

do not forgot to bundle this file with webpack `webpack index.js -o index.bundle.js` and then include the `index.bundle.js` in your `index.html`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

#### Or you can sponsor via [Open Collective](https://opencollective.com/graphiql-storm/)
[![Open Collective](https://opencollective.com/graphiql-storm/tiers/sponsor.svg?avatarHeight=60)](https://opencollective.com/graphiql-storm/)

## Author

**[@Gherciu/graphiql-storm](https://github.com/Gherciu/graphiql-storm)** © [GHERCIU](https://github.com/Gherciu), Released under the [MIT](https://github.com/Gherciu/graphiql-storm/blob/master/LICENSE) License.<br>
Authored and maintained by GHERCIU with help from contributors ([list](https://github.com/Gherciu/graphiql-storm/contributors)).

#### If you like this repository star⭐ and watch👀 on [GitHub](https://github.com/Gherciu/graphiql-storm)
