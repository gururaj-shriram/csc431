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

Or if you want to use nodemon which automatically restarts the server when you make a change, run:

```shell
$ npm run nodemon
```

And you can view the contents in `localhost` by visiting a browser and going to this URL. Note if you change the port when you run the server, you need to change the port in the URL. The default is 3000.

```
http://localhost:PORT
```

To edit the server, edit `index.js`.
