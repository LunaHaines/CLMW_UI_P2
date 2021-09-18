import { mount, shallow } from 'enzyme';
import RecruiterDashboard from '../components/RecruiterDashboardComponent';
import { Player } from '../dtos/player';

let mockPlayer = new Player('name', 'username', ['offer'], ['exercise'], ['completedExercie'], [{ skill: 'skill', rating: 5}])
import {rateSkill, recruitAllPlayers } from '../remote/player-service';
jest.mock('../remote/player-service', () => {
    recruitAllPlayers: jest.fn().mockImplementation(() => {
        return [mockPlayer]
    })
});

describe('RecruiterDashboardComponent Test Suite', () => {
    
    afterEach(() => {
        jest.resetAllMocks();
    })

    it('RecruiterDashboard renders successfully', () => {
        // mock the props
        let mockSetOpenFn = jest.fn();
        let mockSetMessageFn = jest.fn();
        let mockSetSeverityFn = jest.fn();

        // set up the wrapper around the component
        const wrapper = shallow(<RecruiterDashboard setOpen={mockSetOpenFn} setMessage={mockSetMessageFn} setSeverity={mockSetSeverityFn} />)

        expect(wrapper).toBeTruthy();

    })

})