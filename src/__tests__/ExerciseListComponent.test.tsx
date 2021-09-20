import { mount, shallow } from 'enzyme';
import ExerciseListComponent from '../components/workout/ExerciseListComponent';
import { Exercise } from '../dtos/exercise';
import { assignExercise } from '../remote/coach-service';
jest.mock('../remote/coach-service');

describe('SidebarComponent Test Suite', () => {

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('ExerciseListComponent renders', () => {
        let mockExercises = [new Exercise("bodypart","equipment","","id","name","target")];

        const wrapper = shallow(<ExerciseListComponent exercises={mockExercises} coach={""} />)

        expect(wrapper).toBeTruthy();
    })

    // it('assignExercise is called when assign button is clicked', () => {
    //     let mockExercises = [new Exercise("bodypart","equipment","","id","name","target")];

    //     const wrapper = mount(<ExerciseListComponent exercises={mockExercises} coach={""} />)

    //     console.log(wrapper.debug());

    //     let assignButtonWrapper = wrapper.find('div[id="name"]');

    //     jest.spyOn(window,'alert');

    //     assignButtonWrapper.simulate('click');

    //     expect(assignExercise).toBeCalled();
    //     expect(window.alert).toBeCalledWith(`Assigned name to your team!`)
    // })



})