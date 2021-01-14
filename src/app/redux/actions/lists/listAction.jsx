import {FETCH_TASKS} from '../../constants/lists/lists';
import axios from 'axios';
export const fetchTaskAPI = async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:3001/task')    
        dispatch({type: FETCH_TASKS, payload: res.data.data})
    } catch (error) {
        console.log(error)
    }
}
