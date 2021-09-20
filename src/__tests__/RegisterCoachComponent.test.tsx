import { Color } from "@material-ui/lab/Alert";
import { mount, shallow } from 'enzyme';
import RegisterCoachComponent from "../components/register/RegisterCoachComponent";

import { registerNewCoach } from '../remote/coach-service';
jest.mock('../remote/coach-service')

describe('RegisterCoachComponent Test Suite', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('RegisterCoachComponent renders successfully', () => {
        // mock the props
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = 'error' as Color | undefined;
        let mockSetSeverityFn = jest.fn();

        // set up wrapper for the component
        const wrapper = shallow( <RegisterCoachComponent open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} /> )

        expect(wrapper).toBeTruthy();

    })

    it('Text fields are empty when the component first renders', () => {
        // mock the props
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = 'error' as Color | undefined;
        let mockSetSeverityFn = jest.fn();

        // set up wrapper for the component
        const wrapper = shallow( <RegisterCoachComponent open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} /> )

        let coachNameWrapper = wrapper.find('#coachName');
        let usernameWrapper = wrapper.find('#username');
        let passwordWrapper = wrapper.find('#password');
        let teamNameWrapper = wrapper.find('#teamName');

        expect(coachNameWrapper.text()).toBe('');
        expect(usernameWrapper.text()).toBe('');
        expect(passwordWrapper.text()).toBe('');
        expect(teamNameWrapper.text()).toBe('');

    })

    it('Snackbar setters are called when login button is clicked, but text fields are empty', () => {
        // mock the props
        let mockOpen = false;
        let mockSetOpenFn = jest.fn();
        let mockMessage = '';
        let mockSetMessageFn = jest.fn();
        let mockSeverity = 'error' as Color | undefined;
        let mockSetSeverityFn = jest.fn();

        // set up wrapper for the component
        const wrapper = shallow( <RegisterCoachComponent open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} /> )

        let buttonWrapper = wrapper.find('#register-coach-button');

        buttonWrapper.simulate('click');

        expect(mockSetOpenFn).toBeCalled();
        expect(mockSetMessageFn).toBeCalled();
        expect(mockSetSeverityFn).toBeCalled();
    })

    // it('registerNewCoach is called when user attempts to register with valid form values', () => {
    //     // mock the props
    //     let mockOpen = false;
    //     let mockSetOpenFn = jest.fn();
    //     let mockMessage = '';
    //     let mockSetMessageFn = jest.fn();
    //     let mockSeverity = 'error' as Color | undefined;
    //     let mockSetSeverityFn = jest.fn();

    //     // set up wrapper for the component
    //     const wrapper = mount( <RegisterCoachComponent open={mockOpen} setOpen={mockSetOpenFn} message={mockMessage} setMessage={mockSetMessageFn} severity={mockSeverity} setSeverity={mockSetSeverityFn} /> )
        
    //     let coachNameWrapper = wrapper.find('input[name="coachName"]');
    //     let usernameWrapper = wrapper.find('input[name="username"]');
    //     let passwordWrapper = wrapper.find('input[name="password"]');
    //     let sportWrapper = wrapper.find('input[name="sport"]');
    //     let teamNameWrapper = wrapper.find('input[name="teamName"]');
    //     let buttonWrapper = wrapper.find('button[id="register-coach-button"]');

    //     coachNameWrapper.simulate('change', {target: {name: 'coachName', value: 'validCoachName'}});
    //     usernameWrapper.simulate('change', {target: {name: 'username', value: 'validUsername'}});
    //     passwordWrapper.simulate('change', {target: {name: 'password', value: 'validPassword'}});
    //     sportWrapper.simulate('change', {target: {name: 'sport', value: 'validSport'}});
    //     teamNameWrapper.simulate('change', {target: {name: 'teamName', value: 'validTeamName'}});
    //     buttonWrapper.simulate('click');

    //     expect(registerNewCoach).toBeCalled();
    // })



})