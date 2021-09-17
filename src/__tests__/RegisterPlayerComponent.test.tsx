import { Color } from "@material-ui/lab/Alert";
import { mount, shallow } from "enzyme";
import RegisterPlayerComponent from '../components/register/RegisterPlayerComponent'

import { registerNewPlayer } from '../remote/player-service';
jest.mock('../remote/player-service');

describe('RegisterPlayerComponent Test Suite', () => {

    afterEach(() => {
        jest.resetAllMocks();
    })

    it("RegisterPlayerComponent renders", () => {
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = undefined;
        let mockSetSeverityFn = jest.fn();
        
        const wrapper = shallow(<RegisterPlayerComponent open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />)

        expect(wrapper).toBeTruthy();
    });

    it('name, username, password and sport fields are empty on intial load', () => {

        // mock the props
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = 'error' as Color | undefined;
        let mockSetSeverityFn = jest.fn();

        // set up wrapper for component
        const wrapper = shallow(<RegisterPlayerComponent open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />)

        // get wrappers for inputs
        let nameInputWrapper = wrapper.find('#name');
        let usernameInputWrapper = wrapper.find('#username');
        let passwordInputWrapper = wrapper.find('#password');
        let sportInputWrapper = wrapper.find('#sport');

        // expect things to happen
        expect(usernameInputWrapper.text()).toBe('');
        expect(passwordInputWrapper.text()).toBe('');
        expect(nameInputWrapper.text()).toBe('');
        expect(sportInputWrapper.text()).toBe('');

    })

    it('Snackbar setters are called when register is clicked with invalid information', () => {
        
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = 'error' as Color | undefined;
        let mockSetSeverityFn = jest.fn();

        // set up wrapper for component
        const wrapper = shallow(<RegisterPlayerComponent open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />)

        // set up wrapper for button id
        const buttonWrapper = wrapper.find('#register-player-button');

        // simulate a login
        buttonWrapper.simulate('click');

        // expect functions to be called
        expect(mockSetOpenFn).toBeCalled();
        expect(mockSetMessageFn).toBeCalled();
        expect(mockSetSeverityFn).toBeCalled();
    })

    it('registerNewPlayer is called when form submitted with valid input', () => {
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = 'error' as Color | undefined;
        let mockSetSeverityFn = jest.fn();

        // set up wrapper for component
        const wrapper = mount(<RegisterPlayerComponent open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />)

        let nameInputWrapper = wrapper.find('input[name="name"]');
        let usernameWrapper = wrapper.find('input[name="username"]');
        let passwordWrapper = wrapper.find('input[name="password"]');
        let sportWrapper = wrapper.find('input[name="sport"]');
        // set up wrapper for button id
        const buttonWrapper = wrapper.find('button[id="register-player-button"]');

        nameInputWrapper.simulate('change',{target: {name: 'name', value: 'validName'}});
        usernameWrapper.simulate('change',{target: {name: 'username', value: 'validUsername'}});
        passwordWrapper.simulate('change',{target: {name: 'password', value: 'validPassword'}});
        sportWrapper.simulate('change',{target: {name: 'sport', value: 'validSport'}});


        buttonWrapper.simulate('click');

        expect(registerNewPlayer).toBeCalled();
    })

})