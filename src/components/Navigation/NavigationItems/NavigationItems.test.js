import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from '../NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems/>', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })

    it('It should render two <NavigationItem/> when not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('It should render three <NavigationItem/> if authenticated', () => {
        wrapper.setProps({ isAuthenticated : true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});