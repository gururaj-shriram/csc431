# Download of Public Facing Data

To add to the repo, first `clone` it with:

```shell
$ git clone https://github.com/jerrybonnell/csc431
```

Then, `cd` into the repository and into the `src` folder.

Make sure you download `node`. If you have Homebrew, you can do:

```shell
$ brew install node
```

To install the dependencies from  `package.json`, do:

```shell
$ npm install
```

Then you can run the server with this:

```shell
$ npm start
```

And you can view the contents in `localhost` by visiting a browser and going to this URL. Note if you change the port when you run the server, you need to change the port in the URL. The default is 3000.

```
http://localhost:PORT
```

To edit the server, edit `app.js`.

## Testing

Every `.js` file you write should, if possible and the file is nontrivial, have an associated test file with it in the `tests/` folder. This is to ensure we perform proper TDD. We will be using the `mocha` testing framework and the `should` assertion library. To run all tests:

```shell
$ npm test
```
