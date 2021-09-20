import { mount, shallow } from 'enzyme';
import SidebarComponent from '../components/SidebarComponent';
import { Principal } from '../dtos/principal';

import { useHistory } from 'react-router';
const mockHistoryPush = jest.fn();
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useHistory: () => ({
      push: mockHistoryPush
    })
}));

import { teamManagerClient } from '../remote/team-manager-client';
jest.mock('../remote/team-manager-client')

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

    it('Clicking login sends the user to /login', () => {
        // mock the props
        let mockAuthUser = undefined;
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SidebarComponent wrapper
        const wrapper = shallow(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        // find wrappers for login buttons
        let loginWrapper = wrapper.find('#login').at(0);

        loginWrapper.simulate('click');

        expect(mockHistoryPush).toBeCalledWith('/login');
    })

    it('Clisking register send the user to /register', () => {
        // mock the props
        let mockAuthUser = undefined;
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SidebarComponent wrapper
        const wrapper = shallow(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        // find wrappers for register buttons
        let registerWrapper = wrapper.find('#register').at(0);

        registerWrapper.simulate('click');

        expect(mockHistoryPush).toBeCalledWith('/register');
    })

    it('clicking logout sets authUser to undefined and teamManagerClient authorization header to null', () => {
        // mock the props
        let mockAuthUser = new Principal('id', 'username', 'Player');
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SideBarComponent wrapper
        const wrapper = shallow(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        let logoutWrapper = wrapper.find('#player-logout');
        logoutWrapper.simulate('click');

        expect(teamManagerClient.defaults.headers.common['authorization']).toBeFalsy();
        expect(mockSetAuthUser).toBeCalled();
        
    })

    it('Clicking offers sends player to /offers', () => {
        // mock the props
        let mockAuthUser = new Principal('id', 'username', 'Player');
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SideBarComponent wrapper
        const wrapper = shallow(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        let offersWrapper = wrapper.find('#offers');

        offersWrapper.simulate('click');

        expect(mockHistoryPush).toBeCalledWith('/offers');

    })

    it('Clicking Team sends player to /playerteam', () => {
        // mock the props
        let mockAuthUser = new Principal('id', 'username', 'Player');
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SideBarComponent wrapper
        const wrapper = shallow(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        let playerTeamWrapper = wrapper.find('#player-team');

        playerTeamWrapper.simulate('click');

        expect(mockHistoryPush).toBeCalledWith('/playerteam');

    })

    it('Clicking Workouts sends player to /playerworkouts', () => {
        // mock the props
        let mockAuthUser = new Principal('id', 'username', 'Player');
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SideBarComponent wrapper
        const wrapper = shallow(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        let playerWorkoutsWrapper = wrapper.find('#player-workouts');

        playerWorkoutsWrapper.simulate('click');

        expect(mockHistoryPush).toBeCalledWith('/playerworkouts');
        
    })

    it('Clicking Profile sends player to /playerprofile', () => {
        // mock the props
        let mockAuthUser = new Principal('id', 'username', 'Player');
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SideBarComponent wrapper
        const wrapper = shallow(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        let playerProfileWrapper = wrapper.find('#player-profile');

        playerProfileWrapper.simulate('click');

        expect(mockHistoryPush).toBeCalledWith('/playerprofile');
        
    })

    it('Clicking team sends coach to /team', () => {
        // mock the props
        let mockAuthUser = new Principal('id', 'username', 'Coach');
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SideBarComponent wrapper
        const wrapper = shallow(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        let coachTeamWrapper = wrapper.find('#coach-team');

        coachTeamWrapper.simulate('click');

        expect(mockHistoryPush).toBeCalledWith('/team');
        
    })

    it('Clicking workouts sends coach to /workouts', () => {
        // mock the props
        let mockAuthUser = new Principal('id', 'username', 'Coach');
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SideBarComponent wrapper
        const wrapper = shallow(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        let coachWorkoutsWrapper = wrapper.find('#coach-workouts');

        coachWorkoutsWrapper.simulate('click');

        expect(mockHistoryPush).toBeCalledWith('/workouts');
        
    })

    it('Clicking Players sends coach to /coachdashboard', () => {
        // mock the props
        let mockAuthUser = new Principal('id', 'username', 'Coach');
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SideBarComponent wrapper
        const wrapper = shallow(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        let coachPlayersWrapper = wrapper.find('#coach-players');

        coachPlayersWrapper.simulate('click');

        expect(mockHistoryPush).toBeCalledWith('/coachdashboard');
        
    })

    it('Clicking Players sends recruiter to /recruiterdashboard', () => {
        // mock the props
        let mockAuthUser = new Principal('id', 'username', 'Recruiter');
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SideBarComponent wrapper
        const wrapper = shallow(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        let recruiterPlayersWrapper = wrapper.find('#players');

        recruiterPlayersWrapper.simulate('click');

        expect(mockHistoryPush).toBeCalledWith('/recruiterdashboard');
        
    })

})