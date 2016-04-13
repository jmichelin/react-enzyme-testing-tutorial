# React Testing with Enzyme

> This is a tutorial on how to start testing your React.js code using [Enzyme](http://airbnb.io/enzyme), [Mocha](https://mochajs.org/), and [Chai](http://chaijs.com/).

* Let's start by creating a package.json file
```
npm init
```
* Once your package.json file is created, let's install our dependencies.
```
// React
npm install --save react react-dom
// Babel
npm install --save-dev babel babel-preset-es2015 babel-preset-airbnb babel-register
// Testing
npm install --save-dev mocha chai enzyme jsdom react-addons-test-utils
```
* Create a .babelrc file for our presets in your root directory
```
touch .babelrc
// open your file in your preferred text editor and add the following:
{
  presets: ["airbnb"]
}
```
* Let's add an 'npm run' script to our package.json. In the scripts area, let's add the following key and value
```
"test": "mocha test/.setup.js test/**/*-test.js"
```
  * What the above says is run .setup.js with Mocha first, and then all the tests. All our tests with have the following syntax NAMEOFTEST-test.js.
  * You'll notice we don't have a test directory set up. Let's do that now.
* Set up a test directory in your root directory
```
mkdir test
cd test
```
* Create a .setup.js file. By doing so, we use jsdom as a headless browser to test our components without the need for an actual DOM via a browser.
```
touch .setup.js
// In the .setup.js file, add the following code:
require('babel-register')();
var jsdom = require('jsdom').jsdom;
var exposedProperties = ['window', 'navigator', 'document'];
global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});
global.navigator = {
  userAgent: 'node.js'
};
documentRef = document;
```
* That's pretty much it! We can now add our test files and use React, Chai, and Enzyme to test our components.
