# React Testing with Enzyme

> This portion of the tutorial adds [Webpack](https://webpack.github.io/) to our project and uses a Node/Express server to serve our files. This tutorial assumes you've already gone through the tutorial on the 'dev' branch.

### Dependencies / Configuration
* Let's start by installing our dependencies
  * Note: We're going to write our server in ES6 and compile it with Babel, hence the 'babel-register' package
```
// Server
npm install --save express babel-register
// Webpack
npm install --save-dev webpack
// Other Babel Presets
npm install --save-dev babel-core babel-loader babel-preset-react babel-polyfill
```
* Create a webpack.config.js file in your root directory and populate it with the following code
```
module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/src/dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}
```
* Add some of the following presets to our .babelrc file.
  * Note: you could've added a query: { presets: [PRESETNAMES] } within your webpack.config.js file, but we've opted to break this out into a .babelrc file instead.
```
// Our .babelrc file now looks like this
{
  presets: ["react", "es2015", "airbnb"]
}
```

### Server
Now that we have our dependencies and config files set up, let's focus on our server.
* Create a server folder in the root directory with an index.js and server.js file. Our index.js file will use babel-register and require our server.js file as shown below.
```
// index.js
require('babel-register');
require('./server');
```
* Our server.js file will serve a basic index.html page on port 8080. You can view the file above.

### Client
* Let's start by tying up loose ends. We're serving up an index.html file within our src directory. Create that now.
  * We're adding a script tag to our bundled file, as well as an entry point into the app with the id being 'root'
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React Testing</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="./dist/bundle.js"></script>
  </body>
</html>
```
* Because we noted our entry point in the webpack.config.js file as 'src/index.js', let's create that entry point aka React component now.
  * Note: Feel free to change TestComponent.js > Index.js. Just know you'll need to render it to the 'root' div in our index.html file.
  * I opted to create a new component called Index.js, below is the code for it
  ```
  import React from 'react';
  import { render } from 'react-dom';
  class Index extends React.Component {
    render(){
      return(
        <div>
          Hello from index component!
        </div>
      )
    }
  }
  render(
    <Index />,
    document.getElementById('root')
  )
  ```
* That's pretty much it. You'll need to bundle your files using webpack and run your server, but you can now test all your components
```
webpack -w
npm run test
```
![hooray](https://github.com/carlbernardo/react-enzyme-testing-tutorial/blob/webpack-setup/src/static/hooray.png)
