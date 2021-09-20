import { shallow } from 'enzyme';
import HomeComponent from "../components/HomeComponent";

describe('HomeComponent Test Suite', () => {
    
    afterEach(() => {
        jest.resetAllMocks()
    });

    it('HomeComponent renders successfully', () => {
        // mock props
        let mockCurrentUser = undefined;

        // set up wrapper for component
        const wrapper = shallow(<HomeComponent currentUser={mockCurrentUser} />);

        // expect the wrapper to have something in it
        expect(wrapper).toBeTruthy();
    })

    it('Register and login buttons render', () => {
        // mock the props
        let mockCurrentUser = undefined;

        // set up the wrapper for HomeComponent
        const wrapper = shallow(<HomeComponent currentUser={mockCurrentUser} />);

        // find wrappers for register and login buttons
        const registerWrapper = wrapper.find('#go-to-register');
        const loginWrapper = wrapper.find('#go-to-login');

        // expect the buttons to be truthy
        expect(registerWrapper).toBeTruthy();
        expect(loginWrapper).toBeTruthy();
    })
})