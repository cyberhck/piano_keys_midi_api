import {RouterState} from "redux-router5";
import {ICounterState} from "./modules/counterModule";

export interface IStore {
  counter: ICounterState;
  router: RouterState;
}
