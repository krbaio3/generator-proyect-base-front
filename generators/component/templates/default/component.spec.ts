import { expect } from 'chai';
import { shallow } from 'enzyme';
import <%= name %> from '../<%= name %>';

describe('Something from <%= name %>', () =>{
    it('should renders something', () => {
        let <%= name %>Wrapper = shallow(< <%= name %> />);
         expect(<%= name %>Wrapper.to.be.exist;
    });
})

