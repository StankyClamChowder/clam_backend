import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import image from './image';
import gallery from './gallery';
import users from './users';

const reducer = combineReducers({image, gallery, users});
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})))
const store = createStore(reducer, middleware);

export default store;
export * from './image';
export * from './gallery';
export * from './users';