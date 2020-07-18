import React from 'react';
import { configure,shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter:new Adapter()})
describe('<NavigationItems />',()=>{
    it('should render two <NavigationItems /> if not authenticated',()=>{
        let wrapper=shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render three <NavigationItems /> if  authenticated',()=>{
        let wrapper=shallow(<NavigationItems isAuthenticated />);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should an exact logout ',()=>{
        let wrapper=shallow(<NavigationItems isAuthenticated/>);
        expect(wrapper.contains(<NavigationItem link="/logout" >Logout</NavigationItem>)).toEqual(true);
    });
})