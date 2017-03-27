import {History} from "history";
const appConfig = require("../../../config/main");
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { IStore } from "./IStore";
import rootReducer from "./rootReducer";
const createLogger = require("redux-logger");

export function configureStore(history: History, initialState?: IStore): Redux.Store<IStore> {

  const middlewares: Redux.Middleware[] = [
    routerMiddleware(history),
    thunk
  ];

  /** Add Only Dev. Middlewares */
  if (appConfig.env !== "production" && process.env.BROWSER) {
    const logger = createLogger();
    middlewares.push(logger);
  }

  const composeEnhancers = (appConfig.env !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
  ));

  if (appConfig.env === "development" && (module as any).hot) {
    (module as any).hot.accept("./rootReducer", () => {
      store.replaceReducer((require("./rootReducer")));
    });
  }

  return store;
}