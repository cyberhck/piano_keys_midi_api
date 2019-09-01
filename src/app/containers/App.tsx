import * as React from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import {createRouteNodeSelector, RouterState} from "redux-router5";
import {State as IRouteState} from "router5";
import {stylesheet} from "typestyle";
import {config as appConfig} from "../../../config";
import {HomePage} from "../pages/HomePage";
import {IStore} from "../redux/IStore";
import {Header} from "./Header";

const classNames = stylesheet({
  container: {
    margin: 0,
    padding: 0,
    textAlign: "center"
  }
});

interface IStateToProps {
  route: IRouteState;
}

class App extends React.Component<IStateToProps> {
  private components: {[key: string]: React.ComponentClass} = {
    home: HomePage
  };

  public render(): JSX.Element {
    const {route} = this.props;
    const segment = route ? route.name.split(".")[0] : undefined;
    return (
      <section className={classNames.container}>
        <Helmet {...appConfig.app.head}/>
        <Header/>
        {segment && this.components[segment] ? React.createElement(this.components[segment]) : <div>Not Found</div>}
      </section>
    );
  }
}

const mapStateToProps = (state: IStore): IStateToProps & Partial<RouterState> => ({
  ...createRouteNodeSelector("")(state)
});

const connected = connect(mapStateToProps)(App);

export {classNames, connected as App, App as UnconnectedApp, mapStateToProps};
