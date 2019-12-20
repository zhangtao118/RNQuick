/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {combineReducers} from 'redux';
import CounterReducer from './reducers/CounterReducer';

const allReducers = combineReducers({
  count: CounterReducer,
});
export default allReducers;
