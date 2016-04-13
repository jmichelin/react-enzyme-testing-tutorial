import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import TestComponent from './../src/TestComponent';

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
