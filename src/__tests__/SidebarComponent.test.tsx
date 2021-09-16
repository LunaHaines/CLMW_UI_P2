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

        // expect the buttons we found to be truthy
        expect(loginWrapper.containsMatchingElement(<span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Login</span>)).toBeTruthy();
        expect(registerWrapper.containsMatchingElement(<span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Register</span>)).toBeTruthy();
    })

    it('Players and Logout render when authUser has role of Recruiter', () => {
        // mock the props
        let mockAuthUser = new Principal('id', 'username', 'Recruiter');
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SidebarComponent wrapper
        const wrapper = mount(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        // find wrappers for important buttons
        let playersWrapper = wrapper.find('div[id="players"]').at(0);
        let logoutWrapper = wrapper.find('div[id="rec-logout"]').at(0);

        expect(playersWrapper.containsMatchingElement(<span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Players</span>)).toBeTruthy();
        expect(logoutWrapper.containsMatchingElement(<span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Logout</span>)).toBeTruthy();

    })

    it('Offers, Team, Workouts, Profile, and Logout render when authUser has a role of Player', () => {
        // mock the props
        let mockAuthUser = new Principal('id', 'username', 'Player');
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SidebarComponent wrapper
        const wrapper = mount(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        // expect things to be in the component
        expect(wrapper.containsMatchingElement(<span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Offers</span>)).toBeTruthy();
        expect(wrapper.containsMatchingElement(<span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Team</span>)).toBeTruthy();
        expect(wrapper.containsMatchingElement(<span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Workouts</span>)).toBeTruthy();
        expect(wrapper.containsMatchingElement(<span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Profile</span>)).toBeTruthy();
        expect(wrapper.containsMatchingElement(<span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Logout</span>)).toBeTruthy();
    })

    it('team, workouts, players, and logout render when authUser has a role of Coach', () => {
        // mock the props
        let mockAuthUser = new Principal('id', 'username', 'Coach');
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SideBarComponent wrapper
        const wrapper = mount(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        // expect things to be in the component
        expect(wrapper.containsMatchingElement(<span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Team</span>)).toBeTruthy();
        expect(wrapper.containsMatchingElement(<span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Workouts</span>)).toBeTruthy();
        expect(wrapper.containsMatchingElement(<span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Players</span>)).toBeTruthy();
        expect(wrapper.containsMatchingElement(<span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Logout</span>)).toBeTruthy();

    })
})