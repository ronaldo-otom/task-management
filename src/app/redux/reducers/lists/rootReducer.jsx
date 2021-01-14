import {combineReducers} from 'redux';
import {ListReducer} from '../lists/listReducer';

const RootReducer = combineReducers({
    tasks: ListReducer
});

export default RootReducer;