import { mount, shallow } from 'enzyme';
import CoachTeamComponent from '../components/CoachTeamComponent';
import { Coach } from '../dtos/coach'

const mockCoach = new Coach('name', 'username', 'team', 'sport', [['player', 'position']]);
import { assignPlayerPosition, getAuthorizedCoach, removePlayer } from '../remote/coach-service';
jest.mock('../remote/coach-service', () => {
    assignPlayerPosition: jest.fn();
    getAuthorizedCoach: jest.fn().mockImplementation(() => {
        return mockCoach;
    });
});

describe('CoachTeamComponent Test Suite', () => {

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('CoachTeamComponent renders successfully', () => {
        // mock the props
        let mockAuthUser = undefined;
        let mockErrorOpen = false;
        let mockErrorOpenFn = jest.fn();
        let mockErrorMessage = '';
        let mockErrorMessageFn = jest.fn();
        let mockErrorSeverity = undefined;
        let mockErrorSeverityFn = jest.fn();

        const wrapper = shallow(<CoachTeamComponent authUser={mockAuthUser} errorOpen={mockErrorOpen} setErrorOpen={mockErrorOpenFn} errorMessage={mockErrorMessage} setErrorMessage={mockErrorMessageFn} errorSeverity={mockErrorSeverity} setErrorSeverity={mockErrorSeverityFn} />)

        expect(wrapper).toBeTruthy();

    })
})