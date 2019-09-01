import autobind from "autobind-decorator";
import * as React from "react";
import {connect} from "react-redux";
import {classes, stylesheet} from "typestyle";
import {Keyboard} from "../components/Keyboard";
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
  keyToPlay: string;
  warn: "NEUTRAL" | "GOOD" | "BAD";
  score: number;
}
class HomePage extends React.Component<IStateToProps, IState> {
  private static notes: TNote[] = ["C", "D", "E", "F", "G", "A", "B"];
  public state: IState = {keyToPlay: RandomKeyGenerator(HomePage.notes), warn: "NEUTRAL", score: 0};
  public render(): JSX.Element {
    return (
      <div className={classNames.container}>
        <div className={classNames.highScore}>{this.state.score}</div>
        <div className={classes(classNames.keyToPlay, this.getClassNameFromState())}>{this.state.keyToPlay}</div>
        <Keyboard onNoteChange={this.handleNoteChange}/>
      </div>
    );
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
      console.info(`Bad! you should have played ${this.state.keyToPlay}, but you played ${note}`);
      this.setState({warn: "BAD", score: 0});
      return;
    }
    console.info("Good", strength);
    this.setState((state) => ({keyToPlay: RandomKeyGenerator(HomePage.notes), warn: "GOOD", score: state.score + 1}));
    return;
  }
}

const connected = connect()(HomePage);
export {connected as HomePage};
