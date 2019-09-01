export type TNote = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";
export interface IMidiDetail {
  octave: number;
  note: TNote;
}

// tslint:disable-next-line:no-unnecessary-class
export class MidiHelper {
  public static getNote(key: number): IMidiDetail {
    if (key < 0 || key > 127) {
      throw new Error("key outside of range");
    }
    return {
      note: MidiHelper.calculateNote(key),
      octave: this.getOctave(key)
    };
  }

  private static calculateNote(key: number): TNote {
    const notes: TNote[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const notePosition = key % 12;
    return notes[notePosition];
  }

  private static getOctave(key: number): number {
    let count = 0;
    while (key - 12 >= 0) {
      key = key - 12;
      count += 1;
    }
    return count;
  }
}
