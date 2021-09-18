import { mount, shallow } from 'enzyme';
import { Coach } from '../dtos/coach'

const mockCoach = new Coach('name', 'username', 'team', 'sport', [['player', 'position']]);
const mockgetAuthorizedCoach = jest.fn()
import { assignPlayerPosition, getAuthorizedCoach, removePlayer } from '../remote/coach-service';
jest.mock('../remote/coach-service', () => {
    assignPlayerPosition: jest.fn();
    getAuthorizedCoach: mockgetAuthorizedCoach.mockResolvedValue(mockCoach);
    removePlayer: jest.fn();
});

describe('CoachTeamComponent Test Suite', () => {

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('', () => {

    })
})