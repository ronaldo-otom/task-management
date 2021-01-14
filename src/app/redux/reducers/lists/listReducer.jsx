import {ADD_TASK, FETCH_TASKS} from '../../constants/lists/lists';

const initialState = {
    tasks: [],
    isLoading: true
};
export const ListReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_TASKS: return {
            // ...state,
            isLoading: false,
            tasks: action.payload
        }
        // case FETCH_TASKS_SUCCESS: return {
        //     ...state,
        //     loading: false,
        //     tasks: action.payload,
        //     error: ''
        // }
        // case FETCH_TASKS_FAILED: return {
        //     loading: false,
        //     tasks: [],
        //     error: action.payload
        // }
        default: return {
            state
        }
    }
}

