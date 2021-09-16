import { mount, shallow } from 'enzyme';
import SidebarComponent from '../components/SidebarComponent';
import { Principal } from '../dtos/principal';

describe('SidebarComponent Test Suite', () => {

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('Login and Register render when authUser is undefined', () => {
        // mock the props
        let mockAuthUser = undefined;
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SidebarComponent wrapper
        const wrapper = mount(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        // find wrappers for login and register buttons
        let loginWrapper = wrapper.find('div[id="login"]').at(0);
        let registerWrapper = wrapper.find('div[id="register"]').at(0);
        console.log(loginWrapper.debug());

        // expect the buttons we found to be truthy
        expect(loginWrapper.containsMatchingElement(<span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Login</span>)).toBeTruthy();
        expect(registerWrapper.containsMatchingElement(<span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Register</span>)).toBeTruthy();
    })

    it('Players and Logout render when authUser has role of Player', () => {
        // mock the props
        let mockAuthUser = new Principal('id', 'username', 'Player');
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SidebarComponent wrapper
        const wrapper = mount(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        // find wrappers for important buttons
        let playersWrapper = wrapper.find('div[id="players"]').at(0);
        let logoutWrapper = wrapper.find('div[id="rec-logout"]').at(0);

    })
})