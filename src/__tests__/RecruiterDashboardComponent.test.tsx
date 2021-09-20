import { mount, shallow } from 'enzyme';
import RecruiterDashboard from '../components/RecruiterDashboardComponent';
import { Player } from '../dtos/player';

let mockPlayer = new Player('name', 'username', ['offer'], ['exercise'], ['completedExercie'], [{ skill: 'skill', rating: 5}])
import {rateSkill, recruitAllPlayers } from '../remote/player-service';
jest.mock('../remote/player-service', () => {
    rateSkill: jest.fn().mockImplementation(() => Promise.resolve())
    recruitAllPlayers: jest.fn().mockImplementation(() => {
        Promise.resolve([mockPlayer])
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

    it('Dialog is closed when the component rist renders', () => {
        // mock the props
        let mockSetOpenFn = jest.fn();
        let mockSetMessageFn = jest.fn();
        let mockSetSeverityFn = jest.fn();

        // set up the wrapper around the component
        const wrapper = shallow(<RecruiterDashboard setOpen={mockSetOpenFn} setMessage={mockSetMessageFn} setSeverity={mockSetSeverityFn} />)
        
        let dialogWrapper = wrapper.find('#dialog');

        expect(dialogWrapper.prop('open')).toBeFalsy();

    })

    it('RecruiterDashboard does nothing when rate is clicked with no selected player', () => {
        // mock the props
        let mockSetOpenFn = jest.fn();
        let mockSetMessageFn = jest.fn();
        let mockSetSeverityFn = jest.fn();

        // set up the wrapper around the component
        const wrapper = shallow(<RecruiterDashboard setOpen={mockSetOpenFn} setMessage={mockSetMessageFn} setSeverity={mockSetSeverityFn} />)
        
        let rateButton = wrapper.find('#rate-skill');
        rateButton.simulate('click');

        expect(mockSetOpenFn).not.toBeCalled();
        expect(mockSetMessageFn).not.toBeCalled();
        expect(mockSetSeverityFn).not.toBeCalled();
    })

})