import autobind from "autobind-decorator";
import * as React from "react";
import {connect} from "react-redux";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {classes, stylesheet} from "typestyle";
import {Keyboard} from "../components/Keyboard";
import {MetricsHelper} from "../helpers/MetricsHelper";
import {MidiHelper, TNote} from "../helpers/MidiHelper";
import {RandomKeyGenerator} from "../helpers/RandomKeyGenerator";

const classNames = stylesheet({
  container: {
    textAlign: "center"
  },
  highScore: {
    fontSize: 50,
    fontWeight: "bold"
  },
  keyToPlay: {
    fontSize: 56,
    fontWeight: "bold",
    marginTop: 100
  },
  warnStateBad: {
    backgroundColor: "#bb5533"
  },
  warnStateGood: {
    backgroundColor: "#aaff99"
  }
});

interface IStateToProps {
  translations: {
    hello: string;
  };
}

interface IState {
  keyToPlay: TNote;
  warn: "NEUTRAL" | "GOOD" | "BAD";
  score: number;
  showStatistics: boolean;
}

class HomePage extends React.Component<IStateToProps, IState> {
  private static notes: TNote[] = ["C", "D", "E", "F", "G", "A", "B"];

  public state: IState = {
    keyToPlay: null,
    score: 0,
    showStatistics: false,
    warn: "NEUTRAL"
  };
  private metricsHelper: MetricsHelper = new MetricsHelper();

  public componentDidMount(): void {
    this.setState({keyToPlay: RandomKeyGenerator(HomePage.notes)});
  }

  public render(): JSX.Element {
    return (
      <div className={classNames.container}>
        <div className={classNames.highScore}>{this.state.score}</div>
        <div className={classes(classNames.keyToPlay, this.getClassNameFromState())}>{this.state.keyToPlay}</div>
        <Keyboard onNoteChange={this.handleNoteChange}/>
        <button onClick={this.toggleStatistics}>{this.state.showStatistics ? "Hide" : "Show"} Statistics</button>
        <button onClick={this.clearStatistics}>Clear Statistics</button>
        {this.state.showStatistics ? this.renderStatistics() : null}
      </div>
    );
  }
  @autobind
  private renderStatistics(): JSX.Element {
    // find statistics in correct way
    const statistics = this.metricsHelper.getStatistics();
    return (
      <BarChart width={800} height={300} data={statistics} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="key"/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        <Bar dataKey="correct" stackId="a" fill="#aaff99"/>
        <Bar dataKey="incorrect" stackId="a" fill="#bb5533"/>
      </BarChart>
    );
  }

  @autobind
  private clearStatistics(): void {
    this.setState({showStatistics: false});
    MetricsHelper.clear();
  }

  @autobind
  private toggleStatistics(): void {
    this.setState((state) => ({showStatistics: !state.showStatistics}));
  }

  @autobind
  private getClassNameFromState(): string {
    switch (this.state.warn) {
      case "BAD":
        return classNames.warnStateBad;
      case "GOOD":
        return classNames.warnStateGood;
      case "NEUTRAL":
        return null;
      default:
        return undefined;
    }
  }

  @autobind
  private handleNoteChange(e: number, strength: number): void {
    if (e === null) {
      console.info("key up");
      this.setState({warn: "NEUTRAL"});
      return;
    }
    const note = MidiHelper.getNote(e).note;
    if (note !== this.state.keyToPlay) {
      this.metricsHelper.incorrect(this.state.keyToPlay);
      console.info(`Bad! you should have played ${this.state.keyToPlay}, but you played ${note}`);
      this.setState({warn: "BAD", score: 0});
      return;
    }
    console.info("Good", strength);
    this.metricsHelper.correct(this.state.keyToPlay);
    this.setState((state) => ({keyToPlay: RandomKeyGenerator(HomePage.notes), warn: "GOOD", score: state.score + 1}));
    return;
  }
}

const connected = connect()(HomePage);
export {connected as HomePage};
