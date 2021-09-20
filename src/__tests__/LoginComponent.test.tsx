import { Color } from '@material-ui/lab/Alert';
import { mount, shallow } from 'enzyme';
import LoginComponent from '../components/LoginComponent';

import { playerLogin, coachLogin, recruiterLogin } from '../remote/auth-service';
jest.mock('../remote/auth-service');

describe('LoginComponent Test Suite', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('LoginComponent renders ruccessfully', () => {
        
        // mock the props
        let mockSetUserFn = jest.fn();
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = 'error' as Color | undefined;
        let mockSetSeverityFn = jest.fn();

        // set up wrapper for component
        const wrapper = shallow(<LoginComponent setAuthUser={mockSetUserFn} open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />)

        // expect things to happen
        expect(wrapper).toBeTruthy();
    })

    it('username and password fields are empty on first load', () => {

        // mock the props
        let mockSetUserFn = jest.fn();
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = 'error' as Color | undefined;
        let mockSetSeverityFn = jest.fn();

        // set up wrapper for component
        const wrapper = shallow(<LoginComponent setAuthUser={mockSetUserFn} open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />)

        // get wrappers for inputs
        let usernameInputWrapper = wrapper.find('#username');
        let passwordInputWrapper = wrapper.find('#password');

        // expect things to happen
        expect(usernameInputWrapper.text()).toBe('');
        expect(passwordInputWrapper.text()).toBe('');

    })

    it('Snackbar setters are called when login is clicked with invalid information', () => {
        // mock the props
        let mockSetUserFn = jest.fn();
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = 'error' as Color | undefined;
        let mockSetSeverityFn = jest.fn();

        // set up wrapper for component
        const wrapper = shallow(<LoginComponent setAuthUser={mockSetUserFn} open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />)

        // set up wrapper for button id
        const buttonWrapper = wrapper.find('#login-button');

        // simulate a login
        buttonWrapper.simulate('click');

        // expect functions to be called
        expect(mockSetOpenFn).toBeCalled();
        expect(mockSetMessageFn).toBeCalled();
        expect(mockSetSeverityFn).toBeCalled();
    })

    it('Clicking login with valid forms field values attempts to log  player', () => {
        // mock the props
        let mockSetUserFn = jest.fn();
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = 'error' as Color | undefined;
        let mockSetSeverityFn = jest.fn();

        // set up wrapper for component
        const wrapper = mount(<LoginComponent setAuthUser={mockSetUserFn} open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />)

        // get wrappers for inputs
        let usernameInputWrapper = wrapper.find('input[name="username"]').at(0);
        let passwordInputWrapper = wrapper.find('input[name="password"]').at(0);
        let buttonWrapper = wrapper.find('button[name="login"]').at(0);

        usernameInputWrapper.simulate('change', {target: {name: 'username', value: 'test-username'}});
        passwordInputWrapper.simulate('change', {target: {name: 'password', value: 'test-password'}});
        buttonWrapper.simulate('click')

        expect(playerLogin).toBeCalled();
        
    })

    it('Clicking login with valid forms field values attempts to log in coach', () => {
        // mock the props
        let mockSetUserFn = jest.fn();
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = 'error' as Color | undefined;
        let mockSetSeverityFn = jest.fn();

        // set up wrapper for component
        const wrapper = mount(<LoginComponent setAuthUser={mockSetUserFn} open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />)

        // get wrappers for inputs
        let usernameInputWrapper = wrapper.find('input[name="username"]').at(0);
        let passwordInputWrapper = wrapper.find('input[name="password"]').at(0);
        let radioWrapper = wrapper.find('input[name="role"]').at(0)
        let buttonWrapper = wrapper.find('button[name="login"]').at(0);

        usernameInputWrapper.simulate('change', {target: {name: 'username', value: 'test-username'}});
        passwordInputWrapper.simulate('change', {target: {name: 'password', value: 'test-password'}});
        radioWrapper.simulate('change', {target: {name: 'role', value: 'coach'}});
        buttonWrapper.simulate('click')

        expect(coachLogin).toBeCalled();
        
    })

    it('Clicking login with valid forms field values attempts to log in recruiter', () => {
        // mock the props
        let mockSetUserFn = jest.fn();
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = 'error' as Color | undefined;
        let mockSetSeverityFn = jest.fn();

        // set up wrapper for component
        const wrapper = mount(<LoginComponent setAuthUser={mockSetUserFn} open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} />)

        // get wrappers for inputs
        let usernameInputWrapper = wrapper.find('input[name="username"]').at(0);
        let passwordInputWrapper = wrapper.find('input[name="password"]').at(0);
        let radioWrapper = wrapper.find('input[name="role"]').at(0)
        let buttonWrapper = wrapper.find('button[name="login"]').at(0);

        usernameInputWrapper.simulate('change', {target: {name: 'username', value: 'test-username'}});
        passwordInputWrapper.simulate('change', {target: {name: 'password', value: 'test-password'}});
        radioWrapper.simulate('change', {target: {name: 'role', value: 'recruiter'}});
        buttonWrapper.simulate('click')

        expect(recruiterLogin).toBeCalled();

    })

})