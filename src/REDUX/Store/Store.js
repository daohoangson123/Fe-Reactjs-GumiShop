import {createStore} from 'redux';
import rootReducer from '../Reducers/Reducer';

const store = createStore(rootReducer);

export default store;