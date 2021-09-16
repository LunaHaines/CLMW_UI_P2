import { mount, shallow } from 'enzyme';
import SidebarComponent from '../components/SidebarComponent';
import { Principal } from '../dtos/principal';

describe('SidebarComponent Test Suite', () => {

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('Login and Register render when authUser is undefined', () => {
        // mock the props
        let mockAuthUser = new Principal('id', 'username', 'Player');
        let mockSetAuthUser = jest.fn();
        let mockDrawerOpen = false;
        let mockSetDrawerOpen = jest.fn();

        // set up SidebarComponent wrapper
        const wrapper = mount(<SidebarComponent authUser={mockAuthUser} setAuthUser={mockSetAuthUser} drawerOpen={mockDrawerOpen} setDrawerOpen={mockSetDrawerOpen} />);

        // find wrappers for login and register buttons
        let loginWrapper = wrapper.find('div[id="login"]').at(0);
        let registerWrapper = wrapper.find('div[id="register"]').at(0);
        console.log(wrapper.debug());
        
        // expect the buttons we found to be truthy
        expect(loginWrapper).toBeTruthy();
        expect(registerWrapper).toContain
    })
})