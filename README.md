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

### Testing your components
* Let's start by creating some components. You can have them in any directory because we'll be importing them into our test files later on. I decided to create a 'src' directory and put my components in there.
```
mkdir src
cd src
touch TestComponent.js
```
* Our code for TestComponent.js will look like the following:
```
import React from 'react';
class TestComponent extends React.Component {
  render(){
    return(
      <div className='test'>
        <img src='http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/614.png&w=350&h=254' />
      </div>
    )
  }
}
export default TestComponent;
```
* Let's now create a test for TestComponent. Add a file in your test directory (I called mine TestComponent-test.js).
* Import our React, chai, enzyme, and the component to test.
```
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import TestComponent from './../src/TestComponent';
```
  * Note: If you're using functional stateless components, you'll need to import them as you would in your application i.e. import { TestComponent } from 'src';
* Let's now add some tests that check whether TestComponent is indeed a component with a classname of 'test' and contains an image as its first child.
```
describe('Test Component', () => {
  it('returns component with .test class', () => {
    const wrapper = shallow(<TestComponent />);
    expect(wrapper.is('.test')).to.equal(true);
  });
  it('renders an img as its first child', () => {
    const wrapper = shallow(<TestComponent />);
    expect(wrapper.find('div').childAt(0).type()).to.equal('img');
  });
});
```
