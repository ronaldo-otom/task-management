import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './redux/reducers/lists/rootReducer';
import {fetchTaskAPI} from './redux/actions/lists/listAction';

const store = createStore(RootReducer, applyMiddleware(thunk));
store.dispatch(fetchTaskAPI);
store.subscribe(() => console.log(store.getState()));
export default store;
