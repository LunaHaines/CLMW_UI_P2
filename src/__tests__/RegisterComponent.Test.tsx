import { mount, shallow } from "enzyme";
import React from "react";
import RegisterComponent from '../components/Register/RegisterComponent'
describe('RegisterComponent Test Suite', () => {

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('RegisterComponent renders', () => {
        // mock props
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = undefined;
        let mockSetSeverityFn = jest.fn();

        // set up shallow wrapper for RegisterComponent
        const wrapper = shallow(<RegisterComponent open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />);

        // expect the component to be truthy
        expect(wrapper).toBeTruthy();

    })

    it('RegisterComponent sets form type to player correctly', () => {
        // mock props
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = undefined;
        let mockSetSeverityFn = jest.fn();

        // set up wrapper for RegisterComponent
        const wrapper = mount(<RegisterComponent open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />);

        let playerButtonWrapper = wrapper.find('#form-type-player').at(0);
        
        // simulate a click
        playerButtonWrapper.simulate('click');

        // expect Player form to render
        expect(wrapper.containsMatchingElement(<h3 className="MuiTypography-root MuiTypography-h3 MuiTypography-alignCenter">Register as a Player</h3>)).toBeTruthy();

    })

    it('RegisterComponent setts form type to coach correctly', () => {
        // mock props
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = undefined;
        let mockSetSeverityFn = jest.fn();

        // set up wrapper for RegisterComponent
        const wrapper = mount(<RegisterComponent open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />);

        let coachButtonWrapper = wrapper.find('#form-type-coach').at(0);
        
        // simulate a click
        coachButtonWrapper.simulate('click');
        
        // expect Coach form to render
        expect(wrapper.containsMatchingElement(<h3 className="MuiTypography-root MuiTypography-h3 MuiTypography-alignCenter">Register Your Team!</h3>)).toBeTruthy();

    })

    it('RegisterComponent sets form type to Recruiter form correctly', () => {
        // mock props
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = undefined;
        let mockSetSeverityFn = jest.fn();

        // set up wrapper for RegisterComponent
        const wrapper = mount(<RegisterComponent open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />);

        let recruiterButtonWrapper = wrapper.find('#form-type-recruiter').at(0);
        
        // simulate a click
        recruiterButtonWrapper.simulate('click');
        
        // expect Recruiter form to render
        expect(wrapper.containsMatchingElement(<h3 className="MuiTypography-root MuiTypography-h3 MuiTypography-alignCenter">Register as a Recruiter</h3>)).toBeTruthy();

    })

})