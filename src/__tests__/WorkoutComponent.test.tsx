import { mount, shallow } from 'enzyme';
import WorkoutComponent from '../components/workout/WorkoutComponent';
import { getAllExercises } from '../remote/exercise-service';
jest.mock('../remote/exercise-service');

describe('SidebarComponent Test Suite', () => {

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('WorkoutComponent renders', () => {
        let mockAuthUser = undefined;

        const wrapper = shallow(<WorkoutComponent currentUser={mockAuthUser} /> );

        expect(wrapper).toBeTruthy();
    })

    it('getAllExercises is invoked', () => {
        let mockAuthUser = undefined;

        const wrapper = mount(<WorkoutComponent currentUser={mockAuthUser} /> );

        expect(getAllExercises).toBeCalled();
    })

})