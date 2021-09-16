import { shallow } from "enzyme";
import React from "react";
import RegisterComponent from "../components/register/RegisterComponent";
import RegisterPlayerComponent from "../components/register/RegisterPlayerComponent";

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

        // mock state
        const setFormType = jest.spyOn(React, 'useState');

        // set up shallow wrapper for RegisterComponent
        const wrapper = shallow(<RegisterComponent open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />);

        let playerButtonWrapper = wrapper.find('#form-type-player');

        playerButtonWrapper.simulate('click');

        expect(wrapper.contains(<RegisterPlayerComponent open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />));
    })

})