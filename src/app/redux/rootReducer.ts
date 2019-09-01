import {combineReducers, Reducer} from "redux";
import {router5Reducer} from "redux-router5";
import {IStore} from "./IStore";
import {counterReducer} from "./modules/counterModule";

const rootReducer: Reducer<IStore> = combineReducers<IStore>({
  counter: counterReducer,
  router: router5Reducer
});

export default rootReducer;
