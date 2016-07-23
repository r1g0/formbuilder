import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import createLogger from 'redux-logger'

const finalCreateStore = compose(
  applyMiddleware(thunk, createLogger()),
  applyMiddleware(thunk)
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
