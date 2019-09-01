import * as React from "react";
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
interface IState {
  currentKey: number | null;
  strength: number | null;
}

interface IProps {
  onNoteChange: (note: number | null, strength: number | null) => void;
}
interface INote {
  unknownValue: number;
  key: number;
  strength: number;
}

export class Keyboard extends React.PureComponent<IProps, IState> {
  public state: IState = {currentKey: null, strength: null};

  private static processMidi(e: MIDIMessageEvent): INote | null {
    const parts = e.data.toString().split(",");
    if (parts.length <= 1) {
      return null;
    }
    if (parseInt(parts[2], 10) === 0) {
      return null;
    }
    return {
      key: parseInt(parts[1], 10),
      strength: parseInt(parts[2], 10),
      unknownValue: parseInt(parts[0], 10)
    };
  }

  public async componentDidMount(): Promise<void> {
    try {
      const midiAccess = await navigator.requestMIDIAccess({sysex: false});
      const allInputs = midiAccess.inputs.values();
      for (let input = allInputs.next(); input && !input.done; input = allInputs.next()) {
        input.value.onmidimessage = (e) => {
          if (e.data.toString().split(",").length <= 1) {
            return;
          }
          const midi = Keyboard.processMidi(e);
          const currentKey = midi === null ? null : midi.key;
          const strength = midi === null ? null : midi.strength;
          this.setState({currentKey, strength});
          this.props.onNoteChange(currentKey, strength);
        };
      }
    } catch (e) {
      console.error(e);
    }
  }

  public render(): JSX.Element {
    return (
      <div/>
    );
  }
}
